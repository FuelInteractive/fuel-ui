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
            styles: ["\n   .carousel-item {\n     width: 100%; }\n\n   .carousel-item.slide-in-left {\n     display: block;\n     position: absolute;\n     top: 0;\n     left: -100%;\n     -webkit-animation-name: slideInLeft;\n     -moz-animation-name: slideInLeft;\n     animation-name: slideInLeft;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   .carousel-item.slide-in-right {\n     display: block;\n     position: absolute;\n     top: 0;\n     left: 100%;\n     -webkit-animation-name: slideInRight;\n     -moz-animation-name: slideInRight;\n     animation-name: slideInRight;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   .carousel-item.slide-out-left {\n     -webkit-animation-name: slideOutLeft;\n     -moz-animation-name: slideOutLeft;\n     animation-name: slideOutLeft;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\n   .carousel-item.slide-out-right {\n     -webkit-animation-name: slideOutRight;\n     -moz-animation-name: slideOutRight;\n     animation-name: slideOutRight;\n     -webkit-animation-duration: 0.5s;\n     -moz-animation-duration: 0.5s;\n     animation-duration: 0.5s;\n     -webkit-animation-timing-function: ease;\n     -moz-animation-timing-function: ease;\n     animation-timing-function: ease; }\n\t"],
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
