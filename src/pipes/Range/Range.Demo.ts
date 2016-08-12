import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RANGE_PROVIDERS} from './Range';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  templateUrl: "pipes/Range/Range.Demo.html",
    directives: [CORE_DIRECTIVES, CodeHighlighter, TableSortable, TAB_PROVIDERS],
    pipes: [RANGE_PROVIDERS]
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

export var RANGE_DEMO_PROVIDERS = [
    RangeDemo
];