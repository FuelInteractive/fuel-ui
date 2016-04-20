import { TableSortableColumn } from "./TableSortableColumn";
import { TableSortableSorting } from "./TableSortableSorting";
export declare class TableSortable {
    columns: TableSortableColumn[];
    data: any[];
    sort: TableSortableSorting;
    constructor();
    selectedClass(columnName: string): string;
    changeSorting(columnName: string): void;
    convertSorting(): string;
}
export declare var TABLESORTABLE_PROVIDERS: typeof TableSortable[];
export { TableSortableColumn } from "./TableSortableColumn";
export { TableSortableSorting } from "./TableSortableSorting";
