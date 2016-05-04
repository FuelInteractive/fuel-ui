"use strict";
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
var Carousel_1 = require('./Carousel');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var Tab_1 = require('../../components/Tab/Tab');
var CarouselDemo = (function () {
    function CarouselDemo() {
        this.carouselImages = [
            "images/carouselImages/beach.png",
            "images/carouselImages/river.jpg",
            "images/carouselImages/windmill.jpg"
        ];
    }
    CarouselDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Carousel</h2>\n            <p class=\"card-text\">Carousel is a custom component to display content in a rotating manner</p>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <carousel class=\"col-md-6\">\n        <img *ngFor=\"let image of carouselImages\" src=\"{{image}}\" class=\"carousel-item\" />\n    </carousel>\n    \n    <carousel class=\"col-md-6\">\n        <div *ngFor=\"let image of carouselImages\" class=\"carousel-item\">\n            <img src=\"{{image}}\" />\n            <div class=\"carousel-caption\">\n                <h3>Some Title</h3>\n                <p>Path: {{image}}</p>\n            </div>\n        </div>\n    </carousel>\n</div>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {CAROUSEL_PROVIDERS} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Carousel is a custom element to display a slideshow of cycling elements</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"Images Only\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;carousel&gt;\n    &lt;img src=&quot;image1.jpg&quot; class=&quot;carousel-item&quot; /&gt;\n    &lt;img src=&quot;image2.jpg&quot; class=&quot;carousel-item&quot; /&gt;\n    &lt;img src=&quot;image3.jpg&quot; class=&quot;carousel-item&quot; /&gt;\n&lt;/carousel&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"Images With Captions\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;carousel&gt;\n    &lt;div class=&quot;carousel-item&quot;&gt;\n        &lt;img src=&quot;image1.jpg&quot; /&gt;\n        &lt;div class=&quot;carousel-caption&quot;&gt;\n            &lt;h3&gt;Some Title 1&lt;/h3&gt;\n            &lt;p&gt;Some caption 1&lt;/p&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;carousel-item&quot;&gt;\n        &lt;img src=&quot;image2.jpg&quot; /&gt;\n        &lt;div class=&quot;carousel-caption&quot;&gt;\n            &lt;h3&gt;Some Title 2&lt;/h3&gt;\n            &lt;p&gt;Some caption 2&lt;/p&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/carousel&gt;\n</code>\n</pre>\n</tab>\n</tabset>\n</div>",
            directives: [Carousel_1.CAROUSEL_PROVIDERS, CodeHighlighter_1.CodeHighlighter, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], CarouselDemo);
    return CarouselDemo;
}());
exports.CarouselDemo = CarouselDemo;
exports.CAROUSEL_DEMO_PROVIDERS = [
    CarouselDemo
];

//# sourceMappingURL=Carousel.Demo.js.map
