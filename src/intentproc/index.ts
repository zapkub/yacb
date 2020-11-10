import { } from '@line/bot-sdk';
import { Handler } from 'express';
import { DialogFlowIntentResolver } from '../adpaters/dialogflow';
import { LineMessageHandler } from '../adpaters/line';
import { Covid19CountryInfoResponseResolverVisitor } from './covid19-country-info';
import { Covid19SelfAssessmentResponseResolverVisitor } from './covid19-self-assessment-q1';
import { Input, ResponseResolverVisitor } from './response-resolver-visitor';
import { SessionRepository } from './session.repository';






export function getIntentProcessorHandler(): Handler {

    const lineMessageHandler = new LineMessageHandler();
    const dialogFlowIntentResolver = new DialogFlowIntentResolver();
    const sessionRepository = new SessionRepository();

    const responseResolverVisitors: ResponseResolverVisitor[] = [
        new Covid19CountryInfoResponseResolverVisitor(),
        new Covid19SelfAssessmentResponseResolverVisitor(),
    ];


    return async (req, res) => {

        /**
         * Resolve intent from intent resolver
         */


        const body = lineMessageHandler.parse(req);
        await Promise.all(body.events.map(async (event) => {
            if (event.type === 'message' && event.message.type === 'text') {
                console.log('line event :', event);
                let sessionId = await sessionRepository.get(event.source.userId);
                if(!sessionId) {
                    sessionId = await sessionRepository.reset(event.source.userId);
                }
                const intentResult = await dialogFlowIntentResolver.resolve(sessionId, event.message.text);
                const input: Input = {
                    intentResult,
                    sessionId,
                };
                console.log('resolved intent :', input);
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