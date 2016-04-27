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
var TagSet_1 = require('./TagSet');
var Tag = (function () {
    function Tag(tagset) {
        this.removable = false;
        this.remove = new core_1.EventEmitter(false);
        this.classMap = {};
        this.tagset = tagset;
        this.tagset.addTag(this);
    }
    Object.defineProperty(Tag.prototype, "pill", {
        get: function () { return this._pill; },
        set: function (value) {
            this._pill = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Tag.prototype, "color", {
        get: function () { return this._color; },
        set: function (value) {
            this._color = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Tag.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Tag.prototype.ngOnInit = function () {
        this.color = this.color !== 'undefined' ? this.color : 'default';
    };
    Tag.prototype.ngOnDestroy = function () {
        this.remove.next(this);
        this.tagset.removeTag(this);
    };
    Tag.prototype.setClassMap = function () {
        this.classMap = (_a = {
                'disabled': this.disabled,
                'label-pill': this.pill
            },
            _a['label-' + ((this.color && this.color.toLowerCase()) || 'default')] = true,
            _a
        );
        var _a;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Tag.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Tag.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Tag.prototype, "removable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Tag.prototype, "pill", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Tag.prototype, "color", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Tag.prototype, "disabled", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Tag.prototype, "remove", void 0);
    Tag = __decorate([
        core_1.Directive({
            selector: 'tag, [tag]'
        }), 
        __metadata('design:paramtypes', [TagSet_1.TagSet])
    ], Tag);
    return Tag;
}());
exports.Tag = Tag;
exports.TAG_PROVIDERS = [
    Tag,
    TagSet_1.TagSet
];

//# sourceMappingURL=Tag.js.map
