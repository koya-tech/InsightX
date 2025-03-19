const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white/90 p-6 rounded-lg shadow-xl flex flex-col items-center">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>

                    <div className="absolute inset-0 border-4 border-t-green-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>

                    <div className="absolute inset-2 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                </div>

                <p className="mt-4 text-gray-700 font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
