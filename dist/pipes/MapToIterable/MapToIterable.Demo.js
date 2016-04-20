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
var common_1 = require("angular2/common");
var MapToIterable_1 = require('./MapToIterable');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var MapToIterableDemo = (function () {
    function MapToIterableDemo() {
        this.data = [
            {
                Any: "foo",
                Keys: "foo",
                At: "foo",
                All: "foo"
            },
            {
                Any: "bar",
                Keys: "bar",
                At: "bar",
                All: "bar"
            }
        ];
    }
    MapToIterableDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">MapToIterable</h2>\n            <p class=\"card-text\">MapToIterable is a custom pipe to make a custom object iterable over its keys</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n<ul *ngFor=\"#object of data\">\n    <li *ngFor=\"#keyValuePair of object | mapToIterable\">\n        {{keyValuePair.key}}: {{keyValuePair.val}}\n    </li>\n</ul>\n</section>\n\n<h3>Reasoning</h3>\n<div>\n    <p>According to Mi\u0161ko Hevery (<a href=\"\" target=\"_blank\">reference</a>):</p>\n\n    <blockquote class=\"blockquote\">\n        <p>Maps have no orders in keys and hence they iteration is unpredictable. This was supported in ng1, but we think it was a mistake and will not be supported in NG2</p>\n\n        <p>The plan is to have a mapToIterable pipe</p>\n\n        <code>*ngFor\"#item of map | mapToIterable\"</code>\n    </blockquote>\n</div>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {MapToIterablePipe} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>MapToIterable pipe is used to make custom objects that have no orders iterable by their keys\n</p>\n\n<h3>Usage</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class MapToIterableExample {\n    data: any[] = [\n        {\n            Any: \"foo\",\n            Keys: \"foo\",\n            At: \"foo\",\n            All: \"foo\"\n        },\n        {\n            Any: \"bar\",\n            Keys: \"bar\",\n            At: \"bar\",\n            All: \"bar\"\n        }\n    ]\n}\n</code>\n</pre>\n\n<pre>\n<code class=\"language-html\" code-highlight>\n&lt;ul *ngFor=&quot;#object of data&quot;&gt;\n    &lt;li *ngFor=&quot;#keyValuePair of object | mapToIterable&quot;&gt;\n        {<pre>{</pre>keyValuePair.key}}: {<pre>{</pre>keyValuePair.val}}\n    &lt;/li&gt;\n&lt;/ul&gt;\n</code>\n</pre>\n\n<h3>Parameters</h3>\n<table class=\"table table-bordered table-striped\">\n    <thead>\n        <tr>\n            <th>Name</th>\n            <th>Type</th>\n            <th>Default</th>\n            <th>Description</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>type</td>\n            <td>string</td>\n            <td>text</td>\n            <td>The type of data you want the input to be output as</td>\n        </tr>\n    </tbody>\n</table>\n\n</div>",
            directives: [common_1.CORE_DIRECTIVES, CodeHighlighter_1.CodeHighlighter],
            pipes: [MapToIterable_1.MAPTOITERABLE_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], MapToIterableDemo);
    return MapToIterableDemo;
}());
exports.MapToIterableDemo = MapToIterableDemo;
exports.MAPTOITERABLE_DEMO_PROVIDERS = [
    MapToIterableDemo
];

//# sourceMappingURL=MapToIterable.Demo.js.map
