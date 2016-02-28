import {Component, View, Input, Output} from "angular2/core";
import {EventEmitter, ElementRef, ViewChildren, QueryList} from "angular2/core";
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
	
    private _inputStartDate: string = "";
	get inputStartDate(): string {return this._inputStartDate};
	set inputDate(value: string) {
		this._inputStartDate = value;
		this._selectedDate = new Date(value);
	}
    
    private _inputEndDate: string = "";
	get inputEndDate(): string {return this._inputEndDate};
	set inputEndDate(value: string) {
		this._inputEndDate = value;
		this._selectedDate = new Date(value);
	}
    
    constructor(modal: ElementRef) {
        super(modal);
        /*this.modal = modal.nativeElement;
        this.selectedDate = new Date();
        if(this.selectedDate < this._minDate)
            this.selectedDate = this._minDate;*/
    }
    
    handleRangeInput(value: any): DateRange {
		if(value instanceof DateRange)
			return value;
		else
			throw "DateRangePicker error: input is not of type DateRange";
	}
}