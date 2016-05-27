import {Directive, ElementRef, Input, Output, EventEmitter, ViewContainerRef, OnInit, OnChanges} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

@Directive({
    selector: '[tooltip]',
    properties: [
        'text: tooltip',
        'position: position',
        'color: color',
        'size: size',
        'rounded: rounded',
        'always: always'
    ],
    host: {
        '(mouseover)': 'show()',
        '(mouseout)': 'hide()',
        '(focus)': 'show()',
        '(unfocus)': 'hide()'
    }
})
export class Tooltip implements OnInit, OnChanges{
    text:string = '';
    position:string = 'top';
    color:string = 'none';
    size:string = 'auto';
    rounded:boolean = false;
    always:boolean = false; 
    private _el:HTMLElement;

    constructor(el: ElementRef) {
        this._el = el.nativeElement;
    }
    
    ngOnInit() {
        if(this.always){
            this._el.classList.add("hint--always");
            this.show();
        }
    }
    
    ngOnChanges() {
        for (var i = 0; i < this._el.classList.length; i++) {
            var currentClass = this._el.classList[i];
            if(currentClass.startsWith("hint--"))
                this._el.classList.remove(currentClass)
        }
        
        if(this.always){
            this._el.classList.add("hint--always");
            this.show();
        }
    }

    show() {
        this.hide();

        this._el.setAttribute("data-hint", this.text);
        
        for (var i = 0; i < this._el.classList.length; i++) {
            var currentClass = this._el.classList[i];
            if(currentClass.startsWith("hint"))
                this._el.classList.remove(currentClass)
        }
        
        if(this.always){
            this._el.classList.add("hint--always");
        }
        
        this._el.classList.add("hint--" + this.position);
        
        switch(this.color) {
            case "error":
                this._el.classList.add("hint--error");
                break;
            case "warning":
                this._el.classList.add("hint--warning");
                break;
            case "info":
                this._el.classList.add("hint--info");
                break;
            case "success":
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
        
        if(this.rounded)
            this._el.classList.add("hint--rounded");
    }

    hide() {
        if(this.always) return;
        
        this._el.removeAttribute("data-hint");
    }
}

export var TOOLTIP_PROVIDERS = [
    Tooltip
];