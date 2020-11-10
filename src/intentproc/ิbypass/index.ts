import { Message } from '@line/bot-sdk';
import { Input, ResponseResolverVisitor } from '../response-resolver-visitor';

export class BypassResultResolverVisitor implements ResponseResolverVisitor {
    shouldVisit(input: Input): boolean {
        return input.intentResult.action === '';
    }
    async visit(input: Input): Promise<Message | Message[] > {
        return {
            type: 'text',
            text: input.intentResult.fulfillmentText,
        };
    }

}