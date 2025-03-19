import { Button } from "./ui/button";

export const Header = () => {
    return (
        <div className=" bg-gray-50 text-gray-600 font-sans fixed top-0 w-full z-50">
            {/* Navigation */}
            <header className="bg-white py-4 border-b sticky top-0 z-10 px-16">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-primary-green">
                            Ecology Hub
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button className="text-primary-green bg-white hover:bg-secondary-green">
                            Sign Up
                        </Button>
                        <Button className="text-primary-gray bg-white hover:bg-secondary-gray">
                            Log in
                        </Button>
                    </div>
                </div>
            </header>
        </div>
    );
};
