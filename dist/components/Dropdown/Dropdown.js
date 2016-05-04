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
var core_1 = require('@angular/core');
var Dropdown = (function () {
    function Dropdown() {
        this.dropdownOpen = false;
    }
    Dropdown.prototype.toggleDropdown = function () {
        this.dropdownOpen = !this.dropdownOpen;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Dropdown.prototype, "label", void 0);
    Dropdown = __decorate([
        core_1.Component({
            selector: "dropdown",
            template: "\n      <div class=\"dropdown open\">\n        <button class=\"btn btn-secondary\" type=\"button\" \n          aria-haspopup=\"true\" aria-expanded=\"false\" (click)=\"toggleDropdown()\">\n          {{label}}\n        </button>\n        <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\"\n          *ngIf=\"dropdownOpen\" (click)=\"toggleDropdown()\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Dropdown);
    return Dropdown;
}());
exports.Dropdown = Dropdown;
exports.DROPDOWN_COMPONENT_PROVIDERS = [
    Dropdown
];

//# sourceMappingURL=Dropdown.js.map
