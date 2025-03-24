const NotFound = () => {
    return (
        <div className="h-[calc(100vh-124px)] flex flex-col bg-white pt-16">
            {/* Main Content */}
            <main className="mx-auto py-12 px-4 h-[50vh] flex items-center">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-8">
                        <svg
                            className="h-24 w-24 text-primary-green mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <h2 className="text-6xl font-bold text-primary-green mt-4">
                            404
                        </h2>
                    </div>

                    <p className="text-xl mb-8">
                        The page you are looking for does not exist.
                    </p>

                    <a
                        href="/"
                        className="inline-block mt-8 px-6 py-3 bg-primary-green text-white font-medium rounded-lg hover:bg-primary-green transition-colors"
                    >
                        Go Home
                    </a>
                </div>
            </main>
        </div>
    );
};

export default NotFound;
