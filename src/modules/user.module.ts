import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { UsersService } from 'src/services/user.service';
import { UserRepository } from 'src/repositories/user.repository';
import { SubjectRepository } from 'src/repositories/subject.repository';
import { CourseRepository } from 'src/repositories/course.repository';

@Module({
  controllers: [UserController],
  providers: [
    UsersService,
    UserRepository,
    SubjectRepository,
    CourseRepository,
  ],
})
export class UserModule {}
