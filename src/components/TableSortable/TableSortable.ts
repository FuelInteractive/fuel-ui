import {NgModule, Component, ChangeDetectionStrategy, Input} from '@angular/core'
import {CommonModule, JsonPipe} from '@angular/common'
import {FuiOrderByPipeModule} from "../../pipes/orderBy/orderBy"
import {FuiFormatPipeModule} from "../../pipes/format/format"
import {TableSortableColumn} from "./tableSortableColumn";
import {TableSortableSorting} from "./tableSortableSorting";

@Component({
  selector: 'table-sortable',
  templateUrl: 'components/tableSortable/tableSortable.html',
  pipes: [JsonPipe]
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

@NgModule({
    imports: [CommonModule, FuiFormatPipeModule, FuiOrderByPipeModule],
    declarations: [TableSortable],
    exports: [TableSortable]
})
export class FuiTableSortableModule { }