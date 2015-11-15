var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
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
        angular2_1.Directive({
            selector: '[tooltip]',
            properties: [
                'text: tooltip'
            ],
            host: {
                '(mouseover)': 'show()',
                '(mouseout)': 'hide()'
            }
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], Tooltip);
    return Tooltip;
})();
exports.Tooltip = Tooltip;
exports.TOOLTIP_PROVIDERS = [
    Tooltip
];

//# sourceMappingURL=Tooltip.js.map
