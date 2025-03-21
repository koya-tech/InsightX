import { useEffect, useState } from "react";
import { Search, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChatBox } from "./ChatBox";
import Profile from "./Profile";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/utils/supabaseClient";
import { validateJwtToken } from "@/utils/validateJwtToken";
import { FileTheme, fileTypesFromSupavec } from "@/type";

export default function Dashboard() {
    const [searchParams] = useSearchParams();
    const signupFlag = searchParams.get("signup");
    const [activeTab, setActiveTab] = useState(
        signupFlag ? "profile" : "search"
    );
    const [selectedTheme, setSelectedTheme] = useState<FileTheme | null>(null);
    const [userId, setUserId] = useState<string>("");
    const [searchThemes, setSearchThemes] = useState<FileTheme[]>([]);
    useEffect(() => {
        async function fetchFileList() {
            const res = await fetch("https://api.supavec.com/user_files", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: import.meta.env.VITE_SUPAVEC_API,
                },
                body: JSON.stringify({
                    pagination: { limit: 10, offset: 0 },
                    order_dir: "desc",
                }),
            });
            const data = await res.json();

            if (data && data.results) {
                const themes: FileTheme[] = data.results.map(
                    (file: fileTypesFromSupavec) => ({
                        title: file.file_name,
                        fileId: file.file_id,
                    })
                );
                setSearchThemes(themes);
            }
        }
        fetchFileList();
    }, []);

    useEffect(() => {
        async function checkSession() {
            const { data } = await supabase.auth.getSession();
            if (!data.session?.user.id) {
                const res = await validateJwtToken();
                if (!res) {
                    window.location.href = "/login";
                } else {
                    setUserId(res.user.id);
                }
            } else {
                setUserId(data.session?.user.id);
            }
        }
        checkSession();
    }, []);

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
                                        <span>{theme.title}</span>
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

                {activeTab === "profile" && <Profile userId={userId} />}
            </div>
        </div>
    );
}
