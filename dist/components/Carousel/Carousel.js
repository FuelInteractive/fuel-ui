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
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var common_1 = require("@angular/common");
//import {HammerGesturesPluginCommon} from "@angular//platform-browser/src/dom/events/hammer_common";
var core_4 = require('@angular/core');
var CarouselItem = (function () {
    function CarouselItem(_change, element) {
        this._change = _change;
        this.id = 0;
        this._state = "void";
        this.element = element.nativeElement;
    }
    Object.defineProperty(CarouselItem.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (val) {
            var _this = this;
            this._state = val;
            setTimeout(function () {
                _this._change.markForCheck();
            }, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselItem.prototype, "isActive", {
        get: function () { return this.state == "in"; },
        enumerable: true,
        configurable: true
    });
    CarouselItem.prototype.getTotalHeight = function () {
        var height = this.element.clientHeight;
        if (height > 1)
            return height;
        var child = this.element.firstElementChild;
        while (child != null) {
            height += child.offsetHeight;
            child = child.nextElementSibling;
        }
        return height;
    };
    CarouselItem = __decorate([
        core_1.Component({
            selector: ".carousel-item",
            changeDetection: core_3.ChangeDetectionStrategy.OnPush,
            template: "\n        <div @slide=\"state\" class=\"item-content\">\n            <ng-content></ng-content>\n        </div>\n    ",
            animations: [
                core_4.trigger("slide", [
                    core_4.state("right", core_4.style({
                        transform: "translate(100%,0)"
                    })),
                    core_4.state("in, void", core_4.style({
                        transform: "translate(0,0)"
                    })),
                    core_4.state("left", core_4.style({
                        transform: "translate(-100%, 0)"
                    })),
                    core_4.transition("right <=> in", [
                        core_4.animate("300ms ease")
                    ]),
                    core_4.transition("left <=> in", [
                        core_4.animate("300ms ease")
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [core_3.ChangeDetectorRef, core_2.ElementRef])
    ], CarouselItem);
    return CarouselItem;
}());
exports.CarouselItem = CarouselItem;
var Carousel = (function () {
    function Carousel(_change, element) {
        this._change = _change;
        this.hammerInitialized = false;
        this.items = [];
        this._activeIndex = 0;
        this._intervalRef = null;
        this.innerHeight = 0;
        this.panDirection = 0; // 1 left -1 right
        this.lastPanOffset = 0;
        this.element = element.nativeElement;
    }
    Object.defineProperty(Carousel.prototype, "activeIndex", {
        get: function () { return this._activeIndex; },
        set: function (val) {
            if (this.items.length == 0) {
                this._activeIndex = -1;
                return;
            }
            this._activeIndex = val;
            for (var i in this.items) {
                var itemIndex = parseInt(i);
                if (i == val.toString())
                    this.items[i].state = "in";
                else if (itemIndex == this.getRelativeIndex(-1))
                    this.items[i].state = "left";
                else if (itemIndex == this.getRelativeIndex(1))
                    this.items[i].state = "right";
                else
                    this.items[i].state = "right";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "interval", {
        set: function (val) {
            var _this = this;
            if (this._intervalRef != null) {
                clearInterval(this._intervalRef);
                this._intervalRef = null;
            }
            if (val > 0)
                setInterval(function () { _this.next(); }, val);
        },
        enumerable: true,
        configurable: true
    });
    Carousel.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.itemQuery.changes.subscribe(function () { return _this.registerItems(); });
        this.registerItems();
    };
    Carousel.prototype.ngAfterContentChecked = function () {
        this.updateInnerHeight();
    };
    Carousel.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.hammerInitialized && typeof Hammer !== "undefined") {
            var hammer = new Hammer(this.element);
            hammer.on('swiperight', function (ev) {
                _this.prev();
            });
            hammer.on('swipeleft', function (ev) {
                _this.next();
            });
            /*hammer.on('pan', (ev) => {
                this.pan(ev);
            });
            hammer.on('panleft', (ev) => {
                this.panleft(ev);
            });
            hammer.on('panright', (ev) => {
                this.panright(ev);
            });*/
            this.hammerInitialized = true;
        }
    };
    Carousel.prototype.ngOnDestroy = function () {
        if (this._intervalRef != null) {
            clearInterval(this._intervalRef);
            this._intervalRef = null;
        }
    };
    Carousel.prototype.registerItems = function () {
        this.items = [];
        if (this.itemQuery.length == 0)
            return;
        var itemArray = this.itemQuery.toArray();
        for (var i in itemArray)
            itemArray[i].id = i;
        this.items = this.itemQuery.toArray();
        this.activeIndex =
            this.items.reduce(function (prev, current, index) {
                if (prev != -1 && current.isActive || !current.isActive) {
                    return prev;
                }
                else
                    return index;
            }, -1);
        if (this.activeIndex == -1)
            this.activeIndex = 0;
        this.updateInnerHeight();
    };
    Carousel.prototype.updateInnerHeight = function () {
        this.innerHeight = this.items[this.activeIndex].getTotalHeight();
        if (this.innerHeight < 1)
            this.innerHeight = 250;
        this._change.markForCheck();
    };
    Carousel.prototype.getRelativeItem = function (rel) {
        if (this.items.length == 1)
            return this.items[0];
        return this.items[this.getRelativeIndex(rel)];
    };
    Carousel.prototype.getRelativeIndex = function (rel) {
        var target = this.activeIndex + rel;
        if (this.items.length == 0)
            return null;
        if (target < 0)
            target = this.items.length - 1;
        else if (target > (this.items.length - 1))
            target = 0;
        return target;
    };
    Carousel.prototype.navigateTo = function (item) {
        var index = this.items.indexOf(item);
        if (index > this.activeIndex)
            this.next(item);
        else
            this.prev(item);
    };
    Carousel.prototype.prev = function (item) {
        if (item === void 0) { item = null; }
        if (this.items.length < 2)
            return;
        this.activeIndex = this.getRelativeIndex(-1);
        this._change.markForCheck();
    };
    Carousel.prototype.next = function (item) {
        if (item === void 0) { item = null; }
        if (this.items.length < 2)
            return;
        this.activeIndex = this.getRelativeIndex(1);
        this._change.markForCheck();
    };
    Carousel.prototype.swipeleft = function () {
        if (this.panDirection == 0)
            this.next();
    };
    Carousel.prototype.swiperight = function () {
        if (this.panDirection == 0)
            this.prev();
    };
    __decorate([
        core_3.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], Carousel.prototype, "interval", null);
    __decorate([
        core_2.ContentChildren(CarouselItem), 
        __metadata('design:type', core_2.QueryList)
    ], Carousel.prototype, "itemQuery", void 0);
    Carousel = __decorate([
        core_1.Component({
            selector: "carousel",
            template: "\n      <div class=\"carousel slide\" >\n        <!--(swiperight)=\"prev()\" (swipeleft)=\"next()\"-->\n        <!--(pan)=\"pan($event)\" (panleft)=\"panleft($event)\" (panright)=\"panright($event)\"\n        (panend)=\"panend($event)\"-->\n        <ol class=\"carousel-indicators\">\n          <!--<li *ngFor=\"let image of images\"\n            (click)=\"switchTo(image)\" [class.active]=\"image.isActive && !image.checkIfAnimating()\">\n            </li> -->\n            <li *ngFor=\"let item of items\"\n              [class.active]=\"item.isActive\"\n              (click)=\"navigateTo(item)\">\n            </li>\n        </ol>\n        <div class=\"carousel-inner\" role=\"listbox\"\n          [style.height.px]=\"innerHeight\">\n            <ng-content select=\"carousel-item,.carousel-item\"></ng-content>\n        </div>\n        <a class=\"left carousel-control\" role=\"button\" (click)=\"prev()\">\n          <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n          <span class=\"sr-only\">Previous</span>\n        </a>\n        <a class=\"right carousel-control\" role=\"button\" (click)=\"next()\">\n          <span class=\"icon-next\" aria-hidden=\"true\"></span>\n          <span class=\"sr-only\">Next</span>\n        </a>\n      </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, CarouselItem],
            changeDetection: core_3.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_3.ChangeDetectorRef, core_2.ElementRef])
    ], Carousel);
    return Carousel;
}());
exports.Carousel = Carousel;
exports.CAROUSEL_PROVIDERS = [
    Carousel, CarouselItem
];

//# sourceMappingURL=Carousel.js.map
