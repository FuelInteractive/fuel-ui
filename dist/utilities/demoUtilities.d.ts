import { TableSortableColumn, TableSortableSorting } from '../components/TableSortable/TableSortable';
export declare class Attribute {
    Name: string;
    Type: string;
    Default: string;
    Description: string;
    constructor(Name: string, Type: string, Default: string, Description: string);
}
export declare var AttributeColumns: TableSortableColumn[];
export declare var AttributesDefaultSort: TableSortableSorting;
export declare class Event {
    Name: string;
    EventObject: string;
    Description: string;
    constructor(Name: string, EventObject: string, Description: string);
}
export declare var EventColumns: TableSortableColumn[];
export declare var EventsDefaultSort: TableSortableSorting;
