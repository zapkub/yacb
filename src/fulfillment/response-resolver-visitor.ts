import { google } from '@google-cloud/dialogflow/build/protos/protos';
import { WebhookClient } from 'dialogflow-fulfillment';

export type Input  = {
    agent: WebhookClient
    queryResult: google.cloud.dialogflow.v2.IQueryResult

};
export interface ResponseResolverVisitor {

    shouldFullfill(input: Input): boolean;
    fullfill(input: Input): Promise<void>;

}