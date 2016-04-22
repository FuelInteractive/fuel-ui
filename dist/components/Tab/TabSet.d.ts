import { OnInit, OnDestroy } from 'angular2/core';
import { Tab } from './Tab';
export declare class TabSet implements OnInit, OnDestroy {
    vertical: boolean;
    protected _vertical: boolean;
    type: string;
    protected _type: string;
    tabs: Array<Tab>;
    private isDestroyed;
    private classMap;
    ngOnInit(): void;
    ngOnDestroy(): void;
    addTab(tab: Tab): void;
    removeTab(tab: Tab): void;
    private getClosestTabIndex(index);
    private hasAvailableTabs(index);
    private setClassMap();
}
