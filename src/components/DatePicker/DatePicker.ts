import {Component, View, OnInit, OnChanges} from 'angular2/core';
import {Input, Output, EventEmitter, ElementRef, ViewChildren, QueryList} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {DatePickerBase} from './DatePickerBase';
import {DatePickerCalendar} from './DatePickerCalendar';
import {Animation} from '../../Directives/Animation/Animation'

@Component({
	selector: 'date-picker',
	inputs: [
		'minDate: min-date',
		'maxDate: max-date',
		'months: months'
	]
})
@View({
	styleUrls: ['components/DatePicker/DatePicker.css'],
	templateUrl: 'components/DatePicker/DatePicker.html',
	directives: [DatePickerCalendar, CORE_DIRECTIVES, FORM_DIRECTIVES, Animation]
})
export class DatePicker extends DatePickerBase implements OnInit, OnChanges {
	@Output() valueChange = new EventEmitter();
	@Input()
	set value(value: string|Date) {
		this._selectedDate = this.handleDateInput(value);
	}
 
	private _selectedDate: Date;
	get selectedDate(): Date { return this._selectedDate; };
	set selectedDate(value: Date) {
		this._selectedDate = value;
		this._inputDate = value.toLocaleDateString();
		this.currentDate = value;
		this.valueChange.next(this.selectedDate);
		this.hideCalendar();
	}

	private _inputDate: string = "";
	
	get inputDate(): string {return this._inputDate};
	set inputDate(value: string) {
		this._inputDate = value;
		this._selectedDate = new Date(value);
	}	

	@ViewChildren(Animation) calendarQuery: QueryList<Animation>;

	constructor(modal: ElementRef) {
		super(modal);
		this.selectedDate = new Date();
	}
	
	ngOnInit(): void {
		if(this.selectedDate < this._minDate)
			this.selectedDate = this._minDate;
		super.onInit();		
	}
	
	ngOnChanges(changes: any): void {
		this.onInit();
	}
}