import { ApiProperty } from '@nestjs/swagger';

export class QuizDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  user_id: string; // quiz creator
  @ApiProperty()
  questions?: {
    question: string;
    possible_answers?: string[]; // when there are multiple choices
    answer?: number[]; // when there are multiple choices
    boolean_answer?: boolean; // when it's a boolean question
  }[];
  @ApiProperty()
  categories_ids?: string[];
}

export class QuizResponseDTO {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  user_id: string; // quiz creator
  @ApiProperty()
  questions: {
    question: string;
    possible_answers?: string[]; // when there are multiple choices
    answer?: number[]; // when there are multiple choices
    boolean_answer?: boolean; // when it's a boolean question
  }[];
  @ApiProperty()
  categories_ids?: string[];
}

export class QuestionDTO {
  @ApiProperty()
  question: string;
  @ApiProperty()
  possible_answers?: string[]; // when there are multiple choices
  @ApiProperty({ type: [Number], required: false })
  answer?: number[]; // when there are multiple choices
  @ApiProperty()
  boolean_answer?: boolean; // when it's a boolean question
}
