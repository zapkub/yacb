import fetch from 'node-fetch';

interface Room {
    'roomId': number;
    'name': string;
    'adult': number;
    'children': number;
    'price': number;
    'breakfast': number;
    'swimming_pool': number;
    'fitness_room': number;
    'wifi': number;
    'parking': number;
}

export class FSTTBooking {

    private contestEndpoint = 'https://contest.thaifstt.org/api';
    private target(endpoint: string) {
        return `${this.contestEndpoint}${endpoint}`;
    }

    public postBooking() {

    }



    public async getAllRoom(): Promise<Room[]> {
        const resp = await fetch(this.target('/room'));
        const body = await resp.json();
        return body;
    }


}