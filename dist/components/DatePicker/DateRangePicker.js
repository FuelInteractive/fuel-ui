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
var core_3 = require("@angular/core");
var common_1 = require('@angular/common');
var utilities_1 = require("../../utilities/utilities");
var DetectionUtils_1 = require("../../utilities/DetectionUtils");
var DatePicker_1 = require("./DatePicker");
var DatePickerCalendar_1 = require("./DatePickerCalendar");
var DatePickerField_1 = require("./DatePickerField");
var InfiniteScroller_1 = require("../InfiniteScroller/InfiniteScroller");
var StartDateField = (function (_super) {
    __extends(StartDateField, _super);
    function StartDateField(element) {
        _super.call(this);
        this.element = element;
    }
    StartDateField = __decorate([
        core_1.Directive({
            selector: "[startDateField], .start-date-field",
        }), 
        __metadata('design:paramtypes', [core_2.ElementRef])
    ], StartDateField);
    return StartDateField;
}(DatePickerField_1.DatePickerField));
exports.StartDateField = StartDateField;
var EndDateField = (function (_super) {
    __extends(EndDateField, _super);
    function EndDateField(element) {
        _super.call(this);
        this.element = element;
    }
    EndDateField = __decorate([
        core_1.Directive({
            selector: "[endDateField], .start-date-field",
        }), 
        __metadata('design:paramtypes', [core_2.ElementRef])
    ], EndDateField);
    return EndDateField;
}(DatePickerField_1.DatePickerField));
exports.EndDateField = EndDateField;
var DateRangePicker = (function (_super) {
    __extends(DateRangePicker, _super);
    function DateRangePicker(changeDetector, renderer) {
        _super.call(this, changeDetector, renderer);
        this.valueChange = new core_2.EventEmitter();
        this._dateTarget = false;
        this.calendarHeight = DetectionUtils_1.MobileDetection.isAny() || window.innerWidth <= 480 || window.outerWidth <= 480 ? "auto" : "300px";
        this.startDateChange = new core_2.EventEmitter();
        this.endDateChange = new core_2.EventEmitter();
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
            this._minDate = utilities_1.DateUtils.handleDateInput(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DateRangePicker.prototype, "maxDate", {
        get: function () { return this._maxDate; },
        set: function (value) {
            this._maxDate = utilities_1.DateUtils.handleDateInput(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "selectedDate", {
        get: function () { return this._selectedDate; },
        set: function (value) {
            this.selectDate(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DateRangePicker.prototype, "inputStartDate", {
        get: function () {
            return this.startDateField != null ? this.startDateField.value : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "inputEndDate", {
        get: function () {
            return this.endDateField != null ? this.endDateField.value : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "startDate", {
        get: function () { return this._startDate; },
        set: function (value) {
            this._startDate = utilities_1.DateUtils.handleDateInput(value);
            if (this.startDateField != null)
                this.startDateField.value = this._startDate.toLocaleDateString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "endDate", {
        get: function () { return this._endDate; },
        set: function (value) {
            this._endDate = utilities_1.DateUtils.handleDateInput(value);
            if (this.endDateField != null)
                this.endDateField.value = this._endDate.toLocaleDateString();
        },
        enumerable: true,
        configurable: true
    });
    DateRangePicker.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (typeof this.startDateField === "undefined")
            throw "Fuel-UI Error: DateRangePicker missing startDate field";
        var startDateValue = utilities_1.DateUtils.handleDateInput(this.startDateField.value);
        if (this.startDateField.value.length > 0
            && utilities_1.DateUtils.isValidDate(startDateValue))
            this.selectDate(startDateValue, false);
        else {
            this.selectDate(this._startDate, false);
            this.startDateField._value = this._startDate.toLocaleDateString();
        }
        this.startDateField.select
            .subscribe(function (event) {
            _this.showCalendar(event);
            _this.focusStartDate();
        });
        this.startDateField.dateChange
            .subscribe(function (date) {
            if (_this.startDate !== date)
                _this.startDate = date;
        });
        if (typeof this.endDateField === "undefined")
            throw "Fuel-UI Error: DateRangePicker missing endDate field";
        var endDateValue = utilities_1.DateUtils.handleDateInput(this.endDateField.value);
        if (this.endDateField.value.length > 0
            && utilities_1.DateUtils.isValidDate(endDateValue))
            this.selectDate(endDateValue, true);
        else {
            this.selectDate(this._endDate, true);
            this.endDateField._value = this._endDate.toLocaleDateString();
        }
        this.endDateField.select
            .subscribe(function (event) {
            _this.showCalendar(event);
            _this.focusEndDate();
        });
        this.endDateField.dateChange
            .subscribe(function (date) {
            if (_this.endDate !== date)
                _this.endDate = date;
        });
        this.dateFieldIcons.map(function (i) {
            i.selectEvent.subscribe(function (event) {
                _this.showCalendar(event);
            });
        });
        this.generateMonths();
    };
    DateRangePicker.prototype.selectDate = function (value, target) {
        this._selectedDate = value;
        var dateTarget = (typeof target !== "undefined" && target != null) ? target : this._dateTarget;
        if (!dateTarget) {
            this.startDate = value;
            if (this.startDateChange != null)
                this.startDateChange.next(this._startDate);
            if (utilities_1.DateUtils.isValidDate(this.endDate) && this.startDate > this.endDate)
                this.endDate = new Date(this.startDate.getTime() + 24 * 60 * 60 * 1000);
        }
        else {
            this.endDate = value;
            this.hideCalendar();
            if (this.endDateChange != null)
                this.endDateChange.next(this._endDate);
            if (utilities_1.DateUtils.isValidDate(this.startDate) && this.endDate < this.startDate)
                this.startDate = new Date(this.endDate.getTime() - 24 * 60 * 60 * 1000);
        }
        this._dateTarget = !dateTarget;
        if (this.startDate != null && this.endDate != null) {
            var startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
            var endDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
            this.valueChange.next(new utilities_1.DateRange(startDate, endDate));
        }
        this.changeDetector.markForCheck();
    };
    DateRangePicker.prototype.handleRangeInput = function (value) {
        if (!(value instanceof utilities_1.DateRange))
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
        core_3.Output(), 
        __metadata('design:type', Object)
    ], DateRangePicker.prototype, "valueChange", void 0);
    __decorate([
        core_3.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DateRangePicker.prototype, "value", null);
    __decorate([
        core_3.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DateRangePicker.prototype, "minDate", null);
    __decorate([
        core_3.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DateRangePicker.prototype, "maxDate", null);
    __decorate([
        core_3.Input(), 
        __metadata('design:type', Function)
    ], DateRangePicker.prototype, "dateFilter", void 0);
    __decorate([
        core_2.ViewChild(InfiniteScroller_1.InfiniteScroller), 
        __metadata('design:type', InfiniteScroller_1.InfiniteScroller)
    ], DateRangePicker.prototype, "calendarScroller", void 0);
    __decorate([
        core_2.ContentChild(StartDateField), 
        __metadata('design:type', StartDateField)
    ], DateRangePicker.prototype, "startDateField", void 0);
    __decorate([
        core_2.ContentChild(EndDateField), 
        __metadata('design:type', EndDateField)
    ], DateRangePicker.prototype, "endDateField", void 0);
    __decorate([
        core_2.ContentChildren(DatePickerField_1.DatePickerFieldStyler), 
        __metadata('design:type', core_2.QueryList)
    ], DateRangePicker.prototype, "dateFieldIcons", void 0);
    __decorate([
        core_3.Output(), 
        __metadata('design:type', Object)
    ], DateRangePicker.prototype, "startDateChange", void 0);
    __decorate([
        core_3.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DateRangePicker.prototype, "startDate", null);
    __decorate([
        core_3.Output(), 
        __metadata('design:type', Object)
    ], DateRangePicker.prototype, "endDateChange", void 0);
    __decorate([
        core_3.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DateRangePicker.prototype, "endDate", null);
    DateRangePicker = __decorate([
        core_1.Component({
            selector: "date-range-picker",
            template: "\n      <div class=\"date-picker-overlay\" aria-hidden=\"true\"\n          *ngIf=\"calendarDisplayed\" \n          (click)=\"hideCalendar()\">\n      </div>\n\n      <div class=\"date-picker-content\">\n          <ng-content></ng-content>\n\n          <div class=\"date-picker-component\" *ngIf=\"calendarDisplayed\"\n              [style.left]=\"calendarX\" [style.top]=\"calendarY\">\n              <div class=\"container p-a-0\">\n                  <header>\n                      <button type=\"button\" class=\"btn btn-secondary pull-left\"\n                          (click)=\"scrollPrevMonth()\" [class.button-disable]=\"disablePrev()\">\n                          <i class=\"fa fa-chevron-left\"></i>\n                      </button>\n                      <div class=\"date-range pull-left input-group\">\n                          <input type=\"text\" class=\"form-control text-xs-center\" \n                              [class.target]=\"checkStartDateTarget()\"\n                              (click)=\"focusStartDate()\"\n                              id=\"startDate\" [(ngModel)]=\"inputStartDate\" readonly \n                              placeholder=\"{{startLabel}}\" />\n                          <span class=\"input-group-addon\"> - </span>\n                          <input type=\"text\" class=\"form-control text-xs-center\" \n                              [class.target]=\"checkEndDateTarget()\"\n                              (click)=\"focusEndDate()\"\n                              id=\"endDate\" [(ngModel)]=\"inputEndDate\" readonly \n                              placeholder=\"{{endLabel}}\" />\n                      </div>\n                      <button type=\"button\" class=\"btn btn-secondary pull-right\"\n                          (click)=\"scrollNextMonth()\" [class.button-disable]=\"disableNext()\">\n                          <i class=\"fa fa-chevron-right\"></i>\n                      </button>\n                      <table class=\"table m-b-0 days-of-week\">\n                          <tbody>\n                          <tr>\n                              <th>S</th>\n                              <th>M</th>\n                              <th>T</th>\n                              <th>W</th>\n                              <th>T</th>\n                              <th>F</th>\n                              <th>S</th>\n                          </tr>\n                          </tbody>\n                      </table>\n                  </header>\n                  <div class=\"calendar-container m-a-0\">\n                      <infinite-scroller\n                          (next)=\"addNextMonth()\"\n                          (prev)=\"addPrevMonth()\"\n                          distance=\"100\"\n                          height=\"{{calendarHeight}}\"\n                          hideScrollbar=\"true\">\n                          <date-picker-calendar scroll-item\n                              *ngFor=\"let month of calendarMonths; let i=index\" \n                              [id]=\"i\"\n                              [minDate]=\"minDate\" [maxDate]=\"maxDate\"\n                              [dateFilter]=\"dateFilter\"\n                              [currentMonth]=\"month\" \n                              [(selectedDate)]=\"selectedDate\"\n                              [(startDate)]=\"startDate\"\n                              [(endDate)]=\"endDate\"\n                              [dateTarget]=\"_dateTarget\" \n                              (selectedDate)=\"hideCalendar()\">\n                              {{i}}\n                          </date-picker-calendar>\n                      </infinite-scroller>\n                  </div>\n              </div>\n          </div>\n    \n      </div>\n    ",
            directives: [DatePickerCalendar_1.DatePickerCalendar, InfiniteScroller_1.INFINITE_SCROLLER_PROVIDERS, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, core_1.Renderer])
    ], DateRangePicker);
    return DateRangePicker;
}(DatePicker_1.DatePicker));
exports.DateRangePicker = DateRangePicker;

//# sourceMappingURL=DateRangePicker.js.map
