import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {Input, Output, ElementRef, ViewChildren, QueryList} from 'angular2/angular2';
import {DatePickerCalendar} from './DatePickerCalendar';
import {Animation} from '../../Directives/Animation/Animation'

@Component({
	selector: 'date-picker'
})
@View({
	styleUrls: ['components/DatePicker/DatePicker.css'],
	templateUrl: 'components/DatePicker/DatePicker.html',
	directives: [DatePickerCalendar, CORE_DIRECTIVES, FORM_DIRECTIVES, Animation]
})
export class DatePickerBase {

	_minDate: Date = new Date(1900,0,1);
	_maxDate: Date = new Date(2200,0,1);

	get minDate(): Date|string { return this._minDate; };
	set minDate(value: Date|string) {
		this._minDate = this.handleDateInput(value);
	}
	
	get maxDate(): Date|string { return this._maxDate; }
	set maxDate(value: Date|string) {
		this._maxDate = this.handleDateInput(value);
	}

	months: number = 1;
	calendarMonths: Date[] = [];

	calendarDisplayed: boolean = true;

	calendarX: number = 1;
	calendarY: number = 1;
	
	direction: string = "";
	isAnimating: boolean = false;

	currentDate: Date;
	modal: HTMLElement;
	
	calendarQuery: QueryList<Animation>;

	constructor(modal: ElementRef) {
		this.modal = modal.nativeElement;
	}
	
	onInit(): void {
		this.calendarMonths = [];
		for(let i = 0; i < this.months; i++)
			this.calendarMonths
				.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+i));
		this.currentDate = this.currentDate;
	}

	afterViewInit(): void {			
		this.modal.addEventListener('click', (e) => {
			if(e.srcElement.className.indexOf('modal') != -1)
				this.hideCalendar();
		});
		
		<any>this.calendarQuery.changes
			.subscribe((calendars: any) => this.updateCalendars(calendars));
	}

	handleDateInput(value: string|Date): Date {
		if(value instanceof Date && !isNaN(value.valueOf()))
			return value;
		else
			return new Date(<string>value);
	}	
	
	showCalendar(event: MouseEvent): void {
		
		if(event != null) {
			var clickedRect = event.srcElement.parentElement.getBoundingClientRect();
			this.calendarX = clickedRect.left;
			if(screen.height - clickedRect.bottom <= 400) {
				this.calendarY = (clickedRect.top - 290 + clickedRect.height);
			} else {
				this.calendarY = (clickedRect.top + clickedRect.height);
			}
		}			
		
		this.onInit();
		this.calendarDisplayed = true;
		this.direction = '';
	}
	
	hideCalendar(): void {
		this.calendarDisplayed = false;
		this.direction = '';
	}
	
	canPrevMonth(): boolean {
		var prevDate = 
			new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()-1);
		var compareDate = 
			new Date(this._minDate.getFullYear(), this._minDate.getMonth());
		return prevDate >= compareDate;
	}
	
	prevMonth(): void {
		if(!this.canPrevMonth() || this.isAnimating)
			return;
			
		var firstMonth = this.calendarMonths[0];
		this.calendarMonths.unshift(
			new Date(firstMonth.getFullYear(), firstMonth.getMonth()-1)
		); 
		this.direction = 'right';
	}
	
	canNextMonth(): boolean {
		var nextDate = 
			new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1); 
		var compareDate = 
			new Date(this._maxDate.getFullYear(), this._maxDate.getMonth()-1);
		return nextDate <= compareDate;
	}
	
	nextMonth(): void {
		if(!this.canNextMonth() || this.isAnimating)
			return;
			
		var lastMonth = this.calendarMonths[this.calendarMonths.length-1];
		this.calendarMonths.push(
			new Date(lastMonth.getFullYear(), lastMonth.getMonth()+1)
		);
		this.direction = 'left';	
	}
	
	updateCalendars(calendars: QueryList<Animation>): void {
		if(this.direction.length == 0 || this.isAnimating)
			return;
		
		this.isAnimating = true;
		var direction = this.direction;	
		
		var cleanAction: () => void;
		
		if(direction == 'right') {
			calendars.first
				.addAnimation(direction+'.enter')
				.startAnimation(() => {
						this.direction = ''
						this.isAnimating = false;
						this.calendarMonths.pop()
					});
			calendars.last
				.addAnimation(direction+'.leave')
				.startAnimation();			
		} else {
			calendars.first
				.addAnimation(direction+'.leave')
				.startAnimation();
			calendars.last
				.addAnimation(direction+'.enter')
				.startAnimation(() => {
						this.direction = ''
						this.isAnimating = false;
						this.calendarMonths.shift()
					});
		}	

		calendars
			.filter((c: Animation) => 
				c !== calendars.first && c !== calendars.last)
			.map((c: Animation) => {
				c.addAnimation(direction+'.enter')
					.startAnimation();
			});		
	}
}