import { Module } from '@nestjs/common';
import { QuizController } from 'src/controllers/quiz.controller';
import { QuizService } from 'src/services/quiz.service';
import { QuizRepository } from 'src/repositories/quiz.repository';
import { SubjectRepository } from 'src/repositories/subject.repository';

import { QuizGateway } from 'src/gateways/quiz.gateway';
import { DuelService } from 'src/services/duel.service';
import { DuelState } from 'src/states/duel.state';

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
