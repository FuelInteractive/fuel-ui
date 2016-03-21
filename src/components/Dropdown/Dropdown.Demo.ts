import {Component} from 'angular2/core';
import {DROPDOWN_COMPONENT_PROVIDERS} from './Dropdown';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">Dropdown</h2>
            <p class="card-text">Dropdown is a custom component to display informational messages</p>
        </div>
    </div>
</div>

<dropdown label="test dropdown label">
    <a href="#" class="dropdown-item">Link 1</a>
    <a href="#" class="dropdown-item">Link 2</a>
    <a href="#" class="dropdown-item">Link 3</a>
</dropdown>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {Dropdown} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>Dropdown is a custom element to programmatically create dropdowns</p>

<h3>Usage</h3>
<pre>
<code class="language-markup" code-highlight>
&lt;dropdown label=&quot;test dropdown label&quot;&gt;
    &lt;a href=&quot;#&quot; class=&quot;dropdown-item&quot;&gt;Link 1&lt;/a&gt;
    &lt;a href=&quot;#&quot; class=&quot;dropdown-item&quot;&gt;Link 2&lt;/a&gt;
    &lt;a href=&quot;#&quot; class=&quot;dropdown-item&quot;&gt;Link 3&lt;/a&gt;
&lt;/dropdown&gt;
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
            <td>label</td>
            <td>string</td>
            <td>null</td>
            <td>Dropdown button text</td>
        </tr>
    </tbody>
</table>

</div>`,
        directives: [DROPDOWN_COMPONENT_PROVIDERS, CodeHighlighter]
})
export class DropdownDemo {
}

export var DROPDOWN_DEMO_PROVIDERS = [
    DropdownDemo
];