import {Component, OnInit, OnChanges, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Renderer} from '@angular/core';
import {Input, Output, EventEmitter, ElementRef, ViewChild, ContentChildren, ContentChild, QueryList} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {DatePickerCalendar} from "./DatePickerCalendar";
import {DatePickerField, DatePickerFieldStyler} from "./DatePickerField";
import {INFINITE_SCROLLER_PROVIDERS, InfiniteScroller} from "../InfiniteScroller/InfiniteScroller";
import {MobileDetection} from "../../utilities/DetectionUtils";
import {DateRange, DateUtils} from "../../utilities/utilities";

@Component({
    selector: "date-picker",
    styleUrls: ["components/DatePicker/DatePicker.css"],
    templateUrl: "components/DatePicker/DatePicker.html",
    directives: [DatePickerCalendar, INFINITE_SCROLLER_PROVIDERS, CORE_DIRECTIVES, FORM_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePicker implements OnInit, AfterContentInit {
    _minDate: Date = new Date(1900, 0, 1);
    _maxDate: Date = new Date(2200, 0, 1);

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

    @Output() valueChange = new EventEmitter();
    @Input()
    set value(value: any) {
        this._selectedDate = DateUtils.handleDateInput(value);
    }

    get inputDate(): string {
        return this.dateField != null ? this.dateField.value : "";
    }

    @ViewChild(InfiniteScroller)
    calendarScroller: InfiniteScroller;

    @ContentChild(DatePickerField)
    dateField: DatePickerField;

    @ContentChildren(DatePickerFieldStyler)
    dateFieldIcons: QueryList<DatePickerFieldStyler>;

    protected _selectedDate: Date;
    get selectedDate(): Date { return this._selectedDate; };
    set selectedDate(value: Date) {
        this._selectedDate = value;
        if (this.dateField != null)
            this.dateField._value = value.toLocaleDateString();
        this.valueChange.next(this.selectedDate);
        this.hideCalendar();
    }

    calendarDisplayed: boolean = false;
    calendarX: string = "5%";
    calendarY: string = "5%";
    calendarHeight: string = MobileDetection.isAny() || window.innerWidth <= 480 || window.outerWidth <= 480 ? "auto" : "300px";

    calendarMonths: Date[] = [];

    _preGenMonths = 2;

    changeDetector: ChangeDetectorRef;
    renderer: Renderer;

    constructor(changeDetector: ChangeDetectorRef, renderer: Renderer) {
        this.changeDetector = changeDetector;
        this.renderer = renderer;

        this.generateMonths();
    }

    ngOnInit(): void {
        var currentDate = this.selectedDate != null ? this.selectedDate : new Date();

        setTimeout(() => {
            if (this.calendarScroller == null)
                return;

            let scrollToMonth = this.calendarMonths.findIndex((m: Date) => {
                return m.getFullYear() == currentDate.getFullYear()
                    && m.getMonth() == currentDate.getMonth()
            });

            this.calendarScroller.container.scrollTop =
                this.calendarScroller.itemQuery.toArray()[scrollToMonth].element.offsetTop - 20;

            this.calendarScroller.scrollToIndex(scrollToMonth);
        }, 1);
    }

    ngAfterContentInit(): void {
        if (this.dateField == undefined)
            throw "Fuel-UI Error: DatePicker missing date field";

        var parsedDate = DateUtils.handleDateInput(this.dateField.value);
        if (this.dateField.value.length > 0 && DateUtils.isValidDate(parsedDate))
            this.selectedDate = parsedDate;

        this.dateField.select
            .subscribe((event: MouseEvent) => {
                this.showCalendar(event);
            });

        this.dateField.dateChange
            .subscribe((date: Date) => {
                this.selectedDate = date;
            });

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

        this.ngOnInit();

        this.calendarDisplayed = true;
        this.changeDetector.markForCheck();
    }

    hideCalendar(): void {
        this.calendarDisplayed = false;
        this.changeDetector.markForCheck();
    }

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

