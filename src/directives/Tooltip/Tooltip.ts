import {Directive, ElementRef, Input, Output, EventEmitter, ViewContainerRef} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Directive({
    selector: '[tooltip]',
    properties: [
        'text: tooltip'
    ],
    host: {
        '(mouseover)': 'show()',
        '(mouseout)': 'hide()',
        '(focus)': 'show()',
        '(unfocus)': 'hide()'
    }
})
export class Tooltip {
    text:string;
    private _el:HTMLElement;

    constructor(el: ElementRef) {
        this._el = el.nativeElement;
    }

    getElement(): HTMLElement{
        return this._el;
    }

    show() {
        this.hide();

        var html = `
        <div class="tooltip top customFadeIn" role="tooltip">
          <div class="tooltip-arrow"></div>
          <div class="tooltip-inner">
          ` + this.text + `
          </div>
        </div>
        `;

        var newEl = document.createElement('div');
        newEl.setAttribute('role', 'tooltip');
        newEl.className = 'tooltip top customFadeIn';
        newEl.innerHTML = `
        <div class="tooltip-arrow"></div>
          <div class="tooltip-inner">
          ` + this.text + `
          </div>`;
        newEl.style.visibility = "hidden";
        this.getElement().appendChild(newEl);

        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = this.getElement().getBoundingClientRect(),
            offset   = (elemRect.top - bodyRect.top) - newEl.offsetHeight;

        this.hide();

        newEl.style.visibility = "";
        newEl.style.top = offset + 'px';
        newEl.style.left = elemRect.left + 'px';

        this.getElement().appendChild(newEl);

    }

    hide() {
        var tooltips = this.getElement().getElementsByClassName('tooltip');

        for(var i = 0; i < tooltips.length; i++){
            tooltips[i].remove();
        }
    }
}

export var TOOLTIP_PROVIDERS = [
    Tooltip
];