import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
export declare class DatePickerDemo {
    datePickerValue: Date;
    dateFilter(d: Date): boolean;
    attributes: any[];
    attributesColumns: TableSortableColumn[];
    attributesSort: TableSortableSorting;
}
export declare var DATEPICKER_DEMO_PROVIDERS: typeof DatePickerDemo[];
