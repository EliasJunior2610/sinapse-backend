import { Module } from '@nestjs/common';
import { UserController } from 'src/users/user.controller';
import { UsersService } from 'src/users/user.service';
import { UserRepository } from 'src/users/user.repository';
import { SubjectRepository } from 'src/subjects/subject.repository';
import { CourseRepository } from 'src/courses/course.repository';

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
