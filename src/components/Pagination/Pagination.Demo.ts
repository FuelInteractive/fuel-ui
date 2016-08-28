import {Component} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Event, EventColumns, EventsDefaultSort, Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "components/Pagination/Pagination.Demo.html"
})
export class PaginationDemo {
    totalPages: number = 10;
    pagesAtOnce: number = 5;
    currentPage: number = 1;
    showSteps: boolean = true;
    showEnds: boolean = true;
    showSelect: boolean = true;
    
    pageChange(page: number): void {
        this.currentPage = page;
    }
    
    attributes:Attribute[] = [
        new Attribute('currentPage', 'number', '1', 'Currently active page'),
        new Attribute('pagesAtOnce', 'number', '5', 'The max number of pages to be displayed at once'),
        new Attribute('totalPages', 'number', '10', 'Total number of pages'),
        new Attribute('showSelect', 'boolean', 'true', 'Show jump to select to choose page number from select box'),
        new Attribute('showEnds', 'boolean', 'true', 'Show first/last buttons to jump to the first or last page'),
        new Attribute('showSteps', 'boolean', 'true', 'Show arrows on ends of page numbers to step through pages')
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
    events:Event[] = [
        new Event('currentPageChange', '$event = newCurrentPage: number', 'New active page number')
    ];
    eventsColumns:TableSortableColumn[] = EventColumns;
    eventsSort:TableSortableSorting = EventsDefaultSort;
}

export var PAGINATION_DEMO_PROVIDERS = [
    PaginationDemo
];