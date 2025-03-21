import { Facebook, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
    return (
        <>
            <footer className="bg-secondary-gray py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center text-primary-gray flex justify-between">
                        <p>© 2025 Ecology Hub.</p>
                        <div className="flex justify-center space-x-4 mt-4">
                            <a
                                href="#"
                                className="text-green-600 hover:text-green-800"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-green-600 hover:text-green-800"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-green-600 hover:text-green-800"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
