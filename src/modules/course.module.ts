import { Module } from '@nestjs/common';
import { CourseController } from 'src/controllers/course.controller';
import { CourseService } from 'src/services/course.service';
import { CourseRepository } from 'src/repositories/course.repository';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  controllers: [CourseController],
  providers: [CourseService, CourseRepository, UserRepository],
})
export class CourseModule {}
