import {Component} from '@angular/core';
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
            <h2 class="card-title">DatePicker</h2>
            <p class="card-text">DatePicker is a custom component to select a single date on a calendar</p>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-4">
        <div class="form-group">
            <label for="date">Pick a Date</label>
            <date-picker
                minDate="11/1/2015"
                maxDate="11/12/2016" 
                [dateFilter]="dateFilter"
                [(value)]="datePickerValue">
                <div class="date-picker-input-group">
                    <input name="date" [(ngModel)]="datePickerFieldValue" dateField class="form-control" placeholder="pick a date" />
                </div>
            </date-picker>
        </div>
    </div>
    <div class="col-md-4">
        date-picker value: {{datePickerValue}}<br />
        input ngModel: {{datePickerFieldValue}}
    </div>
</div>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {DATE_PICKER_PROVIDERS} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>DatePicker is a custom element to select a date on a calendar. It supports filtering of dates so that you can disable dates programmatically. Also supports min and max dates</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;div class=&quot;form-group&quot;&gt;
    &lt;label for=&quot;date&quot;&gt;Pick a Date&lt;/label&gt;
    &lt;date-picker
        minDate=&quot;11/1/2015&quot;
        maxDate=&quot;11/12/2016&quot; 
        [dateFilter]=&quot;dateFilter&quot;
        (valueChange)=&quot;datePickerValue&quot;&gt;
        &lt;div class=&quot;date-picker-input-group&quot;&gt;
            &lt;input name=&quot;date&quot; dateField class=&quot;form-control&quot; value=&quot;5/6/2016&quot; placeholder=&quot;pick a date&quot; /&gt;
        &lt;/div&gt;
    &lt;/date-picker&gt;
&lt;/div&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class DatePickerExample { 
    datePickerValue: Date;
    
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

<h3>DateField Attributes</h3>
<table-sortable
    [columns]="attributesColumns"
    [data]="dateFieldAttributes"
    [sort]="attributesSort">
    Loading table...
</table-sortable>

</div>`,
        directives: [DATE_PICKER_PROVIDERS, CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class DatePickerDemo { 
    datePickerValue = new Date(2016,7,6);
    datePickerFieldValue = "8/6/2016";
    dateFilter(d: Date): boolean {
        if([2].indexOf(d.getDay()) > -1)
            return false;
        
        return true;
    }
    
    attributes:any[] = [
        new Attribute('minDate', 'string|Date', 'new Date(1900,0,1)', 'Minimum selectable date'),
        new Attribute('maxDate', 'string|Date', 'new Date(2200,0,1)', 'Maximum selectable date'),
        new Attribute('dateFilter', 'function(date): boolean', 'null', 'Filter to disable dates. A return of <i>false</i> will disable the day'),
        new Attribute('value', 'Date', 'null', 'Two-way binding of the selected DateRange')
    ];
    
    dateFieldAttributes:any[] = [
        new Attribute('date', 'Date', 'null', 'Two-way binding of the selected date'),
        new Attribute('value', 'string|Date', 'null', 'Two-way binding of the selected date'),
        new Attribute('ngModel', 'string', 'null', 'Two-way binding of the result input string'),
    ];
    
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}

export var DATEPICKER_DEMO_PROVIDERS = [
    DatePickerDemo
];