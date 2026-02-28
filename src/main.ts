import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import SwaggerUI from 'swagger-ui';

console.log(process.env.PORT);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  // SwaggerUI({
  //   dom_id: '#myDomId',
  // });
}
bootstrap();
