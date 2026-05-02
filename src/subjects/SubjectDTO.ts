import { ApiProperty } from '@nestjs/swagger';

export class SubjectDTO {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  user_id!: string; // course creator

  @ApiProperty()
  quizzes_ids!: string[];

  @ApiProperty()
  students_ids!: string[];

  @ApiProperty()
  semester_id!: string;

  @ApiProperty()
  course_id!: string;

  @ApiProperty()
  invitation_code?: string;

  @ApiProperty()
  ranking!: {
    user_id: string;
    answered_questions: number;
    correct_answers: number;
  }[];
}

export class CreateSubjectDTO {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  user_id!: string; // course creator

  @ApiProperty()
  quizzes_ids!: string[];

  @ApiProperty()
  students_ids!: string[];

  @ApiProperty()
  semester_id!: string;

  @ApiProperty()
  course_id!: string;

  @ApiProperty()
  ranking!: {
    user_id: string;
    answered_questions: number;
    correct_answers: number;
  }[];
}

export class SubjectResponseDTO {
  @ApiProperty()
  _id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  user_id!: string; // course creator

  @ApiProperty()
  quizzes_ids!: string[];

  @ApiProperty()
  students_ids!: string[];

  @ApiProperty()
  semester_id!: string;

  @ApiProperty()
  course_id!: string;

  @ApiProperty()
  invitation_code?: string;

  @ApiProperty()
  ranking!: {
    user_id: string;
    answered_questions: number;
    correct_answers: number;
  }[];
}

export class SubscribeUserDTO {
  @ApiProperty()
  user_id!: string;

  @ApiProperty()
  invitation_code!: string;
}

export class UnsubscribeUserDTO {
  @ApiProperty()
  user_id!: string;
}

export class AddQuizDTO {
  @ApiProperty()
  quiz_id!: string;
}
export class RankingDTO {
  @ApiProperty()
  user_id!: string;

  @ApiProperty()
  answered_questions!: number;

  @ApiProperty()
  correct_answers!: number;
}

export class ScoreDTO {
  @ApiProperty()
  user_id!: string;

  user_name!: string;

  score!: number;
}
