import {Directive, ElementRef, AfterViewInit} from 'angular2/core';
import {StringHelper} from '../../utilities/StringUtils';

declare var Prism: any;

@Directive({
    selector: '[code-highlight]'
})
export class CodeHighlighter implements AfterViewInit{
    
    constructor(private _el: ElementRef) {}
    
    ngAfterViewInit(): void {
        if(this._el && this._el.nativeElement){
            Prism.highlightElement(this._el.nativeElement);
        }
    }
}