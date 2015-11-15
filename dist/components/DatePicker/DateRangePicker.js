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
var angular2_2 = require('angular2/angular2');
var DateRangePicker = (function () {
    function DateRangePicker() {
        this.startDateChange = new angular2_2.EventEmitter();
    }
    __decorate([
        angular2_2.Output(), 
        __metadata('design:type', Object)
    ], DateRangePicker.prototype, "startDateChange");
    DateRangePicker = __decorate([
        angular2_1.Component({
            selector: 'date-range-picker'
        }),
        angular2_1.View({
            styles: ["\n\n   /*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb21wb25lbnRzL0RhdGVQaWNrZXIvRGF0ZVJhbmdlUGlja2VyLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiIl0sImZpbGUiOiJjb21wb25lbnRzL0RhdGVQaWNrZXIvRGF0ZVJhbmdlUGlja2VyLmNzcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9 */\n\t"],
            template: "\n\n\t",
            directives: []
        }), 
        __metadata('design:paramtypes', [])
    ], DateRangePicker);
    return DateRangePicker;
})();
exports.DateRangePicker = DateRangePicker;

//# sourceMappingURL=DateRangePicker.js.map
