System.registerDynamic("fuel-ui/dist/components/Alert/Alert", ["angular2/core", "angular2/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var Alert = (function() {
    function Alert(el) {
      this.displayed = false;
      this.closeButton = true;
      this.type = 'success';
      this.displayedChange = new core_1.EventEmitter();
      this._el = el.nativeElement;
    }
    Alert.prototype.getElement = function() {
      return this._el;
    };
    Alert.prototype.close = function() {
      this.displayed = false;
      this.displayedChange.next(null);
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Alert.prototype, "displayed", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Alert.prototype, "closeButton", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Alert.prototype, "type", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], Alert.prototype, "displayedChange", void 0);
    Alert = __decorate([core_1.Component({
      selector: 'alert',
      styles: ["\n      .alertFadeIn {\n        -webkit-animation-name: fadeIn;\n        -moz-animation-name: fadeIn;\n        animation-name: fadeIn;\n        -webkit-animation-duration: 1s;\n        -moz-animation-duration: 1s;\n        animation-duration: 1s;\n        -webkit-animation-timing-function: ease;\n        -moz-animation-timing-function: ease;\n        animation-timing-function: ease; }\n    "],
      template: "\n      <div\n          *ngIf=\"displayed\"\n          role=\"alert\"\n          class=\"alert alertFadeIn\"\n          [ngClass]=\"{'alert-success': type === 'success', 'alert-info': type === 'info', 'alert-warning': type === 'warning', 'alert-danger': type === 'danger' }\" >\n          <button *ngIf=\"closeButton\" (click)=\"close()\" type=\"button\" class=\"close\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&#215;</span>\n              <span class=\"sr-only\">Close</span>\n          </button>\n          <ng-content></ng-content>\n      </div>\n    ",
      directives: [common_1.CORE_DIRECTIVES]
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Alert);
    return Alert;
  }());
  exports.Alert = Alert;
  exports.ALERT_PROVIDERS = [Alert];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/Carousel/Carousel", ["angular2/core", "angular2/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var core_2 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var CarouselItem = (function() {
    function CarouselItem() {
      this.resetStatus();
    }
    CarouselItem.prototype.resetStatus = function() {
      this.isActive = false;
      this.exiting = false;
      this.resetAnimation();
    };
    CarouselItem.prototype.resetAnimation = function() {
      this.left = this.right = this.next = this.prev = false;
    };
    CarouselItem.prototype.animationStart = function() {};
    CarouselItem.prototype.animationEnd = function() {
      if (this.exiting)
        this.resetStatus();
      else
        this.resetAnimation();
    };
    CarouselItem.prototype.moveLeft = function() {
      if (this.isActive) {
        this.exiting = true;
        this.left = true;
      } else {
        this.isActive = true;
        this.prev = true;
      }
    };
    CarouselItem.prototype.moveRight = function() {
      if (this.isActive) {
        this.exiting = true;
        this.right = true;
      } else {
        this.isActive = true;
        this.next = true;
      }
    };
    CarouselItem.prototype.checkIfAnimating = function() {
      return this.left || this.right || this.next || this.prev;
    };
    CarouselItem = __decorate([core_1.Directive({
      selector: '.carousel-item',
      host: {
        '[class.active]': 'isActive',
        '[class.slide-out-left]': 'left',
        '[class.slide-out-right]': 'right',
        '[class.slide-in-right]': 'next',
        '[class.slide-in-left]': 'prev',
        '(animationstart)': 'animationStart()',
        '(webkitAnimationStart)': 'animationStart()',
        '(oanimationstart)': 'animationStart()',
        '(MSAnimationStart)': 'animationStart()',
        '(animationend)': 'animationEnd()',
        '(webkitAnimationEnd)': 'animationEnd()',
        '(oanimationend)': 'animationEnd()',
        '(MSAnimationEnd)': 'animationEnd()'
      }
    }), __metadata('design:paramtypes', [])], CarouselItem);
    return CarouselItem;
  }());
  exports.CarouselItem = CarouselItem;
  var Carousel = (function() {
    function Carousel() {
      this.images = [];
    }
    Carousel.prototype.ngAfterContentInit = function() {
      var _this = this;
      this.imageQuery.changes.subscribe(function() {
        return _this.registerImages();
      });
      this.registerImages();
    };
    Carousel.prototype.registerImages = function() {
      var _this = this;
      this.images = [];
      this.imageQuery.map(function(i) {
        return _this.images.push(i);
      });
      var activeImage = this.getActiveImage();
      if (this.images.length > 0 && activeImage == null)
        setTimeout(function() {
          return _this.images[0].isActive = true;
        }, 1);
    };
    Carousel.prototype.setAllInactive = function() {
      this.images.map(function(i) {
        return i.resetStatus();
      });
    };
    Carousel.prototype.switchTo = function(image) {
      var activeImage = this.getActiveImage();
      if (this.images.indexOf(image) < this.images.indexOf(activeImage)) {
        image.moveLeft();
        activeImage.moveLeft();
      } else {
        image.moveRight();
        activeImage.moveRight();
      }
    };
    Carousel.prototype.nextImage = function() {
      if (this.checkIfAnimating())
        return;
      var activeImage = this.getActiveImage();
      var index = this.getActiveIndex() + 1;
      index = index >= this.images.length ? 0 : index;
      activeImage.moveLeft();
      this.images[index].moveLeft();
    };
    Carousel.prototype.prevImage = function() {
      if (this.checkIfAnimating())
        return;
      var activeImage = this.getActiveImage();
      var index = this.getActiveIndex() - 1;
      index = index < 0 ? this.images.length - 1 : index;
      activeImage.moveRight();
      this.images[index].moveRight();
    };
    Carousel.prototype.checkIfAnimating = function() {
      return this.images.reduce(function(prev, curr) {
        return curr.checkIfAnimating() || prev;
      }, false);
    };
    Carousel.prototype.getActiveIndex = function() {
      var activeImage = this.getActiveImage();
      if (activeImage == null)
        return -1;
      return this.images.indexOf(activeImage);
    };
    Carousel.prototype.getActiveImage = function() {
      return this.images.reduce(function(prev, curr) {
        return curr.isActive ? curr : prev;
      }, null);
    };
    __decorate([core_2.ContentChildren(CarouselItem), __metadata('design:type', core_2.QueryList)], Carousel.prototype, "imageQuery", void 0);
    Carousel = __decorate([core_1.Component({
      selector: 'carousel',
      styles: ["\n   .carousel-item {\n     width: 100%; }\n\n   .carousel-item.slide-in-left {\n     display: block;\n     position: absolute;\n     top: 0;\n     left: -100%;\n     -webkit-animation-name: slideInLeft;\n     -moz-animation-name: slideInLeft;\n     animation-name: slideInLeft;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   .carousel-item.slide-in-right {\n     display: block;\n     position: absolute;\n     top: 0;\n     left: 100%;\n     -webkit-animation-name: slideInRight;\n     -moz-animation-name: slideInRight;\n     animation-name: slideInRight;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   .carousel-item.slide-out-left {\n     -webkit-animation-name: slideOutLeft;\n     -moz-animation-name: slideOutLeft;\n     animation-name: slideOutLeft;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   .carousel-item.slide-out-right {\n     -webkit-animation-name: slideOutRight;\n     -moz-animation-name: slideOutRight;\n     animation-name: slideOutRight;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n    "],
      template: "\n   <div class=\"carousel slide\">\n     <ol class=\"carousel-indicators\">\n       <li *ngFor=\"#image of images\"\n         (click)=\"switchTo(image)\" [class.active]=\"image.isActive && !image.checkIfAnimating()\"></li> \n     </ol>\n     <div class=\"carousel-inner\" role=\"listbox\">\n         <ng-content></ng-content>\n     </div>\n     <a class=\"left carousel-control\" role=\"button\" (click)=\"prevImage()\">\n       <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n       <span class=\"sr-only\">Previous</span>\n     </a>\n     <a class=\"right carousel-control\" role=\"button\" (click)=\"nextImage()\">\n       <span class=\"icon-next\" aria-hidden=\"true\"></span>\n       <span class=\"sr-only\">Next</span>\n     </a>\n   </div>\n    ",
      directives: [common_1.CORE_DIRECTIVES, CarouselItem],
      encapsulation: core_1.ViewEncapsulation.None
    }), __metadata('design:paramtypes', [])], Carousel);
    return Carousel;
  }());
  exports.Carousel = Carousel;
  exports.CAROUSEL_PROVIDERS = [Carousel, CarouselItem];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/DatePicker/DatePicker", ["angular2/core", "angular2/common", "./DatePickerCalendar", "../InfiniteScroller/InfiniteScroller", "../../utilities/DetectionUtils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var core_2 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var DatePickerCalendar_1 = $__require('./DatePickerCalendar');
  var InfiniteScroller_1 = $__require('../InfiniteScroller/InfiniteScroller');
  var DetectionUtils_1 = $__require('../../utilities/DetectionUtils');
  var DatePicker = (function() {
    function DatePicker(modal) {
      this._minDate = new Date(1900, 0, 1);
      this._maxDate = new Date(2200, 0, 1);
      this.valueChange = new core_2.EventEmitter();
      this._inputDate = "";
      this.calendarDisplayed = false;
      this.calendarX = 1;
      this.calendarY = 1;
      this.calendarHeight = DetectionUtils_1.MobileDetection.isAny() || window.innerWidth <= 480 || window.outerWidth <= 480 ? "auto" : "300px";
      this.calendarMonths = [];
      this._preGenMonths = 2;
      this.modal = modal.nativeElement;
    }
    Object.defineProperty(DatePicker.prototype, "minDate", {
      get: function() {
        return this._minDate;
      },
      set: function(value) {
        this._minDate = this.handleDateInput(value);
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(DatePicker.prototype, "maxDate", {
      get: function() {
        return this._maxDate;
      },
      set: function(value) {
        this._maxDate = this.handleDateInput(value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DatePicker.prototype, "value", {
      set: function(value) {
        this._selectedDate = this.handleDateInput(value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DatePicker.prototype, "selectedDate", {
      get: function() {
        return this._selectedDate;
      },
      set: function(value) {
        this._selectedDate = value;
        this._inputDate = value.toLocaleDateString();
        this.valueChange.next(this.selectedDate);
        this.hideCalendar();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(DatePicker.prototype, "inputDate", {
      get: function() {
        return this._inputDate;
      },
      set: function(value) {
        this._inputDate = value;
        this._selectedDate = new Date(value);
      },
      enumerable: true,
      configurable: true
    });
    ;
    DatePicker.prototype.ngOnInit = function() {
      var _this = this;
      var currentDate = this.selectedDate != null ? this.selectedDate : new Date();
      this.calendarMonths = [new Date(currentDate.getFullYear(), currentDate.getMonth() - 1), new Date(currentDate.getFullYear(), currentDate.getMonth())];
      for (var i = 0; i < this._preGenMonths; i++) {
        var earliestDate = this.calendarMonths[0];
        var latestDate = this.calendarMonths[this.calendarMonths.length - 1];
        if (this.canPrevMonth)
          this.calendarMonths.unshift(new Date(earliestDate.getFullYear(), earliestDate.getMonth() - 1));
        if (this.canNextMonth)
          this.calendarMonths.push(new Date(latestDate.getFullYear(), latestDate.getMonth() + 1));
      }
      setTimeout(function() {
        if (_this.calendarScroller == null)
          return;
        var scrollToMonth = _this.calendarMonths.findIndex(function(m) {
          return m.getFullYear() == currentDate.getFullYear() && m.getMonth() == currentDate.getMonth();
        });
        _this.calendarScroller.container.scrollTop = _this.calendarScroller.itemQuery.toArray()[scrollToMonth].element.offsetTop - 20;
        _this.calendarScroller.scrollToIndex(scrollToMonth);
      }, 1);
    };
    DatePicker.prototype.ngAfterViewInit = function() {
      var _this = this;
      this.modal.addEventListener('click', function(e) {
        if (e.srcElement.className.indexOf('modal') != -1)
          _this.hideCalendar();
      });
    };
    DatePicker.prototype.handleDateInput = function(value) {
      if (value instanceof Date && !isNaN(value.valueOf()))
        return value;
      else
        return new Date(value);
    };
    DatePicker.prototype.showCalendar = function(event) {
      if (event != null) {
        var clickedRect = event.srcElement.parentElement.getBoundingClientRect();
        this.calendarX = clickedRect.left;
        if (screen.height - clickedRect.bottom <= 500) {
          this.calendarY = (clickedRect.top);
        } else {
          this.calendarY = 0;
        }
      }
      this.ngOnInit();
      this.calendarDisplayed = true;
    };
    DatePicker.prototype.hideCalendar = function() {
      this.calendarDisplayed = false;
    };
    Object.defineProperty(DatePicker.prototype, "canPrevMonth", {
      get: function() {
        var currentDate = this.calendarMonths[0];
        var prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        var compareDate = new Date(this._minDate.getFullYear(), this._minDate.getMonth());
        return prevDate >= compareDate;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DatePicker.prototype, "canNextMonth", {
      get: function() {
        var currentDate = this.calendarMonths[this.calendarMonths.length - 1];
        var nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        var compareDate = new Date(this._maxDate.getFullYear(), this._maxDate.getMonth());
        return nextDate <= compareDate;
      },
      enumerable: true,
      configurable: true
    });
    DatePicker.prototype.disablePrev = function() {
      return this.calendarScroller ? this.calendarScroller.isTop() : false;
    };
    DatePicker.prototype.disableNext = function() {
      return this.calendarScroller ? this.calendarScroller.isBottom() : false;
    };
    DatePicker.prototype.scrollPrevMonth = function() {
      var _this = this;
      if (this.calendarScroller.topIndex == 0)
        this.addPrevMonth();
      setTimeout(function() {
        _this.calendarScroller.scrollToIndex(_this.calendarScroller.topIndex - 1);
      }, 10);
    };
    DatePicker.prototype.scrollNextMonth = function() {
      var _this = this;
      setTimeout(function() {
        _this.calendarScroller.scrollToIndex(_this.calendarScroller.topIndex + 1);
      }, 10);
    };
    DatePicker.prototype.addNextMonth = function() {
      if (!this.canNextMonth)
        return;
      var lastMonth = this.calendarMonths[this.calendarMonths.length - 1];
      var nextMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1);
      this.calendarMonths.push(nextMonth);
    };
    DatePicker.prototype.addPrevMonth = function() {
      if (!this.canPrevMonth)
        return;
      var firstMonth = this.calendarMonths[0];
      var prevMonth = new Date(firstMonth.getFullYear(), firstMonth.getMonth() - 1);
      this.calendarMonths.unshift(prevMonth);
    };
    __decorate([core_2.Input(), __metadata('design:type', String)], DatePicker.prototype, "label", void 0);
    __decorate([core_2.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DatePicker.prototype, "minDate", null);
    __decorate([core_2.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DatePicker.prototype, "maxDate", null);
    __decorate([core_2.Input(), __metadata('design:type', Function)], DatePicker.prototype, "dateFilter", void 0);
    __decorate([core_2.Output(), __metadata('design:type', Object)], DatePicker.prototype, "valueChange", void 0);
    __decorate([core_2.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DatePicker.prototype, "value", null);
    __decorate([core_2.ViewChild(InfiniteScroller_1.InfiniteScroller), __metadata('design:type', InfiniteScroller_1.InfiniteScroller)], DatePicker.prototype, "calendarScroller", void 0);
    DatePicker = __decorate([core_1.Component({
      selector: "date-picker",
      styles: ["\n      .date-picker-overlay {\n        background-color: transparent;\n        display: block;\n        position: fixed;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        z-index: 100; }\n        @media (max-width: 480px), screen and (max-device-width: 480px) {\n          .date-picker-overlay {\n            background-color: #55595c;\n            opacity: .75; } }\n\n      .date-picker-component {\n        border: 1px solid #eceeef;\n        z-index: 120;\n        background-color: #fff;\n        font-size: .75rem;\n        position: absolute;\n        width: 350px;\n        height: auto;\n        top: 0;\n        left: 0;\n        overflow: hidden;\n        border-radius: 0.3rem;\n        -webkit-transition: all 0.1s ease;\n        -moz-transition: all 0.1s ease;\n        transition: all 0.1s ease; }\n        @media (max-width: 480px), screen and (max-device-width: 480px) {\n          .date-picker-component {\n            width: 90%;\n            height: 90%;\n            position: fixed;\n            top: 5%;\n            left: 5%;\n            font-size: 1.25rem; } }\n\n      table {\n        font-size: .75rem; }\n        @media (max-width: 480px), screen and (max-device-width: 480px) {\n          table {\n            font-size: 1.25rem; } }\n\n      .input-group {\n        z-index: 110; }\n\n      input:read-only {\n        background-color: #fff; }\n\n      .input-group-addon {\n        background-color: #fff; }\n\n      header {\n        position: relative;\n        top: 0;\n        left: 0;\n        vertical-align: middle;\n        background-color: #fff; }\n        header .days-of-week {\n          background-color: #0275d8;\n          color: #fff; }\n        header table {\n          border-top: none !important; }\n        header th, header td {\n          text-align: center; }\n          @media (max-width: 480px), screen and (max-device-width: 480px) {\n            header th, header td {\n              font-size: 2.5rem; } }\n        header button {\n          border: none;\n          border-radius: 0;\n          color: #0275d8;\n          background-color: #fff;\n          width: 15%; }\n          @media (max-width: 480px), screen and (max-device-width: 480px) {\n            header button {\n              font-size: 2.5rem;\n              margin-top: .5rem; } }\n        header button:active {\n          background-color: #eceeef; }\n        header .button-disable {\n          color: #eceeef;\n          cursor: default; }\n        header .date-range {\n          width: 70%; }\n        header .date-range span {\n          background-color: #eceeef;\n          border-left: none;\n          border-right: none; }\n          @media (max-width: 480px), screen and (max-device-width: 480px) {\n            header .date-range span {\n              font-size: 2.5rem; } }\n        header .input-group-addon {\n          border: none;\n          background-color: #fff !important; }\n          @media (max-width: 480px), screen and (max-device-width: 480px) {\n            header .input-group-addon {\n              font-size: 1.5rem; } }\n        header input {\n          border: none;\n          display: inline-block;\n          margin: 1px auto 0 auto;\n          cursor: pointer; }\n          @media (max-width: 480px), screen and (max-device-width: 480px) {\n            header input {\n              font-size: 2.5rem; } }\n        header input:read-only {\n          background-color: #fff; }\n        header input.target {\n          color: #0275d8; }\n          header input.target::-webkit-input-placeholder {\n            color: #0275d8; }\n          header input.target::-moz-placeholder {\n            color: #0275d8; }\n          header input.target:-moz-placeholder {\n            color: #0275d8; }\n          header input.target:-ms-input-placeholder {\n            color: #0275d8; }\n\n      .prev-month, .next-month {\n        position: absolute;\n        top: 0;\n        display: inline-block;\n        z-index: 100;\n        margin-top: .2rem; }\n        .prev-month .btn-sm, .next-month .btn-sm {\n          padding: .1rem .7rem; }\n\n      .prev-month {\n        left: 0;\n        margin-left: 4%; }\n\n      .next-month {\n        right: 0;\n        margin-right: 4%; }\n\n      .container {\n        height: 100%; }\n\n      @media (max-width: 480px), screen and (max-device-width: 480px) {\n        .calendar-container {\n          height: 91%; } }\n    "],
      template: "\n      <div class=\"input-group\" (click)=\"showCalendar($event)\">\n        <input type=\"text\" class=\"form-control\"\n          [(ngModel)]=\"inputDate\" #dateField readonly\n              placeholder=\"{{label}}\" />\n        <span class=\"input-group-addon\" [class.input-group-addon-focus]=\"dateField.focus\">\n            <i class=\"fa fa-calendar\"></i>\n        </span>\n      </div>\n\n      <div class=\"date-picker-overlay\" aria-hidden=\"true\"\n          *ngIf=\"calendarDisplayed\" \n          (click)=\"hideCalendar()\">\n      </div>\n\n      <div class=\"date-picker-component\" *ngIf=\"calendarDisplayed\">\n          <div class=\"container p-a-0\">\n              <header>\n                  <button type=\"button\" class=\"btn btn-secondary pull-left\"\n                      (click)=\"scrollPrevMonth()\" [class.button-disable]=\"disablePrev()\">\n                      <i class=\"fa fa-chevron-left\"></i>\n                  </button>\n                  <div class=\"date-range pull-left input-group\">\n                      <input type=\"text\" class=\"form-control text-xs-center\" \n                          id=\"startDate\" [(ngModel)]=\"inputDate\" readonly />\n                  </div>\n                  <button type=\"button\" class=\"btn btn-secondary pull-right\"\n                      (click)=\"scrollNextMonth()\" [class.button-disable]=\"disableNext()\">\n                      <i class=\"fa fa-chevron-right\"></i>\n                  </button>\n                  <table class=\"table m-b-0 days-of-week\">\n                      <tbody>\n                      <tr>\n                          <th>S</th>\n                          <th>M</th>\n                          <th>T</th>\n                          <th>W</th>\n                          <th>T</th>\n                          <th>F</th>\n                          <th>S</th>\n                      </tr>\n                      </tbody>\n                  </table>\n              </header>\n              <div class=\"calendar-container m-a-0\">\n                  <infinite-scroller\n                      (next)=\"addNextMonth()\"\n                      (prev)=\"addPrevMonth()\"\n                      distance=\"100\"\n                      height=\"{{calendarHeight}}\"\n                      hideScrollbar=\"true\">\n                      <date-picker-calendar scroll-item\n                          *ngFor=\"#month of calendarMonths #i=index\" \n                          [id]=\"i\"\n                          [minDate]=\"minDate\" [maxDate]=\"maxDate\"\n                          [dateFilter]=\"dateFilter\"\n                          [currentMonth]=\"month\" \n                          [(selectedDate)]=\"selectedDate\" \n                          (selectedDate)=\"hideCalendar()\">\n                          {{i}}\n                      </date-picker-calendar>\n                  </infinite-scroller>\n              </div>\n          </div>\n      </div>\n    ",
      directives: [DatePickerCalendar_1.DatePickerCalendar, InfiniteScroller_1.INFINITE_SCROLLER_PROVIDERS, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
      changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }), __metadata('design:paramtypes', [core_2.ElementRef])], DatePicker);
    return DatePicker;
  }());
  exports.DatePicker = DatePicker;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/DatePicker/DatePickerCalendar", ["angular2/core", "angular2/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var core_2 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var DatePickerCalendar = (function() {
    function DatePickerCalendar() {
      this.selectedDateChange = new core_2.EventEmitter();
      this.dateTarget = null;
      this.showMonth = true;
    }
    DatePickerCalendar.prototype.ngOnInit = function() {
      this.buildWeeks(this.currentMonth || new Date());
    };
    DatePickerCalendar.prototype.checkSelectable = function(date) {
      var dateNumber = parseInt(date);
      if (isNaN(dateNumber))
        return false;
      var compareDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), dateNumber);
      if (typeof this.dateFilter == "function" && !this.dateFilter(compareDate))
        return false;
      return compareDate >= this.minDate && compareDate <= this.maxDate;
    };
    DatePickerCalendar.prototype.checkSelectedDate = function(date) {
      if (typeof this.selectedDate == undefined || this.selectedDate == null)
        return false;
      if (typeof this.startDate != undefined && this.startDate != null && typeof this.endDate != undefined && this.endDate != null) {
        var compareDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), parseInt(date));
        return compareDate >= this.startDate && compareDate <= this.endDate;
      }
      return this.selectedDate.getFullYear() == this.currentMonth.getFullYear() && this.selectedDate.getMonth() == this.currentMonth.getMonth() && this.selectedDate.getDate().toString() == date;
    };
    DatePickerCalendar.prototype.checkStartDate = function(date) {
      if (typeof this.startDate == undefined || this.startDate == null)
        return false;
      if (this.startDate == this.endDate)
        return false;
      return this.startDate.getFullYear() == this.currentMonth.getFullYear() && this.startDate.getMonth() == this.currentMonth.getMonth() && this.startDate.getDate().toString() == date;
    };
    DatePickerCalendar.prototype.checkEndDate = function(date) {
      if (typeof this.endDate == undefined || this.endDate == null)
        return false;
      if (this.startDate == this.endDate)
        return false;
      return this.endDate.getFullYear() == this.currentMonth.getFullYear() && this.endDate.getMonth() == this.currentMonth.getMonth() && this.endDate.getDate().toString() == date;
    };
    DatePickerCalendar.prototype.selectDate = function(date) {
      if (!this.checkSelectable(date))
        return;
      var dateNumber = parseInt(date);
      this.selectedDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), dateNumber);
      this.selectedDateChange.next(this.selectedDate);
    };
    DatePickerCalendar.prototype.buildWeeks = function(date) {
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
      var firstWeekCount = this.weeks[0].filter(function(i) {
        return i.length > 0;
      }).length;
      var lastWeekCount = this.weeks[this.weeks.length - 1].filter(function(i) {
        return i.length > 0;
      }).length;
    };
    __decorate([core_2.Input(), __metadata('design:type', Date)], DatePickerCalendar.prototype, "currentMonth", void 0);
    __decorate([core_2.Input(), __metadata('design:type', Date)], DatePickerCalendar.prototype, "selectedDate", void 0);
    __decorate([core_2.Output(), __metadata('design:type', Object)], DatePickerCalendar.prototype, "selectedDateChange", void 0);
    __decorate([core_2.Input(), __metadata('design:type', Boolean)], DatePickerCalendar.prototype, "dateTarget", void 0);
    __decorate([core_2.Input(), __metadata('design:type', Date)], DatePickerCalendar.prototype, "startDate", void 0);
    __decorate([core_2.Input(), __metadata('design:type', Date)], DatePickerCalendar.prototype, "endDate", void 0);
    __decorate([core_2.Input(), __metadata('design:type', Date)], DatePickerCalendar.prototype, "minDate", void 0);
    __decorate([core_2.Input(), __metadata('design:type', Date)], DatePickerCalendar.prototype, "maxDate", void 0);
    __decorate([core_2.Input(), __metadata('design:type', Function)], DatePickerCalendar.prototype, "dateFilter", void 0);
    __decorate([core_2.Input(), __metadata('design:type', Boolean)], DatePickerCalendar.prototype, "showMonth", void 0);
    DatePickerCalendar = __decorate([core_1.Component({
      selector: 'date-picker-calendar',
      styles: ["\n   .table {\n     font-size: .75rem;\n     border: none;\n     border-top: 1px solid #eceeef;\n     background-color: #fff;\n     border-collapse: collapse; }\n     .table .calendar-date {\n       z-index: 200;\n       background-color: transparent; }\n\n   tr {\n     border: none; }\n\n   th, td {\n     text-align: center;\n     vertical-align: middle;\n     font-size: .75rem;\n     padding: .1rem;\n     height: 1.75rem;\n     border: none;\n     position: relative; }\n     @media (max-width: 480px), screen and (max-device-width: 480px) {\n       th, td {\n         padding: 1rem;\n         font-size: 2.5rem; } }\n\n   td.selectable {\n     cursor: pointer !important;\n     /*border: 1px solid $table-border-color;*/ }\n\n   td.selectable:hover {\n     background-color: #0275d8;\n     color: #fff; }\n\n   td.selected {\n     background-color: #99c4e9;\n     color: #fff; }\n\n   td.disabled {\n     /*background-color: lighten($input-bg-disabled, 5%);*/\n     color: #c9c9c9; }\n\n   td.startDate, td.endDate {\n     background-color: #0275d8;\n     color: #fff; }\n\n   td.startDate:after {\n     content: '';\n     position: absolute;\n     top: 0;\n     bottom: 0;\n     width: 0;\n     right: 0;\n     background-color: transparent;\n     border-left: 1em solid transparent;\n     border-top: 1.1em solid #99c4e9;\n     border-bottom: 1.1em solid #99c4e9; }\n\n   td.endDate:before {\n     content: '';\n     position: absolute;\n     top: 0;\n     bottom: 0;\n     width: 0;\n     left: 0;\n     background-color: transparent;\n     border-right: 1em solid transparent;\n     border-top: 1.1em solid #99c4e9;\n     border-bottom: 1.1em solid #99c4e9; }\n    "],
      template: "\n   <div class=\"text-center py\">\n    <table class=\"table m-a-0\">\t\n        <tbody>\n               <tr *ngIf=\"showMonth\">\n                   <td colspan=\"7\">\n                       <strong>{{currentMonth | date:'MMMM yyyy'}}</strong>\n                   </td>\n               </tr> \n            <tr *ngFor=\"#week of weeks\">\n                <td *ngFor=\"#day of week\"\n                    [class.selectable]=\"checkSelectable(day)\" \n                    [class.disabled]=\"!checkSelectable(day)\"\n                    [class.selected]=\"checkSelectedDate(day)\" \n                       [class.startDate]=\"checkStartDate(day)\"\n                       [class.endDate]=\"checkEndDate(day)\"\n                    (click)=\"selectDate(day)\">\n                    <span class=\"calendar-date\">{{day}}</span>\n                </td> \n            </tr>\n        </tbody>\n    </table>\n   </div>\n    ",
      directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
    }), __metadata('design:paramtypes', [])], DatePickerCalendar);
    return DatePickerCalendar;
  }());
  exports.DatePickerCalendar = DatePickerCalendar;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/DatePicker/DateRangePicker", ["angular2/core", "angular2/common", "../../utilities/DateUtils", "../../utilities/DetectionUtils", "./DatePicker", "./DatePickerCalendar", "../InfiniteScroller/InfiniteScroller"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var core_2 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var DateUtils_1 = $__require('../../utilities/DateUtils');
  var DetectionUtils_1 = $__require('../../utilities/DetectionUtils');
  var DatePicker_1 = $__require('./DatePicker');
  var DatePickerCalendar_1 = $__require('./DatePickerCalendar');
  var InfiniteScroller_1 = $__require('../InfiniteScroller/InfiniteScroller');
  var DateRangePicker = (function(_super) {
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
    }
    Object.defineProperty(DateRangePicker.prototype, "value", {
      set: function(value) {
        this._selectedDate = this.handleRangeInput(value).start;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "minDate", {
      get: function() {
        return this._minDate;
      },
      set: function(value) {
        this._minDate = this.handleDateInput(value);
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(DateRangePicker.prototype, "maxDate", {
      get: function() {
        return this._maxDate;
      },
      set: function(value) {
        this._maxDate = this.handleDateInput(value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "selectedDate", {
      get: function() {
        return this._selectedDate;
      },
      set: function(value) {
        this._selectedDate = value;
        if ((this._dateTarget && this.startDate != null && value < this.startDate) || !this._dateTarget && this.endDate != null && value > this.endDate)
          this._dateTarget = !this._dateTarget;
        if (!this._dateTarget) {
          this.inputStartDate = value.toLocaleDateString();
          this.startDate = value;
          if (this.startDateChange != null)
            this.startDateChange.next(this._startDate);
        } else {
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
      get: function() {
        return this._startDate;
      },
      set: function(value) {
        this._startDate = this.handleDateInput(value);
        this.inputStartDate = this._startDate.toLocaleDateString();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "endDate", {
      get: function() {
        return this._endDate;
      },
      set: function(value) {
        this._endDate = this.handleDateInput(value);
        this.inputEndDate = this._endDate.toLocaleDateString();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "inputStartDate", {
      get: function() {
        return this._inputStartDate;
      },
      set: function(value) {
        this._inputStartDate = value;
        this._selectedDate = new Date(value);
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(DateRangePicker.prototype, "inputEndDate", {
      get: function() {
        return this._inputEndDate;
      },
      set: function(value) {
        this._inputEndDate = value;
        this._selectedDate = new Date(value);
      },
      enumerable: true,
      configurable: true
    });
    ;
    DateRangePicker.prototype.handleRangeInput = function(value) {
      console.log(value);
      if (!(value instanceof DateUtils_1.DateRange))
        throw "DateRangePicker error: input is not of type DateRange";
      var range = value;
      this.startDate = range.start;
      this.endDate = range.end;
      return range;
    };
    DateRangePicker.prototype.focusStartDate = function() {
      this._dateTarget = false;
    };
    DateRangePicker.prototype.focusEndDate = function() {
      this._dateTarget = true;
    };
    DateRangePicker.prototype.checkStartDateTarget = function() {
      return !this._dateTarget;
    };
    DateRangePicker.prototype.checkEndDateTarget = function() {
      return this._dateTarget;
    };
    __decorate([core_1.Output(), __metadata('design:type', Object)], DateRangePicker.prototype, "valueChange", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DateRangePicker.prototype, "value", null);
    __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DateRangePicker.prototype, "minDate", null);
    __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DateRangePicker.prototype, "maxDate", null);
    __decorate([core_1.Input(), __metadata('design:type', Function)], DateRangePicker.prototype, "dateFilter", void 0);
    __decorate([core_2.ViewChild(InfiniteScroller_1.InfiniteScroller), __metadata('design:type', InfiniteScroller_1.InfiniteScroller)], DateRangePicker.prototype, "calendarScroller", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DateRangePicker.prototype, "startLabel", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], DateRangePicker.prototype, "endLabel", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], DateRangePicker.prototype, "startDateChange", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DateRangePicker.prototype, "startDate", null);
    __decorate([core_1.Output(), __metadata('design:type', Object)], DateRangePicker.prototype, "endDateChange", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DateRangePicker.prototype, "endDate", null);
    DateRangePicker = __decorate([core_1.Component({
      selector: "date-range-picker",
      styles: ["\n   .date-picker-overlay {\n     background-color: transparent;\n     display: block;\n     position: fixed;\n     top: 0;\n     right: 0;\n     bottom: 0;\n     left: 0;\n     z-index: 100; }\n     @media (max-width: 480px), screen and (max-device-width: 480px) {\n       .date-picker-overlay {\n         background-color: #55595c;\n         opacity: .75; } }\n\n   .date-picker-component {\n     border: 1px solid #eceeef;\n     z-index: 120;\n     background-color: #fff;\n     font-size: .75rem;\n     position: absolute;\n     width: 350px;\n     height: auto;\n     top: 0;\n     left: 0;\n     overflow: hidden;\n     border-radius: 0.3rem;\n     -webkit-transition: all 0.1s ease;\n     -moz-transition: all 0.1s ease;\n     transition: all 0.1s ease; }\n     @media (max-width: 480px), screen and (max-device-width: 480px) {\n       .date-picker-component {\n         width: 90%;\n         height: 90%;\n         position: fixed;\n         top: 5%;\n         left: 5%;\n         font-size: 1.25rem; } }\n\n   table {\n     font-size: .75rem; }\n     @media (max-width: 480px), screen and (max-device-width: 480px) {\n       table {\n         font-size: 1.25rem; } }\n\n   .input-group {\n     z-index: 110; }\n\n   input:read-only {\n     background-color: #fff; }\n\n   .input-group-addon {\n     background-color: #fff; }\n\n   header {\n     position: relative;\n     top: 0;\n     left: 0;\n     vertical-align: middle;\n     background-color: #fff; }\n     header .days-of-week {\n       background-color: #0275d8;\n       color: #fff; }\n     header table {\n       border-top: none !important; }\n     header th, header td {\n       text-align: center; }\n       @media (max-width: 480px), screen and (max-device-width: 480px) {\n         header th, header td {\n           font-size: 2.5rem; } }\n     header button {\n       border: none;\n       border-radius: 0;\n       color: #0275d8;\n       background-color: #fff;\n       width: 15%; }\n       @media (max-width: 480px), screen and (max-device-width: 480px) {\n         header button {\n           font-size: 2.5rem;\n           margin-top: .5rem; } }\n     header button:active {\n       background-color: #eceeef; }\n     header .button-disable {\n       color: #eceeef;\n       cursor: default; }\n     header .date-range {\n       width: 70%; }\n     header .date-range span {\n       background-color: #eceeef;\n       border-left: none;\n       border-right: none; }\n       @media (max-width: 480px), screen and (max-device-width: 480px) {\n         header .date-range span {\n           font-size: 2.5rem; } }\n     header .input-group-addon {\n       border: none;\n       background-color: #fff !important; }\n       @media (max-width: 480px), screen and (max-device-width: 480px) {\n         header .input-group-addon {\n           font-size: 1.5rem; } }\n     header input {\n       border: none;\n       display: inline-block;\n       margin: 1px auto 0 auto;\n       cursor: pointer; }\n       @media (max-width: 480px), screen and (max-device-width: 480px) {\n         header input {\n           font-size: 2.5rem; } }\n     header input:read-only {\n       background-color: #fff; }\n     header input.target {\n       color: #0275d8; }\n       header input.target::-webkit-input-placeholder {\n         color: #0275d8; }\n       header input.target::-moz-placeholder {\n         color: #0275d8; }\n       header input.target:-moz-placeholder {\n         color: #0275d8; }\n       header input.target:-ms-input-placeholder {\n         color: #0275d8; }\n\n   .prev-month, .next-month {\n     position: absolute;\n     top: 0;\n     display: inline-block;\n     z-index: 100;\n     margin-top: .2rem; }\n     .prev-month .btn-sm, .next-month .btn-sm {\n       padding: .1rem .7rem; }\n\n   .prev-month {\n     left: 0;\n     margin-left: 4%; }\n\n   .next-month {\n     right: 0;\n     margin-right: 4%; }\n\n   .container {\n     height: 100%; }\n\n   @media (max-width: 480px), screen and (max-device-width: 480px) {\n     .calendar-container {\n       height: 91%; } }\n    "],
      template: "\n   <div class=\"date-picker-overlay\" aria-hidden=\"true\"\n       *ngIf=\"calendarDisplayed\" \n       (click)=\"hideCalendar()\">\n   </div>\n\n   <div class=\"form-group\">\n       <label for=\"startDate\">{{startLabel}}</label>\n       <div class=\"input-group\" \n           (click)=\"showCalendar($event)\"\n           (click)=\"focusStartDate()\">\n           <input type=\"text\" class=\"form-control\" name=\"startDate\"\n               [(ngModel)]=\"inputStartDate\" #dateField1 \n               placeholder=\"{{startLabel}}\" readonly />\n           <span class=\"input-group-addon\" [class.input-group-addon-focus]=\"dateField1.focus\">\n               <i class=\"fa fa-calendar\"></i>\n           </span>\n       </div>\n   </div>\n\n   <div class=\"form-group\">\n       <label for=\"endDate\">{{endLabel}}</label>\n       <div class=\"input-group\" \n           (click)=\"showCalendar($event)\"\n           (click)=\"focusEndDate()\">\n           <input type=\"text\" class=\"form-control\" name=\"endDate\"\n               [(ngModel)]=\"inputEndDate\" #dateField2 \n               placeholder=\"{{endLabel}}\" readonly />\n           <span class=\"input-group-addon\" [class.input-group-addon-focus]=\"dateField2.focus\">\n               <i class=\"fa fa-calendar\"></i>\n           </span>\n       </div>\n   </div>\n\n   <div class=\"date-picker-component\" *ngIf=\"calendarDisplayed\">\n       <div class=\"container p-a-0\">\n           <header>\n               <button type=\"button\" class=\"btn btn-secondary pull-left\"\n                   (click)=\"scrollPrevMonth()\" [class.button-disable]=\"disablePrev()\">\n                   <i class=\"fa fa-chevron-left\"></i>\n               </button>\n               <div class=\"date-range pull-left input-group\">\n                   <input type=\"text\" class=\"form-control text-xs-center\" \n                       [class.target]=\"checkStartDateTarget()\"\n                       (click)=\"focusStartDate()\"\n                       id=\"startDate\" [(ngModel)]=\"inputStartDate\" readonly \n                       placeholder=\"{{startLabel}}\" />\n                   <span class=\"input-group-addon\"> - </span>\n                   <input type=\"text\" class=\"form-control text-xs-center\" \n                       [class.target]=\"checkEndDateTarget()\"\n                       (click)=\"focusEndDate()\"\n                       id=\"endDate\" [(ngModel)]=\"inputEndDate\" readonly \n                       placeholder=\"{{endLabel}}\" />\n               </div>\n               <button type=\"button\" class=\"btn btn-secondary pull-right\"\n                   (click)=\"scrollNextMonth()\" [class.button-disable]=\"disableNext()\">\n                   <i class=\"fa fa-chevron-right\"></i>\n               </button>\n               <table class=\"table m-b-0 days-of-week\">\n                   <tbody>\n                   <tr>\n                       <th>S</th>\n                       <th>M</th>\n                       <th>T</th>\n                       <th>W</th>\n                       <th>T</th>\n                       <th>F</th>\n                       <th>S</th>\n                   </tr>\n                   </tbody>\n               </table>\n           </header>\n           <div class=\"calendar-container m-a-0\">\n               <infinite-scroller\n                   (next)=\"addNextMonth()\"\n                   (prev)=\"addPrevMonth()\"\n                   distance=\"100\"\n                   height=\"{{calendarHeight}}\"\n                   hideScrollbar=\"true\">\n                   <date-picker-calendar scroll-item\n                       *ngFor=\"#month of calendarMonths #i=index\" \n                       [id]=\"i\"\n                       [minDate]=\"minDate\" [maxDate]=\"maxDate\"\n                       [dateFilter]=\"dateFilter\"\n                       [currentMonth]=\"month\" \n                       [(selectedDate)]=\"selectedDate\"\n                       [(startDate)]=\"startDate\"\n                       [(endDate)]=\"endDate\"\n                       [dateTarget]=\"_dateTarget\" \n                       (selectedDate)=\"hideCalendar()\">\n                       {{i}}\n                   </date-picker-calendar>\n               </infinite-scroller>\n           </div>\n       </div>\n   </div>\n    ",
      directives: [DatePickerCalendar_1.DatePickerCalendar, InfiniteScroller_1.INFINITE_SCROLLER_PROVIDERS, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
      changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }), __metadata('design:paramtypes', [core_2.ElementRef])], DateRangePicker);
    return DateRangePicker;
  }(DatePicker_1.DatePicker));
  exports.DateRangePicker = DateRangePicker;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/DatePicker/DatePickerProviders", ["./DatePickerCalendar", "./DatePicker", "./DateRangePicker"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var DatePickerCalendar_1 = $__require('./DatePickerCalendar');
  exports.DatePickerCalendar = DatePickerCalendar_1.DatePickerCalendar;
  var DatePicker_1 = $__require('./DatePicker');
  exports.DatePicker = DatePicker_1.DatePicker;
  var DateRangePicker_1 = $__require('./DateRangePicker');
  exports.DateRangePicker = DateRangePicker_1.DateRangePicker;
  var DatePickerCalendar_2 = $__require('./DatePickerCalendar');
  var DatePicker_2 = $__require('./DatePicker');
  var DateRangePicker_2 = $__require('./DateRangePicker');
  exports.DATE_PICKER_PROVIDERS = [DatePickerCalendar_2.DatePickerCalendar, DatePicker_2.DatePicker, DateRangePicker_2.DateRangePicker];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/Modal/Modal", ["angular2/core", "angular2/common", "../../directives/Animation/Animation"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var Animation_1 = $__require('../../directives/Animation/Animation');
  var Modal = (function() {
    function Modal(el) {
      this.displayed = false;
      this.closeOnUnfocus = true;
      this.closeButton = true;
      this.modalTitle = '';
      this._el = el.nativeElement;
    }
    Modal.prototype.clickElement = function(e) {
      if (this.closeOnUnfocus) {
        if (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')
          this.showModal(false);
      }
    };
    Modal.prototype.getElement = function() {
      return this._el;
    };
    Modal.prototype.closeModal = function() {
      return this.showModal(false);
    };
    Modal.prototype.showModal = function(isDisplayed) {
      var _this = this;
      var body = document.body;
      if (isDisplayed === undefined) {
        this.displayed = !this.displayed;
      } else {
        this.displayed = isDisplayed;
      }
      if (this.displayed) {
        body.classList.add('modal-open');
      } else {
        body.classList.remove('modal-open');
        if (this.closeOnUnfocus) {
          this._el.childNodes[0].removeEventListener('click', function(e) {
            if (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')
              _this.showModal(false);
          });
        }
      }
      return false;
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Modal.prototype, "closeOnUnfocus", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Modal.prototype, "closeButton", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Modal.prototype, "modalTitle", void 0);
    Modal = __decorate([core_1.Component({
      selector: 'modal',
      host: {'(click)': 'clickElement($event)'},
      styles: ["\n   .customFadeIn {\n     -webkit-animation-name: fadeInDown;\n     -moz-animation-name: fadeInDown;\n     animation-name: fadeInDown;\n     -webkit-animation-duration: 1s;\n     -moz-animation-duration: 1s;\n     animation-duration: 1s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n    "],
      template: "\n   <div class=\"modal\" [ngClass]=\"{customFadeIn: displayed}\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" [style.display]=\"displayed ? 'block' : 'none'\">\n       <div class=\"modal-dialog\" role=\"document\">\n           <div class=\"modal-content\">\n               <div class=\"modal-header\">\n                   <button *ngIf=\"closeButton\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"showModal(false)\">\n                       <span aria-hidden=\"true\">&#215;</span>\n                       <span class=\"sr-only\">Close</span>\n                   </button>\n                   <h4 class=\"modal-title\" id=\"myModalLabel\">{{modalTitle}}</h4>\n               </div>\n               <ng-content></ng-content>\n           </div>\n       </div>\n   </div>\n   <div class=\"modal-backdrop\" [ngClass]=\"{fade: displayed, in: displayed}\" [style.display]=\"displayed ? 'block' : 'none'\"></div>\n    ",
      directives: [common_1.CORE_DIRECTIVES, Animation_1.Animation]
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Modal);
    return Modal;
  }());
  exports.Modal = Modal;
  exports.MODAL_PROVIDERS = [Modal];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/Pagination/Pagination", ["angular2/core", "angular2/common", "../../pipes/Range/Range"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var Range_1 = $__require('../../pipes/Range/Range');
  var Pagination = (function() {
    function Pagination() {
      this.currentPage = 1;
      this.pagesAtOnce = 5;
      this.totalPages = 10;
      this.currentPageChange = new core_1.EventEmitter();
      this.pagesBlank = [];
      this.setPage(this.currentPage);
    }
    Pagination.prototype.ngOnChanges = function(changes) {
      this.setPage(this.currentPage);
    };
    Pagination.prototype.setPage = function(newPage) {
      if (newPage < 1 || newPage > this.totalPages)
        return;
      this.currentPage = newPage;
      if (this.currentPage - Math.ceil(this.pagesAtOnce / 2) < 0 || this.totalPages - this.pagesAtOnce <= 0) {
        this.startingIndex = 0;
        this.endingIndex = this.pagesAtOnce;
      } else if (this.totalPages - this.currentPage <= this.pagesAtOnce - Math.ceil(this.pagesAtOnce / 2)) {
        this.startingIndex = this.totalPages - this.pagesAtOnce;
        this.endingIndex = this.totalPages;
      } else {
        this.startingIndex = this.currentPage - Math.ceil(this.pagesAtOnce / 2);
        this.endingIndex = this.startingIndex + this.pagesAtOnce < this.totalPages ? this.startingIndex + this.pagesAtOnce : this.totalPages;
      }
      this.currentPageChange.next(this.currentPage);
    };
    __decorate([core_1.Input(), __metadata('design:type', Number)], Pagination.prototype, "currentPage", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Pagination.prototype, "pagesAtOnce", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Pagination.prototype, "totalPages", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], Pagination.prototype, "currentPageChange", void 0);
    Pagination = __decorate([core_1.Component({
      selector: 'pagination',
      changeDetection: core_1.ChangeDetectionStrategy.OnPush,
      properties: ["totalPages: total-pages", "pagesAtOnce: pages-at-once"],
      styles: ["\n      a {\n        cursor: pointer; }\n\n      a:hover {\n        text-decoration: none; }\n    "],
      template: "\n      <nav>\n          <ul class=\"pagination\">\n              <li class=\"page-item\" [class.disabled]=\"currentPage == 1\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == 1\" (click)=\"setPage(1)\" aria-label=\"First\">\n                      <span aria-hidden=\"true\">First</span>\n                      <span class=\"sr-only\">First</span>\n                  </a>\n              </li>\n              <li class=\"page-item\" [class.disabled]=\"currentPage == 1\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == 1\" (click)=\"setPage(currentPage - 1)\" aria-label=\"Previous\">\n                      <span aria-hidden=\"true\">&#171;</span>\n                      <span class=\"sr-only\">Previous</span>\n                  </a>\n              </li>\n              <li *ngFor=\"#page of pagesBlank | range : 1 : totalPages | slice: startingIndex : endingIndex\" class=\"page-item\" [class.active]=\"currentPage == page\">\n                  <a class=\"page-link\" (click)=\"setPage(page)\">{{page}}</a>\n              </li>\n              <li class=\"page-item\" [class.disabled]=\"currentPage == totalPages\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == totalPages\" (click)=\"setPage(currentPage + 1)\" aria-label=\"Next\">\n                      <span aria-hidden=\"true\">&#187;</span>\n                      <span class=\"sr-only\">Next</span>\n                  </a>\n              </li>\n              <li class=\"page-item\" [class.disabled]=\"currentPage == totalPages\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == totalPages\" (click)=\"setPage(totalPages)\" aria-label=\"Last\">\n                      <span aria-hidden=\"true\">Last</span>\n                      <span class=\"sr-only\">Last</span>\n                  </a>\n              </li>\n          </ul>\n      </nav>\n\n      <div class=\"input-group col-md-3\">\n          <span class=\"input-group-addon\">Jump to:</span>\n          <select class=\"form-control\" (change)=\"setPage($event.target.value)\">\n              <option *ngFor=\"#page of pagesBlank | range : 1 : totalPages\" [value]=\"page\" [selected]=\"page == currentPage\">{{page}}</option>\n          </select>\n      </div>\n    ",
      directives: [common_1.CORE_DIRECTIVES],
      pipes: [common_1.SlicePipe, Range_1.RangePipe]
    }), __metadata('design:paramtypes', [])], Pagination);
    return Pagination;
  }());
  exports.Pagination = Pagination;
  exports.PAGINATION_PROVIDERS = [Pagination];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/InfiniteScroller/InfiniteScroller", ["angular2/core", "../../utilities/ElementUtils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var ElementUtils_1 = $__require('../../utilities/ElementUtils');
  var ScrollItem = (function() {
    function ScrollItem(element) {
      this.element = element.nativeElement;
    }
    Object.defineProperty(ScrollItem.prototype, "height", {
      get: function() {
        return ElementUtils_1.ElementUtils.outerHeight(this.element);
      },
      enumerable: true,
      configurable: true
    });
    ScrollItem.prototype.ngAfterViewInit = function() {
      this.element = this.element.firstElementChild;
    };
    ScrollItem = __decorate([core_1.Directive({selector: "[scroll-item],.scroll-item"}), __metadata('design:paramtypes', [core_1.ElementRef])], ScrollItem);
    return ScrollItem;
  }());
  exports.ScrollItem = ScrollItem;
  var InfiniteScroller = (function() {
    function InfiniteScroller(element) {
      this.distance = 100;
      this.height = 'auto';
      this.hideScrollbar = false;
      this.next = new core_1.EventEmitter();
      this.prev = new core_1.EventEmitter();
      this.topIndexChange = new core_1.EventEmitter();
      this.topIndex = 0;
      this.bottomIndexChange = new core_1.EventEmitter();
      this.bottomIndex = 0;
      this.lastScroll = 0;
      this.container = element.nativeElement;
    }
    InfiniteScroller.prototype.ngAfterContentInit = function() {
      var _this = this;
      this.firstItem = this.itemQuery.first;
      this.itemQuery.changes.subscribe(function() {
        _this.handleItemChanges();
      });
    };
    InfiniteScroller.prototype.ngAfterViewInit = function() {
      this.container = this.container.firstElementChild;
      this.container.scrollTop += 1;
    };
    InfiniteScroller.prototype.handleItemChanges = function() {
      if (this.firstItem == null)
        this.firstItem = this.itemQuery.first;
      if (this.firstItem !== this.itemQuery.first) {
        this.container.scrollTop += this.itemQuery.first.height;
        this.firstItem = this.itemQuery.first;
      }
    };
    InfiniteScroller.prototype.getVisableIndicies = function() {
      var _this = this;
      var itemArray = this.itemQuery.toArray();
      var visableIndicies = itemArray.filter(function(i) {
        return _this.checkVisableItem(i);
      }).map(function(i) {
        return itemArray.indexOf(i);
      });
      if (visableIndicies.length > 1) {
        this.topIndex = visableIndicies[0];
        this.bottomIndex = visableIndicies[visableIndicies.length - 1];
        this.topIndexChange.next(this.topIndex);
        this.bottomIndexChange.next(this.bottomIndex);
      } else if (visableIndicies.length > 0) {
        this.topIndex = visableIndicies[0];
        this.topIndexChange.next(this.topIndex);
      }
    };
    InfiniteScroller.prototype.checkVisableItem = function(item) {
      var itemTop = item.element.offsetTop;
      var itemBottom = itemTop + ElementUtils_1.ElementUtils.outerHeight(item.element);
      var viewTop = this.container.scrollTop + this.container.offsetTop;
      var viewBottom = viewTop + this.container.clientHeight;
      if (itemTop > viewTop && itemTop < viewBottom)
        return true;
      if (itemBottom > viewTop && itemBottom < viewBottom)
        return true;
      if (itemTop < viewTop && itemBottom > viewBottom)
        return true;
      return false;
    };
    InfiniteScroller.prototype.doscroll = function(event) {
      var target = (typeof event.srcElement === 'undefined' ? event.target : event.srcElement);
      var targetRect = target.getBoundingClientRect();
      var bottomPosition = target.scrollHeight - (target.scrollTop + targetRect.height);
      var scrollDown = target.scrollTop > this.lastScroll;
      var saveLastScroll = this.lastScroll;
      this.lastScroll = target.scrollTop;
      if (scrollDown && target.scrollHeight - (target.scrollTop + targetRect.height) <= this.distance * 2) {
        this.next.emit(null);
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
          target.scrollTop -= 10;
        }
      } else if (!scrollDown && target.scrollTop <= this.distance * 2) {
        this.prev.emit(null);
      }
      this.getVisableIndicies();
      if (target.scrollTop < 1)
        target.scrollTop = 1;
    };
    InfiniteScroller.prototype.scrollTo = function(position) {
      ElementUtils_1.ElementUtils.scrollTo(this.container, position, 500);
    };
    InfiniteScroller.prototype.scrollToIndex = function(index) {
      var itemArray = this.itemQuery.toArray();
      var targetIndex = 0;
      if (index > 0 && index < itemArray.length)
        targetIndex = index;
      else if (index >= itemArray.length)
        targetIndex = itemArray.length - 1;
      if (targetIndex < 0)
        targetIndex = 0;
      var target = this.itemQuery.toArray()[targetIndex];
      var targetPos = target.element.offsetTop - this.container.offsetTop;
      this.scrollTo(targetPos);
    };
    InfiniteScroller.prototype.isTop = function() {
      return this.lastScroll <= 1;
    };
    InfiniteScroller.prototype.isBottom = function() {
      return (this.lastScroll + this.container.clientHeight) >= this.container.scrollHeight - 10;
    };
    __decorate([core_1.Input(), __metadata('design:type', Number)], InfiniteScroller.prototype, "distance", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], InfiniteScroller.prototype, "height", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], InfiniteScroller.prototype, "hideScrollbar", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], InfiniteScroller.prototype, "next", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], InfiniteScroller.prototype, "prev", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], InfiniteScroller.prototype, "topIndexChange", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], InfiniteScroller.prototype, "bottomIndexChange", void 0);
    __decorate([core_1.ContentChildren(ScrollItem), __metadata('design:type', core_1.QueryList)], InfiniteScroller.prototype, "itemQuery", void 0);
    InfiniteScroller = __decorate([core_1.Component({
      selector: "infinite-scroller",
      template: "\n\t\t<div class=\"scroll-container\" \n\t\t\t(scroll)=\"doscroll($event)\"\n\t\t\t[style.height]=\"height\"\n\t\t\t[class.hide-scrollbar]=\"hideScrollbar\">\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t",
      styles: ["\n\t\t.scroll-container {\n\t\t\toverflow-y: scroll;\n\t\t\toverflow-x: hidden;\n            max-height: 100%;\n\t\t}\n\t\t\n\t\t.scroll-container.hide-scrollbar::-webkit-scrollbar {\n\t\t\tdisplay: none;\n\t\t}\n\t\t\n\t\t.scroll-content {\n\t\t\toverflow: auto;\n\t\t}\n\t"],
      directives: []
    }), __metadata('design:paramtypes', [core_1.ElementRef])], InfiniteScroller);
    return InfiniteScroller;
  }());
  exports.InfiniteScroller = InfiniteScroller;
  exports.INFINITE_SCROLLER_PROVIDERS = [InfiniteScroller, ScrollItem];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/Dropdown/Dropdown", ["angular2/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var Dropdown = (function() {
    function Dropdown() {
      this.dropdownOpen = false;
    }
    Dropdown.prototype.toggleDropdown = function() {
      this.dropdownOpen = !this.dropdownOpen;
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], Dropdown.prototype, "label", void 0);
    Dropdown = __decorate([core_1.Component({
      selector: "dropdown",
      template: "\n      <div class=\"dropdown open\">\n        <button class=\"btn btn-secondary\" type=\"button\" \n          aria-haspopup=\"true\" aria-expanded=\"false\" (click)=\"toggleDropdown()\">\n          {{label}}\n        </button>\n        <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\"\n          *ngIf=\"dropdownOpen\" (click)=\"toggleDropdown()\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    "
    }), __metadata('design:paramtypes', [])], Dropdown);
    return Dropdown;
  }());
  exports.Dropdown = Dropdown;
  exports.DROPDOWN_COMPONENT_PROVIDERS = [Dropdown];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/Tab/Tab", ["angular2/core", "./TabSet"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var TabSet_1 = $__require('./TabSet');
  var Tab = (function() {
    function Tab(tabset) {
      this.activeChange = new core_1.EventEmitter(false);
      this.select = new core_1.EventEmitter(false);
      this.deselect = new core_1.EventEmitter(false);
      this.remove = new core_1.EventEmitter(false);
      this.addClass = true;
      this.tabset = tabset;
      this.tabset.addTab(this);
    }
    Object.defineProperty(Tab.prototype, "active", {
      get: function() {
        return this._active;
      },
      set: function(active) {
        var _this = this;
        if (this.disabled && active || !active) {
          if (this._active && this._active != active) {
            this.deselect.next(this);
          }
          if (!active) {
            this._active = active;
          }
          this.activeChange.next(this._active);
          return;
        }
        if (this._active != active) {
          this.select.next(this);
        }
        this._active = active;
        this.activeChange.next(this._active);
        this.tabset.tabs.forEach(function(tab) {
          if (tab !== _this) {
            tab.active = false;
            tab.activeChange.next(false);
          }
        });
      },
      enumerable: true,
      configurable: true
    });
    Tab.prototype.ngOnDestroy = function() {
      this.tabset.removeTab(this);
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], Tab.prototype, "heading", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Tab.prototype, "disabled", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Tab.prototype, "removable", void 0);
    __decorate([core_1.HostBinding('class.active'), core_1.Input(), __metadata('design:type', Boolean)], Tab.prototype, "active", null);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Tab.prototype, "activeChange", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Tab.prototype, "select", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Tab.prototype, "deselect", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Tab.prototype, "remove", void 0);
    __decorate([core_1.HostBinding('class.tab-pane'), __metadata('design:type', Boolean)], Tab.prototype, "addClass", void 0);
    Tab = __decorate([core_1.Directive({selector: 'tab, [tab]'}), __metadata('design:paramtypes', [TabSet_1.TabSet])], Tab);
    return Tab;
  }());
  exports.Tab = Tab;
  exports.TAB_PROVIDERS = [Tab, TabSet_1.TabSet];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/Tag/Tag", ["angular2/core", "./TagSet"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var TagSet_1 = $__require('./TagSet');
  var Tag = (function() {
    function Tag(tagset) {
      this.removable = false;
      this.remove = new core_1.EventEmitter(false);
      this.classMap = {};
      this.tagset = tagset;
      this.tagset.addTag(this);
    }
    Object.defineProperty(Tag.prototype, "pill", {
      get: function() {
        return this._pill;
      },
      set: function(value) {
        this._pill = value;
        this.setClassMap();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(Tag.prototype, "color", {
      get: function() {
        return this._color;
      },
      set: function(value) {
        this._color = value;
        this.setClassMap();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(Tag.prototype, "disabled", {
      get: function() {
        return this._disabled;
      },
      set: function(value) {
        this._disabled = value;
        this.setClassMap();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Tag.prototype.ngOnInit = function() {
      this.color = this.color !== 'undefined' ? this.color : 'default';
    };
    Tag.prototype.ngOnDestroy = function() {
      this.tagset.removeTag(this);
    };
    Tag.prototype.setClassMap = function() {
      this.classMap = (_a = {
        'disabled': this.disabled,
        'label-pill': this.pill
      }, _a['label-' + ((this.color && this.color.toLowerCase()) || 'default')] = true, _a);
      var _a;
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], Tag.prototype, "title", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object)], Tag.prototype, "value", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Tag.prototype, "removable", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Tag.prototype, "pill", null);
    __decorate([core_1.Input(), __metadata('design:type', String)], Tag.prototype, "color", null);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Tag.prototype, "disabled", null);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Tag.prototype, "remove", void 0);
    Tag = __decorate([core_1.Directive({selector: 'tag, [tag]'}), __metadata('design:paramtypes', [TagSet_1.TagSet])], Tag);
    return Tag;
  }());
  exports.Tag = Tag;
  exports.TAG_PROVIDERS = [Tag, TagSet_1.TagSet];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/TableSortable/TableSortable", ["angular2/core", "angular2/common", "../../pipes/OrderBy/OrderBy", "../../pipes/Format/Format", "./TableSortableSorting", "./TableSortableColumn"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var OrderBy_1 = $__require('../../pipes/OrderBy/OrderBy');
  var Format_1 = $__require('../../pipes/Format/Format');
  var TableSortableSorting_1 = $__require('./TableSortableSorting');
  var TableSortable = (function() {
    function TableSortable() {}
    TableSortable.prototype.selectedClass = function(columnName) {
      return columnName == this.sort.column ? 'sort-' + (this.sort.descending ? 'desc' : 'asc') : '';
    };
    TableSortable.prototype.changeSorting = function(columnName) {
      var sort = this.sort;
      if (sort.column == columnName) {
        sort.descending = !sort.descending;
      } else {
        sort.column = columnName;
        sort.descending = false;
      }
    };
    TableSortable.prototype.convertSorting = function() {
      return this.sort.descending ? '-' + this.sort.column : this.sort.column;
    };
    __decorate([core_1.Input(), __metadata('design:type', Array)], TableSortable.prototype, "columns", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array)], TableSortable.prototype, "data", void 0);
    __decorate([core_1.Input(), __metadata('design:type', TableSortableSorting_1.TableSortableSorting)], TableSortable.prototype, "sort", void 0);
    TableSortable = __decorate([core_1.Component({
      selector: 'table-sortable',
      template: "\n    <table class=\"table table-bordered table-hover table-striped table-sortable\">\n      <thead>\n        <tr>\n          <th *ngFor=\"#column of columns\" [class]=\"selectedClass(column.variable)\" (click)=\"changeSorting(column.variable)\">\n            {{column.display}}\n          </th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"#object of data | orderBy : convertSorting()\">\n          <td *ngFor=\"#column of columns\" [innerHtml]=\"object[column.variable] | format : column.filter\"></td>\n        </tr>\n      </tbody>\n    </table>\n  ",
      directives: [common_1.CORE_DIRECTIVES],
      pipes: [OrderBy_1.OrderByPipe, common_1.JsonPipe, Format_1.FormatPipe]
    }), __metadata('design:paramtypes', [])], TableSortable);
    return TableSortable;
  }());
  exports.TableSortable = TableSortable;
  exports.TABLESORTABLE_PROVIDERS = [TableSortable];
  var TableSortableColumn_1 = $__require('./TableSortableColumn');
  exports.TableSortableColumn = TableSortableColumn_1.TableSortableColumn;
  var TableSortableSorting_2 = $__require('./TableSortableSorting');
  exports.TableSortableSorting = TableSortableSorting_2.TableSortableSorting;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/Slider/NoUiSlider", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    (function(factory) {
      window.noUiSlider = factory();
    }(function() {
      'use strict';
      function unique(array) {
        return array.filter(function(a) {
          return !this[a] ? this[a] = true : false;
        }, {});
      }
      function closest(value, to) {
        return Math.round(value / to) * to;
      }
      function offset(elem) {
        var rect = elem.getBoundingClientRect(),
            doc = elem.ownerDocument,
            docElem = doc.documentElement,
            pageOffset = getPageOffset();
        if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
          pageOffset.x = 0;
        }
        return {
          top: rect.top + pageOffset.y - docElem.clientTop,
          left: rect.left + pageOffset.x - docElem.clientLeft
        };
      }
      function isNumeric(a) {
        return typeof a === 'number' && !isNaN(a) && isFinite(a);
      }
      function accurateNumber(number) {
        var p = Math.pow(10, 7);
        return Number((Math.round(number * p) / p).toFixed(7));
      }
      function addClassFor(element, className, duration) {
        addClass(element, className);
        setTimeout(function() {
          removeClass(element, className);
        }, duration);
      }
      function limit(a) {
        return Math.max(Math.min(a, 100), 0);
      }
      function asArray(a) {
        return Array.isArray(a) ? a : [a];
      }
      function countDecimals(numStr) {
        var pieces = numStr.split(".");
        return pieces.length > 1 ? pieces[1].length : 0;
      }
      function addClass(el, className) {
        if (!el)
          return;
        if (el.classList) {
          el.classList.add(className);
        } else {
          el.className += ' ' + className;
        }
      }
      function removeClass(el, className) {
        if (el.classList) {
          el.classList.remove(className);
        } else {
          el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      }
      function hasClass(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
      }
      function getPageOffset() {
        var supportPageOffset = window.pageXOffset !== undefined,
            isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"),
            x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
            y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
        return {
          x: x,
          y: y
        };
      }
      function stopPropagation(e) {
        e.stopPropagation();
      }
      function addCssPrefix(cssPrefix) {
        return function(className) {
          return cssPrefix + className;
        };
      }
      var actions = window.navigator.pointerEnabled ? {
        start: 'pointerdown',
        move: 'pointermove',
        end: 'pointerup'
      } : window.navigator.msPointerEnabled ? {
        start: 'MSPointerDown',
        move: 'MSPointerMove',
        end: 'MSPointerUp'
      } : {
        start: 'mousedown touchstart',
        move: 'mousemove touchmove',
        end: 'mouseup touchend'
      },
          defaultCssPrefix = 'noUi-';
      function subRangeRatio(pa, pb) {
        return (100 / (pb - pa));
      }
      function fromPercentage(range, value) {
        return (value * 100) / (range[1] - range[0]);
      }
      function toPercentage(range, value) {
        return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0]);
      }
      function isPercentage(range, value) {
        return ((value * (range[1] - range[0])) / 100) + range[0];
      }
      function getJ(value, arr) {
        var j = 1;
        while (value >= arr[j]) {
          j += 1;
        }
        return j;
      }
      function toStepping(xVal, xPct, value) {
        if (value >= xVal.slice(-1)[0]) {
          return 100;
        }
        var j = getJ(value, xVal),
            va,
            vb,
            pa,
            pb;
        va = xVal[j - 1];
        vb = xVal[j];
        pa = xPct[j - 1];
        pb = xPct[j];
        return pa + (toPercentage([va, vb], value) / subRangeRatio(pa, pb));
      }
      function fromStepping(xVal, xPct, value) {
        if (value >= 100) {
          return xVal.slice(-1)[0];
        }
        var j = getJ(value, xPct),
            va,
            vb,
            pa,
            pb;
        va = xVal[j - 1];
        vb = xVal[j];
        pa = xPct[j - 1];
        pb = xPct[j];
        return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
      }
      function getStep(xPct, xSteps, snap, value) {
        if (value === 100) {
          return value;
        }
        var j = getJ(value, xPct),
            a,
            b;
        if (snap) {
          a = xPct[j - 1];
          b = xPct[j];
          if ((value - a) > ((b - a) / 2)) {
            return b;
          }
          return a;
        }
        if (!xSteps[j - 1]) {
          return value;
        }
        return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
      }
      function handleEntryPoint(index, value, that) {
        var percentage;
        if (typeof value === "number") {
          value = [value];
        }
        if (Object.prototype.toString.call(value) !== '[object Array]') {
          throw new Error("noUiSlider: 'range' contains invalid value.");
        }
        if (index === 'min') {
          percentage = 0;
        } else if (index === 'max') {
          percentage = 100;
        } else {
          percentage = parseFloat(index);
        }
        if (!isNumeric(percentage) || !isNumeric(value[0])) {
          throw new Error("noUiSlider: 'range' value isn't numeric.");
        }
        that.xPct.push(percentage);
        that.xVal.push(value[0]);
        if (!percentage) {
          if (!isNaN(value[1])) {
            that.xSteps[0] = value[1];
          }
        } else {
          that.xSteps.push(isNaN(value[1]) ? false : value[1]);
        }
      }
      function handleStepPoint(i, n, that) {
        if (!n) {
          return true;
        }
        that.xSteps[i] = fromPercentage([that.xVal[i], that.xVal[i + 1]], n) / subRangeRatio(that.xPct[i], that.xPct[i + 1]);
      }
      function Spectrum(entry, snap, direction, singleStep) {
        this.xPct = [];
        this.xVal = [];
        this.xSteps = [singleStep || false];
        this.xNumSteps = [false];
        this.snap = snap;
        this.direction = direction;
        var index,
            ordered = [];
        for (index in entry) {
          if (entry.hasOwnProperty(index)) {
            ordered.push([entry[index], index]);
          }
        }
        if (ordered.length && typeof ordered[0][0] === "object") {
          ordered.sort(function(a, b) {
            return a[0][0] - b[0][0];
          });
        } else {
          ordered.sort(function(a, b) {
            return a[0] - b[0];
          });
        }
        for (index = 0; index < ordered.length; index++) {
          handleEntryPoint(ordered[index][1], ordered[index][0], this);
        }
        this.xNumSteps = this.xSteps.slice(0);
        for (index = 0; index < this.xNumSteps.length; index++) {
          handleStepPoint(index, this.xNumSteps[index], this);
        }
      }
      Spectrum.prototype.getMargin = function(value) {
        return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
      };
      Spectrum.prototype.toStepping = function(value) {
        value = toStepping(this.xVal, this.xPct, value);
        if (this.direction) {
          value = 100 - value;
        }
        return value;
      };
      Spectrum.prototype.fromStepping = function(value) {
        if (this.direction) {
          value = 100 - value;
        }
        return accurateNumber(fromStepping(this.xVal, this.xPct, value));
      };
      Spectrum.prototype.getStep = function(value) {
        if (this.direction) {
          value = 100 - value;
        }
        value = getStep(this.xPct, this.xSteps, this.snap, value);
        if (this.direction) {
          value = 100 - value;
        }
        return value;
      };
      Spectrum.prototype.getApplicableStep = function(value) {
        var j = getJ(value, this.xPct),
            offset = value === 100 ? 2 : 1;
        return [this.xNumSteps[j - 2], this.xVal[j - offset], this.xNumSteps[j - offset]];
      };
      Spectrum.prototype.convert = function(value) {
        return this.getStep(this.toStepping(value));
      };
      var defaultFormatter = {
        'to': function(value) {
          return value !== undefined && value.toFixed(2);
        },
        'from': Number
      };
      function testStep(parsed, entry) {
        if (!isNumeric(entry)) {
          throw new Error("noUiSlider: 'step' is not numeric.");
        }
        parsed.singleStep = entry;
      }
      function testRange(parsed, entry) {
        if (typeof entry !== 'object' || Array.isArray(entry)) {
          throw new Error("noUiSlider: 'range' is not an object.");
        }
        if (entry.min === undefined || entry.max === undefined) {
          throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
        }
        if (entry.min === entry.max) {
          throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
        }
        parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed.singleStep);
      }
      function testStart(parsed, entry) {
        entry = asArray(entry);
        if (!Array.isArray(entry) || !entry.length || entry.length > 2) {
          throw new Error("noUiSlider: 'start' option is incorrect.");
        }
        parsed.handles = entry.length;
        parsed.start = entry;
      }
      function testSnap(parsed, entry) {
        parsed.snap = entry;
        if (typeof entry !== 'boolean') {
          throw new Error("noUiSlider: 'snap' option must be a boolean.");
        }
      }
      function testAnimate(parsed, entry) {
        parsed.animate = entry;
        if (typeof entry !== 'boolean') {
          throw new Error("noUiSlider: 'animate' option must be a boolean.");
        }
      }
      function testConnect(parsed, entry) {
        if (entry === 'lower' && parsed.handles === 1) {
          parsed.connect = 1;
        } else if (entry === 'upper' && parsed.handles === 1) {
          parsed.connect = 2;
        } else if (entry === true && parsed.handles === 2) {
          parsed.connect = 3;
        } else if (entry === false) {
          parsed.connect = 0;
        } else {
          throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
        }
      }
      function testOrientation(parsed, entry) {
        switch (entry) {
          case 'horizontal':
            parsed.ort = 0;
            break;
          case 'vertical':
            parsed.ort = 1;
            break;
          default:
            throw new Error("noUiSlider: 'orientation' option is invalid.");
        }
      }
      function testMargin(parsed, entry) {
        if (!isNumeric(entry)) {
          throw new Error("noUiSlider: 'margin' option must be numeric.");
        }
        if (entry === 0) {
          return;
        }
        parsed.margin = parsed.spectrum.getMargin(entry);
        if (!parsed.margin) {
          throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.");
        }
      }
      function testLimit(parsed, entry) {
        if (!isNumeric(entry)) {
          throw new Error("noUiSlider: 'limit' option must be numeric.");
        }
        parsed.limit = parsed.spectrum.getMargin(entry);
        if (!parsed.limit) {
          throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.");
        }
      }
      function testDirection(parsed, entry) {
        switch (entry) {
          case 'ltr':
            parsed.dir = 0;
            break;
          case 'rtl':
            parsed.dir = 1;
            parsed.connect = [0, 2, 1, 3][parsed.connect];
            break;
          default:
            throw new Error("noUiSlider: 'direction' option was not recognized.");
        }
      }
      function testBehaviour(parsed, entry) {
        if (typeof entry !== 'string') {
          throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
        }
        var tap = entry.indexOf('tap') >= 0,
            drag = entry.indexOf('drag') >= 0,
            fixed = entry.indexOf('fixed') >= 0,
            snap = entry.indexOf('snap') >= 0,
            hover = entry.indexOf('hover') >= 0;
        if (drag && !parsed.connect) {
          throw new Error("noUiSlider: 'drag' behaviour must be used with 'connect': true.");
        }
        parsed.events = {
          tap: tap || snap,
          drag: drag,
          fixed: fixed,
          snap: snap,
          hover: hover
        };
      }
      function testTooltips(parsed, entry) {
        var i;
        if (entry === false) {
          return;
        } else if (entry === true) {
          parsed.tooltips = [];
          for (i = 0; i < parsed.handles; i++) {
            parsed.tooltips.push(true);
          }
        } else {
          parsed.tooltips = asArray(entry);
          if (parsed.tooltips.length !== parsed.handles) {
            throw new Error("noUiSlider: must pass a formatter for all handles.");
          }
          parsed.tooltips.forEach(function(formatter) {
            if (typeof formatter !== 'boolean' && (typeof formatter !== 'object' || typeof formatter.to !== 'function')) {
              throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
            }
          });
        }
      }
      function testFormat(parsed, entry) {
        parsed.format = entry;
        if (typeof entry.to === 'function' && typeof entry.from === 'function') {
          return true;
        }
        throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
      }
      function testCssPrefix(parsed, entry) {
        if (entry !== undefined && typeof entry !== 'string') {
          throw new Error("noUiSlider: 'cssPrefix' must be a string.");
        }
        parsed.cssPrefix = entry;
      }
      function testOptions(options) {
        var parsed = {
          margin: 0,
          limit: 0,
          animate: true,
          format: defaultFormatter
        },
            tests;
        tests = {
          'step': {
            r: false,
            t: testStep
          },
          'start': {
            r: true,
            t: testStart
          },
          'connect': {
            r: true,
            t: testConnect
          },
          'direction': {
            r: true,
            t: testDirection
          },
          'snap': {
            r: false,
            t: testSnap
          },
          'animate': {
            r: false,
            t: testAnimate
          },
          'range': {
            r: true,
            t: testRange
          },
          'orientation': {
            r: false,
            t: testOrientation
          },
          'margin': {
            r: false,
            t: testMargin
          },
          'limit': {
            r: false,
            t: testLimit
          },
          'behaviour': {
            r: true,
            t: testBehaviour
          },
          'format': {
            r: false,
            t: testFormat
          },
          'tooltips': {
            r: false,
            t: testTooltips
          },
          'cssPrefix': {
            r: false,
            t: testCssPrefix
          }
        };
        var defaults = {
          'connect': false,
          'direction': 'ltr',
          'behaviour': 'tap',
          'orientation': 'horizontal'
        };
        Object.keys(tests).forEach(function(name) {
          if (options[name] === undefined && defaults[name] === undefined) {
            if (tests[name].r) {
              throw new Error("noUiSlider: '" + name + "' is required.");
            }
            return true;
          }
          tests[name].t(parsed, options[name] === undefined ? defaults[name] : options[name]);
        });
        parsed.pips = options.pips;
        parsed.style = parsed.ort ? 'top' : 'left';
        return parsed;
      }
      function closure(target, options) {
        var scope_Target = target,
            scope_Locations = [-1, -1],
            scope_Base,
            scope_Handles,
            scope_Spectrum = options.spectrum,
            scope_Values = [],
            scope_Events = {},
            scope_Self;
        var cssClasses = ['target', 'base', 'origin', 'handle', 'horizontal', 'vertical', 'background', 'connect', 'ltr', 'rtl', 'draggable', '', 'state-drag', '', 'state-tap', 'active', '', 'stacking', 'tooltip', '', 'pips', 'marker', 'value'].map(addCssPrefix(options.cssPrefix || defaultCssPrefix));
        function getPositions(a, b, delimit) {
          var c = a + b[0],
              d = a + b[1];
          if (delimit) {
            if (c < 0) {
              d += Math.abs(c);
            }
            if (d > 100) {
              c -= (d - 100);
            }
            return [limit(c), limit(d)];
          }
          return [c, d];
        }
        function fixEvent(e, pageOffset) {
          e.preventDefault();
          var touch = e.type.indexOf('touch') === 0,
              mouse = e.type.indexOf('mouse') === 0,
              pointer = e.type.indexOf('pointer') === 0,
              x,
              y,
              event = e;
          if (e.type.indexOf('MSPointer') === 0) {
            pointer = true;
          }
          if (touch) {
            x = e.changedTouches[0].pageX;
            y = e.changedTouches[0].pageY;
          }
          pageOffset = pageOffset || getPageOffset();
          if (mouse || pointer) {
            x = e.clientX + pageOffset.x;
            y = e.clientY + pageOffset.y;
          }
          event.pageOffset = pageOffset;
          event.points = [x, y];
          event.cursor = mouse || pointer;
          return event;
        }
        function addHandle(direction, index) {
          var origin = document.createElement('div'),
              handle = document.createElement('div'),
              additions = ['-lower', '-upper'];
          if (direction) {
            additions.reverse();
          }
          addClass(handle, cssClasses[3]);
          addClass(handle, cssClasses[3] + additions[index]);
          addClass(origin, cssClasses[2]);
          origin.appendChild(handle);
          return origin;
        }
        function addConnection(connect, target, handles) {
          switch (connect) {
            case 1:
              addClass(target, cssClasses[7]);
              addClass(handles[0], cssClasses[6]);
              break;
            case 3:
              addClass(handles[1], cssClasses[6]);
            case 2:
              addClass(handles[0], cssClasses[7]);
            case 0:
              addClass(target, cssClasses[6]);
              break;
          }
        }
        function addHandles(nrHandles, direction, base) {
          var index,
              handles = [];
          for (index = 0; index < nrHandles; index += 1) {
            handles.push(base.appendChild(addHandle(direction, index)));
          }
          return handles;
        }
        function addSlider(direction, orientation, target) {
          addClass(target, cssClasses[0]);
          addClass(target, cssClasses[8 + direction]);
          addClass(target, cssClasses[4 + orientation]);
          var div = document.createElement('div');
          addClass(div, cssClasses[1]);
          target.appendChild(div);
          return div;
        }
        function addTooltip(handle, index) {
          if (!options.tooltips[index]) {
            return false;
          }
          var element = document.createElement('div');
          element.className = cssClasses[18];
          return handle.firstChild.appendChild(element);
        }
        function tooltips() {
          if (options.dir) {
            options.tooltips.reverse();
          }
          var tips = scope_Handles.map(addTooltip);
          if (options.dir) {
            tips.reverse();
            options.tooltips.reverse();
          }
          bindEvent('update', function(f, o, r) {
            if (tips[o]) {
              tips[o].innerHTML = options.tooltips[o] === true ? f[o] : options.tooltips[o].to(r[o]);
            }
          });
        }
        function getGroup(mode, values, stepped) {
          if (mode === 'range' || mode === 'steps') {
            return scope_Spectrum.xVal;
          }
          if (mode === 'count') {
            var spread = (100 / (values - 1)),
                v,
                i = 0;
            values = [];
            while ((v = i++ * spread) <= 100) {
              values.push(v);
            }
            mode = 'positions';
          }
          if (mode === 'positions') {
            return values.map(function(value) {
              return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
            });
          }
          if (mode === 'values') {
            if (stepped) {
              return values.map(function(value) {
                return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
              });
            }
            return values;
          }
        }
        function generateSpread(density, mode, group) {
          function safeIncrement(value, increment) {
            return (value + increment).toFixed(7) / 1;
          }
          var originalSpectrumDirection = scope_Spectrum.direction,
              indexes = {},
              firstInRange = scope_Spectrum.xVal[0],
              lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1],
              ignoreFirst = false,
              ignoreLast = false,
              prevPct = 0;
          scope_Spectrum.direction = 0;
          group = unique(group.slice().sort(function(a, b) {
            return a - b;
          }));
          if (group[0] !== firstInRange) {
            group.unshift(firstInRange);
            ignoreFirst = true;
          }
          if (group[group.length - 1] !== lastInRange) {
            group.push(lastInRange);
            ignoreLast = true;
          }
          group.forEach(function(current, index) {
            var step,
                i,
                q,
                low = current,
                high = group[index + 1],
                newPct,
                pctDifference,
                pctPos,
                type,
                steps,
                realSteps,
                stepsize;
            if (mode === 'steps') {
              step = scope_Spectrum.xNumSteps[index];
            }
            if (!step) {
              step = high - low;
            }
            if (low === false || high === undefined) {
              return;
            }
            for (i = low; i <= high; i = safeIncrement(i, step)) {
              newPct = scope_Spectrum.toStepping(i);
              pctDifference = newPct - prevPct;
              steps = pctDifference / density;
              realSteps = Math.round(steps);
              stepsize = pctDifference / realSteps;
              for (q = 1; q <= realSteps; q += 1) {
                pctPos = prevPct + (q * stepsize);
                indexes[pctPos.toFixed(5)] = ['x', 0];
              }
              type = (group.indexOf(i) > -1) ? 1 : (mode === 'steps' ? 2 : 0);
              if (!index && ignoreFirst) {
                type = 0;
              }
              if (!(i === high && ignoreLast)) {
                indexes[newPct.toFixed(5)] = [i, type];
              }
              prevPct = newPct;
            }
          });
          scope_Spectrum.direction = originalSpectrumDirection;
          return indexes;
        }
        function addMarking(spread, filterFunc, formatter) {
          var style = ['horizontal', 'vertical'][options.ort],
              element = document.createElement('div'),
              out = '';
          addClass(element, cssClasses[20]);
          addClass(element, cssClasses[20] + '-' + style);
          function getSize(type) {
            return ['-normal', '-large', '-sub'][type];
          }
          function getTags(offset, source, values) {
            return 'class="' + source + ' ' + source + '-' + style + ' ' + source + getSize(values[1]) + '" style="' + options.style + ': ' + offset + '%"';
          }
          function addSpread(offset, values) {
            if (scope_Spectrum.direction) {
              offset = 100 - offset;
            }
            values[1] = (values[1] && filterFunc) ? filterFunc(values[0], values[1]) : values[1];
            out += '<div ' + getTags(offset, cssClasses[21], values) + '></div>';
            if (values[1]) {
              out += '<div ' + getTags(offset, cssClasses[22], values) + '>' + formatter.to(values[0]) + '</div>';
            }
          }
          Object.keys(spread).forEach(function(a) {
            addSpread(a, spread[a]);
          });
          element.innerHTML = out;
          return element;
        }
        function pips(grid) {
          var mode = grid.mode,
              density = grid.density || 1,
              filter = grid.filter || false,
              values = grid.values || false,
              stepped = grid.stepped || false,
              group = getGroup(mode, values, stepped),
              spread = generateSpread(density, mode, group),
              format = grid.format || {to: Math.round};
          return scope_Target.appendChild(addMarking(spread, filter, format));
        }
        function baseSize() {
          var rect = scope_Base.getBoundingClientRect(),
              alt = 'offset' + ['Width', 'Height'][options.ort];
          return options.ort === 0 ? (rect.width || scope_Base[alt]) : (rect.height || scope_Base[alt]);
        }
        function fireEvent(event, handleNumber, tap) {
          if (handleNumber !== undefined && options.handles !== 1) {
            handleNumber = Math.abs(handleNumber - options.dir);
          }
          Object.keys(scope_Events).forEach(function(targetEvent) {
            var eventType = targetEvent.split('.')[0];
            if (event === eventType) {
              scope_Events[targetEvent].forEach(function(callback) {
                callback.call(scope_Self, asArray(valueGet()), handleNumber, asArray(inSliderOrder(Array.prototype.slice.call(scope_Values))), tap || false, scope_Locations);
              });
            }
          });
        }
        function inSliderOrder(values) {
          if (values.length === 1) {
            return values[0];
          }
          if (options.dir) {
            return values.reverse();
          }
          return values;
        }
        function attach(events, element, callback, data) {
          var method = function(e) {
            if (scope_Target.hasAttribute('disabled')) {
              return false;
            }
            if (hasClass(scope_Target, cssClasses[14])) {
              return false;
            }
            e = fixEvent(e, data.pageOffset);
            if (events === actions.start && e.buttons !== undefined && e.buttons > 1) {
              return false;
            }
            if (data.hover && e.buttons) {
              return false;
            }
            e.calcPoint = e.points[options.ort];
            callback(e, data);
          },
              methods = [];
          events.split(' ').forEach(function(eventName) {
            if (element) {
              element.addEventListener(eventName, method, false);
              methods.push([eventName, method]);
            }
          });
          return methods;
        }
        function move(event, data) {
          if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) {
            return end(event, data);
          }
          var handles = data.handles || scope_Handles,
              positions,
              state = false,
              proposal = ((event.calcPoint - data.start) * 100) / data.baseSize,
              handleNumber = handles[0] === scope_Handles[0] ? 0 : 1,
              i;
          positions = getPositions(proposal, data.positions, handles.length > 1);
          state = setHandle(handles[0], positions[handleNumber], handles.length === 1);
          if (handles.length > 1) {
            state = setHandle(handles[1], positions[handleNumber ? 0 : 1], false) || state;
            if (state) {
              for (i = 0; i < data.handles.length; i++) {
                fireEvent('slide', i);
              }
            }
          } else if (state) {
            fireEvent('slide', handleNumber);
          }
        }
        function end(event, data) {
          var active = scope_Base.querySelector('.' + cssClasses[15]),
              handleNumber = data.handles[0] === scope_Handles[0] ? 0 : 1;
          if (active !== null) {
            removeClass(active, cssClasses[15]);
          }
          if (event.cursor) {
            document.body.style.cursor = '';
            document.body.removeEventListener('selectstart', document.body.noUiListener);
          }
          var d = document.documentElement;
          d.noUiListeners.forEach(function(c) {
            d.removeEventListener(c[0], c[1]);
          });
          removeClass(scope_Target, cssClasses[12]);
          fireEvent('set', handleNumber);
          fireEvent('change', handleNumber);
          if (data.handleNumber !== undefined) {
            fireEvent('end', data.handleNumber);
          }
        }
        function documentLeave(event, data) {
          if (event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null) {
            end(event, data);
          }
        }
        function start(event, data) {
          var d = document.documentElement;
          if (data.handles.length === 1) {
            addClass(data.handles[0].children[0], cssClasses[15]);
            if (data.handles[0].hasAttribute('disabled')) {
              return false;
            }
          }
          event.preventDefault();
          event.stopPropagation();
          var moveEvent = attach(actions.move, d, move, {
            start: event.calcPoint,
            baseSize: baseSize(),
            pageOffset: event.pageOffset,
            handles: data.handles,
            handleNumber: data.handleNumber,
            buttonsProperty: event.buttons,
            positions: [scope_Locations[0], scope_Locations[scope_Handles.length - 1]]
          }),
              endEvent = attach(actions.end, d, end, {
                handles: data.handles,
                handleNumber: data.handleNumber
              });
          var outEvent = attach("mouseout", d, documentLeave, {
            handles: data.handles,
            handleNumber: data.handleNumber
          });
          d.noUiListeners = moveEvent.concat(endEvent, outEvent);
          if (event.cursor) {
            document.body.style.cursor = getComputedStyle(event.target).cursor;
            if (scope_Handles.length > 1) {
              addClass(scope_Target, cssClasses[12]);
            }
            var f = function() {
              return false;
            };
            document.body.noUiListener = f;
            document.body.addEventListener('selectstart', f, false);
          }
          if (data.handleNumber !== undefined) {
            fireEvent('start', data.handleNumber);
          }
        }
        function tap(event) {
          var location = event.calcPoint,
              total = 0,
              handleNumber,
              to;
          event.stopPropagation();
          scope_Handles.forEach(function(a) {
            total += offset(a)[options.style];
          });
          handleNumber = (location < total / 2 || scope_Handles.length === 1) ? 0 : 1;
          if (scope_Handles[handleNumber].hasAttribute('disabled')) {
            handleNumber = handleNumber ? 0 : 1;
          }
          location -= offset(scope_Base)[options.style];
          to = (location * 100) / baseSize();
          if (!options.events.snap) {
            addClassFor(scope_Target, cssClasses[14], 300);
          }
          if (scope_Handles[handleNumber].hasAttribute('disabled')) {
            return false;
          }
          setHandle(scope_Handles[handleNumber], to);
          fireEvent('slide', handleNumber, true);
          fireEvent('set', handleNumber, true);
          fireEvent('change', handleNumber, true);
          if (options.events.snap) {
            start(event, {handles: [scope_Handles[handleNumber]]});
          }
        }
        function hover(event) {
          var location = event.calcPoint - offset(scope_Base)[options.style],
              to = scope_Spectrum.getStep((location * 100) / baseSize()),
              value = scope_Spectrum.fromStepping(to);
          Object.keys(scope_Events).forEach(function(targetEvent) {
            if ('hover' === targetEvent.split('.')[0]) {
              scope_Events[targetEvent].forEach(function(callback) {
                callback.call(scope_Self, value);
              });
            }
          });
        }
        function events(behaviour) {
          var i,
              drag;
          if (!behaviour.fixed) {
            for (i = 0; i < scope_Handles.length; i += 1) {
              attach(actions.start, scope_Handles[i].children[0], start, {
                handles: [scope_Handles[i]],
                handleNumber: i
              });
            }
          }
          if (behaviour.tap) {
            attach(actions.start, scope_Base, tap, {handles: scope_Handles});
          }
          if (behaviour.hover) {
            attach(actions.move, scope_Base, hover, {hover: true});
            for (i = 0; i < scope_Handles.length; i += 1) {
              ['mousemove MSPointerMove pointermove'].forEach(function(eventName) {
                scope_Handles[i].children[0].addEventListener(eventName, stopPropagation, false);
              });
            }
          }
          if (behaviour.drag) {
            drag = [scope_Base.querySelector('.' + cssClasses[7])];
            addClass(drag[0], cssClasses[10]);
            if (behaviour.fixed) {
              drag.push(scope_Handles[(drag[0] === scope_Handles[0] ? 1 : 0)].children[0]);
            }
            drag.forEach(function(element) {
              attach(actions.start, element, start, {handles: scope_Handles});
            });
          }
        }
        function setHandle(handle, to, noLimitOption) {
          var trigger = handle !== scope_Handles[0] ? 1 : 0,
              lowerMargin = scope_Locations[0] + options.margin,
              upperMargin = scope_Locations[1] - options.margin,
              lowerLimit = scope_Locations[0] + options.limit,
              upperLimit = scope_Locations[1] - options.limit;
          if (scope_Handles.length > 1) {
            to = trigger ? Math.max(to, lowerMargin) : Math.min(to, upperMargin);
          }
          if (noLimitOption !== false && options.limit && scope_Handles.length > 1) {
            to = trigger ? Math.min(to, lowerLimit) : Math.max(to, upperLimit);
          }
          to = scope_Spectrum.getStep(to);
          to = limit(parseFloat(to.toFixed(7)));
          if (to === scope_Locations[trigger]) {
            return false;
          }
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(function() {
              handle.style[options.style] = to + '%';
            });
          } else {
            handle.style[options.style] = to + '%';
          }
          if (!handle.previousSibling) {
            removeClass(handle, cssClasses[17]);
            if (to > 50) {
              addClass(handle, cssClasses[17]);
            }
          }
          scope_Locations[trigger] = to;
          scope_Values[trigger] = scope_Spectrum.fromStepping(to);
          fireEvent('update', trigger);
          return true;
        }
        function setValues(count, values) {
          var i,
              trigger,
              to;
          if (options.limit) {
            count += 1;
          }
          for (i = 0; i < count; i += 1) {
            trigger = i % 2;
            to = values[trigger];
            if (to !== null && to !== false) {
              if (typeof to === 'number') {
                to = String(to);
              }
              to = options.format.from(to);
              if (to === false || isNaN(to) || setHandle(scope_Handles[trigger], scope_Spectrum.toStepping(to), i === (3 - options.dir)) === false) {
                fireEvent('update', trigger);
              }
            }
          }
        }
        function valueSet(input) {
          var count,
              values = asArray(input),
              i;
          if (options.dir && options.handles > 1) {
            values.reverse();
          }
          if (options.animate && scope_Locations[0] !== -1) {
            addClassFor(scope_Target, cssClasses[14], 300);
          }
          count = scope_Handles.length > 1 ? 3 : 1;
          if (values.length === 1) {
            count = 1;
          }
          setValues(count, values);
          for (i = 0; i < scope_Handles.length; i++) {
            if (values[i] !== null) {
              fireEvent('set', i);
            }
          }
        }
        function valueGet() {
          var i,
              retour = [];
          for (i = 0; i < options.handles; i += 1) {
            retour[i] = options.format.to(scope_Values[i]);
          }
          return inSliderOrder(retour);
        }
        function destroy() {
          cssClasses.forEach(function(cls) {
            if (!cls) {
              return;
            }
            removeClass(scope_Target, cls);
          });
          while (scope_Target.firstChild) {
            scope_Target.removeChild(scope_Target.firstChild);
          }
          delete scope_Target.noUiSlider;
        }
        function getCurrentStep() {
          var retour = scope_Locations.map(function(location, index) {
            var step = scope_Spectrum.getApplicableStep(location),
                stepDecimals = countDecimals(String(step[2])),
                value = scope_Values[index],
                increment = location === 100 ? null : step[2],
                prev = Number((value - step[2]).toFixed(stepDecimals)),
                decrement = location === 0 ? null : (prev >= step[1]) ? step[2] : (step[0] || false);
            return [decrement, increment];
          });
          return inSliderOrder(retour);
        }
        function bindEvent(namespacedEvent, callback) {
          scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
          scope_Events[namespacedEvent].push(callback);
          if (namespacedEvent.split('.')[0] === 'update') {
            scope_Handles.forEach(function(a, index) {
              fireEvent('update', index);
            });
          }
        }
        function removeEvent(namespacedEvent) {
          var event = namespacedEvent.split('.')[0],
              namespace = namespacedEvent.substring(event.length);
          Object.keys(scope_Events).forEach(function(bind) {
            var tEvent = bind.split('.')[0],
                tNamespace = bind.substring(tEvent.length);
            if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
              delete scope_Events[bind];
            }
          });
        }
        function updateOptions(optionsToUpdate) {
          var v = valueGet(),
              i,
              newOptions = testOptions({
                start: [0, 0],
                margin: optionsToUpdate.margin,
                limit: optionsToUpdate.limit,
                step: optionsToUpdate.step,
                range: optionsToUpdate.range,
                animate: optionsToUpdate.animate,
                snap: optionsToUpdate.snap === undefined ? options.snap : optionsToUpdate.snap
              });
          ['margin', 'limit', 'step', 'range', 'animate'].forEach(function(name) {
            if (optionsToUpdate[name] !== undefined) {
              options[name] = optionsToUpdate[name];
            }
          });
          newOptions.spectrum.direction = scope_Spectrum.direction;
          scope_Spectrum = newOptions.spectrum;
          scope_Locations = [-1, -1];
          valueSet(v);
          for (i = 0; i < scope_Handles.length; i++) {
            fireEvent('update', i);
          }
        }
        if (scope_Target.noUiSlider) {
          throw new Error('Slider was already initialized.');
        }
        scope_Base = addSlider(options.dir, options.ort, scope_Target);
        scope_Handles = addHandles(options.handles, options.dir, scope_Base);
        addConnection(options.connect, scope_Target, scope_Handles);
        if (options.pips) {
          pips(options.pips);
        }
        if (options.tooltips) {
          tooltips();
        }
        scope_Self = {
          destroy: destroy,
          steps: getCurrentStep,
          on: bindEvent,
          off: removeEvent,
          get: valueGet,
          set: valueSet,
          updateOptions: updateOptions,
          options: options,
          target: scope_Target,
          pips: pips
        };
        events(options.events);
        return scope_Self;
      }
      function initialize(target, originalOptions) {
        if (!target.nodeName) {
          throw new Error('noUiSlider.create requires a single element.');
        }
        var options = testOptions(originalOptions, target),
            slider = closure(target, options);
        slider.set(options.start);
        target.noUiSlider = slider;
        return slider;
      }
      return {create: initialize};
    }));
  })();
  return _retrieveGlobal();
});

System.registerDynamic("fuel-ui/dist/components/Slider/Slider", ["angular2/core", "./NoUiSlider"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  $__require('./NoUiSlider');
  var Slider = (function() {
    function Slider(_element) {
      this._element = _element;
      this.background = "#E24932";
      this.height = "";
      this.width = "";
      this.orientation = "horizontal";
      this.direction = "ltr";
      this.behavior = "tap";
      this.pips = 5;
      this.pipDensity = 5;
      this.step = 1;
      this.decimals = 0;
      this.minValue = 0;
      this.maxValue = 100;
      this.margin = 10;
      this.value = 0;
      this.secondValue = null;
      this.valueChange = new core_1.EventEmitter();
      this.secondValueChange = new core_1.EventEmitter();
    }
    Slider.prototype.ngAfterViewInit = function() {
      var _this = this;
      this._sliderElement = this._element.nativeElement.children[0];
      if (this.orientation == 'vertical')
        this._sliderElement.style.height = this.height.length > 0 ? this.height : "200px";
      if (this.orientation == 'horizontal')
        this._sliderElement.style.width = this.width.length > 0 ? this.width : null;
      this._slider = noUiSlider.create(this._sliderElement, {
        start: this.secondValue != null ? [this.value, this.secondValue] : this.value,
        step: parseInt(this.step.toString()),
        margin: this.margin,
        connect: this.secondValue != null ? true : 'lower',
        direction: this.direction,
        orientation: this.orientation,
        behaviour: this.behavior,
        range: {
          'min': parseInt(this.minValue.toString()),
          'max': parseInt(this.maxValue.toString())
        },
        pips: {
          mode: 'count',
          values: this.pips,
          density: this.pipDensity
        },
        format: {
          to: function(value) {
            return parseFloat(value).toFixed(_this.decimals);
          },
          from: function(value) {
            return parseFloat(value).toFixed(_this.decimals);
          }
        }
      });
      if (!this._element.nativeElement.disabled) {
        var noUI = this._element.nativeElement.getElementsByClassName('noUi-connect');
        [].slice.call(noUI).forEach(function(el) {
          el.style.background = _this.background;
        });
      }
      this._sliderElement.noUiSlider.on('slide', function(val) {
        _this.value = val[0];
        _this.secondValue = val.length > 1 ? val[1] : null;
        _this.valueChange.next(val[0]);
        _this.secondValueChange.next(_this.secondValue);
      });
    };
    Slider.prototype.ngOnChanges = function(changes) {
      if (this._sliderElement && typeof changes.value !== 'undefined')
        this._sliderElement.noUiSlider.set([changes.value.currentValue, this.secondValue]);
      if (this._sliderElement && typeof changes.secondValue !== 'undefined')
        this._sliderElement.noUiSlider.set([this.value, changes.secondValue.currentValue]);
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], Slider.prototype, "background", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Slider.prototype, "height", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Slider.prototype, "width", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Slider.prototype, "orientation", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Slider.prototype, "direction", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Slider.prototype, "behavior", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Slider.prototype, "pips", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Slider.prototype, "pipDensity", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Slider.prototype, "step", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Slider.prototype, "decimals", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Slider.prototype, "minValue", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Slider.prototype, "maxValue", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Slider.prototype, "margin", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Slider.prototype, "value", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Slider.prototype, "secondValue", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], Slider.prototype, "valueChange", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], Slider.prototype, "secondValueChange", void 0);
    Slider = __decorate([core_1.Component({
      selector: "slider",
      template: "\n\n      <div class=\"slider\"></div>\n    "
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Slider);
    return Slider;
  }());
  exports.Slider = Slider;
  exports.SLIDER_COMPONENT_PROVIDERS = [Slider];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/Tab/TabSet", ["angular2/core", "angular2/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var TabSet = (function() {
    function TabSet() {
      this.tabs = [];
      this.classMap = {};
    }
    Object.defineProperty(TabSet.prototype, "vertical", {
      get: function() {
        return this._vertical;
      },
      set: function(value) {
        this._vertical = value;
        this.setClassMap();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(TabSet.prototype, "type", {
      get: function() {
        return this._type;
      },
      set: function(value) {
        this._type = value;
        this.setClassMap();
      },
      enumerable: true,
      configurable: true
    });
    ;
    TabSet.prototype.ngOnInit = function() {
      this.type = this.type !== 'undefined' ? this.type : 'tabs';
    };
    TabSet.prototype.ngOnDestroy = function() {
      this.isDestroyed = true;
    };
    TabSet.prototype.addTab = function(tab) {
      this.tabs.push(tab);
      tab.active = this.tabs.length === 1 && tab.active !== false;
    };
    TabSet.prototype.removeTab = function(tab) {
      var index = this.tabs.indexOf(tab);
      if (index === -1 || this.isDestroyed) {
        return;
      }
      if (tab.active && this.hasAvailableTabs(index)) {
        var newActiveIndex = this.getClosestTabIndex(index);
        this.tabs[newActiveIndex].active = true;
      }
      tab.remove.next(tab);
      this.tabs.splice(index, 1);
    };
    TabSet.prototype.getClosestTabIndex = function(index) {
      var tabsLength = this.tabs.length;
      if (!tabsLength) {
        return -1;
      }
      for (var step = 1; step <= tabsLength; step += 1) {
        var prevIndex = index - step;
        var nextIndex = index + step;
        if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
          return prevIndex;
        }
        if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
          return nextIndex;
        }
      }
      return -1;
    };
    TabSet.prototype.hasAvailableTabs = function(index) {
      var tabsLength = this.tabs.length;
      if (!tabsLength) {
        return false;
      }
      for (var i = 0; i < tabsLength; i += 1) {
        if (!this.tabs[i].disabled && i !== index) {
          return true;
        }
      }
      return false;
    };
    TabSet.prototype.setClassMap = function() {
      this.classMap = (_a = {'nav-stacked': this.vertical}, _a['nav-' + (this.type || 'tabs')] = true, _a);
      var _a;
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TabSet.prototype, "vertical", null);
    __decorate([core_1.Input(), __metadata('design:type', String)], TabSet.prototype, "type", null);
    TabSet = __decorate([core_1.Component({
      selector: 'tabset',
      directives: [common_1.NgClass],
      template: "\n    <ul class=\"nav\" [ngClass]=\"classMap\" (click)=\"$event.preventDefault()\">\n        <li *ngFor=\"#tab of tabs\" class=\"nav-item\"\n          [class.active]=\"tab.active\" [class.disabled]=\"tab.disabled\">\n          <a href class=\"nav-link\"\n            [class.active]=\"tab.active\" [class.disabled]=\"tab.disabled\"\n            (click)=\"tab.active = true\">\n            <span [innerHtml]=\"tab.heading\"></span>\n            <span *ngIf=\"tab.removable\" (click)=\"$event.preventDefault(); removeTab(tab);\">\n              <i class=\"fa fa-remove\"></i>\n            </span>\n          </a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n      <ng-content></ng-content>\n    </div>\n  "
    }), __metadata('design:paramtypes', [])], TabSet);
    return TabSet;
  }());
  exports.TabSet = TabSet;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/TableSortable/TableSortableColumn", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var TableSortableColumn = (function() {
    function TableSortableColumn(display, variable, filter) {
      this.display = display;
      this.variable = variable;
      this.filter = filter;
    }
    return TableSortableColumn;
  }());
  exports.TableSortableColumn = TableSortableColumn;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/TableSortable/TableSortableSorting", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var TableSortableSorting = (function() {
    function TableSortableSorting(column, descending) {
      this.column = column;
      this.descending = descending;
    }
    return TableSortableSorting;
  }());
  exports.TableSortableSorting = TableSortableSorting;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/Tag/TagSet", ["angular2/core", "angular2/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var TagSet = (function() {
    function TagSet() {
      this.tags = [];
    }
    TagSet.prototype.ngOnDestroy = function() {
      this.isDestroyed = true;
    };
    TagSet.prototype.addTag = function(tag) {
      this.tags.push(tag);
    };
    TagSet.prototype.removeTag = function(tag) {
      var index = this.tags.indexOf(tag);
      if (index === -1 || this.isDestroyed || tag.disabled) {
        return;
      }
      tag.remove.next(tag);
      this.tags.splice(index, 1);
    };
    __decorate([core_1.Input(), __metadata('design:type', Array)], TagSet.prototype, "tags", void 0);
    TagSet = __decorate([core_1.Component({
      selector: 'tagset',
      directives: [common_1.NgClass],
      template: "\n    <span *ngFor=\"#tag of tags\" class=\"label fuel-ui-label\" [ngClass]=\"tag.classMap\">\n        <span [innerHtml]=\"tag.title\"></span>\n        <span class=\"fuel-ui-clickable\" [class.disabled]=\"tag.disabled\" *ngIf=\"tag.removable\" (click)=\"$event.preventDefault(); removeTag(tag);\">\n            <i class=\"fa fa-remove\"></i>\n        </span>\n    </span>\n  "
    }), __metadata('design:paramtypes', [])], TagSet);
    return TagSet;
  }());
  exports.TagSet = TagSet;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/components/components", ["./Alert/Alert", "./Carousel/Carousel", "./DatePicker/DatePickerProviders", "./Modal/Modal", "./Pagination/Pagination", "./InfiniteScroller/InfiniteScroller", "./Dropdown/Dropdown", "./Tab/Tab", "./Tag/Tag", "./TableSortable/TableSortable", "./Slider/Slider", "./Tab/TabSet", "./TableSortable/TableSortableColumn", "./TableSortable/TableSortableSorting", "./Tag/TagSet"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var Alert_1 = $__require('./Alert/Alert');
  var Carousel_1 = $__require('./Carousel/Carousel');
  var DatePickerProviders_1 = $__require('./DatePicker/DatePickerProviders');
  var Modal_1 = $__require('./Modal/Modal');
  var Pagination_1 = $__require('./Pagination/Pagination');
  var InfiniteScroller_1 = $__require('./InfiniteScroller/InfiniteScroller');
  var Dropdown_1 = $__require('./Dropdown/Dropdown');
  var Tab_1 = $__require('./Tab/Tab');
  var Tag_1 = $__require('./Tag/Tag');
  var TableSortable_1 = $__require('./TableSortable/TableSortable');
  var Slider_1 = $__require('./Slider/Slider');
  exports.FUELUI_COMPONENT_PROVIDERS = [Alert_1.ALERT_PROVIDERS, Carousel_1.CAROUSEL_PROVIDERS, DatePickerProviders_1.DATE_PICKER_PROVIDERS, Modal_1.MODAL_PROVIDERS, Pagination_1.PAGINATION_PROVIDERS, InfiniteScroller_1.INFINITE_SCROLLER_PROVIDERS, Dropdown_1.DROPDOWN_COMPONENT_PROVIDERS, TableSortable_1.TABLESORTABLE_PROVIDERS, Slider_1.SLIDER_COMPONENT_PROVIDERS, Tab_1.TAB_PROVIDERS, Tag_1.TAG_PROVIDERS];
  __export($__require('./Alert/Alert'));
  __export($__require('./Carousel/Carousel'));
  __export($__require('./DatePicker/DatePickerProviders'));
  __export($__require('./Modal/Modal'));
  __export($__require('./Pagination/Pagination'));
  __export($__require('./InfiniteScroller/InfiniteScroller'));
  __export($__require('./Dropdown/Dropdown'));
  __export($__require('./Tab/Tab'));
  __export($__require('./Tab/TabSet'));
  __export($__require('./TableSortable/TableSortable'));
  __export($__require('./TableSortable/TableSortableColumn'));
  __export($__require('./TableSortable/TableSortableSorting'));
  __export($__require('./Tag/Tag'));
  __export($__require('./Tag/TagSet'));
  __export($__require('./Slider/Slider'));
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/directives/Animation/Animation", ["angular2/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var Animation = (function() {
    function Animation(element) {
      this.onAnimationStart = new core_1.EventEmitter();
      this.onAnimationEnd = new core_1.EventEmitter();
      this.animationClasses = '';
      this.play = false;
      this.id = '';
      this.group = '';
      this._animationQueue = [];
      this._callbacks = [];
      this.element = element.nativeElement;
    }
    Animation.prototype.ngOnChanges = function() {
      this.setup();
    };
    Animation.prototype.ngOnInit = function() {
      this.setup();
    };
    Animation.prototype.addAnimation = function(animationClasses) {
      var _this = this;
      animationClasses.split(' ').map(function(c) {
        return _this._animationQueue.push(c);
      });
      this.animationClasses += " " + animationClasses;
      return this;
    };
    Animation.prototype.setup = function() {
      this._animationQueue = this.animationClasses.split(" ").filter(function(c) {
        return c.length > 0;
      });
      if (this.play && this._animationQueue.length > 0)
        this.startAnimation();
      return this;
    };
    Animation.prototype.startAnimation = function(callback) {
      var _this = this;
      if (callback === void 0) {
        callback = null;
      }
      if (callback != null)
        this._callbacks.push(callback);
      this._animationQueue.shift().split('.').filter(function(c) {
        return c.length > 0;
      }).map(function(c) {
        return _this.element.classList.add(c);
      });
      return this;
    };
    Animation.prototype.cleanAnimation = function() {
      var _this = this;
      this.animationClasses.replace('.', ' ').split(' ').filter(function(c) {
        return c.length > 0;
      }).map(function(c) {
        _this.element.classList.remove(c);
      });
      return this;
    };
    Animation.prototype.animationStarted = function(event) {
      this.onAnimationStart.next(null);
    };
    Animation.prototype.animationEnded = function(event) {
      this.cleanAnimation();
      if (this._animationQueue.length > 0) {
        this.startAnimation();
        return;
      }
      while (this._callbacks.length > 0)
        this._callbacks.shift()();
      this.onAnimationEnd.next(null);
    };
    __decorate([core_1.Output(), __metadata('design:type', Object)], Animation.prototype, "onAnimationStart", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], Animation.prototype, "onAnimationEnd", void 0);
    __decorate([core_1.Input('animation'), __metadata('design:type', String)], Animation.prototype, "animationClasses", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Animation.prototype, "play", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Animation.prototype, "id", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Animation.prototype, "group", void 0);
    Animation = __decorate([core_1.Directive({
      selector: '[animation]',
      host: {
        '(animationstart)': 'animationStarted($event)',
        '(webkitAnimationStart)': 'animationStarted($event)',
        '(oanimationstart)': 'animationStarted($event)',
        '(MSAnimationStart)': 'animationStarted($event)',
        '(animationend)': 'animationEnded($event)',
        '(webkitAnimationEnd)': 'animationEnded($event)',
        '(oanimationend)': 'animationEnded($event)',
        '(MSAnimationEnd)': 'animationEnded($event)'
      }
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Animation);
    return Animation;
  }());
  exports.Animation = Animation;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/directives/Tooltip/Tooltip", ["angular2/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var Tooltip = (function() {
    function Tooltip(el) {
      this._el = el.nativeElement;
    }
    Tooltip.prototype.getElement = function() {
      return this._el;
    };
    Tooltip.prototype.show = function() {
      this.hide();
      var html = "\n        <div class=\"tooltip top customFadeIn\" role=\"tooltip\">\n          <div class=\"tooltip-arrow\"></div>\n          <div class=\"tooltip-inner\">\n          " + this.text + "\n          </div>\n        </div>\n        ";
      var newEl = document.createElement('div');
      newEl.setAttribute('role', 'tooltip');
      newEl.className = 'tooltip top customFadeIn';
      newEl.innerHTML = "\n        <div class=\"tooltip-arrow\"></div>\n          <div class=\"tooltip-inner\">\n          " + this.text + "\n          </div>";
      newEl.style.visibility = "hidden";
      this.getElement().appendChild(newEl);
      var bodyRect = document.body.getBoundingClientRect(),
          elemRect = this.getElement().getBoundingClientRect(),
          offset = (elemRect.top - bodyRect.top) - newEl.offsetHeight;
      this.hide();
      newEl.style.visibility = "";
      newEl.style.top = offset + 'px';
      newEl.style.left = elemRect.left + 'px';
      this.getElement().appendChild(newEl);
    };
    Tooltip.prototype.hide = function() {
      var tooltips = this.getElement().getElementsByClassName('tooltip');
      for (var i = 0; i < tooltips.length; i++) {
        tooltips[i].remove();
      }
    };
    Tooltip = __decorate([core_1.Directive({
      selector: '[tooltip]',
      properties: ['text: tooltip'],
      host: {
        '(mouseover)': 'show()',
        '(mouseout)': 'hide()',
        '(focus)': 'show()',
        '(unfocus)': 'hide()'
      }
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Tooltip);
    return Tooltip;
  }());
  exports.Tooltip = Tooltip;
  exports.TOOLTIP_PROVIDERS = [Tooltip];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/directives/CodeHighlighter/CodeHighlighter", ["angular2/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var CodeHighlighter = (function() {
    function CodeHighlighter(el) {
      this.el = el;
      if (this.el && this.el.nativeElement) {
        Prism.highlightElement(this.el.nativeElement);
      }
    }
    CodeHighlighter = __decorate([core_1.Directive({selector: '[code-highlight]'}), __metadata('design:paramtypes', [core_1.ElementRef])], CodeHighlighter);
    return CodeHighlighter;
  }());
  exports.CodeHighlighter = CodeHighlighter;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/directives/Collapse/Collapse", ["angular2/core", "angular2/src/animate/animation_builder"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var animation_builder_1 = $__require('angular2/src/animate/animation_builder');
  var Collapse = (function() {
    function Collapse(animationBuilder, element) {
      this.element = element;
      this.duration = 500;
      this.collapse = false;
      this._animation = animationBuilder.css();
    }
    Object.defineProperty(Collapse.prototype, "_elementHeight", {
      get: function() {
        var el = this.element.nativeElement;
        var height = el.offsetHeight;
        var style = getComputedStyle(el);
        return height += parseInt(style.marginTop) + parseInt(style.marginBottom);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Collapse.prototype, "_baseSequence", {
      get: function() {
        return this._animation.setDuration(this.duration).removeClass('fuel-ui-collapse').removeClass('in').addAnimationClass('fuel-ui-collapsing');
      },
      enumerable: true,
      configurable: true
    });
    Collapse.prototype.ngOnChanges = function(changes) {
      if (!changes.collapse || typeof changes.collapse.previousValue !== 'boolean')
        return;
      return this.collapse ? this.hide() : this.show();
    };
    Collapse.prototype.hide = function() {
      this._baseSequence.setFromStyles({
        height: this.element.nativeElement.scrollHeight + 'px',
        overflow: 'hidden'
      }).setToStyles({
        height: '0',
        paddingTop: '0',
        paddingBottom: '0'
      });
      var a = this._animation.start(this.element.nativeElement);
      a.onComplete(function() {
        a.removeClasses(['in']);
        a.addClasses(['fuel-ui-collapse']);
      });
    };
    Collapse.prototype.show = function() {
      var _this = this;
      this._animation.setDuration(0).addClass('in').setFromStyles({overflow: 'hidden'}).setToStyles({
        paddingTop: '',
        paddingBottom: ''
      }).start(this.element.nativeElement).onComplete(function() {
        var a = _this._baseSequence.setFromStyles({height: '0'}).setToStyles({height: _this.element.nativeElement.scrollHeight + 'px'}).start(_this.element.nativeElement);
        a.onComplete(function() {
          return a.addClasses(['fuel-ui-collapse', 'in']);
        });
      });
    };
    __decorate([core_1.Input(), __metadata('design:type', Number)], Collapse.prototype, "duration", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Collapse.prototype, "collapse", void 0);
    Collapse = __decorate([core_1.Directive({
      selector: '[collapse]',
      host: {
        '[attr.aria-expanded]': '!collapse',
        '[attr.aria-hidden]': 'collapse'
      }
    }), __metadata('design:paramtypes', [animation_builder_1.AnimationBuilder, core_1.ElementRef])], Collapse);
    return Collapse;
  }());
  exports.Collapse = Collapse;
  exports.COLLAPSE_PROVIDERS = [Collapse];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/directives/directives", ["./Animation/Animation", "./Tooltip/Tooltip", "./CodeHighlighter/CodeHighlighter", "./Collapse/Collapse"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var Animation_1 = $__require('./Animation/Animation');
  var Tooltip_1 = $__require('./Tooltip/Tooltip');
  var CodeHighlighter_1 = $__require('./CodeHighlighter/CodeHighlighter');
  var Collapse_1 = $__require('./Collapse/Collapse');
  exports.FUELUI_DIRECTIVE_PROVIDERS = [Tooltip_1.TOOLTIP_PROVIDERS, Animation_1.Animation, CodeHighlighter_1.CodeHighlighter, Collapse_1.Collapse];
  __export($__require('./Animation/Animation'));
  __export($__require('./Tooltip/Tooltip'));
  __export($__require('./CodeHighlighter/CodeHighlighter'));
  __export($__require('./Collapse/Collapse'));
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/pipes/Format/Format", ["angular2/core", "angular2/common", "../../utilities/StringUtils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var common_1 = $__require('angular2/common');
  var StringUtils_1 = $__require('../../utilities/StringUtils');
  var FormatPipe = (function() {
    function FormatPipe() {
      this.datePipe = new common_1.DatePipe();
      this.decimalPipe = new common_1.DecimalPipe();
    }
    FormatPipe.prototype.transform = function(input, args) {
      var format = '';
      var parsedFloat = 0;
      var pipeArgs = args[0].split(':');
      for (var i = 0; i < pipeArgs.length; i++) {
        pipeArgs[i] = pipeArgs[i].trim(' ');
      }
      if (pipeArgs[0].toLowerCase() !== 'html')
        input = StringUtils_1.StringHelper.escapeHtml(input);
      switch (pipeArgs[0].toLowerCase()) {
        case 'text':
          return input;
        case 'decimal':
        case 'number':
          parsedFloat = !isNaN(parseFloat(input)) ? parseFloat(input) : 0;
          format = pipeArgs.length > 1 ? pipeArgs[1] : null;
          return this.decimalPipe.transform(parsedFloat, [format]);
        case 'percentage':
          parsedFloat = !isNaN(parseFloat(input)) ? parseFloat(input) : 0;
          format = pipeArgs.length > 1 ? pipeArgs[1] : null;
          return this.decimalPipe.transform(parsedFloat, [format]) + '%';
        case 'date':
        case 'datetime':
          var date = !isNaN(parseInt(input)) ? parseInt(input) : new Date(input);
          format = 'MMM d, y h:mm:ss a';
          if (pipeArgs.length > 1) {
            format = '';
            for (var i = 1; i < pipeArgs.length; i++) {
              format += pipeArgs[i];
            }
          }
          return this.datePipe.transform(date, [format]);
        default:
          return input;
      }
    };
    FormatPipe = __decorate([core_1.Pipe({name: 'format'}), __metadata('design:paramtypes', [])], FormatPipe);
    return FormatPipe;
  }());
  exports.FormatPipe = FormatPipe;
  exports.FORMAT_PROVIDERS = [FormatPipe];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/pipes/MapToIterable/MapToIterable", ["angular2/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var MapToIterablePipe = (function() {
    function MapToIterablePipe() {}
    MapToIterablePipe.prototype.transform = function(dict, args) {
      if (args === void 0) {
        args = [];
      }
      var a = [];
      for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
          a.push({
            key: key,
            val: dict[key]
          });
        }
      }
      return a;
    };
    MapToIterablePipe = __decorate([core_1.Pipe({name: 'mapToIterable'}), __metadata('design:paramtypes', [])], MapToIterablePipe);
    return MapToIterablePipe;
  }());
  exports.MapToIterablePipe = MapToIterablePipe;
  exports.MAPTOITERABLE_PROVIDERS = [MapToIterablePipe];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/pipes/OrderBy/OrderBy", ["angular2/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var OrderByPipe = (function() {
    function OrderByPipe() {
      this.value = [];
    }
    OrderByPipe._orderByComparator = function(a, b) {
      if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
        if (a.toLowerCase() < b.toLowerCase())
          return -1;
        if (a.toLowerCase() > b.toLowerCase())
          return 1;
      } else {
        if (parseFloat(a) < parseFloat(b))
          return -1;
        if (parseFloat(a) > parseFloat(b))
          return 1;
      }
      return 0;
    };
    OrderByPipe.prototype.transform = function(input, _a) {
      var _b = _a[0],
          config = _b === void 0 ? '+' : _b;
      this.value = input.slice();
      var value = this.value;
      if (!Array.isArray(value))
        return value;
      if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
        var propertyToCheck = !Array.isArray(config) ? config : config[0];
        var desc = propertyToCheck.substr(0, 1) == '-';
        if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
          return !desc ? value.sort() : value.sort().reverse();
        } else {
          var property = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-' ? propertyToCheck.substr(1) : propertyToCheck;
          return value.sort(function(a, b) {
            return !desc ? OrderByPipe._orderByComparator(a[property], b[property]) : -OrderByPipe._orderByComparator(a[property], b[property]);
          });
        }
      } else {
        return value.sort(function(a, b) {
          for (var i = 0; i < config.length; i++) {
            var desc = config[i].substr(0, 1) == '-';
            var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-' ? config[i].substr(1) : config[i];
            var comparison = !desc ? OrderByPipe._orderByComparator(a[property], b[property]) : -OrderByPipe._orderByComparator(a[property], b[property]);
            if (comparison != 0)
              return comparison;
          }
          return 0;
        });
      }
    };
    OrderByPipe = __decorate([core_1.Pipe({
      name: 'orderBy',
      pure: false
    }), __metadata('design:paramtypes', [])], OrderByPipe);
    return OrderByPipe;
  }());
  exports.OrderByPipe = OrderByPipe;
  exports.ORDERBY_PROVIDERS = [OrderByPipe];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/pipes/Range/Range", ["angular2/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var RangePipe = (function() {
    function RangePipe() {}
    RangePipe.prototype.transform = function(value, config) {
      if (config === void 0) {
        config = [0, 4, 1];
      }
      var newValue = [];
      var min = !isNaN(parseInt(config[0])) ? parseInt(config[0]) : 0;
      var max = !isNaN(parseInt(config[1])) ? parseInt(config[1]) : 4;
      var step = !isNaN(parseInt(config[2])) ? parseInt(config[2]) : 1;
      for (var i = min; i <= max; i += step)
        newValue.push(i);
      return newValue;
    };
    RangePipe = __decorate([core_1.Pipe({
      name: 'range',
      pure: false
    }), __metadata('design:paramtypes', [])], RangePipe);
    return RangePipe;
  }());
  exports.RangePipe = RangePipe;
  exports.RANGE_PROVIDERS = [RangePipe];
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/pipes/pipes", ["./Format/Format", "./MapToIterable/MapToIterable", "./OrderBy/OrderBy", "./Range/Range"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var Format_1 = $__require('./Format/Format');
  var MapToIterable_1 = $__require('./MapToIterable/MapToIterable');
  var OrderBy_1 = $__require('./OrderBy/OrderBy');
  var Range_1 = $__require('./Range/Range');
  exports.FUELUI_PIPE_PROVIDERS = [Format_1.FORMAT_PROVIDERS, MapToIterable_1.MAPTOITERABLE_PROVIDERS, OrderBy_1.ORDERBY_PROVIDERS, Range_1.RANGE_PROVIDERS];
  __export($__require('./Format/Format'));
  __export($__require('./MapToIterable/MapToIterable'));
  __export($__require('./OrderBy/OrderBy'));
  __export($__require('./Range/Range'));
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/utilities/DateUtils", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var DateRange = (function() {
    function DateRange(start, end) {
      this.start = start;
      this.end = end;
    }
    DateRange.prototype.containsDate = function(date) {
      return date >= this.start && date <= this.end;
    };
    DateRange.prototype.numberOfNights = function() {
      return Math.ceil(Math.abs(this.start.getTime() - this.end.getTime()) / (1000 * 3600 * 24));
    };
    DateRange.prototype.dateArray = function() {
      if (this.end < this.start)
        return [];
      var dateArr = [];
      var currDate = new Date(this.start.toDateString());
      while (currDate <= this.end) {
        dateArr.push(currDate);
        currDate = new Date(currDate.getTime() + 24 * 60 * 60 * 1000);
      }
      return dateArr;
    };
    DateRange.prototype.weekArray = function() {
      if (this.end < this.start)
        return [];
      var weekArr = [];
      var currDate = new Date(this.start.toDateString());
      while (currDate <= this.end) {
        var dateArr = [];
        var dowNumber = currDate.getDay();
        do {
          dateArr.push(currDate);
          ++dowNumber;
          currDate = new Date(currDate.toDateString());
          currDate.setDate(currDate.getDate() + 1);
        } while (currDate <= this.end && dowNumber < 7);
        weekArr.push(dateArr);
      }
      return weekArr;
    };
    return DateRange;
  }());
  exports.DateRange = DateRange;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/utilities/DetectionUtils", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var MobileDetection = (function() {
    function MobileDetection() {}
    MobileDetection.isAndroid = function() {
      return navigator.userAgent.match(/Android/i) != null;
    };
    MobileDetection.isBlackBerry = function() {
      return navigator.userAgent.match(/BlackBerry/i) != null;
    };
    MobileDetection.isIOS = function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i) != null;
    };
    MobileDetection.isOpera = function() {
      return navigator.userAgent.match(/Opera Mini/i) != null;
    };
    MobileDetection.isWindows = function() {
      return navigator.userAgent.match(/IEMobile|WPDesktop/i) != null;
    };
    MobileDetection.isAny = function() {
      return (this.isAndroid() || this.isBlackBerry() || this.isIOS() || this.isOpera() || this.isWindows());
    };
    return MobileDetection;
  }());
  exports.MobileDetection = MobileDetection;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/utilities/AnimationUtils", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var AnimationUtils = (function() {
    function AnimationUtils() {}
    AnimationUtils.easeInOutQuart = function(time, beginning, change, duration) {
      if ((time /= duration / 2) < 1)
        return change / 2 * time * time * time * time + beginning;
      return -change / 2 * ((time -= 2) * time * time * time - 2) + beginning;
    };
    return AnimationUtils;
  }());
  exports.AnimationUtils = AnimationUtils;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/utilities/ElementUtils", ["./AnimationUtils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var AnimationUtils_1 = $__require('./AnimationUtils');
  var ElementUtils = (function() {
    function ElementUtils() {}
    ElementUtils.outerHeight = function(el) {
      var height = el.clientHeight;
      var style = getComputedStyle(el);
      height += parseInt(style.marginTop) + parseInt(style.marginBottom);
      height += parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
      return height;
    };
    ElementUtils.outerWidth = function(el) {
      var width = el.clientWidth;
      var style = getComputedStyle(el);
      width += parseInt(style.marginLeft) + parseInt(style.marginRight);
      width += parseInt(style.borderLeftWidth) + parseInt(style.borderRightWidth);
      return width;
    };
    ElementUtils.scrollTo = function(element, to, duration) {
      if (duration <= 0)
        return;
      var startTime = new Date().getTime();
      var from = element.scrollTop;
      var timer = setInterval(function() {
        var time = new Date().getTime() - startTime;
        var scrollTo = AnimationUtils_1.AnimationUtils.easeInOutQuart(time, from, to - from, duration);
        element.scrollTop = scrollTo;
        if (time >= duration) {
          element.scrollTop = to;
          clearInterval(timer);
        }
      }, 1000 / 60);
    };
    return ElementUtils;
  }());
  exports.ElementUtils = ElementUtils;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/utilities/StringUtils", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var StringHelper = (function() {
    function StringHelper() {}
    StringHelper.escapeHtml = function(html) {
      var that = this;
      return String(html).replace(/[<>"'\/]/g, function(s) {
        return that.entityMap[s];
      });
    };
    StringHelper.entityMap = {
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&apos;',
      "/": '&#x2F;'
    };
    return StringHelper;
  }());
  exports.StringHelper = StringHelper;
  return module.exports;
});

System.registerDynamic("fuel-ui/dist/utilities/utilities", ["./DateUtils", "./DetectionUtils", "./ElementUtils", "./StringUtils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('./DateUtils'));
  __export($__require('./DetectionUtils'));
  __export($__require('./ElementUtils'));
  __export($__require('./StringUtils'));
  return module.exports;
});

System.registerDynamic("fuel-ui/fuel-ui", ["./dist/components/components", "./dist/directives/directives", "./dist/pipes/pipes", "./dist/utilities/utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('./dist/components/components'));
  __export($__require('./dist/directives/directives'));
  __export($__require('./dist/pipes/pipes'));
  __export($__require('./dist/utilities/utilities'));
  return module.exports;
});
