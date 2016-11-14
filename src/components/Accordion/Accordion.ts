import {Component, ViewEncapsulation, Input, NgModule, ContentChildren, QueryList, AfterContentInit, EventEmitter} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AccordionItem} from "./AccordionItem";
import {AccordionHeading} from "./AccordionHeading";

@Component({
    selector: 'accordion',
    template: `<ng-content></ng-content>`,
    styleUrls: ['Accordion.css'],
    encapsulation: ViewEncapsulation.None
})
export class Accordion implements AfterContentInit {
    @Input() public closeOthers:boolean = true;
    @Input() public duration:number = 250;

    @ContentChildren(AccordionItem)
    items: QueryList<AccordionItem>;

    itemEvents: EventEmitter<any>[] = [];

    ngAfterContentInit(): void {
        this.items.changes.subscribe(i => this.registerItems());
        this.registerItems();
    }

    registerItems(): void {
        for(let event of this.itemEvents)
            event.unsubscribe();
        
        for(let item of this.items.toArray()) {
            item.openChange.subscribe(() => {
                this.closeOtherItems(item);
            });
        }
    }

    public closeOtherItems(openItem:AccordionItem):void {
        if (!this.closeOthers) return;

        this.items.forEach((item:AccordionItem) => {
            if (item !== openItem) {
                item.open = false;
            }
        });
    }
}

export const accordionDirectives = [
    Accordion,
    AccordionItem,
    AccordionHeading
]

@NgModule({
    imports: [CommonModule],
    declarations: accordionDirectives,
    exports: accordionDirectives
})
export class FuiAccordionModule { }