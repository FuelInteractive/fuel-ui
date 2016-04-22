import {Component} from 'angular2/core';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Progress</h2>
            <p class="card-text">Progress is a custom component to display an overall progress based on percentage</p>
        </div>
    </div>
</div>

<section class="row m-a">
    <form>
        <div class="form-group row">
            <label for="progress" class="col-sm-2 form-control-label">Progress %</label>
            <div class="col-sm-2">
                <input class="form-control" [(ngModel)]="progress" min="0" max="100" type="number" name="progress">
            </div>
        </div>
    </form>
    <progress class="progress progress-striped progress-animated" [value]="progress" max="100">{{progress}}%</progress>
</section>

<div class="source">
<h3>Getting Started</h3>
<p>Progress is an HTML5 Bootstrap element that displays a graphical progress bar</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;progress 
    class=&quot;progress progress-striped progress-animated&quot;
    [value]=&quot;progress&quot; 
    max=&quot;100&quot;&gt;
        {<pre>{</pre>progress}}%
&lt;/progress&gt;
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
directives: [CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class ProgressDemo {
    progress: number = 25;
    
    attributes:Attribute[] = [
        new Attribute('value', 'number', '0', 'Percentage of progress bar that is filled'),
        new Attribute('max', 'number', '1', 'The number to fill the progress bar completely')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}

export var PROGRESS_DEMO_PROVIDERS = [
    ProgressDemo
];