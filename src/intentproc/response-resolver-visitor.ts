import { google } from '@google-cloud/dialogflow/build/protos/protos';
import { Message } from '@line/bot-sdk';



export type Input  = {
    sessionId?: string
    intentResult: google.cloud.dialogflow.v2.IQueryResult

};
export interface ResponseResolverVisitor {

    shouldVisit(input: Input): boolean;
    visit(input: Input): Promise<Message>;

}