import {Component} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from './TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "TableSortable.Demo.html"
})
export class TableSortableDemo {
    codeExample1 = `&lt;table-sortable
    [columns]=&quot;columns&quot;
	[data]=&quot;rows&quot;
	[sort]=&quot;sorting&quot;&gt;
  Loading table...
&lt;/table-sortable&gt;`;

    codeExample2 = `export class TableSortableExample {
    rows: any[] = [
    {
      Name: 'Data 1',
      Amount: 100.23,
      Date: 1441588216000,
      Desc: "You can't sort"
    },
    {
      Name: 'Data 2',
      Amount: 0.875623,
      Date: 1442387616000,
      Desc: "On this"
    },
    {
      Name: 'Data 3',
      Amount: .010123,
      Date: 1442187616000,
      Desc: "Table column"
    }
  ];
  columns: TableSortableColumn[] = [
    {
      display: 'Column 1', //The text to display
      variable: 'Name', //The name of the key that's apart of the data array
      filter: 'text', //The type data type of the column (number, text, date, etc.)
      sortable: true //Whether the user can sort on the column
    },
    new TableSortableColumn('Column 2', 'Amount', 'decimal : 1.0-2'),
    new TableSortableColumn('Column 3', 'Date', 'dateTime'),
    new TableSortableColumn('Column 4', 'Desc', 'text', false)
  ];
  sorting: TableSortableSorting = {
    column: 'Name', //to match the variable of one of the columns
    descending: false
  };
}`;

    rows: any[] = [
    {
      Name: 'Data 1',
      Amount: 100.23,
      Date: 1441588216000,
      Desc: "You can't sort"
    },
    {
      Name: 'Data 2',
      Amount: 0.875623,
      Date: 1442387616000,
      Desc: "On this"
    },
    {
      Name: 'Data 3',
      Amount: .010123,
      Date: 1442187616000,
      Desc: "Table column"
    }
  ];
  columns: TableSortableColumn[] = [
    {
      display: 'Column 1', //The text to display
      variable: 'Name', //The name of the key that's apart of the data array
      filter: 'text', //The type data type of the column (number, text, date, etc.)
      sortable: true //Whether the user can sort on the column
    },
    new TableSortableColumn('Column 2', 'Amount', 'decimal : 1.0-2'),
    new TableSortableColumn('Column 3', 'Date', 'dateTime'),
    new TableSortableColumn('Column 4', 'Desc', 'text', false)
  ];
  sorting: TableSortableSorting = {
    column: 'Name', //to match the variable of one of the columns
    descending: false
  };
  
  attributes:Attribute[] = [
    new Attribute('columns', 'TableSortableColumn[]', 'null', 'Array of all columns to be displayed and how to format them for ordering'),
    new Attribute('data', 'any[]', 'null', 'Any arbitrary array of objects'),
    new Attribute('sort', 'TableSortableSorting', 'null', 'Which column to sort on and which direction (ascending or descending)')
  ];
  attributesColumns:TableSortableColumn[] = AttributeColumns;
  attributesSort:TableSortableSorting = AttributesDefaultSort;
}