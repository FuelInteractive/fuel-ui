import { ElementRef, EventEmitter, OnChanges } from 'angular2/core';
export declare class Pagination implements OnChanges {
    private _el;
    currentPage: number;
    pagesAtOnce: number;
    totalPages: number;
    currentPageChange: EventEmitter<any>;
    pagesBlank: Array<number>;
    startingIndex: number;
    endingIndex: number;
    constructor(el: ElementRef);
    ngOnChanges(changes: any): void;
    getElement(): HTMLElement;
    setPage(newPage: number): void;
}
export declare var PAGINATION_PROVIDERS: typeof Pagination[];
