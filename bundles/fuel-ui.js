System.registerDynamic("bin/components/Alert/Alert.js", ["node_modules/angular2/core.js", "node_modules/angular2/common.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var common_1 = $__require('node_modules/angular2/common.js');
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/components/Carousel/Carousel.js", ["node_modules/angular2/core.js", "node_modules/angular2/common.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var core_2 = $__require('node_modules/angular2/core.js');
  var common_1 = $__require('node_modules/angular2/common.js');
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/Utilities/DetectionUtils.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/components/DatePicker/DatePicker.js", ["node_modules/angular2/core.js", "node_modules/angular2/common.js", "bin/components/DatePicker/DatePickerCalendar.js", "bin/components/InfiniteScroller/InfiniteScroller.js", "bin/Utilities/DetectionUtils.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var core_2 = $__require('node_modules/angular2/core.js');
  var common_1 = $__require('node_modules/angular2/common.js');
  var DatePickerCalendar_1 = $__require('bin/components/DatePicker/DatePickerCalendar.js');
  var InfiniteScroller_1 = $__require('bin/components/InfiniteScroller/InfiniteScroller.js');
  var DetectionUtils_1 = $__require('bin/Utilities/DetectionUtils.js');
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
      directives: [DatePickerCalendar_1.DatePickerCalendar, InfiniteScroller_1.INFINITE_SCROLLER_PROVIDERS, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
    }), __metadata('design:paramtypes', [core_2.ElementRef])], DatePicker);
    return DatePicker;
  }());
  exports.DatePicker = DatePicker;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/components/DatePicker/DatePickerCalendar.js", ["node_modules/angular2/core.js", "node_modules/angular2/common.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var core_2 = $__require('node_modules/angular2/core.js');
  var common_1 = $__require('node_modules/angular2/common.js');
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/components/DatePicker/DateRangePicker.js", ["node_modules/angular2/core.js", "node_modules/angular2/common.js", "bin/utilities/DateUtils.js", "bin/utilities/DetectionUtils.js", "bin/components/DatePicker/DatePicker.js", "bin/components/DatePicker/DatePickerCalendar.js", "bin/components/InfiniteScroller/InfiniteScroller.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var core_2 = $__require('node_modules/angular2/core.js');
  var common_1 = $__require('node_modules/angular2/common.js');
  var DateUtils_1 = $__require('bin/utilities/DateUtils.js');
  var DetectionUtils_1 = $__require('bin/utilities/DetectionUtils.js');
  var DatePicker_1 = $__require('bin/components/DatePicker/DatePicker.js');
  var DatePickerCalendar_1 = $__require('bin/components/DatePicker/DatePickerCalendar.js');
  var InfiniteScroller_1 = $__require('bin/components/InfiniteScroller/InfiniteScroller.js');
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
      if (value instanceof DateUtils_1.DateRange)
        return value;
      else
        throw "DateRangePicker error: input is not of type DateRange";
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
      directives: [DatePickerCalendar_1.DatePickerCalendar, InfiniteScroller_1.INFINITE_SCROLLER_PROVIDERS, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
    }), __metadata('design:paramtypes', [core_2.ElementRef])], DateRangePicker);
    return DateRangePicker;
  }(DatePicker_1.DatePicker));
  exports.DateRangePicker = DateRangePicker;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/components/DatePicker/DatePickerProviders.js", ["bin/components/DatePicker/DatePickerCalendar.js", "bin/components/DatePicker/DatePicker.js", "bin/components/DatePicker/DateRangePicker.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var DatePickerCalendar_1 = $__require('bin/components/DatePicker/DatePickerCalendar.js');
  exports.DatePickerCalendar = DatePickerCalendar_1.DatePickerCalendar;
  var DatePicker_1 = $__require('bin/components/DatePicker/DatePicker.js');
  exports.DatePicker = DatePicker_1.DatePicker;
  var DateRangePicker_1 = $__require('bin/components/DatePicker/DateRangePicker.js');
  exports.DateRangePicker = DateRangePicker_1.DateRangePicker;
  var DatePickerCalendar_2 = $__require('bin/components/DatePicker/DatePickerCalendar.js');
  var DatePicker_2 = $__require('bin/components/DatePicker/DatePicker.js');
  var DateRangePicker_2 = $__require('bin/components/DatePicker/DateRangePicker.js');
  exports.DATE_PICKER_PROVIDERS = [DatePickerCalendar_2.DatePickerCalendar, DatePicker_2.DatePicker, DateRangePicker_2.DateRangePicker];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/components/Modal/Modal.js", ["node_modules/angular2/core.js", "node_modules/angular2/common.js", "bin/directives/Animation/AnimationListener.js", "bin/pipes/Range/Range.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var common_1 = $__require('node_modules/angular2/common.js');
  var AnimationListener_1 = $__require('bin/directives/Animation/AnimationListener.js');
  var Range_1 = $__require('bin/pipes/Range/Range.js');
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
      directives: [common_1.CORE_DIRECTIVES, AnimationListener_1.AnimationListener],
      pipes: [Range_1.Range]
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Modal);
    return Modal;
  }());
  exports.Modal = Modal;
  exports.MODAL_PROVIDERS = [Modal];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/pipes/async_pipe.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/async.js", "node_modules/angular2/core.js", "node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var invalid_pipe_argument_exception_1 = $__require('node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js');
  var ObservableStrategy = (function() {
    function ObservableStrategy() {}
    ObservableStrategy.prototype.createSubscription = function(async, updateLatestValue) {
      return async_1.ObservableWrapper.subscribe(async, updateLatestValue, function(e) {
        throw e;
      });
    };
    ObservableStrategy.prototype.dispose = function(subscription) {
      async_1.ObservableWrapper.dispose(subscription);
    };
    ObservableStrategy.prototype.onDestroy = function(subscription) {
      async_1.ObservableWrapper.dispose(subscription);
    };
    return ObservableStrategy;
  })();
  var PromiseStrategy = (function() {
    function PromiseStrategy() {}
    PromiseStrategy.prototype.createSubscription = function(async, updateLatestValue) {
      return async.then(updateLatestValue);
    };
    PromiseStrategy.prototype.dispose = function(subscription) {};
    PromiseStrategy.prototype.onDestroy = function(subscription) {};
    return PromiseStrategy;
  })();
  var _promiseStrategy = new PromiseStrategy();
  var _observableStrategy = new ObservableStrategy();
  var __unused;
  var AsyncPipe = (function() {
    function AsyncPipe(_ref) {
      this._latestValue = null;
      this._latestReturnedValue = null;
      this._subscription = null;
      this._obj = null;
      this._strategy = null;
      this._ref = _ref;
    }
    AsyncPipe.prototype.ngOnDestroy = function() {
      if (lang_1.isPresent(this._subscription)) {
        this._dispose();
      }
    };
    AsyncPipe.prototype.transform = function(obj, args) {
      if (lang_1.isBlank(this._obj)) {
        if (lang_1.isPresent(obj)) {
          this._subscribe(obj);
        }
        this._latestReturnedValue = this._latestValue;
        return this._latestValue;
      }
      if (obj !== this._obj) {
        this._dispose();
        return this.transform(obj);
      }
      if (this._latestValue === this._latestReturnedValue) {
        return this._latestReturnedValue;
      } else {
        this._latestReturnedValue = this._latestValue;
        return core_1.WrappedValue.wrap(this._latestValue);
      }
    };
    AsyncPipe.prototype._subscribe = function(obj) {
      var _this = this;
      this._obj = obj;
      this._strategy = this._selectStrategy(obj);
      this._subscription = this._strategy.createSubscription(obj, function(value) {
        return _this._updateLatestValue(obj, value);
      });
    };
    AsyncPipe.prototype._selectStrategy = function(obj) {
      if (lang_1.isPromise(obj)) {
        return _promiseStrategy;
      } else if (async_1.ObservableWrapper.isObservable(obj)) {
        return _observableStrategy;
      } else {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(AsyncPipe, obj);
      }
    };
    AsyncPipe.prototype._dispose = function() {
      this._strategy.dispose(this._subscription);
      this._latestValue = null;
      this._latestReturnedValue = null;
      this._subscription = null;
      this._obj = null;
    };
    AsyncPipe.prototype._updateLatestValue = function(async, value) {
      if (async === this._obj) {
        this._latestValue = value;
        this._ref.markForCheck();
      }
    };
    AsyncPipe = __decorate([core_1.Pipe({
      name: 'async',
      pure: false
    }), core_1.Injectable(), __metadata('design:paramtypes', [core_1.ChangeDetectorRef])], AsyncPipe);
    return AsyncPipe;
  })();
  exports.AsyncPipe = AsyncPipe;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/pipes/uppercase_pipe.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/core.js", "node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var invalid_pipe_argument_exception_1 = $__require('node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js');
  var UpperCasePipe = (function() {
    function UpperCasePipe() {}
    UpperCasePipe.prototype.transform = function(value, args) {
      if (args === void 0) {
        args = null;
      }
      if (lang_1.isBlank(value))
        return value;
      if (!lang_1.isString(value)) {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(UpperCasePipe, value);
      }
      return value.toUpperCase();
    };
    UpperCasePipe = __decorate([lang_1.CONST(), core_1.Pipe({name: 'uppercase'}), core_1.Injectable(), __metadata('design:paramtypes', [])], UpperCasePipe);
    return UpperCasePipe;
  })();
  exports.UpperCasePipe = UpperCasePipe;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/pipes/lowercase_pipe.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/core.js", "node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var invalid_pipe_argument_exception_1 = $__require('node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js');
  var LowerCasePipe = (function() {
    function LowerCasePipe() {}
    LowerCasePipe.prototype.transform = function(value, args) {
      if (args === void 0) {
        args = null;
      }
      if (lang_1.isBlank(value))
        return value;
      if (!lang_1.isString(value)) {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(LowerCasePipe, value);
      }
      return value.toLowerCase();
    };
    LowerCasePipe = __decorate([lang_1.CONST(), core_1.Pipe({name: 'lowercase'}), core_1.Injectable(), __metadata('design:paramtypes', [])], LowerCasePipe);
    return LowerCasePipe;
  })();
  exports.LowerCasePipe = LowerCasePipe;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/pipes/json_pipe.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/core.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var JsonPipe = (function() {
    function JsonPipe() {}
    JsonPipe.prototype.transform = function(value, args) {
      if (args === void 0) {
        args = null;
      }
      return lang_1.Json.stringify(value);
    };
    JsonPipe = __decorate([lang_1.CONST(), core_1.Pipe({
      name: 'json',
      pure: false
    }), core_1.Injectable(), __metadata('design:paramtypes', [])], JsonPipe);
    return JsonPipe;
  })();
  exports.JsonPipe = JsonPipe;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/pipes/slice_pipe.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/core.js", "node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var invalid_pipe_argument_exception_1 = $__require('node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js');
  var SlicePipe = (function() {
    function SlicePipe() {}
    SlicePipe.prototype.transform = function(value, args) {
      if (args === void 0) {
        args = null;
      }
      if (lang_1.isBlank(args) || args.length == 0) {
        throw new exceptions_1.BaseException('Slice pipe requires one argument');
      }
      if (!this.supports(value)) {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(SlicePipe, value);
      }
      if (lang_1.isBlank(value))
        return value;
      var start = args[0];
      var end = args.length > 1 ? args[1] : null;
      if (lang_1.isString(value)) {
        return lang_1.StringWrapper.slice(value, start, end);
      }
      return collection_1.ListWrapper.slice(value, start, end);
    };
    SlicePipe.prototype.supports = function(obj) {
      return lang_1.isString(obj) || lang_1.isArray(obj);
    };
    SlicePipe = __decorate([core_1.Pipe({
      name: 'slice',
      pure: false
    }), core_1.Injectable(), __metadata('design:paramtypes', [])], SlicePipe);
    return SlicePipe;
  })();
  exports.SlicePipe = SlicePipe;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/pipes/date_pipe.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/intl.js", "node_modules/angular2/core.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var intl_1 = $__require('node_modules/angular2/src/facade/intl.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var invalid_pipe_argument_exception_1 = $__require('node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js');
  var defaultLocale = 'en-US';
  var DatePipe = (function() {
    function DatePipe() {}
    DatePipe.prototype.transform = function(value, args) {
      if (lang_1.isBlank(value))
        return null;
      if (!this.supports(value)) {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(DatePipe, value);
      }
      var pattern = lang_1.isPresent(args) && args.length > 0 ? args[0] : 'mediumDate';
      if (lang_1.isNumber(value)) {
        value = lang_1.DateWrapper.fromMillis(value);
      }
      if (collection_1.StringMapWrapper.contains(DatePipe._ALIASES, pattern)) {
        pattern = collection_1.StringMapWrapper.get(DatePipe._ALIASES, pattern);
      }
      return intl_1.DateFormatter.format(value, defaultLocale, pattern);
    };
    DatePipe.prototype.supports = function(obj) {
      return lang_1.isDate(obj) || lang_1.isNumber(obj);
    };
    DatePipe._ALIASES = {
      'medium': 'yMMMdjms',
      'short': 'yMdjm',
      'fullDate': 'yMMMMEEEEd',
      'longDate': 'yMMMMd',
      'mediumDate': 'yMMMd',
      'shortDate': 'yMd',
      'mediumTime': 'jms',
      'shortTime': 'jm'
    };
    DatePipe = __decorate([lang_1.CONST(), core_1.Pipe({
      name: 'date',
      pure: true
    }), core_1.Injectable(), __metadata('design:paramtypes', [])], DatePipe);
    return DatePipe;
  })();
  exports.DatePipe = DatePipe;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/facade/intl.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(NumberFormatStyle) {
    NumberFormatStyle[NumberFormatStyle["Decimal"] = 0] = "Decimal";
    NumberFormatStyle[NumberFormatStyle["Percent"] = 1] = "Percent";
    NumberFormatStyle[NumberFormatStyle["Currency"] = 2] = "Currency";
  })(exports.NumberFormatStyle || (exports.NumberFormatStyle = {}));
  var NumberFormatStyle = exports.NumberFormatStyle;
  var NumberFormatter = (function() {
    function NumberFormatter() {}
    NumberFormatter.format = function(num, locale, style, _a) {
      var _b = _a === void 0 ? {} : _a,
          _c = _b.minimumIntegerDigits,
          minimumIntegerDigits = _c === void 0 ? 1 : _c,
          _d = _b.minimumFractionDigits,
          minimumFractionDigits = _d === void 0 ? 0 : _d,
          _e = _b.maximumFractionDigits,
          maximumFractionDigits = _e === void 0 ? 3 : _e,
          currency = _b.currency,
          _f = _b.currencyAsSymbol,
          currencyAsSymbol = _f === void 0 ? false : _f;
      var intlOptions = {
        minimumIntegerDigits: minimumIntegerDigits,
        minimumFractionDigits: minimumFractionDigits,
        maximumFractionDigits: maximumFractionDigits
      };
      intlOptions.style = NumberFormatStyle[style].toLowerCase();
      if (style == NumberFormatStyle.Currency) {
        intlOptions.currency = currency;
        intlOptions.currencyDisplay = currencyAsSymbol ? 'symbol' : 'code';
      }
      return new Intl.NumberFormat(locale, intlOptions).format(num);
    };
    return NumberFormatter;
  })();
  exports.NumberFormatter = NumberFormatter;
  function digitCondition(len) {
    return len == 2 ? '2-digit' : 'numeric';
  }
  function nameCondition(len) {
    return len < 4 ? 'short' : 'long';
  }
  function extractComponents(pattern) {
    var ret = {};
    var i = 0,
        j;
    while (i < pattern.length) {
      j = i;
      while (j < pattern.length && pattern[j] == pattern[i])
        j++;
      var len = j - i;
      switch (pattern[i]) {
        case 'G':
          ret.era = nameCondition(len);
          break;
        case 'y':
          ret.year = digitCondition(len);
          break;
        case 'M':
          if (len >= 3)
            ret.month = nameCondition(len);
          else
            ret.month = digitCondition(len);
          break;
        case 'd':
          ret.day = digitCondition(len);
          break;
        case 'E':
          ret.weekday = nameCondition(len);
          break;
        case 'j':
          ret.hour = digitCondition(len);
          break;
        case 'h':
          ret.hour = digitCondition(len);
          ret.hour12 = true;
          break;
        case 'H':
          ret.hour = digitCondition(len);
          ret.hour12 = false;
          break;
        case 'm':
          ret.minute = digitCondition(len);
          break;
        case 's':
          ret.second = digitCondition(len);
          break;
        case 'z':
          ret.timeZoneName = 'long';
          break;
        case 'Z':
          ret.timeZoneName = 'short';
          break;
      }
      i = j;
    }
    return ret;
  }
  var dateFormatterCache = new Map();
  var DateFormatter = (function() {
    function DateFormatter() {}
    DateFormatter.format = function(date, locale, pattern) {
      var key = locale + pattern;
      if (dateFormatterCache.has(key)) {
        return dateFormatterCache.get(key).format(date);
      }
      var formatter = new Intl.DateTimeFormat(locale, extractComponents(pattern));
      dateFormatterCache.set(key, formatter);
      return formatter.format(date);
    };
    return DateFormatter;
  })();
  exports.DateFormatter = DateFormatter;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/pipes/number_pipe.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/intl.js", "node_modules/angular2/core.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var intl_1 = $__require('node_modules/angular2/src/facade/intl.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var invalid_pipe_argument_exception_1 = $__require('node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js');
  var defaultLocale = 'en-US';
  var _re = lang_1.RegExpWrapper.create('^(\\d+)?\\.((\\d+)(\\-(\\d+))?)?$');
  var NumberPipe = (function() {
    function NumberPipe() {}
    NumberPipe._format = function(value, style, digits, currency, currencyAsSymbol) {
      if (currency === void 0) {
        currency = null;
      }
      if (currencyAsSymbol === void 0) {
        currencyAsSymbol = false;
      }
      if (lang_1.isBlank(value))
        return null;
      if (!lang_1.isNumber(value)) {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(NumberPipe, value);
      }
      var minInt = 1,
          minFraction = 0,
          maxFraction = 3;
      if (lang_1.isPresent(digits)) {
        var parts = lang_1.RegExpWrapper.firstMatch(_re, digits);
        if (lang_1.isBlank(parts)) {
          throw new exceptions_1.BaseException(digits + " is not a valid digit info for number pipes");
        }
        if (lang_1.isPresent(parts[1])) {
          minInt = lang_1.NumberWrapper.parseIntAutoRadix(parts[1]);
        }
        if (lang_1.isPresent(parts[3])) {
          minFraction = lang_1.NumberWrapper.parseIntAutoRadix(parts[3]);
        }
        if (lang_1.isPresent(parts[5])) {
          maxFraction = lang_1.NumberWrapper.parseIntAutoRadix(parts[5]);
        }
      }
      return intl_1.NumberFormatter.format(value, defaultLocale, style, {
        minimumIntegerDigits: minInt,
        minimumFractionDigits: minFraction,
        maximumFractionDigits: maxFraction,
        currency: currency,
        currencyAsSymbol: currencyAsSymbol
      });
    };
    NumberPipe = __decorate([lang_1.CONST(), core_1.Injectable(), __metadata('design:paramtypes', [])], NumberPipe);
    return NumberPipe;
  })();
  exports.NumberPipe = NumberPipe;
  var DecimalPipe = (function(_super) {
    __extends(DecimalPipe, _super);
    function DecimalPipe() {
      _super.apply(this, arguments);
    }
    DecimalPipe.prototype.transform = function(value, args) {
      var digits = collection_1.ListWrapper.first(args);
      return NumberPipe._format(value, intl_1.NumberFormatStyle.Decimal, digits);
    };
    DecimalPipe = __decorate([lang_1.CONST(), core_1.Pipe({name: 'number'}), core_1.Injectable(), __metadata('design:paramtypes', [])], DecimalPipe);
    return DecimalPipe;
  })(NumberPipe);
  exports.DecimalPipe = DecimalPipe;
  var PercentPipe = (function(_super) {
    __extends(PercentPipe, _super);
    function PercentPipe() {
      _super.apply(this, arguments);
    }
    PercentPipe.prototype.transform = function(value, args) {
      var digits = collection_1.ListWrapper.first(args);
      return NumberPipe._format(value, intl_1.NumberFormatStyle.Percent, digits);
    };
    PercentPipe = __decorate([lang_1.CONST(), core_1.Pipe({name: 'percent'}), core_1.Injectable(), __metadata('design:paramtypes', [])], PercentPipe);
    return PercentPipe;
  })(NumberPipe);
  exports.PercentPipe = PercentPipe;
  var CurrencyPipe = (function(_super) {
    __extends(CurrencyPipe, _super);
    function CurrencyPipe() {
      _super.apply(this, arguments);
    }
    CurrencyPipe.prototype.transform = function(value, args) {
      var currencyCode = lang_1.isPresent(args) && args.length > 0 ? args[0] : 'USD';
      var symbolDisplay = lang_1.isPresent(args) && args.length > 1 ? args[1] : false;
      var digits = lang_1.isPresent(args) && args.length > 2 ? args[2] : null;
      return NumberPipe._format(value, intl_1.NumberFormatStyle.Currency, digits, currencyCode, symbolDisplay);
    };
    CurrencyPipe = __decorate([lang_1.CONST(), core_1.Pipe({name: 'currency'}), core_1.Injectable(), __metadata('design:paramtypes', [])], CurrencyPipe);
    return CurrencyPipe;
  })(NumberPipe);
  exports.CurrencyPipe = CurrencyPipe;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/pipes/replace_pipe.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/core.js", "node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var invalid_pipe_argument_exception_1 = $__require('node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js');
  var ReplacePipe = (function() {
    function ReplacePipe() {}
    ReplacePipe.prototype.transform = function(value, args) {
      if (lang_1.isBlank(args) || args.length !== 2) {
        throw new exceptions_1.BaseException('ReplacePipe requires two arguments');
      }
      if (lang_1.isBlank(value)) {
        return value;
      }
      if (!this._supportedInput(value)) {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, value);
      }
      var input = value.toString();
      var pattern = args[0];
      var replacement = args[1];
      if (!this._supportedPattern(pattern)) {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, pattern);
      }
      if (!this._supportedReplacement(replacement)) {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, replacement);
      }
      if (lang_1.isFunction(replacement)) {
        var rgxPattern = lang_1.isString(pattern) ? lang_1.RegExpWrapper.create(pattern) : pattern;
        return lang_1.StringWrapper.replaceAllMapped(input, rgxPattern, replacement);
      }
      if (pattern instanceof RegExp) {
        return lang_1.StringWrapper.replaceAll(input, pattern, replacement);
      }
      return lang_1.StringWrapper.replace(input, pattern, replacement);
    };
    ReplacePipe.prototype._supportedInput = function(input) {
      return lang_1.isString(input) || lang_1.isNumber(input);
    };
    ReplacePipe.prototype._supportedPattern = function(pattern) {
      return lang_1.isString(pattern) || pattern instanceof RegExp;
    };
    ReplacePipe.prototype._supportedReplacement = function(replacement) {
      return lang_1.isString(replacement) || lang_1.isFunction(replacement);
    };
    ReplacePipe = __decorate([core_1.Pipe({name: 'replace'}), core_1.Injectable(), __metadata('design:paramtypes', [])], ReplacePipe);
    return ReplacePipe;
  })();
  exports.ReplacePipe = ReplacePipe;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/pipes/i18n_plural_pipe.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/core.js", "node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var invalid_pipe_argument_exception_1 = $__require('node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js');
  var interpolationExp = lang_1.RegExpWrapper.create('#');
  var I18nPluralPipe = (function() {
    function I18nPluralPipe() {}
    I18nPluralPipe.prototype.transform = function(value, args) {
      if (args === void 0) {
        args = null;
      }
      var key;
      var valueStr;
      var pluralMap = (args[0]);
      if (!lang_1.isStringMap(pluralMap)) {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(I18nPluralPipe, pluralMap);
      }
      key = value === 0 || value === 1 ? "=" + value : 'other';
      valueStr = lang_1.isPresent(value) ? value.toString() : '';
      return lang_1.StringWrapper.replaceAll(pluralMap[key], interpolationExp, valueStr);
    };
    I18nPluralPipe = __decorate([lang_1.CONST(), core_1.Pipe({
      name: 'i18nPlural',
      pure: true
    }), core_1.Injectable(), __metadata('design:paramtypes', [])], I18nPluralPipe);
    return I18nPluralPipe;
  })();
  exports.I18nPluralPipe = I18nPluralPipe;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var InvalidPipeArgumentException = (function(_super) {
    __extends(InvalidPipeArgumentException, _super);
    function InvalidPipeArgumentException(type, value) {
      _super.call(this, "Invalid argument '" + value + "' for pipe '" + lang_1.stringify(type) + "'");
    }
    return InvalidPipeArgumentException;
  })(exceptions_1.BaseException);
  exports.InvalidPipeArgumentException = InvalidPipeArgumentException;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/pipes/i18n_select_pipe.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/core.js", "node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var invalid_pipe_argument_exception_1 = $__require('node_modules/angular2/src/common/pipes/invalid_pipe_argument_exception.js');
  var I18nSelectPipe = (function() {
    function I18nSelectPipe() {}
    I18nSelectPipe.prototype.transform = function(value, args) {
      if (args === void 0) {
        args = null;
      }
      var mapping = (args[0]);
      if (!lang_1.isStringMap(mapping)) {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(I18nSelectPipe, mapping);
      }
      return collection_1.StringMapWrapper.contains(mapping, value) ? mapping[value] : mapping['other'];
    };
    I18nSelectPipe = __decorate([lang_1.CONST(), core_1.Pipe({
      name: 'i18nSelect',
      pure: true
    }), core_1.Injectable(), __metadata('design:paramtypes', [])], I18nSelectPipe);
    return I18nSelectPipe;
  })();
  exports.I18nSelectPipe = I18nSelectPipe;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/pipes/common_pipes.js", ["node_modules/angular2/src/common/pipes/async_pipe.js", "node_modules/angular2/src/common/pipes/uppercase_pipe.js", "node_modules/angular2/src/common/pipes/lowercase_pipe.js", "node_modules/angular2/src/common/pipes/json_pipe.js", "node_modules/angular2/src/common/pipes/slice_pipe.js", "node_modules/angular2/src/common/pipes/date_pipe.js", "node_modules/angular2/src/common/pipes/number_pipe.js", "node_modules/angular2/src/common/pipes/replace_pipe.js", "node_modules/angular2/src/common/pipes/i18n_plural_pipe.js", "node_modules/angular2/src/common/pipes/i18n_select_pipe.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var async_pipe_1 = $__require('node_modules/angular2/src/common/pipes/async_pipe.js');
  var uppercase_pipe_1 = $__require('node_modules/angular2/src/common/pipes/uppercase_pipe.js');
  var lowercase_pipe_1 = $__require('node_modules/angular2/src/common/pipes/lowercase_pipe.js');
  var json_pipe_1 = $__require('node_modules/angular2/src/common/pipes/json_pipe.js');
  var slice_pipe_1 = $__require('node_modules/angular2/src/common/pipes/slice_pipe.js');
  var date_pipe_1 = $__require('node_modules/angular2/src/common/pipes/date_pipe.js');
  var number_pipe_1 = $__require('node_modules/angular2/src/common/pipes/number_pipe.js');
  var replace_pipe_1 = $__require('node_modules/angular2/src/common/pipes/replace_pipe.js');
  var i18n_plural_pipe_1 = $__require('node_modules/angular2/src/common/pipes/i18n_plural_pipe.js');
  var i18n_select_pipe_1 = $__require('node_modules/angular2/src/common/pipes/i18n_select_pipe.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  exports.COMMON_PIPES = lang_1.CONST_EXPR([async_pipe_1.AsyncPipe, uppercase_pipe_1.UpperCasePipe, lowercase_pipe_1.LowerCasePipe, json_pipe_1.JsonPipe, slice_pipe_1.SlicePipe, number_pipe_1.DecimalPipe, number_pipe_1.PercentPipe, number_pipe_1.CurrencyPipe, date_pipe_1.DatePipe, replace_pipe_1.ReplacePipe, i18n_plural_pipe_1.I18nPluralPipe, i18n_select_pipe_1.I18nSelectPipe]);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/pipes.js", ["node_modules/angular2/src/common/pipes/async_pipe.js", "node_modules/angular2/src/common/pipes/date_pipe.js", "node_modules/angular2/src/common/pipes/json_pipe.js", "node_modules/angular2/src/common/pipes/slice_pipe.js", "node_modules/angular2/src/common/pipes/lowercase_pipe.js", "node_modules/angular2/src/common/pipes/number_pipe.js", "node_modules/angular2/src/common/pipes/uppercase_pipe.js", "node_modules/angular2/src/common/pipes/replace_pipe.js", "node_modules/angular2/src/common/pipes/i18n_plural_pipe.js", "node_modules/angular2/src/common/pipes/i18n_select_pipe.js", "node_modules/angular2/src/common/pipes/common_pipes.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var async_pipe_1 = $__require('node_modules/angular2/src/common/pipes/async_pipe.js');
  exports.AsyncPipe = async_pipe_1.AsyncPipe;
  var date_pipe_1 = $__require('node_modules/angular2/src/common/pipes/date_pipe.js');
  exports.DatePipe = date_pipe_1.DatePipe;
  var json_pipe_1 = $__require('node_modules/angular2/src/common/pipes/json_pipe.js');
  exports.JsonPipe = json_pipe_1.JsonPipe;
  var slice_pipe_1 = $__require('node_modules/angular2/src/common/pipes/slice_pipe.js');
  exports.SlicePipe = slice_pipe_1.SlicePipe;
  var lowercase_pipe_1 = $__require('node_modules/angular2/src/common/pipes/lowercase_pipe.js');
  exports.LowerCasePipe = lowercase_pipe_1.LowerCasePipe;
  var number_pipe_1 = $__require('node_modules/angular2/src/common/pipes/number_pipe.js');
  exports.NumberPipe = number_pipe_1.NumberPipe;
  exports.DecimalPipe = number_pipe_1.DecimalPipe;
  exports.PercentPipe = number_pipe_1.PercentPipe;
  exports.CurrencyPipe = number_pipe_1.CurrencyPipe;
  var uppercase_pipe_1 = $__require('node_modules/angular2/src/common/pipes/uppercase_pipe.js');
  exports.UpperCasePipe = uppercase_pipe_1.UpperCasePipe;
  var replace_pipe_1 = $__require('node_modules/angular2/src/common/pipes/replace_pipe.js');
  exports.ReplacePipe = replace_pipe_1.ReplacePipe;
  var i18n_plural_pipe_1 = $__require('node_modules/angular2/src/common/pipes/i18n_plural_pipe.js');
  exports.I18nPluralPipe = i18n_plural_pipe_1.I18nPluralPipe;
  var i18n_select_pipe_1 = $__require('node_modules/angular2/src/common/pipes/i18n_select_pipe.js');
  exports.I18nSelectPipe = i18n_select_pipe_1.I18nSelectPipe;
  var common_pipes_1 = $__require('node_modules/angular2/src/common/pipes/common_pipes.js');
  exports.COMMON_PIPES = common_pipes_1.COMMON_PIPES;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/ng_control_name.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/async.js", "node_modules/angular2/core.js", "node_modules/angular2/src/common/forms/directives/control_container.js", "node_modules/angular2/src/common/forms/directives/ng_control.js", "node_modules/angular2/src/common/forms/directives/control_value_accessor.js", "node_modules/angular2/src/common/forms/directives/shared.js", "node_modules/angular2/src/common/forms/validators.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var control_container_1 = $__require('node_modules/angular2/src/common/forms/directives/control_container.js');
  var ng_control_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_control.js');
  var control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/control_value_accessor.js');
  var shared_1 = $__require('node_modules/angular2/src/common/forms/directives/shared.js');
  var validators_1 = $__require('node_modules/angular2/src/common/forms/validators.js');
  var controlNameBinding = lang_1.CONST_EXPR(new core_1.Provider(ng_control_1.NgControl, {useExisting: core_1.forwardRef(function() {
      return NgControlName;
    })}));
  var NgControlName = (function(_super) {
    __extends(NgControlName, _super);
    function NgControlName(_parent, _validators, _asyncValidators, valueAccessors) {
      _super.call(this);
      this._parent = _parent;
      this._validators = _validators;
      this._asyncValidators = _asyncValidators;
      this.update = new async_1.EventEmitter();
      this._added = false;
      this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
    }
    NgControlName.prototype.ngOnChanges = function(changes) {
      if (!this._added) {
        this.formDirective.addControl(this);
        this._added = true;
      }
      if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
        this.viewModel = this.model;
        this.formDirective.updateModel(this, this.model);
      }
    };
    NgControlName.prototype.ngOnDestroy = function() {
      this.formDirective.removeControl(this);
    };
    NgControlName.prototype.viewToModelUpdate = function(newValue) {
      this.viewModel = newValue;
      async_1.ObservableWrapper.callEmit(this.update, newValue);
    };
    Object.defineProperty(NgControlName.prototype, "path", {
      get: function() {
        return shared_1.controlPath(this.name, this._parent);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControlName.prototype, "formDirective", {
      get: function() {
        return this._parent.formDirective;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControlName.prototype, "validator", {
      get: function() {
        return shared_1.composeValidators(this._validators);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControlName.prototype, "asyncValidator", {
      get: function() {
        return shared_1.composeAsyncValidators(this._asyncValidators);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControlName.prototype, "control", {
      get: function() {
        return this.formDirective.getControl(this);
      },
      enumerable: true,
      configurable: true
    });
    NgControlName = __decorate([core_1.Directive({
      selector: '[ngControl]',
      bindings: [controlNameBinding],
      inputs: ['name: ngControl', 'model: ngModel'],
      outputs: ['update: ngModelChange'],
      exportAs: 'ngForm'
    }), __param(0, core_1.Host()), __param(0, core_1.SkipSelf()), __param(1, core_1.Optional()), __param(1, core_1.Self()), __param(1, core_1.Inject(validators_1.NG_VALIDATORS)), __param(2, core_1.Optional()), __param(2, core_1.Self()), __param(2, core_1.Inject(validators_1.NG_ASYNC_VALIDATORS)), __param(3, core_1.Optional()), __param(3, core_1.Self()), __param(3, core_1.Inject(control_value_accessor_1.NG_VALUE_ACCESSOR)), __metadata('design:paramtypes', [control_container_1.ControlContainer, Array, Array, Array])], NgControlName);
    return NgControlName;
  })(ng_control_1.NgControl);
  exports.NgControlName = NgControlName;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/ng_form_control.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/facade/async.js", "node_modules/angular2/core.js", "node_modules/angular2/src/common/forms/directives/ng_control.js", "node_modules/angular2/src/common/forms/validators.js", "node_modules/angular2/src/common/forms/directives/control_value_accessor.js", "node_modules/angular2/src/common/forms/directives/shared.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var ng_control_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_control.js');
  var validators_1 = $__require('node_modules/angular2/src/common/forms/validators.js');
  var control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/control_value_accessor.js');
  var shared_1 = $__require('node_modules/angular2/src/common/forms/directives/shared.js');
  var formControlBinding = lang_1.CONST_EXPR(new core_1.Provider(ng_control_1.NgControl, {useExisting: core_1.forwardRef(function() {
      return NgFormControl;
    })}));
  var NgFormControl = (function(_super) {
    __extends(NgFormControl, _super);
    function NgFormControl(_validators, _asyncValidators, valueAccessors) {
      _super.call(this);
      this._validators = _validators;
      this._asyncValidators = _asyncValidators;
      this.update = new async_1.EventEmitter();
      this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
    }
    NgFormControl.prototype.ngOnChanges = function(changes) {
      if (this._isControlChanged(changes)) {
        shared_1.setUpControl(this.form, this);
        this.form.updateValueAndValidity({emitEvent: false});
      }
      if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
        this.form.updateValue(this.model);
        this.viewModel = this.model;
      }
    };
    Object.defineProperty(NgFormControl.prototype, "path", {
      get: function() {
        return [];
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgFormControl.prototype, "validator", {
      get: function() {
        return shared_1.composeValidators(this._validators);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgFormControl.prototype, "asyncValidator", {
      get: function() {
        return shared_1.composeAsyncValidators(this._asyncValidators);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgFormControl.prototype, "control", {
      get: function() {
        return this.form;
      },
      enumerable: true,
      configurable: true
    });
    NgFormControl.prototype.viewToModelUpdate = function(newValue) {
      this.viewModel = newValue;
      async_1.ObservableWrapper.callEmit(this.update, newValue);
    };
    NgFormControl.prototype._isControlChanged = function(changes) {
      return collection_1.StringMapWrapper.contains(changes, "form");
    };
    NgFormControl = __decorate([core_1.Directive({
      selector: '[ngFormControl]',
      bindings: [formControlBinding],
      inputs: ['form: ngFormControl', 'model: ngModel'],
      outputs: ['update: ngModelChange'],
      exportAs: 'ngForm'
    }), __param(0, core_1.Optional()), __param(0, core_1.Self()), __param(0, core_1.Inject(validators_1.NG_VALIDATORS)), __param(1, core_1.Optional()), __param(1, core_1.Self()), __param(1, core_1.Inject(validators_1.NG_ASYNC_VALIDATORS)), __param(2, core_1.Optional()), __param(2, core_1.Self()), __param(2, core_1.Inject(control_value_accessor_1.NG_VALUE_ACCESSOR)), __metadata('design:paramtypes', [Array, Array, Array])], NgFormControl);
    return NgFormControl;
  })(ng_control_1.NgControl);
  exports.NgFormControl = NgFormControl;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/ng_model.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/async.js", "node_modules/angular2/core.js", "node_modules/angular2/src/common/forms/directives/control_value_accessor.js", "node_modules/angular2/src/common/forms/directives/ng_control.js", "node_modules/angular2/src/common/forms/model.js", "node_modules/angular2/src/common/forms/validators.js", "node_modules/angular2/src/common/forms/directives/shared.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/control_value_accessor.js');
  var ng_control_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_control.js');
  var model_1 = $__require('node_modules/angular2/src/common/forms/model.js');
  var validators_1 = $__require('node_modules/angular2/src/common/forms/validators.js');
  var shared_1 = $__require('node_modules/angular2/src/common/forms/directives/shared.js');
  var formControlBinding = lang_1.CONST_EXPR(new core_1.Provider(ng_control_1.NgControl, {useExisting: core_1.forwardRef(function() {
      return NgModel;
    })}));
  var NgModel = (function(_super) {
    __extends(NgModel, _super);
    function NgModel(_validators, _asyncValidators, valueAccessors) {
      _super.call(this);
      this._validators = _validators;
      this._asyncValidators = _asyncValidators;
      this._control = new model_1.Control();
      this._added = false;
      this.update = new async_1.EventEmitter();
      this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
    }
    NgModel.prototype.ngOnChanges = function(changes) {
      if (!this._added) {
        shared_1.setUpControl(this._control, this);
        this._control.updateValueAndValidity({emitEvent: false});
        this._added = true;
      }
      if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
        this._control.updateValue(this.model);
        this.viewModel = this.model;
      }
    };
    Object.defineProperty(NgModel.prototype, "control", {
      get: function() {
        return this._control;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgModel.prototype, "path", {
      get: function() {
        return [];
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgModel.prototype, "validator", {
      get: function() {
        return shared_1.composeValidators(this._validators);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgModel.prototype, "asyncValidator", {
      get: function() {
        return shared_1.composeAsyncValidators(this._asyncValidators);
      },
      enumerable: true,
      configurable: true
    });
    NgModel.prototype.viewToModelUpdate = function(newValue) {
      this.viewModel = newValue;
      async_1.ObservableWrapper.callEmit(this.update, newValue);
    };
    NgModel = __decorate([core_1.Directive({
      selector: '[ngModel]:not([ngControl]):not([ngFormControl])',
      bindings: [formControlBinding],
      inputs: ['model: ngModel'],
      outputs: ['update: ngModelChange'],
      exportAs: 'ngForm'
    }), __param(0, core_1.Optional()), __param(0, core_1.Self()), __param(0, core_1.Inject(validators_1.NG_VALIDATORS)), __param(1, core_1.Optional()), __param(1, core_1.Self()), __param(1, core_1.Inject(validators_1.NG_ASYNC_VALIDATORS)), __param(2, core_1.Optional()), __param(2, core_1.Self()), __param(2, core_1.Inject(control_value_accessor_1.NG_VALUE_ACCESSOR)), __metadata('design:paramtypes', [Array, Array, Array])], NgModel);
    return NgModel;
  })(ng_control_1.NgControl);
  exports.NgModel = NgModel;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/ng_control_group.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/common/forms/directives/control_container.js", "node_modules/angular2/src/common/forms/directives/shared.js", "node_modules/angular2/src/common/forms/validators.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('node_modules/angular2/core.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var control_container_1 = $__require('node_modules/angular2/src/common/forms/directives/control_container.js');
  var shared_1 = $__require('node_modules/angular2/src/common/forms/directives/shared.js');
  var validators_1 = $__require('node_modules/angular2/src/common/forms/validators.js');
  var controlGroupProvider = lang_1.CONST_EXPR(new core_1.Provider(control_container_1.ControlContainer, {useExisting: core_1.forwardRef(function() {
      return NgControlGroup;
    })}));
  var NgControlGroup = (function(_super) {
    __extends(NgControlGroup, _super);
    function NgControlGroup(parent, _validators, _asyncValidators) {
      _super.call(this);
      this._validators = _validators;
      this._asyncValidators = _asyncValidators;
      this._parent = parent;
    }
    NgControlGroup.prototype.ngOnInit = function() {
      this.formDirective.addControlGroup(this);
    };
    NgControlGroup.prototype.ngOnDestroy = function() {
      this.formDirective.removeControlGroup(this);
    };
    Object.defineProperty(NgControlGroup.prototype, "control", {
      get: function() {
        return this.formDirective.getControlGroup(this);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControlGroup.prototype, "path", {
      get: function() {
        return shared_1.controlPath(this.name, this._parent);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControlGroup.prototype, "formDirective", {
      get: function() {
        return this._parent.formDirective;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControlGroup.prototype, "validator", {
      get: function() {
        return shared_1.composeValidators(this._validators);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControlGroup.prototype, "asyncValidator", {
      get: function() {
        return shared_1.composeAsyncValidators(this._asyncValidators);
      },
      enumerable: true,
      configurable: true
    });
    NgControlGroup = __decorate([core_1.Directive({
      selector: '[ngControlGroup]',
      providers: [controlGroupProvider],
      inputs: ['name: ngControlGroup'],
      exportAs: 'ngForm'
    }), __param(0, core_1.Host()), __param(0, core_1.SkipSelf()), __param(1, core_1.Optional()), __param(1, core_1.Self()), __param(1, core_1.Inject(validators_1.NG_VALIDATORS)), __param(2, core_1.Optional()), __param(2, core_1.Self()), __param(2, core_1.Inject(validators_1.NG_ASYNC_VALIDATORS)), __metadata('design:paramtypes', [control_container_1.ControlContainer, Array, Array])], NgControlGroup);
    return NgControlGroup;
  })(control_container_1.ControlContainer);
  exports.NgControlGroup = NgControlGroup;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/ng_form_model.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/facade/async.js", "node_modules/angular2/core.js", "node_modules/angular2/src/common/forms/directives/control_container.js", "node_modules/angular2/src/common/forms/directives/shared.js", "node_modules/angular2/src/common/forms/validators.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var control_container_1 = $__require('node_modules/angular2/src/common/forms/directives/control_container.js');
  var shared_1 = $__require('node_modules/angular2/src/common/forms/directives/shared.js');
  var validators_1 = $__require('node_modules/angular2/src/common/forms/validators.js');
  var formDirectiveProvider = lang_1.CONST_EXPR(new core_1.Provider(control_container_1.ControlContainer, {useExisting: core_1.forwardRef(function() {
      return NgFormModel;
    })}));
  var NgFormModel = (function(_super) {
    __extends(NgFormModel, _super);
    function NgFormModel(_validators, _asyncValidators) {
      _super.call(this);
      this._validators = _validators;
      this._asyncValidators = _asyncValidators;
      this.form = null;
      this.directives = [];
      this.ngSubmit = new async_1.EventEmitter();
    }
    NgFormModel.prototype.ngOnChanges = function(changes) {
      if (collection_1.StringMapWrapper.contains(changes, "form")) {
        var sync = shared_1.composeValidators(this._validators);
        this.form.validator = validators_1.Validators.compose([this.form.validator, sync]);
        var async = shared_1.composeAsyncValidators(this._asyncValidators);
        this.form.asyncValidator = validators_1.Validators.composeAsync([this.form.asyncValidator, async]);
        this.form.updateValueAndValidity({
          onlySelf: true,
          emitEvent: false
        });
      }
      this._updateDomValue();
    };
    Object.defineProperty(NgFormModel.prototype, "formDirective", {
      get: function() {
        return this;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgFormModel.prototype, "control", {
      get: function() {
        return this.form;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgFormModel.prototype, "path", {
      get: function() {
        return [];
      },
      enumerable: true,
      configurable: true
    });
    NgFormModel.prototype.addControl = function(dir) {
      var ctrl = this.form.find(dir.path);
      shared_1.setUpControl(ctrl, dir);
      ctrl.updateValueAndValidity({emitEvent: false});
      this.directives.push(dir);
    };
    NgFormModel.prototype.getControl = function(dir) {
      return this.form.find(dir.path);
    };
    NgFormModel.prototype.removeControl = function(dir) {
      collection_1.ListWrapper.remove(this.directives, dir);
    };
    NgFormModel.prototype.addControlGroup = function(dir) {
      var ctrl = this.form.find(dir.path);
      shared_1.setUpControlGroup(ctrl, dir);
      ctrl.updateValueAndValidity({emitEvent: false});
    };
    NgFormModel.prototype.removeControlGroup = function(dir) {};
    NgFormModel.prototype.getControlGroup = function(dir) {
      return this.form.find(dir.path);
    };
    NgFormModel.prototype.updateModel = function(dir, value) {
      var ctrl = this.form.find(dir.path);
      ctrl.updateValue(value);
    };
    NgFormModel.prototype.onSubmit = function() {
      async_1.ObservableWrapper.callEmit(this.ngSubmit, null);
      return false;
    };
    NgFormModel.prototype._updateDomValue = function() {
      var _this = this;
      this.directives.forEach(function(dir) {
        var ctrl = _this.form.find(dir.path);
        dir.valueAccessor.writeValue(ctrl.value);
      });
    };
    NgFormModel = __decorate([core_1.Directive({
      selector: '[ngFormModel]',
      bindings: [formDirectiveProvider],
      inputs: ['form: ngFormModel'],
      host: {'(submit)': 'onSubmit()'},
      outputs: ['ngSubmit'],
      exportAs: 'ngForm'
    }), __param(0, core_1.Optional()), __param(0, core_1.Self()), __param(0, core_1.Inject(validators_1.NG_VALIDATORS)), __param(1, core_1.Optional()), __param(1, core_1.Self()), __param(1, core_1.Inject(validators_1.NG_ASYNC_VALIDATORS)), __metadata('design:paramtypes', [Array, Array])], NgFormModel);
    return NgFormModel;
  })(control_container_1.ControlContainer);
  exports.NgFormModel = NgFormModel;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/control_container.js", ["node_modules/angular2/src/common/forms/directives/abstract_control_directive.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var abstract_control_directive_1 = $__require('node_modules/angular2/src/common/forms/directives/abstract_control_directive.js');
  var ControlContainer = (function(_super) {
    __extends(ControlContainer, _super);
    function ControlContainer() {
      _super.apply(this, arguments);
    }
    Object.defineProperty(ControlContainer.prototype, "formDirective", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ControlContainer.prototype, "path", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    return ControlContainer;
  })(abstract_control_directive_1.AbstractControlDirective);
  exports.ControlContainer = ControlContainer;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/normalize_validator.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function normalizeValidator(validator) {
    if (validator.validate !== undefined) {
      return function(c) {
        return validator.validate(c);
      };
    } else {
      return validator;
    }
  }
  exports.normalizeValidator = normalizeValidator;
  function normalizeAsyncValidator(validator) {
    if (validator.validate !== undefined) {
      return function(c) {
        return Promise.resolve(validator.validate(c));
      };
    } else {
      return validator;
    }
  }
  exports.normalizeAsyncValidator = normalizeAsyncValidator;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/shared.js", ["node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/common/forms/validators.js", "node_modules/angular2/src/common/forms/directives/default_value_accessor.js", "node_modules/angular2/src/common/forms/directives/number_value_accessor.js", "node_modules/angular2/src/common/forms/directives/checkbox_value_accessor.js", "node_modules/angular2/src/common/forms/directives/select_control_value_accessor.js", "node_modules/angular2/src/common/forms/directives/radio_control_value_accessor.js", "node_modules/angular2/src/common/forms/directives/normalize_validator.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var validators_1 = $__require('node_modules/angular2/src/common/forms/validators.js');
  var default_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/default_value_accessor.js');
  var number_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/number_value_accessor.js');
  var checkbox_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/checkbox_value_accessor.js');
  var select_control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/select_control_value_accessor.js');
  var radio_control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/radio_control_value_accessor.js');
  var normalize_validator_1 = $__require('node_modules/angular2/src/common/forms/directives/normalize_validator.js');
  function controlPath(name, parent) {
    var p = collection_1.ListWrapper.clone(parent.path);
    p.push(name);
    return p;
  }
  exports.controlPath = controlPath;
  function setUpControl(control, dir) {
    if (lang_1.isBlank(control))
      _throwError(dir, "Cannot find control");
    if (lang_1.isBlank(dir.valueAccessor))
      _throwError(dir, "No value accessor for");
    control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
    dir.valueAccessor.writeValue(control.value);
    dir.valueAccessor.registerOnChange(function(newValue) {
      dir.viewToModelUpdate(newValue);
      control.updateValue(newValue, {emitModelToViewChange: false});
      control.markAsDirty();
    });
    control.registerOnChange(function(newValue) {
      return dir.valueAccessor.writeValue(newValue);
    });
    dir.valueAccessor.registerOnTouched(function() {
      return control.markAsTouched();
    });
  }
  exports.setUpControl = setUpControl;
  function setUpControlGroup(control, dir) {
    if (lang_1.isBlank(control))
      _throwError(dir, "Cannot find control");
    control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
  }
  exports.setUpControlGroup = setUpControlGroup;
  function _throwError(dir, message) {
    var path = dir.path.join(" -> ");
    throw new exceptions_1.BaseException(message + " '" + path + "'");
  }
  function composeValidators(validators) {
    return lang_1.isPresent(validators) ? validators_1.Validators.compose(validators.map(normalize_validator_1.normalizeValidator)) : null;
  }
  exports.composeValidators = composeValidators;
  function composeAsyncValidators(validators) {
    return lang_1.isPresent(validators) ? validators_1.Validators.composeAsync(validators.map(normalize_validator_1.normalizeAsyncValidator)) : null;
  }
  exports.composeAsyncValidators = composeAsyncValidators;
  function isPropertyUpdated(changes, viewModel) {
    if (!collection_1.StringMapWrapper.contains(changes, "model"))
      return false;
    var change = changes["model"];
    if (change.isFirstChange())
      return true;
    return !lang_1.looseIdentical(viewModel, change.currentValue);
  }
  exports.isPropertyUpdated = isPropertyUpdated;
  function selectValueAccessor(dir, valueAccessors) {
    if (lang_1.isBlank(valueAccessors))
      return null;
    var defaultAccessor;
    var builtinAccessor;
    var customAccessor;
    valueAccessors.forEach(function(v) {
      if (lang_1.hasConstructor(v, default_value_accessor_1.DefaultValueAccessor)) {
        defaultAccessor = v;
      } else if (lang_1.hasConstructor(v, checkbox_value_accessor_1.CheckboxControlValueAccessor) || lang_1.hasConstructor(v, number_value_accessor_1.NumberValueAccessor) || lang_1.hasConstructor(v, select_control_value_accessor_1.SelectControlValueAccessor) || lang_1.hasConstructor(v, radio_control_value_accessor_1.RadioControlValueAccessor)) {
        if (lang_1.isPresent(builtinAccessor))
          _throwError(dir, "More than one built-in value accessor matches");
        builtinAccessor = v;
      } else {
        if (lang_1.isPresent(customAccessor))
          _throwError(dir, "More than one custom value accessor matches");
        customAccessor = v;
      }
    });
    if (lang_1.isPresent(customAccessor))
      return customAccessor;
    if (lang_1.isPresent(builtinAccessor))
      return builtinAccessor;
    if (lang_1.isPresent(defaultAccessor))
      return defaultAccessor;
    _throwError(dir, "No valid value accessor for");
    return null;
  }
  exports.selectValueAccessor = selectValueAccessor;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/ng_form.js", ["node_modules/angular2/src/facade/async.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/core.js", "node_modules/angular2/src/common/forms/directives/control_container.js", "node_modules/angular2/src/common/forms/model.js", "node_modules/angular2/src/common/forms/directives/shared.js", "node_modules/angular2/src/common/forms/validators.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var control_container_1 = $__require('node_modules/angular2/src/common/forms/directives/control_container.js');
  var model_1 = $__require('node_modules/angular2/src/common/forms/model.js');
  var shared_1 = $__require('node_modules/angular2/src/common/forms/directives/shared.js');
  var validators_1 = $__require('node_modules/angular2/src/common/forms/validators.js');
  var formDirectiveProvider = lang_1.CONST_EXPR(new core_1.Provider(control_container_1.ControlContainer, {useExisting: core_1.forwardRef(function() {
      return NgForm;
    })}));
  var NgForm = (function(_super) {
    __extends(NgForm, _super);
    function NgForm(validators, asyncValidators) {
      _super.call(this);
      this.ngSubmit = new async_1.EventEmitter();
      this.form = new model_1.ControlGroup({}, null, shared_1.composeValidators(validators), shared_1.composeAsyncValidators(asyncValidators));
    }
    Object.defineProperty(NgForm.prototype, "formDirective", {
      get: function() {
        return this;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgForm.prototype, "control", {
      get: function() {
        return this.form;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgForm.prototype, "path", {
      get: function() {
        return [];
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgForm.prototype, "controls", {
      get: function() {
        return this.form.controls;
      },
      enumerable: true,
      configurable: true
    });
    NgForm.prototype.addControl = function(dir) {
      var _this = this;
      async_1.PromiseWrapper.scheduleMicrotask(function() {
        var container = _this._findContainer(dir.path);
        var ctrl = new model_1.Control();
        shared_1.setUpControl(ctrl, dir);
        container.addControl(dir.name, ctrl);
        ctrl.updateValueAndValidity({emitEvent: false});
      });
    };
    NgForm.prototype.getControl = function(dir) {
      return this.form.find(dir.path);
    };
    NgForm.prototype.removeControl = function(dir) {
      var _this = this;
      async_1.PromiseWrapper.scheduleMicrotask(function() {
        var container = _this._findContainer(dir.path);
        if (lang_1.isPresent(container)) {
          container.removeControl(dir.name);
          container.updateValueAndValidity({emitEvent: false});
        }
      });
    };
    NgForm.prototype.addControlGroup = function(dir) {
      var _this = this;
      async_1.PromiseWrapper.scheduleMicrotask(function() {
        var container = _this._findContainer(dir.path);
        var group = new model_1.ControlGroup({});
        shared_1.setUpControlGroup(group, dir);
        container.addControl(dir.name, group);
        group.updateValueAndValidity({emitEvent: false});
      });
    };
    NgForm.prototype.removeControlGroup = function(dir) {
      var _this = this;
      async_1.PromiseWrapper.scheduleMicrotask(function() {
        var container = _this._findContainer(dir.path);
        if (lang_1.isPresent(container)) {
          container.removeControl(dir.name);
          container.updateValueAndValidity({emitEvent: false});
        }
      });
    };
    NgForm.prototype.getControlGroup = function(dir) {
      return this.form.find(dir.path);
    };
    NgForm.prototype.updateModel = function(dir, value) {
      var _this = this;
      async_1.PromiseWrapper.scheduleMicrotask(function() {
        var ctrl = _this.form.find(dir.path);
        ctrl.updateValue(value);
      });
    };
    NgForm.prototype.onSubmit = function() {
      async_1.ObservableWrapper.callEmit(this.ngSubmit, null);
      return false;
    };
    NgForm.prototype._findContainer = function(path) {
      path.pop();
      return collection_1.ListWrapper.isEmpty(path) ? this.form : this.form.find(path);
    };
    NgForm = __decorate([core_1.Directive({
      selector: 'form:not([ngNoForm]):not([ngFormModel]),ngForm,[ngForm]',
      bindings: [formDirectiveProvider],
      host: {'(submit)': 'onSubmit()'},
      outputs: ['ngSubmit'],
      exportAs: 'ngForm'
    }), __param(0, core_1.Optional()), __param(0, core_1.Self()), __param(0, core_1.Inject(validators_1.NG_VALIDATORS)), __param(1, core_1.Optional()), __param(1, core_1.Self()), __param(1, core_1.Inject(validators_1.NG_ASYNC_VALIDATORS)), __metadata('design:paramtypes', [Array, Array])], NgForm);
    return NgForm;
  })(control_container_1.ControlContainer);
  exports.NgForm = NgForm;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/default_value_accessor.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/common/forms/directives/control_value_accessor.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/control_value_accessor.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var DEFAULT_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(control_value_accessor_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function() {
      return DefaultValueAccessor;
    }),
    multi: true
  }));
  var DefaultValueAccessor = (function() {
    function DefaultValueAccessor(_renderer, _elementRef) {
      this._renderer = _renderer;
      this._elementRef = _elementRef;
      this.onChange = function(_) {};
      this.onTouched = function() {};
    }
    DefaultValueAccessor.prototype.writeValue = function(value) {
      var normalizedValue = lang_1.isBlank(value) ? '' : value;
      this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
    };
    DefaultValueAccessor.prototype.registerOnChange = function(fn) {
      this.onChange = fn;
    };
    DefaultValueAccessor.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    DefaultValueAccessor = __decorate([core_1.Directive({
      selector: 'input:not([type=checkbox])[ngControl],textarea[ngControl],input:not([type=checkbox])[ngFormControl],textarea[ngFormControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
      host: {
        '(input)': 'onChange($event.target.value)',
        '(blur)': 'onTouched()'
      },
      bindings: [DEFAULT_VALUE_ACCESSOR]
    }), __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])], DefaultValueAccessor);
    return DefaultValueAccessor;
  })();
  exports.DefaultValueAccessor = DefaultValueAccessor;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/checkbox_value_accessor.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/common/forms/directives/control_value_accessor.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/control_value_accessor.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var CHECKBOX_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(control_value_accessor_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function() {
      return CheckboxControlValueAccessor;
    }),
    multi: true
  }));
  var CheckboxControlValueAccessor = (function() {
    function CheckboxControlValueAccessor(_renderer, _elementRef) {
      this._renderer = _renderer;
      this._elementRef = _elementRef;
      this.onChange = function(_) {};
      this.onTouched = function() {};
    }
    CheckboxControlValueAccessor.prototype.writeValue = function(value) {
      this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', value);
    };
    CheckboxControlValueAccessor.prototype.registerOnChange = function(fn) {
      this.onChange = fn;
    };
    CheckboxControlValueAccessor.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    CheckboxControlValueAccessor = __decorate([core_1.Directive({
      selector: 'input[type=checkbox][ngControl],input[type=checkbox][ngFormControl],input[type=checkbox][ngModel]',
      host: {
        '(change)': 'onChange($event.target.checked)',
        '(blur)': 'onTouched()'
      },
      providers: [CHECKBOX_VALUE_ACCESSOR]
    }), __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])], CheckboxControlValueAccessor);
    return CheckboxControlValueAccessor;
  })();
  exports.CheckboxControlValueAccessor = CheckboxControlValueAccessor;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/number_value_accessor.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/common/forms/directives/control_value_accessor.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/control_value_accessor.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var NUMBER_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(control_value_accessor_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function() {
      return NumberValueAccessor;
    }),
    multi: true
  }));
  var NumberValueAccessor = (function() {
    function NumberValueAccessor(_renderer, _elementRef) {
      this._renderer = _renderer;
      this._elementRef = _elementRef;
      this.onChange = function(_) {};
      this.onTouched = function() {};
    }
    NumberValueAccessor.prototype.writeValue = function(value) {
      this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
    };
    NumberValueAccessor.prototype.registerOnChange = function(fn) {
      this.onChange = function(value) {
        fn(lang_1.NumberWrapper.parseFloat(value));
      };
    };
    NumberValueAccessor.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    NumberValueAccessor = __decorate([core_1.Directive({
      selector: 'input[type=number][ngControl],input[type=number][ngFormControl],input[type=number][ngModel]',
      host: {
        '(change)': 'onChange($event.target.value)',
        '(input)': 'onChange($event.target.value)',
        '(blur)': 'onTouched()'
      },
      bindings: [NUMBER_VALUE_ACCESSOR]
    }), __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])], NumberValueAccessor);
    return NumberValueAccessor;
  })();
  exports.NumberValueAccessor = NumberValueAccessor;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/ng_control_status.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/common/forms/directives/ng_control.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('node_modules/angular2/core.js');
  var ng_control_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_control.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var NgControlStatus = (function() {
    function NgControlStatus(cd) {
      this._cd = cd;
    }
    Object.defineProperty(NgControlStatus.prototype, "ngClassUntouched", {
      get: function() {
        return lang_1.isPresent(this._cd.control) ? this._cd.control.untouched : false;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControlStatus.prototype, "ngClassTouched", {
      get: function() {
        return lang_1.isPresent(this._cd.control) ? this._cd.control.touched : false;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControlStatus.prototype, "ngClassPristine", {
      get: function() {
        return lang_1.isPresent(this._cd.control) ? this._cd.control.pristine : false;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControlStatus.prototype, "ngClassDirty", {
      get: function() {
        return lang_1.isPresent(this._cd.control) ? this._cd.control.dirty : false;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControlStatus.prototype, "ngClassValid", {
      get: function() {
        return lang_1.isPresent(this._cd.control) ? this._cd.control.valid : false;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControlStatus.prototype, "ngClassInvalid", {
      get: function() {
        return lang_1.isPresent(this._cd.control) ? !this._cd.control.valid : false;
      },
      enumerable: true,
      configurable: true
    });
    NgControlStatus = __decorate([core_1.Directive({
      selector: '[ngControl],[ngModel],[ngFormControl]',
      host: {
        '[class.ng-untouched]': 'ngClassUntouched',
        '[class.ng-touched]': 'ngClassTouched',
        '[class.ng-pristine]': 'ngClassPristine',
        '[class.ng-dirty]': 'ngClassDirty',
        '[class.ng-valid]': 'ngClassValid',
        '[class.ng-invalid]': 'ngClassInvalid'
      }
    }), __param(0, core_1.Self()), __metadata('design:paramtypes', [ng_control_1.NgControl])], NgControlStatus);
    return NgControlStatus;
  })();
  exports.NgControlStatus = NgControlStatus;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/select_control_value_accessor.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/facade/async.js", "node_modules/angular2/src/common/forms/directives/control_value_accessor.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('node_modules/angular2/core.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/control_value_accessor.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var SELECT_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(control_value_accessor_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function() {
      return SelectControlValueAccessor;
    }),
    multi: true
  }));
  var NgSelectOption = (function() {
    function NgSelectOption() {}
    NgSelectOption = __decorate([core_1.Directive({selector: 'option'}), __metadata('design:paramtypes', [])], NgSelectOption);
    return NgSelectOption;
  })();
  exports.NgSelectOption = NgSelectOption;
  var SelectControlValueAccessor = (function() {
    function SelectControlValueAccessor(_renderer, _elementRef, query) {
      this._renderer = _renderer;
      this._elementRef = _elementRef;
      this.onChange = function(_) {};
      this.onTouched = function() {};
      this._updateValueWhenListOfOptionsChanges(query);
    }
    SelectControlValueAccessor.prototype.writeValue = function(value) {
      this.value = value;
      this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
    };
    SelectControlValueAccessor.prototype.registerOnChange = function(fn) {
      this.onChange = fn;
    };
    SelectControlValueAccessor.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    SelectControlValueAccessor.prototype._updateValueWhenListOfOptionsChanges = function(query) {
      var _this = this;
      async_1.ObservableWrapper.subscribe(query.changes, function(_) {
        return _this.writeValue(_this.value);
      });
    };
    SelectControlValueAccessor = __decorate([core_1.Directive({
      selector: 'select[ngControl],select[ngFormControl],select[ngModel]',
      host: {
        '(input)': 'onChange($event.target.value)',
        '(blur)': 'onTouched()'
      },
      bindings: [SELECT_VALUE_ACCESSOR]
    }), __param(2, core_1.Query(NgSelectOption, {descendants: true})), __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, core_1.QueryList])], SelectControlValueAccessor);
    return SelectControlValueAccessor;
  })();
  exports.SelectControlValueAccessor = SelectControlValueAccessor;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/common/forms/directives/ng_control_name.js", "node_modules/angular2/src/common/forms/directives/ng_form_control.js", "node_modules/angular2/src/common/forms/directives/ng_model.js", "node_modules/angular2/src/common/forms/directives/ng_control_group.js", "node_modules/angular2/src/common/forms/directives/ng_form_model.js", "node_modules/angular2/src/common/forms/directives/ng_form.js", "node_modules/angular2/src/common/forms/directives/default_value_accessor.js", "node_modules/angular2/src/common/forms/directives/checkbox_value_accessor.js", "node_modules/angular2/src/common/forms/directives/number_value_accessor.js", "node_modules/angular2/src/common/forms/directives/radio_control_value_accessor.js", "node_modules/angular2/src/common/forms/directives/ng_control_status.js", "node_modules/angular2/src/common/forms/directives/select_control_value_accessor.js", "node_modules/angular2/src/common/forms/directives/validators.js", "node_modules/angular2/src/common/forms/directives/ng_control.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var ng_control_name_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_control_name.js');
  var ng_form_control_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_form_control.js');
  var ng_model_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_model.js');
  var ng_control_group_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_control_group.js');
  var ng_form_model_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_form_model.js');
  var ng_form_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_form.js');
  var default_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/default_value_accessor.js');
  var checkbox_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/checkbox_value_accessor.js');
  var number_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/number_value_accessor.js');
  var radio_control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/radio_control_value_accessor.js');
  var ng_control_status_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_control_status.js');
  var select_control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/select_control_value_accessor.js');
  var validators_1 = $__require('node_modules/angular2/src/common/forms/directives/validators.js');
  var ng_control_name_2 = $__require('node_modules/angular2/src/common/forms/directives/ng_control_name.js');
  exports.NgControlName = ng_control_name_2.NgControlName;
  var ng_form_control_2 = $__require('node_modules/angular2/src/common/forms/directives/ng_form_control.js');
  exports.NgFormControl = ng_form_control_2.NgFormControl;
  var ng_model_2 = $__require('node_modules/angular2/src/common/forms/directives/ng_model.js');
  exports.NgModel = ng_model_2.NgModel;
  var ng_control_group_2 = $__require('node_modules/angular2/src/common/forms/directives/ng_control_group.js');
  exports.NgControlGroup = ng_control_group_2.NgControlGroup;
  var ng_form_model_2 = $__require('node_modules/angular2/src/common/forms/directives/ng_form_model.js');
  exports.NgFormModel = ng_form_model_2.NgFormModel;
  var ng_form_2 = $__require('node_modules/angular2/src/common/forms/directives/ng_form.js');
  exports.NgForm = ng_form_2.NgForm;
  var default_value_accessor_2 = $__require('node_modules/angular2/src/common/forms/directives/default_value_accessor.js');
  exports.DefaultValueAccessor = default_value_accessor_2.DefaultValueAccessor;
  var checkbox_value_accessor_2 = $__require('node_modules/angular2/src/common/forms/directives/checkbox_value_accessor.js');
  exports.CheckboxControlValueAccessor = checkbox_value_accessor_2.CheckboxControlValueAccessor;
  var radio_control_value_accessor_2 = $__require('node_modules/angular2/src/common/forms/directives/radio_control_value_accessor.js');
  exports.RadioControlValueAccessor = radio_control_value_accessor_2.RadioControlValueAccessor;
  exports.RadioButtonState = radio_control_value_accessor_2.RadioButtonState;
  var number_value_accessor_2 = $__require('node_modules/angular2/src/common/forms/directives/number_value_accessor.js');
  exports.NumberValueAccessor = number_value_accessor_2.NumberValueAccessor;
  var ng_control_status_2 = $__require('node_modules/angular2/src/common/forms/directives/ng_control_status.js');
  exports.NgControlStatus = ng_control_status_2.NgControlStatus;
  var select_control_value_accessor_2 = $__require('node_modules/angular2/src/common/forms/directives/select_control_value_accessor.js');
  exports.SelectControlValueAccessor = select_control_value_accessor_2.SelectControlValueAccessor;
  exports.NgSelectOption = select_control_value_accessor_2.NgSelectOption;
  var validators_2 = $__require('node_modules/angular2/src/common/forms/directives/validators.js');
  exports.RequiredValidator = validators_2.RequiredValidator;
  exports.MinLengthValidator = validators_2.MinLengthValidator;
  exports.MaxLengthValidator = validators_2.MaxLengthValidator;
  exports.PatternValidator = validators_2.PatternValidator;
  var ng_control_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_control.js');
  exports.NgControl = ng_control_1.NgControl;
  exports.FORM_DIRECTIVES = lang_1.CONST_EXPR([ng_control_name_1.NgControlName, ng_control_group_1.NgControlGroup, ng_form_control_1.NgFormControl, ng_model_1.NgModel, ng_form_model_1.NgFormModel, ng_form_1.NgForm, select_control_value_accessor_1.NgSelectOption, default_value_accessor_1.DefaultValueAccessor, number_value_accessor_1.NumberValueAccessor, checkbox_value_accessor_1.CheckboxControlValueAccessor, select_control_value_accessor_1.SelectControlValueAccessor, radio_control_value_accessor_1.RadioControlValueAccessor, ng_control_status_1.NgControlStatus, validators_1.RequiredValidator, validators_1.MinLengthValidator, validators_1.MaxLengthValidator, validators_1.PatternValidator]);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/validators.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/promise.js", "node_modules/angular2/src/facade/async.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/core.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var promise_1 = $__require('node_modules/angular2/src/facade/promise.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  exports.NG_VALIDATORS = lang_1.CONST_EXPR(new core_1.OpaqueToken("NgValidators"));
  exports.NG_ASYNC_VALIDATORS = lang_1.CONST_EXPR(new core_1.OpaqueToken("NgAsyncValidators"));
  var Validators = (function() {
    function Validators() {}
    Validators.required = function(control) {
      return lang_1.isBlank(control.value) || (lang_1.isString(control.value) && control.value == "") ? {"required": true} : null;
    };
    Validators.minLength = function(minLength) {
      return function(control) {
        if (lang_1.isPresent(Validators.required(control)))
          return null;
        var v = control.value;
        return v.length < minLength ? {"minlength": {
            "requiredLength": minLength,
            "actualLength": v.length
          }} : null;
      };
    };
    Validators.maxLength = function(maxLength) {
      return function(control) {
        if (lang_1.isPresent(Validators.required(control)))
          return null;
        var v = control.value;
        return v.length > maxLength ? {"maxlength": {
            "requiredLength": maxLength,
            "actualLength": v.length
          }} : null;
      };
    };
    Validators.pattern = function(pattern) {
      return function(control) {
        if (lang_1.isPresent(Validators.required(control)))
          return null;
        var regex = new RegExp("^" + pattern + "$");
        var v = control.value;
        return regex.test(v) ? null : {"pattern": {
            "requiredPattern": "^" + pattern + "$",
            "actualValue": v
          }};
      };
    };
    Validators.nullValidator = function(c) {
      return null;
    };
    Validators.compose = function(validators) {
      if (lang_1.isBlank(validators))
        return null;
      var presentValidators = validators.filter(lang_1.isPresent);
      if (presentValidators.length == 0)
        return null;
      return function(control) {
        return _mergeErrors(_executeValidators(control, presentValidators));
      };
    };
    Validators.composeAsync = function(validators) {
      if (lang_1.isBlank(validators))
        return null;
      var presentValidators = validators.filter(lang_1.isPresent);
      if (presentValidators.length == 0)
        return null;
      return function(control) {
        var promises = _executeAsyncValidators(control, presentValidators).map(_convertToPromise);
        return promise_1.PromiseWrapper.all(promises).then(_mergeErrors);
      };
    };
    return Validators;
  })();
  exports.Validators = Validators;
  function _convertToPromise(obj) {
    return promise_1.PromiseWrapper.isPromise(obj) ? obj : async_1.ObservableWrapper.toPromise(obj);
  }
  function _executeValidators(control, validators) {
    return validators.map(function(v) {
      return v(control);
    });
  }
  function _executeAsyncValidators(control, validators) {
    return validators.map(function(v) {
      return v(control);
    });
  }
  function _mergeErrors(arrayOfErrors) {
    var res = arrayOfErrors.reduce(function(res, errors) {
      return lang_1.isPresent(errors) ? collection_1.StringMapWrapper.merge(res, errors) : res;
    }, {});
    return collection_1.StringMapWrapper.isEmpty(res) ? null : res;
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/validators.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/common/forms/validators.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('node_modules/angular2/core.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var validators_1 = $__require('node_modules/angular2/src/common/forms/validators.js');
  var lang_2 = $__require('node_modules/angular2/src/facade/lang.js');
  var REQUIRED_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(validators_1.NG_VALIDATORS, {
    useValue: validators_1.Validators.required,
    multi: true
  }));
  var RequiredValidator = (function() {
    function RequiredValidator() {}
    RequiredValidator = __decorate([core_1.Directive({
      selector: '[required][ngControl],[required][ngFormControl],[required][ngModel]',
      providers: [REQUIRED_VALIDATOR]
    }), __metadata('design:paramtypes', [])], RequiredValidator);
    return RequiredValidator;
  })();
  exports.RequiredValidator = RequiredValidator;
  var MIN_LENGTH_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(validators_1.NG_VALIDATORS, {
    useExisting: core_1.forwardRef(function() {
      return MinLengthValidator;
    }),
    multi: true
  }));
  var MinLengthValidator = (function() {
    function MinLengthValidator(minLength) {
      this._validator = validators_1.Validators.minLength(lang_2.NumberWrapper.parseInt(minLength, 10));
    }
    MinLengthValidator.prototype.validate = function(c) {
      return this._validator(c);
    };
    MinLengthValidator = __decorate([core_1.Directive({
      selector: '[minlength][ngControl],[minlength][ngFormControl],[minlength][ngModel]',
      providers: [MIN_LENGTH_VALIDATOR]
    }), __param(0, core_1.Attribute("minlength")), __metadata('design:paramtypes', [String])], MinLengthValidator);
    return MinLengthValidator;
  })();
  exports.MinLengthValidator = MinLengthValidator;
  var MAX_LENGTH_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(validators_1.NG_VALIDATORS, {
    useExisting: core_1.forwardRef(function() {
      return MaxLengthValidator;
    }),
    multi: true
  }));
  var MaxLengthValidator = (function() {
    function MaxLengthValidator(maxLength) {
      this._validator = validators_1.Validators.maxLength(lang_2.NumberWrapper.parseInt(maxLength, 10));
    }
    MaxLengthValidator.prototype.validate = function(c) {
      return this._validator(c);
    };
    MaxLengthValidator = __decorate([core_1.Directive({
      selector: '[maxlength][ngControl],[maxlength][ngFormControl],[maxlength][ngModel]',
      providers: [MAX_LENGTH_VALIDATOR]
    }), __param(0, core_1.Attribute("maxlength")), __metadata('design:paramtypes', [String])], MaxLengthValidator);
    return MaxLengthValidator;
  })();
  exports.MaxLengthValidator = MaxLengthValidator;
  var PATTERN_VALIDATOR = lang_1.CONST_EXPR(new core_1.Provider(validators_1.NG_VALIDATORS, {
    useExisting: core_1.forwardRef(function() {
      return PatternValidator;
    }),
    multi: true
  }));
  var PatternValidator = (function() {
    function PatternValidator(pattern) {
      this._validator = validators_1.Validators.pattern(pattern);
    }
    PatternValidator.prototype.validate = function(c) {
      return this._validator(c);
    };
    PatternValidator = __decorate([core_1.Directive({
      selector: '[pattern][ngControl],[pattern][ngFormControl],[pattern][ngModel]',
      providers: [PATTERN_VALIDATOR]
    }), __param(0, core_1.Attribute("pattern")), __metadata('design:paramtypes', [String])], PatternValidator);
    return PatternValidator;
  })();
  exports.PatternValidator = PatternValidator;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/model.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/async.js", "node_modules/angular2/src/facade/promise.js", "node_modules/angular2/src/facade/collection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var promise_1 = $__require('node_modules/angular2/src/facade/promise.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  exports.VALID = "VALID";
  exports.INVALID = "INVALID";
  exports.PENDING = "PENDING";
  function isControl(control) {
    return control instanceof AbstractControl;
  }
  exports.isControl = isControl;
  function _find(control, path) {
    if (lang_1.isBlank(path))
      return null;
    if (!(path instanceof Array)) {
      path = path.split("/");
    }
    if (path instanceof Array && collection_1.ListWrapper.isEmpty(path))
      return null;
    return path.reduce(function(v, name) {
      if (v instanceof ControlGroup) {
        return lang_1.isPresent(v.controls[name]) ? v.controls[name] : null;
      } else if (v instanceof ControlArray) {
        var index = name;
        return lang_1.isPresent(v.at(index)) ? v.at(index) : null;
      } else {
        return null;
      }
    }, control);
  }
  function toObservable(r) {
    return promise_1.PromiseWrapper.isPromise(r) ? async_1.ObservableWrapper.fromPromise(r) : r;
  }
  var AbstractControl = (function() {
    function AbstractControl(validator, asyncValidator) {
      this.validator = validator;
      this.asyncValidator = asyncValidator;
      this._pristine = true;
      this._touched = false;
    }
    Object.defineProperty(AbstractControl.prototype, "value", {
      get: function() {
        return this._value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "status", {
      get: function() {
        return this._status;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "valid", {
      get: function() {
        return this._status === exports.VALID;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "errors", {
      get: function() {
        return this._errors;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "pristine", {
      get: function() {
        return this._pristine;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "dirty", {
      get: function() {
        return !this.pristine;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "touched", {
      get: function() {
        return this._touched;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "untouched", {
      get: function() {
        return !this._touched;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "valueChanges", {
      get: function() {
        return this._valueChanges;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "statusChanges", {
      get: function() {
        return this._statusChanges;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "pending", {
      get: function() {
        return this._status == exports.PENDING;
      },
      enumerable: true,
      configurable: true
    });
    AbstractControl.prototype.markAsTouched = function() {
      this._touched = true;
    };
    AbstractControl.prototype.markAsDirty = function(_a) {
      var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
      onlySelf = lang_1.normalizeBool(onlySelf);
      this._pristine = false;
      if (lang_1.isPresent(this._parent) && !onlySelf) {
        this._parent.markAsDirty({onlySelf: onlySelf});
      }
    };
    AbstractControl.prototype.markAsPending = function(_a) {
      var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
      onlySelf = lang_1.normalizeBool(onlySelf);
      this._status = exports.PENDING;
      if (lang_1.isPresent(this._parent) && !onlySelf) {
        this._parent.markAsPending({onlySelf: onlySelf});
      }
    };
    AbstractControl.prototype.setParent = function(parent) {
      this._parent = parent;
    };
    AbstractControl.prototype.updateValueAndValidity = function(_a) {
      var _b = _a === void 0 ? {} : _a,
          onlySelf = _b.onlySelf,
          emitEvent = _b.emitEvent;
      onlySelf = lang_1.normalizeBool(onlySelf);
      emitEvent = lang_1.isPresent(emitEvent) ? emitEvent : true;
      this._updateValue();
      this._errors = this._runValidator();
      this._status = this._calculateStatus();
      if (this._status == exports.VALID || this._status == exports.PENDING) {
        this._runAsyncValidator(emitEvent);
      }
      if (emitEvent) {
        async_1.ObservableWrapper.callEmit(this._valueChanges, this._value);
        async_1.ObservableWrapper.callEmit(this._statusChanges, this._status);
      }
      if (lang_1.isPresent(this._parent) && !onlySelf) {
        this._parent.updateValueAndValidity({
          onlySelf: onlySelf,
          emitEvent: emitEvent
        });
      }
    };
    AbstractControl.prototype._runValidator = function() {
      return lang_1.isPresent(this.validator) ? this.validator(this) : null;
    };
    AbstractControl.prototype._runAsyncValidator = function(emitEvent) {
      var _this = this;
      if (lang_1.isPresent(this.asyncValidator)) {
        this._status = exports.PENDING;
        this._cancelExistingSubscription();
        var obs = toObservable(this.asyncValidator(this));
        this._asyncValidationSubscription = async_1.ObservableWrapper.subscribe(obs, function(res) {
          return _this.setErrors(res, {emitEvent: emitEvent});
        });
      }
    };
    AbstractControl.prototype._cancelExistingSubscription = function() {
      if (lang_1.isPresent(this._asyncValidationSubscription)) {
        async_1.ObservableWrapper.dispose(this._asyncValidationSubscription);
      }
    };
    AbstractControl.prototype.setErrors = function(errors, _a) {
      var emitEvent = (_a === void 0 ? {} : _a).emitEvent;
      emitEvent = lang_1.isPresent(emitEvent) ? emitEvent : true;
      this._errors = errors;
      this._status = this._calculateStatus();
      if (emitEvent) {
        async_1.ObservableWrapper.callEmit(this._statusChanges, this._status);
      }
      if (lang_1.isPresent(this._parent)) {
        this._parent._updateControlsErrors();
      }
    };
    AbstractControl.prototype.find = function(path) {
      return _find(this, path);
    };
    AbstractControl.prototype.getError = function(errorCode, path) {
      if (path === void 0) {
        path = null;
      }
      var control = lang_1.isPresent(path) && !collection_1.ListWrapper.isEmpty(path) ? this.find(path) : this;
      if (lang_1.isPresent(control) && lang_1.isPresent(control._errors)) {
        return collection_1.StringMapWrapper.get(control._errors, errorCode);
      } else {
        return null;
      }
    };
    AbstractControl.prototype.hasError = function(errorCode, path) {
      if (path === void 0) {
        path = null;
      }
      return lang_1.isPresent(this.getError(errorCode, path));
    };
    Object.defineProperty(AbstractControl.prototype, "root", {
      get: function() {
        var x = this;
        while (lang_1.isPresent(x._parent)) {
          x = x._parent;
        }
        return x;
      },
      enumerable: true,
      configurable: true
    });
    AbstractControl.prototype._updateControlsErrors = function() {
      this._status = this._calculateStatus();
      if (lang_1.isPresent(this._parent)) {
        this._parent._updateControlsErrors();
      }
    };
    AbstractControl.prototype._initObservables = function() {
      this._valueChanges = new async_1.EventEmitter();
      this._statusChanges = new async_1.EventEmitter();
    };
    AbstractControl.prototype._calculateStatus = function() {
      if (lang_1.isPresent(this._errors))
        return exports.INVALID;
      if (this._anyControlsHaveStatus(exports.PENDING))
        return exports.PENDING;
      if (this._anyControlsHaveStatus(exports.INVALID))
        return exports.INVALID;
      return exports.VALID;
    };
    return AbstractControl;
  })();
  exports.AbstractControl = AbstractControl;
  var Control = (function(_super) {
    __extends(Control, _super);
    function Control(value, validator, asyncValidator) {
      if (value === void 0) {
        value = null;
      }
      if (validator === void 0) {
        validator = null;
      }
      if (asyncValidator === void 0) {
        asyncValidator = null;
      }
      _super.call(this, validator, asyncValidator);
      this._value = value;
      this.updateValueAndValidity({
        onlySelf: true,
        emitEvent: false
      });
      this._initObservables();
    }
    Control.prototype.updateValue = function(value, _a) {
      var _b = _a === void 0 ? {} : _a,
          onlySelf = _b.onlySelf,
          emitEvent = _b.emitEvent,
          emitModelToViewChange = _b.emitModelToViewChange;
      emitModelToViewChange = lang_1.isPresent(emitModelToViewChange) ? emitModelToViewChange : true;
      this._value = value;
      if (lang_1.isPresent(this._onChange) && emitModelToViewChange)
        this._onChange(this._value);
      this.updateValueAndValidity({
        onlySelf: onlySelf,
        emitEvent: emitEvent
      });
    };
    Control.prototype._updateValue = function() {};
    Control.prototype._anyControlsHaveStatus = function(status) {
      return false;
    };
    Control.prototype.registerOnChange = function(fn) {
      this._onChange = fn;
    };
    return Control;
  })(AbstractControl);
  exports.Control = Control;
  var ControlGroup = (function(_super) {
    __extends(ControlGroup, _super);
    function ControlGroup(controls, optionals, validator, asyncValidator) {
      if (optionals === void 0) {
        optionals = null;
      }
      if (validator === void 0) {
        validator = null;
      }
      if (asyncValidator === void 0) {
        asyncValidator = null;
      }
      _super.call(this, validator, asyncValidator);
      this.controls = controls;
      this._optionals = lang_1.isPresent(optionals) ? optionals : {};
      this._initObservables();
      this._setParentForControls();
      this.updateValueAndValidity({
        onlySelf: true,
        emitEvent: false
      });
    }
    ControlGroup.prototype.addControl = function(name, control) {
      this.controls[name] = control;
      control.setParent(this);
    };
    ControlGroup.prototype.removeControl = function(name) {
      collection_1.StringMapWrapper.delete(this.controls, name);
    };
    ControlGroup.prototype.include = function(controlName) {
      collection_1.StringMapWrapper.set(this._optionals, controlName, true);
      this.updateValueAndValidity();
    };
    ControlGroup.prototype.exclude = function(controlName) {
      collection_1.StringMapWrapper.set(this._optionals, controlName, false);
      this.updateValueAndValidity();
    };
    ControlGroup.prototype.contains = function(controlName) {
      var c = collection_1.StringMapWrapper.contains(this.controls, controlName);
      return c && this._included(controlName);
    };
    ControlGroup.prototype._setParentForControls = function() {
      var _this = this;
      collection_1.StringMapWrapper.forEach(this.controls, function(control, name) {
        control.setParent(_this);
      });
    };
    ControlGroup.prototype._updateValue = function() {
      this._value = this._reduceValue();
    };
    ControlGroup.prototype._anyControlsHaveStatus = function(status) {
      var _this = this;
      var res = false;
      collection_1.StringMapWrapper.forEach(this.controls, function(control, name) {
        res = res || (_this.contains(name) && control.status == status);
      });
      return res;
    };
    ControlGroup.prototype._reduceValue = function() {
      return this._reduceChildren({}, function(acc, control, name) {
        acc[name] = control.value;
        return acc;
      });
    };
    ControlGroup.prototype._reduceChildren = function(initValue, fn) {
      var _this = this;
      var res = initValue;
      collection_1.StringMapWrapper.forEach(this.controls, function(control, name) {
        if (_this._included(name)) {
          res = fn(res, control, name);
        }
      });
      return res;
    };
    ControlGroup.prototype._included = function(controlName) {
      var isOptional = collection_1.StringMapWrapper.contains(this._optionals, controlName);
      return !isOptional || collection_1.StringMapWrapper.get(this._optionals, controlName);
    };
    return ControlGroup;
  })(AbstractControl);
  exports.ControlGroup = ControlGroup;
  var ControlArray = (function(_super) {
    __extends(ControlArray, _super);
    function ControlArray(controls, validator, asyncValidator) {
      if (validator === void 0) {
        validator = null;
      }
      if (asyncValidator === void 0) {
        asyncValidator = null;
      }
      _super.call(this, validator, asyncValidator);
      this.controls = controls;
      this._initObservables();
      this._setParentForControls();
      this.updateValueAndValidity({
        onlySelf: true,
        emitEvent: false
      });
    }
    ControlArray.prototype.at = function(index) {
      return this.controls[index];
    };
    ControlArray.prototype.push = function(control) {
      this.controls.push(control);
      control.setParent(this);
      this.updateValueAndValidity();
    };
    ControlArray.prototype.insert = function(index, control) {
      collection_1.ListWrapper.insert(this.controls, index, control);
      control.setParent(this);
      this.updateValueAndValidity();
    };
    ControlArray.prototype.removeAt = function(index) {
      collection_1.ListWrapper.removeAt(this.controls, index);
      this.updateValueAndValidity();
    };
    Object.defineProperty(ControlArray.prototype, "length", {
      get: function() {
        return this.controls.length;
      },
      enumerable: true,
      configurable: true
    });
    ControlArray.prototype._updateValue = function() {
      this._value = this.controls.map(function(control) {
        return control.value;
      });
    };
    ControlArray.prototype._anyControlsHaveStatus = function(status) {
      return this.controls.some(function(c) {
        return c.status == status;
      });
    };
    ControlArray.prototype._setParentForControls = function() {
      var _this = this;
      this.controls.forEach(function(control) {
        control.setParent(_this);
      });
    };
    return ControlArray;
  })(AbstractControl);
  exports.ControlArray = ControlArray;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/form_builder.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/common/forms/model.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var modelModule = $__require('node_modules/angular2/src/common/forms/model.js');
  var FormBuilder = (function() {
    function FormBuilder() {}
    FormBuilder.prototype.group = function(controlsConfig, extra) {
      if (extra === void 0) {
        extra = null;
      }
      var controls = this._reduceControls(controlsConfig);
      var optionals = (lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "optionals") : null);
      var validator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "validator") : null;
      var asyncValidator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "asyncValidator") : null;
      return new modelModule.ControlGroup(controls, optionals, validator, asyncValidator);
    };
    FormBuilder.prototype.control = function(value, validator, asyncValidator) {
      if (validator === void 0) {
        validator = null;
      }
      if (asyncValidator === void 0) {
        asyncValidator = null;
      }
      return new modelModule.Control(value, validator, asyncValidator);
    };
    FormBuilder.prototype.array = function(controlsConfig, validator, asyncValidator) {
      var _this = this;
      if (validator === void 0) {
        validator = null;
      }
      if (asyncValidator === void 0) {
        asyncValidator = null;
      }
      var controls = controlsConfig.map(function(c) {
        return _this._createControl(c);
      });
      return new modelModule.ControlArray(controls, validator, asyncValidator);
    };
    FormBuilder.prototype._reduceControls = function(controlsConfig) {
      var _this = this;
      var controls = {};
      collection_1.StringMapWrapper.forEach(controlsConfig, function(controlConfig, controlName) {
        controls[controlName] = _this._createControl(controlConfig);
      });
      return controls;
    };
    FormBuilder.prototype._createControl = function(controlConfig) {
      if (controlConfig instanceof modelModule.Control || controlConfig instanceof modelModule.ControlGroup || controlConfig instanceof modelModule.ControlArray) {
        return controlConfig;
      } else if (lang_1.isArray(controlConfig)) {
        var value = controlConfig[0];
        var validator = controlConfig.length > 1 ? controlConfig[1] : null;
        var asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
        return this.control(value, validator, asyncValidator);
      } else {
        return this.control(controlConfig);
      }
    };
    FormBuilder = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], FormBuilder);
    return FormBuilder;
  })();
  exports.FormBuilder = FormBuilder;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/control_value_accessor.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core_1 = $__require('node_modules/angular2/core.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  exports.NG_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.OpaqueToken("NgValueAccessor"));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/abstract_control_directive.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var AbstractControlDirective = (function() {
    function AbstractControlDirective() {}
    Object.defineProperty(AbstractControlDirective.prototype, "control", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "value", {
      get: function() {
        return lang_1.isPresent(this.control) ? this.control.value : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "valid", {
      get: function() {
        return lang_1.isPresent(this.control) ? this.control.valid : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "errors", {
      get: function() {
        return lang_1.isPresent(this.control) ? this.control.errors : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "pristine", {
      get: function() {
        return lang_1.isPresent(this.control) ? this.control.pristine : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "dirty", {
      get: function() {
        return lang_1.isPresent(this.control) ? this.control.dirty : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "touched", {
      get: function() {
        return lang_1.isPresent(this.control) ? this.control.touched : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "untouched", {
      get: function() {
        return lang_1.isPresent(this.control) ? this.control.untouched : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AbstractControlDirective.prototype, "path", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    return AbstractControlDirective;
  })();
  exports.AbstractControlDirective = AbstractControlDirective;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/ng_control.js", ["node_modules/angular2/src/common/forms/directives/abstract_control_directive.js", "node_modules/angular2/src/facade/exceptions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var abstract_control_directive_1 = $__require('node_modules/angular2/src/common/forms/directives/abstract_control_directive.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var NgControl = (function(_super) {
    __extends(NgControl, _super);
    function NgControl() {
      _super.apply(this, arguments);
      this.name = null;
      this.valueAccessor = null;
    }
    Object.defineProperty(NgControl.prototype, "validator", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgControl.prototype, "asyncValidator", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    return NgControl;
  })(abstract_control_directive_1.AbstractControlDirective);
  exports.NgControl = NgControl;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms/directives/radio_control_value_accessor.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/common/forms/directives/control_value_accessor.js", "node_modules/angular2/src/common/forms/directives/ng_control.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/collection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/control_value_accessor.js');
  var ng_control_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_control.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var RADIO_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(control_value_accessor_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function() {
      return RadioControlValueAccessor;
    }),
    multi: true
  }));
  var RadioControlRegistry = (function() {
    function RadioControlRegistry() {
      this._accessors = [];
    }
    RadioControlRegistry.prototype.add = function(control, accessor) {
      this._accessors.push([control, accessor]);
    };
    RadioControlRegistry.prototype.remove = function(accessor) {
      var indexToRemove = -1;
      for (var i = 0; i < this._accessors.length; ++i) {
        if (this._accessors[i][1] === accessor) {
          indexToRemove = i;
        }
      }
      collection_1.ListWrapper.removeAt(this._accessors, indexToRemove);
    };
    RadioControlRegistry.prototype.select = function(accessor) {
      this._accessors.forEach(function(c) {
        if (c[0].control.root === accessor._control.control.root && c[1] !== accessor) {
          c[1].fireUncheck();
        }
      });
    };
    RadioControlRegistry = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], RadioControlRegistry);
    return RadioControlRegistry;
  })();
  exports.RadioControlRegistry = RadioControlRegistry;
  var RadioButtonState = (function() {
    function RadioButtonState(checked, value) {
      this.checked = checked;
      this.value = value;
    }
    return RadioButtonState;
  })();
  exports.RadioButtonState = RadioButtonState;
  var RadioControlValueAccessor = (function() {
    function RadioControlValueAccessor(_renderer, _elementRef, _registry, _injector) {
      this._renderer = _renderer;
      this._elementRef = _elementRef;
      this._registry = _registry;
      this._injector = _injector;
      this.onChange = function() {};
      this.onTouched = function() {};
    }
    RadioControlValueAccessor.prototype.ngOnInit = function() {
      this._control = this._injector.get(ng_control_1.NgControl);
      this._registry.add(this._control, this);
    };
    RadioControlValueAccessor.prototype.ngOnDestroy = function() {
      this._registry.remove(this);
    };
    RadioControlValueAccessor.prototype.writeValue = function(value) {
      this._state = value;
      if (lang_1.isPresent(value) && value.checked) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', true);
      }
    };
    RadioControlValueAccessor.prototype.registerOnChange = function(fn) {
      var _this = this;
      this._fn = fn;
      this.onChange = function() {
        fn(new RadioButtonState(true, _this._state.value));
        _this._registry.select(_this);
      };
    };
    RadioControlValueAccessor.prototype.fireUncheck = function() {
      this._fn(new RadioButtonState(false, this._state.value));
    };
    RadioControlValueAccessor.prototype.registerOnTouched = function(fn) {
      this.onTouched = fn;
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], RadioControlValueAccessor.prototype, "name", void 0);
    RadioControlValueAccessor = __decorate([core_1.Directive({
      selector: 'input[type=radio][ngControl],input[type=radio][ngFormControl],input[type=radio][ngModel]',
      host: {
        '(change)': 'onChange()',
        '(blur)': 'onTouched()'
      },
      providers: [RADIO_VALUE_ACCESSOR]
    }), __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, RadioControlRegistry, core_1.Injector])], RadioControlValueAccessor);
    return RadioControlValueAccessor;
  })();
  exports.RadioControlValueAccessor = RadioControlValueAccessor;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/forms.js", ["node_modules/angular2/src/common/forms/model.js", "node_modules/angular2/src/common/forms/directives/abstract_control_directive.js", "node_modules/angular2/src/common/forms/directives/control_container.js", "node_modules/angular2/src/common/forms/directives/ng_control_name.js", "node_modules/angular2/src/common/forms/directives/ng_form_control.js", "node_modules/angular2/src/common/forms/directives/ng_model.js", "node_modules/angular2/src/common/forms/directives/ng_control.js", "node_modules/angular2/src/common/forms/directives/ng_control_group.js", "node_modules/angular2/src/common/forms/directives/ng_form_model.js", "node_modules/angular2/src/common/forms/directives/ng_form.js", "node_modules/angular2/src/common/forms/directives/control_value_accessor.js", "node_modules/angular2/src/common/forms/directives/default_value_accessor.js", "node_modules/angular2/src/common/forms/directives/ng_control_status.js", "node_modules/angular2/src/common/forms/directives/checkbox_value_accessor.js", "node_modules/angular2/src/common/forms/directives/select_control_value_accessor.js", "node_modules/angular2/src/common/forms/directives.js", "node_modules/angular2/src/common/forms/validators.js", "node_modules/angular2/src/common/forms/directives/validators.js", "node_modules/angular2/src/common/forms/form_builder.js", "node_modules/angular2/src/common/forms/directives/radio_control_value_accessor.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var model_1 = $__require('node_modules/angular2/src/common/forms/model.js');
  exports.AbstractControl = model_1.AbstractControl;
  exports.Control = model_1.Control;
  exports.ControlGroup = model_1.ControlGroup;
  exports.ControlArray = model_1.ControlArray;
  var abstract_control_directive_1 = $__require('node_modules/angular2/src/common/forms/directives/abstract_control_directive.js');
  exports.AbstractControlDirective = abstract_control_directive_1.AbstractControlDirective;
  var control_container_1 = $__require('node_modules/angular2/src/common/forms/directives/control_container.js');
  exports.ControlContainer = control_container_1.ControlContainer;
  var ng_control_name_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_control_name.js');
  exports.NgControlName = ng_control_name_1.NgControlName;
  var ng_form_control_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_form_control.js');
  exports.NgFormControl = ng_form_control_1.NgFormControl;
  var ng_model_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_model.js');
  exports.NgModel = ng_model_1.NgModel;
  var ng_control_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_control.js');
  exports.NgControl = ng_control_1.NgControl;
  var ng_control_group_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_control_group.js');
  exports.NgControlGroup = ng_control_group_1.NgControlGroup;
  var ng_form_model_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_form_model.js');
  exports.NgFormModel = ng_form_model_1.NgFormModel;
  var ng_form_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_form.js');
  exports.NgForm = ng_form_1.NgForm;
  var control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/control_value_accessor.js');
  exports.NG_VALUE_ACCESSOR = control_value_accessor_1.NG_VALUE_ACCESSOR;
  var default_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/default_value_accessor.js');
  exports.DefaultValueAccessor = default_value_accessor_1.DefaultValueAccessor;
  var ng_control_status_1 = $__require('node_modules/angular2/src/common/forms/directives/ng_control_status.js');
  exports.NgControlStatus = ng_control_status_1.NgControlStatus;
  var checkbox_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/checkbox_value_accessor.js');
  exports.CheckboxControlValueAccessor = checkbox_value_accessor_1.CheckboxControlValueAccessor;
  var select_control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/select_control_value_accessor.js');
  exports.NgSelectOption = select_control_value_accessor_1.NgSelectOption;
  exports.SelectControlValueAccessor = select_control_value_accessor_1.SelectControlValueAccessor;
  var directives_1 = $__require('node_modules/angular2/src/common/forms/directives.js');
  exports.FORM_DIRECTIVES = directives_1.FORM_DIRECTIVES;
  exports.RadioButtonState = directives_1.RadioButtonState;
  var validators_1 = $__require('node_modules/angular2/src/common/forms/validators.js');
  exports.NG_VALIDATORS = validators_1.NG_VALIDATORS;
  exports.NG_ASYNC_VALIDATORS = validators_1.NG_ASYNC_VALIDATORS;
  exports.Validators = validators_1.Validators;
  var validators_2 = $__require('node_modules/angular2/src/common/forms/directives/validators.js');
  exports.RequiredValidator = validators_2.RequiredValidator;
  exports.MinLengthValidator = validators_2.MinLengthValidator;
  exports.MaxLengthValidator = validators_2.MaxLengthValidator;
  exports.PatternValidator = validators_2.PatternValidator;
  var form_builder_1 = $__require('node_modules/angular2/src/common/forms/form_builder.js');
  exports.FormBuilder = form_builder_1.FormBuilder;
  var form_builder_2 = $__require('node_modules/angular2/src/common/forms/form_builder.js');
  var radio_control_value_accessor_1 = $__require('node_modules/angular2/src/common/forms/directives/radio_control_value_accessor.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  exports.FORM_PROVIDERS = lang_1.CONST_EXPR([form_builder_2.FormBuilder, radio_control_value_accessor_1.RadioControlRegistry]);
  exports.FORM_BINDINGS = exports.FORM_PROVIDERS;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/directives/observable_list_diff.js", [], false, function(__require, __exports, __module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal(__module.id, null, null);
  (function() {
    'use strict';
  })();
  return _retrieveGlobal();
});

System.registerDynamic("node_modules/angular2/src/common/directives/ng_class.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/core.js", "node_modules/angular2/src/facade/collection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var core_1 = $__require('node_modules/angular2/core.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var NgClass = (function() {
    function NgClass(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer) {
      this._iterableDiffers = _iterableDiffers;
      this._keyValueDiffers = _keyValueDiffers;
      this._ngEl = _ngEl;
      this._renderer = _renderer;
      this._initialClasses = [];
    }
    Object.defineProperty(NgClass.prototype, "initialClasses", {
      set: function(v) {
        this._applyInitialClasses(true);
        this._initialClasses = lang_1.isPresent(v) && lang_1.isString(v) ? v.split(' ') : [];
        this._applyInitialClasses(false);
        this._applyClasses(this._rawClass, false);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgClass.prototype, "rawClass", {
      set: function(v) {
        this._cleanupClasses(this._rawClass);
        if (lang_1.isString(v)) {
          v = v.split(' ');
        }
        this._rawClass = v;
        this._iterableDiffer = null;
        this._keyValueDiffer = null;
        if (lang_1.isPresent(v)) {
          if (collection_1.isListLikeIterable(v)) {
            this._iterableDiffer = this._iterableDiffers.find(v).create(null);
          } else {
            this._keyValueDiffer = this._keyValueDiffers.find(v).create(null);
          }
        }
      },
      enumerable: true,
      configurable: true
    });
    NgClass.prototype.ngDoCheck = function() {
      if (lang_1.isPresent(this._iterableDiffer)) {
        var changes = this._iterableDiffer.diff(this._rawClass);
        if (lang_1.isPresent(changes)) {
          this._applyIterableChanges(changes);
        }
      }
      if (lang_1.isPresent(this._keyValueDiffer)) {
        var changes = this._keyValueDiffer.diff(this._rawClass);
        if (lang_1.isPresent(changes)) {
          this._applyKeyValueChanges(changes);
        }
      }
    };
    NgClass.prototype.ngOnDestroy = function() {
      this._cleanupClasses(this._rawClass);
    };
    NgClass.prototype._cleanupClasses = function(rawClassVal) {
      this._applyClasses(rawClassVal, true);
      this._applyInitialClasses(false);
    };
    NgClass.prototype._applyKeyValueChanges = function(changes) {
      var _this = this;
      changes.forEachAddedItem(function(record) {
        _this._toggleClass(record.key, record.currentValue);
      });
      changes.forEachChangedItem(function(record) {
        _this._toggleClass(record.key, record.currentValue);
      });
      changes.forEachRemovedItem(function(record) {
        if (record.previousValue) {
          _this._toggleClass(record.key, false);
        }
      });
    };
    NgClass.prototype._applyIterableChanges = function(changes) {
      var _this = this;
      changes.forEachAddedItem(function(record) {
        _this._toggleClass(record.item, true);
      });
      changes.forEachRemovedItem(function(record) {
        _this._toggleClass(record.item, false);
      });
    };
    NgClass.prototype._applyInitialClasses = function(isCleanup) {
      var _this = this;
      this._initialClasses.forEach(function(className) {
        return _this._toggleClass(className, !isCleanup);
      });
    };
    NgClass.prototype._applyClasses = function(rawClassVal, isCleanup) {
      var _this = this;
      if (lang_1.isPresent(rawClassVal)) {
        if (lang_1.isArray(rawClassVal)) {
          rawClassVal.forEach(function(className) {
            return _this._toggleClass(className, !isCleanup);
          });
        } else if (rawClassVal instanceof Set) {
          rawClassVal.forEach(function(className) {
            return _this._toggleClass(className, !isCleanup);
          });
        } else {
          collection_1.StringMapWrapper.forEach(rawClassVal, function(expVal, className) {
            if (lang_1.isPresent(expVal))
              _this._toggleClass(className, !isCleanup);
          });
        }
      }
    };
    NgClass.prototype._toggleClass = function(className, enabled) {
      className = className.trim();
      if (className.length > 0) {
        if (className.indexOf(' ') > -1) {
          var classes = className.split(/\s+/g);
          for (var i = 0,
              len = classes.length; i < len; i++) {
            this._renderer.setElementClass(this._ngEl.nativeElement, classes[i], enabled);
          }
        } else {
          this._renderer.setElementClass(this._ngEl.nativeElement, className, enabled);
        }
      }
    };
    NgClass = __decorate([core_1.Directive({
      selector: '[ngClass]',
      inputs: ['rawClass: ngClass', 'initialClasses: class']
    }), __metadata('design:paramtypes', [core_1.IterableDiffers, core_1.KeyValueDiffers, core_1.ElementRef, core_1.Renderer])], NgClass);
    return NgClass;
  })();
  exports.NgClass = NgClass;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/directives/ng_for.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var NgFor = (function() {
    function NgFor(_viewContainer, _templateRef, _iterableDiffers, _cdr) {
      this._viewContainer = _viewContainer;
      this._templateRef = _templateRef;
      this._iterableDiffers = _iterableDiffers;
      this._cdr = _cdr;
    }
    Object.defineProperty(NgFor.prototype, "ngForOf", {
      set: function(value) {
        this._ngForOf = value;
        if (lang_1.isBlank(this._differ) && lang_1.isPresent(value)) {
          this._differ = this._iterableDiffers.find(value).create(this._cdr, this._ngForTrackBy);
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgFor.prototype, "ngForTemplate", {
      set: function(value) {
        if (lang_1.isPresent(value)) {
          this._templateRef = value;
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgFor.prototype, "ngForTrackBy", {
      set: function(value) {
        this._ngForTrackBy = value;
      },
      enumerable: true,
      configurable: true
    });
    NgFor.prototype.ngDoCheck = function() {
      if (lang_1.isPresent(this._differ)) {
        var changes = this._differ.diff(this._ngForOf);
        if (lang_1.isPresent(changes))
          this._applyChanges(changes);
      }
    };
    NgFor.prototype._applyChanges = function(changes) {
      var _this = this;
      var recordViewTuples = [];
      changes.forEachRemovedItem(function(removedRecord) {
        return recordViewTuples.push(new RecordViewTuple(removedRecord, null));
      });
      changes.forEachMovedItem(function(movedRecord) {
        return recordViewTuples.push(new RecordViewTuple(movedRecord, null));
      });
      var insertTuples = this._bulkRemove(recordViewTuples);
      changes.forEachAddedItem(function(addedRecord) {
        return insertTuples.push(new RecordViewTuple(addedRecord, null));
      });
      this._bulkInsert(insertTuples);
      for (var i = 0; i < insertTuples.length; i++) {
        this._perViewChange(insertTuples[i].view, insertTuples[i].record);
      }
      for (var i = 0,
          ilen = this._viewContainer.length; i < ilen; i++) {
        var viewRef = this._viewContainer.get(i);
        viewRef.setLocal('last', i === ilen - 1);
      }
      changes.forEachIdentityChange(function(record) {
        var viewRef = _this._viewContainer.get(record.currentIndex);
        viewRef.setLocal('\$implicit', record.item);
      });
    };
    NgFor.prototype._perViewChange = function(view, record) {
      view.setLocal('\$implicit', record.item);
      view.setLocal('index', record.currentIndex);
      view.setLocal('even', (record.currentIndex % 2 == 0));
      view.setLocal('odd', (record.currentIndex % 2 == 1));
    };
    NgFor.prototype._bulkRemove = function(tuples) {
      tuples.sort(function(a, b) {
        return a.record.previousIndex - b.record.previousIndex;
      });
      var movedTuples = [];
      for (var i = tuples.length - 1; i >= 0; i--) {
        var tuple = tuples[i];
        if (lang_1.isPresent(tuple.record.currentIndex)) {
          tuple.view = this._viewContainer.detach(tuple.record.previousIndex);
          movedTuples.push(tuple);
        } else {
          this._viewContainer.remove(tuple.record.previousIndex);
        }
      }
      return movedTuples;
    };
    NgFor.prototype._bulkInsert = function(tuples) {
      tuples.sort(function(a, b) {
        return a.record.currentIndex - b.record.currentIndex;
      });
      for (var i = 0; i < tuples.length; i++) {
        var tuple = tuples[i];
        if (lang_1.isPresent(tuple.view)) {
          this._viewContainer.insert(tuple.view, tuple.record.currentIndex);
        } else {
          tuple.view = this._viewContainer.createEmbeddedView(this._templateRef, tuple.record.currentIndex);
        }
      }
      return tuples;
    };
    NgFor = __decorate([core_1.Directive({
      selector: '[ngFor][ngForOf]',
      inputs: ['ngForTrackBy', 'ngForOf', 'ngForTemplate']
    }), __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef, core_1.IterableDiffers, core_1.ChangeDetectorRef])], NgFor);
    return NgFor;
  })();
  exports.NgFor = NgFor;
  var RecordViewTuple = (function() {
    function RecordViewTuple(record, view) {
      this.record = record;
      this.view = view;
    }
    return RecordViewTuple;
  })();
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/directives/ng_if.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var NgIf = (function() {
    function NgIf(_viewContainer, _templateRef) {
      this._viewContainer = _viewContainer;
      this._templateRef = _templateRef;
      this._prevCondition = null;
    }
    Object.defineProperty(NgIf.prototype, "ngIf", {
      set: function(newCondition) {
        if (newCondition && (lang_1.isBlank(this._prevCondition) || !this._prevCondition)) {
          this._prevCondition = true;
          this._viewContainer.createEmbeddedView(this._templateRef);
        } else if (!newCondition && (lang_1.isBlank(this._prevCondition) || this._prevCondition)) {
          this._prevCondition = false;
          this._viewContainer.clear();
        }
      },
      enumerable: true,
      configurable: true
    });
    NgIf = __decorate([core_1.Directive({
      selector: '[ngIf]',
      inputs: ['ngIf']
    }), __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef])], NgIf);
    return NgIf;
  })();
  exports.NgIf = NgIf;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/directives/ng_style.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var NgStyle = (function() {
    function NgStyle(_differs, _ngEl, _renderer) {
      this._differs = _differs;
      this._ngEl = _ngEl;
      this._renderer = _renderer;
    }
    Object.defineProperty(NgStyle.prototype, "rawStyle", {
      set: function(v) {
        this._rawStyle = v;
        if (lang_1.isBlank(this._differ) && lang_1.isPresent(v)) {
          this._differ = this._differs.find(this._rawStyle).create(null);
        }
      },
      enumerable: true,
      configurable: true
    });
    NgStyle.prototype.ngDoCheck = function() {
      if (lang_1.isPresent(this._differ)) {
        var changes = this._differ.diff(this._rawStyle);
        if (lang_1.isPresent(changes)) {
          this._applyChanges(changes);
        }
      }
    };
    NgStyle.prototype._applyChanges = function(changes) {
      var _this = this;
      changes.forEachAddedItem(function(record) {
        _this._setStyle(record.key, record.currentValue);
      });
      changes.forEachChangedItem(function(record) {
        _this._setStyle(record.key, record.currentValue);
      });
      changes.forEachRemovedItem(function(record) {
        _this._setStyle(record.key, null);
      });
    };
    NgStyle.prototype._setStyle = function(name, val) {
      this._renderer.setElementStyle(this._ngEl.nativeElement, name, val);
    };
    NgStyle = __decorate([core_1.Directive({
      selector: '[ngStyle]',
      inputs: ['rawStyle: ngStyle']
    }), __metadata('design:paramtypes', [core_1.KeyValueDiffers, core_1.ElementRef, core_1.Renderer])], NgStyle);
    return NgStyle;
  })();
  exports.NgStyle = NgStyle;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/directives/ng_switch.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/collection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('node_modules/angular2/core.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var _WHEN_DEFAULT = lang_1.CONST_EXPR(new Object());
  var SwitchView = (function() {
    function SwitchView(_viewContainerRef, _templateRef) {
      this._viewContainerRef = _viewContainerRef;
      this._templateRef = _templateRef;
    }
    SwitchView.prototype.create = function() {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    };
    SwitchView.prototype.destroy = function() {
      this._viewContainerRef.clear();
    };
    return SwitchView;
  })();
  exports.SwitchView = SwitchView;
  var NgSwitch = (function() {
    function NgSwitch() {
      this._useDefault = false;
      this._valueViews = new collection_1.Map();
      this._activeViews = [];
    }
    Object.defineProperty(NgSwitch.prototype, "ngSwitch", {
      set: function(value) {
        this._emptyAllActiveViews();
        this._useDefault = false;
        var views = this._valueViews.get(value);
        if (lang_1.isBlank(views)) {
          this._useDefault = true;
          views = lang_1.normalizeBlank(this._valueViews.get(_WHEN_DEFAULT));
        }
        this._activateViews(views);
        this._switchValue = value;
      },
      enumerable: true,
      configurable: true
    });
    NgSwitch.prototype._onWhenValueChanged = function(oldWhen, newWhen, view) {
      this._deregisterView(oldWhen, view);
      this._registerView(newWhen, view);
      if (oldWhen === this._switchValue) {
        view.destroy();
        collection_1.ListWrapper.remove(this._activeViews, view);
      } else if (newWhen === this._switchValue) {
        if (this._useDefault) {
          this._useDefault = false;
          this._emptyAllActiveViews();
        }
        view.create();
        this._activeViews.push(view);
      }
      if (this._activeViews.length === 0 && !this._useDefault) {
        this._useDefault = true;
        this._activateViews(this._valueViews.get(_WHEN_DEFAULT));
      }
    };
    NgSwitch.prototype._emptyAllActiveViews = function() {
      var activeContainers = this._activeViews;
      for (var i = 0; i < activeContainers.length; i++) {
        activeContainers[i].destroy();
      }
      this._activeViews = [];
    };
    NgSwitch.prototype._activateViews = function(views) {
      if (lang_1.isPresent(views)) {
        for (var i = 0; i < views.length; i++) {
          views[i].create();
        }
        this._activeViews = views;
      }
    };
    NgSwitch.prototype._registerView = function(value, view) {
      var views = this._valueViews.get(value);
      if (lang_1.isBlank(views)) {
        views = [];
        this._valueViews.set(value, views);
      }
      views.push(view);
    };
    NgSwitch.prototype._deregisterView = function(value, view) {
      if (value === _WHEN_DEFAULT)
        return;
      var views = this._valueViews.get(value);
      if (views.length == 1) {
        this._valueViews.delete(value);
      } else {
        collection_1.ListWrapper.remove(views, view);
      }
    };
    NgSwitch = __decorate([core_1.Directive({
      selector: '[ngSwitch]',
      inputs: ['ngSwitch']
    }), __metadata('design:paramtypes', [])], NgSwitch);
    return NgSwitch;
  })();
  exports.NgSwitch = NgSwitch;
  var NgSwitchWhen = (function() {
    function NgSwitchWhen(viewContainer, templateRef, ngSwitch) {
      this._value = _WHEN_DEFAULT;
      this._switch = ngSwitch;
      this._view = new SwitchView(viewContainer, templateRef);
    }
    Object.defineProperty(NgSwitchWhen.prototype, "ngSwitchWhen", {
      set: function(value) {
        this._switch._onWhenValueChanged(this._value, value, this._view);
        this._value = value;
      },
      enumerable: true,
      configurable: true
    });
    NgSwitchWhen = __decorate([core_1.Directive({
      selector: '[ngSwitchWhen]',
      inputs: ['ngSwitchWhen']
    }), __param(2, core_1.Host()), __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef, NgSwitch])], NgSwitchWhen);
    return NgSwitchWhen;
  })();
  exports.NgSwitchWhen = NgSwitchWhen;
  var NgSwitchDefault = (function() {
    function NgSwitchDefault(viewContainer, templateRef, sswitch) {
      sswitch._registerView(_WHEN_DEFAULT, new SwitchView(viewContainer, templateRef));
    }
    NgSwitchDefault = __decorate([core_1.Directive({selector: '[ngSwitchDefault]'}), __param(2, core_1.Host()), __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef, NgSwitch])], NgSwitchDefault);
    return NgSwitchDefault;
  })();
  exports.NgSwitchDefault = NgSwitchDefault;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/directives/ng_plural.js", ["node_modules/angular2/core.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/common/directives/ng_switch.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('node_modules/angular2/core.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var ng_switch_1 = $__require('node_modules/angular2/src/common/directives/ng_switch.js');
  var _CATEGORY_DEFAULT = 'other';
  var NgLocalization = (function() {
    function NgLocalization() {}
    return NgLocalization;
  })();
  exports.NgLocalization = NgLocalization;
  var NgPluralCase = (function() {
    function NgPluralCase(value, template, viewContainer) {
      this.value = value;
      this._view = new ng_switch_1.SwitchView(viewContainer, template);
    }
    NgPluralCase = __decorate([core_1.Directive({selector: '[ngPluralCase]'}), __param(0, core_1.Attribute('ngPluralCase')), __metadata('design:paramtypes', [String, core_1.TemplateRef, core_1.ViewContainerRef])], NgPluralCase);
    return NgPluralCase;
  })();
  exports.NgPluralCase = NgPluralCase;
  var NgPlural = (function() {
    function NgPlural(_localization) {
      this._localization = _localization;
      this._caseViews = new collection_1.Map();
      this.cases = null;
    }
    Object.defineProperty(NgPlural.prototype, "ngPlural", {
      set: function(value) {
        this._switchValue = value;
        this._updateView();
      },
      enumerable: true,
      configurable: true
    });
    NgPlural.prototype.ngAfterContentInit = function() {
      var _this = this;
      this.cases.forEach(function(pluralCase) {
        _this._caseViews.set(_this._formatValue(pluralCase), pluralCase._view);
      });
      this._updateView();
    };
    NgPlural.prototype._updateView = function() {
      this._clearViews();
      var view = this._caseViews.get(this._switchValue);
      if (!lang_1.isPresent(view))
        view = this._getCategoryView(this._switchValue);
      this._activateView(view);
    };
    NgPlural.prototype._clearViews = function() {
      if (lang_1.isPresent(this._activeView))
        this._activeView.destroy();
    };
    NgPlural.prototype._activateView = function(view) {
      if (!lang_1.isPresent(view))
        return;
      this._activeView = view;
      this._activeView.create();
    };
    NgPlural.prototype._getCategoryView = function(value) {
      var category = this._localization.getPluralCategory(value);
      var categoryView = this._caseViews.get(category);
      return lang_1.isPresent(categoryView) ? categoryView : this._caseViews.get(_CATEGORY_DEFAULT);
    };
    NgPlural.prototype._isValueView = function(pluralCase) {
      return pluralCase.value[0] === "=";
    };
    NgPlural.prototype._formatValue = function(pluralCase) {
      return this._isValueView(pluralCase) ? this._stripValue(pluralCase.value) : pluralCase.value;
    };
    NgPlural.prototype._stripValue = function(value) {
      return lang_1.NumberWrapper.parseInt(value.substring(1), 10);
    };
    __decorate([core_1.ContentChildren(NgPluralCase), __metadata('design:type', core_1.QueryList)], NgPlural.prototype, "cases", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number), __metadata('design:paramtypes', [Number])], NgPlural.prototype, "ngPlural", null);
    NgPlural = __decorate([core_1.Directive({selector: '[ngPlural]'}), __metadata('design:paramtypes', [NgLocalization])], NgPlural);
    return NgPlural;
  })();
  exports.NgPlural = NgPlural;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/directives/core_directives.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/common/directives/ng_class.js", "node_modules/angular2/src/common/directives/ng_for.js", "node_modules/angular2/src/common/directives/ng_if.js", "node_modules/angular2/src/common/directives/ng_style.js", "node_modules/angular2/src/common/directives/ng_switch.js", "node_modules/angular2/src/common/directives/ng_plural.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var ng_class_1 = $__require('node_modules/angular2/src/common/directives/ng_class.js');
  var ng_for_1 = $__require('node_modules/angular2/src/common/directives/ng_for.js');
  var ng_if_1 = $__require('node_modules/angular2/src/common/directives/ng_if.js');
  var ng_style_1 = $__require('node_modules/angular2/src/common/directives/ng_style.js');
  var ng_switch_1 = $__require('node_modules/angular2/src/common/directives/ng_switch.js');
  var ng_plural_1 = $__require('node_modules/angular2/src/common/directives/ng_plural.js');
  exports.CORE_DIRECTIVES = lang_1.CONST_EXPR([ng_class_1.NgClass, ng_for_1.NgFor, ng_if_1.NgIf, ng_style_1.NgStyle, ng_switch_1.NgSwitch, ng_switch_1.NgSwitchWhen, ng_switch_1.NgSwitchDefault, ng_plural_1.NgPlural, ng_plural_1.NgPluralCase]);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/directives.js", ["node_modules/angular2/src/common/directives/ng_class.js", "node_modules/angular2/src/common/directives/ng_for.js", "node_modules/angular2/src/common/directives/ng_if.js", "node_modules/angular2/src/common/directives/ng_style.js", "node_modules/angular2/src/common/directives/ng_switch.js", "node_modules/angular2/src/common/directives/ng_plural.js", "node_modules/angular2/src/common/directives/observable_list_diff.js", "node_modules/angular2/src/common/directives/core_directives.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var ng_class_1 = $__require('node_modules/angular2/src/common/directives/ng_class.js');
  exports.NgClass = ng_class_1.NgClass;
  var ng_for_1 = $__require('node_modules/angular2/src/common/directives/ng_for.js');
  exports.NgFor = ng_for_1.NgFor;
  var ng_if_1 = $__require('node_modules/angular2/src/common/directives/ng_if.js');
  exports.NgIf = ng_if_1.NgIf;
  var ng_style_1 = $__require('node_modules/angular2/src/common/directives/ng_style.js');
  exports.NgStyle = ng_style_1.NgStyle;
  var ng_switch_1 = $__require('node_modules/angular2/src/common/directives/ng_switch.js');
  exports.NgSwitch = ng_switch_1.NgSwitch;
  exports.NgSwitchWhen = ng_switch_1.NgSwitchWhen;
  exports.NgSwitchDefault = ng_switch_1.NgSwitchDefault;
  var ng_plural_1 = $__require('node_modules/angular2/src/common/directives/ng_plural.js');
  exports.NgPlural = ng_plural_1.NgPlural;
  exports.NgPluralCase = ng_plural_1.NgPluralCase;
  exports.NgLocalization = ng_plural_1.NgLocalization;
  __export($__require('node_modules/angular2/src/common/directives/observable_list_diff.js'));
  var core_directives_1 = $__require('node_modules/angular2/src/common/directives/core_directives.js');
  exports.CORE_DIRECTIVES = core_directives_1.CORE_DIRECTIVES;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/common/common_directives.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/common/forms.js", "node_modules/angular2/src/common/directives.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var forms_1 = $__require('node_modules/angular2/src/common/forms.js');
  var directives_1 = $__require('node_modules/angular2/src/common/directives.js');
  exports.COMMON_DIRECTIVES = lang_1.CONST_EXPR([directives_1.CORE_DIRECTIVES, forms_1.FORM_DIRECTIVES]);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/common.js", ["node_modules/angular2/src/common/pipes.js", "node_modules/angular2/src/common/directives.js", "node_modules/angular2/src/common/forms.js", "node_modules/angular2/src/common/common_directives.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('node_modules/angular2/src/common/pipes.js'));
  __export($__require('node_modules/angular2/src/common/directives.js'));
  __export($__require('node_modules/angular2/src/common/forms.js'));
  __export($__require('node_modules/angular2/src/common/common_directives.js'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/components/Pagination/Pagination.js", ["node_modules/angular2/core.js", "node_modules/angular2/common.js", "bin/pipes/Range/Range.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var common_1 = $__require('node_modules/angular2/common.js');
  var Range_1 = $__require('bin/pipes/Range/Range.js');
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
      pipes: [common_1.SlicePipe, Range_1.Range]
    }), __metadata('design:paramtypes', [])], Pagination);
    return Pagination;
  }());
  exports.Pagination = Pagination;
  exports.PAGINATION_PROVIDERS = [Pagination];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/components/InfiniteScroller/InfiniteScroller.js", ["node_modules/angular2/core.js", "bin/utilities/ElementUtils.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var ElementUtils_1 = $__require('bin/utilities/ElementUtils.js');
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/components/Dropdown/Dropdown.js", ["node_modules/angular2/core.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/components/Collapse/Collapse.js", ["node_modules/angular2/core.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var Collapse = (function() {
    function Collapse() {
      this.showCollapse = false;
    }
    Collapse.prototype.toggleCollapse = function() {
      this.showCollapse = !this.showCollapse;
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], Collapse.prototype, "buttonText", void 0);
    Collapse = __decorate([core_1.Component({
      selector: "collapse",
      template: "\n      <p>\n        <button class=\"btn btn-primary\" type=\"button\" aria-expanded=\"false\" (click)=\"toggleCollapse()\">\n          {{buttonText}}\n        </button>\n      </p>\n\n      <div class=\"collapse fuel-ui-collapse\" *ngIf=\"showCollapse\">\n        <div class=\"card card-block\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    "
    }), __metadata('design:paramtypes', [])], Collapse);
    return Collapse;
  }());
  exports.Collapse = Collapse;
  exports.COLLAPSE_PROVIDERS = [Collapse];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/components/components.js", ["bin/components/Alert/Alert.js", "bin/components/Carousel/Carousel.js", "bin/components/DatePicker/DatePickerProviders.js", "bin/components/Modal/Modal.js", "bin/components/Pagination/Pagination.js", "bin/components/InfiniteScroller/InfiniteScroller.js", "bin/components/Dropdown/Dropdown.js", "bin/components/Collapse/Collapse.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var Alert_1 = $__require('bin/components/Alert/Alert.js');
  var Carousel_1 = $__require('bin/components/Carousel/Carousel.js');
  var DatePickerProviders_1 = $__require('bin/components/DatePicker/DatePickerProviders.js');
  var Modal_1 = $__require('bin/components/Modal/Modal.js');
  var Pagination_1 = $__require('bin/components/Pagination/Pagination.js');
  var InfiniteScroller_1 = $__require('bin/components/InfiniteScroller/InfiniteScroller.js');
  var Dropdown_1 = $__require('bin/components/Dropdown/Dropdown.js');
  var Collapse_1 = $__require('bin/components/Collapse/Collapse.js');
  exports.FUELUI_COMPONENT_PROVIDERS = [Alert_1.ALERT_PROVIDERS, Carousel_1.CAROUSEL_PROVIDERS, DatePickerProviders_1.DATE_PICKER_PROVIDERS, Modal_1.MODAL_PROVIDERS, Pagination_1.PAGINATION_PROVIDERS, InfiniteScroller_1.INFINITE_SCROLLER_PROVIDERS, Dropdown_1.DROPDOWN_COMPONENT_PROVIDERS, Collapse_1.COLLAPSE_PROVIDERS];
  __export($__require('bin/components/Alert/Alert.js'));
  __export($__require('bin/components/Carousel/Carousel.js'));
  __export($__require('bin/components/DatePicker/DatePickerProviders.js'));
  __export($__require('bin/components/Modal/Modal.js'));
  __export($__require('bin/components/Pagination/Pagination.js'));
  __export($__require('bin/components/InfiniteScroller/InfiniteScroller.js'));
  __export($__require('bin/components/Dropdown/Dropdown.js'));
  __export($__require('bin/components/Collapse/Collapse.js'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/directives/Animation/AnimationListener.js", ["node_modules/angular2/core.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var AnimationListener = (function() {
    function AnimationListener() {
      this.animationStart = new core_1.EventEmitter();
      this.animationEnd = new core_1.EventEmitter();
    }
    AnimationListener.prototype.animationStarted = function($event) {
      this.animationStart.next($event);
    };
    AnimationListener.prototype.animationEnded = function($event) {
      this.animationEnd.next($event);
    };
    __decorate([core_1.Output(), __metadata('design:type', Object)], AnimationListener.prototype, "animationStart", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], AnimationListener.prototype, "animationEnd", void 0);
    AnimationListener = __decorate([core_1.Directive({
      selector: '[.animated]',
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
    }), __metadata('design:paramtypes', [])], AnimationListener);
    return AnimationListener;
  }());
  exports.AnimationListener = AnimationListener;
  exports.ANIMATION_LISTENER_PROVIDERS = [AnimationListener];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/directives/Animation/Animation.js", ["node_modules/angular2/core.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/directives/Tooltip/Tooltip.js", ["node_modules/angular2/core.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/directives/CodeHighlighter/CodeHighlighter.js", ["node_modules/angular2/core.js", "bin/utilities/StringUtils.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var StringUtils_1 = $__require('bin/utilities/StringUtils.js');
  var CodeHighlighter = (function() {
    function CodeHighlighter(el) {
      this.el = el;
      if (this.el && this.el.nativeElement) {
        this.el.nativeElement.innerHTML = StringUtils_1.StringHelper.escapeHtml(this.el.nativeElement.innerHTML);
        Prism.highlightElement(this.el.nativeElement);
      }
    }
    CodeHighlighter = __decorate([core_1.Directive({selector: '[code-highlight]'}), __metadata('design:paramtypes', [core_1.ElementRef])], CodeHighlighter);
    return CodeHighlighter;
  }());
  exports.CodeHighlighter = CodeHighlighter;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/directives/directives.js", ["bin/directives/Animation/AnimationListener.js", "bin/directives/Animation/Animation.js", "bin/directives/Tooltip/Tooltip.js", "bin/directives/CodeHighlighter/CodeHighlighter.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var AnimationListener_1 = $__require('bin/directives/Animation/AnimationListener.js');
  var Animation_1 = $__require('bin/directives/Animation/Animation.js');
  var Tooltip_1 = $__require('bin/directives/Tooltip/Tooltip.js');
  var CodeHighlighter_1 = $__require('bin/directives/CodeHighlighter/CodeHighlighter.js');
  exports.FUELUI_DIRECTIVE_PROVIDERS = [Tooltip_1.TOOLTIP_PROVIDERS, Animation_1.Animation, AnimationListener_1.AnimationListener, CodeHighlighter_1.CodeHighlighter];
  __export($__require('bin/directives/Animation/AnimationListener.js'));
  __export($__require('bin/directives/Animation/Animation.js'));
  __export($__require('bin/directives/Tooltip/Tooltip.js'));
  __export($__require('bin/directives/CodeHighlighter/CodeHighlighter.js'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/pipes/OrderBy/OrderBy.js", ["node_modules/angular2/core.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var OrderBy = (function() {
    function OrderBy() {
      this.value = [];
    }
    OrderBy._orderByComparator = function(a, b) {
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
    OrderBy.prototype.transform = function(input, _a) {
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
            return !desc ? OrderBy._orderByComparator(a[property], b[property]) : -OrderBy._orderByComparator(a[property], b[property]);
          });
        }
      } else {
        return value.sort(function(a, b) {
          for (var i = 0; i < config.length; i++) {
            var desc = config[i].substr(0, 1) == '-';
            var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-' ? config[i].substr(1) : config[i];
            var comparison = !desc ? OrderBy._orderByComparator(a[property], b[property]) : -OrderBy._orderByComparator(a[property], b[property]);
            if (comparison != 0)
              return comparison;
          }
          return 0;
        });
      }
    };
    OrderBy = __decorate([core_1.Pipe({
      name: 'orderBy',
      pure: false
    }), __metadata('design:paramtypes', [])], OrderBy);
    return OrderBy;
  }());
  exports.OrderBy = OrderBy;
  exports.ORDERBY_PROVIDERS = [OrderBy];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/util.js", ["node_modules/angular2/src/core/util/decorators.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var decorators_1 = $__require('node_modules/angular2/src/core/util/decorators.js');
  exports.Class = decorators_1.Class;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/prod_mode.js", ["node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  exports.enableProdMode = lang_1.enableProdMode;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/facade/facade.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/async.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/exception_handler.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  exports.Type = lang_1.Type;
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  exports.EventEmitter = async_1.EventEmitter;
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  exports.WrappedException = exceptions_1.WrappedException;
  var exception_handler_1 = $__require('node_modules/angular2/src/facade/exception_handler.js');
  exports.ExceptionHandler = exception_handler_1.ExceptionHandler;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/application_ref.js", ["node_modules/angular2/src/core/zone/ng_zone.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/core/di.js", "node_modules/angular2/src/core/application_tokens.js", "node_modules/angular2/src/facade/async.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/testability/testability.js", "node_modules/angular2/src/core/linker/dynamic_component_loader.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/core/console.js", "node_modules/angular2/src/core/profile/profile.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var ng_zone_1 = $__require('node_modules/angular2/src/core/zone/ng_zone.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var application_tokens_1 = $__require('node_modules/angular2/src/core/application_tokens.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var testability_1 = $__require('node_modules/angular2/src/core/testability/testability.js');
  var dynamic_component_loader_1 = $__require('node_modules/angular2/src/core/linker/dynamic_component_loader.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var console_1 = $__require('node_modules/angular2/src/core/console.js');
  var profile_1 = $__require('node_modules/angular2/src/core/profile/profile.js');
  var lang_2 = $__require('node_modules/angular2/src/facade/lang.js');
  function _componentProviders(appComponentType) {
    return [di_1.provide(application_tokens_1.APP_COMPONENT, {useValue: appComponentType}), di_1.provide(application_tokens_1.APP_COMPONENT_REF_PROMISE, {
      useFactory: function(dynamicComponentLoader, appRef, injector) {
        var ref;
        return dynamicComponentLoader.loadAsRoot(appComponentType, null, injector, function() {
          appRef._unloadComponent(ref);
        }).then(function(componentRef) {
          ref = componentRef;
          var testability = injector.getOptional(testability_1.Testability);
          if (lang_1.isPresent(testability)) {
            injector.get(testability_1.TestabilityRegistry).registerApplication(componentRef.location.nativeElement, testability);
          }
          return componentRef;
        });
      },
      deps: [dynamic_component_loader_1.DynamicComponentLoader, ApplicationRef, di_1.Injector]
    }), di_1.provide(appComponentType, {
      useFactory: function(p) {
        return p.then(function(ref) {
          return ref.instance;
        });
      },
      deps: [application_tokens_1.APP_COMPONENT_REF_PROMISE]
    })];
  }
  function createNgZone() {
    return new ng_zone_1.NgZone({enableLongStackTrace: lang_1.assertionsEnabled()});
  }
  exports.createNgZone = createNgZone;
  var _platform;
  var _platformProviders;
  function platform(providers) {
    lang_2.lockMode();
    if (lang_1.isPresent(_platform)) {
      if (collection_1.ListWrapper.equals(_platformProviders, providers)) {
        return _platform;
      } else {
        throw new exceptions_1.BaseException("platform cannot be initialized with different sets of providers.");
      }
    } else {
      return _createPlatform(providers);
    }
  }
  exports.platform = platform;
  function disposePlatform() {
    if (lang_1.isPresent(_platform)) {
      _platform.dispose();
      _platform = null;
    }
  }
  exports.disposePlatform = disposePlatform;
  function _createPlatform(providers) {
    _platformProviders = providers;
    var injector = di_1.Injector.resolveAndCreate(providers);
    _platform = new PlatformRef_(injector, function() {
      _platform = null;
      _platformProviders = null;
    });
    _runPlatformInitializers(injector);
    return _platform;
  }
  function _runPlatformInitializers(injector) {
    var inits = injector.getOptional(application_tokens_1.PLATFORM_INITIALIZER);
    if (lang_1.isPresent(inits))
      inits.forEach(function(init) {
        return init();
      });
  }
  var PlatformRef = (function() {
    function PlatformRef() {}
    Object.defineProperty(PlatformRef.prototype, "injector", {
      get: function() {
        throw exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    return PlatformRef;
  })();
  exports.PlatformRef = PlatformRef;
  var PlatformRef_ = (function(_super) {
    __extends(PlatformRef_, _super);
    function PlatformRef_(_injector, _dispose) {
      _super.call(this);
      this._injector = _injector;
      this._dispose = _dispose;
      this._applications = [];
      this._disposeListeners = [];
    }
    PlatformRef_.prototype.registerDisposeListener = function(dispose) {
      this._disposeListeners.push(dispose);
    };
    Object.defineProperty(PlatformRef_.prototype, "injector", {
      get: function() {
        return this._injector;
      },
      enumerable: true,
      configurable: true
    });
    PlatformRef_.prototype.application = function(providers) {
      var app = this._initApp(createNgZone(), providers);
      if (async_1.PromiseWrapper.isPromise(app)) {
        throw new exceptions_1.BaseException("Cannot use asyncronous app initializers with application. Use asyncApplication instead.");
      }
      return app;
    };
    PlatformRef_.prototype.asyncApplication = function(bindingFn, additionalProviders) {
      var _this = this;
      var zone = createNgZone();
      var completer = async_1.PromiseWrapper.completer();
      if (bindingFn === null) {
        completer.resolve(this._initApp(zone, additionalProviders));
      } else {
        zone.run(function() {
          async_1.PromiseWrapper.then(bindingFn(zone), function(providers) {
            if (lang_1.isPresent(additionalProviders)) {
              providers = collection_1.ListWrapper.concat(providers, additionalProviders);
            }
            var promise = _this._initApp(zone, providers);
            completer.resolve(promise);
          });
        });
      }
      return completer.promise;
    };
    PlatformRef_.prototype._initApp = function(zone, providers) {
      var _this = this;
      var injector;
      var app;
      zone.run(function() {
        providers = collection_1.ListWrapper.concat(providers, [di_1.provide(ng_zone_1.NgZone, {useValue: zone}), di_1.provide(ApplicationRef, {
          useFactory: function() {
            return app;
          },
          deps: []
        })]);
        var exceptionHandler;
        try {
          injector = _this.injector.resolveAndCreateChild(providers);
          exceptionHandler = injector.get(exceptions_1.ExceptionHandler);
          async_1.ObservableWrapper.subscribe(zone.onError, function(error) {
            exceptionHandler.call(error.error, error.stackTrace);
          });
        } catch (e) {
          if (lang_1.isPresent(exceptionHandler)) {
            exceptionHandler.call(e, e.stack);
          } else {
            lang_1.print(e.toString());
          }
        }
      });
      app = new ApplicationRef_(this, zone, injector);
      this._applications.push(app);
      var promise = _runAppInitializers(injector);
      if (promise !== null) {
        return async_1.PromiseWrapper.then(promise, function(_) {
          return app;
        });
      } else {
        return app;
      }
    };
    PlatformRef_.prototype.dispose = function() {
      collection_1.ListWrapper.clone(this._applications).forEach(function(app) {
        return app.dispose();
      });
      this._disposeListeners.forEach(function(dispose) {
        return dispose();
      });
      this._dispose();
    };
    PlatformRef_.prototype._applicationDisposed = function(app) {
      collection_1.ListWrapper.remove(this._applications, app);
    };
    return PlatformRef_;
  })(PlatformRef);
  exports.PlatformRef_ = PlatformRef_;
  function _runAppInitializers(injector) {
    var inits = injector.getOptional(application_tokens_1.APP_INITIALIZER);
    var promises = [];
    if (lang_1.isPresent(inits)) {
      inits.forEach(function(init) {
        var retVal = init();
        if (async_1.PromiseWrapper.isPromise(retVal)) {
          promises.push(retVal);
        }
      });
    }
    if (promises.length > 0) {
      return async_1.PromiseWrapper.all(promises);
    } else {
      return null;
    }
  }
  var ApplicationRef = (function() {
    function ApplicationRef() {}
    Object.defineProperty(ApplicationRef.prototype, "injector", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(ApplicationRef.prototype, "zone", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(ApplicationRef.prototype, "componentTypes", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    return ApplicationRef;
  })();
  exports.ApplicationRef = ApplicationRef;
  var ApplicationRef_ = (function(_super) {
    __extends(ApplicationRef_, _super);
    function ApplicationRef_(_platform, _zone, _injector) {
      var _this = this;
      _super.call(this);
      this._platform = _platform;
      this._zone = _zone;
      this._injector = _injector;
      this._bootstrapListeners = [];
      this._disposeListeners = [];
      this._rootComponents = [];
      this._rootComponentTypes = [];
      this._changeDetectorRefs = [];
      this._runningTick = false;
      this._enforceNoNewChanges = false;
      if (lang_1.isPresent(this._zone)) {
        async_1.ObservableWrapper.subscribe(this._zone.onMicrotaskEmpty, function(_) {
          _this._zone.run(function() {
            _this.tick();
          });
        });
      }
      this._enforceNoNewChanges = lang_1.assertionsEnabled();
    }
    ApplicationRef_.prototype.registerBootstrapListener = function(listener) {
      this._bootstrapListeners.push(listener);
    };
    ApplicationRef_.prototype.registerDisposeListener = function(dispose) {
      this._disposeListeners.push(dispose);
    };
    ApplicationRef_.prototype.registerChangeDetector = function(changeDetector) {
      this._changeDetectorRefs.push(changeDetector);
    };
    ApplicationRef_.prototype.unregisterChangeDetector = function(changeDetector) {
      collection_1.ListWrapper.remove(this._changeDetectorRefs, changeDetector);
    };
    ApplicationRef_.prototype.bootstrap = function(componentType, providers) {
      var _this = this;
      var completer = async_1.PromiseWrapper.completer();
      this._zone.run(function() {
        var componentProviders = _componentProviders(componentType);
        if (lang_1.isPresent(providers)) {
          componentProviders.push(providers);
        }
        var exceptionHandler = _this._injector.get(exceptions_1.ExceptionHandler);
        _this._rootComponentTypes.push(componentType);
        try {
          var injector = _this._injector.resolveAndCreateChild(componentProviders);
          var compRefToken = injector.get(application_tokens_1.APP_COMPONENT_REF_PROMISE);
          var tick = function(componentRef) {
            _this._loadComponent(componentRef);
            completer.resolve(componentRef);
          };
          var tickResult = async_1.PromiseWrapper.then(compRefToken, tick);
          async_1.PromiseWrapper.then(tickResult, null, function(err, stackTrace) {
            completer.reject(err, stackTrace);
            exceptionHandler.call(err, stackTrace);
          });
        } catch (e) {
          exceptionHandler.call(e, e.stack);
          completer.reject(e, e.stack);
        }
      });
      return completer.promise.then(function(ref) {
        var c = _this._injector.get(console_1.Console);
        if (lang_1.assertionsEnabled()) {
          c.log("Angular 2 is running in the development mode. Call enableProdMode() to enable the production mode.");
        }
        return ref;
      });
    };
    ApplicationRef_.prototype._loadComponent = function(componentRef) {
      var appChangeDetector = componentRef.location.internalElement.parentView.changeDetector;
      this._changeDetectorRefs.push(appChangeDetector.ref);
      this.tick();
      this._rootComponents.push(componentRef);
      this._bootstrapListeners.forEach(function(listener) {
        return listener(componentRef);
      });
    };
    ApplicationRef_.prototype._unloadComponent = function(componentRef) {
      if (!collection_1.ListWrapper.contains(this._rootComponents, componentRef)) {
        return;
      }
      this.unregisterChangeDetector(componentRef.location.internalElement.parentView.changeDetector.ref);
      collection_1.ListWrapper.remove(this._rootComponents, componentRef);
    };
    Object.defineProperty(ApplicationRef_.prototype, "injector", {
      get: function() {
        return this._injector;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ApplicationRef_.prototype, "zone", {
      get: function() {
        return this._zone;
      },
      enumerable: true,
      configurable: true
    });
    ApplicationRef_.prototype.tick = function() {
      if (this._runningTick) {
        throw new exceptions_1.BaseException("ApplicationRef.tick is called recursively");
      }
      var s = ApplicationRef_._tickScope();
      try {
        this._runningTick = true;
        this._changeDetectorRefs.forEach(function(detector) {
          return detector.detectChanges();
        });
        if (this._enforceNoNewChanges) {
          this._changeDetectorRefs.forEach(function(detector) {
            return detector.checkNoChanges();
          });
        }
      } finally {
        this._runningTick = false;
        profile_1.wtfLeave(s);
      }
    };
    ApplicationRef_.prototype.dispose = function() {
      collection_1.ListWrapper.clone(this._rootComponents).forEach(function(ref) {
        return ref.dispose();
      });
      this._disposeListeners.forEach(function(dispose) {
        return dispose();
      });
      this._platform._applicationDisposed(this);
    };
    Object.defineProperty(ApplicationRef_.prototype, "componentTypes", {
      get: function() {
        return this._rootComponentTypes;
      },
      enumerable: true,
      configurable: true
    });
    ApplicationRef_._tickScope = profile_1.wtfCreateScope('ApplicationRef#tick()');
    return ApplicationRef_;
  })(ApplicationRef);
  exports.ApplicationRef_ = ApplicationRef_;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/zone.js", ["node_modules/angular2/src/core/zone/ng_zone.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ng_zone_1 = $__require('node_modules/angular2/src/core/zone/ng_zone.js');
  exports.NgZone = ng_zone_1.NgZone;
  exports.NgZoneError = ng_zone_1.NgZoneError;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/render.js", ["node_modules/angular2/src/core/render/api.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var api_1 = $__require('node_modules/angular2/src/core/render/api.js');
  exports.RootRenderer = api_1.RootRenderer;
  exports.Renderer = api_1.Renderer;
  exports.RenderComponentType = api_1.RenderComponentType;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker.js", ["node_modules/angular2/src/core/linker/directive_resolver.js", "node_modules/angular2/src/core/linker/view_resolver.js", "node_modules/angular2/src/core/linker/compiler.js", "node_modules/angular2/src/core/linker/view_manager.js", "node_modules/angular2/src/core/linker/query_list.js", "node_modules/angular2/src/core/linker/dynamic_component_loader.js", "node_modules/angular2/src/core/linker/element_ref.js", "node_modules/angular2/src/core/linker/template_ref.js", "node_modules/angular2/src/core/linker/view_ref.js", "node_modules/angular2/src/core/linker/view_container_ref.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var directive_resolver_1 = $__require('node_modules/angular2/src/core/linker/directive_resolver.js');
  exports.DirectiveResolver = directive_resolver_1.DirectiveResolver;
  var view_resolver_1 = $__require('node_modules/angular2/src/core/linker/view_resolver.js');
  exports.ViewResolver = view_resolver_1.ViewResolver;
  var compiler_1 = $__require('node_modules/angular2/src/core/linker/compiler.js');
  exports.Compiler = compiler_1.Compiler;
  var view_manager_1 = $__require('node_modules/angular2/src/core/linker/view_manager.js');
  exports.AppViewManager = view_manager_1.AppViewManager;
  var query_list_1 = $__require('node_modules/angular2/src/core/linker/query_list.js');
  exports.QueryList = query_list_1.QueryList;
  var dynamic_component_loader_1 = $__require('node_modules/angular2/src/core/linker/dynamic_component_loader.js');
  exports.DynamicComponentLoader = dynamic_component_loader_1.DynamicComponentLoader;
  var element_ref_1 = $__require('node_modules/angular2/src/core/linker/element_ref.js');
  exports.ElementRef = element_ref_1.ElementRef;
  var template_ref_1 = $__require('node_modules/angular2/src/core/linker/template_ref.js');
  exports.TemplateRef = template_ref_1.TemplateRef;
  var view_ref_1 = $__require('node_modules/angular2/src/core/linker/view_ref.js');
  exports.EmbeddedViewRef = view_ref_1.EmbeddedViewRef;
  exports.HostViewRef = view_ref_1.HostViewRef;
  exports.ViewRef = view_ref_1.ViewRef;
  exports.HostViewFactoryRef = view_ref_1.HostViewFactoryRef;
  var view_container_ref_1 = $__require('node_modules/angular2/src/core/linker/view_container_ref.js');
  exports.ViewContainerRef = view_container_ref_1.ViewContainerRef;
  var dynamic_component_loader_2 = $__require('node_modules/angular2/src/core/linker/dynamic_component_loader.js');
  exports.ComponentRef = dynamic_component_loader_2.ComponentRef;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/debug/debug_node.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/collection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var EventListener = (function() {
    function EventListener(name, callback) {
      this.name = name;
      this.callback = callback;
    }
    ;
    return EventListener;
  })();
  exports.EventListener = EventListener;
  var DebugNode = (function() {
    function DebugNode(nativeNode, parent) {
      this.nativeNode = nativeNode;
      if (lang_1.isPresent(parent) && parent instanceof DebugElement) {
        parent.addChild(this);
      } else {
        this.parent = null;
      }
      this.listeners = [];
      this.providerTokens = [];
    }
    DebugNode.prototype.setDebugInfo = function(info) {
      this.injector = info.injector;
      this.providerTokens = info.providerTokens;
      this.locals = info.locals;
      this.componentInstance = info.component;
    };
    DebugNode.prototype.inject = function(token) {
      return this.injector.get(token);
    };
    DebugNode.prototype.getLocal = function(name) {
      return this.locals.get(name);
    };
    return DebugNode;
  })();
  exports.DebugNode = DebugNode;
  var DebugElement = (function(_super) {
    __extends(DebugElement, _super);
    function DebugElement(nativeNode, parent) {
      _super.call(this, nativeNode, parent);
      this.properties = new Map();
      this.attributes = new Map();
      this.childNodes = [];
      this.nativeElement = nativeNode;
    }
    DebugElement.prototype.addChild = function(child) {
      if (lang_1.isPresent(child)) {
        this.childNodes.push(child);
        child.parent = this;
      }
    };
    DebugElement.prototype.removeChild = function(child) {
      var childIndex = this.childNodes.indexOf(child);
      if (childIndex !== -1) {
        child.parent = null;
        this.childNodes.splice(childIndex, 1);
      }
    };
    DebugElement.prototype.insertChildrenAfter = function(child, newChildren) {
      var siblingIndex = this.childNodes.indexOf(child);
      if (siblingIndex !== -1) {
        var previousChildren = this.childNodes.slice(0, siblingIndex + 1);
        var nextChildren = this.childNodes.slice(siblingIndex + 1);
        this.childNodes = collection_1.ListWrapper.concat(collection_1.ListWrapper.concat(previousChildren, newChildren), nextChildren);
        for (var i = 0; i < newChildren.length; ++i) {
          var newChild = newChildren[i];
          if (lang_1.isPresent(newChild.parent)) {
            newChild.parent.removeChild(newChild);
          }
          newChild.parent = this;
        }
      }
    };
    DebugElement.prototype.query = function(predicate) {
      var results = this.queryAll(predicate);
      return results.length > 0 ? results[0] : null;
    };
    DebugElement.prototype.queryAll = function(predicate) {
      var matches = [];
      _queryElementChildren(this, predicate, matches);
      return matches;
    };
    DebugElement.prototype.queryAllNodes = function(predicate) {
      var matches = [];
      _queryNodeChildren(this, predicate, matches);
      return matches;
    };
    Object.defineProperty(DebugElement.prototype, "children", {
      get: function() {
        var children = [];
        this.childNodes.forEach(function(node) {
          if (node instanceof DebugElement) {
            children.push(node);
          }
        });
        return children;
      },
      enumerable: true,
      configurable: true
    });
    DebugElement.prototype.triggerEventHandler = function(eventName, eventObj) {
      this.listeners.forEach(function(listener) {
        if (listener.name == eventName) {
          listener.callback(eventObj);
        }
      });
    };
    return DebugElement;
  })(DebugNode);
  exports.DebugElement = DebugElement;
  function asNativeElements(debugEls) {
    return debugEls.map(function(el) {
      return el.nativeElement;
    });
  }
  exports.asNativeElements = asNativeElements;
  function _queryElementChildren(element, predicate, matches) {
    element.childNodes.forEach(function(node) {
      if (node instanceof DebugElement) {
        if (predicate(node)) {
          matches.push(node);
        }
        _queryElementChildren(node, predicate, matches);
      }
    });
  }
  function _queryNodeChildren(parentNode, predicate, matches) {
    if (parentNode instanceof DebugElement) {
      parentNode.childNodes.forEach(function(node) {
        if (predicate(node)) {
          matches.push(node);
        }
        if (node instanceof DebugElement) {
          _queryNodeChildren(node, predicate, matches);
        }
      });
    }
  }
  var _nativeNodeToDebugNode = new Map();
  function getDebugNode(nativeNode) {
    return _nativeNodeToDebugNode.get(nativeNode);
  }
  exports.getDebugNode = getDebugNode;
  function getAllDebugNodes() {
    return collection_1.MapWrapper.values(_nativeNodeToDebugNode);
  }
  exports.getAllDebugNodes = getAllDebugNodes;
  function indexDebugNode(node) {
    _nativeNodeToDebugNode.set(node.nativeNode, node);
  }
  exports.indexDebugNode = indexDebugNode;
  function removeDebugNodeFromIndex(node) {
    _nativeNodeToDebugNode.delete(node.nativeNode);
  }
  exports.removeDebugNodeFromIndex = removeDebugNodeFromIndex;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/platform_directives_and_pipes.js", ["node_modules/angular2/src/core/di.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  exports.PLATFORM_DIRECTIVES = lang_1.CONST_EXPR(new di_1.OpaqueToken("Platform Directives"));
  exports.PLATFORM_PIPES = lang_1.CONST_EXPR(new di_1.OpaqueToken("Platform Pipes"));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/console.js", ["node_modules/angular2/src/core/di.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var Console = (function() {
    function Console() {}
    Console.prototype.log = function(message) {
      lang_1.print(message);
    };
    Console = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], Console);
    return Console;
  })();
  exports.Console = Console;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/zone/ng_zone_impl.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var NgZoneError = (function() {
    function NgZoneError(error, stackTrace) {
      this.error = error;
      this.stackTrace = stackTrace;
    }
    return NgZoneError;
  })();
  exports.NgZoneError = NgZoneError;
  var NgZoneImpl = (function() {
    function NgZoneImpl(_a) {
      var _this = this;
      var trace = _a.trace,
          onEnter = _a.onEnter,
          onLeave = _a.onLeave,
          setMicrotask = _a.setMicrotask,
          setMacrotask = _a.setMacrotask,
          onError = _a.onError;
      this.onEnter = onEnter;
      this.onLeave = onLeave;
      this.setMicrotask = setMicrotask;
      this.setMacrotask = setMacrotask;
      this.onError = onError;
      if (Zone) {
        this.outer = this.inner = Zone.current;
        if (Zone['wtfZoneSpec']) {
          this.inner = this.inner.fork(Zone['wtfZoneSpec']);
        }
        if (trace) {
          this.inner = this.inner.fork(Zone['longStackTraceZoneSpec']);
        }
        this.inner = this.inner.fork({
          name: 'angular',
          properties: {'isAngularZone': true},
          onInvokeTask: function(delegate, current, target, task, applyThis, applyArgs) {
            try {
              _this.onEnter();
              return delegate.invokeTask(target, task, applyThis, applyArgs);
            } finally {
              _this.onLeave();
            }
          },
          onInvoke: function(delegate, current, target, callback, applyThis, applyArgs, source) {
            try {
              _this.onEnter();
              return delegate.invoke(target, callback, applyThis, applyArgs, source);
            } finally {
              _this.onLeave();
            }
          },
          onHasTask: function(delegate, current, target, hasTaskState) {
            delegate.hasTask(target, hasTaskState);
            if (current == target) {
              if (hasTaskState.change == 'microTask') {
                _this.setMicrotask(hasTaskState.microTask);
              } else if (hasTaskState.change == 'macroTask') {
                _this.setMacrotask(hasTaskState.macroTask);
              }
            }
          },
          onHandleError: function(delegate, current, target, error) {
            delegate.handleError(target, error);
            _this.onError(new NgZoneError(error, error.stack));
            return false;
          }
        });
      } else {
        throw new Error('Angular2 needs to be run with Zone.js polyfill.');
      }
    }
    NgZoneImpl.isInAngularZone = function() {
      return Zone.current.get('isAngularZone') === true;
    };
    NgZoneImpl.prototype.runInner = function(fn) {
      return this.inner.runGuarded(fn);
    };
    ;
    NgZoneImpl.prototype.runOuter = function(fn) {
      return this.outer.run(fn);
    };
    ;
    return NgZoneImpl;
  })();
  exports.NgZoneImpl = NgZoneImpl;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/zone/ng_zone.js", ["node_modules/angular2/src/facade/async.js", "node_modules/angular2/src/core/zone/ng_zone_impl.js", "node_modules/angular2/src/facade/exceptions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var ng_zone_impl_1 = $__require('node_modules/angular2/src/core/zone/ng_zone_impl.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var ng_zone_impl_2 = $__require('node_modules/angular2/src/core/zone/ng_zone_impl.js');
  exports.NgZoneError = ng_zone_impl_2.NgZoneError;
  var NgZone = (function() {
    function NgZone(_a) {
      var _this = this;
      var _b = _a.enableLongStackTrace,
          enableLongStackTrace = _b === void 0 ? false : _b;
      this._hasPendingMicrotasks = false;
      this._hasPendingMacrotasks = false;
      this._isStable = true;
      this._nesting = 0;
      this._onUnstable = new async_1.EventEmitter(false);
      this._onMicrotaskEmpty = new async_1.EventEmitter(false);
      this._onStable = new async_1.EventEmitter(false);
      this._onErrorEvents = new async_1.EventEmitter(false);
      this._zoneImpl = new ng_zone_impl_1.NgZoneImpl({
        trace: enableLongStackTrace,
        onEnter: function() {
          _this._nesting++;
          if (_this._isStable) {
            _this._isStable = false;
            _this._onUnstable.emit(null);
          }
        },
        onLeave: function() {
          _this._nesting--;
          _this._checkStable();
        },
        setMicrotask: function(hasMicrotasks) {
          _this._hasPendingMicrotasks = hasMicrotasks;
          _this._checkStable();
        },
        setMacrotask: function(hasMacrotasks) {
          _this._hasPendingMacrotasks = hasMacrotasks;
        },
        onError: function(error) {
          return _this._onErrorEvents.emit(error);
        }
      });
    }
    NgZone.isInAngularZone = function() {
      return ng_zone_impl_1.NgZoneImpl.isInAngularZone();
    };
    NgZone.assertInAngularZone = function() {
      if (!ng_zone_impl_1.NgZoneImpl.isInAngularZone()) {
        throw new exceptions_1.BaseException('Expected to be in Angular Zone, but it is not!');
      }
    };
    NgZone.assertNotInAngularZone = function() {
      if (ng_zone_impl_1.NgZoneImpl.isInAngularZone()) {
        throw new exceptions_1.BaseException('Expected to not be in Angular Zone, but it is!');
      }
    };
    NgZone.prototype._checkStable = function() {
      var _this = this;
      if (this._nesting == 0) {
        if (!this._hasPendingMicrotasks && !this._isStable) {
          try {
            this._nesting++;
            this._onMicrotaskEmpty.emit(null);
          } finally {
            this._nesting--;
            if (!this._hasPendingMicrotasks) {
              try {
                this.runOutsideAngular(function() {
                  return _this._onStable.emit(null);
                });
              } finally {
                this._isStable = true;
              }
            }
          }
        }
      }
    };
    ;
    Object.defineProperty(NgZone.prototype, "onUnstable", {
      get: function() {
        return this._onUnstable;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onMicrotaskEmpty", {
      get: function() {
        return this._onMicrotaskEmpty;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onStable", {
      get: function() {
        return this._onStable;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onError", {
      get: function() {
        return this._onErrorEvents;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgZone.prototype, "hasPendingMicrotasks", {
      get: function() {
        return this._hasPendingMicrotasks;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgZone.prototype, "hasPendingMacrotasks", {
      get: function() {
        return this._hasPendingMacrotasks;
      },
      enumerable: true,
      configurable: true
    });
    NgZone.prototype.run = function(fn) {
      return this._zoneImpl.runInner(fn);
    };
    NgZone.prototype.runOutsideAngular = function(fn) {
      return this._zoneImpl.runOuter(fn);
    };
    return NgZone;
  })();
  exports.NgZone = NgZone;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/testability/testability.js", ["node_modules/angular2/src/core/di.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/core/zone/ng_zone.js", "node_modules/angular2/src/facade/async.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var ng_zone_1 = $__require('node_modules/angular2/src/core/zone/ng_zone.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var Testability = (function() {
    function Testability(_ngZone) {
      this._ngZone = _ngZone;
      this._pendingCount = 0;
      this._isZoneStable = true;
      this._didWork = false;
      this._callbacks = [];
      this._watchAngularEvents();
    }
    Testability.prototype._watchAngularEvents = function() {
      var _this = this;
      async_1.ObservableWrapper.subscribe(this._ngZone.onUnstable, function(_) {
        _this._didWork = true;
        _this._isZoneStable = false;
      });
      this._ngZone.runOutsideAngular(function() {
        async_1.ObservableWrapper.subscribe(_this._ngZone.onStable, function(_) {
          ng_zone_1.NgZone.assertNotInAngularZone();
          lang_1.scheduleMicroTask(function() {
            _this._isZoneStable = true;
            _this._runCallbacksIfReady();
          });
        });
      });
    };
    Testability.prototype.increasePendingRequestCount = function() {
      this._pendingCount += 1;
      this._didWork = true;
      return this._pendingCount;
    };
    Testability.prototype.decreasePendingRequestCount = function() {
      this._pendingCount -= 1;
      if (this._pendingCount < 0) {
        throw new exceptions_1.BaseException('pending async requests below zero');
      }
      this._runCallbacksIfReady();
      return this._pendingCount;
    };
    Testability.prototype.isStable = function() {
      return this._isZoneStable && this._pendingCount == 0 && !this._ngZone.hasPendingMacrotasks;
    };
    Testability.prototype._runCallbacksIfReady = function() {
      var _this = this;
      if (this.isStable()) {
        lang_1.scheduleMicroTask(function() {
          while (_this._callbacks.length !== 0) {
            (_this._callbacks.pop())(_this._didWork);
          }
          _this._didWork = false;
        });
      } else {
        this._didWork = true;
      }
    };
    Testability.prototype.whenStable = function(callback) {
      this._callbacks.push(callback);
      this._runCallbacksIfReady();
    };
    Testability.prototype.getPendingRequestCount = function() {
      return this._pendingCount;
    };
    Testability.prototype.findBindings = function(using, provider, exactMatch) {
      return [];
    };
    Testability.prototype.findProviders = function(using, provider, exactMatch) {
      return [];
    };
    Testability = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [ng_zone_1.NgZone])], Testability);
    return Testability;
  })();
  exports.Testability = Testability;
  var TestabilityRegistry = (function() {
    function TestabilityRegistry() {
      this._applications = new collection_1.Map();
      _testabilityGetter.addToWindow(this);
    }
    TestabilityRegistry.prototype.registerApplication = function(token, testability) {
      this._applications.set(token, testability);
    };
    TestabilityRegistry.prototype.getTestability = function(elem) {
      return this._applications.get(elem);
    };
    TestabilityRegistry.prototype.getAllTestabilities = function() {
      return collection_1.MapWrapper.values(this._applications);
    };
    TestabilityRegistry.prototype.getAllRootElements = function() {
      return collection_1.MapWrapper.keys(this._applications);
    };
    TestabilityRegistry.prototype.findTestabilityInTree = function(elem, findInAncestors) {
      if (findInAncestors === void 0) {
        findInAncestors = true;
      }
      return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
    };
    TestabilityRegistry = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], TestabilityRegistry);
    return TestabilityRegistry;
  })();
  exports.TestabilityRegistry = TestabilityRegistry;
  var _NoopGetTestability = (function() {
    function _NoopGetTestability() {}
    _NoopGetTestability.prototype.addToWindow = function(registry) {};
    _NoopGetTestability.prototype.findTestabilityInTree = function(registry, elem, findInAncestors) {
      return null;
    };
    _NoopGetTestability = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [])], _NoopGetTestability);
    return _NoopGetTestability;
  })();
  function setTestabilityGetter(getter) {
    _testabilityGetter = getter;
  }
  exports.setTestabilityGetter = setTestabilityGetter;
  var _testabilityGetter = lang_1.CONST_EXPR(new _NoopGetTestability());
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/platform_common_providers.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/core/di.js", "node_modules/angular2/src/core/console.js", "node_modules/angular2/src/core/reflection/reflection.js", "node_modules/angular2/src/core/testability/testability.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var console_1 = $__require('node_modules/angular2/src/core/console.js');
  var reflection_1 = $__require('node_modules/angular2/src/core/reflection/reflection.js');
  var testability_1 = $__require('node_modules/angular2/src/core/testability/testability.js');
  function _reflector() {
    return reflection_1.reflector;
  }
  exports.PLATFORM_COMMON_PROVIDERS = lang_1.CONST_EXPR([new di_1.Provider(reflection_1.Reflector, {
    useFactory: _reflector,
    deps: []
  }), testability_1.TestabilityRegistry, console_1.Console]);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/resolved_metadata_cache.js", ["node_modules/angular2/src/core/di.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/core/linker/element.js", "node_modules/angular2/src/core/linker/directive_resolver.js", "node_modules/angular2/src/core/pipes/pipe_provider.js", "node_modules/angular2/src/core/linker/pipe_resolver.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var element_1 = $__require('node_modules/angular2/src/core/linker/element.js');
  var directive_resolver_1 = $__require('node_modules/angular2/src/core/linker/directive_resolver.js');
  var pipe_provider_1 = $__require('node_modules/angular2/src/core/pipes/pipe_provider.js');
  var pipe_resolver_1 = $__require('node_modules/angular2/src/core/linker/pipe_resolver.js');
  var ResolvedMetadataCache = (function() {
    function ResolvedMetadataCache(_directiveResolver, _pipeResolver) {
      this._directiveResolver = _directiveResolver;
      this._pipeResolver = _pipeResolver;
      this._directiveCache = new Map();
      this._pipeCache = new Map();
    }
    ResolvedMetadataCache.prototype.getResolvedDirectiveMetadata = function(type) {
      var result = this._directiveCache.get(type);
      if (lang_1.isBlank(result)) {
        result = element_1.DirectiveProvider.createFromType(type, this._directiveResolver.resolve(type));
        this._directiveCache.set(type, result);
      }
      return result;
    };
    ResolvedMetadataCache.prototype.getResolvedPipeMetadata = function(type) {
      var result = this._pipeCache.get(type);
      if (lang_1.isBlank(result)) {
        result = pipe_provider_1.PipeProvider.createFromType(type, this._pipeResolver.resolve(type));
        this._pipeCache.set(type, result);
      }
      return result;
    };
    ResolvedMetadataCache = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [directive_resolver_1.DirectiveResolver, pipe_resolver_1.PipeResolver])], ResolvedMetadataCache);
    return ResolvedMetadataCache;
  })();
  exports.ResolvedMetadataCache = ResolvedMetadataCache;
  exports.CODEGEN_RESOLVED_METADATA_CACHE = new ResolvedMetadataCache(directive_resolver_1.CODEGEN_DIRECTIVE_RESOLVER, pipe_resolver_1.CODEGEN_PIPE_RESOLVER);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/view_resolver.js", ["node_modules/angular2/src/core/di.js", "node_modules/angular2/src/core/metadata/view.js", "node_modules/angular2/src/core/metadata/directives.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/reflection/reflection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var view_1 = $__require('node_modules/angular2/src/core/metadata/view.js');
  var directives_1 = $__require('node_modules/angular2/src/core/metadata/directives.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var reflection_1 = $__require('node_modules/angular2/src/core/reflection/reflection.js');
  var ViewResolver = (function() {
    function ViewResolver() {
      this._cache = new collection_1.Map();
    }
    ViewResolver.prototype.resolve = function(component) {
      var view = this._cache.get(component);
      if (lang_1.isBlank(view)) {
        view = this._resolve(component);
        this._cache.set(component, view);
      }
      return view;
    };
    ViewResolver.prototype._resolve = function(component) {
      var compMeta;
      var viewMeta;
      reflection_1.reflector.annotations(component).forEach(function(m) {
        if (m instanceof view_1.ViewMetadata) {
          viewMeta = m;
        }
        if (m instanceof directives_1.ComponentMetadata) {
          compMeta = m;
        }
      });
      if (lang_1.isPresent(compMeta)) {
        if (lang_1.isBlank(compMeta.template) && lang_1.isBlank(compMeta.templateUrl) && lang_1.isBlank(viewMeta)) {
          throw new exceptions_1.BaseException("Component '" + lang_1.stringify(component) + "' must have either 'template' or 'templateUrl' set.");
        } else if (lang_1.isPresent(compMeta.template) && lang_1.isPresent(viewMeta)) {
          this._throwMixingViewAndComponent("template", component);
        } else if (lang_1.isPresent(compMeta.templateUrl) && lang_1.isPresent(viewMeta)) {
          this._throwMixingViewAndComponent("templateUrl", component);
        } else if (lang_1.isPresent(compMeta.directives) && lang_1.isPresent(viewMeta)) {
          this._throwMixingViewAndComponent("directives", component);
        } else if (lang_1.isPresent(compMeta.pipes) && lang_1.isPresent(viewMeta)) {
          this._throwMixingViewAndComponent("pipes", component);
        } else if (lang_1.isPresent(compMeta.encapsulation) && lang_1.isPresent(viewMeta)) {
          this._throwMixingViewAndComponent("encapsulation", component);
        } else if (lang_1.isPresent(compMeta.styles) && lang_1.isPresent(viewMeta)) {
          this._throwMixingViewAndComponent("styles", component);
        } else if (lang_1.isPresent(compMeta.styleUrls) && lang_1.isPresent(viewMeta)) {
          this._throwMixingViewAndComponent("styleUrls", component);
        } else if (lang_1.isPresent(viewMeta)) {
          return viewMeta;
        } else {
          return new view_1.ViewMetadata({
            templateUrl: compMeta.templateUrl,
            template: compMeta.template,
            directives: compMeta.directives,
            pipes: compMeta.pipes,
            encapsulation: compMeta.encapsulation,
            styles: compMeta.styles,
            styleUrls: compMeta.styleUrls
          });
        }
      } else {
        if (lang_1.isBlank(viewMeta)) {
          throw new exceptions_1.BaseException("Could not compile '" + lang_1.stringify(component) + "' because it is not a component.");
        } else {
          return viewMeta;
        }
      }
      return null;
    };
    ViewResolver.prototype._throwMixingViewAndComponent = function(propertyName, component) {
      throw new exceptions_1.BaseException("Component '" + lang_1.stringify(component) + "' cannot have both '" + propertyName + "' and '@View' set at the same time\"");
    };
    ViewResolver = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], ViewResolver);
    return ViewResolver;
  })();
  exports.ViewResolver = ViewResolver;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/directive_resolver.js", ["node_modules/angular2/src/core/di.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/metadata.js", "node_modules/angular2/src/core/reflection/reflection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var metadata_1 = $__require('node_modules/angular2/src/core/metadata.js');
  var reflection_1 = $__require('node_modules/angular2/src/core/reflection/reflection.js');
  function _isDirectiveMetadata(type) {
    return type instanceof metadata_1.DirectiveMetadata;
  }
  var DirectiveResolver = (function() {
    function DirectiveResolver() {}
    DirectiveResolver.prototype.resolve = function(type) {
      var typeMetadata = reflection_1.reflector.annotations(di_1.resolveForwardRef(type));
      if (lang_1.isPresent(typeMetadata)) {
        var metadata = typeMetadata.find(_isDirectiveMetadata);
        if (lang_1.isPresent(metadata)) {
          var propertyMetadata = reflection_1.reflector.propMetadata(type);
          return this._mergeWithPropertyMetadata(metadata, propertyMetadata, type);
        }
      }
      throw new exceptions_1.BaseException("No Directive annotation found on " + lang_1.stringify(type));
    };
    DirectiveResolver.prototype._mergeWithPropertyMetadata = function(dm, propertyMetadata, directiveType) {
      var inputs = [];
      var outputs = [];
      var host = {};
      var queries = {};
      collection_1.StringMapWrapper.forEach(propertyMetadata, function(metadata, propName) {
        metadata.forEach(function(a) {
          if (a instanceof metadata_1.InputMetadata) {
            if (lang_1.isPresent(a.bindingPropertyName)) {
              inputs.push(propName + ": " + a.bindingPropertyName);
            } else {
              inputs.push(propName);
            }
          }
          if (a instanceof metadata_1.OutputMetadata) {
            if (lang_1.isPresent(a.bindingPropertyName)) {
              outputs.push(propName + ": " + a.bindingPropertyName);
            } else {
              outputs.push(propName);
            }
          }
          if (a instanceof metadata_1.HostBindingMetadata) {
            if (lang_1.isPresent(a.hostPropertyName)) {
              host[("[" + a.hostPropertyName + "]")] = propName;
            } else {
              host[("[" + propName + "]")] = propName;
            }
          }
          if (a instanceof metadata_1.HostListenerMetadata) {
            var args = lang_1.isPresent(a.args) ? a.args.join(', ') : '';
            host[("(" + a.eventName + ")")] = propName + "(" + args + ")";
          }
          if (a instanceof metadata_1.ContentChildrenMetadata) {
            queries[propName] = a;
          }
          if (a instanceof metadata_1.ViewChildrenMetadata) {
            queries[propName] = a;
          }
          if (a instanceof metadata_1.ContentChildMetadata) {
            queries[propName] = a;
          }
          if (a instanceof metadata_1.ViewChildMetadata) {
            queries[propName] = a;
          }
        });
      });
      return this._merge(dm, inputs, outputs, host, queries, directiveType);
    };
    DirectiveResolver.prototype._merge = function(dm, inputs, outputs, host, queries, directiveType) {
      var mergedInputs = lang_1.isPresent(dm.inputs) ? collection_1.ListWrapper.concat(dm.inputs, inputs) : inputs;
      var mergedOutputs;
      if (lang_1.isPresent(dm.outputs)) {
        dm.outputs.forEach(function(propName) {
          if (collection_1.ListWrapper.contains(outputs, propName)) {
            throw new exceptions_1.BaseException("Output event '" + propName + "' defined multiple times in '" + lang_1.stringify(directiveType) + "'");
          }
        });
        mergedOutputs = collection_1.ListWrapper.concat(dm.outputs, outputs);
      } else {
        mergedOutputs = outputs;
      }
      var mergedHost = lang_1.isPresent(dm.host) ? collection_1.StringMapWrapper.merge(dm.host, host) : host;
      var mergedQueries = lang_1.isPresent(dm.queries) ? collection_1.StringMapWrapper.merge(dm.queries, queries) : queries;
      if (dm instanceof metadata_1.ComponentMetadata) {
        return new metadata_1.ComponentMetadata({
          selector: dm.selector,
          inputs: mergedInputs,
          outputs: mergedOutputs,
          host: mergedHost,
          exportAs: dm.exportAs,
          moduleId: dm.moduleId,
          queries: mergedQueries,
          changeDetection: dm.changeDetection,
          providers: dm.providers,
          viewProviders: dm.viewProviders
        });
      } else {
        return new metadata_1.DirectiveMetadata({
          selector: dm.selector,
          inputs: mergedInputs,
          outputs: mergedOutputs,
          host: mergedHost,
          exportAs: dm.exportAs,
          queries: mergedQueries,
          providers: dm.providers
        });
      }
    };
    DirectiveResolver = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], DirectiveResolver);
    return DirectiveResolver;
  })();
  exports.DirectiveResolver = DirectiveResolver;
  exports.CODEGEN_DIRECTIVE_RESOLVER = new DirectiveResolver();
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/metadata/view.js", ["node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  (function(ViewEncapsulation) {
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
  })(exports.ViewEncapsulation || (exports.ViewEncapsulation = {}));
  var ViewEncapsulation = exports.ViewEncapsulation;
  exports.VIEW_ENCAPSULATION_VALUES = [ViewEncapsulation.Emulated, ViewEncapsulation.Native, ViewEncapsulation.None];
  var ViewMetadata = (function() {
    function ViewMetadata(_a) {
      var _b = _a === void 0 ? {} : _a,
          templateUrl = _b.templateUrl,
          template = _b.template,
          directives = _b.directives,
          pipes = _b.pipes,
          encapsulation = _b.encapsulation,
          styles = _b.styles,
          styleUrls = _b.styleUrls;
      this.templateUrl = templateUrl;
      this.template = template;
      this.styleUrls = styleUrls;
      this.styles = styles;
      this.directives = directives;
      this.pipes = pipes;
      this.encapsulation = encapsulation;
    }
    ViewMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Object])], ViewMetadata);
    return ViewMetadata;
  })();
  exports.ViewMetadata = ViewMetadata;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/metadata.js", ["node_modules/angular2/src/core/metadata/di.js", "node_modules/angular2/src/core/metadata/directives.js", "node_modules/angular2/src/core/metadata/view.js", "node_modules/angular2/src/core/util/decorators.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var di_1 = $__require('node_modules/angular2/src/core/metadata/di.js');
  exports.QueryMetadata = di_1.QueryMetadata;
  exports.ContentChildrenMetadata = di_1.ContentChildrenMetadata;
  exports.ContentChildMetadata = di_1.ContentChildMetadata;
  exports.ViewChildrenMetadata = di_1.ViewChildrenMetadata;
  exports.ViewQueryMetadata = di_1.ViewQueryMetadata;
  exports.ViewChildMetadata = di_1.ViewChildMetadata;
  exports.AttributeMetadata = di_1.AttributeMetadata;
  var directives_1 = $__require('node_modules/angular2/src/core/metadata/directives.js');
  exports.ComponentMetadata = directives_1.ComponentMetadata;
  exports.DirectiveMetadata = directives_1.DirectiveMetadata;
  exports.PipeMetadata = directives_1.PipeMetadata;
  exports.InputMetadata = directives_1.InputMetadata;
  exports.OutputMetadata = directives_1.OutputMetadata;
  exports.HostBindingMetadata = directives_1.HostBindingMetadata;
  exports.HostListenerMetadata = directives_1.HostListenerMetadata;
  var view_1 = $__require('node_modules/angular2/src/core/metadata/view.js');
  exports.ViewMetadata = view_1.ViewMetadata;
  exports.ViewEncapsulation = view_1.ViewEncapsulation;
  var di_2 = $__require('node_modules/angular2/src/core/metadata/di.js');
  var directives_2 = $__require('node_modules/angular2/src/core/metadata/directives.js');
  var view_2 = $__require('node_modules/angular2/src/core/metadata/view.js');
  var decorators_1 = $__require('node_modules/angular2/src/core/util/decorators.js');
  exports.Component = decorators_1.makeDecorator(directives_2.ComponentMetadata, function(fn) {
    return fn.View = View;
  });
  exports.Directive = decorators_1.makeDecorator(directives_2.DirectiveMetadata);
  var View = decorators_1.makeDecorator(view_2.ViewMetadata, function(fn) {
    return fn.View = View;
  });
  exports.Attribute = decorators_1.makeParamDecorator(di_2.AttributeMetadata);
  exports.Query = decorators_1.makeParamDecorator(di_2.QueryMetadata);
  exports.ContentChildren = decorators_1.makePropDecorator(di_2.ContentChildrenMetadata);
  exports.ContentChild = decorators_1.makePropDecorator(di_2.ContentChildMetadata);
  exports.ViewChildren = decorators_1.makePropDecorator(di_2.ViewChildrenMetadata);
  exports.ViewChild = decorators_1.makePropDecorator(di_2.ViewChildMetadata);
  exports.ViewQuery = decorators_1.makeParamDecorator(di_2.ViewQueryMetadata);
  exports.Pipe = decorators_1.makeDecorator(directives_2.PipeMetadata);
  exports.Input = decorators_1.makePropDecorator(directives_2.InputMetadata);
  exports.Output = decorators_1.makePropDecorator(directives_2.OutputMetadata);
  exports.HostBinding = decorators_1.makePropDecorator(directives_2.HostBindingMetadata);
  exports.HostListener = decorators_1.makePropDecorator(directives_2.HostListenerMetadata);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/pipe_resolver.js", ["node_modules/angular2/src/core/di.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/core/metadata.js", "node_modules/angular2/src/core/reflection/reflection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var metadata_1 = $__require('node_modules/angular2/src/core/metadata.js');
  var reflection_1 = $__require('node_modules/angular2/src/core/reflection/reflection.js');
  function _isPipeMetadata(type) {
    return type instanceof metadata_1.PipeMetadata;
  }
  var PipeResolver = (function() {
    function PipeResolver() {}
    PipeResolver.prototype.resolve = function(type) {
      var metas = reflection_1.reflector.annotations(di_1.resolveForwardRef(type));
      if (lang_1.isPresent(metas)) {
        var annotation = metas.find(_isPipeMetadata);
        if (lang_1.isPresent(annotation)) {
          return annotation;
        }
      }
      throw new exceptions_1.BaseException("No Pipe decorator found on " + lang_1.stringify(type));
    };
    PipeResolver = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], PipeResolver);
    return PipeResolver;
  })();
  exports.PipeResolver = PipeResolver;
  exports.CODEGEN_PIPE_RESOLVER = new PipeResolver();
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/compiler.js", ["node_modules/angular2/src/core/di.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/async.js", "node_modules/angular2/src/core/reflection/reflection.js", "node_modules/angular2/src/core/linker/view.js", "node_modules/angular2/src/core/linker/view_ref.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var reflection_1 = $__require('node_modules/angular2/src/core/reflection/reflection.js');
  var view_1 = $__require('node_modules/angular2/src/core/linker/view.js');
  var view_ref_1 = $__require('node_modules/angular2/src/core/linker/view_ref.js');
  var Compiler = (function() {
    function Compiler() {}
    return Compiler;
  })();
  exports.Compiler = Compiler;
  function isHostViewFactory(type) {
    return type instanceof view_1.HostViewFactory;
  }
  var Compiler_ = (function(_super) {
    __extends(Compiler_, _super);
    function Compiler_() {
      _super.apply(this, arguments);
    }
    Compiler_.prototype.compileInHost = function(componentType) {
      var metadatas = reflection_1.reflector.annotations(componentType);
      var hostViewFactory = metadatas.find(isHostViewFactory);
      if (lang_1.isBlank(hostViewFactory)) {
        throw new exceptions_1.BaseException("No precompiled component " + lang_1.stringify(componentType) + " found");
      }
      return async_1.PromiseWrapper.resolve(new view_ref_1.HostViewFactoryRef_(hostViewFactory));
    };
    Compiler_.prototype.clearCache = function() {};
    Compiler_ = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], Compiler_);
    return Compiler_;
  })(Compiler);
  exports.Compiler_ = Compiler_;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/metadata/di.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/core/di.js", "node_modules/angular2/src/core/di/metadata.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var metadata_1 = $__require('node_modules/angular2/src/core/di/metadata.js');
  var AttributeMetadata = (function(_super) {
    __extends(AttributeMetadata, _super);
    function AttributeMetadata(attributeName) {
      _super.call(this);
      this.attributeName = attributeName;
    }
    Object.defineProperty(AttributeMetadata.prototype, "token", {
      get: function() {
        return this;
      },
      enumerable: true,
      configurable: true
    });
    AttributeMetadata.prototype.toString = function() {
      return "@Attribute(" + lang_1.stringify(this.attributeName) + ")";
    };
    AttributeMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [String])], AttributeMetadata);
    return AttributeMetadata;
  })(metadata_1.DependencyMetadata);
  exports.AttributeMetadata = AttributeMetadata;
  var QueryMetadata = (function(_super) {
    __extends(QueryMetadata, _super);
    function QueryMetadata(_selector, _a) {
      var _b = _a === void 0 ? {} : _a,
          _c = _b.descendants,
          descendants = _c === void 0 ? false : _c,
          _d = _b.first,
          first = _d === void 0 ? false : _d;
      _super.call(this);
      this._selector = _selector;
      this.descendants = descendants;
      this.first = first;
    }
    Object.defineProperty(QueryMetadata.prototype, "isViewQuery", {
      get: function() {
        return false;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QueryMetadata.prototype, "selector", {
      get: function() {
        return di_1.resolveForwardRef(this._selector);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QueryMetadata.prototype, "isVarBindingQuery", {
      get: function() {
        return lang_1.isString(this.selector);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QueryMetadata.prototype, "varBindings", {
      get: function() {
        return this.selector.split(',');
      },
      enumerable: true,
      configurable: true
    });
    QueryMetadata.prototype.toString = function() {
      return "@Query(" + lang_1.stringify(this.selector) + ")";
    };
    QueryMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Object, Object])], QueryMetadata);
    return QueryMetadata;
  })(metadata_1.DependencyMetadata);
  exports.QueryMetadata = QueryMetadata;
  var ContentChildrenMetadata = (function(_super) {
    __extends(ContentChildrenMetadata, _super);
    function ContentChildrenMetadata(_selector, _a) {
      var _b = (_a === void 0 ? {} : _a).descendants,
          descendants = _b === void 0 ? false : _b;
      _super.call(this, _selector, {descendants: descendants});
    }
    ContentChildrenMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Object, Object])], ContentChildrenMetadata);
    return ContentChildrenMetadata;
  })(QueryMetadata);
  exports.ContentChildrenMetadata = ContentChildrenMetadata;
  var ContentChildMetadata = (function(_super) {
    __extends(ContentChildMetadata, _super);
    function ContentChildMetadata(_selector) {
      _super.call(this, _selector, {
        descendants: true,
        first: true
      });
    }
    ContentChildMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Object])], ContentChildMetadata);
    return ContentChildMetadata;
  })(QueryMetadata);
  exports.ContentChildMetadata = ContentChildMetadata;
  var ViewQueryMetadata = (function(_super) {
    __extends(ViewQueryMetadata, _super);
    function ViewQueryMetadata(_selector, _a) {
      var _b = _a === void 0 ? {} : _a,
          _c = _b.descendants,
          descendants = _c === void 0 ? false : _c,
          _d = _b.first,
          first = _d === void 0 ? false : _d;
      _super.call(this, _selector, {
        descendants: descendants,
        first: first
      });
    }
    Object.defineProperty(ViewQueryMetadata.prototype, "isViewQuery", {
      get: function() {
        return true;
      },
      enumerable: true,
      configurable: true
    });
    ViewQueryMetadata.prototype.toString = function() {
      return "@ViewQuery(" + lang_1.stringify(this.selector) + ")";
    };
    ViewQueryMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Object, Object])], ViewQueryMetadata);
    return ViewQueryMetadata;
  })(QueryMetadata);
  exports.ViewQueryMetadata = ViewQueryMetadata;
  var ViewChildrenMetadata = (function(_super) {
    __extends(ViewChildrenMetadata, _super);
    function ViewChildrenMetadata(_selector) {
      _super.call(this, _selector, {descendants: true});
    }
    ViewChildrenMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Object])], ViewChildrenMetadata);
    return ViewChildrenMetadata;
  })(ViewQueryMetadata);
  exports.ViewChildrenMetadata = ViewChildrenMetadata;
  var ViewChildMetadata = (function(_super) {
    __extends(ViewChildMetadata, _super);
    function ViewChildMetadata(_selector) {
      _super.call(this, _selector, {
        descendants: true,
        first: true
      });
    }
    ViewChildMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Object])], ViewChildMetadata);
    return ViewChildMetadata;
  })(ViewQueryMetadata);
  exports.ViewChildMetadata = ViewChildMetadata;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/element_ref.js", ["node_modules/angular2/src/facade/exceptions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var ElementRef = (function() {
    function ElementRef() {}
    Object.defineProperty(ElementRef.prototype, "nativeElement", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    return ElementRef;
  })();
  exports.ElementRef = ElementRef;
  var ElementRef_ = (function() {
    function ElementRef_(_appElement) {
      this._appElement = _appElement;
    }
    Object.defineProperty(ElementRef_.prototype, "internalElement", {
      get: function() {
        return this._appElement;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ElementRef_.prototype, "nativeElement", {
      get: function() {
        return this._appElement.nativeElement;
      },
      enumerable: true,
      configurable: true
    });
    return ElementRef_;
  })();
  exports.ElementRef_ = ElementRef_;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/view_container_ref.js", ["node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var ViewContainerRef = (function() {
    function ViewContainerRef() {}
    Object.defineProperty(ViewContainerRef.prototype, "element", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ViewContainerRef.prototype.clear = function() {
      for (var i = this.length - 1; i >= 0; i--) {
        this.remove(i);
      }
    };
    Object.defineProperty(ViewContainerRef.prototype, "length", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    return ViewContainerRef;
  })();
  exports.ViewContainerRef = ViewContainerRef;
  var ViewContainerRef_ = (function(_super) {
    __extends(ViewContainerRef_, _super);
    function ViewContainerRef_(_element) {
      _super.call(this);
      this._element = _element;
    }
    ViewContainerRef_.prototype.get = function(index) {
      return this._element.nestedViews[index].ref;
    };
    Object.defineProperty(ViewContainerRef_.prototype, "length", {
      get: function() {
        var views = this._element.nestedViews;
        return lang_1.isPresent(views) ? views.length : 0;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "element", {
      get: function() {
        return this._element.ref;
      },
      enumerable: true,
      configurable: true
    });
    ViewContainerRef_.prototype.createEmbeddedView = function(templateRef, index) {
      if (index === void 0) {
        index = -1;
      }
      if (index == -1)
        index = this.length;
      var vm = this._element.parentView.viewManager;
      return vm.createEmbeddedViewInContainer(this._element.ref, index, templateRef);
    };
    ViewContainerRef_.prototype.createHostView = function(hostViewFactoryRef, index, dynamicallyCreatedProviders, projectableNodes) {
      if (index === void 0) {
        index = -1;
      }
      if (dynamicallyCreatedProviders === void 0) {
        dynamicallyCreatedProviders = null;
      }
      if (projectableNodes === void 0) {
        projectableNodes = null;
      }
      if (index == -1)
        index = this.length;
      var vm = this._element.parentView.viewManager;
      return vm.createHostViewInContainer(this._element.ref, index, hostViewFactoryRef, dynamicallyCreatedProviders, projectableNodes);
    };
    ViewContainerRef_.prototype.insert = function(viewRef, index) {
      if (index === void 0) {
        index = -1;
      }
      if (index == -1)
        index = this.length;
      var vm = this._element.parentView.viewManager;
      return vm.attachViewInContainer(this._element.ref, index, viewRef);
    };
    ViewContainerRef_.prototype.indexOf = function(viewRef) {
      return collection_1.ListWrapper.indexOf(this._element.nestedViews, viewRef.internalView);
    };
    ViewContainerRef_.prototype.remove = function(index) {
      if (index === void 0) {
        index = -1;
      }
      if (index == -1)
        index = this.length - 1;
      var vm = this._element.parentView.viewManager;
      return vm.destroyViewInContainer(this._element.ref, index);
    };
    ViewContainerRef_.prototype.detach = function(index) {
      if (index === void 0) {
        index = -1;
      }
      if (index == -1)
        index = this.length - 1;
      var vm = this._element.parentView.viewManager;
      return vm.detachViewInContainer(this._element.ref, index);
    };
    return ViewContainerRef_;
  })(ViewContainerRef);
  exports.ViewContainerRef_ = ViewContainerRef_;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/template_ref.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var TemplateRef = (function() {
    function TemplateRef() {}
    Object.defineProperty(TemplateRef.prototype, "elementRef", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    return TemplateRef;
  })();
  exports.TemplateRef = TemplateRef;
  var TemplateRef_ = (function(_super) {
    __extends(TemplateRef_, _super);
    function TemplateRef_(_elementRef) {
      _super.call(this);
      this._elementRef = _elementRef;
    }
    Object.defineProperty(TemplateRef_.prototype, "elementRef", {
      get: function() {
        return this._elementRef;
      },
      enumerable: true,
      configurable: true
    });
    return TemplateRef_;
  })(TemplateRef);
  exports.TemplateRef_ = TemplateRef_;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection.js", ["node_modules/angular2/src/core/change_detection/change_detection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var change_detection_1 = $__require('node_modules/angular2/src/core/change_detection/change_detection.js');
  exports.ChangeDetectionStrategy = change_detection_1.ChangeDetectionStrategy;
  exports.ExpressionChangedAfterItHasBeenCheckedException = change_detection_1.ExpressionChangedAfterItHasBeenCheckedException;
  exports.ChangeDetectionError = change_detection_1.ChangeDetectionError;
  exports.ChangeDetectorRef = change_detection_1.ChangeDetectorRef;
  exports.WrappedValue = change_detection_1.WrappedValue;
  exports.SimpleChange = change_detection_1.SimpleChange;
  exports.IterableDiffers = change_detection_1.IterableDiffers;
  exports.KeyValueDiffers = change_detection_1.KeyValueDiffers;
  exports.CollectionChangeRecord = change_detection_1.CollectionChangeRecord;
  exports.KeyValueChangeRecord = change_detection_1.KeyValueChangeRecord;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/metadata/directives.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/core/di/metadata.js", "node_modules/angular2/src/core/change_detection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var metadata_1 = $__require('node_modules/angular2/src/core/di/metadata.js');
  var change_detection_1 = $__require('node_modules/angular2/src/core/change_detection.js');
  var DirectiveMetadata = (function(_super) {
    __extends(DirectiveMetadata, _super);
    function DirectiveMetadata(_a) {
      var _b = _a === void 0 ? {} : _a,
          selector = _b.selector,
          inputs = _b.inputs,
          outputs = _b.outputs,
          properties = _b.properties,
          events = _b.events,
          host = _b.host,
          bindings = _b.bindings,
          providers = _b.providers,
          exportAs = _b.exportAs,
          queries = _b.queries;
      _super.call(this);
      this.selector = selector;
      this._inputs = inputs;
      this._properties = properties;
      this._outputs = outputs;
      this._events = events;
      this.host = host;
      this.exportAs = exportAs;
      this.queries = queries;
      this._providers = providers;
      this._bindings = bindings;
    }
    Object.defineProperty(DirectiveMetadata.prototype, "inputs", {
      get: function() {
        return lang_1.isPresent(this._properties) && this._properties.length > 0 ? this._properties : this._inputs;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DirectiveMetadata.prototype, "properties", {
      get: function() {
        return this.inputs;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DirectiveMetadata.prototype, "outputs", {
      get: function() {
        return lang_1.isPresent(this._events) && this._events.length > 0 ? this._events : this._outputs;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DirectiveMetadata.prototype, "events", {
      get: function() {
        return this.outputs;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DirectiveMetadata.prototype, "providers", {
      get: function() {
        return lang_1.isPresent(this._bindings) && this._bindings.length > 0 ? this._bindings : this._providers;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DirectiveMetadata.prototype, "bindings", {
      get: function() {
        return this.providers;
      },
      enumerable: true,
      configurable: true
    });
    DirectiveMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Object])], DirectiveMetadata);
    return DirectiveMetadata;
  })(metadata_1.InjectableMetadata);
  exports.DirectiveMetadata = DirectiveMetadata;
  var ComponentMetadata = (function(_super) {
    __extends(ComponentMetadata, _super);
    function ComponentMetadata(_a) {
      var _b = _a === void 0 ? {} : _a,
          selector = _b.selector,
          inputs = _b.inputs,
          outputs = _b.outputs,
          properties = _b.properties,
          events = _b.events,
          host = _b.host,
          exportAs = _b.exportAs,
          moduleId = _b.moduleId,
          bindings = _b.bindings,
          providers = _b.providers,
          viewBindings = _b.viewBindings,
          viewProviders = _b.viewProviders,
          _c = _b.changeDetection,
          changeDetection = _c === void 0 ? change_detection_1.ChangeDetectionStrategy.Default : _c,
          queries = _b.queries,
          templateUrl = _b.templateUrl,
          template = _b.template,
          styleUrls = _b.styleUrls,
          styles = _b.styles,
          directives = _b.directives,
          pipes = _b.pipes,
          encapsulation = _b.encapsulation;
      _super.call(this, {
        selector: selector,
        inputs: inputs,
        outputs: outputs,
        properties: properties,
        events: events,
        host: host,
        exportAs: exportAs,
        bindings: bindings,
        providers: providers,
        queries: queries
      });
      this.changeDetection = changeDetection;
      this._viewProviders = viewProviders;
      this._viewBindings = viewBindings;
      this.templateUrl = templateUrl;
      this.template = template;
      this.styleUrls = styleUrls;
      this.styles = styles;
      this.directives = directives;
      this.pipes = pipes;
      this.encapsulation = encapsulation;
      this.moduleId = moduleId;
    }
    Object.defineProperty(ComponentMetadata.prototype, "viewProviders", {
      get: function() {
        return lang_1.isPresent(this._viewBindings) && this._viewBindings.length > 0 ? this._viewBindings : this._viewProviders;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ComponentMetadata.prototype, "viewBindings", {
      get: function() {
        return this.viewProviders;
      },
      enumerable: true,
      configurable: true
    });
    ComponentMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Object])], ComponentMetadata);
    return ComponentMetadata;
  })(DirectiveMetadata);
  exports.ComponentMetadata = ComponentMetadata;
  var PipeMetadata = (function(_super) {
    __extends(PipeMetadata, _super);
    function PipeMetadata(_a) {
      var name = _a.name,
          pure = _a.pure;
      _super.call(this);
      this.name = name;
      this._pure = pure;
    }
    Object.defineProperty(PipeMetadata.prototype, "pure", {
      get: function() {
        return lang_1.isPresent(this._pure) ? this._pure : true;
      },
      enumerable: true,
      configurable: true
    });
    PipeMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Object])], PipeMetadata);
    return PipeMetadata;
  })(metadata_1.InjectableMetadata);
  exports.PipeMetadata = PipeMetadata;
  var InputMetadata = (function() {
    function InputMetadata(bindingPropertyName) {
      this.bindingPropertyName = bindingPropertyName;
    }
    InputMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [String])], InputMetadata);
    return InputMetadata;
  })();
  exports.InputMetadata = InputMetadata;
  var OutputMetadata = (function() {
    function OutputMetadata(bindingPropertyName) {
      this.bindingPropertyName = bindingPropertyName;
    }
    OutputMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [String])], OutputMetadata);
    return OutputMetadata;
  })();
  exports.OutputMetadata = OutputMetadata;
  var HostBindingMetadata = (function() {
    function HostBindingMetadata(hostPropertyName) {
      this.hostPropertyName = hostPropertyName;
    }
    HostBindingMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [String])], HostBindingMetadata);
    return HostBindingMetadata;
  })();
  exports.HostBindingMetadata = HostBindingMetadata;
  var HostListenerMetadata = (function() {
    function HostListenerMetadata(eventName, args) {
      this.eventName = eventName;
      this.args = args;
    }
    HostListenerMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [String, Array])], HostListenerMetadata);
    return HostListenerMetadata;
  })();
  exports.HostListenerMetadata = HostListenerMetadata;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/differs/iterable_differs.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/di.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var IterableDiffers = (function() {
    function IterableDiffers(factories) {
      this.factories = factories;
    }
    IterableDiffers.create = function(factories, parent) {
      if (lang_1.isPresent(parent)) {
        var copied = collection_1.ListWrapper.clone(parent.factories);
        factories = factories.concat(copied);
        return new IterableDiffers(factories);
      } else {
        return new IterableDiffers(factories);
      }
    };
    IterableDiffers.extend = function(factories) {
      return new di_1.Provider(IterableDiffers, {
        useFactory: function(parent) {
          if (lang_1.isBlank(parent)) {
            throw new exceptions_1.BaseException('Cannot extend IterableDiffers without a parent injector');
          }
          return IterableDiffers.create(factories, parent);
        },
        deps: [[IterableDiffers, new di_1.SkipSelfMetadata(), new di_1.OptionalMetadata()]]
      });
    };
    IterableDiffers.prototype.find = function(iterable) {
      var factory = this.factories.find(function(f) {
        return f.supports(iterable);
      });
      if (lang_1.isPresent(factory)) {
        return factory;
      } else {
        throw new exceptions_1.BaseException("Cannot find a differ supporting object '" + iterable + "'");
      }
    };
    IterableDiffers = __decorate([di_1.Injectable(), lang_1.CONST(), __metadata('design:paramtypes', [Array])], IterableDiffers);
    return IterableDiffers;
  })();
  exports.IterableDiffers = IterableDiffers;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/differs/default_iterable_differ.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var lang_2 = $__require('node_modules/angular2/src/facade/lang.js');
  var DefaultIterableDifferFactory = (function() {
    function DefaultIterableDifferFactory() {}
    DefaultIterableDifferFactory.prototype.supports = function(obj) {
      return collection_1.isListLikeIterable(obj);
    };
    DefaultIterableDifferFactory.prototype.create = function(cdRef, trackByFn) {
      return new DefaultIterableDiffer(trackByFn);
    };
    DefaultIterableDifferFactory = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [])], DefaultIterableDifferFactory);
    return DefaultIterableDifferFactory;
  })();
  exports.DefaultIterableDifferFactory = DefaultIterableDifferFactory;
  var trackByIdentity = function(index, item) {
    return item;
  };
  var DefaultIterableDiffer = (function() {
    function DefaultIterableDiffer(_trackByFn) {
      this._trackByFn = _trackByFn;
      this._length = null;
      this._collection = null;
      this._linkedRecords = null;
      this._unlinkedRecords = null;
      this._previousItHead = null;
      this._itHead = null;
      this._itTail = null;
      this._additionsHead = null;
      this._additionsTail = null;
      this._movesHead = null;
      this._movesTail = null;
      this._removalsHead = null;
      this._removalsTail = null;
      this._identityChangesHead = null;
      this._identityChangesTail = null;
      this._trackByFn = lang_2.isPresent(this._trackByFn) ? this._trackByFn : trackByIdentity;
    }
    Object.defineProperty(DefaultIterableDiffer.prototype, "collection", {
      get: function() {
        return this._collection;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DefaultIterableDiffer.prototype, "length", {
      get: function() {
        return this._length;
      },
      enumerable: true,
      configurable: true
    });
    DefaultIterableDiffer.prototype.forEachItem = function(fn) {
      var record;
      for (record = this._itHead; record !== null; record = record._next) {
        fn(record);
      }
    };
    DefaultIterableDiffer.prototype.forEachPreviousItem = function(fn) {
      var record;
      for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
        fn(record);
      }
    };
    DefaultIterableDiffer.prototype.forEachAddedItem = function(fn) {
      var record;
      for (record = this._additionsHead; record !== null; record = record._nextAdded) {
        fn(record);
      }
    };
    DefaultIterableDiffer.prototype.forEachMovedItem = function(fn) {
      var record;
      for (record = this._movesHead; record !== null; record = record._nextMoved) {
        fn(record);
      }
    };
    DefaultIterableDiffer.prototype.forEachRemovedItem = function(fn) {
      var record;
      for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
        fn(record);
      }
    };
    DefaultIterableDiffer.prototype.forEachIdentityChange = function(fn) {
      var record;
      for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
        fn(record);
      }
    };
    DefaultIterableDiffer.prototype.diff = function(collection) {
      if (lang_2.isBlank(collection))
        collection = [];
      if (!collection_1.isListLikeIterable(collection)) {
        throw new exceptions_1.BaseException("Error trying to diff '" + collection + "'");
      }
      if (this.check(collection)) {
        return this;
      } else {
        return null;
      }
    };
    DefaultIterableDiffer.prototype.onDestroy = function() {};
    DefaultIterableDiffer.prototype.check = function(collection) {
      var _this = this;
      this._reset();
      var record = this._itHead;
      var mayBeDirty = false;
      var index;
      var item;
      var itemTrackBy;
      if (lang_2.isArray(collection)) {
        if (collection !== this._collection || !collection_1.ListWrapper.isImmutable(collection)) {
          var list = collection;
          this._length = collection.length;
          for (index = 0; index < this._length; index++) {
            item = list[index];
            itemTrackBy = this._trackByFn(index, item);
            if (record === null || !lang_2.looseIdentical(record.trackById, itemTrackBy)) {
              record = this._mismatch(record, item, itemTrackBy, index);
              mayBeDirty = true;
            } else {
              if (mayBeDirty) {
                record = this._verifyReinsertion(record, item, itemTrackBy, index);
              }
              if (!lang_2.looseIdentical(record.item, item))
                this._addIdentityChange(record, item);
            }
            record = record._next;
          }
          this._truncate(record);
        }
      } else {
        index = 0;
        collection_1.iterateListLike(collection, function(item) {
          itemTrackBy = _this._trackByFn(index, item);
          if (record === null || !lang_2.looseIdentical(record.trackById, itemTrackBy)) {
            record = _this._mismatch(record, item, itemTrackBy, index);
            mayBeDirty = true;
          } else {
            if (mayBeDirty) {
              record = _this._verifyReinsertion(record, item, itemTrackBy, index);
            }
            if (!lang_2.looseIdentical(record.item, item))
              _this._addIdentityChange(record, item);
          }
          record = record._next;
          index++;
        });
        this._length = index;
        this._truncate(record);
      }
      this._collection = collection;
      return this.isDirty;
    };
    Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
      get: function() {
        return this._additionsHead !== null || this._movesHead !== null || this._removalsHead !== null || this._identityChangesHead !== null;
      },
      enumerable: true,
      configurable: true
    });
    DefaultIterableDiffer.prototype._reset = function() {
      if (this.isDirty) {
        var record;
        var nextRecord;
        for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
          record._nextPrevious = record._next;
        }
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
          record.previousIndex = record.currentIndex;
        }
        this._additionsHead = this._additionsTail = null;
        for (record = this._movesHead; record !== null; record = nextRecord) {
          record.previousIndex = record.currentIndex;
          nextRecord = record._nextMoved;
        }
        this._movesHead = this._movesTail = null;
        this._removalsHead = this._removalsTail = null;
        this._identityChangesHead = this._identityChangesTail = null;
      }
    };
    DefaultIterableDiffer.prototype._mismatch = function(record, item, itemTrackBy, index) {
      var previousRecord;
      if (record === null) {
        previousRecord = this._itTail;
      } else {
        previousRecord = record._prev;
        this._remove(record);
      }
      record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
      if (record !== null) {
        if (!lang_2.looseIdentical(record.item, item))
          this._addIdentityChange(record, item);
        this._moveAfter(record, previousRecord, index);
      } else {
        record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
        if (record !== null) {
          if (!lang_2.looseIdentical(record.item, item))
            this._addIdentityChange(record, item);
          this._reinsertAfter(record, previousRecord, index);
        } else {
          record = this._addAfter(new CollectionChangeRecord(item, itemTrackBy), previousRecord, index);
        }
      }
      return record;
    };
    DefaultIterableDiffer.prototype._verifyReinsertion = function(record, item, itemTrackBy, index) {
      var reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
      if (reinsertRecord !== null) {
        record = this._reinsertAfter(reinsertRecord, record._prev, index);
      } else if (record.currentIndex != index) {
        record.currentIndex = index;
        this._addToMoves(record, index);
      }
      return record;
    };
    DefaultIterableDiffer.prototype._truncate = function(record) {
      while (record !== null) {
        var nextRecord = record._next;
        this._addToRemovals(this._unlink(record));
        record = nextRecord;
      }
      if (this._unlinkedRecords !== null) {
        this._unlinkedRecords.clear();
      }
      if (this._additionsTail !== null) {
        this._additionsTail._nextAdded = null;
      }
      if (this._movesTail !== null) {
        this._movesTail._nextMoved = null;
      }
      if (this._itTail !== null) {
        this._itTail._next = null;
      }
      if (this._removalsTail !== null) {
        this._removalsTail._nextRemoved = null;
      }
      if (this._identityChangesTail !== null) {
        this._identityChangesTail._nextIdentityChange = null;
      }
    };
    DefaultIterableDiffer.prototype._reinsertAfter = function(record, prevRecord, index) {
      if (this._unlinkedRecords !== null) {
        this._unlinkedRecords.remove(record);
      }
      var prev = record._prevRemoved;
      var next = record._nextRemoved;
      if (prev === null) {
        this._removalsHead = next;
      } else {
        prev._nextRemoved = next;
      }
      if (next === null) {
        this._removalsTail = prev;
      } else {
        next._prevRemoved = prev;
      }
      this._insertAfter(record, prevRecord, index);
      this._addToMoves(record, index);
      return record;
    };
    DefaultIterableDiffer.prototype._moveAfter = function(record, prevRecord, index) {
      this._unlink(record);
      this._insertAfter(record, prevRecord, index);
      this._addToMoves(record, index);
      return record;
    };
    DefaultIterableDiffer.prototype._addAfter = function(record, prevRecord, index) {
      this._insertAfter(record, prevRecord, index);
      if (this._additionsTail === null) {
        this._additionsTail = this._additionsHead = record;
      } else {
        this._additionsTail = this._additionsTail._nextAdded = record;
      }
      return record;
    };
    DefaultIterableDiffer.prototype._insertAfter = function(record, prevRecord, index) {
      var next = prevRecord === null ? this._itHead : prevRecord._next;
      record._next = next;
      record._prev = prevRecord;
      if (next === null) {
        this._itTail = record;
      } else {
        next._prev = record;
      }
      if (prevRecord === null) {
        this._itHead = record;
      } else {
        prevRecord._next = record;
      }
      if (this._linkedRecords === null) {
        this._linkedRecords = new _DuplicateMap();
      }
      this._linkedRecords.put(record);
      record.currentIndex = index;
      return record;
    };
    DefaultIterableDiffer.prototype._remove = function(record) {
      return this._addToRemovals(this._unlink(record));
    };
    DefaultIterableDiffer.prototype._unlink = function(record) {
      if (this._linkedRecords !== null) {
        this._linkedRecords.remove(record);
      }
      var prev = record._prev;
      var next = record._next;
      if (prev === null) {
        this._itHead = next;
      } else {
        prev._next = next;
      }
      if (next === null) {
        this._itTail = prev;
      } else {
        next._prev = prev;
      }
      return record;
    };
    DefaultIterableDiffer.prototype._addToMoves = function(record, toIndex) {
      if (record.previousIndex === toIndex) {
        return record;
      }
      if (this._movesTail === null) {
        this._movesTail = this._movesHead = record;
      } else {
        this._movesTail = this._movesTail._nextMoved = record;
      }
      return record;
    };
    DefaultIterableDiffer.prototype._addToRemovals = function(record) {
      if (this._unlinkedRecords === null) {
        this._unlinkedRecords = new _DuplicateMap();
      }
      this._unlinkedRecords.put(record);
      record.currentIndex = null;
      record._nextRemoved = null;
      if (this._removalsTail === null) {
        this._removalsTail = this._removalsHead = record;
        record._prevRemoved = null;
      } else {
        record._prevRemoved = this._removalsTail;
        this._removalsTail = this._removalsTail._nextRemoved = record;
      }
      return record;
    };
    DefaultIterableDiffer.prototype._addIdentityChange = function(record, item) {
      record.item = item;
      if (this._identityChangesTail === null) {
        this._identityChangesTail = this._identityChangesHead = record;
      } else {
        this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
      }
      return record;
    };
    DefaultIterableDiffer.prototype.toString = function() {
      var list = [];
      this.forEachItem(function(record) {
        return list.push(record);
      });
      var previous = [];
      this.forEachPreviousItem(function(record) {
        return previous.push(record);
      });
      var additions = [];
      this.forEachAddedItem(function(record) {
        return additions.push(record);
      });
      var moves = [];
      this.forEachMovedItem(function(record) {
        return moves.push(record);
      });
      var removals = [];
      this.forEachRemovedItem(function(record) {
        return removals.push(record);
      });
      var identityChanges = [];
      this.forEachIdentityChange(function(record) {
        return identityChanges.push(record);
      });
      return "collection: " + list.join(', ') + "\n" + "previous: " + previous.join(', ') + "\n" + "additions: " + additions.join(', ') + "\n" + "moves: " + moves.join(', ') + "\n" + "removals: " + removals.join(', ') + "\n" + "identityChanges: " + identityChanges.join(', ') + "\n";
    };
    return DefaultIterableDiffer;
  })();
  exports.DefaultIterableDiffer = DefaultIterableDiffer;
  var CollectionChangeRecord = (function() {
    function CollectionChangeRecord(item, trackById) {
      this.item = item;
      this.trackById = trackById;
      this.currentIndex = null;
      this.previousIndex = null;
      this._nextPrevious = null;
      this._prev = null;
      this._next = null;
      this._prevDup = null;
      this._nextDup = null;
      this._prevRemoved = null;
      this._nextRemoved = null;
      this._nextAdded = null;
      this._nextMoved = null;
      this._nextIdentityChange = null;
    }
    CollectionChangeRecord.prototype.toString = function() {
      return this.previousIndex === this.currentIndex ? lang_2.stringify(this.item) : lang_2.stringify(this.item) + '[' + lang_2.stringify(this.previousIndex) + '->' + lang_2.stringify(this.currentIndex) + ']';
    };
    return CollectionChangeRecord;
  })();
  exports.CollectionChangeRecord = CollectionChangeRecord;
  var _DuplicateItemRecordList = (function() {
    function _DuplicateItemRecordList() {
      this._head = null;
      this._tail = null;
    }
    _DuplicateItemRecordList.prototype.add = function(record) {
      if (this._head === null) {
        this._head = this._tail = record;
        record._nextDup = null;
        record._prevDup = null;
      } else {
        this._tail._nextDup = record;
        record._prevDup = this._tail;
        record._nextDup = null;
        this._tail = record;
      }
    };
    _DuplicateItemRecordList.prototype.get = function(trackById, afterIndex) {
      var record;
      for (record = this._head; record !== null; record = record._nextDup) {
        if ((afterIndex === null || afterIndex < record.currentIndex) && lang_2.looseIdentical(record.trackById, trackById)) {
          return record;
        }
      }
      return null;
    };
    _DuplicateItemRecordList.prototype.remove = function(record) {
      var prev = record._prevDup;
      var next = record._nextDup;
      if (prev === null) {
        this._head = next;
      } else {
        prev._nextDup = next;
      }
      if (next === null) {
        this._tail = prev;
      } else {
        next._prevDup = prev;
      }
      return this._head === null;
    };
    return _DuplicateItemRecordList;
  })();
  var _DuplicateMap = (function() {
    function _DuplicateMap() {
      this.map = new Map();
    }
    _DuplicateMap.prototype.put = function(record) {
      var key = lang_2.getMapKey(record.trackById);
      var duplicates = this.map.get(key);
      if (!lang_2.isPresent(duplicates)) {
        duplicates = new _DuplicateItemRecordList();
        this.map.set(key, duplicates);
      }
      duplicates.add(record);
    };
    _DuplicateMap.prototype.get = function(trackById, afterIndex) {
      if (afterIndex === void 0) {
        afterIndex = null;
      }
      var key = lang_2.getMapKey(trackById);
      var recordList = this.map.get(key);
      return lang_2.isBlank(recordList) ? null : recordList.get(trackById, afterIndex);
    };
    _DuplicateMap.prototype.remove = function(record) {
      var key = lang_2.getMapKey(record.trackById);
      var recordList = this.map.get(key);
      if (recordList.remove(record)) {
        this.map.delete(key);
      }
      return record;
    };
    Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
      get: function() {
        return this.map.size === 0;
      },
      enumerable: true,
      configurable: true
    });
    _DuplicateMap.prototype.clear = function() {
      this.map.clear();
    };
    _DuplicateMap.prototype.toString = function() {
      return '_DuplicateMap(' + lang_2.stringify(this.map) + ')';
    };
    return _DuplicateMap;
  })();
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/differs/keyvalue_differs.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/di.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var KeyValueDiffers = (function() {
    function KeyValueDiffers(factories) {
      this.factories = factories;
    }
    KeyValueDiffers.create = function(factories, parent) {
      if (lang_1.isPresent(parent)) {
        var copied = collection_1.ListWrapper.clone(parent.factories);
        factories = factories.concat(copied);
        return new KeyValueDiffers(factories);
      } else {
        return new KeyValueDiffers(factories);
      }
    };
    KeyValueDiffers.extend = function(factories) {
      return new di_1.Provider(KeyValueDiffers, {
        useFactory: function(parent) {
          if (lang_1.isBlank(parent)) {
            throw new exceptions_1.BaseException('Cannot extend KeyValueDiffers without a parent injector');
          }
          return KeyValueDiffers.create(factories, parent);
        },
        deps: [[KeyValueDiffers, new di_1.SkipSelfMetadata(), new di_1.OptionalMetadata()]]
      });
    };
    KeyValueDiffers.prototype.find = function(kv) {
      var factory = this.factories.find(function(f) {
        return f.supports(kv);
      });
      if (lang_1.isPresent(factory)) {
        return factory;
      } else {
        throw new exceptions_1.BaseException("Cannot find a differ supporting object '" + kv + "'");
      }
    };
    KeyValueDiffers = __decorate([di_1.Injectable(), lang_1.CONST(), __metadata('design:paramtypes', [Array])], KeyValueDiffers);
    return KeyValueDiffers;
  })();
  exports.KeyValueDiffers = KeyValueDiffers;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/differs/default_keyvalue_differ.js", ["node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var DefaultKeyValueDifferFactory = (function() {
    function DefaultKeyValueDifferFactory() {}
    DefaultKeyValueDifferFactory.prototype.supports = function(obj) {
      return obj instanceof Map || lang_1.isJsObject(obj);
    };
    DefaultKeyValueDifferFactory.prototype.create = function(cdRef) {
      return new DefaultKeyValueDiffer();
    };
    DefaultKeyValueDifferFactory = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [])], DefaultKeyValueDifferFactory);
    return DefaultKeyValueDifferFactory;
  })();
  exports.DefaultKeyValueDifferFactory = DefaultKeyValueDifferFactory;
  var DefaultKeyValueDiffer = (function() {
    function DefaultKeyValueDiffer() {
      this._records = new Map();
      this._mapHead = null;
      this._previousMapHead = null;
      this._changesHead = null;
      this._changesTail = null;
      this._additionsHead = null;
      this._additionsTail = null;
      this._removalsHead = null;
      this._removalsTail = null;
    }
    Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
      get: function() {
        return this._additionsHead !== null || this._changesHead !== null || this._removalsHead !== null;
      },
      enumerable: true,
      configurable: true
    });
    DefaultKeyValueDiffer.prototype.forEachItem = function(fn) {
      var record;
      for (record = this._mapHead; record !== null; record = record._next) {
        fn(record);
      }
    };
    DefaultKeyValueDiffer.prototype.forEachPreviousItem = function(fn) {
      var record;
      for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
        fn(record);
      }
    };
    DefaultKeyValueDiffer.prototype.forEachChangedItem = function(fn) {
      var record;
      for (record = this._changesHead; record !== null; record = record._nextChanged) {
        fn(record);
      }
    };
    DefaultKeyValueDiffer.prototype.forEachAddedItem = function(fn) {
      var record;
      for (record = this._additionsHead; record !== null; record = record._nextAdded) {
        fn(record);
      }
    };
    DefaultKeyValueDiffer.prototype.forEachRemovedItem = function(fn) {
      var record;
      for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
        fn(record);
      }
    };
    DefaultKeyValueDiffer.prototype.diff = function(map) {
      if (lang_1.isBlank(map))
        map = collection_1.MapWrapper.createFromPairs([]);
      if (!(map instanceof Map || lang_1.isJsObject(map))) {
        throw new exceptions_1.BaseException("Error trying to diff '" + map + "'");
      }
      if (this.check(map)) {
        return this;
      } else {
        return null;
      }
    };
    DefaultKeyValueDiffer.prototype.onDestroy = function() {};
    DefaultKeyValueDiffer.prototype.check = function(map) {
      var _this = this;
      this._reset();
      var records = this._records;
      var oldSeqRecord = this._mapHead;
      var lastOldSeqRecord = null;
      var lastNewSeqRecord = null;
      var seqChanged = false;
      this._forEach(map, function(value, key) {
        var newSeqRecord;
        if (oldSeqRecord !== null && key === oldSeqRecord.key) {
          newSeqRecord = oldSeqRecord;
          if (!lang_1.looseIdentical(value, oldSeqRecord.currentValue)) {
            oldSeqRecord.previousValue = oldSeqRecord.currentValue;
            oldSeqRecord.currentValue = value;
            _this._addToChanges(oldSeqRecord);
          }
        } else {
          seqChanged = true;
          if (oldSeqRecord !== null) {
            oldSeqRecord._next = null;
            _this._removeFromSeq(lastOldSeqRecord, oldSeqRecord);
            _this._addToRemovals(oldSeqRecord);
          }
          if (records.has(key)) {
            newSeqRecord = records.get(key);
          } else {
            newSeqRecord = new KeyValueChangeRecord(key);
            records.set(key, newSeqRecord);
            newSeqRecord.currentValue = value;
            _this._addToAdditions(newSeqRecord);
          }
        }
        if (seqChanged) {
          if (_this._isInRemovals(newSeqRecord)) {
            _this._removeFromRemovals(newSeqRecord);
          }
          if (lastNewSeqRecord == null) {
            _this._mapHead = newSeqRecord;
          } else {
            lastNewSeqRecord._next = newSeqRecord;
          }
        }
        lastOldSeqRecord = oldSeqRecord;
        lastNewSeqRecord = newSeqRecord;
        oldSeqRecord = oldSeqRecord === null ? null : oldSeqRecord._next;
      });
      this._truncate(lastOldSeqRecord, oldSeqRecord);
      return this.isDirty;
    };
    DefaultKeyValueDiffer.prototype._reset = function() {
      if (this.isDirty) {
        var record;
        for (record = this._previousMapHead = this._mapHead; record !== null; record = record._next) {
          record._nextPrevious = record._next;
        }
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
          record.previousValue = record.currentValue;
        }
        for (record = this._additionsHead; record != null; record = record._nextAdded) {
          record.previousValue = record.currentValue;
        }
        this._changesHead = this._changesTail = null;
        this._additionsHead = this._additionsTail = null;
        this._removalsHead = this._removalsTail = null;
      }
    };
    DefaultKeyValueDiffer.prototype._truncate = function(lastRecord, record) {
      while (record !== null) {
        if (lastRecord === null) {
          this._mapHead = null;
        } else {
          lastRecord._next = null;
        }
        var nextRecord = record._next;
        this._addToRemovals(record);
        lastRecord = record;
        record = nextRecord;
      }
      for (var rec = this._removalsHead; rec !== null; rec = rec._nextRemoved) {
        rec.previousValue = rec.currentValue;
        rec.currentValue = null;
        this._records.delete(rec.key);
      }
    };
    DefaultKeyValueDiffer.prototype._isInRemovals = function(record) {
      return record === this._removalsHead || record._nextRemoved !== null || record._prevRemoved !== null;
    };
    DefaultKeyValueDiffer.prototype._addToRemovals = function(record) {
      if (this._removalsHead === null) {
        this._removalsHead = this._removalsTail = record;
      } else {
        this._removalsTail._nextRemoved = record;
        record._prevRemoved = this._removalsTail;
        this._removalsTail = record;
      }
    };
    DefaultKeyValueDiffer.prototype._removeFromSeq = function(prev, record) {
      var next = record._next;
      if (prev === null) {
        this._mapHead = next;
      } else {
        prev._next = next;
      }
    };
    DefaultKeyValueDiffer.prototype._removeFromRemovals = function(record) {
      var prev = record._prevRemoved;
      var next = record._nextRemoved;
      if (prev === null) {
        this._removalsHead = next;
      } else {
        prev._nextRemoved = next;
      }
      if (next === null) {
        this._removalsTail = prev;
      } else {
        next._prevRemoved = prev;
      }
      record._prevRemoved = record._nextRemoved = null;
    };
    DefaultKeyValueDiffer.prototype._addToAdditions = function(record) {
      if (this._additionsHead === null) {
        this._additionsHead = this._additionsTail = record;
      } else {
        this._additionsTail._nextAdded = record;
        this._additionsTail = record;
      }
    };
    DefaultKeyValueDiffer.prototype._addToChanges = function(record) {
      if (this._changesHead === null) {
        this._changesHead = this._changesTail = record;
      } else {
        this._changesTail._nextChanged = record;
        this._changesTail = record;
      }
    };
    DefaultKeyValueDiffer.prototype.toString = function() {
      var items = [];
      var previous = [];
      var changes = [];
      var additions = [];
      var removals = [];
      var record;
      for (record = this._mapHead; record !== null; record = record._next) {
        items.push(lang_1.stringify(record));
      }
      for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
        previous.push(lang_1.stringify(record));
      }
      for (record = this._changesHead; record !== null; record = record._nextChanged) {
        changes.push(lang_1.stringify(record));
      }
      for (record = this._additionsHead; record !== null; record = record._nextAdded) {
        additions.push(lang_1.stringify(record));
      }
      for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
        removals.push(lang_1.stringify(record));
      }
      return "map: " + items.join(', ') + "\n" + "previous: " + previous.join(', ') + "\n" + "additions: " + additions.join(', ') + "\n" + "changes: " + changes.join(', ') + "\n" + "removals: " + removals.join(', ') + "\n";
    };
    DefaultKeyValueDiffer.prototype._forEach = function(obj, fn) {
      if (obj instanceof Map) {
        obj.forEach(fn);
      } else {
        collection_1.StringMapWrapper.forEach(obj, fn);
      }
    };
    return DefaultKeyValueDiffer;
  })();
  exports.DefaultKeyValueDiffer = DefaultKeyValueDiffer;
  var KeyValueChangeRecord = (function() {
    function KeyValueChangeRecord(key) {
      this.key = key;
      this.previousValue = null;
      this.currentValue = null;
      this._nextPrevious = null;
      this._next = null;
      this._nextAdded = null;
      this._nextRemoved = null;
      this._prevRemoved = null;
      this._nextChanged = null;
    }
    KeyValueChangeRecord.prototype.toString = function() {
      return lang_1.looseIdentical(this.previousValue, this.currentValue) ? lang_1.stringify(this.key) : (lang_1.stringify(this.key) + '[' + lang_1.stringify(this.previousValue) + '->' + lang_1.stringify(this.currentValue) + ']');
    };
    return KeyValueChangeRecord;
  })();
  exports.KeyValueChangeRecord = KeyValueChangeRecord;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/parser/lexer.js", ["node_modules/angular2/src/core/di/decorators.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var decorators_1 = $__require('node_modules/angular2/src/core/di/decorators.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  (function(TokenType) {
    TokenType[TokenType["Character"] = 0] = "Character";
    TokenType[TokenType["Identifier"] = 1] = "Identifier";
    TokenType[TokenType["Keyword"] = 2] = "Keyword";
    TokenType[TokenType["String"] = 3] = "String";
    TokenType[TokenType["Operator"] = 4] = "Operator";
    TokenType[TokenType["Number"] = 5] = "Number";
  })(exports.TokenType || (exports.TokenType = {}));
  var TokenType = exports.TokenType;
  var Lexer = (function() {
    function Lexer() {}
    Lexer.prototype.tokenize = function(text) {
      var scanner = new _Scanner(text);
      var tokens = [];
      var token = scanner.scanToken();
      while (token != null) {
        tokens.push(token);
        token = scanner.scanToken();
      }
      return tokens;
    };
    Lexer = __decorate([decorators_1.Injectable(), __metadata('design:paramtypes', [])], Lexer);
    return Lexer;
  })();
  exports.Lexer = Lexer;
  var Token = (function() {
    function Token(index, type, numValue, strValue) {
      this.index = index;
      this.type = type;
      this.numValue = numValue;
      this.strValue = strValue;
    }
    Token.prototype.isCharacter = function(code) {
      return (this.type == TokenType.Character && this.numValue == code);
    };
    Token.prototype.isNumber = function() {
      return (this.type == TokenType.Number);
    };
    Token.prototype.isString = function() {
      return (this.type == TokenType.String);
    };
    Token.prototype.isOperator = function(operater) {
      return (this.type == TokenType.Operator && this.strValue == operater);
    };
    Token.prototype.isIdentifier = function() {
      return (this.type == TokenType.Identifier);
    };
    Token.prototype.isKeyword = function() {
      return (this.type == TokenType.Keyword);
    };
    Token.prototype.isKeywordVar = function() {
      return (this.type == TokenType.Keyword && this.strValue == "var");
    };
    Token.prototype.isKeywordNull = function() {
      return (this.type == TokenType.Keyword && this.strValue == "null");
    };
    Token.prototype.isKeywordUndefined = function() {
      return (this.type == TokenType.Keyword && this.strValue == "undefined");
    };
    Token.prototype.isKeywordTrue = function() {
      return (this.type == TokenType.Keyword && this.strValue == "true");
    };
    Token.prototype.isKeywordFalse = function() {
      return (this.type == TokenType.Keyword && this.strValue == "false");
    };
    Token.prototype.toNumber = function() {
      return (this.type == TokenType.Number) ? this.numValue : -1;
    };
    Token.prototype.toString = function() {
      switch (this.type) {
        case TokenType.Character:
        case TokenType.Identifier:
        case TokenType.Keyword:
        case TokenType.Operator:
        case TokenType.String:
          return this.strValue;
        case TokenType.Number:
          return this.numValue.toString();
        default:
          return null;
      }
    };
    return Token;
  })();
  exports.Token = Token;
  function newCharacterToken(index, code) {
    return new Token(index, TokenType.Character, code, lang_1.StringWrapper.fromCharCode(code));
  }
  function newIdentifierToken(index, text) {
    return new Token(index, TokenType.Identifier, 0, text);
  }
  function newKeywordToken(index, text) {
    return new Token(index, TokenType.Keyword, 0, text);
  }
  function newOperatorToken(index, text) {
    return new Token(index, TokenType.Operator, 0, text);
  }
  function newStringToken(index, text) {
    return new Token(index, TokenType.String, 0, text);
  }
  function newNumberToken(index, n) {
    return new Token(index, TokenType.Number, n, "");
  }
  exports.EOF = new Token(-1, TokenType.Character, 0, "");
  exports.$EOF = 0;
  exports.$TAB = 9;
  exports.$LF = 10;
  exports.$VTAB = 11;
  exports.$FF = 12;
  exports.$CR = 13;
  exports.$SPACE = 32;
  exports.$BANG = 33;
  exports.$DQ = 34;
  exports.$HASH = 35;
  exports.$$ = 36;
  exports.$PERCENT = 37;
  exports.$AMPERSAND = 38;
  exports.$SQ = 39;
  exports.$LPAREN = 40;
  exports.$RPAREN = 41;
  exports.$STAR = 42;
  exports.$PLUS = 43;
  exports.$COMMA = 44;
  exports.$MINUS = 45;
  exports.$PERIOD = 46;
  exports.$SLASH = 47;
  exports.$COLON = 58;
  exports.$SEMICOLON = 59;
  exports.$LT = 60;
  exports.$EQ = 61;
  exports.$GT = 62;
  exports.$QUESTION = 63;
  var $0 = 48;
  var $9 = 57;
  var $A = 65,
      $E = 69,
      $Z = 90;
  exports.$LBRACKET = 91;
  exports.$BACKSLASH = 92;
  exports.$RBRACKET = 93;
  var $CARET = 94;
  var $_ = 95;
  var $a = 97,
      $e = 101,
      $f = 102,
      $n = 110,
      $r = 114,
      $t = 116,
      $u = 117,
      $v = 118,
      $z = 122;
  exports.$LBRACE = 123;
  exports.$BAR = 124;
  exports.$RBRACE = 125;
  var $NBSP = 160;
  var ScannerError = (function(_super) {
    __extends(ScannerError, _super);
    function ScannerError(message) {
      _super.call(this);
      this.message = message;
    }
    ScannerError.prototype.toString = function() {
      return this.message;
    };
    return ScannerError;
  })(exceptions_1.BaseException);
  exports.ScannerError = ScannerError;
  var _Scanner = (function() {
    function _Scanner(input) {
      this.input = input;
      this.peek = 0;
      this.index = -1;
      this.length = input.length;
      this.advance();
    }
    _Scanner.prototype.advance = function() {
      this.peek = ++this.index >= this.length ? exports.$EOF : lang_1.StringWrapper.charCodeAt(this.input, this.index);
    };
    _Scanner.prototype.scanToken = function() {
      var input = this.input,
          length = this.length,
          peek = this.peek,
          index = this.index;
      while (peek <= exports.$SPACE) {
        if (++index >= length) {
          peek = exports.$EOF;
          break;
        } else {
          peek = lang_1.StringWrapper.charCodeAt(input, index);
        }
      }
      this.peek = peek;
      this.index = index;
      if (index >= length) {
        return null;
      }
      if (isIdentifierStart(peek))
        return this.scanIdentifier();
      if (isDigit(peek))
        return this.scanNumber(index);
      var start = index;
      switch (peek) {
        case exports.$PERIOD:
          this.advance();
          return isDigit(this.peek) ? this.scanNumber(start) : newCharacterToken(start, exports.$PERIOD);
        case exports.$LPAREN:
        case exports.$RPAREN:
        case exports.$LBRACE:
        case exports.$RBRACE:
        case exports.$LBRACKET:
        case exports.$RBRACKET:
        case exports.$COMMA:
        case exports.$COLON:
        case exports.$SEMICOLON:
          return this.scanCharacter(start, peek);
        case exports.$SQ:
        case exports.$DQ:
          return this.scanString();
        case exports.$HASH:
        case exports.$PLUS:
        case exports.$MINUS:
        case exports.$STAR:
        case exports.$SLASH:
        case exports.$PERCENT:
        case $CARET:
          return this.scanOperator(start, lang_1.StringWrapper.fromCharCode(peek));
        case exports.$QUESTION:
          return this.scanComplexOperator(start, '?', exports.$PERIOD, '.');
        case exports.$LT:
        case exports.$GT:
          return this.scanComplexOperator(start, lang_1.StringWrapper.fromCharCode(peek), exports.$EQ, '=');
        case exports.$BANG:
        case exports.$EQ:
          return this.scanComplexOperator(start, lang_1.StringWrapper.fromCharCode(peek), exports.$EQ, '=', exports.$EQ, '=');
        case exports.$AMPERSAND:
          return this.scanComplexOperator(start, '&', exports.$AMPERSAND, '&');
        case exports.$BAR:
          return this.scanComplexOperator(start, '|', exports.$BAR, '|');
        case $NBSP:
          while (isWhitespace(this.peek))
            this.advance();
          return this.scanToken();
      }
      this.error("Unexpected character [" + lang_1.StringWrapper.fromCharCode(peek) + "]", 0);
      return null;
    };
    _Scanner.prototype.scanCharacter = function(start, code) {
      this.advance();
      return newCharacterToken(start, code);
    };
    _Scanner.prototype.scanOperator = function(start, str) {
      this.advance();
      return newOperatorToken(start, str);
    };
    _Scanner.prototype.scanComplexOperator = function(start, one, twoCode, two, threeCode, three) {
      this.advance();
      var str = one;
      if (this.peek == twoCode) {
        this.advance();
        str += two;
      }
      if (lang_1.isPresent(threeCode) && this.peek == threeCode) {
        this.advance();
        str += three;
      }
      return newOperatorToken(start, str);
    };
    _Scanner.prototype.scanIdentifier = function() {
      var start = this.index;
      this.advance();
      while (isIdentifierPart(this.peek))
        this.advance();
      var str = this.input.substring(start, this.index);
      if (collection_1.SetWrapper.has(KEYWORDS, str)) {
        return newKeywordToken(start, str);
      } else {
        return newIdentifierToken(start, str);
      }
    };
    _Scanner.prototype.scanNumber = function(start) {
      var simple = (this.index === start);
      this.advance();
      while (true) {
        if (isDigit(this.peek)) {} else if (this.peek == exports.$PERIOD) {
          simple = false;
        } else if (isExponentStart(this.peek)) {
          this.advance();
          if (isExponentSign(this.peek))
            this.advance();
          if (!isDigit(this.peek))
            this.error('Invalid exponent', -1);
          simple = false;
        } else {
          break;
        }
        this.advance();
      }
      var str = this.input.substring(start, this.index);
      var value = simple ? lang_1.NumberWrapper.parseIntAutoRadix(str) : lang_1.NumberWrapper.parseFloat(str);
      return newNumberToken(start, value);
    };
    _Scanner.prototype.scanString = function() {
      var start = this.index;
      var quote = this.peek;
      this.advance();
      var buffer;
      var marker = this.index;
      var input = this.input;
      while (this.peek != quote) {
        if (this.peek == exports.$BACKSLASH) {
          if (buffer == null)
            buffer = new lang_1.StringJoiner();
          buffer.add(input.substring(marker, this.index));
          this.advance();
          var unescapedCode;
          if (this.peek == $u) {
            var hex = input.substring(this.index + 1, this.index + 5);
            try {
              unescapedCode = lang_1.NumberWrapper.parseInt(hex, 16);
            } catch (e) {
              this.error("Invalid unicode escape [\\u" + hex + "]", 0);
            }
            for (var i = 0; i < 5; i++) {
              this.advance();
            }
          } else {
            unescapedCode = unescape(this.peek);
            this.advance();
          }
          buffer.add(lang_1.StringWrapper.fromCharCode(unescapedCode));
          marker = this.index;
        } else if (this.peek == exports.$EOF) {
          this.error('Unterminated quote', 0);
        } else {
          this.advance();
        }
      }
      var last = input.substring(marker, this.index);
      this.advance();
      var unescaped = last;
      if (buffer != null) {
        buffer.add(last);
        unescaped = buffer.toString();
      }
      return newStringToken(start, unescaped);
    };
    _Scanner.prototype.error = function(message, offset) {
      var position = this.index + offset;
      throw new ScannerError("Lexer Error: " + message + " at column " + position + " in expression [" + this.input + "]");
    };
    return _Scanner;
  })();
  function isWhitespace(code) {
    return (code >= exports.$TAB && code <= exports.$SPACE) || (code == $NBSP);
  }
  function isIdentifierStart(code) {
    return ($a <= code && code <= $z) || ($A <= code && code <= $Z) || (code == $_) || (code == exports.$$);
  }
  function isIdentifier(input) {
    if (input.length == 0)
      return false;
    var scanner = new _Scanner(input);
    if (!isIdentifierStart(scanner.peek))
      return false;
    scanner.advance();
    while (scanner.peek !== exports.$EOF) {
      if (!isIdentifierPart(scanner.peek))
        return false;
      scanner.advance();
    }
    return true;
  }
  exports.isIdentifier = isIdentifier;
  function isIdentifierPart(code) {
    return ($a <= code && code <= $z) || ($A <= code && code <= $Z) || ($0 <= code && code <= $9) || (code == $_) || (code == exports.$$);
  }
  function isDigit(code) {
    return $0 <= code && code <= $9;
  }
  function isExponentStart(code) {
    return code == $e || code == $E;
  }
  function isExponentSign(code) {
    return code == exports.$MINUS || code == exports.$PLUS;
  }
  function unescape(code) {
    switch (code) {
      case $n:
        return exports.$LF;
      case $f:
        return exports.$FF;
      case $r:
        return exports.$CR;
      case $t:
        return exports.$TAB;
      case $v:
        return exports.$VTAB;
      default:
        return code;
    }
  }
  var OPERATORS = collection_1.SetWrapper.createFromList(['+', '-', '*', '/', '%', '^', '=', '==', '!=', '===', '!==', '<', '>', '<=', '>=', '&&', '||', '&', '|', '!', '?', '#', '?.']);
  var KEYWORDS = collection_1.SetWrapper.createFromList(['var', 'null', 'undefined', 'true', 'false', 'if', 'else']);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/parser/parser.js", ["node_modules/angular2/src/core/di/decorators.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/change_detection/parser/lexer.js", "node_modules/angular2/src/core/reflection/reflection.js", "node_modules/angular2/src/core/change_detection/parser/ast.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var decorators_1 = $__require('node_modules/angular2/src/core/di/decorators.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var lexer_1 = $__require('node_modules/angular2/src/core/change_detection/parser/lexer.js');
  var reflection_1 = $__require('node_modules/angular2/src/core/reflection/reflection.js');
  var ast_1 = $__require('node_modules/angular2/src/core/change_detection/parser/ast.js');
  var _implicitReceiver = new ast_1.ImplicitReceiver();
  var INTERPOLATION_REGEXP = /\{\{([\s\S]*?)\}\}/g;
  var ParseException = (function(_super) {
    __extends(ParseException, _super);
    function ParseException(message, input, errLocation, ctxLocation) {
      _super.call(this, "Parser Error: " + message + " " + errLocation + " [" + input + "] in " + ctxLocation);
    }
    return ParseException;
  })(exceptions_1.BaseException);
  var Parser = (function() {
    function Parser(_lexer, providedReflector) {
      if (providedReflector === void 0) {
        providedReflector = null;
      }
      this._lexer = _lexer;
      this._reflector = lang_1.isPresent(providedReflector) ? providedReflector : reflection_1.reflector;
    }
    Parser.prototype.parseAction = function(input, location) {
      this._checkNoInterpolation(input, location);
      var tokens = this._lexer.tokenize(input);
      var ast = new _ParseAST(input, location, tokens, this._reflector, true).parseChain();
      return new ast_1.ASTWithSource(ast, input, location);
    };
    Parser.prototype.parseBinding = function(input, location) {
      var ast = this._parseBindingAst(input, location);
      return new ast_1.ASTWithSource(ast, input, location);
    };
    Parser.prototype.parseSimpleBinding = function(input, location) {
      var ast = this._parseBindingAst(input, location);
      if (!SimpleExpressionChecker.check(ast)) {
        throw new ParseException('Host binding expression can only contain field access and constants', input, location);
      }
      return new ast_1.ASTWithSource(ast, input, location);
    };
    Parser.prototype._parseBindingAst = function(input, location) {
      var quote = this._parseQuote(input, location);
      if (lang_1.isPresent(quote)) {
        return quote;
      }
      this._checkNoInterpolation(input, location);
      var tokens = this._lexer.tokenize(input);
      return new _ParseAST(input, location, tokens, this._reflector, false).parseChain();
    };
    Parser.prototype._parseQuote = function(input, location) {
      if (lang_1.isBlank(input))
        return null;
      var prefixSeparatorIndex = input.indexOf(':');
      if (prefixSeparatorIndex == -1)
        return null;
      var prefix = input.substring(0, prefixSeparatorIndex).trim();
      if (!lexer_1.isIdentifier(prefix))
        return null;
      var uninterpretedExpression = input.substring(prefixSeparatorIndex + 1);
      return new ast_1.Quote(prefix, uninterpretedExpression, location);
    };
    Parser.prototype.parseTemplateBindings = function(input, location) {
      var tokens = this._lexer.tokenize(input);
      return new _ParseAST(input, location, tokens, this._reflector, false).parseTemplateBindings();
    };
    Parser.prototype.parseInterpolation = function(input, location) {
      var parts = lang_1.StringWrapper.split(input, INTERPOLATION_REGEXP);
      if (parts.length <= 1) {
        return null;
      }
      var strings = [];
      var expressions = [];
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (i % 2 === 0) {
          strings.push(part);
        } else if (part.trim().length > 0) {
          var tokens = this._lexer.tokenize(part);
          var ast = new _ParseAST(input, location, tokens, this._reflector, false).parseChain();
          expressions.push(ast);
        } else {
          throw new ParseException('Blank expressions are not allowed in interpolated strings', input, "at column " + this._findInterpolationErrorColumn(parts, i) + " in", location);
        }
      }
      return new ast_1.ASTWithSource(new ast_1.Interpolation(strings, expressions), input, location);
    };
    Parser.prototype.wrapLiteralPrimitive = function(input, location) {
      return new ast_1.ASTWithSource(new ast_1.LiteralPrimitive(input), input, location);
    };
    Parser.prototype._checkNoInterpolation = function(input, location) {
      var parts = lang_1.StringWrapper.split(input, INTERPOLATION_REGEXP);
      if (parts.length > 1) {
        throw new ParseException('Got interpolation ({{}}) where expression was expected', input, "at column " + this._findInterpolationErrorColumn(parts, 1) + " in", location);
      }
    };
    Parser.prototype._findInterpolationErrorColumn = function(parts, partInErrIdx) {
      var errLocation = '';
      for (var j = 0; j < partInErrIdx; j++) {
        errLocation += j % 2 === 0 ? parts[j] : "{{" + parts[j] + "}}";
      }
      return errLocation.length;
    };
    Parser = __decorate([decorators_1.Injectable(), __metadata('design:paramtypes', [lexer_1.Lexer, reflection_1.Reflector])], Parser);
    return Parser;
  })();
  exports.Parser = Parser;
  var _ParseAST = (function() {
    function _ParseAST(input, location, tokens, reflector, parseAction) {
      this.input = input;
      this.location = location;
      this.tokens = tokens;
      this.reflector = reflector;
      this.parseAction = parseAction;
      this.index = 0;
    }
    _ParseAST.prototype.peek = function(offset) {
      var i = this.index + offset;
      return i < this.tokens.length ? this.tokens[i] : lexer_1.EOF;
    };
    Object.defineProperty(_ParseAST.prototype, "next", {
      get: function() {
        return this.peek(0);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(_ParseAST.prototype, "inputIndex", {
      get: function() {
        return (this.index < this.tokens.length) ? this.next.index : this.input.length;
      },
      enumerable: true,
      configurable: true
    });
    _ParseAST.prototype.advance = function() {
      this.index++;
    };
    _ParseAST.prototype.optionalCharacter = function(code) {
      if (this.next.isCharacter(code)) {
        this.advance();
        return true;
      } else {
        return false;
      }
    };
    _ParseAST.prototype.optionalKeywordVar = function() {
      if (this.peekKeywordVar()) {
        this.advance();
        return true;
      } else {
        return false;
      }
    };
    _ParseAST.prototype.peekKeywordVar = function() {
      return this.next.isKeywordVar() || this.next.isOperator('#');
    };
    _ParseAST.prototype.expectCharacter = function(code) {
      if (this.optionalCharacter(code))
        return;
      this.error("Missing expected " + lang_1.StringWrapper.fromCharCode(code));
    };
    _ParseAST.prototype.optionalOperator = function(op) {
      if (this.next.isOperator(op)) {
        this.advance();
        return true;
      } else {
        return false;
      }
    };
    _ParseAST.prototype.expectOperator = function(operator) {
      if (this.optionalOperator(operator))
        return;
      this.error("Missing expected operator " + operator);
    };
    _ParseAST.prototype.expectIdentifierOrKeyword = function() {
      var n = this.next;
      if (!n.isIdentifier() && !n.isKeyword()) {
        this.error("Unexpected token " + n + ", expected identifier or keyword");
      }
      this.advance();
      return n.toString();
    };
    _ParseAST.prototype.expectIdentifierOrKeywordOrString = function() {
      var n = this.next;
      if (!n.isIdentifier() && !n.isKeyword() && !n.isString()) {
        this.error("Unexpected token " + n + ", expected identifier, keyword, or string");
      }
      this.advance();
      return n.toString();
    };
    _ParseAST.prototype.parseChain = function() {
      var exprs = [];
      while (this.index < this.tokens.length) {
        var expr = this.parsePipe();
        exprs.push(expr);
        if (this.optionalCharacter(lexer_1.$SEMICOLON)) {
          if (!this.parseAction) {
            this.error("Binding expression cannot contain chained expression");
          }
          while (this.optionalCharacter(lexer_1.$SEMICOLON)) {}
        } else if (this.index < this.tokens.length) {
          this.error("Unexpected token '" + this.next + "'");
        }
      }
      if (exprs.length == 0)
        return new ast_1.EmptyExpr();
      if (exprs.length == 1)
        return exprs[0];
      return new ast_1.Chain(exprs);
    };
    _ParseAST.prototype.parsePipe = function() {
      var result = this.parseExpression();
      if (this.optionalOperator("|")) {
        if (this.parseAction) {
          this.error("Cannot have a pipe in an action expression");
        }
        do {
          var name = this.expectIdentifierOrKeyword();
          var args = [];
          while (this.optionalCharacter(lexer_1.$COLON)) {
            args.push(this.parseExpression());
          }
          result = new ast_1.BindingPipe(result, name, args);
        } while (this.optionalOperator("|"));
      }
      return result;
    };
    _ParseAST.prototype.parseExpression = function() {
      return this.parseConditional();
    };
    _ParseAST.prototype.parseConditional = function() {
      var start = this.inputIndex;
      var result = this.parseLogicalOr();
      if (this.optionalOperator('?')) {
        var yes = this.parsePipe();
        if (!this.optionalCharacter(lexer_1.$COLON)) {
          var end = this.inputIndex;
          var expression = this.input.substring(start, end);
          this.error("Conditional expression " + expression + " requires all 3 expressions");
        }
        var no = this.parsePipe();
        return new ast_1.Conditional(result, yes, no);
      } else {
        return result;
      }
    };
    _ParseAST.prototype.parseLogicalOr = function() {
      var result = this.parseLogicalAnd();
      while (this.optionalOperator('||')) {
        result = new ast_1.Binary('||', result, this.parseLogicalAnd());
      }
      return result;
    };
    _ParseAST.prototype.parseLogicalAnd = function() {
      var result = this.parseEquality();
      while (this.optionalOperator('&&')) {
        result = new ast_1.Binary('&&', result, this.parseEquality());
      }
      return result;
    };
    _ParseAST.prototype.parseEquality = function() {
      var result = this.parseRelational();
      while (true) {
        if (this.optionalOperator('==')) {
          result = new ast_1.Binary('==', result, this.parseRelational());
        } else if (this.optionalOperator('===')) {
          result = new ast_1.Binary('===', result, this.parseRelational());
        } else if (this.optionalOperator('!=')) {
          result = new ast_1.Binary('!=', result, this.parseRelational());
        } else if (this.optionalOperator('!==')) {
          result = new ast_1.Binary('!==', result, this.parseRelational());
        } else {
          return result;
        }
      }
    };
    _ParseAST.prototype.parseRelational = function() {
      var result = this.parseAdditive();
      while (true) {
        if (this.optionalOperator('<')) {
          result = new ast_1.Binary('<', result, this.parseAdditive());
        } else if (this.optionalOperator('>')) {
          result = new ast_1.Binary('>', result, this.parseAdditive());
        } else if (this.optionalOperator('<=')) {
          result = new ast_1.Binary('<=', result, this.parseAdditive());
        } else if (this.optionalOperator('>=')) {
          result = new ast_1.Binary('>=', result, this.parseAdditive());
        } else {
          return result;
        }
      }
    };
    _ParseAST.prototype.parseAdditive = function() {
      var result = this.parseMultiplicative();
      while (true) {
        if (this.optionalOperator('+')) {
          result = new ast_1.Binary('+', result, this.parseMultiplicative());
        } else if (this.optionalOperator('-')) {
          result = new ast_1.Binary('-', result, this.parseMultiplicative());
        } else {
          return result;
        }
      }
    };
    _ParseAST.prototype.parseMultiplicative = function() {
      var result = this.parsePrefix();
      while (true) {
        if (this.optionalOperator('*')) {
          result = new ast_1.Binary('*', result, this.parsePrefix());
        } else if (this.optionalOperator('%')) {
          result = new ast_1.Binary('%', result, this.parsePrefix());
        } else if (this.optionalOperator('/')) {
          result = new ast_1.Binary('/', result, this.parsePrefix());
        } else {
          return result;
        }
      }
    };
    _ParseAST.prototype.parsePrefix = function() {
      if (this.optionalOperator('+')) {
        return this.parsePrefix();
      } else if (this.optionalOperator('-')) {
        return new ast_1.Binary('-', new ast_1.LiteralPrimitive(0), this.parsePrefix());
      } else if (this.optionalOperator('!')) {
        return new ast_1.PrefixNot(this.parsePrefix());
      } else {
        return this.parseCallChain();
      }
    };
    _ParseAST.prototype.parseCallChain = function() {
      var result = this.parsePrimary();
      while (true) {
        if (this.optionalCharacter(lexer_1.$PERIOD)) {
          result = this.parseAccessMemberOrMethodCall(result, false);
        } else if (this.optionalOperator('?.')) {
          result = this.parseAccessMemberOrMethodCall(result, true);
        } else if (this.optionalCharacter(lexer_1.$LBRACKET)) {
          var key = this.parsePipe();
          this.expectCharacter(lexer_1.$RBRACKET);
          if (this.optionalOperator("=")) {
            var value = this.parseConditional();
            result = new ast_1.KeyedWrite(result, key, value);
          } else {
            result = new ast_1.KeyedRead(result, key);
          }
        } else if (this.optionalCharacter(lexer_1.$LPAREN)) {
          var args = this.parseCallArguments();
          this.expectCharacter(lexer_1.$RPAREN);
          result = new ast_1.FunctionCall(result, args);
        } else {
          return result;
        }
      }
    };
    _ParseAST.prototype.parsePrimary = function() {
      if (this.optionalCharacter(lexer_1.$LPAREN)) {
        var result = this.parsePipe();
        this.expectCharacter(lexer_1.$RPAREN);
        return result;
      } else if (this.next.isKeywordNull() || this.next.isKeywordUndefined()) {
        this.advance();
        return new ast_1.LiteralPrimitive(null);
      } else if (this.next.isKeywordTrue()) {
        this.advance();
        return new ast_1.LiteralPrimitive(true);
      } else if (this.next.isKeywordFalse()) {
        this.advance();
        return new ast_1.LiteralPrimitive(false);
      } else if (this.optionalCharacter(lexer_1.$LBRACKET)) {
        var elements = this.parseExpressionList(lexer_1.$RBRACKET);
        this.expectCharacter(lexer_1.$RBRACKET);
        return new ast_1.LiteralArray(elements);
      } else if (this.next.isCharacter(lexer_1.$LBRACE)) {
        return this.parseLiteralMap();
      } else if (this.next.isIdentifier()) {
        return this.parseAccessMemberOrMethodCall(_implicitReceiver, false);
      } else if (this.next.isNumber()) {
        var value = this.next.toNumber();
        this.advance();
        return new ast_1.LiteralPrimitive(value);
      } else if (this.next.isString()) {
        var literalValue = this.next.toString();
        this.advance();
        return new ast_1.LiteralPrimitive(literalValue);
      } else if (this.index >= this.tokens.length) {
        this.error("Unexpected end of expression: " + this.input);
      } else {
        this.error("Unexpected token " + this.next);
      }
      throw new exceptions_1.BaseException("Fell through all cases in parsePrimary");
    };
    _ParseAST.prototype.parseExpressionList = function(terminator) {
      var result = [];
      if (!this.next.isCharacter(terminator)) {
        do {
          result.push(this.parsePipe());
        } while (this.optionalCharacter(lexer_1.$COMMA));
      }
      return result;
    };
    _ParseAST.prototype.parseLiteralMap = function() {
      var keys = [];
      var values = [];
      this.expectCharacter(lexer_1.$LBRACE);
      if (!this.optionalCharacter(lexer_1.$RBRACE)) {
        do {
          var key = this.expectIdentifierOrKeywordOrString();
          keys.push(key);
          this.expectCharacter(lexer_1.$COLON);
          values.push(this.parsePipe());
        } while (this.optionalCharacter(lexer_1.$COMMA));
        this.expectCharacter(lexer_1.$RBRACE);
      }
      return new ast_1.LiteralMap(keys, values);
    };
    _ParseAST.prototype.parseAccessMemberOrMethodCall = function(receiver, isSafe) {
      if (isSafe === void 0) {
        isSafe = false;
      }
      var id = this.expectIdentifierOrKeyword();
      if (this.optionalCharacter(lexer_1.$LPAREN)) {
        var args = this.parseCallArguments();
        this.expectCharacter(lexer_1.$RPAREN);
        var fn = this.reflector.method(id);
        return isSafe ? new ast_1.SafeMethodCall(receiver, id, fn, args) : new ast_1.MethodCall(receiver, id, fn, args);
      } else {
        if (isSafe) {
          if (this.optionalOperator("=")) {
            this.error("The '?.' operator cannot be used in the assignment");
          } else {
            return new ast_1.SafePropertyRead(receiver, id, this.reflector.getter(id));
          }
        } else {
          if (this.optionalOperator("=")) {
            if (!this.parseAction) {
              this.error("Bindings cannot contain assignments");
            }
            var value = this.parseConditional();
            return new ast_1.PropertyWrite(receiver, id, this.reflector.setter(id), value);
          } else {
            return new ast_1.PropertyRead(receiver, id, this.reflector.getter(id));
          }
        }
      }
      return null;
    };
    _ParseAST.prototype.parseCallArguments = function() {
      if (this.next.isCharacter(lexer_1.$RPAREN))
        return [];
      var positionals = [];
      do {
        positionals.push(this.parsePipe());
      } while (this.optionalCharacter(lexer_1.$COMMA));
      return positionals;
    };
    _ParseAST.prototype.parseBlockContent = function() {
      if (!this.parseAction) {
        this.error("Binding expression cannot contain chained expression");
      }
      var exprs = [];
      while (this.index < this.tokens.length && !this.next.isCharacter(lexer_1.$RBRACE)) {
        var expr = this.parseExpression();
        exprs.push(expr);
        if (this.optionalCharacter(lexer_1.$SEMICOLON)) {
          while (this.optionalCharacter(lexer_1.$SEMICOLON)) {}
        }
      }
      if (exprs.length == 0)
        return new ast_1.EmptyExpr();
      if (exprs.length == 1)
        return exprs[0];
      return new ast_1.Chain(exprs);
    };
    _ParseAST.prototype.expectTemplateBindingKey = function() {
      var result = '';
      var operatorFound = false;
      do {
        result += this.expectIdentifierOrKeywordOrString();
        operatorFound = this.optionalOperator('-');
        if (operatorFound) {
          result += '-';
        }
      } while (operatorFound);
      return result.toString();
    };
    _ParseAST.prototype.parseTemplateBindings = function() {
      var bindings = [];
      var prefix = null;
      while (this.index < this.tokens.length) {
        var keyIsVar = this.optionalKeywordVar();
        var key = this.expectTemplateBindingKey();
        if (!keyIsVar) {
          if (prefix == null) {
            prefix = key;
          } else {
            key = prefix + key[0].toUpperCase() + key.substring(1);
          }
        }
        this.optionalCharacter(lexer_1.$COLON);
        var name = null;
        var expression = null;
        if (keyIsVar) {
          if (this.optionalOperator("=")) {
            name = this.expectTemplateBindingKey();
          } else {
            name = '\$implicit';
          }
        } else if (this.next !== lexer_1.EOF && !this.peekKeywordVar()) {
          var start = this.inputIndex;
          var ast = this.parsePipe();
          var source = this.input.substring(start, this.inputIndex);
          expression = new ast_1.ASTWithSource(ast, source, this.location);
        }
        bindings.push(new ast_1.TemplateBinding(key, keyIsVar, name, expression));
        if (!this.optionalCharacter(lexer_1.$SEMICOLON)) {
          this.optionalCharacter(lexer_1.$COMMA);
        }
      }
      return bindings;
    };
    _ParseAST.prototype.error = function(message, index) {
      if (index === void 0) {
        index = null;
      }
      if (lang_1.isBlank(index))
        index = this.index;
      var location = (index < this.tokens.length) ? "at column " + (this.tokens[index].index + 1) + " in" : "at the end of the expression";
      throw new ParseException(message, this.input, location, this.location);
    };
    return _ParseAST;
  })();
  exports._ParseAST = _ParseAST;
  var SimpleExpressionChecker = (function() {
    function SimpleExpressionChecker() {
      this.simple = true;
    }
    SimpleExpressionChecker.check = function(ast) {
      var s = new SimpleExpressionChecker();
      ast.visit(s);
      return s.simple;
    };
    SimpleExpressionChecker.prototype.visitImplicitReceiver = function(ast) {};
    SimpleExpressionChecker.prototype.visitInterpolation = function(ast) {
      this.simple = false;
    };
    SimpleExpressionChecker.prototype.visitLiteralPrimitive = function(ast) {};
    SimpleExpressionChecker.prototype.visitPropertyRead = function(ast) {};
    SimpleExpressionChecker.prototype.visitPropertyWrite = function(ast) {
      this.simple = false;
    };
    SimpleExpressionChecker.prototype.visitSafePropertyRead = function(ast) {
      this.simple = false;
    };
    SimpleExpressionChecker.prototype.visitMethodCall = function(ast) {
      this.simple = false;
    };
    SimpleExpressionChecker.prototype.visitSafeMethodCall = function(ast) {
      this.simple = false;
    };
    SimpleExpressionChecker.prototype.visitFunctionCall = function(ast) {
      this.simple = false;
    };
    SimpleExpressionChecker.prototype.visitLiteralArray = function(ast) {
      this.visitAll(ast.expressions);
    };
    SimpleExpressionChecker.prototype.visitLiteralMap = function(ast) {
      this.visitAll(ast.values);
    };
    SimpleExpressionChecker.prototype.visitBinary = function(ast) {
      this.simple = false;
    };
    SimpleExpressionChecker.prototype.visitPrefixNot = function(ast) {
      this.simple = false;
    };
    SimpleExpressionChecker.prototype.visitConditional = function(ast) {
      this.simple = false;
    };
    SimpleExpressionChecker.prototype.visitPipe = function(ast) {
      this.simple = false;
    };
    SimpleExpressionChecker.prototype.visitKeyedRead = function(ast) {
      this.simple = false;
    };
    SimpleExpressionChecker.prototype.visitKeyedWrite = function(ast) {
      this.simple = false;
    };
    SimpleExpressionChecker.prototype.visitAll = function(asts) {
      var res = collection_1.ListWrapper.createFixedSize(asts.length);
      for (var i = 0; i < asts.length; ++i) {
        res[i] = asts[i].visit(this);
      }
      return res;
    };
    SimpleExpressionChecker.prototype.visitChain = function(ast) {
      this.simple = false;
    };
    SimpleExpressionChecker.prototype.visitQuote = function(ast) {
      this.simple = false;
    };
    return SimpleExpressionChecker;
  })();
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/interfaces.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var DebugContext = (function() {
    function DebugContext(element, componentElement, directive, context, locals, injector) {
      this.element = element;
      this.componentElement = componentElement;
      this.directive = directive;
      this.context = context;
      this.locals = locals;
      this.injector = injector;
    }
    return DebugContext;
  })();
  exports.DebugContext = DebugContext;
  var ChangeDetectorGenConfig = (function() {
    function ChangeDetectorGenConfig(genDebugInfo, logBindingUpdate, useJit) {
      this.genDebugInfo = genDebugInfo;
      this.logBindingUpdate = logBindingUpdate;
      this.useJit = useJit;
    }
    return ChangeDetectorGenConfig;
  })();
  exports.ChangeDetectorGenConfig = ChangeDetectorGenConfig;
  var ChangeDetectorDefinition = (function() {
    function ChangeDetectorDefinition(id, strategy, variableNames, bindingRecords, eventRecords, directiveRecords, genConfig) {
      this.id = id;
      this.strategy = strategy;
      this.variableNames = variableNames;
      this.bindingRecords = bindingRecords;
      this.eventRecords = eventRecords;
      this.directiveRecords = directiveRecords;
      this.genConfig = genConfig;
    }
    return ChangeDetectorDefinition;
  })();
  exports.ChangeDetectorDefinition = ChangeDetectorDefinition;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/codegen_name_util.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/collection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var _STATE_ACCESSOR = "state";
  var _CONTEXT_ACCESSOR = "context";
  var _PROP_BINDING_INDEX = "propertyBindingIndex";
  var _DIRECTIVES_ACCESSOR = "directiveIndices";
  var _DISPATCHER_ACCESSOR = "dispatcher";
  var _LOCALS_ACCESSOR = "locals";
  var _MODE_ACCESSOR = "mode";
  var _PIPES_ACCESSOR = "pipes";
  var _PROTOS_ACCESSOR = "protos";
  exports.CONTEXT_ACCESSOR = "context";
  exports.CONTEXT_INDEX = 0;
  var _FIELD_PREFIX = 'this.';
  var _whiteSpaceRegExp = /\W/g;
  function sanitizeName(s) {
    return lang_1.StringWrapper.replaceAll(s, _whiteSpaceRegExp, '');
  }
  exports.sanitizeName = sanitizeName;
  var CodegenNameUtil = (function() {
    function CodegenNameUtil(_records, _eventBindings, _directiveRecords, _utilName) {
      this._records = _records;
      this._eventBindings = _eventBindings;
      this._directiveRecords = _directiveRecords;
      this._utilName = _utilName;
      this._sanitizedEventNames = new collection_1.Map();
      this._sanitizedNames = collection_1.ListWrapper.createFixedSize(this._records.length + 1);
      this._sanitizedNames[exports.CONTEXT_INDEX] = exports.CONTEXT_ACCESSOR;
      for (var i = 0,
          iLen = this._records.length; i < iLen; ++i) {
        this._sanitizedNames[i + 1] = sanitizeName("" + this._records[i].name + i);
      }
      for (var ebIndex = 0; ebIndex < _eventBindings.length; ++ebIndex) {
        var eb = _eventBindings[ebIndex];
        var names = [exports.CONTEXT_ACCESSOR];
        for (var i = 0,
            iLen = eb.records.length; i < iLen; ++i) {
          names.push(sanitizeName("" + eb.records[i].name + i + "_" + ebIndex));
        }
        this._sanitizedEventNames.set(eb, names);
      }
    }
    CodegenNameUtil.prototype._addFieldPrefix = function(name) {
      return "" + _FIELD_PREFIX + name;
    };
    CodegenNameUtil.prototype.getDispatcherName = function() {
      return this._addFieldPrefix(_DISPATCHER_ACCESSOR);
    };
    CodegenNameUtil.prototype.getPipesAccessorName = function() {
      return this._addFieldPrefix(_PIPES_ACCESSOR);
    };
    CodegenNameUtil.prototype.getProtosName = function() {
      return this._addFieldPrefix(_PROTOS_ACCESSOR);
    };
    CodegenNameUtil.prototype.getDirectivesAccessorName = function() {
      return this._addFieldPrefix(_DIRECTIVES_ACCESSOR);
    };
    CodegenNameUtil.prototype.getLocalsAccessorName = function() {
      return this._addFieldPrefix(_LOCALS_ACCESSOR);
    };
    CodegenNameUtil.prototype.getStateName = function() {
      return this._addFieldPrefix(_STATE_ACCESSOR);
    };
    CodegenNameUtil.prototype.getModeName = function() {
      return this._addFieldPrefix(_MODE_ACCESSOR);
    };
    CodegenNameUtil.prototype.getPropertyBindingIndex = function() {
      return this._addFieldPrefix(_PROP_BINDING_INDEX);
    };
    CodegenNameUtil.prototype.getLocalName = function(idx) {
      return "l_" + this._sanitizedNames[idx];
    };
    CodegenNameUtil.prototype.getEventLocalName = function(eb, idx) {
      return "l_" + this._sanitizedEventNames.get(eb)[idx];
    };
    CodegenNameUtil.prototype.getChangeName = function(idx) {
      return "c_" + this._sanitizedNames[idx];
    };
    CodegenNameUtil.prototype.genInitLocals = function() {
      var declarations = [];
      var assignments = [];
      for (var i = 0,
          iLen = this.getFieldCount(); i < iLen; ++i) {
        if (i == exports.CONTEXT_INDEX) {
          declarations.push(this.getLocalName(i) + " = " + this.getFieldName(i));
        } else {
          var rec = this._records[i - 1];
          if (rec.argumentToPureFunction) {
            var changeName = this.getChangeName(i);
            declarations.push(this.getLocalName(i) + "," + changeName);
            assignments.push(changeName);
          } else {
            declarations.push("" + this.getLocalName(i));
          }
        }
      }
      var assignmentsCode = collection_1.ListWrapper.isEmpty(assignments) ? '' : assignments.join('=') + " = false;";
      return "var " + declarations.join(',') + ";" + assignmentsCode;
    };
    CodegenNameUtil.prototype.genInitEventLocals = function() {
      var _this = this;
      var res = [(this.getLocalName(exports.CONTEXT_INDEX) + " = " + this.getFieldName(exports.CONTEXT_INDEX))];
      this._sanitizedEventNames.forEach(function(names, eb) {
        for (var i = 0; i < names.length; ++i) {
          if (i !== exports.CONTEXT_INDEX) {
            res.push("" + _this.getEventLocalName(eb, i));
          }
        }
      });
      return res.length > 1 ? "var " + res.join(',') + ";" : '';
    };
    CodegenNameUtil.prototype.getPreventDefaultAccesor = function() {
      return "preventDefault";
    };
    CodegenNameUtil.prototype.getFieldCount = function() {
      return this._sanitizedNames.length;
    };
    CodegenNameUtil.prototype.getFieldName = function(idx) {
      return this._addFieldPrefix(this._sanitizedNames[idx]);
    };
    CodegenNameUtil.prototype.getAllFieldNames = function() {
      var fieldList = [];
      for (var k = 0,
          kLen = this.getFieldCount(); k < kLen; ++k) {
        if (k === 0 || this._records[k - 1].shouldBeChecked()) {
          fieldList.push(this.getFieldName(k));
        }
      }
      for (var i = 0,
          iLen = this._records.length; i < iLen; ++i) {
        var rec = this._records[i];
        if (rec.isPipeRecord()) {
          fieldList.push(this.getPipeName(rec.selfIndex));
        }
      }
      for (var j = 0,
          jLen = this._directiveRecords.length; j < jLen; ++j) {
        var dRec = this._directiveRecords[j];
        fieldList.push(this.getDirectiveName(dRec.directiveIndex));
        if (!dRec.isDefaultChangeDetection()) {
          fieldList.push(this.getDetectorName(dRec.directiveIndex));
        }
      }
      return fieldList;
    };
    CodegenNameUtil.prototype.genDehydrateFields = function() {
      var fields = this.getAllFieldNames();
      collection_1.ListWrapper.removeAt(fields, exports.CONTEXT_INDEX);
      if (collection_1.ListWrapper.isEmpty(fields))
        return '';
      fields.push(this._utilName + ".uninitialized;");
      return fields.join(' = ');
    };
    CodegenNameUtil.prototype.genPipeOnDestroy = function() {
      var _this = this;
      return this._records.filter(function(r) {
        return r.isPipeRecord();
      }).map(function(r) {
        return (_this._utilName + ".callPipeOnDestroy(" + _this.getPipeName(r.selfIndex) + ");");
      }).join('\n');
    };
    CodegenNameUtil.prototype.getPipeName = function(idx) {
      return this._addFieldPrefix(this._sanitizedNames[idx] + "_pipe");
    };
    CodegenNameUtil.prototype.getDirectiveName = function(d) {
      return this._addFieldPrefix("directive_" + d.name);
    };
    CodegenNameUtil.prototype.getDetectorName = function(d) {
      return this._addFieldPrefix("detector_" + d.name);
    };
    return CodegenNameUtil;
  })();
  exports.CodegenNameUtil = CodegenNameUtil;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/codegen_logic_util.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/core/change_detection/codegen_facade.js", "node_modules/angular2/src/core/change_detection/proto_record.js", "node_modules/angular2/src/facade/exceptions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var codegen_facade_1 = $__require('node_modules/angular2/src/core/change_detection/codegen_facade.js');
  var proto_record_1 = $__require('node_modules/angular2/src/core/change_detection/proto_record.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var CodegenLogicUtil = (function() {
    function CodegenLogicUtil(_names, _utilName, _changeDetectorStateName) {
      this._names = _names;
      this._utilName = _utilName;
      this._changeDetectorStateName = _changeDetectorStateName;
    }
    CodegenLogicUtil.prototype.genPropertyBindingEvalValue = function(protoRec) {
      var _this = this;
      return this._genEvalValue(protoRec, function(idx) {
        return _this._names.getLocalName(idx);
      }, this._names.getLocalsAccessorName());
    };
    CodegenLogicUtil.prototype.genEventBindingEvalValue = function(eventRecord, protoRec) {
      var _this = this;
      return this._genEvalValue(protoRec, function(idx) {
        return _this._names.getEventLocalName(eventRecord, idx);
      }, "locals");
    };
    CodegenLogicUtil.prototype._genEvalValue = function(protoRec, getLocalName, localsAccessor) {
      var context = (protoRec.contextIndex == -1) ? this._names.getDirectiveName(protoRec.directiveIndex) : getLocalName(protoRec.contextIndex);
      var argString = protoRec.args.map(function(arg) {
        return getLocalName(arg);
      }).join(", ");
      var rhs;
      switch (protoRec.mode) {
        case proto_record_1.RecordType.Self:
          rhs = context;
          break;
        case proto_record_1.RecordType.Const:
          rhs = codegen_facade_1.codify(protoRec.funcOrValue);
          break;
        case proto_record_1.RecordType.PropertyRead:
          rhs = context + "." + protoRec.name;
          break;
        case proto_record_1.RecordType.SafeProperty:
          var read = context + "." + protoRec.name;
          rhs = this._utilName + ".isValueBlank(" + context + ") ? null : " + read;
          break;
        case proto_record_1.RecordType.PropertyWrite:
          rhs = context + "." + protoRec.name + " = " + getLocalName(protoRec.args[0]);
          break;
        case proto_record_1.RecordType.Local:
          rhs = localsAccessor + ".get(" + codegen_facade_1.rawString(protoRec.name) + ")";
          break;
        case proto_record_1.RecordType.InvokeMethod:
          rhs = context + "." + protoRec.name + "(" + argString + ")";
          break;
        case proto_record_1.RecordType.SafeMethodInvoke:
          var invoke = context + "." + protoRec.name + "(" + argString + ")";
          rhs = this._utilName + ".isValueBlank(" + context + ") ? null : " + invoke;
          break;
        case proto_record_1.RecordType.InvokeClosure:
          rhs = context + "(" + argString + ")";
          break;
        case proto_record_1.RecordType.PrimitiveOp:
          rhs = this._utilName + "." + protoRec.name + "(" + argString + ")";
          break;
        case proto_record_1.RecordType.CollectionLiteral:
          rhs = this._utilName + "." + protoRec.name + "(" + argString + ")";
          break;
        case proto_record_1.RecordType.Interpolate:
          rhs = this._genInterpolation(protoRec);
          break;
        case proto_record_1.RecordType.KeyedRead:
          rhs = context + "[" + getLocalName(protoRec.args[0]) + "]";
          break;
        case proto_record_1.RecordType.KeyedWrite:
          rhs = context + "[" + getLocalName(protoRec.args[0]) + "] = " + getLocalName(protoRec.args[1]);
          break;
        case proto_record_1.RecordType.Chain:
          rhs = "" + getLocalName(protoRec.args[protoRec.args.length - 1]);
          break;
        default:
          throw new exceptions_1.BaseException("Unknown operation " + protoRec.mode);
      }
      return getLocalName(protoRec.selfIndex) + " = " + rhs + ";";
    };
    CodegenLogicUtil.prototype.genPropertyBindingTargets = function(propertyBindingTargets, genDebugInfo) {
      var _this = this;
      var bs = propertyBindingTargets.map(function(b) {
        if (lang_1.isBlank(b))
          return "null";
        var debug = genDebugInfo ? codegen_facade_1.codify(b.debug) : "null";
        return _this._utilName + ".bindingTarget(" + codegen_facade_1.codify(b.mode) + ", " + b.elementIndex + ", " + codegen_facade_1.codify(b.name) + ", " + codegen_facade_1.codify(b.unit) + ", " + debug + ")";
      });
      return "[" + bs.join(", ") + "]";
    };
    CodegenLogicUtil.prototype.genDirectiveIndices = function(directiveRecords) {
      var _this = this;
      var bs = directiveRecords.map(function(b) {
        return (_this._utilName + ".directiveIndex(" + b.directiveIndex.elementIndex + ", " + b.directiveIndex.directiveIndex + ")");
      });
      return "[" + bs.join(", ") + "]";
    };
    CodegenLogicUtil.prototype._genInterpolation = function(protoRec) {
      var iVals = [];
      for (var i = 0; i < protoRec.args.length; ++i) {
        iVals.push(codegen_facade_1.codify(protoRec.fixedArgs[i]));
        iVals.push(this._utilName + ".s(" + this._names.getLocalName(protoRec.args[i]) + ")");
      }
      iVals.push(codegen_facade_1.codify(protoRec.fixedArgs[protoRec.args.length]));
      return codegen_facade_1.combineGeneratedStrings(iVals);
    };
    CodegenLogicUtil.prototype.genHydrateDirectives = function(directiveRecords) {
      var _this = this;
      var res = [];
      var outputCount = 0;
      for (var i = 0; i < directiveRecords.length; ++i) {
        var r = directiveRecords[i];
        var dirVarName = this._names.getDirectiveName(r.directiveIndex);
        res.push(dirVarName + " = " + this._genReadDirective(i) + ";");
        if (lang_1.isPresent(r.outputs)) {
          r.outputs.forEach(function(output) {
            var eventHandlerExpr = _this._genEventHandler(r.directiveIndex.elementIndex, output[1]);
            var statementStart = "this.outputSubscriptions[" + outputCount++ + "] = " + dirVarName + "." + output[0];
            if (lang_1.IS_DART) {
              res.push(statementStart + ".listen(" + eventHandlerExpr + ");");
            } else {
              res.push(statementStart + ".subscribe({next: " + eventHandlerExpr + "});");
            }
          });
        }
      }
      if (outputCount > 0) {
        var statementStart = 'this.outputSubscriptions';
        if (lang_1.IS_DART) {
          res.unshift(statementStart + " = new List(" + outputCount + ");");
        } else {
          res.unshift(statementStart + " = new Array(" + outputCount + ");");
        }
      }
      return res.join("\n");
    };
    CodegenLogicUtil.prototype.genDirectivesOnDestroy = function(directiveRecords) {
      var res = [];
      for (var i = 0; i < directiveRecords.length; ++i) {
        var r = directiveRecords[i];
        if (r.callOnDestroy) {
          var dirVarName = this._names.getDirectiveName(r.directiveIndex);
          res.push(dirVarName + ".ngOnDestroy();");
        }
      }
      return res.join("\n");
    };
    CodegenLogicUtil.prototype._genEventHandler = function(boundElementIndex, eventName) {
      if (lang_1.IS_DART) {
        return "(event) => this.handleEvent('" + eventName + "', " + boundElementIndex + ", event)";
      } else {
        return "(function(event) { return this.handleEvent('" + eventName + "', " + boundElementIndex + ", event); }).bind(this)";
      }
    };
    CodegenLogicUtil.prototype._genReadDirective = function(index) {
      return "this.getDirectiveFor(directives, " + index + ")";
    };
    CodegenLogicUtil.prototype.genHydrateDetectors = function(directiveRecords) {
      var res = [];
      for (var i = 0; i < directiveRecords.length; ++i) {
        var r = directiveRecords[i];
        if (!r.isDefaultChangeDetection()) {
          res.push(this._names.getDetectorName(r.directiveIndex) + " = this.getDetectorFor(directives, " + i + ");");
        }
      }
      return res.join("\n");
    };
    CodegenLogicUtil.prototype.genContentLifecycleCallbacks = function(directiveRecords) {
      var res = [];
      var eq = lang_1.IS_DART ? '==' : '===';
      for (var i = directiveRecords.length - 1; i >= 0; --i) {
        var dir = directiveRecords[i];
        if (dir.callAfterContentInit) {
          res.push("if(" + this._names.getStateName() + " " + eq + " " + this._changeDetectorStateName + ".NeverChecked) " + this._names.getDirectiveName(dir.directiveIndex) + ".ngAfterContentInit();");
        }
        if (dir.callAfterContentChecked) {
          res.push(this._names.getDirectiveName(dir.directiveIndex) + ".ngAfterContentChecked();");
        }
      }
      return res;
    };
    CodegenLogicUtil.prototype.genViewLifecycleCallbacks = function(directiveRecords) {
      var res = [];
      var eq = lang_1.IS_DART ? '==' : '===';
      for (var i = directiveRecords.length - 1; i >= 0; --i) {
        var dir = directiveRecords[i];
        if (dir.callAfterViewInit) {
          res.push("if(" + this._names.getStateName() + " " + eq + " " + this._changeDetectorStateName + ".NeverChecked) " + this._names.getDirectiveName(dir.directiveIndex) + ".ngAfterViewInit();");
        }
        if (dir.callAfterViewChecked) {
          res.push(this._names.getDirectiveName(dir.directiveIndex) + ".ngAfterViewChecked();");
        }
      }
      return res;
    };
    return CodegenLogicUtil;
  })();
  exports.CodegenLogicUtil = CodegenLogicUtil;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/codegen_facade.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function codify(obj) {
    return JSON.stringify(obj);
  }
  exports.codify = codify;
  function rawString(str) {
    return "'" + str + "'";
  }
  exports.rawString = rawString;
  function combineGeneratedStrings(vals) {
    return vals.join(' + ');
  }
  exports.combineGeneratedStrings = combineGeneratedStrings;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/parser/ast.js", ["node_modules/angular2/src/facade/collection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var AST = (function() {
    function AST() {}
    AST.prototype.visit = function(visitor) {
      return null;
    };
    AST.prototype.toString = function() {
      return "AST";
    };
    return AST;
  })();
  exports.AST = AST;
  var Quote = (function(_super) {
    __extends(Quote, _super);
    function Quote(prefix, uninterpretedExpression, location) {
      _super.call(this);
      this.prefix = prefix;
      this.uninterpretedExpression = uninterpretedExpression;
      this.location = location;
    }
    Quote.prototype.visit = function(visitor) {
      return visitor.visitQuote(this);
    };
    Quote.prototype.toString = function() {
      return "Quote";
    };
    return Quote;
  })(AST);
  exports.Quote = Quote;
  var EmptyExpr = (function(_super) {
    __extends(EmptyExpr, _super);
    function EmptyExpr() {
      _super.apply(this, arguments);
    }
    EmptyExpr.prototype.visit = function(visitor) {};
    return EmptyExpr;
  })(AST);
  exports.EmptyExpr = EmptyExpr;
  var ImplicitReceiver = (function(_super) {
    __extends(ImplicitReceiver, _super);
    function ImplicitReceiver() {
      _super.apply(this, arguments);
    }
    ImplicitReceiver.prototype.visit = function(visitor) {
      return visitor.visitImplicitReceiver(this);
    };
    return ImplicitReceiver;
  })(AST);
  exports.ImplicitReceiver = ImplicitReceiver;
  var Chain = (function(_super) {
    __extends(Chain, _super);
    function Chain(expressions) {
      _super.call(this);
      this.expressions = expressions;
    }
    Chain.prototype.visit = function(visitor) {
      return visitor.visitChain(this);
    };
    return Chain;
  })(AST);
  exports.Chain = Chain;
  var Conditional = (function(_super) {
    __extends(Conditional, _super);
    function Conditional(condition, trueExp, falseExp) {
      _super.call(this);
      this.condition = condition;
      this.trueExp = trueExp;
      this.falseExp = falseExp;
    }
    Conditional.prototype.visit = function(visitor) {
      return visitor.visitConditional(this);
    };
    return Conditional;
  })(AST);
  exports.Conditional = Conditional;
  var PropertyRead = (function(_super) {
    __extends(PropertyRead, _super);
    function PropertyRead(receiver, name, getter) {
      _super.call(this);
      this.receiver = receiver;
      this.name = name;
      this.getter = getter;
    }
    PropertyRead.prototype.visit = function(visitor) {
      return visitor.visitPropertyRead(this);
    };
    return PropertyRead;
  })(AST);
  exports.PropertyRead = PropertyRead;
  var PropertyWrite = (function(_super) {
    __extends(PropertyWrite, _super);
    function PropertyWrite(receiver, name, setter, value) {
      _super.call(this);
      this.receiver = receiver;
      this.name = name;
      this.setter = setter;
      this.value = value;
    }
    PropertyWrite.prototype.visit = function(visitor) {
      return visitor.visitPropertyWrite(this);
    };
    return PropertyWrite;
  })(AST);
  exports.PropertyWrite = PropertyWrite;
  var SafePropertyRead = (function(_super) {
    __extends(SafePropertyRead, _super);
    function SafePropertyRead(receiver, name, getter) {
      _super.call(this);
      this.receiver = receiver;
      this.name = name;
      this.getter = getter;
    }
    SafePropertyRead.prototype.visit = function(visitor) {
      return visitor.visitSafePropertyRead(this);
    };
    return SafePropertyRead;
  })(AST);
  exports.SafePropertyRead = SafePropertyRead;
  var KeyedRead = (function(_super) {
    __extends(KeyedRead, _super);
    function KeyedRead(obj, key) {
      _super.call(this);
      this.obj = obj;
      this.key = key;
    }
    KeyedRead.prototype.visit = function(visitor) {
      return visitor.visitKeyedRead(this);
    };
    return KeyedRead;
  })(AST);
  exports.KeyedRead = KeyedRead;
  var KeyedWrite = (function(_super) {
    __extends(KeyedWrite, _super);
    function KeyedWrite(obj, key, value) {
      _super.call(this);
      this.obj = obj;
      this.key = key;
      this.value = value;
    }
    KeyedWrite.prototype.visit = function(visitor) {
      return visitor.visitKeyedWrite(this);
    };
    return KeyedWrite;
  })(AST);
  exports.KeyedWrite = KeyedWrite;
  var BindingPipe = (function(_super) {
    __extends(BindingPipe, _super);
    function BindingPipe(exp, name, args) {
      _super.call(this);
      this.exp = exp;
      this.name = name;
      this.args = args;
    }
    BindingPipe.prototype.visit = function(visitor) {
      return visitor.visitPipe(this);
    };
    return BindingPipe;
  })(AST);
  exports.BindingPipe = BindingPipe;
  var LiteralPrimitive = (function(_super) {
    __extends(LiteralPrimitive, _super);
    function LiteralPrimitive(value) {
      _super.call(this);
      this.value = value;
    }
    LiteralPrimitive.prototype.visit = function(visitor) {
      return visitor.visitLiteralPrimitive(this);
    };
    return LiteralPrimitive;
  })(AST);
  exports.LiteralPrimitive = LiteralPrimitive;
  var LiteralArray = (function(_super) {
    __extends(LiteralArray, _super);
    function LiteralArray(expressions) {
      _super.call(this);
      this.expressions = expressions;
    }
    LiteralArray.prototype.visit = function(visitor) {
      return visitor.visitLiteralArray(this);
    };
    return LiteralArray;
  })(AST);
  exports.LiteralArray = LiteralArray;
  var LiteralMap = (function(_super) {
    __extends(LiteralMap, _super);
    function LiteralMap(keys, values) {
      _super.call(this);
      this.keys = keys;
      this.values = values;
    }
    LiteralMap.prototype.visit = function(visitor) {
      return visitor.visitLiteralMap(this);
    };
    return LiteralMap;
  })(AST);
  exports.LiteralMap = LiteralMap;
  var Interpolation = (function(_super) {
    __extends(Interpolation, _super);
    function Interpolation(strings, expressions) {
      _super.call(this);
      this.strings = strings;
      this.expressions = expressions;
    }
    Interpolation.prototype.visit = function(visitor) {
      return visitor.visitInterpolation(this);
    };
    return Interpolation;
  })(AST);
  exports.Interpolation = Interpolation;
  var Binary = (function(_super) {
    __extends(Binary, _super);
    function Binary(operation, left, right) {
      _super.call(this);
      this.operation = operation;
      this.left = left;
      this.right = right;
    }
    Binary.prototype.visit = function(visitor) {
      return visitor.visitBinary(this);
    };
    return Binary;
  })(AST);
  exports.Binary = Binary;
  var PrefixNot = (function(_super) {
    __extends(PrefixNot, _super);
    function PrefixNot(expression) {
      _super.call(this);
      this.expression = expression;
    }
    PrefixNot.prototype.visit = function(visitor) {
      return visitor.visitPrefixNot(this);
    };
    return PrefixNot;
  })(AST);
  exports.PrefixNot = PrefixNot;
  var MethodCall = (function(_super) {
    __extends(MethodCall, _super);
    function MethodCall(receiver, name, fn, args) {
      _super.call(this);
      this.receiver = receiver;
      this.name = name;
      this.fn = fn;
      this.args = args;
    }
    MethodCall.prototype.visit = function(visitor) {
      return visitor.visitMethodCall(this);
    };
    return MethodCall;
  })(AST);
  exports.MethodCall = MethodCall;
  var SafeMethodCall = (function(_super) {
    __extends(SafeMethodCall, _super);
    function SafeMethodCall(receiver, name, fn, args) {
      _super.call(this);
      this.receiver = receiver;
      this.name = name;
      this.fn = fn;
      this.args = args;
    }
    SafeMethodCall.prototype.visit = function(visitor) {
      return visitor.visitSafeMethodCall(this);
    };
    return SafeMethodCall;
  })(AST);
  exports.SafeMethodCall = SafeMethodCall;
  var FunctionCall = (function(_super) {
    __extends(FunctionCall, _super);
    function FunctionCall(target, args) {
      _super.call(this);
      this.target = target;
      this.args = args;
    }
    FunctionCall.prototype.visit = function(visitor) {
      return visitor.visitFunctionCall(this);
    };
    return FunctionCall;
  })(AST);
  exports.FunctionCall = FunctionCall;
  var ASTWithSource = (function(_super) {
    __extends(ASTWithSource, _super);
    function ASTWithSource(ast, source, location) {
      _super.call(this);
      this.ast = ast;
      this.source = source;
      this.location = location;
    }
    ASTWithSource.prototype.visit = function(visitor) {
      return this.ast.visit(visitor);
    };
    ASTWithSource.prototype.toString = function() {
      return this.source + " in " + this.location;
    };
    return ASTWithSource;
  })(AST);
  exports.ASTWithSource = ASTWithSource;
  var TemplateBinding = (function() {
    function TemplateBinding(key, keyIsVar, name, expression) {
      this.key = key;
      this.keyIsVar = keyIsVar;
      this.name = name;
      this.expression = expression;
    }
    return TemplateBinding;
  })();
  exports.TemplateBinding = TemplateBinding;
  var RecursiveAstVisitor = (function() {
    function RecursiveAstVisitor() {}
    RecursiveAstVisitor.prototype.visitBinary = function(ast) {
      ast.left.visit(this);
      ast.right.visit(this);
      return null;
    };
    RecursiveAstVisitor.prototype.visitChain = function(ast) {
      return this.visitAll(ast.expressions);
    };
    RecursiveAstVisitor.prototype.visitConditional = function(ast) {
      ast.condition.visit(this);
      ast.trueExp.visit(this);
      ast.falseExp.visit(this);
      return null;
    };
    RecursiveAstVisitor.prototype.visitPipe = function(ast) {
      ast.exp.visit(this);
      this.visitAll(ast.args);
      return null;
    };
    RecursiveAstVisitor.prototype.visitFunctionCall = function(ast) {
      ast.target.visit(this);
      this.visitAll(ast.args);
      return null;
    };
    RecursiveAstVisitor.prototype.visitImplicitReceiver = function(ast) {
      return null;
    };
    RecursiveAstVisitor.prototype.visitInterpolation = function(ast) {
      return this.visitAll(ast.expressions);
    };
    RecursiveAstVisitor.prototype.visitKeyedRead = function(ast) {
      ast.obj.visit(this);
      ast.key.visit(this);
      return null;
    };
    RecursiveAstVisitor.prototype.visitKeyedWrite = function(ast) {
      ast.obj.visit(this);
      ast.key.visit(this);
      ast.value.visit(this);
      return null;
    };
    RecursiveAstVisitor.prototype.visitLiteralArray = function(ast) {
      return this.visitAll(ast.expressions);
    };
    RecursiveAstVisitor.prototype.visitLiteralMap = function(ast) {
      return this.visitAll(ast.values);
    };
    RecursiveAstVisitor.prototype.visitLiteralPrimitive = function(ast) {
      return null;
    };
    RecursiveAstVisitor.prototype.visitMethodCall = function(ast) {
      ast.receiver.visit(this);
      return this.visitAll(ast.args);
    };
    RecursiveAstVisitor.prototype.visitPrefixNot = function(ast) {
      ast.expression.visit(this);
      return null;
    };
    RecursiveAstVisitor.prototype.visitPropertyRead = function(ast) {
      ast.receiver.visit(this);
      return null;
    };
    RecursiveAstVisitor.prototype.visitPropertyWrite = function(ast) {
      ast.receiver.visit(this);
      ast.value.visit(this);
      return null;
    };
    RecursiveAstVisitor.prototype.visitSafePropertyRead = function(ast) {
      ast.receiver.visit(this);
      return null;
    };
    RecursiveAstVisitor.prototype.visitSafeMethodCall = function(ast) {
      ast.receiver.visit(this);
      return this.visitAll(ast.args);
    };
    RecursiveAstVisitor.prototype.visitAll = function(asts) {
      var _this = this;
      asts.forEach(function(ast) {
        return ast.visit(_this);
      });
      return null;
    };
    RecursiveAstVisitor.prototype.visitQuote = function(ast) {
      return null;
    };
    return RecursiveAstVisitor;
  })();
  exports.RecursiveAstVisitor = RecursiveAstVisitor;
  var AstTransformer = (function() {
    function AstTransformer() {}
    AstTransformer.prototype.visitImplicitReceiver = function(ast) {
      return ast;
    };
    AstTransformer.prototype.visitInterpolation = function(ast) {
      return new Interpolation(ast.strings, this.visitAll(ast.expressions));
    };
    AstTransformer.prototype.visitLiteralPrimitive = function(ast) {
      return new LiteralPrimitive(ast.value);
    };
    AstTransformer.prototype.visitPropertyRead = function(ast) {
      return new PropertyRead(ast.receiver.visit(this), ast.name, ast.getter);
    };
    AstTransformer.prototype.visitPropertyWrite = function(ast) {
      return new PropertyWrite(ast.receiver.visit(this), ast.name, ast.setter, ast.value);
    };
    AstTransformer.prototype.visitSafePropertyRead = function(ast) {
      return new SafePropertyRead(ast.receiver.visit(this), ast.name, ast.getter);
    };
    AstTransformer.prototype.visitMethodCall = function(ast) {
      return new MethodCall(ast.receiver.visit(this), ast.name, ast.fn, this.visitAll(ast.args));
    };
    AstTransformer.prototype.visitSafeMethodCall = function(ast) {
      return new SafeMethodCall(ast.receiver.visit(this), ast.name, ast.fn, this.visitAll(ast.args));
    };
    AstTransformer.prototype.visitFunctionCall = function(ast) {
      return new FunctionCall(ast.target.visit(this), this.visitAll(ast.args));
    };
    AstTransformer.prototype.visitLiteralArray = function(ast) {
      return new LiteralArray(this.visitAll(ast.expressions));
    };
    AstTransformer.prototype.visitLiteralMap = function(ast) {
      return new LiteralMap(ast.keys, this.visitAll(ast.values));
    };
    AstTransformer.prototype.visitBinary = function(ast) {
      return new Binary(ast.operation, ast.left.visit(this), ast.right.visit(this));
    };
    AstTransformer.prototype.visitPrefixNot = function(ast) {
      return new PrefixNot(ast.expression.visit(this));
    };
    AstTransformer.prototype.visitConditional = function(ast) {
      return new Conditional(ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
    };
    AstTransformer.prototype.visitPipe = function(ast) {
      return new BindingPipe(ast.exp.visit(this), ast.name, this.visitAll(ast.args));
    };
    AstTransformer.prototype.visitKeyedRead = function(ast) {
      return new KeyedRead(ast.obj.visit(this), ast.key.visit(this));
    };
    AstTransformer.prototype.visitKeyedWrite = function(ast) {
      return new KeyedWrite(ast.obj.visit(this), ast.key.visit(this), ast.value.visit(this));
    };
    AstTransformer.prototype.visitAll = function(asts) {
      var res = collection_1.ListWrapper.createFixedSize(asts.length);
      for (var i = 0; i < asts.length; ++i) {
        res[i] = asts[i].visit(this);
      }
      return res;
    };
    AstTransformer.prototype.visitChain = function(ast) {
      return new Chain(this.visitAll(ast.expressions));
    };
    AstTransformer.prototype.visitQuote = function(ast) {
      return new Quote(ast.prefix, ast.uninterpretedExpression, ast.location);
    };
    return AstTransformer;
  })();
  exports.AstTransformer = AstTransformer;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/event_binding.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var EventBinding = (function() {
    function EventBinding(eventName, elIndex, dirIndex, records) {
      this.eventName = eventName;
      this.elIndex = elIndex;
      this.dirIndex = dirIndex;
      this.records = records;
    }
    return EventBinding;
  })();
  exports.EventBinding = EventBinding;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/coalesce.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/change_detection/proto_record.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var proto_record_1 = $__require('node_modules/angular2/src/core/change_detection/proto_record.js');
  function coalesce(srcRecords) {
    var dstRecords = [];
    var excludedIdxs = [];
    var indexMap = new collection_1.Map();
    var skipDepth = 0;
    var skipSources = collection_1.ListWrapper.createFixedSize(srcRecords.length);
    for (var protoIndex = 0; protoIndex < srcRecords.length; protoIndex++) {
      var skipRecord = skipSources[protoIndex];
      if (lang_1.isPresent(skipRecord)) {
        skipDepth--;
        skipRecord.fixedArgs[0] = dstRecords.length;
      }
      var src = srcRecords[protoIndex];
      var dst = _cloneAndUpdateIndexes(src, dstRecords, indexMap);
      if (dst.isSkipRecord()) {
        dstRecords.push(dst);
        skipDepth++;
        skipSources[dst.fixedArgs[0]] = dst;
      } else {
        var record = _mayBeAddRecord(dst, dstRecords, excludedIdxs, skipDepth > 0);
        indexMap.set(src.selfIndex, record.selfIndex);
      }
    }
    return _optimizeSkips(dstRecords);
  }
  exports.coalesce = coalesce;
  function _optimizeSkips(srcRecords) {
    var dstRecords = [];
    var skipSources = collection_1.ListWrapper.createFixedSize(srcRecords.length);
    var indexMap = new collection_1.Map();
    for (var protoIndex = 0; protoIndex < srcRecords.length; protoIndex++) {
      var skipRecord = skipSources[protoIndex];
      if (lang_1.isPresent(skipRecord)) {
        skipRecord.fixedArgs[0] = dstRecords.length;
      }
      var src = srcRecords[protoIndex];
      if (src.isSkipRecord()) {
        if (src.isConditionalSkipRecord() && src.fixedArgs[0] === protoIndex + 2 && protoIndex < srcRecords.length - 1 && srcRecords[protoIndex + 1].mode === proto_record_1.RecordType.SkipRecords) {
          src.mode = src.mode === proto_record_1.RecordType.SkipRecordsIf ? proto_record_1.RecordType.SkipRecordsIfNot : proto_record_1.RecordType.SkipRecordsIf;
          src.fixedArgs[0] = srcRecords[protoIndex + 1].fixedArgs[0];
          protoIndex++;
        }
        if (src.fixedArgs[0] > protoIndex + 1) {
          var dst = _cloneAndUpdateIndexes(src, dstRecords, indexMap);
          dstRecords.push(dst);
          skipSources[dst.fixedArgs[0]] = dst;
        }
      } else {
        var dst = _cloneAndUpdateIndexes(src, dstRecords, indexMap);
        dstRecords.push(dst);
        indexMap.set(src.selfIndex, dst.selfIndex);
      }
    }
    return dstRecords;
  }
  function _mayBeAddRecord(record, dstRecords, excludedIdxs, excluded) {
    var match = _findFirstMatch(record, dstRecords, excludedIdxs);
    if (lang_1.isPresent(match)) {
      if (record.lastInBinding) {
        dstRecords.push(_createSelfRecord(record, match.selfIndex, dstRecords.length + 1));
        match.referencedBySelf = true;
      } else {
        if (record.argumentToPureFunction) {
          match.argumentToPureFunction = true;
        }
      }
      return match;
    }
    if (excluded) {
      excludedIdxs.push(record.selfIndex);
    }
    dstRecords.push(record);
    return record;
  }
  function _findFirstMatch(record, dstRecords, excludedIdxs) {
    return dstRecords.find(function(rr) {
      return excludedIdxs.indexOf(rr.selfIndex) == -1 && rr.mode !== proto_record_1.RecordType.DirectiveLifecycle && _haveSameDirIndex(rr, record) && rr.mode === record.mode && lang_1.looseIdentical(rr.funcOrValue, record.funcOrValue) && rr.contextIndex === record.contextIndex && lang_1.looseIdentical(rr.name, record.name) && collection_1.ListWrapper.equals(rr.args, record.args);
    });
  }
  function _cloneAndUpdateIndexes(record, dstRecords, indexMap) {
    var args = record.args.map(function(src) {
      return _srcToDstSelfIndex(indexMap, src);
    });
    var contextIndex = _srcToDstSelfIndex(indexMap, record.contextIndex);
    var selfIndex = dstRecords.length + 1;
    return new proto_record_1.ProtoRecord(record.mode, record.name, record.funcOrValue, args, record.fixedArgs, contextIndex, record.directiveIndex, selfIndex, record.bindingRecord, record.lastInBinding, record.lastInDirective, record.argumentToPureFunction, record.referencedBySelf, record.propertyBindingIndex);
  }
  function _srcToDstSelfIndex(indexMap, srcIdx) {
    var dstIdx = indexMap.get(srcIdx);
    return lang_1.isPresent(dstIdx) ? dstIdx : srcIdx;
  }
  function _createSelfRecord(r, contextIndex, selfIndex) {
    return new proto_record_1.ProtoRecord(proto_record_1.RecordType.Self, "self", null, [], r.fixedArgs, contextIndex, r.directiveIndex, selfIndex, r.bindingRecord, r.lastInBinding, r.lastInDirective, false, false, r.propertyBindingIndex);
  }
  function _haveSameDirIndex(a, b) {
    var di1 = lang_1.isBlank(a.directiveIndex) ? null : a.directiveIndex.directiveIndex;
    var ei1 = lang_1.isBlank(a.directiveIndex) ? null : a.directiveIndex.elementIndex;
    var di2 = lang_1.isBlank(b.directiveIndex) ? null : b.directiveIndex.directiveIndex;
    var ei2 = lang_1.isBlank(b.directiveIndex) ? null : b.directiveIndex.elementIndex;
    return di1 === di2 && ei1 === ei2;
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/proto_change_detector.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/change_detection/parser/ast.js", "node_modules/angular2/src/core/change_detection/change_detection_util.js", "node_modules/angular2/src/core/change_detection/dynamic_change_detector.js", "node_modules/angular2/src/core/change_detection/directive_record.js", "node_modules/angular2/src/core/change_detection/event_binding.js", "node_modules/angular2/src/core/change_detection/coalesce.js", "node_modules/angular2/src/core/change_detection/proto_record.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var ast_1 = $__require('node_modules/angular2/src/core/change_detection/parser/ast.js');
  var change_detection_util_1 = $__require('node_modules/angular2/src/core/change_detection/change_detection_util.js');
  var dynamic_change_detector_1 = $__require('node_modules/angular2/src/core/change_detection/dynamic_change_detector.js');
  var directive_record_1 = $__require('node_modules/angular2/src/core/change_detection/directive_record.js');
  var event_binding_1 = $__require('node_modules/angular2/src/core/change_detection/event_binding.js');
  var coalesce_1 = $__require('node_modules/angular2/src/core/change_detection/coalesce.js');
  var proto_record_1 = $__require('node_modules/angular2/src/core/change_detection/proto_record.js');
  var DynamicProtoChangeDetector = (function() {
    function DynamicProtoChangeDetector(_definition) {
      this._definition = _definition;
      this._propertyBindingRecords = createPropertyRecords(_definition);
      this._eventBindingRecords = createEventRecords(_definition);
      this._propertyBindingTargets = this._definition.bindingRecords.map(function(b) {
        return b.target;
      });
      this._directiveIndices = this._definition.directiveRecords.map(function(d) {
        return d.directiveIndex;
      });
    }
    DynamicProtoChangeDetector.prototype.instantiate = function() {
      return new dynamic_change_detector_1.DynamicChangeDetector(this._definition.id, this._propertyBindingRecords.length, this._propertyBindingTargets, this._directiveIndices, this._definition.strategy, this._propertyBindingRecords, this._eventBindingRecords, this._definition.directiveRecords, this._definition.genConfig);
    };
    return DynamicProtoChangeDetector;
  })();
  exports.DynamicProtoChangeDetector = DynamicProtoChangeDetector;
  function createPropertyRecords(definition) {
    var recordBuilder = new ProtoRecordBuilder();
    collection_1.ListWrapper.forEachWithIndex(definition.bindingRecords, function(b, index) {
      return recordBuilder.add(b, definition.variableNames, index);
    });
    return coalesce_1.coalesce(recordBuilder.records);
  }
  exports.createPropertyRecords = createPropertyRecords;
  function createEventRecords(definition) {
    var varNames = collection_1.ListWrapper.concat(['$event'], definition.variableNames);
    return definition.eventRecords.map(function(er) {
      var records = _ConvertAstIntoProtoRecords.create(er, varNames);
      var dirIndex = er.implicitReceiver instanceof directive_record_1.DirectiveIndex ? er.implicitReceiver : null;
      return new event_binding_1.EventBinding(er.target.name, er.target.elementIndex, dirIndex, records);
    });
  }
  exports.createEventRecords = createEventRecords;
  var ProtoRecordBuilder = (function() {
    function ProtoRecordBuilder() {
      this.records = [];
    }
    ProtoRecordBuilder.prototype.add = function(b, variableNames, bindingIndex) {
      var oldLast = collection_1.ListWrapper.last(this.records);
      if (lang_1.isPresent(oldLast) && oldLast.bindingRecord.directiveRecord == b.directiveRecord) {
        oldLast.lastInDirective = false;
      }
      var numberOfRecordsBefore = this.records.length;
      this._appendRecords(b, variableNames, bindingIndex);
      var newLast = collection_1.ListWrapper.last(this.records);
      if (lang_1.isPresent(newLast) && newLast !== oldLast) {
        newLast.lastInBinding = true;
        newLast.lastInDirective = true;
        this._setArgumentToPureFunction(numberOfRecordsBefore);
      }
    };
    ProtoRecordBuilder.prototype._setArgumentToPureFunction = function(startIndex) {
      var _this = this;
      for (var i = startIndex; i < this.records.length; ++i) {
        var rec = this.records[i];
        if (rec.isPureFunction()) {
          rec.args.forEach(function(recordIndex) {
            return _this.records[recordIndex - 1].argumentToPureFunction = true;
          });
        }
        if (rec.mode === proto_record_1.RecordType.Pipe) {
          rec.args.forEach(function(recordIndex) {
            return _this.records[recordIndex - 1].argumentToPureFunction = true;
          });
          this.records[rec.contextIndex - 1].argumentToPureFunction = true;
        }
      }
    };
    ProtoRecordBuilder.prototype._appendRecords = function(b, variableNames, bindingIndex) {
      if (b.isDirectiveLifecycle()) {
        this.records.push(new proto_record_1.ProtoRecord(proto_record_1.RecordType.DirectiveLifecycle, b.lifecycleEvent, null, [], [], -1, null, this.records.length + 1, b, false, false, false, false, null));
      } else {
        _ConvertAstIntoProtoRecords.append(this.records, b, variableNames, bindingIndex);
      }
    };
    return ProtoRecordBuilder;
  })();
  exports.ProtoRecordBuilder = ProtoRecordBuilder;
  var _ConvertAstIntoProtoRecords = (function() {
    function _ConvertAstIntoProtoRecords(_records, _bindingRecord, _variableNames, _bindingIndex) {
      this._records = _records;
      this._bindingRecord = _bindingRecord;
      this._variableNames = _variableNames;
      this._bindingIndex = _bindingIndex;
    }
    _ConvertAstIntoProtoRecords.append = function(records, b, variableNames, bindingIndex) {
      var c = new _ConvertAstIntoProtoRecords(records, b, variableNames, bindingIndex);
      b.ast.visit(c);
    };
    _ConvertAstIntoProtoRecords.create = function(b, variableNames) {
      var rec = [];
      _ConvertAstIntoProtoRecords.append(rec, b, variableNames, null);
      rec[rec.length - 1].lastInBinding = true;
      return rec;
    };
    _ConvertAstIntoProtoRecords.prototype.visitImplicitReceiver = function(ast) {
      return this._bindingRecord.implicitReceiver;
    };
    _ConvertAstIntoProtoRecords.prototype.visitInterpolation = function(ast) {
      var args = this._visitAll(ast.expressions);
      return this._addRecord(proto_record_1.RecordType.Interpolate, "interpolate", _interpolationFn(ast.strings), args, ast.strings, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitLiteralPrimitive = function(ast) {
      return this._addRecord(proto_record_1.RecordType.Const, "literal", ast.value, [], null, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitPropertyRead = function(ast) {
      var receiver = ast.receiver.visit(this);
      if (lang_1.isPresent(this._variableNames) && collection_1.ListWrapper.contains(this._variableNames, ast.name) && ast.receiver instanceof ast_1.ImplicitReceiver) {
        return this._addRecord(proto_record_1.RecordType.Local, ast.name, ast.name, [], null, receiver);
      } else {
        return this._addRecord(proto_record_1.RecordType.PropertyRead, ast.name, ast.getter, [], null, receiver);
      }
    };
    _ConvertAstIntoProtoRecords.prototype.visitPropertyWrite = function(ast) {
      if (lang_1.isPresent(this._variableNames) && collection_1.ListWrapper.contains(this._variableNames, ast.name) && ast.receiver instanceof ast_1.ImplicitReceiver) {
        throw new exceptions_1.BaseException("Cannot reassign a variable binding " + ast.name);
      } else {
        var receiver = ast.receiver.visit(this);
        var value = ast.value.visit(this);
        return this._addRecord(proto_record_1.RecordType.PropertyWrite, ast.name, ast.setter, [value], null, receiver);
      }
    };
    _ConvertAstIntoProtoRecords.prototype.visitKeyedWrite = function(ast) {
      var obj = ast.obj.visit(this);
      var key = ast.key.visit(this);
      var value = ast.value.visit(this);
      return this._addRecord(proto_record_1.RecordType.KeyedWrite, null, null, [key, value], null, obj);
    };
    _ConvertAstIntoProtoRecords.prototype.visitSafePropertyRead = function(ast) {
      var receiver = ast.receiver.visit(this);
      return this._addRecord(proto_record_1.RecordType.SafeProperty, ast.name, ast.getter, [], null, receiver);
    };
    _ConvertAstIntoProtoRecords.prototype.visitMethodCall = function(ast) {
      var receiver = ast.receiver.visit(this);
      var args = this._visitAll(ast.args);
      if (lang_1.isPresent(this._variableNames) && collection_1.ListWrapper.contains(this._variableNames, ast.name)) {
        var target = this._addRecord(proto_record_1.RecordType.Local, ast.name, ast.name, [], null, receiver);
        return this._addRecord(proto_record_1.RecordType.InvokeClosure, "closure", null, args, null, target);
      } else {
        return this._addRecord(proto_record_1.RecordType.InvokeMethod, ast.name, ast.fn, args, null, receiver);
      }
    };
    _ConvertAstIntoProtoRecords.prototype.visitSafeMethodCall = function(ast) {
      var receiver = ast.receiver.visit(this);
      var args = this._visitAll(ast.args);
      return this._addRecord(proto_record_1.RecordType.SafeMethodInvoke, ast.name, ast.fn, args, null, receiver);
    };
    _ConvertAstIntoProtoRecords.prototype.visitFunctionCall = function(ast) {
      var target = ast.target.visit(this);
      var args = this._visitAll(ast.args);
      return this._addRecord(proto_record_1.RecordType.InvokeClosure, "closure", null, args, null, target);
    };
    _ConvertAstIntoProtoRecords.prototype.visitLiteralArray = function(ast) {
      var primitiveName = "arrayFn" + ast.expressions.length;
      return this._addRecord(proto_record_1.RecordType.CollectionLiteral, primitiveName, _arrayFn(ast.expressions.length), this._visitAll(ast.expressions), null, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitLiteralMap = function(ast) {
      return this._addRecord(proto_record_1.RecordType.CollectionLiteral, _mapPrimitiveName(ast.keys), change_detection_util_1.ChangeDetectionUtil.mapFn(ast.keys), this._visitAll(ast.values), null, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitBinary = function(ast) {
      var left = ast.left.visit(this);
      switch (ast.operation) {
        case '&&':
          var branchEnd = [null];
          this._addRecord(proto_record_1.RecordType.SkipRecordsIfNot, "SkipRecordsIfNot", null, [], branchEnd, left);
          var right = ast.right.visit(this);
          branchEnd[0] = right;
          return this._addRecord(proto_record_1.RecordType.PrimitiveOp, "cond", change_detection_util_1.ChangeDetectionUtil.cond, [left, right, left], null, 0);
        case '||':
          var branchEnd = [null];
          this._addRecord(proto_record_1.RecordType.SkipRecordsIf, "SkipRecordsIf", null, [], branchEnd, left);
          var right = ast.right.visit(this);
          branchEnd[0] = right;
          return this._addRecord(proto_record_1.RecordType.PrimitiveOp, "cond", change_detection_util_1.ChangeDetectionUtil.cond, [left, left, right], null, 0);
        default:
          var right = ast.right.visit(this);
          return this._addRecord(proto_record_1.RecordType.PrimitiveOp, _operationToPrimitiveName(ast.operation), _operationToFunction(ast.operation), [left, right], null, 0);
      }
    };
    _ConvertAstIntoProtoRecords.prototype.visitPrefixNot = function(ast) {
      var exp = ast.expression.visit(this);
      return this._addRecord(proto_record_1.RecordType.PrimitiveOp, "operation_negate", change_detection_util_1.ChangeDetectionUtil.operation_negate, [exp], null, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitConditional = function(ast) {
      var condition = ast.condition.visit(this);
      var startOfFalseBranch = [null];
      var endOfFalseBranch = [null];
      this._addRecord(proto_record_1.RecordType.SkipRecordsIfNot, "SkipRecordsIfNot", null, [], startOfFalseBranch, condition);
      var whenTrue = ast.trueExp.visit(this);
      var skip = this._addRecord(proto_record_1.RecordType.SkipRecords, "SkipRecords", null, [], endOfFalseBranch, 0);
      var whenFalse = ast.falseExp.visit(this);
      startOfFalseBranch[0] = skip;
      endOfFalseBranch[0] = whenFalse;
      return this._addRecord(proto_record_1.RecordType.PrimitiveOp, "cond", change_detection_util_1.ChangeDetectionUtil.cond, [condition, whenTrue, whenFalse], null, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitPipe = function(ast) {
      var value = ast.exp.visit(this);
      var args = this._visitAll(ast.args);
      return this._addRecord(proto_record_1.RecordType.Pipe, ast.name, ast.name, args, null, value);
    };
    _ConvertAstIntoProtoRecords.prototype.visitKeyedRead = function(ast) {
      var obj = ast.obj.visit(this);
      var key = ast.key.visit(this);
      return this._addRecord(proto_record_1.RecordType.KeyedRead, "keyedAccess", change_detection_util_1.ChangeDetectionUtil.keyedAccess, [key], null, obj);
    };
    _ConvertAstIntoProtoRecords.prototype.visitChain = function(ast) {
      var _this = this;
      var args = ast.expressions.map(function(e) {
        return e.visit(_this);
      });
      return this._addRecord(proto_record_1.RecordType.Chain, "chain", null, args, null, 0);
    };
    _ConvertAstIntoProtoRecords.prototype.visitQuote = function(ast) {
      throw new exceptions_1.BaseException(("Caught uninterpreted expression at " + ast.location + ": " + ast.uninterpretedExpression + ". ") + ("Expression prefix " + ast.prefix + " did not match a template transformer to interpret the expression."));
    };
    _ConvertAstIntoProtoRecords.prototype._visitAll = function(asts) {
      var res = collection_1.ListWrapper.createFixedSize(asts.length);
      for (var i = 0; i < asts.length; ++i) {
        res[i] = asts[i].visit(this);
      }
      return res;
    };
    _ConvertAstIntoProtoRecords.prototype._addRecord = function(type, name, funcOrValue, args, fixedArgs, context) {
      var selfIndex = this._records.length + 1;
      if (context instanceof directive_record_1.DirectiveIndex) {
        this._records.push(new proto_record_1.ProtoRecord(type, name, funcOrValue, args, fixedArgs, -1, context, selfIndex, this._bindingRecord, false, false, false, false, this._bindingIndex));
      } else {
        this._records.push(new proto_record_1.ProtoRecord(type, name, funcOrValue, args, fixedArgs, context, null, selfIndex, this._bindingRecord, false, false, false, false, this._bindingIndex));
      }
      return selfIndex;
    };
    return _ConvertAstIntoProtoRecords;
  })();
  function _arrayFn(length) {
    switch (length) {
      case 0:
        return change_detection_util_1.ChangeDetectionUtil.arrayFn0;
      case 1:
        return change_detection_util_1.ChangeDetectionUtil.arrayFn1;
      case 2:
        return change_detection_util_1.ChangeDetectionUtil.arrayFn2;
      case 3:
        return change_detection_util_1.ChangeDetectionUtil.arrayFn3;
      case 4:
        return change_detection_util_1.ChangeDetectionUtil.arrayFn4;
      case 5:
        return change_detection_util_1.ChangeDetectionUtil.arrayFn5;
      case 6:
        return change_detection_util_1.ChangeDetectionUtil.arrayFn6;
      case 7:
        return change_detection_util_1.ChangeDetectionUtil.arrayFn7;
      case 8:
        return change_detection_util_1.ChangeDetectionUtil.arrayFn8;
      case 9:
        return change_detection_util_1.ChangeDetectionUtil.arrayFn9;
      default:
        throw new exceptions_1.BaseException("Does not support literal maps with more than 9 elements");
    }
  }
  function _mapPrimitiveName(keys) {
    var stringifiedKeys = keys.map(function(k) {
      return lang_1.isString(k) ? "\"" + k + "\"" : "" + k;
    }).join(', ');
    return "mapFn([" + stringifiedKeys + "])";
  }
  function _operationToPrimitiveName(operation) {
    switch (operation) {
      case '+':
        return "operation_add";
      case '-':
        return "operation_subtract";
      case '*':
        return "operation_multiply";
      case '/':
        return "operation_divide";
      case '%':
        return "operation_remainder";
      case '==':
        return "operation_equals";
      case '!=':
        return "operation_not_equals";
      case '===':
        return "operation_identical";
      case '!==':
        return "operation_not_identical";
      case '<':
        return "operation_less_then";
      case '>':
        return "operation_greater_then";
      case '<=':
        return "operation_less_or_equals_then";
      case '>=':
        return "operation_greater_or_equals_then";
      default:
        throw new exceptions_1.BaseException("Unsupported operation " + operation);
    }
  }
  function _operationToFunction(operation) {
    switch (operation) {
      case '+':
        return change_detection_util_1.ChangeDetectionUtil.operation_add;
      case '-':
        return change_detection_util_1.ChangeDetectionUtil.operation_subtract;
      case '*':
        return change_detection_util_1.ChangeDetectionUtil.operation_multiply;
      case '/':
        return change_detection_util_1.ChangeDetectionUtil.operation_divide;
      case '%':
        return change_detection_util_1.ChangeDetectionUtil.operation_remainder;
      case '==':
        return change_detection_util_1.ChangeDetectionUtil.operation_equals;
      case '!=':
        return change_detection_util_1.ChangeDetectionUtil.operation_not_equals;
      case '===':
        return change_detection_util_1.ChangeDetectionUtil.operation_identical;
      case '!==':
        return change_detection_util_1.ChangeDetectionUtil.operation_not_identical;
      case '<':
        return change_detection_util_1.ChangeDetectionUtil.operation_less_then;
      case '>':
        return change_detection_util_1.ChangeDetectionUtil.operation_greater_then;
      case '<=':
        return change_detection_util_1.ChangeDetectionUtil.operation_less_or_equals_then;
      case '>=':
        return change_detection_util_1.ChangeDetectionUtil.operation_greater_or_equals_then;
      default:
        throw new exceptions_1.BaseException("Unsupported operation " + operation);
    }
  }
  function s(v) {
    return lang_1.isPresent(v) ? "" + v : '';
  }
  function _interpolationFn(strings) {
    var length = strings.length;
    var c0 = length > 0 ? strings[0] : null;
    var c1 = length > 1 ? strings[1] : null;
    var c2 = length > 2 ? strings[2] : null;
    var c3 = length > 3 ? strings[3] : null;
    var c4 = length > 4 ? strings[4] : null;
    var c5 = length > 5 ? strings[5] : null;
    var c6 = length > 6 ? strings[6] : null;
    var c7 = length > 7 ? strings[7] : null;
    var c8 = length > 8 ? strings[8] : null;
    var c9 = length > 9 ? strings[9] : null;
    switch (length - 1) {
      case 1:
        return function(a1) {
          return c0 + s(a1) + c1;
        };
      case 2:
        return function(a1, a2) {
          return c0 + s(a1) + c1 + s(a2) + c2;
        };
      case 3:
        return function(a1, a2, a3) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3;
        };
      case 4:
        return function(a1, a2, a3, a4) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4;
        };
      case 5:
        return function(a1, a2, a3, a4, a5) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5;
        };
      case 6:
        return function(a1, a2, a3, a4, a5, a6) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5 + s(a6) + c6;
        };
      case 7:
        return function(a1, a2, a3, a4, a5, a6, a7) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5 + s(a6) + c6 + s(a7) + c7;
        };
      case 8:
        return function(a1, a2, a3, a4, a5, a6, a7, a8) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5 + s(a6) + c6 + s(a7) + c7 + s(a8) + c8;
        };
      case 9:
        return function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5 + s(a6) + c6 + s(a7) + c7 + s(a8) + c8 + s(a9) + c9;
        };
      default:
        throw new exceptions_1.BaseException("Does not support more than 9 expressions");
    }
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/change_detection_jit_generator.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/change_detection/abstract_change_detector.js", "node_modules/angular2/src/core/change_detection/change_detection_util.js", "node_modules/angular2/src/core/change_detection/proto_record.js", "node_modules/angular2/src/core/change_detection/codegen_name_util.js", "node_modules/angular2/src/core/change_detection/codegen_logic_util.js", "node_modules/angular2/src/core/change_detection/codegen_facade.js", "node_modules/angular2/src/core/change_detection/constants.js", "node_modules/angular2/src/core/change_detection/proto_change_detector.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var abstract_change_detector_1 = $__require('node_modules/angular2/src/core/change_detection/abstract_change_detector.js');
  var change_detection_util_1 = $__require('node_modules/angular2/src/core/change_detection/change_detection_util.js');
  var proto_record_1 = $__require('node_modules/angular2/src/core/change_detection/proto_record.js');
  var codegen_name_util_1 = $__require('node_modules/angular2/src/core/change_detection/codegen_name_util.js');
  var codegen_logic_util_1 = $__require('node_modules/angular2/src/core/change_detection/codegen_logic_util.js');
  var codegen_facade_1 = $__require('node_modules/angular2/src/core/change_detection/codegen_facade.js');
  var constants_1 = $__require('node_modules/angular2/src/core/change_detection/constants.js');
  var proto_change_detector_1 = $__require('node_modules/angular2/src/core/change_detection/proto_change_detector.js');
  var IS_CHANGED_LOCAL = "isChanged";
  var CHANGES_LOCAL = "changes";
  var ChangeDetectorJITGenerator = (function() {
    function ChangeDetectorJITGenerator(definition, changeDetectionUtilVarName, abstractChangeDetectorVarName, changeDetectorStateVarName) {
      this.changeDetectionUtilVarName = changeDetectionUtilVarName;
      this.abstractChangeDetectorVarName = abstractChangeDetectorVarName;
      this.changeDetectorStateVarName = changeDetectorStateVarName;
      var propertyBindingRecords = proto_change_detector_1.createPropertyRecords(definition);
      var eventBindingRecords = proto_change_detector_1.createEventRecords(definition);
      var propertyBindingTargets = definition.bindingRecords.map(function(b) {
        return b.target;
      });
      this.id = definition.id;
      this.changeDetectionStrategy = definition.strategy;
      this.genConfig = definition.genConfig;
      this.records = propertyBindingRecords;
      this.propertyBindingTargets = propertyBindingTargets;
      this.eventBindings = eventBindingRecords;
      this.directiveRecords = definition.directiveRecords;
      this._names = new codegen_name_util_1.CodegenNameUtil(this.records, this.eventBindings, this.directiveRecords, this.changeDetectionUtilVarName);
      this._logic = new codegen_logic_util_1.CodegenLogicUtil(this._names, this.changeDetectionUtilVarName, this.changeDetectorStateVarName);
      this.typeName = codegen_name_util_1.sanitizeName("ChangeDetector_" + this.id);
    }
    ChangeDetectorJITGenerator.prototype.generate = function() {
      var factorySource = "\n      " + this.generateSource() + "\n      return function() {\n        return new " + this.typeName + "();\n      }\n    ";
      return new Function(this.abstractChangeDetectorVarName, this.changeDetectionUtilVarName, this.changeDetectorStateVarName, factorySource)(abstract_change_detector_1.AbstractChangeDetector, change_detection_util_1.ChangeDetectionUtil, constants_1.ChangeDetectorState);
    };
    ChangeDetectorJITGenerator.prototype.generateSource = function() {
      return "\n      var " + this.typeName + " = function " + this.typeName + "() {\n        " + this.abstractChangeDetectorVarName + ".call(\n            this, " + JSON.stringify(this.id) + ", " + this.records.length + ",\n            " + this.typeName + ".gen_propertyBindingTargets, " + this.typeName + ".gen_directiveIndices,\n            " + codegen_facade_1.codify(this.changeDetectionStrategy) + ");\n        this.dehydrateDirectives(false);\n      }\n\n      " + this.typeName + ".prototype = Object.create(" + this.abstractChangeDetectorVarName + ".prototype);\n\n      " + this.typeName + ".prototype.detectChangesInRecordsInternal = function(throwOnChange) {\n        " + this._names.genInitLocals() + "\n        var " + IS_CHANGED_LOCAL + " = false;\n        var " + CHANGES_LOCAL + " = null;\n\n        " + this._genAllRecords(this.records) + "\n      }\n\n      " + this._maybeGenHandleEventInternal() + "\n\n      " + this._maybeGenAfterContentLifecycleCallbacks() + "\n\n      " + this._maybeGenAfterViewLifecycleCallbacks() + "\n\n      " + this._maybeGenHydrateDirectives() + "\n\n      " + this._maybeGenDehydrateDirectives() + "\n\n      " + this._genPropertyBindingTargets() + "\n\n      " + this._genDirectiveIndices() + "\n    ";
    };
    ChangeDetectorJITGenerator.prototype._genPropertyBindingTargets = function() {
      var targets = this._logic.genPropertyBindingTargets(this.propertyBindingTargets, this.genConfig.genDebugInfo);
      return this.typeName + ".gen_propertyBindingTargets = " + targets + ";";
    };
    ChangeDetectorJITGenerator.prototype._genDirectiveIndices = function() {
      var indices = this._logic.genDirectiveIndices(this.directiveRecords);
      return this.typeName + ".gen_directiveIndices = " + indices + ";";
    };
    ChangeDetectorJITGenerator.prototype._maybeGenHandleEventInternal = function() {
      var _this = this;
      if (this.eventBindings.length > 0) {
        var handlers = this.eventBindings.map(function(eb) {
          return _this._genEventBinding(eb);
        }).join("\n");
        return "\n        " + this.typeName + ".prototype.handleEventInternal = function(eventName, elIndex, locals) {\n          var " + this._names.getPreventDefaultAccesor() + " = false;\n          " + this._names.genInitEventLocals() + "\n          " + handlers + "\n          return " + this._names.getPreventDefaultAccesor() + ";\n        }\n      ";
      } else {
        return '';
      }
    };
    ChangeDetectorJITGenerator.prototype._genEventBinding = function(eb) {
      var _this = this;
      var codes = [];
      this._endOfBlockIdxs = [];
      collection_1.ListWrapper.forEachWithIndex(eb.records, function(r, i) {
        var code;
        if (r.isConditionalSkipRecord()) {
          code = _this._genConditionalSkip(r, _this._names.getEventLocalName(eb, i));
        } else if (r.isUnconditionalSkipRecord()) {
          code = _this._genUnconditionalSkip(r);
        } else {
          code = _this._genEventBindingEval(eb, r);
        }
        code += _this._genEndOfSkipBlock(i);
        codes.push(code);
      });
      return "\n    if (eventName === \"" + eb.eventName + "\" && elIndex === " + eb.elIndex + ") {\n      " + codes.join("\n") + "\n    }";
    };
    ChangeDetectorJITGenerator.prototype._genEventBindingEval = function(eb, r) {
      if (r.lastInBinding) {
        var evalRecord = this._logic.genEventBindingEvalValue(eb, r);
        var markPath = this._genMarkPathToRootAsCheckOnce(r);
        var prevDefault = this._genUpdatePreventDefault(eb, r);
        return markPath + "\n" + evalRecord + "\n" + prevDefault;
      } else {
        return this._logic.genEventBindingEvalValue(eb, r);
      }
    };
    ChangeDetectorJITGenerator.prototype._genMarkPathToRootAsCheckOnce = function(r) {
      var br = r.bindingRecord;
      if (br.isDefaultChangeDetection()) {
        return "";
      } else {
        return this._names.getDetectorName(br.directiveRecord.directiveIndex) + ".markPathToRootAsCheckOnce();";
      }
    };
    ChangeDetectorJITGenerator.prototype._genUpdatePreventDefault = function(eb, r) {
      var local = this._names.getEventLocalName(eb, r.selfIndex);
      return "if (" + local + " === false) { " + this._names.getPreventDefaultAccesor() + " = true};";
    };
    ChangeDetectorJITGenerator.prototype._maybeGenDehydrateDirectives = function() {
      var destroyPipesCode = this._names.genPipeOnDestroy();
      var destroyDirectivesCode = this._logic.genDirectivesOnDestroy(this.directiveRecords);
      var dehydrateFieldsCode = this._names.genDehydrateFields();
      if (!destroyPipesCode && !destroyDirectivesCode && !dehydrateFieldsCode)
        return '';
      return this.typeName + ".prototype.dehydrateDirectives = function(destroyPipes) {\n        if (destroyPipes) {\n          " + destroyPipesCode + "\n          " + destroyDirectivesCode + "\n        }\n        " + dehydrateFieldsCode + "\n    }";
    };
    ChangeDetectorJITGenerator.prototype._maybeGenHydrateDirectives = function() {
      var hydrateDirectivesCode = this._logic.genHydrateDirectives(this.directiveRecords);
      var hydrateDetectorsCode = this._logic.genHydrateDetectors(this.directiveRecords);
      if (!hydrateDirectivesCode && !hydrateDetectorsCode)
        return '';
      return this.typeName + ".prototype.hydrateDirectives = function(directives) {\n      " + hydrateDirectivesCode + "\n      " + hydrateDetectorsCode + "\n    }";
    };
    ChangeDetectorJITGenerator.prototype._maybeGenAfterContentLifecycleCallbacks = function() {
      var notifications = this._logic.genContentLifecycleCallbacks(this.directiveRecords);
      if (notifications.length > 0) {
        var directiveNotifications = notifications.join("\n");
        return "\n        " + this.typeName + ".prototype.afterContentLifecycleCallbacksInternal = function() {\n          " + directiveNotifications + "\n        }\n      ";
      } else {
        return '';
      }
    };
    ChangeDetectorJITGenerator.prototype._maybeGenAfterViewLifecycleCallbacks = function() {
      var notifications = this._logic.genViewLifecycleCallbacks(this.directiveRecords);
      if (notifications.length > 0) {
        var directiveNotifications = notifications.join("\n");
        return "\n        " + this.typeName + ".prototype.afterViewLifecycleCallbacksInternal = function() {\n          " + directiveNotifications + "\n        }\n      ";
      } else {
        return '';
      }
    };
    ChangeDetectorJITGenerator.prototype._genAllRecords = function(rs) {
      var codes = [];
      this._endOfBlockIdxs = [];
      for (var i = 0; i < rs.length; i++) {
        var code = void 0;
        var r = rs[i];
        if (r.isLifeCycleRecord()) {
          code = this._genDirectiveLifecycle(r);
        } else if (r.isPipeRecord()) {
          code = this._genPipeCheck(r);
        } else if (r.isConditionalSkipRecord()) {
          code = this._genConditionalSkip(r, this._names.getLocalName(r.contextIndex));
        } else if (r.isUnconditionalSkipRecord()) {
          code = this._genUnconditionalSkip(r);
        } else {
          code = this._genReferenceCheck(r);
        }
        code = "\n        " + this._maybeFirstInBinding(r) + "\n        " + code + "\n        " + this._maybeGenLastInDirective(r) + "\n        " + this._genEndOfSkipBlock(i) + "\n      ";
        codes.push(code);
      }
      return codes.join("\n");
    };
    ChangeDetectorJITGenerator.prototype._genConditionalSkip = function(r, condition) {
      var maybeNegate = r.mode === proto_record_1.RecordType.SkipRecordsIf ? '!' : '';
      this._endOfBlockIdxs.push(r.fixedArgs[0] - 1);
      return "if (" + maybeNegate + condition + ") {";
    };
    ChangeDetectorJITGenerator.prototype._genUnconditionalSkip = function(r) {
      this._endOfBlockIdxs.pop();
      this._endOfBlockIdxs.push(r.fixedArgs[0] - 1);
      return "} else {";
    };
    ChangeDetectorJITGenerator.prototype._genEndOfSkipBlock = function(protoIndex) {
      if (!collection_1.ListWrapper.isEmpty(this._endOfBlockIdxs)) {
        var endOfBlock = collection_1.ListWrapper.last(this._endOfBlockIdxs);
        if (protoIndex === endOfBlock) {
          this._endOfBlockIdxs.pop();
          return '}';
        }
      }
      return '';
    };
    ChangeDetectorJITGenerator.prototype._genDirectiveLifecycle = function(r) {
      if (r.name === "DoCheck") {
        return this._genOnCheck(r);
      } else if (r.name === "OnInit") {
        return this._genOnInit(r);
      } else if (r.name === "OnChanges") {
        return this._genOnChange(r);
      } else {
        throw new exceptions_1.BaseException("Unknown lifecycle event '" + r.name + "'");
      }
    };
    ChangeDetectorJITGenerator.prototype._genPipeCheck = function(r) {
      var _this = this;
      var context = this._names.getLocalName(r.contextIndex);
      var argString = r.args.map(function(arg) {
        return _this._names.getLocalName(arg);
      }).join(", ");
      var oldValue = this._names.getFieldName(r.selfIndex);
      var newValue = this._names.getLocalName(r.selfIndex);
      var pipe = this._names.getPipeName(r.selfIndex);
      var pipeName = r.name;
      var init = "\n      if (" + pipe + " === " + this.changeDetectionUtilVarName + ".uninitialized) {\n        " + pipe + " = " + this._names.getPipesAccessorName() + ".get('" + pipeName + "');\n      }\n    ";
      var read = newValue + " = " + pipe + ".pipe.transform(" + context + ", [" + argString + "]);";
      var contexOrArgCheck = r.args.map(function(a) {
        return _this._names.getChangeName(a);
      });
      contexOrArgCheck.push(this._names.getChangeName(r.contextIndex));
      var condition = "!" + pipe + ".pure || (" + contexOrArgCheck.join(" || ") + ")";
      var check = "\n      " + this._genThrowOnChangeCheck(oldValue, newValue) + "\n      if (" + this.changeDetectionUtilVarName + ".looseNotIdentical(" + oldValue + ", " + newValue + ")) {\n        " + newValue + " = " + this.changeDetectionUtilVarName + ".unwrapValue(" + newValue + ")\n        " + this._genChangeMarker(r) + "\n        " + this._genUpdateDirectiveOrElement(r) + "\n        " + this._genAddToChanges(r) + "\n        " + oldValue + " = " + newValue + ";\n      }\n    ";
      var genCode = r.shouldBeChecked() ? "" + read + check : read;
      if (r.isUsedByOtherRecord()) {
        return init + " if (" + condition + ") { " + genCode + " } else { " + newValue + " = " + oldValue + "; }";
      } else {
        return init + " if (" + condition + ") { " + genCode + " }";
      }
    };
    ChangeDetectorJITGenerator.prototype._genReferenceCheck = function(r) {
      var _this = this;
      var oldValue = this._names.getFieldName(r.selfIndex);
      var newValue = this._names.getLocalName(r.selfIndex);
      var read = "\n      " + this._logic.genPropertyBindingEvalValue(r) + "\n    ";
      var check = "\n      " + this._genThrowOnChangeCheck(oldValue, newValue) + "\n      if (" + this.changeDetectionUtilVarName + ".looseNotIdentical(" + oldValue + ", " + newValue + ")) {\n        " + this._genChangeMarker(r) + "\n        " + this._genUpdateDirectiveOrElement(r) + "\n        " + this._genAddToChanges(r) + "\n        " + oldValue + " = " + newValue + ";\n      }\n    ";
      var genCode = r.shouldBeChecked() ? "" + read + check : read;
      if (r.isPureFunction()) {
        var condition = r.args.map(function(a) {
          return _this._names.getChangeName(a);
        }).join(" || ");
        if (r.isUsedByOtherRecord()) {
          return "if (" + condition + ") { " + genCode + " } else { " + newValue + " = " + oldValue + "; }";
        } else {
          return "if (" + condition + ") { " + genCode + " }";
        }
      } else {
        return genCode;
      }
    };
    ChangeDetectorJITGenerator.prototype._genChangeMarker = function(r) {
      return r.argumentToPureFunction ? this._names.getChangeName(r.selfIndex) + " = true" : "";
    };
    ChangeDetectorJITGenerator.prototype._genUpdateDirectiveOrElement = function(r) {
      if (!r.lastInBinding)
        return "";
      var newValue = this._names.getLocalName(r.selfIndex);
      var notifyDebug = this.genConfig.logBindingUpdate ? "this.logBindingUpdate(" + newValue + ");" : "";
      var br = r.bindingRecord;
      if (br.target.isDirective()) {
        var directiveProperty = this._names.getDirectiveName(br.directiveRecord.directiveIndex) + "." + br.target.name;
        return "\n        " + directiveProperty + " = " + newValue + ";\n        " + notifyDebug + "\n        " + IS_CHANGED_LOCAL + " = true;\n      ";
      } else {
        return "\n        this.notifyDispatcher(" + newValue + ");\n        " + notifyDebug + "\n      ";
      }
    };
    ChangeDetectorJITGenerator.prototype._genThrowOnChangeCheck = function(oldValue, newValue) {
      if (lang_1.assertionsEnabled()) {
        return "\n        if (throwOnChange && !" + this.changeDetectionUtilVarName + ".devModeEqual(" + oldValue + ", " + newValue + ")) {\n          this.throwOnChangeError(" + oldValue + ", " + newValue + ");\n        }\n        ";
      } else {
        return '';
      }
    };
    ChangeDetectorJITGenerator.prototype._genAddToChanges = function(r) {
      var newValue = this._names.getLocalName(r.selfIndex);
      var oldValue = this._names.getFieldName(r.selfIndex);
      if (!r.bindingRecord.callOnChanges())
        return "";
      return CHANGES_LOCAL + " = this.addChange(" + CHANGES_LOCAL + ", " + oldValue + ", " + newValue + ");";
    };
    ChangeDetectorJITGenerator.prototype._maybeFirstInBinding = function(r) {
      var prev = change_detection_util_1.ChangeDetectionUtil.protoByIndex(this.records, r.selfIndex - 1);
      var firstInBinding = lang_1.isBlank(prev) || prev.bindingRecord !== r.bindingRecord;
      return firstInBinding && !r.bindingRecord.isDirectiveLifecycle() ? this._names.getPropertyBindingIndex() + " = " + r.propertyBindingIndex + ";" : '';
    };
    ChangeDetectorJITGenerator.prototype._maybeGenLastInDirective = function(r) {
      if (!r.lastInDirective)
        return "";
      return "\n      " + CHANGES_LOCAL + " = null;\n      " + this._genNotifyOnPushDetectors(r) + "\n      " + IS_CHANGED_LOCAL + " = false;\n    ";
    };
    ChangeDetectorJITGenerator.prototype._genOnCheck = function(r) {
      var br = r.bindingRecord;
      return "if (!throwOnChange) " + this._names.getDirectiveName(br.directiveRecord.directiveIndex) + ".ngDoCheck();";
    };
    ChangeDetectorJITGenerator.prototype._genOnInit = function(r) {
      var br = r.bindingRecord;
      return "if (!throwOnChange && " + this._names.getStateName() + " === " + this.changeDetectorStateVarName + ".NeverChecked) " + this._names.getDirectiveName(br.directiveRecord.directiveIndex) + ".ngOnInit();";
    };
    ChangeDetectorJITGenerator.prototype._genOnChange = function(r) {
      var br = r.bindingRecord;
      return "if (!throwOnChange && " + CHANGES_LOCAL + ") " + this._names.getDirectiveName(br.directiveRecord.directiveIndex) + ".ngOnChanges(" + CHANGES_LOCAL + ");";
    };
    ChangeDetectorJITGenerator.prototype._genNotifyOnPushDetectors = function(r) {
      var br = r.bindingRecord;
      if (!r.lastInDirective || br.isDefaultChangeDetection())
        return "";
      var retVal = "\n      if(" + IS_CHANGED_LOCAL + ") {\n        " + this._names.getDetectorName(br.directiveRecord.directiveIndex) + ".markAsCheckOnce();\n      }\n    ";
      return retVal;
    };
    return ChangeDetectorJITGenerator;
  })();
  exports.ChangeDetectorJITGenerator = ChangeDetectorJITGenerator;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/jit_proto_change_detector.js", ["node_modules/angular2/src/core/change_detection/change_detection_jit_generator.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var change_detection_jit_generator_1 = $__require('node_modules/angular2/src/core/change_detection/change_detection_jit_generator.js');
  var JitProtoChangeDetector = (function() {
    function JitProtoChangeDetector(definition) {
      this.definition = definition;
      this._factory = this._createFactory(definition);
    }
    JitProtoChangeDetector.isSupported = function() {
      return true;
    };
    JitProtoChangeDetector.prototype.instantiate = function() {
      return this._factory();
    };
    JitProtoChangeDetector.prototype._createFactory = function(definition) {
      return new change_detection_jit_generator_1.ChangeDetectorJITGenerator(definition, 'util', 'AbstractChangeDetector', 'ChangeDetectorStatus').generate();
    };
    return JitProtoChangeDetector;
  })();
  exports.JitProtoChangeDetector = JitProtoChangeDetector;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/exceptions.js", ["node_modules/angular2/src/facade/exceptions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var ExpressionChangedAfterItHasBeenCheckedException = (function(_super) {
    __extends(ExpressionChangedAfterItHasBeenCheckedException, _super);
    function ExpressionChangedAfterItHasBeenCheckedException(exp, oldValue, currValue, context) {
      _super.call(this, ("Expression '" + exp + "' has changed after it was checked. ") + ("Previous value: '" + oldValue + "'. Current value: '" + currValue + "'"));
    }
    return ExpressionChangedAfterItHasBeenCheckedException;
  })(exceptions_1.BaseException);
  exports.ExpressionChangedAfterItHasBeenCheckedException = ExpressionChangedAfterItHasBeenCheckedException;
  var ChangeDetectionError = (function(_super) {
    __extends(ChangeDetectionError, _super);
    function ChangeDetectionError(exp, originalException, originalStack, context) {
      _super.call(this, originalException + " in [" + exp + "]", originalException, originalStack, context);
      this.location = exp;
    }
    return ChangeDetectionError;
  })(exceptions_1.WrappedException);
  exports.ChangeDetectionError = ChangeDetectionError;
  var DehydratedException = (function(_super) {
    __extends(DehydratedException, _super);
    function DehydratedException(details) {
      _super.call(this, "Attempt to use a dehydrated detector: " + details);
    }
    return DehydratedException;
  })(exceptions_1.BaseException);
  exports.DehydratedException = DehydratedException;
  var EventEvaluationError = (function(_super) {
    __extends(EventEvaluationError, _super);
    function EventEvaluationError(eventName, originalException, originalStack, context) {
      _super.call(this, "Error during evaluation of \"" + eventName + "\"", originalException, originalStack, context);
    }
    return EventEvaluationError;
  })(exceptions_1.WrappedException);
  exports.EventEvaluationError = EventEvaluationError;
  var EventEvaluationErrorContext = (function() {
    function EventEvaluationErrorContext(element, componentElement, context, locals, injector) {
      this.element = element;
      this.componentElement = componentElement;
      this.context = context;
      this.locals = locals;
      this.injector = injector;
    }
    return EventEvaluationErrorContext;
  })();
  exports.EventEvaluationErrorContext = EventEvaluationErrorContext;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/parser/locals.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var Locals = (function() {
    function Locals(parent, current) {
      this.parent = parent;
      this.current = current;
    }
    Locals.prototype.contains = function(name) {
      if (this.current.has(name)) {
        return true;
      }
      if (lang_1.isPresent(this.parent)) {
        return this.parent.contains(name);
      }
      return false;
    };
    Locals.prototype.get = function(name) {
      if (this.current.has(name)) {
        return this.current.get(name);
      }
      if (lang_1.isPresent(this.parent)) {
        return this.parent.get(name);
      }
      throw new exceptions_1.BaseException("Cannot find '" + name + "'");
    };
    Locals.prototype.set = function(name, value) {
      if (this.current.has(name)) {
        this.current.set(name, value);
      } else {
        throw new exceptions_1.BaseException("Setting of new keys post-construction is not supported. Key: " + name + ".");
      }
    };
    Locals.prototype.clearLocalValues = function() {
      collection_1.MapWrapper.clearValues(this.current);
    };
    return Locals;
  })();
  exports.Locals = Locals;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/abstract_change_detector.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/change_detection/change_detection_util.js", "node_modules/angular2/src/core/change_detection/change_detector_ref.js", "node_modules/angular2/src/core/change_detection/exceptions.js", "node_modules/angular2/src/core/change_detection/parser/locals.js", "node_modules/angular2/src/core/change_detection/constants.js", "node_modules/angular2/src/core/profile/profile.js", "node_modules/angular2/src/facade/async.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var change_detection_util_1 = $__require('node_modules/angular2/src/core/change_detection/change_detection_util.js');
  var change_detector_ref_1 = $__require('node_modules/angular2/src/core/change_detection/change_detector_ref.js');
  var exceptions_1 = $__require('node_modules/angular2/src/core/change_detection/exceptions.js');
  var locals_1 = $__require('node_modules/angular2/src/core/change_detection/parser/locals.js');
  var constants_1 = $__require('node_modules/angular2/src/core/change_detection/constants.js');
  var profile_1 = $__require('node_modules/angular2/src/core/profile/profile.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var _scope_check = profile_1.wtfCreateScope("ChangeDetector#check(ascii id, bool throwOnChange)");
  var _Context = (function() {
    function _Context(element, componentElement, context, locals, injector, expression) {
      this.element = element;
      this.componentElement = componentElement;
      this.context = context;
      this.locals = locals;
      this.injector = injector;
      this.expression = expression;
    }
    return _Context;
  })();
  var AbstractChangeDetector = (function() {
    function AbstractChangeDetector(id, numberOfPropertyProtoRecords, bindingTargets, directiveIndices, strategy) {
      this.id = id;
      this.numberOfPropertyProtoRecords = numberOfPropertyProtoRecords;
      this.bindingTargets = bindingTargets;
      this.directiveIndices = directiveIndices;
      this.strategy = strategy;
      this.contentChildren = [];
      this.viewChildren = [];
      this.state = constants_1.ChangeDetectorState.NeverChecked;
      this.locals = null;
      this.mode = null;
      this.pipes = null;
      this.ref = new change_detector_ref_1.ChangeDetectorRef_(this);
    }
    AbstractChangeDetector.prototype.addContentChild = function(cd) {
      this.contentChildren.push(cd);
      cd.parent = this;
    };
    AbstractChangeDetector.prototype.removeContentChild = function(cd) {
      collection_1.ListWrapper.remove(this.contentChildren, cd);
    };
    AbstractChangeDetector.prototype.addViewChild = function(cd) {
      this.viewChildren.push(cd);
      cd.parent = this;
    };
    AbstractChangeDetector.prototype.removeViewChild = function(cd) {
      collection_1.ListWrapper.remove(this.viewChildren, cd);
    };
    AbstractChangeDetector.prototype.remove = function() {
      this.parent.removeContentChild(this);
    };
    AbstractChangeDetector.prototype.handleEvent = function(eventName, elIndex, event) {
      if (!this.hydrated()) {
        this.throwDehydratedError(this.id + " -> " + eventName);
      }
      try {
        var locals = new Map();
        locals.set('$event', event);
        var res = !this.handleEventInternal(eventName, elIndex, new locals_1.Locals(this.locals, locals));
        this.markPathToRootAsCheckOnce();
        return res;
      } catch (e) {
        var c = this.dispatcher.getDebugContext(null, elIndex, null);
        var context = lang_1.isPresent(c) ? new exceptions_1.EventEvaluationErrorContext(c.element, c.componentElement, c.context, c.locals, c.injector) : null;
        throw new exceptions_1.EventEvaluationError(eventName, e, e.stack, context);
      }
    };
    AbstractChangeDetector.prototype.handleEventInternal = function(eventName, elIndex, locals) {
      return false;
    };
    AbstractChangeDetector.prototype.detectChanges = function() {
      this.runDetectChanges(false);
    };
    AbstractChangeDetector.prototype.checkNoChanges = function() {
      if (lang_1.assertionsEnabled()) {
        this.runDetectChanges(true);
      }
    };
    AbstractChangeDetector.prototype.runDetectChanges = function(throwOnChange) {
      if (this.mode === constants_1.ChangeDetectionStrategy.Detached || this.mode === constants_1.ChangeDetectionStrategy.Checked || this.state === constants_1.ChangeDetectorState.Errored)
        return;
      var s = _scope_check(this.id, throwOnChange);
      this.detectChangesInRecords(throwOnChange);
      this._detectChangesContentChildren(throwOnChange);
      if (!throwOnChange)
        this.afterContentLifecycleCallbacks();
      this._detectChangesInViewChildren(throwOnChange);
      if (!throwOnChange)
        this.afterViewLifecycleCallbacks();
      if (this.mode === constants_1.ChangeDetectionStrategy.CheckOnce)
        this.mode = constants_1.ChangeDetectionStrategy.Checked;
      this.state = constants_1.ChangeDetectorState.CheckedBefore;
      profile_1.wtfLeave(s);
    };
    AbstractChangeDetector.prototype.detectChangesInRecords = function(throwOnChange) {
      if (!this.hydrated()) {
        this.throwDehydratedError(this.id);
      }
      try {
        this.detectChangesInRecordsInternal(throwOnChange);
      } catch (e) {
        if (!(e instanceof exceptions_1.ExpressionChangedAfterItHasBeenCheckedException)) {
          this.state = constants_1.ChangeDetectorState.Errored;
        }
        this._throwError(e, e.stack);
      }
    };
    AbstractChangeDetector.prototype.detectChangesInRecordsInternal = function(throwOnChange) {};
    AbstractChangeDetector.prototype.hydrate = function(context, locals, dispatcher, pipes) {
      this.dispatcher = dispatcher;
      this.mode = change_detection_util_1.ChangeDetectionUtil.changeDetectionMode(this.strategy);
      this.context = context;
      this.locals = locals;
      this.pipes = pipes;
      this.hydrateDirectives(dispatcher);
      this.state = constants_1.ChangeDetectorState.NeverChecked;
    };
    AbstractChangeDetector.prototype.hydrateDirectives = function(dispatcher) {};
    AbstractChangeDetector.prototype.dehydrate = function() {
      this.dehydrateDirectives(true);
      this._unsubscribeFromOutputs();
      this.dispatcher = null;
      this.context = null;
      this.locals = null;
      this.pipes = null;
    };
    AbstractChangeDetector.prototype.dehydrateDirectives = function(destroyPipes) {};
    AbstractChangeDetector.prototype.hydrated = function() {
      return lang_1.isPresent(this.context);
    };
    AbstractChangeDetector.prototype.destroyRecursive = function() {
      this.dispatcher.notifyOnDestroy();
      this.dehydrate();
      var children = this.contentChildren;
      for (var i = 0; i < children.length; i++) {
        children[i].destroyRecursive();
      }
      children = this.viewChildren;
      for (var i = 0; i < children.length; i++) {
        children[i].destroyRecursive();
      }
    };
    AbstractChangeDetector.prototype.afterContentLifecycleCallbacks = function() {
      this.dispatcher.notifyAfterContentChecked();
      this.afterContentLifecycleCallbacksInternal();
    };
    AbstractChangeDetector.prototype.afterContentLifecycleCallbacksInternal = function() {};
    AbstractChangeDetector.prototype.afterViewLifecycleCallbacks = function() {
      this.dispatcher.notifyAfterViewChecked();
      this.afterViewLifecycleCallbacksInternal();
    };
    AbstractChangeDetector.prototype.afterViewLifecycleCallbacksInternal = function() {};
    AbstractChangeDetector.prototype._detectChangesContentChildren = function(throwOnChange) {
      var c = this.contentChildren;
      for (var i = 0; i < c.length; ++i) {
        c[i].runDetectChanges(throwOnChange);
      }
    };
    AbstractChangeDetector.prototype._detectChangesInViewChildren = function(throwOnChange) {
      var c = this.viewChildren;
      for (var i = 0; i < c.length; ++i) {
        c[i].runDetectChanges(throwOnChange);
      }
    };
    AbstractChangeDetector.prototype.markAsCheckOnce = function() {
      this.mode = constants_1.ChangeDetectionStrategy.CheckOnce;
    };
    AbstractChangeDetector.prototype.markPathToRootAsCheckOnce = function() {
      var c = this;
      while (lang_1.isPresent(c) && c.mode !== constants_1.ChangeDetectionStrategy.Detached) {
        if (c.mode === constants_1.ChangeDetectionStrategy.Checked)
          c.mode = constants_1.ChangeDetectionStrategy.CheckOnce;
        c = c.parent;
      }
    };
    AbstractChangeDetector.prototype._unsubscribeFromOutputs = function() {
      if (lang_1.isPresent(this.outputSubscriptions)) {
        for (var i = 0; i < this.outputSubscriptions.length; ++i) {
          async_1.ObservableWrapper.dispose(this.outputSubscriptions[i]);
          this.outputSubscriptions[i] = null;
        }
      }
    };
    AbstractChangeDetector.prototype.getDirectiveFor = function(directives, index) {
      return directives.getDirectiveFor(this.directiveIndices[index]);
    };
    AbstractChangeDetector.prototype.getDetectorFor = function(directives, index) {
      return directives.getDetectorFor(this.directiveIndices[index]);
    };
    AbstractChangeDetector.prototype.notifyDispatcher = function(value) {
      this.dispatcher.notifyOnBinding(this._currentBinding(), value);
    };
    AbstractChangeDetector.prototype.logBindingUpdate = function(value) {
      this.dispatcher.logBindingUpdate(this._currentBinding(), value);
    };
    AbstractChangeDetector.prototype.addChange = function(changes, oldValue, newValue) {
      if (lang_1.isBlank(changes)) {
        changes = {};
      }
      changes[this._currentBinding().name] = change_detection_util_1.ChangeDetectionUtil.simpleChange(oldValue, newValue);
      return changes;
    };
    AbstractChangeDetector.prototype._throwError = function(exception, stack) {
      var error;
      try {
        var c = this.dispatcher.getDebugContext(null, this._currentBinding().elementIndex, null);
        var context = lang_1.isPresent(c) ? new _Context(c.element, c.componentElement, c.context, c.locals, c.injector, this._currentBinding().debug) : null;
        error = new exceptions_1.ChangeDetectionError(this._currentBinding().debug, exception, stack, context);
      } catch (e) {
        error = new exceptions_1.ChangeDetectionError(null, exception, stack, null);
      }
      throw error;
    };
    AbstractChangeDetector.prototype.throwOnChangeError = function(oldValue, newValue) {
      throw new exceptions_1.ExpressionChangedAfterItHasBeenCheckedException(this._currentBinding().debug, oldValue, newValue, null);
    };
    AbstractChangeDetector.prototype.throwDehydratedError = function(detail) {
      throw new exceptions_1.DehydratedException(detail);
    };
    AbstractChangeDetector.prototype._currentBinding = function() {
      return this.bindingTargets[this.propertyBindingIndex];
    };
    return AbstractChangeDetector;
  })();
  exports.AbstractChangeDetector = AbstractChangeDetector;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/proto_record.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(RecordType) {
    RecordType[RecordType["Self"] = 0] = "Self";
    RecordType[RecordType["Const"] = 1] = "Const";
    RecordType[RecordType["PrimitiveOp"] = 2] = "PrimitiveOp";
    RecordType[RecordType["PropertyRead"] = 3] = "PropertyRead";
    RecordType[RecordType["PropertyWrite"] = 4] = "PropertyWrite";
    RecordType[RecordType["Local"] = 5] = "Local";
    RecordType[RecordType["InvokeMethod"] = 6] = "InvokeMethod";
    RecordType[RecordType["InvokeClosure"] = 7] = "InvokeClosure";
    RecordType[RecordType["KeyedRead"] = 8] = "KeyedRead";
    RecordType[RecordType["KeyedWrite"] = 9] = "KeyedWrite";
    RecordType[RecordType["Pipe"] = 10] = "Pipe";
    RecordType[RecordType["Interpolate"] = 11] = "Interpolate";
    RecordType[RecordType["SafeProperty"] = 12] = "SafeProperty";
    RecordType[RecordType["CollectionLiteral"] = 13] = "CollectionLiteral";
    RecordType[RecordType["SafeMethodInvoke"] = 14] = "SafeMethodInvoke";
    RecordType[RecordType["DirectiveLifecycle"] = 15] = "DirectiveLifecycle";
    RecordType[RecordType["Chain"] = 16] = "Chain";
    RecordType[RecordType["SkipRecordsIf"] = 17] = "SkipRecordsIf";
    RecordType[RecordType["SkipRecordsIfNot"] = 18] = "SkipRecordsIfNot";
    RecordType[RecordType["SkipRecords"] = 19] = "SkipRecords";
  })(exports.RecordType || (exports.RecordType = {}));
  var RecordType = exports.RecordType;
  var ProtoRecord = (function() {
    function ProtoRecord(mode, name, funcOrValue, args, fixedArgs, contextIndex, directiveIndex, selfIndex, bindingRecord, lastInBinding, lastInDirective, argumentToPureFunction, referencedBySelf, propertyBindingIndex) {
      this.mode = mode;
      this.name = name;
      this.funcOrValue = funcOrValue;
      this.args = args;
      this.fixedArgs = fixedArgs;
      this.contextIndex = contextIndex;
      this.directiveIndex = directiveIndex;
      this.selfIndex = selfIndex;
      this.bindingRecord = bindingRecord;
      this.lastInBinding = lastInBinding;
      this.lastInDirective = lastInDirective;
      this.argumentToPureFunction = argumentToPureFunction;
      this.referencedBySelf = referencedBySelf;
      this.propertyBindingIndex = propertyBindingIndex;
    }
    ProtoRecord.prototype.isPureFunction = function() {
      return this.mode === RecordType.Interpolate || this.mode === RecordType.CollectionLiteral;
    };
    ProtoRecord.prototype.isUsedByOtherRecord = function() {
      return !this.lastInBinding || this.referencedBySelf;
    };
    ProtoRecord.prototype.shouldBeChecked = function() {
      return this.argumentToPureFunction || this.lastInBinding || this.isPureFunction() || this.isPipeRecord();
    };
    ProtoRecord.prototype.isPipeRecord = function() {
      return this.mode === RecordType.Pipe;
    };
    ProtoRecord.prototype.isConditionalSkipRecord = function() {
      return this.mode === RecordType.SkipRecordsIfNot || this.mode === RecordType.SkipRecordsIf;
    };
    ProtoRecord.prototype.isUnconditionalSkipRecord = function() {
      return this.mode === RecordType.SkipRecords;
    };
    ProtoRecord.prototype.isSkipRecord = function() {
      return this.isConditionalSkipRecord() || this.isUnconditionalSkipRecord();
    };
    ProtoRecord.prototype.isLifeCycleRecord = function() {
      return this.mode === RecordType.DirectiveLifecycle;
    };
    return ProtoRecord;
  })();
  exports.ProtoRecord = ProtoRecord;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/dynamic_change_detector.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/change_detection/abstract_change_detector.js", "node_modules/angular2/src/core/change_detection/change_detection_util.js", "node_modules/angular2/src/core/change_detection/constants.js", "node_modules/angular2/src/core/change_detection/proto_record.js", "node_modules/angular2/src/core/reflection/reflection.js", "node_modules/angular2/src/facade/async.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var abstract_change_detector_1 = $__require('node_modules/angular2/src/core/change_detection/abstract_change_detector.js');
  var change_detection_util_1 = $__require('node_modules/angular2/src/core/change_detection/change_detection_util.js');
  var constants_1 = $__require('node_modules/angular2/src/core/change_detection/constants.js');
  var proto_record_1 = $__require('node_modules/angular2/src/core/change_detection/proto_record.js');
  var reflection_1 = $__require('node_modules/angular2/src/core/reflection/reflection.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var DynamicChangeDetector = (function(_super) {
    __extends(DynamicChangeDetector, _super);
    function DynamicChangeDetector(id, numberOfPropertyProtoRecords, propertyBindingTargets, directiveIndices, strategy, _records, _eventBindings, _directiveRecords, _genConfig) {
      _super.call(this, id, numberOfPropertyProtoRecords, propertyBindingTargets, directiveIndices, strategy);
      this._records = _records;
      this._eventBindings = _eventBindings;
      this._directiveRecords = _directiveRecords;
      this._genConfig = _genConfig;
      var len = _records.length + 1;
      this.values = collection_1.ListWrapper.createFixedSize(len);
      this.localPipes = collection_1.ListWrapper.createFixedSize(len);
      this.prevContexts = collection_1.ListWrapper.createFixedSize(len);
      this.changes = collection_1.ListWrapper.createFixedSize(len);
      this.dehydrateDirectives(false);
    }
    DynamicChangeDetector.prototype.handleEventInternal = function(eventName, elIndex, locals) {
      var _this = this;
      var preventDefault = false;
      this._matchingEventBindings(eventName, elIndex).forEach(function(rec) {
        var res = _this._processEventBinding(rec, locals);
        if (res === false) {
          preventDefault = true;
        }
      });
      return preventDefault;
    };
    DynamicChangeDetector.prototype._processEventBinding = function(eb, locals) {
      var values = collection_1.ListWrapper.createFixedSize(eb.records.length);
      values[0] = this.values[0];
      for (var protoIdx = 0; protoIdx < eb.records.length; ++protoIdx) {
        var proto = eb.records[protoIdx];
        if (proto.isSkipRecord()) {
          protoIdx += this._computeSkipLength(protoIdx, proto, values);
        } else {
          if (proto.lastInBinding) {
            this._markPathAsCheckOnce(proto);
          }
          var res = this._calculateCurrValue(proto, values, locals);
          if (proto.lastInBinding) {
            return res;
          } else {
            this._writeSelf(proto, res, values);
          }
        }
      }
      throw new exceptions_1.BaseException("Cannot be reached");
    };
    DynamicChangeDetector.prototype._computeSkipLength = function(protoIndex, proto, values) {
      if (proto.mode === proto_record_1.RecordType.SkipRecords) {
        return proto.fixedArgs[0] - protoIndex - 1;
      }
      if (proto.mode === proto_record_1.RecordType.SkipRecordsIf) {
        var condition = this._readContext(proto, values);
        return condition ? proto.fixedArgs[0] - protoIndex - 1 : 0;
      }
      if (proto.mode === proto_record_1.RecordType.SkipRecordsIfNot) {
        var condition = this._readContext(proto, values);
        return condition ? 0 : proto.fixedArgs[0] - protoIndex - 1;
      }
      throw new exceptions_1.BaseException("Cannot be reached");
    };
    DynamicChangeDetector.prototype._markPathAsCheckOnce = function(proto) {
      if (!proto.bindingRecord.isDefaultChangeDetection()) {
        var dir = proto.bindingRecord.directiveRecord;
        this._getDetectorFor(dir.directiveIndex).markPathToRootAsCheckOnce();
      }
    };
    DynamicChangeDetector.prototype._matchingEventBindings = function(eventName, elIndex) {
      return this._eventBindings.filter(function(eb) {
        return eb.eventName == eventName && eb.elIndex === elIndex;
      });
    };
    DynamicChangeDetector.prototype.hydrateDirectives = function(dispatcher) {
      var _this = this;
      this.values[0] = this.context;
      this.dispatcher = dispatcher;
      this.outputSubscriptions = [];
      for (var i = 0; i < this._directiveRecords.length; ++i) {
        var r = this._directiveRecords[i];
        if (lang_1.isPresent(r.outputs)) {
          r.outputs.forEach(function(output) {
            var eventHandler = _this._createEventHandler(r.directiveIndex.elementIndex, output[1]);
            var directive = _this._getDirectiveFor(r.directiveIndex);
            var getter = reflection_1.reflector.getter(output[0]);
            _this.outputSubscriptions.push(async_1.ObservableWrapper.subscribe(getter(directive), eventHandler));
          });
        }
      }
    };
    DynamicChangeDetector.prototype._createEventHandler = function(boundElementIndex, eventName) {
      var _this = this;
      return function(event) {
        return _this.handleEvent(eventName, boundElementIndex, event);
      };
    };
    DynamicChangeDetector.prototype.dehydrateDirectives = function(destroyPipes) {
      if (destroyPipes) {
        this._destroyPipes();
        this._destroyDirectives();
      }
      this.values[0] = null;
      collection_1.ListWrapper.fill(this.values, change_detection_util_1.ChangeDetectionUtil.uninitialized, 1);
      collection_1.ListWrapper.fill(this.changes, false);
      collection_1.ListWrapper.fill(this.localPipes, null);
      collection_1.ListWrapper.fill(this.prevContexts, change_detection_util_1.ChangeDetectionUtil.uninitialized);
    };
    DynamicChangeDetector.prototype._destroyPipes = function() {
      for (var i = 0; i < this.localPipes.length; ++i) {
        if (lang_1.isPresent(this.localPipes[i])) {
          change_detection_util_1.ChangeDetectionUtil.callPipeOnDestroy(this.localPipes[i]);
        }
      }
    };
    DynamicChangeDetector.prototype._destroyDirectives = function() {
      for (var i = 0; i < this._directiveRecords.length; ++i) {
        var record = this._directiveRecords[i];
        if (record.callOnDestroy) {
          this._getDirectiveFor(record.directiveIndex).ngOnDestroy();
        }
      }
    };
    DynamicChangeDetector.prototype.checkNoChanges = function() {
      this.runDetectChanges(true);
    };
    DynamicChangeDetector.prototype.detectChangesInRecordsInternal = function(throwOnChange) {
      var protos = this._records;
      var changes = null;
      var isChanged = false;
      for (var protoIdx = 0; protoIdx < protos.length; ++protoIdx) {
        var proto = protos[protoIdx];
        var bindingRecord = proto.bindingRecord;
        var directiveRecord = bindingRecord.directiveRecord;
        if (this._firstInBinding(proto)) {
          this.propertyBindingIndex = proto.propertyBindingIndex;
        }
        if (proto.isLifeCycleRecord()) {
          if (proto.name === "DoCheck" && !throwOnChange) {
            this._getDirectiveFor(directiveRecord.directiveIndex).ngDoCheck();
          } else if (proto.name === "OnInit" && !throwOnChange && this.state == constants_1.ChangeDetectorState.NeverChecked) {
            this._getDirectiveFor(directiveRecord.directiveIndex).ngOnInit();
          } else if (proto.name === "OnChanges" && lang_1.isPresent(changes) && !throwOnChange) {
            this._getDirectiveFor(directiveRecord.directiveIndex).ngOnChanges(changes);
          }
        } else if (proto.isSkipRecord()) {
          protoIdx += this._computeSkipLength(protoIdx, proto, this.values);
        } else {
          var change = this._check(proto, throwOnChange, this.values, this.locals);
          if (lang_1.isPresent(change)) {
            this._updateDirectiveOrElement(change, bindingRecord);
            isChanged = true;
            changes = this._addChange(bindingRecord, change, changes);
          }
        }
        if (proto.lastInDirective) {
          changes = null;
          if (isChanged && !bindingRecord.isDefaultChangeDetection()) {
            this._getDetectorFor(directiveRecord.directiveIndex).markAsCheckOnce();
          }
          isChanged = false;
        }
      }
    };
    DynamicChangeDetector.prototype._firstInBinding = function(r) {
      var prev = change_detection_util_1.ChangeDetectionUtil.protoByIndex(this._records, r.selfIndex - 1);
      return lang_1.isBlank(prev) || prev.bindingRecord !== r.bindingRecord;
    };
    DynamicChangeDetector.prototype.afterContentLifecycleCallbacksInternal = function() {
      var dirs = this._directiveRecords;
      for (var i = dirs.length - 1; i >= 0; --i) {
        var dir = dirs[i];
        if (dir.callAfterContentInit && this.state == constants_1.ChangeDetectorState.NeverChecked) {
          this._getDirectiveFor(dir.directiveIndex).ngAfterContentInit();
        }
        if (dir.callAfterContentChecked) {
          this._getDirectiveFor(dir.directiveIndex).ngAfterContentChecked();
        }
      }
    };
    DynamicChangeDetector.prototype.afterViewLifecycleCallbacksInternal = function() {
      var dirs = this._directiveRecords;
      for (var i = dirs.length - 1; i >= 0; --i) {
        var dir = dirs[i];
        if (dir.callAfterViewInit && this.state == constants_1.ChangeDetectorState.NeverChecked) {
          this._getDirectiveFor(dir.directiveIndex).ngAfterViewInit();
        }
        if (dir.callAfterViewChecked) {
          this._getDirectiveFor(dir.directiveIndex).ngAfterViewChecked();
        }
      }
    };
    DynamicChangeDetector.prototype._updateDirectiveOrElement = function(change, bindingRecord) {
      if (lang_1.isBlank(bindingRecord.directiveRecord)) {
        _super.prototype.notifyDispatcher.call(this, change.currentValue);
      } else {
        var directiveIndex = bindingRecord.directiveRecord.directiveIndex;
        bindingRecord.setter(this._getDirectiveFor(directiveIndex), change.currentValue);
      }
      if (this._genConfig.logBindingUpdate) {
        _super.prototype.logBindingUpdate.call(this, change.currentValue);
      }
    };
    DynamicChangeDetector.prototype._addChange = function(bindingRecord, change, changes) {
      if (bindingRecord.callOnChanges()) {
        return _super.prototype.addChange.call(this, changes, change.previousValue, change.currentValue);
      } else {
        return changes;
      }
    };
    DynamicChangeDetector.prototype._getDirectiveFor = function(directiveIndex) {
      return this.dispatcher.getDirectiveFor(directiveIndex);
    };
    DynamicChangeDetector.prototype._getDetectorFor = function(directiveIndex) {
      return this.dispatcher.getDetectorFor(directiveIndex);
    };
    DynamicChangeDetector.prototype._check = function(proto, throwOnChange, values, locals) {
      if (proto.isPipeRecord()) {
        return this._pipeCheck(proto, throwOnChange, values);
      } else {
        return this._referenceCheck(proto, throwOnChange, values, locals);
      }
    };
    DynamicChangeDetector.prototype._referenceCheck = function(proto, throwOnChange, values, locals) {
      if (this._pureFuncAndArgsDidNotChange(proto)) {
        this._setChanged(proto, false);
        return null;
      }
      var currValue = this._calculateCurrValue(proto, values, locals);
      if (proto.shouldBeChecked()) {
        var prevValue = this._readSelf(proto, values);
        var detectedChange = throwOnChange ? !change_detection_util_1.ChangeDetectionUtil.devModeEqual(prevValue, currValue) : change_detection_util_1.ChangeDetectionUtil.looseNotIdentical(prevValue, currValue);
        if (detectedChange) {
          if (proto.lastInBinding) {
            var change = change_detection_util_1.ChangeDetectionUtil.simpleChange(prevValue, currValue);
            if (throwOnChange)
              this.throwOnChangeError(prevValue, currValue);
            this._writeSelf(proto, currValue, values);
            this._setChanged(proto, true);
            return change;
          } else {
            this._writeSelf(proto, currValue, values);
            this._setChanged(proto, true);
            return null;
          }
        } else {
          this._setChanged(proto, false);
          return null;
        }
      } else {
        this._writeSelf(proto, currValue, values);
        this._setChanged(proto, true);
        return null;
      }
    };
    DynamicChangeDetector.prototype._calculateCurrValue = function(proto, values, locals) {
      switch (proto.mode) {
        case proto_record_1.RecordType.Self:
          return this._readContext(proto, values);
        case proto_record_1.RecordType.Const:
          return proto.funcOrValue;
        case proto_record_1.RecordType.PropertyRead:
          var context = this._readContext(proto, values);
          return proto.funcOrValue(context);
        case proto_record_1.RecordType.SafeProperty:
          var context = this._readContext(proto, values);
          return lang_1.isBlank(context) ? null : proto.funcOrValue(context);
        case proto_record_1.RecordType.PropertyWrite:
          var context = this._readContext(proto, values);
          var value = this._readArgs(proto, values)[0];
          proto.funcOrValue(context, value);
          return value;
        case proto_record_1.RecordType.KeyedWrite:
          var context = this._readContext(proto, values);
          var key = this._readArgs(proto, values)[0];
          var value = this._readArgs(proto, values)[1];
          context[key] = value;
          return value;
        case proto_record_1.RecordType.Local:
          return locals.get(proto.name);
        case proto_record_1.RecordType.InvokeMethod:
          var context = this._readContext(proto, values);
          var args = this._readArgs(proto, values);
          return proto.funcOrValue(context, args);
        case proto_record_1.RecordType.SafeMethodInvoke:
          var context = this._readContext(proto, values);
          if (lang_1.isBlank(context)) {
            return null;
          }
          var args = this._readArgs(proto, values);
          return proto.funcOrValue(context, args);
        case proto_record_1.RecordType.KeyedRead:
          var arg = this._readArgs(proto, values)[0];
          return this._readContext(proto, values)[arg];
        case proto_record_1.RecordType.Chain:
          var args = this._readArgs(proto, values);
          return args[args.length - 1];
        case proto_record_1.RecordType.InvokeClosure:
          return lang_1.FunctionWrapper.apply(this._readContext(proto, values), this._readArgs(proto, values));
        case proto_record_1.RecordType.Interpolate:
        case proto_record_1.RecordType.PrimitiveOp:
        case proto_record_1.RecordType.CollectionLiteral:
          return lang_1.FunctionWrapper.apply(proto.funcOrValue, this._readArgs(proto, values));
        default:
          throw new exceptions_1.BaseException("Unknown operation " + proto.mode);
      }
    };
    DynamicChangeDetector.prototype._pipeCheck = function(proto, throwOnChange, values) {
      var context = this._readContext(proto, values);
      var selectedPipe = this._pipeFor(proto, context);
      if (!selectedPipe.pure || this._argsOrContextChanged(proto)) {
        var args = this._readArgs(proto, values);
        var currValue = selectedPipe.pipe.transform(context, args);
        if (proto.shouldBeChecked()) {
          var prevValue = this._readSelf(proto, values);
          var detectedChange = throwOnChange ? !change_detection_util_1.ChangeDetectionUtil.devModeEqual(prevValue, currValue) : change_detection_util_1.ChangeDetectionUtil.looseNotIdentical(prevValue, currValue);
          if (detectedChange) {
            currValue = change_detection_util_1.ChangeDetectionUtil.unwrapValue(currValue);
            if (proto.lastInBinding) {
              var change = change_detection_util_1.ChangeDetectionUtil.simpleChange(prevValue, currValue);
              if (throwOnChange)
                this.throwOnChangeError(prevValue, currValue);
              this._writeSelf(proto, currValue, values);
              this._setChanged(proto, true);
              return change;
            } else {
              this._writeSelf(proto, currValue, values);
              this._setChanged(proto, true);
              return null;
            }
          } else {
            this._setChanged(proto, false);
            return null;
          }
        } else {
          this._writeSelf(proto, currValue, values);
          this._setChanged(proto, true);
          return null;
        }
      }
    };
    DynamicChangeDetector.prototype._pipeFor = function(proto, context) {
      var storedPipe = this._readPipe(proto);
      if (lang_1.isPresent(storedPipe))
        return storedPipe;
      var pipe = this.pipes.get(proto.name);
      this._writePipe(proto, pipe);
      return pipe;
    };
    DynamicChangeDetector.prototype._readContext = function(proto, values) {
      if (proto.contextIndex == -1) {
        return this._getDirectiveFor(proto.directiveIndex);
      }
      return values[proto.contextIndex];
    };
    DynamicChangeDetector.prototype._readSelf = function(proto, values) {
      return values[proto.selfIndex];
    };
    DynamicChangeDetector.prototype._writeSelf = function(proto, value, values) {
      values[proto.selfIndex] = value;
    };
    DynamicChangeDetector.prototype._readPipe = function(proto) {
      return this.localPipes[proto.selfIndex];
    };
    DynamicChangeDetector.prototype._writePipe = function(proto, value) {
      this.localPipes[proto.selfIndex] = value;
    };
    DynamicChangeDetector.prototype._setChanged = function(proto, value) {
      if (proto.argumentToPureFunction)
        this.changes[proto.selfIndex] = value;
    };
    DynamicChangeDetector.prototype._pureFuncAndArgsDidNotChange = function(proto) {
      return proto.isPureFunction() && !this._argsChanged(proto);
    };
    DynamicChangeDetector.prototype._argsChanged = function(proto) {
      var args = proto.args;
      for (var i = 0; i < args.length; ++i) {
        if (this.changes[args[i]]) {
          return true;
        }
      }
      return false;
    };
    DynamicChangeDetector.prototype._argsOrContextChanged = function(proto) {
      return this._argsChanged(proto) || this.changes[proto.contextIndex];
    };
    DynamicChangeDetector.prototype._readArgs = function(proto, values) {
      var res = collection_1.ListWrapper.createFixedSize(proto.args.length);
      var args = proto.args;
      for (var i = 0; i < args.length; ++i) {
        res[i] = values[args[i]];
      }
      return res;
    };
    return DynamicChangeDetector;
  })(abstract_change_detector_1.AbstractChangeDetector);
  exports.DynamicChangeDetector = DynamicChangeDetector;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/change_detector_ref.js", ["node_modules/angular2/src/core/change_detection/constants.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var constants_1 = $__require('node_modules/angular2/src/core/change_detection/constants.js');
  var ChangeDetectorRef = (function() {
    function ChangeDetectorRef() {}
    return ChangeDetectorRef;
  })();
  exports.ChangeDetectorRef = ChangeDetectorRef;
  var ChangeDetectorRef_ = (function(_super) {
    __extends(ChangeDetectorRef_, _super);
    function ChangeDetectorRef_(_cd) {
      _super.call(this);
      this._cd = _cd;
    }
    ChangeDetectorRef_.prototype.markForCheck = function() {
      this._cd.markPathToRootAsCheckOnce();
    };
    ChangeDetectorRef_.prototype.detach = function() {
      this._cd.mode = constants_1.ChangeDetectionStrategy.Detached;
    };
    ChangeDetectorRef_.prototype.detectChanges = function() {
      this._cd.detectChanges();
    };
    ChangeDetectorRef_.prototype.checkNoChanges = function() {
      this._cd.checkNoChanges();
    };
    ChangeDetectorRef_.prototype.reattach = function() {
      this._cd.mode = constants_1.ChangeDetectionStrategy.CheckAlways;
      this.markForCheck();
    };
    return ChangeDetectorRef_;
  })(ChangeDetectorRef);
  exports.ChangeDetectorRef_ = ChangeDetectorRef_;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/pipe_lifecycle_reflector.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function implementsOnDestroy(pipe) {
    return pipe.constructor.prototype.ngOnDestroy;
  }
  exports.implementsOnDestroy = implementsOnDestroy;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/binding_record.js", ["node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var DIRECTIVE_LIFECYCLE = "directiveLifecycle";
  var BINDING = "native";
  var DIRECTIVE = "directive";
  var ELEMENT_PROPERTY = "elementProperty";
  var ELEMENT_ATTRIBUTE = "elementAttribute";
  var ELEMENT_CLASS = "elementClass";
  var ELEMENT_STYLE = "elementStyle";
  var TEXT_NODE = "textNode";
  var EVENT = "event";
  var HOST_EVENT = "hostEvent";
  var BindingTarget = (function() {
    function BindingTarget(mode, elementIndex, name, unit, debug) {
      this.mode = mode;
      this.elementIndex = elementIndex;
      this.name = name;
      this.unit = unit;
      this.debug = debug;
    }
    BindingTarget.prototype.isDirective = function() {
      return this.mode === DIRECTIVE;
    };
    BindingTarget.prototype.isElementProperty = function() {
      return this.mode === ELEMENT_PROPERTY;
    };
    BindingTarget.prototype.isElementAttribute = function() {
      return this.mode === ELEMENT_ATTRIBUTE;
    };
    BindingTarget.prototype.isElementClass = function() {
      return this.mode === ELEMENT_CLASS;
    };
    BindingTarget.prototype.isElementStyle = function() {
      return this.mode === ELEMENT_STYLE;
    };
    BindingTarget.prototype.isTextNode = function() {
      return this.mode === TEXT_NODE;
    };
    return BindingTarget;
  })();
  exports.BindingTarget = BindingTarget;
  var BindingRecord = (function() {
    function BindingRecord(mode, target, implicitReceiver, ast, setter, lifecycleEvent, directiveRecord) {
      this.mode = mode;
      this.target = target;
      this.implicitReceiver = implicitReceiver;
      this.ast = ast;
      this.setter = setter;
      this.lifecycleEvent = lifecycleEvent;
      this.directiveRecord = directiveRecord;
    }
    BindingRecord.prototype.isDirectiveLifecycle = function() {
      return this.mode === DIRECTIVE_LIFECYCLE;
    };
    BindingRecord.prototype.callOnChanges = function() {
      return lang_1.isPresent(this.directiveRecord) && this.directiveRecord.callOnChanges;
    };
    BindingRecord.prototype.isDefaultChangeDetection = function() {
      return lang_1.isBlank(this.directiveRecord) || this.directiveRecord.isDefaultChangeDetection();
    };
    BindingRecord.createDirectiveDoCheck = function(directiveRecord) {
      return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "DoCheck", directiveRecord);
    };
    BindingRecord.createDirectiveOnInit = function(directiveRecord) {
      return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "OnInit", directiveRecord);
    };
    BindingRecord.createDirectiveOnChanges = function(directiveRecord) {
      return new BindingRecord(DIRECTIVE_LIFECYCLE, null, 0, null, null, "OnChanges", directiveRecord);
    };
    BindingRecord.createForDirective = function(ast, propertyName, setter, directiveRecord) {
      var elementIndex = directiveRecord.directiveIndex.elementIndex;
      var t = new BindingTarget(DIRECTIVE, elementIndex, propertyName, null, ast.toString());
      return new BindingRecord(DIRECTIVE, t, 0, ast, setter, null, directiveRecord);
    };
    BindingRecord.createForElementProperty = function(ast, elementIndex, propertyName) {
      var t = new BindingTarget(ELEMENT_PROPERTY, elementIndex, propertyName, null, ast.toString());
      return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForElementAttribute = function(ast, elementIndex, attributeName) {
      var t = new BindingTarget(ELEMENT_ATTRIBUTE, elementIndex, attributeName, null, ast.toString());
      return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForElementClass = function(ast, elementIndex, className) {
      var t = new BindingTarget(ELEMENT_CLASS, elementIndex, className, null, ast.toString());
      return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForElementStyle = function(ast, elementIndex, styleName, unit) {
      var t = new BindingTarget(ELEMENT_STYLE, elementIndex, styleName, unit, ast.toString());
      return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForHostProperty = function(directiveIndex, ast, propertyName) {
      var t = new BindingTarget(ELEMENT_PROPERTY, directiveIndex.elementIndex, propertyName, null, ast.toString());
      return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    };
    BindingRecord.createForHostAttribute = function(directiveIndex, ast, attributeName) {
      var t = new BindingTarget(ELEMENT_ATTRIBUTE, directiveIndex.elementIndex, attributeName, null, ast.toString());
      return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    };
    BindingRecord.createForHostClass = function(directiveIndex, ast, className) {
      var t = new BindingTarget(ELEMENT_CLASS, directiveIndex.elementIndex, className, null, ast.toString());
      return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    };
    BindingRecord.createForHostStyle = function(directiveIndex, ast, styleName, unit) {
      var t = new BindingTarget(ELEMENT_STYLE, directiveIndex.elementIndex, styleName, unit, ast.toString());
      return new BindingRecord(BINDING, t, directiveIndex, ast, null, null, null);
    };
    BindingRecord.createForTextNode = function(ast, elementIndex) {
      var t = new BindingTarget(TEXT_NODE, elementIndex, null, null, ast.toString());
      return new BindingRecord(BINDING, t, 0, ast, null, null, null);
    };
    BindingRecord.createForEvent = function(ast, eventName, elementIndex) {
      var t = new BindingTarget(EVENT, elementIndex, eventName, null, ast.toString());
      return new BindingRecord(EVENT, t, 0, ast, null, null, null);
    };
    BindingRecord.createForHostEvent = function(ast, eventName, directiveRecord) {
      var directiveIndex = directiveRecord.directiveIndex;
      var t = new BindingTarget(HOST_EVENT, directiveIndex.elementIndex, eventName, null, ast.toString());
      return new BindingRecord(HOST_EVENT, t, directiveIndex, ast, null, null, directiveRecord);
    };
    return BindingRecord;
  })();
  exports.BindingRecord = BindingRecord;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/constants.js", ["node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  (function(ChangeDetectorState) {
    ChangeDetectorState[ChangeDetectorState["NeverChecked"] = 0] = "NeverChecked";
    ChangeDetectorState[ChangeDetectorState["CheckedBefore"] = 1] = "CheckedBefore";
    ChangeDetectorState[ChangeDetectorState["Errored"] = 2] = "Errored";
  })(exports.ChangeDetectorState || (exports.ChangeDetectorState = {}));
  var ChangeDetectorState = exports.ChangeDetectorState;
  (function(ChangeDetectionStrategy) {
    ChangeDetectionStrategy[ChangeDetectionStrategy["CheckOnce"] = 0] = "CheckOnce";
    ChangeDetectionStrategy[ChangeDetectionStrategy["Checked"] = 1] = "Checked";
    ChangeDetectionStrategy[ChangeDetectionStrategy["CheckAlways"] = 2] = "CheckAlways";
    ChangeDetectionStrategy[ChangeDetectionStrategy["Detached"] = 3] = "Detached";
    ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 4] = "OnPush";
    ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 5] = "Default";
  })(exports.ChangeDetectionStrategy || (exports.ChangeDetectionStrategy = {}));
  var ChangeDetectionStrategy = exports.ChangeDetectionStrategy;
  exports.CHANGE_DETECTION_STRATEGY_VALUES = [ChangeDetectionStrategy.CheckOnce, ChangeDetectionStrategy.Checked, ChangeDetectionStrategy.CheckAlways, ChangeDetectionStrategy.Detached, ChangeDetectionStrategy.OnPush, ChangeDetectionStrategy.Default];
  exports.CHANGE_DETECTOR_STATE_VALUES = [ChangeDetectorState.NeverChecked, ChangeDetectorState.CheckedBefore, ChangeDetectorState.Errored];
  function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
    return lang_1.isBlank(changeDetectionStrategy) || changeDetectionStrategy === ChangeDetectionStrategy.Default;
  }
  exports.isDefaultChangeDetectionStrategy = isDefaultChangeDetectionStrategy;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/directive_record.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/core/change_detection/constants.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var constants_1 = $__require('node_modules/angular2/src/core/change_detection/constants.js');
  var DirectiveIndex = (function() {
    function DirectiveIndex(elementIndex, directiveIndex) {
      this.elementIndex = elementIndex;
      this.directiveIndex = directiveIndex;
    }
    Object.defineProperty(DirectiveIndex.prototype, "name", {
      get: function() {
        return this.elementIndex + "_" + this.directiveIndex;
      },
      enumerable: true,
      configurable: true
    });
    return DirectiveIndex;
  })();
  exports.DirectiveIndex = DirectiveIndex;
  var DirectiveRecord = (function() {
    function DirectiveRecord(_a) {
      var _b = _a === void 0 ? {} : _a,
          directiveIndex = _b.directiveIndex,
          callAfterContentInit = _b.callAfterContentInit,
          callAfterContentChecked = _b.callAfterContentChecked,
          callAfterViewInit = _b.callAfterViewInit,
          callAfterViewChecked = _b.callAfterViewChecked,
          callOnChanges = _b.callOnChanges,
          callDoCheck = _b.callDoCheck,
          callOnInit = _b.callOnInit,
          callOnDestroy = _b.callOnDestroy,
          changeDetection = _b.changeDetection,
          outputs = _b.outputs;
      this.directiveIndex = directiveIndex;
      this.callAfterContentInit = lang_1.normalizeBool(callAfterContentInit);
      this.callAfterContentChecked = lang_1.normalizeBool(callAfterContentChecked);
      this.callOnChanges = lang_1.normalizeBool(callOnChanges);
      this.callAfterViewInit = lang_1.normalizeBool(callAfterViewInit);
      this.callAfterViewChecked = lang_1.normalizeBool(callAfterViewChecked);
      this.callDoCheck = lang_1.normalizeBool(callDoCheck);
      this.callOnInit = lang_1.normalizeBool(callOnInit);
      this.callOnDestroy = lang_1.normalizeBool(callOnDestroy);
      this.changeDetection = changeDetection;
      this.outputs = outputs;
    }
    DirectiveRecord.prototype.isDefaultChangeDetection = function() {
      return constants_1.isDefaultChangeDetectionStrategy(this.changeDetection);
    };
    return DirectiveRecord;
  })();
  exports.DirectiveRecord = DirectiveRecord;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/change_detection_util.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/change_detection/constants.js", "node_modules/angular2/src/core/change_detection/pipe_lifecycle_reflector.js", "node_modules/angular2/src/core/change_detection/binding_record.js", "node_modules/angular2/src/core/change_detection/directive_record.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var constants_1 = $__require('node_modules/angular2/src/core/change_detection/constants.js');
  var pipe_lifecycle_reflector_1 = $__require('node_modules/angular2/src/core/change_detection/pipe_lifecycle_reflector.js');
  var binding_record_1 = $__require('node_modules/angular2/src/core/change_detection/binding_record.js');
  var directive_record_1 = $__require('node_modules/angular2/src/core/change_detection/directive_record.js');
  var WrappedValue = (function() {
    function WrappedValue(wrapped) {
      this.wrapped = wrapped;
    }
    WrappedValue.wrap = function(value) {
      var w = _wrappedValues[_wrappedIndex++ % 5];
      w.wrapped = value;
      return w;
    };
    return WrappedValue;
  })();
  exports.WrappedValue = WrappedValue;
  var _wrappedValues = [new WrappedValue(null), new WrappedValue(null), new WrappedValue(null), new WrappedValue(null), new WrappedValue(null)];
  var _wrappedIndex = 0;
  var SimpleChange = (function() {
    function SimpleChange(previousValue, currentValue) {
      this.previousValue = previousValue;
      this.currentValue = currentValue;
    }
    SimpleChange.prototype.isFirstChange = function() {
      return this.previousValue === ChangeDetectionUtil.uninitialized;
    };
    return SimpleChange;
  })();
  exports.SimpleChange = SimpleChange;
  function _simpleChange(previousValue, currentValue) {
    return new SimpleChange(previousValue, currentValue);
  }
  var ChangeDetectionUtil = (function() {
    function ChangeDetectionUtil() {}
    ChangeDetectionUtil.arrayFn0 = function() {
      return [];
    };
    ChangeDetectionUtil.arrayFn1 = function(a1) {
      return [a1];
    };
    ChangeDetectionUtil.arrayFn2 = function(a1, a2) {
      return [a1, a2];
    };
    ChangeDetectionUtil.arrayFn3 = function(a1, a2, a3) {
      return [a1, a2, a3];
    };
    ChangeDetectionUtil.arrayFn4 = function(a1, a2, a3, a4) {
      return [a1, a2, a3, a4];
    };
    ChangeDetectionUtil.arrayFn5 = function(a1, a2, a3, a4, a5) {
      return [a1, a2, a3, a4, a5];
    };
    ChangeDetectionUtil.arrayFn6 = function(a1, a2, a3, a4, a5, a6) {
      return [a1, a2, a3, a4, a5, a6];
    };
    ChangeDetectionUtil.arrayFn7 = function(a1, a2, a3, a4, a5, a6, a7) {
      return [a1, a2, a3, a4, a5, a6, a7];
    };
    ChangeDetectionUtil.arrayFn8 = function(a1, a2, a3, a4, a5, a6, a7, a8) {
      return [a1, a2, a3, a4, a5, a6, a7, a8];
    };
    ChangeDetectionUtil.arrayFn9 = function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      return [a1, a2, a3, a4, a5, a6, a7, a8, a9];
    };
    ChangeDetectionUtil.operation_negate = function(value) {
      return !value;
    };
    ChangeDetectionUtil.operation_add = function(left, right) {
      return left + right;
    };
    ChangeDetectionUtil.operation_subtract = function(left, right) {
      return left - right;
    };
    ChangeDetectionUtil.operation_multiply = function(left, right) {
      return left * right;
    };
    ChangeDetectionUtil.operation_divide = function(left, right) {
      return left / right;
    };
    ChangeDetectionUtil.operation_remainder = function(left, right) {
      return left % right;
    };
    ChangeDetectionUtil.operation_equals = function(left, right) {
      return left == right;
    };
    ChangeDetectionUtil.operation_not_equals = function(left, right) {
      return left != right;
    };
    ChangeDetectionUtil.operation_identical = function(left, right) {
      return left === right;
    };
    ChangeDetectionUtil.operation_not_identical = function(left, right) {
      return left !== right;
    };
    ChangeDetectionUtil.operation_less_then = function(left, right) {
      return left < right;
    };
    ChangeDetectionUtil.operation_greater_then = function(left, right) {
      return left > right;
    };
    ChangeDetectionUtil.operation_less_or_equals_then = function(left, right) {
      return left <= right;
    };
    ChangeDetectionUtil.operation_greater_or_equals_then = function(left, right) {
      return left >= right;
    };
    ChangeDetectionUtil.cond = function(cond, trueVal, falseVal) {
      return cond ? trueVal : falseVal;
    };
    ChangeDetectionUtil.mapFn = function(keys) {
      function buildMap(values) {
        var res = collection_1.StringMapWrapper.create();
        for (var i = 0; i < keys.length; ++i) {
          collection_1.StringMapWrapper.set(res, keys[i], values[i]);
        }
        return res;
      }
      switch (keys.length) {
        case 0:
          return function() {
            return [];
          };
        case 1:
          return function(a1) {
            return buildMap([a1]);
          };
        case 2:
          return function(a1, a2) {
            return buildMap([a1, a2]);
          };
        case 3:
          return function(a1, a2, a3) {
            return buildMap([a1, a2, a3]);
          };
        case 4:
          return function(a1, a2, a3, a4) {
            return buildMap([a1, a2, a3, a4]);
          };
        case 5:
          return function(a1, a2, a3, a4, a5) {
            return buildMap([a1, a2, a3, a4, a5]);
          };
        case 6:
          return function(a1, a2, a3, a4, a5, a6) {
            return buildMap([a1, a2, a3, a4, a5, a6]);
          };
        case 7:
          return function(a1, a2, a3, a4, a5, a6, a7) {
            return buildMap([a1, a2, a3, a4, a5, a6, a7]);
          };
        case 8:
          return function(a1, a2, a3, a4, a5, a6, a7, a8) {
            return buildMap([a1, a2, a3, a4, a5, a6, a7, a8]);
          };
        case 9:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            return buildMap([a1, a2, a3, a4, a5, a6, a7, a8, a9]);
          };
        default:
          throw new exceptions_1.BaseException("Does not support literal maps with more than 9 elements");
      }
    };
    ChangeDetectionUtil.keyedAccess = function(obj, args) {
      return obj[args[0]];
    };
    ChangeDetectionUtil.unwrapValue = function(value) {
      if (value instanceof WrappedValue) {
        return value.wrapped;
      } else {
        return value;
      }
    };
    ChangeDetectionUtil.changeDetectionMode = function(strategy) {
      return constants_1.isDefaultChangeDetectionStrategy(strategy) ? constants_1.ChangeDetectionStrategy.CheckAlways : constants_1.ChangeDetectionStrategy.CheckOnce;
    };
    ChangeDetectionUtil.simpleChange = function(previousValue, currentValue) {
      return _simpleChange(previousValue, currentValue);
    };
    ChangeDetectionUtil.isValueBlank = function(value) {
      return lang_1.isBlank(value);
    };
    ChangeDetectionUtil.s = function(value) {
      return lang_1.isPresent(value) ? "" + value : '';
    };
    ChangeDetectionUtil.protoByIndex = function(protos, selfIndex) {
      return selfIndex < 1 ? null : protos[selfIndex - 1];
    };
    ChangeDetectionUtil.callPipeOnDestroy = function(selectedPipe) {
      if (pipe_lifecycle_reflector_1.implementsOnDestroy(selectedPipe.pipe)) {
        selectedPipe.pipe.ngOnDestroy();
      }
    };
    ChangeDetectionUtil.bindingTarget = function(mode, elementIndex, name, unit, debug) {
      return new binding_record_1.BindingTarget(mode, elementIndex, name, unit, debug);
    };
    ChangeDetectionUtil.directiveIndex = function(elementIndex, directiveIndex) {
      return new directive_record_1.DirectiveIndex(elementIndex, directiveIndex);
    };
    ChangeDetectionUtil.looseNotIdentical = function(a, b) {
      return !lang_1.looseIdentical(a, b);
    };
    ChangeDetectionUtil.devModeEqual = function(a, b) {
      if (collection_1.isListLikeIterable(a) && collection_1.isListLikeIterable(b)) {
        return collection_1.areIterablesEqual(a, b, ChangeDetectionUtil.devModeEqual);
      } else if (!collection_1.isListLikeIterable(a) && !lang_1.isPrimitive(a) && !collection_1.isListLikeIterable(b) && !lang_1.isPrimitive(b)) {
        return true;
      } else {
        return lang_1.looseIdentical(a, b);
      }
    };
    ChangeDetectionUtil.uninitialized = lang_1.CONST_EXPR(new Object());
    return ChangeDetectionUtil;
  })();
  exports.ChangeDetectionUtil = ChangeDetectionUtil;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/change_detection.js", ["node_modules/angular2/src/core/change_detection/differs/iterable_differs.js", "node_modules/angular2/src/core/change_detection/differs/default_iterable_differ.js", "node_modules/angular2/src/core/change_detection/differs/keyvalue_differs.js", "node_modules/angular2/src/core/change_detection/differs/default_keyvalue_differ.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/core/change_detection/parser/ast.js", "node_modules/angular2/src/core/change_detection/parser/lexer.js", "node_modules/angular2/src/core/change_detection/parser/parser.js", "node_modules/angular2/src/core/change_detection/parser/locals.js", "node_modules/angular2/src/core/change_detection/exceptions.js", "node_modules/angular2/src/core/change_detection/interfaces.js", "node_modules/angular2/src/core/change_detection/constants.js", "node_modules/angular2/src/core/change_detection/proto_change_detector.js", "node_modules/angular2/src/core/change_detection/jit_proto_change_detector.js", "node_modules/angular2/src/core/change_detection/binding_record.js", "node_modules/angular2/src/core/change_detection/directive_record.js", "node_modules/angular2/src/core/change_detection/dynamic_change_detector.js", "node_modules/angular2/src/core/change_detection/change_detector_ref.js", "node_modules/angular2/src/core/change_detection/change_detection_util.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var iterable_differs_1 = $__require('node_modules/angular2/src/core/change_detection/differs/iterable_differs.js');
  var default_iterable_differ_1 = $__require('node_modules/angular2/src/core/change_detection/differs/default_iterable_differ.js');
  var keyvalue_differs_1 = $__require('node_modules/angular2/src/core/change_detection/differs/keyvalue_differs.js');
  var default_keyvalue_differ_1 = $__require('node_modules/angular2/src/core/change_detection/differs/default_keyvalue_differ.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var default_keyvalue_differ_2 = $__require('node_modules/angular2/src/core/change_detection/differs/default_keyvalue_differ.js');
  exports.DefaultKeyValueDifferFactory = default_keyvalue_differ_2.DefaultKeyValueDifferFactory;
  exports.KeyValueChangeRecord = default_keyvalue_differ_2.KeyValueChangeRecord;
  var default_iterable_differ_2 = $__require('node_modules/angular2/src/core/change_detection/differs/default_iterable_differ.js');
  exports.DefaultIterableDifferFactory = default_iterable_differ_2.DefaultIterableDifferFactory;
  exports.CollectionChangeRecord = default_iterable_differ_2.CollectionChangeRecord;
  var ast_1 = $__require('node_modules/angular2/src/core/change_detection/parser/ast.js');
  exports.ASTWithSource = ast_1.ASTWithSource;
  exports.AST = ast_1.AST;
  exports.AstTransformer = ast_1.AstTransformer;
  exports.PropertyRead = ast_1.PropertyRead;
  exports.LiteralArray = ast_1.LiteralArray;
  exports.ImplicitReceiver = ast_1.ImplicitReceiver;
  var lexer_1 = $__require('node_modules/angular2/src/core/change_detection/parser/lexer.js');
  exports.Lexer = lexer_1.Lexer;
  var parser_1 = $__require('node_modules/angular2/src/core/change_detection/parser/parser.js');
  exports.Parser = parser_1.Parser;
  var locals_1 = $__require('node_modules/angular2/src/core/change_detection/parser/locals.js');
  exports.Locals = locals_1.Locals;
  var exceptions_1 = $__require('node_modules/angular2/src/core/change_detection/exceptions.js');
  exports.DehydratedException = exceptions_1.DehydratedException;
  exports.ExpressionChangedAfterItHasBeenCheckedException = exceptions_1.ExpressionChangedAfterItHasBeenCheckedException;
  exports.ChangeDetectionError = exceptions_1.ChangeDetectionError;
  var interfaces_1 = $__require('node_modules/angular2/src/core/change_detection/interfaces.js');
  exports.ChangeDetectorDefinition = interfaces_1.ChangeDetectorDefinition;
  exports.DebugContext = interfaces_1.DebugContext;
  exports.ChangeDetectorGenConfig = interfaces_1.ChangeDetectorGenConfig;
  var constants_1 = $__require('node_modules/angular2/src/core/change_detection/constants.js');
  exports.ChangeDetectionStrategy = constants_1.ChangeDetectionStrategy;
  exports.CHANGE_DETECTION_STRATEGY_VALUES = constants_1.CHANGE_DETECTION_STRATEGY_VALUES;
  var proto_change_detector_1 = $__require('node_modules/angular2/src/core/change_detection/proto_change_detector.js');
  exports.DynamicProtoChangeDetector = proto_change_detector_1.DynamicProtoChangeDetector;
  var jit_proto_change_detector_1 = $__require('node_modules/angular2/src/core/change_detection/jit_proto_change_detector.js');
  exports.JitProtoChangeDetector = jit_proto_change_detector_1.JitProtoChangeDetector;
  var binding_record_1 = $__require('node_modules/angular2/src/core/change_detection/binding_record.js');
  exports.BindingRecord = binding_record_1.BindingRecord;
  exports.BindingTarget = binding_record_1.BindingTarget;
  var directive_record_1 = $__require('node_modules/angular2/src/core/change_detection/directive_record.js');
  exports.DirectiveIndex = directive_record_1.DirectiveIndex;
  exports.DirectiveRecord = directive_record_1.DirectiveRecord;
  var dynamic_change_detector_1 = $__require('node_modules/angular2/src/core/change_detection/dynamic_change_detector.js');
  exports.DynamicChangeDetector = dynamic_change_detector_1.DynamicChangeDetector;
  var change_detector_ref_1 = $__require('node_modules/angular2/src/core/change_detection/change_detector_ref.js');
  exports.ChangeDetectorRef = change_detector_ref_1.ChangeDetectorRef;
  var iterable_differs_2 = $__require('node_modules/angular2/src/core/change_detection/differs/iterable_differs.js');
  exports.IterableDiffers = iterable_differs_2.IterableDiffers;
  var keyvalue_differs_2 = $__require('node_modules/angular2/src/core/change_detection/differs/keyvalue_differs.js');
  exports.KeyValueDiffers = keyvalue_differs_2.KeyValueDiffers;
  var change_detection_util_1 = $__require('node_modules/angular2/src/core/change_detection/change_detection_util.js');
  exports.WrappedValue = change_detection_util_1.WrappedValue;
  exports.SimpleChange = change_detection_util_1.SimpleChange;
  exports.keyValDiff = lang_1.CONST_EXPR([lang_1.CONST_EXPR(new default_keyvalue_differ_1.DefaultKeyValueDifferFactory())]);
  exports.iterableDiff = lang_1.CONST_EXPR([lang_1.CONST_EXPR(new default_iterable_differ_1.DefaultIterableDifferFactory())]);
  exports.defaultIterableDiffers = lang_1.CONST_EXPR(new iterable_differs_1.IterableDiffers(exports.iterableDiff));
  exports.defaultKeyValueDiffers = lang_1.CONST_EXPR(new keyvalue_differs_1.KeyValueDiffers(exports.keyValDiff));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/facade/promise.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var PromiseCompleter = (function() {
    function PromiseCompleter() {
      var _this = this;
      this.promise = new Promise(function(res, rej) {
        _this.resolve = res;
        _this.reject = rej;
      });
    }
    return PromiseCompleter;
  })();
  exports.PromiseCompleter = PromiseCompleter;
  var PromiseWrapper = (function() {
    function PromiseWrapper() {}
    PromiseWrapper.resolve = function(obj) {
      return Promise.resolve(obj);
    };
    PromiseWrapper.reject = function(obj, _) {
      return Promise.reject(obj);
    };
    PromiseWrapper.catchError = function(promise, onError) {
      return promise.catch(onError);
    };
    PromiseWrapper.all = function(promises) {
      if (promises.length == 0)
        return Promise.resolve([]);
      return Promise.all(promises);
    };
    PromiseWrapper.then = function(promise, success, rejection) {
      return promise.then(success, rejection);
    };
    PromiseWrapper.wrap = function(computation) {
      return new Promise(function(res, rej) {
        try {
          res(computation());
        } catch (e) {
          rej(e);
        }
      });
    };
    PromiseWrapper.scheduleMicrotask = function(computation) {
      PromiseWrapper.then(PromiseWrapper.resolve(null), computation, function(_) {});
    };
    PromiseWrapper.isPromise = function(obj) {
      return obj instanceof Promise;
    };
    PromiseWrapper.completer = function() {
      return new PromiseCompleter();
    };
    return PromiseWrapper;
  })();
  exports.PromiseWrapper = PromiseWrapper;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/subject/SubjectSubscription.js", ["node_modules/rxjs/Subscription.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscription_1 = $__require('node_modules/rxjs/Subscription.js');
  var SubjectSubscription = (function(_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, observer) {
      _super.call(this);
      this.subject = subject;
      this.observer = observer;
      this.isUnsubscribed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function() {
      if (this.isUnsubscribed) {
        return;
      }
      this.isUnsubscribed = true;
      var subject = this.subject;
      var observers = subject.observers;
      this.subject = null;
      if (!observers || observers.length === 0 || subject.isUnsubscribed) {
        return;
      }
      var subscriberIndex = observers.indexOf(this.observer);
      if (subscriberIndex !== -1) {
        observers.splice(subscriberIndex, 1);
      }
    };
    return SubjectSubscription;
  }(Subscription_1.Subscription));
  exports.SubjectSubscription = SubjectSubscription;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/util/throwError.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function throwError(e) {
    throw e;
  }
  exports.throwError = throwError;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/util/ObjectUnsubscribedError.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var ObjectUnsubscribedError = (function(_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
      _super.call(this, 'object unsubscribed');
      this.name = 'ObjectUnsubscribedError';
    }
    return ObjectUnsubscribedError;
  }(Error));
  exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/Subject.js", ["node_modules/rxjs/Observable.js", "node_modules/rxjs/Subscriber.js", "node_modules/rxjs/Subscription.js", "node_modules/rxjs/subject/SubjectSubscription.js", "node_modules/rxjs/symbol/rxSubscriber.js", "node_modules/rxjs/util/throwError.js", "node_modules/rxjs/util/ObjectUnsubscribedError.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('node_modules/rxjs/Observable.js');
  var Subscriber_1 = $__require('node_modules/rxjs/Subscriber.js');
  var Subscription_1 = $__require('node_modules/rxjs/Subscription.js');
  var SubjectSubscription_1 = $__require('node_modules/rxjs/subject/SubjectSubscription.js');
  var rxSubscriber_1 = $__require('node_modules/rxjs/symbol/rxSubscriber.js');
  var throwError_1 = $__require('node_modules/rxjs/util/throwError.js');
  var ObjectUnsubscribedError_1 = $__require('node_modules/rxjs/util/ObjectUnsubscribedError.js');
  var Subject = (function(_super) {
    __extends(Subject, _super);
    function Subject(destination, source) {
      _super.call(this);
      this.destination = destination;
      this.source = source;
      this.observers = [];
      this.isUnsubscribed = false;
      this.isStopped = false;
      this.hasErrored = false;
      this.dispatching = false;
      this.hasCompleted = false;
      this.source = source;
    }
    Subject.prototype.lift = function(operator) {
      var subject = new Subject(this.destination || this, this);
      subject.operator = operator;
      return subject;
    };
    Subject.prototype.add = function(subscription) {
      Subscription_1.Subscription.prototype.add.call(this, subscription);
    };
    Subject.prototype.remove = function(subscription) {
      Subscription_1.Subscription.prototype.remove.call(this, subscription);
    };
    Subject.prototype.unsubscribe = function() {
      Subscription_1.Subscription.prototype.unsubscribe.call(this);
    };
    Subject.prototype._subscribe = function(subscriber) {
      if (this.source) {
        return this.source.subscribe(subscriber);
      } else {
        if (subscriber.isUnsubscribed) {
          return;
        } else if (this.hasErrored) {
          return subscriber.error(this.errorValue);
        } else if (this.hasCompleted) {
          return subscriber.complete();
        }
        this.throwIfUnsubscribed();
        var subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        this.observers.push(subscriber);
        return subscription;
      }
    };
    Subject.prototype._unsubscribe = function() {
      this.source = null;
      this.isStopped = true;
      this.observers = null;
      this.destination = null;
    };
    Subject.prototype.next = function(value) {
      this.throwIfUnsubscribed();
      if (this.isStopped) {
        return;
      }
      this.dispatching = true;
      this._next(value);
      this.dispatching = false;
      if (this.hasErrored) {
        this._error(this.errorValue);
      } else if (this.hasCompleted) {
        this._complete();
      }
    };
    Subject.prototype.error = function(err) {
      this.throwIfUnsubscribed();
      if (this.isStopped) {
        return;
      }
      this.isStopped = true;
      this.hasErrored = true;
      this.errorValue = err;
      if (this.dispatching) {
        return;
      }
      this._error(err);
    };
    Subject.prototype.complete = function() {
      this.throwIfUnsubscribed();
      if (this.isStopped) {
        return;
      }
      this.isStopped = true;
      this.hasCompleted = true;
      if (this.dispatching) {
        return;
      }
      this._complete();
    };
    Subject.prototype.asObservable = function() {
      var observable = new SubjectObservable(this);
      return observable;
    };
    Subject.prototype._next = function(value) {
      if (this.destination) {
        this.destination.next(value);
      } else {
        this._finalNext(value);
      }
    };
    Subject.prototype._finalNext = function(value) {
      var index = -1;
      var observers = this.observers.slice(0);
      var len = observers.length;
      while (++index < len) {
        observers[index].next(value);
      }
    };
    Subject.prototype._error = function(err) {
      if (this.destination) {
        this.destination.error(err);
      } else {
        this._finalError(err);
      }
    };
    Subject.prototype._finalError = function(err) {
      var index = -1;
      var observers = this.observers;
      this.observers = null;
      this.isUnsubscribed = true;
      if (observers) {
        var len = observers.length;
        while (++index < len) {
          observers[index].error(err);
        }
      }
      this.isUnsubscribed = false;
      this.unsubscribe();
    };
    Subject.prototype._complete = function() {
      if (this.destination) {
        this.destination.complete();
      } else {
        this._finalComplete();
      }
    };
    Subject.prototype._finalComplete = function() {
      var index = -1;
      var observers = this.observers;
      this.observers = null;
      this.isUnsubscribed = true;
      if (observers) {
        var len = observers.length;
        while (++index < len) {
          observers[index].complete();
        }
      }
      this.isUnsubscribed = false;
      this.unsubscribe();
    };
    Subject.prototype.throwIfUnsubscribed = function() {
      if (this.isUnsubscribed) {
        throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
      }
    };
    Subject.prototype[rxSubscriber_1.$$rxSubscriber] = function() {
      return new Subscriber_1.Subscriber(this);
    };
    Subject.create = function(destination, source) {
      return new Subject(destination, source);
    };
    return Subject;
  }(Observable_1.Observable));
  exports.Subject = Subject;
  var SubjectObservable = (function(_super) {
    __extends(SubjectObservable, _super);
    function SubjectObservable(source) {
      _super.call(this);
      this.source = source;
    }
    return SubjectObservable;
  }(Observable_1.Observable));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/observable/PromiseObservable.js", ["node_modules/rxjs/util/root.js", "node_modules/rxjs/Observable.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var root_1 = $__require('node_modules/rxjs/util/root.js');
  var Observable_1 = $__require('node_modules/rxjs/Observable.js');
  var PromiseObservable = (function(_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
      if (scheduler === void 0) {
        scheduler = null;
      }
      _super.call(this);
      this.promise = promise;
      this.scheduler = scheduler;
    }
    PromiseObservable.create = function(promise, scheduler) {
      if (scheduler === void 0) {
        scheduler = null;
      }
      return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function(subscriber) {
      var _this = this;
      var promise = this.promise;
      var scheduler = this.scheduler;
      if (scheduler == null) {
        if (this._isScalar) {
          if (!subscriber.isUnsubscribed) {
            subscriber.next(this.value);
            subscriber.complete();
          }
        } else {
          promise.then(function(value) {
            _this.value = value;
            _this._isScalar = true;
            if (!subscriber.isUnsubscribed) {
              subscriber.next(value);
              subscriber.complete();
            }
          }, function(err) {
            if (!subscriber.isUnsubscribed) {
              subscriber.error(err);
            }
          }).then(null, function(err) {
            root_1.root.setTimeout(function() {
              throw err;
            });
          });
        }
      } else {
        if (this._isScalar) {
          if (!subscriber.isUnsubscribed) {
            return scheduler.schedule(dispatchNext, 0, {
              value: this.value,
              subscriber: subscriber
            });
          }
        } else {
          promise.then(function(value) {
            _this.value = value;
            _this._isScalar = true;
            if (!subscriber.isUnsubscribed) {
              subscriber.add(scheduler.schedule(dispatchNext, 0, {
                value: value,
                subscriber: subscriber
              }));
            }
          }, function(err) {
            if (!subscriber.isUnsubscribed) {
              subscriber.add(scheduler.schedule(dispatchError, 0, {
                err: err,
                subscriber: subscriber
              }));
            }
          }).then(null, function(err) {
            root_1.root.setTimeout(function() {
              throw err;
            });
          });
        }
      }
    };
    return PromiseObservable;
  }(Observable_1.Observable));
  exports.PromiseObservable = PromiseObservable;
  function dispatchNext(_a) {
    var value = _a.value,
        subscriber = _a.subscriber;
    if (!subscriber.isUnsubscribed) {
      subscriber.next(value);
      subscriber.complete();
    }
  }
  function dispatchError(_a) {
    var err = _a.err,
        subscriber = _a.subscriber;
    if (!subscriber.isUnsubscribed) {
      subscriber.error(err);
    }
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/operator/toPromise.js", ["node_modules/rxjs/util/root.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var root_1 = $__require('node_modules/rxjs/util/root.js');
  function toPromise(PromiseCtor) {
    var _this = this;
    if (!PromiseCtor) {
      if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
        PromiseCtor = root_1.root.Rx.config.Promise;
      } else if (root_1.root.Promise) {
        PromiseCtor = root_1.root.Promise;
      }
    }
    if (!PromiseCtor) {
      throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  }
  exports.toPromise = toPromise;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/symbol/observable.js", ["node_modules/rxjs/util/root.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var root_1 = $__require('node_modules/rxjs/util/root.js');
  var Symbol = root_1.root.Symbol;
  if (typeof Symbol === 'function') {
    if (!Symbol.observable) {
      if (typeof Symbol.for === 'function') {
        exports.$$observable = Symbol.for('observable');
      } else {
        exports.$$observable = Symbol('observable');
      }
      Symbol.observable = exports.$$observable;
    }
  } else {
    exports.$$observable = '@@observable';
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/util/isArray.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  exports.isArray = Array.isArray || (function(x) {
    return x && typeof x.length === 'number';
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/util/isObject.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function isObject(x) {
    return x != null && typeof x === 'object';
  }
  exports.isObject = isObject;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/util/isFunction.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function isFunction(x) {
    return typeof x === 'function';
  }
  exports.isFunction = isFunction;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/util/tryCatch.js", ["node_modules/rxjs/util/errorObject.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var errorObject_1 = $__require('node_modules/rxjs/util/errorObject.js');
  var tryCatchTarget;
  function tryCatcher() {
    try {
      return tryCatchTarget.apply(this, arguments);
    } catch (e) {
      errorObject_1.errorObject.e = e;
      return errorObject_1.errorObject;
    }
  }
  function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
  }
  exports.tryCatch = tryCatch;
  ;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/util/errorObject.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  exports.errorObject = {e: {}};
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/Subscription.js", ["node_modules/rxjs/util/isArray.js", "node_modules/rxjs/util/isObject.js", "node_modules/rxjs/util/isFunction.js", "node_modules/rxjs/util/tryCatch.js", "node_modules/rxjs/util/errorObject.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isArray_1 = $__require('node_modules/rxjs/util/isArray.js');
  var isObject_1 = $__require('node_modules/rxjs/util/isObject.js');
  var isFunction_1 = $__require('node_modules/rxjs/util/isFunction.js');
  var tryCatch_1 = $__require('node_modules/rxjs/util/tryCatch.js');
  var errorObject_1 = $__require('node_modules/rxjs/util/errorObject.js');
  var Subscription = (function() {
    function Subscription(_unsubscribe) {
      this.isUnsubscribed = false;
      if (_unsubscribe) {
        this._unsubscribe = _unsubscribe;
      }
    }
    Subscription.prototype.unsubscribe = function() {
      var hasErrors = false;
      var errors;
      if (this.isUnsubscribed) {
        return;
      }
      this.isUnsubscribed = true;
      var _a = this,
          _unsubscribe = _a._unsubscribe,
          _subscriptions = _a._subscriptions;
      this._subscriptions = null;
      if (isFunction_1.isFunction(_unsubscribe)) {
        var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
        if (trial === errorObject_1.errorObject) {
          hasErrors = true;
          (errors = errors || []).push(errorObject_1.errorObject.e);
        }
      }
      if (isArray_1.isArray(_subscriptions)) {
        var index = -1;
        var len = _subscriptions.length;
        while (++index < len) {
          var sub = _subscriptions[index];
          if (isObject_1.isObject(sub)) {
            var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
            if (trial === errorObject_1.errorObject) {
              hasErrors = true;
              errors = errors || [];
              var err = errorObject_1.errorObject.e;
              if (err instanceof UnsubscriptionError) {
                errors = errors.concat(err.errors);
              } else {
                errors.push(err);
              }
            }
          }
        }
      }
      if (hasErrors) {
        throw new UnsubscriptionError(errors);
      }
    };
    Subscription.prototype.add = function(subscription) {
      if (!subscription || (subscription === this) || (subscription === Subscription.EMPTY)) {
        return;
      }
      var sub = subscription;
      switch (typeof subscription) {
        case 'function':
          sub = new Subscription(subscription);
        case 'object':
          if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
            break;
          } else if (this.isUnsubscribed) {
            sub.unsubscribe();
          } else {
            (this._subscriptions || (this._subscriptions = [])).push(sub);
          }
          break;
        default:
          throw new Error('Unrecognized subscription ' + subscription + ' added to Subscription.');
      }
    };
    Subscription.prototype.remove = function(subscription) {
      if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
        return;
      }
      var subscriptions = this._subscriptions;
      if (subscriptions) {
        var subscriptionIndex = subscriptions.indexOf(subscription);
        if (subscriptionIndex !== -1) {
          subscriptions.splice(subscriptionIndex, 1);
        }
      }
    };
    Subscription.EMPTY = (function(empty) {
      empty.isUnsubscribed = true;
      return empty;
    }(new Subscription()));
    return Subscription;
  }());
  exports.Subscription = Subscription;
  var UnsubscriptionError = (function(_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
      _super.call(this, 'unsubscriptoin error(s)');
      this.errors = errors;
      this.name = 'UnsubscriptionError';
    }
    return UnsubscriptionError;
  }(Error));
  exports.UnsubscriptionError = UnsubscriptionError;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/Observer.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  exports.empty = {
    isUnsubscribed: true,
    next: function(value) {},
    error: function(err) {
      throw err;
    },
    complete: function() {}
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/Subscriber.js", ["node_modules/rxjs/util/isFunction.js", "node_modules/rxjs/Subscription.js", "node_modules/rxjs/symbol/rxSubscriber.js", "node_modules/rxjs/Observer.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isFunction_1 = $__require('node_modules/rxjs/util/isFunction.js');
  var Subscription_1 = $__require('node_modules/rxjs/Subscription.js');
  var rxSubscriber_1 = $__require('node_modules/rxjs/symbol/rxSubscriber.js');
  var Observer_1 = $__require('node_modules/rxjs/Observer.js');
  var Subscriber = (function(_super) {
    __extends(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
      _super.call(this);
      this.syncErrorValue = null;
      this.syncErrorThrown = false;
      this.syncErrorThrowable = false;
      this.isStopped = false;
      switch (arguments.length) {
        case 0:
          this.destination = Observer_1.empty;
          break;
        case 1:
          if (!destinationOrNext) {
            this.destination = Observer_1.empty;
            break;
          }
          if (typeof destinationOrNext === 'object') {
            if (destinationOrNext instanceof Subscriber) {
              this.destination = destinationOrNext;
            } else {
              this.syncErrorThrowable = true;
              this.destination = new SafeSubscriber(this, destinationOrNext);
            }
            break;
          }
        default:
          this.syncErrorThrowable = true;
          this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
          break;
      }
    }
    Subscriber.create = function(next, error, complete) {
      var subscriber = new Subscriber(next, error, complete);
      subscriber.syncErrorThrowable = false;
      return subscriber;
    };
    Subscriber.prototype.next = function(value) {
      if (!this.isStopped) {
        this._next(value);
      }
    };
    Subscriber.prototype.error = function(err) {
      if (!this.isStopped) {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber.prototype.complete = function() {
      if (!this.isStopped) {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber.prototype.unsubscribe = function() {
      if (this.isUnsubscribed) {
        return;
      }
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber.prototype._error = function(err) {
      this.destination.error(err);
      this.unsubscribe();
    };
    Subscriber.prototype._complete = function() {
      this.destination.complete();
      this.unsubscribe();
    };
    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function() {
      return this;
    };
    return Subscriber;
  }(Subscription_1.Subscription));
  exports.Subscriber = Subscriber;
  var SafeSubscriber = (function(_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parent, observerOrNext, error, complete) {
      _super.call(this);
      this._parent = _parent;
      var next;
      var context = this;
      if (isFunction_1.isFunction(observerOrNext)) {
        next = observerOrNext;
      } else if (observerOrNext) {
        context = observerOrNext;
        next = observerOrNext.next;
        error = observerOrNext.error;
        complete = observerOrNext.complete;
      }
      this._context = context;
      this._next = next;
      this._error = error;
      this._complete = complete;
    }
    SafeSubscriber.prototype.next = function(value) {
      if (!this.isStopped && this._next) {
        var _parent = this._parent;
        if (!_parent.syncErrorThrowable) {
          this.__tryOrUnsub(this._next, value);
        } else if (this.__tryOrSetError(_parent, this._next, value)) {
          this.unsubscribe();
        }
      }
    };
    SafeSubscriber.prototype.error = function(err) {
      if (!this.isStopped) {
        var _parent = this._parent;
        if (this._error) {
          if (!_parent.syncErrorThrowable) {
            this.__tryOrUnsub(this._error, err);
            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parent, this._error, err);
            this.unsubscribe();
          }
        } else if (!_parent.syncErrorThrowable) {
          this.unsubscribe();
          throw err;
        } else {
          _parent.syncErrorValue = err;
          _parent.syncErrorThrown = true;
          this.unsubscribe();
        }
      }
    };
    SafeSubscriber.prototype.complete = function() {
      if (!this.isStopped) {
        var _parent = this._parent;
        if (this._complete) {
          if (!_parent.syncErrorThrowable) {
            this.__tryOrUnsub(this._complete);
            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parent, this._complete);
            this.unsubscribe();
          }
        } else {
          this.unsubscribe();
        }
      }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
      try {
        fn.call(this._context, value);
      } catch (err) {
        this.unsubscribe();
        throw err;
      }
    };
    SafeSubscriber.prototype.__tryOrSetError = function(parent, fn, value) {
      try {
        fn.call(this._context, value);
      } catch (err) {
        parent.syncErrorValue = err;
        parent.syncErrorThrown = true;
        return true;
      }
      return false;
    };
    SafeSubscriber.prototype._unsubscribe = function() {
      var _parent = this._parent;
      this._context = null;
      this._parent = null;
      _parent.unsubscribe();
    };
    return SafeSubscriber;
  }(Subscriber));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/util/root.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };
  exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    exports.root = freeGlobal;
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/symbol/rxSubscriber.js", ["node_modules/rxjs/util/root.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var root_1 = $__require('node_modules/rxjs/util/root.js');
  var Symbol = root_1.root.Symbol;
  exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ? Symbol.for('rxSubscriber') : '@@rxSubscriber';
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/util/toSubscriber.js", ["node_modules/rxjs/Subscriber.js", "node_modules/rxjs/symbol/rxSubscriber.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var Subscriber_1 = $__require('node_modules/rxjs/Subscriber.js');
  var rxSubscriber_1 = $__require('node_modules/rxjs/symbol/rxSubscriber.js');
  function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver && typeof nextOrObserver === 'object') {
      if (nextOrObserver instanceof Subscriber_1.Subscriber) {
        return nextOrObserver;
      } else if (typeof nextOrObserver[rxSubscriber_1.$$rxSubscriber] === 'function') {
        return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
      }
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
  }
  exports.toSubscriber = toSubscriber;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/rxjs/Observable.js", ["node_modules/rxjs/util/root.js", "node_modules/rxjs/symbol/observable.js", "node_modules/rxjs/util/toSubscriber.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var root_1 = $__require('node_modules/rxjs/util/root.js');
  var observable_1 = $__require('node_modules/rxjs/symbol/observable.js');
  var toSubscriber_1 = $__require('node_modules/rxjs/util/toSubscriber.js');
  var Observable = (function() {
    function Observable(subscribe) {
      this._isScalar = false;
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable.prototype.lift = function(operator) {
      var observable = new Observable();
      observable.source = this;
      observable.operator = operator;
      return observable;
    };
    Observable.prototype.subscribe = function(observerOrNext, error, complete) {
      var operator = this.operator;
      var subscriber = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
      if (operator) {
        subscriber.add(this._subscribe(operator.call(subscriber)));
      } else {
        subscriber.add(this._subscribe(subscriber));
      }
      if (subscriber.syncErrorThrowable) {
        subscriber.syncErrorThrowable = false;
        if (subscriber.syncErrorThrown) {
          throw subscriber.syncErrorValue;
        }
      }
      return subscriber;
    };
    Observable.prototype.forEach = function(next, PromiseCtor) {
      var _this = this;
      if (!PromiseCtor) {
        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
          PromiseCtor = root_1.root.Rx.config.Promise;
        } else if (root_1.root.Promise) {
          PromiseCtor = root_1.root.Promise;
        }
      }
      if (!PromiseCtor) {
        throw new Error('no Promise impl found');
      }
      return new PromiseCtor(function(resolve, reject) {
        var subscription = _this.subscribe(function(value) {
          if (subscription) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscription.unsubscribe();
            }
          } else {
            next(value);
          }
        }, reject, resolve);
      });
    };
    Observable.prototype._subscribe = function(subscriber) {
      return this.source.subscribe(subscriber);
    };
    Observable.prototype[observable_1.$$observable] = function() {
      return this;
    };
    Observable.create = function(subscribe) {
      return new Observable(subscribe);
    };
    return Observable;
  }());
  exports.Observable = Observable;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/facade/async.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/promise.js", "node_modules/rxjs/Subject.js", "node_modules/rxjs/observable/PromiseObservable.js", "node_modules/rxjs/operator/toPromise.js", "node_modules/rxjs/Observable.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var promise_1 = $__require('node_modules/angular2/src/facade/promise.js');
  exports.PromiseWrapper = promise_1.PromiseWrapper;
  exports.PromiseCompleter = promise_1.PromiseCompleter;
  var Subject_1 = $__require('node_modules/rxjs/Subject.js');
  var PromiseObservable_1 = $__require('node_modules/rxjs/observable/PromiseObservable.js');
  var toPromise_1 = $__require('node_modules/rxjs/operator/toPromise.js');
  var Observable_1 = $__require('node_modules/rxjs/Observable.js');
  exports.Observable = Observable_1.Observable;
  var Subject_2 = $__require('node_modules/rxjs/Subject.js');
  exports.Subject = Subject_2.Subject;
  var TimerWrapper = (function() {
    function TimerWrapper() {}
    TimerWrapper.setTimeout = function(fn, millis) {
      return lang_1.global.setTimeout(fn, millis);
    };
    TimerWrapper.clearTimeout = function(id) {
      lang_1.global.clearTimeout(id);
    };
    TimerWrapper.setInterval = function(fn, millis) {
      return lang_1.global.setInterval(fn, millis);
    };
    TimerWrapper.clearInterval = function(id) {
      lang_1.global.clearInterval(id);
    };
    return TimerWrapper;
  })();
  exports.TimerWrapper = TimerWrapper;
  var ObservableWrapper = (function() {
    function ObservableWrapper() {}
    ObservableWrapper.subscribe = function(emitter, onNext, onError, onComplete) {
      if (onComplete === void 0) {
        onComplete = function() {};
      }
      onError = (typeof onError === "function") && onError || lang_1.noop;
      onComplete = (typeof onComplete === "function") && onComplete || lang_1.noop;
      return emitter.subscribe({
        next: onNext,
        error: onError,
        complete: onComplete
      });
    };
    ObservableWrapper.isObservable = function(obs) {
      return !!obs.subscribe;
    };
    ObservableWrapper.hasSubscribers = function(obs) {
      return obs.observers.length > 0;
    };
    ObservableWrapper.dispose = function(subscription) {
      subscription.unsubscribe();
    };
    ObservableWrapper.callNext = function(emitter, value) {
      emitter.next(value);
    };
    ObservableWrapper.callEmit = function(emitter, value) {
      emitter.emit(value);
    };
    ObservableWrapper.callError = function(emitter, error) {
      emitter.error(error);
    };
    ObservableWrapper.callComplete = function(emitter) {
      emitter.complete();
    };
    ObservableWrapper.fromPromise = function(promise) {
      return PromiseObservable_1.PromiseObservable.create(promise);
    };
    ObservableWrapper.toPromise = function(obj) {
      return toPromise_1.toPromise.call(obj);
    };
    return ObservableWrapper;
  })();
  exports.ObservableWrapper = ObservableWrapper;
  var EventEmitter = (function(_super) {
    __extends(EventEmitter, _super);
    function EventEmitter(isAsync) {
      if (isAsync === void 0) {
        isAsync = true;
      }
      _super.call(this);
      this._isAsync = isAsync;
    }
    EventEmitter.prototype.emit = function(value) {
      _super.prototype.next.call(this, value);
    };
    EventEmitter.prototype.next = function(value) {
      _super.prototype.next.call(this, value);
    };
    EventEmitter.prototype.subscribe = function(generatorOrNext, error, complete) {
      var schedulerFn;
      var errorFn = function(err) {
        return null;
      };
      var completeFn = function() {
        return null;
      };
      if (generatorOrNext && typeof generatorOrNext === 'object') {
        schedulerFn = this._isAsync ? function(value) {
          setTimeout(function() {
            return generatorOrNext.next(value);
          });
        } : function(value) {
          generatorOrNext.next(value);
        };
        if (generatorOrNext.error) {
          errorFn = this._isAsync ? function(err) {
            setTimeout(function() {
              return generatorOrNext.error(err);
            });
          } : function(err) {
            generatorOrNext.error(err);
          };
        }
        if (generatorOrNext.complete) {
          completeFn = this._isAsync ? function() {
            setTimeout(function() {
              return generatorOrNext.complete();
            });
          } : function() {
            generatorOrNext.complete();
          };
        }
      } else {
        schedulerFn = this._isAsync ? function(value) {
          setTimeout(function() {
            return generatorOrNext(value);
          });
        } : function(value) {
          generatorOrNext(value);
        };
        if (error) {
          errorFn = this._isAsync ? function(err) {
            setTimeout(function() {
              return error(err);
            });
          } : function(err) {
            error(err);
          };
        }
        if (complete) {
          completeFn = this._isAsync ? function() {
            setTimeout(function() {
              return complete();
            });
          } : function() {
            complete();
          };
        }
      }
      return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
    };
    return EventEmitter;
  })(Subject_1.Subject);
  exports.EventEmitter = EventEmitter;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/query_list.js", ["node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/async.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var async_1 = $__require('node_modules/angular2/src/facade/async.js');
  var QueryList = (function() {
    function QueryList() {
      this._results = [];
      this._emitter = new async_1.EventEmitter();
    }
    Object.defineProperty(QueryList.prototype, "changes", {
      get: function() {
        return this._emitter;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QueryList.prototype, "length", {
      get: function() {
        return this._results.length;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QueryList.prototype, "first", {
      get: function() {
        return collection_1.ListWrapper.first(this._results);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QueryList.prototype, "last", {
      get: function() {
        return collection_1.ListWrapper.last(this._results);
      },
      enumerable: true,
      configurable: true
    });
    QueryList.prototype.map = function(fn) {
      return this._results.map(fn);
    };
    QueryList.prototype.filter = function(fn) {
      return this._results.filter(fn);
    };
    QueryList.prototype.reduce = function(fn, init) {
      return this._results.reduce(fn, init);
    };
    QueryList.prototype.forEach = function(fn) {
      this._results.forEach(fn);
    };
    QueryList.prototype.toArray = function() {
      return collection_1.ListWrapper.clone(this._results);
    };
    QueryList.prototype[lang_1.getSymbolIterator()] = function() {
      return this._results[lang_1.getSymbolIterator()]();
    };
    QueryList.prototype.toString = function() {
      return this._results.toString();
    };
    QueryList.prototype.reset = function(res) {
      this._results = res;
    };
    QueryList.prototype.notifyOnChanges = function() {
      this._emitter.emit(this);
    };
    return QueryList;
  })();
  exports.QueryList = QueryList;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/pipes/pipe_provider.js", ["node_modules/angular2/src/core/di/provider.js", "node_modules/angular2/src/core/di.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var provider_1 = $__require('node_modules/angular2/src/core/di/provider.js');
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var PipeProvider = (function(_super) {
    __extends(PipeProvider, _super);
    function PipeProvider(name, pure, key, resolvedFactories, multiBinding) {
      _super.call(this, key, resolvedFactories, multiBinding);
      this.name = name;
      this.pure = pure;
    }
    PipeProvider.createFromType = function(type, metadata) {
      var provider = new di_1.Provider(type, {useClass: type});
      var rb = provider_1.resolveProvider(provider);
      return new PipeProvider(metadata.name, metadata.pure, rb.key, rb.resolvedFactories, rb.multiProvider);
    };
    return PipeProvider;
  })(provider_1.ResolvedProvider_);
  exports.PipeProvider = PipeProvider;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/element.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/di.js", "node_modules/angular2/src/core/di/provider.js", "node_modules/angular2/src/core/di/injector.js", "node_modules/angular2/src/core/metadata/di.js", "node_modules/angular2/src/core/linker/view_type.js", "node_modules/angular2/src/core/linker/element_ref.js", "node_modules/angular2/src/core/linker/view_container_ref.js", "node_modules/angular2/src/core/render/api.js", "node_modules/angular2/src/core/linker/template_ref.js", "node_modules/angular2/src/core/metadata/directives.js", "node_modules/angular2/src/core/change_detection/change_detection.js", "node_modules/angular2/src/core/linker/query_list.js", "node_modules/angular2/src/core/reflection/reflection.js", "node_modules/angular2/src/core/pipes/pipe_provider.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var provider_1 = $__require('node_modules/angular2/src/core/di/provider.js');
  var injector_1 = $__require('node_modules/angular2/src/core/di/injector.js');
  var provider_2 = $__require('node_modules/angular2/src/core/di/provider.js');
  var di_2 = $__require('node_modules/angular2/src/core/metadata/di.js');
  var view_type_1 = $__require('node_modules/angular2/src/core/linker/view_type.js');
  var element_ref_1 = $__require('node_modules/angular2/src/core/linker/element_ref.js');
  var view_container_ref_1 = $__require('node_modules/angular2/src/core/linker/view_container_ref.js');
  var element_ref_2 = $__require('node_modules/angular2/src/core/linker/element_ref.js');
  var api_1 = $__require('node_modules/angular2/src/core/render/api.js');
  var template_ref_1 = $__require('node_modules/angular2/src/core/linker/template_ref.js');
  var directives_1 = $__require('node_modules/angular2/src/core/metadata/directives.js');
  var change_detection_1 = $__require('node_modules/angular2/src/core/change_detection/change_detection.js');
  var query_list_1 = $__require('node_modules/angular2/src/core/linker/query_list.js');
  var reflection_1 = $__require('node_modules/angular2/src/core/reflection/reflection.js');
  var pipe_provider_1 = $__require('node_modules/angular2/src/core/pipes/pipe_provider.js');
  var view_container_ref_2 = $__require('node_modules/angular2/src/core/linker/view_container_ref.js');
  var _staticKeys;
  var StaticKeys = (function() {
    function StaticKeys() {
      this.templateRefId = di_1.Key.get(template_ref_1.TemplateRef).id;
      this.viewContainerId = di_1.Key.get(view_container_ref_1.ViewContainerRef).id;
      this.changeDetectorRefId = di_1.Key.get(change_detection_1.ChangeDetectorRef).id;
      this.elementRefId = di_1.Key.get(element_ref_2.ElementRef).id;
      this.rendererId = di_1.Key.get(api_1.Renderer).id;
    }
    StaticKeys.instance = function() {
      if (lang_1.isBlank(_staticKeys))
        _staticKeys = new StaticKeys();
      return _staticKeys;
    };
    return StaticKeys;
  })();
  exports.StaticKeys = StaticKeys;
  var DirectiveDependency = (function(_super) {
    __extends(DirectiveDependency, _super);
    function DirectiveDependency(key, optional, lowerBoundVisibility, upperBoundVisibility, properties, attributeName, queryDecorator) {
      _super.call(this, key, optional, lowerBoundVisibility, upperBoundVisibility, properties);
      this.attributeName = attributeName;
      this.queryDecorator = queryDecorator;
      this._verify();
    }
    DirectiveDependency.prototype._verify = function() {
      var count = 0;
      if (lang_1.isPresent(this.queryDecorator))
        count++;
      if (lang_1.isPresent(this.attributeName))
        count++;
      if (count > 1)
        throw new exceptions_1.BaseException('A directive injectable can contain only one of the following @Attribute or @Query.');
    };
    DirectiveDependency.createFrom = function(d) {
      return new DirectiveDependency(d.key, d.optional, d.lowerBoundVisibility, d.upperBoundVisibility, d.properties, DirectiveDependency._attributeName(d.properties), DirectiveDependency._query(d.properties));
    };
    DirectiveDependency._attributeName = function(properties) {
      var p = properties.find(function(p) {
        return p instanceof di_2.AttributeMetadata;
      });
      return lang_1.isPresent(p) ? p.attributeName : null;
    };
    DirectiveDependency._query = function(properties) {
      return properties.find(function(p) {
        return p instanceof di_2.QueryMetadata;
      });
    };
    return DirectiveDependency;
  })(di_1.Dependency);
  exports.DirectiveDependency = DirectiveDependency;
  var DirectiveProvider = (function(_super) {
    __extends(DirectiveProvider, _super);
    function DirectiveProvider(key, factory, deps, isComponent, providers, viewProviders, queries) {
      _super.call(this, key, [new provider_2.ResolvedFactory(factory, deps)], false);
      this.isComponent = isComponent;
      this.providers = providers;
      this.viewProviders = viewProviders;
      this.queries = queries;
    }
    Object.defineProperty(DirectiveProvider.prototype, "displayName", {
      get: function() {
        return this.key.displayName;
      },
      enumerable: true,
      configurable: true
    });
    DirectiveProvider.createFromType = function(type, meta) {
      var provider = new di_1.Provider(type, {useClass: type});
      if (lang_1.isBlank(meta)) {
        meta = new directives_1.DirectiveMetadata();
      }
      var rb = provider_2.resolveProvider(provider);
      var rf = rb.resolvedFactories[0];
      var deps = rf.dependencies.map(DirectiveDependency.createFrom);
      var isComponent = meta instanceof directives_1.ComponentMetadata;
      var resolvedProviders = lang_1.isPresent(meta.providers) ? di_1.Injector.resolve(meta.providers) : null;
      var resolvedViewProviders = meta instanceof directives_1.ComponentMetadata && lang_1.isPresent(meta.viewProviders) ? di_1.Injector.resolve(meta.viewProviders) : null;
      var queries = [];
      if (lang_1.isPresent(meta.queries)) {
        collection_1.StringMapWrapper.forEach(meta.queries, function(meta, fieldName) {
          var setter = reflection_1.reflector.setter(fieldName);
          queries.push(new QueryMetadataWithSetter(setter, meta));
        });
      }
      deps.forEach(function(d) {
        if (lang_1.isPresent(d.queryDecorator)) {
          queries.push(new QueryMetadataWithSetter(null, d.queryDecorator));
        }
      });
      return new DirectiveProvider(rb.key, rf.factory, deps, isComponent, resolvedProviders, resolvedViewProviders, queries);
    };
    return DirectiveProvider;
  })(provider_2.ResolvedProvider_);
  exports.DirectiveProvider = DirectiveProvider;
  var QueryMetadataWithSetter = (function() {
    function QueryMetadataWithSetter(setter, metadata) {
      this.setter = setter;
      this.metadata = metadata;
    }
    return QueryMetadataWithSetter;
  })();
  exports.QueryMetadataWithSetter = QueryMetadataWithSetter;
  function setProvidersVisibility(providers, visibility, result) {
    for (var i = 0; i < providers.length; i++) {
      result.set(providers[i].key.id, visibility);
    }
  }
  var AppProtoElement = (function() {
    function AppProtoElement(firstProviderIsComponent, index, attributes, pwvs, protoQueryRefs, directiveVariableBindings) {
      this.firstProviderIsComponent = firstProviderIsComponent;
      this.index = index;
      this.attributes = attributes;
      this.protoQueryRefs = protoQueryRefs;
      this.directiveVariableBindings = directiveVariableBindings;
      var length = pwvs.length;
      if (length > 0) {
        this.protoInjector = new injector_1.ProtoInjector(pwvs);
      } else {
        this.protoInjector = null;
        this.protoQueryRefs = [];
      }
    }
    AppProtoElement.create = function(metadataCache, index, attributes, directiveTypes, directiveVariableBindings) {
      var componentDirProvider = null;
      var mergedProvidersMap = new Map();
      var providerVisibilityMap = new Map();
      var providers = collection_1.ListWrapper.createGrowableSize(directiveTypes.length);
      var protoQueryRefs = [];
      for (var i = 0; i < directiveTypes.length; i++) {
        var dirProvider = metadataCache.getResolvedDirectiveMetadata(directiveTypes[i]);
        providers[i] = new injector_1.ProviderWithVisibility(dirProvider, dirProvider.isComponent ? injector_1.Visibility.PublicAndPrivate : injector_1.Visibility.Public);
        if (dirProvider.isComponent) {
          componentDirProvider = dirProvider;
        } else {
          if (lang_1.isPresent(dirProvider.providers)) {
            provider_1.mergeResolvedProviders(dirProvider.providers, mergedProvidersMap);
            setProvidersVisibility(dirProvider.providers, injector_1.Visibility.Public, providerVisibilityMap);
          }
        }
        if (lang_1.isPresent(dirProvider.viewProviders)) {
          provider_1.mergeResolvedProviders(dirProvider.viewProviders, mergedProvidersMap);
          setProvidersVisibility(dirProvider.viewProviders, injector_1.Visibility.Private, providerVisibilityMap);
        }
        for (var queryIdx = 0; queryIdx < dirProvider.queries.length; queryIdx++) {
          var q = dirProvider.queries[queryIdx];
          protoQueryRefs.push(new ProtoQueryRef(i, q.setter, q.metadata));
        }
      }
      if (lang_1.isPresent(componentDirProvider) && lang_1.isPresent(componentDirProvider.providers)) {
        provider_1.mergeResolvedProviders(componentDirProvider.providers, mergedProvidersMap);
        setProvidersVisibility(componentDirProvider.providers, injector_1.Visibility.Public, providerVisibilityMap);
      }
      mergedProvidersMap.forEach(function(provider, _) {
        providers.push(new injector_1.ProviderWithVisibility(provider, providerVisibilityMap.get(provider.key.id)));
      });
      return new AppProtoElement(lang_1.isPresent(componentDirProvider), index, attributes, providers, protoQueryRefs, directiveVariableBindings);
    };
    AppProtoElement.prototype.getProviderAtIndex = function(index) {
      return this.protoInjector.getProviderAtIndex(index);
    };
    return AppProtoElement;
  })();
  exports.AppProtoElement = AppProtoElement;
  var _Context = (function() {
    function _Context(element, componentElement, injector) {
      this.element = element;
      this.componentElement = componentElement;
      this.injector = injector;
    }
    return _Context;
  })();
  var InjectorWithHostBoundary = (function() {
    function InjectorWithHostBoundary(injector, hostInjectorBoundary) {
      this.injector = injector;
      this.hostInjectorBoundary = hostInjectorBoundary;
    }
    return InjectorWithHostBoundary;
  })();
  exports.InjectorWithHostBoundary = InjectorWithHostBoundary;
  var AppElement = (function() {
    function AppElement(proto, parentView, parent, nativeElement, embeddedViewFactory) {
      var _this = this;
      this.proto = proto;
      this.parentView = parentView;
      this.parent = parent;
      this.nativeElement = nativeElement;
      this.embeddedViewFactory = embeddedViewFactory;
      this.nestedViews = null;
      this.componentView = null;
      this.ref = new element_ref_1.ElementRef_(this);
      var parentInjector = lang_1.isPresent(parent) ? parent._injector : parentView.parentInjector;
      if (lang_1.isPresent(this.proto.protoInjector)) {
        var isBoundary;
        if (lang_1.isPresent(parent) && lang_1.isPresent(parent.proto.protoInjector)) {
          isBoundary = false;
        } else {
          isBoundary = parentView.hostInjectorBoundary;
        }
        this._queryStrategy = this._buildQueryStrategy();
        this._injector = new di_1.Injector(this.proto.protoInjector, parentInjector, isBoundary, this, function() {
          return _this._debugContext();
        });
        var injectorStrategy = this._injector.internalStrategy;
        this._strategy = injectorStrategy instanceof injector_1.InjectorInlineStrategy ? new ElementDirectiveInlineStrategy(injectorStrategy, this) : new ElementDirectiveDynamicStrategy(injectorStrategy, this);
        this._strategy.init();
      } else {
        this._queryStrategy = null;
        this._injector = parentInjector;
        this._strategy = null;
      }
    }
    AppElement.getViewParentInjector = function(parentViewType, containerAppElement, imperativelyCreatedProviders, rootInjector) {
      var parentInjector;
      var hostInjectorBoundary;
      switch (parentViewType) {
        case view_type_1.ViewType.COMPONENT:
          parentInjector = containerAppElement._injector;
          hostInjectorBoundary = true;
          break;
        case view_type_1.ViewType.EMBEDDED:
          parentInjector = lang_1.isPresent(containerAppElement.proto.protoInjector) ? containerAppElement._injector.parent : containerAppElement._injector;
          hostInjectorBoundary = containerAppElement._injector.hostBoundary;
          break;
        case view_type_1.ViewType.HOST:
          if (lang_1.isPresent(containerAppElement)) {
            parentInjector = lang_1.isPresent(containerAppElement.proto.protoInjector) ? containerAppElement._injector.parent : containerAppElement._injector;
            if (lang_1.isPresent(imperativelyCreatedProviders)) {
              var imperativeProvidersWithVisibility = imperativelyCreatedProviders.map(function(p) {
                return new injector_1.ProviderWithVisibility(p, injector_1.Visibility.Public);
              });
              parentInjector = new di_1.Injector(new injector_1.ProtoInjector(imperativeProvidersWithVisibility), parentInjector, true, null, null);
              hostInjectorBoundary = false;
            } else {
              hostInjectorBoundary = containerAppElement._injector.hostBoundary;
            }
          } else {
            parentInjector = rootInjector;
            hostInjectorBoundary = true;
          }
          break;
      }
      return new InjectorWithHostBoundary(parentInjector, hostInjectorBoundary);
    };
    AppElement.prototype.attachComponentView = function(componentView) {
      this.componentView = componentView;
    };
    AppElement.prototype._debugContext = function() {
      var c = this.parentView.getDebugContext(this, null, null);
      return lang_1.isPresent(c) ? new _Context(c.element, c.componentElement, c.injector) : null;
    };
    AppElement.prototype.hasVariableBinding = function(name) {
      var vb = this.proto.directiveVariableBindings;
      return lang_1.isPresent(vb) && collection_1.StringMapWrapper.contains(vb, name);
    };
    AppElement.prototype.getVariableBinding = function(name) {
      var index = this.proto.directiveVariableBindings[name];
      return lang_1.isPresent(index) ? this.getDirectiveAtIndex(index) : this.getElementRef();
    };
    AppElement.prototype.get = function(token) {
      return this._injector.get(token);
    };
    AppElement.prototype.hasDirective = function(type) {
      return lang_1.isPresent(this._injector.getOptional(type));
    };
    AppElement.prototype.getComponent = function() {
      return lang_1.isPresent(this._strategy) ? this._strategy.getComponent() : null;
    };
    AppElement.prototype.getInjector = function() {
      return this._injector;
    };
    AppElement.prototype.getElementRef = function() {
      return this.ref;
    };
    AppElement.prototype.getViewContainerRef = function() {
      return new view_container_ref_2.ViewContainerRef_(this);
    };
    AppElement.prototype.getTemplateRef = function() {
      if (lang_1.isPresent(this.embeddedViewFactory)) {
        return new template_ref_1.TemplateRef_(this.ref);
      }
      return null;
    };
    AppElement.prototype.getDependency = function(injector, provider, dep) {
      if (provider instanceof DirectiveProvider) {
        var dirDep = dep;
        if (lang_1.isPresent(dirDep.attributeName))
          return this._buildAttribute(dirDep);
        if (lang_1.isPresent(dirDep.queryDecorator))
          return this._queryStrategy.findQuery(dirDep.queryDecorator).list;
        if (dirDep.key.id === StaticKeys.instance().changeDetectorRefId) {
          if (this.proto.firstProviderIsComponent) {
            return new _ComponentViewChangeDetectorRef(this);
          } else {
            return this.parentView.changeDetector.ref;
          }
        }
        if (dirDep.key.id === StaticKeys.instance().elementRefId) {
          return this.getElementRef();
        }
        if (dirDep.key.id === StaticKeys.instance().viewContainerId) {
          return this.getViewContainerRef();
        }
        if (dirDep.key.id === StaticKeys.instance().templateRefId) {
          var tr = this.getTemplateRef();
          if (lang_1.isBlank(tr) && !dirDep.optional) {
            throw new di_1.NoProviderError(null, dirDep.key);
          }
          return tr;
        }
        if (dirDep.key.id === StaticKeys.instance().rendererId) {
          return this.parentView.renderer;
        }
      } else if (provider instanceof pipe_provider_1.PipeProvider) {
        if (dep.key.id === StaticKeys.instance().changeDetectorRefId) {
          if (this.proto.firstProviderIsComponent) {
            return new _ComponentViewChangeDetectorRef(this);
          } else {
            return this.parentView.changeDetector;
          }
        }
      }
      return injector_1.UNDEFINED;
    };
    AppElement.prototype._buildAttribute = function(dep) {
      var attributes = this.proto.attributes;
      if (lang_1.isPresent(attributes) && collection_1.StringMapWrapper.contains(attributes, dep.attributeName)) {
        return attributes[dep.attributeName];
      } else {
        return null;
      }
    };
    AppElement.prototype.addDirectivesMatchingQuery = function(query, list) {
      var templateRef = this.getTemplateRef();
      if (query.selector === template_ref_1.TemplateRef && lang_1.isPresent(templateRef)) {
        list.push(templateRef);
      }
      if (this._strategy != null) {
        this._strategy.addDirectivesMatchingQuery(query, list);
      }
    };
    AppElement.prototype._buildQueryStrategy = function() {
      if (this.proto.protoQueryRefs.length === 0) {
        return _emptyQueryStrategy;
      } else if (this.proto.protoQueryRefs.length <= InlineQueryStrategy.NUMBER_OF_SUPPORTED_QUERIES) {
        return new InlineQueryStrategy(this);
      } else {
        return new DynamicQueryStrategy(this);
      }
    };
    AppElement.prototype.getDirectiveAtIndex = function(index) {
      return this._injector.getAt(index);
    };
    AppElement.prototype.ngAfterViewChecked = function() {
      if (lang_1.isPresent(this._queryStrategy))
        this._queryStrategy.updateViewQueries();
    };
    AppElement.prototype.ngAfterContentChecked = function() {
      if (lang_1.isPresent(this._queryStrategy))
        this._queryStrategy.updateContentQueries();
    };
    AppElement.prototype.traverseAndSetQueriesAsDirty = function() {
      var inj = this;
      while (lang_1.isPresent(inj)) {
        inj._setQueriesAsDirty();
        if (lang_1.isBlank(inj.parent) && inj.parentView.proto.type === view_type_1.ViewType.EMBEDDED) {
          inj = inj.parentView.containerAppElement;
        } else {
          inj = inj.parent;
        }
      }
    };
    AppElement.prototype._setQueriesAsDirty = function() {
      if (lang_1.isPresent(this._queryStrategy)) {
        this._queryStrategy.setContentQueriesAsDirty();
      }
      if (this.parentView.proto.type === view_type_1.ViewType.COMPONENT) {
        this.parentView.containerAppElement._queryStrategy.setViewQueriesAsDirty();
      }
    };
    return AppElement;
  })();
  exports.AppElement = AppElement;
  var _EmptyQueryStrategy = (function() {
    function _EmptyQueryStrategy() {}
    _EmptyQueryStrategy.prototype.setContentQueriesAsDirty = function() {};
    _EmptyQueryStrategy.prototype.setViewQueriesAsDirty = function() {};
    _EmptyQueryStrategy.prototype.updateContentQueries = function() {};
    _EmptyQueryStrategy.prototype.updateViewQueries = function() {};
    _EmptyQueryStrategy.prototype.findQuery = function(query) {
      throw new exceptions_1.BaseException("Cannot find query for directive " + query + ".");
    };
    return _EmptyQueryStrategy;
  })();
  var _emptyQueryStrategy = new _EmptyQueryStrategy();
  var InlineQueryStrategy = (function() {
    function InlineQueryStrategy(ei) {
      var protoRefs = ei.proto.protoQueryRefs;
      if (protoRefs.length > 0)
        this.query0 = new QueryRef(protoRefs[0], ei);
      if (protoRefs.length > 1)
        this.query1 = new QueryRef(protoRefs[1], ei);
      if (protoRefs.length > 2)
        this.query2 = new QueryRef(protoRefs[2], ei);
    }
    InlineQueryStrategy.prototype.setContentQueriesAsDirty = function() {
      if (lang_1.isPresent(this.query0) && !this.query0.isViewQuery)
        this.query0.dirty = true;
      if (lang_1.isPresent(this.query1) && !this.query1.isViewQuery)
        this.query1.dirty = true;
      if (lang_1.isPresent(this.query2) && !this.query2.isViewQuery)
        this.query2.dirty = true;
    };
    InlineQueryStrategy.prototype.setViewQueriesAsDirty = function() {
      if (lang_1.isPresent(this.query0) && this.query0.isViewQuery)
        this.query0.dirty = true;
      if (lang_1.isPresent(this.query1) && this.query1.isViewQuery)
        this.query1.dirty = true;
      if (lang_1.isPresent(this.query2) && this.query2.isViewQuery)
        this.query2.dirty = true;
    };
    InlineQueryStrategy.prototype.updateContentQueries = function() {
      if (lang_1.isPresent(this.query0) && !this.query0.isViewQuery) {
        this.query0.update();
      }
      if (lang_1.isPresent(this.query1) && !this.query1.isViewQuery) {
        this.query1.update();
      }
      if (lang_1.isPresent(this.query2) && !this.query2.isViewQuery) {
        this.query2.update();
      }
    };
    InlineQueryStrategy.prototype.updateViewQueries = function() {
      if (lang_1.isPresent(this.query0) && this.query0.isViewQuery) {
        this.query0.update();
      }
      if (lang_1.isPresent(this.query1) && this.query1.isViewQuery) {
        this.query1.update();
      }
      if (lang_1.isPresent(this.query2) && this.query2.isViewQuery) {
        this.query2.update();
      }
    };
    InlineQueryStrategy.prototype.findQuery = function(query) {
      if (lang_1.isPresent(this.query0) && this.query0.protoQueryRef.query === query) {
        return this.query0;
      }
      if (lang_1.isPresent(this.query1) && this.query1.protoQueryRef.query === query) {
        return this.query1;
      }
      if (lang_1.isPresent(this.query2) && this.query2.protoQueryRef.query === query) {
        return this.query2;
      }
      throw new exceptions_1.BaseException("Cannot find query for directive " + query + ".");
    };
    InlineQueryStrategy.NUMBER_OF_SUPPORTED_QUERIES = 3;
    return InlineQueryStrategy;
  })();
  var DynamicQueryStrategy = (function() {
    function DynamicQueryStrategy(ei) {
      this.queries = ei.proto.protoQueryRefs.map(function(p) {
        return new QueryRef(p, ei);
      });
    }
    DynamicQueryStrategy.prototype.setContentQueriesAsDirty = function() {
      for (var i = 0; i < this.queries.length; ++i) {
        var q = this.queries[i];
        if (!q.isViewQuery)
          q.dirty = true;
      }
    };
    DynamicQueryStrategy.prototype.setViewQueriesAsDirty = function() {
      for (var i = 0; i < this.queries.length; ++i) {
        var q = this.queries[i];
        if (q.isViewQuery)
          q.dirty = true;
      }
    };
    DynamicQueryStrategy.prototype.updateContentQueries = function() {
      for (var i = 0; i < this.queries.length; ++i) {
        var q = this.queries[i];
        if (!q.isViewQuery) {
          q.update();
        }
      }
    };
    DynamicQueryStrategy.prototype.updateViewQueries = function() {
      for (var i = 0; i < this.queries.length; ++i) {
        var q = this.queries[i];
        if (q.isViewQuery) {
          q.update();
        }
      }
    };
    DynamicQueryStrategy.prototype.findQuery = function(query) {
      for (var i = 0; i < this.queries.length; ++i) {
        var q = this.queries[i];
        if (q.protoQueryRef.query === query) {
          return q;
        }
      }
      throw new exceptions_1.BaseException("Cannot find query for directive " + query + ".");
    };
    return DynamicQueryStrategy;
  })();
  var ElementDirectiveInlineStrategy = (function() {
    function ElementDirectiveInlineStrategy(injectorStrategy, _ei) {
      this.injectorStrategy = injectorStrategy;
      this._ei = _ei;
    }
    ElementDirectiveInlineStrategy.prototype.init = function() {
      var i = this.injectorStrategy;
      var p = i.protoStrategy;
      i.resetConstructionCounter();
      if (p.provider0 instanceof DirectiveProvider && lang_1.isPresent(p.keyId0) && i.obj0 === injector_1.UNDEFINED)
        i.obj0 = i.instantiateProvider(p.provider0, p.visibility0);
      if (p.provider1 instanceof DirectiveProvider && lang_1.isPresent(p.keyId1) && i.obj1 === injector_1.UNDEFINED)
        i.obj1 = i.instantiateProvider(p.provider1, p.visibility1);
      if (p.provider2 instanceof DirectiveProvider && lang_1.isPresent(p.keyId2) && i.obj2 === injector_1.UNDEFINED)
        i.obj2 = i.instantiateProvider(p.provider2, p.visibility2);
      if (p.provider3 instanceof DirectiveProvider && lang_1.isPresent(p.keyId3) && i.obj3 === injector_1.UNDEFINED)
        i.obj3 = i.instantiateProvider(p.provider3, p.visibility3);
      if (p.provider4 instanceof DirectiveProvider && lang_1.isPresent(p.keyId4) && i.obj4 === injector_1.UNDEFINED)
        i.obj4 = i.instantiateProvider(p.provider4, p.visibility4);
      if (p.provider5 instanceof DirectiveProvider && lang_1.isPresent(p.keyId5) && i.obj5 === injector_1.UNDEFINED)
        i.obj5 = i.instantiateProvider(p.provider5, p.visibility5);
      if (p.provider6 instanceof DirectiveProvider && lang_1.isPresent(p.keyId6) && i.obj6 === injector_1.UNDEFINED)
        i.obj6 = i.instantiateProvider(p.provider6, p.visibility6);
      if (p.provider7 instanceof DirectiveProvider && lang_1.isPresent(p.keyId7) && i.obj7 === injector_1.UNDEFINED)
        i.obj7 = i.instantiateProvider(p.provider7, p.visibility7);
      if (p.provider8 instanceof DirectiveProvider && lang_1.isPresent(p.keyId8) && i.obj8 === injector_1.UNDEFINED)
        i.obj8 = i.instantiateProvider(p.provider8, p.visibility8);
      if (p.provider9 instanceof DirectiveProvider && lang_1.isPresent(p.keyId9) && i.obj9 === injector_1.UNDEFINED)
        i.obj9 = i.instantiateProvider(p.provider9, p.visibility9);
    };
    ElementDirectiveInlineStrategy.prototype.getComponent = function() {
      return this.injectorStrategy.obj0;
    };
    ElementDirectiveInlineStrategy.prototype.isComponentKey = function(key) {
      return this._ei.proto.firstProviderIsComponent && lang_1.isPresent(key) && key.id === this.injectorStrategy.protoStrategy.keyId0;
    };
    ElementDirectiveInlineStrategy.prototype.addDirectivesMatchingQuery = function(query, list) {
      var i = this.injectorStrategy;
      var p = i.protoStrategy;
      if (lang_1.isPresent(p.provider0) && p.provider0.key.token === query.selector) {
        if (i.obj0 === injector_1.UNDEFINED)
          i.obj0 = i.instantiateProvider(p.provider0, p.visibility0);
        list.push(i.obj0);
      }
      if (lang_1.isPresent(p.provider1) && p.provider1.key.token === query.selector) {
        if (i.obj1 === injector_1.UNDEFINED)
          i.obj1 = i.instantiateProvider(p.provider1, p.visibility1);
        list.push(i.obj1);
      }
      if (lang_1.isPresent(p.provider2) && p.provider2.key.token === query.selector) {
        if (i.obj2 === injector_1.UNDEFINED)
          i.obj2 = i.instantiateProvider(p.provider2, p.visibility2);
        list.push(i.obj2);
      }
      if (lang_1.isPresent(p.provider3) && p.provider3.key.token === query.selector) {
        if (i.obj3 === injector_1.UNDEFINED)
          i.obj3 = i.instantiateProvider(p.provider3, p.visibility3);
        list.push(i.obj3);
      }
      if (lang_1.isPresent(p.provider4) && p.provider4.key.token === query.selector) {
        if (i.obj4 === injector_1.UNDEFINED)
          i.obj4 = i.instantiateProvider(p.provider4, p.visibility4);
        list.push(i.obj4);
      }
      if (lang_1.isPresent(p.provider5) && p.provider5.key.token === query.selector) {
        if (i.obj5 === injector_1.UNDEFINED)
          i.obj5 = i.instantiateProvider(p.provider5, p.visibility5);
        list.push(i.obj5);
      }
      if (lang_1.isPresent(p.provider6) && p.provider6.key.token === query.selector) {
        if (i.obj6 === injector_1.UNDEFINED)
          i.obj6 = i.instantiateProvider(p.provider6, p.visibility6);
        list.push(i.obj6);
      }
      if (lang_1.isPresent(p.provider7) && p.provider7.key.token === query.selector) {
        if (i.obj7 === injector_1.UNDEFINED)
          i.obj7 = i.instantiateProvider(p.provider7, p.visibility7);
        list.push(i.obj7);
      }
      if (lang_1.isPresent(p.provider8) && p.provider8.key.token === query.selector) {
        if (i.obj8 === injector_1.UNDEFINED)
          i.obj8 = i.instantiateProvider(p.provider8, p.visibility8);
        list.push(i.obj8);
      }
      if (lang_1.isPresent(p.provider9) && p.provider9.key.token === query.selector) {
        if (i.obj9 === injector_1.UNDEFINED)
          i.obj9 = i.instantiateProvider(p.provider9, p.visibility9);
        list.push(i.obj9);
      }
    };
    return ElementDirectiveInlineStrategy;
  })();
  var ElementDirectiveDynamicStrategy = (function() {
    function ElementDirectiveDynamicStrategy(injectorStrategy, _ei) {
      this.injectorStrategy = injectorStrategy;
      this._ei = _ei;
    }
    ElementDirectiveDynamicStrategy.prototype.init = function() {
      var inj = this.injectorStrategy;
      var p = inj.protoStrategy;
      inj.resetConstructionCounter();
      for (var i = 0; i < p.keyIds.length; i++) {
        if (p.providers[i] instanceof DirectiveProvider && lang_1.isPresent(p.keyIds[i]) && inj.objs[i] === injector_1.UNDEFINED) {
          inj.objs[i] = inj.instantiateProvider(p.providers[i], p.visibilities[i]);
        }
      }
    };
    ElementDirectiveDynamicStrategy.prototype.getComponent = function() {
      return this.injectorStrategy.objs[0];
    };
    ElementDirectiveDynamicStrategy.prototype.isComponentKey = function(key) {
      var p = this.injectorStrategy.protoStrategy;
      return this._ei.proto.firstProviderIsComponent && lang_1.isPresent(key) && key.id === p.keyIds[0];
    };
    ElementDirectiveDynamicStrategy.prototype.addDirectivesMatchingQuery = function(query, list) {
      var ist = this.injectorStrategy;
      var p = ist.protoStrategy;
      for (var i = 0; i < p.providers.length; i++) {
        if (p.providers[i].key.token === query.selector) {
          if (ist.objs[i] === injector_1.UNDEFINED) {
            ist.objs[i] = ist.instantiateProvider(p.providers[i], p.visibilities[i]);
          }
          list.push(ist.objs[i]);
        }
      }
    };
    return ElementDirectiveDynamicStrategy;
  })();
  var ProtoQueryRef = (function() {
    function ProtoQueryRef(dirIndex, setter, query) {
      this.dirIndex = dirIndex;
      this.setter = setter;
      this.query = query;
    }
    Object.defineProperty(ProtoQueryRef.prototype, "usesPropertySyntax", {
      get: function() {
        return lang_1.isPresent(this.setter);
      },
      enumerable: true,
      configurable: true
    });
    return ProtoQueryRef;
  })();
  exports.ProtoQueryRef = ProtoQueryRef;
  var QueryRef = (function() {
    function QueryRef(protoQueryRef, originator) {
      this.protoQueryRef = protoQueryRef;
      this.originator = originator;
      this.list = new query_list_1.QueryList();
      this.dirty = true;
    }
    Object.defineProperty(QueryRef.prototype, "isViewQuery", {
      get: function() {
        return this.protoQueryRef.query.isViewQuery;
      },
      enumerable: true,
      configurable: true
    });
    QueryRef.prototype.update = function() {
      if (!this.dirty)
        return;
      this._update();
      this.dirty = false;
      if (this.protoQueryRef.usesPropertySyntax) {
        var dir = this.originator.getDirectiveAtIndex(this.protoQueryRef.dirIndex);
        if (this.protoQueryRef.query.first) {
          this.protoQueryRef.setter(dir, this.list.length > 0 ? this.list.first : null);
        } else {
          this.protoQueryRef.setter(dir, this.list);
        }
      }
      this.list.notifyOnChanges();
    };
    QueryRef.prototype._update = function() {
      var aggregator = [];
      if (this.protoQueryRef.query.isViewQuery) {
        var nestedView = this.originator.componentView;
        if (lang_1.isPresent(nestedView))
          this._visitView(nestedView, aggregator);
      } else {
        this._visit(this.originator, aggregator);
      }
      this.list.reset(aggregator);
    };
    ;
    QueryRef.prototype._visit = function(inj, aggregator) {
      var view = inj.parentView;
      var startIdx = inj.proto.index;
      for (var i = startIdx; i < view.appElements.length; i++) {
        var curInj = view.appElements[i];
        if (i > startIdx && (lang_1.isBlank(curInj.parent) || curInj.parent.proto.index < startIdx)) {
          break;
        }
        if (!this.protoQueryRef.query.descendants && !(curInj.parent == this.originator || curInj == this.originator))
          continue;
        this._visitInjector(curInj, aggregator);
        this._visitViewContainerViews(curInj.nestedViews, aggregator);
      }
    };
    QueryRef.prototype._visitInjector = function(inj, aggregator) {
      if (this.protoQueryRef.query.isVarBindingQuery) {
        this._aggregateVariableBinding(inj, aggregator);
      } else {
        this._aggregateDirective(inj, aggregator);
      }
    };
    QueryRef.prototype._visitViewContainerViews = function(views, aggregator) {
      if (lang_1.isPresent(views)) {
        for (var j = 0; j < views.length; j++) {
          this._visitView(views[j], aggregator);
        }
      }
    };
    QueryRef.prototype._visitView = function(view, aggregator) {
      for (var i = 0; i < view.appElements.length; i++) {
        var inj = view.appElements[i];
        this._visitInjector(inj, aggregator);
        this._visitViewContainerViews(inj.nestedViews, aggregator);
      }
    };
    QueryRef.prototype._aggregateVariableBinding = function(inj, aggregator) {
      var vb = this.protoQueryRef.query.varBindings;
      for (var i = 0; i < vb.length; ++i) {
        if (inj.hasVariableBinding(vb[i])) {
          aggregator.push(inj.getVariableBinding(vb[i]));
        }
      }
    };
    QueryRef.prototype._aggregateDirective = function(inj, aggregator) {
      inj.addDirectivesMatchingQuery(this.protoQueryRef.query, aggregator);
    };
    return QueryRef;
  })();
  exports.QueryRef = QueryRef;
  var _ComponentViewChangeDetectorRef = (function(_super) {
    __extends(_ComponentViewChangeDetectorRef, _super);
    function _ComponentViewChangeDetectorRef(_appElement) {
      _super.call(this);
      this._appElement = _appElement;
    }
    _ComponentViewChangeDetectorRef.prototype.markForCheck = function() {
      this._appElement.componentView.changeDetector.ref.markForCheck();
    };
    _ComponentViewChangeDetectorRef.prototype.detach = function() {
      this._appElement.componentView.changeDetector.ref.detach();
    };
    _ComponentViewChangeDetectorRef.prototype.detectChanges = function() {
      this._appElement.componentView.changeDetector.ref.detectChanges();
    };
    _ComponentViewChangeDetectorRef.prototype.checkNoChanges = function() {
      this._appElement.componentView.changeDetector.ref.checkNoChanges();
    };
    _ComponentViewChangeDetectorRef.prototype.reattach = function() {
      this._appElement.componentView.changeDetector.ref.reattach();
    };
    return _ComponentViewChangeDetectorRef;
  })(change_detection_1.ChangeDetectorRef);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/view_ref.js", ["node_modules/angular2/src/facade/exceptions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var ViewRef = (function() {
    function ViewRef() {}
    Object.defineProperty(ViewRef.prototype, "changeDetectorRef", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(ViewRef.prototype, "destroyed", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    return ViewRef;
  })();
  exports.ViewRef = ViewRef;
  var HostViewRef = (function(_super) {
    __extends(HostViewRef, _super);
    function HostViewRef() {
      _super.apply(this, arguments);
    }
    Object.defineProperty(HostViewRef.prototype, "rootNodes", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    return HostViewRef;
  })(ViewRef);
  exports.HostViewRef = HostViewRef;
  var EmbeddedViewRef = (function(_super) {
    __extends(EmbeddedViewRef, _super);
    function EmbeddedViewRef() {
      _super.apply(this, arguments);
    }
    Object.defineProperty(EmbeddedViewRef.prototype, "rootNodes", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    return EmbeddedViewRef;
  })(ViewRef);
  exports.EmbeddedViewRef = EmbeddedViewRef;
  var ViewRef_ = (function() {
    function ViewRef_(_view) {
      this._view = _view;
      this._view = _view;
    }
    Object.defineProperty(ViewRef_.prototype, "internalView", {
      get: function() {
        return this._view;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "changeDetectorRef", {
      get: function() {
        return this._view.changeDetector.ref;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "rootNodes", {
      get: function() {
        return this._view.flatRootNodes;
      },
      enumerable: true,
      configurable: true
    });
    ViewRef_.prototype.setLocal = function(variableName, value) {
      this._view.setLocal(variableName, value);
    };
    ViewRef_.prototype.hasLocal = function(variableName) {
      return this._view.hasLocal(variableName);
    };
    Object.defineProperty(ViewRef_.prototype, "destroyed", {
      get: function() {
        return this._view.destroyed;
      },
      enumerable: true,
      configurable: true
    });
    return ViewRef_;
  })();
  exports.ViewRef_ = ViewRef_;
  var HostViewFactoryRef = (function() {
    function HostViewFactoryRef() {}
    return HostViewFactoryRef;
  })();
  exports.HostViewFactoryRef = HostViewFactoryRef;
  var HostViewFactoryRef_ = (function() {
    function HostViewFactoryRef_(_hostViewFactory) {
      this._hostViewFactory = _hostViewFactory;
    }
    Object.defineProperty(HostViewFactoryRef_.prototype, "internalHostViewFactory", {
      get: function() {
        return this._hostViewFactory;
      },
      enumerable: true,
      configurable: true
    });
    return HostViewFactoryRef_;
  })();
  exports.HostViewFactoryRef_ = HostViewFactoryRef_;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/change_detection/pipes.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var SelectedPipe = (function() {
    function SelectedPipe(pipe, pure) {
      this.pipe = pipe;
      this.pure = pure;
    }
    return SelectedPipe;
  })();
  exports.SelectedPipe = SelectedPipe;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/pipes/pipes.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/change_detection/pipes.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var cd = $__require('node_modules/angular2/src/core/change_detection/pipes.js');
  var ProtoPipes = (function() {
    function ProtoPipes(config) {
      this.config = config;
      this.config = config;
    }
    ProtoPipes.fromProviders = function(providers) {
      var config = {};
      providers.forEach(function(b) {
        return config[b.name] = b;
      });
      return new ProtoPipes(config);
    };
    ProtoPipes.prototype.get = function(name) {
      var provider = this.config[name];
      if (lang_1.isBlank(provider))
        throw new exceptions_1.BaseException("Cannot find pipe '" + name + "'.");
      return provider;
    };
    return ProtoPipes;
  })();
  exports.ProtoPipes = ProtoPipes;
  var Pipes = (function() {
    function Pipes(proto, injector) {
      this.proto = proto;
      this.injector = injector;
      this._config = {};
    }
    Pipes.prototype.get = function(name) {
      var cached = collection_1.StringMapWrapper.get(this._config, name);
      if (lang_1.isPresent(cached))
        return cached;
      var p = this.proto.get(name);
      var transform = this.injector.instantiateResolved(p);
      var res = new cd.SelectedPipe(transform, p.pure);
      if (p.pure) {
        collection_1.StringMapWrapper.set(this._config, name, res);
      }
      return res;
    };
    return Pipes;
  })();
  exports.Pipes = Pipes;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/render/util.js", ["node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var CAMEL_CASE_REGEXP = /([A-Z])/g;
  var DASH_CASE_REGEXP = /-([a-z])/g;
  function camelCaseToDashCase(input) {
    return lang_1.StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, function(m) {
      return '-' + m[1].toLowerCase();
    });
  }
  exports.camelCaseToDashCase = camelCaseToDashCase;
  function dashCaseToCamelCase(input) {
    return lang_1.StringWrapper.replaceAllMapped(input, DASH_CASE_REGEXP, function(m) {
      return m[1].toUpperCase();
    });
  }
  exports.dashCaseToCamelCase = dashCaseToCamelCase;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/view.js", ["node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/change_detection/change_detection.js", "node_modules/angular2/src/core/change_detection/interfaces.js", "node_modules/angular2/src/core/linker/element.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/core/render/api.js", "node_modules/angular2/src/core/linker/view_ref.js", "node_modules/angular2/src/core/pipes/pipes.js", "node_modules/angular2/src/core/render/util.js", "node_modules/angular2/src/core/linker/view_type.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var change_detection_1 = $__require('node_modules/angular2/src/core/change_detection/change_detection.js');
  var interfaces_1 = $__require('node_modules/angular2/src/core/change_detection/interfaces.js');
  var element_1 = $__require('node_modules/angular2/src/core/linker/element.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var api_1 = $__require('node_modules/angular2/src/core/render/api.js');
  var view_ref_1 = $__require('node_modules/angular2/src/core/linker/view_ref.js');
  var pipes_1 = $__require('node_modules/angular2/src/core/pipes/pipes.js');
  var util_1 = $__require('node_modules/angular2/src/core/render/util.js');
  var interfaces_2 = $__require('node_modules/angular2/src/core/change_detection/interfaces.js');
  exports.DebugContext = interfaces_2.DebugContext;
  var pipes_2 = $__require('node_modules/angular2/src/core/pipes/pipes.js');
  var view_type_1 = $__require('node_modules/angular2/src/core/linker/view_type.js');
  var REFLECT_PREFIX = 'ng-reflect-';
  var EMPTY_CONTEXT = lang_1.CONST_EXPR(new Object());
  var AppView = (function() {
    function AppView(proto, renderer, viewManager, projectableNodes, containerAppElement, imperativelyCreatedProviders, rootInjector, changeDetector) {
      this.proto = proto;
      this.renderer = renderer;
      this.viewManager = viewManager;
      this.projectableNodes = projectableNodes;
      this.containerAppElement = containerAppElement;
      this.changeDetector = changeDetector;
      this.context = null;
      this.destroyed = false;
      this.ref = new view_ref_1.ViewRef_(this);
      var injectorWithHostBoundary = element_1.AppElement.getViewParentInjector(this.proto.type, containerAppElement, imperativelyCreatedProviders, rootInjector);
      this.parentInjector = injectorWithHostBoundary.injector;
      this.hostInjectorBoundary = injectorWithHostBoundary.hostInjectorBoundary;
      var pipes;
      var context;
      switch (proto.type) {
        case view_type_1.ViewType.COMPONENT:
          pipes = new pipes_2.Pipes(proto.protoPipes, containerAppElement.getInjector());
          context = containerAppElement.getComponent();
          break;
        case view_type_1.ViewType.EMBEDDED:
          pipes = containerAppElement.parentView.pipes;
          context = containerAppElement.parentView.context;
          break;
        case view_type_1.ViewType.HOST:
          pipes = null;
          context = EMPTY_CONTEXT;
          break;
      }
      this.pipes = pipes;
      this.context = context;
    }
    AppView.prototype.init = function(rootNodesOrAppElements, allNodes, disposables, appElements) {
      this.rootNodesOrAppElements = rootNodesOrAppElements;
      this.allNodes = allNodes;
      this.disposables = disposables;
      this.appElements = appElements;
      var localsMap = new collection_1.Map();
      collection_1.StringMapWrapper.forEach(this.proto.templateVariableBindings, function(templateName, _) {
        localsMap.set(templateName, null);
      });
      for (var i = 0; i < appElements.length; i++) {
        var appEl = appElements[i];
        var providerTokens = [];
        if (lang_1.isPresent(appEl.proto.protoInjector)) {
          for (var j = 0; j < appEl.proto.protoInjector.numberOfProviders; j++) {
            providerTokens.push(appEl.proto.protoInjector.getProviderAtIndex(j).key.token);
          }
        }
        collection_1.StringMapWrapper.forEach(appEl.proto.directiveVariableBindings, function(directiveIndex, name) {
          if (lang_1.isBlank(directiveIndex)) {
            localsMap.set(name, appEl.nativeElement);
          } else {
            localsMap.set(name, appEl.getDirectiveAtIndex(directiveIndex));
          }
        });
        this.renderer.setElementDebugInfo(appEl.nativeElement, new api_1.RenderDebugInfo(appEl.getInjector(), appEl.getComponent(), providerTokens, localsMap));
      }
      var parentLocals = null;
      if (this.proto.type !== view_type_1.ViewType.COMPONENT) {
        parentLocals = lang_1.isPresent(this.containerAppElement) ? this.containerAppElement.parentView.locals : null;
      }
      if (this.proto.type === view_type_1.ViewType.COMPONENT) {
        this.containerAppElement.attachComponentView(this);
        this.containerAppElement.parentView.changeDetector.addViewChild(this.changeDetector);
      }
      this.locals = new change_detection_1.Locals(parentLocals, localsMap);
      this.changeDetector.hydrate(this.context, this.locals, this, this.pipes);
      this.viewManager.onViewCreated(this);
    };
    AppView.prototype.destroy = function() {
      if (this.destroyed) {
        throw new exceptions_1.BaseException('This view has already been destroyed!');
      }
      this.changeDetector.destroyRecursive();
    };
    AppView.prototype.notifyOnDestroy = function() {
      this.destroyed = true;
      var hostElement = this.proto.type === view_type_1.ViewType.COMPONENT ? this.containerAppElement.nativeElement : null;
      this.renderer.destroyView(hostElement, this.allNodes);
      for (var i = 0; i < this.disposables.length; i++) {
        this.disposables[i]();
      }
      this.viewManager.onViewDestroyed(this);
    };
    Object.defineProperty(AppView.prototype, "changeDetectorRef", {
      get: function() {
        return this.changeDetector.ref;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AppView.prototype, "flatRootNodes", {
      get: function() {
        return flattenNestedViewRenderNodes(this.rootNodesOrAppElements);
      },
      enumerable: true,
      configurable: true
    });
    AppView.prototype.hasLocal = function(contextName) {
      return collection_1.StringMapWrapper.contains(this.proto.templateVariableBindings, contextName);
    };
    AppView.prototype.setLocal = function(contextName, value) {
      if (!this.hasLocal(contextName)) {
        return;
      }
      var templateName = this.proto.templateVariableBindings[contextName];
      this.locals.set(templateName, value);
    };
    AppView.prototype.notifyOnBinding = function(b, currentValue) {
      if (b.isTextNode()) {
        this.renderer.setText(this.allNodes[b.elementIndex], currentValue);
      } else {
        var nativeElement = this.appElements[b.elementIndex].nativeElement;
        if (b.isElementProperty()) {
          this.renderer.setElementProperty(nativeElement, b.name, currentValue);
        } else if (b.isElementAttribute()) {
          this.renderer.setElementAttribute(nativeElement, b.name, lang_1.isPresent(currentValue) ? "" + currentValue : null);
        } else if (b.isElementClass()) {
          this.renderer.setElementClass(nativeElement, b.name, currentValue);
        } else if (b.isElementStyle()) {
          var unit = lang_1.isPresent(b.unit) ? b.unit : '';
          this.renderer.setElementStyle(nativeElement, b.name, lang_1.isPresent(currentValue) ? "" + currentValue + unit : null);
        } else {
          throw new exceptions_1.BaseException('Unsupported directive record');
        }
      }
    };
    AppView.prototype.logBindingUpdate = function(b, value) {
      if (b.isDirective() || b.isElementProperty()) {
        var nativeElement = this.appElements[b.elementIndex].nativeElement;
        this.renderer.setBindingDebugInfo(nativeElement, "" + REFLECT_PREFIX + util_1.camelCaseToDashCase(b.name), "" + value);
      }
    };
    AppView.prototype.notifyAfterContentChecked = function() {
      var count = this.appElements.length;
      for (var i = count - 1; i >= 0; i--) {
        this.appElements[i].ngAfterContentChecked();
      }
    };
    AppView.prototype.notifyAfterViewChecked = function() {
      var count = this.appElements.length;
      for (var i = count - 1; i >= 0; i--) {
        this.appElements[i].ngAfterViewChecked();
      }
    };
    AppView.prototype.getDebugContext = function(appElement, elementIndex, directiveIndex) {
      try {
        if (lang_1.isBlank(appElement) && elementIndex < this.appElements.length) {
          appElement = this.appElements[elementIndex];
        }
        var container = this.containerAppElement;
        var element = lang_1.isPresent(appElement) ? appElement.nativeElement : null;
        var componentElement = lang_1.isPresent(container) ? container.nativeElement : null;
        var directive = lang_1.isPresent(directiveIndex) ? appElement.getDirectiveAtIndex(directiveIndex) : null;
        var injector = lang_1.isPresent(appElement) ? appElement.getInjector() : null;
        return new interfaces_1.DebugContext(element, componentElement, directive, this.context, _localsToStringMap(this.locals), injector);
      } catch (e) {
        return null;
      }
    };
    AppView.prototype.getDirectiveFor = function(directive) {
      return this.appElements[directive.elementIndex].getDirectiveAtIndex(directive.directiveIndex);
    };
    AppView.prototype.getDetectorFor = function(directive) {
      var componentView = this.appElements[directive.elementIndex].componentView;
      return lang_1.isPresent(componentView) ? componentView.changeDetector : null;
    };
    AppView.prototype.triggerEventHandlers = function(eventName, eventObj, boundElementIndex) {
      return this.changeDetector.handleEvent(eventName, boundElementIndex, eventObj);
    };
    return AppView;
  })();
  exports.AppView = AppView;
  function _localsToStringMap(locals) {
    var res = {};
    var c = locals;
    while (lang_1.isPresent(c)) {
      res = collection_1.StringMapWrapper.merge(res, collection_1.MapWrapper.toStringMap(c.current));
      c = c.parent;
    }
    return res;
  }
  var AppProtoView = (function() {
    function AppProtoView(type, protoPipes, templateVariableBindings) {
      this.type = type;
      this.protoPipes = protoPipes;
      this.templateVariableBindings = templateVariableBindings;
    }
    AppProtoView.create = function(metadataCache, type, pipes, templateVariableBindings) {
      var protoPipes = null;
      if (lang_1.isPresent(pipes) && pipes.length > 0) {
        var boundPipes = collection_1.ListWrapper.createFixedSize(pipes.length);
        for (var i = 0; i < pipes.length; i++) {
          boundPipes[i] = metadataCache.getResolvedPipeMetadata(pipes[i]);
        }
        protoPipes = pipes_1.ProtoPipes.fromProviders(boundPipes);
      }
      return new AppProtoView(type, protoPipes, templateVariableBindings);
    };
    return AppProtoView;
  })();
  exports.AppProtoView = AppProtoView;
  var HostViewFactory = (function() {
    function HostViewFactory(selector, viewFactory) {
      this.selector = selector;
      this.viewFactory = viewFactory;
    }
    HostViewFactory = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [String, Function])], HostViewFactory);
    return HostViewFactory;
  })();
  exports.HostViewFactory = HostViewFactory;
  function flattenNestedViewRenderNodes(nodes) {
    return _flattenNestedViewRenderNodes(nodes, []);
  }
  exports.flattenNestedViewRenderNodes = flattenNestedViewRenderNodes;
  function _flattenNestedViewRenderNodes(nodes, renderNodes) {
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node instanceof element_1.AppElement) {
        var appEl = node;
        renderNodes.push(appEl.nativeElement);
        if (lang_1.isPresent(appEl.nestedViews)) {
          for (var k = 0; k < appEl.nestedViews.length; k++) {
            _flattenNestedViewRenderNodes(appEl.nestedViews[k].rootNodesOrAppElements, renderNodes);
          }
        }
      } else {
        renderNodes.push(node);
      }
    }
    return renderNodes;
  }
  function findLastRenderNode(node) {
    var lastNode;
    if (node instanceof element_1.AppElement) {
      var appEl = node;
      lastNode = appEl.nativeElement;
      if (lang_1.isPresent(appEl.nestedViews)) {
        for (var i = appEl.nestedViews.length - 1; i >= 0; i--) {
          var nestedView = appEl.nestedViews[i];
          if (nestedView.rootNodesOrAppElements.length > 0) {
            lastNode = findLastRenderNode(nestedView.rootNodesOrAppElements[nestedView.rootNodesOrAppElements.length - 1]);
          }
        }
      }
    } else {
      lastNode = node;
    }
    return lastNode;
  }
  exports.findLastRenderNode = findLastRenderNode;
  function checkSlotCount(componentName, expectedSlotCount, projectableNodes) {
    var givenSlotCount = lang_1.isPresent(projectableNodes) ? projectableNodes.length : 0;
    if (givenSlotCount < expectedSlotCount) {
      throw new exceptions_1.BaseException(("The component " + componentName + " has " + expectedSlotCount + " <ng-content> elements,") + (" but only " + givenSlotCount + " slots were provided."));
    }
  }
  exports.checkSlotCount = checkSlotCount;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/render/api.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var RenderComponentType = (function() {
    function RenderComponentType(id, encapsulation, styles) {
      this.id = id;
      this.encapsulation = encapsulation;
      this.styles = styles;
    }
    return RenderComponentType;
  })();
  exports.RenderComponentType = RenderComponentType;
  var RenderDebugInfo = (function() {
    function RenderDebugInfo(injector, component, providerTokens, locals) {
      this.injector = injector;
      this.component = component;
      this.providerTokens = providerTokens;
      this.locals = locals;
    }
    return RenderDebugInfo;
  })();
  exports.RenderDebugInfo = RenderDebugInfo;
  var Renderer = (function() {
    function Renderer() {}
    return Renderer;
  })();
  exports.Renderer = Renderer;
  var RootRenderer = (function() {
    function RootRenderer() {}
    return RootRenderer;
  })();
  exports.RootRenderer = RootRenderer;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/profile/wtf_impl.js", ["node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var trace;
  var events;
  function detectWTF() {
    var wtf = lang_1.global['wtf'];
    if (wtf) {
      trace = wtf['trace'];
      if (trace) {
        events = trace['events'];
        return true;
      }
    }
    return false;
  }
  exports.detectWTF = detectWTF;
  function createScope(signature, flags) {
    if (flags === void 0) {
      flags = null;
    }
    return events.createScope(signature, flags);
  }
  exports.createScope = createScope;
  function leave(scope, returnValue) {
    trace.leaveScope(scope, returnValue);
    return returnValue;
  }
  exports.leave = leave;
  function startTimeRange(rangeType, action) {
    return trace.beginTimeRange(rangeType, action);
  }
  exports.startTimeRange = startTimeRange;
  function endTimeRange(range) {
    trace.endTimeRange(range);
  }
  exports.endTimeRange = endTimeRange;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/profile/profile.js", ["node_modules/angular2/src/core/profile/wtf_impl.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var impl = $__require('node_modules/angular2/src/core/profile/wtf_impl.js');
  exports.wtfEnabled = impl.detectWTF();
  function noopScope(arg0, arg1) {
    return null;
  }
  exports.wtfCreateScope = exports.wtfEnabled ? impl.createScope : function(signature, flags) {
    return noopScope;
  };
  exports.wtfLeave = exports.wtfEnabled ? impl.leave : function(s, r) {
    return r;
  };
  exports.wtfStartTimeRange = exports.wtfEnabled ? impl.startTimeRange : function(rangeType, action) {
    return null;
  };
  exports.wtfEndTimeRange = exports.wtfEnabled ? impl.endTimeRange : function(r) {
    return null;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/util/decorators.js", ["node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var _nextClassId = 0;
  function extractAnnotation(annotation) {
    if (lang_1.isFunction(annotation) && annotation.hasOwnProperty('annotation')) {
      annotation = annotation.annotation;
    }
    return annotation;
  }
  function applyParams(fnOrArray, key) {
    if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function || fnOrArray === Number || fnOrArray === Array) {
      throw new Error("Can not use native " + lang_1.stringify(fnOrArray) + " as constructor");
    }
    if (lang_1.isFunction(fnOrArray)) {
      return fnOrArray;
    } else if (fnOrArray instanceof Array) {
      var annotations = fnOrArray;
      var fn = fnOrArray[fnOrArray.length - 1];
      if (!lang_1.isFunction(fn)) {
        throw new Error("Last position of Class method array must be Function in key " + key + " was '" + lang_1.stringify(fn) + "'");
      }
      var annoLength = annotations.length - 1;
      if (annoLength != fn.length) {
        throw new Error("Number of annotations (" + annoLength + ") does not match number of arguments (" + fn.length + ") in the function: " + lang_1.stringify(fn));
      }
      var paramsAnnotations = [];
      for (var i = 0,
          ii = annotations.length - 1; i < ii; i++) {
        var paramAnnotations = [];
        paramsAnnotations.push(paramAnnotations);
        var annotation = annotations[i];
        if (annotation instanceof Array) {
          for (var j = 0; j < annotation.length; j++) {
            paramAnnotations.push(extractAnnotation(annotation[j]));
          }
        } else if (lang_1.isFunction(annotation)) {
          paramAnnotations.push(extractAnnotation(annotation));
        } else {
          paramAnnotations.push(annotation);
        }
      }
      Reflect.defineMetadata('parameters', paramsAnnotations, fn);
      return fn;
    } else {
      throw new Error("Only Function or Array is supported in Class definition for key '" + key + "' is '" + lang_1.stringify(fnOrArray) + "'");
    }
  }
  function Class(clsDef) {
    var constructor = applyParams(clsDef.hasOwnProperty('constructor') ? clsDef.constructor : undefined, 'constructor');
    var proto = constructor.prototype;
    if (clsDef.hasOwnProperty('extends')) {
      if (lang_1.isFunction(clsDef.extends)) {
        constructor.prototype = proto = Object.create(clsDef.extends.prototype);
      } else {
        throw new Error("Class definition 'extends' property must be a constructor function was: " + lang_1.stringify(clsDef.extends));
      }
    }
    for (var key in clsDef) {
      if (key != 'extends' && key != 'prototype' && clsDef.hasOwnProperty(key)) {
        proto[key] = applyParams(clsDef[key], key);
      }
    }
    if (this && this.annotations instanceof Array) {
      Reflect.defineMetadata('annotations', this.annotations, constructor);
    }
    if (!constructor['name']) {
      constructor['overriddenName'] = "class" + _nextClassId++;
    }
    return constructor;
  }
  exports.Class = Class;
  var Reflect = lang_1.global.Reflect;
  (function checkReflect() {
    if (!(Reflect && Reflect.getMetadata)) {
      throw 'reflect-metadata shim is required when using class decorators';
    }
  })();
  function makeDecorator(annotationCls, chainFn) {
    if (chainFn === void 0) {
      chainFn = null;
    }
    function DecoratorFactory(objOrType) {
      var annotationInstance = new annotationCls(objOrType);
      if (this instanceof annotationCls) {
        return annotationInstance;
      } else {
        var chainAnnotation = lang_1.isFunction(this) && this.annotations instanceof Array ? this.annotations : [];
        chainAnnotation.push(annotationInstance);
        var TypeDecorator = function TypeDecorator(cls) {
          var annotations = Reflect.getOwnMetadata('annotations', cls);
          annotations = annotations || [];
          annotations.push(annotationInstance);
          Reflect.defineMetadata('annotations', annotations, cls);
          return cls;
        };
        TypeDecorator.annotations = chainAnnotation;
        TypeDecorator.Class = Class;
        if (chainFn)
          chainFn(TypeDecorator);
        return TypeDecorator;
      }
    }
    DecoratorFactory.prototype = Object.create(annotationCls.prototype);
    return DecoratorFactory;
  }
  exports.makeDecorator = makeDecorator;
  function makeParamDecorator(annotationCls) {
    function ParamDecoratorFactory() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }
      var annotationInstance = Object.create(annotationCls.prototype);
      annotationCls.apply(annotationInstance, args);
      if (this instanceof annotationCls) {
        return annotationInstance;
      } else {
        ParamDecorator.annotation = annotationInstance;
        return ParamDecorator;
      }
      function ParamDecorator(cls, unusedKey, index) {
        var parameters = Reflect.getMetadata('parameters', cls);
        parameters = parameters || [];
        while (parameters.length <= index) {
          parameters.push(null);
        }
        parameters[index] = parameters[index] || [];
        var annotationsForParam = parameters[index];
        annotationsForParam.push(annotationInstance);
        Reflect.defineMetadata('parameters', parameters, cls);
        return cls;
      }
    }
    ParamDecoratorFactory.prototype = Object.create(annotationCls.prototype);
    return ParamDecoratorFactory;
  }
  exports.makeParamDecorator = makeParamDecorator;
  function makePropDecorator(decoratorCls) {
    function PropDecoratorFactory() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }
      var decoratorInstance = Object.create(decoratorCls.prototype);
      decoratorCls.apply(decoratorInstance, args);
      if (this instanceof decoratorCls) {
        return decoratorInstance;
      } else {
        return function PropDecorator(target, name) {
          var meta = Reflect.getOwnMetadata('propMetadata', target.constructor);
          meta = meta || {};
          meta[name] = meta[name] || [];
          meta[name].unshift(decoratorInstance);
          Reflect.defineMetadata('propMetadata', meta, target.constructor);
        };
      }
    }
    PropDecoratorFactory.prototype = Object.create(decoratorCls.prototype);
    return PropDecoratorFactory;
  }
  exports.makePropDecorator = makePropDecorator;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/di/decorators.js", ["node_modules/angular2/src/core/di/metadata.js", "node_modules/angular2/src/core/util/decorators.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var metadata_1 = $__require('node_modules/angular2/src/core/di/metadata.js');
  var decorators_1 = $__require('node_modules/angular2/src/core/util/decorators.js');
  exports.Inject = decorators_1.makeParamDecorator(metadata_1.InjectMetadata);
  exports.Optional = decorators_1.makeParamDecorator(metadata_1.OptionalMetadata);
  exports.Injectable = decorators_1.makeDecorator(metadata_1.InjectableMetadata);
  exports.Self = decorators_1.makeParamDecorator(metadata_1.SelfMetadata);
  exports.Host = decorators_1.makeParamDecorator(metadata_1.HostMetadata);
  exports.SkipSelf = decorators_1.makeParamDecorator(metadata_1.SkipSelfMetadata);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/di/injector.js", ["node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/di/provider.js", "node_modules/angular2/src/core/di/exceptions.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/core/di/key.js", "node_modules/angular2/src/core/di/metadata.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var provider_1 = $__require('node_modules/angular2/src/core/di/provider.js');
  var exceptions_1 = $__require('node_modules/angular2/src/core/di/exceptions.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_2 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var key_1 = $__require('node_modules/angular2/src/core/di/key.js');
  var metadata_1 = $__require('node_modules/angular2/src/core/di/metadata.js');
  var _MAX_CONSTRUCTION_COUNTER = 10;
  exports.UNDEFINED = lang_1.CONST_EXPR(new Object());
  (function(Visibility) {
    Visibility[Visibility["Public"] = 0] = "Public";
    Visibility[Visibility["Private"] = 1] = "Private";
    Visibility[Visibility["PublicAndPrivate"] = 2] = "PublicAndPrivate";
  })(exports.Visibility || (exports.Visibility = {}));
  var Visibility = exports.Visibility;
  function canSee(src, dst) {
    return (src === dst) || (dst === Visibility.PublicAndPrivate || src === Visibility.PublicAndPrivate);
  }
  var ProtoInjectorInlineStrategy = (function() {
    function ProtoInjectorInlineStrategy(protoEI, bwv) {
      this.provider0 = null;
      this.provider1 = null;
      this.provider2 = null;
      this.provider3 = null;
      this.provider4 = null;
      this.provider5 = null;
      this.provider6 = null;
      this.provider7 = null;
      this.provider8 = null;
      this.provider9 = null;
      this.keyId0 = null;
      this.keyId1 = null;
      this.keyId2 = null;
      this.keyId3 = null;
      this.keyId4 = null;
      this.keyId5 = null;
      this.keyId6 = null;
      this.keyId7 = null;
      this.keyId8 = null;
      this.keyId9 = null;
      this.visibility0 = null;
      this.visibility1 = null;
      this.visibility2 = null;
      this.visibility3 = null;
      this.visibility4 = null;
      this.visibility5 = null;
      this.visibility6 = null;
      this.visibility7 = null;
      this.visibility8 = null;
      this.visibility9 = null;
      var length = bwv.length;
      if (length > 0) {
        this.provider0 = bwv[0].provider;
        this.keyId0 = bwv[0].getKeyId();
        this.visibility0 = bwv[0].visibility;
      }
      if (length > 1) {
        this.provider1 = bwv[1].provider;
        this.keyId1 = bwv[1].getKeyId();
        this.visibility1 = bwv[1].visibility;
      }
      if (length > 2) {
        this.provider2 = bwv[2].provider;
        this.keyId2 = bwv[2].getKeyId();
        this.visibility2 = bwv[2].visibility;
      }
      if (length > 3) {
        this.provider3 = bwv[3].provider;
        this.keyId3 = bwv[3].getKeyId();
        this.visibility3 = bwv[3].visibility;
      }
      if (length > 4) {
        this.provider4 = bwv[4].provider;
        this.keyId4 = bwv[4].getKeyId();
        this.visibility4 = bwv[4].visibility;
      }
      if (length > 5) {
        this.provider5 = bwv[5].provider;
        this.keyId5 = bwv[5].getKeyId();
        this.visibility5 = bwv[5].visibility;
      }
      if (length > 6) {
        this.provider6 = bwv[6].provider;
        this.keyId6 = bwv[6].getKeyId();
        this.visibility6 = bwv[6].visibility;
      }
      if (length > 7) {
        this.provider7 = bwv[7].provider;
        this.keyId7 = bwv[7].getKeyId();
        this.visibility7 = bwv[7].visibility;
      }
      if (length > 8) {
        this.provider8 = bwv[8].provider;
        this.keyId8 = bwv[8].getKeyId();
        this.visibility8 = bwv[8].visibility;
      }
      if (length > 9) {
        this.provider9 = bwv[9].provider;
        this.keyId9 = bwv[9].getKeyId();
        this.visibility9 = bwv[9].visibility;
      }
    }
    ProtoInjectorInlineStrategy.prototype.getProviderAtIndex = function(index) {
      if (index == 0)
        return this.provider0;
      if (index == 1)
        return this.provider1;
      if (index == 2)
        return this.provider2;
      if (index == 3)
        return this.provider3;
      if (index == 4)
        return this.provider4;
      if (index == 5)
        return this.provider5;
      if (index == 6)
        return this.provider6;
      if (index == 7)
        return this.provider7;
      if (index == 8)
        return this.provider8;
      if (index == 9)
        return this.provider9;
      throw new exceptions_1.OutOfBoundsError(index);
    };
    ProtoInjectorInlineStrategy.prototype.createInjectorStrategy = function(injector) {
      return new InjectorInlineStrategy(injector, this);
    };
    return ProtoInjectorInlineStrategy;
  })();
  exports.ProtoInjectorInlineStrategy = ProtoInjectorInlineStrategy;
  var ProtoInjectorDynamicStrategy = (function() {
    function ProtoInjectorDynamicStrategy(protoInj, bwv) {
      var len = bwv.length;
      this.providers = collection_1.ListWrapper.createFixedSize(len);
      this.keyIds = collection_1.ListWrapper.createFixedSize(len);
      this.visibilities = collection_1.ListWrapper.createFixedSize(len);
      for (var i = 0; i < len; i++) {
        this.providers[i] = bwv[i].provider;
        this.keyIds[i] = bwv[i].getKeyId();
        this.visibilities[i] = bwv[i].visibility;
      }
    }
    ProtoInjectorDynamicStrategy.prototype.getProviderAtIndex = function(index) {
      if (index < 0 || index >= this.providers.length) {
        throw new exceptions_1.OutOfBoundsError(index);
      }
      return this.providers[index];
    };
    ProtoInjectorDynamicStrategy.prototype.createInjectorStrategy = function(ei) {
      return new InjectorDynamicStrategy(this, ei);
    };
    return ProtoInjectorDynamicStrategy;
  })();
  exports.ProtoInjectorDynamicStrategy = ProtoInjectorDynamicStrategy;
  var ProtoInjector = (function() {
    function ProtoInjector(bwv) {
      this.numberOfProviders = bwv.length;
      this._strategy = bwv.length > _MAX_CONSTRUCTION_COUNTER ? new ProtoInjectorDynamicStrategy(this, bwv) : new ProtoInjectorInlineStrategy(this, bwv);
    }
    ProtoInjector.fromResolvedProviders = function(providers) {
      var bd = providers.map(function(b) {
        return new ProviderWithVisibility(b, Visibility.Public);
      });
      return new ProtoInjector(bd);
    };
    ProtoInjector.prototype.getProviderAtIndex = function(index) {
      return this._strategy.getProviderAtIndex(index);
    };
    return ProtoInjector;
  })();
  exports.ProtoInjector = ProtoInjector;
  var InjectorInlineStrategy = (function() {
    function InjectorInlineStrategy(injector, protoStrategy) {
      this.injector = injector;
      this.protoStrategy = protoStrategy;
      this.obj0 = exports.UNDEFINED;
      this.obj1 = exports.UNDEFINED;
      this.obj2 = exports.UNDEFINED;
      this.obj3 = exports.UNDEFINED;
      this.obj4 = exports.UNDEFINED;
      this.obj5 = exports.UNDEFINED;
      this.obj6 = exports.UNDEFINED;
      this.obj7 = exports.UNDEFINED;
      this.obj8 = exports.UNDEFINED;
      this.obj9 = exports.UNDEFINED;
    }
    InjectorInlineStrategy.prototype.resetConstructionCounter = function() {
      this.injector._constructionCounter = 0;
    };
    InjectorInlineStrategy.prototype.instantiateProvider = function(provider, visibility) {
      return this.injector._new(provider, visibility);
    };
    InjectorInlineStrategy.prototype.getObjByKeyId = function(keyId, visibility) {
      var p = this.protoStrategy;
      var inj = this.injector;
      if (p.keyId0 === keyId && canSee(p.visibility0, visibility)) {
        if (this.obj0 === exports.UNDEFINED) {
          this.obj0 = inj._new(p.provider0, p.visibility0);
        }
        return this.obj0;
      }
      if (p.keyId1 === keyId && canSee(p.visibility1, visibility)) {
        if (this.obj1 === exports.UNDEFINED) {
          this.obj1 = inj._new(p.provider1, p.visibility1);
        }
        return this.obj1;
      }
      if (p.keyId2 === keyId && canSee(p.visibility2, visibility)) {
        if (this.obj2 === exports.UNDEFINED) {
          this.obj2 = inj._new(p.provider2, p.visibility2);
        }
        return this.obj2;
      }
      if (p.keyId3 === keyId && canSee(p.visibility3, visibility)) {
        if (this.obj3 === exports.UNDEFINED) {
          this.obj3 = inj._new(p.provider3, p.visibility3);
        }
        return this.obj3;
      }
      if (p.keyId4 === keyId && canSee(p.visibility4, visibility)) {
        if (this.obj4 === exports.UNDEFINED) {
          this.obj4 = inj._new(p.provider4, p.visibility4);
        }
        return this.obj4;
      }
      if (p.keyId5 === keyId && canSee(p.visibility5, visibility)) {
        if (this.obj5 === exports.UNDEFINED) {
          this.obj5 = inj._new(p.provider5, p.visibility5);
        }
        return this.obj5;
      }
      if (p.keyId6 === keyId && canSee(p.visibility6, visibility)) {
        if (this.obj6 === exports.UNDEFINED) {
          this.obj6 = inj._new(p.provider6, p.visibility6);
        }
        return this.obj6;
      }
      if (p.keyId7 === keyId && canSee(p.visibility7, visibility)) {
        if (this.obj7 === exports.UNDEFINED) {
          this.obj7 = inj._new(p.provider7, p.visibility7);
        }
        return this.obj7;
      }
      if (p.keyId8 === keyId && canSee(p.visibility8, visibility)) {
        if (this.obj8 === exports.UNDEFINED) {
          this.obj8 = inj._new(p.provider8, p.visibility8);
        }
        return this.obj8;
      }
      if (p.keyId9 === keyId && canSee(p.visibility9, visibility)) {
        if (this.obj9 === exports.UNDEFINED) {
          this.obj9 = inj._new(p.provider9, p.visibility9);
        }
        return this.obj9;
      }
      return exports.UNDEFINED;
    };
    InjectorInlineStrategy.prototype.getObjAtIndex = function(index) {
      if (index == 0)
        return this.obj0;
      if (index == 1)
        return this.obj1;
      if (index == 2)
        return this.obj2;
      if (index == 3)
        return this.obj3;
      if (index == 4)
        return this.obj4;
      if (index == 5)
        return this.obj5;
      if (index == 6)
        return this.obj6;
      if (index == 7)
        return this.obj7;
      if (index == 8)
        return this.obj8;
      if (index == 9)
        return this.obj9;
      throw new exceptions_1.OutOfBoundsError(index);
    };
    InjectorInlineStrategy.prototype.getMaxNumberOfObjects = function() {
      return _MAX_CONSTRUCTION_COUNTER;
    };
    return InjectorInlineStrategy;
  })();
  exports.InjectorInlineStrategy = InjectorInlineStrategy;
  var InjectorDynamicStrategy = (function() {
    function InjectorDynamicStrategy(protoStrategy, injector) {
      this.protoStrategy = protoStrategy;
      this.injector = injector;
      this.objs = collection_1.ListWrapper.createFixedSize(protoStrategy.providers.length);
      collection_1.ListWrapper.fill(this.objs, exports.UNDEFINED);
    }
    InjectorDynamicStrategy.prototype.resetConstructionCounter = function() {
      this.injector._constructionCounter = 0;
    };
    InjectorDynamicStrategy.prototype.instantiateProvider = function(provider, visibility) {
      return this.injector._new(provider, visibility);
    };
    InjectorDynamicStrategy.prototype.getObjByKeyId = function(keyId, visibility) {
      var p = this.protoStrategy;
      for (var i = 0; i < p.keyIds.length; i++) {
        if (p.keyIds[i] === keyId && canSee(p.visibilities[i], visibility)) {
          if (this.objs[i] === exports.UNDEFINED) {
            this.objs[i] = this.injector._new(p.providers[i], p.visibilities[i]);
          }
          return this.objs[i];
        }
      }
      return exports.UNDEFINED;
    };
    InjectorDynamicStrategy.prototype.getObjAtIndex = function(index) {
      if (index < 0 || index >= this.objs.length) {
        throw new exceptions_1.OutOfBoundsError(index);
      }
      return this.objs[index];
    };
    InjectorDynamicStrategy.prototype.getMaxNumberOfObjects = function() {
      return this.objs.length;
    };
    return InjectorDynamicStrategy;
  })();
  exports.InjectorDynamicStrategy = InjectorDynamicStrategy;
  var ProviderWithVisibility = (function() {
    function ProviderWithVisibility(provider, visibility) {
      this.provider = provider;
      this.visibility = visibility;
    }
    ;
    ProviderWithVisibility.prototype.getKeyId = function() {
      return this.provider.key.id;
    };
    return ProviderWithVisibility;
  })();
  exports.ProviderWithVisibility = ProviderWithVisibility;
  var Injector = (function() {
    function Injector(_proto, _parent, _isHostBoundary, _depProvider, _debugContext) {
      if (_parent === void 0) {
        _parent = null;
      }
      if (_isHostBoundary === void 0) {
        _isHostBoundary = false;
      }
      if (_depProvider === void 0) {
        _depProvider = null;
      }
      if (_debugContext === void 0) {
        _debugContext = null;
      }
      this._isHostBoundary = _isHostBoundary;
      this._depProvider = _depProvider;
      this._debugContext = _debugContext;
      this._constructionCounter = 0;
      this._proto = _proto;
      this._parent = _parent;
      this._strategy = _proto._strategy.createInjectorStrategy(this);
    }
    Injector.resolve = function(providers) {
      return provider_1.resolveProviders(providers);
    };
    Injector.resolveAndCreate = function(providers) {
      var resolvedProviders = Injector.resolve(providers);
      return Injector.fromResolvedProviders(resolvedProviders);
    };
    Injector.fromResolvedProviders = function(providers) {
      return new Injector(ProtoInjector.fromResolvedProviders(providers));
    };
    Injector.fromResolvedBindings = function(providers) {
      return Injector.fromResolvedProviders(providers);
    };
    Object.defineProperty(Injector.prototype, "hostBoundary", {
      get: function() {
        return this._isHostBoundary;
      },
      enumerable: true,
      configurable: true
    });
    Injector.prototype.debugContext = function() {
      return this._debugContext();
    };
    Injector.prototype.get = function(token) {
      return this._getByKey(key_1.Key.get(token), null, null, false, Visibility.PublicAndPrivate);
    };
    Injector.prototype.getOptional = function(token) {
      return this._getByKey(key_1.Key.get(token), null, null, true, Visibility.PublicAndPrivate);
    };
    Injector.prototype.getAt = function(index) {
      return this._strategy.getObjAtIndex(index);
    };
    Object.defineProperty(Injector.prototype, "parent", {
      get: function() {
        return this._parent;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Injector.prototype, "internalStrategy", {
      get: function() {
        return this._strategy;
      },
      enumerable: true,
      configurable: true
    });
    Injector.prototype.resolveAndCreateChild = function(providers) {
      var resolvedProviders = Injector.resolve(providers);
      return this.createChildFromResolved(resolvedProviders);
    };
    Injector.prototype.createChildFromResolved = function(providers) {
      var bd = providers.map(function(b) {
        return new ProviderWithVisibility(b, Visibility.Public);
      });
      var proto = new ProtoInjector(bd);
      var inj = new Injector(proto);
      inj._parent = this;
      return inj;
    };
    Injector.prototype.resolveAndInstantiate = function(provider) {
      return this.instantiateResolved(Injector.resolve([provider])[0]);
    };
    Injector.prototype.instantiateResolved = function(provider) {
      return this._instantiateProvider(provider, Visibility.PublicAndPrivate);
    };
    Injector.prototype._new = function(provider, visibility) {
      if (this._constructionCounter++ > this._strategy.getMaxNumberOfObjects()) {
        throw new exceptions_1.CyclicDependencyError(this, provider.key);
      }
      return this._instantiateProvider(provider, visibility);
    };
    Injector.prototype._instantiateProvider = function(provider, visibility) {
      if (provider.multiProvider) {
        var res = collection_1.ListWrapper.createFixedSize(provider.resolvedFactories.length);
        for (var i = 0; i < provider.resolvedFactories.length; ++i) {
          res[i] = this._instantiate(provider, provider.resolvedFactories[i], visibility);
        }
        return res;
      } else {
        return this._instantiate(provider, provider.resolvedFactories[0], visibility);
      }
    };
    Injector.prototype._instantiate = function(provider, resolvedFactory, visibility) {
      var factory = resolvedFactory.factory;
      var deps = resolvedFactory.dependencies;
      var length = deps.length;
      var d0;
      var d1;
      var d2;
      var d3;
      var d4;
      var d5;
      var d6;
      var d7;
      var d8;
      var d9;
      var d10;
      var d11;
      var d12;
      var d13;
      var d14;
      var d15;
      var d16;
      var d17;
      var d18;
      var d19;
      try {
        d0 = length > 0 ? this._getByDependency(provider, deps[0], visibility) : null;
        d1 = length > 1 ? this._getByDependency(provider, deps[1], visibility) : null;
        d2 = length > 2 ? this._getByDependency(provider, deps[2], visibility) : null;
        d3 = length > 3 ? this._getByDependency(provider, deps[3], visibility) : null;
        d4 = length > 4 ? this._getByDependency(provider, deps[4], visibility) : null;
        d5 = length > 5 ? this._getByDependency(provider, deps[5], visibility) : null;
        d6 = length > 6 ? this._getByDependency(provider, deps[6], visibility) : null;
        d7 = length > 7 ? this._getByDependency(provider, deps[7], visibility) : null;
        d8 = length > 8 ? this._getByDependency(provider, deps[8], visibility) : null;
        d9 = length > 9 ? this._getByDependency(provider, deps[9], visibility) : null;
        d10 = length > 10 ? this._getByDependency(provider, deps[10], visibility) : null;
        d11 = length > 11 ? this._getByDependency(provider, deps[11], visibility) : null;
        d12 = length > 12 ? this._getByDependency(provider, deps[12], visibility) : null;
        d13 = length > 13 ? this._getByDependency(provider, deps[13], visibility) : null;
        d14 = length > 14 ? this._getByDependency(provider, deps[14], visibility) : null;
        d15 = length > 15 ? this._getByDependency(provider, deps[15], visibility) : null;
        d16 = length > 16 ? this._getByDependency(provider, deps[16], visibility) : null;
        d17 = length > 17 ? this._getByDependency(provider, deps[17], visibility) : null;
        d18 = length > 18 ? this._getByDependency(provider, deps[18], visibility) : null;
        d19 = length > 19 ? this._getByDependency(provider, deps[19], visibility) : null;
      } catch (e) {
        if (e instanceof exceptions_1.AbstractProviderError || e instanceof exceptions_1.InstantiationError) {
          e.addKey(this, provider.key);
        }
        throw e;
      }
      var obj;
      try {
        switch (length) {
          case 0:
            obj = factory();
            break;
          case 1:
            obj = factory(d0);
            break;
          case 2:
            obj = factory(d0, d1);
            break;
          case 3:
            obj = factory(d0, d1, d2);
            break;
          case 4:
            obj = factory(d0, d1, d2, d3);
            break;
          case 5:
            obj = factory(d0, d1, d2, d3, d4);
            break;
          case 6:
            obj = factory(d0, d1, d2, d3, d4, d5);
            break;
          case 7:
            obj = factory(d0, d1, d2, d3, d4, d5, d6);
            break;
          case 8:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7);
            break;
          case 9:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8);
            break;
          case 10:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9);
            break;
          case 11:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10);
            break;
          case 12:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11);
            break;
          case 13:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12);
            break;
          case 14:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13);
            break;
          case 15:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14);
            break;
          case 16:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15);
            break;
          case 17:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16);
            break;
          case 18:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17);
            break;
          case 19:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18);
            break;
          case 20:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19);
            break;
          default:
            throw new exceptions_2.BaseException("Cannot instantiate '" + provider.key.displayName + "' because it has more than 20 dependencies");
        }
      } catch (e) {
        throw new exceptions_1.InstantiationError(this, e, e.stack, provider.key);
      }
      return obj;
    };
    Injector.prototype._getByDependency = function(provider, dep, providerVisibility) {
      var special = lang_1.isPresent(this._depProvider) ? this._depProvider.getDependency(this, provider, dep) : exports.UNDEFINED;
      if (special !== exports.UNDEFINED) {
        return special;
      } else {
        return this._getByKey(dep.key, dep.lowerBoundVisibility, dep.upperBoundVisibility, dep.optional, providerVisibility);
      }
    };
    Injector.prototype._getByKey = function(key, lowerBoundVisibility, upperBoundVisibility, optional, providerVisibility) {
      if (key === INJECTOR_KEY) {
        return this;
      }
      if (upperBoundVisibility instanceof metadata_1.SelfMetadata) {
        return this._getByKeySelf(key, optional, providerVisibility);
      } else if (upperBoundVisibility instanceof metadata_1.HostMetadata) {
        return this._getByKeyHost(key, optional, providerVisibility, lowerBoundVisibility);
      } else {
        return this._getByKeyDefault(key, optional, providerVisibility, lowerBoundVisibility);
      }
    };
    Injector.prototype._throwOrNull = function(key, optional) {
      if (optional) {
        return null;
      } else {
        throw new exceptions_1.NoProviderError(this, key);
      }
    };
    Injector.prototype._getByKeySelf = function(key, optional, providerVisibility) {
      var obj = this._strategy.getObjByKeyId(key.id, providerVisibility);
      return (obj !== exports.UNDEFINED) ? obj : this._throwOrNull(key, optional);
    };
    Injector.prototype._getByKeyHost = function(key, optional, providerVisibility, lowerBoundVisibility) {
      var inj = this;
      if (lowerBoundVisibility instanceof metadata_1.SkipSelfMetadata) {
        if (inj._isHostBoundary) {
          return this._getPrivateDependency(key, optional, inj);
        } else {
          inj = inj._parent;
        }
      }
      while (inj != null) {
        var obj = inj._strategy.getObjByKeyId(key.id, providerVisibility);
        if (obj !== exports.UNDEFINED)
          return obj;
        if (lang_1.isPresent(inj._parent) && inj._isHostBoundary) {
          return this._getPrivateDependency(key, optional, inj);
        } else {
          inj = inj._parent;
        }
      }
      return this._throwOrNull(key, optional);
    };
    Injector.prototype._getPrivateDependency = function(key, optional, inj) {
      var obj = inj._parent._strategy.getObjByKeyId(key.id, Visibility.Private);
      return (obj !== exports.UNDEFINED) ? obj : this._throwOrNull(key, optional);
    };
    Injector.prototype._getByKeyDefault = function(key, optional, providerVisibility, lowerBoundVisibility) {
      var inj = this;
      if (lowerBoundVisibility instanceof metadata_1.SkipSelfMetadata) {
        providerVisibility = inj._isHostBoundary ? Visibility.PublicAndPrivate : Visibility.Public;
        inj = inj._parent;
      }
      while (inj != null) {
        var obj = inj._strategy.getObjByKeyId(key.id, providerVisibility);
        if (obj !== exports.UNDEFINED)
          return obj;
        providerVisibility = inj._isHostBoundary ? Visibility.PublicAndPrivate : Visibility.Public;
        inj = inj._parent;
      }
      return this._throwOrNull(key, optional);
    };
    Object.defineProperty(Injector.prototype, "displayName", {
      get: function() {
        return "Injector(providers: [" + _mapProviders(this, function(b) {
          return (" \"" + b.key.displayName + "\" ");
        }).join(", ") + "])";
      },
      enumerable: true,
      configurable: true
    });
    Injector.prototype.toString = function() {
      return this.displayName;
    };
    return Injector;
  })();
  exports.Injector = Injector;
  var INJECTOR_KEY = key_1.Key.get(Injector);
  function _mapProviders(injector, fn) {
    var res = [];
    for (var i = 0; i < injector._proto.numberOfProviders; ++i) {
      res.push(fn(injector._proto.getProviderAtIndex(i)));
    }
    return res;
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/di/metadata.js", ["node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var InjectMetadata = (function() {
    function InjectMetadata(token) {
      this.token = token;
    }
    InjectMetadata.prototype.toString = function() {
      return "@Inject(" + lang_1.stringify(this.token) + ")";
    };
    InjectMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Object])], InjectMetadata);
    return InjectMetadata;
  })();
  exports.InjectMetadata = InjectMetadata;
  var OptionalMetadata = (function() {
    function OptionalMetadata() {}
    OptionalMetadata.prototype.toString = function() {
      return "@Optional()";
    };
    OptionalMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [])], OptionalMetadata);
    return OptionalMetadata;
  })();
  exports.OptionalMetadata = OptionalMetadata;
  var DependencyMetadata = (function() {
    function DependencyMetadata() {}
    Object.defineProperty(DependencyMetadata.prototype, "token", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    DependencyMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [])], DependencyMetadata);
    return DependencyMetadata;
  })();
  exports.DependencyMetadata = DependencyMetadata;
  var InjectableMetadata = (function() {
    function InjectableMetadata() {}
    InjectableMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [])], InjectableMetadata);
    return InjectableMetadata;
  })();
  exports.InjectableMetadata = InjectableMetadata;
  var SelfMetadata = (function() {
    function SelfMetadata() {}
    SelfMetadata.prototype.toString = function() {
      return "@Self()";
    };
    SelfMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [])], SelfMetadata);
    return SelfMetadata;
  })();
  exports.SelfMetadata = SelfMetadata;
  var SkipSelfMetadata = (function() {
    function SkipSelfMetadata() {}
    SkipSelfMetadata.prototype.toString = function() {
      return "@SkipSelf()";
    };
    SkipSelfMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [])], SkipSelfMetadata);
    return SkipSelfMetadata;
  })();
  exports.SkipSelfMetadata = SkipSelfMetadata;
  var HostMetadata = (function() {
    function HostMetadata() {}
    HostMetadata.prototype.toString = function() {
      return "@Host()";
    };
    HostMetadata = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [])], HostMetadata);
    return HostMetadata;
  })();
  exports.HostMetadata = HostMetadata;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/di/provider.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/core/reflection/reflection.js", "node_modules/angular2/src/core/di/key.js", "node_modules/angular2/src/core/di/metadata.js", "node_modules/angular2/src/core/di/exceptions.js", "node_modules/angular2/src/core/di/forward_ref.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var reflection_1 = $__require('node_modules/angular2/src/core/reflection/reflection.js');
  var key_1 = $__require('node_modules/angular2/src/core/di/key.js');
  var metadata_1 = $__require('node_modules/angular2/src/core/di/metadata.js');
  var exceptions_2 = $__require('node_modules/angular2/src/core/di/exceptions.js');
  var forward_ref_1 = $__require('node_modules/angular2/src/core/di/forward_ref.js');
  var Dependency = (function() {
    function Dependency(key, optional, lowerBoundVisibility, upperBoundVisibility, properties) {
      this.key = key;
      this.optional = optional;
      this.lowerBoundVisibility = lowerBoundVisibility;
      this.upperBoundVisibility = upperBoundVisibility;
      this.properties = properties;
    }
    Dependency.fromKey = function(key) {
      return new Dependency(key, false, null, null, []);
    };
    return Dependency;
  })();
  exports.Dependency = Dependency;
  var _EMPTY_LIST = lang_1.CONST_EXPR([]);
  var Provider = (function() {
    function Provider(token, _a) {
      var useClass = _a.useClass,
          useValue = _a.useValue,
          useExisting = _a.useExisting,
          useFactory = _a.useFactory,
          deps = _a.deps,
          multi = _a.multi;
      this.token = token;
      this.useClass = useClass;
      this.useValue = useValue;
      this.useExisting = useExisting;
      this.useFactory = useFactory;
      this.dependencies = deps;
      this._multi = multi;
    }
    Object.defineProperty(Provider.prototype, "multi", {
      get: function() {
        return lang_1.normalizeBool(this._multi);
      },
      enumerable: true,
      configurable: true
    });
    Provider = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Object, Object])], Provider);
    return Provider;
  })();
  exports.Provider = Provider;
  var Binding = (function(_super) {
    __extends(Binding, _super);
    function Binding(token, _a) {
      var toClass = _a.toClass,
          toValue = _a.toValue,
          toAlias = _a.toAlias,
          toFactory = _a.toFactory,
          deps = _a.deps,
          multi = _a.multi;
      _super.call(this, token, {
        useClass: toClass,
        useValue: toValue,
        useExisting: toAlias,
        useFactory: toFactory,
        deps: deps,
        multi: multi
      });
    }
    Object.defineProperty(Binding.prototype, "toClass", {
      get: function() {
        return this.useClass;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Binding.prototype, "toAlias", {
      get: function() {
        return this.useExisting;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Binding.prototype, "toFactory", {
      get: function() {
        return this.useFactory;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Binding.prototype, "toValue", {
      get: function() {
        return this.useValue;
      },
      enumerable: true,
      configurable: true
    });
    Binding = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [Object, Object])], Binding);
    return Binding;
  })(Provider);
  exports.Binding = Binding;
  var ResolvedProvider_ = (function() {
    function ResolvedProvider_(key, resolvedFactories, multiProvider) {
      this.key = key;
      this.resolvedFactories = resolvedFactories;
      this.multiProvider = multiProvider;
    }
    Object.defineProperty(ResolvedProvider_.prototype, "resolvedFactory", {
      get: function() {
        return this.resolvedFactories[0];
      },
      enumerable: true,
      configurable: true
    });
    return ResolvedProvider_;
  })();
  exports.ResolvedProvider_ = ResolvedProvider_;
  var ResolvedFactory = (function() {
    function ResolvedFactory(factory, dependencies) {
      this.factory = factory;
      this.dependencies = dependencies;
    }
    return ResolvedFactory;
  })();
  exports.ResolvedFactory = ResolvedFactory;
  function bind(token) {
    return new ProviderBuilder(token);
  }
  exports.bind = bind;
  function provide(token, _a) {
    var useClass = _a.useClass,
        useValue = _a.useValue,
        useExisting = _a.useExisting,
        useFactory = _a.useFactory,
        deps = _a.deps,
        multi = _a.multi;
    return new Provider(token, {
      useClass: useClass,
      useValue: useValue,
      useExisting: useExisting,
      useFactory: useFactory,
      deps: deps,
      multi: multi
    });
  }
  exports.provide = provide;
  var ProviderBuilder = (function() {
    function ProviderBuilder(token) {
      this.token = token;
    }
    ProviderBuilder.prototype.toClass = function(type) {
      if (!lang_1.isType(type)) {
        throw new exceptions_1.BaseException("Trying to create a class provider but \"" + lang_1.stringify(type) + "\" is not a class!");
      }
      return new Provider(this.token, {useClass: type});
    };
    ProviderBuilder.prototype.toValue = function(value) {
      return new Provider(this.token, {useValue: value});
    };
    ProviderBuilder.prototype.toAlias = function(aliasToken) {
      if (lang_1.isBlank(aliasToken)) {
        throw new exceptions_1.BaseException("Can not alias " + lang_1.stringify(this.token) + " to a blank value!");
      }
      return new Provider(this.token, {useExisting: aliasToken});
    };
    ProviderBuilder.prototype.toFactory = function(factory, dependencies) {
      if (!lang_1.isFunction(factory)) {
        throw new exceptions_1.BaseException("Trying to create a factory provider but \"" + lang_1.stringify(factory) + "\" is not a function!");
      }
      return new Provider(this.token, {
        useFactory: factory,
        deps: dependencies
      });
    };
    return ProviderBuilder;
  })();
  exports.ProviderBuilder = ProviderBuilder;
  function resolveFactory(provider) {
    var factoryFn;
    var resolvedDeps;
    if (lang_1.isPresent(provider.useClass)) {
      var useClass = forward_ref_1.resolveForwardRef(provider.useClass);
      factoryFn = reflection_1.reflector.factory(useClass);
      resolvedDeps = _dependenciesFor(useClass);
    } else if (lang_1.isPresent(provider.useExisting)) {
      factoryFn = function(aliasInstance) {
        return aliasInstance;
      };
      resolvedDeps = [Dependency.fromKey(key_1.Key.get(provider.useExisting))];
    } else if (lang_1.isPresent(provider.useFactory)) {
      factoryFn = provider.useFactory;
      resolvedDeps = _constructDependencies(provider.useFactory, provider.dependencies);
    } else {
      factoryFn = function() {
        return provider.useValue;
      };
      resolvedDeps = _EMPTY_LIST;
    }
    return new ResolvedFactory(factoryFn, resolvedDeps);
  }
  exports.resolveFactory = resolveFactory;
  function resolveProvider(provider) {
    return new ResolvedProvider_(key_1.Key.get(provider.token), [resolveFactory(provider)], provider.multi);
  }
  exports.resolveProvider = resolveProvider;
  function resolveProviders(providers) {
    var normalized = _normalizeProviders(providers, []);
    var resolved = normalized.map(resolveProvider);
    return collection_1.MapWrapper.values(mergeResolvedProviders(resolved, new Map()));
  }
  exports.resolveProviders = resolveProviders;
  function mergeResolvedProviders(providers, normalizedProvidersMap) {
    for (var i = 0; i < providers.length; i++) {
      var provider = providers[i];
      var existing = normalizedProvidersMap.get(provider.key.id);
      if (lang_1.isPresent(existing)) {
        if (provider.multiProvider !== existing.multiProvider) {
          throw new exceptions_2.MixingMultiProvidersWithRegularProvidersError(existing, provider);
        }
        if (provider.multiProvider) {
          for (var j = 0; j < provider.resolvedFactories.length; j++) {
            existing.resolvedFactories.push(provider.resolvedFactories[j]);
          }
        } else {
          normalizedProvidersMap.set(provider.key.id, provider);
        }
      } else {
        var resolvedProvider;
        if (provider.multiProvider) {
          resolvedProvider = new ResolvedProvider_(provider.key, collection_1.ListWrapper.clone(provider.resolvedFactories), provider.multiProvider);
        } else {
          resolvedProvider = provider;
        }
        normalizedProvidersMap.set(provider.key.id, resolvedProvider);
      }
    }
    return normalizedProvidersMap;
  }
  exports.mergeResolvedProviders = mergeResolvedProviders;
  function _normalizeProviders(providers, res) {
    providers.forEach(function(b) {
      if (b instanceof lang_1.Type) {
        res.push(provide(b, {useClass: b}));
      } else if (b instanceof Provider) {
        res.push(b);
      } else if (b instanceof Array) {
        _normalizeProviders(b, res);
      } else if (b instanceof ProviderBuilder) {
        throw new exceptions_2.InvalidProviderError(b.token);
      } else {
        throw new exceptions_2.InvalidProviderError(b);
      }
    });
    return res;
  }
  function _constructDependencies(factoryFunction, dependencies) {
    if (lang_1.isBlank(dependencies)) {
      return _dependenciesFor(factoryFunction);
    } else {
      var params = dependencies.map(function(t) {
        return [t];
      });
      return dependencies.map(function(t) {
        return _extractToken(factoryFunction, t, params);
      });
    }
  }
  function _dependenciesFor(typeOrFunc) {
    var params = reflection_1.reflector.parameters(typeOrFunc);
    if (lang_1.isBlank(params))
      return [];
    if (params.some(lang_1.isBlank)) {
      throw new exceptions_2.NoAnnotationError(typeOrFunc, params);
    }
    return params.map(function(p) {
      return _extractToken(typeOrFunc, p, params);
    });
  }
  function _extractToken(typeOrFunc, metadata, params) {
    var depProps = [];
    var token = null;
    var optional = false;
    if (!lang_1.isArray(metadata)) {
      if (metadata instanceof metadata_1.InjectMetadata) {
        return _createDependency(metadata.token, optional, null, null, depProps);
      } else {
        return _createDependency(metadata, optional, null, null, depProps);
      }
    }
    var lowerBoundVisibility = null;
    var upperBoundVisibility = null;
    for (var i = 0; i < metadata.length; ++i) {
      var paramMetadata = metadata[i];
      if (paramMetadata instanceof lang_1.Type) {
        token = paramMetadata;
      } else if (paramMetadata instanceof metadata_1.InjectMetadata) {
        token = paramMetadata.token;
      } else if (paramMetadata instanceof metadata_1.OptionalMetadata) {
        optional = true;
      } else if (paramMetadata instanceof metadata_1.SelfMetadata) {
        upperBoundVisibility = paramMetadata;
      } else if (paramMetadata instanceof metadata_1.HostMetadata) {
        upperBoundVisibility = paramMetadata;
      } else if (paramMetadata instanceof metadata_1.SkipSelfMetadata) {
        lowerBoundVisibility = paramMetadata;
      } else if (paramMetadata instanceof metadata_1.DependencyMetadata) {
        if (lang_1.isPresent(paramMetadata.token)) {
          token = paramMetadata.token;
        }
        depProps.push(paramMetadata);
      }
    }
    token = forward_ref_1.resolveForwardRef(token);
    if (lang_1.isPresent(token)) {
      return _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps);
    } else {
      throw new exceptions_2.NoAnnotationError(typeOrFunc, params);
    }
  }
  function _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps) {
    return new Dependency(key_1.Key.get(token), optional, lowerBoundVisibility, upperBoundVisibility, depProps);
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/di/forward_ref.js", ["node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function() {
      return lang_1.stringify(this());
    };
    return forwardRefFn;
  }
  exports.forwardRef = forwardRef;
  function resolveForwardRef(type) {
    if (lang_1.isFunction(type) && type.hasOwnProperty('__forward_ref__') && type.__forward_ref__ === forwardRef) {
      return type();
    } else {
      return type;
    }
  }
  exports.resolveForwardRef = resolveForwardRef;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/di/key.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/core/di/forward_ref.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var forward_ref_1 = $__require('node_modules/angular2/src/core/di/forward_ref.js');
  var Key = (function() {
    function Key(token, id) {
      this.token = token;
      this.id = id;
      if (lang_1.isBlank(token)) {
        throw new exceptions_1.BaseException('Token must be defined!');
      }
    }
    Object.defineProperty(Key.prototype, "displayName", {
      get: function() {
        return lang_1.stringify(this.token);
      },
      enumerable: true,
      configurable: true
    });
    Key.get = function(token) {
      return _globalKeyRegistry.get(forward_ref_1.resolveForwardRef(token));
    };
    Object.defineProperty(Key, "numberOfKeys", {
      get: function() {
        return _globalKeyRegistry.numberOfKeys;
      },
      enumerable: true,
      configurable: true
    });
    return Key;
  })();
  exports.Key = Key;
  var KeyRegistry = (function() {
    function KeyRegistry() {
      this._allKeys = new Map();
    }
    KeyRegistry.prototype.get = function(token) {
      if (token instanceof Key)
        return token;
      if (this._allKeys.has(token)) {
        return this._allKeys.get(token);
      }
      var newKey = new Key(token, Key.numberOfKeys);
      this._allKeys.set(token, newKey);
      return newKey;
    };
    Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
      get: function() {
        return this._allKeys.size;
      },
      enumerable: true,
      configurable: true
    });
    return KeyRegistry;
  })();
  exports.KeyRegistry = KeyRegistry;
  var _globalKeyRegistry = new KeyRegistry();
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/di/exceptions.js", ["node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  function findFirstClosedCycle(keys) {
    var res = [];
    for (var i = 0; i < keys.length; ++i) {
      if (collection_1.ListWrapper.contains(res, keys[i])) {
        res.push(keys[i]);
        return res;
      } else {
        res.push(keys[i]);
      }
    }
    return res;
  }
  function constructResolvingPath(keys) {
    if (keys.length > 1) {
      var reversed = findFirstClosedCycle(collection_1.ListWrapper.reversed(keys));
      var tokenStrs = reversed.map(function(k) {
        return lang_1.stringify(k.token);
      });
      return " (" + tokenStrs.join(' -> ') + ")";
    } else {
      return "";
    }
  }
  var AbstractProviderError = (function(_super) {
    __extends(AbstractProviderError, _super);
    function AbstractProviderError(injector, key, constructResolvingMessage) {
      _super.call(this, "DI Exception");
      this.keys = [key];
      this.injectors = [injector];
      this.constructResolvingMessage = constructResolvingMessage;
      this.message = this.constructResolvingMessage(this.keys);
    }
    AbstractProviderError.prototype.addKey = function(injector, key) {
      this.injectors.push(injector);
      this.keys.push(key);
      this.message = this.constructResolvingMessage(this.keys);
    };
    Object.defineProperty(AbstractProviderError.prototype, "context", {
      get: function() {
        return this.injectors[this.injectors.length - 1].debugContext();
      },
      enumerable: true,
      configurable: true
    });
    return AbstractProviderError;
  })(exceptions_1.BaseException);
  exports.AbstractProviderError = AbstractProviderError;
  var NoProviderError = (function(_super) {
    __extends(NoProviderError, _super);
    function NoProviderError(injector, key) {
      _super.call(this, injector, key, function(keys) {
        var first = lang_1.stringify(collection_1.ListWrapper.first(keys).token);
        return "No provider for " + first + "!" + constructResolvingPath(keys);
      });
    }
    return NoProviderError;
  })(AbstractProviderError);
  exports.NoProviderError = NoProviderError;
  var CyclicDependencyError = (function(_super) {
    __extends(CyclicDependencyError, _super);
    function CyclicDependencyError(injector, key) {
      _super.call(this, injector, key, function(keys) {
        return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
      });
    }
    return CyclicDependencyError;
  })(AbstractProviderError);
  exports.CyclicDependencyError = CyclicDependencyError;
  var InstantiationError = (function(_super) {
    __extends(InstantiationError, _super);
    function InstantiationError(injector, originalException, originalStack, key) {
      _super.call(this, "DI Exception", originalException, originalStack, null);
      this.keys = [key];
      this.injectors = [injector];
    }
    InstantiationError.prototype.addKey = function(injector, key) {
      this.injectors.push(injector);
      this.keys.push(key);
    };
    Object.defineProperty(InstantiationError.prototype, "wrapperMessage", {
      get: function() {
        var first = lang_1.stringify(collection_1.ListWrapper.first(this.keys).token);
        return "Error during instantiation of " + first + "!" + constructResolvingPath(this.keys) + ".";
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(InstantiationError.prototype, "causeKey", {
      get: function() {
        return this.keys[0];
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(InstantiationError.prototype, "context", {
      get: function() {
        return this.injectors[this.injectors.length - 1].debugContext();
      },
      enumerable: true,
      configurable: true
    });
    return InstantiationError;
  })(exceptions_1.WrappedException);
  exports.InstantiationError = InstantiationError;
  var InvalidProviderError = (function(_super) {
    __extends(InvalidProviderError, _super);
    function InvalidProviderError(provider) {
      _super.call(this, "Invalid provider - only instances of Provider and Type are allowed, got: " + provider.toString());
    }
    return InvalidProviderError;
  })(exceptions_1.BaseException);
  exports.InvalidProviderError = InvalidProviderError;
  var NoAnnotationError = (function(_super) {
    __extends(NoAnnotationError, _super);
    function NoAnnotationError(typeOrFunc, params) {
      _super.call(this, NoAnnotationError._genMessage(typeOrFunc, params));
    }
    NoAnnotationError._genMessage = function(typeOrFunc, params) {
      var signature = [];
      for (var i = 0,
          ii = params.length; i < ii; i++) {
        var parameter = params[i];
        if (lang_1.isBlank(parameter) || parameter.length == 0) {
          signature.push('?');
        } else {
          signature.push(parameter.map(lang_1.stringify).join(' '));
        }
      }
      return "Cannot resolve all parameters for '" + lang_1.stringify(typeOrFunc) + "'(" + signature.join(', ') + "). " + "Make sure that all the parameters are decorated with Inject or have valid type annotations and that '" + lang_1.stringify(typeOrFunc) + "' is decorated with Injectable.";
    };
    return NoAnnotationError;
  })(exceptions_1.BaseException);
  exports.NoAnnotationError = NoAnnotationError;
  var OutOfBoundsError = (function(_super) {
    __extends(OutOfBoundsError, _super);
    function OutOfBoundsError(index) {
      _super.call(this, "Index " + index + " is out-of-bounds.");
    }
    return OutOfBoundsError;
  })(exceptions_1.BaseException);
  exports.OutOfBoundsError = OutOfBoundsError;
  var MixingMultiProvidersWithRegularProvidersError = (function(_super) {
    __extends(MixingMultiProvidersWithRegularProvidersError, _super);
    function MixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
      _super.call(this, "Cannot mix multi providers and regular providers, got: " + provider1.toString() + " " + provider2.toString());
    }
    return MixingMultiProvidersWithRegularProvidersError;
  })(exceptions_1.BaseException);
  exports.MixingMultiProvidersWithRegularProvidersError = MixingMultiProvidersWithRegularProvidersError;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/di/opaque_token.js", ["node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var OpaqueToken = (function() {
    function OpaqueToken(_desc) {
      this._desc = _desc;
    }
    OpaqueToken.prototype.toString = function() {
      return "Token " + this._desc;
    };
    OpaqueToken = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [String])], OpaqueToken);
    return OpaqueToken;
  })();
  exports.OpaqueToken = OpaqueToken;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/di.js", ["node_modules/angular2/src/core/di/metadata.js", "node_modules/angular2/src/core/di/decorators.js", "node_modules/angular2/src/core/di/forward_ref.js", "node_modules/angular2/src/core/di/injector.js", "node_modules/angular2/src/core/di/provider.js", "node_modules/angular2/src/core/di/key.js", "node_modules/angular2/src/core/di/exceptions.js", "node_modules/angular2/src/core/di/opaque_token.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var metadata_1 = $__require('node_modules/angular2/src/core/di/metadata.js');
  exports.InjectMetadata = metadata_1.InjectMetadata;
  exports.OptionalMetadata = metadata_1.OptionalMetadata;
  exports.InjectableMetadata = metadata_1.InjectableMetadata;
  exports.SelfMetadata = metadata_1.SelfMetadata;
  exports.HostMetadata = metadata_1.HostMetadata;
  exports.SkipSelfMetadata = metadata_1.SkipSelfMetadata;
  exports.DependencyMetadata = metadata_1.DependencyMetadata;
  __export($__require('node_modules/angular2/src/core/di/decorators.js'));
  var forward_ref_1 = $__require('node_modules/angular2/src/core/di/forward_ref.js');
  exports.forwardRef = forward_ref_1.forwardRef;
  exports.resolveForwardRef = forward_ref_1.resolveForwardRef;
  var injector_1 = $__require('node_modules/angular2/src/core/di/injector.js');
  exports.Injector = injector_1.Injector;
  var provider_1 = $__require('node_modules/angular2/src/core/di/provider.js');
  exports.Binding = provider_1.Binding;
  exports.ProviderBuilder = provider_1.ProviderBuilder;
  exports.ResolvedFactory = provider_1.ResolvedFactory;
  exports.Dependency = provider_1.Dependency;
  exports.bind = provider_1.bind;
  exports.Provider = provider_1.Provider;
  exports.provide = provider_1.provide;
  var key_1 = $__require('node_modules/angular2/src/core/di/key.js');
  exports.Key = key_1.Key;
  var exceptions_1 = $__require('node_modules/angular2/src/core/di/exceptions.js');
  exports.NoProviderError = exceptions_1.NoProviderError;
  exports.AbstractProviderError = exceptions_1.AbstractProviderError;
  exports.CyclicDependencyError = exceptions_1.CyclicDependencyError;
  exports.InstantiationError = exceptions_1.InstantiationError;
  exports.InvalidProviderError = exceptions_1.InvalidProviderError;
  exports.NoAnnotationError = exceptions_1.NoAnnotationError;
  exports.OutOfBoundsError = exceptions_1.OutOfBoundsError;
  var opaque_token_1 = $__require('node_modules/angular2/src/core/di/opaque_token.js');
  exports.OpaqueToken = opaque_token_1.OpaqueToken;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/application_tokens.js", ["node_modules/angular2/src/core/di.js", "node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  exports.APP_COMPONENT_REF_PROMISE = lang_1.CONST_EXPR(new di_1.OpaqueToken('Promise<ComponentRef>'));
  exports.APP_COMPONENT = lang_1.CONST_EXPR(new di_1.OpaqueToken('AppComponent'));
  exports.APP_ID = lang_1.CONST_EXPR(new di_1.OpaqueToken('AppId'));
  function _appIdRandomProviderFactory() {
    return "" + _randomChar() + _randomChar() + _randomChar();
  }
  exports.APP_ID_RANDOM_PROVIDER = lang_1.CONST_EXPR(new di_1.Provider(exports.APP_ID, {
    useFactory: _appIdRandomProviderFactory,
    deps: []
  }));
  function _randomChar() {
    return lang_1.StringWrapper.fromCharCode(97 + lang_1.Math.floor(lang_1.Math.random() * 25));
  }
  exports.PLATFORM_INITIALIZER = lang_1.CONST_EXPR(new di_1.OpaqueToken("Platform Initializer"));
  exports.APP_INITIALIZER = lang_1.CONST_EXPR(new di_1.OpaqueToken("Application Initializer"));
  exports.PACKAGE_ROOT_URL = lang_1.CONST_EXPR(new di_1.OpaqueToken("Application Packages Root URL"));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/view_type.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(ViewType) {
    ViewType[ViewType["HOST"] = 0] = "HOST";
    ViewType[ViewType["COMPONENT"] = 1] = "COMPONENT";
    ViewType[ViewType["EMBEDDED"] = 2] = "EMBEDDED";
  })(exports.ViewType || (exports.ViewType = {}));
  var ViewType = exports.ViewType;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/view_manager.js", ["node_modules/angular2/src/core/di.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/collection.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/core/linker/view.js", "node_modules/angular2/src/core/render/api.js", "node_modules/angular2/src/core/profile/profile.js", "node_modules/angular2/src/core/application_tokens.js", "node_modules/angular2/src/core/linker/view_type.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var view_1 = $__require('node_modules/angular2/src/core/linker/view.js');
  var api_1 = $__require('node_modules/angular2/src/core/render/api.js');
  var profile_1 = $__require('node_modules/angular2/src/core/profile/profile.js');
  var application_tokens_1 = $__require('node_modules/angular2/src/core/application_tokens.js');
  var view_type_1 = $__require('node_modules/angular2/src/core/linker/view_type.js');
  var AppViewManager = (function() {
    function AppViewManager() {}
    return AppViewManager;
  })();
  exports.AppViewManager = AppViewManager;
  var AppViewManager_ = (function(_super) {
    __extends(AppViewManager_, _super);
    function AppViewManager_(_renderer, _appId) {
      _super.call(this);
      this._renderer = _renderer;
      this._appId = _appId;
      this._nextCompTypeId = 0;
      this._createRootHostViewScope = profile_1.wtfCreateScope('AppViewManager#createRootHostView()');
      this._destroyRootHostViewScope = profile_1.wtfCreateScope('AppViewManager#destroyRootHostView()');
      this._createEmbeddedViewInContainerScope = profile_1.wtfCreateScope('AppViewManager#createEmbeddedViewInContainer()');
      this._createHostViewInContainerScope = profile_1.wtfCreateScope('AppViewManager#createHostViewInContainer()');
      this._destroyViewInContainerScope = profile_1.wtfCreateScope('AppViewMananger#destroyViewInContainer()');
      this._attachViewInContainerScope = profile_1.wtfCreateScope('AppViewMananger#attachViewInContainer()');
      this._detachViewInContainerScope = profile_1.wtfCreateScope('AppViewMananger#detachViewInContainer()');
    }
    AppViewManager_.prototype.getViewContainer = function(location) {
      return location.internalElement.getViewContainerRef();
    };
    AppViewManager_.prototype.getHostElement = function(hostViewRef) {
      var hostView = hostViewRef.internalView;
      if (hostView.proto.type !== view_type_1.ViewType.HOST) {
        throw new exceptions_1.BaseException('This operation is only allowed on host views');
      }
      return hostView.appElements[0].ref;
    };
    AppViewManager_.prototype.getNamedElementInComponentView = function(hostLocation, variableName) {
      var appEl = hostLocation.internalElement;
      var componentView = appEl.componentView;
      if (lang_1.isBlank(componentView)) {
        throw new exceptions_1.BaseException("There is no component directive at element " + hostLocation);
      }
      for (var i = 0; i < componentView.appElements.length; i++) {
        var compAppEl = componentView.appElements[i];
        if (collection_1.StringMapWrapper.contains(compAppEl.proto.directiveVariableBindings, variableName)) {
          return compAppEl.ref;
        }
      }
      throw new exceptions_1.BaseException("Could not find variable " + variableName);
    };
    AppViewManager_.prototype.getComponent = function(hostLocation) {
      return hostLocation.internalElement.getComponent();
    };
    AppViewManager_.prototype.createRootHostView = function(hostViewFactoryRef, overrideSelector, injector, projectableNodes) {
      if (projectableNodes === void 0) {
        projectableNodes = null;
      }
      var s = this._createRootHostViewScope();
      var hostViewFactory = hostViewFactoryRef.internalHostViewFactory;
      var selector = lang_1.isPresent(overrideSelector) ? overrideSelector : hostViewFactory.selector;
      var view = hostViewFactory.viewFactory(this._renderer, this, null, projectableNodes, selector, null, injector);
      return profile_1.wtfLeave(s, view.ref);
    };
    AppViewManager_.prototype.destroyRootHostView = function(hostViewRef) {
      var s = this._destroyRootHostViewScope();
      var hostView = hostViewRef.internalView;
      hostView.renderer.detachView(view_1.flattenNestedViewRenderNodes(hostView.rootNodesOrAppElements));
      hostView.destroy();
      profile_1.wtfLeave(s);
    };
    AppViewManager_.prototype.createEmbeddedViewInContainer = function(viewContainerLocation, index, templateRef) {
      var s = this._createEmbeddedViewInContainerScope();
      var contextEl = templateRef.elementRef.internalElement;
      var view = contextEl.embeddedViewFactory(contextEl.parentView.renderer, this, contextEl, contextEl.parentView.projectableNodes, null, null, null);
      this._attachViewToContainer(view, viewContainerLocation.internalElement, index);
      return profile_1.wtfLeave(s, view.ref);
    };
    AppViewManager_.prototype.createHostViewInContainer = function(viewContainerLocation, index, hostViewFactoryRef, dynamicallyCreatedProviders, projectableNodes) {
      var s = this._createHostViewInContainerScope();
      var viewContainerLocation_ = viewContainerLocation;
      var contextEl = viewContainerLocation_.internalElement;
      var hostViewFactory = hostViewFactoryRef.internalHostViewFactory;
      var view = hostViewFactory.viewFactory(contextEl.parentView.renderer, contextEl.parentView.viewManager, contextEl, projectableNodes, null, dynamicallyCreatedProviders, null);
      this._attachViewToContainer(view, viewContainerLocation_.internalElement, index);
      return profile_1.wtfLeave(s, view.ref);
    };
    AppViewManager_.prototype.destroyViewInContainer = function(viewContainerLocation, index) {
      var s = this._destroyViewInContainerScope();
      var view = this._detachViewInContainer(viewContainerLocation.internalElement, index);
      view.destroy();
      profile_1.wtfLeave(s);
    };
    AppViewManager_.prototype.attachViewInContainer = function(viewContainerLocation, index, viewRef) {
      var viewRef_ = viewRef;
      var s = this._attachViewInContainerScope();
      this._attachViewToContainer(viewRef_.internalView, viewContainerLocation.internalElement, index);
      return profile_1.wtfLeave(s, viewRef_);
    };
    AppViewManager_.prototype.detachViewInContainer = function(viewContainerLocation, index) {
      var s = this._detachViewInContainerScope();
      var view = this._detachViewInContainer(viewContainerLocation.internalElement, index);
      return profile_1.wtfLeave(s, view.ref);
    };
    AppViewManager_.prototype.onViewCreated = function(view) {};
    AppViewManager_.prototype.onViewDestroyed = function(view) {};
    AppViewManager_.prototype.createRenderComponentType = function(encapsulation, styles) {
      return new api_1.RenderComponentType(this._appId + "-" + this._nextCompTypeId++, encapsulation, styles);
    };
    AppViewManager_.prototype._attachViewToContainer = function(view, vcAppElement, viewIndex) {
      if (view.proto.type === view_type_1.ViewType.COMPONENT) {
        throw new exceptions_1.BaseException("Component views can't be moved!");
      }
      var nestedViews = vcAppElement.nestedViews;
      if (nestedViews == null) {
        nestedViews = [];
        vcAppElement.nestedViews = nestedViews;
      }
      collection_1.ListWrapper.insert(nestedViews, viewIndex, view);
      var refNode;
      if (viewIndex > 0) {
        var prevView = nestedViews[viewIndex - 1];
        refNode = prevView.rootNodesOrAppElements.length > 0 ? prevView.rootNodesOrAppElements[prevView.rootNodesOrAppElements.length - 1] : null;
      } else {
        refNode = vcAppElement.nativeElement;
      }
      if (lang_1.isPresent(refNode)) {
        var refRenderNode = view_1.findLastRenderNode(refNode);
        view.renderer.attachViewAfter(refRenderNode, view_1.flattenNestedViewRenderNodes(view.rootNodesOrAppElements));
      }
      vcAppElement.parentView.changeDetector.addContentChild(view.changeDetector);
      vcAppElement.traverseAndSetQueriesAsDirty();
    };
    AppViewManager_.prototype._detachViewInContainer = function(vcAppElement, viewIndex) {
      var view = collection_1.ListWrapper.removeAt(vcAppElement.nestedViews, viewIndex);
      if (view.proto.type === view_type_1.ViewType.COMPONENT) {
        throw new exceptions_1.BaseException("Component views can't be moved!");
      }
      vcAppElement.traverseAndSetQueriesAsDirty();
      view.renderer.detachView(view_1.flattenNestedViewRenderNodes(view.rootNodesOrAppElements));
      view.changeDetector.remove();
      return view;
    };
    AppViewManager_ = __decorate([di_1.Injectable(), __param(1, di_1.Inject(application_tokens_1.APP_ID)), __metadata('design:paramtypes', [api_1.RootRenderer, String])], AppViewManager_);
    return AppViewManager_;
  })(AppViewManager);
  exports.AppViewManager_ = AppViewManager_;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/linker/dynamic_component_loader.js", ["node_modules/angular2/src/core/di.js", "node_modules/angular2/src/core/linker/compiler.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/core/linker/view_manager.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var compiler_1 = $__require('node_modules/angular2/src/core/linker/compiler.js');
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var view_manager_1 = $__require('node_modules/angular2/src/core/linker/view_manager.js');
  var ComponentRef = (function() {
    function ComponentRef() {}
    Object.defineProperty(ComponentRef.prototype, "hostView", {
      get: function() {
        return this.location.internalElement.parentView.ref;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ComponentRef.prototype, "hostComponent", {
      get: function() {
        return this.instance;
      },
      enumerable: true,
      configurable: true
    });
    return ComponentRef;
  })();
  exports.ComponentRef = ComponentRef;
  var ComponentRef_ = (function(_super) {
    __extends(ComponentRef_, _super);
    function ComponentRef_(location, instance, componentType, injector, _dispose) {
      _super.call(this);
      this._dispose = _dispose;
      this.location = location;
      this.instance = instance;
      this.componentType = componentType;
      this.injector = injector;
    }
    Object.defineProperty(ComponentRef_.prototype, "hostComponentType", {
      get: function() {
        return this.componentType;
      },
      enumerable: true,
      configurable: true
    });
    ComponentRef_.prototype.dispose = function() {
      this._dispose();
    };
    return ComponentRef_;
  })(ComponentRef);
  exports.ComponentRef_ = ComponentRef_;
  var DynamicComponentLoader = (function() {
    function DynamicComponentLoader() {}
    return DynamicComponentLoader;
  })();
  exports.DynamicComponentLoader = DynamicComponentLoader;
  var DynamicComponentLoader_ = (function(_super) {
    __extends(DynamicComponentLoader_, _super);
    function DynamicComponentLoader_(_compiler, _viewManager) {
      _super.call(this);
      this._compiler = _compiler;
      this._viewManager = _viewManager;
    }
    DynamicComponentLoader_.prototype.loadAsRoot = function(type, overrideSelector, injector, onDispose, projectableNodes) {
      var _this = this;
      return this._compiler.compileInHost(type).then(function(hostProtoViewRef) {
        var hostViewRef = _this._viewManager.createRootHostView(hostProtoViewRef, overrideSelector, injector, projectableNodes);
        var newLocation = _this._viewManager.getHostElement(hostViewRef);
        var component = _this._viewManager.getComponent(newLocation);
        var dispose = function() {
          if (lang_1.isPresent(onDispose)) {
            onDispose();
          }
          _this._viewManager.destroyRootHostView(hostViewRef);
        };
        return new ComponentRef_(newLocation, component, type, injector, dispose);
      });
    };
    DynamicComponentLoader_.prototype.loadIntoLocation = function(type, hostLocation, anchorName, providers, projectableNodes) {
      if (providers === void 0) {
        providers = null;
      }
      if (projectableNodes === void 0) {
        projectableNodes = null;
      }
      return this.loadNextToLocation(type, this._viewManager.getNamedElementInComponentView(hostLocation, anchorName), providers, projectableNodes);
    };
    DynamicComponentLoader_.prototype.loadNextToLocation = function(type, location, providers, projectableNodes) {
      var _this = this;
      if (providers === void 0) {
        providers = null;
      }
      if (projectableNodes === void 0) {
        projectableNodes = null;
      }
      return this._compiler.compileInHost(type).then(function(hostProtoViewRef) {
        var viewContainer = _this._viewManager.getViewContainer(location);
        var hostViewRef = viewContainer.createHostView(hostProtoViewRef, viewContainer.length, providers, projectableNodes);
        var newLocation = _this._viewManager.getHostElement(hostViewRef);
        var component = _this._viewManager.getComponent(newLocation);
        var dispose = function() {
          var index = viewContainer.indexOf(hostViewRef);
          if (!hostViewRef.destroyed && index !== -1) {
            viewContainer.remove(index);
          }
        };
        return new ComponentRef_(newLocation, component, type, null, dispose);
      });
    };
    DynamicComponentLoader_ = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [compiler_1.Compiler, view_manager_1.AppViewManager])], DynamicComponentLoader_);
    return DynamicComponentLoader_;
  })(DynamicComponentLoader);
  exports.DynamicComponentLoader_ = DynamicComponentLoader_;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/application_common_providers.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/core/di.js", "node_modules/angular2/src/core/application_tokens.js", "node_modules/angular2/src/core/change_detection/change_detection.js", "node_modules/angular2/src/core/linker/resolved_metadata_cache.js", "node_modules/angular2/src/core/linker/view_manager.js", "node_modules/angular2/src/core/linker/view_resolver.js", "node_modules/angular2/src/core/linker/directive_resolver.js", "node_modules/angular2/src/core/linker/pipe_resolver.js", "node_modules/angular2/src/core/linker/compiler.js", "node_modules/angular2/src/core/linker/dynamic_component_loader.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var di_1 = $__require('node_modules/angular2/src/core/di.js');
  var application_tokens_1 = $__require('node_modules/angular2/src/core/application_tokens.js');
  var change_detection_1 = $__require('node_modules/angular2/src/core/change_detection/change_detection.js');
  var resolved_metadata_cache_1 = $__require('node_modules/angular2/src/core/linker/resolved_metadata_cache.js');
  var view_manager_1 = $__require('node_modules/angular2/src/core/linker/view_manager.js');
  var view_manager_2 = $__require('node_modules/angular2/src/core/linker/view_manager.js');
  var view_resolver_1 = $__require('node_modules/angular2/src/core/linker/view_resolver.js');
  var directive_resolver_1 = $__require('node_modules/angular2/src/core/linker/directive_resolver.js');
  var pipe_resolver_1 = $__require('node_modules/angular2/src/core/linker/pipe_resolver.js');
  var compiler_1 = $__require('node_modules/angular2/src/core/linker/compiler.js');
  var compiler_2 = $__require('node_modules/angular2/src/core/linker/compiler.js');
  var dynamic_component_loader_1 = $__require('node_modules/angular2/src/core/linker/dynamic_component_loader.js');
  var dynamic_component_loader_2 = $__require('node_modules/angular2/src/core/linker/dynamic_component_loader.js');
  exports.APPLICATION_COMMON_PROVIDERS = lang_1.CONST_EXPR([new di_1.Provider(compiler_1.Compiler, {useClass: compiler_2.Compiler_}), application_tokens_1.APP_ID_RANDOM_PROVIDER, resolved_metadata_cache_1.ResolvedMetadataCache, new di_1.Provider(view_manager_1.AppViewManager, {useClass: view_manager_2.AppViewManager_}), view_resolver_1.ViewResolver, new di_1.Provider(change_detection_1.IterableDiffers, {useValue: change_detection_1.defaultIterableDiffers}), new di_1.Provider(change_detection_1.KeyValueDiffers, {useValue: change_detection_1.defaultKeyValueDiffers}), directive_resolver_1.DirectiveResolver, pipe_resolver_1.PipeResolver, new di_1.Provider(dynamic_component_loader_1.DynamicComponentLoader, {useClass: dynamic_component_loader_2.DynamicComponentLoader_})]);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/reflection/reflector.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js", "node_modules/angular2/src/facade/collection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var ReflectionInfo = (function() {
    function ReflectionInfo(annotations, parameters, factory, interfaces, propMetadata) {
      this.annotations = annotations;
      this.parameters = parameters;
      this.factory = factory;
      this.interfaces = interfaces;
      this.propMetadata = propMetadata;
    }
    return ReflectionInfo;
  })();
  exports.ReflectionInfo = ReflectionInfo;
  var Reflector = (function() {
    function Reflector(reflectionCapabilities) {
      this._injectableInfo = new collection_1.Map();
      this._getters = new collection_1.Map();
      this._setters = new collection_1.Map();
      this._methods = new collection_1.Map();
      this._usedKeys = null;
      this.reflectionCapabilities = reflectionCapabilities;
    }
    Reflector.prototype.isReflectionEnabled = function() {
      return this.reflectionCapabilities.isReflectionEnabled();
    };
    Reflector.prototype.trackUsage = function() {
      this._usedKeys = new collection_1.Set();
    };
    Reflector.prototype.listUnusedKeys = function() {
      var _this = this;
      if (this._usedKeys == null) {
        throw new exceptions_1.BaseException('Usage tracking is disabled');
      }
      var allTypes = collection_1.MapWrapper.keys(this._injectableInfo);
      return allTypes.filter(function(key) {
        return !collection_1.SetWrapper.has(_this._usedKeys, key);
      });
    };
    Reflector.prototype.registerFunction = function(func, funcInfo) {
      this._injectableInfo.set(func, funcInfo);
    };
    Reflector.prototype.registerType = function(type, typeInfo) {
      this._injectableInfo.set(type, typeInfo);
    };
    Reflector.prototype.registerGetters = function(getters) {
      _mergeMaps(this._getters, getters);
    };
    Reflector.prototype.registerSetters = function(setters) {
      _mergeMaps(this._setters, setters);
    };
    Reflector.prototype.registerMethods = function(methods) {
      _mergeMaps(this._methods, methods);
    };
    Reflector.prototype.factory = function(type) {
      if (this._containsReflectionInfo(type)) {
        var res = this._getReflectionInfo(type).factory;
        return lang_1.isPresent(res) ? res : null;
      } else {
        return this.reflectionCapabilities.factory(type);
      }
    };
    Reflector.prototype.parameters = function(typeOrFunc) {
      if (this._injectableInfo.has(typeOrFunc)) {
        var res = this._getReflectionInfo(typeOrFunc).parameters;
        return lang_1.isPresent(res) ? res : [];
      } else {
        return this.reflectionCapabilities.parameters(typeOrFunc);
      }
    };
    Reflector.prototype.annotations = function(typeOrFunc) {
      if (this._injectableInfo.has(typeOrFunc)) {
        var res = this._getReflectionInfo(typeOrFunc).annotations;
        return lang_1.isPresent(res) ? res : [];
      } else {
        return this.reflectionCapabilities.annotations(typeOrFunc);
      }
    };
    Reflector.prototype.propMetadata = function(typeOrFunc) {
      if (this._injectableInfo.has(typeOrFunc)) {
        var res = this._getReflectionInfo(typeOrFunc).propMetadata;
        return lang_1.isPresent(res) ? res : {};
      } else {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
      }
    };
    Reflector.prototype.interfaces = function(type) {
      if (this._injectableInfo.has(type)) {
        var res = this._getReflectionInfo(type).interfaces;
        return lang_1.isPresent(res) ? res : [];
      } else {
        return this.reflectionCapabilities.interfaces(type);
      }
    };
    Reflector.prototype.getter = function(name) {
      if (this._getters.has(name)) {
        return this._getters.get(name);
      } else {
        return this.reflectionCapabilities.getter(name);
      }
    };
    Reflector.prototype.setter = function(name) {
      if (this._setters.has(name)) {
        return this._setters.get(name);
      } else {
        return this.reflectionCapabilities.setter(name);
      }
    };
    Reflector.prototype.method = function(name) {
      if (this._methods.has(name)) {
        return this._methods.get(name);
      } else {
        return this.reflectionCapabilities.method(name);
      }
    };
    Reflector.prototype._getReflectionInfo = function(typeOrFunc) {
      if (lang_1.isPresent(this._usedKeys)) {
        this._usedKeys.add(typeOrFunc);
      }
      return this._injectableInfo.get(typeOrFunc);
    };
    Reflector.prototype._containsReflectionInfo = function(typeOrFunc) {
      return this._injectableInfo.has(typeOrFunc);
    };
    Reflector.prototype.importUri = function(type) {
      return this.reflectionCapabilities.importUri(type);
    };
    return Reflector;
  })();
  exports.Reflector = Reflector;
  function _mergeMaps(target, config) {
    collection_1.StringMapWrapper.forEach(config, function(v, k) {
      return target.set(k, v);
    });
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/facade/base_wrapped_exception.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var BaseWrappedException = (function(_super) {
    __extends(BaseWrappedException, _super);
    function BaseWrappedException(message) {
      _super.call(this, message);
    }
    Object.defineProperty(BaseWrappedException.prototype, "wrapperMessage", {
      get: function() {
        return '';
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "wrapperStack", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "originalException", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "originalStack", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "context", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "message", {
      get: function() {
        return '';
      },
      enumerable: true,
      configurable: true
    });
    return BaseWrappedException;
  })(Error);
  exports.BaseWrappedException = BaseWrappedException;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/facade/lang.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var globalScope;
  if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
      globalScope = self;
    } else {
      globalScope = global;
    }
  } else {
    globalScope = window;
  }
  function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
  }
  exports.scheduleMicroTask = scheduleMicroTask;
  exports.IS_DART = false;
  var _global = globalScope;
  exports.global = _global;
  exports.Type = Function;
  function getTypeNameForDebugging(type) {
    return type['name'];
  }
  exports.getTypeNameForDebugging = getTypeNameForDebugging;
  exports.Math = _global.Math;
  exports.Date = _global.Date;
  var _devMode = true;
  var _modeLocked = false;
  function lockMode() {
    _modeLocked = true;
  }
  exports.lockMode = lockMode;
  function enableProdMode() {
    if (_modeLocked) {
      throw 'Cannot enable prod mode after platform setup.';
    }
    _devMode = false;
  }
  exports.enableProdMode = enableProdMode;
  function assertionsEnabled() {
    return _devMode;
  }
  exports.assertionsEnabled = assertionsEnabled;
  _global.assert = function assert(condition) {};
  function CONST_EXPR(expr) {
    return expr;
  }
  exports.CONST_EXPR = CONST_EXPR;
  function CONST() {
    return function(target) {
      return target;
    };
  }
  exports.CONST = CONST;
  function isPresent(obj) {
    return obj !== undefined && obj !== null;
  }
  exports.isPresent = isPresent;
  function isBlank(obj) {
    return obj === undefined || obj === null;
  }
  exports.isBlank = isBlank;
  function isString(obj) {
    return typeof obj === "string";
  }
  exports.isString = isString;
  function isFunction(obj) {
    return typeof obj === "function";
  }
  exports.isFunction = isFunction;
  function isType(obj) {
    return isFunction(obj);
  }
  exports.isType = isType;
  function isStringMap(obj) {
    return typeof obj === 'object' && obj !== null;
  }
  exports.isStringMap = isStringMap;
  function isPromise(obj) {
    return obj instanceof _global.Promise;
  }
  exports.isPromise = isPromise;
  function isArray(obj) {
    return Array.isArray(obj);
  }
  exports.isArray = isArray;
  function isNumber(obj) {
    return typeof obj === 'number';
  }
  exports.isNumber = isNumber;
  function isDate(obj) {
    return obj instanceof exports.Date && !isNaN(obj.valueOf());
  }
  exports.isDate = isDate;
  function noop() {}
  exports.noop = noop;
  function stringify(token) {
    if (typeof token === 'string') {
      return token;
    }
    if (token === undefined || token === null) {
      return '' + token;
    }
    if (token.name) {
      return token.name;
    }
    if (token.overriddenName) {
      return token.overriddenName;
    }
    var res = token.toString();
    var newLineIndex = res.indexOf("\n");
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
  }
  exports.stringify = stringify;
  function serializeEnum(val) {
    return val;
  }
  exports.serializeEnum = serializeEnum;
  function deserializeEnum(val, values) {
    return val;
  }
  exports.deserializeEnum = deserializeEnum;
  function resolveEnumToken(enumValue, val) {
    return enumValue[val];
  }
  exports.resolveEnumToken = resolveEnumToken;
  var StringWrapper = (function() {
    function StringWrapper() {}
    StringWrapper.fromCharCode = function(code) {
      return String.fromCharCode(code);
    };
    StringWrapper.charCodeAt = function(s, index) {
      return s.charCodeAt(index);
    };
    StringWrapper.split = function(s, regExp) {
      return s.split(regExp);
    };
    StringWrapper.equals = function(s, s2) {
      return s === s2;
    };
    StringWrapper.stripLeft = function(s, charVal) {
      if (s && s.length) {
        var pos = 0;
        for (var i = 0; i < s.length; i++) {
          if (s[i] != charVal)
            break;
          pos++;
        }
        s = s.substring(pos);
      }
      return s;
    };
    StringWrapper.stripRight = function(s, charVal) {
      if (s && s.length) {
        var pos = s.length;
        for (var i = s.length - 1; i >= 0; i--) {
          if (s[i] != charVal)
            break;
          pos--;
        }
        s = s.substring(0, pos);
      }
      return s;
    };
    StringWrapper.replace = function(s, from, replace) {
      return s.replace(from, replace);
    };
    StringWrapper.replaceAll = function(s, from, replace) {
      return s.replace(from, replace);
    };
    StringWrapper.slice = function(s, from, to) {
      if (from === void 0) {
        from = 0;
      }
      if (to === void 0) {
        to = null;
      }
      return s.slice(from, to === null ? undefined : to);
    };
    StringWrapper.replaceAllMapped = function(s, from, cb) {
      return s.replace(from, function() {
        var matches = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          matches[_i - 0] = arguments[_i];
        }
        matches.splice(-2, 2);
        return cb(matches);
      });
    };
    StringWrapper.contains = function(s, substr) {
      return s.indexOf(substr) != -1;
    };
    StringWrapper.compare = function(a, b) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    };
    return StringWrapper;
  })();
  exports.StringWrapper = StringWrapper;
  var StringJoiner = (function() {
    function StringJoiner(parts) {
      if (parts === void 0) {
        parts = [];
      }
      this.parts = parts;
    }
    StringJoiner.prototype.add = function(part) {
      this.parts.push(part);
    };
    StringJoiner.prototype.toString = function() {
      return this.parts.join("");
    };
    return StringJoiner;
  })();
  exports.StringJoiner = StringJoiner;
  var NumberParseError = (function(_super) {
    __extends(NumberParseError, _super);
    function NumberParseError(message) {
      _super.call(this);
      this.message = message;
    }
    NumberParseError.prototype.toString = function() {
      return this.message;
    };
    return NumberParseError;
  })(Error);
  exports.NumberParseError = NumberParseError;
  var NumberWrapper = (function() {
    function NumberWrapper() {}
    NumberWrapper.toFixed = function(n, fractionDigits) {
      return n.toFixed(fractionDigits);
    };
    NumberWrapper.equal = function(a, b) {
      return a === b;
    };
    NumberWrapper.parseIntAutoRadix = function(text) {
      var result = parseInt(text);
      if (isNaN(result)) {
        throw new NumberParseError("Invalid integer literal when parsing " + text);
      }
      return result;
    };
    NumberWrapper.parseInt = function(text, radix) {
      if (radix == 10) {
        if (/^(\-|\+)?[0-9]+$/.test(text)) {
          return parseInt(text, radix);
        }
      } else if (radix == 16) {
        if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
          return parseInt(text, radix);
        }
      } else {
        var result = parseInt(text, radix);
        if (!isNaN(result)) {
          return result;
        }
      }
      throw new NumberParseError("Invalid integer literal when parsing " + text + " in base " + radix);
    };
    NumberWrapper.parseFloat = function(text) {
      return parseFloat(text);
    };
    Object.defineProperty(NumberWrapper, "NaN", {
      get: function() {
        return NaN;
      },
      enumerable: true,
      configurable: true
    });
    NumberWrapper.isNaN = function(value) {
      return isNaN(value);
    };
    NumberWrapper.isInteger = function(value) {
      return Number.isInteger(value);
    };
    return NumberWrapper;
  })();
  exports.NumberWrapper = NumberWrapper;
  exports.RegExp = _global.RegExp;
  var RegExpWrapper = (function() {
    function RegExpWrapper() {}
    RegExpWrapper.create = function(regExpStr, flags) {
      if (flags === void 0) {
        flags = '';
      }
      flags = flags.replace(/g/g, '');
      return new _global.RegExp(regExpStr, flags + 'g');
    };
    RegExpWrapper.firstMatch = function(regExp, input) {
      regExp.lastIndex = 0;
      return regExp.exec(input);
    };
    RegExpWrapper.test = function(regExp, input) {
      regExp.lastIndex = 0;
      return regExp.test(input);
    };
    RegExpWrapper.matcher = function(regExp, input) {
      regExp.lastIndex = 0;
      return {
        re: regExp,
        input: input
      };
    };
    return RegExpWrapper;
  })();
  exports.RegExpWrapper = RegExpWrapper;
  var RegExpMatcherWrapper = (function() {
    function RegExpMatcherWrapper() {}
    RegExpMatcherWrapper.next = function(matcher) {
      return matcher.re.exec(matcher.input);
    };
    return RegExpMatcherWrapper;
  })();
  exports.RegExpMatcherWrapper = RegExpMatcherWrapper;
  var FunctionWrapper = (function() {
    function FunctionWrapper() {}
    FunctionWrapper.apply = function(fn, posArgs) {
      return fn.apply(null, posArgs);
    };
    return FunctionWrapper;
  })();
  exports.FunctionWrapper = FunctionWrapper;
  function looseIdentical(a, b) {
    return a === b || typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b);
  }
  exports.looseIdentical = looseIdentical;
  function getMapKey(value) {
    return value;
  }
  exports.getMapKey = getMapKey;
  function normalizeBlank(obj) {
    return isBlank(obj) ? null : obj;
  }
  exports.normalizeBlank = normalizeBlank;
  function normalizeBool(obj) {
    return isBlank(obj) ? false : obj;
  }
  exports.normalizeBool = normalizeBool;
  function isJsObject(o) {
    return o !== null && (typeof o === "function" || typeof o === "object");
  }
  exports.isJsObject = isJsObject;
  function print(obj) {
    console.log(obj);
  }
  exports.print = print;
  var Json = (function() {
    function Json() {}
    Json.parse = function(s) {
      return _global.JSON.parse(s);
    };
    Json.stringify = function(data) {
      return _global.JSON.stringify(data, null, 2);
    };
    return Json;
  })();
  exports.Json = Json;
  var DateWrapper = (function() {
    function DateWrapper() {}
    DateWrapper.create = function(year, month, day, hour, minutes, seconds, milliseconds) {
      if (month === void 0) {
        month = 1;
      }
      if (day === void 0) {
        day = 1;
      }
      if (hour === void 0) {
        hour = 0;
      }
      if (minutes === void 0) {
        minutes = 0;
      }
      if (seconds === void 0) {
        seconds = 0;
      }
      if (milliseconds === void 0) {
        milliseconds = 0;
      }
      return new exports.Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
    };
    DateWrapper.fromISOString = function(str) {
      return new exports.Date(str);
    };
    DateWrapper.fromMillis = function(ms) {
      return new exports.Date(ms);
    };
    DateWrapper.toMillis = function(date) {
      return date.getTime();
    };
    DateWrapper.now = function() {
      return new exports.Date();
    };
    DateWrapper.toJson = function(date) {
      return date.toJSON();
    };
    return DateWrapper;
  })();
  exports.DateWrapper = DateWrapper;
  function setValueOnPath(global, path, value) {
    var parts = path.split('.');
    var obj = global;
    while (parts.length > 1) {
      var name = parts.shift();
      if (obj.hasOwnProperty(name) && isPresent(obj[name])) {
        obj = obj[name];
      } else {
        obj = obj[name] = {};
      }
    }
    if (obj === undefined || obj === null) {
      obj = {};
    }
    obj[parts.shift()] = value;
  }
  exports.setValueOnPath = setValueOnPath;
  var _symbolIterator = null;
  function getSymbolIterator() {
    if (isBlank(_symbolIterator)) {
      if (isPresent(Symbol) && isPresent(Symbol.iterator)) {
        _symbolIterator = Symbol.iterator;
      } else {
        var keys = Object.getOwnPropertyNames(Map.prototype);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (key !== 'entries' && key !== 'size' && Map.prototype[key] === Map.prototype['entries']) {
            _symbolIterator = key;
          }
        }
      }
    }
    return _symbolIterator;
  }
  exports.getSymbolIterator = getSymbolIterator;
  function evalExpression(sourceUrl, expr, declarations, vars) {
    var fnBody = declarations + "\nreturn " + expr + "\n//# sourceURL=" + sourceUrl;
    var fnArgNames = [];
    var fnArgValues = [];
    for (var argName in vars) {
      fnArgNames.push(argName);
      fnArgValues.push(vars[argName]);
    }
    return new (Function.bind.apply(Function, [void 0].concat(fnArgNames.concat(fnBody))))().apply(void 0, fnArgValues);
  }
  exports.evalExpression = evalExpression;
  function isPrimitive(obj) {
    return !isJsObject(obj);
  }
  exports.isPrimitive = isPrimitive;
  function hasConstructor(value, type) {
    return value.constructor === type;
  }
  exports.hasConstructor = hasConstructor;
  function bitWiseOr(values) {
    return values.reduce(function(a, b) {
      return a | b;
    });
  }
  exports.bitWiseOr = bitWiseOr;
  function bitWiseAnd(values) {
    return values.reduce(function(a, b) {
      return a & b;
    });
  }
  exports.bitWiseAnd = bitWiseAnd;
  function escape(s) {
    return _global.encodeURI(s);
  }
  exports.escape = escape;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/facade/collection.js", ["node_modules/angular2/src/facade/lang.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  exports.Map = lang_1.global.Map;
  exports.Set = lang_1.global.Set;
  var createMapFromPairs = (function() {
    try {
      if (new exports.Map([[1, 2]]).size === 1) {
        return function createMapFromPairs(pairs) {
          return new exports.Map(pairs);
        };
      }
    } catch (e) {}
    return function createMapAndPopulateFromPairs(pairs) {
      var map = new exports.Map();
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        map.set(pair[0], pair[1]);
      }
      return map;
    };
  })();
  var createMapFromMap = (function() {
    try {
      if (new exports.Map(new exports.Map())) {
        return function createMapFromMap(m) {
          return new exports.Map(m);
        };
      }
    } catch (e) {}
    return function createMapAndPopulateFromMap(m) {
      var map = new exports.Map();
      m.forEach(function(v, k) {
        map.set(k, v);
      });
      return map;
    };
  })();
  var _clearValues = (function() {
    if ((new exports.Map()).keys().next) {
      return function _clearValues(m) {
        var keyIterator = m.keys();
        var k;
        while (!((k = keyIterator.next()).done)) {
          m.set(k.value, null);
        }
      };
    } else {
      return function _clearValuesWithForeEach(m) {
        m.forEach(function(v, k) {
          m.set(k, null);
        });
      };
    }
  })();
  var _arrayFromMap = (function() {
    try {
      if ((new exports.Map()).values().next) {
        return function createArrayFromMap(m, getValues) {
          return getValues ? Array.from(m.values()) : Array.from(m.keys());
        };
      }
    } catch (e) {}
    return function createArrayFromMapWithForeach(m, getValues) {
      var res = ListWrapper.createFixedSize(m.size),
          i = 0;
      m.forEach(function(v, k) {
        res[i] = getValues ? v : k;
        i++;
      });
      return res;
    };
  })();
  var MapWrapper = (function() {
    function MapWrapper() {}
    MapWrapper.clone = function(m) {
      return createMapFromMap(m);
    };
    MapWrapper.createFromStringMap = function(stringMap) {
      var result = new exports.Map();
      for (var prop in stringMap) {
        result.set(prop, stringMap[prop]);
      }
      return result;
    };
    MapWrapper.toStringMap = function(m) {
      var r = {};
      m.forEach(function(v, k) {
        return r[k] = v;
      });
      return r;
    };
    MapWrapper.createFromPairs = function(pairs) {
      return createMapFromPairs(pairs);
    };
    MapWrapper.clearValues = function(m) {
      _clearValues(m);
    };
    MapWrapper.iterable = function(m) {
      return m;
    };
    MapWrapper.keys = function(m) {
      return _arrayFromMap(m, false);
    };
    MapWrapper.values = function(m) {
      return _arrayFromMap(m, true);
    };
    return MapWrapper;
  })();
  exports.MapWrapper = MapWrapper;
  var StringMapWrapper = (function() {
    function StringMapWrapper() {}
    StringMapWrapper.create = function() {
      return {};
    };
    StringMapWrapper.contains = function(map, key) {
      return map.hasOwnProperty(key);
    };
    StringMapWrapper.get = function(map, key) {
      return map.hasOwnProperty(key) ? map[key] : undefined;
    };
    StringMapWrapper.set = function(map, key, value) {
      map[key] = value;
    };
    StringMapWrapper.keys = function(map) {
      return Object.keys(map);
    };
    StringMapWrapper.values = function(map) {
      return Object.keys(map).reduce(function(r, a) {
        r.push(map[a]);
        return r;
      }, []);
    };
    StringMapWrapper.isEmpty = function(map) {
      for (var prop in map) {
        return false;
      }
      return true;
    };
    StringMapWrapper.delete = function(map, key) {
      delete map[key];
    };
    StringMapWrapper.forEach = function(map, callback) {
      for (var prop in map) {
        if (map.hasOwnProperty(prop)) {
          callback(map[prop], prop);
        }
      }
    };
    StringMapWrapper.merge = function(m1, m2) {
      var m = {};
      for (var attr in m1) {
        if (m1.hasOwnProperty(attr)) {
          m[attr] = m1[attr];
        }
      }
      for (var attr in m2) {
        if (m2.hasOwnProperty(attr)) {
          m[attr] = m2[attr];
        }
      }
      return m;
    };
    StringMapWrapper.equals = function(m1, m2) {
      var k1 = Object.keys(m1);
      var k2 = Object.keys(m2);
      if (k1.length != k2.length) {
        return false;
      }
      var key;
      for (var i = 0; i < k1.length; i++) {
        key = k1[i];
        if (m1[key] !== m2[key]) {
          return false;
        }
      }
      return true;
    };
    return StringMapWrapper;
  })();
  exports.StringMapWrapper = StringMapWrapper;
  var ListWrapper = (function() {
    function ListWrapper() {}
    ListWrapper.createFixedSize = function(size) {
      return new Array(size);
    };
    ListWrapper.createGrowableSize = function(size) {
      return new Array(size);
    };
    ListWrapper.clone = function(array) {
      return array.slice(0);
    };
    ListWrapper.createImmutable = function(array) {
      var result = ListWrapper.clone(array);
      Object.seal(result);
      return result;
    };
    ListWrapper.forEachWithIndex = function(array, fn) {
      for (var i = 0; i < array.length; i++) {
        fn(array[i], i);
      }
    };
    ListWrapper.first = function(array) {
      if (!array)
        return null;
      return array[0];
    };
    ListWrapper.last = function(array) {
      if (!array || array.length == 0)
        return null;
      return array[array.length - 1];
    };
    ListWrapper.indexOf = function(array, value, startIndex) {
      if (startIndex === void 0) {
        startIndex = 0;
      }
      return array.indexOf(value, startIndex);
    };
    ListWrapper.contains = function(list, el) {
      return list.indexOf(el) !== -1;
    };
    ListWrapper.reversed = function(array) {
      var a = ListWrapper.clone(array);
      return a.reverse();
    };
    ListWrapper.concat = function(a, b) {
      return a.concat(b);
    };
    ListWrapper.insert = function(list, index, value) {
      list.splice(index, 0, value);
    };
    ListWrapper.removeAt = function(list, index) {
      var res = list[index];
      list.splice(index, 1);
      return res;
    };
    ListWrapper.removeAll = function(list, items) {
      for (var i = 0; i < items.length; ++i) {
        var index = list.indexOf(items[i]);
        list.splice(index, 1);
      }
    };
    ListWrapper.remove = function(list, el) {
      var index = list.indexOf(el);
      if (index > -1) {
        list.splice(index, 1);
        return true;
      }
      return false;
    };
    ListWrapper.clear = function(list) {
      list.length = 0;
    };
    ListWrapper.isEmpty = function(list) {
      return list.length == 0;
    };
    ListWrapper.fill = function(list, value, start, end) {
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = null;
      }
      list.fill(value, start, end === null ? list.length : end);
    };
    ListWrapper.equals = function(a, b) {
      if (a.length != b.length)
        return false;
      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
          return false;
      }
      return true;
    };
    ListWrapper.slice = function(l, from, to) {
      if (from === void 0) {
        from = 0;
      }
      if (to === void 0) {
        to = null;
      }
      return l.slice(from, to === null ? undefined : to);
    };
    ListWrapper.splice = function(l, from, length) {
      return l.splice(from, length);
    };
    ListWrapper.sort = function(l, compareFn) {
      if (lang_1.isPresent(compareFn)) {
        l.sort(compareFn);
      } else {
        l.sort();
      }
    };
    ListWrapper.toString = function(l) {
      return l.toString();
    };
    ListWrapper.toJSON = function(l) {
      return JSON.stringify(l);
    };
    ListWrapper.maximum = function(list, predicate) {
      if (list.length == 0) {
        return null;
      }
      var solution = null;
      var maxValue = -Infinity;
      for (var index = 0; index < list.length; index++) {
        var candidate = list[index];
        if (lang_1.isBlank(candidate)) {
          continue;
        }
        var candidateValue = predicate(candidate);
        if (candidateValue > maxValue) {
          solution = candidate;
          maxValue = candidateValue;
        }
      }
      return solution;
    };
    ListWrapper.isImmutable = function(list) {
      return Object.isSealed(list);
    };
    return ListWrapper;
  })();
  exports.ListWrapper = ListWrapper;
  function isListLikeIterable(obj) {
    if (!lang_1.isJsObject(obj))
      return false;
    return lang_1.isArray(obj) || (!(obj instanceof exports.Map) && lang_1.getSymbolIterator() in obj);
  }
  exports.isListLikeIterable = isListLikeIterable;
  function areIterablesEqual(a, b, comparator) {
    var iterator1 = a[lang_1.getSymbolIterator()]();
    var iterator2 = b[lang_1.getSymbolIterator()]();
    while (true) {
      var item1 = iterator1.next();
      var item2 = iterator2.next();
      if (item1.done && item2.done)
        return true;
      if (item1.done || item2.done)
        return false;
      if (!comparator(item1.value, item2.value))
        return false;
    }
  }
  exports.areIterablesEqual = areIterablesEqual;
  function iterateListLike(obj, fn) {
    if (lang_1.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        fn(obj[i]);
      }
    } else {
      var iterator = obj[lang_1.getSymbolIterator()]();
      var item;
      while (!((item = iterator.next()).done)) {
        fn(item.value);
      }
    }
  }
  exports.iterateListLike = iterateListLike;
  var createSetFromList = (function() {
    var test = new exports.Set([1, 2, 3]);
    if (test.size === 3) {
      return function createSetFromList(lst) {
        return new exports.Set(lst);
      };
    } else {
      return function createSetAndPopulateFromList(lst) {
        var res = new exports.Set(lst);
        if (res.size !== lst.length) {
          for (var i = 0; i < lst.length; i++) {
            res.add(lst[i]);
          }
        }
        return res;
      };
    }
  })();
  var SetWrapper = (function() {
    function SetWrapper() {}
    SetWrapper.createFromList = function(lst) {
      return createSetFromList(lst);
    };
    SetWrapper.has = function(s, key) {
      return s.has(key);
    };
    SetWrapper.delete = function(m, k) {
      m.delete(k);
    };
    return SetWrapper;
  })();
  exports.SetWrapper = SetWrapper;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/facade/exception_handler.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/base_wrapped_exception.js", "node_modules/angular2/src/facade/collection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var base_wrapped_exception_1 = $__require('node_modules/angular2/src/facade/base_wrapped_exception.js');
  var collection_1 = $__require('node_modules/angular2/src/facade/collection.js');
  var _ArrayLogger = (function() {
    function _ArrayLogger() {
      this.res = [];
    }
    _ArrayLogger.prototype.log = function(s) {
      this.res.push(s);
    };
    _ArrayLogger.prototype.logError = function(s) {
      this.res.push(s);
    };
    _ArrayLogger.prototype.logGroup = function(s) {
      this.res.push(s);
    };
    _ArrayLogger.prototype.logGroupEnd = function() {};
    ;
    return _ArrayLogger;
  })();
  var ExceptionHandler = (function() {
    function ExceptionHandler(_logger, _rethrowException) {
      if (_rethrowException === void 0) {
        _rethrowException = true;
      }
      this._logger = _logger;
      this._rethrowException = _rethrowException;
    }
    ExceptionHandler.exceptionToString = function(exception, stackTrace, reason) {
      if (stackTrace === void 0) {
        stackTrace = null;
      }
      if (reason === void 0) {
        reason = null;
      }
      var l = new _ArrayLogger();
      var e = new ExceptionHandler(l, false);
      e.call(exception, stackTrace, reason);
      return l.res.join("\n");
    };
    ExceptionHandler.prototype.call = function(exception, stackTrace, reason) {
      if (stackTrace === void 0) {
        stackTrace = null;
      }
      if (reason === void 0) {
        reason = null;
      }
      var originalException = this._findOriginalException(exception);
      var originalStack = this._findOriginalStack(exception);
      var context = this._findContext(exception);
      this._logger.logGroup("EXCEPTION: " + this._extractMessage(exception));
      if (lang_1.isPresent(stackTrace) && lang_1.isBlank(originalStack)) {
        this._logger.logError("STACKTRACE:");
        this._logger.logError(this._longStackTrace(stackTrace));
      }
      if (lang_1.isPresent(reason)) {
        this._logger.logError("REASON: " + reason);
      }
      if (lang_1.isPresent(originalException)) {
        this._logger.logError("ORIGINAL EXCEPTION: " + this._extractMessage(originalException));
      }
      if (lang_1.isPresent(originalStack)) {
        this._logger.logError("ORIGINAL STACKTRACE:");
        this._logger.logError(this._longStackTrace(originalStack));
      }
      if (lang_1.isPresent(context)) {
        this._logger.logError("ERROR CONTEXT:");
        this._logger.logError(context);
      }
      this._logger.logGroupEnd();
      if (this._rethrowException)
        throw exception;
    };
    ExceptionHandler.prototype._extractMessage = function(exception) {
      return exception instanceof base_wrapped_exception_1.BaseWrappedException ? exception.wrapperMessage : exception.toString();
    };
    ExceptionHandler.prototype._longStackTrace = function(stackTrace) {
      return collection_1.isListLikeIterable(stackTrace) ? stackTrace.join("\n\n-----async gap-----\n") : stackTrace.toString();
    };
    ExceptionHandler.prototype._findContext = function(exception) {
      try {
        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
          return null;
        return lang_1.isPresent(exception.context) ? exception.context : this._findContext(exception.originalException);
      } catch (e) {
        return null;
      }
    };
    ExceptionHandler.prototype._findOriginalException = function(exception) {
      if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
        return null;
      var e = exception.originalException;
      while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
        e = e.originalException;
      }
      return e;
    };
    ExceptionHandler.prototype._findOriginalStack = function(exception) {
      if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
        return null;
      var e = exception;
      var stack = exception.originalStack;
      while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
        e = e.originalException;
        if (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
          stack = e.originalStack;
        }
      }
      return stack;
    };
    return ExceptionHandler;
  })();
  exports.ExceptionHandler = ExceptionHandler;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/facade/exceptions.js", ["node_modules/angular2/src/facade/base_wrapped_exception.js", "node_modules/angular2/src/facade/exception_handler.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var base_wrapped_exception_1 = $__require('node_modules/angular2/src/facade/base_wrapped_exception.js');
  var exception_handler_1 = $__require('node_modules/angular2/src/facade/exception_handler.js');
  var exception_handler_2 = $__require('node_modules/angular2/src/facade/exception_handler.js');
  exports.ExceptionHandler = exception_handler_2.ExceptionHandler;
  var BaseException = (function(_super) {
    __extends(BaseException, _super);
    function BaseException(message) {
      if (message === void 0) {
        message = "--";
      }
      _super.call(this, message);
      this.message = message;
      this.stack = (new Error(message)).stack;
    }
    BaseException.prototype.toString = function() {
      return this.message;
    };
    return BaseException;
  })(Error);
  exports.BaseException = BaseException;
  var WrappedException = (function(_super) {
    __extends(WrappedException, _super);
    function WrappedException(_wrapperMessage, _originalException, _originalStack, _context) {
      _super.call(this, _wrapperMessage);
      this._wrapperMessage = _wrapperMessage;
      this._originalException = _originalException;
      this._originalStack = _originalStack;
      this._context = _context;
      this._wrapperStack = (new Error(_wrapperMessage)).stack;
    }
    Object.defineProperty(WrappedException.prototype, "wrapperMessage", {
      get: function() {
        return this._wrapperMessage;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "wrapperStack", {
      get: function() {
        return this._wrapperStack;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "originalException", {
      get: function() {
        return this._originalException;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "originalStack", {
      get: function() {
        return this._originalStack;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "context", {
      get: function() {
        return this._context;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "message", {
      get: function() {
        return exception_handler_1.ExceptionHandler.exceptionToString(this);
      },
      enumerable: true,
      configurable: true
    });
    WrappedException.prototype.toString = function() {
      return this.message;
    };
    return WrappedException;
  })(base_wrapped_exception_1.BaseWrappedException);
  exports.WrappedException = WrappedException;
  function makeTypeError(message) {
    return new TypeError(message);
  }
  exports.makeTypeError = makeTypeError;
  function unimplemented() {
    throw new BaseException('unimplemented');
  }
  exports.unimplemented = unimplemented;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/reflection/reflection_capabilities.js", ["node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/facade/exceptions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  var exceptions_1 = $__require('node_modules/angular2/src/facade/exceptions.js');
  var ReflectionCapabilities = (function() {
    function ReflectionCapabilities(reflect) {
      this._reflect = lang_1.isPresent(reflect) ? reflect : lang_1.global.Reflect;
    }
    ReflectionCapabilities.prototype.isReflectionEnabled = function() {
      return true;
    };
    ReflectionCapabilities.prototype.factory = function(t) {
      switch (t.length) {
        case 0:
          return function() {
            return new t();
          };
        case 1:
          return function(a1) {
            return new t(a1);
          };
        case 2:
          return function(a1, a2) {
            return new t(a1, a2);
          };
        case 3:
          return function(a1, a2, a3) {
            return new t(a1, a2, a3);
          };
        case 4:
          return function(a1, a2, a3, a4) {
            return new t(a1, a2, a3, a4);
          };
        case 5:
          return function(a1, a2, a3, a4, a5) {
            return new t(a1, a2, a3, a4, a5);
          };
        case 6:
          return function(a1, a2, a3, a4, a5, a6) {
            return new t(a1, a2, a3, a4, a5, a6);
          };
        case 7:
          return function(a1, a2, a3, a4, a5, a6, a7) {
            return new t(a1, a2, a3, a4, a5, a6, a7);
          };
        case 8:
          return function(a1, a2, a3, a4, a5, a6, a7, a8) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8);
          };
        case 9:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9);
          };
        case 10:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
          };
        case 11:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
          };
        case 12:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
          };
        case 13:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
          };
        case 14:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
          };
        case 15:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
          };
        case 16:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16);
          };
        case 17:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17);
          };
        case 18:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18);
          };
        case 19:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19);
          };
        case 20:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20);
          };
      }
      ;
      throw new Error("Cannot create a factory for '" + lang_1.stringify(t) + "' because its constructor has more than 20 arguments");
    };
    ReflectionCapabilities.prototype._zipTypesAndAnnotations = function(paramTypes, paramAnnotations) {
      var result;
      if (typeof paramTypes === 'undefined') {
        result = new Array(paramAnnotations.length);
      } else {
        result = new Array(paramTypes.length);
      }
      for (var i = 0; i < result.length; i++) {
        if (typeof paramTypes === 'undefined') {
          result[i] = [];
        } else if (paramTypes[i] != Object) {
          result[i] = [paramTypes[i]];
        } else {
          result[i] = [];
        }
        if (lang_1.isPresent(paramAnnotations) && lang_1.isPresent(paramAnnotations[i])) {
          result[i] = result[i].concat(paramAnnotations[i]);
        }
      }
      return result;
    };
    ReflectionCapabilities.prototype.parameters = function(typeOrFunc) {
      if (lang_1.isPresent(typeOrFunc.parameters)) {
        return typeOrFunc.parameters;
      }
      if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
        var paramAnnotations = this._reflect.getMetadata('parameters', typeOrFunc);
        var paramTypes = this._reflect.getMetadata('design:paramtypes', typeOrFunc);
        if (lang_1.isPresent(paramTypes) || lang_1.isPresent(paramAnnotations)) {
          return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
        }
      }
      var parameters = new Array(typeOrFunc.length);
      parameters.fill(undefined);
      return parameters;
    };
    ReflectionCapabilities.prototype.annotations = function(typeOrFunc) {
      if (lang_1.isPresent(typeOrFunc.annotations)) {
        var annotations = typeOrFunc.annotations;
        if (lang_1.isFunction(annotations) && annotations.annotations) {
          annotations = annotations.annotations;
        }
        return annotations;
      }
      if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
        var annotations = this._reflect.getMetadata('annotations', typeOrFunc);
        if (lang_1.isPresent(annotations))
          return annotations;
      }
      return [];
    };
    ReflectionCapabilities.prototype.propMetadata = function(typeOrFunc) {
      if (lang_1.isPresent(typeOrFunc.propMetadata)) {
        var propMetadata = typeOrFunc.propMetadata;
        if (lang_1.isFunction(propMetadata) && propMetadata.propMetadata) {
          propMetadata = propMetadata.propMetadata;
        }
        return propMetadata;
      }
      if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
        var propMetadata = this._reflect.getMetadata('propMetadata', typeOrFunc);
        if (lang_1.isPresent(propMetadata))
          return propMetadata;
      }
      return {};
    };
    ReflectionCapabilities.prototype.interfaces = function(type) {
      throw new exceptions_1.BaseException("JavaScript does not support interfaces");
    };
    ReflectionCapabilities.prototype.getter = function(name) {
      return new Function('o', 'return o.' + name + ';');
    };
    ReflectionCapabilities.prototype.setter = function(name) {
      return new Function('o', 'v', 'return o.' + name + ' = v;');
    };
    ReflectionCapabilities.prototype.method = function(name) {
      var functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
      return new Function('o', 'args', functionBody);
    };
    ReflectionCapabilities.prototype.importUri = function(type) {
      return './';
    };
    return ReflectionCapabilities;
  })();
  exports.ReflectionCapabilities = ReflectionCapabilities;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/src/core/reflection/reflection.js", ["node_modules/angular2/src/core/reflection/reflector.js", "node_modules/angular2/src/core/reflection/reflection_capabilities.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var reflector_1 = $__require('node_modules/angular2/src/core/reflection/reflector.js');
  var reflector_2 = $__require('node_modules/angular2/src/core/reflection/reflector.js');
  exports.Reflector = reflector_2.Reflector;
  exports.ReflectionInfo = reflector_2.ReflectionInfo;
  var reflection_capabilities_1 = $__require('node_modules/angular2/src/core/reflection/reflection_capabilities.js');
  exports.reflector = new reflector_1.Reflector(new reflection_capabilities_1.ReflectionCapabilities());
  global.define = __define;
  return module.exports;
});

System.registerDynamic("node_modules/angular2/core.js", ["node_modules/angular2/src/core/metadata.js", "node_modules/angular2/src/core/util.js", "node_modules/angular2/src/core/prod_mode.js", "node_modules/angular2/src/core/di.js", "node_modules/angular2/src/facade/facade.js", "node_modules/angular2/src/facade/lang.js", "node_modules/angular2/src/core/application_ref.js", "node_modules/angular2/src/core/application_tokens.js", "node_modules/angular2/src/core/zone.js", "node_modules/angular2/src/core/render.js", "node_modules/angular2/src/core/linker.js", "node_modules/angular2/src/core/debug/debug_node.js", "node_modules/angular2/src/core/testability/testability.js", "node_modules/angular2/src/core/change_detection.js", "node_modules/angular2/src/core/platform_directives_and_pipes.js", "node_modules/angular2/src/core/platform_common_providers.js", "node_modules/angular2/src/core/application_common_providers.js", "node_modules/angular2/src/core/reflection/reflection.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('node_modules/angular2/src/core/metadata.js'));
  __export($__require('node_modules/angular2/src/core/util.js'));
  __export($__require('node_modules/angular2/src/core/prod_mode.js'));
  __export($__require('node_modules/angular2/src/core/di.js'));
  __export($__require('node_modules/angular2/src/facade/facade.js'));
  var lang_1 = $__require('node_modules/angular2/src/facade/lang.js');
  exports.enableProdMode = lang_1.enableProdMode;
  var application_ref_1 = $__require('node_modules/angular2/src/core/application_ref.js');
  exports.platform = application_ref_1.platform;
  exports.createNgZone = application_ref_1.createNgZone;
  exports.PlatformRef = application_ref_1.PlatformRef;
  exports.ApplicationRef = application_ref_1.ApplicationRef;
  var application_tokens_1 = $__require('node_modules/angular2/src/core/application_tokens.js');
  exports.APP_ID = application_tokens_1.APP_ID;
  exports.APP_COMPONENT = application_tokens_1.APP_COMPONENT;
  exports.APP_INITIALIZER = application_tokens_1.APP_INITIALIZER;
  exports.PACKAGE_ROOT_URL = application_tokens_1.PACKAGE_ROOT_URL;
  exports.PLATFORM_INITIALIZER = application_tokens_1.PLATFORM_INITIALIZER;
  __export($__require('node_modules/angular2/src/core/zone.js'));
  __export($__require('node_modules/angular2/src/core/render.js'));
  __export($__require('node_modules/angular2/src/core/linker.js'));
  var debug_node_1 = $__require('node_modules/angular2/src/core/debug/debug_node.js');
  exports.DebugElement = debug_node_1.DebugElement;
  exports.DebugNode = debug_node_1.DebugNode;
  exports.asNativeElements = debug_node_1.asNativeElements;
  __export($__require('node_modules/angular2/src/core/testability/testability.js'));
  __export($__require('node_modules/angular2/src/core/change_detection.js'));
  __export($__require('node_modules/angular2/src/core/platform_directives_and_pipes.js'));
  __export($__require('node_modules/angular2/src/core/platform_common_providers.js'));
  __export($__require('node_modules/angular2/src/core/application_common_providers.js'));
  __export($__require('node_modules/angular2/src/core/reflection/reflection.js'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/pipes/Range/Range.js", ["node_modules/angular2/core.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('node_modules/angular2/core.js');
  var Range = (function() {
    function Range() {}
    Range.prototype.transform = function(value, config) {
      if (config === void 0) {
        config = [0, 4];
      }
      var newValue = [];
      var min = parseInt(config[0]);
      var max = parseInt(config[1]);
      for (var i = min; i <= max; i++)
        newValue.push(i);
      return newValue;
    };
    Range = __decorate([core_1.Pipe({
      name: 'range',
      pure: false
    }), __metadata('design:paramtypes', [])], Range);
    return Range;
  }());
  exports.Range = Range;
  exports.RANGE_PROVIDERS = [Range];
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/pipes/pipes.js", ["bin/pipes/OrderBy/OrderBy.js", "bin/pipes/Range/Range.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var OrderBy_1 = $__require('bin/pipes/OrderBy/OrderBy.js');
  var Range_1 = $__require('bin/pipes/Range/Range.js');
  exports.FUELUI_PIPE_PROVIDERS = [OrderBy_1.ORDERBY_PROVIDERS, Range_1.RANGE_PROVIDERS];
  __export($__require('bin/pipes/OrderBy/OrderBy.js'));
  __export($__require('bin/pipes/Range/Range.js'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/utilities/DateUtils.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/utilities/DetectionUtils.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/utilities/AnimationUtils.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/utilities/ElementUtils.js", ["bin/utilities/AnimationUtils.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var AnimationUtils_1 = $__require('bin/utilities/AnimationUtils.js');
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/utilities/StringUtils.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/utilities/utilities.js", ["bin/utilities/DateUtils.js", "bin/utilities/DetectionUtils.js", "bin/utilities/ElementUtils.js", "bin/utilities/StringUtils.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('bin/utilities/DateUtils.js'));
  __export($__require('bin/utilities/DetectionUtils.js'));
  __export($__require('bin/utilities/ElementUtils.js'));
  __export($__require('bin/utilities/StringUtils.js'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("bin/fuel-ui.js", ["bin/components/components.js", "bin/directives/directives.js", "bin/pipes/pipes.js", "bin/utilities/utilities.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('bin/components/components.js'));
  __export($__require('bin/directives/directives.js'));
  __export($__require('bin/pipes/pipes.js'));
  __export($__require('bin/utilities/utilities.js'));
  global.define = __define;
  return module.exports;
});
