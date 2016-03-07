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
var common_1 = require('angular2/common');
var Range_1 = require('../../pipes/Range/Range');
var Pagination = (function () {
    function Pagination(el) {
        this.currentPageChange = new core_1.EventEmitter();
        this.pagesBlank = [];
        this._el = el.nativeElement;
    }
    Pagination.prototype.ngOnChanges = function (changes) {
        this.setPage(this.currentPage);
    };
    Pagination.prototype.getElement = function () {
        return this._el;
    };
    Pagination.prototype.setPage = function (newPage) {
        if (newPage < 1 || newPage > this.totalPages)
            return;
        this.currentPage = newPage;
        //Shift pagination stuffs
        if (this.currentPage - Math.ceil(this.pagesAtOnce / 2) < 0 || this.totalPages - this.pagesAtOnce <= 0) {
            this.startingIndex = 0;
            this.endingIndex = this.pagesAtOnce;
        }
        else if (this.totalPages - this.currentPage <= this.pagesAtOnce - Math.ceil(this.pagesAtOnce / 2)) {
            this.startingIndex = this.totalPages - this.pagesAtOnce;
            this.endingIndex = this.totalPages;
        }
        else {
            this.startingIndex = this.currentPage - Math.ceil(this.pagesAtOnce / 2);
            this.endingIndex = this.startingIndex + this.pagesAtOnce < this.totalPages
                ? this.startingIndex + this.pagesAtOnce
                : this.totalPages;
        }
        this.currentPageChange.next(this.currentPage);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Pagination.prototype, "currentPage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Pagination.prototype, "pagesAtOnce", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Pagination.prototype, "totalPages", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Pagination.prototype, "currentPageChange", void 0);
    Pagination = __decorate([
        core_1.Component({
            selector: 'pagination',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            properties: [
                "totalPages: total-pages",
                "pagesAtOnce: pages-at-once"
            ]
        }),
        core_1.View({
            styles: ["\n      a {\n        cursor: pointer; }\n\n      a:hover {\n        text-decoration: none; }\n    "],
            template: "\n      <nav>\n          <ul class=\"pagination\">\n              <li class=\"page-item\" [class.disabled]=\"currentPage == 1\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == 1\" (click)=\"setPage(1)\" aria-label=\"First\">\n                      <span aria-hidden=\"true\">First</span>\n                      <span class=\"sr-only\">First</span>\n                  </a>\n              </li>\n              <li class=\"page-item\" [class.disabled]=\"currentPage == 1\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == 1\" (click)=\"setPage(currentPage - 1)\" aria-label=\"Previous\">\n                      <span aria-hidden=\"true\">&#171;</span>\n                      <span class=\"sr-only\">Previous</span>\n                  </a>\n              </li>\n              <li *ngFor=\"#page of pagesBlank | range : 1 : totalPages | slice: startingIndex : endingIndex\" class=\"page-item\" [class.active]=\"currentPage == page\">\n                  <a class=\"page-link\" (click)=\"setPage(page)\">{{page}}</a>\n              </li>\n              <li class=\"page-item\" [class.disabled]=\"currentPage == totalPages\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == totalPages\" (click)=\"setPage(currentPage + 1)\" aria-label=\"Next\">\n                      <span aria-hidden=\"true\">&#187;</span>\n                      <span class=\"sr-only\">Next</span>\n                  </a>\n              </li>\n              <li class=\"page-item\" [class.disabled]=\"currentPage == totalPages\">\n                  <a class=\"page-link\" [attr.disabled]=\"currentPage == totalPages\" (click)=\"setPage(totalPages)\" aria-label=\"Last\">\n                      <span aria-hidden=\"true\">Last</span>\n                      <span class=\"sr-only\">Last</span>\n                  </a>\n              </li>\n          </ul>\n      </nav>\n\n      <div class=\"input-group col-md-3\">\n          <span class=\"input-group-addon\">Jump to:</span>\n          <select class=\"form-control\" (change)=\"setPage($event.target.value)\">\n              <option *ngFor=\"#page of pagesBlank | range : 1 : totalPages\" [value]=\"page\" [selected]=\"page == currentPage\">{{page}}</option>\n          </select>\n      </div>\n    ",
            directives: [common_1.CORE_DIRECTIVES],
            pipes: [common_1.SlicePipe, Range_1.Range]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Pagination);
    return Pagination;
}());
exports.Pagination = Pagination;
exports.PAGINATION_PROVIDERS = [
    Pagination
];

//# sourceMappingURL=Pagination.js.map
