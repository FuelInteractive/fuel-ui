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
        this._el = el.nativeElement;
    }
    Tooltip.prototype.getElement = function () {
        return this._el;
    };
    Tooltip.prototype.show = function () {
        this.hide();
        var html = "\n        <div class=\"tooltip top customFadeIn\" role=\"tooltip\">\n          <div class=\"tooltip-arrow\"></div>\n          <div class=\"tooltip-inner\">\n          " + this.text + "\n          </div>\n        </div>\n        ";
        var newEl = document.createElement('div');
        newEl.setAttribute('role', 'tooltip');
        newEl.className = 'tooltip top customFadeIn';
        newEl.innerHTML = "\n        <div class=\"tooltip-arrow\"></div>\n          <div class=\"tooltip-inner\">\n          " + this.text + "\n          </div>";
        newEl.style.visibility = "hidden";
        this.getElement().appendChild(newEl);
        var bodyRect = document.body.getBoundingClientRect(), elemRect = this.getElement().getBoundingClientRect(), offset = (elemRect.top - bodyRect.top) - newEl.offsetHeight;
        this.hide();
        newEl.style.visibility = "";
        newEl.style.top = offset + 'px';
        newEl.style.left = elemRect.left + 'px';
        this.getElement().appendChild(newEl);
    };
    Tooltip.prototype.hide = function () {
        var tooltips = this.getElement().getElementsByClassName('tooltip');
        for (var i = 0; i < tooltips.length; i++) {
            tooltips[i].remove();
        }
    };
    Tooltip = __decorate([
        core_1.Directive({
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
