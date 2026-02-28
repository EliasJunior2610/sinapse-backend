import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
// import SwaggerUI from 'swagger-ui';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  // SwaggerUI({
  //   dom_id: '#myDomId',
  // });
}
bootstrap();
