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
var OrderBy_1 = require("../../pipes/OrderBy/OrderBy");
var Format_1 = require("../../pipes/Format/Format");
var TableSortableSorting_1 = require("./TableSortableSorting");
var TableSortable = (function () {
    function TableSortable() {
    }
    TableSortable.prototype.selectedClass = function (columnName) {
        return columnName == this.sort.column ? 'sort-' + (this.sort.descending ? 'desc' : 'asc') : '';
    };
    TableSortable.prototype.changeSorting = function (columnName) {
        var sort = this.sort;
        if (sort.column == columnName) {
            sort.descending = !sort.descending;
        }
        else {
            sort.column = columnName;
            sort.descending = false;
        }
    };
    TableSortable.prototype.convertSorting = function () {
        return this.sort.descending ? '-' + this.sort.column : this.sort.column;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TableSortable.prototype, "columns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TableSortable.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', TableSortableSorting_1.TableSortableSorting)
    ], TableSortable.prototype, "sort", void 0);
    TableSortable = __decorate([
        core_1.Component({
            selector: 'table-sortable',
            template: "\n    <table class=\"table table-hover table-striped table-sortable\">\n      <thead>\n        <tr>\n          <th *ngFor=\"#column of columns\" [class]=\"selectedClass(column.variable)\" (click)=\"changeSorting(column.variable)\">\n            {{column.display}}\n          </th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"#object of data | orderBy : convertSorting()\">\n          <td *ngFor=\"#column of columns\" [innerHtml]=\"object[column.variable] | format : column.filter\"></td>\n        </tr>\n      </tbody>\n    </table>\n  ",
            directives: [common_1.CORE_DIRECTIVES],
            pipes: [OrderBy_1.OrderByPipe, common_1.JsonPipe, Format_1.FormatPipe]
        }), 
        __metadata('design:paramtypes', [])
    ], TableSortable);
    return TableSortable;
}());
exports.TableSortable = TableSortable;
exports.TABLESORTABLE_PROVIDERS = [
    TableSortable
];
var TableSortableColumn_1 = require("./TableSortableColumn");
exports.TableSortableColumn = TableSortableColumn_1.TableSortableColumn;
var TableSortableSorting_2 = require("./TableSortableSorting");
exports.TableSortableSorting = TableSortableSorting_2.TableSortableSorting;

//# sourceMappingURL=TableSortable.js.map
