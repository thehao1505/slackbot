import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';

@Injectable()
export class SlackService {
  private webClient: WebClient;

  constructor() {
    this.webClient = new WebClient(process.env.SLACK_BOT_TOKEN);
  }

  async sendMessage(channel: string, text: string) {
    try {
      await this.webClient.chat.postMessage({
        channel,
        text,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
