import { Module } from '@nestjs/common';
import { QuizController } from 'src/controllers/quiz.controller';
import { QuizService } from 'src/services/quiz.service';
import { QuizRepository } from 'src/repositories/quiz.repository';

@Module({
  controllers: [QuizController],
  providers: [QuizService, QuizRepository],
})
export class QuizModule {}
