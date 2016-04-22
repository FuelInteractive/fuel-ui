import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
import { Attribute } from '../../utilities/demoUtilities';
export declare class RangeDemo {
    numbers: number[];
    startNumber: number;
    endNumber: number;
    stepNumber: number;
    parameters: Attribute[];
    parametersColumns: TableSortableColumn[];
    parametersSort: TableSortableSorting;
}
export declare var RANGE_DEMO_PROVIDERS: typeof RangeDemo[];
