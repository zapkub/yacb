import { google } from '@google-cloud/dialogflow/build/protos/protos';
import { Message, TemplateCarousel, TemplateColumn } from '@line/bot-sdk';
import { FSTTBooking, Room } from '../../adpaters/fsttbooking';
import { Input, ResponseResolverVisitor } from '../response-resolver-visitor';

function getRoomImage(roomType: string) {
    return 'https://f.ptcdn.info/279/059/000/pdpz1u49wKyQogMrpsk-o.jpg';
}

interface Parameters {
    night?: google.protobuf.IValue;
    begin_date?: google.protobuf.IValue;
    end_date?: google.protobuf.IValue;
    adult?: google.protobuf.IValue;
    child?: google.protobuf.IValue;

    page?: google.protobuf.IValue;
}

export class FindAvailableRoomVisitor implements ResponseResolverVisitor {

    private fsttbookingService = new FSTTBooking();

    public shouldVisit(input: Input): boolean {
        return input.intentResult.action === 'find-available-room';
    }

    private createCarouselFromRoom(room: Room[]): TemplateCarousel {
        return {
            type: 'carousel',
            imageSize: 'cover',
            imageAspectRatio: 'rectangle',
            columns: room.map<TemplateColumn>((r) => {
                return {
                    thumbnailImageUrl: getRoomImage(r.name),
                    title: r.name,
                    text: `ราคา ${r.price} บาทต่อคืน`,
                    actions: [
                        {
                            type: 'message',
                            label: 'จองเลย!',
                            text: `ตกลงเลือก ${r.name}`
                        }
                    ]
                };
            })
        };
    }

    public async visit(input: Input): Promise<Message | Message[]> {
        const params: Parameters = input.intentResult.outputContexts[input.intentResult.outputContexts.length - 1].parameters.fields;
        console.log(JSON.stringify(params, null, 2));
        const page = params.page?.numberValue || 0;
        const startdate = new Date(params.begin_date.stringValue);
        const enddate = new Date(startdate.getTime() + (1000 * 60 * 60 * 24 * params.night.numberValue));

        const findRoomInput = {
            start: params.begin_date.stringValue.split('T')[0],
            end: enddate.toISOString().split('T')[0],
        };
        console.log('Find room with input', JSON.stringify(findRoomInput, null, 2));
        const { rooms, total } = await this.fsttbookingService.findAvaliableRoom(findRoomInput);

        const items = rooms.filter((_, i) => {
            return i > (page * 10) && i < ((page + 1) * 10);
        }).map<Message>((d) => {
            return {
                type: 'text',
                text: d.name,
            };
        });


        return [
            {
                text: input.intentResult.fulfillmentText,
                type: 'text'
            },
            {
                type: 'text',
                text: `ค้นพบ ${total} ผลลัพธ์`,
            },
            {
                type: 'template',
                altText: 'รายการผลลัพธ์ของบ้านพัก',
                template: this.createCarouselFromRoom(rooms)
            },
            {
                type: 'text',
                text: `ดูเพิ่มเติม พิมพ์ว่า หน้าถัดไปได้เลยครับ`,
            },

        ];
    }

}