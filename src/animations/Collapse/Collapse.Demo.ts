import {Component, trigger, state, style, transition, animate, group, keyframes} from '@angular/core';
import {Collapse} from './collapse';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  styles: [`
    #collapse-demo-box {
            border: 1px solid black; 
            padding: 0 25px;
            box-sizing: border-box;
            overflow: hidden;
        }
  `],
  templateUrl: "animations/Collapse/Collapse.demo.html",
    animations: [
        Collapse(300)
    ]
})
export class CollapseDemo { 
    collapsed: boolean = false;
  
    attributes:any[] = [
        new Attribute('duration', 'number', '300', 'Number of milliseconds for how long the open/close animation takes')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}
