import { ElementRef, EventEmitter } from 'angular2/core';
export declare class Alert {
    private _el;
    displayed: boolean;
    closeButton: boolean;
    type: string;
    displayedChange: EventEmitter<any>;
    constructor(el: ElementRef);
    getElement(): HTMLElement;
    close(): void;
}
export declare var ALERT_PROVIDERS: typeof Alert[];
