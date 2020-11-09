require('dotenv').config({});
export const config = {
    dialogFlowProjectId: process.env.DIALOG_FLOW_PROJECT_ID,
    dialogFlowLanguageCode: process.env.DIALOGFLOW_LANGUAGE_CODE,
    lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    googleCloudCredentialPath: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    port: process.env.PORT || 19002,
    dataGovTHApiKey: process.env.DATA_GOV_TH_API_KEY,
};
