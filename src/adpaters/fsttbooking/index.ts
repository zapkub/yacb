import fetch from 'node-fetch';

export interface Room {
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

interface BookingInput {
    roomName: string; start: string; end: string; payment: 'cash' | 'credit';
}

interface BookingOutput {
    success: boolean; bookingId: number;
}

interface CancelBookingInput {
    bookingId: string;
}
interface CancelBookingOutput {
    success: boolean;
}

export class FSTTBooking {

    private contestEndpoint = 'https://contest.thaifstt.org/api';
    private teamId = '1003';
    private target(endpoint: string) {
        return `${this.contestEndpoint}${endpoint}`;
    }

    public async postBooking({ start, end, payment, roomName }: BookingInput): Promise<BookingOutput> {
        const resp = await fetch(this.target('/booking'), {
            method: 'post',
            body: JSON.stringify({
                start, end,
                teamId: this.teamId,
                payment,
                roomName,
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const body = await resp.json();

        return {
            success: resp.status === 200 && body.message === 'Booking success',
            bookingId: body.data?.bookingId,
        };

    }

    public async cancelBooking(input: CancelBookingInput): Promise<CancelBookingOutput> {
        const resp = await fetch(this.target('/bookCancel'), {
            method: 'put',
            body: JSON.stringify({
                teamId: this.teamId,
                bookingId: input.bookingId,
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const body = await resp.json();

        return {
            success: resp.status === 200 && body.message === 'Book Cancel'
        };
    }


    public async findAvaliableRoom(input: {
        start: string,
        end: string,
        priceHigh?: number,
        adult?: number,
        children?: number,
        breakfask?: number,
        swimmingPool?: boolean,
        fitness?: boolean,
        wifi?: boolean,
        parking?: boolean,
        page?: number,
    }): Promise<{rooms: Room[], total: number}> {
        const resp = await fetch(this.target('/roomAvaliable'), {
            method: 'post',
            body: JSON.stringify({ ...input, }),
            headers: { 'Content-Type': 'application/json' }
        });
        const body = await resp.json();
        if (typeof input.page !== 'number') {
            input.page = 0;
        }
        return {
            rooms: body.data.filter((d: Room, i: number) => {
                const from = (input.page * 10);
                const to = (input.page + 1) * 10;
                console.log(i, from, to);
                return i > from && i < to;
            }),
            total: body.data.length,
        };
    }

    public async getAllRoom(): Promise<Room[]> {
        const resp = await fetch(this.target('/room'));
        const body = await resp.json();
        return body;
    }


}