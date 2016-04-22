import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from "angular2/common";
import {RANGE_PROVIDERS} from './Range';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Range</h2>
            <p class="card-text">Range is a custom pipe to dynamically create an array of numbers based on a given range</p>
        </div>
    </div>
</div>

<p>
    <code>*ngFor="#number of numbers | range : {{startNumber}} : {{endNumber}} : {{stepNumber}}"</code><br/>
</p>

<p>Output: {{number | range : startNumber : endNumber : stepNumber | json}}</p>

<div class="form-group row">
    <label for="startNumber" class="col-sm-2 form-control-label">Starting Number</label>
    <div class="col-sm-2">
        <input name="startNumber" [(ngModel)]="startNumber" type="number" [max]="endNumber" class="form-control"> 
    </div>
</div>
<div class="form-group row">
    <label for="endNumber" class="col-sm-2 form-control-label">Ending Number</label>
    <div class="col-sm-2">
        <input name="endNumber" [(ngModel)]="endNumber" type="number" [min]="startNumber" class="form-control"> 
    </div>
</div>
<div class="form-group row">
    <label for="stepNumber" class="col-sm-2 form-control-label">Step Number</label>
    <div class="col-sm-2">
        <input name="stepNumber" [(ngModel)]="stepNumber" type="number" min="1" class="form-control"> 
    </div>
</div>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {RangePipe} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>Range is a pipe that simply takes in 3 arguments, a <code>start</code> number, <code>end</code> number, and <code>step</code> number.</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-javascript" code-highlight>
*ngFor="#number of numbers | range : start : end : step"
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class RangeExample {
    numbers:number[] = [];
    start:number = 0;
    end:number = 5;
    step:number = 1;
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
    pipes: [RANGE_PROVIDERS]
})
export class RangeDemo {
    numbers:number[] = [];
    startNumber:number = 0;
    endNumber:number = 5;
    stepNumber:number = 1;
    
    parameters:Attribute[] = [
        new Attribute('start', 'number', '0', 'The starting number of the array'),
        new Attribute('end', 'number', '4', 'The largest possible number of the array'),
        new Attribute('step', 'number', '1', 'The amount of step between each number within the array')
    ];
    parametersColumns:TableSortableColumn[] = AttributeColumns;
    parametersSort:TableSortableSorting = AttributesDefaultSort;
}

export var RANGE_DEMO_PROVIDERS = [
    RangeDemo
];