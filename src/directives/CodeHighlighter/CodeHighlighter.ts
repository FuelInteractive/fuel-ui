import {Directive, ElementRef} from 'angular2/core';
import {StringHelper} from '../../utilities/StringUtils';

declare var Prism: any;

@Directive({
    selector: '[code-highlight]'
})
export class CodeHighlighter{
        
    constructor(private el: ElementRef) {
        if(this.el && this.el.nativeElement){
            this.el.nativeElement.innerHTML = StringHelper.escapeHtml(this.el.nativeElement.innerHTML);
            Prism.highlightElement(this.el.nativeElement);
        }
    }
}