import { ElementRef } from 'angular2/core';
export declare class Tooltip {
    text: string;
    private _el;
    constructor(el: ElementRef);
    getElement(): HTMLElement;
    show(): void;
    hide(): void;
}
export declare var TOOLTIP_PROVIDERS: typeof Tooltip[];
