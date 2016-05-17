import {Directive, Component, ViewEncapsulation, Renderer} from "@angular/core";
import {QueryList, ContentChildren, ElementRef, AfterContentInit, AfterViewInit} from "@angular/core";
import {Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {Animation} from "@angular/platform-browser/src/animate/animation";
import {AnimationBuilder} from "@angular/platform-browser/src/animate/animation_builder";
import {CssAnimationBuilder} from "@angular/platform-browser/src/animate/css_animation_builder";
//import {HammerGesturesPluginCommon} from "@angular//platform-browser/src/dom/events/hammer_common";

@Component({
    selector: ".carousel-item",
    template: `
        <!-- [style.transition]="transition()" -->
            <ng-content></ng-content>
    `
})
export class CarouselItem implements AfterContentInit, AfterViewInit {
    id: any = 0;
    
    private _isActive: boolean;
    get isActive(): boolean {
        return this._isActive;
    }
    set isActive(value: boolean) {
        this._isActive = value;
        this._render.setElementClass(this.element, "active", value);
        this._render.setElementClass(this.element, "hide", !value);
        this.setClasses(["out-left","out-right"], false);
    }
    
    element: HTMLElement;
    duration: number = 250;
    
    private _animationBuilder: AnimationBuilder;
    private get _animation(): CssAnimationBuilder {
        return this._animationBuilder.css()
            .setDuration(this.duration)
    }
    
    constructor(element: ElementRef, animationBuilder: AnimationBuilder,
        private _render: Renderer,
        private _change: ChangeDetectorRef) {
        this.element = element.nativeElement;
        this._animationBuilder = animationBuilder;
    }
    
    ngAfterViewInit(): void {
        
    }
    
    ngAfterContentInit(): void {
        
    }
    
    setClasses(classes: Array<string>, isAdd: boolean) {
        classes.map((c) => {
            this._render.setElementClass(this.element, c, isAdd);
        })
    }
    
    translate(x: number): void {
        this._render.setElementClass(this.element, "hide", false);
        this._render.setElementStyle(this.element, "transform", `translate(${x}%,0)`);
    }
    
    resetTranslation(): void {
        this._render.setElementStyle(this.element, "transform", "");
    }
    
    slide(start: number, end:number): Promise<any> {
        console.log(`slide from ${start} to ${end}`);
        console.log(this);
        let animation = this._animation
            .setFromStyles({"transform": `translate(${start}%,0)`})
            .setToStyles({"transform": `translate(${end}%,0)`});
        
        let activate = end == 0;
        
        if(activate) {
            if(start > end)
            animation.addAnimationClass("out-right");
            else
                animation.addAnimationClass("out-left");
        }
        
        this.isActive = activate;
        this._render.setElementClass(this.element, "hide", false);
        
        return new Promise<any>((resolve, reject) => {
            animation.start(this.element)
                .onComplete(() => {
                    this.isActive = activate;
                    resolve();
                });
        });            
    }
    
    slideOutLeft(): Promise<any> {
        return this.slide(0,-100);
    }
    
    slideOutRight(): Promise<any> {
        return this.slide(0,100);
    }
    
    slideInLeft(): Promise<any> {
        return this.slide(100,0);
    }
    
    slideInRight(): Promise<any> {
        return this.slide(-100,0);
    }
}

@Component({
    selector: 'carousel',
    templateUrl: 'components/Carousel/Carousel.html',
    directives: [CORE_DIRECTIVES, CarouselItem]
})
export class Carousel implements AfterContentInit {
    items: CarouselItem[] = [];
    
    private _activeIndex: number = 0;
    
    get activeIndex(): number { return this._activeIndex; }
    set activeIndex(val: number) {
        if(this.items.length == 0) {
            this._activeIndex = -1;
            return;
        }
        
        this._activeIndex = val;
        for(let i in this.items) {
            this.items[i].isActive = (i == val.toString());
        }
    }    
    
    innerHeight: any = 0;
    animation: Promise<any> = null;

    @ContentChildren(CarouselItem)
    itemQuery: QueryList<CarouselItem>;
    
    panDirection: number = 0; // 1 left -1 right
    lastPanOffset: number = 0;

    constructor(private _change: ChangeDetectorRef) {

    }

    ngAfterContentInit(): void {
        this.itemQuery.changes.subscribe(() => this.registerItems());
        this.registerItems();
    }

    registerItems(): void {
        this.items = [];
        
        if(this.itemQuery.length == 0)
            return;
        
        let itemArray = this.itemQuery.toArray();
        for(let i in itemArray)
            itemArray[i].id = i;
            
        this.items = this.itemQuery.toArray();
        this.innerHeight = this.items.reduce((prev: number, current: CarouselItem) => {
            return current.element.clientHeight < prev ? current.element.clientHeight : prev;
        },2000);
        
        if(this.innerHeight < 1)
            this.innerHeight = "auto";
         
        this.activeIndex = 
            this.items.reduce((prev: number, current: CarouselItem, index: number) => {
            if(prev != -1 && current.isActive || !current.isActive) {
                current.isActive = false;
                return prev;
            } else
                return index;
        }, -1);
        
        if(this.activeIndex == -1)
            this.activeIndex = 0;
        
        this._change.markForCheck();
    }
    
    getRelativeItem(rel: number): CarouselItem {
        if(this.items.length == 1)
            return this.items[0];
            
        return this.items[this.getRelativeIndex(rel)];
    }
    
    getRelativeIndex(rel: number): number {
        let target = this.activeIndex + rel;
        
        if(this.items.length == 0)
            return null;
        
        if(target < 0)
            target = this.items.length - 1;
        else if(target > (this.items.length - 1))
            target = 0;
        return target;
    }
    
    navigateTo(item: CarouselItem) {
        var index = this.items.indexOf(item);
        if(index > this.activeIndex)
            this.next(item);
        else
            this.prev(item);
    }
    
    prev(item: CarouselItem = null): void {
        if(this.animation != null) {
            this.animation.then(() => {
                this.prev();
            });
            return;
        }
        
        if(this.items.length < 2)
            return;
            
        let current = this.getRelativeItem(0);
        let prev = item != null ? item : this.getRelativeItem(-1);
            
        current.slideOutRight();
        prev.slideInRight()
            .then(() => { 
                this.animation = null;
                this.activeIndex = this.items.indexOf(prev);
            });
        
        this._change.markForCheck();
    }
    
    next(item: CarouselItem = null): void {
        if(this.animation != null) {
            this.animation.then(() => {
                this.next();
            });
            return;
        }
        
        if(this.items.length < 2)
            return;
        
        let current = this.getRelativeItem(0);
        let next = item != null ? item : this.getRelativeItem(1);
        current.slideOutLeft();
        this.animation = next.slideInLeft()
            .then(() => { 
                this.animation = null;
                this.activeIndex = this.items.indexOf(next);
             });
        
        this._change.markForCheck();
    }
    
    swipeleft(): void {
        if(this.panDirection == 0)
            this.next();
    }
    
    swiperight(): void {
        if(this.panDirection == 0)
            this.prev();
    }
    
    panleft(event: any): void {
        if(this.panDirection == 0)
            this.panDirection = 1;
    }
    
    panright(event: any): void {
        if(this.panDirection == 0)
            this.panDirection = -1;
    }
    
    pan(event: any): void {
        event.preventDefault();
        
        if(this.panDirection == 0 || event.deltaX == 0)
            return;
                    
        var current = this.getRelativeItem(0);
        var next = this.getRelativeItem(this.panDirection);
        var width = current.element.clientWidth;
        var offset = this.lastPanOffset = ((100/width)*event.deltaX);
        var nextOffset = (100 - Math.abs(offset)) * (offset/Math.abs(offset)) * -1;
        
        console.log("pan");
        current.translate(offset);
        next.translate(nextOffset);
    }
    
    panend(event: any): void {
        console.log(event);
        if(this.lastPanOffset == 0)
            return;
        
        var current = this.getRelativeItem(0);
        var next = this.getRelativeItem(this.panDirection);
        var offset = this.lastPanOffset;
        var nextOffset = (100 - Math.abs(offset)) * (offset/Math.abs(offset)) * -1;
        
        if(Math.abs(this.lastPanOffset) < 50) {            
            current.slide(this.lastPanOffset,0);
            next.slide(nextOffset, 100*this.panDirection);
        } else {
            current.slide(this.lastPanOffset,100*this.panDirection);
            this.animation = next.slide(nextOffset, 0)
                .then(() => {
                    this.animation = null;
                    this.activeIndex = this.getRelativeIndex(this.panDirection);
                });
        }
        
        this.lastPanOffset = 0;
        /*if(this.panDirection == -1)
            this.prev();
        else
            this.next();*/
    }
}

export var CAROUSEL_PROVIDERS = [
    Carousel, CarouselItem
];