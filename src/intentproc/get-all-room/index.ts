import { Message } from '@line/bot-sdk';
import { Input, ResponseResolverVisitor } from '../response-resolver-visitor';

export class GetAllRoomIntent implements ResponseResolverVisitor {
    public shouldVisit(input: Input): boolean {
        return input.intentResult.action === 'get-all-room';
    }
    public visit(input: Input): Promise<Message> {
            return {};
    }

}