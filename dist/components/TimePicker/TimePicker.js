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
var TimePicker = (function () {
    function TimePicker() {
        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;
        this.showMeridian = true;
        this.meridians = ["AM", "PM"];
        this.showSeconds = false;
        this.readonlyInput = false;
        this.showSpinners = true;
        this.disabled = false;
        this.min = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0);
        this.max = new Date(new Date().getFullYear(), 0, 1, 23, 59, 59);
        this.value = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0);
        this.meridian = this.meridians.length > 0 ? this.meridians[0] : null;
        this.hours = 0;
        this.minutes = "00";
        this.seconds = "00";
        this.invalidHours = false;
        this.invalidMinutes = false;
        this.invalidSeconds = false;
        this.valueChange = new core_1.EventEmitter();
    }
    TimePicker.prototype.ngOnInit = function () {
        this.hours = this.value.getHours();
        this.minutes = this.value.getMinutes() > 9 ? this.value.getMinutes().toString() : "0" + this.value.getMinutes().toString();
        this.seconds = this.value.getSeconds() > 9 ? this.value.getSeconds().toString() : "0" + this.value.getSeconds().toString();
        this.refresh();
    };
    TimePicker.prototype.ngOnChanges = function (changes) {
        this.refresh();
    };
    TimePicker.prototype.incrementHours = function () {
        if (!this.noIncrementHours()) {
            this.addSecondsToSelected(this.hourStep * 60 * 60);
        }
    };
    ;
    TimePicker.prototype.decrementHours = function () {
        if (!this.noDecrementHours()) {
            this.addSecondsToSelected(-this.hourStep * 60 * 60);
        }
    };
    ;
    TimePicker.prototype.incrementMinutes = function () {
        if (!this.noIncrementMinutes()) {
            this.addSecondsToSelected(this.minuteStep * 60);
        }
    };
    ;
    TimePicker.prototype.decrementMinutes = function () {
        if (!this.noDecrementMinutes()) {
            this.addSecondsToSelected(-this.minuteStep * 60);
        }
    };
    ;
    TimePicker.prototype.incrementSeconds = function () {
        if (!this.noIncrementSeconds()) {
            this.addSecondsToSelected(this.secondStep);
        }
    };
    ;
    TimePicker.prototype.decrementSeconds = function () {
        if (!this.noDecrementSeconds()) {
            this.addSecondsToSelected(-this.secondStep);
        }
    };
    ;
    TimePicker.prototype.toggleMeridian = function () {
        if (this.noToggleMeridian())
            return;
        if (this.minutes && this.hours) {
            this.addSecondsToSelected(12 * 60 * (this.value.getHours() < 12 ? 60 : -60));
        }
        else {
            this.meridian = this.meridian === this.meridians[0] ? this.meridians[1] : this.meridians[0];
        }
    };
    ;
    TimePicker.prototype.addSecondsToSelected = function (seconds) {
        this.value = this.addSeconds(this.value, seconds);
        this.hours = this.value.getHours();
        this.minutes = this.value.getMinutes() > 9 ? this.value.getMinutes().toString() : "0" + this.value.getMinutes().toString();
        this.seconds = this.value.getSeconds() > 9 ? this.value.getSeconds().toString() : "0" + this.value.getSeconds().toString();
        this.valueChange.next(this.value);
        this.sanitize();
        this.refresh();
    };
    TimePicker.prototype.addMinutes = function (selected, minutes) {
        return this.addSeconds(selected, minutes * 60);
    };
    TimePicker.prototype.addSeconds = function (date, seconds) {
        var dt = new Date(date.getTime() + seconds * 1000);
        var newDate = new Date(date.getTime());
        newDate.setHours(dt.getHours(), dt.getMinutes(), dt.getSeconds());
        return newDate;
    };
    TimePicker.prototype.invalidTime = function () {
        return this.invalidHours || this.invalidMinutes || this.invalidSeconds;
    };
    TimePicker.prototype.sanitize = function () {
        this.invalidHours = false;
        this.invalidMinutes = false;
        this.invalidSeconds = false;
    };
    TimePicker.prototype.refresh = function () {
        this.hours = this.value.getHours();
        this.minutes = this.value.getMinutes() > 9 ? this.value.getMinutes().toString() : "0" + this.value.getMinutes().toString();
        this.seconds = this.value.getSeconds() > 9 ? this.value.getSeconds().toString() : "0" + this.value.getSeconds().toString();
        if (this.hours >= 12 && this.showMeridian) {
            this.meridian = this.meridians[1];
        }
        if (this.showMeridian) {
            this.hours = this.hours === 0 || this.hours === 12 ? 12 : this.hours % 12; // Convert 24 to 12 hour system
        }
        this.meridian = this.value.getHours() < 12 ? this.meridians[0] : this.meridians[1];
    };
    TimePicker.prototype.updateHours = function () {
        this.sanitize();
        if (this.hours.toString().length <= 0 || isNaN(this.hours) || this.hours < 0 || this.hours > 23 || (this.showMeridian && this.hours > 12)) {
            this.invalidHours = true;
        }
        else {
            this.hours = parseInt(this.hours.toString());
            this.value.setHours(this.showMeridian && this.meridian == this.meridians[1] ? this.hours + 12 : this.hours);
            this.addSecondsToSelected(0);
        }
    };
    TimePicker.prototype.updateMinutes = function () {
        this.sanitize();
        if (this.minutes.length <= 0 || isNaN(parseInt(this.minutes)) || parseInt(this.minutes) < 0 || parseInt(this.minutes) > 59) {
            this.invalidMinutes = true;
        }
        else {
            this.value.setMinutes(parseInt(this.minutes));
            this.addSecondsToSelected(0);
        }
    };
    TimePicker.prototype.updateSeconds = function () {
        this.sanitize();
        if (this.seconds.length <= 0 || isNaN(parseInt(this.seconds)) || parseInt(this.seconds) < 0 || parseInt(this.seconds) > 59) {
            this.invalidSeconds = true;
        }
        else {
            this.value.setSeconds(parseInt(this.seconds));
            this.addSecondsToSelected(0);
        }
    };
    TimePicker.prototype.noIncrementHours = function () {
        var incrementedSelected = this.addMinutes(this.value, this.hourStep * 60);
        return this.disabled || incrementedSelected > this.max ||
            incrementedSelected < this.value && incrementedSelected < this.min;
    };
    ;
    TimePicker.prototype.noDecrementHours = function () {
        var decrementedSelected = this.addMinutes(this.value, -this.hourStep * 60);
        return this.disabled || decrementedSelected < this.min ||
            decrementedSelected > this.value && decrementedSelected > this.max;
    };
    ;
    TimePicker.prototype.noIncrementMinutes = function () {
        var incrementedSelected = this.addMinutes(this.value, this.minuteStep);
        return this.disabled || incrementedSelected > this.max ||
            incrementedSelected < this.value && incrementedSelected < this.min;
    };
    ;
    TimePicker.prototype.noDecrementMinutes = function () {
        var decrementedSelected = this.addMinutes(this.value, -this.minuteStep);
        return this.disabled || decrementedSelected < this.min ||
            decrementedSelected > this.value && decrementedSelected > this.max;
    };
    ;
    TimePicker.prototype.noIncrementSeconds = function () {
        var incrementedSelected = this.addSeconds(this.value, this.secondStep);
        return this.disabled || incrementedSelected > this.max ||
            incrementedSelected < this.value && incrementedSelected < this.min;
    };
    ;
    TimePicker.prototype.noDecrementSeconds = function () {
        var decrementedSelected = this.addSeconds(this.value, -this.secondStep);
        return this.disabled || decrementedSelected < this.min ||
            decrementedSelected > this.value && decrementedSelected > this.max;
    };
    ;
    TimePicker.prototype.noToggleMeridian = function () {
        if (this.value.getHours() < 12) {
            return this.disabled || this.addMinutes(this.value, 12 * 60) > this.max;
        }
        return this.disabled || this.addMinutes(this.value, -12 * 60) < this.min;
    };
    ;
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TimePicker.prototype, "hourStep", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TimePicker.prototype, "minuteStep", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TimePicker.prototype, "secondStep", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimePicker.prototype, "showMeridian", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TimePicker.prototype, "meridians", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimePicker.prototype, "showSeconds", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimePicker.prototype, "readonlyInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimePicker.prototype, "showSpinners", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimePicker.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], TimePicker.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], TimePicker.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], TimePicker.prototype, "value", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TimePicker.prototype, "valueChange", void 0);
    TimePicker = __decorate([
        core_1.Component({
            selector: "timepicker",
            template: "\n      <table class=\"fuel-ui-timepicker\" [class.has-error]=\"invalidTime()\">\n          <tbody>\n              <tr class=\"text-center\" *ngIf=\"showSpinners\">\n                  <td class=\"fuel-ui-increment hours\">\n                      <a (click)=\"incrementHours()\" [class.disabled]=\"noIncrementHours()\" class=\"btn btn-link\" [attr.disabled]=\"noIncrementHours()\">\n                          <span class=\"fa fa-chevron-up\"></span>\n                      </a>\n                  </td>\n                  <td>&nbsp;</td>\n                  <td class=\"fuel-ui-increment minutes\">\n                      <a (click)=\"incrementMinutes()\" [class.disabled]=\"noIncrementMinutes()\" class=\"btn btn-link\" [attr.disabled]=\"noIncrementMinutes()\">\n                          <span class=\"fa fa-chevron-up\"></span>\n                      </a>\n                  </td>\n                  <td *ngIf=\"showSeconds\">&nbsp;</td>\n                  <td *ngIf=\"showSeconds\" class=\"fuel-ui-increment seconds\">\n                      <a (click)=\"incrementSeconds()\" [class.disabled]=\"noIncrementSeconds()\" class=\"btn btn-link\" [attr.disabled]=\"noIncrementSeconds()\">\n                          <span class=\"fa fa-chevron-up\"></span>\n                      </a>\n                  </td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n              </tr>\n              <tr>\n                  <td class=\"form-group fuel-ui-time hours\" [class.has-error]=\"invalidHours\">\n                      <input type=\"text\" placeholder=\"HH\" [(ngModel)]=\"hours\" (blur)=\"updateHours()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" maxlength=\"2\" [disabled]=\"noIncrementHours()\">\n                  </td>\n                  <td class=\"fuel-ui-separator\">:</td>\n                  <td class=\"form-group fuel-ui-time minutes\" [class.has-error]=\"invalidMinutes\">\n                      <input type=\"text\" placeholder=\"MM\" [(ngModel)]=\"minutes\" (blur)=\"updateMinutes()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" maxlength=\"2\" [disabled]=\"noIncrementMinutes()\">\n                  </td>\n                  <td *ngIf=\"showSeconds\" class=\"fuel-ui-separator\">:</td>\n                  <td class=\"form-group fuel-ui-time seconds\" [class.has-error]=\"invalidSeconds\" *ngIf=\"showSeconds\">\n                      <input type=\"text\" placeholder=\"SS\" [(ngModel)]=\"seconds\" (blur)=\"updateSeconds()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" maxlength=\"2\" [disabled]=\"noIncrementSeconds()\">\n                  </td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n                  <td *ngIf=\"showMeridian\" class=\"fuel-ui-time am-pm\"><button type=\"button\" [class.disabled]=\"noToggleMeridian()\" class=\"btn btn-primary text-center\" (click)=\"toggleMeridian()\">{{meridian}}</button></td>\n              </tr>\n              <tr class=\"text-center\" *ngIf=\"showSpinners\">\n                  <td class=\"fuel-ui-decrement hours\">\n                      <a (click)=\"decrementHours()\" [class.disabled]=\"noDecrementHours()\" class=\"btn btn-link\" [attr.disabled]=\"noDecrementHours()\">\n                          <span class=\"fa fa-chevron-down\"></span>\n                      </a>\n                  </td>\n                  <td>&nbsp;</td>\n                  <td class=\"fuel-ui-decrement minutes\">\n                      <a (click)=\"decrementMinutes()\" [class.disabled]=\"noDecrementMinutes()\" class=\"btn btn-link\" [attr.disabled]=\"noDecrementMinutes()\">\n                          <span class=\"fa fa-chevron-down\"></span>\n                      </a>\n                  </td>\n                  <td *ngIf=\"showSeconds\">&nbsp;</td>\n                  <td *ngIf=\"showSeconds\" class=\"fuel-ui-decrement seconds\">\n                      <a (click)=\"decrementSeconds()\" [class.disabled]=\"noDecrementSeconds()\" class=\"btn btn-link\" [attr.disabled]=\"noDecrementSeconds()\">\n                          <span class=\"fa fa-chevron-down\"></span>\n                      </a>\n                  </td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n              </tr>\n          </tbody>\n      </table>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], TimePicker);
    return TimePicker;
}());
exports.TimePicker = TimePicker;
exports.TIMEPICKER_PROVIDERS = [
    TimePicker
];

//# sourceMappingURL=TimePicker.js.map
