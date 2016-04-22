import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
import { Event, Attribute } from '../../utilities/demoUtilities';
export declare class AnimationDemo {
    play: boolean;
    animationLog: any[];
    start(): void;
    logStart($event: any): void;
    logEnd($event: any): void;
    attributes: Attribute[];
    attributesColumns: TableSortableColumn[];
    attributesSort: TableSortableSorting;
    events: Event[];
    eventsColumns: TableSortableColumn[];
    eventsSort: TableSortableSorting;
}
export declare var ANIMATION_DEMO_PROVIDERS: typeof AnimationDemo[];
