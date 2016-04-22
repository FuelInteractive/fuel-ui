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
var common_1 = require('angular2/common');
var TabSet = (function () {
    function TabSet() {
        this.tabs = [];
        this.classMap = {};
    }
    Object.defineProperty(TabSet.prototype, "vertical", {
        get: function () { return this._vertical; },
        set: function (value) {
            this._vertical = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TabSet.prototype, "type", {
        get: function () { return this._type; },
        set: function (value) {
            this._type = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    ;
    TabSet.prototype.ngOnInit = function () {
        this.type = this.type !== 'undefined' ? this.type : 'tabs';
    };
    TabSet.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
    };
    TabSet.prototype.addTab = function (tab) {
        this.tabs.push(tab);
        tab.active = this.tabs.length === 1 && tab.active !== false;
    };
    TabSet.prototype.removeTab = function (tab) {
        var index = this.tabs.indexOf(tab);
        if (index === -1 || this.isDestroyed) {
            return;
        }
        if (tab.active && this.hasAvailableTabs(index)) {
            var newActiveIndex = this.getClosestTabIndex(index);
            this.tabs[newActiveIndex].active = true;
        }
        tab.remove.next(tab);
        this.tabs.splice(index, 1);
    };
    TabSet.prototype.getClosestTabIndex = function (index) {
        var tabsLength = this.tabs.length;
        if (!tabsLength) {
            return -1;
        }
        for (var step = 1; step <= tabsLength; step += 1) {
            var prevIndex = index - step;
            var nextIndex = index + step;
            if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    };
    TabSet.prototype.hasAvailableTabs = function (index) {
        var tabsLength = this.tabs.length;
        if (!tabsLength) {
            return false;
        }
        for (var i = 0; i < tabsLength; i += 1) {
            if (!this.tabs[i].disabled && i !== index) {
                return true;
            }
        }
        return false;
    };
    TabSet.prototype.setClassMap = function () {
        this.classMap = (_a = {
                'nav-stacked': this.vertical
            },
            _a['nav-' + (this.type || 'tabs')] = true,
            _a
        );
        var _a;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TabSet.prototype, "vertical", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabSet.prototype, "type", null);
    TabSet = __decorate([
        core_1.Component({
            selector: 'tabset',
            directives: [common_1.NgClass],
            template: "\n    <ul class=\"nav\" [ngClass]=\"classMap\" (click)=\"$event.preventDefault()\">\n        <li *ngFor=\"#tab of tabs\" class=\"nav-item\"\n          [class.active]=\"tab.active\" [class.disabled]=\"tab.disabled\">\n          <a href class=\"nav-link\"\n            [class.active]=\"tab.active\" [class.disabled]=\"tab.disabled\"\n            (click)=\"tab.active = true\">\n            <span [innerHtml]=\"tab.heading\"></span>\n            <span *ngIf=\"tab.removable\" (click)=\"$event.preventDefault(); removeTab(tab);\">\n              <i class=\"fa fa-remove\"></i>\n            </span>\n          </a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n      <ng-content></ng-content>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TabSet);
    return TabSet;
}());
exports.TabSet = TabSet;

//# sourceMappingURL=TabSet.js.map
