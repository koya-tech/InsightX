import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Profile = ({ userId }: { userId: string }) => {
    const [walletAddress, setWalletAddress] = useState("");
    const [username, setUsername] = useState("User Name");
    const [isSettingUserName, setIsSettingUsername] = useState(false);

    const saveWalletAddress = () => {
        console.log("Wallet Address Saved:", walletAddress);
        // todo: save wallet address
    };

    const updateUserInfo = async () => {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_URL + `/user/${userId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );
        if (res.ok) {
            setIsSettingUsername(false);
        }
        return;
    };

    const deleteUserInfo = async () => {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_URL + `/user/${userId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );
        if (res.ok) {
            window.location.href = "/login";
        }
        return;
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
                <label className="block text-primary-gray font-bold">
                    Username
                </label>
                <div>
                    {isSettingUserName ? (
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    ) : (
                        <p>{username}</p>
                    )}
                    <Button
                        variant="ghost"
                        onClick={async () => {
                            setIsSettingUsername(!isSettingUserName);
                            // updateUserInfo();
                            if (isSettingUserName) {
                                await updateUserInfo();
                            }
                        }}
                    >
                        {isSettingUserName ? "Save" : "Edit"}
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            deleteUserInfo();
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </div>
            <div className="hidden">
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
        </div>
    );
};

export default Profile;
