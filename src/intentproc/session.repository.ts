const uuid = require('uuid');

export class SessionRepository {


    private storeUserIdToSs: {[key: string]: string} = {};

    public async get(userId: string): Promise<string> {
        return this.storeUserIdToSs[userId];
    }

    public async reset(userId: string): Promise<string> {
        const ss = uuid.v4();
        this.storeUserIdToSs[userId] = ss;
        return ss;
    }
}