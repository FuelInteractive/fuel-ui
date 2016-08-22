import {Component, OnInit, OnDestroy, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Tab} from './Tab';

@Component({
    selector: 'tabset',
    templateUrl: 'components/tab/tabSet.html'
})
export class TabSet implements OnInit, OnDestroy {

    @Input()
    public get vertical():boolean { return this._vertical;};
    public set vertical(value:boolean) {
        this._vertical = value;
        this.setClassMap();
    }
    protected _vertical:boolean;

    @Input()
    public get type():string {return this._type;};
    public set type(value:string) {
        this._type = value;
        this.setClassMap();
    }
    protected _type:string;

    public tabs:Array<Tab> = [];
    private destroyed:boolean;
    private classMap:any = {};

    public ngOnInit():void {
        this.type = this.type !== 'undefined' ? this.type : 'tabs';
    }

    public ngOnDestroy():void {
        this.destroyed = true;
    }

    public addTab(tab:Tab):void {
        this.tabs.push(tab);
        tab.active = this.tabs.length === 1 && tab.active !== false;
    }

    public removeTab(tab:Tab):void {
        let index = this.tabs.indexOf(tab);
        if (index === -1 || this.destroyed) {
            return;
        }

        if (tab.active && this.hasAvailableTabs(index)) {
            let newActiveIndex = this.getClosestTabIndex(index);
            this.tabs[newActiveIndex].active = true;
        }

        tab.remove.next(tab);
        this.tabs.splice(index, 1);
    }

    private getClosestTabIndex(index:number):number {
        let tabsLength = this.tabs.length;
        if (!tabsLength) {
            return -1;
        }

        for (let step = 1; step <= tabsLength; step += 1) {
            let prevIndex = index - step;
            let nextIndex = index + step;
            if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    }

    private hasAvailableTabs(index:number):boolean {
        let tabsLength = this.tabs.length;
        if (!tabsLength) {
            return false;
        }

        for (let i = 0; i < tabsLength; i += 1) {
            if (!this.tabs[i].disabled && i !== index) {
                return true;
            }
        }
        return false;
    }

    private setClassMap():void {
        this.classMap = {
            'nav-stacked': this.vertical,
            ['nav-' + (this.type || 'tabs')]: true
        };
    }
}