import { Module } from '@nestjs/common';
import { SemesterController } from 'src/semesters/semester.controller';
import { SemesterService } from 'src/semesters/semester.service';
import { SemesterRepository } from 'src/semesters/semester.repository';
import { UserRepository } from 'src/users/user.repository';
import { CourseRepository } from 'src/courses/course.repository';
import { SubjectRepository } from 'src/subjects/subject.repository';

@Module({
  controllers: [SemesterController],
  providers: [
    SemesterService,
    SemesterRepository,
    UserRepository,
    CourseRepository,
    SubjectRepository,
  ],
})
export class SemesterModule {}
