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
            styles: ["\n   .customFadeIn {\n     -webkit-animation-name: fadeInDown;\n     -moz-animation-name: fadeInDown;\n     animation-name: fadeInDown;\n     -webkit-animation-duration: 1s;\n     -moz-animation-duration: 1s;\n     animation-duration: 1s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   /*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTW9kYWwvTW9kYWwuc2NzcyIsIi4uL25vZGVfbW9kdWxlcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL19wcmVmaXhlci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLGFBQWEsQ0FBQTtFQytCTCxzQkFBb0IsRUQ5QkYsVUFBVTtFQ2tDNUIsbUJBQWlCLEVEbENDLFVBQVU7RUM4QzVCLGNBQVksRUQ5Q00sVUFBVTtFQzhCNUIsMEJBQW9CLEVEakNqQixFQUFFO0VDcUNMLHVCQUFpQixFRHJDZCxFQUFFO0VDaURMLGtCQUFZLEVEakRULEVBQUU7RUNpQ0wsaUNBQW9CLEVENUJTLElBQUk7RUNnQ2pDLDhCQUFpQixFRGhDWSxJQUFJO0VDNENqQyx5QkFBWSxFRDVDaUIsSUFBSSxHQUN4QyIsImZpbGUiOiJjb21wb25lbnRzL01vZGFsL01vZGFsLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvYm91cmJvblwiO1xyXG5cclxuJGR1cmF0aW9uOiAxcztcclxuXHJcbi5jdXN0b21GYWRlSW57XHJcbiAgQGluY2x1ZGUgYW5pbWF0aW9uLW5hbWUoZmFkZUluRG93bik7XHJcbiAgQGluY2x1ZGUgYW5pbWF0aW9uLWR1cmF0aW9uKCRkdXJhdGlvbik7XHJcbiAgQGluY2x1ZGUgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbihlYXNlKTtcclxufSIsIkBjaGFyc2V0IFwiVVRGLThcIjtcblxuLy8vIEEgbWl4aW4gZm9yIGdlbmVyYXRpbmcgdmVuZG9yIHByZWZpeGVzIG9uIG5vbi1zdGFuZGFyZGl6ZWQgcHJvcGVydGllcy5cbi8vL1xuLy8vIEBwYXJhbSB7U3RyaW5nfSAkcHJvcGVydHlcbi8vLyAgIFByb3BlcnR5IHRvIHByZWZpeFxuLy8vXG4vLy8gQHBhcmFtIHsqfSAkdmFsdWVcbi8vLyAgIFZhbHVlIHRvIHVzZVxuLy8vXG4vLy8gQHBhcmFtIHtMaXN0fSAkcHJlZml4ZXNcbi8vLyAgIFByZWZpeGVzIHRvIGRlZmluZVxuLy8vXG4vLy8gQGV4YW1wbGUgc2NzcyAtIFVzYWdlXG4vLy8gICAuZWxlbWVudCB7XG4vLy8gICAgIEBpbmNsdWRlIHByZWZpeGVyKGJvcmRlci1yYWRpdXMsIDEwcHgsIHdlYmtpdCBtcyBzcGVjKTtcbi8vLyAgIH1cbi8vL1xuLy8vIEBleGFtcGxlIGNzcyAtIENTUyBPdXRwdXRcbi8vLyAgIC5lbGVtZW50IHtcbi8vLyAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAxMHB4O1xuLy8vICAgICAtbW96LWJvcmRlci1yYWRpdXM6IDEwcHg7XG4vLy8gICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4vLy8gICB9XG4vLy9cbi8vLyBAcmVxdWlyZSB7dmFyaWFibGV9ICRwcmVmaXgtZm9yLXdlYmtpdFxuLy8vIEByZXF1aXJlIHt2YXJpYWJsZX0gJHByZWZpeC1mb3ItbW96aWxsYVxuLy8vIEByZXF1aXJlIHt2YXJpYWJsZX0gJHByZWZpeC1mb3ItbWljcm9zb2Z0XG4vLy8gQHJlcXVpcmUge3ZhcmlhYmxlfSAkcHJlZml4LWZvci1vcGVyYVxuLy8vIEByZXF1aXJlIHt2YXJpYWJsZX0gJHByZWZpeC1mb3Itc3BlY1xuXG5AbWl4aW4gcHJlZml4ZXIoJHByb3BlcnR5LCAkdmFsdWUsICRwcmVmaXhlcykge1xuICBAZWFjaCAkcHJlZml4IGluICRwcmVmaXhlcyB7XG4gICAgQGlmICRwcmVmaXggPT0gd2Via2l0IHtcbiAgICAgIEBpZiAkcHJlZml4LWZvci13ZWJraXQge1xuICAgICAgICAtd2Via2l0LSN7JHByb3BlcnR5fTogJHZhbHVlO1xuICAgICAgfVxuICAgIH0gQGVsc2UgaWYgJHByZWZpeCA9PSBtb3oge1xuICAgICAgQGlmICRwcmVmaXgtZm9yLW1vemlsbGEge1xuICAgICAgICAtbW96LSN7JHByb3BlcnR5fTogJHZhbHVlO1xuICAgICAgfVxuICAgIH0gQGVsc2UgaWYgJHByZWZpeCA9PSBtcyB7XG4gICAgICBAaWYgJHByZWZpeC1mb3ItbWljcm9zb2Z0IHtcbiAgICAgICAgLW1zLSN7JHByb3BlcnR5fTogJHZhbHVlO1xuICAgICAgfVxuICAgIH0gQGVsc2UgaWYgJHByZWZpeCA9PSBvIHtcbiAgICAgIEBpZiAkcHJlZml4LWZvci1vcGVyYSB7XG4gICAgICAgIC1vLSN7JHByb3BlcnR5fTogJHZhbHVlO1xuICAgICAgfVxuICAgIH0gQGVsc2UgaWYgJHByZWZpeCA9PSBzcGVjIHtcbiAgICAgIEBpZiAkcHJlZml4LWZvci1zcGVjIHtcbiAgICAgICAgI3skcHJvcGVydHl9OiAkdmFsdWU7XG4gICAgICB9XG4gICAgfSBAZWxzZSAge1xuICAgICAgQHdhcm4gXCJVbnJlY29nbml6ZWQgcHJlZml4OiAjeyRwcmVmaXh9XCI7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBkaXNhYmxlLXByZWZpeC1mb3ItYWxsKCkge1xuICAkcHJlZml4LWZvci13ZWJraXQ6ICAgIGZhbHNlICFnbG9iYWw7XG4gICRwcmVmaXgtZm9yLW1vemlsbGE6ICAgZmFsc2UgIWdsb2JhbDtcbiAgJHByZWZpeC1mb3ItbWljcm9zb2Z0OiBmYWxzZSAhZ2xvYmFsO1xuICAkcHJlZml4LWZvci1vcGVyYTogICAgIGZhbHNlICFnbG9iYWw7XG4gICRwcmVmaXgtZm9yLXNwZWM6ICAgICAgZmFsc2UgIWdsb2JhbDtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ== */\n\t"],
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
