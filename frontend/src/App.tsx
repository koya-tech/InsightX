import { supabase } from "./utils/supabaseClient";

function App() {
    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) {
            console.error("Sign in error:", error.message);
        }
    };

    return (
        <>
            <p className="bg-amber-300">Hello world</p>
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="bg-amber-300 p-4">Hello world</p>
                <button
                    onClick={handleGoogleSignIn}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Sign in with Google
                </button>
            </div>
        </>
    );
}

export default App;
