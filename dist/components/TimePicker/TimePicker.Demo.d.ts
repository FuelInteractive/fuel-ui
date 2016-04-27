import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
import { Event, Attribute } from '../../utilities/demoUtilities';
export declare class TimePickerDemo {
    date: Date;
    minDate: Date;
    maxDate: Date;
    hourStep: number;
    minuteStep: number;
    readonly: boolean;
    disabled: boolean;
    showSeconds: boolean;
    showSpinners: boolean;
    showMeridian: boolean;
    setDate(): void;
    timepickerAttributes: Attribute[];
    timepickerAttributesColumns: TableSortableColumn[];
    timepickerAttributesSort: TableSortableSorting;
    timepickerEvents: Event[];
    timepickerEventsColumns: TableSortableColumn[];
    timepickerEventsSort: TableSortableSorting;
}
export declare var TIMEPICKER_DEMO_PROVIDERS: typeof TimePickerDemo[];
