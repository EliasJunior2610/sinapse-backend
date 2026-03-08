import { ApiProperty } from "@nestjs/swagger";

export class SubjectDTO {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    description: string;

    @ApiProperty()
    user_id: string; // course creator

    @ApiProperty()
    quizzes_ids: string[];

    @ApiProperty()
    students_ids: string[];

    @ApiProperty()
    semesters_ids?: string[];

    @ApiProperty()
    ranking: {
        user_id: string;
        answered_questions: number;
        correct_answers: number;
    }[];
}

export class SubjectResponseDTO {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    name: string;
    
    @ApiProperty()
    description: string;

    @ApiProperty()
    user_id: string; // course creator

    @ApiProperty()
    quizzes_ids: string[];

    @ApiProperty()
    students_ids: string[];

    @ApiProperty()
    semesters_ids?: string[];

    @ApiProperty()
    ranking: {
        user_id: string;
        answered_questions: number;
        correct_answers: number;
    }[];
}