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
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var CarouselDemo = (function () {
    function CarouselDemo() {
        this.carouselImages = [
            "images/carouselImages/beach.png",
            "images/carouselImages/river.jpg",
            "images/carouselImages/windmill.jpg"
        ];
        this.attributes = [
            new demoUtilities_1.Attribute('interval', 'number', '0', 'Time in ms before auto-advancing slide. If set to 0 slides will not auto-advance')
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
    }
    CarouselDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Carousel</h2>\n            <p class=\"card-text\">Carousel is a custom component to display content in a rotating manner</p>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n<!--<carousel>\n        <div class=\"carousel-item\" style=\"background-color: SteelBlue; height: 200px;\">\n            <h3 style=\"margin: auto auto;\">Some title</h3>\n        </div>\n        <div class=\"carousel-item\" style=\"background-color: Crimson; height: 300px;\">\n            <h3 style=\"margin: auto auto;\">another title</h3>\n        </div>\n        <div class=\"carousel-item\" style=\"background-color: MediumAquaMarine; height: 250px;\">\n            <h3 style=\"margin: auto auto;\">gratuitous title</h3>\n        </div>\n        <div class=\"carousel-item\" style=\"background-color: MediumSlateBlue; height: 250px;\">\n            <h3 style=\"margin: auto auto;\">yet another title title</h3>\n        </div>\n        <div class=\"carousel-item\" style=\"background-color: Khaki; height: 250px;\">\n            <h3 style=\"margin: auto auto;\">really another title?</h3>\n        </div>\n    </carousel>\n</div>-->\n\n<div class=\"row\">\n    <carousel interval=\"10000\" class=\"col-md-6\">\n        <img *ngFor=\"let image of carouselImages\" src=\"{{image}}\" class=\"carousel-item\" />\n    </carousel>\n    \n    <carousel interval=\"10000\" class=\"col-md-6\">\n        <div *ngFor=\"let image of carouselImages\" class=\"carousel-item\">\n            <img src=\"{{image}}\" />\n            <div class=\"carousel-caption\">\n                <h3>Some Title</h3>\n                <p>Path: {{image}}</p>\n            </div>\n        </div>\n    </carousel>\n</div>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {CAROUSEL_PROVIDERS} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Carousel is a custom element to display a slideshow of cycling elements</p>\n<p>Swipe left and swipe right events are supported if hammerjs has been included.</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"Images Only\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;carousel&gt;\n    &lt;img src=&quot;image1.jpg&quot; class=&quot;carousel-item&quot; /&gt;\n    &lt;img src=&quot;image2.jpg&quot; class=&quot;carousel-item&quot; /&gt;\n    &lt;img src=&quot;image3.jpg&quot; class=&quot;carousel-item&quot; /&gt;\n&lt;/carousel&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"Images With Captions\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;carousel&gt;\n    &lt;div class=&quot;carousel-item&quot;&gt;\n        &lt;img src=&quot;image1.jpg&quot; /&gt;\n        &lt;div class=&quot;carousel-caption&quot;&gt;\n            &lt;h3&gt;Some Title 1&lt;/h3&gt;\n            &lt;p&gt;Some caption 1&lt;/p&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;carousel-item&quot;&gt;\n        &lt;img src=&quot;image2.jpg&quot; /&gt;\n        &lt;div class=&quot;carousel-caption&quot;&gt;\n            &lt;h3&gt;Some Title 2&lt;/h3&gt;\n            &lt;p&gt;Some caption 2&lt;/p&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/carousel&gt;\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n</div>",
            directives: [Carousel_1.CAROUSEL_PROVIDERS, CodeHighlighter_1.CodeHighlighter, Tab_1.TAB_PROVIDERS, TableSortable_1.TableSortable]
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
