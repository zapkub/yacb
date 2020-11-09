import { google } from '@google-cloud/dialogflow/build/protos/protos';
import { Message } from '@line/bot-sdk';
import { DataGovTHService } from '../../adpaters/datagovth';
import { Input, ResponseResolverVisitor } from '../response-resolver-visitor';



interface Parameters {
    country?: google.protobuf.IValue;
}

export class Covid19CountryInfoResponseResolverVisitor implements ResponseResolverVisitor {


    private retrieveThailandPatience() {

    }

    private dataGovTHService = new DataGovTHService();

    constructor() {

    }

    public shouldVisit(params: Input) {
        return params.intentResult.action === 'covid19-country-info';
    }

    public async visit(params: Input): Promise<Message> {

        const intentParams: Parameters = params.intentResult.parameters.fields;
        const total = await this.dataGovTHService.retrieveCovidTotalInflected();

        return {
            type: 'flex',
            contents: {
                type: 'bubble',
                direction: 'ltr',
                header: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                        {
                            type: 'text',
                            text: `จำนวนผู้ติดเชื้อ ${intentParams.country.stringValue}`,
                            align: 'start',
                            contents: []
                        }
                    ]
                },
                body: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                        {
                            type: 'text',
                            text: `ติดเชื้อสะสม ${total} ราย`,
                            align: 'start',
                            contents: []
                        }
                    ]
                },
                footer: {
                    type: 'box',
                    layout: 'horizontal',
                    contents: [
                        {
                            type: 'text',
                            text: 'แหล่งที่มาข้อมูล data.go.th อัพเดทล่าสุด 9 พฤศจิกายน 2563',
                            wrap: true,
                            contents: [],
                            size: 'xs'
                        }
                    ]
                }
            },
            altText: `ยอดผู้ติดเชื้อสะสม ${intentParams.country.stringValue} จำนวน ${total} ราย`,
        };
    }

}