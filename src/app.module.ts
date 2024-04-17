import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SlackModule } from 'nestjs-slack';
import { SlackController } from './slack/slack.controller';
import { ConfigModule } from '@nestjs/config';
import { CronJobModule } from './cronjob/cronjob.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    SlackModule.forRoot({ 
      isGlobal: true,
      token: process.env.SLACK_BOT_TOKEN,}),
    CronJobModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, SlackController],
})
export class AppModule {}
