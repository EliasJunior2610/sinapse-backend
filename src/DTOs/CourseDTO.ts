export interface CourseDTO {
    name: string;
    description: string;
    user_id: string; // course creator
    quizzes_ids: string[];
    students_ids: string[];
    categories_ids?: string[];
    visibility: boolean;
    invitation_code: string;
    ranking: {
        user_id: string;
        answered_questions: number;
        correct_answers: number;
    }[];
}