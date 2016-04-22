import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from "angular2/common";
import {FORMAT_PROVIDERS} from './Format';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

export class DataType{
    public Type: string;
    public Parameters: string;
    public Input: string;
    public Output: string;
    
    constructor(Type: string, Parameters: string, Input: string, Output: string) {
        this.Type = Type;
        this.Parameters = Parameters;
        this.Input = Input;
        this.Output = Output;
    }
}

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Format</h2>
            <p class="card-text">Format is a custom pipe to format any string into a type by an identifying string</p>
        </div>
    </div>
</div>

<h3>Number/Decimal</h3>
<p>
    <code>someVar | format : 'number : 1.0-2'</code><br/>
</p>

<p>Input: <code>someNumberVar: string = '435.23528';</code>
<p>Output: {{someNumberVar | format : 'number : 1.0-2'}}</p>
<p>Number format is like this: <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>
<ul>
    <li> minIntegerDigits is the minimum number of integer digits to use. Defaults to 1.</li>
    <li> minFractionDigits is the minimum number of digits after fraction. Defaults to 0.</li>
    <li> maxFractionDigits is the maximum number of digits after fraction. Defaults to 0.</li>
</ul>

<h3>Date/DateTime</h3>
<p>
    <code>someTimestamp | format : 'dateTime : MMM d, y h:mm:ss a'</code><br/>
</p>

<p>Input: <code>someTimestamp: number = 1442187616000;</code>
<p>Output: {{someTimestamp | format : 'dateTime : MMM d, y h:mm:ss a'}}</p>

<h3>Data Types Supported</h3>
<table-sortable
    [columns]="dataTypesColumns"
    [data]="dataTypes"
    [sort]="dataTypesSort">
    Loading table...
</table-sortable>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {FormatPipe} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>Format pipe is used to format any string into a type by an identifying string. This is good for when you know the format of the output, but don't necessarily know the input type
</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;span&gt;{<pre>{</pre>someVar | format : 'number : 1.0-2'}}&lt;/span&gt;
&lt;span&gt;{<pre>{</pre>someTimestamp | format : 'dateTime : MMM d, y h:mm:ss a'}}&lt;/span&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class FormatExample {
    someNumberVar: string = '435.23528';
    someTimestamp: number = 1442187616000;
}
</code>
</pre>
</tab>
</tabset>

<h3>Parameters</h3>
<table-sortable
    [columns]="parametersColumns"
    [data]="parameters"
    [sort]="parametersSort">
    Loading table...
</table-sortable>

</div>`,
    directives: [CORE_DIRECTIVES, CodeHighlighter, TableSortable, TAB_PROVIDERS],
    pipes: [FORMAT_PROVIDERS]
})
export class FormatDemo {
    someNumberVar: string = '435.23528';
    someTimestamp: number = 1442187616000;
    
    parameters:Attribute[] = [
        new Attribute('Name', 'string', 'text', 'The type of data you want the input to be output as'),
    ];
    parametersColumns:TableSortableColumn[] = AttributeColumns;
    parametersSort:TableSortableSorting = AttributesDefaultSort;
    
    dataTypes:DataType[] = [
        new DataType('date', "true - format of date - default: 'MMM d, y h:mm:ss a'", '"1442187616000"', 'Sep 13, 2015, 7:40:16 PM'),
        new DataType('datetime', "true - format of date - default: 'MMM d, y h:mm:ss a'", '"1442187616000"', 'Sep 13, 2015, 7:40:16 PM'),
        new DataType('decimal', "true - number formatting - default: '1.0-0'", '"1442187616000"', '1442187616000'),
        new DataType('html', 'false', '"&lt;a href=&quot;http://fueltravel.com&quot; target=&quot;_blank&quot;&gt;Fuel Travel&lt;/a&gt;"', '<a href="http://fueltravel.com" target="_blank">Fuel Travel</a>'),
        new DataType('number', "true - number formatting - default: '1.0-0'", '"1442187616000"', '1442187616000'),
        new DataType('percentage', "true - number formatting - default: '1.0-0'", '"1442187616000"', '"1442187616000%"'),
        new DataType('text', 'false', '"&lt;a href=&quot;http://fueltravel.com&quot; target=&quot;_blank&quot;&gt;Fuel Travel&lt;/a&gt;"', '"&lt;a href=&quot;http://fueltravel.com&quot; target=&quot;_blank&quot;&gt;Fuel Travel&lt;/a&gt;"')
    ];
    dataTypesColumns:TableSortableColumn[] = [
        new TableSortableColumn('Type', 'Type', 'string'),
        new TableSortableColumn('Parameters?', 'Parameters', 'html'), 
        new TableSortableColumn('Input', 'Input', 'html'), 
        new TableSortableColumn('Output', 'Output', 'html'),
    ];
    dataTypesSort:TableSortableSorting = new TableSortableSorting('Type', false);
}

export var FORMAT_DEMO_PROVIDERS = [
    FormatDemo
];