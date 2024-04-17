import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron';

@Injectable()
class CronJobService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  addCronjob(
    name: string, 
    cronExpression: string | Date,
    callback: () => void
  ) {
    const job = new CronJob(cronExpression, callback);

    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }
}

export default CronJobService;