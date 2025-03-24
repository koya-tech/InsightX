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
                body: JSON.stringify({ username }),
            }
        );
        if (res.ok) {
            setIsSettingUsername(false);
        }
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
        <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Profile</h2>

            {/* Username Section */}
            <div className="p-4 bg-white rounded-lg shadow">
                <label className="block text-sm font-bold text-primary-gray mb-2">
                    Username
                </label>
                <div className="flex items-center">
                    {isSettingUserName ? (
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="flex-grow border border-gray-300 rounded-md p-2"
                        />
                    ) : (
                        <p className="flex-grow text-lg text-gray-800">
                            {username}
                        </p>
                    )}
                    <div className="flex space-x-2 ml-4">
                        <Button
                            variant="ghost"
                            onClick={async () => {
                                setIsSettingUsername(!isSettingUserName);
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
            </div>

            {/* Wallet Address Section */}
            <div className="p-4 bg-white rounded-lg shadow">
                <label className="block text-sm font-bold text-primary-gray mb-2">
                    Wallet Address
                </label>
                <div className="flex items-center">
                    <Input
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        placeholder="Enter your wallet address"
                        className="flex-grow border border-gray-300 rounded-md p-2"
                    />
                    <Button
                        onClick={saveWalletAddress}
                        variant="default"
                        className="ml-4"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
