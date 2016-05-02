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
var core_2 = require('angular2/core');
var common_1 = require('angular2/common');
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
        if (typeof this.selectedDate == undefined || this.selectedDate == null)
            return false;
        if (typeof this.startDate != undefined && this.startDate != null
            && typeof this.endDate != undefined && this.endDate != null) {
            var compareDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), parseInt(date));
            return compareDate >= this.startDate && compareDate <= this.endDate;
        }
        return this.selectedDate.getFullYear() == this.currentMonth.getFullYear()
            && this.selectedDate.getMonth() == this.currentMonth.getMonth()
            && this.selectedDate.getDate().toString() == date;
    };
    DatePickerCalendar.prototype.checkStartDate = function (date) {
        if (typeof this.startDate == undefined || this.startDate == null)
            return false;
        if (this.startDate == this.endDate)
            return false;
        return this.startDate.getFullYear() == this.currentMonth.getFullYear()
            && this.startDate.getMonth() == this.currentMonth.getMonth()
            && this.startDate.getDate().toString() == date;
    };
    DatePickerCalendar.prototype.checkEndDate = function (date) {
        if (typeof this.endDate == undefined || this.endDate == null)
            return false;
        if (this.startDate == this.endDate)
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
        if (this.weeks.length > 5)
            return;
        var firstWeekCount = this.weeks[0]
            .filter(function (i) { return i.length > 0; }).length;
        var lastWeekCount = this.weeks[this.weeks.length - 1]
            .filter(function (i) { return i.length > 0; }).length;
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
            selector: 'date-picker-calendar',
            styles: ["\n   .table {\n     font-size: .75rem;\n     border: none;\n     border-top: 1px solid #eceeef;\n     background-color: #fff;\n     border-collapse: collapse; }\n     .table .calendar-date {\n       z-index: 200;\n       background-color: transparent; }\n\n   tr {\n     border: none; }\n\n   th, td {\n     text-align: center;\n     vertical-align: middle;\n     font-size: .75rem;\n     padding: .1rem;\n     height: 1.75rem;\n     border: none;\n     position: relative; }\n     @media (max-width: 480px), screen and (max-device-width: 480px) {\n       th, td {\n         padding: .5rem;\n         font-size: 1rem; } }\n\n   td.selectable {\n     cursor: pointer !important;\n     /*border: 1px solid $table-border-color;*/ }\n\n   td.selectable:hover {\n     background-color: #0275d8;\n     color: #fff; }\n\n   td.selected {\n     background-color: #99c4e9;\n     color: #fff; }\n\n   td.disabled {\n     /*background-color: lighten($input-bg-disabled, 5%);*/\n     color: #c9c9c9; }\n\n   td.startDate, td.endDate {\n     background-color: #0275d8;\n     color: #fff; }\n\n   td.startDate:after {\n     content: '';\n     position: absolute;\n     top: 0;\n     bottom: 0;\n     width: 0;\n     right: 0;\n     background-color: transparent;\n     border-left: 1em solid transparent;\n     border-top: 1.1em solid #99c4e9;\n     border-bottom: 1.1em solid #99c4e9; }\n\n   td.endDate:before {\n     content: '';\n     position: absolute;\n     top: 0;\n     bottom: 0;\n     width: 0;\n     left: 0;\n     background-color: transparent;\n     border-right: 1em solid transparent;\n     border-top: 1.1em solid #99c4e9;\n     border-bottom: 1.1em solid #99c4e9; }\n    "],
            template: "\n   <div class=\"text-center py\">\n    <table class=\"table m-a-0\">\t\n        <tbody>\n               <tr *ngIf=\"showMonth\">\n                   <td colspan=\"7\">\n                       <strong>{{currentMonth | date:'MMMM yyyy'}}</strong>\n                   </td>\n               </tr> \n            <tr *ngFor=\"let week of weeks\">\n                <td *ngFor=\"let day of week\"\n                    [class.selectable]=\"checkSelectable(day)\" \n                    [class.disabled]=\"!checkSelectable(day)\"\n                    [class.selected]=\"checkSelectedDate(day)\" \n                       [class.startDate]=\"checkStartDate(day)\"\n                       [class.endDate]=\"checkEndDate(day)\"\n                    (click)=\"selectDate(day)\">\n                    <span class=\"calendar-date\">{{day}}</span>\n                </td> \n            </tr>\n        </tbody>\n    </table>\n   </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DatePickerCalendar);
    return DatePickerCalendar;
}());
exports.DatePickerCalendar = DatePickerCalendar;

//# sourceMappingURL=DatePickerCalendar.js.map
