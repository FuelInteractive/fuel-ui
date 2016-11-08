import {Component} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "OffCanvasMenu.Demo.html"
})
export class OffCanvasMenuDemo {
    origin = "left";  
    width = "25%";
    height = "25%";

    onClose(){
        console.log("Menu has been closed!");
    }
    onOpen(){
        console.log("Menu has been opened!");
    }

    attributes:any[] = [
        new Attribute('origin', '"left" | "top" | "right" "bottom"', '"left"', 'direction the menu extends from'),
        new Attribute('width', 'string', '25% / 100%', 'Width of menu, forced to 100% when menu origin is either top or bottom'),
        new Attribute('height', 'string', '25% / 100%', 'Height of menu, forced to 100% when menu origin is either left or right')
    ];
    
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
    events:Event[] = [
        new Event('close', 'null', 'When the menu is closed'),
        new Event('open', 'null', 'When the menu is opened')
    ];
    eventsColumns:TableSortableColumn[] = EventColumns;
    eventsSort:TableSortableSorting = EventsDefaultSort;
}

export var OFFCANVASMENU_DEMO_PROVIDERS = [
    OffCanvasMenuDemo
];