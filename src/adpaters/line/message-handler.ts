import { Client, Message, WebhookRequestBody } from '@line/bot-sdk';
import { Request } from 'express';
import { config } from '../../config';


function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


export class LineMessageHandler {


    private lineClient: Client;

    constructor() {
        this.lineClient = new Client({
            channelAccessToken: config.lineChannelAccessToken,
        });
    }


    public parse(req: Request): WebhookRequestBody {
        return req.body;
    }

    public async responseTextMessage(replyToken: string, message: Message | Message[]) {
        try {
            const x = await this.lineClient.replyMessage(
                replyToken,
                message,
            );
            return x;
        } catch (e) {
            console.error(e.originalError.toJSON());
        }
    }



}