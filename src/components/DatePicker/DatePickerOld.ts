import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, DOCUMENT, ElementRef,
	Input, Output, EventEmitter, OnInit, DatePipe} from 'angular2/angular2';
import {ViewChildren, QueryList, ViewChild} from 'angular2/angular2';
import {DatePickerCalendar} from './DatePickerCalendar';

@Component({
	selector: 'date-picker-old',
	properties: ['minDate: minDate', 'maxDate: maxDate']
})
@View({
	styleUrls: ['components/DatePicker/DatePickerOld.css'],
	templateUrl: 'components/DatePicker/DatePickerOld.html',
	directives: [DatePickerCalendar, FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class DatePickerOld {
	@Output() valueChange = new EventEmitter();
	@Input() set value(value: Date|string) {
		if(value instanceof Date && !isNaN(value.valueOf())) 
			this.selectedDate = value;
		else
			this.selectedDate = new Date(<string>value);
	};	
	
	private _selectedDate: Date;
	get selectedDate(): Date {return this._selectedDate};
	set selectedDate(value: Date) {
		this._selectedDate = value;
		this._inputDate = value.toLocaleDateString();
		this.valueChange.next(this.selectedDate);
	}
	
	private _inputDate: string = "";
	get inputDate(): string {return this._inputDate};
	set inputDate(value: string) {
		this._inputDate = value;
		this._selectedDate = new Date(value);
	}	
	
	_minDate: Date = new Date(1900,0,1);
	_maxDate: Date = new Date(2200,0,1);
	
	get minDate(): Date|string { return this._minDate; };
	set minDate(value: Date|string) {
		if(value instanceof Date && !isNaN(value.valueOf())) 
			this._minDate = value;
		else
			this._minDate = new Date(<string>value);
	}
	get maxDate(): Date|string { return this._maxDate; }
	set maxDate(value: Date|string) {
		if(value instanceof Date && !isNaN(value.valueOf())) 
			this._maxDate = value;
		else
			this._maxDate = new Date(<string>value);
	}
	
	@Input() months: number = 1;
	get monthList(): Date[] {
		var monthList: Date[] = [];
		for(var i = 0; i < this.months; i++) {
			monthList.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+i));
		}
		return monthList;
	}	
	
	@ViewChildren(DatePickerCalendar) calendarQuery: QueryList<DatePickerCalendar>;
	calendars: DatePickerCalendar[] = [];
	
	currentDate: Date = new Date();
	calendarDisplayed: boolean = false;
	
	modal: HTMLElement;
	
	constructor(modal: ElementRef) {
		this.modal = modal.nativeElement;
	}
	
	onInit(): void {
		if(this.currentDate < this._minDate)
			this.currentDate = this._minDate;
	}
	
	afterViewInit(): void {
		this.calendarQuery.changes
			.subscribe(() => {
				this.calendars = [];
				this.calendarQuery.map((c) => this.calendars.push(c));
			});
			
		this.modal.addEventListener('click', (e) => {
			if(e.srcElement.className.indexOf('modal') != -1)
				this.hideCalendar();
		});
	}
	
	onChanges(changes: any): void {
		this.hideCalendar();
	}
	
	showCalendar(): void {
		console.log("showCalendar");
		if(this.selectedDate instanceof Date && !isNaN(this.selectedDate.valueOf()))
			this.currentDate = this.selectedDate;
		this.calendarDisplayed = true;
	}
	
	hideCalendar(): void {
		this.calendarDisplayed = false;
	}
	
	canPrevMonth(): boolean {
		var prevDate = 
			new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()-1);
		var compareDate = 
			new Date(this._minDate.getFullYear(), this._minDate.getMonth());
		return prevDate >= compareDate;
	}
	
	prevMonth(): void {
		if(!this.canPrevMonth())
			return;
		
		var prevDate = 
			new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()-1);				
		this.currentDate = prevDate;			
	}
	
	canNextMonth(): boolean {
		var nextDate = 
			new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1); 
		var compareDate = 
			new Date(this._maxDate.getFullYear(), this._maxDate.getMonth()-1);
		return nextDate <= compareDate;
	}
	
	nextMonth(): void {
		if(!this.canNextMonth())
			return;
		
		var nextDate = 
			new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1); 		
		this.currentDate = nextDate;				
	}
}