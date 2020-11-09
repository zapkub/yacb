import { SessionsClient } from '@google-cloud/dialogflow';
import { config } from '../../config';
const uuid = require('uuid');

export class DialogFlowIntentResolver {


    private sessionClient = new SessionsClient();

    constructor() {
        console.log(`bootstraping dialogflow intent resolver... (lang=${config.dialogFlowLanguageCode})`);
    }

    public async resolve(sessionId: string = uuid.v4(), message: string) {
        const sessionPath = this.sessionClient.projectAgentSessionPath(config.dialogFlowProjectId, sessionId);
        const responses = await this.sessionClient.detectIntent({
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: config.dialogFlowLanguageCode,
                }
            }
        });



        return responses[0].queryResult;
    }

}