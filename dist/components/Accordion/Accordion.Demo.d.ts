import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
import { Attribute } from '../../utilities/demoUtilities';
export declare class AccordionDemo {
    oneAtATime: boolean;
    duration: number;
    firstOpen: boolean;
    firstDisabled: boolean;
    lastOpen: boolean;
    contentItems: Array<string>;
    accordionItems: Array<any>;
    addContentItem(): void;
    addAccordionItem(): void;
    accordionAttributes: Attribute[];
    accordionAttributesColumns: TableSortableColumn[];
    accordionAttributesSort: TableSortableSorting;
    accordionItemAttributes: Attribute[];
    accordionItemAttributesColumns: TableSortableColumn[];
    accordionItemAttributesSort: TableSortableSorting;
}
export declare var ACCORDION_DEMO_PROVIDERS: typeof AccordionDemo[];
