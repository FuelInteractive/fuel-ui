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
var TagSet = (function () {
    function TagSet() {
        this.tags = [];
    }
    TagSet.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
    };
    TagSet.prototype.addTag = function (tag) {
        this.tags.push(tag);
    };
    TagSet.prototype.removeTag = function (tag) {
        var index = this.tags.indexOf(tag);
        if (index === -1 || this.isDestroyed || tag.disabled) {
            return;
        }
        tag.remove.next(tag);
        this.tags.splice(index, 1);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TagSet.prototype, "tags", void 0);
    TagSet = __decorate([
        core_1.Component({
            selector: 'tagset',
            directives: [common_1.NgClass],
            template: "\n    <span *ngFor=\"#tag of tags\" class=\"label fuel-ui-label\" [ngClass]=\"tag.classMap\">\n        <span [innerHtml]=\"tag.title\"></span>\n        <span class=\"fuel-ui-clickable\" [class.disabled]=\"tag.disabled\" *ngIf=\"tag.removable\" (click)=\"$event.preventDefault(); removeTag(tag);\">\n            <i class=\"fa fa-remove\"></i>\n        </span>\n    </span>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TagSet);
    return TagSet;
}());
exports.TagSet = TagSet;

//# sourceMappingURL=TagSet.js.map
