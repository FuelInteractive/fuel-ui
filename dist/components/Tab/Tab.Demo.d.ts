import { Tab } from './Tab';
import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
import { Event, Attribute } from '../../utilities/demoUtilities';
export declare class TabDemo {
    tabs: any[];
    addTab(): void;
    setActiveTab(index: number): void;
    deselectLog(tab: Tab): void;
    selectLog(tab: Tab): void;
    removeLog(tab: Tab): void;
    tabSetAttributes: Attribute[];
    tabSetAttributesColumns: TableSortableColumn[];
    tabSetAttributesSort: TableSortableSorting;
    tabAttributes: Attribute[];
    tabAttributesColumns: TableSortableColumn[];
    tabAttributesSort: TableSortableSorting;
    tabEvents: Event[];
    tabEventsColumns: TableSortableColumn[];
    tabEventsSort: TableSortableSorting;
}
export declare var TAB_DEMO_PROVIDERS: typeof TabDemo[];
