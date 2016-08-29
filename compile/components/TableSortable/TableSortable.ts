import {NgModule, Component, ViewEncapsulation, ChangeDetectionStrategy, Input} from "@angular/core"
import {CommonModule, JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FuiOrderByPipeModule} from "../../pipes/OrderBy/OrderBy";
import {FuiFormatPipeModule} from "../../pipes/Format/Format";
import {TableSortableColumn} from "./TableSortableColumn";
import {TableSortableSorting} from "./TableSortableSorting";

@Component({
  selector: 'table-sortable',
  templateUrl: 'TableSortable.html',
  styleUrls: ['TableSortable.css'],
  encapsulation: ViewEncapsulation.None,
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

export {TableSortableColumn} from "./TableSortableColumn";
export {TableSortableSorting} from "./TableSortableSorting";

@NgModule({
    imports: [CommonModule, FormsModule, FuiFormatPipeModule, FuiOrderByPipeModule],
    declarations: [TableSortable],
    exports: [TableSortable]
})
export class FuiTableSortableModule { }