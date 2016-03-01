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
	@Output() selectedDateChange = new EventEmitter<Date>();
	
    @Input() dateTarget: boolean = null;
    @Input() startDate: Date;
    @Input() endDate: Date;
    
	@Input() minDate: Date;
	@Input() maxDate: Date;
    @Input() dateFilter: (d: Date) => boolean;
    
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
        
        /*if(this.dateTarget != null && this.dateTarget
            && typeof this.startDate != undefined && this.startDate != null
            && compareDate < this.startDate) {
            return false;
        }      
        
        if(this.dateTarget != null && !this.dateTarget
            && typeof this.endDate != undefined && this.endDate != null
            && compareDate > this.endDate) {
            return false;
        }*/
        
        if(typeof this.dateFilter == "function" && !this.dateFilter(compareDate))
			return false;
            
		return compareDate >= this.minDate && compareDate <= this.maxDate;
	}
	
	checkSelectedDate(date: string): boolean {
		if(typeof this.selectedDate == undefined || this.selectedDate == null)
			return false;
            
        if(typeof this.startDate != undefined && this.startDate != null
            && typeof this.endDate != undefined && this.endDate != null) {
            let compareDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), parseInt(date));
            return compareDate >= this.startDate && compareDate <= this.endDate;
        }
			
		return this.selectedDate.getFullYear() == this.currentMonth.getFullYear() 
			&& this.selectedDate.getMonth() == this.currentMonth.getMonth() 
			&& this.selectedDate.getDate().toString() == date;
	}
    
    checkStartDate(date: string): boolean {
		if(typeof this.startDate == undefined || this.startDate == null)
			return false;
		
        if(this.startDate == this.endDate)
            return false;
        	
		return this.startDate.getFullYear() == this.currentMonth.getFullYear() 
			&& this.startDate.getMonth() == this.currentMonth.getMonth() 
			&& this.startDate.getDate().toString() == date;
	}
    
    checkEndDate(date: string): boolean {
		if(typeof this.endDate == undefined || this.endDate == null)
			return false;
		
        if(this.startDate == this.endDate)
            return false;
        	
		return this.endDate.getFullYear() == this.currentMonth.getFullYear() 
			&& this.endDate.getMonth() == this.currentMonth.getMonth() 
			&& this.endDate.getDate().toString() == date;
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
		
		var firstWeekCount = this.weeks[0]
			.filter(i => i.length > 0).length;
		var lastWeekCount = this.weeks[this.weeks.length-1]
			.filter(i => i.length > 0).length;
	}
}