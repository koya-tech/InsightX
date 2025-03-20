const EcoFutLandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-600 font-sans mt-16">
            <section className="relative w-full h-64 md:h-[76vh] overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: "url('/ecohub5.jpg')",
                    }}
                />

                {/* Semi-transparent overlay to improve text readability */}
                <div className="absolute inset-0 z-10"></div>

                {/* Content Container */}
                <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
                    <div className="bg-white/80 rounded-lg p-6 shadow-lg max-w-lg">
                        <h1 className="text-2xl md:text-4xl font-bold text-primary-gray mb-2">
                            Welcome to Ecology Hub
                        </h1>
                        <p className="text-lg md:text-xl text-gray-800">
                            Embrace the Future of Sustainable Living
                        </p>
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
                                Simplicity and sustainability combined
                            </h3>
                            <p className="text-primary-gray mb-6">
                                From eco-conscious web design to sustainable
                                digital marketing, we've got you covered.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <p className="text-primary-green uppercase text-3xl font-black tracking-wide mb-2">
                                Our mission
                            </p>
                            <h3 className="text-2xl md:text-3xl text-primary-gray font-light mb-4">
                                Sustainable simplicity at its best
                            </h3>
                            <p className="text-primary-gray mb-6">
                                Our commitment to sustainability drives our
                                efficient and effective work approach.
                                Experience the future of eco-friendly business
                                solutions.
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
