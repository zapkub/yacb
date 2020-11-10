import { google } from '@google-cloud/dialogflow/build/protos/protos';
import { Message } from '@line/bot-sdk';
import { Input, ResponseResolverVisitor } from '../response-resolver-visitor';
import { WebhookClient } from 'dialogflow-fulfillment';


interface Parameters {
    country?: google.protobuf.IValue;
}

export class Covid19SelfAssessmentQ1ResponseResolverVisitor implements ResponseResolverVisitor {


    constructor() {

    }

    public shouldFulfill(params: Input) {
        return params.queryResult.action === 'covid19-self-assessment-question-1.covid19-self-assessment-question-1-yes';
    }

    public async fulfill(params: Input): Promise<void> {

        function maybe(agent: { add: (arg0: string) => void; }) {
            agent.add('หรือว่าอาจจะเป็นโควิดนะ');
        }

        const intentMap = new Map();
        intentMap.set('covid19-self-assessment-question-1 - yes', maybe);
        params.agent.handleRequest(intentMap);

        // to fire another event
        params.agent.setFollowupEvent({name: 'covid19-self-assessment-question-2', parameters: {risk_score: '10'}});
    }

}