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
//import {AnimationListener} from '../../directives/AnimationListener/AnimationListener';
var DatePickerCalendar = (function () {
    function DatePickerCalendar() {
        this.selectedDateChange = new angular2_2.EventEmitter();
    }
    DatePickerCalendar.prototype.onInit = function () {
        this.buildWeeks(this.currentMonth || new Date());
    };
    DatePickerCalendar.prototype.checkSelectable = function (date) {
        var dateNumber = parseInt(date);
        if (isNaN(dateNumber))
            return false;
        var compareDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), dateNumber);
        return compareDate >= this.minDate && compareDate <= this.maxDate;
    };
    DatePickerCalendar.prototype.checkSelectedDate = function (date) {
        if (typeof this.selectedDate == undefined || this.selectedDate == null)
            return false;
        return this.selectedDate.getFullYear() == this.currentMonth.getFullYear()
            && this.selectedDate.getMonth() == this.currentMonth.getMonth()
            && this.selectedDate.getDate().toString() == date;
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
        var emptyWeek = ['', '', '', '', '', '', ''];
        var firstWeekCount = this.weeks[0]
            .filter(function (i) { return i.length > 0; }).length;
        var lastWeekCount = this.weeks[this.weeks.length - 1]
            .filter(function (i) { return i.length > 0; }).length;
        if (firstWeekCount > lastWeekCount)
            this.weeks.unshift(emptyWeek);
        else
            this.weeks.push(emptyWeek);
        if (this.weeks.length < 6)
            this.weeks.unshift(emptyWeek);
    };
    __decorate([
        angular2_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "currentMonth");
    __decorate([
        angular2_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "selectedDate");
    __decorate([
        angular2_2.Output(), 
        __metadata('design:type', Object)
    ], DatePickerCalendar.prototype, "selectedDateChange");
    __decorate([
        angular2_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "minDate");
    __decorate([
        angular2_2.Input(), 
        __metadata('design:type', Date)
    ], DatePickerCalendar.prototype, "maxDate");
    DatePickerCalendar = __decorate([
        angular2_1.Component({
            selector: 'date-picker-calendar'
        }),
        angular2_1.View({
            styles: ["\n   .slide-in-right {\n     -webkit-animation: slideInRight 0.5s ease;\n     -moz-animation: slideInRight 0.5s ease;\n     animation: slideInRight 0.5s ease; }\n\n   .slide-in-left {\n     -webkit-animation: slideInLeft 0.5s ease;\n     -moz-animation: slideInLeft 0.5s ease;\n     animation: slideInLeft 0.5s ease; }\n\n   .slide-in-right {\n     -webkit-animation: slideInRight 0.5s ease;\n     -moz-animation: slideInRight 0.5s ease;\n     animation: slideInRight 0.5s ease; }\n\n   .slide-in-right {\n     -webkit-animation: slideInRight 0.5s ease;\n     -moz-animation: slideInRight 0.5s ease;\n     animation: slideInRight 0.5s ease; }\n\n   .table {\n     font-size: .75rem;\n     border: 1px solid #eceeef; }\n\n   tr {\n     border: none; }\n\n   th, td {\n     text-align: center;\n     vertical-align: center;\n     padding: .1rem;\n     height: 1.75rem;\n     border: none; }\n\n   td.selectable {\n     cursor: pointer !important;\n     border: 1px solid #eceeef; }\n\n   td.selectable:hover {\n     background-color: #0275d8;\n     color: #fff; }\n\n   td.selected {\n     background-color: #71b1e9;\n     color: #fff; }\n\n   td.disabled {\n     background-color: #fafafb;\n     color: #818a91; }\n\t"],
            template: "\n   <div class=\"text-center py\"> \n   \t<strong>{{currentMonth | date:'MMMM yyyy'}}</strong>\n   \t<table class=\"table\">\n   \t\t<thead>\t\n   \t\t\t<tr>\n   \t\t\t\t<th>S</th>\n   \t\t\t\t<th>M</th>\n   \t\t\t\t<th>T</th>\n   \t\t\t\t<th>W</th>\n   \t\t\t\t<th>T</th>\n   \t\t\t\t<th>F</th>\n   \t\t\t\t<th>S</th>\n   \t\t\t</tr>\n   \t\t</thead>\n   \t\t<tbody>\n   \t\t\t<tr *ng-for=\"#week of weeks\">\n   \t\t\t\t<td *ng-for=\"#day of week\"\n   \t\t\t\t\t[class.selectable]=\"checkSelectable(day)\" \n   \t\t\t\t\t[class.disabled]=\"!checkSelectable(day)\"\n   \t\t\t\t\t[class.selected]=\"checkSelectedDate(day)\" \n   \t\t\t\t\t(click)=\"selectDate(day)\">\n   \t\t\t\t\t{{day}}\n   \t\t\t\t</td> \n   \t\t\t</tr>\n   \t\t</tbody>\n   \t</table>\n   </div>\n\t",
            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DatePickerCalendar);
    return DatePickerCalendar;
})();
exports.DatePickerCalendar = DatePickerCalendar;

//# sourceMappingURL=DatePickerCalendar.js.map
