import { Module } from '@nestjs/common';
import { SemesterController } from 'src/controllers/semester.controller';
import { SemesterService } from 'src/services/semester.service';
import { SemesterRepository } from 'src/repositories/semester.repository';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  controllers: [SemesterController],
  providers: [SemesterService, SemesterRepository, UserRepository],
})
export class SemesterModule {}
