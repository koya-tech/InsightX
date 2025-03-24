import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { genAIModel } from "@/utils/googleGeminiModel";
import generatePrompt from "@/utils/generatePrompt";
import { FileTheme, Message } from "@/type";
import { TypingText } from "./TypingText";

export function ChatBox({
    theme,
    onBack,
}: {
    theme: FileTheme;
    onBack: () => void;
}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("https://api.supavec.com/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: import.meta.env.VITE_SUPAVEC_API,
                },
                body: JSON.stringify({
                    query: userMessage.text,
                    file_ids: [theme.fileId],
                }),
            });
            const data = await response.json();

            const documentFromSupavec = data.documents[0].content;

            const prompt = generatePrompt({
                Question: userMessage.text,
                RelevantDocument: documentFromSupavec,
            });

            const result = await genAIModel.generateContent(prompt);
            const responseFromResult = await result.response;
            const generatedResponse: string = await responseFromResult.text();

            setMessages((prev) => [
                ...prev,
                { text: generatedResponse, sender: "bot" },
            ]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages((prev) => [
                ...prev,
                { text: "Error retrieving response.", sender: "bot" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="flex flex-col h-full">
            <CardContent className="p-4 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                    <Button variant="ghost" onClick={onBack}>
                        ← Back
                    </Button>
                    <h2 className="text-lg font-semibold">
                        Chat about {theme.title}
                    </h2>
                </div>
                <div className="h-full overflow-y-auto border p-2 mb-2 bg-white rounded">
                    {messages.map((msg, index) => (
                        // <div
                        //     key={index}
                        //     className={`mb-2 ${
                        //         msg.sender === "user"
                        //             ? "text-right"
                        //             : "text-left"
                        //     }`}
                        // >
                        //     <span
                        //         className={`inline-block p-2 rounded-lg ${
                        //             msg.sender === "user"
                        //                 ? "bg-secondary-green"
                        //                 : "bg-gray-200"
                        //         }`}
                        //     >
                        //         {msg.text}
                        //     </span>
                        // </div>
                        <div
                            key={index}
                            className={`mb-2 ${
                                msg.sender === "user"
                                    ? "text-right"
                                    : "text-left"
                            }`}
                        >
                            <span
                                className={`inline-block p-2 rounded-lg ${
                                    msg.sender === "user"
                                        ? "bg-blue-200"
                                        : "bg-gray-200"
                                }`}
                            >
                                {msg.sender === "bot" ? (
                                    <TypingText text={msg.text} />
                                ) : (
                                    msg.text
                                )}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex space-x-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        disabled={loading}
                    />
                    <Button
                        onClick={sendMessage}
                        variant="secondary"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Send"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
