import {Component} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "Dropdown.Demo.html"
})
export class DropdownDemo {
    attributes:any[] = [
        new Attribute('label', 'string', 'null', 'Dropdown button text')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}