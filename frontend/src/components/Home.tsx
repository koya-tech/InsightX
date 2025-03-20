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
                            src="https://img.freepik.com/free-photo/full-shot-student-library_23-2149647115.jpg?t=st=1742406830~exp=1742410430~hmac=26af67c970ef5d677c21688c184d6de0fdd9052f253c214ced76b9264c87bffc&w=1380"
                            // https://img.freepik.com/free-photo/close-up-young-colleagues-having-meeting_23-2149060255.jpg?t=st=1742407112~exp=1742410712~hmac=0cc0e733a7c278050da6063927d49110a3e7527b04a0076e6e301d7def5c87cb&w=1380
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
