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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var fuel_ui_1 = require("./fuel-ui");
var demo_routes_1 = require('./demo.routes');
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
        core_1.Component({
            selector: "fuel-ui",
            template: "\n    <div id=\"wrapper\" [class.toggled]=\"toggled\">\n        <span *ngIf=\"toggled\" class=\"fuel-ui-clickable fuel-ui-toggle\" (click)=\"$event.preventDefault(); toggled = !toggled\">\n            <i class=\"fa fa-chevron-right\"></i>\n        </span>\n        <div id=\"sidebar-wrapper\">\n            <ul class=\"sidebar-nav\">\n                <li class=\"sidebar-brand\">\n                    <a (click)=\"clickNavLink()\" [routerLink]=\"['']\">\n                        <img src=\"https://pbs.twimg.com/profile_images/572406600309018624/r2ma7PE3.png\" height=\"40\"/> \n                        <span>Fuel-UI</span>\n                    </a>\n                    <i class=\"fa fa-bars fuel-ui-clickable pull-right\" (click)=\"$event.preventDefault(); toggled = !toggled\"></i>\n                </li>\n                <li><a (click)=\"clickNavLink()\" [routerLink]=\"['installation']\">Installation</a></li>\n                <accordion [closeOthers]=\"false\" duration=\"500\">\n                    <accordion-item #animationNav [open]=\"false\">\n                        <li accordion-heading class=\"fuel-ui-clickable sidebar-title\">\n                            Animations\n                            <i class=\"pull-right fa\"\n                                [ngClass]=\"{'fa-minus': animationNav?.open, 'fa-plus': !animationNav || !animationNav.open}\"></i>\n                        </li>\n                        \n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['animation/collapse']\">Collapse</a></li>\n                    </accordion-item>\n                    <accordion-item #componentNav [open]=\"false\">\n                        <li accordion-heading class=\"fuel-ui-clickable sidebar-title\">\n                            Components\n                            <i class=\"pull-right fa\"\n                                [ngClass]=\"{'fa-minus': componentNav?.open, 'fa-plus': !componentNav || !componentNav.open}\"></i>\n                        </li>\n                        \n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/accordion']\">Accordion</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/alert']\">Alert</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/carousel']\">Carousel</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/datepicker']\">DatePicker</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/daterangepicker']\">DateRangePicker</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/dropdown']\">Dropdown</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/infinitescroller']\">InfiniteScroller</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/modal']\">Modal</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/pagination']\">Pagination</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/progress']\">Progress</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/slider']\">Slider</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/tab']\">Tabs</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/tablesortable']\">TableSortable</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/tag']\">Tags</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/textexpander']\">TextExpander</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['component/timepicker']\">TimePicker</a></li>\n                    </accordion-item>\n                    <accordion-item #directiveNav [open]=\"false\">\n                        <li accordion-heading class=\"fuel-ui-clickable sidebar-title\">\n                            Directives\n                            <i class=\"pull-right fa\"\n                                [ngClass]=\"{'fa-minus': directiveNav?.open, 'fa-plus': !directiveNav || !directiveNav.open}\"></i>\n                        </li>\n                        \n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['directive/animation']\">Animation</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['directive/codehighlighter']\">Code Highlighter</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['directive/tooltip']\">Tooltip</a></li>\n                    </accordion-item>\n                    <accordion-item #pipeNav [open]=\"false\">\n                        <li accordion-heading class=\"fuel-ui-clickable sidebar-title\">\n                            Pipes\n                            <i class=\"pull-right fa\"\n                                [ngClass]=\"{'fa-minus': pipeNav?.open, 'fa-plus': !pipeNav || !pipeNav.open}\"></i>\n                        </li>\n                        \n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['pipe/format']\">Format</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['pipe/maptoiterable']\">MapToIterable</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['pipe/orderby']\">OrderBy</a></li>\n                        <li><a (click)=\"clickNavLink()\" [routerLink]=\"['pipe/range']\">Range</a></li>\n                    </accordion-item>\n                </accordion>\n            </ul>\n        </div>\n        <!-- /#sidebar-wrapper -->\n\n        <!-- Page Content -->\n        <div id=\"page-content-wrapper\">\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-lg-12\">\n                        <router-outlet></router-outlet>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- /#page-content-wrapper -->\n\n    </div>",
            directives: [common_1.CORE_DIRECTIVES, fuel_ui_1.FUELUI_COMPONENT_PROVIDERS, fuel_ui_1.FUELUI_DIRECTIVE_PROVIDERS, router_1.ROUTER_DIRECTIVES],
            encapsulation: core_1.ViewEncapsulation.None,
            pipes: [fuel_ui_1.FUELUI_PIPE_PROVIDERS],
            animations: fuel_ui_1.FUELUI_ANIMATION_PROVIDERS
        }), 
        __metadata('design:paramtypes', [])
    ], DemoComponent);
    return DemoComponent;
}());
exports.DemoComponent = DemoComponent;
// enableProdMode();
platform_browser_dynamic_1.bootstrap(DemoComponent, [
    demo_routes_1.APP_ROUTER_PROVIDERS,
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
    fuel_ui_1.FUELUI_COMPONENT_PROVIDERS
]).catch(function (err) { return console.error(err); });

//# sourceMappingURL=demo.js.map
