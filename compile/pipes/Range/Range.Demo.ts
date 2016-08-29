import {Component} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "Range.Demo.html"
})
export class RangeDemo {
    numbers:number[] = [];
    startNumber:number = 0;
    endNumber:number = 5;
    stepNumber:number = 1;
    
    parameters:Attribute[] = [
        new Attribute('start', 'number', '0', 'The starting number of the array'),
        new Attribute('end', 'number', '4', 'The largest possible number of the array'),
        new Attribute('step', 'number', '1', 'The amount of step between each number within the array')
    ];
    parametersColumns:TableSortableColumn[] = AttributeColumns;
    parametersSort:TableSortableSorting = AttributesDefaultSort;
}