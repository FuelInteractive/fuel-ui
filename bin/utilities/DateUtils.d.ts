export declare class DateRange {
    start: Date;
    end: Date;
    constructor(start: Date, end: Date);
    containsDate(date: Date): boolean;
    numberOfNights(): number;
    dateArray(): Date[];
    weekArray(): Date[][];
}
