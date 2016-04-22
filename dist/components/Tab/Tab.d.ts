import { OnDestroy, EventEmitter } from 'angular2/core';
import { TabSet } from './TabSet';
export declare class Tab implements OnDestroy {
    heading: string;
    disabled: boolean;
    removable: boolean;
    /** tab active state toggle */
    active: boolean;
    activeChange: EventEmitter<Tab>;
    select: EventEmitter<Tab>;
    deselect: EventEmitter<Tab>;
    remove: EventEmitter<Tab>;
    addClass: boolean;
    tabset: TabSet;
    private _active;
    constructor(tabset: TabSet);
    ngOnDestroy(): void;
}
export declare var TAB_PROVIDERS: (typeof Tab | typeof TabSet)[];
