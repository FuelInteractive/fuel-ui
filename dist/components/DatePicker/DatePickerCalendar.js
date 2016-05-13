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
var core_2 = require("@angular/core");
var common_1 = require("@angular/common");
var utilities_1 = require("../../utilities/utilities");
var DatePickerCalendar = (function () {
    function DatePickerCalendar() {
        this.selectedDateChange = new core_2.EventEmitter();
        this.dateTarget = null;
        this.showMonth = true;
    }
    DatePickerCalendar.prototype.ngOnInit = function () {
        this.buildWeeks(this.currentMonth || new Date());
    };
    DatePickerCalendar.prototype.checkSelectable = function (date) {
        var dateNumber = parseInt(date);
        if (isNaN(dateNumber))
            return false;
        var compareDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), dateNumber);
        if (typeof this.dateFilter == "function" && !this.dateFilter(compareDate))
            return false;
        return compareDate >= this.minDate && compareDate <= this.maxDate;
    };
    DatePickerCalendar.prototype.checkSelectedDate = function (date) {
        if (this.selectedDate == null)
            return false;
        if (this.startDate != null && this.endDate != null) {
            var compareDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), parseInt(date));
            return compareDate >= this.startDate && compareDate <= this.endDate;
        }
        return this.selectedDate.getFullYear() == this.currentMonth.getFullYear()
            && this.selectedDate.getMonth() == this.currentMonth.getMonth()
            && this.selectedDate.getDate().toString() == date;
    };
    DatePickerCalendar.prototype.checkStartDate = function (date) {
        if (this.endDate == null || !utilities_1.DateUtils.isValidDate(this.startDate) || !utilities_1.DateUtils.isValidDate(this.endDate))
            return false;
        if (this.startDate.getFullYear() == this.endDate.getFullYear()
            && this.startDate.getMonth() == this.endDate.getMonth()
            && this.startDate.getDate().toString() == this.endDate.getDate().toString())
            return false;
        return this.startDate.getFullYear() == this.currentMonth.getFullYear()
            && this.startDate.getMonth() == this.currentMonth.getMonth()
            && this.startDate.getDate().toString() == date;
    };
    DatePickerCalendar.prototype.checkEndDate = function (date) {
        if (this.endDate == null || !utilities_1.DateUtils.isValidDate(this.startDate) || !utilities_1.DateUtils.isValidDate(this.endDate))
            return false;
        if (this.startDate.getFullYear() == this.endDate.getFullYear()
            && this.startDate.getMonth() == this.endDate.getMonth()
            && this.startDate.getDate().toString() == this.endDate.getDate().toString())
            return false;
        return this.endDate.getFullYear() == this.currentMonth.getFullYear()
            && this.endDate.getMonth() == this.currentMonth.getMonth()
            && this.endDate.getDate().toString() == date;
    };
    DatePickerCalendar.prototype.selectDate = function (date) {
        if (!this.checkSelectable(date))
            return;
        var dateNumber = parseInt(date);
        this.selectedDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), dateNumber);
        this.selectedDateChange.next(this.selectedDate);
    };
    DatePickerCalendar.prototype.buildWeeks = function (date) {
        this.currentMonth = date;
        var currentDay = new Date(this.currentMonth.toDateString());
        currentDay.setDate(1);
        currentDay.setDate(currentDay.getDate() - currentDay.getDay());
        var lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
        lastDay.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
        this.weeks = [];
        var currentWeek = [];
        while (currentDay <= lastDay) {
            if (currentDay.getMonth() == this.currentMonth.getMonth())
                currentWeek.push(currentDay.getDate().toLocaleString());
            else
                currentWeek.push("");
            currentDay.setDate(currentDay.getDate() + 1);
            if (currentDay.getDay() == 0) {
                this.weeks.push(currentWeek);
                currentWeek = [];
            }
        }
    };
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "currentMonth", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "selectedDate", void 0);
    __decorate([
        core_2.Output(), 
        __metadata('design:type', Object)
    ], DatePickerCalendar.prototype, "selectedDateChange", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Boolean)
    ], DatePickerCalendar.prototype, "dateTarget", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "startDate", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "endDate", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "minDate", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "maxDate", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Function)
    ], DatePickerCalendar.prototype, "dateFilter", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Boolean)
    ], DatePickerCalendar.prototype, "showMonth", void 0);
    DatePickerCalendar = __decorate([
        core_1.Component({
            selector: "date-picker-calendar",
            template: "\n      <div class=\"fuel-ui-datepicker-calendar text-center py\">\n        <table class=\"table m-a-0\">\t\n            <tbody>\n                  <tr *ngIf=\"showMonth\">\n                      <td colspan=\"7\">\n                          <strong>{{currentMonth | date:'MMMM yyyy'}}</strong>\n                      </td>\n                  </tr> \n                <tr *ngFor=\"let week of weeks\">\n                    <td *ngFor=\"let day of week\"\n                        [class.selectable]=\"checkSelectable(day)\" \n                        [class.disabled]=\"!checkSelectable(day)\"\n                        [class.selected]=\"checkSelectedDate(day)\" \n                          [class.startDate]=\"checkStartDate(day)\"\n                          [class.endDate]=\"checkEndDate(day)\"\n                        (click)=\"selectDate(day)\">\n                        <span class=\"calendar-date\">{{day}}</span>\n                    </td> \n                </tr>\n            </tbody>\n        </table>\n      </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DatePickerCalendar);
    return DatePickerCalendar;
}());
exports.DatePickerCalendar = DatePickerCalendar;

//# sourceMappingURL=DatePickerCalendar.js.map
