import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {DateRange} from '../../utilities/utilities';
import {DATE_PICKER_PROVIDERS} from './DatePickerProviders';
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
    <div class="col-md-4">
        <div class="form-inline">
            <date-range-picker
                minDate="11/1/2015"
                maxDate="11/12/2016" 
                [dateFilter]="dateFilter"
                (valueChange)="datePickerValueChange($event)">
                <div class="form-group">
                    <label for="arrival">Arrival Date</label>
                    <div class="date-picker-input-group">
                        <input name="arrival" [(ngModel)]="arrivalDate" startDateField class="form-control" placeholder="Arrival" />
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="departure">Departure Date</label>
                    <div class="date-picker-input-group">
                        <input name="departure" [(ngModel)]="departureDate" endDateField class="form-control" placeholder="Departure" />
                    </div>
                </div>
            </date-range-picker>
        </div>
    </div>
    <div class="col-md-6">
        value.start: {{dateRangePickerValue.start}} <br/>
        value.end: {{dateRangePickerValue.end}} <br />
        startDateField: {{arrivalDate}} <br />
        endDateField: {{departureDate}} <br />
    </div>
</section>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {{'{'}}DateRange, DATE_PICKER_PROVIDERS{{'}'}} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>DateRangePicker is a custom element to select a date range on a calendar. It supports filtering of dates so that you can disable dates programmatically. Also supports min and max dates</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;form class=&quot;form-inline&quot;&gt;
    &lt;date-range-picker
        minDate=&quot;11/1/2015&quot;
        maxDate=&quot;11/12/2016&quot; 
        [dateFilter]=&quot;dateFilter&quot;
        (valueChange)=&quot;datePickerValueChange($event)&quot;&gt;
        &lt;div class=&quot;form-group&quot;&gt;
            &lt;label for=&quot;arrival&quot;&gt;Arrival Date&lt;/label&gt;
            &lt;div class=&quot;date-picker-input-group&quot;&gt;
                &lt;input name=&quot;arrival&quot; startDateField class=&quot;form-control&quot; value=&quot;5/5/2016&quot; placeholder=&quot;Arrival&quot; /&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        
        &lt;div class=&quot;form-group&quot;&gt;
            &lt;label for=&quot;departure&quot;&gt;Departure Date&lt;/label&gt;
            &lt;div class=&quot;date-picker-input-group&quot;&gt;
                &lt;input name=&quot;departure&quot; endDateField class=&quot;form-control&quot; value=&quot;5/10/2016&quot; placeholder=&quot;Departure&quot; /&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/date-range-picker&gt;
&lt;/form&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class DateRangePickerExample {{'{'}}
    dateRangePickerValue: DateRange;
    
    datePickerValueChange(eventValue: any){{'{'}}
        this.dateRangePickerValue = eventValue;
    {{'}'}}
    
    dateFilter(d: Date): boolean {{'{'}}
        
        //every Tuesday
        if([2].indexOf(d.getDay()) > -1)
            return false;
        
        return true;
    {{'}'}}
{{'}'}}
</code>
</pre>
</tab>
</tabset>

<h3>DateRangePicker Attributes</h3>
<table-sortable
    [columns]="attributesColumns"
    [data]="attributes"
    [sort]="attributesSort">
    Loading table...
</table-sortable>

<h3>StartDate / EndDate Attributes</h3>
<table-sortable
    [columns]="attributesColumns"
    [data]="dateFieldAttributes"
    [sort]="attributesSort">
    Loading table...
</table-sortable>

</div>`,
        directives: [DATE_PICKER_PROVIDERS, CodeHighlighter, TableSortable, TAB_PROVIDERS, FORM_DIRECTIVES]
})
export class DateRangePickerDemo { 
    dateRangePickerValue: DateRange = new DateRange(new Date(), new Date());
    /*arrivalDate = new Date(2016,7,6);
    departureDate = new Date(2016,7,10);*/
    arrivalDate = "8/6/2016";
    departureDate = "8/10/2016";
    
    datePickerValueChange(event: any){
        this.dateRangePickerValue = event;
    }
    
    dateFilter(d: Date): boolean {
        if([2].indexOf(d.getDay()) > -1)
            return false;
        
        return true;
    }
    
    attributes:any[] = [
        new Attribute('minDate', 'string|Date', 'new Date(1900,0,1)', 'Minimum selectable date'),
        new Attribute('maxDate', 'string|Date', 'new Date(2200,0,1)', 'Maximum selectable date'),
        new Attribute('dateFilter', 'function(date): boolean', 'null', 'Filter to disable dates. A return of <i>false</i> will disable the day'),
        new Attribute('value', 'DateRange', 'null', 'Two-way binding of the selected DateRange')
    ];
    
    dateFieldAttributes:any[] = [
        new Attribute('date', 'Date', 'null', 'Two-way binding of the selected date'),
        new Attribute('value', 'string|Date', 'null', 'Two-way binding of the selected date'),
        new Attribute('ngModel', 'string', 'null', 'Two-way binding of the result input string'),
    ];
    
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}

export var DATERANGEPICKER_DEMO_PROVIDERS = [
    DateRangePickerDemo
];