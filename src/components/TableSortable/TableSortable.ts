import {Component, ChangeDetectionStrategy, Input} from '@angular/core'
import {CORE_DIRECTIVES, JsonPipe} from '@angular/common'
import {OrderByPipe} from "../../pipes/OrderBy/OrderBy"
import {FormatPipe} from "../../pipes/Format/Format"
import {TableSortableColumn} from "./TableSortableColumn";
import {TableSortableSorting} from "./TableSortableSorting";

@Component({
  selector: 'table-sortable',
  templateUrl: 'components/TableSortable/TableSortable.html',
  directives: [CORE_DIRECTIVES],
  pipes: [OrderByPipe, JsonPipe, FormatPipe]
})
export class TableSortable {
  
  @Input() columns: TableSortableColumn[];
  @Input() data: any[];
  @Input() sort: TableSortableSorting;
    
  constructor() {}
  
  selectedClass(column: TableSortableColumn): string{
    if(!column.sortable) return 'fuel-ui-not-sortable';

    return column.variable == this.sort.column ? 'sort-' + (this.sort.descending ? 'desc' : 'asc') : '';
  }
  
  changeSorting(column: TableSortableColumn): void{
    if(!column.sortable) return;

    var sort = this.sort;
    if (sort.column == column.variable) {
      sort.descending = !sort.descending;
    } else {
      sort.column = column.variable;
      sort.descending = false;
    }
  }
  
  convertSorting(): string{
    return this.sort.descending ? '-' + this.sort.column : this.sort.column;
  }
}

export var TABLESORTABLE_PROVIDERS = [
    TableSortable
];
export {TableSortableColumn} from "./TableSortableColumn";
export {TableSortableSorting} from "./TableSortableSorting";
