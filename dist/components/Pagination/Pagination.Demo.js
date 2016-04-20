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
var Pagination_1 = require('./Pagination');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var PaginationDemo = (function () {
    function PaginationDemo() {
        this.totalPages = 10;
        this.pagesAtOnce = 5;
        this.currentPage = 1;
    }
    PaginationDemo.prototype.pageChange = function (page) {
        this.currentPage = page;
    };
    PaginationDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Pagination</h2>\n            <p class=\"card-text\">Pagination is a custom component to display a pagination number list</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <div class=\"col-md-8\">\n        <form>\n            <div class=\"form-group row\">\n                <label for=\"totalPages\" class=\"col-sm-2 form-control-label\">Total Pages</label>\n                <div class=\"col-sm-2\">\n                    <input class=\"form-control\" [(ngModel)]=\"totalPages\" min=\"1\" type=\"number\" name=\"totalPages\">\n                </div>\n            </div>\n            <div class=\"form-group row\">\n                <label for=\"pagesAtOnce\" class=\"col-sm-2 form-control-label\">Pages At Once</label>\n                <div class=\"col-sm-2\">\n                    <input class=\"form-control\" [(ngModel)]=\"pagesAtOnce\" min=\"1\" [max]=\"totalPages\" type=\"number\" name=\"pagesAtOnce\">\n                </div>\n            </div>\n            <div class=\"form-group row\">\n                <label for=\"currentPage\" class=\"col-sm-2 form-control-label\">Current Page</label>\n                <div class=\"col-sm-2\">\n                    <input class=\"form-control\" [(ngModel)]=\"currentPage\" min=\"1\" [max]=\"totalPages\" type=\"number\" name=\"currentPage\">\n                </div>\n            </div>\n        </form>\n        <pagination\n            [(currentPage)]=\"currentPage\"\n            [totalPages]=\"totalPages\"\n            [pagesAtOnce]=\"pagesAtOnce\"\n            (currentPageChange)=\"pageChange($event)\">\n        </pagination>\n    </div>\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {Pagination} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Pagination is a custom element to show an interactive list of page numbers to use for paging</p>\n\n<h3>Usage</h3>\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;pagination\n    [(currentPage)]=&quot;currentPage&quot;\n    totalPages=&quot;10&quot;\n    pagesAtOnce=&quot;1&quot;\n    (currentPageChange)=&quot;pageChange($event)&quot;&gt;\n&lt;/pagination&gt;\n</code>\n</pre>\n\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class PaginationDemo {\n    pageChange(page: number): void {\n        console.log('New Page: ' + page);\n    }\n}\n</code>\n</pre>\n\n<h3>Attributes</h3>\n<table class=\"table table-bordered table-striped\">\n    <thead>\n        <tr>\n            <th>Name</th>\n            <th>Type</th>\n            <th>Default</th>\n            <th>Description</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>currentPage</td>\n            <td>number</td>\n            <td>1</td>\n            <td>Currently active page</td>\n        </tr>\n        <tr>\n            <td>pagesAtOnce</td>\n            <td>number</td>\n            <td>5</td>\n            <td>The max number of pages to be displayed at once</td>\n        </tr>\n        <tr>\n            <td>totalPages</td>\n            <td>number</td>\n            <td>10</td>\n            <td>Total number of pages</td>\n        </tr>\n    </tbody>\n</table>\n\n<h3>Events</h3>\n<table class=\"table table-bordered table-striped\">\n    <thead>\n        <tr>\n            <th>Name</th>\n            <th>Event Object</th>\n            <th>Description</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>currentPageChange</td>\n            <td>$event = newCurrentPage: number</td>\n            <td>New active page number</td>\n        </tr>\n    </tbody>\n</table>\n\n</div>",
            directives: [Pagination_1.PAGINATION_PROVIDERS, CodeHighlighter_1.CodeHighlighter]
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
