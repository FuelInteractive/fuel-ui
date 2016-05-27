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
var core_1 = require('@angular/core');
var Tooltip = (function () {
    function Tooltip(el) {
        this.text = '';
        this.position = 'top';
        this.color = 'none';
        this.size = 'auto';
        this.rounded = false;
        this.always = false;
        this._el = el.nativeElement;
    }
    Tooltip.prototype.ngOnInit = function () {
        if (this.always) {
            this._el.classList.add("hint--always");
            this.show();
        }
    };
    Tooltip.prototype.ngOnChanges = function () {
        for (var i = 0; i < this._el.classList.length; i++) {
            var currentClass = this._el.classList[i];
            if (currentClass.startsWith("hint--"))
                this._el.classList.remove(currentClass);
        }
        if (this.always) {
            this._el.classList.add("hint--always");
            this.show();
        }
    };
    Tooltip.prototype.show = function () {
        this.hide();
        this._el.setAttribute("data-hint", this.text);
        for (var i = 0; i < this._el.classList.length; i++) {
            var currentClass = this._el.classList[i];
            if (currentClass.startsWith("hint"))
                this._el.classList.remove(currentClass);
        }
        if (this.always) {
            this._el.classList.add("hint--always");
        }
        this._el.classList.add("hint--" + this.position);
        switch (this.color) {
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
        switch (this.size) {
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
        if (this.rounded)
            this._el.classList.add("hint--rounded");
    };
    Tooltip.prototype.hide = function () {
        if (this.always)
            return;
        this._el.removeAttribute("data-hint");
    };
    Tooltip = __decorate([
        core_1.Directive({
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
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Tooltip);
    return Tooltip;
}());
exports.Tooltip = Tooltip;
exports.TOOLTIP_PROVIDERS = [
    Tooltip
];

//# sourceMappingURL=Tooltip.js.map
