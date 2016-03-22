import {Component, Input, Output, ChangeDetectionStrategy} from "angular2/core";
import {EventEmitter, ElementRef, ViewChild, ViewChildren, QueryList} from "angular2/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {DateRange} from "../../utilities/DateUtils";
import {MobileDetection} from "../../utilities/DetectionUtils";
import {DatePicker} from "./DatePicker";
import {DatePickerCalendar} from "./DatePickerCalendar";
import {InfiniteScroller, INFINITE_SCROLLER_PROVIDERS} from "../InfiniteScroller/InfiniteScroller";

@Component({
	selector: "date-range-picker",
	styleUrls: ['components/DatePicker/DatePicker.css'],
	templateUrl: 'components/DatePicker/DateRangePicker.html',
	directives: [DatePickerCalendar, INFINITE_SCROLLER_PROVIDERS, CORE_DIRECTIVES, FORM_DIRECTIVES],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangePicker extends DatePicker {
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
    calendarHeight: string = MobileDetection.isAny() || window.innerWidth <= 480 || window.outerWidth <= 480 ? "auto" : "300px";
    
    get selectedDate(): Date {return this._selectedDate};
    set selectedDate(value: Date) { 
        this._selectedDate = value;
        
        if((this._dateTarget && this.startDate != null && value < this.startDate)
            || !this._dateTarget && this.endDate != null && value > this.endDate)
            this._dateTarget = !this._dateTarget;
        
        if(!this._dateTarget) {            
            this.inputStartDate = value.toLocaleDateString();
            this.startDate = value;
            if(this.startDateChange != null)
                this.startDateChange.next(this._startDate);
        }
        else {
            this.inputEndDate = value.toLocaleDateString();
            this.endDate = value;
            this.hideCalendar();
            if(this.endDateChange != null)
                this.endDateChange.next(this._endDate);
        }
            
        this._dateTarget = !this._dateTarget;
        
        if(this.startDate != null && this.endDate != null){
            let startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
            let endDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
            
            this.valueChange.next(new DateRange(startDate, endDate));
        }
            
    }
    
    @Input() startLabel: string;
    @Input() endLabel: string;
    
    private _startDate: Date;
    private _endDate: Date;
    
    @Output() startDateChange = new EventEmitter();
	@Input()
	set startDate(value: any) {
		this._startDate = this.handleDateInput(value);
	}
    get startDate(): any { return this._startDate; }
    
    @Output() endDateChange = new EventEmitter();
	@Input()
	set endDate(value: any) {
		this._endDate = this.handleDateInput(value);
	}
    get endDate(): any { return this._endDate; }
    
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
        
        /*this.selectedDate = new Date();
        if(this.selectedDate < this._minDate)
            this.selectedDate = this._minDate;*/
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
    
    checkStartDateTarget(): boolean {
        return !this._dateTarget;
    }
    
    checkEndDateTarget(): boolean {
        return this._dateTarget;
    }
}