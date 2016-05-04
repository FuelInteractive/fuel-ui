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
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var common_1 = require('@angular/common');
var DateUtils_1 = require("../../utilities/DateUtils");
var DetectionUtils_1 = require("../../utilities/DetectionUtils");
var DatePicker_1 = require("./DatePicker");
var DatePickerCalendar_1 = require("./DatePickerCalendar");
var InfiniteScroller_1 = require("../InfiniteScroller/InfiniteScroller");
var DateRangePicker = (function (_super) {
    __extends(DateRangePicker, _super);
    function DateRangePicker(changeDetector) {
        _super.call(this, changeDetector);
        this.valueChange = new core_2.EventEmitter();
        this._dateTarget = false;
        this.calendarHeight = DetectionUtils_1.MobileDetection.isAny() || window.innerWidth <= 480 || window.outerWidth <= 480 ? "auto" : "300px";
        this.startDateChange = new core_2.EventEmitter();
        this.endDateChange = new core_2.EventEmitter();
        this._inputStartDate = "";
        this._inputEndDate = "";
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
            this.changeDetector.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DateRangePicker.prototype, "startDate", {
        get: function () { return this._startDate; },
        set: function (value) {
            this._startDate = this.handleDateInput(value);
            this.inputStartDate = this._startDate.toLocaleDateString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "endDate", {
        get: function () { return this._endDate; },
        set: function (value) {
            this._endDate = this.handleDateInput(value);
            this.inputEndDate = this._endDate.toLocaleDateString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "inputStartDate", {
        get: function () { return this._inputStartDate; },
        set: function (value) {
            this._inputStartDate = value;
            this._selectedDate = new Date(value);
            this.changeDetector.markForCheck();
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
            this.changeDetector.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    ;
    DateRangePicker.prototype.handleRangeInput = function (value) {
        if (!(value instanceof DateUtils_1.DateRange))
            throw "DateRangePicker error: input is not of type DateRange";
        var range = value;
        this.startDate = range.start;
        this.endDate = range.end;
        return range;
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
            selector: "date-range-picker",
            template: "\n      <div class=\"date-picker-overlay\" aria-hidden=\"true\"\n          *ngIf=\"calendarDisplayed\" \n          (click)=\"hideCalendar()\">\n      </div>\n\n      <div class=\"form-group\">\n          <label for=\"startDate\">{{startLabel}}</label>\n          <div class=\"input-group fuel-ui-datepicker-input-group\" \n              (click)=\"toggleCalendar($event)\"\n              (click)=\"focusStartDate()\">\n              <input type=\"text\" class=\"form-control\" name=\"startDate\"\n                  [(ngModel)]=\"inputStartDate\" #dateField1 \n                  placeholder=\"{{startLabel}}\" readonly />\n              <span class=\"input-group-addon\" [class.input-group-addon-focus]=\"dateField1.focus\">\n                  <i class=\"fa fa-calendar\"></i>\n              </span>\n          </div>\n      </div>\n\n      <div class=\"form-group\">\n          <label for=\"endDate\">{{endLabel}}</label>\n          <div class=\"input-group fuel-ui-datepicker-input-group\" \n              (click)=\"toggleCalendar($event)\"\n              (click)=\"focusEndDate()\">\n              <input type=\"text\" class=\"form-control\" name=\"endDate\"\n                  [(ngModel)]=\"inputEndDate\" #dateField2 \n                  placeholder=\"{{endLabel}}\" readonly />\n              <span class=\"input-group-addon\" [class.input-group-addon-focus]=\"dateField2.focus\">\n                  <i class=\"fa fa-calendar\"></i>\n              </span>\n          </div>\n      </div>\n\n      <div class=\"date-picker-component\" *ngIf=\"calendarDisplayed\">\n          <div class=\"container p-a-0\">\n              <header>\n                  <button type=\"button\" class=\"btn btn-secondary pull-left\"\n                      (click)=\"scrollPrevMonth()\" [class.button-disable]=\"disablePrev()\">\n                      <i class=\"fa fa-chevron-left\"></i>\n                  </button>\n                  <div class=\"date-range pull-left input-group\">\n                      <input type=\"text\" class=\"form-control text-xs-center\" \n                          [class.target]=\"checkStartDateTarget()\"\n                          (click)=\"focusStartDate()\"\n                          id=\"startDate\" [(ngModel)]=\"inputStartDate\" readonly \n                          placeholder=\"{{startLabel}}\" />\n                      <span class=\"input-group-addon\"> - </span>\n                      <input type=\"text\" class=\"form-control text-xs-center\" \n                          [class.target]=\"checkEndDateTarget()\"\n                          (click)=\"focusEndDate()\"\n                          id=\"endDate\" [(ngModel)]=\"inputEndDate\" readonly \n                          placeholder=\"{{endLabel}}\" />\n                  </div>\n                  <button type=\"button\" class=\"btn btn-secondary pull-right\"\n                      (click)=\"scrollNextMonth()\" [class.button-disable]=\"disableNext()\">\n                      <i class=\"fa fa-chevron-right\"></i>\n                  </button>\n                  <table class=\"table m-b-0 days-of-week\">\n                      <tbody>\n                      <tr>\n                          <th>S</th>\n                          <th>M</th>\n                          <th>T</th>\n                          <th>W</th>\n                          <th>T</th>\n                          <th>F</th>\n                          <th>S</th>\n                      </tr>\n                      </tbody>\n                  </table>\n              </header>\n              <div class=\"calendar-container m-a-0\">\n                  <infinite-scroller\n                      (next)=\"addNextMonth()\"\n                      (prev)=\"addPrevMonth()\"\n                      distance=\"100\"\n                      height=\"{{calendarHeight}}\"\n                      hideScrollbar=\"true\">\n                      <date-picker-calendar scroll-item\n                          *ngFor=\"let month of calendarMonths; let i=index\" \n                          [id]=\"i\"\n                          [minDate]=\"minDate\" [maxDate]=\"maxDate\"\n                          [dateFilter]=\"dateFilter\"\n                          [currentMonth]=\"month\" \n                          [(selectedDate)]=\"selectedDate\"\n                          [(startDate)]=\"startDate\"\n                          [(endDate)]=\"endDate\"\n                          [dateTarget]=\"_dateTarget\" \n                          (selectedDate)=\"hideCalendar()\">\n                          {{i}}\n                      </date-picker-calendar>\n                  </infinite-scroller>\n              </div>\n          </div>\n      </div>\n    ",
            directives: [DatePickerCalendar_1.DatePickerCalendar, InfiniteScroller_1.INFINITE_SCROLLER_PROVIDERS, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], DateRangePicker);
    return DateRangePicker;
}(DatePicker_1.DatePicker));
exports.DateRangePicker = DateRangePicker;

//# sourceMappingURL=DateRangePicker.js.map
