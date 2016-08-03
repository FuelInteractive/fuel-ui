import {Component} from '@angular/core';
import {TOOLTIP_PROVIDERS} from './Tooltip';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Tooltip</h2>
            <p class="card-text">Tooltip is a directive that causes a tooltip to display on the elements when it is focused on your hovered over</p>
        </div>
    </div>
</div>

<section class="row m-a">
    <div class="row">
        <div class="col-md-3">
            <a href="javascript:;" tooltip="Tooltip text goes here." 
                [position]="position" [color]="color" [size]="size"
                [rounded]="rounded" [always]="always">
                Some text here.
            </a>
        </div>
        <div class="col-md-4 form-group">
            <div tooltip="You have entered: {{tooltipText}}!" 
                        [position]="position" [color]="color" [size]="size"
                        [rounded]="rounded" [always]="always">
                <input [(ngModel)]="tooltipText" name="tooltipText" type="text" class="form-control" placeholder="Tooltip text" /> 
            </div>
            <small class="text-muted">Enter text above, then hover the input.</small>
        </div>
    </div><br/>
    
    <form>
        <div class="form-group row">
            <label for="position" class="col-sm-2 col-md-1 form-control-label">Position</label>
            <div class="col-sm-2">
                <select [(ngModel)]="position" class="custom-select" name="position">
                    <option value="bottom-right">bottom-right</option>
                    <option value="bottom">bottom</option>
                    <option value="bottom-left">bottom-left</option>
                    <option value="right">right</option>
                    <option value="left">left</option>
                    <option value="top-right">top-right</option>
                    <option value="top">top</option>
                    <option value="top-left">top-left</option>
                </select>
            </div>
        </div>
        <div class="form-group row">
            <label for="color" class="col-sm-2 col-md-1 form-control-label">Color</label>
            <div class="col-sm-2">
                <select [(ngModel)]="color" class="custom-select" name="color">
                    <option value="none">none</option>
                    <option value="error">error</option>
                    <option value="warning">warning</option>
                    <option value="info">info</option>
                    <option value="success">success</option>      
                </select>
            </div>
        </div>
        <div class="form-group row">
            <label for="size" class="col-sm-2 col-md-1 form-control-label">Size</label>
            <div class="col-sm-2">
                <select [(ngModel)]="size" class="custom-select" name="size">
                    <option value="auto">auto</option>
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>    
                </select>
            </div>
        </div>
        <div class="form-group row">
            <label for="rounded" class="form-control-label">Rounded</label>
            <input #roundedcb type="checkbox" (change)="rounded = roundedcb.checked" [checked]="rounded" />
        </div>
        <div class="form-group row">
            <label for="always" class="form-control-label">Always Showing</label>
            <input #alwayscb type="checkbox" (change)="always = alwayscb.checked" [checked]="always" />
        </div>
    </form>
</section>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {Tooltip} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>Tooltip directive makes it easy to add a tooltip to any element. Inputs must be wrapped in a span or div to properly display. Inputs are not containers; therefore, cannot use :before and :after pseudo-elements. </p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;a href=&quot;#&quot; tooltip=&quot;Tooltip text goes here.&quot; 
    [position]=&quot;position&quot; [color]=&quot;color&quot; [size]=&quot;size&quot;
    [rounded]=&quot;rounded&quot; [always]=&quot;always&quot;&gt;
    Some text here.
&lt;/a&gt;

&lt;div class=&quot;col-md-4 form-group&quot;&gt;
    &lt;div tooltip=&quot;You have entered: {<pre>{</pre>tooltipText}}!&quot; 
                [position]=&quot;position&quot; [color]=&quot;color&quot; [size]=&quot;size&quot;
                [rounded]=&quot;rounded&quot; [always]=&quot;always&quot;&gt;
        &lt;input [(ngModel)]=&quot;tooltipText&quot; type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Tooltip text&quot; /&gt; 
    &lt;/div&gt;
    &lt;small class=&quot;text-muted&quot;&gt;Enter text above, then hover the input.&lt;/small&gt;
&lt;/div&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class TooltipExample {
    position: string = "top";
    color: string = "none";
    size: string = "auto";
    rounded: boolean = false;
    always: boolean = false;
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
        directives: [TOOLTIP_PROVIDERS, CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class TooltipDemo {
    attributes:Attribute[] = [
        new Attribute('tooltip', 'string', 'null', 'Text of the tooltip'),
        new Attribute('position', 'string', 'top', "Position of the tooltip compared to the element. Allows for: 'bottom-right', 'bottom', 'bottom-left', 'right', 'left', 'top-right,' 'top', or 'top-left'"),
        new Attribute('color', 'string', 'none', "Color of tooltip. Allows for: 'error', 'info', 'success', and 'warning'. Using anything else, include 'none', will result in the default black background with white text"),
        new Attribute('rounded', 'boolean', 'false', 'Rounded edges of tooltip'),
        new Attribute('always', 'boolean', 'false', 'Tooltip always displays even on mouseout and unfocus'),
        new Attribute('size', 'string', 'auto', "Forced size of the tooltip. Allows for: 'small', 'medium', and 'large'. Anything else will cause the tooltip to shrink to fit, and stay on a single line."),
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
    position: string = "top";
    color: string = "none";
    size: string = "auto";
    rounded: boolean = false;
    always: boolean = false;
}

export var TOOLTIP_DEMO_PROVIDERS = [
    TooltipDemo
];