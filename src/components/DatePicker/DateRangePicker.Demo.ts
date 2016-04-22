import {Component} from 'angular2/core';
import {DateRange} from '../../utilities/DateUtils';
import {DateRangePicker} from './DateRangePicker';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">DateRangePicker</h2>
            <p class="card-text">DateRangePicker is a custom component to select a date range on a single calendar</p>
        </div>
    </div>
</div>

<section class="row">
    <div class="col-md-3">
        <date-range-picker
            minDate="11/1/2015"
            maxDate="11/12/2016" 
            [dateFilter]="dateFilter"
            startLabel="Arrival"
            endLabel="Departure"
            (valueChange)="datePickerValueChange($event)"> 
        </date-range-picker>
    </div>
    <div class="col-md-6" *ngIf="dateRangePickerValue != null">
        value.start: {{dateRangePickerValue.start}} <br/>
        value.end: {{dateRangePickerValue.end}}
    </div>
</section>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {DateRange, DateRangePicker} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>DateRangePicker is a custom element to select a date range on a calendar. It supports filtering of dates so that you can disable dates programmatically. Also supports min and max dates</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;date-range-picker
    minDate=&quot;11/1/2015&quot;
    maxDate=&quot;11/12/2016&quot; 
    [dateFilter]=&quot;dateFilter&quot;
    startLabel=&quot;Arrival&quot;
    endLabel=&quot;Departure&quot;
    (valueChange)=&quot;datePickerValueChange($event)&quot;&gt; 
&lt;/date-range-picker&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class DateRangePickerExample { 
    dateRangePickerValue: DateRange;
    
    datePickerValueChange(eventValue: any){
        this.dateRangePickerValue = eventValue;
    }
    
    dateFilter(d: Date): boolean {
        
        //every Tuesday
        if([2].indexOf(d.getDay()) > -1)
            return false;
        
        return true;
    }
}
</code>
</pre>
</tab>
</tabset>

<h3>Attributes</h3>
<table-sortable
    [columns]="attributesColumns"
    [data]="attributes"
    [sort]="attributesSort">
    Loading table...
</table-sortable>

</div>`,
        directives: [DateRangePicker, CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class DateRangePickerDemo { 
    dateRangePickerValue: DateRange;
    
    datePickerValueChange(event: any){
        this.dateRangePickerValue = event;
    }
    
    dateFilter(d: Date): boolean {
        if([2].indexOf(d.getDay()) > -1)
            return false;
        
        return true;
    }
    
    attributes:any[] = [
        new Attribute('startLabel', 'string', 'null', 'Placeholder and label to display for the start date input'),
        new Attribute('endLabel', 'string', 'null', 'Placeholder and label to display for the end date input'),
        new Attribute('minDate', 'string|Date', 'new Date(1900,0,1)', 'Minimum selectable date'),
        new Attribute('maxDate', 'string|Date', 'new Date(2200,0,1)', 'Maximum selectable date'),
        new Attribute('dateFilter', 'function(date): boolean', 'null', 'Filter to disable dates. A return of <i>false</i> will disable the day'),
        new Attribute('value', 'DateRange', 'null', 'Two-way binding of the selected DateRange'),
        new Attribute('startDate', 'Date', 'null', 'Two-way binding of the selected start date'),
        new Attribute('endDate', 'Date', 'null', 'Two-way binding of the selected end date')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}

export var DATERANGEPICKER_DEMO_PROVIDERS = [
    DateRangePickerDemo
];