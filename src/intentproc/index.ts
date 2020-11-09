import { } from '@line/bot-sdk';
import { Handler } from 'express';
import { DialogFlowIntentResolver } from '../adpaters/dialogflow';
import { LineMessageHandler } from '../adpaters/line';
import { Covid19CountryInfoResponseResolverVisitor } from './covid19-country-info';
import { Input, ResponseResolverVisitor } from './response-resolver-visitor';






export function getIntentProcessorHandler(): Handler {

    const lineMessageHandler = new LineMessageHandler();
    const dialogFlowIntentResolver = new DialogFlowIntentResolver();

    const responseResolverVisitors: ResponseResolverVisitor[] = [
        new Covid19CountryInfoResponseResolverVisitor(),
    ];


    return async (req, res) => {

        /**
         * Resolve intent from intent resolver
         */


        const body = lineMessageHandler.parse(req);
        await Promise.all(body.events.map(async (event) => {
            if (event.type === 'message' && event.message.type === 'text') {
                const intentResult = await dialogFlowIntentResolver.resolve(undefined, event.message.text);
                const input: Input = {
                    intentResult,
                    sessionId: '',
                };
                await Promise.all(responseResolverVisitors.map(async (visitor) => {
                    if (!visitor.shouldVisit(input)) {
                        return;
                    }
                    const responseMessage = await visitor.visit(input);
                    await lineMessageHandler.responseTextMessage(event.replyToken, responseMessage);
                }));

            }
        }));

    };
}