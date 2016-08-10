import {Component, trigger, state, style, transition, animate, group, keyframes} from '@angular/core';
import {Collapse} from './Collapse';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  styles: [`
    #collapse-demo-box {
            border: 1px solid black; 
            padding: 0 25px;
            box-sizing: border-box;
            overflow: hidden;
        }
  `],
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Collapse</h2>
            <p class="card-text">Collapse is a custom animation to display and hide content</p>
        </div>
    </div>
</div>

<button class="btn btn-primary" (click)="collapsed = !collapsed">Toggle Collapse</button>
<style>
    
</style>
<div id="collapse-demo-box" @collapse="collapsed ? 'true' : 'false'"> 
    <h2>All of your content</h2>
    <ul>
        <li>That you wish</li>
        <li>to be able</li>
        <li>to collapse</li>
    </ul>
    <p>At any time!</p>
</div>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {{'{'}}Collapse{{'}'}} from 'fuel-ui/fuel-ui';

@Component({{'{'}}
    animations: [Collapse(300)]
{{'}'}})
</code>
</pre>

<h3>Getting Started</h3>
<p>Collapse allows you to toggle content on the page with a nice sliding animation. Import the Collapse function from 'fuel-ui/fuel-ui', and add the function to your animations array of any component. You can optionally add a duration number as a parameter.</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;div @collapse=&quot;collapsed ? 'true' : 'false'&quot;&gt;
    &lt;h2&gt;All of your content&lt;/h2&gt;
    &lt;ul&gt;
        &lt;li&gt;That you wish&lt;/li&gt;
        &lt;li&gt;to be able&lt;/li&gt;
        &lt;li&gt;to collapse&lt;/li&gt;
    &lt;/ul&gt;
    &lt;p&gt;At any time!&lt;/p&gt;
&lt;/div&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class CollapseExample {{'{'}}
    collapsed: boolean = false;
{{'}'}}
</code>
</pre>
</tab>
</tabset>

<h3>Parameters</h3>
<table-sortable
    [columns]="attributesColumns"
    [data]="attributes"
    [sort]="attributesSort">
    Loading table...
</table-sortable>

</div>`,
    animations: [
        Collapse(300)
    ],
    directives: [CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class CollapseDemo { 
    collapsed: boolean = false;
  
    attributes:any[] = [
        new Attribute('duration', 'number', '300', 'Number of milliseconds for how long the open/close animation takes')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}

export var COLLAPSE_DEMO_PROVIDERS = [
    CollapseDemo
];