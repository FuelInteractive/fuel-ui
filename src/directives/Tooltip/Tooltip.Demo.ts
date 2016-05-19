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
    <div>
        <div tooltip="Tooltip text goes here." 
            position="{{position}}" color="{{color}}" size="{{size}}"
            rounded="{{rounded}}">
            Some text here.
        </div>
    </div>
    <div>
        <div tooltip="Example data binding: {{tooltipText}}!" 
            position={{position}} color="{{color}}" size="{{size}}"
            rounded="{{rounded}}">
            Hover me with input value
        </div>
    </div>
    <br />
    <input [(ngModel)]="tooltipText" type="text" class="form-control" placeholder="Tooltip text"><br />
    <label style="margin-bottom:0;">Tooltip position</label>
    <select [(ngModel)]="position" class="form-control">
        <option value="bottom-right">bottom-right</option>
        <option value="bottom">bottom</option>
        <option value="bottom-left">bottom-left</option>
        <option value="right">right</option>
        <option value="left">left</option>
        <option value="top-right">top-right</option>
        <option value="top">top</option>
        <option value="top-left">top-left</option>
    </select><br />
    <label style="margin-bottom:0;">Tooltip color</label>
    <select [(ngModel)]="color" class="form-control">
        <option value="none">none</option>
        <option value="indianred" style="background-color:indianred; color:white;">indianred</option>
        <option value="orange" style="background-color:orange; color:white;">orange</option>
        <option value="lightblue" style="background-color:lightblue; color:white;">lightblue</option>
        <option value="lightgreen" style="background-color:lightgreen; color:white;">lightgreen</option>      
    </select><br />
    <label style="margin-bottom:0;">Tooltip size</label>
    <select [(ngModel)]="size" class="form-control">
        <option value="auto">auto</option>
        <option value="small">small</option>
        <option value="medium">medium</option>
        <option value="large">large</option>    
    </select><br />
    <label style="margin-bottom:0;">Rounded corners</label>
    <select [(ngModel)]="rounded" class="form-control">
        <option value="false">no</option>
        <option value="true">yes</option>
    </select>
</section>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {Tooltip} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>Tooltip directive makes it easy to add a tooltip to any element</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;div tooltip=&quot;Tooltip text goes here.&quot;&gt;Some text here.&lt;/div&gt;
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
        new Attribute('tooltip', 'string', 'null', 'Text of the tooltip')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
    position: string = "top-left";
    color: string = "none";
    size: string = "auto";
    rounded: string = "false";
}

export var TOOLTIP_DEMO_PROVIDERS = [
    TooltipDemo
];