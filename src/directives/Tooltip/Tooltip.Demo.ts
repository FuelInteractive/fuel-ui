import {Component} from 'angular2/core';
import {TOOLTIP_PROVIDERS} from './Tooltip';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
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
    <div tooltip="Tooltip text goes here.">Some text here.</div>
    <div tooltip="Example data binding: {{tooltipText}}!">Hover me with input value</div> <input [(ngModel)]="tooltipText" type="text" class="form-control">
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
<pre>
<code class="language-markup" code-highlight>
&lt;div tooltip=&quot;Tooltip text goes here.&quot;&gt;Some text here.&lt;/div&gt;
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
            <td>tooltip</td>
            <td>string</td>
            <td>null</td>
            <td>Text of the tooltip</td>
        </tr>
    </tbody>
</table>

</div>`,
        directives: [TOOLTIP_PROVIDERS, CodeHighlighter]
})
export class TooltipDemo {
}

export var TOOLTIP_DEMO_PROVIDERS = [
    TooltipDemo
];