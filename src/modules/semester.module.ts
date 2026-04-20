import { Module } from '@nestjs/common';
import { SemesterController } from 'src/controllers/semester.controller';
import { SemesterService } from 'src/services/semester.service';
import { SemesterRepository } from 'src/repositories/semester.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { CourseRepository } from 'src/repositories/course.repository';
import { SubjectRepository } from 'src/repositories/subject.repository';

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
