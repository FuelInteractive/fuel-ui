import { EventEmitter, OnChanges } from 'angular2/core';
export declare class Pagination implements OnChanges {
    currentPage: number;
    pagesAtOnce: number;
    totalPages: number;
    currentPageChange: EventEmitter<any>;
    pagesBlank: Array<number>;
    startingIndex: number;
    endingIndex: number;
    constructor();
    ngOnChanges(changes: any): void;
    setPage(newPage: number): void;
}
export declare var PAGINATION_PROVIDERS: typeof Pagination[];
