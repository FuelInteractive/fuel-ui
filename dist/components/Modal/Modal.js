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
var common_1 = require('@angular/common');
var Animation_1 = require("../../directives/Animation/Animation");
var Modal = (function () {
    function Modal(el) {
        this.displayed = false;
        this.closeOnUnfocus = true;
        this.closeButton = true;
        this.modalTitle = '';
        this.size = '';
        this.close = new core_1.EventEmitter();
        this.open = new core_1.EventEmitter();
        this._el = el.nativeElement;
    }
    Modal.prototype.clickElement = function (e) {
        if (this.closeOnUnfocus) {
            if ((e.target && (e.target.className == 'modal customFadeIn' || e.target.className == 'modal-dialog'))
                || (e.srcElement && (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')))
                this.closeModal();
        }
    };
    Modal.prototype.getElement = function () {
        return this._el;
    };
    Modal.prototype.closeModal = function () {
        this.showModal(false);
        this.close.next(null);
        return false;
    };
    Modal.prototype.showModal = function (isDisplayed) {
        var _this = this;
        var body = document.body;
        if (isDisplayed === undefined) {
            this.displayed = !this.displayed;
        }
        else {
            this.displayed = isDisplayed;
        }
        if (this.displayed) {
            body.classList.add('modal-open');
            this.open.next(null);
        }
        else {
            body.classList.remove('modal-open');
            if (this.closeOnUnfocus) {
                this._el.childNodes[0].removeEventListener('click', function (e) {
                    if ((e.target && (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog'))
                        || (e.srcElement && (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')))
                        _this.showModal(false);
                });
            }
        }
        return false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Modal.prototype, "closeOnUnfocus", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Modal.prototype, "closeButton", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Modal.prototype, "modalTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Modal.prototype, "size", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Modal.prototype, "close", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Modal.prototype, "open", void 0);
    Modal = __decorate([
        core_1.Component({
            selector: 'modal',
            host: {
                '(click)': 'clickElement($event)'
            },
            template: "\n   <div class=\"modal\" [ngClass]=\"{'fuel-ui-modal-fade-in': displayed}\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" [style.display]=\"displayed ? 'block' : 'none'\">\n       <div class=\"modal-dialog\" role=\"document\" [ngClass]=\"{'modal-lg': size == 'large' || size == 'lg', 'modal-sm': size == 'small' || size == 'sm'}\">\n           <div class=\"modal-content\">\n               <div class=\"modal-header\">\n                   <button *ngIf=\"closeButton\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"closeModal()\">\n                       <span aria-hidden=\"true\">&#215;</span>\n                       <span class=\"sr-only\">Close</span>\n                   </button>\n                   <h4 class=\"modal-title\" id=\"myModalLabel\">{{modalTitle}}</h4>\n               </div>\n               <ng-content></ng-content>\n           </div>\n       </div>\n   </div>\n   <div class=\"modal-backdrop\" [ngClass]=\"{fade: displayed, in: displayed}\" [style.display]=\"displayed ? 'block' : 'none'\"></div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, Animation_1.Animation]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Modal);
    return Modal;
}());
exports.Modal = Modal;
exports.MODAL_PROVIDERS = [
    Modal
];

//# sourceMappingURL=Modal.js.map
