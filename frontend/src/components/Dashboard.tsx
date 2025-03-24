import { useEffect, useState } from "react";
import { Search, Share2, UserRoundPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatBox } from "./ChatBox";
import Profile from "./Profile";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/utils/supabaseClient";
import { validateJwtToken } from "@/utils/validateJwtToken";
import { FileTheme } from "@/type";
import ThemesList from "./ThemesList";
import Share from "./Share";

export default function Dashboard() {
    const [searchParams] = useSearchParams();
    const signupFlag = searchParams.get("signup");
    const [activeTab, setActiveTab] = useState(
        signupFlag ? "profile" : "search"
    );
    const [selectedTheme, setSelectedTheme] = useState<FileTheme | null>(null);
    const [userId, setUserId] = useState<string>("");
    const [isGoogleAuth, setIsGoogleAuth] = useState(false);

    useEffect(() => {
        async function checkSession() {
            const { data } = await supabase.auth.getUser();
            if (!data.user) {
                const res = await validateJwtToken();
                if (!res) {
                    window.location.href = "/login";
                } else {
                    setUserId(res.user.id);
                }
            } else {
                setIsGoogleAuth(true);
                setUserId(data.user.id);
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
                    variant={activeTab === "share" ? "secondary" : "ghost"}
                    disabled={!isGoogleAuth}
                    className="flex items-center space-x-2"
                    onClick={() => setActiveTab("share")}
                >
                    <Share2 size={20} />
                    <span>Share</span>
                </Button>
                <Button
                    variant={activeTab === "profile" ? "secondary" : "ghost"}
                    className="flex items-center space-x-2"
                    onClick={() => setActiveTab("profile")}
                >
                    <UserRoundPen size={20} />
                    <span>Profile</span>
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">
                {activeTab === "search" && !selectedTheme && (
                    <ThemesList setSelectedTheme={setSelectedTheme} />
                )}

                {activeTab === "search" && selectedTheme && (
                    <ChatBox
                        theme={selectedTheme}
                        onBack={() => setSelectedTheme(null)}
                    />
                )}

                {activeTab === "share" && <Share userId={userId} />}

                {activeTab === "profile" && <Profile userId={userId} />}
            </div>
        </div>
    );
}
