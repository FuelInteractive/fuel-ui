import {Component, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {AfterContentInit, AfterContentChecked} from "@angular/core";
import {EventEmitter, ElementRef, ViewChild, ViewChildren,ContentChild,QueryList} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {DateRange} from "../../utilities/DateUtils";
import {MobileDetection} from "../../utilities/DetectionUtils";
import {DatePicker} from "./DatePicker";
import {DatePickerCalendar} from "./DatePickerCalendar";
import {InfiniteScroller, INFINITE_SCROLLER_PROVIDERS} from "../InfiniteScroller/InfiniteScroller";

export class DateRangePickerDateField {
    @Input() placeholder: string;
    
    private _value = "";
    
    @Input() 
    get value(): string {return this._value;}
    set value(value: string) {
        this._value = value;
        this.valueChange.next(value);
    }
    @Output() valueChange = new EventEmitter<string>();
    
    @Output() select = new EventEmitter<MouseEvent>();
    
    selected(event: MouseEvent): void {
        this.select.next(event);
    }
}

@Component({
    selector: "start-date",
    templateUrl: 'components/DatePicker/DateRangePickerDate.html'
})
export class StartDateField extends DateRangePickerDateField {
    
}

@Component({
    selector: "end-date",
    templateUrl: 'components/DatePicker/DateRangePickerDate.html'
})
export class EndDateField extends DateRangePickerDateField {
    
}

@Component({
    selector: "date-range-picker",
    templateUrl: 'components/DatePicker/DateRangePicker.html',
    directives: [DatePickerCalendar, INFINITE_SCROLLER_PROVIDERS, CORE_DIRECTIVES, FORM_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangePicker extends DatePicker implements AfterContentInit {
    @Output() valueChange = new EventEmitter();
    @Input()
    set value(value: any) {
        this._selectedDate = this.handleRangeInput(value).start;
    }

    @Input()
    set minDate(value: Date | string) {
        this._minDate = this.handleDateInput(value);
    }
    get minDate(): Date | string { return this._minDate; };

    @Input()
    set maxDate(value: Date | string) {
        this._maxDate = this.handleDateInput(value);
    }
    get maxDate(): Date | string { return this._maxDate; }

    @Input() dateFilter: (d: Date) => boolean;

    @ViewChild(InfiniteScroller)
    calendarScroller: InfiniteScroller;
    
    @ContentChild(StartDateField)
    startDateField: StartDateField;
    @ContentChild(EndDateField)
    endDateField: EndDateField;

    private _dateTarget: boolean = false;
    calendarHeight: string = MobileDetection.isAny() || window.innerWidth <= 480 || window.outerWidth <= 480 ? "auto" : "300px";

    get selectedDate(): Date { return this._selectedDate };
    set selectedDate(value: Date) {
        this._selectedDate = value;

        if ((this._dateTarget && this.startDate != null && value < this.startDate)
            || !this._dateTarget && this.endDate != null && value > this.endDate)
            this._dateTarget = !this._dateTarget;

        if (!this._dateTarget) {
            this.inputStartDate = value.toLocaleDateString();
            this.startDate = value;
            if (this.startDateChange != null)
                this.startDateChange.next(this._startDate);
        }
        else {
            this.inputEndDate = value.toLocaleDateString();
            this.endDate = value;
            this.hideCalendar();
            if (this.endDateChange != null)
                this.endDateChange.next(this._endDate);
        }

        this._dateTarget = !this._dateTarget;

        if (this.startDate != null && this.endDate != null) {
            let startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
            let endDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());

            this.valueChange.next(new DateRange(startDate, endDate));
        }
        this.changeDetector.markForCheck();
    }

    private _startDate: Date;
    private _endDate: Date;

    @Output() startDateChange = new EventEmitter();
    @Input()
    set startDate(value: any) {
        this._startDate = this.handleDateInput(value);
        this.inputStartDate = this._startDate.toLocaleDateString();
    }
    get startDate(): any { return this._startDate; }

    @Output() endDateChange = new EventEmitter();
    @Input()
    set endDate(value: any) {
        this._endDate = this.handleDateInput(value);
        this.inputEndDate = this._endDate.toLocaleDateString();
    }
    get endDate(): any { return this._endDate; }

    get inputStartDate(): string { return this.startDateField.value; };
    set inputStartDate(value: string) {
        this.startDateField.value = value;
        this._selectedDate = new Date(value);
        this.changeDetector.markForCheck();
    }

    get inputEndDate(): string { return this.endDateField.value; };
    set inputEndDate(value: string) {
        this.endDateField.value = value;
        this._selectedDate = new Date(value);
        this.changeDetector.markForCheck();
    }

    constructor(changeDetector: ChangeDetectorRef) {
        super(changeDetector);
    }

    ngAfterContentInit(): void {
        if(this.startDateField == undefined)
            throw "Fuel-UI Error: DateRangePicker missing start-date field";
        
        if(this.startDateField.value.length > 0)
            this.selectedDate = this.handleDateInput(this.startDateField.value);
        
        this.startDateField.select
            .subscribe((event: MouseEvent) => {
                this.toggleCalendar(event);
                this.focusStartDate();
            });
        
        if(this.endDateField == undefined)
            throw "Fuel-UI Error: DateRangePicker missing end-date field";
        
        if(this.endDateField.value.length > 0)
            this.selectedDate = this.handleDateInput(this.endDateField.value);
        
        this.endDateField.select
            .subscribe((event: MouseEvent) => {
                this.toggleCalendar(event);
                this.focusEndDate();
            });
    }

    handleRangeInput(value: any): DateRange {
        if (!(value instanceof DateRange))
            throw "DateRangePicker error: input is not of type DateRange";

        var range = <DateRange>value;

        this.startDate = range.start;
        this.endDate = range.end;
        return range;
    }

    focusStartDate(): void {
        this._dateTarget = false;
    }

    focusEndDate(): void {
        this._dateTarget = true;
    }

    checkStartDateTarget(): boolean {
        return !this._dateTarget;
    }

    checkEndDateTarget(): boolean {
        return this._dateTarget;
    }
}