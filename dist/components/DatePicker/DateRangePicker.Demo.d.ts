import { DateRange } from '../../utilities/DateUtils';
import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
export declare class DateRangePickerDemo {
    dateRangePickerValue: DateRange;
    datePickerValueChange(event: any): void;
    dateFilter(d: Date): boolean;
    attributes: any[];
    attributesColumns: TableSortableColumn[];
    attributesSort: TableSortableSorting;
}
export declare var DATERANGEPICKER_DEMO_PROVIDERS: typeof DateRangePickerDemo[];
