export interface QuizDTO {
    name: string;
    description: string;
    user_id: string; // quiz creator
    questions_ids: string[];
    categories_ids?: string[];
}