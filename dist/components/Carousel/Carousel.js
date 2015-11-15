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
var CarouselItem = (function () {
    function CarouselItem() {
        this.resetStatus();
    }
    CarouselItem.prototype.resetStatus = function () {
        this.isActive = false;
        this.exiting = false;
        this.resetAnimation();
    };
    CarouselItem.prototype.resetAnimation = function () {
        //this.outLeft = this.inLeft = this.outRight = this.inRight = false;
        this.left = this.right = this.next = this.prev = false;
    };
    CarouselItem.prototype.animationStart = function () {
    };
    CarouselItem.prototype.animationEnd = function () {
        if (this.exiting)
            this.resetStatus();
        else
            this.resetAnimation();
    };
    CarouselItem.prototype.moveLeft = function () {
        if (this.isActive) {
            this.exiting = true;
            this.left = true;
        }
        else {
            this.isActive = true;
            this.prev = true;
        }
    };
    CarouselItem.prototype.moveRight = function () {
        if (this.isActive) {
            this.exiting = true;
            this.right = true;
        }
        else {
            this.isActive = true;
            this.next = true;
        }
    };
    CarouselItem.prototype.checkIfAnimating = function () {
        return this.left || this.right || this.next || this.prev;
    };
    CarouselItem = __decorate([
        angular2_1.Directive({
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
                '(MSAnimationEnd)': 'animationEnd()',
            },
        }), 
        __metadata('design:paramtypes', [])
    ], CarouselItem);
    return CarouselItem;
})();
exports.CarouselItem = CarouselItem;
var Carousel = (function () {
    function Carousel() {
        this.images = [];
    }
    Carousel.prototype.afterContentInit = function () {
        var _this = this;
        this.imageQuery.changes.toRx()
            .subscribe(function () { return _this.registerImages(); });
        this.registerImages();
    };
    Carousel.prototype.registerImages = function () {
        var _this = this;
        this.images = [];
        this.imageQuery.map(function (i) { return _this.images.push(i); });
        var activeImage = this.getActiveImage();
        if (this.images.length > 0 && activeImage == null)
            this.images[0].isActive = true;
    };
    Carousel.prototype.setAllInactive = function () {
        this.images.map(function (i) { return i.resetStatus(); });
    };
    Carousel.prototype.switchTo = function (image) {
        var activeImage = this.getActiveImage();
        if (this.images.indexOf(image) < this.images.indexOf(activeImage)) {
            image.moveLeft();
            activeImage.moveLeft();
        }
        else {
            image.moveRight();
            activeImage.moveRight();
        }
    };
    Carousel.prototype.nextImage = function () {
        if (this.checkIfAnimating())
            return;
        var activeImage = this.getActiveImage();
        var index = this.getActiveIndex() + 1;
        index = index >= this.images.length ? 0 : index;
        activeImage.moveLeft();
        this.images[index].moveLeft();
    };
    Carousel.prototype.prevImage = function () {
        if (this.checkIfAnimating())
            return;
        var activeImage = this.getActiveImage();
        var index = this.getActiveIndex() - 1;
        index = index < 0 ? this.images.length - 1 : index;
        activeImage.moveRight();
        this.images[index].moveRight();
    };
    Carousel.prototype.checkIfAnimating = function () {
        return this.images.reduce(function (prev, curr) { return curr.checkIfAnimating() || prev; }, false);
    };
    Carousel.prototype.getActiveIndex = function () {
        var activeImage = this.getActiveImage();
        if (activeImage == null)
            return -1;
        return this.images.indexOf(activeImage);
    };
    Carousel.prototype.getActiveImage = function () {
        return this.images.reduce(function (prev, curr) { return curr.isActive ? curr : prev; }, null);
    };
    __decorate([
        angular2_2.ContentChildren(CarouselItem), 
        __metadata('design:type', angular2_2.QueryList)
    ], Carousel.prototype, "imageQuery");
    Carousel = __decorate([
        angular2_1.Component({
            selector: 'carousel'
        }),
        angular2_1.View({
            styles: ["\n   .carousel-item {\n     width: 100%; }\n\n   .carousel-item.slide-in-left {\n     display: block;\n     position: absolute;\n     top: 0;\n     left: -100%;\n     -webkit-animation-name: slideInLeft;\n     -moz-animation-name: slideInLeft;\n     animation-name: slideInLeft;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   .carousel-item.slide-in-right {\n     display: block;\n     position: absolute;\n     top: 0;\n     left: 100%;\n     -webkit-animation-name: slideInRight;\n     -moz-animation-name: slideInRight;\n     animation-name: slideInRight;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   .carousel-item.slide-out-left {\n     -webkit-animation-name: slideOutLeft;\n     -moz-animation-name: slideOutLeft;\n     animation-name: slideOutLeft;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   .carousel-item.slide-out-right {\n     -webkit-animation-name: slideOutRight;\n     -moz-animation-name: slideOutRight;\n     animation-name: slideOutRight;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   /*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2Fyb3VzZWwvY2Fyb3VzZWwuc2NzcyIsIi4uL25vZGVfbW9kdWxlcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL19wcmVmaXhlci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLGNBQWMsQ0FBQztFQUNkLEtBQUssRUFBRSxJQUFLLEdBQ1o7O0FBRUQsY0FBYyxjQUFjLENBQUM7RUFDNUIsT0FBTyxFQUFFLEtBQU07RUFDZixRQUFRLEVBQUUsUUFBUztFQUNuQixHQUFHLEVBQUUsQ0FBRTtFQUNQLElBQUksRUFBRSxLQUFNO0VDc0JMLHNCQUFvQixFRHJCSCxXQUFXO0VDeUI1QixtQkFBaUIsRUR6QkEsV0FBVztFQ3FDNUIsY0FBWSxFRHJDSyxXQUFXO0VDcUI1QiwwQkFBb0IsRURoQ1osSUFBRztFQ29DWCx1QkFBaUIsRURwQ1QsSUFBRztFQ2dEWCxrQkFBWSxFRGhESixJQUFHO0VDZ0NYLGlDQUFvQixFRG5CUSxJQUFJO0VDdUJoQyw4QkFBaUIsRUR2QlcsSUFBSTtFQ21DaEMseUJBQVksRURuQ2dCLElBQUksR0FFdkM7O0FBRUQsY0FBYyxlQUFlLENBQUM7RUFDN0IsT0FBTyxFQUFFLEtBQU07RUFDZixRQUFRLEVBQUUsUUFBUztFQUNuQixHQUFHLEVBQUUsQ0FBRTtFQUNQLElBQUksRUFBRSxJQUFLO0VDV0osc0JBQW9CLEVEVkgsWUFBWTtFQ2M3QixtQkFBaUIsRURkQSxZQUFZO0VDMEI3QixjQUFZLEVEMUJLLFlBQVk7RUNVN0IsMEJBQW9CLEVEaENaLElBQUc7RUNvQ1gsdUJBQWlCLEVEcENULElBQUc7RUNnRFgsa0JBQVksRURoREosSUFBRztFQ2dDWCxpQ0FBb0IsRURSUSxJQUFJO0VDWWhDLDhCQUFpQixFRFpXLElBQUk7RUN3QmhDLHlCQUFZLEVEeEJnQixJQUFJLEdBRXZDOztBQUVELGNBQWMsZUFBZSxDQUFDO0VDSXRCLHNCQUFvQixFREhILFlBQVk7RUNPN0IsbUJBQWlCLEVEUEEsWUFBWTtFQ21CN0IsY0FBWSxFRG5CSyxZQUFZO0VDRzdCLDBCQUFvQixFRGhDWixJQUFHO0VDb0NYLHVCQUFpQixFRHBDVCxJQUFHO0VDZ0RYLGtCQUFZLEVEaERKLElBQUc7RUNnQ1gsaUNBQW9CLEVERFEsSUFBSTtFQ0toQyw4QkFBaUIsRURMVyxJQUFJO0VDaUJoQyx5QkFBWSxFRGpCZ0IsSUFBSSxHQUV2Qzs7QUFFRCxjQUFjLGdCQUFnQixDQUFDO0VDSHZCLHNCQUFvQixFRElILGFBQWE7RUNBOUIsbUJBQWlCLEVEQUEsYUFBYTtFQ1k5QixjQUFZLEVEWkssYUFBYTtFQ0o5QiwwQkFBb0IsRURoQ1osSUFBRztFQ29DWCx1QkFBaUIsRURwQ1QsSUFBRztFQ2dEWCxrQkFBWSxFRGhESixJQUFHO0VDZ0NYLGlDQUFvQixFRE1RLElBQUk7RUNGaEMsOEJBQWlCLEVERVcsSUFBSTtFQ1VoQyx5QkFBWSxFRFZnQixJQUFJLEdBRXZDIiwiZmlsZSI6ImNvbXBvbmVudHMvQ2Fyb3VzZWwvY2Fyb3VzZWwuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy9AaW1wb3J0IFwiLi4vLi4vYm93ZXJfY29tcG9uZW50cy9hbmltYXRld2l0aHNhc3MvYW5pbWF0ZS5zY3NzXCI7XHJcbkBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvYm91cmJvblwiO1xyXG5cclxuJHNsaWRlRHVyYXRpb246IC41cztcclxuXHJcbi5jYXJvdXNlbC1pdGVtIHtcclxuXHR3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmNhcm91c2VsLWl0ZW0uc2xpZGUtaW4tbGVmdCB7IFxyXG5cdGRpc3BsYXk6IGJsb2NrO1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHR0b3A6IDA7XHRcclxuXHRsZWZ0OiAtMTAwJTtcclxuXHRAaW5jbHVkZSBhbmltYXRpb24tbmFtZShzbGlkZUluTGVmdCk7XHJcblx0QGluY2x1ZGUgYW5pbWF0aW9uLWR1cmF0aW9uKCRzbGlkZUR1cmF0aW9uKTtcclxuXHRAaW5jbHVkZSBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uKGVhc2UpO1xyXG5cdC8vQGluY2x1ZGUgc2xpZGVJbkxlZnQoJGR1cmF0aW9uOiAkc2xpZGVEdXJhdGlvbiwgJGZ1bmN0aW9uOiBlYXNlLW91dCwgJGZpbGw6IGZvcndhcmRzKTtcclxufVxyXG5cclxuLmNhcm91c2VsLWl0ZW0uc2xpZGUtaW4tcmlnaHQge1xyXG5cdGRpc3BsYXk6IGJsb2NrO1xyXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHR0b3A6IDA7XHJcblx0bGVmdDogMTAwJTtcclxuXHRAaW5jbHVkZSBhbmltYXRpb24tbmFtZShzbGlkZUluUmlnaHQpO1xyXG5cdEBpbmNsdWRlIGFuaW1hdGlvbi1kdXJhdGlvbigkc2xpZGVEdXJhdGlvbik7XHJcblx0QGluY2x1ZGUgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbihlYXNlKTtcclxuXHQvL0BpbmNsdWRlIHNsaWRlSW5SaWdodCgkZHVyYXRpb246ICRzbGlkZUR1cmF0aW9uLCAkZnVuY3Rpb246IGVhc2Utb3V0LCAkZmlsbDogZm9yd2FyZHMpO1xyXG59XHJcblxyXG4uY2Fyb3VzZWwtaXRlbS5zbGlkZS1vdXQtbGVmdCB7XHJcblx0QGluY2x1ZGUgYW5pbWF0aW9uLW5hbWUoc2xpZGVPdXRMZWZ0KTtcclxuXHRAaW5jbHVkZSBhbmltYXRpb24tZHVyYXRpb24oJHNsaWRlRHVyYXRpb24pO1xyXG5cdEBpbmNsdWRlIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb24oZWFzZSk7XHJcblx0Ly9AaW5jbHVkZSBzbGlkZU91dFJpZ2h0KCRkdXJhdGlvbjogJHNsaWRlRHVyYXRpb24sICRmdW5jdGlvbjogZWFzZS1pbiwgJGZpbGw6IGZvcndhcmRzKVxyXG59XHJcblxyXG4uY2Fyb3VzZWwtaXRlbS5zbGlkZS1vdXQtcmlnaHQge1xyXG5cdEBpbmNsdWRlIGFuaW1hdGlvbi1uYW1lKHNsaWRlT3V0UmlnaHQpO1xyXG5cdEBpbmNsdWRlIGFuaW1hdGlvbi1kdXJhdGlvbigkc2xpZGVEdXJhdGlvbik7XHJcblx0QGluY2x1ZGUgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbihlYXNlKTtcclxuXHQvL0BpbmNsdWRlIHNsaWRlT3V0TGVmdCgkZHVyYXRpb246ICRzbGlkZUR1cmF0aW9uLCAkZnVuY3Rpb246IGVhc2UtaW4sICRmaWxsOiBmb3J3YXJkcyk7XHJcbn0iLCJAY2hhcnNldCBcIlVURi04XCI7XG5cbi8vLyBBIG1peGluIGZvciBnZW5lcmF0aW5nIHZlbmRvciBwcmVmaXhlcyBvbiBub24tc3RhbmRhcmRpemVkIHByb3BlcnRpZXMuXG4vLy9cbi8vLyBAcGFyYW0ge1N0cmluZ30gJHByb3BlcnR5XG4vLy8gICBQcm9wZXJ0eSB0byBwcmVmaXhcbi8vL1xuLy8vIEBwYXJhbSB7Kn0gJHZhbHVlXG4vLy8gICBWYWx1ZSB0byB1c2Vcbi8vL1xuLy8vIEBwYXJhbSB7TGlzdH0gJHByZWZpeGVzXG4vLy8gICBQcmVmaXhlcyB0byBkZWZpbmVcbi8vL1xuLy8vIEBleGFtcGxlIHNjc3MgLSBVc2FnZVxuLy8vICAgLmVsZW1lbnQge1xuLy8vICAgICBAaW5jbHVkZSBwcmVmaXhlcihib3JkZXItcmFkaXVzLCAxMHB4LCB3ZWJraXQgbXMgc3BlYyk7XG4vLy8gICB9XG4vLy9cbi8vLyBAZXhhbXBsZSBjc3MgLSBDU1MgT3V0cHV0XG4vLy8gICAuZWxlbWVudCB7XG4vLy8gICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMTBweDtcbi8vLyAgICAgLW1vei1ib3JkZXItcmFkaXVzOiAxMHB4O1xuLy8vICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuLy8vICAgfVxuLy8vXG4vLy8gQHJlcXVpcmUge3ZhcmlhYmxlfSAkcHJlZml4LWZvci13ZWJraXRcbi8vLyBAcmVxdWlyZSB7dmFyaWFibGV9ICRwcmVmaXgtZm9yLW1vemlsbGFcbi8vLyBAcmVxdWlyZSB7dmFyaWFibGV9ICRwcmVmaXgtZm9yLW1pY3Jvc29mdFxuLy8vIEByZXF1aXJlIHt2YXJpYWJsZX0gJHByZWZpeC1mb3Itb3BlcmFcbi8vLyBAcmVxdWlyZSB7dmFyaWFibGV9ICRwcmVmaXgtZm9yLXNwZWNcblxuQG1peGluIHByZWZpeGVyKCRwcm9wZXJ0eSwgJHZhbHVlLCAkcHJlZml4ZXMpIHtcbiAgQGVhY2ggJHByZWZpeCBpbiAkcHJlZml4ZXMge1xuICAgIEBpZiAkcHJlZml4ID09IHdlYmtpdCB7XG4gICAgICBAaWYgJHByZWZpeC1mb3Itd2Via2l0IHtcbiAgICAgICAgLXdlYmtpdC0jeyRwcm9wZXJ0eX06ICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9IEBlbHNlIGlmICRwcmVmaXggPT0gbW96IHtcbiAgICAgIEBpZiAkcHJlZml4LWZvci1tb3ppbGxhIHtcbiAgICAgICAgLW1vei0jeyRwcm9wZXJ0eX06ICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9IEBlbHNlIGlmICRwcmVmaXggPT0gbXMge1xuICAgICAgQGlmICRwcmVmaXgtZm9yLW1pY3Jvc29mdCB7XG4gICAgICAgIC1tcy0jeyRwcm9wZXJ0eX06ICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9IEBlbHNlIGlmICRwcmVmaXggPT0gbyB7XG4gICAgICBAaWYgJHByZWZpeC1mb3Itb3BlcmEge1xuICAgICAgICAtby0jeyRwcm9wZXJ0eX06ICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9IEBlbHNlIGlmICRwcmVmaXggPT0gc3BlYyB7XG4gICAgICBAaWYgJHByZWZpeC1mb3Itc3BlYyB7XG4gICAgICAgICN7JHByb3BlcnR5fTogJHZhbHVlO1xuICAgICAgfVxuICAgIH0gQGVsc2UgIHtcbiAgICAgIEB3YXJuIFwiVW5yZWNvZ25pemVkIHByZWZpeDogI3skcHJlZml4fVwiO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gZGlzYWJsZS1wcmVmaXgtZm9yLWFsbCgpIHtcbiAgJHByZWZpeC1mb3Itd2Via2l0OiAgICBmYWxzZSAhZ2xvYmFsO1xuICAkcHJlZml4LWZvci1tb3ppbGxhOiAgIGZhbHNlICFnbG9iYWw7XG4gICRwcmVmaXgtZm9yLW1pY3Jvc29mdDogZmFsc2UgIWdsb2JhbDtcbiAgJHByZWZpeC1mb3Itb3BlcmE6ICAgICBmYWxzZSAhZ2xvYmFsO1xuICAkcHJlZml4LWZvci1zcGVjOiAgICAgIGZhbHNlICFnbG9iYWw7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0= */\n\t"],
            template: "\n   <div class=\"carousel slide\">\n     <ol class=\"carousel-indicators\">\n       <li *ng-for=\"#image of images\"\n         (click)=\"switchTo(image)\" [class.active]=\"image.isActive && !image.checkIfAnimating()\"></li> \n     </ol>\n     <div class=\"carousel-inner\" role=\"listbox\">\n         <ng-content></ng-content>\n     </div>\n     <a class=\"left carousel-control\" role=\"button\" (click)=\"prevImage()\">\n       <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n       <span class=\"sr-only\">Previous</span>\n     </a>\n     <a class=\"right carousel-control\" role=\"button\" (click)=\"nextImage()\">\n       <span class=\"icon-next\" aria-hidden=\"true\"></span>\n       <span class=\"sr-only\">Next</span>\n     </a>\n   </div>\n\t",
            directives: [angular2_1.CORE_DIRECTIVES, CarouselItem],
            encapsulation: angular2_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], Carousel);
    return Carousel;
})();
exports.Carousel = Carousel;
exports.CAROUSEL_PROVIDERS = [
    Carousel, CarouselItem
];

//# sourceMappingURL=Carousel.js.map
