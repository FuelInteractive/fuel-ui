"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var common_1 = require('@angular/common');
var Alert = (function (_super) {
    __extends(Alert, _super);
    function Alert(_el) {
        _super.call(this);
        this._el = _el;
        this.displayed = false;
        this.closeButton = true;
        this.type = 'success';
        this.closeDelay = 0;
        this.displayedChange = new core_1.EventEmitter();
    }
    Alert.prototype.ngOnChanges = function (event) {
        var _this = this;
        if (this.displayed && this._el.nativeElement.querySelector('.alert')) {
            var classes = this._el.nativeElement.querySelector('.alert').className;
            classes = classes.replace('fuel-ui-alert-fade-out', 'fuel-ui-alert-fade-in');
            this._el.nativeElement.querySelector('.alert').className = classes;
        }
        if (this.closeDelay > 0) {
            setTimeout(function () {
                _this.close();
            }, this.closeDelay);
        }
    };
    Alert.prototype.close = function () {
        var _this = this;
        if (this._el.nativeElement.querySelector('.alert')) {
            var classes = this._el.nativeElement.querySelector('.alert').className;
            classes = classes.replace('fuel-ui-alert-fade-in', 'fuel-ui-alert-fade-out');
            this._el.nativeElement.querySelector('.alert').className = classes;
        }
        setTimeout(function () {
            _this.displayed = false;
            _this.displayedChange.next(null);
        }, 1000);
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
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Alert.prototype, "closeDelay", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Alert.prototype, "displayedChange", void 0);
    Alert = __decorate([
        core_1.Component({
            selector: 'alert',
            template: "\n      <div\n          *ngIf=\"displayed\"\n          role=\"alert\"\n          class=\"alert fuel-ui-alert-fade-in\"\n          [ngClass]=\"{'alert-success': type === 'success', 'alert-info': type === 'info', 'alert-warning': type === 'warning', 'alert-danger': type === 'danger' }\" >\n          <button *ngIf=\"closeButton\" (click)=\"close()\" type=\"button\" class=\"close\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&#215;</span>\n              <span class=\"sr-only\">Close</span>\n          </button>\n          <ng-content></ng-content>\n      </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Alert);
    return Alert;
}(core_1.OnChanges));
exports.Alert = Alert;
exports.ALERT_PROVIDERS = [
    Alert
];

//# sourceMappingURL=Alert.js.map
