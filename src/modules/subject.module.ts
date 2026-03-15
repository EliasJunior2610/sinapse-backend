import { Module } from '@nestjs/common';
import { SubjectController } from 'src/controllers/subject.controller';
import { SubjectService } from 'src/services/subject.service';
import { SubjectRepository } from 'src/repositories/subject.repository';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepository, UserRepository],
})
export class SubjectModule {}
