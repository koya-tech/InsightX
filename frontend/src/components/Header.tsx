import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Header = () => {
    const [userImageUrl, setUserImageUrl] = useState<string>("/person.svg");
    const [isLogin, setIsLogin] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleDashboard = () => {
        navigate("/dashboard");
    };

    const handleLogout = async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        if (session) {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Supabase logout error:", error.message);
                return;
            }
        } else {
            try {
                const response = await fetch(
                    import.meta.env.VITE_BACKEND_URL + "/auth/logout",
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );
                if (!response.ok) {
                    console.error("JWT logout failed");
                }
            } catch (error) {
                console.error("JWT logout error:", error);
            }
        }
        navigate("/");
        window.location.reload();
    };

    useEffect(() => {
        async function verifyToken() {
            try {
                const response = await fetch(
                    import.meta.env.VITE_BACKEND_URL + "/auth/verify",
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("Token verification failed");
                }
                setIsLogin(true);
            } catch (error) {
                console.error("JWT verification error:", error);
            } finally {
                setIsAuthLoading(false);
            }
        }

        async function fetchUser() {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setUserImageUrl(data.session.user.user_metadata.avatar_url);
                setIsLogin(true);
                setIsAuthLoading(false);
            } else {
                await verifyToken();
            }
        }

        fetchUser();
    }, [navigate]);

    return (
        <div className=" bg-gray-50 text-gray-600 font-sans fixed top-0 w-full z-50">
            {/* Navigation */}
            <header className="bg-white py-4 border-b sticky top-0 z-10 px-16">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <a href="/">
                            <h1 className="text-xl font-bold text-primary-green">
                                Ecology Hub
                            </h1>
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        {isAuthLoading ? (
                            <div>Loading...</div>
                        ) : isLogin ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage
                                                src={userImageUrl}
                                                alt="@userImageUrl"
                                            />
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem
                                            onClick={handleDashboard}
                                        >
                                            Dashboard
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Button
                                    className="text-primary-green bg-white hover:bg-secondary-green"
                                    onClick={handleSignup}
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    className="text-primary-gray bg-white hover:bg-secondary-gray"
                                    onClick={handleLogin}
                                >
                                    Log in
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
};
