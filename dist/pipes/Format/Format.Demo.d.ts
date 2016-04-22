import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
import { Attribute } from '../../utilities/demoUtilities';
export declare class DataType {
    Type: string;
    Parameters: string;
    Input: string;
    Output: string;
    constructor(Type: string, Parameters: string, Input: string, Output: string);
}
export declare class FormatDemo {
    someNumberVar: string;
    someTimestamp: number;
    parameters: Attribute[];
    parametersColumns: TableSortableColumn[];
    parametersSort: TableSortableSorting;
    dataTypes: DataType[];
    dataTypesColumns: TableSortableColumn[];
    dataTypesSort: TableSortableSorting;
}
export declare var FORMAT_DEMO_PROVIDERS: typeof FormatDemo[];
