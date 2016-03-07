'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/src/core/di');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var ng_zone_1 = require('../zone/ng_zone');
var async_1 = require('angular2/src/facade/async');
/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 */
var Testability = (function () {
    function Testability(_ngZone) {
        /** @internal */
        this._pendingCount = 0;
        /**
         * Whether any work was done since the last 'whenStable' callback. This is
         * useful to detect if this could have potentially destabilized another
         * component while it is stabilizing.
         * @internal
         */
        this._didWork = false;
        /** @internal */
        this._callbacks = [];
        /** @internal */
        this._isAngularEventPending = false;
        this._watchAngularEvents(_ngZone);
    }
    /** @internal */
    Testability.prototype._watchAngularEvents = function (_ngZone) {
        var _this = this;
        async_1.ObservableWrapper.subscribe(_ngZone.onTurnStart, function (_) {
            _this._didWork = true;
            _this._isAngularEventPending = true;
        });
        _ngZone.runOutsideAngular(function () {
            async_1.ObservableWrapper.subscribe(_ngZone.onEventDone, function (_) {
                if (!_ngZone.hasPendingTimers) {
                    _this._isAngularEventPending = false;
                    _this._runCallbacksIfReady();
                }
            });
        });
    };
    Testability.prototype.increasePendingRequestCount = function () {
        this._pendingCount += 1;
        this._didWork = true;
        return this._pendingCount;
    };
    Testability.prototype.decreasePendingRequestCount = function () {
        this._pendingCount -= 1;
        if (this._pendingCount < 0) {
            throw new exceptions_1.BaseException('pending async requests below zero');
        }
        this._runCallbacksIfReady();
        return this._pendingCount;
    };
    Testability.prototype.isStable = function () { return this._pendingCount == 0 && !this._isAngularEventPending; };
    /** @internal */
    Testability.prototype._runCallbacksIfReady = function () {
        var _this = this;
        if (!this.isStable()) {
            this._didWork = true;
            return; // Not ready
        }
        // Schedules the call backs in a new frame so that it is always async.
        async_1.PromiseWrapper.resolve(null).then(function (_) {
            while (_this._callbacks.length !== 0) {
                (_this._callbacks.pop())(_this._didWork);
            }
            _this._didWork = false;
        });
    };
    Testability.prototype.whenStable = function (callback) {
        this._callbacks.push(callback);
        this._runCallbacksIfReady();
    };
    Testability.prototype.getPendingRequestCount = function () { return this._pendingCount; };
    // This only accounts for ngZone, and not pending counts. Use `whenStable` to
    // check for stability.
    Testability.prototype.isAngularEventPending = function () { return this._isAngularEventPending; };
    Testability.prototype.findBindings = function (using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    };
    Testability.prototype.findProviders = function (using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    };
    Testability = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [ng_zone_1.NgZone])
    ], Testability);
    return Testability;
})();
exports.Testability = Testability;
/**
 * A global registry of {@link Testability} instances for specific elements.
 */
var TestabilityRegistry = (function () {
    function TestabilityRegistry() {
        /** @internal */
        this._applications = new collection_1.Map();
        _testabilityGetter.addToWindow(this);
    }
    TestabilityRegistry.prototype.registerApplication = function (token, testability) {
        this._applications.set(token, testability);
    };
    TestabilityRegistry.prototype.getTestability = function (elem) { return this._applications.get(elem); };
    TestabilityRegistry.prototype.getAllTestabilities = function () { return collection_1.MapWrapper.values(this._applications); };
    TestabilityRegistry.prototype.getAllRootElements = function () { return collection_1.MapWrapper.keys(this._applications); };
    TestabilityRegistry.prototype.findTestabilityInTree = function (elem, findInAncestors) {
        if (findInAncestors === void 0) { findInAncestors = true; }
        return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
    };
    TestabilityRegistry = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TestabilityRegistry);
    return TestabilityRegistry;
})();
exports.TestabilityRegistry = TestabilityRegistry;
var _NoopGetTestability = (function () {
    function _NoopGetTestability() {
    }
    _NoopGetTestability.prototype.addToWindow = function (registry) { };
    _NoopGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
        return null;
    };
    _NoopGetTestability = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [])
    ], _NoopGetTestability);
    return _NoopGetTestability;
})();
/**
 * Set the {@link GetTestability} implementation used by the Angular testing framework.
 */
function setTestabilityGetter(getter) {
    _testabilityGetter = getter;
}
exports.setTestabilityGetter = setTestabilityGetter;
var _testabilityGetter = lang_1.CONST_EXPR(new _NoopGetTestability());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGFiaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvY29yZS90ZXN0YWJpbGl0eS90ZXN0YWJpbGl0eS50cyJdLCJuYW1lcyI6WyJUZXN0YWJpbGl0eSIsIlRlc3RhYmlsaXR5LmNvbnN0cnVjdG9yIiwiVGVzdGFiaWxpdHkuX3dhdGNoQW5ndWxhckV2ZW50cyIsIlRlc3RhYmlsaXR5LmluY3JlYXNlUGVuZGluZ1JlcXVlc3RDb3VudCIsIlRlc3RhYmlsaXR5LmRlY3JlYXNlUGVuZGluZ1JlcXVlc3RDb3VudCIsIlRlc3RhYmlsaXR5LmlzU3RhYmxlIiwiVGVzdGFiaWxpdHkuX3J1bkNhbGxiYWNrc0lmUmVhZHkiLCJUZXN0YWJpbGl0eS53aGVuU3RhYmxlIiwiVGVzdGFiaWxpdHkuZ2V0UGVuZGluZ1JlcXVlc3RDb3VudCIsIlRlc3RhYmlsaXR5LmlzQW5ndWxhckV2ZW50UGVuZGluZyIsIlRlc3RhYmlsaXR5LmZpbmRCaW5kaW5ncyIsIlRlc3RhYmlsaXR5LmZpbmRQcm92aWRlcnMiLCJUZXN0YWJpbGl0eVJlZ2lzdHJ5IiwiVGVzdGFiaWxpdHlSZWdpc3RyeS5jb25zdHJ1Y3RvciIsIlRlc3RhYmlsaXR5UmVnaXN0cnkucmVnaXN0ZXJBcHBsaWNhdGlvbiIsIlRlc3RhYmlsaXR5UmVnaXN0cnkuZ2V0VGVzdGFiaWxpdHkiLCJUZXN0YWJpbGl0eVJlZ2lzdHJ5LmdldEFsbFRlc3RhYmlsaXRpZXMiLCJUZXN0YWJpbGl0eVJlZ2lzdHJ5LmdldEFsbFJvb3RFbGVtZW50cyIsIlRlc3RhYmlsaXR5UmVnaXN0cnkuZmluZFRlc3RhYmlsaXR5SW5UcmVlIiwiX05vb3BHZXRUZXN0YWJpbGl0eSIsIl9Ob29wR2V0VGVzdGFiaWxpdHkuY29uc3RydWN0b3IiLCJfTm9vcEdldFRlc3RhYmlsaXR5LmFkZFRvV2luZG93IiwiX05vb3BHZXRUZXN0YWJpbGl0eS5maW5kVGVzdGFiaWxpdHlJblRyZWUiLCJzZXRUZXN0YWJpbGl0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LElBQUlBLEVBQUVBLGVBQWVBLENBQUNBLENBQUNBO0lBQy9FQSxDQUFDQTtJQW5CSE47UUFBQ0EsZUFBVUEsRUFBRUE7OzRCQW9CWkE7SUFBREEsMEJBQUNBO0FBQURBLENBQUNBLEFBcEJELElBb0JDO0FBbkJZLDJCQUFtQixzQkFtQi9CLENBQUE7QUFZRDtJQUFBTztJQU9BQyxDQUFDQTtJQUxDRCx5Q0FBV0EsR0FBWEEsVUFBWUEsUUFBNkJBLElBQVNFLENBQUNBO0lBQ25ERixtREFBcUJBLEdBQXJCQSxVQUFzQkEsUUFBNkJBLEVBQUVBLElBQVNBLEVBQ3hDQSxlQUF3QkE7UUFDNUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO0lBQ2RBLENBQUNBO0lBTkhIO1FBQUNBLFlBQUtBLEVBQUVBOzs0QkFPUEE7SUFBREEsMEJBQUNBO0FBQURBLENBQUNBLEFBUEQsSUFPQztBQUVEOztHQUVHO0FBQ0gsOEJBQXFDLE1BQXNCO0lBQ3pESSxrQkFBa0JBLEdBQUdBLE1BQU1BLENBQUNBO0FBQzlCQSxDQUFDQTtBQUZlLDRCQUFvQix1QkFFbkMsQ0FBQTtBQUVELElBQUksa0JBQWtCLEdBQW1CLGlCQUFVLENBQUMsSUFBSSxtQkFBbUIsRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7TWFwLCBNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7Q09OU1QsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge05nWm9uZX0gZnJvbSAnLi4vem9uZS9uZ196b25lJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXIsIE9ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcblxuXG4vKipcbiAqIFRoZSBUZXN0YWJpbGl0eSBzZXJ2aWNlIHByb3ZpZGVzIHRlc3RpbmcgaG9va3MgdGhhdCBjYW4gYmUgYWNjZXNzZWQgZnJvbVxuICogdGhlIGJyb3dzZXIgYW5kIGJ5IHNlcnZpY2VzIHN1Y2ggYXMgUHJvdHJhY3Rvci4gRWFjaCBib290c3RyYXBwZWQgQW5ndWxhclxuICogYXBwbGljYXRpb24gb24gdGhlIHBhZ2Ugd2lsbCBoYXZlIGFuIGluc3RhbmNlIG9mIFRlc3RhYmlsaXR5LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGVzdGFiaWxpdHkge1xuICAvKiogQGludGVybmFsICovXG4gIF9wZW5kaW5nQ291bnQ6IG51bWJlciA9IDA7XG4gIC8qKlxuICAgKiBXaGV0aGVyIGFueSB3b3JrIHdhcyBkb25lIHNpbmNlIHRoZSBsYXN0ICd3aGVuU3RhYmxlJyBjYWxsYmFjay4gVGhpcyBpc1xuICAgKiB1c2VmdWwgdG8gZGV0ZWN0IGlmIHRoaXMgY291bGQgaGF2ZSBwb3RlbnRpYWxseSBkZXN0YWJpbGl6ZWQgYW5vdGhlclxuICAgKiBjb21wb25lbnQgd2hpbGUgaXQgaXMgc3RhYmlsaXppbmcuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX2RpZFdvcms6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2FsbGJhY2tzOiBGdW5jdGlvbltdID0gW107XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2lzQW5ndWxhckV2ZW50UGVuZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3Rvcihfbmdab25lOiBOZ1pvbmUpIHsgdGhpcy5fd2F0Y2hBbmd1bGFyRXZlbnRzKF9uZ1pvbmUpOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfd2F0Y2hBbmd1bGFyRXZlbnRzKF9uZ1pvbmU6IE5nWm9uZSk6IHZvaWQge1xuICAgIE9ic2VydmFibGVXcmFwcGVyLnN1YnNjcmliZShfbmdab25lLm9uVHVyblN0YXJ0LCAoXykgPT4ge1xuICAgICAgdGhpcy5fZGlkV29yayA9IHRydWU7XG4gICAgICB0aGlzLl9pc0FuZ3VsYXJFdmVudFBlbmRpbmcgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUoX25nWm9uZS5vbkV2ZW50RG9uZSwgKF8pID0+IHtcbiAgICAgICAgaWYgKCFfbmdab25lLmhhc1BlbmRpbmdUaW1lcnMpIHtcbiAgICAgICAgICB0aGlzLl9pc0FuZ3VsYXJFdmVudFBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLl9ydW5DYWxsYmFja3NJZlJlYWR5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgaW5jcmVhc2VQZW5kaW5nUmVxdWVzdENvdW50KCk6IG51bWJlciB7XG4gICAgdGhpcy5fcGVuZGluZ0NvdW50ICs9IDE7XG4gICAgdGhpcy5fZGlkV29yayA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMuX3BlbmRpbmdDb3VudDtcbiAgfVxuXG4gIGRlY3JlYXNlUGVuZGluZ1JlcXVlc3RDb3VudCgpOiBudW1iZXIge1xuICAgIHRoaXMuX3BlbmRpbmdDb3VudCAtPSAxO1xuICAgIGlmICh0aGlzLl9wZW5kaW5nQ291bnQgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbigncGVuZGluZyBhc3luYyByZXF1ZXN0cyBiZWxvdyB6ZXJvJyk7XG4gICAgfVxuICAgIHRoaXMuX3J1bkNhbGxiYWNrc0lmUmVhZHkoKTtcbiAgICByZXR1cm4gdGhpcy5fcGVuZGluZ0NvdW50O1xuICB9XG5cbiAgaXNTdGFibGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9wZW5kaW5nQ291bnQgPT0gMCAmJiAhdGhpcy5faXNBbmd1bGFyRXZlbnRQZW5kaW5nOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcnVuQ2FsbGJhY2tzSWZSZWFkeSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNTdGFibGUoKSkge1xuICAgICAgdGhpcy5fZGlkV29yayA9IHRydWU7XG4gICAgICByZXR1cm47ICAvLyBOb3QgcmVhZHlcbiAgICB9XG5cbiAgICAvLyBTY2hlZHVsZXMgdGhlIGNhbGwgYmFja3MgaW4gYSBuZXcgZnJhbWUgc28gdGhhdCBpdCBpcyBhbHdheXMgYXN5bmMuXG4gICAgUHJvbWlzZVdyYXBwZXIucmVzb2x2ZShudWxsKS50aGVuKChfKSA9PiB7XG4gICAgICB3aGlsZSAodGhpcy5fY2FsbGJhY2tzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAodGhpcy5fY2FsbGJhY2tzLnBvcCgpKSh0aGlzLl9kaWRXb3JrKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2RpZFdvcmsgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHdoZW5TdGFibGUoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIHRoaXMuX3J1bkNhbGxiYWNrc0lmUmVhZHkoKTtcbiAgfVxuXG4gIGdldFBlbmRpbmdSZXF1ZXN0Q291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3BlbmRpbmdDb3VudDsgfVxuXG4gIC8vIFRoaXMgb25seSBhY2NvdW50cyBmb3Igbmdab25lLCBhbmQgbm90IHBlbmRpbmcgY291bnRzLiBVc2UgYHdoZW5TdGFibGVgIHRvXG4gIC8vIGNoZWNrIGZvciBzdGFiaWxpdHkuXG4gIGlzQW5ndWxhckV2ZW50UGVuZGluZygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzQW5ndWxhckV2ZW50UGVuZGluZzsgfVxuXG4gIGZpbmRCaW5kaW5ncyh1c2luZzogYW55LCBwcm92aWRlcjogc3RyaW5nLCBleGFjdE1hdGNoOiBib29sZWFuKTogYW55W10ge1xuICAgIC8vIFRPRE8oanVsaWVtcik6IGltcGxlbWVudC5cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBmaW5kUHJvdmlkZXJzKHVzaW5nOiBhbnksIHByb3ZpZGVyOiBzdHJpbmcsIGV4YWN0TWF0Y2g6IGJvb2xlYW4pOiBhbnlbXSB7XG4gICAgLy8gVE9ETyhqdWxpZW1yKTogaW1wbGVtZW50LlxuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG4vKipcbiAqIEEgZ2xvYmFsIHJlZ2lzdHJ5IG9mIHtAbGluayBUZXN0YWJpbGl0eX0gaW5zdGFuY2VzIGZvciBzcGVjaWZpYyBlbGVtZW50cy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRlc3RhYmlsaXR5UmVnaXN0cnkge1xuICAvKiogQGludGVybmFsICovXG4gIF9hcHBsaWNhdGlvbnMgPSBuZXcgTWFwPGFueSwgVGVzdGFiaWxpdHk+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IF90ZXN0YWJpbGl0eUdldHRlci5hZGRUb1dpbmRvdyh0aGlzKTsgfVxuXG4gIHJlZ2lzdGVyQXBwbGljYXRpb24odG9rZW46IGFueSwgdGVzdGFiaWxpdHk6IFRlc3RhYmlsaXR5KSB7XG4gICAgdGhpcy5fYXBwbGljYXRpb25zLnNldCh0b2tlbiwgdGVzdGFiaWxpdHkpO1xuICB9XG5cbiAgZ2V0VGVzdGFiaWxpdHkoZWxlbTogYW55KTogVGVzdGFiaWxpdHkgeyByZXR1cm4gdGhpcy5fYXBwbGljYXRpb25zLmdldChlbGVtKTsgfVxuXG4gIGdldEFsbFRlc3RhYmlsaXRpZXMoKTogVGVzdGFiaWxpdHlbXSB7IHJldHVybiBNYXBXcmFwcGVyLnZhbHVlcyh0aGlzLl9hcHBsaWNhdGlvbnMpOyB9XG5cbiAgZ2V0QWxsUm9vdEVsZW1lbnRzKCk6IGFueVtdIHsgcmV0dXJuIE1hcFdyYXBwZXIua2V5cyh0aGlzLl9hcHBsaWNhdGlvbnMpOyB9XG5cbiAgZmluZFRlc3RhYmlsaXR5SW5UcmVlKGVsZW06IE5vZGUsIGZpbmRJbkFuY2VzdG9yczogYm9vbGVhbiA9IHRydWUpOiBUZXN0YWJpbGl0eSB7XG4gICAgcmV0dXJuIF90ZXN0YWJpbGl0eUdldHRlci5maW5kVGVzdGFiaWxpdHlJblRyZWUodGhpcywgZWxlbSwgZmluZEluQW5jZXN0b3JzKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkYXB0ZXIgaW50ZXJmYWNlIGZvciByZXRyaWV2aW5nIHRoZSBgVGVzdGFiaWxpdHlgIHNlcnZpY2UgYXNzb2NpYXRlZCBmb3IgYVxuICogcGFydGljdWxhciBjb250ZXh0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEdldFRlc3RhYmlsaXR5IHtcbiAgYWRkVG9XaW5kb3cocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnkpOiB2b2lkO1xuICBmaW5kVGVzdGFiaWxpdHlJblRyZWUocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnksIGVsZW06IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmRJbkFuY2VzdG9yczogYm9vbGVhbik6IFRlc3RhYmlsaXR5O1xufVxuXG5AQ09OU1QoKVxuY2xhc3MgX05vb3BHZXRUZXN0YWJpbGl0eSBpbXBsZW1lbnRzIEdldFRlc3RhYmlsaXR5IHtcbiAgYWRkVG9XaW5kb3cocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnkpOiB2b2lkIHt9XG4gIGZpbmRUZXN0YWJpbGl0eUluVHJlZShyZWdpc3RyeTogVGVzdGFiaWxpdHlSZWdpc3RyeSwgZWxlbTogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZEluQW5jZXN0b3JzOiBib29sZWFuKTogVGVzdGFiaWxpdHkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogU2V0IHRoZSB7QGxpbmsgR2V0VGVzdGFiaWxpdHl9IGltcGxlbWVudGF0aW9uIHVzZWQgYnkgdGhlIEFuZ3VsYXIgdGVzdGluZyBmcmFtZXdvcmsuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRUZXN0YWJpbGl0eUdldHRlcihnZXR0ZXI6IEdldFRlc3RhYmlsaXR5KTogdm9pZCB7XG4gIF90ZXN0YWJpbGl0eUdldHRlciA9IGdldHRlcjtcbn1cblxudmFyIF90ZXN0YWJpbGl0eUdldHRlcjogR2V0VGVzdGFiaWxpdHkgPSBDT05TVF9FWFBSKG5ldyBfTm9vcEdldFRlc3RhYmlsaXR5KCkpO1xuIl19