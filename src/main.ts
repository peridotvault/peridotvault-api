import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { hostname } from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('RAHASIA'));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
