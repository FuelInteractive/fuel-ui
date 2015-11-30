import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {Input, Output, EventEmitter, ElementRef, ViewChildren, QueryList} from 'angular2/angular2';

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