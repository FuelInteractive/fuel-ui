### TableSortable Selector
`TableSortable` - `<table-sortable></table-sortable>`

### TableSortable Settings

  * `[columns]` _- TableSortableColumn[] - (Default: `null`)_ -
    Array of all columns to be displayed and how to format them for ordering
  * `[rows]` _- any[]_ -
    Any arbitrary array of objects
  * `[sorting]` _- TableSortableSorting - (Default: `null`)_ -
    Which column to sort on and which direction (ascending or descending)

### TableSortable Example
```javascript
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
```

```html
<table-sortable
        [columns]="columns"
        [data]="rows"
        [sort]="sorting">
    Loading table...
</table-sortable>
```