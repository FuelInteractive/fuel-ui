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
  
  selectedClass(columnName: string): string{
    return columnName == this.sort.column ? 'sort-' + (this.sort.descending ? 'desc' : 'asc') : '';
  }
  
  changeSorting(columnName: string): void{
    var sort = this.sort;
    if (sort.column == columnName) {
      sort.descending = !sort.descending;
    } else {
      sort.column = columnName;
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
