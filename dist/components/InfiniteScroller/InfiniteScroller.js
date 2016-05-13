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
var ElementUtils_1 = require("../../utilities/ElementUtils");
var ScrollItem = (function () {
    function ScrollItem(element) {
        this.element = element.nativeElement;
    }
    Object.defineProperty(ScrollItem.prototype, "height", {
        get: function () {
            return ElementUtils_1.ElementUtils.outerHeight(this.element);
        },
        enumerable: true,
        configurable: true
    });
    ScrollItem.prototype.ngAfterViewInit = function () {
        this.element = this.element.firstElementChild;
    };
    ScrollItem = __decorate([
        core_1.Directive({
            selector: "[scroll-item],.scroll-item"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ScrollItem);
    return ScrollItem;
}());
exports.ScrollItem = ScrollItem;
var InfiniteScroller = (function () {
    //test
    function InfiniteScroller(element) {
        this.distance = 100;
        this.height = 'auto';
        this.hideScrollbar = false;
        this.next = new core_1.EventEmitter();
        this.prev = new core_1.EventEmitter();
        this.topIndexChange = new core_1.EventEmitter();
        this.topIndex = 0;
        this.bottomIndexChange = new core_1.EventEmitter();
        this.bottomIndex = 0;
        this.lastScroll = 0;
        this.container = element.nativeElement;
    }
    InfiniteScroller.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.firstItem = this.itemQuery.first;
        this.itemQuery.changes.subscribe(function () {
            _this.handleItemChanges();
        });
    };
    InfiniteScroller.prototype.ngAfterViewInit = function () {
        this.container = this.container.firstElementChild;
        this.container.scrollTop += 1;
    };
    InfiniteScroller.prototype.handleItemChanges = function () {
        if (this.firstItem == null)
            this.firstItem = this.itemQuery.first;
        if (this.firstItem !== this.itemQuery.first) {
            this.container.scrollTop += this.itemQuery.first.height;
            this.firstItem = this.itemQuery.first;
        }
    };
    InfiniteScroller.prototype.getVisableIndicies = function () {
        var _this = this;
        var itemArray = this.itemQuery.toArray();
        var visableIndicies = itemArray
            .filter(function (i) { return _this.checkVisableItem(i); })
            .map(function (i) { return itemArray.indexOf(i); });
        if (visableIndicies.length > 1) {
            this.topIndex = visableIndicies[0];
            this.bottomIndex = visableIndicies[visableIndicies.length - 1];
            this.topIndexChange.next(this.topIndex);
            this.bottomIndexChange.next(this.bottomIndex);
        }
        else if (visableIndicies.length > 0) {
            this.topIndex = visableIndicies[0];
            this.topIndexChange.next(this.topIndex);
        }
    };
    InfiniteScroller.prototype.checkVisableItem = function (item) {
        var itemTop = item.element.offsetTop;
        var itemBottom = itemTop + ElementUtils_1.ElementUtils.outerHeight(item.element);
        var viewTop = this.container.scrollTop + this.container.offsetTop;
        var viewBottom = viewTop + this.container.clientHeight;
        if (itemTop > viewTop && itemTop < viewBottom)
            return true;
        if (itemBottom > viewTop && itemBottom < viewBottom)
            return true;
        if (itemTop < viewTop && itemBottom > viewBottom)
            return true;
        return false;
    };
    InfiniteScroller.prototype.doscroll = function (event) {
        var target = (typeof event.srcElement === 'undefined' ? event.target : event.srcElement);
        var targetRect = target.getBoundingClientRect();
        var bottomPosition = target.scrollHeight - (target.scrollTop + targetRect.height);
        var scrollDown = target.scrollTop > this.lastScroll;
        var saveLastScroll = this.lastScroll;
        this.lastScroll = target.scrollTop;
        if (scrollDown && target.scrollHeight - (target.scrollTop + targetRect.height) <= this.distance * 2) {
            this.next.emit(null);
            if (target.scrollHeight - target.scrollTop === target.clientHeight) {
                target.scrollTop -= 10;
            }
        }
        else if (!scrollDown && target.scrollTop <= this.distance * 2) {
            this.prev.emit(null);
        }
        this.getVisableIndicies();
        if (target.scrollTop < 1)
            target.scrollTop = 1;
    };
    InfiniteScroller.prototype.scrollTo = function (position) {
        ElementUtils_1.ElementUtils.scrollTo(this.container, position, 400);
    };
    InfiniteScroller.prototype.scrollToIndex = function (index) {
        var itemArray = this.itemQuery.toArray();
        var targetIndex = 0;
        if (index > 0 && index < itemArray.length)
            targetIndex = index;
        else if (index >= itemArray.length)
            targetIndex = itemArray.length - 1;
        if (targetIndex < 0)
            targetIndex = 0;
        var target = this.itemQuery.toArray()[targetIndex];
        var targetPos = target.element.offsetTop - this.container.offsetTop;
        this.scrollTo(targetPos);
    };
    InfiniteScroller.prototype.isTop = function () {
        return this.lastScroll <= 1;
    };
    InfiniteScroller.prototype.isBottom = function () {
        return (this.lastScroll + this.container.clientHeight) >= this.container.scrollHeight - 10;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InfiniteScroller.prototype, "distance", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InfiniteScroller.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], InfiniteScroller.prototype, "hideScrollbar", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InfiniteScroller.prototype, "next", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InfiniteScroller.prototype, "prev", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InfiniteScroller.prototype, "topIndexChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InfiniteScroller.prototype, "bottomIndexChange", void 0);
    __decorate([
        core_1.ContentChildren(ScrollItem), 
        __metadata('design:type', core_1.QueryList)
    ], InfiniteScroller.prototype, "itemQuery", void 0);
    InfiniteScroller = __decorate([
        core_1.Component({
            selector: "infinite-scroller",
            template: "\n\t\t<div class=\"scroll-container\" \n\t\t\t(scroll)=\"doscroll($event)\"\n\t\t\t[style.height]=\"height\"\n\t\t\t[class.hide-scrollbar]=\"hideScrollbar\">\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t",
            styles: ["\n\t\t.scroll-container {\n\t\t\toverflow-y: scroll;\n\t\t\toverflow-x: hidden;\n            max-height: 100%;\n\t\t}\n\t\t\n\t\t.scroll-container.hide-scrollbar::-webkit-scrollbar {\n\t\t\tdisplay: none;\n\t\t}\n\t\t\n\t\t.scroll-content {\n\t\t\toverflow: auto;\n\t\t}\n\t"],
            directives: []
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], InfiniteScroller);
    return InfiniteScroller;
}());
exports.InfiniteScroller = InfiniteScroller;
exports.INFINITE_SCROLLER_PROVIDERS = [
    InfiniteScroller, ScrollItem
];

//# sourceMappingURL=InfiniteScroller.js.map
