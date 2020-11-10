import { } from '@line/bot-sdk';
import { Handler } from 'express';
import { DialogFlowIntentResolver } from '../adpaters/dialogflow';
import { LineMessageHandler } from '../adpaters/line';
import { WebhookClient } from 'dialogflow-fulfillment';
import { Input, ResponseResolverVisitor } from './response-resolver-visitor';
import { Covid19SelfAssessmentQ1ResponseResolverVisitor } from './covid19-self-assessment-q1-yes';




export function getFulfillmentProcessorHandler(): Handler {

    const dialogFlowIntentResolver = new DialogFlowIntentResolver();

    const responseResolverVisitors: ResponseResolverVisitor[] = [
        new Covid19SelfAssessmentQ1ResponseResolverVisitor(),
    ];

    return async (req, res) => {
        /**
         * Resolve intent from intent resolver
         */
        // Create an instance
        const agent = new WebhookClient({
            request: req,
            response: res
        });
        console.log(req.body);
        const input: Input = {
            queryResult: req.body.queryResult,
            agent
        };

        await Promise.all(responseResolverVisitors.map(async (visitor) => {
            if (!visitor.shouldFulfill(input)) {
                return;
            }
            await visitor.fulfill(input);
        }));


    };
}