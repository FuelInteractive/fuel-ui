import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
import { Attribute } from '../../utilities/demoUtilities';
export declare class SliderDemo {
    singleSliderValue: number;
    doubleSliderValue: number;
    secondDoubleSliderValue: number;
    minValue: number;
    maxValue: number;
    attributes: Attribute[];
    attributesColumns: TableSortableColumn[];
    attributesSort: TableSortableSorting;
}
export declare var SLIDER_DEMO_PROVIDERS: typeof SliderDemo[];
