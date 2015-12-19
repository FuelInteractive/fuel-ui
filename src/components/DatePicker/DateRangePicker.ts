import {Component, View, Input, Output} from 'angular2/core';
import {EventEmitter, ElementRef, ViewChildren, QueryList} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {DateRange} from '../../utilities/DateUtils.ts';

@Component({
	selector: 'date-range-picker'
})
@View({
	styleUrls: ['components/DatePicker/DateRangePicker.css'],
	templateUrl: 'components/DatePicker/DateRangePicker.html',
	directives: []
})
export class DateRangePicker {
	@Output() startDateChange = new EventEmitter();
	
}