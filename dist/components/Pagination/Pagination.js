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
var Range_1 = require('../../pipes/Range/Range');
var Pagination = (function () {
    function Pagination(el) {
        this.currentPageChange = new angular2_1.EventEmitter();
        this.pagesBlank = [];
        this._el = el.nativeElement;
    }
    Pagination.prototype.onChanges = function (changes) {
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
            console.log('start', this.startingIndex, this.endingIndex);
        }
        else if (this.totalPages - this.currentPage <= this.pagesAtOnce - Math.ceil(this.pagesAtOnce / 2)) {
            this.startingIndex = this.totalPages - this.pagesAtOnce;
            this.endingIndex = this.totalPages;
            console.log('end', this.startingIndex, this.endingIndex);
        }
        else {
            this.startingIndex = this.currentPage - Math.ceil(this.pagesAtOnce / 2);
            this.endingIndex = this.startingIndex + this.pagesAtOnce < this.totalPages
                ? this.startingIndex + this.pagesAtOnce
                : this.totalPages;
            console.log('maths', this.startingIndex, this.endingIndex);
        }
        this.currentPageChange.next(this.currentPage);
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], Pagination.prototype, "currentPage");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], Pagination.prototype, "pagesAtOnce");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Number)
    ], Pagination.prototype, "totalPages");
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], Pagination.prototype, "currentPageChange");
    Pagination = __decorate([
        angular2_1.Component({
            selector: 'pagination',
            properties: [
                "totalPages: total-pages",
                "pagesAtOnce: pages-at-once"
            ]
        }),
        angular2_1.View({
            styles: ["\n      a {\n        cursor: pointer; }\n\n      /*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUGFnaW5hdGlvbi9QYWdpbmF0aW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQyxDQUFBO0VBQ0MsTUFBTSxFQUFFLE9BQVEsR0FDakIiLCJmaWxlIjoiY29tcG9uZW50cy9QYWdpbmF0aW9uL1BhZ2luYXRpb24uY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0= */\n    "],
            template: "\n      <nav>\n          <ul class=\"pagination\">\n              <li [class.disabled]=\"currentPage == 1\">\n                  <a [attr.disabled]=\"currentPage == 1\" (click)=\"setPage(1)\" aria-label=\"First\">\n                      <span aria-hidden=\"true\">First</span>\n                      <span class=\"sr-only\">First</span>\n                  </a>\n              </li>\n              <li [class.disabled]=\"currentPage == 1\">\n                  <a [attr.disabled]=\"currentPage == 1\" (click)=\"setPage(currentPage - 1)\" aria-label=\"Previous\">\n                      <span aria-hidden=\"true\">&laquo;</span>\n                      <span class=\"sr-only\">Previous</span>\n                  </a>\n              </li>\n              <li *ng-for=\"#page of pagesBlank | range : 1 : totalPages | slice: startingIndex : endingIndex\" [class.active]=\"currentPage == page\">\n                  <a (click)=\"setPage(page)\">{{page}}</a>\n              </li>\n              <li [class.disabled]=\"currentPage == totalPages\">\n                  <a [attr.disabled]=\"currentPage == totalPages\" (click)=\"setPage(currentPage + 1)\" aria-label=\"Next\">\n                      <span aria-hidden=\"true\">&raquo;</span>\n                      <span class=\"sr-only\">Next</span>\n                  </a>\n              </li>\n              <li [class.disabled]=\"currentPage == totalPages\">\n                  <a [attr.disabled]=\"currentPage == totalPages\" (click)=\"setPage(totalPages)\" aria-label=\"Last\">\n                      <span aria-hidden=\"true\">Last</span>\n                      <span class=\"sr-only\">Last</span>\n                  </a>\n              </li>\n          </ul>\n      </nav>\n\n      <div class=\"input-group col-md-3\">\n          <span class=\"input-group-addon\">Jump to:</span>\n          <select class=\"form-control\" (change)=\"setPage($event.target.value)\">\n              <option *ng-for=\"#page of pagesBlank | range : 1 : totalPages\" [value]=\"page\" [selected]=\"page == currentPage\">{{page}}</option>\n          </select>\n      </div>\n    ",
            directives: [angular2_1.CORE_DIRECTIVES],
            pipes: [angular2_1.SlicePipe, Range_1.Range]
        }), 
        __metadata('design:paramtypes', [angular2_1.ElementRef])
    ], Pagination);
    return Pagination;
})();
exports.Pagination = Pagination;
exports.PAGINATION_PROVIDERS = [
    Pagination
];

//# sourceMappingURL=Pagination.js.map
