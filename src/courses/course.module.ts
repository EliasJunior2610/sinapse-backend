import { Module } from '@nestjs/common';
import { CourseController } from 'src/courses/course.controller';
import { CourseService } from 'src/courses/course.service';
import { CourseRepository } from 'src/courses/course.repository';
import { SubjectRepository } from 'src/subjects/subject.repository';
import { UserRepository } from 'src/users/user.repository';

@Module({
  controllers: [CourseController],
  providers: [
    CourseService,
    CourseRepository,
    SubjectRepository,
    UserRepository,
  ],
})
export class CourseModule {}
