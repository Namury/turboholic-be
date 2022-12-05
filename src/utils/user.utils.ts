export interface UserToken{
    id: number,
    email: string,
}

export interface UserRegister {
    username: string;
    email: string;
    name: string;
    password: string;
}

export interface UserResponse {
    token: string;
    name: string;
    email: string;
}