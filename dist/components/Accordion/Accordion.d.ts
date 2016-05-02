import { AccordionItem } from './AccordionItem';
export declare class Accordion {
    closeOthers: boolean;
    duration: number;
    private items;
    closeOtherItems(openItem: AccordionItem): void;
    addItem(item: AccordionItem): void;
    removeItem(item: AccordionItem): void;
}
