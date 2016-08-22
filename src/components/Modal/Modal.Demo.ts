import {Component} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "components/modal/modal.demo.html"
})
export class ModalDemo {
    closeText: string = "Cancel";
    size: string = "";

    onClose(){
        console.log("Modal has been closed!");
    }
    onOpen(){
        console.log("Modal has been opened!");
    }
    
    attributes:any[] = [
        new Attribute('closeOnUnfocus', 'boolean', 'true', 'Closes the opened modal when the user clicks off of it'),
        new Attribute('closeButton', 'boolean', 'true', "Option to display an 'X' close button in the corner of the modal"),
        new Attribute('modalTitle', 'string', 'null', 'Text to display in modal header'),
        new Attribute('size', 'string', 'null', "Change the size of the modal. Supports 'sm' and 'small' for small size and 'lg' and 'large' for large. Null or empty will keep the default size")
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
    events:Event[] = [
        new Event('close', 'null', 'When the modal is closed'),
        new Event('open', 'null', 'When the modal is opened')
    ];
    eventsColumns:TableSortableColumn[] = EventColumns;
    eventsSort:TableSortableSorting = EventsDefaultSort;
}

export var MODAL_DEMO_PROVIDERS = [
    ModalDemo
];