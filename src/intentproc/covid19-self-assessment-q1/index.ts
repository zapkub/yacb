import { google } from '@google-cloud/dialogflow/build/protos/protos';
import { Message } from '@line/bot-sdk';
import { Input, ResponseResolverVisitor } from '../response-resolver-visitor';



interface Parameters {
    country?: google.protobuf.IValue;
}

export class Covid19SelfAssessmentResponseResolverVisitor implements ResponseResolverVisitor {


    constructor() {

    }

    public shouldVisit(params: Input) {
        return params.intentResult.action === 'covid19-self-assessment-question-1';
    }

    public async visit(params: Input): Promise<Message> {

        const intentParams: Parameters = params.intentResult.parameters.fields;
        return {type: 'text', text: params.intentResult.fulfillmentText};
    }

}