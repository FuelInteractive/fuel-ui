import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {TableSortableColumn, TableSortableSorting} from '../../components/tableSortable/tableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "components/timePicker/timePicker.demo.html"
})
export class TimePickerDemo {
    date: Date = new Date();
    minDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
    maxDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59);
    hourStep: number = 1;
    minuteStep: number = 1;
    readonly: boolean = false;
    disabled: boolean = false;
    showSeconds: boolean = true;
    showSpinners: boolean = true;
    showMeridian: boolean = true;
    
    setDate():void {
        this.date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 14, 0, 0);
    }
    
    timepickerAttributes:Attribute[] = [
        new Attribute('hourStep', 'number', '1', 'The amount of hours per step'),
        new Attribute('minuteStep', 'number', '1', 'The amount of minutes per step'),
        new Attribute('secondStep', 'number', '1', 'The amount of seconds per step'),
        new Attribute('value', 'Date', 'new Date(new Date().getFullYear(), 0, 1, 0, 0, 0)', 'Date value of the TimePicker'),
        new Attribute('meridians', 'string[]', '["AM", "PM"]', 'An array of 2 strings to be used for the 2 meridians'),
        new Attribute('showSeconds', 'boolean', 'false', 'Show the seconds input to update'),
        new Attribute('readonlyInput', 'boolean', 'false', 'Make inputs that are shown readonly'),
        new Attribute('showSpinners', 'boolean', 'true', 'Show or hide arrows to click and step through inputs'),
        new Attribute('disabled', 'boolean', 'false', 'Disable all showing inputs, buttons, and spinners'),
        new Attribute('min', 'Date', 'new Date(new Date().getFullYear(), 0, 1, 0, 0, 0)', 'Miniumum selectable date'),
        new Attribute('max', 'Date', 'new Date(new Date().getFullYear(), 0, 1, 23, 59, 59)', 'Maximum selectable date')
    ];
    timepickerAttributesColumns:TableSortableColumn[] = AttributeColumns;
    timepickerAttributesSort:TableSortableSorting = AttributesDefaultSort;
    timepickerEvents:Event[] = [
        new Event('value', '$event = date: Date', 'Curently selected date of TimePicker')
    ];
    timepickerEventsColumns:TableSortableColumn[] = EventColumns;
    timepickerEventsSort:TableSortableSorting = EventsDefaultSort;
}

export var TIMEPICKER_DEMO_PROVIDERS = [
    TimePickerDemo
];