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
var Animation_1 = require('./Animation');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var AnimationDemo = (function () {
    function AnimationDemo() {
        this.play = false;
        this.animationLog = [];
        this.attributes = [
            new demoUtilities_1.Attribute('play', 'boolean', 'false', 'Start the animation')
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
        this.events = [
            new demoUtilities_1.Event('animationstart', 'Animation Object', 'Information about the animation when it starts'),
            new demoUtilities_1.Event('animationend', 'Animation Object', 'Information about the animation when it ends')
        ];
        this.eventsColumns = demoUtilities_1.EventColumns;
        this.eventsSort = demoUtilities_1.EventsDefaultSort;
    }
    AnimationDemo.prototype.start = function () {
        this.play = true;
    };
    AnimationDemo.prototype.logStart = function ($event) {
        this.animationLog.push($event);
    };
    AnimationDemo.prototype.logEnd = function ($event) {
        this.play = false;
        this.animationLog.push($event);
    };
    AnimationDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Animation Helper</h2>\n            <p class=\"card-text\">Animation Helper is a directive that adds events to the element to bind to</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <div class=\"test-box\"\n        animation=\"test-animation-a\"\n        [play]=\"play\"\n        (animationstart)=\"logStart($event)\"\n        (animationend)=\"logEnd($event)\"></div>\n    <button class=\"btn btn-primary\" (click)=\"start()\">Play</button>\n    <div>Playing: {{play}}</div><br/>\n    <div>\n        <h3>Animation Log</h3>\n        <div *ngFor=\"let event of animationLog\">\n            ({{event.timeStamp | date : 'mediumTime'}}) {{event.animationName}}: {{event.type}}\n        </div>\n    </div>\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {Animation} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Animation helper is a directive that adds events to bind to on elements that are animated. It gives information about the animation that is happening and an ability to start and stop the animation. Can be used to combine animations synchronously.</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;div class=&quot;some-animation-class&quot;\n    animation=&quot;test-animation-a&quot;\n    [play]=&quot;play&quot;\n    (animationstart)=&quot;logStart($event)&quot;\n    (animationend)=&quot;logEnd($event)&quot;&gt;&lt;/div&gt;\n&lt;button class=&quot;btn btn-primary&quot; (click)=&quot;start()&quot;&gt;Play&lt;/button&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class AnimationExample {\n    play:boolean = false;\n    animationLog:any[] = [];\n    \n    start(): void{\n        this.play = true;\n    }\n    \n    logStart($event: any): void {\n        this.animationLog.push($event);\n    }\n\n    logEnd($event: any): void {\n        this.play = false;\n        this.animationLog.push($event);\n    }\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n<h3>Events</h3>\n<table-sortable\n    [columns]=\"eventsColumns\"\n    [data]=\"events\"\n    [sort]=\"eventsSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [Animation_1.Animation, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], AnimationDemo);
    return AnimationDemo;
}());
exports.AnimationDemo = AnimationDemo;
exports.ANIMATION_DEMO_PROVIDERS = [
    AnimationDemo
];

//# sourceMappingURL=Animation.Demo.js.map
