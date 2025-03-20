import { useState } from "react";
import { Search, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChatBox } from "./ChatBox";

const searchThemes = [
    "Climate Change",
    "Space Exploration",
    "Renewable Energy",
    "Ocean Conservation",
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("search");
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

    return (
        <div className="flex h-screen pt-16">
            {/* Sidebar */}
            <div className="w-64 bg-tertiary-green text-white p-4 flex flex-col space-y-4">
                <Button
                    variant={activeTab === "search" ? "secondary" : "ghost"}
                    className="flex items-center space-x-2"
                    onClick={() => {
                        setActiveTab("search");
                        setSelectedTheme(null);
                    }}
                >
                    <Search size={20} />
                    <span>Search</span>
                </Button>
                <Button
                    variant={activeTab === "profile" ? "secondary" : "ghost"}
                    className="flex items-center space-x-2"
                    onClick={() => setActiveTab("profile")}
                >
                    <span>Profile</span>
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">
                {activeTab === "search" && !selectedTheme && (
                    <Card>
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold mb-4">
                                Select a Theme
                            </h2>
                            <div className="space-y-2">
                                {searchThemes.map((theme, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        className="w-full flex items-center space-x-2"
                                        onClick={() => setSelectedTheme(theme)}
                                    >
                                        <MessageSquare size={20} />
                                        <span>{theme}</span>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeTab === "search" && selectedTheme && (
                    <ChatBox
                        theme={selectedTheme}
                        onBack={() => setSelectedTheme(null)}
                    />
                )}

                {activeTab === "profile" && (
                    <Card>
                        <CardContent className="p-4">
                            Profile Component Goes Here
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
