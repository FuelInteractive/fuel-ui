import {Component, Input} from '@angular/core';
import {AccordionItem} from './AccordionItem';

@Component({
    selector: 'accordion',
    template: `<ng-content></ng-content>`
})
export class Accordion {
    @Input() public closeOthers:boolean = true;
    @Input() public duration:number = 250;

    private items:Array<AccordionItem> = [];

    public closeOtherItems(openItem:AccordionItem):void {
        if (!this.closeOthers) return;

        this.items.forEach((item:AccordionItem) => {
            if (item !== openItem) {
                item.open = false;
                item.openChange.next(item.open);
            }
        });
    }

    public addItem(item:AccordionItem):void {
        this.items.push(item);
    }

    public removeItem(item:AccordionItem):void {
        let index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
}