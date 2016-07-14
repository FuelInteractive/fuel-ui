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
var core_2 = require("@angular/core");
var core_3 = require('@angular/core');
var common_1 = require("@angular/common");
var OffCanvasMenuClose = (function () {
    function OffCanvasMenuClose() {
        this.close = new core_2.EventEmitter();
    }
    OffCanvasMenuClose.prototype.onClick = function (e) {
        this.close.next(null);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OffCanvasMenuClose.prototype, "close", void 0);
    __decorate([
        core_2.HostListener("click", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], OffCanvasMenuClose.prototype, "onClick", null);
    OffCanvasMenuClose = __decorate([
        core_1.Directive({
            selector: "[offCanvasMenuClose], .off-canvas-menu-close"
        }), 
        __metadata('design:paramtypes', [])
    ], OffCanvasMenuClose);
    return OffCanvasMenuClose;
}());
exports.OffCanvasMenuClose = OffCanvasMenuClose;
var OffCanvasMenu = (function () {
    function OffCanvasMenu() {
        this.origin = "left";
        this.width = "25%";
        this.height = "25%";
        this.close = new core_2.EventEmitter();
        this.open = new core_2.EventEmitter();
        this.computedWidth = this.width;
        this.computedHeight = this.height;
        this.isOpen = false;
        this.overlayState = null;
        this.openState = null;
    }
    OffCanvasMenu.prototype.ngOnInit = function () {
    };
    OffCanvasMenu.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.closeButtons.map(function (b) { return b.close.subscribe(function () { return _this.toggleMenu(); }); });
    };
    OffCanvasMenu.prototype.ngOnDestroy = function () {
    };
    OffCanvasMenu.prototype.toggleMenu = function () {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.overlayState = "in";
            this.openState = "open";
            this.open.next(null);
        }
        else {
            this.overlayState = null;
            this.openState = null;
            this.close.next(null);
        }
        if (this.origin == "left" || this.origin == "right") {
            this.computedHeight = "100%";
            this.computedWidth = this.width;
        }
        else if (this.origin == "top" || this.origin == "bottom") {
            this.computedWidth = "100%";
            this.computedHeight = this.height;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OffCanvasMenu.prototype, "origin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OffCanvasMenu.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OffCanvasMenu.prototype, "height", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_2.EventEmitter)
    ], OffCanvasMenu.prototype, "close", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_2.EventEmitter)
    ], OffCanvasMenu.prototype, "open", void 0);
    __decorate([
        core_1.ContentChildren(OffCanvasMenuClose), 
        __metadata('design:type', core_1.QueryList)
    ], OffCanvasMenu.prototype, "closeButtons", void 0);
    OffCanvasMenu = __decorate([
        core_1.Component({
            selector: "off-canvas-menu",
            template: "\n      <div *ngIf=\"isOpen\" @fade=\"overlayState\" class=\"off-canvas-menu-overlay\" \n          (click)=\"toggleMenu()\"></div>\n\n      <div *ngIf=\"isOpen\" @open=\"openState\" class=\"off-canvas-menu\"\n          [class.off-canvas-menu-left]=\"origin.toLowerCase() == 'left'\"\n          [class.off-canvas-menu-right]=\"origin.toLowerCase() == 'right'\"\n          [class.off-canvas-menu-top]=\"origin.toLowerCase() == 'top'\"\n          [class.off-canvas-menu-bottom]=\"origin.toLowerCase() == 'bottom'\"\n          [style.width]=\"computedWidth\"\n          [style.height]=\"computedHeight\">\n          <ng-content></ng-content>    \n      </div>\n    ",
            styles: ["\n      .off-canvas-menu-overlay {\n        display: block;\n        position: fixed;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        z-index: 900;\n        background-color: #55595c;\n        opacity: 0; }\n\n      .off-canvas-menu {\n        display: block;\n        position: fixed;\n        z-index: 1000;\n        background-color: #fff; }\n        .off-canvas-menu.off-canvas-menu-left {\n          top: 0;\n          left: 0;\n          bottom: 0;\n          transform: translate(-100%, 0);\n          width: 75%; }\n        .off-canvas-menu.off-canvas-menu-right {\n          top: 0;\n          right: 0;\n          bottom: 0;\n          transform: translate(100%, 0);\n          width: 75%; }\n        .off-canvas-menu.off-canvas-menu-top {\n          top: 0;\n          left: 0;\n          right: 0;\n          transform: translate(0, -100%);\n          height: 75%; }\n        .off-canvas-menu.off-canvas-menu-bottom {\n          left: 0;\n          right: 0;\n          bottom: 0;\n          transform: translate(0, 100%);\n          height: 75%; }\n    "],
            directives: [common_1.CORE_DIRECTIVES, OffCanvasMenuClose],
            animations: [
                core_3.trigger("open", [
                    core_3.state("open", core_3.style({ transform: "translate(0,0)" })),
                    core_3.transition("void => open", [core_3.animate("200ms ease")]),
                    core_3.transition("open => void", [core_3.animate("200ms ease")])
                ]),
                core_3.trigger("fade", [
                    core_3.state("in", core_3.style({ opacity: ".75" })),
                    core_3.transition("void => in", [core_3.animate("200ms ease")]),
                    core_3.transition("in => void", [core_3.animate("200ms ease")])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], OffCanvasMenu);
    return OffCanvasMenu;
}());
exports.OffCanvasMenu = OffCanvasMenu;
exports.OFF_CANVAS_MENU_PROVIDERS = [
    OffCanvasMenu,
    OffCanvasMenuClose
];

//# sourceMappingURL=OffCanvasMenu.js.map
