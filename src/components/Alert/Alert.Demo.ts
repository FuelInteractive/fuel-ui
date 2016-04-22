import {Component} from 'angular2/core';
import {ALERT_PROVIDERS} from './Alert';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Alert</h2>
            <p class="card-text">Alert is a custom component to display informational messages</p>
        </div>
    </div>
</div>

<alert
    [(displayed)]="showAlert"
    [type]="alertType">
    <span [innerHtml]="alertBody"></span>
</alert>
<button class="btn btn-success" (click)="showSuccess()">Show Alert Success</button>
<button class="btn btn-danger" (click)="showError()">Show Alert Error</button>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {Alert} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>Alert is a custom element to programmatically display feedback messages typically for user actions</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;alert [(displayed)]=&quot;showAlert&quot; type=&quot;success&quot; [closeButton]=&quot;false&quot;&gt;
    &lt;strong&gt;Success!&lt;/strong&gt; Your alert is showing!
&lt;/alert&gt;
</code>
</pre>
</tab>
<tab heading="TypeScript">
<pre>
<code class="language-javascript" code-highlight>
export class AlertExample {
    showAlert: boolean = false;
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
        directives: [ALERT_PROVIDERS, CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class AlertDemo {
    showAlert: boolean = false;
    alertType: string = "success";
    alertBody: string = "<strong>Some alert</strong> success message or something";
    
    showSuccess(): void {
        this.alertType = "success";
        this.alertBody = "<strong>Some alert</strong> success message or something";
        this.showAlert = true;
    }
    
    showError(): void {
        this.alertType = "danger";
        this.alertBody = "<strong>Something went wrong</strong> error message or something";
        this.showAlert = true;
    }
    
    test(): void{
        console.log("changed");
    }
    
    attributes:any[] = [
        new Attribute('displayed', 'boolean', 'false', 'Two-way binding to display the alert'),
        new Attribute('closeButton', 'boolean', 'true', "Option to display the 'X' in the right hand corner to close the alert"),
        new Attribute('type', 'string', 'success', 'The type of alert to display. Default types include success, info, warning, and danger. <a href="http://v4-alpha.getbootstrap.com/components/alerts/#link-color" target="_blank">More info here...</a>'),
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}

export var ALERT_DEMO_PROVIDERS = [
    AlertDemo
];