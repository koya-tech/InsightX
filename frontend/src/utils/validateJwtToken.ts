export async function validateJwtToken() {
    try {
        const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/auth/verify",
            {
                method: "POST",
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error("Token verification failed");
        }
        return response.json();
    } catch (error) {
        console.error("JWT verification error:", error);
        return null;
    }
}
