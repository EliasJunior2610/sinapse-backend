import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;

  @ApiProperty()
  paying!: boolean;

  @ApiProperty()
  type!: 'Admin' | 'Teacher' | 'Student';

  @ApiProperty()
  answered_questions!: number;

  @ApiProperty()
  points!: number;

  @ApiProperty()
  course_id: string | undefined;
}

export class UserResponseDTO {
  @ApiProperty()
  _id!: Types.ObjectId;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  paying!: boolean;

  @ApiProperty()
  type!: 'Admin' | 'Teacher' | 'Student';

  @ApiProperty()
  answered_questions!: number;

  @ApiProperty()
  points!: number;

  @ApiProperty()
  course_id: string | undefined;
}

export class CreateUserDTO {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;
}

export class LoginDTO {
  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;
}

export class LoggedUserDTO {
  @ApiProperty()
  token!: string;

  @ApiProperty()
  _id!: Types.ObjectId;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  paying!: boolean;

  @ApiProperty()
  type!: 'Admin' | 'Teacher' | 'Student';

  @ApiProperty()
  answered_questions!: number;

  @ApiProperty()
  points!: number;

  @ApiProperty()
  course_id: string | undefined;
}

export class UserIdDTO {
  @ApiProperty()
  userId!: string;
}

export class ForgotPasswordDTO {
  @ApiProperty()
  email!: string;
}

export class RankingDTO {
  @ApiProperty()
  _id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  points!: number;
}

export class MakeTeacherDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  courseId!: string;
}
