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
