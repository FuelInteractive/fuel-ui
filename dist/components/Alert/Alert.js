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
            styles: ["\n      .alertFadeIn {\n        -webkit-animation-name: fadeIn;\n        -moz-animation-name: fadeIn;\n        animation-name: fadeIn;\n        -webkit-animation-duration: 1s;\n        -moz-animation-duration: 1s;\n        animation-duration: 1s;\n        -webkit-animation-timing-function: ease;\n        -moz-animation-timing-function: ease;\n        animation-timing-function: ease; }\n    "],
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
