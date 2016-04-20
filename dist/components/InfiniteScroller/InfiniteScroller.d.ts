import { ElementRef, EventEmitter, QueryList, AfterContentInit, AfterViewInit } from "angular2/core";
export declare class ScrollItem implements AfterViewInit {
    element: HTMLElement;
    height: number;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
}
export declare class InfiniteScroller implements AfterContentInit, AfterViewInit {
    distance: number;
    height: string;
    hideScrollbar: boolean;
    next: EventEmitter<any>;
    prev: EventEmitter<any>;
    topIndexChange: EventEmitter<any>;
    topIndex: number;
    bottomIndexChange: EventEmitter<any>;
    bottomIndex: number;
    lastScroll: number;
    itemQuery: QueryList<ScrollItem>;
    firstItem: ScrollItem;
    container: HTMLElement;
    scrollTarget: HTMLElement;
    constructor(element: ElementRef);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    handleItemChanges(): void;
    getVisableIndicies(): void;
    checkVisableItem(item: ScrollItem): boolean;
    doscroll(event: Event): void;
    scrollTo(position: number): void;
    scrollToIndex(index: number): void;
    isTop(): boolean;
    isBottom(): boolean;
}
export declare var INFINITE_SCROLLER_PROVIDERS: (typeof InfiniteScroller | typeof ScrollItem)[];
