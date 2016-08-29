import {Component, Directive, ChangeDetectionStrategy, ChangeDetectorRef, Renderer} from '@angular/core';
import {AfterContentInit, AfterContentChecked, OnInit} from "@angular/core";
import {EventEmitter, ElementRef, ViewChild, ContentChildren ,ContentChild,QueryList} from '@angular/core';
import {Input, Output, HostListener, HostBinding} from "@angular/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {DateRange, DateUtils, MobileDetection} from "../../utilities/utilities";
import {DatePicker} from "./DatePicker";
import {DatePickerCalendar} from "./DatePickerCalendar";
import {DatePickerField, DatePickerFieldStyler} from "./DatePickerField";
import {InfiniteScroller} from "../InfiniteScroller/InfiniteScroller";

@Directive({
    selector: "[startDateField],.start-date-field",
})
export class StartDateField {
    protected _date = new Date();

     @HostBinding("value")
    _value = "";
    
    @Input()
    set value(value: string) {
        if(value == this._value)
            return;
        
        this._value = value;
        this._date = DateUtils.handleDateInput(value);
        this.valueChange.next(value);
        this.ngModelChange.next(value);
        this.dateChange.next(this._date);
    }
    get value(): string {return this._value;}
    
    @Output() valueChange = new EventEmitter<string>();
    
    @Input()
    set ngModel(value: any) {
        this.value = value;
    }
    
    @Output()
    ngModelChange = new EventEmitter<any>();
    
    @Input()
    set date(date: Date) {
        if(date.getTime() == this._date.getTime())
            return;
            
        this._date = date;
        this._value = date.toLocaleDateString();
        this.dateChange.next(date);
        this.ngModelChange.next(this._value);
        this.valueChange.next(this._value);
    }
    get date(): Date {return this._date;}
    @Output() dateChange = new EventEmitter<Date>();
    
    @HostListener("input", ["$event.target.value"])
    inputChange(value: any): void {
        this.value = value;
    }
    
    @HostListener("focus", ["$event"])
    focused(event: Event): void {
        this.select.next(event);
    }
    
    @Output() select = new EventEmitter<MouseEvent>();
    @HostListener("click", ["$event"])
    selected(event: MouseEvent): void {
        this.select.next(event);
    }

    constructor(public element: ElementRef) {
        
    }
}

@Directive({
    selector: "[endDateField],.end-date-field",
})
export class EndDateField {
    protected _date = new Date();

     @HostBinding("value")
    _value = "";
    
    @Input()
    set value(value: string) {
        if(value == this._value)
            return;
        
        this._value = value;
        this._date = DateUtils.handleDateInput(value);
        this.valueChange.next(value);
        this.ngModelChange.next(value);
        this.dateChange.next(this._date);
    }
    get value(): string {return this._value;}
    
    @Output() valueChange = new EventEmitter<string>();
    
    @Input()
    set ngModel(value: any) {
        this.value = value;
    }
    
    @Output()
    ngModelChange = new EventEmitter<any>();
    
    @Input()
    set date(date: Date) {
        if(date.getTime() == this._date.getTime())
            return;
            
        this._date = date;
        this._value = date.toLocaleDateString();
        this.dateChange.next(date);
        this.ngModelChange.next(this._value);
        this.valueChange.next(this._value);
    }
    get date(): Date {return this._date;}
    @Output() dateChange = new EventEmitter<Date>();
    
    @HostListener("input", ["$event.target.value"])
    inputChange(value: any): void {
        this.value = value;
    }
    
    @HostListener("focus", ["$event"])
    focused(event: Event): void {
        this.select.next(event);
    }
    
    @Output() select = new EventEmitter<MouseEvent>();
    @HostListener("click", ["$event"])
    selected(event: MouseEvent): void {
        this.select.next(event);
    }

    constructor(public element: ElementRef) {        
    }
}

@Component({
    selector: "date-range-picker",
    //styleUrls: ["DatePicker.css"],
    templateUrl: 'DateRangePicker.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangePicker implements AfterContentInit {
    _minDate: Date = new Date(1900, 0, 1);
    _maxDate: Date = new Date(2200, 0, 1);
    _startDate: Date;
    _endDate: Date;
    _selectedDate: Date;
    _dateTarget: boolean = false;
    calendarDisplayed: boolean = false;
    calendarX: string = "5%";
    calendarY: string = "5%";
    calendarHeight: string = MobileDetection.isAny() || window.innerWidth <= 480 || window.outerWidth <= 480 ? "auto" : "300px";

    calendarMonths: Date[] = [];

    _preGenMonths = 2;

    changeDetector: ChangeDetectorRef;
    renderer: Renderer;

    initialScroll = true;

    @Output() valueChange = new EventEmitter<any>();
    @Input()
    set value(value: any) {
        this._selectedDate = this.handleRangeInput(value).start;
    }

    @Input()
    set minDate(value: Date | string) {
        this._minDate = DateUtils.handleDateInput(value);
    }
    get minDate(): Date | string { return this._minDate; };

    @Input()
    set maxDate(value: Date | string) {
        this._maxDate = DateUtils.handleDateInput(value);
    }
    get maxDate(): Date | string { return this._maxDate; }

    @Input() dateFilter: (d: Date) => boolean;

    @ViewChild(InfiniteScroller)
    calendarScroller: InfiniteScroller;
    
    @ContentChild(StartDateField)
    startDateField: StartDateField;
    @ContentChild(EndDateField)
    endDateField: EndDateField;
    
    @ContentChildren(DatePickerFieldStyler)
    dateFieldIcons: QueryList<DatePickerFieldStyler>;    

    get selectedDate(): Date { return this._selectedDate };
    set selectedDate(value: Date) {
        this.selectDate(value);
    }

    get inputStartDate(): string {
        return this.startDateField != null ? this.startDateField.value : "";
    }
    
    get inputEndDate(): string {
        return this.endDateField != null ? this.endDateField.value : "";
    }

    @Output() startDateChange = new EventEmitter();
    @Input()
    set startDate(value: any) {
        this._startDate = DateUtils.handleDateInput(value);
        if(this.startDateField != null)
            this.startDateField.value = this._startDate.toLocaleDateString();
    }
    get startDate(): any { return this._startDate; }

    @Output() endDateChange = new EventEmitter();
    @Input()
    set endDate(value: any) {
        this._endDate = DateUtils.handleDateInput(value);
        if(this.endDateField != null)
            this.endDateField.value = this._endDate.toLocaleDateString();
    }
    get endDate(): any { return this._endDate; }

    get canPrevMonth(): boolean {
        var currentDate = this.calendarMonths[0];
        var prevDate =
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        var compareDate =
            new Date(this._minDate.getFullYear(), this._minDate.getMonth());
        return prevDate >= compareDate;
    }

    get canNextMonth(): boolean {
        var currentDate = this.calendarMonths[this.calendarMonths.length - 1];
        var nextDate =
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        var compareDate =
            new Date(this._maxDate.getFullYear(), this._maxDate.getMonth());

        return nextDate <= compareDate;
    }

    constructor(changeDetector: ChangeDetectorRef, renderer: Renderer) {
        this.changeDetector = changeDetector;
        this.renderer = renderer;

        this.generateMonths();
    }

    ngOnInit(): void {
        this.scrollerReset();
    }

    ngAfterContentInit(): void {
        if(typeof this.startDateField === "undefined")
            throw "Fuel-UI Error: DateRangePicker missing startDate field";
        
        let startDateValue = DateUtils.handleDateInput(this.startDateField.value);
        
        if(this.startDateField.value.length > 0 
            && DateUtils.isValidDate(startDateValue)) 
                this.selectDate(startDateValue, false);
        else {
            this.selectDate(this._startDate, false);
            this.startDateField._value = this._startDate.toLocaleDateString();
        }
        
        this.startDateField.select
            .subscribe((event: MouseEvent) => {
                this.showCalendar(event);
                this.focusStartDate();
            });
            
        /* removed due to binding issues in FF
        this.startDateField.dateChange
            .subscribe((date: Date) => {
                if(this.startDate !== date)
                    this.startDate = date;
            });*/
        
        if(typeof this.endDateField === "undefined")
            throw "Fuel-UI Error: DateRangePicker missing endDate field";
        
        let endDateValue = DateUtils.handleDateInput(this.endDateField.value);
        
        if(this.endDateField.value.length > 0
            && DateUtils.isValidDate(endDateValue))
            this.selectDate(endDateValue, true); 
        else {
            this.selectDate(this._endDate, true);
            this.endDateField._value = this._endDate.toLocaleDateString();
        }
            
        
        this.endDateField.select
            .subscribe((event: MouseEvent) => {
                this.showCalendar(event);
                this.focusEndDate();
            });
            
        /* removed due to binding issues in FF
        this.endDateField.dateChange
            .subscribe((date: Date) => {
                if(this.endDate !== date)
                    this.endDate = date;
            });*/
            
        this.dateFieldIcons.map((i: DatePickerFieldStyler) => {
            i.selectEvent.subscribe((event: Event) => {
                this.showCalendar(event);
            });
        });
        
        this.generateMonths();
    }

    generateMonths(): void {
        var currentDate = this.selectedDate != null ? this.selectedDate : new Date();
        this.calendarMonths = [
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
            new Date(currentDate.getFullYear(), currentDate.getMonth())
        ]

        for (let i = 0; i < this._preGenMonths; i++) {
            let earliestDate = this.calendarMonths[0];
            let latestDate = this.calendarMonths[this.calendarMonths.length - 1];
            if (this.canPrevMonth)
                this.calendarMonths.unshift(new Date(earliestDate.getFullYear(), earliestDate.getMonth() - 1));
            if (this.canNextMonth)
                this.calendarMonths.push(new Date(latestDate.getFullYear(), latestDate.getMonth() + 1));
        }
    }

    scrollerReset(): void {
        setTimeout(() => {
            var currentDate = this.selectedDate != null ? this.selectedDate : new Date();
            if (this.calendarScroller == null)
                return;

            let scrollToMonth = this.calendarMonths.findIndex((m: Date) => {
                return m.getFullYear() == currentDate.getFullYear()
                    && m.getMonth() == currentDate.getMonth()
            });

            if(this.initialScroll) {
                this.initialScroll = false;
                this.calendarScroller.container.scrollTop =
                    this.calendarScroller.itemQuery.toArray()[scrollToMonth]
                        .element.offsetTop - 20;
            }

            this.calendarScroller.scrollToIndex(scrollToMonth);
        }, 1);
    }

    toggleCalendar(event: Event): void {
        if (!this.calendarDisplayed)
            this.showCalendar(event);
        else
            this.hideCalendar();
    }

    showCalendar(event: Event): void {
        if (event != null && !MobileDetection.isAny()) {
            var clickedTarget = event.target ? (<HTMLElement>event.target).parentElement : event.srcElement.parentElement;
            if (clickedTarget.classList.contains("input-group-addon"))
                clickedTarget = clickedTarget.parentElement;
            this.calendarX = clickedTarget.offsetLeft + "px";
            if (screen.height - clickedTarget.getBoundingClientRect().bottom <= 500) {
                this.calendarY = (clickedTarget.offsetTop - 300) + "px";
            } else {
                this.calendarY = clickedTarget.offsetTop + "px";
            }
        } else if (MobileDetection.isAny()) {
            this.calendarX = "5%";
            this.calendarY = "5%";
        }

        this.scrollerReset();

        this.changeDetector.markForCheck();
        this.calendarDisplayed = true;
    }

    hideCalendar(): void {
        this.calendarDisplayed = false;
        this.initialScroll = true;
        this.changeDetector.markForCheck();
    }

    selectDate(value: Date, target?: boolean): void {
        this._selectedDate = value;

        let dateTarget = (typeof target !== "undefined" && target != null) ? target : this._dateTarget;

        if (!dateTarget) {
            this.startDate = value;
            if (this.startDateChange != null)
                this.startDateChange.next(this._startDate);
            if(DateUtils.isValidDate(this.endDate) && this.startDate > this.endDate)
                this.endDate = new Date(this.startDate.getTime() + 24*60*60*1000);
        }
        else {
            this.endDate = value;
            this.hideCalendar();
            if (this.endDateChange != null)
                this.endDateChange.next(this._endDate);
            if(DateUtils.isValidDate(this.startDate) && this.endDate < this.startDate)
                this.startDate = new Date(this.endDate.getTime() - 24*60*60*1000);
        }

        this._dateTarget = !dateTarget;

        if (this.startDate != null && this.endDate != null) {
            let startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
            let endDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());

            this.valueChange.next(new DateRange(startDate, endDate));
        }
        this.changeDetector.markForCheck();
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

    disablePrev(): boolean {
        return this.calendarScroller ? this.calendarScroller.isTop() : false;
    }

    disableNext(): boolean {
        return this.calendarScroller ? this.calendarScroller.isBottom() : false;
    }

    scrollPrevMonth(): void {
        if (this.calendarScroller.topIndex == 0)
            this.addPrevMonth();

        setTimeout(() => {
            this.calendarScroller.scrollToIndex(this.calendarScroller.topIndex - 1);
        }, 10);
    }

    scrollNextMonth(): void {
        setTimeout(() => {
            this.calendarScroller.scrollToIndex(this.calendarScroller.topIndex + 1);
        }, 10);
    }

    addNextMonth(): void {
        if (!this.canNextMonth)
            return;

        var lastMonth = this.calendarMonths[this.calendarMonths.length - 1];
        var nextMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1);
        this.calendarMonths.push(nextMonth);
        this.changeDetector.markForCheck();
    }

    addPrevMonth(): void {
        if (!this.canPrevMonth)
            return;

        var firstMonth = this.calendarMonths[0];
        var prevMonth = new Date(firstMonth.getFullYear(), firstMonth.getMonth() - 1);
        this.calendarMonths.unshift(prevMonth);
        this.changeDetector.markForCheck();
    }
}