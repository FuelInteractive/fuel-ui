System.registerDynamic("fuel-ui/lib/animations/collapse/collapse", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
  var core_1 = $__require('@angular/core');
  function Collapse(duration) {
    if (duration === void 0) {
      duration = 300;
    }
    return core_1.trigger('collapse', [core_1.state('collapsed, true, void', core_1.style({
      height: '0',
      opacity: '0',
      overflow: 'hidden'
    })), core_1.state('expanded, false', core_1.style({
      height: '*',
      opacity: '1',
      overflow: 'hidden'
    })), core_1.transition('true => false, collapsed => expanded', [core_1.animate(duration + 'ms ease', core_1.keyframes([core_1.style({opacity: '1'}), core_1.style({height: '*'})]))]), core_1.transition('false => true, expanded => collapsed', [core_1.animate(duration + 'ms ease', core_1.style({height: '0'}))])]);
  }
  exports.Collapse = Collapse;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/animations/animations", ["@angular/core", "./collapse/collapse"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var core_1 = $__require('@angular/core');
  __export($__require('./collapse/collapse'));
  var animationComponents = [];
  var animationProviders = [];
  var FuiAnimationsModule = (function() {
    function FuiAnimationsModule() {}
    FuiAnimationsModule = __decorate([core_1.NgModule({
      imports: [],
      declarations: [],
      providers: animationProviders,
      exports: animationProviders.slice()
    }), __metadata('design:paramtypes', [])], FuiAnimationsModule);
    return FuiAnimationsModule;
  }());
  exports.FuiAnimationsModule = FuiAnimationsModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/accordion/accordionItem", ["@angular/core", "../../animations/Collapse/Collapse"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var Collapse_1 = $__require('../../animations/Collapse/Collapse');
  var AccordionItem = (function() {
    function AccordionItem() {
      this.disabled = false;
      this.openChange = new core_1.EventEmitter();
    }
    AccordionItem.prototype.ngOnInit = function() {};
    AccordionItem.prototype.toggleOpen = function(event) {
      event.preventDefault();
      if (!this.disabled) {
        this.open = !this.open;
        this.openChange.next(this.open);
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], AccordionItem.prototype, "heading", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], AccordionItem.prototype, "disabled", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], AccordionItem.prototype, "openChange", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], AccordionItem.prototype, "open", void 0);
    AccordionItem = __decorate([core_1.Component({
      selector: 'accordion-item, [accordion-item]',
      template: "\n      <div (click)=\"toggleOpen($event)\">\n          <span *ngIf=\"heading\" class=\"fuel-ui-clickable\" \n              [ngClass]=\"{'text-muted': disabled}\">\n              {{heading}}\n          </span>\n          <ng-content select=\"accordion-heading\"></ng-content>\n          <ng-content select=\"[accordion-heading]\"></ng-content>\n      </div>\n      <div class=\"fuel-ui-collapse\" [@collapse]=\"!open ? 'true' : 'false'\">\n          <ng-content></ng-content>\n      </div>\n    ",
      animations: [Collapse_1.Collapse(350)]
    }), __metadata('design:paramtypes', [])], AccordionItem);
    return AccordionItem;
  }());
  exports.AccordionItem = AccordionItem;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/accordion/accordion", ["@angular/core", "@angular/common", "./accordionItem", "../../animations/Collapse/Collapse"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var accordionItem_1 = $__require('./accordionItem');
  var Collapse_1 = $__require('../../animations/Collapse/Collapse');
  var Accordion = (function() {
    function Accordion() {
      this.closeOthers = true;
      this.duration = 250;
      this.itemEvents = [];
    }
    Accordion.prototype.ngAfterContentInit = function() {
      var _this = this;
      this.items.changes.subscribe(function(i) {
        return _this.registerItems();
      });
      this.registerItems();
    };
    Accordion.prototype.registerItems = function() {
      var _this = this;
      for (var _i = 0,
          _a = this.itemEvents; _i < _a.length; _i++) {
        var event_1 = _a[_i];
        event_1.unsubscribe();
      }
      var _loop_1 = function(item) {
        item.openChange.subscribe(function() {
          _this.closeOtherItems(item);
        });
      };
      for (var _b = 0,
          _c = this.items.toArray(); _b < _c.length; _b++) {
        var item = _c[_b];
        _loop_1(item);
      }
    };
    Accordion.prototype.closeOtherItems = function(openItem) {
      if (!this.closeOthers)
        return;
      this.items.forEach(function(item) {
        if (item !== openItem) {
          item.open = false;
        }
      });
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Accordion.prototype, "closeOthers", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Accordion.prototype, "duration", void 0);
    __decorate([core_1.ContentChildren(accordionItem_1.AccordionItem), __metadata('design:type', core_1.QueryList)], Accordion.prototype, "items", void 0);
    Accordion = __decorate([core_1.Component({
      selector: 'accordion',
      template: "<ng-content></ng-content>",
      animations: [Collapse_1.Collapse(350)]
    }), __metadata('design:paramtypes', [])], Accordion);
    return Accordion;
  }());
  exports.Accordion = Accordion;
  var accordionComponents = [Accordion, accordionItem_1.AccordionItem];
  var FuiAccordionModule = (function() {
    function FuiAccordionModule() {}
    FuiAccordionModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: accordionComponents,
      exports: accordionComponents
    }), __metadata('design:paramtypes', [])], FuiAccordionModule);
    return FuiAccordionModule;
  }());
  exports.FuiAccordionModule = FuiAccordionModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/alert/alert", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var Alert = (function(_super) {
    __extends(Alert, _super);
    function Alert(_el) {
      _super.call(this);
      this._el = _el;
      this.displayed = false;
      this.closeButton = true;
      this.type = 'success';
      this.closeDelay = 0;
      this.displayedChange = new core_1.EventEmitter();
    }
    Alert.prototype.ngOnChanges = function(event) {
      var _this = this;
      if (this.displayed && this._el.nativeElement.querySelector('.alert')) {
        var classes = this._el.nativeElement.querySelector('.alert').className;
        classes = classes.replace('fuel-ui-alert-fade-out', 'fuel-ui-alert-fade-in');
        this._el.nativeElement.querySelector('.alert').className = classes;
      }
      if (this.closeDelay > 0) {
        setTimeout(function() {
          _this.close();
        }, this.closeDelay);
      }
    };
    Alert.prototype.close = function() {
      var _this = this;
      if (this._el.nativeElement.querySelector('.alert')) {
        var classes = this._el.nativeElement.querySelector('.alert').className;
        classes = classes.replace('fuel-ui-alert-fade-in', 'fuel-ui-alert-fade-out');
        this._el.nativeElement.querySelector('.alert').className = classes;
      }
      setTimeout(function() {
        _this.displayed = false;
        _this.displayedChange.next(null);
      }, 1000);
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Alert.prototype, "displayed", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Alert.prototype, "closeButton", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Alert.prototype, "type", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Alert.prototype, "closeDelay", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], Alert.prototype, "displayedChange", void 0);
    Alert = __decorate([core_1.Component({
      selector: 'alert',
      template: "\n      <div\n          *ngIf=\"displayed\"\n          role=\"alert\"\n          class=\"alert fuel-ui-alert-fade-in\"\n          [ngClass]=\"{'alert-success': type === 'success', 'alert-info': type === 'info', 'alert-warning': type === 'warning', 'alert-danger': type === 'danger' }\" >\n          <button *ngIf=\"closeButton\" (click)=\"close()\" type=\"button\" class=\"close\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&#215;</span>\n              <span class=\"sr-only\">Close</span>\n          </button>\n          <ng-content></ng-content>\n      </div>\n    "
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Alert);
    return Alert;
  }(core_1.OnChanges));
  exports.Alert = Alert;
  var FuiAlertModule = (function() {
    function FuiAlertModule() {}
    FuiAlertModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: [Alert],
      exports: [Alert]
    }), __metadata('design:paramtypes', [])], FuiAlertModule);
    return FuiAlertModule;
  }());
  exports.FuiAlertModule = FuiAlertModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/carousel/carousel", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var core_2 = $__require('@angular/core');
  var core_3 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var core_4 = $__require('@angular/core');
  var CarouselItem = (function() {
    function CarouselItem(_change, element) {
      this._change = _change;
      this.id = 0;
      this._state = "void";
      this.element = element.nativeElement;
    }
    Object.defineProperty(CarouselItem.prototype, "state", {
      get: function() {
        return this._state;
      },
      set: function(val) {
        var _this = this;
        this._state = val;
        setTimeout(function() {
          _this._change.markForCheck();
        }, 1);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(CarouselItem.prototype, "isActive", {
      get: function() {
        return this.state == "in";
      },
      enumerable: true,
      configurable: true
    });
    CarouselItem.prototype.getTotalHeight = function() {
      var height = this.element.clientHeight;
      if (height > 1)
        return height;
      var child = this.element.firstElementChild;
      while (child != null) {
        height += child.offsetHeight;
        child = child.nextElementSibling;
      }
      return height;
    };
    CarouselItem = __decorate([core_1.Component({
      selector: ".carousel-item",
      changeDetection: core_3.ChangeDetectionStrategy.OnPush,
      template: "\n        <div [@slide]=\"state\" class=\"item-content\">\n            <ng-content></ng-content>\n        </div>\n    ",
      animations: [core_4.trigger("slide", [core_4.state("right", core_4.style({transform: "translate(100%,0)"})), core_4.state("in, void", core_4.style({transform: "translate(0,0)"})), core_4.state("left", core_4.style({transform: "translate(-100%, 0)"})), core_4.transition("right <=> in", [core_4.animate("300ms ease")]), core_4.transition("left <=> in", [core_4.animate("300ms ease")])])]
    }), __metadata('design:paramtypes', [core_3.ChangeDetectorRef, core_2.ElementRef])], CarouselItem);
    return CarouselItem;
  }());
  exports.CarouselItem = CarouselItem;
  var Carousel = (function() {
    function Carousel(_change, element) {
      this._change = _change;
      this.hammerInitialized = false;
      this.items = [];
      this._activeIndex = 0;
      this._intervalRef = null;
      this.innerHeight = 0;
      this.panDirection = 0;
      this.lastPanOffset = 0;
      this.element = element.nativeElement;
    }
    Object.defineProperty(Carousel.prototype, "activeIndex", {
      get: function() {
        return this._activeIndex;
      },
      set: function(val) {
        if (this.items.length == 0) {
          this._activeIndex = -1;
          return;
        }
        this._activeIndex = val;
        for (var i in this.items) {
          var itemIndex = parseInt(i);
          if (i == val.toString())
            this.items[i].state = "in";
          else if (itemIndex == this.getRelativeIndex(-1))
            this.items[i].state = "left";
          else if (itemIndex == this.getRelativeIndex(1))
            this.items[i].state = "right";
          else
            this.items[i].state = "right";
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Carousel.prototype, "interval", {
      set: function(val) {
        var _this = this;
        if (this._intervalRef != null) {
          clearInterval(this._intervalRef);
          this._intervalRef = null;
        }
        if (val > 0)
          setInterval(function() {
            _this.next();
          }, val);
      },
      enumerable: true,
      configurable: true
    });
    Carousel.prototype.ngAfterContentInit = function() {
      var _this = this;
      this.itemQuery.changes.subscribe(function() {
        return _this.registerItems();
      });
      this.registerItems();
    };
    Carousel.prototype.ngAfterContentChecked = function() {
      this.updateInnerHeight();
    };
    Carousel.prototype.ngAfterViewInit = function() {
      var _this = this;
      if (!this.hammerInitialized && typeof Hammer !== "undefined") {
        var hammer = new Hammer(this.element);
        hammer.on('swiperight', function(ev) {
          _this.prev();
        });
        hammer.on('swipeleft', function(ev) {
          _this.next();
        });
        this.hammerInitialized = true;
      }
    };
    Carousel.prototype.ngOnDestroy = function() {
      if (this._intervalRef != null) {
        clearInterval(this._intervalRef);
        this._intervalRef = null;
      }
    };
    Carousel.prototype.registerItems = function() {
      this.items = [];
      if (this.itemQuery.length == 0)
        return;
      var itemArray = this.itemQuery.toArray();
      for (var i in itemArray)
        itemArray[i].id = i;
      this.items = this.itemQuery.toArray();
      this.activeIndex = this.items.reduce(function(prev, current, index) {
        if (prev != -1 && current.isActive || !current.isActive) {
          return prev;
        } else
          return index;
      }, -1);
      if (this.activeIndex == -1)
        this.activeIndex = 0;
      this.updateInnerHeight();
    };
    Carousel.prototype.updateInnerHeight = function() {
      this.innerHeight = this.items[this.activeIndex].getTotalHeight();
      if (this.innerHeight < 1)
        this.innerHeight = 250;
      this._change.markForCheck();
    };
    Carousel.prototype.getRelativeItem = function(rel) {
      if (this.items.length == 1)
        return this.items[0];
      return this.items[this.getRelativeIndex(rel)];
    };
    Carousel.prototype.getRelativeIndex = function(rel) {
      var target = this.activeIndex + rel;
      if (this.items.length == 0)
        return null;
      if (target < 0)
        target = this.items.length - 1;
      else if (target > (this.items.length - 1))
        target = 0;
      return target;
    };
    Carousel.prototype.navigateTo = function(item) {
      var index = this.items.indexOf(item);
      if (index > this.activeIndex)
        this.next(item);
      else
        this.prev(item);
    };
    Carousel.prototype.prev = function(item) {
      if (item === void 0) {
        item = null;
      }
      if (this.items.length < 2)
        return;
      this.activeIndex = this.getRelativeIndex(-1);
      this._change.markForCheck();
    };
    Carousel.prototype.next = function(item) {
      if (item === void 0) {
        item = null;
      }
      if (this.items.length < 2)
        return;
      this.activeIndex = this.getRelativeIndex(1);
      this._change.markForCheck();
    };
    Carousel.prototype.swipeleft = function() {
      if (this.panDirection == 0)
        this.next();
    };
    Carousel.prototype.swiperight = function() {
      if (this.panDirection == 0)
        this.prev();
    };
    __decorate([core_3.Input(), __metadata('design:type', Number), __metadata('design:paramtypes', [Number])], Carousel.prototype, "interval", null);
    __decorate([core_2.ContentChildren(CarouselItem), __metadata('design:type', core_2.QueryList)], Carousel.prototype, "itemQuery", void 0);
    Carousel = __decorate([core_1.Component({
      selector: "carousel",
      template: "\n      <div class=\"carousel slide\" >\n        <!--(swiperight)=\"prev()\" (swipeleft)=\"next()\"-->\n        <!--(pan)=\"pan($event)\" (panleft)=\"panleft($event)\" (panright)=\"panright($event)\"\n        (panend)=\"panend($event)\"-->\n        <ol class=\"carousel-indicators\">\n          <!--<li *ngFor=\"let image of images\"\n            (click)=\"switchTo(image)\" [class.active]=\"image.isActive && !image.checkIfAnimating()\">\n            </li> -->\n            <li *ngFor=\"let item of items\"\n              [class.active]=\"item.isActive\"\n              (click)=\"navigateTo(item)\">\n            </li>\n        </ol>\n        <div class=\"carousel-inner\" role=\"listbox\"\n          [style.height.px]=\"innerHeight\">\n            <ng-content select=\"carousel-item,.carousel-item\"></ng-content>\n        </div>\n        <a class=\"left carousel-control\" role=\"button\" (click)=\"prev()\">\n          <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n          <span class=\"sr-only\">Previous</span>\n        </a>\n        <a class=\"right carousel-control\" role=\"button\" (click)=\"next()\">\n          <span class=\"icon-next\" aria-hidden=\"true\"></span>\n          <span class=\"sr-only\">Next</span>\n        </a>\n      </div>\n    ",
      directives: [CarouselItem],
      changeDetection: core_3.ChangeDetectionStrategy.OnPush
    }), __metadata('design:paramtypes', [core_3.ChangeDetectorRef, core_2.ElementRef])], Carousel);
    return Carousel;
  }());
  exports.Carousel = Carousel;
  var carouselDirectives = [Carousel, CarouselItem];
  var FuiCarouselModule = (function() {
    function FuiCarouselModule() {}
    FuiCarouselModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: carouselDirectives,
      exports: carouselDirectives
    }), __metadata('design:paramtypes', [])], FuiCarouselModule);
    return FuiCarouselModule;
  }());
  exports.FuiCarouselModule = FuiCarouselModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/datePicker/datePickerCalendar", ["@angular/core", "../../utilities/utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var core_2 = $__require('@angular/core');
  var utilities_1 = $__require('../../utilities/utilities');
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
      if (this.selectedDate == null)
        return false;
      if (this.startDate != null && this.endDate != null) {
        var compareDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), parseInt(date));
        return compareDate >= this.startDate && compareDate <= this.endDate;
      }
      return this.selectedDate.getFullYear() == this.currentMonth.getFullYear() && this.selectedDate.getMonth() == this.currentMonth.getMonth() && this.selectedDate.getDate().toString() == date;
    };
    DatePickerCalendar.prototype.checkStartDate = function(date) {
      if (this.endDate == null || !utilities_1.DateUtils.isValidDate(this.startDate) || !utilities_1.DateUtils.isValidDate(this.endDate))
        return false;
      if (this.startDate.getFullYear() == this.endDate.getFullYear() && this.startDate.getMonth() == this.endDate.getMonth() && this.startDate.getDate().toString() == this.endDate.getDate().toString())
        return false;
      return this.startDate.getFullYear() == this.currentMonth.getFullYear() && this.startDate.getMonth() == this.currentMonth.getMonth() && this.startDate.getDate().toString() == date;
    };
    DatePickerCalendar.prototype.checkEndDate = function(date) {
      if (this.endDate == null || !utilities_1.DateUtils.isValidDate(this.startDate) || !utilities_1.DateUtils.isValidDate(this.endDate))
        return false;
      if (this.startDate.getFullYear() == this.endDate.getFullYear() && this.startDate.getMonth() == this.endDate.getMonth() && this.startDate.getDate().toString() == this.endDate.getDate().toString())
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
      selector: "date-picker-calendar",
      template: "\n      <div class=\"fuel-ui-datepicker-calendar text-center py\">\n        <table class=\"table m-a-0\">\t\n            <tbody>\n                  <tr *ngIf=\"showMonth\">\n                      <td colspan=\"7\">\n                          <strong>{{currentMonth | date:'MMMM yyyy'}}</strong>\n                      </td>\n                  </tr> \n                <tr *ngFor=\"let week of weeks\">\n                    <td *ngFor=\"let day of week\"\n                        [class.selectable]=\"checkSelectable(day)\" \n                        [class.disabled]=\"!checkSelectable(day)\"\n                        [class.selected]=\"checkSelectedDate(day)\" \n                          [class.startDate]=\"checkStartDate(day)\"\n                          [class.endDate]=\"checkEndDate(day)\"\n                        (click)=\"selectDate(day)\">\n                        <span class=\"calendar-date\">{{day}}</span>\n                    </td> \n                </tr>\n            </tbody>\n        </table>\n      </div>\n    "
    }), __metadata('design:paramtypes', [])], DatePickerCalendar);
    return DatePickerCalendar;
  }());
  exports.DatePickerCalendar = DatePickerCalendar;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/datePicker/datePicker", ["@angular/core", "./datePickerField", "../infiniteScroller/infiniteScroller", "../../utilities/utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var core_2 = $__require('@angular/core');
  var datePickerField_1 = $__require('./datePickerField');
  var infiniteScroller_1 = $__require('../infiniteScroller/infiniteScroller');
  var utilities_1 = $__require('../../utilities/utilities');
  var DatePicker = (function() {
    function DatePicker(changeDetector, renderer) {
      this._minDate = new Date(1900, 0, 1);
      this._maxDate = new Date(2200, 0, 1);
      this.valueChange = new core_2.EventEmitter();
      this.calendarDisplayed = false;
      this.calendarX = "5%";
      this.calendarY = "5%";
      this.calendarHeight = utilities_1.MobileDetection.isAny() || window.innerWidth <= 480 || window.outerWidth <= 480 ? "auto" : "300px";
      this.calendarMonths = [];
      this._preGenMonths = 2;
      this.initialScroll = true;
      this.changeDetector = changeDetector;
      this.renderer = renderer;
      this.generateMonths();
    }
    Object.defineProperty(DatePicker.prototype, "minDate", {
      get: function() {
        return this._minDate;
      },
      set: function(value) {
        this._minDate = utilities_1.DateUtils.handleDateInput(value);
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
        this._maxDate = utilities_1.DateUtils.handleDateInput(value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DatePicker.prototype, "value", {
      set: function(value) {
        this._selectedDate = utilities_1.DateUtils.handleDateInput(value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DatePicker.prototype, "inputDate", {
      get: function() {
        return this.dateField != null ? this.dateField.value : "";
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
        if (this.dateField != null && this.dateField.date.getTime() != value.getTime())
          this.dateField.date = value;
        this.valueChange.next(this.selectedDate);
        this.hideCalendar();
      },
      enumerable: true,
      configurable: true
    });
    ;
    DatePicker.prototype.ngOnInit = function() {
      this.scrollerReset();
    };
    DatePicker.prototype.ngAfterContentInit = function() {
      var _this = this;
      if (this.dateField == undefined)
        throw "Fuel-UI Error: DatePicker missing date field";
      var parsedDate = utilities_1.DateUtils.handleDateInput(this.dateField.value);
      if (this.dateField.value.length > 0 && utilities_1.DateUtils.isValidDate(parsedDate))
        this.selectedDate = parsedDate;
      this.dateField.select.subscribe(function(event) {
        _this.showCalendar(event);
      });
      this.dateFieldIcons.map(function(i) {
        i.selectEvent.subscribe(function(event) {
          _this.showCalendar(event);
        });
      });
      this.generateMonths();
    };
    DatePicker.prototype.generateMonths = function() {
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
    };
    DatePicker.prototype.scrollerReset = function() {
      var _this = this;
      setTimeout(function() {
        var currentDate = _this.selectedDate != null ? _this.selectedDate : new Date();
        if (_this.calendarScroller == null)
          return;
        var scrollToMonth = _this.calendarMonths.findIndex(function(m) {
          return m.getFullYear() == currentDate.getFullYear() && m.getMonth() == currentDate.getMonth();
        });
        if (_this.initialScroll) {
          _this.initialScroll = false;
          _this.calendarScroller.container.scrollTop = _this.calendarScroller.itemQuery.toArray()[scrollToMonth].element.offsetTop - 20;
        }
        _this.calendarScroller.scrollToIndex(scrollToMonth);
      }, 1);
    };
    DatePicker.prototype.toggleCalendar = function(event) {
      if (!this.calendarDisplayed)
        this.showCalendar(event);
      else
        this.hideCalendar();
    };
    DatePicker.prototype.showCalendar = function(event) {
      if (event != null && !utilities_1.MobileDetection.isAny()) {
        var clickedTarget = event.target ? event.target.parentElement : event.srcElement.parentElement;
        if (clickedTarget.classList.contains("input-group-addon"))
          clickedTarget = clickedTarget.parentElement;
        this.calendarX = clickedTarget.offsetLeft + "px";
        if (screen.height - clickedTarget.getBoundingClientRect().bottom <= 500) {
          this.calendarY = (clickedTarget.offsetTop - 300) + "px";
        } else {
          this.calendarY = clickedTarget.offsetTop + "px";
        }
      } else if (utilities_1.MobileDetection.isAny()) {
        this.calendarX = "5%";
        this.calendarY = "5%";
      }
      this.scrollerReset();
      this.changeDetector.markForCheck();
      this.calendarDisplayed = true;
    };
    DatePicker.prototype.hideCalendar = function() {
      this.calendarDisplayed = false;
      this.initialScroll = true;
      this.changeDetector.markForCheck();
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
      this.changeDetector.markForCheck();
    };
    DatePicker.prototype.addPrevMonth = function() {
      if (!this.canPrevMonth)
        return;
      var firstMonth = this.calendarMonths[0];
      var prevMonth = new Date(firstMonth.getFullYear(), firstMonth.getMonth() - 1);
      this.calendarMonths.unshift(prevMonth);
      this.changeDetector.markForCheck();
    };
    __decorate([core_2.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DatePicker.prototype, "minDate", null);
    __decorate([core_2.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DatePicker.prototype, "maxDate", null);
    __decorate([core_2.Input(), __metadata('design:type', Function)], DatePicker.prototype, "dateFilter", void 0);
    __decorate([core_2.Output(), __metadata('design:type', Object)], DatePicker.prototype, "valueChange", void 0);
    __decorate([core_2.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DatePicker.prototype, "value", null);
    __decorate([core_2.ViewChild(infiniteScroller_1.InfiniteScroller), __metadata('design:type', infiniteScroller_1.InfiniteScroller)], DatePicker.prototype, "calendarScroller", void 0);
    __decorate([core_2.ContentChild(datePickerField_1.DatePickerField), __metadata('design:type', datePickerField_1.DatePickerField)], DatePicker.prototype, "dateField", void 0);
    __decorate([core_2.ContentChildren(datePickerField_1.DatePickerFieldStyler), __metadata('design:type', core_2.QueryList)], DatePicker.prototype, "dateFieldIcons", void 0);
    DatePicker = __decorate([core_1.Component({
      selector: "date-picker",
      styles: ["\n      .date-picker-overlay {\n        background-color: transparent;\n        display: block;\n        position: fixed;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        z-index: 900; }\n        @media (max-width: 480px), screen and (max-device-width: 480px) {\n          .date-picker-overlay {\n            background-color: #55595c;\n            opacity: .75; } }\n\n      .date-picker-content {\n        position: relative;\n        top: 0;\n        left: 0; }\n\n      .fuel-ui-datepicker-input-group input:read-only, .fuel-ui-datepicker-input-group .form-control[readonly] {\n        background-color: #fff !important; }\n\n      .fuel-ui-datepicker-input-group .input-group-addon {\n        background-color: #fff !important; }\n\n      .date-picker-component {\n        border: 1px solid #eceeef;\n        z-index: 1000;\n        background-color: #fff;\n        font-size: .75rem;\n        position: absolute;\n        width: 350px;\n        height: auto;\n        top: 0;\n        left: 0;\n        overflow: hidden;\n        border-radius: 0.3rem;\n        -webkit-transition: all 0.1s ease;\n        -moz-transition: all 0.1s ease;\n        transition: all 0.1s ease; }\n        @media (max-width: 480px), screen and (max-device-width: 480px) {\n          .date-picker-component {\n            width: 90%;\n            height: 90%;\n            position: fixed;\n            top: 5%;\n            left: 5%; } }\n        .date-picker-component .input-group {\n          z-index: 110; }\n        .date-picker-component .container {\n          height: 100%; }\n          @media (max-width: 480px), screen and (max-device-width: 480px) {\n            .date-picker-component .container .calendar-container {\n              height: 91%; } }\n          .date-picker-component .container header {\n            position: relative;\n            top: 0;\n            left: 0;\n            vertical-align: middle;\n            background-color: #fff; }\n            .date-picker-component .container header .days-of-week {\n              background-color: #0275d8;\n              color: #fff; }\n            .date-picker-component .container header table {\n              border-top: none !important; }\n              .date-picker-component .container header table th, .date-picker-component .container header table td {\n                text-align: center; }\n            .date-picker-component .container header button {\n              border: none;\n              border-radius: 0;\n              color: #0275d8;\n              background-color: #fff;\n              width: 15%; }\n              .date-picker-component .container header button:active {\n                background-color: #eceeef; }\n              .date-picker-component .container header button.button-disable {\n                color: #eceeef;\n                cursor: default; }\n            .date-picker-component .container header .date-range {\n              width: 70%; }\n              .date-picker-component .container header .date-range span {\n                background-color: #eceeef;\n                border-left: none;\n                border-right: none; }\n            .date-picker-component .container header .input-group-addon {\n              border: none;\n              background-color: #fff !important; }\n            .date-picker-component .container header input {\n              border: none;\n              display: inline-block;\n              margin: 1px auto 0 auto;\n              cursor: pointer;\n              background-color: #fff !important; }\n            .date-picker-component .container header input:read-only, .date-picker-component .container header .form-control[readonly] {\n              background-color: #fff !important; }\n            .date-picker-component .container header input.target {\n              color: #0275d8; }\n              .date-picker-component .container header input.target::-webkit-input-placeholder {\n                color: #0275d8; }\n              .date-picker-component .container header input.target::-moz-placeholder {\n                color: #0275d8; }\n              .date-picker-component .container header input.target:-moz-placeholder {\n                color: #0275d8; }\n              .date-picker-component .container header input.target:-ms-input-placeholder {\n                color: #0275d8; }\n    "],
      template: "\n      <div class=\"date-picker-overlay\" aria-hidden=\"true\"\n          *ngIf=\"calendarDisplayed\" \n          (click)=\"hideCalendar()\">\n      </div>\n\n      <div class=\"date-picker-content\">\n          <ng-content></ng-content>\n\n          <div class=\"date-picker-component\" *ngIf=\"calendarDisplayed\"\n              [style.left]=\"calendarX\"\n              [style.top]=\"calendarY\">\n              <div class=\"container p-a-0\">\n                  <header>\n                      <button type=\"button\" class=\"btn btn-secondary pull-left\"\n                          (click)=\"scrollPrevMonth()\" [class.button-disable]=\"disablePrev()\">\n                          <i class=\"fa fa-chevron-left\"></i>\n                      </button>\n                      <div class=\"date-range pull-left input-group\">\n                          <input type=\"text\" class=\"form-control text-xs-center\" \n                              id=\"startDate\" [(ngModel)]=\"inputDate\" readonly />\n                      </div>\n                      <button type=\"button\" class=\"btn btn-secondary pull-right\"\n                          (click)=\"scrollNextMonth()\" [class.button-disable]=\"disableNext()\">\n                          <i class=\"fa fa-chevron-right\"></i>\n                      </button>\n                      <table class=\"table m-b-0 days-of-week\">\n                          <tbody>\n                          <tr>\n                              <th>S</th>\n                              <th>M</th>\n                              <th>T</th>\n                              <th>W</th>\n                              <th>T</th>\n                              <th>F</th>\n                              <th>S</th>\n                          </tr>\n                          </tbody>\n                      </table>\n                  </header>\n                  <div class=\"calendar-container m-a-0\">\n                      <infinite-scroller\n                          (next)=\"addNextMonth()\"\n                          (prev)=\"addPrevMonth()\"\n                          distance=\"100\"\n                          [height]=\"calendarHeight\"\n                          [hideScrollbar]=\"true\">\n                          <date-picker-calendar scroll-item\n                              *ngFor=\"let month of calendarMonths; let i=index\" \n                              [id]=\"i\"\n                              [minDate]=\"minDate\" [maxDate]=\"maxDate\"\n                              [dateFilter]=\"dateFilter\"\n                              [currentMonth]=\"month\" \n                              [(selectedDate)]=\"selectedDate\">\n                              {{i}}\n                          </date-picker-calendar>\n                      </infinite-scroller>\n                  </div>\n              </div>\n          </div>\n      </div>\n    ",
      changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }), __metadata('design:paramtypes', [core_1.ChangeDetectorRef, core_1.Renderer])], DatePicker);
    return DatePicker;
  }());
  exports.DatePicker = DatePicker;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/datePicker/datePickerField", ["@angular/core", "../../utilities/utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var utilities_1 = $__require('../../utilities/utilities');
  var DatePickerField = (function() {
    function DatePickerField() {
      this._date = new Date();
      this._value = "";
      this.valueChange = new core_1.EventEmitter();
      this.ngModelChange = new core_1.EventEmitter();
      this.dateChange = new core_1.EventEmitter();
      this.select = new core_1.EventEmitter();
    }
    Object.defineProperty(DatePickerField.prototype, "value", {
      get: function() {
        return this._value;
      },
      set: function(value) {
        if (value == this._value)
          return;
        this._value = value;
        this._date = utilities_1.DateUtils.handleDateInput(value);
        this.valueChange.next(value);
        this.ngModelChange.next(value);
        this.dateChange.next(this._date);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DatePickerField.prototype, "ngModel", {
      set: function(value) {
        this.value = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DatePickerField.prototype, "date", {
      get: function() {
        return this._date;
      },
      set: function(date) {
        if (date.getTime() == this._date.getTime())
          return;
        this._date = date;
        this._value = date.toLocaleDateString();
        this.dateChange.next(date);
        this.ngModelChange.next(this._value);
        this.valueChange.next(this._value);
      },
      enumerable: true,
      configurable: true
    });
    DatePickerField.prototype.inputChange = function(value) {
      this.value = value;
    };
    DatePickerField.prototype.focused = function(event) {
      this.select.next(event);
    };
    DatePickerField.prototype.selected = function(event) {
      this.select.next(event);
    };
    DatePickerField.prototype.ngOnInit = function() {
      this.date = utilities_1.DateUtils.handleDateInput(this.value);
    };
    __decorate([core_1.HostBinding("value"), __metadata('design:type', Object)], DatePickerField.prototype, "_value", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String), __metadata('design:paramtypes', [String])], DatePickerField.prototype, "value", null);
    __decorate([core_1.Output(), __metadata('design:type', Object)], DatePickerField.prototype, "valueChange", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DatePickerField.prototype, "ngModel", null);
    __decorate([core_1.Output(), __metadata('design:type', Object)], DatePickerField.prototype, "ngModelChange", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date), __metadata('design:paramtypes', [Date])], DatePickerField.prototype, "date", null);
    __decorate([core_1.Output(), __metadata('design:type', Object)], DatePickerField.prototype, "dateChange", void 0);
    __decorate([core_1.HostListener("input", ["$event.target.value"]), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], DatePickerField.prototype, "inputChange", null);
    __decorate([core_1.HostListener("focus", ["$event"]), __metadata('design:type', Function), __metadata('design:paramtypes', [Event]), __metadata('design:returntype', void 0)], DatePickerField.prototype, "focused", null);
    __decorate([core_1.Output(), __metadata('design:type', Object)], DatePickerField.prototype, "select", void 0);
    __decorate([core_1.HostListener("click", ["$event"]), __metadata('design:type', Function), __metadata('design:paramtypes', [MouseEvent]), __metadata('design:returntype', void 0)], DatePickerField.prototype, "selected", null);
    DatePickerField = __decorate([core_1.Directive({selector: "[dateField], .date-field"}), __metadata('design:paramtypes', [])], DatePickerField);
    return DatePickerField;
  }());
  exports.DatePickerField = DatePickerField;
  var DatePickerFieldStyler = (function() {
    function DatePickerFieldStyler() {
      this.selectEvent = new core_1.EventEmitter();
    }
    DatePickerFieldStyler.prototype.select = function(event) {
      this.selectEvent.next(event);
    };
    DatePickerFieldStyler = __decorate([core_1.Component({
      selector: ".date-picker-input-group",
      template: " \n    <div class=\"input-group fuel-ui-datepicker-input-group\">\n        <ng-content></ng-content>\n        <span class=\"input-group-addon\" (click)=\"select($event)\"> \n            <i class=\"fa fa-calendar\"></i>\n        </span>\n    </div>"
    }), __metadata('design:paramtypes', [])], DatePickerFieldStyler);
    return DatePickerFieldStyler;
  }());
  exports.DatePickerFieldStyler = DatePickerFieldStyler;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/datePicker/dateRangePicker", ["@angular/core", "../../utilities/utilities", "./datePicker", "./datePickerField", "../infiniteScroller/infiniteScroller"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var core_2 = $__require('@angular/core');
  var core_3 = $__require('@angular/core');
  var utilities_1 = $__require('../../utilities/utilities');
  var datePicker_1 = $__require('./datePicker');
  var datePickerField_1 = $__require('./datePickerField');
  var infiniteScroller_1 = $__require('../infiniteScroller/infiniteScroller');
  var StartDateField = (function(_super) {
    __extends(StartDateField, _super);
    function StartDateField(element) {
      _super.call(this);
      this.element = element;
    }
    StartDateField = __decorate([core_1.Directive({selector: "[startDateField], .start-date-field"}), __metadata('design:paramtypes', [core_2.ElementRef])], StartDateField);
    return StartDateField;
  }(datePickerField_1.DatePickerField));
  exports.StartDateField = StartDateField;
  var EndDateField = (function(_super) {
    __extends(EndDateField, _super);
    function EndDateField(element) {
      _super.call(this);
      this.element = element;
    }
    EndDateField = __decorate([core_1.Directive({selector: "[endDateField], .start-date-field"}), __metadata('design:paramtypes', [core_2.ElementRef])], EndDateField);
    return EndDateField;
  }(datePickerField_1.DatePickerField));
  exports.EndDateField = EndDateField;
  var DateRangePicker = (function(_super) {
    __extends(DateRangePicker, _super);
    function DateRangePicker(changeDetector, renderer) {
      _super.call(this, changeDetector, renderer);
      this.valueChange = new core_2.EventEmitter();
      this._dateTarget = false;
      this.calendarHeight = utilities_1.MobileDetection.isAny() || window.innerWidth <= 480 || window.outerWidth <= 480 ? "auto" : "300px";
      this.startDateChange = new core_2.EventEmitter();
      this.endDateChange = new core_2.EventEmitter();
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
        this._minDate = utilities_1.DateUtils.handleDateInput(value);
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
        this._maxDate = utilities_1.DateUtils.handleDateInput(value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "selectedDate", {
      get: function() {
        return this._selectedDate;
      },
      set: function(value) {
        this.selectDate(value);
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(DateRangePicker.prototype, "inputStartDate", {
      get: function() {
        return this.startDateField != null ? this.startDateField.value : "";
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "inputEndDate", {
      get: function() {
        return this.endDateField != null ? this.endDateField.value : "";
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "startDate", {
      get: function() {
        return this._startDate;
      },
      set: function(value) {
        this._startDate = utilities_1.DateUtils.handleDateInput(value);
        if (this.startDateField != null)
          this.startDateField.value = this._startDate.toLocaleDateString();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "endDate", {
      get: function() {
        return this._endDate;
      },
      set: function(value) {
        this._endDate = utilities_1.DateUtils.handleDateInput(value);
        if (this.endDateField != null)
          this.endDateField.value = this._endDate.toLocaleDateString();
      },
      enumerable: true,
      configurable: true
    });
    DateRangePicker.prototype.ngAfterContentInit = function() {
      var _this = this;
      if (typeof this.startDateField === "undefined")
        throw "Fuel-UI Error: DateRangePicker missing startDate field";
      var startDateValue = utilities_1.DateUtils.handleDateInput(this.startDateField.value);
      if (this.startDateField.value.length > 0 && utilities_1.DateUtils.isValidDate(startDateValue))
        this.selectDate(startDateValue, false);
      else {
        this.selectDate(this._startDate, false);
        this.startDateField._value = this._startDate.toLocaleDateString();
      }
      this.startDateField.select.subscribe(function(event) {
        _this.showCalendar(event);
        _this.focusStartDate();
      });
      if (typeof this.endDateField === "undefined")
        throw "Fuel-UI Error: DateRangePicker missing endDate field";
      var endDateValue = utilities_1.DateUtils.handleDateInput(this.endDateField.value);
      if (this.endDateField.value.length > 0 && utilities_1.DateUtils.isValidDate(endDateValue))
        this.selectDate(endDateValue, true);
      else {
        this.selectDate(this._endDate, true);
        this.endDateField._value = this._endDate.toLocaleDateString();
      }
      this.endDateField.select.subscribe(function(event) {
        _this.showCalendar(event);
        _this.focusEndDate();
      });
      this.dateFieldIcons.map(function(i) {
        i.selectEvent.subscribe(function(event) {
          _this.showCalendar(event);
        });
      });
      this.generateMonths();
    };
    DateRangePicker.prototype.selectDate = function(value, target) {
      this._selectedDate = value;
      var dateTarget = (typeof target !== "undefined" && target != null) ? target : this._dateTarget;
      if (!dateTarget) {
        this.startDate = value;
        if (this.startDateChange != null)
          this.startDateChange.next(this._startDate);
        if (utilities_1.DateUtils.isValidDate(this.endDate) && this.startDate > this.endDate)
          this.endDate = new Date(this.startDate.getTime() + 24 * 60 * 60 * 1000);
      } else {
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
    DateRangePicker.prototype.handleRangeInput = function(value) {
      if (!(value instanceof utilities_1.DateRange))
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
    __decorate([core_3.Output(), __metadata('design:type', Object)], DateRangePicker.prototype, "valueChange", void 0);
    __decorate([core_3.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DateRangePicker.prototype, "value", null);
    __decorate([core_3.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DateRangePicker.prototype, "minDate", null);
    __decorate([core_3.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DateRangePicker.prototype, "maxDate", null);
    __decorate([core_3.Input(), __metadata('design:type', Function)], DateRangePicker.prototype, "dateFilter", void 0);
    __decorate([core_2.ViewChild(infiniteScroller_1.InfiniteScroller), __metadata('design:type', infiniteScroller_1.InfiniteScroller)], DateRangePicker.prototype, "calendarScroller", void 0);
    __decorate([core_2.ContentChild(StartDateField), __metadata('design:type', StartDateField)], DateRangePicker.prototype, "startDateField", void 0);
    __decorate([core_2.ContentChild(EndDateField), __metadata('design:type', EndDateField)], DateRangePicker.prototype, "endDateField", void 0);
    __decorate([core_2.ContentChildren(datePickerField_1.DatePickerFieldStyler), __metadata('design:type', core_2.QueryList)], DateRangePicker.prototype, "dateFieldIcons", void 0);
    __decorate([core_3.Output(), __metadata('design:type', Object)], DateRangePicker.prototype, "startDateChange", void 0);
    __decorate([core_3.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DateRangePicker.prototype, "startDate", null);
    __decorate([core_3.Output(), __metadata('design:type', Object)], DateRangePicker.prototype, "endDateChange", void 0);
    __decorate([core_3.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], DateRangePicker.prototype, "endDate", null);
    DateRangePicker = __decorate([core_1.Component({
      selector: "date-range-picker",
      template: "\n      <div class=\"date-picker-overlay\" aria-hidden=\"true\"\n          *ngIf=\"calendarDisplayed\" \n          (click)=\"hideCalendar()\">\n      </div>\n\n      <div class=\"date-picker-content\">\n          <ng-content></ng-content>\n\n          <div class=\"date-picker-component\" *ngIf=\"calendarDisplayed\"\n              [style.left]=\"calendarX\" [style.top]=\"calendarY\">\n              <div class=\"container p-a-0\">\n                  <header>\n                      <button type=\"button\" class=\"btn btn-secondary pull-left\"\n                          (click)=\"scrollPrevMonth()\" [class.button-disable]=\"disablePrev()\">\n                          <i class=\"fa fa-chevron-left\"></i>\n                      </button>\n                      <div class=\"date-range pull-left input-group\">\n                          <input type=\"text\" class=\"form-control text-xs-center\" \n                              [class.target]=\"checkStartDateTarget()\"\n                              (click)=\"focusStartDate()\"\n                              id=\"startDate\" [(ngModel)]=\"inputStartDate\" readonly \n                              placeholder=\"{{startLabel}}\" />\n                          <span class=\"input-group-addon\"> - </span>\n                          <input type=\"text\" class=\"form-control text-xs-center\" \n                              [class.target]=\"checkEndDateTarget()\"\n                              (click)=\"focusEndDate()\"\n                              id=\"endDate\" [(ngModel)]=\"inputEndDate\" readonly \n                              placeholder=\"{{endLabel}}\" />\n                      </div>\n                      <button type=\"button\" class=\"btn btn-secondary pull-right\"\n                          (click)=\"scrollNextMonth()\" [class.button-disable]=\"disableNext()\">\n                          <i class=\"fa fa-chevron-right\"></i>\n                      </button>\n                      <table class=\"table m-b-0 days-of-week\">\n                          <tbody>\n                          <tr>\n                              <th>S</th>\n                              <th>M</th>\n                              <th>T</th>\n                              <th>W</th>\n                              <th>T</th>\n                              <th>F</th>\n                              <th>S</th>\n                          </tr>\n                          </tbody>\n                      </table>\n                  </header>\n                  <div class=\"calendar-container m-a-0\">\n                      <infinite-scroller\n                          (next)=\"addNextMonth()\"\n                          (prev)=\"addPrevMonth()\"\n                          distance=\"100\"\n                          height=\"{{calendarHeight}}\"\n                          hideScrollbar=\"true\">\n                          <date-picker-calendar scroll-item\n                              *ngFor=\"let month of calendarMonths; let i=index\" \n                              [id]=\"i\"\n                              [minDate]=\"minDate\" [maxDate]=\"maxDate\"\n                              [dateFilter]=\"dateFilter\"\n                              [currentMonth]=\"month\" \n                              [(selectedDate)]=\"selectedDate\"\n                              [(startDate)]=\"startDate\"\n                              [(endDate)]=\"endDate\"\n                              [dateTarget]=\"_dateTarget\" \n                              (selectedDate)=\"hideCalendar()\">\n                              {{i}}\n                          </date-picker-calendar>\n                      </infinite-scroller>\n                  </div>\n              </div>\n          </div>\n    \n      </div>\n    ",
      changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }), __metadata('design:paramtypes', [core_1.ChangeDetectorRef, core_1.Renderer])], DateRangePicker);
    return DateRangePicker;
  }(datePicker_1.DatePicker));
  exports.DateRangePicker = DateRangePicker;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/datePicker/datePicker.module", ["@angular/core", "@angular/common", "@angular/forms", "../infiniteScroller/infiniteScroller", "./datePickerCalendar", "./datePicker", "./datePickerField", "./dateRangePicker"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var infiniteScroller_1 = $__require('../infiniteScroller/infiniteScroller');
  var datePickerCalendar_1 = $__require('./datePickerCalendar');
  exports.DatePickerCalendar = datePickerCalendar_1.DatePickerCalendar;
  var datePicker_1 = $__require('./datePicker');
  exports.DatePicker = datePicker_1.DatePicker;
  var datePickerField_1 = $__require('./datePickerField');
  exports.DatePickerField = datePickerField_1.DatePickerField;
  exports.DatePickerFieldStyler = datePickerField_1.DatePickerFieldStyler;
  var dateRangePicker_1 = $__require('./dateRangePicker');
  exports.DateRangePicker = dateRangePicker_1.DateRangePicker;
  exports.StartDateField = dateRangePicker_1.StartDateField;
  exports.EndDateField = dateRangePicker_1.EndDateField;
  var datePickerCalendar_2 = $__require('./datePickerCalendar');
  var datePicker_2 = $__require('./datePicker');
  var datePickerField_2 = $__require('./datePickerField');
  var dateRangePicker_2 = $__require('./dateRangePicker');
  var datePickerDirectives = [datePicker_2.DatePicker, datePickerCalendar_2.DatePickerCalendar, datePickerField_2.DatePickerField, datePickerField_2.DatePickerFieldStyler, dateRangePicker_2.DateRangePicker, dateRangePicker_2.StartDateField, dateRangePicker_2.EndDateField];
  var FuiDatePickerModule = (function() {
    function FuiDatePickerModule() {}
    FuiDatePickerModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule, forms_1.FormsModule, infiniteScroller_1.FuiInfiniteScrollerModule],
      declarations: datePickerDirectives,
      exports: datePickerDirectives
    }), __metadata('design:paramtypes', [])], FuiDatePickerModule);
    return FuiDatePickerModule;
  }());
  exports.FuiDatePickerModule = FuiDatePickerModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/modal/modal", ["@angular/core", "@angular/common", "../../directives/animation/animation"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var animation_1 = $__require('../../directives/animation/animation');
  var Modal = (function() {
    function Modal(el) {
      this.displayed = false;
      this.closeOnUnfocus = true;
      this.closeButton = true;
      this.modalTitle = '';
      this.size = '';
      this.close = new core_1.EventEmitter();
      this.open = new core_1.EventEmitter();
      this._el = el.nativeElement;
    }
    Modal.prototype.clickElement = function(e) {
      if (this.closeOnUnfocus) {
        if ((e.target && (e.target.className == 'modal customFadeIn' || e.target.className == 'modal-dialog')) || (e.srcElement && (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')))
          this.closeModal();
      }
    };
    Modal.prototype.getElement = function() {
      return this._el;
    };
    Modal.prototype.closeModal = function() {
      this.showModal(false);
      this.close.next(null);
      return false;
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
        this.open.next(null);
      } else {
        body.classList.remove('modal-open');
        if (this.closeOnUnfocus) {
          this._el.childNodes[0].removeEventListener('click', function(e) {
            if ((e.target && (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')) || (e.srcElement && (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')))
              _this.showModal(false);
          });
        }
      }
      return false;
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Modal.prototype, "closeOnUnfocus", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Modal.prototype, "closeButton", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Modal.prototype, "modalTitle", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Modal.prototype, "size", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Modal.prototype, "close", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Modal.prototype, "open", void 0);
    Modal = __decorate([core_1.Component({
      selector: 'modal',
      host: {'(click)': 'clickElement($event)'},
      template: "\n   <div class=\"modal\" [ngClass]=\"{'fuel-ui-modal-fade-in': displayed}\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" [style.display]=\"displayed ? 'block' : 'none'\">\n       <div class=\"modal-dialog\" role=\"document\" [ngClass]=\"{'modal-lg': size == 'large' || size == 'lg', 'modal-sm': size == 'small' || size == 'sm'}\">\n           <div class=\"modal-content\">\n               <div class=\"modal-header\">\n                   <button *ngIf=\"closeButton\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"closeModal()\">\n                       <span aria-hidden=\"true\">&#215;</span>\n                       <span class=\"sr-only\">Close</span>\n                   </button>\n                   <h4 class=\"modal-title\" id=\"myModalLabel\">{{modalTitle}}</h4>\n               </div>\n               <ng-content></ng-content>\n           </div>\n       </div>\n   </div>\n   <div class=\"modal-backdrop\" [ngClass]=\"{fade: displayed, in: displayed}\" [style.display]=\"displayed ? 'block' : 'none'\"></div>\n    "
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Modal);
    return Modal;
  }());
  exports.Modal = Modal;
  var FuiModalModule = (function() {
    function FuiModalModule() {}
    FuiModalModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule, animation_1.FuiAnimationModule],
      declarations: [Modal],
      exports: [Modal]
    }), __metadata('design:paramtypes', [])], FuiModalModule);
    return FuiModalModule;
  }());
  exports.FuiModalModule = FuiModalModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/pagination/pagination", ["@angular/core", "@angular/common", "../../pipes/range/range"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var range_1 = $__require('../../pipes/range/range');
  var Pagination = (function() {
    function Pagination() {
      this.currentPage = 1;
      this.pagesAtOnce = 5;
      this.totalPages = 10;
      this.showSteps = true;
      this.showEnds = true;
      this.showSelect = true;
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
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Pagination.prototype, "showSteps", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Pagination.prototype, "showEnds", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Pagination.prototype, "showSelect", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], Pagination.prototype, "currentPageChange", void 0);
    Pagination = __decorate([core_1.Component({
      selector: 'pagination',
      changeDetection: core_1.ChangeDetectionStrategy.OnPush,
      properties: ["totalPages: total-pages", "pagesAtOnce: pages-at-once"],
      template: "\n      <nav class=\"fuel-ui-pagination\">\n          <ul class=\"pagination\">\n              <li *ngIf=\"showEnds\" class=\"page-item\" [class.disabled]=\"currentPage == 1\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == 1\" (click)=\"setPage(1)\" aria-label=\"First\">\n                      <span aria-hidden=\"true\">First</span>\n                      <span class=\"sr-only\">First</span>\n                  </a>\n              </li>\n              <li *ngIf=\"showSteps\" class=\"page-item\" [class.disabled]=\"currentPage == 1\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == 1\" (click)=\"setPage(currentPage - 1)\" aria-label=\"Previous\">\n                      <span aria-hidden=\"true\">&#171;</span>\n                      <span class=\"sr-only\">Previous</span>\n                  </a>\n              </li>\n              <li *ngFor=\"let page of pagesBlank | range : 1 : totalPages | slice: startingIndex : endingIndex\" class=\"page-item\" [class.active]=\"currentPage == page\">\n                  <a class=\"page-link\" (click)=\"setPage(page)\">{{page}}</a>\n              </li>\n              <li *ngIf=\"showSteps\" class=\"page-item\" [class.disabled]=\"currentPage == totalPages\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == totalPages\" (click)=\"setPage(currentPage + 1)\" aria-label=\"Next\">\n                      <span aria-hidden=\"true\">&#187;</span>\n                      <span class=\"sr-only\">Next</span>\n                  </a>\n              </li>\n              <li *ngIf=\"showEnds\" class=\"page-item\" [class.disabled]=\"currentPage == totalPages\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == totalPages\" (click)=\"setPage(totalPages)\" aria-label=\"Last\">\n                      <span aria-hidden=\"true\">Last</span>\n                      <span class=\"sr-only\">Last</span>\n                  </a>\n              </li>\n          </ul>\n      </nav>\n\n      <div class=\"input-group col-md-3\" *ngIf=\"showSelect\">\n          <span class=\"input-group-addon\">Jump to:</span>\n          <select class=\"c-select\" (change)=\"setPage($event.target.value)\">\n              <option *ngFor=\"let page of pagesBlank | range : 1 : totalPages\" [value]=\"page\" [selected]=\"page == currentPage\">{{page}}</option>\n          </select>\n      </div>\n    "
    }), __metadata('design:paramtypes', [])], Pagination);
    return Pagination;
  }());
  exports.Pagination = Pagination;
  var FuiPaginationModule = (function() {
    function FuiPaginationModule() {}
    FuiPaginationModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule, range_1.FuiRangePipeModule],
      declarations: [Pagination],
      exports: [Pagination]
    }), __metadata('design:paramtypes', [])], FuiPaginationModule);
    return FuiPaginationModule;
  }());
  exports.FuiPaginationModule = FuiPaginationModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/infiniteScroller/infiniteScroller", ["@angular/core", "../../utilities/utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var utilities_1 = $__require('../../utilities/utilities');
  var ScrollItem = (function() {
    function ScrollItem(element) {
      this.element = element.nativeElement;
    }
    Object.defineProperty(ScrollItem.prototype, "height", {
      get: function() {
        return utilities_1.ElementUtils.outerHeight(this.element);
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
      this.container = this.container.querySelector(".scroll-container");
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
      var itemBottom = itemTop + utilities_1.ElementUtils.outerHeight(item.element);
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
    InfiniteScroller.prototype.scrollTo = function(position, animate) {
      if (animate === void 0) {
        animate = true;
      }
      if (animate)
        utilities_1.ElementUtils.scrollTo(this.container, position, 400);
      else
        this.container.scrollTop = position;
    };
    InfiniteScroller.prototype.scrollToIndex = function(index, animate) {
      if (animate === void 0) {
        animate = true;
      }
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
      this.scrollTo(targetPos, animate);
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
      template: "\n        <div class=\"scroll-outer\" [class.hide-scrollbar]=\"hideScrollbar\">\n            <div class=\"scroll-container\"\n                (scroll)=\"doscroll($event)\"\n                [style.height]=\"height\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
      styles: ["\n        .scroll-container {\n            overflow-y: scroll;\n            overflow-x: hidden;\n            max-height: 100%;\n        }\n\n        .scroll-outer.hide-scrollbar .scroll-container {\n            margin-right: -16px;\n        }\n\n        .scroll-content {\n            overflow: auto;\n        }\n    "]
    }), __metadata('design:paramtypes', [core_1.ElementRef])], InfiniteScroller);
    return InfiniteScroller;
  }());
  exports.InfiniteScroller = InfiniteScroller;
  var infiniteScrollerDirectives = [InfiniteScroller, ScrollItem];
  var FuiInfiniteScrollerModule = (function() {
    function FuiInfiniteScrollerModule() {}
    FuiInfiniteScrollerModule = __decorate([core_1.NgModule({
      imports: [],
      declarations: infiniteScrollerDirectives,
      exports: infiniteScrollerDirectives
    }), __metadata('design:paramtypes', [])], FuiInfiniteScrollerModule);
    return FuiInfiniteScrollerModule;
  }());
  exports.FuiInfiniteScrollerModule = FuiInfiniteScrollerModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/dropdown/dropdown", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
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
  var FuiDropdownModule = (function() {
    function FuiDropdownModule() {}
    FuiDropdownModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: [Dropdown],
      exports: [Dropdown]
    }), __metadata('design:paramtypes', [])], FuiDropdownModule);
    return FuiDropdownModule;
  }());
  exports.FuiDropdownModule = FuiDropdownModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/tab/TabSet", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
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
      this.destroyed = true;
    };
    TabSet.prototype.addTab = function(tab) {
      this.tabs.push(tab);
      tab.active = this.tabs.length === 1 && tab.active !== false;
    };
    TabSet.prototype.removeTab = function(tab) {
      var index = this.tabs.indexOf(tab);
      if (index === -1 || this.destroyed) {
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
      template: "\n      <ul class=\"nav\" [ngClass]=\"classMap\" (click)=\"$event.preventDefault()\">\n          <li *ngFor=\"let tab of tabs\" class=\"nav-item\"\n              [class.active]=\"tab.active\" [class.disabled]=\"tab.disabled\">\n              <a href class=\"nav-link\" [class.active]=\"tab.active\" \n                  [class.disabled]=\"tab.disabled\" (click)=\"tab.active = true\">\n                  <span [innerHtml]=\"tab.heading\"></span>\n                  <span *ngIf=\"tab.removable\" (click)=\"$event.preventDefault(); removeTab(tab);\">\n                      <i class=\"fa fa-remove\"></i>\n                  </span>\n              </a>\n          </li>\n      </ul>\n      <div class=\"tab-content\">\n          <ng-content></ng-content>\n      </div>\n    "
    }), __metadata('design:paramtypes', [])], TabSet);
    return TabSet;
  }());
  exports.TabSet = TabSet;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/tab/tab", ["@angular/core", "@angular/common", "./TabSet"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
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
  var tabComponents = [Tab, TabSet_1.TabSet];
  var FuiTabModule = (function() {
    function FuiTabModule() {}
    FuiTabModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: tabComponents,
      exports: tabComponents
    }), __metadata('design:paramtypes', [])], FuiTabModule);
    return FuiTabModule;
  }());
  exports.FuiTabModule = FuiTabModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/tag/TagSet", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var TagSet = (function() {
    function TagSet() {
      this.tags = [];
    }
    TagSet.prototype.ngOnDestroy = function() {
      this.destroyed = true;
    };
    TagSet.prototype.addTag = function(tag) {
      this.tags.push(tag);
    };
    TagSet.prototype.removeTag = function(tag) {
      var index = this.tags.indexOf(tag);
      if (index === -1 || this.destroyed || tag.disabled) {
        return;
      }
      tag.remove.next(tag);
      this.tags.splice(index, 1);
    };
    __decorate([core_1.Input(), __metadata('design:type', Array)], TagSet.prototype, "tags", void 0);
    TagSet = __decorate([core_1.Component({
      selector: 'tagset',
      directives: [common_1.NgClass],
      template: "\n      <span *ngFor=\"let tag of tags\" class=\"label fuel-ui-tag-label\" [ngClass]=\"tag.classMap\">\n          <span [innerHtml]=\"tag.title\"></span>\n          <span class=\"fuel-ui-clickable\" [class.disabled]=\"tag.disabled\" *ngIf=\"tag.removable\" (click)=\"$event.preventDefault(); removeTag(tag);\">\n              <i class=\"fa fa-remove\"></i>\n          </span>\n      </span>\n    "
    }), __metadata('design:paramtypes', [])], TagSet);
    return TagSet;
  }());
  exports.TagSet = TagSet;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/tag/tag", ["@angular/core", "@angular/common", "./TagSet"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
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
      this.remove.next(this);
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
  var tagDirectives = [Tag, TagSet_1.TagSet];
  var FuiTagModule = (function() {
    function FuiTagModule() {}
    FuiTagModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: tagDirectives,
      exports: tagDirectives
    }), __metadata('design:paramtypes', [])], FuiTagModule);
    return FuiTagModule;
  }());
  exports.FuiTagModule = FuiTagModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/tableSortable/tableSortableSorting", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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

System.registerDynamic("fuel-ui/lib/components/tableSortable/TableSortableColumn", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
  var TableSortableColumn = (function() {
    function TableSortableColumn(display, variable, filter, sortable) {
      this.sortable = true;
      this.display = display;
      this.variable = variable;
      this.filter = filter;
      this.sortable = sortable != null ? sortable : true;
    }
    return TableSortableColumn;
  }());
  exports.TableSortableColumn = TableSortableColumn;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/tableSortable/TableSortableSorting", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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

System.registerDynamic("fuel-ui/lib/components/tableSortable/tableSortable", ["@angular/core", "@angular/common", "@angular/forms", "../../pipes/orderBy/orderBy", "../../pipes/format/format", "./tableSortableSorting", "./TableSortableColumn", "./TableSortableSorting"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var orderBy_1 = $__require('../../pipes/orderBy/orderBy');
  var format_1 = $__require('../../pipes/format/format');
  var tableSortableSorting_1 = $__require('./tableSortableSorting');
  var TableSortable = (function() {
    function TableSortable() {}
    TableSortable.prototype.selectedClass = function(column) {
      if (!column.sortable)
        return 'fuel-ui-not-sortable';
      return column.variable == this.sort.column ? 'sort-' + (this.sort.descending ? 'desc' : 'asc') : '';
    };
    TableSortable.prototype.changeSorting = function(column) {
      if (!column.sortable)
        return;
      var sort = this.sort;
      if (sort.column == column.variable) {
        sort.descending = !sort.descending;
      } else {
        sort.column = column.variable;
        sort.descending = false;
      }
    };
    TableSortable.prototype.convertSorting = function() {
      return this.sort.descending ? '-' + this.sort.column : this.sort.column;
    };
    __decorate([core_1.Input(), __metadata('design:type', Array)], TableSortable.prototype, "columns", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array)], TableSortable.prototype, "data", void 0);
    __decorate([core_1.Input(), __metadata('design:type', tableSortableSorting_1.TableSortableSorting)], TableSortable.prototype, "sort", void 0);
    TableSortable = __decorate([core_1.Component({
      selector: 'table-sortable',
      template: "\n    <div class=\"table-responsive\">\n      <table class=\"table table-bordered table-hover table-striped fuel-ui-table-sortable\">\n        <thead>\n          <tr>\n            <th *ngFor=\"let column of columns\" [class]=\"selectedClass(column)\" (click)=\"changeSorting(column)\">\n              {{column.display}}\n            </th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let object of data | orderBy : convertSorting()\">\n            <td *ngFor=\"let column of columns\" [innerHtml]=\"object[column.variable] | format : column.filter\"></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  ",
      pipes: [common_1.JsonPipe]
    }), __metadata('design:paramtypes', [])], TableSortable);
    return TableSortable;
  }());
  exports.TableSortable = TableSortable;
  var TableSortableColumn_1 = $__require('./TableSortableColumn');
  exports.TableSortableColumn = TableSortableColumn_1.TableSortableColumn;
  var TableSortableSorting_1 = $__require('./TableSortableSorting');
  exports.TableSortableSorting = TableSortableSorting_1.TableSortableSorting;
  var FuiTableSortableModule = (function() {
    function FuiTableSortableModule() {}
    FuiTableSortableModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule, forms_1.FormsModule, format_1.FuiFormatPipeModule, orderBy_1.FuiOrderByPipeModule],
      declarations: [TableSortable],
      exports: [TableSortable]
    }), __metadata('design:paramtypes', [])], FuiTableSortableModule);
    return FuiTableSortableModule;
  }());
  exports.FuiTableSortableModule = FuiTableSortableModule;
  return module.exports;
});

System.registerDynamic('fuel-ui/lib/components/slider/NoUiSlider', [], false, function ($__require, $__exports, $__module) {
	var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

	(function ($__global) {
		/*! nouislider - 8.3.0 - 2016-02-14 17:37:19 */

		(function (factory) {
			// Browser globals
			window.noUiSlider = factory();
		})(function () {

			'use strict';

			// Removes duplicates from an array.

			function unique(array) {
				return array.filter(function (a) {
					return !this[a] ? this[a] = true : false;
				}, {});
			}

			// Round a value to the closest 'to'.
			function closest(value, to) {
				return Math.round(value / to) * to;
			}

			// Current position of an element relative to the document.
			function offset(elem) {

				var rect = elem.getBoundingClientRect(),
				    doc = elem.ownerDocument,
				    docElem = doc.documentElement,
				    pageOffset = getPageOffset();

				// getBoundingClientRect contains left scroll in Chrome on Android.
				// I haven't found a feature detection that proves this. Worst case
				// scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
				if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
					pageOffset.x = 0;
				}

				return {
					top: rect.top + pageOffset.y - docElem.clientTop,
					left: rect.left + pageOffset.x - docElem.clientLeft
				};
			}

			// Checks whether a value is numerical.
			function isNumeric(a) {
				return typeof a === 'number' && !isNaN(a) && isFinite(a);
			}

			// Rounds a number to 7 supported decimals.
			function accurateNumber(number) {
				var p = Math.pow(10, 7);
				return Number((Math.round(number * p) / p).toFixed(7));
			}

			// Sets a class and removes it after [duration] ms.
			function addClassFor(element, className, duration) {
				addClass(element, className);
				setTimeout(function () {
					removeClass(element, className);
				}, duration);
			}

			// Limits a value to 0 - 100
			function limit(a) {
				return Math.max(Math.min(a, 100), 0);
			}

			// Wraps a variable as an array, if it isn't one yet.
			function asArray(a) {
				return Array.isArray(a) ? a : [a];
			}

			// Counts decimals
			function countDecimals(numStr) {
				var pieces = numStr.split(".");
				return pieces.length > 1 ? pieces[1].length : 0;
			}

			// http://youmightnotneedjquery.com/#add_class
			function addClass(el, className) {
				if (!el) return;

				if (el.classList) {
					el.classList.add(className);
				} else {
					el.className += ' ' + className;
				}
			}

			// http://youmightnotneedjquery.com/#remove_class
			function removeClass(el, className) {
				if (el.classList) {
					el.classList.remove(className);
				} else {
					el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
				}
			}

			// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
			function hasClass(el, className) {
				return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
			}

			// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
			function getPageOffset() {

				var supportPageOffset = window.pageXOffset !== undefined,
				    isCSS1Compat = (document.compatMode || "") === "CSS1Compat",
				    x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
				    y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

				return {
					x: x,
					y: y
				};
			}

			// Shorthand for stopPropagation so we don't have to create a dynamic method
			function stopPropagation(e) {
				e.stopPropagation();
			}

			// todo
			function addCssPrefix(cssPrefix) {
				return function (className) {
					return cssPrefix + className;
				};
			}

			var
			// Determine the events to bind. IE11 implements pointerEvents without
			// a prefix, which breaks compatibility with the IE10 implementation.
			/** @const */
			actions = window.navigator.pointerEnabled ? {
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

			// Value calculation

			// Determine the size of a sub-range in relation to a full range.
			function subRangeRatio(pa, pb) {
				return 100 / (pb - pa);
			}

			// (percentage) How many percent is this value of this range?
			function fromPercentage(range, value) {
				return value * 100 / (range[1] - range[0]);
			}

			// (percentage) Where is this value on this range?
			function toPercentage(range, value) {
				return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0]);
			}

			// (value) How much is this percentage on this range?
			function isPercentage(range, value) {
				return value * (range[1] - range[0]) / 100 + range[0];
			}

			// Range conversion

			function getJ(value, arr) {

				var j = 1;

				while (value >= arr[j]) {
					j += 1;
				}

				return j;
			}

			// (percentage) Input a value, find where, on a scale of 0-100, it applies.
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

				return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
			}

			// (value) Input a percentage, find where it is on the specified range.
			function fromStepping(xVal, xPct, value) {

				// There is no range group that fits 100
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

			// (percentage) Get the step that applies at a certain value.
			function getStep(xPct, xSteps, snap, value) {

				if (value === 100) {
					return value;
				}

				var j = getJ(value, xPct),
				    a,
				    b;

				// If 'snap' is set, steps are used as fixed points on the slider.
				if (snap) {

					a = xPct[j - 1];
					b = xPct[j];

					// Find the closest position, a or b.
					if (value - a > (b - a) / 2) {
						return b;
					}

					return a;
				}

				if (!xSteps[j - 1]) {
					return value;
				}

				return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
			}

			// Entry parsing

			function handleEntryPoint(index, value, that) {

				var percentage;

				// Wrap numerical input in an array.
				if (typeof value === "number") {
					value = [value];
				}

				// Reject any invalid input, by testing whether value is an array.
				if (Object.prototype.toString.call(value) !== '[object Array]') {
					throw new Error("noUiSlider: 'range' contains invalid value.");
				}

				// Covert min/max syntax to 0 and 100.
				if (index === 'min') {
					percentage = 0;
				} else if (index === 'max') {
					percentage = 100;
				} else {
					percentage = parseFloat(index);
				}

				// Check for correct input.
				if (!isNumeric(percentage) || !isNumeric(value[0])) {
					throw new Error("noUiSlider: 'range' value isn't numeric.");
				}

				// Store values.
				that.xPct.push(percentage);
				that.xVal.push(value[0]);

				// NaN will evaluate to false too, but to keep
				// logging clear, set step explicitly. Make sure
				// not to override the 'step' setting with false.
				if (!percentage) {
					if (!isNaN(value[1])) {
						that.xSteps[0] = value[1];
					}
				} else {
					that.xSteps.push(isNaN(value[1]) ? false : value[1]);
				}
			}

			function handleStepPoint(i, n, that) {

				// Ignore 'false' stepping.
				if (!n) {
					return true;
				}

				// Factor to range ratio
				that.xSteps[i] = fromPercentage([that.xVal[i], that.xVal[i + 1]], n) / subRangeRatio(that.xPct[i], that.xPct[i + 1]);
			}

			// Interface

			// The interface to Spectrum handles all direction-based
			// conversions, so the above values are unaware.

			function Spectrum(entry, snap, direction, singleStep) {

				this.xPct = [];
				this.xVal = [];
				this.xSteps = [singleStep || false];
				this.xNumSteps = [false];

				this.snap = snap;
				this.direction = direction;

				var index,
				    ordered = [/* [0, 'min'], [1, '50%'], [2, 'max'] */];

				// Map the object keys to an array.
				for (index in entry) {
					if (entry.hasOwnProperty(index)) {
						ordered.push([entry[index], index]);
					}
				}

				// Sort all entries by value (numeric sort).
				if (ordered.length && typeof ordered[0][0] === "object") {
					ordered.sort(function (a, b) {
						return a[0][0] - b[0][0];
					});
				} else {
					ordered.sort(function (a, b) {
						return a[0] - b[0];
					});
				}

				// Convert all entries to subranges.
				for (index = 0; index < ordered.length; index++) {
					handleEntryPoint(ordered[index][1], ordered[index][0], this);
				}

				// Store the actual step values.
				// xSteps is sorted in the same order as xPct and xVal.
				this.xNumSteps = this.xSteps.slice(0);

				// Convert all numeric steps to the percentage of the subrange they represent.
				for (index = 0; index < this.xNumSteps.length; index++) {
					handleStepPoint(index, this.xNumSteps[index], this);
				}
			}

			Spectrum.prototype.getMargin = function (value) {
				return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
			};

			Spectrum.prototype.toStepping = function (value) {

				value = toStepping(this.xVal, this.xPct, value);

				// Invert the value if this is a right-to-left slider.
				if (this.direction) {
					value = 100 - value;
				}

				return value;
			};

			Spectrum.prototype.fromStepping = function (value) {

				// Invert the value if this is a right-to-left slider.
				if (this.direction) {
					value = 100 - value;
				}

				return accurateNumber(fromStepping(this.xVal, this.xPct, value));
			};

			Spectrum.prototype.getStep = function (value) {

				// Find the proper step for rtl sliders by search in inverse direction.
				// Fixes issue #262.
				if (this.direction) {
					value = 100 - value;
				}

				value = getStep(this.xPct, this.xSteps, this.snap, value);

				if (this.direction) {
					value = 100 - value;
				}

				return value;
			};

			Spectrum.prototype.getApplicableStep = function (value) {

				// If the value is 100%, return the negative step twice.
				var j = getJ(value, this.xPct),
				    offset = value === 100 ? 2 : 1;
				return [this.xNumSteps[j - 2], this.xVal[j - offset], this.xNumSteps[j - offset]];
			};

			// Outside testing
			Spectrum.prototype.convert = function (value) {
				return this.getStep(this.toStepping(value));
			};

			/*	Every input option is tested and parsed. This'll prevent
   	endless validation in internal methods. These tests are
   	structured with an item for every option available. An
   	option can be marked as required by setting the 'r' flag.
   	The testing function is provided with three arguments:
   		- The provided value for the option;
   		- A reference to the options object;
   		- The name for the option;
   
   	The testing function returns false when an error is detected,
   	or true when everything is OK. It can also modify the option
   	object, to make sure all values can be correctly looped elsewhere. */

			var defaultFormatter = { 'to': function (value) {
					return value !== undefined && value.toFixed(2);
				}, 'from': Number };

			function testStep(parsed, entry) {

				if (!isNumeric(entry)) {
					throw new Error("noUiSlider: 'step' is not numeric.");
				}

				// The step option can still be used to set stepping
				// for linear sliders. Overwritten if set in 'range'.
				parsed.singleStep = entry;
			}

			function testRange(parsed, entry) {

				// Filter incorrect input.
				if (typeof entry !== 'object' || Array.isArray(entry)) {
					throw new Error("noUiSlider: 'range' is not an object.");
				}

				// Catch missing start or end.
				if (entry.min === undefined || entry.max === undefined) {
					throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
				}

				// Catch equal start or end.
				if (entry.min === entry.max) {
					throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
				}

				parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed.singleStep);
			}

			function testStart(parsed, entry) {

				entry = asArray(entry);

				// Validate input. Values aren't tested, as the public .val method
				// will always provide a valid location.
				if (!Array.isArray(entry) || !entry.length || entry.length > 2) {
					throw new Error("noUiSlider: 'start' option is incorrect.");
				}

				// Store the number of handles.
				parsed.handles = entry.length;

				// When the slider is initialized, the .val method will
				// be called with the start options.
				parsed.start = entry;
			}

			function testSnap(parsed, entry) {

				// Enforce 100% stepping within subranges.
				parsed.snap = entry;

				if (typeof entry !== 'boolean') {
					throw new Error("noUiSlider: 'snap' option must be a boolean.");
				}
			}

			function testAnimate(parsed, entry) {

				// Enforce 100% stepping within subranges.
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

				// Set orientation to an a numerical value for easy
				// array selection.
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

				// Issue #582
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

				// Set direction as a numerical value for easy parsing.
				// Invert connection for RTL sliders, so that the proper
				// handles get the connect/background classes.
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

				// Make sure the input is a string.
				if (typeof entry !== 'string') {
					throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
				}

				// Check if the string contains any keywords.
				// None are required.
				var tap = entry.indexOf('tap') >= 0,
				    drag = entry.indexOf('drag') >= 0,
				    fixed = entry.indexOf('fixed') >= 0,
				    snap = entry.indexOf('snap') >= 0,
				    hover = entry.indexOf('hover') >= 0;

				// Fix #472
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

					parsed.tooltips.forEach(function (formatter) {
						if (typeof formatter !== 'boolean' && (typeof formatter !== 'object' || typeof formatter.to !== 'function')) {
							throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
						}
					});
				}
			}

			function testFormat(parsed, entry) {

				parsed.format = entry;

				// Any object with a to and from method is supported.
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

			// Test all developer settings and parse to assumption-safe values.
			function testOptions(options) {

				// To prove a fix for #537, freeze options here.
				// If the object is modified, an error will be thrown.
				// Object.freeze(options);

				var parsed = {
					margin: 0,
					limit: 0,
					animate: true,
					format: defaultFormatter
				},
				    tests;

				// Tests are executed in the order they are presented here.
				tests = {
					'step': { r: false, t: testStep },
					'start': { r: true, t: testStart },
					'connect': { r: true, t: testConnect },
					'direction': { r: true, t: testDirection },
					'snap': { r: false, t: testSnap },
					'animate': { r: false, t: testAnimate },
					'range': { r: true, t: testRange },
					'orientation': { r: false, t: testOrientation },
					'margin': { r: false, t: testMargin },
					'limit': { r: false, t: testLimit },
					'behaviour': { r: true, t: testBehaviour },
					'format': { r: false, t: testFormat },
					'tooltips': { r: false, t: testTooltips },
					'cssPrefix': { r: false, t: testCssPrefix }
				};

				var defaults = {
					'connect': false,
					'direction': 'ltr',
					'behaviour': 'tap',
					'orientation': 'horizontal'
				};

				// Run all options through a testing mechanism to ensure correct
				// input. It should be noted that options might get modified to
				// be handled properly. E.g. wrapping integers in arrays.
				Object.keys(tests).forEach(function (name) {

					// If the option isn't set, but it is required, throw an error.
					if (options[name] === undefined && defaults[name] === undefined) {

						if (tests[name].r) {
							throw new Error("noUiSlider: '" + name + "' is required.");
						}

						return true;
					}

					tests[name].t(parsed, options[name] === undefined ? defaults[name] : options[name]);
				});

				// Forward pips options
				parsed.pips = options.pips;

				// Pre-define the styles.
				parsed.style = parsed.ort ? 'top' : 'left';

				return parsed;
			}

			function closure(target, options) {

				// All variables local to 'closure' are prefixed with 'scope_'
				var scope_Target = target,
				    scope_Locations = [-1, -1],
				    scope_Base,
				    scope_Handles,
				    scope_Spectrum = options.spectrum,
				    scope_Values = [],
				    scope_Events = {},
				    scope_Self;

				var cssClasses = [
				/*  0 */'target'
				/*  1 */, 'base'
				/*  2 */, 'origin'
				/*  3 */, 'handle'
				/*  4 */, 'horizontal'
				/*  5 */, 'vertical'
				/*  6 */, 'background'
				/*  7 */, 'connect'
				/*  8 */, 'ltr'
				/*  9 */, 'rtl'
				/* 10 */, 'draggable'
				/* 11 */, ''
				/* 12 */, 'state-drag'
				/* 13 */, ''
				/* 14 */, 'state-tap'
				/* 15 */, 'active'
				/* 16 */, ''
				/* 17 */, 'stacking'
				/* 18 */, 'tooltip'
				/* 19 */, ''
				/* 20 */, 'pips'
				/* 21 */, 'marker'
				/* 22 */, 'value'].map(addCssPrefix(options.cssPrefix || defaultCssPrefix));

				// Delimit proposed values for handle positions.
				function getPositions(a, b, delimit) {

					// Add movement to current position.
					var c = a + b[0],
					    d = a + b[1];

					// Only alter the other position on drag,
					// not on standard sliding.
					if (delimit) {
						if (c < 0) {
							d += Math.abs(c);
						}
						if (d > 100) {
							c -= d - 100;
						}

						// Limit values to 0 and 100.
						return [limit(c), limit(d)];
					}

					return [c, d];
				}

				// Provide a clean event with standardized offset values.
				function fixEvent(e, pageOffset) {

					// Prevent scrolling and panning on touch events, while
					// attempting to slide. The tap event also depends on this.
					e.preventDefault();

					// Filter the event to register the type, which can be
					// touch, mouse or pointer. Offset changes need to be
					// made on an event specific basis.
					var touch = e.type.indexOf('touch') === 0,
					    mouse = e.type.indexOf('mouse') === 0,
					    pointer = e.type.indexOf('pointer') === 0,
					    x,
					    y,
					    event = e;

					// IE10 implemented pointer events with a prefix;
					if (e.type.indexOf('MSPointer') === 0) {
						pointer = true;
					}

					if (touch) {
						// noUiSlider supports one movement at a time,
						// so we can select the first 'changedTouch'.
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
					event.cursor = mouse || pointer; // Fix #435

					return event;
				}

				// Append a handle to the base.
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

				// Add the proper connection classes.
				function addConnection(connect, target, handles) {

					// Apply the required connection classes to the elements
					// that need them. Some classes are made up for several
					// segments listed in the class list, to allow easy
					// renaming and provide a minor compression benefit.
					switch (connect) {
						case 1:
							addClass(target, cssClasses[7]);
							addClass(handles[0], cssClasses[6]);
							break;
						case 3:
							addClass(handles[1], cssClasses[6]);
						/* falls through */
						case 2:
							addClass(handles[0], cssClasses[7]);
						/* falls through */
						case 0:
							addClass(target, cssClasses[6]);
							break;
					}
				}

				// Add handles to the slider base.
				function addHandles(nrHandles, direction, base) {

					var index,
					    handles = [];

					// Append handles.
					for (index = 0; index < nrHandles; index += 1) {

						// Keep a list of all added handles.
						handles.push(base.appendChild(addHandle(direction, index)));
					}

					return handles;
				}

				// Initialize a single slider.
				function addSlider(direction, orientation, target) {

					// Apply classes and data to the target.
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

				// The tooltips option is a shorthand for using the 'update' event.
				function tooltips() {

					if (options.dir) {
						options.tooltips.reverse();
					}

					// Tooltips are added with options.tooltips in original order.
					var tips = scope_Handles.map(addTooltip);

					if (options.dir) {
						tips.reverse();
						options.tooltips.reverse();
					}

					bindEvent('update', function (f, o, r) {
						if (tips[o]) {
							tips[o].innerHTML = options.tooltips[o] === true ? f[o] : options.tooltips[o].to(r[o]);
						}
					});
				}

				function getGroup(mode, values, stepped) {

					// Use the range.
					if (mode === 'range' || mode === 'steps') {
						return scope_Spectrum.xVal;
					}

					if (mode === 'count') {

						// Divide 0 - 100 in 'count' parts.
						var spread = 100 / (values - 1),
						    v,
						    i = 0;
						values = [];

						// List these parts and have them handled as 'positions'.
						while ((v = i++ * spread) <= 100) {
							values.push(v);
						}

						mode = 'positions';
					}

					if (mode === 'positions') {

						// Map all percentages to on-range values.
						return values.map(function (value) {
							return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
						});
					}

					if (mode === 'values') {

						// If the value must be stepped, it needs to be converted to a percentage first.
						if (stepped) {

							return values.map(function (value) {

								// Convert to percentage, apply step, return to value.
								return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
							});
						}

						// Otherwise, we can simply use the values.
						return values;
					}
				}

				function generateSpread(density, mode, group) {

					function safeIncrement(value, increment) {
						// Avoid floating point variance by dropping the smallest decimal places.
						return (value + increment).toFixed(7) / 1;
					}

					var originalSpectrumDirection = scope_Spectrum.direction,
					    indexes = {},
					    firstInRange = scope_Spectrum.xVal[0],
					    lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1],
					    ignoreFirst = false,
					    ignoreLast = false,
					    prevPct = 0;

					// This function loops the spectrum in an ltr linear fashion,
					// while the toStepping method is direction aware. Trick it into
					// believing it is ltr.
					scope_Spectrum.direction = 0;

					// Create a copy of the group, sort it and filter away all duplicates.
					group = unique(group.slice().sort(function (a, b) {
						return a - b;
					}));

					// Make sure the range starts with the first element.
					if (group[0] !== firstInRange) {
						group.unshift(firstInRange);
						ignoreFirst = true;
					}

					// Likewise for the last one.
					if (group[group.length - 1] !== lastInRange) {
						group.push(lastInRange);
						ignoreLast = true;
					}

					group.forEach(function (current, index) {

						// Get the current step and the lower + upper positions.
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

						// When using 'steps' mode, use the provided steps.
						// Otherwise, we'll step on to the next subrange.
						if (mode === 'steps') {
							step = scope_Spectrum.xNumSteps[index];
						}

						// Default to a 'full' step.
						if (!step) {
							step = high - low;
						}

						// Low can be 0, so test for false. If high is undefined,
						// we are at the last subrange. Index 0 is already handled.
						if (low === false || high === undefined) {
							return;
						}

						// Find all steps in the subrange.
						for (i = low; i <= high; i = safeIncrement(i, step)) {

							// Get the percentage value for the current step,
							// calculate the size for the subrange.
							newPct = scope_Spectrum.toStepping(i);
							pctDifference = newPct - prevPct;

							steps = pctDifference / density;
							realSteps = Math.round(steps);

							// This ratio represents the ammount of percentage-space a point indicates.
							// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
							// Round the percentage offset to an even number, then divide by two
							// to spread the offset on both sides of the range.
							stepsize = pctDifference / realSteps;

							// Divide all points evenly, adding the correct number to this subrange.
							// Run up to <= so that 100% gets a point, event if ignoreLast is set.
							for (q = 1; q <= realSteps; q += 1) {

								// The ratio between the rounded value and the actual size might be ~1% off.
								// Correct the percentage offset by the number of points
								// per subrange. density = 1 will result in 100 points on the
								// full range, 2 for 50, 4 for 25, etc.
								pctPos = prevPct + q * stepsize;
								indexes[pctPos.toFixed(5)] = ['x', 0];
							}

							// Determine the point type.
							type = group.indexOf(i) > -1 ? 1 : mode === 'steps' ? 2 : 0;

							// Enforce the 'ignoreFirst' option by overwriting the type for 0.
							if (!index && ignoreFirst) {
								type = 0;
							}

							if (!(i === high && ignoreLast)) {
								// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
								indexes[newPct.toFixed(5)] = [i, type];
							}

							// Update the percentage count.
							prevPct = newPct;
						}
					});

					// Reset the spectrum.
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

						// Apply the filter function, if it is set.
						values[1] = values[1] && filterFunc ? filterFunc(values[0], values[1]) : values[1];

						// Add a marker for every point
						out += '<div ' + getTags(offset, cssClasses[21], values) + '></div>';

						// Values are only appended for points marked '1' or '2'.
						if (values[1]) {
							out += '<div ' + getTags(offset, cssClasses[22], values) + '>' + formatter.to(values[0]) + '</div>';
						}
					}

					// Append all points.
					Object.keys(spread).forEach(function (a) {
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
					    format = grid.format || {
						to: Math.round
					};

					return scope_Target.appendChild(addMarking(spread, filter, format));
				}

				// Shorthand for base dimensions.
				function baseSize() {
					var rect = scope_Base.getBoundingClientRect(),
					    alt = 'offset' + ['Width', 'Height'][options.ort];
					return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
				}

				// External event handling
				function fireEvent(event, handleNumber, tap) {

					if (handleNumber !== undefined && options.handles !== 1) {
						handleNumber = Math.abs(handleNumber - options.dir);
					}

					Object.keys(scope_Events).forEach(function (targetEvent) {

						var eventType = targetEvent.split('.')[0];

						if (event === eventType) {
							scope_Events[targetEvent].forEach(function (callback) {

								callback.call(
								// Use the slider public API as the scope ('this')
								scope_Self,
								// Return values as array, so arg_1[arg_2] is always valid.
								asArray(valueGet()),
								// Handle index, 0 or 1
								handleNumber,
								// Unformatted slider values
								asArray(inSliderOrder(Array.prototype.slice.call(scope_Values))),
								// Event is fired by tap, true or false
								tap || false,
								// Left offset of the handle, in relation to the slider
								scope_Locations);
							});
						}
					});
				}

				// Returns the input array, respecting the slider direction configuration.
				function inSliderOrder(values) {

					// If only one handle is used, return a single value.
					if (values.length === 1) {
						return values[0];
					}

					if (options.dir) {
						return values.reverse();
					}

					return values;
				}

				// Handler for attaching events trough a proxy.
				function attach(events, element, callback, data) {

					// This function can be used to 'filter' events to the slider.
					// element is a node, not a nodeList

					var method = function (e) {

						if (scope_Target.hasAttribute('disabled')) {
							return false;
						}

						// Stop if an active 'tap' transition is taking place.
						if (hasClass(scope_Target, cssClasses[14])) {
							return false;
						}

						e = fixEvent(e, data.pageOffset);

						// Ignore right or middle clicks on start #454
						if (events === actions.start && e.buttons !== undefined && e.buttons > 1) {
							return false;
						}

						// Ignore right or middle clicks on start #454
						if (data.hover && e.buttons) {
							return false;
						}

						e.calcPoint = e.points[options.ort];

						// Call the event handler with the event [ and additional data ].
						callback(e, data);
					},
					    methods = [];

					// Bind a closure on the target for every event type.
					events.split(' ').forEach(function (eventName) {
						if (element) {
							element.addEventListener(eventName, method, false);
							methods.push([eventName, method]);
						}
					});

					return methods;
				}

				// Handle movement on document for handle and range drag.
				function move(event, data) {

					// Fix #498
					// Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
					// https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
					// IE9 has .buttons and .which zero on mousemove.
					// Firefox breaks the spec MDN defines.
					if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) {
						return end(event, data);
					}

					var handles = data.handles || scope_Handles,
					    positions,
					    state = false,
					    proposal = (event.calcPoint - data.start) * 100 / data.baseSize,
					    handleNumber = handles[0] === scope_Handles[0] ? 0 : 1,
					    i;

					// Calculate relative positions for the handles.
					positions = getPositions(proposal, data.positions, handles.length > 1);

					state = setHandle(handles[0], positions[handleNumber], handles.length === 1);

					if (handles.length > 1) {

						state = setHandle(handles[1], positions[handleNumber ? 0 : 1], false) || state;

						if (state) {
							// fire for both handles
							for (i = 0; i < data.handles.length; i++) {
								fireEvent('slide', i);
							}
						}
					} else if (state) {
						// Fire for a single handle
						fireEvent('slide', handleNumber);
					}
				}

				// Unbind move events on document, call callbacks.
				function end(event, data) {

					// The handle is no longer active, so remove the class.
					var active = scope_Base.querySelector('.' + cssClasses[15]),
					    handleNumber = data.handles[0] === scope_Handles[0] ? 0 : 1;

					if (active !== null) {
						removeClass(active, cssClasses[15]);
					}

					// Remove cursor styles and text-selection events bound to the body.
					if (event.cursor) {
						document.body.style.cursor = '';
						document.body.removeEventListener('selectstart', document.body.noUiListener);
					}

					var d = document.documentElement;

					// Unbind the move and end events, which are added on 'start'.
					d.noUiListeners.forEach(function (c) {
						d.removeEventListener(c[0], c[1]);
					});

					// Remove dragging class.
					removeClass(scope_Target, cssClasses[12]);

					// Fire the change and set events.
					fireEvent('set', handleNumber);
					fireEvent('change', handleNumber);

					// If this is a standard handle movement, fire the end event.
					if (data.handleNumber !== undefined) {
						fireEvent('end', data.handleNumber);
					}
				}

				// Fire 'end' when a mouse or pen leaves the document.
				function documentLeave(event, data) {
					if (event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null) {
						end(event, data);
					}
				}

				// Bind move events on document.
				function start(event, data) {

					var d = document.documentElement;

					// Mark the handle as 'active' so it can be styled.
					if (data.handles.length === 1) {
						addClass(data.handles[0].children[0], cssClasses[15]);

						// Support 'disabled' handles
						if (data.handles[0].hasAttribute('disabled')) {
							return false;
						}
					}

					// Fix #551, where a handle gets selected instead of dragged.
					event.preventDefault();

					// A drag should never propagate up to the 'tap' event.
					event.stopPropagation();

					// Attach the move and end events.
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

					// Text selection isn't an issue on touch devices,
					// so adding cursor styles can be skipped.
					if (event.cursor) {

						// Prevent the 'I' cursor and extend the range-drag cursor.
						document.body.style.cursor = getComputedStyle(event.target).cursor;

						// Mark the target with a dragging state.
						if (scope_Handles.length > 1) {
							addClass(scope_Target, cssClasses[12]);
						}

						var f = function () {
							return false;
						};

						document.body.noUiListener = f;

						// Prevent text selection when dragging the handles.
						document.body.addEventListener('selectstart', f, false);
					}

					if (data.handleNumber !== undefined) {
						fireEvent('start', data.handleNumber);
					}
				}

				// Move closest handle to tapped location.
				function tap(event) {

					var location = event.calcPoint,
					    total = 0,
					    handleNumber,
					    to;

					// The tap event shouldn't propagate up and cause 'edge' to run.
					event.stopPropagation();

					// Add up the handle offsets.
					scope_Handles.forEach(function (a) {
						total += offset(a)[options.style];
					});

					// Find the handle closest to the tapped position.
					handleNumber = location < total / 2 || scope_Handles.length === 1 ? 0 : 1;

					// Check if handler is not disablet if yes set number to the next handler
					if (scope_Handles[handleNumber].hasAttribute('disabled')) {
						handleNumber = handleNumber ? 0 : 1;
					}

					location -= offset(scope_Base)[options.style];

					// Calculate the new position.
					to = location * 100 / baseSize();

					if (!options.events.snap) {
						// Flag the slider as it is now in a transitional state.
						// Transition takes 300 ms, so re-enable the slider afterwards.
						addClassFor(scope_Target, cssClasses[14], 300);
					}

					// Support 'disabled' handles
					if (scope_Handles[handleNumber].hasAttribute('disabled')) {
						return false;
					}

					// Find the closest handle and calculate the tapped point.
					// The set handle to the new position.
					setHandle(scope_Handles[handleNumber], to);

					fireEvent('slide', handleNumber, true);
					fireEvent('set', handleNumber, true);
					fireEvent('change', handleNumber, true);

					if (options.events.snap) {
						start(event, { handles: [scope_Handles[handleNumber]] });
					}
				}

				// Fires a 'hover' event for a hovered mouse/pen position.
				function hover(event) {

					var location = event.calcPoint - offset(scope_Base)[options.style],
					    to = scope_Spectrum.getStep(location * 100 / baseSize()),
					    value = scope_Spectrum.fromStepping(to);

					Object.keys(scope_Events).forEach(function (targetEvent) {
						if ('hover' === targetEvent.split('.')[0]) {
							scope_Events[targetEvent].forEach(function (callback) {
								callback.call(scope_Self, value);
							});
						}
					});
				}

				// Attach events to several slider parts.
				function events(behaviour) {

					var i, drag;

					// Attach the standard drag event to the handles.
					if (!behaviour.fixed) {

						for (i = 0; i < scope_Handles.length; i += 1) {

							// These events are only bound to the visual handle
							// element, not the 'real' origin element.
							attach(actions.start, scope_Handles[i].children[0], start, {
								handles: [scope_Handles[i]],
								handleNumber: i
							});
						}
					}

					// Attach the tap event to the slider base.
					if (behaviour.tap) {

						attach(actions.start, scope_Base, tap, {
							handles: scope_Handles
						});
					}

					// Fire hover events
					if (behaviour.hover) {
						attach(actions.move, scope_Base, hover, { hover: true });
						for (i = 0; i < scope_Handles.length; i += 1) {
							['mousemove MSPointerMove pointermove'].forEach(function (eventName) {
								scope_Handles[i].children[0].addEventListener(eventName, stopPropagation, false);
							});
						}
					}

					// Make the range draggable.
					if (behaviour.drag) {

						drag = [scope_Base.querySelector('.' + cssClasses[7])];
						addClass(drag[0], cssClasses[10]);

						// When the range is fixed, the entire range can
						// be dragged by the handles. The handle in the first
						// origin will propagate the start event upward,
						// but it needs to be bound manually on the other.
						if (behaviour.fixed) {
							drag.push(scope_Handles[drag[0] === scope_Handles[0] ? 1 : 0].children[0]);
						}

						drag.forEach(function (element) {
							attach(actions.start, element, start, {
								handles: scope_Handles
							});
						});
					}
				}

				// Test suggested values and apply margin, step.
				function setHandle(handle, to, noLimitOption) {

					var trigger = handle !== scope_Handles[0] ? 1 : 0,
					    lowerMargin = scope_Locations[0] + options.margin,
					    upperMargin = scope_Locations[1] - options.margin,
					    lowerLimit = scope_Locations[0] + options.limit,
					    upperLimit = scope_Locations[1] - options.limit;

					// For sliders with multiple handles,
					// limit movement to the other handle.
					// Apply the margin option by adding it to the handle positions.
					if (scope_Handles.length > 1) {
						to = trigger ? Math.max(to, lowerMargin) : Math.min(to, upperMargin);
					}

					// The limit option has the opposite effect, limiting handles to a
					// maximum distance from another. Limit must be > 0, as otherwise
					// handles would be unmoveable. 'noLimitOption' is set to 'false'
					// for the .val() method, except for pass 4/4.
					if (noLimitOption !== false && options.limit && scope_Handles.length > 1) {
						to = trigger ? Math.min(to, lowerLimit) : Math.max(to, upperLimit);
					}

					// Handle the step option.
					to = scope_Spectrum.getStep(to);

					// Limit to 0/100 for .val input, trim anything beyond 7 digits, as
					// JavaScript has some issues in its floating point implementation.
					to = limit(parseFloat(to.toFixed(7)));

					// Return false if handle can't move
					if (to === scope_Locations[trigger]) {
						return false;
					}

					// Set the handle to the new position.
					// Use requestAnimationFrame for efficient painting.
					// No significant effect in Chrome, Edge sees dramatic
					// performace improvements.
					if (window.requestAnimationFrame) {
						window.requestAnimationFrame(function () {
							handle.style[options.style] = to + '%';
						});
					} else {
						handle.style[options.style] = to + '%';
					}

					// Force proper handle stacking
					if (!handle.previousSibling) {
						removeClass(handle, cssClasses[17]);
						if (to > 50) {
							addClass(handle, cssClasses[17]);
						}
					}

					// Update locations.
					scope_Locations[trigger] = to;

					// Convert the value to the slider stepping/range.
					scope_Values[trigger] = scope_Spectrum.fromStepping(to);

					fireEvent('update', trigger);

					return true;
				}

				// Loop values from value method and apply them.
				function setValues(count, values) {

					var i, trigger, to;

					// With the limit option, we'll need another limiting pass.
					if (options.limit) {
						count += 1;
					}

					// If there are multiple handles to be set run the setting
					// mechanism twice for the first handle, to make sure it
					// can be bounced of the second one properly.
					for (i = 0; i < count; i += 1) {

						trigger = i % 2;

						// Get the current argument from the array.
						to = values[trigger];

						// Setting with null indicates an 'ignore'.
						// Inputting 'false' is invalid.
						if (to !== null && to !== false) {

							// If a formatted number was passed, attemt to decode it.
							if (typeof to === 'number') {
								to = String(to);
							}

							to = options.format.from(to);

							// Request an update for all links if the value was invalid.
							// Do so too if setting the handle fails.
							if (to === false || isNaN(to) || setHandle(scope_Handles[trigger], scope_Spectrum.toStepping(to), i === 3 - options.dir) === false) {
								fireEvent('update', trigger);
							}
						}
					}
				}

				// Set the slider value.
				function valueSet(input) {

					var count,
					    values = asArray(input),
					    i;

					// The RTL settings is implemented by reversing the front-end,
					// internal mechanisms are the same.
					if (options.dir && options.handles > 1) {
						values.reverse();
					}

					// Animation is optional.
					// Make sure the initial values where set before using animated placement.
					if (options.animate && scope_Locations[0] !== -1) {
						addClassFor(scope_Target, cssClasses[14], 300);
					}

					// Determine how often to set the handles.
					count = scope_Handles.length > 1 ? 3 : 1;

					if (values.length === 1) {
						count = 1;
					}

					setValues(count, values);

					// Fire the 'set' event for both handles.
					for (i = 0; i < scope_Handles.length; i++) {

						// Fire the event only for handles that received a new value, as per #579
						if (values[i] !== null) {
							fireEvent('set', i);
						}
					}
				}

				// Get the slider value.
				function valueGet() {

					var i,
					    retour = [];

					// Get the value from all handles.
					for (i = 0; i < options.handles; i += 1) {
						retour[i] = options.format.to(scope_Values[i]);
					}

					return inSliderOrder(retour);
				}

				// Removes classes from the root and empties it.
				function destroy() {

					cssClasses.forEach(function (cls) {
						if (!cls) {
							return;
						} // Ignore empty classes
						removeClass(scope_Target, cls);
					});

					while (scope_Target.firstChild) {
						scope_Target.removeChild(scope_Target.firstChild);
					}

					delete scope_Target.noUiSlider;
				}

				// Get the current step size for the slider.
				function getCurrentStep() {

					// Check all locations, map them to their stepping point.
					// Get the step point, then find it in the input list.
					var retour = scope_Locations.map(function (location, index) {

						var step = scope_Spectrum.getApplicableStep(location),


						// As per #391, the comparison for the decrement step can have some rounding issues.
						// Round the value to the precision used in the step.
						stepDecimals = countDecimals(String(step[2])),


						// Get the current numeric value
						value = scope_Values[index],


						// To move the slider 'one step up', the current step value needs to be added.
						// Use null if we are at the maximum slider value.
						increment = location === 100 ? null : step[2],


						// Going 'one step down' might put the slider in a different sub-range, so we
						// need to switch between the current or the previous step.
						prev = Number((value - step[2]).toFixed(stepDecimals)),


						// If the value fits the step, return the current step value. Otherwise, use the
						// previous step. Return null if the slider is at its minimum value.
						decrement = location === 0 ? null : prev >= step[1] ? step[2] : step[0] || false;

						return [decrement, increment];
					});

					// Return values in the proper order.
					return inSliderOrder(retour);
				}

				// Attach an event to this slider, possibly including a namespace
				function bindEvent(namespacedEvent, callback) {
					scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
					scope_Events[namespacedEvent].push(callback);

					// If the event bound is 'update,' fire it immediately for all handles.
					if (namespacedEvent.split('.')[0] === 'update') {
						scope_Handles.forEach(function (a, index) {
							fireEvent('update', index);
						});
					}
				}

				// Undo attachment of event
				function removeEvent(namespacedEvent) {

					var event = namespacedEvent.split('.')[0],
					    namespace = namespacedEvent.substring(event.length);

					Object.keys(scope_Events).forEach(function (bind) {

						var tEvent = bind.split('.')[0],
						    tNamespace = bind.substring(tEvent.length);

						if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
							delete scope_Events[bind];
						}
					});
				}

				// Updateable: margin, limit, step, range, animate, snap
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

					['margin', 'limit', 'step', 'range', 'animate'].forEach(function (name) {
						if (optionsToUpdate[name] !== undefined) {
							options[name] = optionsToUpdate[name];
						}
					});

					// Save current spectrum direction as testOptions in testRange call
					// doesn't rely on current direction
					newOptions.spectrum.direction = scope_Spectrum.direction;
					scope_Spectrum = newOptions.spectrum;

					// Invalidate the current positioning so valueSet forces an update.
					scope_Locations = [-1, -1];
					valueSet(v);

					for (i = 0; i < scope_Handles.length; i++) {
						fireEvent('update', i);
					}
				}

				// Throw an error if the slider was already initialized.
				if (scope_Target.noUiSlider) {
					throw new Error('Slider was already initialized.');
				}

				// Create the base element, initialise HTML and set classes.
				// Add handles and links.
				scope_Base = addSlider(options.dir, options.ort, scope_Target);
				scope_Handles = addHandles(options.handles, options.dir, scope_Base);

				// Set the connect classes.
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
					options: options, // Issue #600
					target: scope_Target, // Issue #597
					pips: pips // Issue #594
				};

				// Attach user events.
				events(options.events);

				return scope_Self;
			}

			// Run the standard initializer
			function initialize(target, originalOptions) {

				if (!target.nodeName) {
					throw new Error('noUiSlider.create requires a single element.');
				}

				// Test the options and create the slider environment;
				var options = testOptions(originalOptions, target),
				    slider = closure(target, options);

				// Use the public value method to set the start values.
				slider.set(options.start);

				target.noUiSlider = slider;
				return slider;
			}

			// Use an object instead of a function for future expansibility;
			return {
				create: initialize
			};
		});
	})(this);

	return _retrieveGlobal();
});
System.registerDynamic("fuel-ui/lib/components/slider/slider", ["@angular/core", "@angular/common", "./NoUiSlider"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
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
      this.debounceTime = 150;
      this.valueChange = new core_1.EventEmitter();
      this.secondValueChange = new core_1.EventEmitter();
      this.timeout = null;
    }
    Slider.prototype.update = function(val) {
      this.value = parseInt(val[0]);
      this.secondValue = val.length > 1 ? parseInt(val[1]) : null;
      this.valueChange.next(this.value);
      this.secondValueChange.next(this.secondValue);
      this.timeout = null;
    };
    ;
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
        if (_this.timeout)
          clearTimeout(_this.timeout);
        _this.timeout = setTimeout(function() {
          _this.update(val);
        }, _this.debounceTime);
      });
      this._sliderElement.noUiSlider.on('end', function(val) {
        if (_this.timeout)
          clearTimeout(_this.timeout);
        _this.update(val);
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
    __decorate([core_1.Input(), __metadata('design:type', Number)], Slider.prototype, "debounceTime", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], Slider.prototype, "valueChange", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], Slider.prototype, "secondValueChange", void 0);
    Slider = __decorate([core_1.Component({
      selector: "slider",
      template: "\n\n      <div class=\"slider\"></div>\n    "
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Slider);
    return Slider;
  }());
  exports.Slider = Slider;
  var FuiSliderModule = (function() {
    function FuiSliderModule() {}
    FuiSliderModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: [Slider],
      exports: [Slider]
    }), __metadata('design:paramtypes', [])], FuiSliderModule);
    return FuiSliderModule;
  }());
  exports.FuiSliderModule = FuiSliderModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/timePicker/timePicker", ["@angular/core", "@angular/common", "@angular/forms"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var TimePicker = (function() {
    function TimePicker() {
      this.hourStep = 1;
      this.minuteStep = 1;
      this.secondStep = 1;
      this.showMeridian = true;
      this.meridians = ["AM", "PM"];
      this.showSeconds = false;
      this.readonlyInput = false;
      this.showSpinners = true;
      this.disabled = false;
      this.min = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0);
      this.max = new Date(new Date().getFullYear(), 0, 1, 23, 59, 59);
      this.value = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0);
      this.meridian = this.meridians.length > 0 ? this.meridians[0] : null;
      this.hours = 0;
      this.minutes = "00";
      this.seconds = "00";
      this.invalidHours = false;
      this.invalidMinutes = false;
      this.invalidSeconds = false;
      this.valueChange = new core_1.EventEmitter();
    }
    TimePicker.prototype.ngOnInit = function() {
      this.hours = this.value.getHours();
      this.minutes = this.value.getMinutes() > 9 ? this.value.getMinutes().toString() : "0" + this.value.getMinutes().toString();
      this.seconds = this.value.getSeconds() > 9 ? this.value.getSeconds().toString() : "0" + this.value.getSeconds().toString();
      this.refresh();
    };
    TimePicker.prototype.ngOnChanges = function(changes) {
      this.refresh();
    };
    TimePicker.prototype.incrementHours = function() {
      if (!this.noIncrementHours()) {
        this.addSecondsToSelected(this.hourStep * 60 * 60);
      }
    };
    ;
    TimePicker.prototype.decrementHours = function() {
      if (!this.noDecrementHours()) {
        this.addSecondsToSelected(-this.hourStep * 60 * 60);
      }
    };
    ;
    TimePicker.prototype.incrementMinutes = function() {
      if (!this.noIncrementMinutes()) {
        this.addSecondsToSelected(this.minuteStep * 60);
      }
    };
    ;
    TimePicker.prototype.decrementMinutes = function() {
      if (!this.noDecrementMinutes()) {
        this.addSecondsToSelected(-this.minuteStep * 60);
      }
    };
    ;
    TimePicker.prototype.incrementSeconds = function() {
      if (!this.noIncrementSeconds()) {
        this.addSecondsToSelected(this.secondStep);
      }
    };
    ;
    TimePicker.prototype.decrementSeconds = function() {
      if (!this.noDecrementSeconds()) {
        this.addSecondsToSelected(-this.secondStep);
      }
    };
    ;
    TimePicker.prototype.toggleMeridian = function() {
      if (this.noToggleMeridian())
        return;
      if (this.minutes && this.hours) {
        this.addSecondsToSelected(12 * 60 * (this.value.getHours() < 12 ? 60 : -60));
      } else {
        this.meridian = this.meridian === this.meridians[0] ? this.meridians[1] : this.meridians[0];
      }
    };
    ;
    TimePicker.prototype.addSecondsToSelected = function(seconds) {
      this.value = this.addSeconds(this.value, seconds);
      this.hours = this.value.getHours();
      this.minutes = this.value.getMinutes() > 9 ? this.value.getMinutes().toString() : "0" + this.value.getMinutes().toString();
      this.seconds = this.value.getSeconds() > 9 ? this.value.getSeconds().toString() : "0" + this.value.getSeconds().toString();
      this.valueChange.next(this.value);
      this.sanitize();
      this.refresh();
    };
    TimePicker.prototype.addMinutes = function(selected, minutes) {
      return this.addSeconds(selected, minutes * 60);
    };
    TimePicker.prototype.addSeconds = function(date, seconds) {
      var dt = new Date(date.getTime() + seconds * 1000);
      var newDate = new Date(date.getTime());
      newDate.setHours(dt.getHours(), dt.getMinutes(), dt.getSeconds());
      return newDate;
    };
    TimePicker.prototype.invalidTime = function() {
      return this.invalidHours || this.invalidMinutes || this.invalidSeconds;
    };
    TimePicker.prototype.sanitize = function() {
      this.invalidHours = false;
      this.invalidMinutes = false;
      this.invalidSeconds = false;
    };
    TimePicker.prototype.refresh = function() {
      this.hours = this.value.getHours();
      this.minutes = this.value.getMinutes() > 9 ? this.value.getMinutes().toString() : "0" + this.value.getMinutes().toString();
      this.seconds = this.value.getSeconds() > 9 ? this.value.getSeconds().toString() : "0" + this.value.getSeconds().toString();
      if (this.hours >= 12 && this.showMeridian) {
        this.meridian = this.meridians[1];
      }
      if (this.showMeridian) {
        this.hours = this.hours === 0 || this.hours === 12 ? 12 : this.hours % 12;
      }
      this.meridian = this.value.getHours() < 12 ? this.meridians[0] : this.meridians[1];
    };
    TimePicker.prototype.updateHours = function() {
      this.sanitize();
      if (this.hours.toString().length <= 0 || isNaN(this.hours) || this.hours < 0 || this.hours > 23 || (this.showMeridian && this.hours > 12)) {
        this.invalidHours = true;
      } else {
        this.hours = parseInt(this.hours.toString());
        this.value.setHours(this.showMeridian && this.meridian == this.meridians[1] ? this.hours + 12 : this.hours);
        this.addSecondsToSelected(0);
      }
    };
    TimePicker.prototype.updateMinutes = function() {
      this.sanitize();
      if (this.minutes.length <= 0 || isNaN(parseInt(this.minutes)) || parseInt(this.minutes) < 0 || parseInt(this.minutes) > 59) {
        this.invalidMinutes = true;
      } else {
        this.value.setMinutes(parseInt(this.minutes));
        this.addSecondsToSelected(0);
      }
    };
    TimePicker.prototype.updateSeconds = function() {
      this.sanitize();
      if (this.seconds.length <= 0 || isNaN(parseInt(this.seconds)) || parseInt(this.seconds) < 0 || parseInt(this.seconds) > 59) {
        this.invalidSeconds = true;
      } else {
        this.value.setSeconds(parseInt(this.seconds));
        this.addSecondsToSelected(0);
      }
    };
    TimePicker.prototype.noIncrementHours = function() {
      var incrementedSelected = this.addMinutes(this.value, this.hourStep * 60);
      return this.disabled || incrementedSelected > this.max || incrementedSelected < this.value && incrementedSelected < this.min;
    };
    ;
    TimePicker.prototype.noDecrementHours = function() {
      var decrementedSelected = this.addMinutes(this.value, -this.hourStep * 60);
      return this.disabled || decrementedSelected < this.min || decrementedSelected > this.value && decrementedSelected > this.max;
    };
    ;
    TimePicker.prototype.noIncrementMinutes = function() {
      var incrementedSelected = this.addMinutes(this.value, this.minuteStep);
      return this.disabled || incrementedSelected > this.max || incrementedSelected < this.value && incrementedSelected < this.min;
    };
    ;
    TimePicker.prototype.noDecrementMinutes = function() {
      var decrementedSelected = this.addMinutes(this.value, -this.minuteStep);
      return this.disabled || decrementedSelected < this.min || decrementedSelected > this.value && decrementedSelected > this.max;
    };
    ;
    TimePicker.prototype.noIncrementSeconds = function() {
      var incrementedSelected = this.addSeconds(this.value, this.secondStep);
      return this.disabled || incrementedSelected > this.max || incrementedSelected < this.value && incrementedSelected < this.min;
    };
    ;
    TimePicker.prototype.noDecrementSeconds = function() {
      var decrementedSelected = this.addSeconds(this.value, -this.secondStep);
      return this.disabled || decrementedSelected < this.min || decrementedSelected > this.value && decrementedSelected > this.max;
    };
    ;
    TimePicker.prototype.noToggleMeridian = function() {
      if (this.value.getHours() < 12) {
        return this.disabled || this.addMinutes(this.value, 12 * 60) > this.max;
      }
      return this.disabled || this.addMinutes(this.value, -12 * 60) < this.min;
    };
    ;
    __decorate([core_1.Input(), __metadata('design:type', Number)], TimePicker.prototype, "hourStep", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], TimePicker.prototype, "minuteStep", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], TimePicker.prototype, "secondStep", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimePicker.prototype, "showMeridian", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array)], TimePicker.prototype, "meridians", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimePicker.prototype, "showSeconds", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimePicker.prototype, "readonlyInput", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimePicker.prototype, "showSpinners", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimePicker.prototype, "disabled", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], TimePicker.prototype, "min", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], TimePicker.prototype, "max", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], TimePicker.prototype, "value", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], TimePicker.prototype, "valueChange", void 0);
    TimePicker = __decorate([core_1.Component({
      selector: "timepicker",
      template: "\n      <table class=\"fuel-ui-timepicker\" [class.has-error]=\"invalidTime()\">\n          <tbody>\n              <tr class=\"text-center\" *ngIf=\"showSpinners\">\n                  <td class=\"fuel-ui-increment hours\">\n                      <a (click)=\"incrementHours()\" [class.disabled]=\"noIncrementHours()\" class=\"btn btn-link\" [attr.disabled]=\"noIncrementHours()\">\n                          <span class=\"fa fa-chevron-up\"></span>\n                      </a>\n                  </td>\n                  <td>&nbsp;</td>\n                  <td class=\"fuel-ui-increment minutes\">\n                      <a (click)=\"incrementMinutes()\" [class.disabled]=\"noIncrementMinutes()\" class=\"btn btn-link\" [attr.disabled]=\"noIncrementMinutes()\">\n                          <span class=\"fa fa-chevron-up\"></span>\n                      </a>\n                  </td>\n                  <td *ngIf=\"showSeconds\">&nbsp;</td>\n                  <td *ngIf=\"showSeconds\" class=\"fuel-ui-increment seconds\">\n                      <a (click)=\"incrementSeconds()\" [class.disabled]=\"noIncrementSeconds()\" class=\"btn btn-link\" [attr.disabled]=\"noIncrementSeconds()\">\n                          <span class=\"fa fa-chevron-up\"></span>\n                      </a>\n                  </td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n              </tr>\n              <tr>\n                  <td class=\"form-group fuel-ui-time hours\" [class.has-error]=\"invalidHours\">\n                      <input type=\"text\" placeholder=\"HH\" [(ngModel)]=\"hours\" (blur)=\"updateHours()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" maxlength=\"2\" [disabled]=\"noIncrementHours()\">\n                  </td>\n                  <td class=\"fuel-ui-separator\">:</td>\n                  <td class=\"form-group fuel-ui-time minutes\" [class.has-error]=\"invalidMinutes\">\n                      <input type=\"text\" placeholder=\"MM\" [(ngModel)]=\"minutes\" (blur)=\"updateMinutes()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" maxlength=\"2\" [disabled]=\"noIncrementMinutes()\">\n                  </td>\n                  <td *ngIf=\"showSeconds\" class=\"fuel-ui-separator\">:</td>\n                  <td class=\"form-group fuel-ui-time seconds\" [class.has-error]=\"invalidSeconds\" *ngIf=\"showSeconds\">\n                      <input type=\"text\" placeholder=\"SS\" [(ngModel)]=\"seconds\" (blur)=\"updateSeconds()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" maxlength=\"2\" [disabled]=\"noIncrementSeconds()\">\n                  </td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n                  <td *ngIf=\"showMeridian\" class=\"fuel-ui-time am-pm\"><button type=\"button\" [class.disabled]=\"noToggleMeridian()\" class=\"btn btn-primary text-center\" (click)=\"toggleMeridian()\">{{meridian}}</button></td>\n              </tr>\n              <tr class=\"text-center\" *ngIf=\"showSpinners\">\n                  <td class=\"fuel-ui-decrement hours\">\n                      <a (click)=\"decrementHours()\" [class.disabled]=\"noDecrementHours()\" class=\"btn btn-link\" [attr.disabled]=\"noDecrementHours()\">\n                          <span class=\"fa fa-chevron-down\"></span>\n                      </a>\n                  </td>\n                  <td>&nbsp;</td>\n                  <td class=\"fuel-ui-decrement minutes\">\n                      <a (click)=\"decrementMinutes()\" [class.disabled]=\"noDecrementMinutes()\" class=\"btn btn-link\" [attr.disabled]=\"noDecrementMinutes()\">\n                          <span class=\"fa fa-chevron-down\"></span>\n                      </a>\n                  </td>\n                  <td *ngIf=\"showSeconds\">&nbsp;</td>\n                  <td *ngIf=\"showSeconds\" class=\"fuel-ui-decrement seconds\">\n                      <a (click)=\"decrementSeconds()\" [class.disabled]=\"noDecrementSeconds()\" class=\"btn btn-link\" [attr.disabled]=\"noDecrementSeconds()\">\n                          <span class=\"fa fa-chevron-down\"></span>\n                      </a>\n                  </td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n              </tr>\n          </tbody>\n      </table>\n    "
    }), __metadata('design:paramtypes', [])], TimePicker);
    return TimePicker;
  }());
  exports.TimePicker = TimePicker;
  exports.TIMEPICKER_PROVIDERS = [TimePicker];
  var FuiTimePickerModule = (function() {
    function FuiTimePickerModule() {}
    FuiTimePickerModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule, forms_1.FormsModule],
      declarations: [TimePicker],
      exports: [TimePicker]
    }), __metadata('design:paramtypes', [])], FuiTimePickerModule);
    return FuiTimePickerModule;
  }());
  exports.FuiTimePickerModule = FuiTimePickerModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/textExpander/textExpander", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var TextExpander = (function() {
    function TextExpander() {
      this.expanded = false;
      this.ellipsis = true;
      this.text = null;
      this.characters = 50;
      this.words = 0;
      this.expandText = "show more";
      this.shrinkText = "show less";
      this.expandedChange = new core_1.EventEmitter();
    }
    TextExpander.prototype.toggleExpand = function() {
      this.expanded = !this.expanded;
      this.expandedChange.next(this.expanded);
    };
    TextExpander.prototype.amountOfCharacters = function() {
      if (this.words > 0)
        return this.getCharactersUpToNumberOfWords(this.words);
      return this.characters;
    };
    TextExpander.prototype.getCharactersUpToNumberOfWords = function(words) {
      var textCopy = this.text;
      textCopy = textCopy.replace(/(^\s*)|(\s*$)/gi, "");
      textCopy = textCopy.replace(/[ ]{2,}/gi, " ");
      textCopy = textCopy.replace(/\n /, "\n");
      var wordsArr = textCopy.split(' ');
      if (words >= wordsArr.length - 1)
        return this.text.length;
      wordsArr = wordsArr.splice(0, words);
      var lastWordToShow = wordsArr[wordsArr.length - 1];
      var occurencesOfLastWord = wordsArr.filter(function(str) {
        return str === lastWordToShow;
      }).length;
      if (occurencesOfLastWord == 1)
        return this.text.split(lastWordToShow)[0].length + lastWordToShow.length;
      var charactersUntilLastWord = 0;
      for (var i = 0; i < occurencesOfLastWord; i++) {
        charactersUntilLastWord += this.text.split(lastWordToShow)[i].length;
      }
      return charactersUntilLastWord + lastWordToShow.length;
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TextExpander.prototype, "expanded", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TextExpander.prototype, "ellipsis", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], TextExpander.prototype, "text", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], TextExpander.prototype, "characters", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], TextExpander.prototype, "words", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], TextExpander.prototype, "expandText", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], TextExpander.prototype, "shrinkText", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], TextExpander.prototype, "expandedChange", void 0);
    TextExpander = __decorate([core_1.Component({
      selector: 'text-expander',
      template: "\n      <span *ngIf=\"text\">\n          {{text | slice : 0 : (expanded ? text.length : amountOfCharacters())}}\n          <span *ngIf=\"!expanded && text.length > amountOfCharacters()\">\n              <span *ngIf=\"ellipsis\">&hellip;</span>\n              <a href=\"javascript:void(8);\" (click)=\"toggleExpand()\">\n                  {{expandText}}\n              </a>\n          </span>\n          <span *ngIf=\"expanded && text.length > amountOfCharacters()\">\n              <a href=\"javascript:void(8);\" (click)=\"toggleExpand()\">\n                  {{shrinkText}}\n              </a>\n          </span>\n      </span>\n    ",
      pipes: [common_1.SlicePipe]
    }), __metadata('design:paramtypes', [])], TextExpander);
    return TextExpander;
  }());
  exports.TextExpander = TextExpander;
  var FuiTextExpanderModule = (function() {
    function FuiTextExpanderModule() {}
    FuiTextExpanderModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: [TextExpander],
      exports: [TextExpander]
    }), __metadata('design:paramtypes', [])], FuiTextExpanderModule);
    return FuiTextExpanderModule;
  }());
  exports.FuiTextExpanderModule = FuiTextExpanderModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/offCanvasMenu/offCanvasMenu", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var core_2 = $__require('@angular/core');
  var core_3 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var OffCanvasMenuClose = (function() {
    function OffCanvasMenuClose() {
      this.close = new core_2.EventEmitter();
    }
    OffCanvasMenuClose.prototype.onClick = function(e) {
      this.close.next(null);
    };
    __decorate([core_1.Output(), __metadata('design:type', Object)], OffCanvasMenuClose.prototype, "close", void 0);
    __decorate([core_2.HostListener("click", ["$event"]), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], OffCanvasMenuClose.prototype, "onClick", null);
    OffCanvasMenuClose = __decorate([core_1.Directive({selector: "[offCanvasMenuClose], .off-canvas-menu-close"}), __metadata('design:paramtypes', [])], OffCanvasMenuClose);
    return OffCanvasMenuClose;
  }());
  exports.OffCanvasMenuClose = OffCanvasMenuClose;
  var OffCanvasMenu = (function() {
    function OffCanvasMenu() {
      this.origin = "left";
      this.width = "25%";
      this.height = "25%";
      this.close = new core_2.EventEmitter();
      this.open = new core_2.EventEmitter();
      this.computedWidth = this.width;
      this.computedHeight = this.height;
      this.isOpen = false;
      this.overlayState = null;
      this.openState = null;
    }
    OffCanvasMenu.prototype.ngOnInit = function() {};
    OffCanvasMenu.prototype.ngAfterContentInit = function() {
      var _this = this;
      this.closeButtons.map(function(b) {
        return b.close.subscribe(function() {
          return _this.toggleMenu();
        });
      });
    };
    OffCanvasMenu.prototype.ngOnDestroy = function() {};
    OffCanvasMenu.prototype.toggleMenu = function() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.overlayState = "in";
        this.openState = "open";
        this.open.next(null);
      } else {
        this.overlayState = null;
        this.openState = null;
        this.close.next(null);
      }
      if (this.origin == "left" || this.origin == "right") {
        this.computedHeight = "100%";
        this.computedWidth = this.width;
      } else if (this.origin == "top" || this.origin == "bottom") {
        this.computedWidth = "100%";
        this.computedHeight = this.height;
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', Object)], OffCanvasMenu.prototype, "origin", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object)], OffCanvasMenu.prototype, "width", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object)], OffCanvasMenu.prototype, "height", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_2.EventEmitter)], OffCanvasMenu.prototype, "close", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_2.EventEmitter)], OffCanvasMenu.prototype, "open", void 0);
    __decorate([core_1.ContentChildren(OffCanvasMenuClose), __metadata('design:type', core_1.QueryList)], OffCanvasMenu.prototype, "closeButtons", void 0);
    OffCanvasMenu = __decorate([core_1.Component({
      selector: "off-canvas-menu",
      template: "\n      <div *ngIf=\"isOpen\" [@fade]=\"overlayState\" class=\"off-canvas-menu-overlay\" \n          (click)=\"toggleMenu()\"></div>\n\n      <div *ngIf=\"isOpen\" [@open]=\"openState\" class=\"off-canvas-menu\"\n          [class.off-canvas-menu-left]=\"origin.toLowerCase() == 'left'\"\n          [class.off-canvas-menu-right]=\"origin.toLowerCase() == 'right'\"\n          [class.off-canvas-menu-top]=\"origin.toLowerCase() == 'top'\"\n          [class.off-canvas-menu-bottom]=\"origin.toLowerCase() == 'bottom'\"\n          [style.width]=\"computedWidth\"\n          [style.height]=\"computedHeight\">\n          <ng-content></ng-content>    \n      </div>\n    ",
      styles: ["\n      .off-canvas-menu-overlay {\n        display: block;\n        position: fixed;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        z-index: 900;\n        background-color: #55595c;\n        opacity: 0; }\n\n      .off-canvas-menu {\n        display: block;\n        position: fixed;\n        z-index: 1000;\n        background-color: #fff; }\n        .off-canvas-menu.off-canvas-menu-left {\n          top: 0;\n          left: 0;\n          bottom: 0;\n          transform: translate(-100%, 0);\n          width: 75%; }\n        .off-canvas-menu.off-canvas-menu-right {\n          top: 0;\n          right: 0;\n          bottom: 0;\n          transform: translate(100%, 0);\n          width: 75%; }\n        .off-canvas-menu.off-canvas-menu-top {\n          top: 0;\n          left: 0;\n          right: 0;\n          transform: translate(0, -100%);\n          height: 75%; }\n        .off-canvas-menu.off-canvas-menu-bottom {\n          left: 0;\n          right: 0;\n          bottom: 0;\n          transform: translate(0, 100%);\n          height: 75%; }\n    "],
      directives: [OffCanvasMenuClose],
      animations: [core_3.trigger("open", [core_3.state("open", core_3.style({transform: "translate(0,0)"})), core_3.transition("void => open", [core_3.animate("200ms ease")]), core_3.transition("open => void", [core_3.animate("200ms ease")])]), core_3.trigger("fade", [core_3.state("in", core_3.style({opacity: ".75"})), core_3.transition("void => in", [core_3.animate("200ms ease")]), core_3.transition("in => void", [core_3.animate("200ms ease")])])]
    }), __metadata('design:paramtypes', [])], OffCanvasMenu);
    return OffCanvasMenu;
  }());
  exports.OffCanvasMenu = OffCanvasMenu;
  var offCanvasMenuDirectives = [OffCanvasMenu, OffCanvasMenuClose];
  var FuiOffCanvasMenuModule = (function() {
    function FuiOffCanvasMenuModule() {}
    FuiOffCanvasMenuModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: offCanvasMenuDirectives,
      exports: offCanvasMenuDirectives
    }), __metadata('design:paramtypes', [])], FuiOffCanvasMenuModule);
    return FuiOffCanvasMenuModule;
  }());
  exports.FuiOffCanvasMenuModule = FuiOffCanvasMenuModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/Accordion/accordionItem", ["@angular/core", "../../animations/Collapse/Collapse"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var Collapse_1 = $__require('../../animations/Collapse/Collapse');
  var AccordionItem = (function() {
    function AccordionItem() {
      this.disabled = false;
      this.openChange = new core_1.EventEmitter();
    }
    AccordionItem.prototype.ngOnInit = function() {};
    AccordionItem.prototype.toggleOpen = function(event) {
      event.preventDefault();
      if (!this.disabled) {
        this.open = !this.open;
        this.openChange.next(this.open);
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], AccordionItem.prototype, "heading", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], AccordionItem.prototype, "disabled", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], AccordionItem.prototype, "openChange", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], AccordionItem.prototype, "open", void 0);
    AccordionItem = __decorate([core_1.Component({
      selector: 'accordion-item, [accordion-item]',
      template: "\n      <div (click)=\"toggleOpen($event)\">\n          <span *ngIf=\"heading\" class=\"fuel-ui-clickable\" \n              [ngClass]=\"{'text-muted': disabled}\">\n              {{heading}}\n          </span>\n          <ng-content select=\"accordion-heading\"></ng-content>\n          <ng-content select=\"[accordion-heading]\"></ng-content>\n      </div>\n      <div class=\"fuel-ui-collapse\" [@collapse]=\"!open ? 'true' : 'false'\">\n          <ng-content></ng-content>\n      </div>\n    ",
      animations: [Collapse_1.Collapse(350)]
    }), __metadata('design:paramtypes', [])], AccordionItem);
    return AccordionItem;
  }());
  exports.AccordionItem = AccordionItem;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/Accordion/Accordion", ["@angular/core", "@angular/common", "./accordionItem", "../../animations/Collapse/Collapse"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var accordionItem_1 = $__require('./accordionItem');
  var Collapse_1 = $__require('../../animations/Collapse/Collapse');
  var Accordion = (function() {
    function Accordion() {
      this.closeOthers = true;
      this.duration = 250;
      this.itemEvents = [];
    }
    Accordion.prototype.ngAfterContentInit = function() {
      var _this = this;
      this.items.changes.subscribe(function(i) {
        return _this.registerItems();
      });
      this.registerItems();
    };
    Accordion.prototype.registerItems = function() {
      var _this = this;
      for (var _i = 0,
          _a = this.itemEvents; _i < _a.length; _i++) {
        var event_1 = _a[_i];
        event_1.unsubscribe();
      }
      var _loop_1 = function(item) {
        item.openChange.subscribe(function() {
          _this.closeOtherItems(item);
        });
      };
      for (var _b = 0,
          _c = this.items.toArray(); _b < _c.length; _b++) {
        var item = _c[_b];
        _loop_1(item);
      }
    };
    Accordion.prototype.closeOtherItems = function(openItem) {
      if (!this.closeOthers)
        return;
      this.items.forEach(function(item) {
        if (item !== openItem) {
          item.open = false;
        }
      });
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Accordion.prototype, "closeOthers", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Accordion.prototype, "duration", void 0);
    __decorate([core_1.ContentChildren(accordionItem_1.AccordionItem), __metadata('design:type', core_1.QueryList)], Accordion.prototype, "items", void 0);
    Accordion = __decorate([core_1.Component({
      selector: 'accordion',
      template: "<ng-content></ng-content>",
      animations: [Collapse_1.Collapse(350)]
    }), __metadata('design:paramtypes', [])], Accordion);
    return Accordion;
  }());
  exports.Accordion = Accordion;
  var accordionComponents = [Accordion, accordionItem_1.AccordionItem];
  var FuiAccordionModule = (function() {
    function FuiAccordionModule() {}
    FuiAccordionModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: accordionComponents,
      exports: accordionComponents
    }), __metadata('design:paramtypes', [])], FuiAccordionModule);
    return FuiAccordionModule;
  }());
  exports.FuiAccordionModule = FuiAccordionModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/animations/Collapse/Collapse", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
  var core_1 = $__require('@angular/core');
  function Collapse(duration) {
    if (duration === void 0) {
      duration = 300;
    }
    return core_1.trigger('collapse', [core_1.state('collapsed, true, void', core_1.style({
      height: '0',
      opacity: '0',
      overflow: 'hidden'
    })), core_1.state('expanded, false', core_1.style({
      height: '*',
      opacity: '1',
      overflow: 'hidden'
    })), core_1.transition('true => false, collapsed => expanded', [core_1.animate(duration + 'ms ease', core_1.keyframes([core_1.style({opacity: '1'}), core_1.style({height: '*'})]))]), core_1.transition('false => true, expanded => collapsed', [core_1.animate(duration + 'ms ease', core_1.style({height: '0'}))])]);
  }
  exports.Collapse = Collapse;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/Accordion/AccordionItem", ["@angular/core", "../../animations/Collapse/Collapse"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var Collapse_1 = $__require('../../animations/Collapse/Collapse');
  var AccordionItem = (function() {
    function AccordionItem() {
      this.disabled = false;
      this.openChange = new core_1.EventEmitter();
    }
    AccordionItem.prototype.ngOnInit = function() {};
    AccordionItem.prototype.toggleOpen = function(event) {
      event.preventDefault();
      if (!this.disabled) {
        this.open = !this.open;
        this.openChange.next(this.open);
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', String)], AccordionItem.prototype, "heading", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], AccordionItem.prototype, "disabled", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], AccordionItem.prototype, "openChange", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], AccordionItem.prototype, "open", void 0);
    AccordionItem = __decorate([core_1.Component({
      selector: 'accordion-item, [accordion-item]',
      template: "\n      <div (click)=\"toggleOpen($event)\">\n          <span *ngIf=\"heading\" class=\"fuel-ui-clickable\" \n              [ngClass]=\"{'text-muted': disabled}\">\n              {{heading}}\n          </span>\n          <ng-content select=\"accordion-heading\"></ng-content>\n          <ng-content select=\"[accordion-heading]\"></ng-content>\n      </div>\n      <div class=\"fuel-ui-collapse\" [@collapse]=\"!open ? 'true' : 'false'\">\n          <ng-content></ng-content>\n      </div>\n    ",
      animations: [Collapse_1.Collapse(350)]
    }), __metadata('design:paramtypes', [])], AccordionItem);
    return AccordionItem;
  }());
  exports.AccordionItem = AccordionItem;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/Alert/Alert", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var Alert = (function(_super) {
    __extends(Alert, _super);
    function Alert(_el) {
      _super.call(this);
      this._el = _el;
      this.displayed = false;
      this.closeButton = true;
      this.type = 'success';
      this.closeDelay = 0;
      this.displayedChange = new core_1.EventEmitter();
    }
    Alert.prototype.ngOnChanges = function(event) {
      var _this = this;
      if (this.displayed && this._el.nativeElement.querySelector('.alert')) {
        var classes = this._el.nativeElement.querySelector('.alert').className;
        classes = classes.replace('fuel-ui-alert-fade-out', 'fuel-ui-alert-fade-in');
        this._el.nativeElement.querySelector('.alert').className = classes;
      }
      if (this.closeDelay > 0) {
        setTimeout(function() {
          _this.close();
        }, this.closeDelay);
      }
    };
    Alert.prototype.close = function() {
      var _this = this;
      if (this._el.nativeElement.querySelector('.alert')) {
        var classes = this._el.nativeElement.querySelector('.alert').className;
        classes = classes.replace('fuel-ui-alert-fade-in', 'fuel-ui-alert-fade-out');
        this._el.nativeElement.querySelector('.alert').className = classes;
      }
      setTimeout(function() {
        _this.displayed = false;
        _this.displayedChange.next(null);
      }, 1000);
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Alert.prototype, "displayed", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Alert.prototype, "closeButton", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Alert.prototype, "type", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], Alert.prototype, "closeDelay", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], Alert.prototype, "displayedChange", void 0);
    Alert = __decorate([core_1.Component({
      selector: 'alert',
      template: "\n      <div\n          *ngIf=\"displayed\"\n          role=\"alert\"\n          class=\"alert fuel-ui-alert-fade-in\"\n          [ngClass]=\"{'alert-success': type === 'success', 'alert-info': type === 'info', 'alert-warning': type === 'warning', 'alert-danger': type === 'danger' }\" >\n          <button *ngIf=\"closeButton\" (click)=\"close()\" type=\"button\" class=\"close\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&#215;</span>\n              <span class=\"sr-only\">Close</span>\n          </button>\n          <ng-content></ng-content>\n      </div>\n    "
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Alert);
    return Alert;
  }(core_1.OnChanges));
  exports.Alert = Alert;
  var FuiAlertModule = (function() {
    function FuiAlertModule() {}
    FuiAlertModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: [Alert],
      exports: [Alert]
    }), __metadata('design:paramtypes', [])], FuiAlertModule);
    return FuiAlertModule;
  }());
  exports.FuiAlertModule = FuiAlertModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/Carousel/Carousel", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var core_2 = $__require('@angular/core');
  var core_3 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var core_4 = $__require('@angular/core');
  var CarouselItem = (function() {
    function CarouselItem(_change, element) {
      this._change = _change;
      this.id = 0;
      this._state = "void";
      this.element = element.nativeElement;
    }
    Object.defineProperty(CarouselItem.prototype, "state", {
      get: function() {
        return this._state;
      },
      set: function(val) {
        var _this = this;
        this._state = val;
        setTimeout(function() {
          _this._change.markForCheck();
        }, 1);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(CarouselItem.prototype, "isActive", {
      get: function() {
        return this.state == "in";
      },
      enumerable: true,
      configurable: true
    });
    CarouselItem.prototype.getTotalHeight = function() {
      var height = this.element.clientHeight;
      if (height > 1)
        return height;
      var child = this.element.firstElementChild;
      while (child != null) {
        height += child.offsetHeight;
        child = child.nextElementSibling;
      }
      return height;
    };
    CarouselItem = __decorate([core_1.Component({
      selector: ".carousel-item",
      changeDetection: core_3.ChangeDetectionStrategy.OnPush,
      template: "\n        <div [@slide]=\"state\" class=\"item-content\">\n            <ng-content></ng-content>\n        </div>\n    ",
      animations: [core_4.trigger("slide", [core_4.state("right", core_4.style({transform: "translate(100%,0)"})), core_4.state("in, void", core_4.style({transform: "translate(0,0)"})), core_4.state("left", core_4.style({transform: "translate(-100%, 0)"})), core_4.transition("right <=> in", [core_4.animate("300ms ease")]), core_4.transition("left <=> in", [core_4.animate("300ms ease")])])]
    }), __metadata('design:paramtypes', [core_3.ChangeDetectorRef, core_2.ElementRef])], CarouselItem);
    return CarouselItem;
  }());
  exports.CarouselItem = CarouselItem;
  var Carousel = (function() {
    function Carousel(_change, element) {
      this._change = _change;
      this.hammerInitialized = false;
      this.items = [];
      this._activeIndex = 0;
      this._intervalRef = null;
      this.innerHeight = 0;
      this.panDirection = 0;
      this.lastPanOffset = 0;
      this.element = element.nativeElement;
    }
    Object.defineProperty(Carousel.prototype, "activeIndex", {
      get: function() {
        return this._activeIndex;
      },
      set: function(val) {
        if (this.items.length == 0) {
          this._activeIndex = -1;
          return;
        }
        this._activeIndex = val;
        for (var i in this.items) {
          var itemIndex = parseInt(i);
          if (i == val.toString())
            this.items[i].state = "in";
          else if (itemIndex == this.getRelativeIndex(-1))
            this.items[i].state = "left";
          else if (itemIndex == this.getRelativeIndex(1))
            this.items[i].state = "right";
          else
            this.items[i].state = "right";
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Carousel.prototype, "interval", {
      set: function(val) {
        var _this = this;
        if (this._intervalRef != null) {
          clearInterval(this._intervalRef);
          this._intervalRef = null;
        }
        if (val > 0)
          setInterval(function() {
            _this.next();
          }, val);
      },
      enumerable: true,
      configurable: true
    });
    Carousel.prototype.ngAfterContentInit = function() {
      var _this = this;
      this.itemQuery.changes.subscribe(function() {
        return _this.registerItems();
      });
      this.registerItems();
    };
    Carousel.prototype.ngAfterContentChecked = function() {
      this.updateInnerHeight();
    };
    Carousel.prototype.ngAfterViewInit = function() {
      var _this = this;
      if (!this.hammerInitialized && typeof Hammer !== "undefined") {
        var hammer = new Hammer(this.element);
        hammer.on('swiperight', function(ev) {
          _this.prev();
        });
        hammer.on('swipeleft', function(ev) {
          _this.next();
        });
        this.hammerInitialized = true;
      }
    };
    Carousel.prototype.ngOnDestroy = function() {
      if (this._intervalRef != null) {
        clearInterval(this._intervalRef);
        this._intervalRef = null;
      }
    };
    Carousel.prototype.registerItems = function() {
      this.items = [];
      if (this.itemQuery.length == 0)
        return;
      var itemArray = this.itemQuery.toArray();
      for (var i in itemArray)
        itemArray[i].id = i;
      this.items = this.itemQuery.toArray();
      this.activeIndex = this.items.reduce(function(prev, current, index) {
        if (prev != -1 && current.isActive || !current.isActive) {
          return prev;
        } else
          return index;
      }, -1);
      if (this.activeIndex == -1)
        this.activeIndex = 0;
      this.updateInnerHeight();
    };
    Carousel.prototype.updateInnerHeight = function() {
      this.innerHeight = this.items[this.activeIndex].getTotalHeight();
      if (this.innerHeight < 1)
        this.innerHeight = 250;
      this._change.markForCheck();
    };
    Carousel.prototype.getRelativeItem = function(rel) {
      if (this.items.length == 1)
        return this.items[0];
      return this.items[this.getRelativeIndex(rel)];
    };
    Carousel.prototype.getRelativeIndex = function(rel) {
      var target = this.activeIndex + rel;
      if (this.items.length == 0)
        return null;
      if (target < 0)
        target = this.items.length - 1;
      else if (target > (this.items.length - 1))
        target = 0;
      return target;
    };
    Carousel.prototype.navigateTo = function(item) {
      var index = this.items.indexOf(item);
      if (index > this.activeIndex)
        this.next(item);
      else
        this.prev(item);
    };
    Carousel.prototype.prev = function(item) {
      if (item === void 0) {
        item = null;
      }
      if (this.items.length < 2)
        return;
      this.activeIndex = this.getRelativeIndex(-1);
      this._change.markForCheck();
    };
    Carousel.prototype.next = function(item) {
      if (item === void 0) {
        item = null;
      }
      if (this.items.length < 2)
        return;
      this.activeIndex = this.getRelativeIndex(1);
      this._change.markForCheck();
    };
    Carousel.prototype.swipeleft = function() {
      if (this.panDirection == 0)
        this.next();
    };
    Carousel.prototype.swiperight = function() {
      if (this.panDirection == 0)
        this.prev();
    };
    __decorate([core_3.Input(), __metadata('design:type', Number), __metadata('design:paramtypes', [Number])], Carousel.prototype, "interval", null);
    __decorate([core_2.ContentChildren(CarouselItem), __metadata('design:type', core_2.QueryList)], Carousel.prototype, "itemQuery", void 0);
    Carousel = __decorate([core_1.Component({
      selector: "carousel",
      template: "\n      <div class=\"carousel slide\" >\n        <!--(swiperight)=\"prev()\" (swipeleft)=\"next()\"-->\n        <!--(pan)=\"pan($event)\" (panleft)=\"panleft($event)\" (panright)=\"panright($event)\"\n        (panend)=\"panend($event)\"-->\n        <ol class=\"carousel-indicators\">\n          <!--<li *ngFor=\"let image of images\"\n            (click)=\"switchTo(image)\" [class.active]=\"image.isActive && !image.checkIfAnimating()\">\n            </li> -->\n            <li *ngFor=\"let item of items\"\n              [class.active]=\"item.isActive\"\n              (click)=\"navigateTo(item)\">\n            </li>\n        </ol>\n        <div class=\"carousel-inner\" role=\"listbox\"\n          [style.height.px]=\"innerHeight\">\n            <ng-content select=\"carousel-item,.carousel-item\"></ng-content>\n        </div>\n        <a class=\"left carousel-control\" role=\"button\" (click)=\"prev()\">\n          <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n          <span class=\"sr-only\">Previous</span>\n        </a>\n        <a class=\"right carousel-control\" role=\"button\" (click)=\"next()\">\n          <span class=\"icon-next\" aria-hidden=\"true\"></span>\n          <span class=\"sr-only\">Next</span>\n        </a>\n      </div>\n    ",
      directives: [CarouselItem],
      changeDetection: core_3.ChangeDetectionStrategy.OnPush
    }), __metadata('design:paramtypes', [core_3.ChangeDetectorRef, core_2.ElementRef])], Carousel);
    return Carousel;
  }());
  exports.Carousel = Carousel;
  var carouselDirectives = [Carousel, CarouselItem];
  var FuiCarouselModule = (function() {
    function FuiCarouselModule() {}
    FuiCarouselModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: carouselDirectives,
      exports: carouselDirectives
    }), __metadata('design:paramtypes', [])], FuiCarouselModule);
    return FuiCarouselModule;
  }());
  exports.FuiCarouselModule = FuiCarouselModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/Modal/Modal", ["@angular/core", "@angular/common", "../../directives/animation/animation"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var animation_1 = $__require('../../directives/animation/animation');
  var Modal = (function() {
    function Modal(el) {
      this.displayed = false;
      this.closeOnUnfocus = true;
      this.closeButton = true;
      this.modalTitle = '';
      this.size = '';
      this.close = new core_1.EventEmitter();
      this.open = new core_1.EventEmitter();
      this._el = el.nativeElement;
    }
    Modal.prototype.clickElement = function(e) {
      if (this.closeOnUnfocus) {
        if ((e.target && (e.target.className == 'modal customFadeIn' || e.target.className == 'modal-dialog')) || (e.srcElement && (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')))
          this.closeModal();
      }
    };
    Modal.prototype.getElement = function() {
      return this._el;
    };
    Modal.prototype.closeModal = function() {
      this.showModal(false);
      this.close.next(null);
      return false;
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
        this.open.next(null);
      } else {
        body.classList.remove('modal-open');
        if (this.closeOnUnfocus) {
          this._el.childNodes[0].removeEventListener('click', function(e) {
            if ((e.target && (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')) || (e.srcElement && (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')))
              _this.showModal(false);
          });
        }
      }
      return false;
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Modal.prototype, "closeOnUnfocus", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Modal.prototype, "closeButton", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Modal.prototype, "modalTitle", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], Modal.prototype, "size", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Modal.prototype, "close", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], Modal.prototype, "open", void 0);
    Modal = __decorate([core_1.Component({
      selector: 'modal',
      host: {'(click)': 'clickElement($event)'},
      template: "\n   <div class=\"modal\" [ngClass]=\"{'fuel-ui-modal-fade-in': displayed}\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" [style.display]=\"displayed ? 'block' : 'none'\">\n       <div class=\"modal-dialog\" role=\"document\" [ngClass]=\"{'modal-lg': size == 'large' || size == 'lg', 'modal-sm': size == 'small' || size == 'sm'}\">\n           <div class=\"modal-content\">\n               <div class=\"modal-header\">\n                   <button *ngIf=\"closeButton\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"closeModal()\">\n                       <span aria-hidden=\"true\">&#215;</span>\n                       <span class=\"sr-only\">Close</span>\n                   </button>\n                   <h4 class=\"modal-title\" id=\"myModalLabel\">{{modalTitle}}</h4>\n               </div>\n               <ng-content></ng-content>\n           </div>\n       </div>\n   </div>\n   <div class=\"modal-backdrop\" [ngClass]=\"{fade: displayed, in: displayed}\" [style.display]=\"displayed ? 'block' : 'none'\"></div>\n    "
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Modal);
    return Modal;
  }());
  exports.Modal = Modal;
  var FuiModalModule = (function() {
    function FuiModalModule() {}
    FuiModalModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule, animation_1.FuiAnimationModule],
      declarations: [Modal],
      exports: [Modal]
    }), __metadata('design:paramtypes', [])], FuiModalModule);
    return FuiModalModule;
  }());
  exports.FuiModalModule = FuiModalModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/Pagination/Pagination", ["@angular/core", "@angular/common", "../../pipes/range/range"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var range_1 = $__require('../../pipes/range/range');
  var Pagination = (function() {
    function Pagination() {
      this.currentPage = 1;
      this.pagesAtOnce = 5;
      this.totalPages = 10;
      this.showSteps = true;
      this.showEnds = true;
      this.showSelect = true;
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
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Pagination.prototype, "showSteps", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Pagination.prototype, "showEnds", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], Pagination.prototype, "showSelect", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], Pagination.prototype, "currentPageChange", void 0);
    Pagination = __decorate([core_1.Component({
      selector: 'pagination',
      changeDetection: core_1.ChangeDetectionStrategy.OnPush,
      properties: ["totalPages: total-pages", "pagesAtOnce: pages-at-once"],
      template: "\n      <nav class=\"fuel-ui-pagination\">\n          <ul class=\"pagination\">\n              <li *ngIf=\"showEnds\" class=\"page-item\" [class.disabled]=\"currentPage == 1\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == 1\" (click)=\"setPage(1)\" aria-label=\"First\">\n                      <span aria-hidden=\"true\">First</span>\n                      <span class=\"sr-only\">First</span>\n                  </a>\n              </li>\n              <li *ngIf=\"showSteps\" class=\"page-item\" [class.disabled]=\"currentPage == 1\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == 1\" (click)=\"setPage(currentPage - 1)\" aria-label=\"Previous\">\n                      <span aria-hidden=\"true\">&#171;</span>\n                      <span class=\"sr-only\">Previous</span>\n                  </a>\n              </li>\n              <li *ngFor=\"let page of pagesBlank | range : 1 : totalPages | slice: startingIndex : endingIndex\" class=\"page-item\" [class.active]=\"currentPage == page\">\n                  <a class=\"page-link\" (click)=\"setPage(page)\">{{page}}</a>\n              </li>\n              <li *ngIf=\"showSteps\" class=\"page-item\" [class.disabled]=\"currentPage == totalPages\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == totalPages\" (click)=\"setPage(currentPage + 1)\" aria-label=\"Next\">\n                      <span aria-hidden=\"true\">&#187;</span>\n                      <span class=\"sr-only\">Next</span>\n                  </a>\n              </li>\n              <li *ngIf=\"showEnds\" class=\"page-item\" [class.disabled]=\"currentPage == totalPages\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == totalPages\" (click)=\"setPage(totalPages)\" aria-label=\"Last\">\n                      <span aria-hidden=\"true\">Last</span>\n                      <span class=\"sr-only\">Last</span>\n                  </a>\n              </li>\n          </ul>\n      </nav>\n\n      <div class=\"input-group col-md-3\" *ngIf=\"showSelect\">\n          <span class=\"input-group-addon\">Jump to:</span>\n          <select class=\"c-select\" (change)=\"setPage($event.target.value)\">\n              <option *ngFor=\"let page of pagesBlank | range : 1 : totalPages\" [value]=\"page\" [selected]=\"page == currentPage\">{{page}}</option>\n          </select>\n      </div>\n    "
    }), __metadata('design:paramtypes', [])], Pagination);
    return Pagination;
  }());
  exports.Pagination = Pagination;
  var FuiPaginationModule = (function() {
    function FuiPaginationModule() {}
    FuiPaginationModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule, range_1.FuiRangePipeModule],
      declarations: [Pagination],
      exports: [Pagination]
    }), __metadata('design:paramtypes', [])], FuiPaginationModule);
    return FuiPaginationModule;
  }());
  exports.FuiPaginationModule = FuiPaginationModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/InfiniteScroller/InfiniteScroller", ["@angular/core", "../../utilities/utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var utilities_1 = $__require('../../utilities/utilities');
  var ScrollItem = (function() {
    function ScrollItem(element) {
      this.element = element.nativeElement;
    }
    Object.defineProperty(ScrollItem.prototype, "height", {
      get: function() {
        return utilities_1.ElementUtils.outerHeight(this.element);
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
      this.container = this.container.querySelector(".scroll-container");
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
      var itemBottom = itemTop + utilities_1.ElementUtils.outerHeight(item.element);
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
    InfiniteScroller.prototype.scrollTo = function(position, animate) {
      if (animate === void 0) {
        animate = true;
      }
      if (animate)
        utilities_1.ElementUtils.scrollTo(this.container, position, 400);
      else
        this.container.scrollTop = position;
    };
    InfiniteScroller.prototype.scrollToIndex = function(index, animate) {
      if (animate === void 0) {
        animate = true;
      }
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
      this.scrollTo(targetPos, animate);
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
      template: "\n        <div class=\"scroll-outer\" [class.hide-scrollbar]=\"hideScrollbar\">\n            <div class=\"scroll-container\"\n                (scroll)=\"doscroll($event)\"\n                [style.height]=\"height\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
      styles: ["\n        .scroll-container {\n            overflow-y: scroll;\n            overflow-x: hidden;\n            max-height: 100%;\n        }\n\n        .scroll-outer.hide-scrollbar .scroll-container {\n            margin-right: -16px;\n        }\n\n        .scroll-content {\n            overflow: auto;\n        }\n    "]
    }), __metadata('design:paramtypes', [core_1.ElementRef])], InfiniteScroller);
    return InfiniteScroller;
  }());
  exports.InfiniteScroller = InfiniteScroller;
  var infiniteScrollerDirectives = [InfiniteScroller, ScrollItem];
  var FuiInfiniteScrollerModule = (function() {
    function FuiInfiniteScrollerModule() {}
    FuiInfiniteScrollerModule = __decorate([core_1.NgModule({
      imports: [],
      declarations: infiniteScrollerDirectives,
      exports: infiniteScrollerDirectives
    }), __metadata('design:paramtypes', [])], FuiInfiniteScrollerModule);
    return FuiInfiniteScrollerModule;
  }());
  exports.FuiInfiniteScrollerModule = FuiInfiniteScrollerModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/Dropdown/Dropdown", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
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
  var FuiDropdownModule = (function() {
    function FuiDropdownModule() {}
    FuiDropdownModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: [Dropdown],
      exports: [Dropdown]
    }), __metadata('design:paramtypes', [])], FuiDropdownModule);
    return FuiDropdownModule;
  }());
  exports.FuiDropdownModule = FuiDropdownModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/Tab/Tab", ["@angular/core", "@angular/common", "./TabSet"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
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
  var tabComponents = [Tab, TabSet_1.TabSet];
  var FuiTabModule = (function() {
    function FuiTabModule() {}
    FuiTabModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: tabComponents,
      exports: tabComponents
    }), __metadata('design:paramtypes', [])], FuiTabModule);
    return FuiTabModule;
  }());
  exports.FuiTabModule = FuiTabModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/Tab/TabSet", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
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
      this.destroyed = true;
    };
    TabSet.prototype.addTab = function(tab) {
      this.tabs.push(tab);
      tab.active = this.tabs.length === 1 && tab.active !== false;
    };
    TabSet.prototype.removeTab = function(tab) {
      var index = this.tabs.indexOf(tab);
      if (index === -1 || this.destroyed) {
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
      template: "\n      <ul class=\"nav\" [ngClass]=\"classMap\" (click)=\"$event.preventDefault()\">\n          <li *ngFor=\"let tab of tabs\" class=\"nav-item\"\n              [class.active]=\"tab.active\" [class.disabled]=\"tab.disabled\">\n              <a href class=\"nav-link\" [class.active]=\"tab.active\" \n                  [class.disabled]=\"tab.disabled\" (click)=\"tab.active = true\">\n                  <span [innerHtml]=\"tab.heading\"></span>\n                  <span *ngIf=\"tab.removable\" (click)=\"$event.preventDefault(); removeTab(tab);\">\n                      <i class=\"fa fa-remove\"></i>\n                  </span>\n              </a>\n          </li>\n      </ul>\n      <div class=\"tab-content\">\n          <ng-content></ng-content>\n      </div>\n    "
    }), __metadata('design:paramtypes', [])], TabSet);
    return TabSet;
  }());
  exports.TabSet = TabSet;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/TableSortable/tableSortableSorting", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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

System.registerDynamic("fuel-ui/lib/components/TableSortable/TableSortable", ["@angular/core", "@angular/common", "@angular/forms", "../../pipes/orderBy/orderBy", "../../pipes/format/format", "./tableSortableSorting", "./TableSortableColumn", "./TableSortableSorting"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var orderBy_1 = $__require('../../pipes/orderBy/orderBy');
  var format_1 = $__require('../../pipes/format/format');
  var tableSortableSorting_1 = $__require('./tableSortableSorting');
  var TableSortable = (function() {
    function TableSortable() {}
    TableSortable.prototype.selectedClass = function(column) {
      if (!column.sortable)
        return 'fuel-ui-not-sortable';
      return column.variable == this.sort.column ? 'sort-' + (this.sort.descending ? 'desc' : 'asc') : '';
    };
    TableSortable.prototype.changeSorting = function(column) {
      if (!column.sortable)
        return;
      var sort = this.sort;
      if (sort.column == column.variable) {
        sort.descending = !sort.descending;
      } else {
        sort.column = column.variable;
        sort.descending = false;
      }
    };
    TableSortable.prototype.convertSorting = function() {
      return this.sort.descending ? '-' + this.sort.column : this.sort.column;
    };
    __decorate([core_1.Input(), __metadata('design:type', Array)], TableSortable.prototype, "columns", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array)], TableSortable.prototype, "data", void 0);
    __decorate([core_1.Input(), __metadata('design:type', tableSortableSorting_1.TableSortableSorting)], TableSortable.prototype, "sort", void 0);
    TableSortable = __decorate([core_1.Component({
      selector: 'table-sortable',
      template: "\n    <div class=\"table-responsive\">\n      <table class=\"table table-bordered table-hover table-striped fuel-ui-table-sortable\">\n        <thead>\n          <tr>\n            <th *ngFor=\"let column of columns\" [class]=\"selectedClass(column)\" (click)=\"changeSorting(column)\">\n              {{column.display}}\n            </th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let object of data | orderBy : convertSorting()\">\n            <td *ngFor=\"let column of columns\" [innerHtml]=\"object[column.variable] | format : column.filter\"></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  ",
      pipes: [common_1.JsonPipe]
    }), __metadata('design:paramtypes', [])], TableSortable);
    return TableSortable;
  }());
  exports.TableSortable = TableSortable;
  var TableSortableColumn_1 = $__require('./TableSortableColumn');
  exports.TableSortableColumn = TableSortableColumn_1.TableSortableColumn;
  var TableSortableSorting_1 = $__require('./TableSortableSorting');
  exports.TableSortableSorting = TableSortableSorting_1.TableSortableSorting;
  var FuiTableSortableModule = (function() {
    function FuiTableSortableModule() {}
    FuiTableSortableModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule, forms_1.FormsModule, format_1.FuiFormatPipeModule, orderBy_1.FuiOrderByPipeModule],
      declarations: [TableSortable],
      exports: [TableSortable]
    }), __metadata('design:paramtypes', [])], FuiTableSortableModule);
    return FuiTableSortableModule;
  }());
  exports.FuiTableSortableModule = FuiTableSortableModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/TableSortable/TableSortableColumn", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
  var TableSortableColumn = (function() {
    function TableSortableColumn(display, variable, filter, sortable) {
      this.sortable = true;
      this.display = display;
      this.variable = variable;
      this.filter = filter;
      this.sortable = sortable != null ? sortable : true;
    }
    return TableSortableColumn;
  }());
  exports.TableSortableColumn = TableSortableColumn;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/TableSortable/TableSortableSorting", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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

System.registerDynamic("fuel-ui/lib/components/Tag/Tag", ["@angular/core", "@angular/common", "./TagSet"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
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
      this.remove.next(this);
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
  var tagDirectives = [Tag, TagSet_1.TagSet];
  var FuiTagModule = (function() {
    function FuiTagModule() {}
    FuiTagModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: tagDirectives,
      exports: tagDirectives
    }), __metadata('design:paramtypes', [])], FuiTagModule);
    return FuiTagModule;
  }());
  exports.FuiTagModule = FuiTagModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/Tag/TagSet", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var TagSet = (function() {
    function TagSet() {
      this.tags = [];
    }
    TagSet.prototype.ngOnDestroy = function() {
      this.destroyed = true;
    };
    TagSet.prototype.addTag = function(tag) {
      this.tags.push(tag);
    };
    TagSet.prototype.removeTag = function(tag) {
      var index = this.tags.indexOf(tag);
      if (index === -1 || this.destroyed || tag.disabled) {
        return;
      }
      tag.remove.next(tag);
      this.tags.splice(index, 1);
    };
    __decorate([core_1.Input(), __metadata('design:type', Array)], TagSet.prototype, "tags", void 0);
    TagSet = __decorate([core_1.Component({
      selector: 'tagset',
      directives: [common_1.NgClass],
      template: "\n      <span *ngFor=\"let tag of tags\" class=\"label fuel-ui-tag-label\" [ngClass]=\"tag.classMap\">\n          <span [innerHtml]=\"tag.title\"></span>\n          <span class=\"fuel-ui-clickable\" [class.disabled]=\"tag.disabled\" *ngIf=\"tag.removable\" (click)=\"$event.preventDefault(); removeTag(tag);\">\n              <i class=\"fa fa-remove\"></i>\n          </span>\n      </span>\n    "
    }), __metadata('design:paramtypes', [])], TagSet);
    return TagSet;
  }());
  exports.TagSet = TagSet;
  return module.exports;
});

System.registerDynamic('fuel-ui/lib/components/Slider/NoUiSlider', [], false, function ($__require, $__exports, $__module) {
	var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

	(function ($__global) {
		/*! nouislider - 8.3.0 - 2016-02-14 17:37:19 */

		(function (factory) {
			// Browser globals
			window.noUiSlider = factory();
		})(function () {

			'use strict';

			// Removes duplicates from an array.

			function unique(array) {
				return array.filter(function (a) {
					return !this[a] ? this[a] = true : false;
				}, {});
			}

			// Round a value to the closest 'to'.
			function closest(value, to) {
				return Math.round(value / to) * to;
			}

			// Current position of an element relative to the document.
			function offset(elem) {

				var rect = elem.getBoundingClientRect(),
				    doc = elem.ownerDocument,
				    docElem = doc.documentElement,
				    pageOffset = getPageOffset();

				// getBoundingClientRect contains left scroll in Chrome on Android.
				// I haven't found a feature detection that proves this. Worst case
				// scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
				if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
					pageOffset.x = 0;
				}

				return {
					top: rect.top + pageOffset.y - docElem.clientTop,
					left: rect.left + pageOffset.x - docElem.clientLeft
				};
			}

			// Checks whether a value is numerical.
			function isNumeric(a) {
				return typeof a === 'number' && !isNaN(a) && isFinite(a);
			}

			// Rounds a number to 7 supported decimals.
			function accurateNumber(number) {
				var p = Math.pow(10, 7);
				return Number((Math.round(number * p) / p).toFixed(7));
			}

			// Sets a class and removes it after [duration] ms.
			function addClassFor(element, className, duration) {
				addClass(element, className);
				setTimeout(function () {
					removeClass(element, className);
				}, duration);
			}

			// Limits a value to 0 - 100
			function limit(a) {
				return Math.max(Math.min(a, 100), 0);
			}

			// Wraps a variable as an array, if it isn't one yet.
			function asArray(a) {
				return Array.isArray(a) ? a : [a];
			}

			// Counts decimals
			function countDecimals(numStr) {
				var pieces = numStr.split(".");
				return pieces.length > 1 ? pieces[1].length : 0;
			}

			// http://youmightnotneedjquery.com/#add_class
			function addClass(el, className) {
				if (!el) return;

				if (el.classList) {
					el.classList.add(className);
				} else {
					el.className += ' ' + className;
				}
			}

			// http://youmightnotneedjquery.com/#remove_class
			function removeClass(el, className) {
				if (el.classList) {
					el.classList.remove(className);
				} else {
					el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
				}
			}

			// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
			function hasClass(el, className) {
				return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
			}

			// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
			function getPageOffset() {

				var supportPageOffset = window.pageXOffset !== undefined,
				    isCSS1Compat = (document.compatMode || "") === "CSS1Compat",
				    x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
				    y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

				return {
					x: x,
					y: y
				};
			}

			// Shorthand for stopPropagation so we don't have to create a dynamic method
			function stopPropagation(e) {
				e.stopPropagation();
			}

			// todo
			function addCssPrefix(cssPrefix) {
				return function (className) {
					return cssPrefix + className;
				};
			}

			var
			// Determine the events to bind. IE11 implements pointerEvents without
			// a prefix, which breaks compatibility with the IE10 implementation.
			/** @const */
			actions = window.navigator.pointerEnabled ? {
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

			// Value calculation

			// Determine the size of a sub-range in relation to a full range.
			function subRangeRatio(pa, pb) {
				return 100 / (pb - pa);
			}

			// (percentage) How many percent is this value of this range?
			function fromPercentage(range, value) {
				return value * 100 / (range[1] - range[0]);
			}

			// (percentage) Where is this value on this range?
			function toPercentage(range, value) {
				return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0]);
			}

			// (value) How much is this percentage on this range?
			function isPercentage(range, value) {
				return value * (range[1] - range[0]) / 100 + range[0];
			}

			// Range conversion

			function getJ(value, arr) {

				var j = 1;

				while (value >= arr[j]) {
					j += 1;
				}

				return j;
			}

			// (percentage) Input a value, find where, on a scale of 0-100, it applies.
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

				return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
			}

			// (value) Input a percentage, find where it is on the specified range.
			function fromStepping(xVal, xPct, value) {

				// There is no range group that fits 100
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

			// (percentage) Get the step that applies at a certain value.
			function getStep(xPct, xSteps, snap, value) {

				if (value === 100) {
					return value;
				}

				var j = getJ(value, xPct),
				    a,
				    b;

				// If 'snap' is set, steps are used as fixed points on the slider.
				if (snap) {

					a = xPct[j - 1];
					b = xPct[j];

					// Find the closest position, a or b.
					if (value - a > (b - a) / 2) {
						return b;
					}

					return a;
				}

				if (!xSteps[j - 1]) {
					return value;
				}

				return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
			}

			// Entry parsing

			function handleEntryPoint(index, value, that) {

				var percentage;

				// Wrap numerical input in an array.
				if (typeof value === "number") {
					value = [value];
				}

				// Reject any invalid input, by testing whether value is an array.
				if (Object.prototype.toString.call(value) !== '[object Array]') {
					throw new Error("noUiSlider: 'range' contains invalid value.");
				}

				// Covert min/max syntax to 0 and 100.
				if (index === 'min') {
					percentage = 0;
				} else if (index === 'max') {
					percentage = 100;
				} else {
					percentage = parseFloat(index);
				}

				// Check for correct input.
				if (!isNumeric(percentage) || !isNumeric(value[0])) {
					throw new Error("noUiSlider: 'range' value isn't numeric.");
				}

				// Store values.
				that.xPct.push(percentage);
				that.xVal.push(value[0]);

				// NaN will evaluate to false too, but to keep
				// logging clear, set step explicitly. Make sure
				// not to override the 'step' setting with false.
				if (!percentage) {
					if (!isNaN(value[1])) {
						that.xSteps[0] = value[1];
					}
				} else {
					that.xSteps.push(isNaN(value[1]) ? false : value[1]);
				}
			}

			function handleStepPoint(i, n, that) {

				// Ignore 'false' stepping.
				if (!n) {
					return true;
				}

				// Factor to range ratio
				that.xSteps[i] = fromPercentage([that.xVal[i], that.xVal[i + 1]], n) / subRangeRatio(that.xPct[i], that.xPct[i + 1]);
			}

			// Interface

			// The interface to Spectrum handles all direction-based
			// conversions, so the above values are unaware.

			function Spectrum(entry, snap, direction, singleStep) {

				this.xPct = [];
				this.xVal = [];
				this.xSteps = [singleStep || false];
				this.xNumSteps = [false];

				this.snap = snap;
				this.direction = direction;

				var index,
				    ordered = [/* [0, 'min'], [1, '50%'], [2, 'max'] */];

				// Map the object keys to an array.
				for (index in entry) {
					if (entry.hasOwnProperty(index)) {
						ordered.push([entry[index], index]);
					}
				}

				// Sort all entries by value (numeric sort).
				if (ordered.length && typeof ordered[0][0] === "object") {
					ordered.sort(function (a, b) {
						return a[0][0] - b[0][0];
					});
				} else {
					ordered.sort(function (a, b) {
						return a[0] - b[0];
					});
				}

				// Convert all entries to subranges.
				for (index = 0; index < ordered.length; index++) {
					handleEntryPoint(ordered[index][1], ordered[index][0], this);
				}

				// Store the actual step values.
				// xSteps is sorted in the same order as xPct and xVal.
				this.xNumSteps = this.xSteps.slice(0);

				// Convert all numeric steps to the percentage of the subrange they represent.
				for (index = 0; index < this.xNumSteps.length; index++) {
					handleStepPoint(index, this.xNumSteps[index], this);
				}
			}

			Spectrum.prototype.getMargin = function (value) {
				return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
			};

			Spectrum.prototype.toStepping = function (value) {

				value = toStepping(this.xVal, this.xPct, value);

				// Invert the value if this is a right-to-left slider.
				if (this.direction) {
					value = 100 - value;
				}

				return value;
			};

			Spectrum.prototype.fromStepping = function (value) {

				// Invert the value if this is a right-to-left slider.
				if (this.direction) {
					value = 100 - value;
				}

				return accurateNumber(fromStepping(this.xVal, this.xPct, value));
			};

			Spectrum.prototype.getStep = function (value) {

				// Find the proper step for rtl sliders by search in inverse direction.
				// Fixes issue #262.
				if (this.direction) {
					value = 100 - value;
				}

				value = getStep(this.xPct, this.xSteps, this.snap, value);

				if (this.direction) {
					value = 100 - value;
				}

				return value;
			};

			Spectrum.prototype.getApplicableStep = function (value) {

				// If the value is 100%, return the negative step twice.
				var j = getJ(value, this.xPct),
				    offset = value === 100 ? 2 : 1;
				return [this.xNumSteps[j - 2], this.xVal[j - offset], this.xNumSteps[j - offset]];
			};

			// Outside testing
			Spectrum.prototype.convert = function (value) {
				return this.getStep(this.toStepping(value));
			};

			/*	Every input option is tested and parsed. This'll prevent
   	endless validation in internal methods. These tests are
   	structured with an item for every option available. An
   	option can be marked as required by setting the 'r' flag.
   	The testing function is provided with three arguments:
   		- The provided value for the option;
   		- A reference to the options object;
   		- The name for the option;
   
   	The testing function returns false when an error is detected,
   	or true when everything is OK. It can also modify the option
   	object, to make sure all values can be correctly looped elsewhere. */

			var defaultFormatter = { 'to': function (value) {
					return value !== undefined && value.toFixed(2);
				}, 'from': Number };

			function testStep(parsed, entry) {

				if (!isNumeric(entry)) {
					throw new Error("noUiSlider: 'step' is not numeric.");
				}

				// The step option can still be used to set stepping
				// for linear sliders. Overwritten if set in 'range'.
				parsed.singleStep = entry;
			}

			function testRange(parsed, entry) {

				// Filter incorrect input.
				if (typeof entry !== 'object' || Array.isArray(entry)) {
					throw new Error("noUiSlider: 'range' is not an object.");
				}

				// Catch missing start or end.
				if (entry.min === undefined || entry.max === undefined) {
					throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
				}

				// Catch equal start or end.
				if (entry.min === entry.max) {
					throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
				}

				parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed.singleStep);
			}

			function testStart(parsed, entry) {

				entry = asArray(entry);

				// Validate input. Values aren't tested, as the public .val method
				// will always provide a valid location.
				if (!Array.isArray(entry) || !entry.length || entry.length > 2) {
					throw new Error("noUiSlider: 'start' option is incorrect.");
				}

				// Store the number of handles.
				parsed.handles = entry.length;

				// When the slider is initialized, the .val method will
				// be called with the start options.
				parsed.start = entry;
			}

			function testSnap(parsed, entry) {

				// Enforce 100% stepping within subranges.
				parsed.snap = entry;

				if (typeof entry !== 'boolean') {
					throw new Error("noUiSlider: 'snap' option must be a boolean.");
				}
			}

			function testAnimate(parsed, entry) {

				// Enforce 100% stepping within subranges.
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

				// Set orientation to an a numerical value for easy
				// array selection.
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

				// Issue #582
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

				// Set direction as a numerical value for easy parsing.
				// Invert connection for RTL sliders, so that the proper
				// handles get the connect/background classes.
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

				// Make sure the input is a string.
				if (typeof entry !== 'string') {
					throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
				}

				// Check if the string contains any keywords.
				// None are required.
				var tap = entry.indexOf('tap') >= 0,
				    drag = entry.indexOf('drag') >= 0,
				    fixed = entry.indexOf('fixed') >= 0,
				    snap = entry.indexOf('snap') >= 0,
				    hover = entry.indexOf('hover') >= 0;

				// Fix #472
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

					parsed.tooltips.forEach(function (formatter) {
						if (typeof formatter !== 'boolean' && (typeof formatter !== 'object' || typeof formatter.to !== 'function')) {
							throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
						}
					});
				}
			}

			function testFormat(parsed, entry) {

				parsed.format = entry;

				// Any object with a to and from method is supported.
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

			// Test all developer settings and parse to assumption-safe values.
			function testOptions(options) {

				// To prove a fix for #537, freeze options here.
				// If the object is modified, an error will be thrown.
				// Object.freeze(options);

				var parsed = {
					margin: 0,
					limit: 0,
					animate: true,
					format: defaultFormatter
				},
				    tests;

				// Tests are executed in the order they are presented here.
				tests = {
					'step': { r: false, t: testStep },
					'start': { r: true, t: testStart },
					'connect': { r: true, t: testConnect },
					'direction': { r: true, t: testDirection },
					'snap': { r: false, t: testSnap },
					'animate': { r: false, t: testAnimate },
					'range': { r: true, t: testRange },
					'orientation': { r: false, t: testOrientation },
					'margin': { r: false, t: testMargin },
					'limit': { r: false, t: testLimit },
					'behaviour': { r: true, t: testBehaviour },
					'format': { r: false, t: testFormat },
					'tooltips': { r: false, t: testTooltips },
					'cssPrefix': { r: false, t: testCssPrefix }
				};

				var defaults = {
					'connect': false,
					'direction': 'ltr',
					'behaviour': 'tap',
					'orientation': 'horizontal'
				};

				// Run all options through a testing mechanism to ensure correct
				// input. It should be noted that options might get modified to
				// be handled properly. E.g. wrapping integers in arrays.
				Object.keys(tests).forEach(function (name) {

					// If the option isn't set, but it is required, throw an error.
					if (options[name] === undefined && defaults[name] === undefined) {

						if (tests[name].r) {
							throw new Error("noUiSlider: '" + name + "' is required.");
						}

						return true;
					}

					tests[name].t(parsed, options[name] === undefined ? defaults[name] : options[name]);
				});

				// Forward pips options
				parsed.pips = options.pips;

				// Pre-define the styles.
				parsed.style = parsed.ort ? 'top' : 'left';

				return parsed;
			}

			function closure(target, options) {

				// All variables local to 'closure' are prefixed with 'scope_'
				var scope_Target = target,
				    scope_Locations = [-1, -1],
				    scope_Base,
				    scope_Handles,
				    scope_Spectrum = options.spectrum,
				    scope_Values = [],
				    scope_Events = {},
				    scope_Self;

				var cssClasses = [
				/*  0 */'target'
				/*  1 */, 'base'
				/*  2 */, 'origin'
				/*  3 */, 'handle'
				/*  4 */, 'horizontal'
				/*  5 */, 'vertical'
				/*  6 */, 'background'
				/*  7 */, 'connect'
				/*  8 */, 'ltr'
				/*  9 */, 'rtl'
				/* 10 */, 'draggable'
				/* 11 */, ''
				/* 12 */, 'state-drag'
				/* 13 */, ''
				/* 14 */, 'state-tap'
				/* 15 */, 'active'
				/* 16 */, ''
				/* 17 */, 'stacking'
				/* 18 */, 'tooltip'
				/* 19 */, ''
				/* 20 */, 'pips'
				/* 21 */, 'marker'
				/* 22 */, 'value'].map(addCssPrefix(options.cssPrefix || defaultCssPrefix));

				// Delimit proposed values for handle positions.
				function getPositions(a, b, delimit) {

					// Add movement to current position.
					var c = a + b[0],
					    d = a + b[1];

					// Only alter the other position on drag,
					// not on standard sliding.
					if (delimit) {
						if (c < 0) {
							d += Math.abs(c);
						}
						if (d > 100) {
							c -= d - 100;
						}

						// Limit values to 0 and 100.
						return [limit(c), limit(d)];
					}

					return [c, d];
				}

				// Provide a clean event with standardized offset values.
				function fixEvent(e, pageOffset) {

					// Prevent scrolling and panning on touch events, while
					// attempting to slide. The tap event also depends on this.
					e.preventDefault();

					// Filter the event to register the type, which can be
					// touch, mouse or pointer. Offset changes need to be
					// made on an event specific basis.
					var touch = e.type.indexOf('touch') === 0,
					    mouse = e.type.indexOf('mouse') === 0,
					    pointer = e.type.indexOf('pointer') === 0,
					    x,
					    y,
					    event = e;

					// IE10 implemented pointer events with a prefix;
					if (e.type.indexOf('MSPointer') === 0) {
						pointer = true;
					}

					if (touch) {
						// noUiSlider supports one movement at a time,
						// so we can select the first 'changedTouch'.
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
					event.cursor = mouse || pointer; // Fix #435

					return event;
				}

				// Append a handle to the base.
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

				// Add the proper connection classes.
				function addConnection(connect, target, handles) {

					// Apply the required connection classes to the elements
					// that need them. Some classes are made up for several
					// segments listed in the class list, to allow easy
					// renaming and provide a minor compression benefit.
					switch (connect) {
						case 1:
							addClass(target, cssClasses[7]);
							addClass(handles[0], cssClasses[6]);
							break;
						case 3:
							addClass(handles[1], cssClasses[6]);
						/* falls through */
						case 2:
							addClass(handles[0], cssClasses[7]);
						/* falls through */
						case 0:
							addClass(target, cssClasses[6]);
							break;
					}
				}

				// Add handles to the slider base.
				function addHandles(nrHandles, direction, base) {

					var index,
					    handles = [];

					// Append handles.
					for (index = 0; index < nrHandles; index += 1) {

						// Keep a list of all added handles.
						handles.push(base.appendChild(addHandle(direction, index)));
					}

					return handles;
				}

				// Initialize a single slider.
				function addSlider(direction, orientation, target) {

					// Apply classes and data to the target.
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

				// The tooltips option is a shorthand for using the 'update' event.
				function tooltips() {

					if (options.dir) {
						options.tooltips.reverse();
					}

					// Tooltips are added with options.tooltips in original order.
					var tips = scope_Handles.map(addTooltip);

					if (options.dir) {
						tips.reverse();
						options.tooltips.reverse();
					}

					bindEvent('update', function (f, o, r) {
						if (tips[o]) {
							tips[o].innerHTML = options.tooltips[o] === true ? f[o] : options.tooltips[o].to(r[o]);
						}
					});
				}

				function getGroup(mode, values, stepped) {

					// Use the range.
					if (mode === 'range' || mode === 'steps') {
						return scope_Spectrum.xVal;
					}

					if (mode === 'count') {

						// Divide 0 - 100 in 'count' parts.
						var spread = 100 / (values - 1),
						    v,
						    i = 0;
						values = [];

						// List these parts and have them handled as 'positions'.
						while ((v = i++ * spread) <= 100) {
							values.push(v);
						}

						mode = 'positions';
					}

					if (mode === 'positions') {

						// Map all percentages to on-range values.
						return values.map(function (value) {
							return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
						});
					}

					if (mode === 'values') {

						// If the value must be stepped, it needs to be converted to a percentage first.
						if (stepped) {

							return values.map(function (value) {

								// Convert to percentage, apply step, return to value.
								return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
							});
						}

						// Otherwise, we can simply use the values.
						return values;
					}
				}

				function generateSpread(density, mode, group) {

					function safeIncrement(value, increment) {
						// Avoid floating point variance by dropping the smallest decimal places.
						return (value + increment).toFixed(7) / 1;
					}

					var originalSpectrumDirection = scope_Spectrum.direction,
					    indexes = {},
					    firstInRange = scope_Spectrum.xVal[0],
					    lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1],
					    ignoreFirst = false,
					    ignoreLast = false,
					    prevPct = 0;

					// This function loops the spectrum in an ltr linear fashion,
					// while the toStepping method is direction aware. Trick it into
					// believing it is ltr.
					scope_Spectrum.direction = 0;

					// Create a copy of the group, sort it and filter away all duplicates.
					group = unique(group.slice().sort(function (a, b) {
						return a - b;
					}));

					// Make sure the range starts with the first element.
					if (group[0] !== firstInRange) {
						group.unshift(firstInRange);
						ignoreFirst = true;
					}

					// Likewise for the last one.
					if (group[group.length - 1] !== lastInRange) {
						group.push(lastInRange);
						ignoreLast = true;
					}

					group.forEach(function (current, index) {

						// Get the current step and the lower + upper positions.
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

						// When using 'steps' mode, use the provided steps.
						// Otherwise, we'll step on to the next subrange.
						if (mode === 'steps') {
							step = scope_Spectrum.xNumSteps[index];
						}

						// Default to a 'full' step.
						if (!step) {
							step = high - low;
						}

						// Low can be 0, so test for false. If high is undefined,
						// we are at the last subrange. Index 0 is already handled.
						if (low === false || high === undefined) {
							return;
						}

						// Find all steps in the subrange.
						for (i = low; i <= high; i = safeIncrement(i, step)) {

							// Get the percentage value for the current step,
							// calculate the size for the subrange.
							newPct = scope_Spectrum.toStepping(i);
							pctDifference = newPct - prevPct;

							steps = pctDifference / density;
							realSteps = Math.round(steps);

							// This ratio represents the ammount of percentage-space a point indicates.
							// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
							// Round the percentage offset to an even number, then divide by two
							// to spread the offset on both sides of the range.
							stepsize = pctDifference / realSteps;

							// Divide all points evenly, adding the correct number to this subrange.
							// Run up to <= so that 100% gets a point, event if ignoreLast is set.
							for (q = 1; q <= realSteps; q += 1) {

								// The ratio between the rounded value and the actual size might be ~1% off.
								// Correct the percentage offset by the number of points
								// per subrange. density = 1 will result in 100 points on the
								// full range, 2 for 50, 4 for 25, etc.
								pctPos = prevPct + q * stepsize;
								indexes[pctPos.toFixed(5)] = ['x', 0];
							}

							// Determine the point type.
							type = group.indexOf(i) > -1 ? 1 : mode === 'steps' ? 2 : 0;

							// Enforce the 'ignoreFirst' option by overwriting the type for 0.
							if (!index && ignoreFirst) {
								type = 0;
							}

							if (!(i === high && ignoreLast)) {
								// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
								indexes[newPct.toFixed(5)] = [i, type];
							}

							// Update the percentage count.
							prevPct = newPct;
						}
					});

					// Reset the spectrum.
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

						// Apply the filter function, if it is set.
						values[1] = values[1] && filterFunc ? filterFunc(values[0], values[1]) : values[1];

						// Add a marker for every point
						out += '<div ' + getTags(offset, cssClasses[21], values) + '></div>';

						// Values are only appended for points marked '1' or '2'.
						if (values[1]) {
							out += '<div ' + getTags(offset, cssClasses[22], values) + '>' + formatter.to(values[0]) + '</div>';
						}
					}

					// Append all points.
					Object.keys(spread).forEach(function (a) {
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
					    format = grid.format || {
						to: Math.round
					};

					return scope_Target.appendChild(addMarking(spread, filter, format));
				}

				// Shorthand for base dimensions.
				function baseSize() {
					var rect = scope_Base.getBoundingClientRect(),
					    alt = 'offset' + ['Width', 'Height'][options.ort];
					return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
				}

				// External event handling
				function fireEvent(event, handleNumber, tap) {

					if (handleNumber !== undefined && options.handles !== 1) {
						handleNumber = Math.abs(handleNumber - options.dir);
					}

					Object.keys(scope_Events).forEach(function (targetEvent) {

						var eventType = targetEvent.split('.')[0];

						if (event === eventType) {
							scope_Events[targetEvent].forEach(function (callback) {

								callback.call(
								// Use the slider public API as the scope ('this')
								scope_Self,
								// Return values as array, so arg_1[arg_2] is always valid.
								asArray(valueGet()),
								// Handle index, 0 or 1
								handleNumber,
								// Unformatted slider values
								asArray(inSliderOrder(Array.prototype.slice.call(scope_Values))),
								// Event is fired by tap, true or false
								tap || false,
								// Left offset of the handle, in relation to the slider
								scope_Locations);
							});
						}
					});
				}

				// Returns the input array, respecting the slider direction configuration.
				function inSliderOrder(values) {

					// If only one handle is used, return a single value.
					if (values.length === 1) {
						return values[0];
					}

					if (options.dir) {
						return values.reverse();
					}

					return values;
				}

				// Handler for attaching events trough a proxy.
				function attach(events, element, callback, data) {

					// This function can be used to 'filter' events to the slider.
					// element is a node, not a nodeList

					var method = function (e) {

						if (scope_Target.hasAttribute('disabled')) {
							return false;
						}

						// Stop if an active 'tap' transition is taking place.
						if (hasClass(scope_Target, cssClasses[14])) {
							return false;
						}

						e = fixEvent(e, data.pageOffset);

						// Ignore right or middle clicks on start #454
						if (events === actions.start && e.buttons !== undefined && e.buttons > 1) {
							return false;
						}

						// Ignore right or middle clicks on start #454
						if (data.hover && e.buttons) {
							return false;
						}

						e.calcPoint = e.points[options.ort];

						// Call the event handler with the event [ and additional data ].
						callback(e, data);
					},
					    methods = [];

					// Bind a closure on the target for every event type.
					events.split(' ').forEach(function (eventName) {
						if (element) {
							element.addEventListener(eventName, method, false);
							methods.push([eventName, method]);
						}
					});

					return methods;
				}

				// Handle movement on document for handle and range drag.
				function move(event, data) {

					// Fix #498
					// Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
					// https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
					// IE9 has .buttons and .which zero on mousemove.
					// Firefox breaks the spec MDN defines.
					if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) {
						return end(event, data);
					}

					var handles = data.handles || scope_Handles,
					    positions,
					    state = false,
					    proposal = (event.calcPoint - data.start) * 100 / data.baseSize,
					    handleNumber = handles[0] === scope_Handles[0] ? 0 : 1,
					    i;

					// Calculate relative positions for the handles.
					positions = getPositions(proposal, data.positions, handles.length > 1);

					state = setHandle(handles[0], positions[handleNumber], handles.length === 1);

					if (handles.length > 1) {

						state = setHandle(handles[1], positions[handleNumber ? 0 : 1], false) || state;

						if (state) {
							// fire for both handles
							for (i = 0; i < data.handles.length; i++) {
								fireEvent('slide', i);
							}
						}
					} else if (state) {
						// Fire for a single handle
						fireEvent('slide', handleNumber);
					}
				}

				// Unbind move events on document, call callbacks.
				function end(event, data) {

					// The handle is no longer active, so remove the class.
					var active = scope_Base.querySelector('.' + cssClasses[15]),
					    handleNumber = data.handles[0] === scope_Handles[0] ? 0 : 1;

					if (active !== null) {
						removeClass(active, cssClasses[15]);
					}

					// Remove cursor styles and text-selection events bound to the body.
					if (event.cursor) {
						document.body.style.cursor = '';
						document.body.removeEventListener('selectstart', document.body.noUiListener);
					}

					var d = document.documentElement;

					// Unbind the move and end events, which are added on 'start'.
					d.noUiListeners.forEach(function (c) {
						d.removeEventListener(c[0], c[1]);
					});

					// Remove dragging class.
					removeClass(scope_Target, cssClasses[12]);

					// Fire the change and set events.
					fireEvent('set', handleNumber);
					fireEvent('change', handleNumber);

					// If this is a standard handle movement, fire the end event.
					if (data.handleNumber !== undefined) {
						fireEvent('end', data.handleNumber);
					}
				}

				// Fire 'end' when a mouse or pen leaves the document.
				function documentLeave(event, data) {
					if (event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null) {
						end(event, data);
					}
				}

				// Bind move events on document.
				function start(event, data) {

					var d = document.documentElement;

					// Mark the handle as 'active' so it can be styled.
					if (data.handles.length === 1) {
						addClass(data.handles[0].children[0], cssClasses[15]);

						// Support 'disabled' handles
						if (data.handles[0].hasAttribute('disabled')) {
							return false;
						}
					}

					// Fix #551, where a handle gets selected instead of dragged.
					event.preventDefault();

					// A drag should never propagate up to the 'tap' event.
					event.stopPropagation();

					// Attach the move and end events.
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

					// Text selection isn't an issue on touch devices,
					// so adding cursor styles can be skipped.
					if (event.cursor) {

						// Prevent the 'I' cursor and extend the range-drag cursor.
						document.body.style.cursor = getComputedStyle(event.target).cursor;

						// Mark the target with a dragging state.
						if (scope_Handles.length > 1) {
							addClass(scope_Target, cssClasses[12]);
						}

						var f = function () {
							return false;
						};

						document.body.noUiListener = f;

						// Prevent text selection when dragging the handles.
						document.body.addEventListener('selectstart', f, false);
					}

					if (data.handleNumber !== undefined) {
						fireEvent('start', data.handleNumber);
					}
				}

				// Move closest handle to tapped location.
				function tap(event) {

					var location = event.calcPoint,
					    total = 0,
					    handleNumber,
					    to;

					// The tap event shouldn't propagate up and cause 'edge' to run.
					event.stopPropagation();

					// Add up the handle offsets.
					scope_Handles.forEach(function (a) {
						total += offset(a)[options.style];
					});

					// Find the handle closest to the tapped position.
					handleNumber = location < total / 2 || scope_Handles.length === 1 ? 0 : 1;

					// Check if handler is not disablet if yes set number to the next handler
					if (scope_Handles[handleNumber].hasAttribute('disabled')) {
						handleNumber = handleNumber ? 0 : 1;
					}

					location -= offset(scope_Base)[options.style];

					// Calculate the new position.
					to = location * 100 / baseSize();

					if (!options.events.snap) {
						// Flag the slider as it is now in a transitional state.
						// Transition takes 300 ms, so re-enable the slider afterwards.
						addClassFor(scope_Target, cssClasses[14], 300);
					}

					// Support 'disabled' handles
					if (scope_Handles[handleNumber].hasAttribute('disabled')) {
						return false;
					}

					// Find the closest handle and calculate the tapped point.
					// The set handle to the new position.
					setHandle(scope_Handles[handleNumber], to);

					fireEvent('slide', handleNumber, true);
					fireEvent('set', handleNumber, true);
					fireEvent('change', handleNumber, true);

					if (options.events.snap) {
						start(event, { handles: [scope_Handles[handleNumber]] });
					}
				}

				// Fires a 'hover' event for a hovered mouse/pen position.
				function hover(event) {

					var location = event.calcPoint - offset(scope_Base)[options.style],
					    to = scope_Spectrum.getStep(location * 100 / baseSize()),
					    value = scope_Spectrum.fromStepping(to);

					Object.keys(scope_Events).forEach(function (targetEvent) {
						if ('hover' === targetEvent.split('.')[0]) {
							scope_Events[targetEvent].forEach(function (callback) {
								callback.call(scope_Self, value);
							});
						}
					});
				}

				// Attach events to several slider parts.
				function events(behaviour) {

					var i, drag;

					// Attach the standard drag event to the handles.
					if (!behaviour.fixed) {

						for (i = 0; i < scope_Handles.length; i += 1) {

							// These events are only bound to the visual handle
							// element, not the 'real' origin element.
							attach(actions.start, scope_Handles[i].children[0], start, {
								handles: [scope_Handles[i]],
								handleNumber: i
							});
						}
					}

					// Attach the tap event to the slider base.
					if (behaviour.tap) {

						attach(actions.start, scope_Base, tap, {
							handles: scope_Handles
						});
					}

					// Fire hover events
					if (behaviour.hover) {
						attach(actions.move, scope_Base, hover, { hover: true });
						for (i = 0; i < scope_Handles.length; i += 1) {
							['mousemove MSPointerMove pointermove'].forEach(function (eventName) {
								scope_Handles[i].children[0].addEventListener(eventName, stopPropagation, false);
							});
						}
					}

					// Make the range draggable.
					if (behaviour.drag) {

						drag = [scope_Base.querySelector('.' + cssClasses[7])];
						addClass(drag[0], cssClasses[10]);

						// When the range is fixed, the entire range can
						// be dragged by the handles. The handle in the first
						// origin will propagate the start event upward,
						// but it needs to be bound manually on the other.
						if (behaviour.fixed) {
							drag.push(scope_Handles[drag[0] === scope_Handles[0] ? 1 : 0].children[0]);
						}

						drag.forEach(function (element) {
							attach(actions.start, element, start, {
								handles: scope_Handles
							});
						});
					}
				}

				// Test suggested values and apply margin, step.
				function setHandle(handle, to, noLimitOption) {

					var trigger = handle !== scope_Handles[0] ? 1 : 0,
					    lowerMargin = scope_Locations[0] + options.margin,
					    upperMargin = scope_Locations[1] - options.margin,
					    lowerLimit = scope_Locations[0] + options.limit,
					    upperLimit = scope_Locations[1] - options.limit;

					// For sliders with multiple handles,
					// limit movement to the other handle.
					// Apply the margin option by adding it to the handle positions.
					if (scope_Handles.length > 1) {
						to = trigger ? Math.max(to, lowerMargin) : Math.min(to, upperMargin);
					}

					// The limit option has the opposite effect, limiting handles to a
					// maximum distance from another. Limit must be > 0, as otherwise
					// handles would be unmoveable. 'noLimitOption' is set to 'false'
					// for the .val() method, except for pass 4/4.
					if (noLimitOption !== false && options.limit && scope_Handles.length > 1) {
						to = trigger ? Math.min(to, lowerLimit) : Math.max(to, upperLimit);
					}

					// Handle the step option.
					to = scope_Spectrum.getStep(to);

					// Limit to 0/100 for .val input, trim anything beyond 7 digits, as
					// JavaScript has some issues in its floating point implementation.
					to = limit(parseFloat(to.toFixed(7)));

					// Return false if handle can't move
					if (to === scope_Locations[trigger]) {
						return false;
					}

					// Set the handle to the new position.
					// Use requestAnimationFrame for efficient painting.
					// No significant effect in Chrome, Edge sees dramatic
					// performace improvements.
					if (window.requestAnimationFrame) {
						window.requestAnimationFrame(function () {
							handle.style[options.style] = to + '%';
						});
					} else {
						handle.style[options.style] = to + '%';
					}

					// Force proper handle stacking
					if (!handle.previousSibling) {
						removeClass(handle, cssClasses[17]);
						if (to > 50) {
							addClass(handle, cssClasses[17]);
						}
					}

					// Update locations.
					scope_Locations[trigger] = to;

					// Convert the value to the slider stepping/range.
					scope_Values[trigger] = scope_Spectrum.fromStepping(to);

					fireEvent('update', trigger);

					return true;
				}

				// Loop values from value method and apply them.
				function setValues(count, values) {

					var i, trigger, to;

					// With the limit option, we'll need another limiting pass.
					if (options.limit) {
						count += 1;
					}

					// If there are multiple handles to be set run the setting
					// mechanism twice for the first handle, to make sure it
					// can be bounced of the second one properly.
					for (i = 0; i < count; i += 1) {

						trigger = i % 2;

						// Get the current argument from the array.
						to = values[trigger];

						// Setting with null indicates an 'ignore'.
						// Inputting 'false' is invalid.
						if (to !== null && to !== false) {

							// If a formatted number was passed, attemt to decode it.
							if (typeof to === 'number') {
								to = String(to);
							}

							to = options.format.from(to);

							// Request an update for all links if the value was invalid.
							// Do so too if setting the handle fails.
							if (to === false || isNaN(to) || setHandle(scope_Handles[trigger], scope_Spectrum.toStepping(to), i === 3 - options.dir) === false) {
								fireEvent('update', trigger);
							}
						}
					}
				}

				// Set the slider value.
				function valueSet(input) {

					var count,
					    values = asArray(input),
					    i;

					// The RTL settings is implemented by reversing the front-end,
					// internal mechanisms are the same.
					if (options.dir && options.handles > 1) {
						values.reverse();
					}

					// Animation is optional.
					// Make sure the initial values where set before using animated placement.
					if (options.animate && scope_Locations[0] !== -1) {
						addClassFor(scope_Target, cssClasses[14], 300);
					}

					// Determine how often to set the handles.
					count = scope_Handles.length > 1 ? 3 : 1;

					if (values.length === 1) {
						count = 1;
					}

					setValues(count, values);

					// Fire the 'set' event for both handles.
					for (i = 0; i < scope_Handles.length; i++) {

						// Fire the event only for handles that received a new value, as per #579
						if (values[i] !== null) {
							fireEvent('set', i);
						}
					}
				}

				// Get the slider value.
				function valueGet() {

					var i,
					    retour = [];

					// Get the value from all handles.
					for (i = 0; i < options.handles; i += 1) {
						retour[i] = options.format.to(scope_Values[i]);
					}

					return inSliderOrder(retour);
				}

				// Removes classes from the root and empties it.
				function destroy() {

					cssClasses.forEach(function (cls) {
						if (!cls) {
							return;
						} // Ignore empty classes
						removeClass(scope_Target, cls);
					});

					while (scope_Target.firstChild) {
						scope_Target.removeChild(scope_Target.firstChild);
					}

					delete scope_Target.noUiSlider;
				}

				// Get the current step size for the slider.
				function getCurrentStep() {

					// Check all locations, map them to their stepping point.
					// Get the step point, then find it in the input list.
					var retour = scope_Locations.map(function (location, index) {

						var step = scope_Spectrum.getApplicableStep(location),


						// As per #391, the comparison for the decrement step can have some rounding issues.
						// Round the value to the precision used in the step.
						stepDecimals = countDecimals(String(step[2])),


						// Get the current numeric value
						value = scope_Values[index],


						// To move the slider 'one step up', the current step value needs to be added.
						// Use null if we are at the maximum slider value.
						increment = location === 100 ? null : step[2],


						// Going 'one step down' might put the slider in a different sub-range, so we
						// need to switch between the current or the previous step.
						prev = Number((value - step[2]).toFixed(stepDecimals)),


						// If the value fits the step, return the current step value. Otherwise, use the
						// previous step. Return null if the slider is at its minimum value.
						decrement = location === 0 ? null : prev >= step[1] ? step[2] : step[0] || false;

						return [decrement, increment];
					});

					// Return values in the proper order.
					return inSliderOrder(retour);
				}

				// Attach an event to this slider, possibly including a namespace
				function bindEvent(namespacedEvent, callback) {
					scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
					scope_Events[namespacedEvent].push(callback);

					// If the event bound is 'update,' fire it immediately for all handles.
					if (namespacedEvent.split('.')[0] === 'update') {
						scope_Handles.forEach(function (a, index) {
							fireEvent('update', index);
						});
					}
				}

				// Undo attachment of event
				function removeEvent(namespacedEvent) {

					var event = namespacedEvent.split('.')[0],
					    namespace = namespacedEvent.substring(event.length);

					Object.keys(scope_Events).forEach(function (bind) {

						var tEvent = bind.split('.')[0],
						    tNamespace = bind.substring(tEvent.length);

						if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
							delete scope_Events[bind];
						}
					});
				}

				// Updateable: margin, limit, step, range, animate, snap
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

					['margin', 'limit', 'step', 'range', 'animate'].forEach(function (name) {
						if (optionsToUpdate[name] !== undefined) {
							options[name] = optionsToUpdate[name];
						}
					});

					// Save current spectrum direction as testOptions in testRange call
					// doesn't rely on current direction
					newOptions.spectrum.direction = scope_Spectrum.direction;
					scope_Spectrum = newOptions.spectrum;

					// Invalidate the current positioning so valueSet forces an update.
					scope_Locations = [-1, -1];
					valueSet(v);

					for (i = 0; i < scope_Handles.length; i++) {
						fireEvent('update', i);
					}
				}

				// Throw an error if the slider was already initialized.
				if (scope_Target.noUiSlider) {
					throw new Error('Slider was already initialized.');
				}

				// Create the base element, initialise HTML and set classes.
				// Add handles and links.
				scope_Base = addSlider(options.dir, options.ort, scope_Target);
				scope_Handles = addHandles(options.handles, options.dir, scope_Base);

				// Set the connect classes.
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
					options: options, // Issue #600
					target: scope_Target, // Issue #597
					pips: pips // Issue #594
				};

				// Attach user events.
				events(options.events);

				return scope_Self;
			}

			// Run the standard initializer
			function initialize(target, originalOptions) {

				if (!target.nodeName) {
					throw new Error('noUiSlider.create requires a single element.');
				}

				// Test the options and create the slider environment;
				var options = testOptions(originalOptions, target),
				    slider = closure(target, options);

				// Use the public value method to set the start values.
				slider.set(options.start);

				target.noUiSlider = slider;
				return slider;
			}

			// Use an object instead of a function for future expansibility;
			return {
				create: initialize
			};
		});
	})(this);

	return _retrieveGlobal();
});
System.registerDynamic("fuel-ui/lib/components/Slider/Slider", ["@angular/core", "@angular/common", "./NoUiSlider"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
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
      this.debounceTime = 150;
      this.valueChange = new core_1.EventEmitter();
      this.secondValueChange = new core_1.EventEmitter();
      this.timeout = null;
    }
    Slider.prototype.update = function(val) {
      this.value = parseInt(val[0]);
      this.secondValue = val.length > 1 ? parseInt(val[1]) : null;
      this.valueChange.next(this.value);
      this.secondValueChange.next(this.secondValue);
      this.timeout = null;
    };
    ;
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
        if (_this.timeout)
          clearTimeout(_this.timeout);
        _this.timeout = setTimeout(function() {
          _this.update(val);
        }, _this.debounceTime);
      });
      this._sliderElement.noUiSlider.on('end', function(val) {
        if (_this.timeout)
          clearTimeout(_this.timeout);
        _this.update(val);
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
    __decorate([core_1.Input(), __metadata('design:type', Number)], Slider.prototype, "debounceTime", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], Slider.prototype, "valueChange", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], Slider.prototype, "secondValueChange", void 0);
    Slider = __decorate([core_1.Component({
      selector: "slider",
      template: "\n\n      <div class=\"slider\"></div>\n    "
    }), __metadata('design:paramtypes', [core_1.ElementRef])], Slider);
    return Slider;
  }());
  exports.Slider = Slider;
  var FuiSliderModule = (function() {
    function FuiSliderModule() {}
    FuiSliderModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: [Slider],
      exports: [Slider]
    }), __metadata('design:paramtypes', [])], FuiSliderModule);
    return FuiSliderModule;
  }());
  exports.FuiSliderModule = FuiSliderModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/TimePicker/TimePicker", ["@angular/core", "@angular/common", "@angular/forms"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var TimePicker = (function() {
    function TimePicker() {
      this.hourStep = 1;
      this.minuteStep = 1;
      this.secondStep = 1;
      this.showMeridian = true;
      this.meridians = ["AM", "PM"];
      this.showSeconds = false;
      this.readonlyInput = false;
      this.showSpinners = true;
      this.disabled = false;
      this.min = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0);
      this.max = new Date(new Date().getFullYear(), 0, 1, 23, 59, 59);
      this.value = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0);
      this.meridian = this.meridians.length > 0 ? this.meridians[0] : null;
      this.hours = 0;
      this.minutes = "00";
      this.seconds = "00";
      this.invalidHours = false;
      this.invalidMinutes = false;
      this.invalidSeconds = false;
      this.valueChange = new core_1.EventEmitter();
    }
    TimePicker.prototype.ngOnInit = function() {
      this.hours = this.value.getHours();
      this.minutes = this.value.getMinutes() > 9 ? this.value.getMinutes().toString() : "0" + this.value.getMinutes().toString();
      this.seconds = this.value.getSeconds() > 9 ? this.value.getSeconds().toString() : "0" + this.value.getSeconds().toString();
      this.refresh();
    };
    TimePicker.prototype.ngOnChanges = function(changes) {
      this.refresh();
    };
    TimePicker.prototype.incrementHours = function() {
      if (!this.noIncrementHours()) {
        this.addSecondsToSelected(this.hourStep * 60 * 60);
      }
    };
    ;
    TimePicker.prototype.decrementHours = function() {
      if (!this.noDecrementHours()) {
        this.addSecondsToSelected(-this.hourStep * 60 * 60);
      }
    };
    ;
    TimePicker.prototype.incrementMinutes = function() {
      if (!this.noIncrementMinutes()) {
        this.addSecondsToSelected(this.minuteStep * 60);
      }
    };
    ;
    TimePicker.prototype.decrementMinutes = function() {
      if (!this.noDecrementMinutes()) {
        this.addSecondsToSelected(-this.minuteStep * 60);
      }
    };
    ;
    TimePicker.prototype.incrementSeconds = function() {
      if (!this.noIncrementSeconds()) {
        this.addSecondsToSelected(this.secondStep);
      }
    };
    ;
    TimePicker.prototype.decrementSeconds = function() {
      if (!this.noDecrementSeconds()) {
        this.addSecondsToSelected(-this.secondStep);
      }
    };
    ;
    TimePicker.prototype.toggleMeridian = function() {
      if (this.noToggleMeridian())
        return;
      if (this.minutes && this.hours) {
        this.addSecondsToSelected(12 * 60 * (this.value.getHours() < 12 ? 60 : -60));
      } else {
        this.meridian = this.meridian === this.meridians[0] ? this.meridians[1] : this.meridians[0];
      }
    };
    ;
    TimePicker.prototype.addSecondsToSelected = function(seconds) {
      this.value = this.addSeconds(this.value, seconds);
      this.hours = this.value.getHours();
      this.minutes = this.value.getMinutes() > 9 ? this.value.getMinutes().toString() : "0" + this.value.getMinutes().toString();
      this.seconds = this.value.getSeconds() > 9 ? this.value.getSeconds().toString() : "0" + this.value.getSeconds().toString();
      this.valueChange.next(this.value);
      this.sanitize();
      this.refresh();
    };
    TimePicker.prototype.addMinutes = function(selected, minutes) {
      return this.addSeconds(selected, minutes * 60);
    };
    TimePicker.prototype.addSeconds = function(date, seconds) {
      var dt = new Date(date.getTime() + seconds * 1000);
      var newDate = new Date(date.getTime());
      newDate.setHours(dt.getHours(), dt.getMinutes(), dt.getSeconds());
      return newDate;
    };
    TimePicker.prototype.invalidTime = function() {
      return this.invalidHours || this.invalidMinutes || this.invalidSeconds;
    };
    TimePicker.prototype.sanitize = function() {
      this.invalidHours = false;
      this.invalidMinutes = false;
      this.invalidSeconds = false;
    };
    TimePicker.prototype.refresh = function() {
      this.hours = this.value.getHours();
      this.minutes = this.value.getMinutes() > 9 ? this.value.getMinutes().toString() : "0" + this.value.getMinutes().toString();
      this.seconds = this.value.getSeconds() > 9 ? this.value.getSeconds().toString() : "0" + this.value.getSeconds().toString();
      if (this.hours >= 12 && this.showMeridian) {
        this.meridian = this.meridians[1];
      }
      if (this.showMeridian) {
        this.hours = this.hours === 0 || this.hours === 12 ? 12 : this.hours % 12;
      }
      this.meridian = this.value.getHours() < 12 ? this.meridians[0] : this.meridians[1];
    };
    TimePicker.prototype.updateHours = function() {
      this.sanitize();
      if (this.hours.toString().length <= 0 || isNaN(this.hours) || this.hours < 0 || this.hours > 23 || (this.showMeridian && this.hours > 12)) {
        this.invalidHours = true;
      } else {
        this.hours = parseInt(this.hours.toString());
        this.value.setHours(this.showMeridian && this.meridian == this.meridians[1] ? this.hours + 12 : this.hours);
        this.addSecondsToSelected(0);
      }
    };
    TimePicker.prototype.updateMinutes = function() {
      this.sanitize();
      if (this.minutes.length <= 0 || isNaN(parseInt(this.minutes)) || parseInt(this.minutes) < 0 || parseInt(this.minutes) > 59) {
        this.invalidMinutes = true;
      } else {
        this.value.setMinutes(parseInt(this.minutes));
        this.addSecondsToSelected(0);
      }
    };
    TimePicker.prototype.updateSeconds = function() {
      this.sanitize();
      if (this.seconds.length <= 0 || isNaN(parseInt(this.seconds)) || parseInt(this.seconds) < 0 || parseInt(this.seconds) > 59) {
        this.invalidSeconds = true;
      } else {
        this.value.setSeconds(parseInt(this.seconds));
        this.addSecondsToSelected(0);
      }
    };
    TimePicker.prototype.noIncrementHours = function() {
      var incrementedSelected = this.addMinutes(this.value, this.hourStep * 60);
      return this.disabled || incrementedSelected > this.max || incrementedSelected < this.value && incrementedSelected < this.min;
    };
    ;
    TimePicker.prototype.noDecrementHours = function() {
      var decrementedSelected = this.addMinutes(this.value, -this.hourStep * 60);
      return this.disabled || decrementedSelected < this.min || decrementedSelected > this.value && decrementedSelected > this.max;
    };
    ;
    TimePicker.prototype.noIncrementMinutes = function() {
      var incrementedSelected = this.addMinutes(this.value, this.minuteStep);
      return this.disabled || incrementedSelected > this.max || incrementedSelected < this.value && incrementedSelected < this.min;
    };
    ;
    TimePicker.prototype.noDecrementMinutes = function() {
      var decrementedSelected = this.addMinutes(this.value, -this.minuteStep);
      return this.disabled || decrementedSelected < this.min || decrementedSelected > this.value && decrementedSelected > this.max;
    };
    ;
    TimePicker.prototype.noIncrementSeconds = function() {
      var incrementedSelected = this.addSeconds(this.value, this.secondStep);
      return this.disabled || incrementedSelected > this.max || incrementedSelected < this.value && incrementedSelected < this.min;
    };
    ;
    TimePicker.prototype.noDecrementSeconds = function() {
      var decrementedSelected = this.addSeconds(this.value, -this.secondStep);
      return this.disabled || decrementedSelected < this.min || decrementedSelected > this.value && decrementedSelected > this.max;
    };
    ;
    TimePicker.prototype.noToggleMeridian = function() {
      if (this.value.getHours() < 12) {
        return this.disabled || this.addMinutes(this.value, 12 * 60) > this.max;
      }
      return this.disabled || this.addMinutes(this.value, -12 * 60) < this.min;
    };
    ;
    __decorate([core_1.Input(), __metadata('design:type', Number)], TimePicker.prototype, "hourStep", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], TimePicker.prototype, "minuteStep", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], TimePicker.prototype, "secondStep", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimePicker.prototype, "showMeridian", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array)], TimePicker.prototype, "meridians", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimePicker.prototype, "showSeconds", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimePicker.prototype, "readonlyInput", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimePicker.prototype, "showSpinners", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TimePicker.prototype, "disabled", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], TimePicker.prototype, "min", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], TimePicker.prototype, "max", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Date)], TimePicker.prototype, "value", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_1.EventEmitter)], TimePicker.prototype, "valueChange", void 0);
    TimePicker = __decorate([core_1.Component({
      selector: "timepicker",
      template: "\n      <table class=\"fuel-ui-timepicker\" [class.has-error]=\"invalidTime()\">\n          <tbody>\n              <tr class=\"text-center\" *ngIf=\"showSpinners\">\n                  <td class=\"fuel-ui-increment hours\">\n                      <a (click)=\"incrementHours()\" [class.disabled]=\"noIncrementHours()\" class=\"btn btn-link\" [attr.disabled]=\"noIncrementHours()\">\n                          <span class=\"fa fa-chevron-up\"></span>\n                      </a>\n                  </td>\n                  <td>&nbsp;</td>\n                  <td class=\"fuel-ui-increment minutes\">\n                      <a (click)=\"incrementMinutes()\" [class.disabled]=\"noIncrementMinutes()\" class=\"btn btn-link\" [attr.disabled]=\"noIncrementMinutes()\">\n                          <span class=\"fa fa-chevron-up\"></span>\n                      </a>\n                  </td>\n                  <td *ngIf=\"showSeconds\">&nbsp;</td>\n                  <td *ngIf=\"showSeconds\" class=\"fuel-ui-increment seconds\">\n                      <a (click)=\"incrementSeconds()\" [class.disabled]=\"noIncrementSeconds()\" class=\"btn btn-link\" [attr.disabled]=\"noIncrementSeconds()\">\n                          <span class=\"fa fa-chevron-up\"></span>\n                      </a>\n                  </td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n              </tr>\n              <tr>\n                  <td class=\"form-group fuel-ui-time hours\" [class.has-error]=\"invalidHours\">\n                      <input type=\"text\" placeholder=\"HH\" [(ngModel)]=\"hours\" (blur)=\"updateHours()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" maxlength=\"2\" [disabled]=\"noIncrementHours()\">\n                  </td>\n                  <td class=\"fuel-ui-separator\">:</td>\n                  <td class=\"form-group fuel-ui-time minutes\" [class.has-error]=\"invalidMinutes\">\n                      <input type=\"text\" placeholder=\"MM\" [(ngModel)]=\"minutes\" (blur)=\"updateMinutes()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" maxlength=\"2\" [disabled]=\"noIncrementMinutes()\">\n                  </td>\n                  <td *ngIf=\"showSeconds\" class=\"fuel-ui-separator\">:</td>\n                  <td class=\"form-group fuel-ui-time seconds\" [class.has-error]=\"invalidSeconds\" *ngIf=\"showSeconds\">\n                      <input type=\"text\" placeholder=\"SS\" [(ngModel)]=\"seconds\" (blur)=\"updateSeconds()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" maxlength=\"2\" [disabled]=\"noIncrementSeconds()\">\n                  </td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n                  <td *ngIf=\"showMeridian\" class=\"fuel-ui-time am-pm\"><button type=\"button\" [class.disabled]=\"noToggleMeridian()\" class=\"btn btn-primary text-center\" (click)=\"toggleMeridian()\">{{meridian}}</button></td>\n              </tr>\n              <tr class=\"text-center\" *ngIf=\"showSpinners\">\n                  <td class=\"fuel-ui-decrement hours\">\n                      <a (click)=\"decrementHours()\" [class.disabled]=\"noDecrementHours()\" class=\"btn btn-link\" [attr.disabled]=\"noDecrementHours()\">\n                          <span class=\"fa fa-chevron-down\"></span>\n                      </a>\n                  </td>\n                  <td>&nbsp;</td>\n                  <td class=\"fuel-ui-decrement minutes\">\n                      <a (click)=\"decrementMinutes()\" [class.disabled]=\"noDecrementMinutes()\" class=\"btn btn-link\" [attr.disabled]=\"noDecrementMinutes()\">\n                          <span class=\"fa fa-chevron-down\"></span>\n                      </a>\n                  </td>\n                  <td *ngIf=\"showSeconds\">&nbsp;</td>\n                  <td *ngIf=\"showSeconds\" class=\"fuel-ui-decrement seconds\">\n                      <a (click)=\"decrementSeconds()\" [class.disabled]=\"noDecrementSeconds()\" class=\"btn btn-link\" [attr.disabled]=\"noDecrementSeconds()\">\n                          <span class=\"fa fa-chevron-down\"></span>\n                      </a>\n                  </td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n                  <td *ngIf=\"showMeridian\">&nbsp;</td>\n              </tr>\n          </tbody>\n      </table>\n    "
    }), __metadata('design:paramtypes', [])], TimePicker);
    return TimePicker;
  }());
  exports.TimePicker = TimePicker;
  exports.TIMEPICKER_PROVIDERS = [TimePicker];
  var FuiTimePickerModule = (function() {
    function FuiTimePickerModule() {}
    FuiTimePickerModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule, forms_1.FormsModule],
      declarations: [TimePicker],
      exports: [TimePicker]
    }), __metadata('design:paramtypes', [])], FuiTimePickerModule);
    return FuiTimePickerModule;
  }());
  exports.FuiTimePickerModule = FuiTimePickerModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/TextExpander/TextExpander", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var TextExpander = (function() {
    function TextExpander() {
      this.expanded = false;
      this.ellipsis = true;
      this.text = null;
      this.characters = 50;
      this.words = 0;
      this.expandText = "show more";
      this.shrinkText = "show less";
      this.expandedChange = new core_1.EventEmitter();
    }
    TextExpander.prototype.toggleExpand = function() {
      this.expanded = !this.expanded;
      this.expandedChange.next(this.expanded);
    };
    TextExpander.prototype.amountOfCharacters = function() {
      if (this.words > 0)
        return this.getCharactersUpToNumberOfWords(this.words);
      return this.characters;
    };
    TextExpander.prototype.getCharactersUpToNumberOfWords = function(words) {
      var textCopy = this.text;
      textCopy = textCopy.replace(/(^\s*)|(\s*$)/gi, "");
      textCopy = textCopy.replace(/[ ]{2,}/gi, " ");
      textCopy = textCopy.replace(/\n /, "\n");
      var wordsArr = textCopy.split(' ');
      if (words >= wordsArr.length - 1)
        return this.text.length;
      wordsArr = wordsArr.splice(0, words);
      var lastWordToShow = wordsArr[wordsArr.length - 1];
      var occurencesOfLastWord = wordsArr.filter(function(str) {
        return str === lastWordToShow;
      }).length;
      if (occurencesOfLastWord == 1)
        return this.text.split(lastWordToShow)[0].length + lastWordToShow.length;
      var charactersUntilLastWord = 0;
      for (var i = 0; i < occurencesOfLastWord; i++) {
        charactersUntilLastWord += this.text.split(lastWordToShow)[i].length;
      }
      return charactersUntilLastWord + lastWordToShow.length;
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TextExpander.prototype, "expanded", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], TextExpander.prototype, "ellipsis", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], TextExpander.prototype, "text", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], TextExpander.prototype, "characters", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number)], TextExpander.prototype, "words", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], TextExpander.prototype, "expandText", void 0);
    __decorate([core_1.Input(), __metadata('design:type', String)], TextExpander.prototype, "shrinkText", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], TextExpander.prototype, "expandedChange", void 0);
    TextExpander = __decorate([core_1.Component({
      selector: 'text-expander',
      template: "\n      <span *ngIf=\"text\">\n          {{text | slice : 0 : (expanded ? text.length : amountOfCharacters())}}\n          <span *ngIf=\"!expanded && text.length > amountOfCharacters()\">\n              <span *ngIf=\"ellipsis\">&hellip;</span>\n              <a href=\"javascript:void(8);\" (click)=\"toggleExpand()\">\n                  {{expandText}}\n              </a>\n          </span>\n          <span *ngIf=\"expanded && text.length > amountOfCharacters()\">\n              <a href=\"javascript:void(8);\" (click)=\"toggleExpand()\">\n                  {{shrinkText}}\n              </a>\n          </span>\n      </span>\n    ",
      pipes: [common_1.SlicePipe]
    }), __metadata('design:paramtypes', [])], TextExpander);
    return TextExpander;
  }());
  exports.TextExpander = TextExpander;
  var FuiTextExpanderModule = (function() {
    function FuiTextExpanderModule() {}
    FuiTextExpanderModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: [TextExpander],
      exports: [TextExpander]
    }), __metadata('design:paramtypes', [])], FuiTextExpanderModule);
    return FuiTextExpanderModule;
  }());
  exports.FuiTextExpanderModule = FuiTextExpanderModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/OffCanvasMenu/OffCanvasMenu", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var core_2 = $__require('@angular/core');
  var core_3 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var OffCanvasMenuClose = (function() {
    function OffCanvasMenuClose() {
      this.close = new core_2.EventEmitter();
    }
    OffCanvasMenuClose.prototype.onClick = function(e) {
      this.close.next(null);
    };
    __decorate([core_1.Output(), __metadata('design:type', Object)], OffCanvasMenuClose.prototype, "close", void 0);
    __decorate([core_2.HostListener("click", ["$event"]), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], OffCanvasMenuClose.prototype, "onClick", null);
    OffCanvasMenuClose = __decorate([core_1.Directive({selector: "[offCanvasMenuClose], .off-canvas-menu-close"}), __metadata('design:paramtypes', [])], OffCanvasMenuClose);
    return OffCanvasMenuClose;
  }());
  exports.OffCanvasMenuClose = OffCanvasMenuClose;
  var OffCanvasMenu = (function() {
    function OffCanvasMenu() {
      this.origin = "left";
      this.width = "25%";
      this.height = "25%";
      this.close = new core_2.EventEmitter();
      this.open = new core_2.EventEmitter();
      this.computedWidth = this.width;
      this.computedHeight = this.height;
      this.isOpen = false;
      this.overlayState = null;
      this.openState = null;
    }
    OffCanvasMenu.prototype.ngOnInit = function() {};
    OffCanvasMenu.prototype.ngAfterContentInit = function() {
      var _this = this;
      this.closeButtons.map(function(b) {
        return b.close.subscribe(function() {
          return _this.toggleMenu();
        });
      });
    };
    OffCanvasMenu.prototype.ngOnDestroy = function() {};
    OffCanvasMenu.prototype.toggleMenu = function() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.overlayState = "in";
        this.openState = "open";
        this.open.next(null);
      } else {
        this.overlayState = null;
        this.openState = null;
        this.close.next(null);
      }
      if (this.origin == "left" || this.origin == "right") {
        this.computedHeight = "100%";
        this.computedWidth = this.width;
      } else if (this.origin == "top" || this.origin == "bottom") {
        this.computedWidth = "100%";
        this.computedHeight = this.height;
      }
    };
    __decorate([core_1.Input(), __metadata('design:type', Object)], OffCanvasMenu.prototype, "origin", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object)], OffCanvasMenu.prototype, "width", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Object)], OffCanvasMenu.prototype, "height", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_2.EventEmitter)], OffCanvasMenu.prototype, "close", void 0);
    __decorate([core_1.Output(), __metadata('design:type', core_2.EventEmitter)], OffCanvasMenu.prototype, "open", void 0);
    __decorate([core_1.ContentChildren(OffCanvasMenuClose), __metadata('design:type', core_1.QueryList)], OffCanvasMenu.prototype, "closeButtons", void 0);
    OffCanvasMenu = __decorate([core_1.Component({
      selector: "off-canvas-menu",
      template: "\n      <div *ngIf=\"isOpen\" [@fade]=\"overlayState\" class=\"off-canvas-menu-overlay\" \n          (click)=\"toggleMenu()\"></div>\n\n      <div *ngIf=\"isOpen\" [@open]=\"openState\" class=\"off-canvas-menu\"\n          [class.off-canvas-menu-left]=\"origin.toLowerCase() == 'left'\"\n          [class.off-canvas-menu-right]=\"origin.toLowerCase() == 'right'\"\n          [class.off-canvas-menu-top]=\"origin.toLowerCase() == 'top'\"\n          [class.off-canvas-menu-bottom]=\"origin.toLowerCase() == 'bottom'\"\n          [style.width]=\"computedWidth\"\n          [style.height]=\"computedHeight\">\n          <ng-content></ng-content>    \n      </div>\n    ",
      styles: ["\n      .off-canvas-menu-overlay {\n        display: block;\n        position: fixed;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        z-index: 900;\n        background-color: #55595c;\n        opacity: 0; }\n\n      .off-canvas-menu {\n        display: block;\n        position: fixed;\n        z-index: 1000;\n        background-color: #fff; }\n        .off-canvas-menu.off-canvas-menu-left {\n          top: 0;\n          left: 0;\n          bottom: 0;\n          transform: translate(-100%, 0);\n          width: 75%; }\n        .off-canvas-menu.off-canvas-menu-right {\n          top: 0;\n          right: 0;\n          bottom: 0;\n          transform: translate(100%, 0);\n          width: 75%; }\n        .off-canvas-menu.off-canvas-menu-top {\n          top: 0;\n          left: 0;\n          right: 0;\n          transform: translate(0, -100%);\n          height: 75%; }\n        .off-canvas-menu.off-canvas-menu-bottom {\n          left: 0;\n          right: 0;\n          bottom: 0;\n          transform: translate(0, 100%);\n          height: 75%; }\n    "],
      directives: [OffCanvasMenuClose],
      animations: [core_3.trigger("open", [core_3.state("open", core_3.style({transform: "translate(0,0)"})), core_3.transition("void => open", [core_3.animate("200ms ease")]), core_3.transition("open => void", [core_3.animate("200ms ease")])]), core_3.trigger("fade", [core_3.state("in", core_3.style({opacity: ".75"})), core_3.transition("void => in", [core_3.animate("200ms ease")]), core_3.transition("in => void", [core_3.animate("200ms ease")])])]
    }), __metadata('design:paramtypes', [])], OffCanvasMenu);
    return OffCanvasMenu;
  }());
  exports.OffCanvasMenu = OffCanvasMenu;
  var offCanvasMenuDirectives = [OffCanvasMenu, OffCanvasMenuClose];
  var FuiOffCanvasMenuModule = (function() {
    function FuiOffCanvasMenuModule() {}
    FuiOffCanvasMenuModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: offCanvasMenuDirectives,
      exports: offCanvasMenuDirectives
    }), __metadata('design:paramtypes', [])], FuiOffCanvasMenuModule);
    return FuiOffCanvasMenuModule;
  }());
  exports.FuiOffCanvasMenuModule = FuiOffCanvasMenuModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/components/components", ["@angular/core", "./accordion/accordion", "./alert/alert", "./carousel/carousel", "./datePicker/datePicker.module", "./modal/modal", "./pagination/pagination", "./infiniteScroller/infiniteScroller", "./dropdown/dropdown", "./tab/tab", "./tag/tag", "./tableSortable/tableSortable", "./slider/slider", "./timePicker/timePicker", "./textExpander/textExpander", "./offCanvasMenu/offCanvasMenu", "./Accordion/Accordion", "./Accordion/AccordionItem", "./Alert/Alert", "./Carousel/Carousel", "./Modal/Modal", "./Pagination/Pagination", "./InfiniteScroller/InfiniteScroller", "./Dropdown/Dropdown", "./Tab/Tab", "./Tab/TabSet", "./TableSortable/TableSortable", "./TableSortable/TableSortableColumn", "./TableSortable/TableSortableSorting", "./Tag/Tag", "./Tag/TagSet", "./Slider/Slider", "./TimePicker/TimePicker", "./TextExpander/TextExpander", "./OffCanvasMenu/OffCanvasMenu"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var core_1 = $__require('@angular/core');
  var accordion_1 = $__require('./accordion/accordion');
  var alert_1 = $__require('./alert/alert');
  var carousel_1 = $__require('./carousel/carousel');
  var datePicker_module_1 = $__require('./datePicker/datePicker.module');
  var modal_1 = $__require('./modal/modal');
  var pagination_1 = $__require('./pagination/pagination');
  var infiniteScroller_1 = $__require('./infiniteScroller/infiniteScroller');
  var dropdown_1 = $__require('./dropdown/dropdown');
  var tab_1 = $__require('./tab/tab');
  var tag_1 = $__require('./tag/tag');
  var tableSortable_1 = $__require('./tableSortable/tableSortable');
  var slider_1 = $__require('./slider/slider');
  var timePicker_1 = $__require('./timePicker/timePicker');
  var textExpander_1 = $__require('./textExpander/textExpander');
  var offCanvasMenu_1 = $__require('./offCanvasMenu/offCanvasMenu');
  __export($__require('./Accordion/Accordion'));
  __export($__require('./Accordion/AccordionItem'));
  __export($__require('./Alert/Alert'));
  __export($__require('./Carousel/Carousel'));
  __export($__require('./Modal/Modal'));
  __export($__require('./Pagination/Pagination'));
  __export($__require('./InfiniteScroller/InfiniteScroller'));
  __export($__require('./datePicker/datePicker.module'));
  __export($__require('./Dropdown/Dropdown'));
  __export($__require('./Tab/Tab'));
  __export($__require('./Tab/TabSet'));
  __export($__require('./TableSortable/TableSortable'));
  __export($__require('./TableSortable/TableSortableColumn'));
  __export($__require('./TableSortable/TableSortableSorting'));
  __export($__require('./Tag/Tag'));
  __export($__require('./Tag/TagSet'));
  __export($__require('./Slider/Slider'));
  __export($__require('./TimePicker/TimePicker'));
  __export($__require('./TextExpander/TextExpander'));
  __export($__require('./OffCanvasMenu/OffCanvasMenu'));
  var componentModules = [accordion_1.FuiAccordionModule, alert_1.FuiAlertModule, carousel_1.FuiCarouselModule, datePicker_module_1.FuiDatePickerModule, dropdown_1.FuiDropdownModule, infiniteScroller_1.FuiInfiniteScrollerModule, modal_1.FuiModalModule, offCanvasMenu_1.FuiOffCanvasMenuModule, pagination_1.FuiPaginationModule, tab_1.FuiTabModule, tag_1.FuiTagModule, tableSortable_1.FuiTableSortableModule, slider_1.FuiSliderModule, timePicker_1.FuiTimePickerModule, textExpander_1.FuiTextExpanderModule];
  var FuiComponentsModule = (function() {
    function FuiComponentsModule() {}
    FuiComponentsModule = __decorate([core_1.NgModule({
      imports: componentModules.slice(),
      exports: componentModules
    }), __metadata('design:paramtypes', [])], FuiComponentsModule);
    return FuiComponentsModule;
  }());
  exports.FuiComponentsModule = FuiComponentsModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/directives/animation/animation", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
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
  var FuiAnimationModule = (function() {
    function FuiAnimationModule() {}
    FuiAnimationModule = __decorate([core_1.NgModule({
      declarations: [Animation],
      exports: [Animation]
    }), __metadata('design:paramtypes', [])], FuiAnimationModule);
    return FuiAnimationModule;
  }());
  exports.FuiAnimationModule = FuiAnimationModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/directives/tooltip/tooltip", ["@angular/core", "@angular/common"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var Tooltip = (function() {
    function Tooltip(el) {
      this.text = '';
      this.position = 'top';
      this.color = 'none';
      this.size = 'auto';
      this.rounded = false;
      this.always = false;
      this._el = el.nativeElement;
    }
    Tooltip.prototype.ngOnInit = function() {
      if (this.always) {
        this._el.classList.add("hint--always");
        this.show();
      }
    };
    Tooltip.prototype.ngOnChanges = function() {
      for (var i = 0; i < this._el.classList.length; i++) {
        var currentClass = this._el.classList[i];
        if (currentClass.startsWith("hint--"))
          this._el.classList.remove(currentClass);
      }
      if (this.always) {
        this._el.classList.add("hint--always");
        this.show();
      }
    };
    Tooltip.prototype.show = function() {
      if (!this.text || this.text.length == 0)
        return;
      this.hide();
      this._el.setAttribute("data-hint", this.text);
      for (var i = 0; i < this._el.classList.length; i++) {
        var currentClass = this._el.classList[i];
        if (currentClass.startsWith("hint"))
          this._el.classList.remove(currentClass);
      }
      if (this.always) {
        this._el.classList.add("hint--always");
      }
      this._el.classList.add("hint--" + this.position);
      switch (this.color) {
        case "error":
          this._el.classList.add("hint--error");
          break;
        case "warning":
          this._el.classList.add("hint--warning");
          break;
        case "info":
          this._el.classList.add("hint--info");
          break;
        case "success":
          this._el.classList.add("hint--success");
          break;
        default:
      }
      switch (this.size) {
        case "small":
          this._el.classList.add("hint--small");
          break;
        case "medium":
          this._el.classList.add("hint--medium");
          break;
        case "large":
          this._el.classList.add("hint--large");
          break;
        default:
      }
      if (this.rounded)
        this._el.classList.add("hint--rounded");
    };
    Tooltip.prototype.hide = function() {
      if (this.always)
        return;
      this._el.removeAttribute("data-hint");
    };
    Tooltip = __decorate([core_1.Directive({
      selector: '[tooltip]',
      properties: ['text: tooltip', 'position: position', 'color: color', 'size: size', 'rounded: rounded', 'always: always'],
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
  var FuiTooltipModule = (function() {
    function FuiTooltipModule() {}
    FuiTooltipModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: [Tooltip],
      exports: [Tooltip]
    }), __metadata('design:paramtypes', [])], FuiTooltipModule);
    return FuiTooltipModule;
  }());
  exports.FuiTooltipModule = FuiTooltipModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/directives/codeHighlighter/codeHighlighter", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var CodeHighlighter = (function() {
    function CodeHighlighter(_el) {
      this._el = _el;
    }
    CodeHighlighter.prototype.ngAfterViewInit = function() {
      if (this._el && this._el.nativeElement) {
        Prism.highlightElement(this._el.nativeElement);
      }
    };
    CodeHighlighter = __decorate([core_1.Directive({selector: '[code-highlight]'}), __metadata('design:paramtypes', [core_1.ElementRef])], CodeHighlighter);
    return CodeHighlighter;
  }());
  exports.CodeHighlighter = CodeHighlighter;
  var FuiCodeHighlighterModule = (function() {
    function FuiCodeHighlighterModule() {}
    FuiCodeHighlighterModule = __decorate([core_1.NgModule({
      declarations: [CodeHighlighter],
      exports: [CodeHighlighter]
    }), __metadata('design:paramtypes', [])], FuiCodeHighlighterModule);
    return FuiCodeHighlighterModule;
  }());
  exports.FuiCodeHighlighterModule = FuiCodeHighlighterModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/directives/directives", ["@angular/core", "@angular/common", "./animation/animation", "./tooltip/tooltip", "./codeHighlighter/codeHighlighter"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var animation_1 = $__require('./animation/animation');
  var tooltip_1 = $__require('./tooltip/tooltip');
  var codeHighlighter_1 = $__require('./codeHighlighter/codeHighlighter');
  __export($__require('./animation/animation'));
  __export($__require('./tooltip/tooltip'));
  __export($__require('./codeHighlighter/codeHighlighter'));
  var directiveModules = [animation_1.FuiAnimationModule, tooltip_1.FuiTooltipModule, codeHighlighter_1.FuiCodeHighlighterModule];
  var FuiDirectivesModule = (function() {
    function FuiDirectivesModule() {}
    FuiDirectivesModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule].concat(directiveModules),
      exports: directiveModules
    }), __metadata('design:paramtypes', [])], FuiDirectivesModule);
    return FuiDirectivesModule;
  }());
  exports.FuiDirectivesModule = FuiDirectivesModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/pipes/format/format", ["@angular/core", "@angular/common", "../../utilities/StringUtils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var StringUtils_1 = $__require('../../utilities/StringUtils');
  var FormatPipe = (function() {
    function FormatPipe() {
      this.datePipe = new common_1.DatePipe();
      this.decimalPipe = new common_1.DecimalPipe();
    }
    FormatPipe.prototype.transform = function(input, args) {
      var format = '';
      var parsedFloat = 0;
      var pipeArgs = args.split(':');
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
          return this.decimalPipe.transform(parsedFloat, format);
        case 'percentage':
          parsedFloat = !isNaN(parseFloat(input)) ? parseFloat(input) : 0;
          format = pipeArgs.length > 1 ? pipeArgs[1] : null;
          return this.decimalPipe.transform(parsedFloat, format) + '%';
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
          return this.datePipe.transform(date, format);
        default:
          return input;
      }
    };
    FormatPipe = __decorate([core_1.Pipe({name: 'format'}), __metadata('design:paramtypes', [])], FormatPipe);
    return FormatPipe;
  }());
  exports.FormatPipe = FormatPipe;
  var FuiFormatPipeModule = (function() {
    function FuiFormatPipeModule() {}
    FuiFormatPipeModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule],
      declarations: [FormatPipe],
      exports: [FormatPipe]
    }), __metadata('design:paramtypes', [])], FuiFormatPipeModule);
    return FuiFormatPipeModule;
  }());
  exports.FuiFormatPipeModule = FuiFormatPipeModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/pipes/mapToIterable/mapToIterable", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
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
  var FuiMapToIterablePipeModule = (function() {
    function FuiMapToIterablePipeModule() {}
    FuiMapToIterablePipeModule = __decorate([core_1.NgModule({
      declarations: [MapToIterablePipe],
      exports: [MapToIterablePipe]
    }), __metadata('design:paramtypes', [])], FuiMapToIterablePipeModule);
    return FuiMapToIterablePipeModule;
  }());
  exports.FuiMapToIterablePipeModule = FuiMapToIterablePipeModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/pipes/orderBy/orderBy", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var OrderByPipe = (function() {
    function OrderByPipe() {
      this.value = [];
    }
    OrderByPipe._orderByComparator = function(a, b) {
      if (a === null || typeof a === 'undefined')
        a = 0;
      if (b === null || typeof b === 'undefined')
        b = 0;
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
    OrderByPipe.prototype.transform = function(input, config) {
      if (config === void 0) {
        config = '+';
      }
      if (!input)
        return input;
      this.value = input.slice();
      var value = this.value;
      if (!Array.isArray(value))
        return value;
      if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
        var propertyToCheck = !Array.isArray(config) ? config : config[0];
        var desc_1 = propertyToCheck.substr(0, 1) == '-';
        if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
          return !desc_1 ? value.sort() : value.sort().reverse();
        } else {
          var property_1 = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-' ? propertyToCheck.substr(1) : propertyToCheck;
          return value.sort(function(a, b) {
            var aValue = a[property_1];
            var bValue = b[property_1];
            var propertySplit = property_1.split('.');
            if (typeof aValue === 'undefined' && typeof bValue === 'undefined' && propertySplit.length > 1) {
              aValue = a;
              bValue = b;
              for (var j = 0; j < propertySplit.length; j++) {
                aValue = aValue[propertySplit[j]];
                bValue = bValue[propertySplit[j]];
              }
            }
            return !desc_1 ? OrderByPipe._orderByComparator(aValue, bValue) : -OrderByPipe._orderByComparator(aValue, bValue);
          });
        }
      } else {
        return value.sort(function(a, b) {
          for (var i = 0; i < config.length; i++) {
            var desc = config[i].substr(0, 1) == '-';
            var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-' ? config[i].substr(1) : config[i];
            var aValue = a[property];
            var bValue = b[property];
            var propertySplit = property.split('.');
            if (typeof aValue === 'undefined' && typeof bValue === 'undefined' && propertySplit.length > 1) {
              aValue = a;
              bValue = b;
              for (var j = 0; j < propertySplit.length; j++) {
                aValue = aValue[propertySplit[j]];
                bValue = bValue[propertySplit[j]];
              }
            }
            var comparison = !desc ? OrderByPipe._orderByComparator(aValue, bValue) : -OrderByPipe._orderByComparator(aValue, bValue);
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
  var FuiOrderByPipeModule = (function() {
    function FuiOrderByPipeModule() {}
    FuiOrderByPipeModule = __decorate([core_1.NgModule({
      declarations: [OrderByPipe],
      exports: [OrderByPipe]
    }), __metadata('design:paramtypes', [])], FuiOrderByPipeModule);
    return FuiOrderByPipeModule;
  }());
  exports.FuiOrderByPipeModule = FuiOrderByPipeModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/pipes/range/range", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  var core_1 = $__require('@angular/core');
  var RangePipe = (function() {
    function RangePipe() {}
    RangePipe.prototype.transform = function(value, min, max, step) {
      if (min === void 0) {
        min = 0;
      }
      if (max === void 0) {
        max = 4;
      }
      if (step === void 0) {
        step = 1;
      }
      var newValue = [];
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
  var FuiRangePipeModule = (function() {
    function FuiRangePipeModule() {}
    FuiRangePipeModule = __decorate([core_1.NgModule({
      declarations: [RangePipe],
      exports: [RangePipe]
    }), __metadata('design:paramtypes', [])], FuiRangePipeModule);
    return FuiRangePipeModule;
  }());
  exports.FuiRangePipeModule = FuiRangePipeModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/pipes/pipes", ["@angular/core", "./format/format", "./mapToIterable/mapToIterable", "./orderBy/orderBy", "./range/range"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var core_1 = $__require('@angular/core');
  var format_1 = $__require('./format/format');
  var mapToIterable_1 = $__require('./mapToIterable/mapToIterable');
  var orderBy_1 = $__require('./orderBy/orderBy');
  var range_1 = $__require('./range/range');
  __export($__require('./format/format'));
  __export($__require('./mapToIterable/mapToIterable'));
  __export($__require('./orderBy/orderBy'));
  __export($__require('./range/range'));
  var pipeModules = [format_1.FuiFormatPipeModule, mapToIterable_1.FuiMapToIterablePipeModule, orderBy_1.FuiOrderByPipeModule, range_1.FuiRangePipeModule];
  var FuiPipesModule = (function() {
    function FuiPipesModule() {}
    FuiPipesModule = __decorate([core_1.NgModule({
      imports: pipeModules,
      exports: pipeModules
    }), __metadata('design:paramtypes', [])], FuiPipesModule);
    return FuiPipesModule;
  }());
  exports.FuiPipesModule = FuiPipesModule;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/utilities/DateRange", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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

System.registerDynamic("fuel-ui/lib/utilities/DateUtils", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
  var DateUtils = (function() {
    function DateUtils() {}
    DateUtils.isValidDate = function(value) {
      return Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.valueOf()) && value.getTime() != 0;
    };
    DateUtils.handleDateInput = function(value) {
      if (DateUtils.isValidDate(value))
        return value;
      return new Date(value);
    };
    return DateUtils;
  }());
  exports.DateUtils = DateUtils;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/utilities/DetectionUtils", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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

System.registerDynamic("fuel-ui/lib/utilities/AnimationUtils", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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

System.registerDynamic("fuel-ui/lib/utilities/ElementUtils", ["./AnimationUtils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
      return new Promise(function(resolve, reject) {
        var timer = setInterval(function() {
          var time = new Date().getTime() - startTime;
          var scrollTo = AnimationUtils_1.AnimationUtils.easeInOutQuart(time, from, to - from, duration);
          element.scrollTop = scrollTo;
          if (time >= duration) {
            element.scrollTop = to;
            clearInterval(timer);
            resolve();
          }
        }, 1000 / 60);
      });
    };
    return ElementUtils;
  }());
  exports.ElementUtils = ElementUtils;
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/utilities/StringUtils", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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

System.registerDynamic("fuel-ui/lib/utilities/utilities", ["./DateRange", "./DateUtils", "./DetectionUtils", "./ElementUtils", "./StringUtils"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('./DateRange'));
  __export($__require('./DateUtils'));
  __export($__require('./DetectionUtils'));
  __export($__require('./ElementUtils'));
  __export($__require('./StringUtils'));
  return module.exports;
});

System.registerDynamic("fuel-ui/lib/fuel-ui", ["@angular/core", "@angular/common", "@angular/forms", "./animations/animations", "./components/components", "./directives/directives", "./pipes/pipes", "./utilities/utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
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
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var forms_1 = $__require('@angular/forms');
  var animations_1 = $__require('./animations/animations');
  var components_1 = $__require('./components/components');
  var directives_1 = $__require('./directives/directives');
  var pipes_1 = $__require('./pipes/pipes');
  __export($__require('./animations/animations'));
  __export($__require('./components/components'));
  __export($__require('./directives/directives'));
  __export($__require('./pipes/pipes'));
  __export($__require('./utilities/utilities'));
  var fuiDirectives = [];
  var fuiModules = [animations_1.FuiAnimationsModule, components_1.FuiComponentsModule, directives_1.FuiDirectivesModule, pipes_1.FuiPipesModule];
  var FuelUiModule = (function() {
    function FuelUiModule() {}
    FuelUiModule = __decorate([core_1.NgModule({
      imports: [common_1.CommonModule, forms_1.FormsModule].concat(fuiModules),
      declarations: fuiDirectives,
      exports: fuiDirectives.concat(fuiModules)
    }), __metadata('design:paramtypes', [])], FuelUiModule);
    return FuelUiModule;
  }());
  exports.FuelUiModule = FuelUiModule;
  return module.exports;
});
