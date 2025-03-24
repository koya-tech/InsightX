import { MessageSquare } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { FileTheme } from "@/type";
import { supabase } from "@/utils/supabaseClient";

const ThemesList = ({
    setSelectedTheme,
}: {
    setSelectedTheme: (theme: FileTheme) => void;
}) => {
    const [searchThemes, setSearchThemes] = useState<FileTheme[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        async function fetchFileList() {
            const { data, error } = await supabase
                .from("papers")
                .select("file_id, paper_title")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching file list:", error);
            }

            console.log(data);

            if (data) {
                const themes: FileTheme[] = data.map(
                    (file: { file_id: string; paper_title: string }) => ({
                        title: file.paper_title,
                        fileId: file.file_id,
                    })
                );
                setSearchThemes(themes);
            }
        }
        fetchFileList();
    }, []);

    return (
        <Card>
            <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Select a Theme</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search themes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="space-y-2">
                    {searchThemes
                        .filter((theme) =>
                            theme.title
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        )
                        .map((theme, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="w-full flex items-center space-x-2"
                                onClick={() => setSelectedTheme(theme)}
                            >
                                <MessageSquare size={20} />
                                <span>{theme.title}</span>
                            </Button>
                        ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ThemesList;
