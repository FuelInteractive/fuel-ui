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
var Alert = (function () {
    function Alert(el) {
        this.displayed = false;
        this.closeButton = true;
        this.type = 'success';
        this.displayedChange = new core_1.EventEmitter();
        this._el = el.nativeElement;
    }
    Alert.prototype.getElement = function () {
        return this._el;
    };
    Alert.prototype.close = function () {
        this.displayed = false;
        this.displayedChange.next(null);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Alert.prototype, "displayed", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Alert.prototype, "closeButton", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Alert.prototype, "type", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Alert.prototype, "displayedChange", void 0);
    Alert = __decorate([
        core_1.Component({
            selector: 'alert'
        }),
        core_1.View({
            styles: ["\n      .alertFadeIn {\n        -webkit-animation-name: fadeIn;\n        -moz-animation-name: fadeIn;\n        animation-name: fadeIn;\n        -webkit-animation-duration: 1s;\n        -moz-animation-duration: 1s;\n        animation-duration: 1s;\n        -webkit-animation-timing-function: ease;\n        -moz-animation-timing-function: ease;\n        animation-timing-function: ease; }\n    "],
            template: "\n      <div\n          *ngIf=\"displayed\"\n          role=\"alert\"\n          class=\"alert alertFadeIn\"\n          [ngClass]=\"{'alert-success': type === 'success', 'alert-info': type === 'info', 'alert-warning': type === 'warning', 'alert-danger': type === 'danger' }\" >\n          <button *ngIf=\"closeButton\" (click)=\"close()\" type=\"button\" class=\"close\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&#215;</span>\n              <span class=\"sr-only\">Close</span>\n          </button>\n          <ng-content></ng-content>\n      </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Alert);
    return Alert;
}());
exports.Alert = Alert;
exports.ALERT_PROVIDERS = [
    Alert
];

//# sourceMappingURL=Alert.js.map
