import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  paying: boolean;

  @ApiProperty()
  is_admin: boolean;

  @ApiProperty()
  answered_questions: number;

  @ApiProperty()
  points: number;

  // @ApiProperty()
  // token: string | undefined;
}

export class UserResponseDTO {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  paying: boolean;

  @ApiProperty()
  is_admin: boolean;

  @ApiProperty()
  answered_questions: number;

  @ApiProperty()
  points: number;
}

export class CreateUserDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoggedUserDTO {
  @ApiProperty()
  token: string;

  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  paying: boolean;

  @ApiProperty()
  is_admin: boolean;

  @ApiProperty()
  answered_questions: number;

  @ApiProperty()
  points: number;
}

export class UserIdDTO {
  @ApiProperty()
  userId: string;
}
