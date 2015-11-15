var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var AnimationListener = (function () {
    function AnimationListener() {
        this.animationStart = new angular2_1.EventEmitter();
        this.animationEnd = new angular2_1.EventEmitter();
    }
    AnimationListener.prototype.animationStarted = function ($event) {
        this.animationStart.next($event);
    };
    AnimationListener.prototype.animationEnded = function ($event) {
        this.animationEnd.next($event);
    };
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], AnimationListener.prototype, "animationStart");
    __decorate([
        angular2_1.Output(), 
        __metadata('design:type', angular2_1.EventEmitter)
    ], AnimationListener.prototype, "animationEnd");
    AnimationListener = __decorate([
        angular2_1.Directive({
            selector: '[.animated]',
            host: {
                '(animationstart)': 'animationStarted($event)',
                '(webkitAnimationStart)': 'animationStarted($event)',
                '(oanimationstart)': 'animationStarted($event)',
                '(MSAnimationStart)': 'animationStarted($event)',
                '(animationend)': 'animationEnded($event)',
                '(webkitAnimationEnd)': 'animationEnded($event)',
                '(oanimationend)': 'animationEnded($event)',
                '(MSAnimationEnd)': 'animationEnded($event)'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], AnimationListener);
    return AnimationListener;
})();
exports.AnimationListener = AnimationListener;
exports.ANIMATION_LISTENER_PROVIDERS = [
    AnimationListener
];

//# sourceMappingURL=AnimationListener.js.map
