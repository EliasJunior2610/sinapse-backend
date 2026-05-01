import { Module } from '@nestjs/common';
import { SubjectController } from 'src/subjects/subject.controller';
import { SubjectService } from 'src/subjects/subject.service';
import { SubjectRepository } from 'src/subjects/subject.repository';
import { UserRepository } from 'src/users/user.repository';
import { QuizRepository } from 'src/quizzes/quiz.repository';
import { CourseRepository } from 'src/courses/course.repository';

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
