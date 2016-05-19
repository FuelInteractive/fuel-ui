import {Directive, ElementRef, Input, Output, EventEmitter, ViewContainerRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

@Directive({
    selector: '[tooltip]',
    properties: [
        'text: tooltip',
        'position: position',
        'color: color',
        'size: size',
        'rounded: rounded'
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
    position:string;
    color:string;
    size:string;
    rounded:string;
    private _el:HTMLElement;

    constructor(el: ElementRef) {
        this._el = el.nativeElement;
    }

    getElement(): HTMLElement{
        return this._el;
    }

    show() {
        this.hide();

        this._el.setAttribute("data-hint", this.text);
        
        for (var i = 0; i < this._el.classList.length; i++) {
            var currentClass = this._el.classList[i];
            if(currentClass.startsWith("hint"))
                this._el.classList.remove(currentClass)
        }
        
        this._el.classList.add("hint--" + this.position);
        
        switch(this.color) {
            case "indianred":
                this._el.classList.add("hint--error");
                break;
            case "orange":
                this._el.classList.add("hint--warning");
                break;
            case "lightblue":
                this._el.classList.add("hint--info");
                break;
            case "lightgreen":
                this._el.classList.add("hint--success");
                break;
            default:
                
        } 
        
        switch(this.size) {
            case "small":
                this._el.classList.add("hint--small");
                break;
            case "medium":
                this._el.classList.add("hint--medium");
                break;
            case "large":
                this._el.classList.add("hint--large");
                break;
            default:      
        }
        
        if(this.rounded == "true")
            this._el.classList.add("hint--rounded");
    }

    hide() {
        this._el.removeAttribute("data-hint");
        
        for (var i = 0; i < this._el.classList.length; i++) {
            var currentClass = this._el.classList[i];
            if(currentClass.startsWith("hint--"))
                this._el.classList.remove(currentClass)
        }
    }
}

export var TOOLTIP_PROVIDERS = [
    Tooltip
];