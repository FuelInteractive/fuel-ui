"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var core_2 = require("angular2/core");
var common_1 = require("angular2/common");
var DateUtils_1 = require("../../utilities/DateUtils");
var DetectionUtils_1 = require("../../utilities/DetectionUtils");
var DatePicker_1 = require("./DatePicker");
var DatePickerCalendar_1 = require("./DatePickerCalendar");
var InfiniteScroller_1 = require("../InfiniteScroller/InfiniteScroller");
var DateRangePicker = (function (_super) {
    __extends(DateRangePicker, _super);
    function DateRangePicker(modal) {
        _super.call(this, modal);
        this.valueChange = new core_2.EventEmitter();
        this._dateTarget = false;
        this.calendarHeight = DetectionUtils_1.MobileDetection.isAny() || window.innerWidth <= 480 || window.outerWidth <= 480 ? "auto" : "300px";
        this.startDateChange = new core_2.EventEmitter();
        this.endDateChange = new core_2.EventEmitter();
        this._inputStartDate = "";
        this._inputEndDate = "";
        this.modal = modal.nativeElement;
        /*this.selectedDate = new Date();
        if(this.selectedDate < this._minDate)
            this.selectedDate = this._minDate;*/
    }
    Object.defineProperty(DateRangePicker.prototype, "value", {
        set: function (value) {
            this._selectedDate = this.handleRangeInput(value).start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "minDate", {
        get: function () { return this._minDate; },
        set: function (value) {
            this._minDate = this.handleDateInput(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DateRangePicker.prototype, "maxDate", {
        get: function () { return this._maxDate; },
        set: function (value) {
            this._maxDate = this.handleDateInput(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "selectedDate", {
        get: function () { return this._selectedDate; },
        set: function (value) {
            this._selectedDate = value;
            if ((this._dateTarget && this.startDate != null && value < this.startDate)
                || !this._dateTarget && this.endDate != null && value > this.endDate)
                this._dateTarget = !this._dateTarget;
            if (!this._dateTarget) {
                this.inputStartDate = value.toLocaleDateString();
                this.startDate = value;
                if (this.startDateChange != null)
                    this.startDateChange.next(this._startDate);
            }
            else {
                this.inputEndDate = value.toLocaleDateString();
                this.endDate = value;
                this.hideCalendar();
                if (this.endDateChange != null)
                    this.endDateChange.next(this._endDate);
            }
            this._dateTarget = !this._dateTarget;
            if (this.startDate != null && this.endDate != null) {
                var startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
                var endDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
                this.valueChange.next(new DateUtils_1.DateRange(startDate, endDate));
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DateRangePicker.prototype, "startDate", {
        get: function () { return this._startDate; },
        set: function (value) {
            this._startDate = this.handleDateInput(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "endDate", {
        get: function () { return this._endDate; },
        set: function (value) {
            this._endDate = this.handleDateInput(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "inputStartDate", {
        get: function () { return this._inputStartDate; },
        set: function (value) {
            this._inputStartDate = value;
            this._selectedDate = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DateRangePicker.prototype, "inputEndDate", {
        get: function () { return this._inputEndDate; },
        set: function (value) {
            this._inputEndDate = value;
            this._selectedDate = new Date(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    DateRangePicker.prototype.handleRangeInput = function (value) {
        if (value instanceof DateUtils_1.DateRange)
            return value;
        else
            throw "DateRangePicker error: input is not of type DateRange";
    };
    DateRangePicker.prototype.focusStartDate = function () {
        this._dateTarget = false;
    };
    DateRangePicker.prototype.focusEndDate = function () {
        this._dateTarget = true;
    };
    DateRangePicker.prototype.checkStartDateTarget = function () {
        return !this._dateTarget;
    };
    DateRangePicker.prototype.checkEndDateTarget = function () {
        return this._dateTarget;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DateRangePicker.prototype, "valueChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DateRangePicker.prototype, "value", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DateRangePicker.prototype, "minDate", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DateRangePicker.prototype, "maxDate", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], DateRangePicker.prototype, "dateFilter", void 0);
    __decorate([
        core_2.ViewChild(InfiniteScroller_1.InfiniteScroller), 
        __metadata('design:type', InfiniteScroller_1.InfiniteScroller)
    ], DateRangePicker.prototype, "calendarScroller", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DateRangePicker.prototype, "startLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DateRangePicker.prototype, "endLabel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DateRangePicker.prototype, "startDateChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DateRangePicker.prototype, "startDate", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DateRangePicker.prototype, "endDateChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DateRangePicker.prototype, "endDate", null);
    DateRangePicker = __decorate([
        core_1.Component({
            selector: "date-range-picker"
        }),
        core_1.View({
            styles: ["\n   .date-picker-overlay {\n     background-color: transparent;\n     display: block;\n     position: fixed;\n     top: 0;\n     right: 0;\n     bottom: 0;\n     left: 0;\n     z-index: 100; }\n     @media (max-width: 480px), screen and (max-device-width: 480px) {\n       .date-picker-overlay {\n         background-color: #55595c;\n         opacity: .75; } }\n\n   .date-picker-component {\n     border: 1px solid #eceeef;\n     z-index: 120;\n     background-color: #fff;\n     font-size: .75rem;\n     position: absolute;\n     width: 350px;\n     height: auto;\n     top: 0;\n     left: 0;\n     overflow: hidden;\n     border-radius: 0.3rem;\n     -webkit-transition: all 0.1s ease;\n     -moz-transition: all 0.1s ease;\n     transition: all 0.1s ease; }\n     @media (max-width: 480px), screen and (max-device-width: 480px) {\n       .date-picker-component {\n         width: 90%;\n         height: 90%;\n         position: fixed;\n         top: 5%;\n         left: 5%;\n         font-size: 1.25rem; } }\n\n   table {\n     font-size: .75rem; }\n     @media (max-width: 480px), screen and (max-device-width: 480px) {\n       table {\n         font-size: 1.25rem; } }\n\n   .input-group {\n     z-index: 110; }\n\n   input:read-only {\n     background-color: #fff; }\n\n   .input-group-addon {\n     background-color: #fff; }\n\n   header {\n     position: relative;\n     top: 0;\n     left: 0;\n     vertical-align: middle;\n     background-color: #fff; }\n     header .days-of-week {\n       background-color: #0275d8;\n       color: #fff; }\n     header table {\n       border-top: none !important; }\n     header th, header td {\n       text-align: center; }\n       @media (max-width: 480px), screen and (max-device-width: 480px) {\n         header th, header td {\n           font-size: 2.5rem; } }\n     header button {\n       border: none;\n       border-radius: 0;\n       color: #0275d8;\n       background-color: #fff;\n       width: 15%; }\n       @media (max-width: 480px), screen and (max-device-width: 480px) {\n         header button {\n           font-size: 2.5rem;\n           margin-top: .5rem; } }\n     header button:active {\n       background-color: #eceeef; }\n     header .button-disable {\n       color: #eceeef;\n       cursor: default; }\n     header .date-range {\n       width: 70%; }\n     header .date-range span {\n       background-color: #eceeef;\n       border-left: none;\n       border-right: none; }\n       @media (max-width: 480px), screen and (max-device-width: 480px) {\n         header .date-range span {\n           font-size: 2.5rem; } }\n     header .input-group-addon {\n       border: none;\n       background-color: #fff !important; }\n       @media (max-width: 480px), screen and (max-device-width: 480px) {\n         header .input-group-addon {\n           font-size: 1.5rem; } }\n     header input {\n       border: none;\n       display: inline-block;\n       margin: 1px auto 0 auto;\n       cursor: pointer; }\n       @media (max-width: 480px), screen and (max-device-width: 480px) {\n         header input {\n           font-size: 2.5rem; } }\n     header input:read-only {\n       background-color: #fff; }\n     header input.target {\n       color: #0275d8; }\n       header input.target::-webkit-input-placeholder {\n         color: #0275d8; }\n       header input.target::-moz-placeholder {\n         color: #0275d8; }\n       header input.target:-moz-placeholder {\n         color: #0275d8; }\n       header input.target:-ms-input-placeholder {\n         color: #0275d8; }\n\n   .prev-month, .next-month {\n     position: absolute;\n     top: 0;\n     display: inline-block;\n     z-index: 100;\n     margin-top: .2rem; }\n     .prev-month .btn-sm, .next-month .btn-sm {\n       padding: .1rem .7rem; }\n\n   .prev-month {\n     left: 0;\n     margin-left: 4%; }\n\n   .next-month {\n     right: 0;\n     margin-right: 4%; }\n\n   .container {\n     height: 100%; }\n\n   @media (max-width: 480px), screen and (max-device-width: 480px) {\n     .calendar-container {\n       height: 91%; } }\n    "],
            template: "\n   <div class=\"date-picker-overlay\" aria-hidden=\"true\"\n       *ngIf=\"calendarDisplayed\" \n       (click)=\"hideCalendar()\">\n   </div>\n\n   <div class=\"form-group\">\n       <label for=\"startDate\">{{startLabel}}</label>\n       <div class=\"input-group\" \n           (click)=\"showCalendar($event)\"\n           (click)=\"focusStartDate()\">\n           <input type=\"text\" class=\"form-control\" name=\"startDate\"\n               [(ngModel)]=\"inputStartDate\" #dateField1 \n               placeholder=\"{{startLabel}}\" readonly />\n           <span class=\"input-group-addon\" [class.input-group-addon-focus]=\"dateField1.focus\">\n               <i class=\"fa fa-calendar\"></i>\n           </span>\n       </div>\n   </div>\n\n   <div class=\"form-group\">\n       <label for=\"endDate\">{{endLabel}}</label>\n       <div class=\"input-group\" \n           (click)=\"showCalendar($event)\"\n           (click)=\"focusEndDate()\">\n           <input type=\"text\" class=\"form-control\" name=\"endDate\"\n               [(ngModel)]=\"inputEndDate\" #dateField2 \n               placeholder=\"{{endLabel}}\" readonly />\n           <span class=\"input-group-addon\" [class.input-group-addon-focus]=\"dateField2.focus\">\n               <i class=\"fa fa-calendar\"></i>\n           </span>\n       </div>\n   </div>\n\n   <div class=\"date-picker-component\" *ngIf=\"calendarDisplayed\">\n       <div class=\"container p-a-0\">\n           <header>\n               <button type=\"button\" class=\"btn btn-secondary pull-left\"\n                   (click)=\"scrollPrevMonth()\" [class.button-disable]=\"disablePrev()\">\n                   <i class=\"fa fa-chevron-left\"></i>\n               </button>\n               <div class=\"date-range pull-left input-group\">\n                   <input type=\"text\" class=\"form-control text-xs-center\" \n                       [class.target]=\"checkStartDateTarget()\"\n                       (click)=\"focusStartDate()\"\n                       id=\"startDate\" [(ngModel)]=\"inputStartDate\" readonly \n                       placeholder=\"{{startLabel}}\" />\n                   <span class=\"input-group-addon\"> - </span>\n                   <input type=\"text\" class=\"form-control text-xs-center\" \n                       [class.target]=\"checkEndDateTarget()\"\n                       (click)=\"focusEndDate()\"\n                       id=\"endDate\" [(ngModel)]=\"inputEndDate\" readonly \n                       placeholder=\"{{endLabel}}\" />\n               </div>\n               <button type=\"button\" class=\"btn btn-secondary pull-right\"\n                   (click)=\"scrollNextMonth()\" [class.button-disable]=\"disableNext()\">\n                   <i class=\"fa fa-chevron-right\"></i>\n               </button>\n               <table class=\"table m-b-0 days-of-week\">\n                   <tbody>\n                   <tr>\n                       <th>S</th>\n                       <th>M</th>\n                       <th>T</th>\n                       <th>W</th>\n                       <th>T</th>\n                       <th>F</th>\n                       <th>S</th>\n                   </tr>\n                   </tbody>\n               </table>\n           </header>\n           <div class=\"calendar-container m-a-0\">\n               <infinite-scroller\n                   (next)=\"addNextMonth()\"\n                   (prev)=\"addPrevMonth()\"\n                   distance=\"100\"\n                   height=\"{{calendarHeight}}\"\n                   hideScrollbar=\"true\">\n                   <date-picker-calendar scroll-item\n                       *ngFor=\"#month of calendarMonths #i=index\" \n                       [id]=\"i\"\n                       [minDate]=\"minDate\" [maxDate]=\"maxDate\"\n                       [dateFilter]=\"dateFilter\"\n                       [currentMonth]=\"month\" \n                       [(selectedDate)]=\"selectedDate\"\n                       [(startDate)]=\"startDate\"\n                       [(endDate)]=\"endDate\"\n                       [dateTarget]=\"_dateTarget\" \n                       (selectedDate)=\"hideCalendar()\">\n                       {{i}}\n                   </date-picker-calendar>\n               </infinite-scroller>\n           </div>\n       </div>\n   </div>\n    ",
            directives: [DatePickerCalendar_1.DatePickerCalendar, InfiniteScroller_1.INFINITE_SCROLLER_PROVIDERS, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [core_2.ElementRef])
    ], DateRangePicker);
    return DateRangePicker;
}(DatePicker_1.DatePicker));
exports.DateRangePicker = DateRangePicker;

//# sourceMappingURL=DateRangePicker.js.map
