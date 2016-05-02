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
var Collapse_1 = require('../../directives/Collapse/Collapse');
var Accordion_1 = require('./Accordion');
var AccordionItem = (function () {
    function AccordionItem(accordion) {
        this.disabled = false;
        this._open = false;
        this.openChange = new core_1.EventEmitter();
        this.accordion = accordion;
    }
    Object.defineProperty(AccordionItem.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (value) {
            this._open = value;
            if (value) {
                this.accordion.closeOtherItems(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    AccordionItem.prototype.ngOnInit = function () {
        this.accordion.addItem(this);
    };
    AccordionItem.prototype.ngOnDestroy = function () {
        this.accordion.removeItem(this);
    };
    AccordionItem.prototype.toggleOpen = function (event) {
        event.preventDefault();
        if (!this.disabled) {
            this.open = !this.open;
            this.openChange.next(this.open);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AccordionItem.prototype, "heading", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AccordionItem.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AccordionItem.prototype, "open", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AccordionItem.prototype, "openChange", void 0);
    AccordionItem = __decorate([
        core_1.Component({
            selector: 'accordion-item, [accordion-item]',
            directives: [Collapse_1.Collapse, common_1.NgClass],
            template: "\n      <div (click)=\"toggleOpen($event)\">\n          <span *ngIf=\"heading\" class=\"fuel-ui-clickable\" [ngClass]=\"{'text-muted': disabled}\">{{heading}}</span>\n          <ng-content select=\"accordion-heading\"></ng-content>\n          <ng-content select=\"[accordion-heading]\"></ng-content>\n      </div>\n      <div class=\"fuel-ui-collapse\" [collapse]=\"!open\" [duration]=\"accordion.duration\">\n          <ng-content></ng-content>\n      </div>\n    "
        }), 
        __metadata('design:paramtypes', [Accordion_1.Accordion])
    ], AccordionItem);
    return AccordionItem;
}());
exports.AccordionItem = AccordionItem;
exports.ACCORDION_PROVIDERS = [
    Accordion_1.Accordion,
    AccordionItem
];

//# sourceMappingURL=AccordionItem.js.map
