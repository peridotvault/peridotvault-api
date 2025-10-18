import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { hostname } from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      // Tambahkan domain production nanti, misal:
      // 'https://studio.peridotvault.com',
    ],
    credentials: true, // karena pakai cookie
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use(cookieParser('RAHASIA'));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
