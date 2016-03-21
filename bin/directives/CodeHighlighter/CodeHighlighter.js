"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var StringUtils_1 = require('../../utilities/StringUtils');
var CodeHighlighter = (function () {
    function CodeHighlighter(el) {
        this.el = el;
        if (this.el && this.el.nativeElement) {
            this.el.nativeElement.innerHTML = StringUtils_1.StringHelper.escapeHtml(this.el.nativeElement.innerHTML);
            Prism.highlightElement(this.el.nativeElement);
        }
    }
    CodeHighlighter = __decorate([
        core_1.Directive({
            selector: '[code-highlight]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], CodeHighlighter);
    return CodeHighlighter;
}());
exports.CodeHighlighter = CodeHighlighter;

//# sourceMappingURL=CodeHighlighter.js.map
