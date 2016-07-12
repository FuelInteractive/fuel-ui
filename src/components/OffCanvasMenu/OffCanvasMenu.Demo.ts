import {Component} from '@angular/core';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';
import {OFF_CANVAS_MENU_PROVIDERS} from "./offCanvasMenu";

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Off Canvas Menu</h2>
            <p class="card-text">Menu that originates from off canvas</p>
        </div>
    </div>
</div>

<off-canvas-menu [origin]="origin" [width]="width" [height]="height" 
    (close)="onClose()" (open)="onOpen()" #menu>
    <div class="p-a-1">
        <h3>Menu</h3>
        <button class="btn btn-info off-canvas-menu-close">Close Menu</button>
    </div>
</off-canvas-menu>

<div class="m-a">
    <div class="row">
        <label for="origin" class="col-md-1 form-control-label">Origin</label>
        <div class="col-md-2">
            <select name="origin" [(ngModel)]="origin" class="c-select">
                <option>left</option>
                <option>right</option>
                <option>top</option>
                <option>bottom</option>
            </select>
        </div>
    </div>
    <div class="row">
        <label for="width" class="col-md-1 form-control-label">Width</label>
        <div class="col-md-2">
            <input type="text" name="width" [(ngModel)]="width">
        </div>
    </div>
    <div class="row">
        <label for="width" class="col-md-1 form-control-label">Height</label>
        <div class="col-md-2">
            <input type="text" name="height" [(ngModel)]="height">
        </div>
    </div>
    <div class="row">
        <div class="col-md-2">
            <button class="btn btn-info" (click)="menu.toggleMenu()">Open Menu</button>
        </div>
    </div>
</div>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {OFF_CANVAS_MENU_PROVIDERS} from "fuel-ui/fuel-ui"
</code>
</pre>

<h3>Getting Started</h3>
<p>The off canvas menu provides a way to extend content from off screen</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;off-canvas-menu [origin]=&quot;origin&quot; [width]=&quot;width&quot; [height]=&quot;height&quot; 
    (close)=&quot;onClose()&quot; (open)=&quot;onOpen()&quot; #menu&gt;
    &lt;div class=&quot;p-a-1&quot;&gt;
        &lt;h3&gt;Menu&lt;/h3&gt;
        &lt;button class=&quot;btn btn-info off-canvas-menu-close&quot;&gt;Close Menu&lt;/button&gt;
    &lt;/div&gt;
&lt;/off-canvas-menu&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class OffCanvasMenuExample {
    origin = "left";  
    width = "25%";
    height = "25%";

    onClose(){
        console.log("Menu has been closed!");
    }
    onOpen(){
        console.log("Menu has been opened!");
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

<h3>Events</h3>
<table-sortable
    [columns]="eventsColumns"
    [data]="events"
    [sort]="eventsSort">
    Loading table...
</table-sortable>

</div>`,
        directives: [CodeHighlighter, TableSortable, TAB_PROVIDERS, OFF_CANVAS_MENU_PROVIDERS]
})
export class OffCanvasMenuDemo {
    origin = "left";  
    width = "25%";
    height = "25%";

    onClose(){
        console.log("Menu has been closed!");
    }
    onOpen(){
        console.log("Menu has been opened!");
    }

    attributes:any[] = [
        new Attribute('origin', '"left" | "top" | "right" "bottom"', '"left"', 'direction the menu extends from'),
        new Attribute('width', 'string', '25% / 100%', 'Width of menu, forced to 100% when menu origin is either top or bottom'),
        new Attribute('height', 'string', '25% / 100%', 'Height of menu, forced to 100% when menu origin is either left or right')
    ];
    
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
    events:Event[] = [
        new Event('close', 'null', 'When the menu is closed'),
        new Event('open', 'null', 'When the menu is opened')
    ];
    eventsColumns:TableSortableColumn[] = EventColumns;
    eventsSort:TableSortableSorting = EventsDefaultSort;
}

export var OFFCANVASMENU_DEMO_PROVIDERS = [
    OffCanvasMenuDemo
];