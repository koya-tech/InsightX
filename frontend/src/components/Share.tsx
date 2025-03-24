import React, { useState } from "react";
import { Upload, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supavecUploadFileTypes } from "@/type";
import { supabase } from "@/utils/supabaseClient";

const Share = ({ userId }: { userId: string }) => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : undefined;

        if (
            selectedFile &&
            ["application/pdf", "text/markdown", "text/plain"].includes(
                selectedFile.type
            )
        ) {
            setFile(selectedFile);
        } else {
            setFile(null);
            toast.error("Please upload a valid PDF, Markdown, or Text file");
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }

        if (!file) {
            toast.error("Please upload a valid file");
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(
                "https://api.supavec.com/upload_file",
                {
                    method: "POST",
                    headers: {
                        authorization: import.meta.env.VITE_SUPAVEC_API,
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("File upload failed");
            }

            const data: supavecUploadFileTypes = await response.json();

            const { error } = await supabase.from("papers").insert([
                {
                    file_id: data.file_id,
                    paper_title: data.file_name,
                    user_id: userId,
                },
            ]);

            if (error) {
                console.error("Error inserting file:", error);
                toast.error("Upload failed. Please try again.");
                return;
            }

            toast.success("File uploaded successfully");
            setTitle("");
            setFile(null);
        } catch (error) {
            console.error("File upload error:", error);
            toast.error("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Share2 size={20} />
                    <span>Share Files</span>
                </CardTitle>
                <CardDescription>
                    Upload and share PDF, Markdown, or Text files with your team
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id="shareForm" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter document title"
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="file">Document</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                                <input
                                    id="file"
                                    type="file"
                                    accept=".pdf,.md,.txt"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                {file ? (
                                    <div className="flex items-center justify-center gap-2 text-green-600">
                                        <FileText size={24} />
                                        <span className="font-medium">
                                            {file.name}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                (document.getElementById(
                                                    "file"
                                                ) as HTMLInputElement)!.click()
                                            }
                                            className="flex items-center gap-2"
                                        >
                                            <Upload size={16} />
                                            Upload File
                                        </Button>
                                        <p className="mt-2 text-sm text-gray-500">
                                            or drag and drop your file here
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>

            <CardFooter>
                <Button
                    type="submit"
                    form="shareForm"
                    className="w-full"
                    disabled={isUploading || !file || !title.trim()}
                >
                    {isUploading ? (
                        <span className="flex items-center gap-2">
                            <svg
                                className="animate-spin h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Uploading...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <Share2 size={16} />
                            Share
                        </span>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Share;
