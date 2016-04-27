import { Tag } from './Tag';
import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
import { Event, Attribute } from '../../utilities/demoUtilities';
export declare class TagDemo {
    valueError: boolean;
    tempTag: any;
    tags: any[];
    clearTags(): void;
    addTag(): void;
    removeLog(tag: Tag): void;
    tagAttributes: Attribute[];
    tagAttributesColumns: TableSortableColumn[];
    tagAttributesSort: TableSortableSorting;
    tagEvents: Event[];
    tagEventsColumns: TableSortableColumn[];
    tagEventsSort: TableSortableSorting;
}
export declare var TAG_DEMO_PROVIDERS: typeof TagDemo[];
