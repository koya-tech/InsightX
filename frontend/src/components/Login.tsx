import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import GoogleOAuthButton from "./GoogleOAuthButton";

const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ username, password }),
                }
            );

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("Login error/Login-handleSubmit:", errorMessage);
                return toast.error("Login failed");
            }

            toast.success("Login successful");
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed");
        }
    };

    return (
        <>
            <div className="flex h-screen">
                <div className="hidden md:flex md:w-1/2 relative">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://img.freepik.com/free-photo/hand-person-beautiful-green-leaves-forest_181624-2854.jpg?t=st=1742411442~exp=1742415042~hmac=a2febccfca80df1e6c3e34115333ac2ec9efe1812433fc2f344d93ac06dafcd7&w=740')",
                        }}
                    />
                    <div className="absolute inset-0 bg-green-900/40 flex items-center justify-center">
                        <div className="text-white text-center p-8">
                            <h2 className="text-3xl font-bold mb-4">
                                Ecology Hub
                            </h2>
                            <p className="text-xl">
                                Go to search for the future
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-secondary-gray/30">
                    <Card className="w-full max-w-md p-8 shadow-lg">
                        <h1 className="text-2xl font-bold text-center mb-6">
                            ACCOUNT LOGIN
                        </h1>

                        <GoogleOAuthButton
                            displayText={"Sign in width Google"}
                        />

                        <div className="flex items-center my-6">
                            <Separator className="flex-1" />
                            <span className="px-4 text-sm text-primary-gray">
                                or
                            </span>
                            <Separator className="flex-1" />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-primary-gray mb-1"
                                >
                                    Username
                                </label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="w-full"
                                    placeholder="Input your username"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-1">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-primary-gray"
                                    >
                                        Password
                                    </label>
                                    <a
                                        href="#"
                                        className="text-sm text-primary-green"
                                    >
                                        Forget your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full"
                                    placeholder="Input your password"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-primary-green text-white hover:bg-white hover:text-primary-green"
                            >
                                Login
                            </Button>
                        </form>

                        <p className="text-center mt-6 text-sm text-primary-gray">
                            Don't have an account?{" "}
                            <a
                                href="/signup"
                                className="text-primary-green font-medium"
                            >
                                Register here
                            </a>
                        </p>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
