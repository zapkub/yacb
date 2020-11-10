export class BookingRepository {
    private userBooking: {[key: string]: number[]} = {};

    public add(userId: string, bookId: number) {
        if (typeof this.userBooking[userId] === 'undefined') {
            this.userBooking[userId] = [];
        }
        this.userBooking[userId].push(bookId);
    }

    public cancel(userId: string, bookId: number) {
        if (!this.userBooking[userId]) {
            return;
        }

        this.userBooking[userId] =  this.userBooking[userId].filter((b) => b !== bookId);
    }

}