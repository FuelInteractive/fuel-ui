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
var Alert = (function () {
    function Alert(el) {
        this.displayed = false;
        this.closeButton = true;
        this.type = 'success';
        this.alertDisplayedChange = new angular2_1.EventEmitter();
        this._el = el.nativeElement;
    }
    Alert.prototype.getElement = function () {
        return this._el;
    };
    Alert.prototype.close = function () {
        this.displayed = false;
        this.alertDisplayedChange.next(null);
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Boolean)
    ], Alert.prototype, "displayed");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Boolean)
    ], Alert.prototype, "closeButton");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', String)
    ], Alert.prototype, "type");
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], Alert.prototype, "alertDisplayedChange");
    Alert = __decorate([
        angular2_1.Component({
            selector: 'alert'
        }),
        angular2_1.View({
            styles: ["\n      .alertFadeIn {\n        -webkit-animation-name: fadeIn;\n        -moz-animation-name: fadeIn;\n        animation-name: fadeIn;\n        -webkit-animation-duration: 1s;\n        -moz-animation-duration: 1s;\n        animation-duration: 1s;\n        -webkit-animation-timing-function: ease;\n        -moz-animation-timing-function: ease;\n        animation-timing-function: ease; }\n\n      /*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQWxlcnQvQWxlcnQuc2NzcyIsIi4uL25vZGVfbW9kdWxlcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL19wcmVmaXhlci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLFlBQVksQ0FBQTtFQytCSixzQkFBb0IsRUQ5QkYsTUFBTTtFQ2tDeEIsbUJBQWlCLEVEbENDLE1BQU07RUM4Q3hCLGNBQVksRUQ5Q00sTUFBTTtFQzhCeEIsMEJBQW9CLEVEakNqQixFQUFFO0VDcUNMLHVCQUFpQixFRHJDZCxFQUFFO0VDaURMLGtCQUFZLEVEakRULEVBQUU7RUNpQ0wsaUNBQW9CLEVENUJTLElBQUk7RUNnQ2pDLDhCQUFpQixFRGhDWSxJQUFJO0VDNENqQyx5QkFBWSxFRDVDaUIsSUFBSSxHQUN4QyIsImZpbGUiOiJjb21wb25lbnRzL0FsZXJ0L0FsZXJ0LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvYm91cmJvblwiO1xyXG5cclxuJGR1cmF0aW9uOiAxcztcclxuXHJcbi5hbGVydEZhZGVJbntcclxuICBAaW5jbHVkZSBhbmltYXRpb24tbmFtZShmYWRlSW4pO1xyXG4gIEBpbmNsdWRlIGFuaW1hdGlvbi1kdXJhdGlvbigkZHVyYXRpb24pO1xyXG4gIEBpbmNsdWRlIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb24oZWFzZSk7XHJcbn0iLCJAY2hhcnNldCBcIlVURi04XCI7XG5cbi8vLyBBIG1peGluIGZvciBnZW5lcmF0aW5nIHZlbmRvciBwcmVmaXhlcyBvbiBub24tc3RhbmRhcmRpemVkIHByb3BlcnRpZXMuXG4vLy9cbi8vLyBAcGFyYW0ge1N0cmluZ30gJHByb3BlcnR5XG4vLy8gICBQcm9wZXJ0eSB0byBwcmVmaXhcbi8vL1xuLy8vIEBwYXJhbSB7Kn0gJHZhbHVlXG4vLy8gICBWYWx1ZSB0byB1c2Vcbi8vL1xuLy8vIEBwYXJhbSB7TGlzdH0gJHByZWZpeGVzXG4vLy8gICBQcmVmaXhlcyB0byBkZWZpbmVcbi8vL1xuLy8vIEBleGFtcGxlIHNjc3MgLSBVc2FnZVxuLy8vICAgLmVsZW1lbnQge1xuLy8vICAgICBAaW5jbHVkZSBwcmVmaXhlcihib3JkZXItcmFkaXVzLCAxMHB4LCB3ZWJraXQgbXMgc3BlYyk7XG4vLy8gICB9XG4vLy9cbi8vLyBAZXhhbXBsZSBjc3MgLSBDU1MgT3V0cHV0XG4vLy8gICAuZWxlbWVudCB7XG4vLy8gICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMTBweDtcbi8vLyAgICAgLW1vei1ib3JkZXItcmFkaXVzOiAxMHB4O1xuLy8vICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuLy8vICAgfVxuLy8vXG4vLy8gQHJlcXVpcmUge3ZhcmlhYmxlfSAkcHJlZml4LWZvci13ZWJraXRcbi8vLyBAcmVxdWlyZSB7dmFyaWFibGV9ICRwcmVmaXgtZm9yLW1vemlsbGFcbi8vLyBAcmVxdWlyZSB7dmFyaWFibGV9ICRwcmVmaXgtZm9yLW1pY3Jvc29mdFxuLy8vIEByZXF1aXJlIHt2YXJpYWJsZX0gJHByZWZpeC1mb3Itb3BlcmFcbi8vLyBAcmVxdWlyZSB7dmFyaWFibGV9ICRwcmVmaXgtZm9yLXNwZWNcblxuQG1peGluIHByZWZpeGVyKCRwcm9wZXJ0eSwgJHZhbHVlLCAkcHJlZml4ZXMpIHtcbiAgQGVhY2ggJHByZWZpeCBpbiAkcHJlZml4ZXMge1xuICAgIEBpZiAkcHJlZml4ID09IHdlYmtpdCB7XG4gICAgICBAaWYgJHByZWZpeC1mb3Itd2Via2l0IHtcbiAgICAgICAgLXdlYmtpdC0jeyRwcm9wZXJ0eX06ICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9IEBlbHNlIGlmICRwcmVmaXggPT0gbW96IHtcbiAgICAgIEBpZiAkcHJlZml4LWZvci1tb3ppbGxhIHtcbiAgICAgICAgLW1vei0jeyRwcm9wZXJ0eX06ICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9IEBlbHNlIGlmICRwcmVmaXggPT0gbXMge1xuICAgICAgQGlmICRwcmVmaXgtZm9yLW1pY3Jvc29mdCB7XG4gICAgICAgIC1tcy0jeyRwcm9wZXJ0eX06ICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9IEBlbHNlIGlmICRwcmVmaXggPT0gbyB7XG4gICAgICBAaWYgJHByZWZpeC1mb3Itb3BlcmEge1xuICAgICAgICAtby0jeyRwcm9wZXJ0eX06ICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9IEBlbHNlIGlmICRwcmVmaXggPT0gc3BlYyB7XG4gICAgICBAaWYgJHByZWZpeC1mb3Itc3BlYyB7XG4gICAgICAgICN7JHByb3BlcnR5fTogJHZhbHVlO1xuICAgICAgfVxuICAgIH0gQGVsc2UgIHtcbiAgICAgIEB3YXJuIFwiVW5yZWNvZ25pemVkIHByZWZpeDogI3skcHJlZml4fVwiO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gZGlzYWJsZS1wcmVmaXgtZm9yLWFsbCgpIHtcbiAgJHByZWZpeC1mb3Itd2Via2l0OiAgICBmYWxzZSAhZ2xvYmFsO1xuICAkcHJlZml4LWZvci1tb3ppbGxhOiAgIGZhbHNlICFnbG9iYWw7XG4gICRwcmVmaXgtZm9yLW1pY3Jvc29mdDogZmFsc2UgIWdsb2JhbDtcbiAgJHByZWZpeC1mb3Itb3BlcmE6ICAgICBmYWxzZSAhZ2xvYmFsO1xuICAkcHJlZml4LWZvci1zcGVjOiAgICAgIGZhbHNlICFnbG9iYWw7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0= */\n    "],
            template: "\n      <div\n          *ng-if=\"displayed\"\n          role=\"alert\"\n          class=\"alert alertFadeIn\"\n          [ng-class]=\"{'alert-success': type === 'success', 'alert-info': type === 'info', 'alert-warning': type === 'warning', 'alert-danger': type === 'danger' }\" >\n          <button *ng-if=\"closeButton\" (click)=\"close()\" type=\"button\" class=\"close\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n              <span class=\"sr-only\">Close</span>\n          </button>\n          <ng-content></ng-content>\n      </div>\n    ",
            directives: [angular2_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], Alert);
    return Alert;
})();
exports.Alert = Alert;
exports.ALERT_PROVIDERS = [
    Alert
];

//# sourceMappingURL=Alert.js.map
