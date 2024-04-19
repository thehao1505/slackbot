import { Injectable } from '@nestjs/common';
import { SlackService } from 'nestjs-slack';
import CronJobService from 'src/cronjob/cronjob.service';
import axios from 'axios';
import { PrismaService } from 'nestjs-prisma';
import { WebClient } from '@slack/web-api';

@Injectable()
export class TechnewsService {
  constructor(
    private prisma: PrismaService,
    private slackService: SlackService,
    private cronJobService: CronJobService,
  ) {}

  onModuleInit() {
    this._10news();
    this._10coins();
  }

  // Create a new function to delete tech news expired after 30 days

  private async _10coins() {
    try {
      const resMarcap = await axios({
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      });

      const coins = await resMarcap.data;

      console.log(coins.map((coin: any) => 
        `Name: ${coin.name}\nSymbol: ${coin.symbol}\nPrice: $${coin.current_price}\nMarket Cap: ${coin.market_cap}\n`).join('\n'))

      // this.cronJobService.addCronjob(
      //   'top10coinsOfTheDay',
      //   '*/30 * * * * *',
      //   async () => await ((this.slackService as any).client as WebClient).chat.postMessage({
      //     channel: process.env.SLACK_CHANNEL,
      //     text: coins.map((coin: any) => {
      //       `Name: ${coin.name}\n
      //       Symbol: ${coin.symbol}\n
      //       Price: ${coin.current_price}\n
      //       Market Cap: ${coin.market_cap}\n\n`
      //     }).join('\n')
      //   })
      // )
    } catch (error) {
      console.log(error);
    }
  }

  private async _10news() {
    try {
      const resNews = await axios({
        method: 'GET',
        url: 'https://dev.to/api/articles/latest?per_page=10',
      });

      await Promise.all(resNews.data.map(async (article: any) => {
        await this.prisma.techNews.create({
          data: {
            title: article.title,
            url: article.url,
            description: article.description,
            articleId: article.id,
            thumbnail_url: article.social_image,
          }
        })
      }));
      
      const news = await Promise.all(await this.prisma.techNews.findMany({
        orderBy: {
          id: 'desc',
        },
        take: 10,
      }));

      console.log(news.map((artcl, i) => `${i+1}. ${artcl.title}\n${artcl.description}\n${artcl.url}\n`).join('\n'));

    // this.cronJobService.addCronjob(
    //     'top10TechNewsOfTheDay',
    //     '*/30 * * * * *',
    //     // this._startDay.bind(this),
    //   async () => await ((this.slackService as any).client as WebClient).chat.postMessage({
    //     channel: process.env.SLACK_CHANNEL,
    //     text: news.map((artcl, i) => `${i+1}.\n${artcl.title}\n${artcl.description}\n${artcl.url}\n\n`).join('\n')
    //   })
    // );
    } catch (error) {
      console.log(error);
    }
  }
}
