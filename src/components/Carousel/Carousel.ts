import {NgModule, Directive, Component, ViewEncapsulation, HostBinding, Renderer} from "@angular/core";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {QueryList, ContentChildren, ElementRef} from "@angular/core";
import {AfterContentInit, AfterViewInit, AfterContentChecked, AfterViewChecked, OnDestroy} from "@angular/core";
import {Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import {CommonModule} from "@angular/common";
//import {HammerGesturesPluginCommon} from "@angular//platform-browser/src/dom/events/hammer_common";
import {trigger, state, style, transition, animate, keyframes} from '@angular/core';
import {MobileDetection, AnimationUtils} from "../../utilities";
import {FuiSafePipeModule} from "../../pipes";

declare var Hammer: any;

@Component({
    selector: ".carousel-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div *ngIf="supportedTransform" [@slide]="state" class="item-content"
            [style.background-image]="backgroundImage | safeStyle">
            <ng-content></ng-content>
        </div>
        <div *ngIf="!supportedTransform" class="item-content"
            [style.z-index]="zIndex"
            [style.display]="isActive ? 'block' : 'none'"
            [style.background-image]="backgroundImage | safeStyle">
            <ng-content></ng-content>
        </div>
    `,
    animations: [
        trigger("slide", [
            state("outright", style({
                transform: "translate(100%,0)"
            })),
            state("inright, inleft", style({
                transform: "translate(0,0)"
            })),
            state("outleft", style({
                transform: "translate(-100%, 0)"
            })),
            state("void", style({
                transform: "translate(100%,0)"
            })),
            transition("* => outright, * => outleft", [
                style({transform: "translate(0,0)"}),
                animate("300ms ease"),
            ]),
            transition("* => inright", [
                style({transform: "translate(-100%,0)"}),
                animate("300ms ease"),
            ]),
            transition("* => inleft", [
                style({transform: "translate(+100%,0)"}),
                animate("300ms ease"),
            ]),
            transition("* => void", [
                style({display: "none"})
            ])
        ])
    ]
})
export class CarouselItem implements AfterViewInit {
    id: any = -1;
    void: any = null; // hack for aot

    zIndex: number = 1;

    imageHeight: number = 0;
    imageWidth: number = 0;
    delay: boolean = true;
    supportedTransform = AnimationUtils.getSupportedTransform();
    // uncomment for debugging ios8 safari
    //supportedTransform = "WebkitTransform";

    @Input()
    ignoreDelay: boolean = false;

    @Input()
    image: string;

    get backgroundImage(): string {
        //console.log("get backgroundImage", this);
        if(this.delay && this.id > -1) {
            let delayTime = 10;
            if(this.id != 0)
                delayTime = 500 + (Math.random() * 2000);
            
            setTimeout(() => {
                this.delay = false;
                this.change.markForCheck();
            }, delayTime);
        }

        if((!this.ignoreDelay && this.delay) || !this.image || this.state == "void")
            return "none";

        return `url('${this.image}')`;
    }

    private _state: string = "void";

    get state(): string {
        return this._state;
    }
    set state(val: string) {
        this._state = val;
        setTimeout(() => {
            this.change.markForCheck();
        }, 1); 
    }

    get isActive(): boolean { return this.state == "inright" || this.state == "inleft"; }
    
    element: HTMLElement;
    
    constructor(
        public change: ChangeDetectorRef,
        private _sanitizer: DomSanitizer,
        private _renderer: Renderer,
        element: ElementRef) {
        this.element = element.nativeElement;
    }

    ngAfterViewInit(): void {
        if(this.supportedTransform == "WebkitTransform")
            this.supportedTransform = "";

        if(!this.supportedTransform)
            this._renderer.setElementClass(this.element, "legacy", true);
    }

    getDimensions(): { height:number, width: number } {
        if(this.image && this.imageHeight == 0) {
            var image = new Image();
            image.src = this.image;
            this.imageHeight = image.height;
            this.imageWidth = image.width;
            image = undefined;
        }
        
        return {height: this.imageHeight, width: this.imageWidth};
    }
}

@Component({
    selector: "carousel",
    templateUrl: "Carousel.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["Carousel.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Carousel
    implements AfterContentInit, AfterViewInit, OnDestroy {
    hammerInitialized = false;

    items: CarouselItem[] = [];

    direction: "left" | "right" = "left";

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
                this.items[i].zIndex = 10;
            else
                this.items[i].zIndex = 1;

            if(i == val.toString())
                this.items[i].state = "in"+this.direction;
            else if(this.direction == "right" && itemIndex == this.getRelativeIndex(1))
                this.items[i].state = "outright";
            else if(this.direction == "left" && itemIndex == this.getRelativeIndex(-1))
                this.items[i].state = "outleft";
            else
                this.items[i].state = "void";
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

    @Input()
    height: number = 0;
    innerHeight: number = 0;

    @Input()
    delayLoading: boolean = false;

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
        this.updateInnerHeight();
    }

    /*ngAfterContentChecked(): void {
        this.updateInnerHeight();
    }*/

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
        for (let i in itemArray) {
            itemArray[i].id = i;
            itemArray[i].delay = this.delayLoading;
        }

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

        for (let i in itemArray) {
            setTimeout(() => {
                itemArray[i].change.markForCheck();
            }, 1);
        }

        this._change.markForCheck();

        this.updateInnerHeight();
    }

    updateInnerHeight(): void {
        if(this.height > 0) {
            this.innerHeight = this.height;
            return;
        }

        setTimeout(() => {
            var dimensions = this.items[this.activeIndex].getDimensions();
            var widthModifier = this.element.querySelector(".carousel-inner")
                .getBoundingClientRect().width / dimensions.width;
            var newHeight = dimensions.height * widthModifier;
            this.innerHeight = newHeight;
        
            if (this.innerHeight < 1)
                this.innerHeight = 250;
            
            this._change.markForCheck();
        }, 1);
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

        this.direction = "right"
        this.activeIndex = this.getRelativeIndex(-1);
        this.updateInnerHeight();
        this._change.markForCheck();
    }

    next(item: CarouselItem = null): void {
        if (this.items.length < 2)
            return;

        this.direction = "left";
        this.activeIndex = this.getRelativeIndex(1);
        this.updateInnerHeight();
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

export const carouselDirectives = [Carousel,CarouselItem];

@NgModule({
    imports: [CommonModule, FuiSafePipeModule],
    declarations: carouselDirectives,
    exports: carouselDirectives
})
export class FuiCarouselModule { }