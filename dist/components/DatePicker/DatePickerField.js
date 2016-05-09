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
var core_1 = require("@angular/core");
var DatePicker_1 = require("./DatePicker");
var DatePickerField = (function () {
    function DatePickerField() {
        this._date = new Date();
        this._value = "";
        this.valueChange = new core_1.EventEmitter();
        this.dateChange = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
    }
    Object.defineProperty(DatePickerField.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            this._value = value;
            this._date = DatePicker_1.DatePicker.handleDateInput(value);
            this.valueChange.next(value);
            this.dateChange.next(this._date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerField.prototype, "date", {
        get: function () { return this._date; },
        set: function (date) {
            this._date = date;
            this._value = date.toLocaleDateString();
            this.dateChange.next(date);
            this.valueChange.next(this._value);
        },
        enumerable: true,
        configurable: true
    });
    DatePickerField.prototype.inputChange = function (value) {
        this.value = value;
    };
    DatePickerField.prototype.focused = function (event) {
        this.select.next(event);
    };
    DatePickerField.prototype.selected = function (event) {
        this.select.next(event);
    };
    DatePickerField.prototype.ngOnInit = function () {
        this.date = DatePicker_1.DatePicker.handleDateInput(this.value);
    };
    __decorate([
        core_1.HostBinding("value"), 
        __metadata('design:type', Object)
    ], DatePickerField.prototype, "_value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], DatePickerField.prototype, "value", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DatePickerField.prototype, "valueChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date), 
        __metadata('design:paramtypes', [Date])
    ], DatePickerField.prototype, "date", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DatePickerField.prototype, "dateChange", void 0);
    __decorate([
        core_1.HostListener("input", ["$event.target.value"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DatePickerField.prototype, "inputChange", null);
    __decorate([
        core_1.HostListener("focus"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], DatePickerField.prototype, "focused", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DatePickerField.prototype, "select", void 0);
    __decorate([
        core_1.HostListener("click", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DatePickerField.prototype, "selected", null);
    DatePickerField = __decorate([
        core_1.Directive({
            selector: "[dateField], .date-field"
        }), 
        __metadata('design:paramtypes', [])
    ], DatePickerField);
    return DatePickerField;
}());
exports.DatePickerField = DatePickerField;
var DatePickerFieldStyler = (function () {
    function DatePickerFieldStyler() {
    }
    DatePickerFieldStyler = __decorate([
        core_1.Component({
            selector: ".date-picker-input-group",
            template: " \n    <div class=\"input-group fuel-ui-datepicker-input-group\">\n        <ng-content></ng-content>\n        <span class=\"input-group-addon\" > \n            <i class=\"fa fa-calendar\"></i>\n        </span>\n    </div>"
        }), 
        __metadata('design:paramtypes', [])
    ], DatePickerFieldStyler);
    return DatePickerFieldStyler;
}());
exports.DatePickerFieldStyler = DatePickerFieldStyler;

//# sourceMappingURL=DatePickerField.js.map
