import {Component} from '@angular/core';
import {MODAL_PROVIDERS} from './Modal';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Modal</h2>
            <p class="card-text">Modal is a custom component to display a popup</p>
        </div>
    </div>
</div>

<div class="form-group row">
    <label for="size" class="col-md-1 form-control-label">Size</label>
    <div class="col-md-2">
        <select name="size" [(ngModel)]="size" class="c-select">
            <option value="">Default</option>
            <option value="sm">Small</option>
            <option value="lg">Large</option>
        </select>
    </div>
</div>
<button class="btn btn-primary" (click)="modal.showModal()">Show Modal</button>
<modal #modal
    modalTitle="Modal Title"
    [closeButton]="true"
    [closeOnUnfocus]="true"
    [size]="size"
    (close)="onClose()"
    (open)="onOpen()">
    <div class="modal-body">
        <ul>
            <li>Testing 1</li>
            <li>Testing 2</li>
            <li>Testing 3</li>
        </ul>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="modal.closeModal()">
            <i class="fa fa-chevron-left"></i> Go Back
        </button>
    </div>
</modal>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {Modal} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>Modal is a custom element to create a popup</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;button class=&quot;btn btn-primary&quot; (click)=&quot;modal.showModal()&quot;&gt;Toggle Modal&lt;/button&gt;
&lt;modal #modal
    modalTitle=&quot;Modal Title&quot;
    [closeButton]=&quot;true&quot;
    [closeOnUnfocus]=&quot;true&quot;
    size=&quot;lg&quot;
    (close)=&quot;onClose()&quot;
    (open)=&quot;onOpen()&quot;&gt;
    &lt;div class=&quot;modal-body&quot;&gt;
        &lt;ul&gt;
            &lt;li&gt;Any&lt;/li&gt;
            &lt;li&gt;Html&lt;/li&gt;
            &lt;li&gt;Here&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    &lt;div class=&quot;modal-footer&quot;&gt;
        &lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; (click)=&quot;modal.closeModal()&quot;&gt;
            &lt;i class=&quot;fa fa-chevron-left&quot;&gt;&lt;/i&gt; Go Back
        &lt;/button&gt;
    &lt;/div&gt;
&lt;/modal&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class ModalExample {
    onClose(){
        console.log("Modal has been closed!");
    }
    onOpen(){
        console.log("Modal has been opened!");
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
        directives: [MODAL_PROVIDERS, CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class ModalDemo {
    closeText: string = "Cancel";
    size: string = "";

    onClose(){
        console.log("Modal has been closed!");
    }
    onOpen(){
        console.log("Modal has been opened!");
    }
    
    attributes:any[] = [
        new Attribute('closeOnUnfocus', 'boolean', 'true', 'Closes the opened modal when the user clicks off of it'),
        new Attribute('closeButton', 'boolean', 'true', "Option to display an 'X' close button in the corner of the modal"),
        new Attribute('modalTitle', 'string', 'null', 'Text to display in modal header'),
        new Attribute('size', 'string', 'null', "Change the size of the modal. Supports 'sm' and 'small' for small size and 'lg' and 'large' for large. Null or empty will keep the default size")
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
    events:Event[] = [
        new Event('close', 'null', 'When the modal is closed'),
        new Event('open', 'null', 'When the modal is opened')
    ];
    eventsColumns:TableSortableColumn[] = EventColumns;
    eventsSort:TableSortableSorting = EventsDefaultSort;
}

export var MODAL_DEMO_PROVIDERS = [
    ModalDemo
];