import {Component} from 'angular2/core';
import {TABLESORTABLE_PROVIDERS, TableSortableColumn, TableSortableSorting} from './TableSortable';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
@Component({
  template: `
<div class="row">
    <div class="col-md-12">
        <div class="card card-block">
            <h2 class="card-title">TableSortable</h2>
            <p class="card-text">TableSortable is a custom element to display any arbitrary data in a sortable data table</p>
        </div>
    </div>
</div>

<section class="row m-a">
    <div class="col-md-8">
        <table-sortable
            [columns]="columns"
            [data]="rows"
            [sort]="sorting">
            Loading table...
        </table-sortable>
    </div>
</section>

<div class="source">
<h3>Import</h3>
<pre>
<code class="language-javascript" code-highlight>
import {TableSortable, TableSortableColumn, TableSortableSorting} from 'fuel-ui/fuel-ui';
</code>
</pre>

<h3>Getting Started</h3>
<p>TableSortable is a custom element to display any arbitrary data in a sortable table</p>

<h3>Usage</h3>
<pre>
<code class="language-markup" code-highlight>
&lt;table-sortable
    [columns]=&quot;columns&quot;
	[data]=&quot;rows&quot;
	[sort]=&quot;sorting&quot;&gt;
  Loading table...
&lt;/table-sortable&gt;
</code>
</pre>

<pre>
<code class="language-javascript" code-highlight>
export class TableSortableExample {
    rows: any[] = [
    {
      Name: 'Data 1',
      Amount: 100.23,
      Date: 1441588216000
    },
    {
      Name: 'Data 2',
      Amount: 0.875623,
      Date: 1442387616000
    },
    {
      Name: 'Data 3',
      Amount: .010123,
      Date: 1442187616000
    }
  ];
  columns: TableSortableColumn[] = [
    {
      display: 'Column 1', //The text to display
      variable: 'Name', //The name of the key that's apart of the data array
      filter: 'text' //The type data type of the column (number, text, date, etc.)
    },
    new TableSortableColumn('Column 2', 'Amount', 'decimal : 1.0-2'),
    new TableSortableColumn('Column 3', 'Date', 'dateTime')
  ];
  sorting: TableSortableSorting = {
    column: 'Name', //to match the variable of one of the columns
    descending: false
  };
}
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
            <td>columns</td>
            <td>TableSortableColumn[]</td>
            <td>null</td>
            <td>Array of all columns to be displayed and how to format them for ordering</td>
        </tr>
        <tr>
            <td>data</td>
            <td>any[]</td>
            <td>null</td>
            <td>Any arbitrary array of objects</td>
        </tr>
        <tr>
            <td>sort</td>
            <td>TableSortableSorting</td>
            <td>null</td>
            <td>Which column to sort on and which direction (ascending or descending)</td>
        </tr>
    </tbody>
</table>

</div>`,
        directives: [TABLESORTABLE_PROVIDERS, CodeHighlighter]
})
export class TableSortableDemo {
    rows: any[] = [
    {
      Name: 'Data 1',
      Amount: 100.23,
      Date: 1441588216000
    },
    {
      Name: 'Data 2',
      Amount: 0.875623,
      Date: 1442387616000
    },
    {
      Name: 'Data 3',
      Amount: .010123,
      Date: 1442187616000
    }
  ];
  columns: TableSortableColumn[] = [
    {
      display: 'Column 1', //The text to display
      variable: 'Name', //The name of the key that's apart of the data array
      filter: 'text' //The type data type of the column (number, text, date, etc.)
    },
    new TableSortableColumn('Column 2', 'Amount', 'decimal : 1.0-2'),
    new TableSortableColumn('Column 3', 'Date', 'dateTime')
  ];
  sorting: TableSortableSorting = {
    column: 'Name', //to match the variable of one of the columns
    descending: false
  };
}

export var TABLESORTABLE_DEMO_PROVIDERS = [
    TableSortableDemo
];