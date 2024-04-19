import { Axios } from 'axios';
import { Module } from '@nestjs/common';
import { SlackModule } from 'nestjs-slack';
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CronJobModule } from './cronjob/cronjob.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TechnewsModule } from './technews/technews.module';
import { SlackController } from './slack/slack.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    SlackModule.forRoot({ 
      isGlobal: true,
      type: 'api',
      token: process.env.SLACK_BOT_TOKEN,
      defaultChannel: process.env.SLACK_CHANNEL,
    }),
    PrismaModule.forRoot({
        isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    CronJobModule,
    TechnewsModule,
    Axios,
  ],
  controllers: [AppController, SlackController],
})
export class AppModule {}
