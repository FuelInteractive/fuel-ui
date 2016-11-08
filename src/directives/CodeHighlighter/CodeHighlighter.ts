import {NgModule, Directive, ElementRef, AfterViewInit} from '@angular/core';
import {StringHelper} from '../../utilities';

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

@NgModule({
    declarations: [CodeHighlighter],
    exports: [CodeHighlighter]
})
export class FuiCodeHighlighterModule { }