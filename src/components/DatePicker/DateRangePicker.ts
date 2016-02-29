import {Component, View, Input, Output} from "angular2/core";
import {EventEmitter, ElementRef, ViewChild, ViewChildren, QueryList} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {DateRange} from "../../utilities/DateUtils";
import {DatePickerMobile} from "./DatePickerMobile";
import {DatePickerCalendar} from "./DatePickerCalendar";
import {InfiniteScroller, INFINITE_SCROLLER_PROVIDERS} from "../InfiniteScroller/InfiniteScroller";

@Component({
	selector: "date-range-picker"
})
@View({
	styleUrls: ['components/DatePicker/DatePickerMobile.css'],
	templateUrl: 'components/DatePicker/DateRangePicker.html',
	directives: [DatePickerCalendar, INFINITE_SCROLLER_PROVIDERS, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class DateRangePicker extends DatePickerMobile {
	@Output() valueChange = new EventEmitter();
    @Input()
    set value(value: any) {
		this._selectedDate = this.handleRangeInput(value).start;
	}
    
     @Input()
    set minDate(value: Date|string) {
		this._minDate = this.handleDateInput(value);
	}
	get minDate(): Date|string { return this._minDate; };
	
    @Input()
    set maxDate(value: Date|string) {
		this._maxDate = this.handleDateInput(value);
	}
	get maxDate(): Date|string { return this._maxDate; }
    
    @Input() dateFilter: (d: Date) => boolean;
 
    @ViewChild(InfiniteScroller)
    calendarScroller: InfiniteScroller;
    
    private _dateTarget: boolean = false;
	
    get selectedDate(): Date {return this._selectedDate};
    set selectedDate(value: Date) { 
        this._selectedDate = value;
        
        if(!this._dateTarget)
            this.inputStartDate = value.toLocaleDateString();
        else
            this.inputEndDate = value.toLocaleDateString();
            
        this._dateTarget = !this._dateTarget;
        this.hideCalendar();
    }
    
    private _inputStartDate: string = "";
	get inputStartDate(): string { return this._inputStartDate };
	set inputStartDate(value: string) {
		this._inputStartDate = value;
		this._selectedDate = new Date(value);
	}
    
    private _inputEndDate: string = "";
	get inputEndDate(): string { return this._inputEndDate };
	set inputEndDate(value: string) {
		this._inputEndDate = value;
		this._selectedDate = new Date(value);
	}
    
    constructor(modal: ElementRef) {
        super(modal);
        this.modal = modal.nativeElement;
        console.log(modal.nativeElement);
        this.selectedDate = new Date();
        if(this.selectedDate < this._minDate)
            this.selectedDate = this._minDate;
    }
    
    handleRangeInput(value: any): DateRange {
		if(value instanceof DateRange)
			return value;
		else
			throw "DateRangePicker error: input is not of type DateRange";
	}
    
    focusStartDate(): void {
        this._dateTarget = false;
    }
    
    focusEndDate(): void {
        this._dateTarget = true;
    }
}