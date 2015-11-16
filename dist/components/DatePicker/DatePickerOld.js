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
var DatePickerCalendar_1 = require('./DatePickerCalendar');
var DatePickerOld = (function () {
    function DatePickerOld(modal) {
        this.valueChange = new angular2_1.EventEmitter();
        this._inputDate = "";
        this._minDate = new Date(1900, 0, 1);
        this._maxDate = new Date(2200, 0, 1);
        this.months = 1;
        this.calendars = [];
        this.currentDate = new Date();
        this.calendarDisplayed = false;
        this.modal = modal.nativeElement;
    }
    Object.defineProperty(DatePickerOld.prototype, "value", {
        set: function (value) {
            if (value instanceof Date && !isNaN(value.valueOf()))
                this.selectedDate = value;
            else
                this.selectedDate = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DatePickerOld.prototype, "selectedDate", {
        get: function () { return this._selectedDate; },
        set: function (value) {
            this._selectedDate = value;
            this._inputDate = value.toLocaleDateString();
            this.valueChange.next(this.selectedDate);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DatePickerOld.prototype, "inputDate", {
        get: function () { return this._inputDate; },
        set: function (value) {
            this._inputDate = value;
            this._selectedDate = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DatePickerOld.prototype, "minDate", {
        get: function () { return this._minDate; },
        set: function (value) {
            if (value instanceof Date && !isNaN(value.valueOf()))
                this._minDate = value;
            else
                this._minDate = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DatePickerOld.prototype, "maxDate", {
        get: function () { return this._maxDate; },
        set: function (value) {
            if (value instanceof Date && !isNaN(value.valueOf()))
                this._maxDate = value;
            else
                this._maxDate = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerOld.prototype, "monthList", {
        get: function () {
            var monthList = [];
            for (var i = 0; i < this.months; i++) {
                monthList.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + i));
            }
            return monthList;
        },
        enumerable: true,
        configurable: true
    });
    DatePickerOld.prototype.onInit = function () {
        if (this.currentDate < this._minDate)
            this.currentDate = this._minDate;
    };
    DatePickerOld.prototype.afterViewInit = function () {
        var _this = this;
        this.calendarQuery.changes.toRx()
            .subscribe(function () {
            _this.calendars = [];
            _this.calendarQuery.map(function (c) { return _this.calendars.push(c); });
        });
        this.modal.addEventListener('click', function (e) {
            if (e.srcElement.className.indexOf('modal') != -1)
                _this.hideCalendar();
        });
    };
    DatePickerOld.prototype.onChanges = function (changes) {
        this.hideCalendar();
    };
    DatePickerOld.prototype.showCalendar = function () {
        console.log("showCalendar");
        if (this.selectedDate instanceof Date && !isNaN(this.selectedDate.valueOf()))
            this.currentDate = this.selectedDate;
        this.calendarDisplayed = true;
    };
    DatePickerOld.prototype.hideCalendar = function () {
        this.calendarDisplayed = false;
    };
    DatePickerOld.prototype.canPrevMonth = function () {
        var prevDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
        var compareDate = new Date(this._minDate.getFullYear(), this._minDate.getMonth());
        return prevDate >= compareDate;
    };
    DatePickerOld.prototype.prevMonth = function () {
        if (!this.canPrevMonth())
            return;
        var prevDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
        this.currentDate = prevDate;
    };
    DatePickerOld.prototype.canNextMonth = function () {
        var nextDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
        var compareDate = new Date(this._maxDate.getFullYear(), this._maxDate.getMonth() - 1);
        return nextDate <= compareDate;
    };
    DatePickerOld.prototype.nextMonth = function () {
        if (!this.canNextMonth())
            return;
        var nextDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
        this.currentDate = nextDate;
    };
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', Object)
    ], DatePickerOld.prototype, "valueChange");
    Object.defineProperty(DatePickerOld.prototype, "value",
        __decorate([
            angular2_1.Input(), 
            __metadata('design:type', Object), 
            __metadata('design:paramtypes', [Object])
        ], DatePickerOld.prototype, "value", Object.getOwnPropertyDescriptor(DatePickerOld.prototype, "value")));
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], DatePickerOld.prototype, "months");
    __decorate([
        angular2_2.ViewChildren(DatePickerCalendar_1.DatePickerCalendar), 
        __metadata('design:type', angular2_2.QueryList)
    ], DatePickerOld.prototype, "calendarQuery");
    DatePickerOld = __decorate([
        angular2_1.Component({
            selector: 'date-picker-old',
            properties: ['minDate: minDate', 'maxDate: maxDate']
        }),
        angular2_1.View({
            styles: ["\n   .modal {\n     display: block; }\n\n   .modal-zoom-in {\n     -webkit-animation: zoomInDown 0.5s ease;\n     -moz-animation: zoomInDown 0.5s ease;\n     animation: zoomInDown 0.5s ease; }\n\n   .modal-zoom-out {\n     -webkit-animation: zoomOutUp 0.5s ease;\n     -moz-animation: zoomOutUp 0.5s ease;\n     animation: zoomOutUp 0.5s ease; }\n\n   .modal-dialog {\n     display: inline-block; }\n\n   date-picker-calendar {\n     padding: 0; }\n\n   .input-group-addon {\n     background-color: #fff;\n     border-left: none; }\n\n   header {\n     position: relative;\n     top: 0;\n     left: 0; }\n\n   .prev-month, .next-month {\n     position: absolute;\n     top: 0;\n     margin-top: .5em;\n     display: inline-block; }\n\n   .prev-month {\n     left: 0;\n     margin-left: 1.5%; }\n\n   .next-month {\n     right: 0;\n     margin-right: 1.5%; }\n\t"],
            template: "\n\n   <div class=\"input-group\" (click)=\"showCalendar()\">\n   \t<input type=\"text\" class=\"form-control\"\n   \t\t[(ng-model)]=\"inputDate\" \n   \t\t #date-field\n   \t\t />\n   \t<span class=\"input-group-addon\" [class.input-group-addon-focus]=\"dateField.focus\">\n   \t\t<i class=\"fa fa-calendar\"></i>\n   \t</span>\n   </div>\n\n   <div class=\"modal\" *ng-if=\"calendarDisplayed\"\n   \t[class.modal-zoom-in]=\"calendarDisplayed\"\n   \t[class.modal-zoom-out]=\"!calendarDisplayed\">\n   \t<div class=\"modal-dialog\">\n   <section class=\"modal-content container m-a\">\n   \t<header class=\"row\">\n   \t\t<time *ng-for=\"#month of monthList\" \n   \t\t\tclass=\"col-xs-{{12/months}} text-center p-y\">\n   \t\t\t<h5>{{month | date:'MMMM yyyy'}}</h5>\n   \t\t</time>\n   \t\t<div class=\"prev-month\">\n   \t\t\t<button class=\"btn btn-primary\" role=\"prev\"\n   \t\t\t\t[class.disabled]=\"!canPrevMonth()\"\t\t\t \n   \t\t\t\t(click)=\"prevMonth()\">\n   \t\t\t\t<i class=\"fa fa-chevron-circle-left\"></i>\n   \t\t\t</button>\n   \t\t</div>\n   \t\t<div class=\"next-month\">\n   \t\t\t<button class=\"btn btn-primary\" role=\"next\"\n   \t\t\t\t[class.disabled]=\"!canNextMonth()\"\n   \t\t\t\t(click)=\"nextMonth()\">\n   \t\t\t\t<i class=\"fa fa-chevron-circle-right\"></i>\n   \t\t\t</button>\n   \t\t</div>\n   \t</header>\n   \t<section class=\"row\">\n   \t\t<date-picker-calendar *ng-for=\"#month of monthList\"\n   \t\t\tclass=\"col-md-{{12/months}}\" \n   \t\t\t[min-date]=\"minDate\" [max-date]=\"maxDate\"\n   \t\t\t[current-month]=\"month\" \n   \t\t\t[(selected-date)]=\"selectedDate\" />\n   \t</section>\n   \t<footer>\n   \t</footer>\n   </section>\n   \t</div>\n   </div>\n\t",
            directives: [DatePickerCalendar_1.DatePickerCalendar, angular2_1.FORM_DIRECTIVES, angular2_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], DatePickerOld);
    return DatePickerOld;
})();
exports.DatePickerOld = DatePickerOld;

//# sourceMappingURL=DatePickerOld.js.map
