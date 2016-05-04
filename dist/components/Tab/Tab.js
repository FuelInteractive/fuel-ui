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
var TabSet_1 = require('./TabSet');
var Tab = (function () {
    function Tab(tabset) {
        this.activeChange = new core_1.EventEmitter(false);
        this.select = new core_1.EventEmitter(false);
        this.deselect = new core_1.EventEmitter(false);
        this.remove = new core_1.EventEmitter(false);
        this.addClass = true;
        this.tabset = tabset;
        this.tabset.addTab(this);
    }
    Object.defineProperty(Tab.prototype, "active", {
        /** tab active state toggle */
        get: function () {
            return this._active;
        },
        set: function (active) {
            var _this = this;
            if (this.disabled && active || !active) {
                //Only emit deselect event when changing
                if (this._active && this._active != active) {
                    this.deselect.next(this);
                }
                if (!active) {
                    this._active = active;
                }
                this.activeChange.next(this._active);
                return;
            }
            //Only emit select event when changing
            if (this._active != active) {
                this.select.next(this);
            }
            this._active = active;
            this.activeChange.next(this._active);
            this.tabset.tabs.forEach(function (tab) {
                if (tab !== _this) {
                    tab.active = false;
                    tab.activeChange.next(false);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Tab.prototype.ngOnDestroy = function () {
        this.tabset.removeTab(this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Tab.prototype, "heading", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Tab.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Tab.prototype, "removable", void 0);
    __decorate([
        core_1.HostBinding('class.active'),
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Tab.prototype, "active", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Tab.prototype, "activeChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Tab.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Tab.prototype, "deselect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Tab.prototype, "remove", void 0);
    __decorate([
        core_1.HostBinding('class.tab-pane'), 
        __metadata('design:type', Boolean)
    ], Tab.prototype, "addClass", void 0);
    Tab = __decorate([
        core_1.Directive({
            selector: 'tab, [tab]'
        }), 
        __metadata('design:paramtypes', [TabSet_1.TabSet])
    ], Tab);
    return Tab;
}());
exports.Tab = Tab;
exports.TAB_PROVIDERS = [
    Tab,
    TabSet_1.TabSet
];

//# sourceMappingURL=Tab.js.map
