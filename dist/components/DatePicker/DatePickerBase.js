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
var Animation_1 = require('../../Directives/Animation/Animation');
var DatePickerBase = (function () {
    function DatePickerBase(modal) {
        this._minDate = new Date(1900, 0, 1);
        this._maxDate = new Date(2200, 0, 1);
        this.months = 1;
        this.calendarMonths = [];
        this.calendarDisplayed = true;
        this.calendarX = 1;
        this.calendarY = 1;
        this.direction = "";
        this.isAnimating = false;
        this.modal = modal.nativeElement;
    }
    Object.defineProperty(DatePickerBase.prototype, "minDate", {
        get: function () { return this._minDate; },
        set: function (value) {
            this._minDate = this.handleDateInput(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DatePickerBase.prototype, "maxDate", {
        get: function () { return this._maxDate; },
        set: function (value) {
            this._maxDate = this.handleDateInput(value);
        },
        enumerable: true,
        configurable: true
    });
    DatePickerBase.prototype.onInit = function () {
        this.calendarMonths = [];
        for (var i = 0; i < this.months; i++)
            this.calendarMonths
                .push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + i));
        this.currentDate = this.currentDate;
    };
    DatePickerBase.prototype.afterViewInit = function () {
        var _this = this;
        this.modal.addEventListener('click', function (e) {
            if (e.srcElement.className.indexOf('modal') != -1)
                _this.hideCalendar();
        });
        this.calendarQuery.changes.toRx()
            .subscribe(function (calendars) { return _this.updateCalendars(calendars); });
    };
    DatePickerBase.prototype.handleDateInput = function (value) {
        if (value instanceof Date && !isNaN(value.valueOf()))
            return value;
        else
            return new Date(value);
    };
    DatePickerBase.prototype.showCalendar = function (event) {
        if (event != null) {
            var clickedRect = event.srcElement.parentElement.getBoundingClientRect();
            this.calendarX = clickedRect.left;
            if (screen.height - clickedRect.bottom <= 400) {
                this.calendarY = (clickedRect.top - 290 + clickedRect.height);
            }
            else {
                this.calendarY = (clickedRect.top + clickedRect.height);
            }
        }
        this.onInit();
        this.calendarDisplayed = true;
        this.direction = '';
    };
    DatePickerBase.prototype.hideCalendar = function () {
        this.calendarDisplayed = false;
        this.direction = '';
    };
    DatePickerBase.prototype.canPrevMonth = function () {
        var prevDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
        var compareDate = new Date(this._minDate.getFullYear(), this._minDate.getMonth());
        return prevDate >= compareDate;
    };
    DatePickerBase.prototype.prevMonth = function () {
        if (!this.canPrevMonth() || this.isAnimating)
            return;
        var firstMonth = this.calendarMonths[0];
        this.calendarMonths.unshift(new Date(firstMonth.getFullYear(), firstMonth.getMonth() - 1));
        this.direction = 'right';
    };
    DatePickerBase.prototype.canNextMonth = function () {
        var nextDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
        var compareDate = new Date(this._maxDate.getFullYear(), this._maxDate.getMonth() - 1);
        return nextDate <= compareDate;
    };
    DatePickerBase.prototype.nextMonth = function () {
        if (!this.canNextMonth() || this.isAnimating)
            return;
        var lastMonth = this.calendarMonths[this.calendarMonths.length - 1];
        this.calendarMonths.push(new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1));
        this.direction = 'left';
    };
    DatePickerBase.prototype.updateCalendars = function (calendars) {
        var _this = this;
        if (this.direction.length == 0 || this.isAnimating)
            return;
        this.isAnimating = true;
        var direction = this.direction;
        var cleanAction;
        if (direction == 'right') {
            calendars.first
                .addAnimation(direction + '.enter')
                .startAnimation(function () {
                _this.direction = '';
                _this.isAnimating = false;
                _this.calendarMonths.pop();
            });
            calendars.last
                .addAnimation(direction + '.leave')
                .startAnimation();
        }
        else {
            calendars.first
                .addAnimation(direction + '.leave')
                .startAnimation();
            calendars.last
                .addAnimation(direction + '.enter')
                .startAnimation(function () {
                _this.direction = '';
                _this.isAnimating = false;
                _this.calendarMonths.shift();
            });
        }
        calendars
            .filter(function (c) {
            return c !== calendars.first && c !== calendars.last;
        })
            .map(function (c) {
            c.addAnimation(direction + '.enter')
                .startAnimation();
        });
    };
    DatePickerBase = __decorate([
        angular2_1.Component({
            selector: 'date-picker'
        }),
        angular2_1.View({
            styles: ["\n   .input-group-addon {\n     background-color: #fff;\n     border-left: none; }\n\n   .modal {\n     display: block;\n     -webkit-transition: all 0.1s ease;\n     -moz-transition: all 0.1s ease;\n     transition: all 0.1s ease; }\n\n   .modal.ng-enter {\n     opacity: 0;\n     -webkit-transform: rotateX(-90deg);\n     -moz-transform: rotateX(-90deg);\n     -ms-transform: rotateX(-90deg);\n     -o-transform: rotateX(-90deg);\n     transform: rotateX(-90deg); }\n\n   .modal.ng-enter-active {\n     opacity: 1;\n     -webkit-transform: rotateX(0deg);\n     -moz-transform: rotateX(0deg);\n     -ms-transform: rotateX(0deg);\n     -o-transform: rotateX(0deg);\n     transform: rotateX(0deg); }\n\n   .modal.ng-leave {\n     opacity: 1;\n     -webkit-transform: rotateX(0deg);\n     -moz-transform: rotateX(0deg);\n     -ms-transform: rotateX(0deg);\n     -o-transform: rotateX(0deg);\n     transform: rotateX(0deg); }\n\n   .modal.ng-leave-active {\n     opacity: 0;\n     -webkit-transform: rotateX(90deg);\n     -moz-transform: rotateX(90deg);\n     -ms-transform: rotateX(90deg);\n     -o-transform: rotateX(90deg);\n     transform: rotateX(90deg); }\n\n   .modal-dialog {\n     display: inline-block;\n     width: 400px;\n     height: 300px;\n     margin: 0;\n     position: relative; }\n\n   .calendar-container {\n     overflow: hidden;\n     border: 1px solid transparent;\n     white-space: nowrap; }\n\n   date-picker-calendar {\n     padding-top: .5rem !important; }\n\n   date-picker-calendar.left.enter {\n     -webkit-animation: slideInLeft 0.2s ease;\n     -moz-animation: slideInLeft 0.2s ease;\n     animation: slideInLeft 0.2s ease; }\n\n   date-picker-calendar.left.leave {\n     margin-right: -100%;\n     -webkit-animation: slideOutLeft 0.2s ease;\n     -moz-animation: slideOutLeft 0.2s ease;\n     animation: slideOutLeft 0.2s ease; }\n\n   date-picker-calendar.right.enter {\n     -webkit-animation: slideInRight 0.2s ease;\n     -moz-animation: slideInRight 0.2s ease;\n     animation: slideInRight 0.2s ease; }\n\n   date-picker-calendar.right.leave {\n     margin-left: -50%;\n     -webkit-animation: slideOutRight 0.2s ease;\n     -moz-animation: slideOutRight 0.2s ease;\n     animation: slideOutRight 0.2s ease; }\n\n   .input-group-addon {\n     background-color: #fff;\n     border-left: none; }\n\n   header {\n     position: relative;\n     top: 0;\n     left: 0; }\n\n   .prev-month, .next-month {\n     position: absolute;\n     top: 0;\n     display: inline-block;\n     z-index: 100;\n     margin-top: .2rem; }\n     .prev-month .btn-sm, .next-month .btn-sm {\n       padding: .1rem .7rem; }\n\n   .prev-month {\n     left: 0;\n     margin-left: 4%; }\n\n   .next-month {\n     right: 0;\n     margin-right: 4%; }\n\t"],
            template: "\n   <div class=\"input-group\" (click)=\"showCalendar($event)\">\n   \t<input type=\"text\" class=\"form-control\"\n   \t\t[(ng-model)]=\"inputDate\" \n   \t\t #date-field\n   \t\t />\n   \t<span class=\"input-group-addon\" [class.input-group-addon-focus]=\"dateField.focus\">\n   \t\t<i class=\"fa fa-calendar\"></i>\n   \t</span>\n   </div>\n\n   <section class=\"modal ng-animate\" *ng-if=\"calendarDisplayed\">\n   <div class=\"modal-dialog\" role=\"document\"\n   \t[style.top.px]=\"calendarY\"\n   \t[style.left.px]=\"calendarX\">\n   <div class=\"modal-content container p-a-0\">\n   \t<header class=\"row\">\n   \t\t<div class=\"prev-month\">\n   \t\t\t<button class=\"btn btn-primary btn-sm\" role=\"prev\"\n   \t\t\t\t[class.disabled]=\"!canPrevMonth()\"\t\t\t \n   \t\t\t\t(click)=\"prevMonth()\">\n   \t\t\t\t<i class=\"fa fa-chevron-circle-left\"></i>\n   \t\t\t</button>\n   \t\t</div>\n   \t\t<div class=\"next-month\">\n   \t\t\t<button class=\"btn btn-primary btn-sm\" role=\"next\"\n   \t\t\t\t[class.disabled]=\"!canNextMonth()\"\n   \t\t\t\t(click)=\"nextMonth()\">\n   \t\t\t\t<i class=\"fa fa-chevron-circle-right\"></i>\n   \t\t\t</button>\n   \t\t</div>\n   \t</header>\n   \t<section class=\"calendar-container\">\n   \t\t<date-picker-calendar animation\n   \t\t\t*ng-for=\"#month of calendarMonths #i=index\"\n   \t\t\tclass=\"col-md-{{12/months}} p-a-0\"\n   \t\t\t[style.margin-left]=\"(i!=months||direction!='right'?0:-100/months)+'%'\" \n   \t\t\t[id]=\"i\"\n   \t\t\t[min-date]=\"minDate\" [max-date]=\"maxDate\"\n   \t\t\t[current-month]=\"month\" \n   \t\t\t[(selected-date)]=\"selectedDate\" \n   \t\t\t(selected-date)=\"hideCalendar()\"\n   \t\t\t />\n   \t</section>\n   </div>\n   </div>\n   </section>\n\t",
            directives: [DatePickerCalendar_1.DatePickerCalendar, angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES, Animation_1.Animation]
        }), 
        __metadata('design:paramtypes', [angular2_2.ElementRef])
    ], DatePickerBase);
    return DatePickerBase;
})();
exports.DatePickerBase = DatePickerBase;

//# sourceMappingURL=DatePickerBase.js.map
