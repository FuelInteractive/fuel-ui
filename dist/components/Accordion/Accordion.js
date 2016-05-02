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
var Accordion = (function () {
    function Accordion() {
        this.closeOthers = true;
        this.duration = 250;
        this.items = [];
    }
    Accordion.prototype.closeOtherItems = function (openItem) {
        if (!this.closeOthers)
            return;
        this.items.forEach(function (item) {
            if (item !== openItem) {
                item.open = false;
                item.openChange.next(item.open);
            }
        });
    };
    Accordion.prototype.addItem = function (item) {
        this.items.push(item);
    };
    Accordion.prototype.removeItem = function (item) {
        var index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Accordion.prototype, "closeOthers", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Accordion.prototype, "duration", void 0);
    Accordion = __decorate([
        core_1.Component({
            selector: 'accordion',
            template: "<ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [])
    ], Accordion);
    return Accordion;
}());
exports.Accordion = Accordion;

//# sourceMappingURL=Accordion.js.map
