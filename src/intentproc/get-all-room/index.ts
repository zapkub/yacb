import { Input, ResponseResolverVisitor } from '../response-resolver-visitor';

export class GetAllRoomIntent implements ResponseResolverVisitor {
    shouldVisit(input: Input): boolean {
        throw new Error("Method not implemented.");
    }
    visit(input: Input): Promise<import("@line/bot-sdk").Message> {
        throw new Error("Method not implemented.");
    }

}