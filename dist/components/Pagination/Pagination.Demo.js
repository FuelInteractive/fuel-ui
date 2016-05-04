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
var Pagination_1 = require('./Pagination');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var PaginationDemo = (function () {
    function PaginationDemo() {
        this.totalPages = 10;
        this.pagesAtOnce = 5;
        this.currentPage = 1;
        this.showSteps = true;
        this.showEnds = true;
        this.showSelect = true;
        this.attributes = [
            new demoUtilities_1.Attribute('currentPage', 'number', '1', 'Currently active page'),
            new demoUtilities_1.Attribute('pagesAtOnce', 'number', '5', 'The max number of pages to be displayed at once'),
            new demoUtilities_1.Attribute('totalPages', 'number', '10', 'Total number of pages'),
            new demoUtilities_1.Attribute('showSelect', 'boolean', 'true', 'Show jump to select to choose page number from select box'),
            new demoUtilities_1.Attribute('showEnds', 'boolean', 'true', 'Show first/last buttons to jump to the first or last page'),
            new demoUtilities_1.Attribute('showSteps', 'boolean', 'true', 'Show arrows on ends of page numbers to step through pages')
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
        this.events = [
            new demoUtilities_1.Event('currentPageChange', '$event = newCurrentPage: number', 'New active page number')
        ];
        this.eventsColumns = demoUtilities_1.EventColumns;
        this.eventsSort = demoUtilities_1.EventsDefaultSort;
    }
    PaginationDemo.prototype.pageChange = function (page) {
        this.currentPage = page;
    };
    PaginationDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Pagination</h2>\n            <p class=\"card-text\">Pagination is a custom component to display a pagination number list</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <div class=\"col-md-8\">\n        <form>\n            <div class=\"form-group row\">\n                <label for=\"totalPages\" class=\"col-sm-2 form-control-label\">Total Pages</label>\n                <div class=\"col-sm-2\">\n                    <input class=\"form-control\" [(ngModel)]=\"totalPages\" min=\"1\" type=\"number\" name=\"totalPages\">\n                </div>\n            </div>\n            <div class=\"form-group row\">\n                <label for=\"pagesAtOnce\" class=\"col-sm-2 form-control-label\">Pages At Once</label>\n                <div class=\"col-sm-2\">\n                    <input class=\"form-control\" [(ngModel)]=\"pagesAtOnce\" min=\"1\" [max]=\"totalPages\" type=\"number\" name=\"pagesAtOnce\">\n                </div>\n            </div>\n            <div class=\"form-group row\">\n                <label for=\"currentPage\" class=\"col-sm-2 form-control-label\">Current Page</label>\n                <div class=\"col-sm-2\">\n                    <input class=\"form-control\" [(ngModel)]=\"currentPage\" min=\"1\" [max]=\"totalPages\" type=\"number\" name=\"currentPage\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"checkbox col-md-3\">\n                    <label for=\"showSteps\" class=\"form-control-label\">\n                        <input [(ngModel)]=\"showSteps\" type=\"checkbox\" /> \n                        Show Next/Previous\n                    </label>\n                </div>\n                <div class=\"checkbox col-md-3\">\n                    <label for=\"showEnds\" class=\"form-control-label\">\n                        <input [(ngModel)]=\"showEnds\" type=\"checkbox\" /> \n                        Show First/Last\n                    </label>\n                </div>\n                <div class=\"checkbox col-md-3\">\n                    <label for=\"showSelect\" class=\"form-control-label\">\n                        <input [(ngModel)]=\"showSelect\" type=\"checkbox\" /> \n                        Show Jump To\n                    </label>\n                </div>\n            </div>\n        </form>\n        <pagination\n            [(currentPage)]=\"currentPage\"\n            [totalPages]=\"totalPages\"\n            [pagesAtOnce]=\"pagesAtOnce\"\n            [showSelect]=\"showSelect\"\n            [showEnds]=\"showEnds\"\n            [showSteps]=\"showSteps\"\n            (currentPageChange)=\"pageChange($event)\">\n        </pagination>\n    </div>\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {Pagination} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Pagination is a custom element to show an interactive list of page numbers to use for paging</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;pagination\n    [(currentPage)]=&quot;currentPage&quot;\n    totalPages=&quot;10&quot;\n    pagesAtOnce=&quot;1&quot;\n    [showSelect]=&quot;true&quot;\n    [showEnds]=&quot;true&quot;\n    [showSteps]=&quot;false&quot;\n    (currentPageChange)=&quot;pageChange($event)&quot;&gt;\n&lt;/pagination&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class PaginationExample {\n    currentPage: number = 1;\n    \n    pageChange(page: number): void {\n        console.log('New Page: ' + page);\n    }\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n<h3>Events</h3>\n<table-sortable\n    [columns]=\"eventsColumns\"\n    [data]=\"events\"\n    [sort]=\"eventsSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [Pagination_1.PAGINATION_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], PaginationDemo);
    return PaginationDemo;
}());
exports.PaginationDemo = PaginationDemo;
exports.PAGINATION_DEMO_PROVIDERS = [
    PaginationDemo
];

//# sourceMappingURL=Pagination.Demo.js.map
