/// <reference path="../../../typings/nouislider/nouislider.d.ts" />
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
var core_1 = require("angular2/core");
require("./NoUiSlider");
var Slider = (function () {
    function Slider(element) {
        this.element = element;
        this.background = "#E24932";
        this.height = "";
        this.width = "";
        this.orientation = "horizontal";
        this.direction = "ltr";
        this.behavior = "tap";
        this.pips = 5;
        this.pipDensity = 5;
        this.step = 1;
        this.decimals = 0;
        this.minValue = 0;
        this.maxValue = 100;
        this.margin = 10;
        this.value = 0;
        this.secondValue = null;
        this.valueChange = new core_1.EventEmitter();
        this.secondValueChange = new core_1.EventEmitter();
    }
    Slider.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sliderElement = this.element.nativeElement.children[0];
        if (this.orientation == 'vertical')
            this.sliderElement.style.height = this.height.length > 0
                ? this.height
                : "200px";
        if (this.orientation == 'horizontal')
            this.sliderElement.style.width = this.width.length > 0
                ? this.width
                : null; //full width
        this.slider = noUiSlider.create(this.sliderElement, {
            start: this.secondValue != null ? [this.value, this.secondValue] : this.value,
            step: parseInt(this.step.toString()),
            margin: this.margin,
            connect: this.secondValue != null ? true : 'lower',
            direction: this.direction,
            orientation: this.orientation,
            behaviour: this.behavior,
            range: {
                'min': parseInt(this.minValue.toString()),
                'max': parseInt(this.maxValue.toString())
            },
            pips: {
                mode: 'count',
                values: this.pips,
                density: this.pipDensity
            },
            format: {
                to: function (value) {
                    return parseFloat(value).toFixed(_this.decimals);
                },
                from: function (value) {
                    return parseFloat(value).toFixed(_this.decimals);
                }
            }
        });
        if (!this.element.nativeElement.disabled) {
            var noUI = this.element.nativeElement.getElementsByClassName('noUi-connect');
            //convert HTMLCollection to array to loop
            [].slice.call(noUI).forEach(function (el) {
                el.style.background = _this.background;
            });
        }
        this.sliderElement.noUiSlider.on('slide', function (val) {
            _this.value = val[0];
            _this.secondValue = val.length > 1 ? val[1] : null;
            _this.valueChange.next(val[0]);
            _this.secondValueChange.next(_this.secondValue);
        });
    };
    Slider.prototype.ngOnChanges = function (changes) {
        if (this.sliderElement && typeof changes.value !== 'undefined')
            this.sliderElement.noUiSlider.set([changes.value.currentValue, this.secondValue]);
        if (this.sliderElement && typeof changes.secondValue !== 'undefined')
            this.sliderElement.noUiSlider.set([this.value, changes.secondValue.currentValue]);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Slider.prototype, "background", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Slider.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Slider.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Slider.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Slider.prototype, "direction", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Slider.prototype, "behavior", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "pips", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "pipDensity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "step", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "decimals", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "minValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "maxValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Slider.prototype, "secondValue", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Slider.prototype, "valueChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Slider.prototype, "secondValueChange", void 0);
    Slider = __decorate([
        core_1.Component({
            selector: "slider",
            template: "\n\n      <div class=\"slider\"></div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Slider);
    return Slider;
}());
exports.Slider = Slider;
exports.SLIDER_COMPONENT_PROVIDERS = [
    Slider
];

//# sourceMappingURL=Slider.js.map
