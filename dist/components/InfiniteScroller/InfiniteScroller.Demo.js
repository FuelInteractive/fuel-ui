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
var core_1 = require('angular2/core');
var InfiniteScroller_1 = require('./InfiniteScroller');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var InfiniteScrollerDemo = (function () {
    function InfiniteScrollerDemo() {
        this.infiniteScrollItems = [];
        this.infiniteScrollMin = 0;
        this.infiniteScrollMax = 1;
        this.attributes = [
            new demoUtilities_1.Attribute('height', 'string', 'auto', "Height of element. Examples: '300px', '10%', 'auto', etc."),
            new demoUtilities_1.Attribute('distance', 'number', '100', 'How far up and down the user can scroll for more scroll items'),
            new demoUtilities_1.Attribute('hideScrollbar', 'boolean', 'false', 'Hide the scrollbar of the InfiniteScroller')
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
        this.events = [
            new demoUtilities_1.Event('next', 'null', 'When a scroll item is passed when scrolling down'),
            new demoUtilities_1.Event('prev', 'null', 'When a scroll item is passed when scrolling up'),
        ];
        this.eventsColumns = demoUtilities_1.EventColumns;
        this.eventsSort = demoUtilities_1.EventsDefaultSort;
        for (var i = 0; i < 10; i++) {
            this.infinteScrollNext(false);
        }
    }
    InfiniteScrollerDemo.prototype.infiniteScrollPrev = function () {
        var newItem = "";
        for (var i = 0; i < 50; i++) {
            newItem += "Test " + this.infiniteScrollMin + " ";
        }
        this.infiniteScrollMin--;
        this.infiniteScrollItems.unshift(newItem);
    };
    InfiniteScrollerDemo.prototype.infinteScrollNext = function (clean) {
        if (clean === void 0) { clean = true; }
        var newItem = "";
        for (var i = 0; i < 50; i++) {
            newItem += "Test " + this.infiniteScrollMax + " ";
        }
        this.infiniteScrollMax++;
        this.infiniteScrollItems.push(newItem);
    };
    InfiniteScrollerDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Infinite Scroller</h2>\n            <p class=\"card-text\">Infinite Scroller is a custom component to infinitely scroll</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <div class=\"col-md-6\" style=\"border: 1px solid #333; background-color: #EEE\">\n        <infinite-scroller \n            (next)=\"infinteScrollNext()\" \n            (prev)=\"infiniteScrollPrev()\" \n            height=\"300px\"\n            distance=\"120\"\n            hideScrollbar=\"true\">\n            <div *ngFor=\"let item of infiniteScrollItems\" \n                class=\"card p-a scroll-item\" style=\"background-color: #FFF\">\n                <div class=\"card-block\">\n                    <h4 class=\"card-title\">Some Item</h4>\n                    <p class=\"card-text\">{{item}}</p>\n                </div>\n            </div>\n        </infinite-scroller>\n    </div>\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {INFINITE_SCROLLER_PROVIDERS} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>The Infinite Scroller component allows for asynchronous ability to show items as a user scrolls. Use the <code>next</code> and <code>prev</code> events to know when to start adding items to show or removing items for performance reasons.</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;infinite-scroller \n    (next)=&quot;infinteScrollNext()&quot; \n    (prev)=&quot;infiniteScrollPrev()&quot; \n    height=&quot;300px&quot;\n    distance=&quot;120&quot;\n    hideScrollbar=&quot;true&quot;&gt;\n    &lt;div *ngFor=&quot;#item of infiniteScrollItems&quot; \n        class=&quot;card p-a scroll-item&quot;&gt;\n        &lt;div class=&quot;card-block&quot;&gt;\n            &lt;h4 class=&quot;card-title&quot;&gt;Some Item&lt;/h4&gt;\n            &lt;p class=&quot;card-text&quot;&gt;<pre>{</pre>{item}}&lt;/p&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/infinite-scroller&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class InfiniteScrollerDemo {\n    infiniteScrollItems: string[] = [];\n    infiniteScrollMin: number = 0;\n    infiniteScrollMax: number = 1;\n\n    constructor() {\n        for (let i = 0; i < 10; i++) {\n            this.infinteScrollNext(false);\n        }\n    }\n\n    infiniteScrollPrev(): void {\n        var newItem = \"\";\n        for (let i = 0; i < 50; i++) {\n            newItem += \"Test \" + this.infiniteScrollMin + \" \";\n        }\n\n        this.infiniteScrollMin--;\n        this.infiniteScrollItems.unshift(newItem);\n    }\n\n    infinteScrollNext(clean: boolean = true): void {\n        var newItem = \"\";\n        for (let i = 0; i < 50; i++) {\n            newItem += \"Test \" + this.infiniteScrollMax + \" \";\n        }\n\n        this.infiniteScrollMax++;\n        this.infiniteScrollItems.push(newItem);\n    }\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n<h3>Events</h3>\n<table-sortable\n    [columns]=\"eventsColumns\"\n    [data]=\"events\"\n    [sort]=\"eventsSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [InfiniteScroller_1.INFINITE_SCROLLER_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], InfiniteScrollerDemo);
    return InfiniteScrollerDemo;
}());
exports.InfiniteScrollerDemo = InfiniteScrollerDemo;
exports.INFINITESCROLLER_DEMO_PROVIDERS = [
    InfiniteScrollerDemo
];

//# sourceMappingURL=InfiniteScroller.Demo.js.map
