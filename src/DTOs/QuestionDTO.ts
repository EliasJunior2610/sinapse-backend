export interface QuestionDTO {
    question: string;
    user_id: string; // question creator
    possible_answers?: string[];
    answer?: string;
    boolean_answer?: boolean;
}