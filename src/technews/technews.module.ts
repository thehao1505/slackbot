import { Module } from '@nestjs/common';
import { CronJobModule } from 'src/cronjob/cronjob.module';
import { TechnewsService } from './technews.service';

@Module({
  imports: [CronJobModule],
  providers: [TechnewsService],
  exports: [TechnewsService],
})
export class TechnewsModule {}
