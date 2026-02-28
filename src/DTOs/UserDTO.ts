export interface UserDTO {
    name: string;
    email: string;
    password: string;
    paying: boolean;
    is_admin: boolean;
    answered_questions: number;
    points: number;
    token?: string;
}