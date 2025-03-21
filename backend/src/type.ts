export interface User {
    id: string;
    username: string;
    passwordHash: string;
}

export class AuthDto {
    username: string;
    password: string;
}
