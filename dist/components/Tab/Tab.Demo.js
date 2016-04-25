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
var Tab_1 = require('./Tab');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var TabDemo = (function () {
    function TabDemo() {
        this.tabs = [
            { heading: 'Title 1', content: 'Content 1', active: true },
            { heading: 'Title 2', content: 'Content 2' },
            { heading: 'Title 3', content: 'Content 3' },
            { heading: 'Title 4', content: 'Content 4', removable: true }
        ];
        this.tabSetAttributes = [
            new demoUtilities_1.Attribute('vertical', 'boolean', 'false', 'Displays the tabs vertically'),
            new demoUtilities_1.Attribute('type', 'string', 'tabs', 'The tab type to be displayed. Can also be "pills" to display tab headers as bubbles, commonly used when displaying tabs vertically'),
        ];
        this.tabSetAttributesColumns = demoUtilities_1.AttributeColumns;
        this.tabSetAttributesSort = demoUtilities_1.AttributesDefaultSort;
        this.tabAttributes = [
            new demoUtilities_1.Attribute('heading', 'string', 'null', 'Html of Tab\'s heading'),
            new demoUtilities_1.Attribute('active', 'boolean', 'false', 'Is currently selected and displayed'),
            new demoUtilities_1.Attribute('disabled', 'boolean', 'false', 'Makes the tab greyed out and unselectable'),
            new demoUtilities_1.Attribute('removable', 'boolean', 'false', 'Makes the tab able to be removed from the TabSet and adds an X icon to the heading that removes the tab on click')
        ];
        this.tabAttributesColumns = demoUtilities_1.AttributeColumns;
        this.tabAttributesSort = demoUtilities_1.AttributesDefaultSort;
        this.tabEvents = [
            new demoUtilities_1.Event('deselect', '$event = tab: Tab', 'Returns the Tab object when deselected'),
            new demoUtilities_1.Event('remove', '$event = tab: Tab', 'Returns the Tab object when removed'),
            new demoUtilities_1.Event('select', '$event = tab: Tab', 'Returns the Tab object when selected')
        ];
        this.tabEventsColumns = demoUtilities_1.EventColumns;
        this.tabEventsSort = demoUtilities_1.EventsDefaultSort;
    }
    TabDemo.prototype.addTab = function () {
        this.tabs.push({ heading: 'Removable Tab', content: "I'm removable", removable: true });
    };
    TabDemo.prototype.setActiveTab = function (index) {
        this.tabs[index].active = true;
    };
    ;
    TabDemo.prototype.deselectLog = function (tab) {
        console.log('Deselected:', tab.heading);
    };
    TabDemo.prototype.selectLog = function (tab) {
        console.log('Selected:', tab.heading);
    };
    TabDemo.prototype.removeLog = function (tab) {
        console.log('Removed:', tab.heading);
    };
    TabDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Tabs</h2>\n            <p class=\"card-text\">TabSet is a custom component to display a tabbed interface</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <div (click)=\"$event.preventDefault()\">\n    <p>Select a tab by setting active binding to true:</p>\n    <p>\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" [disabled]=\"tabs[1].active\" (click)=\"tabs[1].active = true\">Select 2nd tab</button>\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" [disabled]=\"tabs[2].active\" (click)=\"tabs[2].active = true\">Select 3rd tab</button>\n    </p>\n    <p>\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"tabs[2].disabled = ! tabs[2].disabled\">Enable/Disable 3rd tab</button>\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"addTab()\">Add a removable tab</button>\n    </p>\n    <hr />\n    <tabset>\n        <tab *ngFor=\"#theTab of tabs\"\n            [heading]=\"theTab.heading\"\n            [(active)]=\"theTab.active\"\n            [disabled]=\"theTab.disabled\"\n            [removable]=\"theTab.removable\"\n            (deselect)=\"deselectLog($event)\"\n            (select)=\"selectLog($event)\"\n            (remove)=\"removeLog($event)\">\n        {{theTab?.content}}\n        </tab>\n    </tabset>\n\n    <hr />\n\n    <tabset [vertical]=\"true\" type=\"pills\">\n        <tab heading=\"Vertical 1\">Vertical content 1</tab>\n        <tab heading=\"Vertical 2\">Vertical content 2</tab>\n    </tabset>\n    </div>\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {TAB_PROVIDERS} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>TabSet is a custom element to show an interactive tabbed interface. Used in conjuction with the custom Tab element, TabSet can be displayed in a number of ways</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;tabset&gt;\n    &lt;tab *ngFor=&quot;#theTab of tabs&quot;\n        [heading]=&quot;theTab.heading&quot;\n        [(active)]=&quot;theTab.active&quot;\n        [disabled]=&quot;theTab.disabled&quot;\n        [removable]=&quot;theTab.removable&quot;\n        (deselect)=&quot;deselectLog($event)&quot;\n        (select)=&quot;selectLog($event)&quot;\n        (remove)=&quot;removeLog($event)&quot;&gt;\n    {<pre>{</pre>theTab?.content}}\n    &lt;/tab&gt;\n&lt;/tabset&gt;\n\n&lt;tabset [vertical]=&quot;true&quot; type=&quot;pills&quot;&gt;\n    &lt;tab heading=&quot;Vertical 1&quot;&gt;Vertical content 1&lt;/tab&gt;\n    &lt;tab heading=&quot;Vertical 2&quot;&gt;Vertical content 2&lt;/tab&gt;\n&lt;/tabset&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class TabExample {\n    tabs:any[] = [\n        {heading: 'Title 1', content: 'Content 1', active: true},\n        {heading: 'Title 2', content: 'Content 2'},\n        {heading: 'Title 3', content: 'Content 3'},\n        {heading: 'Title 4', content: 'Content 4', removable: true}\n    ];\n    \n    deselectLog(tab: Tab):void {\n        console.log('Deselected:', tab.heading);\n    }\n    \n    selectLog(tab: Tab):void {\n        console.log('Selected:', tab.heading);\n    }\n    \n    removeLog(tab: Tab):void {\n        console.log('Removed:', tab.heading);\n    }\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>TabSet Attributes</h3>\n<table-sortable\n    [columns]=\"tabSetAttributesColumns\"\n    [data]=\"tabSetAttributes\"\n    [sort]=\"tabSetAttributesSort\">\n    Loading table...\n</table-sortable>\n\n<h3>Tab Attributes</h3>\n<table-sortable\n    [columns]=\"tabAttributesColumns\"\n    [data]=\"tabAttributes\"\n    [sort]=\"tabAttributesSort\">\n    Loading table...\n</table-sortable>\n\n<h3>Tab Events</h3>\n<table-sortable\n    [columns]=\"tabEventsColumns\"\n    [data]=\"tabEvents\"\n    [sort]=\"tabEventsSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [common_1.CORE_DIRECTIVES, Tab_1.TAB_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable]
        }), 
        __metadata('design:paramtypes', [])
    ], TabDemo);
    return TabDemo;
}());
exports.TabDemo = TabDemo;
exports.TAB_DEMO_PROVIDERS = [
    TabDemo
];

//# sourceMappingURL=Tab.Demo.js.map
