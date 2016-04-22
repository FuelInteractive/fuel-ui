import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
import { Attribute } from '../../utilities/demoUtilities';
export declare class TooltipDemo {
    attributes: Attribute[];
    attributesColumns: TableSortableColumn[];
    attributesSort: TableSortableSorting;
}
export declare var TOOLTIP_DEMO_PROVIDERS: typeof TooltipDemo[];
