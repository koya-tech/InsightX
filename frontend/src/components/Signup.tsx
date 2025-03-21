import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import GoogleOAuthButton from "./GoogleOAuthButton";

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, agreeTerms: checked }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation: passwords match
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        // Validation: password is at least 8 characters
        if (formData.password.length < 8) {
            return toast.error("Password must be at least 8 characters");
        }

        try {
            const { username, password } = formData;
            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/auth/signup",
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
                console.error("Signup error:", errorMessage);
                return toast.error("Signup failed");
            }

            toast.success("Signup successful");
            navigate(`/dashboard`);
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Signup failed");
        }
    };

    return (
        <div className="flex h-screen">
            <div className="hidden md:flex md:w-1/2 relative">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/ecohub8.jpg')",
                    }}
                />
                <div className="absolute inset-0 bg-green-900/40 flex items-center justify-center">
                    <div className="text-white text-center p-8">
                        <h2 className="text-3xl font-bold mb-4">Ecology Hub</h2>
                        <p className="text-xl">
                            Are you ready to learn new discover about Ecology?
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center p-8 ">
                <Card className="w-full max-w-md p-6 shadow-lg">
                    <h1 className="text-2xl font-bold text-center text-primary-gray">
                        Create an Account
                    </h1>

                    <GoogleOAuthButton displayText={"Sign up width Google"} />

                    <div className="flex items-center mt-4">
                        <Separator className="flex-1" />
                        <span className="px-4 text-sm text-gray-500">or</span>
                        <Separator className="flex-1" />
                    </div>

                    <p className="text-center">
                        <p className="font-bold text-sm text-primary-gray">
                            ! Note !
                        </p>
                        <p className="text-sm text-primary-gray">
                            Username/Password authentication is used for
                            temporary accounts who is restricted feature. Google
                            authentication is better.
                        </p>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-primary-gray mb-1"
                            >
                                Username
                            </label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Username"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-primary-gray mb-1"
                            >
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Password"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Include at least 8 characters
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-primary-gray mb-1"
                            >
                                Confirm Password
                            </label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>

                        <div className="flex items-start space-x-2 pt-2">
                            <Checkbox
                                id="terms"
                                checked={formData.agreeTerms}
                                onCheckedChange={handleCheckboxChange}
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm text-primary-gray"
                            >
                                <span>Agree to our Policy</span>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primary-green text-white hover:bg-white hover:text-primary-green"
                            disabled={
                                !formData.agreeTerms ||
                                !formData.username ||
                                !formData.password ||
                                !formData.confirmPassword
                            }
                        >
                            Sign Up
                        </Button>
                    </form>

                    <p className="text-center mt-6 text-sm text-primary-gray">
                        If you already have account, Go to{" "}
                        <a
                            href="/login"
                            className="text-primary-green font-medium"
                        >
                            LOGIN
                        </a>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default SignupPage;
