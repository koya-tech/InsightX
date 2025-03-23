export interface User {
    id: string;
    username: string;
    passwordHash: string;
}

export class AuthDto {
    username: string;
    password: string;
}

export interface SupabaseUserSchema {
    id: string;
    created_at: string;
    wallet_address: string;
    user_name: string;
}
