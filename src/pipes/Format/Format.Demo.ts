import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from "angular2/common";
import {FORMAT_PROVIDERS} from './Format';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';

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
<pre>
<code class="language-javascript" code-highlight>
export class FormatExample {
    someNumberVar: string = '435.23528';
    someTimestamp: number = 1442187616000;
}
</code>
</pre>

<pre>
<code class="language-javascript" code-highlight>
{<pre>{</pre>someVar | format : 'number : 2'}}
</code>
</pre>

<h3>Parameters</h3>
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
            <td>type</td>
            <td>string</td>
            <td>text</td>
            <td>The type of data you want the input to be output as</td>
        </tr>
    </tbody>
</table>

<h3>Data Types Supported</h3>
<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>Type</th>
            <th>someType : x?</th>
            <th>Input</th>
            <th>Output</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>date</td>
            <td>true - format of date - default: 'MMM d, y h:mm:ss a'</td>
            <td>"1442187616000"</td>
            <td>Sep 13, 2015, 7:40:16 PM</td>
        </tr>
        <tr>
            <td>datetime</td>
            <td>true - format of date - default: 'MMM d, y h:mm:ss a'</td>
            <td>"1442187616000"</td>
            <td>Sep 13, 2015, 7:40:16 PM</td>
        </tr>
        <tr>
            <td>decimal</td>
            <td>true - number formatting - default: '1.0-0'</td>
            <td>"1442187616000"</td>
            <td>1442187616000</td>
        </tr>
        <tr>
            <td>number</td>
            <td>true - number formatting - default: '1.0-0'</td>
            <td>"1442187616000"</td>
            <td>1442187616000</td>
        </tr>
        <tr>
            <td>percentage</td>
            <td>true - number formatting - default: '1.0-0'</td>
            <td>"1442187616000"</td>
            <td>"1442187616000%"</td>
        </tr>
        <tr>
            <td>text</td>
            <td>false</td>
            <td>"1442187616000"</td>
            <td>"1442187616000"</td>
        </tr>
    </tbody>
</table>

</div>`,
    directives: [CORE_DIRECTIVES, CodeHighlighter],
    pipes: [FORMAT_PROVIDERS]
})
export class FormatDemo {
    someNumberVar: string = '435.23528';
    someTimestamp: number = 1442187616000;
}

export var FORMAT_DEMO_PROVIDERS = [
    FormatDemo
];