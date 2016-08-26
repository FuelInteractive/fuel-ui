import {Component} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "components/Progress/Progress.Demo.html"
})
export class ProgressDemo {
    progress: number = 25;
    
    attributes:Attribute[] = [
        new Attribute('value', 'number', '0', 'Percentage of progress bar that is filled'),
        new Attribute('max', 'number', '1', 'The number to fill the progress bar completely')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}