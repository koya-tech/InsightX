import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Profile = ({ userId }: { userId: string }) => {
    const [walletAddress, setWalletAddress] = useState("");
    const [username, setUsername] = useState("User Name");

    const saveWalletAddress = () => {
        console.log("Wallet Address Saved:", walletAddress);
        // todo: save wallet address
    };

    useEffect(() => {
        async function fetchUserInfo() {
            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + `/user/${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
                setWalletAddress(data.walletAddress);
            }
        }
        fetchUserInfo();
    }, [userId]);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Profile</h2>
            <div className="mb-4">
                <div>
                    <label className="block text-primary-gray font-bold">
                        Username
                    </label>
                    <p>{username}</p>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-primary-gray font-bold">
                    Wallet Address:
                </label>
                <Input
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter your wallet address"
                />
            </div>
            <Button onClick={saveWalletAddress} variant="default">
                Save
            </Button>
        </div>
    );
};

export default Profile;
