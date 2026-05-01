import { Module } from '@nestjs/common';
import { SubjectController } from 'src/controllers/subject.controller';
import { SubjectService } from 'src/services/subject.service';
import { SubjectRepository } from 'src/repositories/subject.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { QuizRepository } from 'src/repositories/quiz.repository';
import { CourseRepository } from 'src/repositories/course.repository';

@Module({
  controllers: [SubjectController],
  providers: [
    SubjectService,
    SubjectRepository,
    UserRepository,
    QuizRepository,
    CourseRepository,
  ],
})
export class SubjectModule {}
