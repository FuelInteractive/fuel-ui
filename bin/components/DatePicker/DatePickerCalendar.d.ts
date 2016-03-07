import { EventEmitter, OnInit } from 'angular2/core';
export declare class DatePickerCalendar implements OnInit {
    weeks: string[][];
    currentMonth: Date;
    selectedDate: Date;
    selectedDateChange: EventEmitter<Date>;
    dateTarget: boolean;
    startDate: Date;
    endDate: Date;
    minDate: Date;
    maxDate: Date;
    dateFilter: (d: Date) => boolean;
    showMonth: boolean;
    constructor();
    ngOnInit(): void;
    checkSelectable(date: string): boolean;
    checkSelectedDate(date: string): boolean;
    checkStartDate(date: string): boolean;
    checkEndDate(date: string): boolean;
    selectDate(date: string): void;
    buildWeeks(date: Date): void;
}
