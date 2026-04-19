import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CourseResponseDTO {
  @ApiProperty()
  _id!: Types.ObjectId;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  semesters_ids?: string[];
}

export class CreateCourseDTO {
  @ApiProperty()
  user_id!: string;

  @ApiProperty()
  name!: string;
}

export class UpdateCourseDTO {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  semesters_ids?: string[];
}

export class UpdateCourseControllerBodyDTO {
  @ApiProperty()
  user_id!: string;

  @ApiProperty()
  updated_course!: Partial<UpdateCourseDTO>;
}

export class DeleteCourseDTO {
  @ApiProperty()
  user_id!: string;
}
