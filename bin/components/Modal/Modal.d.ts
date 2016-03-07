import { ElementRef } from 'angular2/core';
export declare class Modal {
    private _el;
    displayed: boolean;
    closeOnUnfocus: boolean;
    closeButton: boolean;
    modalTitle: string;
    constructor(el: ElementRef);
    clickElement(e: any): void;
    getElement(): HTMLElement;
    showModal(isDisplayed: boolean): boolean;
}
export declare var MODAL_PROVIDERS: typeof Modal[];
