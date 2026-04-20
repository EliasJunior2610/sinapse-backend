import { Module } from '@nestjs/common';
import { QuizController } from 'src/controllers/quiz.controller';
import { QuizService } from 'src/services/quiz.service';
import { QuizRepository } from 'src/repositories/quiz.repository';
import { SubjectRepository } from 'src/repositories/subject.repository';

@Module({
  controllers: [QuizController],
  providers: [QuizService, QuizRepository, SubjectRepository],
})
export class QuizModule {}
