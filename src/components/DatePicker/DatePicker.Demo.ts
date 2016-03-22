import {Component} from 'angular2/core';
import {DatePicker} from './DatePicker';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
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
        <date-picker
            label="Pick a date"
            minDate="11/1/2015"
            maxDate="11/12/2016" 
            [dateFilter]="dateFilter"
            (valueChange)="datePickerValue">
        </date-picker>
    </div>
</div>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {DatePicker} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>DatePicker is a custom element to select a date on a calendar. It supports filtering of dates so that you can disable dates programmatically. Also supports min and max dates</p>

<h3>Usage</h3>
<pre>
<code class="language-markup" code-highlight>
&lt;date-picker
    label=&quot;Pick a date&quot;
    minDate=&quot;11/1/2015&quot;
    maxDate=&quot;11/12/2016&quot; 
    [dateFilter]=&quot;dateFilter&quot;
    (valueChange)=&quot;datePickerValue&quot;&gt;
&lt;/date-picker&gt;
</code>
</pre>

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

<h3>Attributes</h3>
<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>label</td>
            <td>string</td>
            <td>null</td>
            <td>Placeholder to display before a date is selected</td>
        </tr>
        <tr>
            <td>minDate</td>
            <td>string|Date</td>
            <td>new Date(1900,0,1)</td>
            <td>Minimum selectable date</td>
        </tr>
        <tr>
            <td>maxDate</td>
            <td>string|Date</td>
            <td>new Date(2200,0,1)</td>
            <td>Maximum selectable date</td>
        </tr>
        <tr>
            <td>dateFilter</td>
            <td>function(date): boolean</td>
            <td>null</td>
            <td>Filter to disable dates. A return of <i>false</i> will disable the day</td>
        </tr>
        <tr>
            <td>value</td>
            <td>Date</td>
            <td>null</td>
            <td>Two-way binding of the selected date</td>
        </tr>
    </tbody>
</table>

</div>`,
        directives: [DatePicker, CodeHighlighter]
})
export class DatePickerDemo { 
    datePickerValue: Date;
    
    dateFilter(d: Date): boolean {
        if([2].indexOf(d.getDay()) > -1)
            return false;
        
        return true;
    }
}

export var DATEPICKER_DEMO_PROVIDERS = [
    DatePickerDemo
];