var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var AnimationListener_1 = require("../../directives/Animation/AnimationListener");
var Range_1 = require("../../pipes/Range/Range");
var Modal = (function () {
    function Modal(el) {
        this.displayed = false;
        this.closeOnUnfocus = true;
        this.closeButton = true;
        this.modalTitle = '';
        this._el = el.nativeElement;
    }
    Modal.prototype.clickElement = function (e) {
        if (this.closeOnUnfocus) {
            if (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')
                this.showModal(false);
        }
    };
    Modal.prototype.getElement = function () {
        return this._el;
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
        }
        else {
            body.classList.remove('modal-open');
            if (this.closeOnUnfocus) {
                this._el.childNodes[0].removeEventListener('click', function (e) {
                    if (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')
                        _this.showModal(false);
                });
            }
        }
        return false;
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Boolean)
    ], Modal.prototype, "closeOnUnfocus");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Boolean)
    ], Modal.prototype, "closeButton");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', String)
    ], Modal.prototype, "modalTitle");
    Modal = __decorate([
        angular2_1.Component({
            selector: 'modal',
            host: {
                '(click)': 'clickElement($event)'
            }
        }),
        angular2_1.View({
            styles: ["\n   .customFadeIn {\n     -webkit-animation-name: fadeInDown;\n     -moz-animation-name: fadeInDown;\n     animation-name: fadeInDown;\n     -webkit-animation-duration: 1s;\n     -moz-animation-duration: 1s;\n     animation-duration: 1s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\t"],
            template: "\n   <div class=\"modal\" [ng-class]=\"{customFadeIn: displayed}\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" [style.display]=\"displayed ? 'block' : 'none'\">\n       <div class=\"modal-dialog\" role=\"document\">\n           <div class=\"modal-content\">\n               <div class=\"modal-header\">\n                   <button *ng-if=\"closeButton\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"showModal(false)\">\n                       <span aria-hidden=\"true\">&times;</span>\n                       <span class=\"sr-only\">Close</span>\n                   </button>\n                   <h4 class=\"modal-title\" id=\"myModalLabel\">{{modalTitle}}</h4>\n               </div>\n               <ng-content></ng-content>\n           </div>\n       </div>\n   </div>\n   <div class=\"modal-backdrop\" [ng-class]=\"{fade: displayed, in: displayed}\" [style.display]=\"displayed ? 'block' : 'none'\"></div>\n\t",
            directives: [angular2_1.CORE_DIRECTIVES, AnimationListener_1.AnimationListener],
            pipes: [Range_1.Range]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], Modal);
    return Modal;
})();
exports.Modal = Modal;
exports.MODAL_PROVIDERS = [
    Modal
];

//# sourceMappingURL=Modal.js.map
