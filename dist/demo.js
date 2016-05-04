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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var router_1 = require("@angular/router");
var fuel_ui_1 = require("./fuel-ui");
var fuel_ui_demo_1 = require('./fuel-ui-demo');
var DemoHome = (function () {
    function DemoHome() {
    }
    DemoHome = __decorate([
        core_1.Component({
            template: "\n    <div class=\"jumbotron jumbotron-fluid\">\n        <div class=\"container\">\n            <h2 class=\"display-3\">Fuel-UI</h2>\n            <p class=\"lead\">Fuel-UI is a collection of native <a href=\"http://angular.io\" target=\"_blank\">Angular 2</a> components, directives, and pipes for <a href=\"http://v4-alpha.getbootstrap.com/\" target=\"_blank\">Bootstrap 4</a>.</p>\n            \n            <a href=\"https://github.com/FuelInteractive/fuel-ui/releases\" target=\"_blank\" class=\"btn btn-fuel\">Download <i class=\"fa fa-download\"></i></a> \n            <a href=\"https://github.com/FuelInteractive/fuel-ui\" target=\"_blank\" class=\"btn btn-fuel\">View on GitHub <i class=\"fa fa-external-link\"></i></a> \n            <a href=\"https://www.npmjs.com/package/fuel-ui\" target=\"_blank\" class=\"btn btn-fuel\">View npm Package <i class=\"fa fa-external-link\"></i></a>\n        </div>\n    </div>\n    \n    <p>Fuel-UI is developed by <a href=\"http://fueltravel.com\" target=\"_blank\">Fuel Travel</a>, a company with years of expertise in the travel marketing industry. For project news and updates, follow us on <a href=\"http://twitter.com/fueltravel\" target=\"_blank\">twitter</a>.</p>"
        }), 
        __metadata('design:paramtypes', [])
    ], DemoHome);
    return DemoHome;
}());
exports.DemoHome = DemoHome;
var InstallationComponent = (function () {
    function InstallationComponent() {
    }
    InstallationComponent = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Installation</h2>\n            <p class=\"card-text\">Fork our Quickstart! <a href=\"https://github.com/coryshaw1/ng2-play/\" target=\"_blank\">https://github.com/coryshaw1/ng2-play/</a></p>\n        </div>\n    </div>\n</div>\n\n<p>If you would like to add Fuel-UI to your Angular2 project through npm manually, do the following:</p>\n\n<p><code>npm install fuel-ui font-awesome bootstrap@^4.0.0-alpha.2 --save</code></p>\n            \n<p>Then simply add the proper script tags to your <code>index.html</code></p>\n            \n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;head&gt;\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/font-awesome/css/font-awesome.min.css&quot; /&gt;\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/bootstrap/dist/css/bootstrap.min.css&quot; /&gt;\n    &lt;link rel=&quot;stylesheet&quot; href=&quot;node_modules/fuel-ui/bundles/fuel-ui.min.css&quot; /&gt;\n&lt;/head&gt;\n\n...\n\n&lt;!-- All your SystemJS, Angular2, Rx, etc. scripts first! --&gt;\n&lt;script src=&quot;node_modules/fuel-ui/bundles/fuel-ui.min.js&quot;&gt;&lt;/script&gt;\n</code>\n</pre>",
            directives: [fuel_ui_1.CodeHighlighter]
        }), 
        __metadata('design:paramtypes', [])
    ], InstallationComponent);
    return InstallationComponent;
}());
exports.InstallationComponent = InstallationComponent;
var DemoComponent = (function () {
    function DemoComponent() {
        this.toggled = false;
    }
    DemoComponent.prototype.clickNavLink = function (sidebar) {
        if (this.toggled && document.querySelector("#sidebar-wrapper") && document.querySelector("#sidebar-wrapper").scrollTop)
            document.querySelector("#sidebar-wrapper").scrollTop = 0;
        this.toggled = this.toggled ? !this.toggled : this.toggled;
    };
    DemoComponent = __decorate([
        router_1.Routes([
            { path: '/', component: DemoHome },
            { path: '/installation', component: InstallationComponent },
            { path: '/component/accordion', component: fuel_ui_demo_1.AccordionDemo },
            { path: '/component/alert', component: fuel_ui_demo_1.AlertDemo },
            { path: '/component/carousel', component: fuel_ui_demo_1.CarouselDemo },
            { path: '/component/datepicker', component: fuel_ui_demo_1.DatePickerDemo },
            { path: '/component/daterangepicker', component: fuel_ui_demo_1.DateRangePickerDemo },
            { path: '/component/dropdown', component: fuel_ui_demo_1.DropdownDemo },
            { path: '/component/infinitescroller', component: fuel_ui_demo_1.InfiniteScrollerDemo },
            { path: '/component/modal', component: fuel_ui_demo_1.ModalDemo },
            { path: '/component/pagination', component: fuel_ui_demo_1.PaginationDemo },
            { path: '/component/progress', component: fuel_ui_demo_1.ProgressDemo },
            { path: '/component/slider', component: fuel_ui_demo_1.SliderDemo },
            { path: '/component/tab', component: fuel_ui_demo_1.TabDemo },
            { path: '/component/tablesortable', component: fuel_ui_demo_1.TableSortableDemo },
            { path: '/component/tag', component: fuel_ui_demo_1.TagDemo },
            { path: '/component/timepicker', component: fuel_ui_demo_1.TimePickerDemo },
            { path: '/directive/animation', component: fuel_ui_demo_1.AnimationDemo },
            { path: '/directive/codehighlighter', component: fuel_ui_demo_1.CodeHighlighterDemo },
            { path: '/directive/collapse', component: fuel_ui_demo_1.CollapseDemo },
            { path: '/directive/tooltip', component: fuel_ui_demo_1.TooltipDemo },
            { path: '/pipe/format', component: fuel_ui_demo_1.FormatDemo },
            { path: '/pipe/maptoiterable', component: fuel_ui_demo_1.MapToIterableDemo },
            { path: '/pipe/orderby', component: fuel_ui_demo_1.OrderByDemo },
            { path: '/pipe/range', component: fuel_ui_demo_1.RangeDemo }
        ]),
        core_1.Component({
            selector: "fuel-ui",
            template: "\n    <div id=\"wrapper\" [class.toggled]=\"toggled\">\n        <span *ngIf=\"toggled\" class=\"fuel-ui-clickable fuel-ui-toggle\" (click)=\"$event.preventDefault(); toggled = !toggled\">\n            <i class=\"fa fa-chevron-right\"></i>\n        </span>\n        <div id=\"sidebar-wrapper\">\n            <ul class=\"sidebar-nav\">\n                <li class=\"sidebar-brand\">\n                    <a (click)=\"clickNavLink()\" [routerLink]=\"['/']\">\n                        <img src=\"https://pbs.twimg.com/profile_images/572406600309018624/r2ma7PE3.png\" height=\"40\"/> \n                        <span>Fuel-UI</span>\n                    </a>\n                    <i class=\"fa fa-bars fuel-ui-clickable pull-right\" (click)=\"$event.preventDefault(); toggled = !toggled\"></i>\n                </li>\n                <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/installation']\">Installation</a></li>\n                <accordion [closeOthers]=\"false\" duration=\"500\">\n                    <accordion-item #componentNav [open]=\"false\">\n                        <li accordion-heading class=\"fuel-ui-clickable sidebar-title\">\n                            Components\n                            <i class=\"pull-right fa\"\n                                [ngClass]=\"{'fa-minus': componentNav?.open, 'fa-plus': !componentNav || !componentNav.open}\"></i>\n                        </li>\n                        \n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'accordion']\">Accordion</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'alert']\">Alert</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'carousel']\">Carousel</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'datepicker']\">DatePicker</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'daterangepicker']\">DateRangePicker</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'dropdown']\">Dropdown</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'infinitescroller']\">InfiniteScroller</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'modal']\">Modal</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'pagination']\">Pagination</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'progress']\">Progress</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'slider']\">Slider</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'tab']\">Tabs</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'tablesortable']\">TableSortable</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'tag']\">Tags</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/component', 'timepicker']\">TimePicker</a></li>\n                    </accordion-item>\n                    <accordion-item #directiveNav [open]=\"false\">\n                        <li accordion-heading class=\"fuel-ui-clickable sidebar-title\">\n                            Directives\n                            <i class=\"pull-right fa\"\n                                [ngClass]=\"{'fa-minus': directiveNav?.open, 'fa-plus': !directiveNav || !directiveNav.open}\"></i>\n                        </li>\n                        \n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/directive', 'animation']\">Animation</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/directive', 'codehighlighter']\">Code Highlighter</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/directive', 'collapse']\">Collapse</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/directive', 'tooltip']\">Tooltip</a></li>\n                    </accordion-item>\n                    <accordion-item #pipeNav [open]=\"false\">\n                        <li accordion-heading class=\"fuel-ui-clickable sidebar-title\">\n                            Pipes\n                            <i class=\"pull-right fa\"\n                                [ngClass]=\"{'fa-minus': pipeNav?.open, 'fa-plus': !pipeNav || !pipeNav.open}\"></i>\n                        </li>\n                        \n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/pipe', 'format']\">Format</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/pipe', 'maptoiterable']\">MapToIterable</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/pipe', 'orderby']\">OrderBy</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['/pipe', 'range']\">Range</a></li>\n                    </accordion-item>\n                </accordion>\n            </ul>\n        </div>\n        <!-- /#sidebar-wrapper -->\n\n        <!-- Page Content -->\n        <div id=\"page-content-wrapper\">\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <router-outlet></router-outlet>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- /#page-content-wrapper -->\n\n    </div>",
            directives: [common_1.CORE_DIRECTIVES, fuel_ui_1.FUELUI_COMPONENT_PROVIDERS, fuel_ui_1.FUELUI_DIRECTIVE_PROVIDERS, common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.None,
            pipes: [fuel_ui_1.FUELUI_PIPE_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], DemoComponent);
    return DemoComponent;
}());
exports.DemoComponent = DemoComponent;
// enableProdMode();
platform_browser_dynamic_1.bootstrap(DemoComponent, [
    router_1.ROUTER_PROVIDERS,
    common_1.FORM_PROVIDERS,
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
    fuel_ui_1.FUELUI_COMPONENT_PROVIDERS
]);

//# sourceMappingURL=demo.js.map
