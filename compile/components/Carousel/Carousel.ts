import {NgModule, Directive, Component, ViewEncapsulation, Renderer} from "@angular/core";
import {QueryList, ContentChildren, ElementRef} from "@angular/core";
import {AfterContentInit, AfterViewInit, AfterContentChecked, AfterViewChecked, OnDestroy} from "@angular/core";
import {Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import {CommonModule} from "@angular/common";
//import {HammerGesturesPluginCommon} from "@angular//platform-browser/src/dom/events/hammer_common";
import {trigger, state, style, transition, animate, keyframes} from '@angular/core';

declare var Hammer: any;

@Component({
    selector: ".carousel-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div [@slide]="state" class="item-content">
            <ng-content></ng-content>
        </div>
    `,
    animations: [
        trigger("slide", [
            state("right", style({
                transform: "translate(100%,0)"
            })),
            state("in, void", style({
                transform: "translate(0,0)"
            })),
            state("left", style({
                transform: "translate(-100%, 0)"
            })),
            transition("right <=> in", [
                animate("300ms ease")
            ]),
            transition("left <=> in", [
                animate("300ms ease")
            ])
        ])
    ]
})
export class CarouselItem {
    id: any = 0;
    
    private _state: "right" | "left" | "in" | "void" = "void";

    get state(): "right" | "left" | "in" | "void" {
        return this._state;
    }
    set state(val: "right" | "left" | "in" | "void") {
        this._state = val;
        setTimeout(() => {
            this._change.markForCheck();
        }, 1); 
    }

    get isActive(): boolean { return this.state == "in"; }
    
    element: HTMLElement;
    
    constructor(
        private _change: ChangeDetectorRef,
        element: ElementRef) {
        this.element = element.nativeElement;
    }
    
    getTotalHeight(): number {
        var height = this.element.clientHeight;
        if(height > 1)
            return height;
        
        var child = this.element.firstElementChild;
        while(child != null) {
            height += (<HTMLElement>child).offsetHeight;
            child = child.nextElementSibling;
        }
        
        return height;
    }
}

@Component({
    selector: "carousel",
    templateUrl: "Carousel.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["Carousel.css"],
    directives: [CarouselItem],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Carousel
    implements AfterContentInit, AfterContentChecked,
    AfterViewInit, OnDestroy {
    hammerInitialized = false;

    items: CarouselItem[] = [];

    private _activeIndex: number = 0;

    get activeIndex(): number { return this._activeIndex; }
    set activeIndex(val: number) {
        if (this.items.length == 0) {
            this._activeIndex = -1;
            return;
        }

        this._activeIndex = val;
        for (let i in this.items) {
            let itemIndex = parseInt(i);
            if(i == val.toString())
                this.items[i].state = "in";
            else if(itemIndex == this.getRelativeIndex(-1))
                this.items[i].state = "left";
            else if(itemIndex == this.getRelativeIndex(1))
                this.items[i].state = "right";
            else
                this.items[i].state = "right";
        }
    }

    @Input()
    set interval(val: number) {
        if (this._intervalRef != null) {
            clearInterval(this._intervalRef);
            this._intervalRef = null;
        }

        if (val > 0)
            setInterval(() => { this.next(); }, val);
    }

    _intervalRef: any = null;

    innerHeight: number = 0;

    @ContentChildren(CarouselItem)
    itemQuery: QueryList<CarouselItem>;

    panDirection: number = 0; // 1 left -1 right
    lastPanOffset: number = 0;

    element: HTMLElement;

    constructor(private _change: ChangeDetectorRef, element: ElementRef) {
        this.element = element.nativeElement;
    }

    ngAfterContentInit(): void {
        this.itemQuery.changes.subscribe(() => this.registerItems());
        this.registerItems();
    }

    ngAfterContentChecked(): void {
        this.updateInnerHeight();
    }

    ngAfterViewInit(): void {
        if (!this.hammerInitialized && typeof Hammer !== "undefined") {
            var hammer = new Hammer(this.element);
            hammer.on('swiperight', (ev) => {
                this.prev();
            });
            hammer.on('swipeleft', (ev) => {
                this.next();
            });
            /*hammer.on('pan', (ev) => {
                this.pan(ev);
            });
            hammer.on('panleft', (ev) => {
                this.panleft(ev);
            });
            hammer.on('panright', (ev) => {
                this.panright(ev);
            });*/
            this.hammerInitialized = true;
        }
    }

    ngOnDestroy(): void {
        if (this._intervalRef != null) {
            clearInterval(this._intervalRef);
            this._intervalRef = null;
        }
    }

    registerItems(): void {
        this.items = [];

        if (this.itemQuery.length == 0)
            return;

        let itemArray = this.itemQuery.toArray();
        for (let i in itemArray)
            itemArray[i].id = i;

        this.items = this.itemQuery.toArray();

        this.activeIndex =
            this.items.reduce((prev: number, current: CarouselItem, index: number) => {
                if (prev != -1 && current.isActive || !current.isActive) {
                    return prev;
                } else
                    return index;
            }, -1);

        if (this.activeIndex == -1)
            this.activeIndex = 0;

        this.updateInnerHeight();
    }

    updateInnerHeight(): void {
        this.innerHeight = this.items[this.activeIndex].getTotalHeight();

        if (this.innerHeight < 1)
            this.innerHeight = 250;
        
        this._change.markForCheck();
    }

    getRelativeItem(rel: number): CarouselItem {
        if (this.items.length == 1)
            return this.items[0];

        return this.items[this.getRelativeIndex(rel)];
    }

    getRelativeIndex(rel: number): number {
        let target = this.activeIndex + rel;

        if (this.items.length == 0)
            return null;

        if (target < 0)
            target = this.items.length - 1;
        else if (target > (this.items.length - 1))
            target = 0;
        return target;
    }

    navigateTo(item: CarouselItem) {
        var index = this.items.indexOf(item);
        if (index > this.activeIndex)
            this.next(item);
        else
            this.prev(item);
    }

    prev(item: CarouselItem = null): void {
        if (this.items.length < 2)
            return;

        this.activeIndex = this.getRelativeIndex(-1);
        this._change.markForCheck();
    }

    next(item: CarouselItem = null): void {
        if (this.items.length < 2)
            return;

        this.activeIndex = this.getRelativeIndex(1);
        this._change.markForCheck();
    }

    swipeleft(): void {
        if (this.panDirection == 0)
            this.next();
    }

    swiperight(): void {
        if (this.panDirection == 0)
            this.prev();
    }

    /*panleft(event: any): void {
        if (this.panDirection == 0)
            this.panDirection = 1;
    }

    panright(event: any): void {
        if (this.panDirection == 0)
            this.panDirection = -1;
    }

    pan(event: any): void {
        event.preventDefault();

        if (this.panDirection == 0 || event.deltaX == 0)
            return;

        var current = this.getRelativeItem(0);
        var next = this.getRelativeItem(this.panDirection);
        var width = current.element.clientWidth;
        var offset = this.lastPanOffset = ((100 / width) * event.deltaX);
        var nextOffset = (100 - Math.abs(offset)) * (offset / Math.abs(offset)) * -1;

        current.translate(offset);
        next.translate(nextOffset);
    }

    panend(event: any): void {
        if (this.lastPanOffset == 0)
            return;

        var current = this.getRelativeItem(0);
        var next = this.getRelativeItem(this.panDirection);
        var offset = this.lastPanOffset;
        var nextOffset = (100 - Math.abs(offset)) * (offset / Math.abs(offset)) * -1;

        if (Math.abs(this.lastPanOffset) < 50) {
            current.slide(this.lastPanOffset, 0);
            next.slide(nextOffset, 100 * this.panDirection);
        } else {
            current.slide(this.lastPanOffset, 100 * this.panDirection);
            this.animation = next.slide(nextOffset, 0)
                .then(() => {
                    this.animation = null;
                    this.activeIndex = this.getRelativeIndex(this.panDirection);
                });
        }

        this.lastPanOffset = 0;
    }*/
}

const carouselDirectives = [Carousel,CarouselItem];

@NgModule({
    imports: [CommonModule],
    declarations: carouselDirectives,
    exports: carouselDirectives
})
export class FuiCarouselModule { }