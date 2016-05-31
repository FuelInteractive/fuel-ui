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
var animation_builder_1 = require("@angular/platform-browser/src/animate/animation_builder");
//import {HammerGesturesPluginCommon} from "@angular//platform-browser/src/dom/events/hammer_common";
var CarouselItem = (function () {
    function CarouselItem(element, animationBuilder, _render, _change) {
        this._render = _render;
        this._change = _change;
        this.id = 0;
        this.duration = 250;
        this.element = element.nativeElement;
        this._animationBuilder = animationBuilder;
    }
    Object.defineProperty(CarouselItem.prototype, "isActive", {
        get: function () {
            return this._isActive;
        },
        set: function (value) {
            this._isActive = value;
            this._render.setElementClass(this.element, "active", value);
            this._render.setElementClass(this.element, "hide", !value);
            this.setClasses(["out-left", "out-right"], false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselItem.prototype, "_animation", {
        get: function () {
            return this._animationBuilder.css()
                .setDuration(this.duration);
        },
        enumerable: true,
        configurable: true
    });
    CarouselItem.prototype.ngAfterViewInit = function () {
    };
    CarouselItem.prototype.ngAfterContentInit = function () {
    };
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
    CarouselItem.prototype.setClasses = function (classes, isAdd) {
        var _this = this;
        classes.map(function (c) {
            _this._render.setElementClass(_this.element, c, isAdd);
        });
    };
    CarouselItem.prototype.translate = function (x) {
        this._render.setElementClass(this.element, "hide", false);
        this._render.setElementStyle(this.element, "transform", "translate(" + x + "%,0)");
    };
    CarouselItem.prototype.resetTranslation = function () {
        this._render.setElementStyle(this.element, "transform", "");
    };
    CarouselItem.prototype.slide = function (start, end) {
        var _this = this;
        var animation = this._animation
            .setFromStyles({ "transform": "translate(" + start + "%,0)" })
            .setToStyles({ "transform": "translate(" + end + "%,0)" });
        var activate = end == 0;
        if (activate) {
            if (start > end)
                animation.addAnimationClass("out-right");
            else
                animation.addAnimationClass("out-left");
        }
        this.isActive = activate;
        this._render.setElementClass(this.element, "hide", false);
        return new Promise(function (resolve, reject) {
            //hack for animation onComplete for non chrome
            setTimeout(function () {
                this.isActive = activate;
                resolve();
            }, _this.duration);
            animation.start(_this.element);
        });
    };
    CarouselItem.prototype.slideOutLeft = function () {
        return this.slide(0, -100);
    };
    CarouselItem.prototype.slideOutRight = function () {
        return this.slide(0, 100);
    };
    CarouselItem.prototype.slideInLeft = function () {
        return this.slide(100, 0);
    };
    CarouselItem.prototype.slideInRight = function () {
        return this.slide(-100, 0);
    };
    CarouselItem = __decorate([
        core_1.Directive({
            selector: ".carousel-item",
        }), 
        __metadata('design:paramtypes', [core_2.ElementRef, animation_builder_1.AnimationBuilder, core_1.Renderer, core_3.ChangeDetectorRef])
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
        this.animation = null;
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
                this.items[i].isActive = (i == val.toString());
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
        var _this = this;
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
                    current.isActive = false;
                    return prev;
                }
                else
                    return index;
            }, -1);
        if (this.activeIndex == -1)
            this.activeIndex = 0;
        this.updateInnerHeight();
        // hack for initial height (chrome)
        setTimeout(function () {
            _this.updateInnerHeight();
        }, 400);
        this._change.markForCheck();
    };
    Carousel.prototype.updateInnerHeight = function () {
        this.innerHeight = this.items[this.activeIndex].getTotalHeight();
        if (this.innerHeight < 1)
            this.innerHeight = 250;
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
        var _this = this;
        if (item === void 0) { item = null; }
        if (this.animation != null) {
            this.animation.then(function () {
                _this.prev();
            });
            return;
        }
        if (this.items.length < 2)
            return;
        var current = this.getRelativeItem(0);
        var prev = item != null ? item : this.getRelativeItem(-1);
        current.slideOutRight();
        prev.slideInRight()
            .then(function () {
            _this.animation = null;
            _this.activeIndex = _this.items.indexOf(prev);
            _this.innerHeight = _this.items[_this.activeIndex].getTotalHeight();
            _this._change.markForCheck();
        });
    };
    Carousel.prototype.next = function (item) {
        var _this = this;
        if (item === void 0) { item = null; }
        if (this.animation != null) {
            this.animation.then(function () {
                _this.next();
            });
            return;
        }
        if (this.items.length < 2)
            return;
        var current = this.getRelativeItem(0);
        var next = item != null ? item : this.getRelativeItem(1);
        current.slideOutLeft();
        this.animation = next.slideInLeft()
            .then(function () {
            _this.animation = null;
            _this.activeIndex = _this.items.indexOf(next);
            _this.innerHeight = _this.items[_this.activeIndex].getTotalHeight();
            _this._change.markForCheck();
        });
    };
    Carousel.prototype.swipeleft = function () {
        if (this.panDirection == 0)
            this.next();
    };
    Carousel.prototype.swiperight = function () {
        if (this.panDirection == 0)
            this.prev();
    };
    Carousel.prototype.panleft = function (event) {
        if (this.panDirection == 0)
            this.panDirection = 1;
    };
    Carousel.prototype.panright = function (event) {
        if (this.panDirection == 0)
            this.panDirection = -1;
    };
    Carousel.prototype.pan = function (event) {
        event.preventDefault();
        if (this.panDirection == 0 || event.deltaX == 0)
            return;
        var current = this.getRelativeItem(0);
        var next = this.getRelativeItem(this.panDirection);
        var width = current.element.clientWidth;
        var offset = this.lastPanOffset = ((100 / width) * event.deltaX);
        var nextOffset = (100 - Math.abs(offset)) * (offset / Math.abs(offset)) * -1;
        current.translate(offset);
        next.translate(nextOffset);
    };
    Carousel.prototype.panend = function (event) {
        var _this = this;
        if (this.lastPanOffset == 0)
            return;
        var current = this.getRelativeItem(0);
        var next = this.getRelativeItem(this.panDirection);
        var offset = this.lastPanOffset;
        var nextOffset = (100 - Math.abs(offset)) * (offset / Math.abs(offset)) * -1;
        if (Math.abs(this.lastPanOffset) < 50) {
            current.slide(this.lastPanOffset, 0);
            next.slide(nextOffset, 100 * this.panDirection);
        }
        else {
            current.slide(this.lastPanOffset, 100 * this.panDirection);
            this.animation = next.slide(nextOffset, 0)
                .then(function () {
                _this.animation = null;
                _this.activeIndex = _this.getRelativeIndex(_this.panDirection);
            });
        }
        this.lastPanOffset = 0;
        /*if(this.panDirection == -1)
            this.prev();
        else
            this.next();*/
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
            selector: 'carousel',
            template: "\n      <div class=\"carousel slide\" >\n        <!--(swiperight)=\"prev()\" (swipeleft)=\"next()\"-->\n        <!--(pan)=\"pan($event)\" (panleft)=\"panleft($event)\" (panright)=\"panright($event)\"\n        (panend)=\"panend($event)\"-->\n        <ol class=\"carousel-indicators\">\n          <!--<li *ngFor=\"let image of images\"\n            (click)=\"switchTo(image)\" [class.active]=\"image.isActive && !image.checkIfAnimating()\">\n            </li> -->\n            <li *ngFor=\"let item of items\"\n              [class.active]=\"item.isActive\"\n              (click)=\"navigateTo(item)\">\n            </li>\n        </ol>\n        <div class=\"carousel-inner\" role=\"listbox\"\n          [style.height.px]=\"innerHeight\">\n            <ng-content select=\"carousel-item,.carousel-item\"></ng-content>\n        </div>\n        <a class=\"left carousel-control\" role=\"button\" (click)=\"prev()\">\n          <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n          <span class=\"sr-only\">Previous</span>\n        </a>\n        <a class=\"right carousel-control\" role=\"button\" (click)=\"next()\">\n          <span class=\"icon-next\" aria-hidden=\"true\"></span>\n          <span class=\"sr-only\">Next</span>\n        </a>\n      </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, CarouselItem]
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
