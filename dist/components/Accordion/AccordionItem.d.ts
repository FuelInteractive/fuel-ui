import { OnInit, OnDestroy, EventEmitter } from 'angular2/core';
import { Accordion } from './Accordion';
export declare class AccordionItem implements OnInit, OnDestroy {
    heading: string;
    disabled: boolean;
    open: boolean;
    private _open;
    accordion: Accordion;
    openChange: EventEmitter<{}>;
    constructor(accordion: Accordion);
    ngOnInit(): any;
    ngOnDestroy(): any;
    toggleOpen(event: MouseEvent): any;
}
export declare var ACCORDION_PROVIDERS: (typeof Accordion | typeof AccordionItem)[];
