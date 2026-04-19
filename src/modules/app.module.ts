import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './course.module';
import { SemesterModule } from './semester.module';
import { SubjectModule } from './subject.module';
import { UserModule } from './user.module';
import { QuizModule } from './quiz.module';
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
