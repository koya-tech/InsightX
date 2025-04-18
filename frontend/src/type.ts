export type Message = {
    text: string;
    sender: "user" | "bot";
};

export interface fileTypesFromSupavec {
    type: string;
    file_id: string;
    created_at: string;
    file_name: string;
    team_id: string;
}

export interface FileTheme {
    title: string;
    fileId: string;
}

export interface TypingTextProps {
    text: string;
    speed?: number;
}

export type PapersShema = {
    id: string;
    created_at: string;
    file_id: string;
    paper_title: string;
    user_id: string;
};

export type supavecUploadFileTypes = {
    success: boolean;
    message: string;
    file_id: string;
    file_name: string;
    chunks: number;
    chunk_size: number;
    chunk_overlap: number;
};
