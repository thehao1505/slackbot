require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { CronJob } from 'cron';
import { WebClient } from '@slack/web-api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Đăng ký SlackController

  await app.listen(3000);
  console.log('Slack bot slash command is running!');

  // const job = new CronJob('*/5 * * * * *', async () => {
  //   // Tạo một Slack Web API client với API token của bot
  //   const web = new WebClient(process.env.SLACK_BOT_TOKEN);

  //   // Gửi tin nhắn tới một channel cụ thể
  //   const channel = 'C06TTKQLYEN';
  //   // await web.chat.postMessage({ channel, text: `Xin chào! Bây giờ là ${Date.now()}` });
  // });

  // job.start();
}
bootstrap();
