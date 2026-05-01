import { Module } from '@nestjs/common';
import { QuizController } from 'src/quizzes/quiz.controller';
import { QuizService } from 'src/quizzes/quiz.service';
import { QuizRepository } from 'src/quizzes/quiz.repository';
import { SubjectRepository } from 'src/subjects/subject.repository';

import { QuizGateway } from 'src/quizzes/quiz.gateway';
import { DuelService } from './duel.service';
import { DuelState } from 'src/quizzes/duel.state';

@Module({
  controllers: [QuizController],
  providers: [
    QuizService,
    QuizRepository,
    SubjectRepository,
    DuelService,
    DuelState,
    QuizGateway,
  ],
})
export class QuizModule {}
