import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {TIMEPICKER_PROVIDERS} from '../../components/TimePicker/TimePicker';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">TimePicker</h2>
            <p class="card-text">TimePicker is a custom component to select time through a Date object</p>
        </div>
    </div>
</div>

<section class="row m-a">
    <form>
        <div class="form-group row">
            <label for="hourStep" class="col-sm-2 col-md-1 form-control-label">Hour Step</label>
            <div class="col-sm-1">
                <input class="form-control" [(ngModel)]="hourStep" min="1" type="number" name="hourStep">
            </div>
            <label for="minuteStep" class="col-sm-2 col-md-1 form-control-label">Minute Step</label>
            <div class="col-sm-1">
                <input class="form-control" [(ngModel)]="minuteStep" min="1" type="number" name="minuteStep">
            </div>
        </div>
    </form>
    <p>
        <button type="button" class="btn btn-primary btn-sm" (click)="showMeridian = !showMeridian">Toggle Mode: {{showMeridian ? '12H' : '24H'}}</button>
        <button type="button" class="btn btn-warning btn-sm" (click)="readonly = !readonly">Readonly: {{readonly ? 'On' : 'Off'}}</button>
        <button type="button" class="btn btn-danger btn-sm" (click)="disabled = !disabled">Disabled: {{disabled ? 'On' : 'Off'}}</button>
        <button type="button" class="btn btn-info btn-sm" (click)="showSeconds = !showSeconds">Seconds: {{showSeconds ? 'On' : 'Off'}}</button>
        <button type="button" class="btn btn-primary btn-sm" (click)="showSpinners = !showSpinners">Spinners: {{showSpinners ? 'On' : 'Off'}}</button>
    </p>
    <p>
        <button type="button" class="btn btn-primary btn-sm" (click)="setDate()">Set time to 14:00:00</button>        
    </p>
    
    <timepicker 
        [(value)]="date" 
        [min]="minDate" 
        [max]="maxDate" 
        [hourStep]="hourStep"
        [minuteStep]="minuteStep" 
        [disabled]="disabled" 
        [readonlyInput]="readonly" 
        [showSeconds]="showSeconds" 
        [showSpinners]="showSpinners" 
        [showMeridian]="showMeridian">
    </timepicker>

    {{date | date : 'h:mm:ss'}}
    
</section>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {{'{'}}TimePicker{{'}'}} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>TimePicker is a custom element to show an interactive TimePicker interface. TimePickers allow for many customizations</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;timepicker 
    [(value)]=&quot;date&quot; 
    [min]=&quot;minDate&quot; 
    [max]=&quot;maxDate&quot; 
    [hourStep]=&quot;hourStep&quot;
    [minuteStep]=&quot;minuteStep&quot; 
    [disabled]=&quot;disabled&quot; 
    [readonlyInput]=&quot;readonly&quot; 
    [showSeconds]=&quot;showSeconds&quot; 
    [showSpinners]=&quot;showSpinners&quot; 
    [showMeridian]=&quot;showMeridian&quot;&gt;
&lt;/timepicker&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class TimePickerExample {{'{'}}
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
{{'}'}}
</code>
</pre>
</tab>
</tabset>

<h3>TimePicker Attributes</h3>
<table-sortable
    [columns]="timepickerAttributesColumns"
    [data]="timepickerAttributes"
    [sort]="timepickerAttributesSort">
    Loading table...
</table-sortable>

<h3>TimePicker Events</h3>
<table-sortable
    [columns]="timepickerEventsColumns"
    [data]="timepickerEvents"
    [sort]="timepickerEventsSort">
    Loading table...
</table-sortable>

</div>`,
        directives: [CORE_DIRECTIVES, TIMEPICKER_PROVIDERS, CodeHighlighter, TableSortable, TAB_PROVIDERS]
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