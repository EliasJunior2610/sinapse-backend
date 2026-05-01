import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from '../apps/app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from '../courses/course.module';
import { SemesterModule } from '../semesters/semester.module';
import { SubjectModule } from '../subjects/subject.module';
import { UserModule } from '../users/user.module';
import { QuizModule } from '../quizzes/quiz.module';
import { AuthMiddleware } from 'src/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CourseModule,
    UserModule,
    SemesterModule,
    QuizModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users/forgotPassword', method: RequestMethod.POST },
      )
      .forRoutes('users', 'semesters', 'subjects', 'quizzes');
  }
}
