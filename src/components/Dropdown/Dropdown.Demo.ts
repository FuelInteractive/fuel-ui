import {Component} from '@angular/core';
import {DROPDOWN_COMPONENT_PROVIDERS} from './Dropdown';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

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
import {{'{'}}Dropdown{{'}'}} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>Dropdown is a custom element to programmatically create dropdowns</p>

<h3>Usage</h3>
<tabset>
<tab heading="HTML">
<pre>
<code class="language-markup" code-highlight>
&lt;dropdown label=&quot;test dropdown label&quot;&gt;
    &lt;a href=&quot;#&quot; class=&quot;dropdown-item&quot;&gt;Link 1&lt;/a&gt;
    &lt;a href=&quot;#&quot; class=&quot;dropdown-item&quot;&gt;Link 2&lt;/a&gt;
    &lt;a href=&quot;#&quot; class=&quot;dropdown-item&quot;&gt;Link 3&lt;/a&gt;
&lt;/dropdown&gt;
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
        directives: [DROPDOWN_COMPONENT_PROVIDERS, CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class DropdownDemo {
    attributes:any[] = [
        new Attribute('label', 'string', 'null', 'Dropdown button text')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}

export var DROPDOWN_DEMO_PROVIDERS = [
    DropdownDemo
];