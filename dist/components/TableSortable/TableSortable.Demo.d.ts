import { TableSortableColumn, TableSortableSorting } from './TableSortable';
import { Attribute } from '../../utilities/demoUtilities';
export declare class TableSortableDemo {
    rows: any[];
    columns: TableSortableColumn[];
    sorting: TableSortableSorting;
    attributes: Attribute[];
    attributesColumns: TableSortableColumn[];
    attributesSort: TableSortableSorting;
}
export declare var TABLESORTABLE_DEMO_PROVIDERS: typeof TableSortableDemo[];
