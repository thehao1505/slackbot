require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Đăng ký SlackController

  await app.listen(3000);
  console.log('Slack bot slash command is running!');
}
bootstrap();
