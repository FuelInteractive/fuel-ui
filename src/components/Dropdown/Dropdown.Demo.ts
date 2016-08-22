import {Component} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/tableSortable/tableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "components/dropdown/dropdown.demo.html"
})
export class DropdownDemo {
    attributes:any[] = [
        new Attribute('label', 'string', 'null', 'Dropdown button text')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}