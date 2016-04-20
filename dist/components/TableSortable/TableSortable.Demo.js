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
var TableSortable_1 = require('./TableSortable');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortableDemo = (function () {
    function TableSortableDemo() {
        this.rows = [
            {
                Name: 'Data 1',
                Amount: 100.23,
                Date: 1441588216000
            },
            {
                Name: 'Data 2',
                Amount: 0.875623,
                Date: 1442387616000
            },
            {
                Name: 'Data 3',
                Amount: .010123,
                Date: 1442187616000
            }
        ];
        this.columns = [
            {
                display: 'Column 1',
                variable: 'Name',
                filter: 'text' //The type data type of the column (number, text, date, etc.)
            },
            new TableSortable_1.TableSortableColumn('Column 2', 'Amount', 'decimal : 1.0-2'),
            new TableSortable_1.TableSortableColumn('Column 3', 'Date', 'dateTime')
        ];
        this.sorting = {
            column: 'Name',
            descending: false
        };
    }
    TableSortableDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">TableSortable</h2>\n            <p class=\"card-text\">TableSortable is a custom element to display any arbitrary data in a sortable data table</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <div class=\"col-md-8\">\n        <table-sortable\n            [columns]=\"columns\"\n            [data]=\"rows\"\n            [sort]=\"sorting\">\n            Loading table...\n        </table-sortable>\n    </div>\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {TableSortable, TableSortableColumn, TableSortableSorting} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>TableSortable is a custom element to display any arbitrary data in a sortable table</p>\n\n<h3>Usage</h3>\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;table-sortable\n    [columns]=&quot;columns&quot;\n\t[data]=&quot;rows&quot;\n\t[sort]=&quot;sorting&quot;&gt;\n  Loading table...\n&lt;/table-sortable&gt;\n</code>\n</pre>\n\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class TableSortableExample {\n    rows: any[] = [\n    {\n      Name: 'Data 1',\n      Amount: 100.23,\n      Date: 1441588216000\n    },\n    {\n      Name: 'Data 2',\n      Amount: 0.875623,\n      Date: 1442387616000\n    },\n    {\n      Name: 'Data 3',\n      Amount: .010123,\n      Date: 1442187616000\n    }\n  ];\n  columns: TableSortableColumn[] = [\n    {\n      display: 'Column 1', //The text to display\n      variable: 'Name', //The name of the key that's apart of the data array\n      filter: 'text' //The type data type of the column (number, text, date, etc.)\n    },\n    new TableSortableColumn('Column 2', 'Amount', 'decimal : 1.0-2'),\n    new TableSortableColumn('Column 3', 'Date', 'dateTime')\n  ];\n  sorting: TableSortableSorting = {\n    column: 'Name', //to match the variable of one of the columns\n    descending: false\n  };\n}\n</code>\n</pre>\n\n<h3>Attributes</h3>\n<table class=\"table table-bordered table-striped\">\n    <thead>\n        <tr>\n            <th>Name</th>\n            <th>Type</th>\n            <th>Default</th>\n            <th>Description</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>columns</td>\n            <td>TableSortableColumn[]</td>\n            <td>null</td>\n            <td>Array of all columns to be displayed and how to format them for ordering</td>\n        </tr>\n        <tr>\n            <td>data</td>\n            <td>any[]</td>\n            <td>null</td>\n            <td>Any arbitrary array of objects</td>\n        </tr>\n        <tr>\n            <td>sort</td>\n            <td>TableSortableSorting</td>\n            <td>null</td>\n            <td>Which column to sort on and which direction (ascending or descending)</td>\n        </tr>\n    </tbody>\n</table>\n\n</div>",
            directives: [TableSortable_1.TABLESORTABLE_PROVIDERS, CodeHighlighter_1.CodeHighlighter]
        }), 
        __metadata('design:paramtypes', [])
    ], TableSortableDemo);
    return TableSortableDemo;
}());
exports.TableSortableDemo = TableSortableDemo;
exports.TABLESORTABLE_DEMO_PROVIDERS = [
    TableSortableDemo
];

//# sourceMappingURL=TableSortable.Demo.js.map
