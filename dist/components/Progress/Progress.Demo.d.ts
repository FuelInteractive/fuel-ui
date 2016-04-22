import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
import { Attribute } from '../../utilities/demoUtilities';
export declare class ProgressDemo {
    progress: number;
    attributes: Attribute[];
    attributesColumns: TableSortableColumn[];
    attributesSort: TableSortableSorting;
}
export declare var PROGRESS_DEMO_PROVIDERS: typeof ProgressDemo[];
