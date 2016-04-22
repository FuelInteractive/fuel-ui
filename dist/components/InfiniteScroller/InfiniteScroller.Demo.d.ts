import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
import { Event, Attribute } from '../../utilities/demoUtilities';
export declare class InfiniteScrollerDemo {
    infiniteScrollItems: string[];
    infiniteScrollMin: number;
    infiniteScrollMax: number;
    constructor();
    infiniteScrollPrev(): void;
    infinteScrollNext(clean?: boolean): void;
    attributes: Attribute[];
    attributesColumns: TableSortableColumn[];
    attributesSort: TableSortableSorting;
    events: Event[];
    eventsColumns: TableSortableColumn[];
    eventsSort: TableSortableSorting;
}
export declare var INFINITESCROLLER_DEMO_PROVIDERS: typeof InfiniteScrollerDemo[];
