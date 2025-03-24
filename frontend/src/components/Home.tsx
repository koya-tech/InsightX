import { supabase } from "@/utils/supabaseClient";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const EcoFutLandingPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getUser();
            if (data.user) {
                console.log("User is authenticated");
                setIsAuthenticated(true);
            }
        };
        checkSession();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-600 font-sans mt-16">
            <section className="relative w-full h-64 md:h-[76vh] overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: "url('/ecohub9.jpg')",
                    }}
                />

                {/* Semi-transparent overlay to improve text readability */}
                <div className="absolute inset-0 z-10"></div>

                {/* Content Container */}
                <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
                    <div className="bg-white/80 rounded-lg p-6 shadow-lg max-w-lg">
                        <h1 className="text-2xl md:text-4xl font-bold text-primary-gray mb-2">
                            Welcome to InsightX
                        </h1>
                        <p className="text-lg md:text-xl text-gray-800">
                            Platform for sharing and exploring academic papers
                        </p>

                        {isAuthenticated && (
                            <Button className="p-0 rounded-xl mt-4 border-primary-gray">
                                <a
                                    href="/dashboard"
                                    className="bg-secondary-green/80 text-primary-gray px-8 py-2 rounded-xl"
                                >
                                    Go to Dashboard
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </section>
            {/* Features Section */}
            <section className="py-12 md:py-20 px-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                        <img
                            src="/ecohub7.jpg"
                            alt="Team illustration"
                            className="mx-auto h-full rounded-4xl shadow-2xl"
                        />
                        <div>
                            <p className="text-primary-green uppercase text-3xl font-bold tracking-wide mb-2">
                                Features
                            </p>
                            <h3 className="text-2xl md:text-3xl text-primary-gray font-light mb-4">
                                Unlock Knowledge, Instantly
                            </h3>
                            <p className="text-primary-gray mb-6">
                                Upload, share, and explore academic papers with
                                AI-powered search and summarization.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-primary-green uppercase text-3xl font-bold tracking-wide mb-2">
                                Mission
                            </p>
                            <h3 className="text-2xl md:text-3xl text-primary-gray font-light mb-4">
                                Empowering Research, Rewarding Innovation
                            </h3>
                            <p className="text-primary-gray mb-6">
                                Bridging the gap between researchers by making
                                knowledge accessible and incentivizing
                                contributions.
                            </p>
                        </div>

                        <div className="order-1 md:order-2">
                            <img
                                src="/ecohub6.jpg"
                                alt="Eco illustration"
                                className="mx-auto w-full rounded-4xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EcoFutLandingPage;
