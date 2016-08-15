import {Component, trigger, state, style, transition, animate, group, keyframes} from '@angular/core';
import {Collapse} from './collapse';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

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
    ],
    directives: [CodeHighlighter, TableSortable, TAB_PROVIDERS]
})
export class CollapseDemo { 
    collapsed: boolean = false;
  
    attributes:any[] = [
        new Attribute('duration', 'number', '300', 'Number of milliseconds for how long the open/close animation takes')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}
