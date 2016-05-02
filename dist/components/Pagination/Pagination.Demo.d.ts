import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
import { Event, Attribute } from '../../utilities/demoUtilities';
export declare class PaginationDemo {
    totalPages: number;
    pagesAtOnce: number;
    currentPage: number;
    showSteps: boolean;
    showEnds: boolean;
    showSelect: boolean;
    pageChange(page: number): void;
    attributes: Attribute[];
    attributesColumns: TableSortableColumn[];
    attributesSort: TableSortableSorting;
    events: Event[];
    eventsColumns: TableSortableColumn[];
    eventsSort: TableSortableSorting;
}
export declare var PAGINATION_DEMO_PROVIDERS: typeof PaginationDemo[];
