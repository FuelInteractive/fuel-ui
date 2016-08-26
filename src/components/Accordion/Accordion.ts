import {Component, Input, NgModule, ContentChildren, QueryList, AfterContentInit, EventEmitter} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AccordionItem} from './AccordionItem';
import {Collapse} from '../../animations/Collapse/Collapse';

@Component({
    selector: 'accordion',
    template: `<ng-content></ng-content>`,
    animations: [Collapse(350)]
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

const accordionComponents = [
    Accordion,
    AccordionItem
]

@NgModule({
    imports: [CommonModule],
    declarations: accordionComponents,
    exports: accordionComponents
})
export class FuiAccordionModule { }