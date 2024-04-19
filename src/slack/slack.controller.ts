import { Controller, Post, Req, Res } from '@nestjs/common';

@Controller('slack')
export class SlackController {
  @Post('commands')
  async handleCommand(@Req() req, @Res() res) {
    const { text, user_id } = req.body;
    // Xử lý logic của command tại đây
    const response = `Hello, <@${user_id}>! You entered: ${text}`;

    const inChannelResponse = {
      response_type: 'in_channel',
      text: response,
    };

    // Gửi tin nhắn "message"
    const messageResponse = {
      response_type: 'message',
      text: response,
    };

    return res.json(inChannelResponse);
    // return res.send(response);
  }
}