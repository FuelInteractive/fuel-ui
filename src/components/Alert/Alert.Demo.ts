import {Component} from 'angular2/core';
import {ALERT_PROVIDERS} from './Alert';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
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
<pre>
<code class="language-markup" code-highlight>
&lt;alert [(displayed)]=&quot;showAlert&quot; type=&quot;success&quot; [closeButton]=&quot;false&quot;&gt;
    &lt;strong&gt;Success!&lt;/strong&gt; Your alert is showing!
&lt;/alert&gt;
</code>
</pre>

<h3>Attributes</h3>
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
            <td>displayed</td>
            <td>boolean</td>
            <td>false</td>
            <td>Two-way binding to display the alert</td>
        </tr>
        <tr>
            <td>closeButton</td>
            <td>boolean</td>
            <td>true</td>
            <td>Option to display the 'X' in the right hand corner to close the alert</td>
        </tr>
        <tr>
            <td>type</td>
            <td>string</td>
            <td>success</td>
            <td>The type of alert to display. Default types include success, info, warning, and danger. <a href="http://v4-alpha.getbootstrap.com/components/alerts/#link-color" target="_blank">More info here...</a></td>
        </tr>
    </tbody>
</table>

</div>`,
        directives: [ALERT_PROVIDERS, CodeHighlighter]
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
}

export var ALERT_DEMO_PROVIDERS = [
    AlertDemo
];