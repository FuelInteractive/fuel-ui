import {Component, View} from 'angular2/core';
import {Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

//import {AnimationListener} from '../../directives/AnimationListener/AnimationListener';

@Component({
	selector: 'date-picker-calendar'
})
@View({
	styleUrls: ['components/DatePicker/DatePickerCalendar.css'],
	templateUrl: 'components/DatePicker/DatePickerCalendar.html',
	directives: [CORE_DIRECTIVES,FORM_DIRECTIVES]
})
export class DatePickerCalendar implements OnInit {
	weeks: string[][];
	@Input() currentMonth: Date;
	@Input() selectedDate: Date;
	@Output() selectedDateChange = new EventEmitter();
	
	@Input() minDate: Date;
	@Input() maxDate: Date;
    
    @Input() showMonth: boolean = true;
	
	constructor() {		
	}
	
	ngOnInit(): void {
		this.buildWeeks(this.currentMonth || new Date());		
	}
	
	checkSelectable(date: string): boolean {
		var dateNumber = parseInt(date);
		if(isNaN(dateNumber))
			return false;
		
		var compareDate = 
			new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), dateNumber);
			
		return compareDate >= this.minDate && compareDate <= this.maxDate;
	}
	
	checkSelectedDate(date: string): boolean {
		if(typeof this.selectedDate == undefined || this.selectedDate == null)
			return false;
			
		return this.selectedDate.getFullYear() == this.currentMonth.getFullYear() 
			&& this.selectedDate.getMonth() == this.currentMonth.getMonth() 
			&& this.selectedDate.getDate().toString() == date;
	}
	
	selectDate(date: string): void {
		if(!this.checkSelectable(date))
			return;
		
		var dateNumber = parseInt(date);			
		this.selectedDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), dateNumber);
		this.selectedDateChange.next(this.selectedDate);
	}
	
	buildWeeks(date: Date): void {
		this.currentMonth = date;
		var currentDay = new Date(this.currentMonth.toDateString());
		currentDay.setDate(1);
		currentDay.setDate(currentDay.getDate() - currentDay.getDay());
		
		var lastDay = 
			new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
		lastDay.setDate(lastDay.getDate() + (6-lastDay.getDay()));
		
		this.weeks = [];
		var currentWeek: string[] = [];
		while(currentDay <= lastDay) {
			if(currentDay.getMonth() == this.currentMonth.getMonth())
				currentWeek.push(currentDay.getDate().toLocaleString());
			else
				currentWeek.push("");
			
			currentDay.setDate(currentDay.getDate()+1);
			if(currentDay.getDay() == 0) {
				this.weeks.push(currentWeek);
				currentWeek = [];
			}
		}
		
		if(this.weeks.length > 5)
			return;
			
		var emptyWeek = ['','','','','','',''];
		
		var firstWeekCount = this.weeks[0]
			.filter(i => i.length > 0).length;
		var lastWeekCount = this.weeks[this.weeks.length-1]
			.filter(i => i.length > 0).length;
		
		if(firstWeekCount > lastWeekCount)
			this.weeks.unshift(emptyWeek);
		else
			this.weeks.push(emptyWeek);
		
		if(this.weeks.length < 6)
			this.weeks.unshift(emptyWeek);
	}
}