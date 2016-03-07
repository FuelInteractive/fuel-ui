var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from 'angular2/src/core/di';
import { Map, MapWrapper } from 'angular2/src/facade/collection';
import { CONST, CONST_EXPR } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { NgZone } from '../zone/ng_zone';
import { PromiseWrapper, ObservableWrapper } from 'angular2/src/facade/async';
/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 */
export let Testability = class {
    constructor(_ngZone) {
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
    _watchAngularEvents(_ngZone) {
        ObservableWrapper.subscribe(_ngZone.onTurnStart, (_) => {
            this._didWork = true;
            this._isAngularEventPending = true;
        });
        _ngZone.runOutsideAngular(() => {
            ObservableWrapper.subscribe(_ngZone.onEventDone, (_) => {
                if (!_ngZone.hasPendingTimers) {
                    this._isAngularEventPending = false;
                    this._runCallbacksIfReady();
                }
            });
        });
    }
    increasePendingRequestCount() {
        this._pendingCount += 1;
        this._didWork = true;
        return this._pendingCount;
    }
    decreasePendingRequestCount() {
        this._pendingCount -= 1;
        if (this._pendingCount < 0) {
            throw new BaseException('pending async requests below zero');
        }
        this._runCallbacksIfReady();
        return this._pendingCount;
    }
    isStable() { return this._pendingCount == 0 && !this._isAngularEventPending; }
    /** @internal */
    _runCallbacksIfReady() {
        if (!this.isStable()) {
            this._didWork = true;
            return; // Not ready
        }
        // Schedules the call backs in a new frame so that it is always async.
        PromiseWrapper.resolve(null).then((_) => {
            while (this._callbacks.length !== 0) {
                (this._callbacks.pop())(this._didWork);
            }
            this._didWork = false;
        });
    }
    whenStable(callback) {
        this._callbacks.push(callback);
        this._runCallbacksIfReady();
    }
    getPendingRequestCount() { return this._pendingCount; }
    // This only accounts for ngZone, and not pending counts. Use `whenStable` to
    // check for stability.
    isAngularEventPending() { return this._isAngularEventPending; }
    findBindings(using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    }
    findProviders(using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    }
};
Testability = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [NgZone])
], Testability);
/**
 * A global registry of {@link Testability} instances for specific elements.
 */
export let TestabilityRegistry = class {
    constructor() {
        /** @internal */
        this._applications = new Map();
        _testabilityGetter.addToWindow(this);
    }
    registerApplication(token, testability) {
        this._applications.set(token, testability);
    }
    getTestability(elem) { return this._applications.get(elem); }
    getAllTestabilities() { return MapWrapper.values(this._applications); }
    getAllRootElements() { return MapWrapper.keys(this._applications); }
    findTestabilityInTree(elem, findInAncestors = true) {
        return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
    }
};
TestabilityRegistry = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], TestabilityRegistry);
let _NoopGetTestability = class {
    addToWindow(registry) { }
    findTestabilityInTree(registry, elem, findInAncestors) {
        return null;
    }
};
_NoopGetTestability = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [])
], _NoopGetTestability);
/**
 * Set the {@link GetTestability} implementation used by the Angular testing framework.
 */
export function setTestabilityGetter(getter) {
    _testabilityGetter = getter;
}
var _testabilityGetter = CONST_EXPR(new _NoopGetTestability());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGFiaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvY29yZS90ZXN0YWJpbGl0eS90ZXN0YWJpbGl0eS50cyJdLCJuYW1lcyI6WyJUZXN0YWJpbGl0eSIsIlRlc3RhYmlsaXR5LmNvbnN0cnVjdG9yIiwiVGVzdGFiaWxpdHkuX3dhdGNoQW5ndWxhckV2ZW50cyIsIlRlc3RhYmlsaXR5LmluY3JlYXNlUGVuZGluZ1JlcXVlc3RDb3VudCIsIlRlc3RhYmlsaXR5LmRlY3JlYXNlUGVuZGluZ1JlcXVlc3RDb3VudCIsIlRlc3RhYmlsaXR5LmlzU3RhYmxlIiwiVGVzdGFiaWxpdHkuX3J1bkNhbGxiYWNrc0lmUmVhZHkiLCJUZXN0YWJpbGl0eS53aGVuU3RhYmxlIiwiVGVzdGFiaWxpdHkuZ2V0UGVuZGluZ1JlcXVlc3RDb3VudCIsIlRlc3RhYmlsaXR5LmlzQW5ndWxhckV2ZW50UGVuZGluZyIsIlRlc3RhYmlsaXR5LmZpbmRCaW5kaW5ncyIsIlRlc3RhYmlsaXR5LmZpbmRQcm92aWRlcnMiLCJUZXN0YWJpbGl0eVJlZ2lzdHJ5IiwiVGVzdGFiaWxpdHlSZWdpc3RyeS5jb25zdHJ1Y3RvciIsIlRlc3RhYmlsaXR5UmVnaXN0cnkucmVnaXN0ZXJBcHBsaWNhdGlvbiIsIlRlc3RhYmlsaXR5UmVnaXN0cnkuZ2V0VGVzdGFiaWxpdHkiLCJUZXN0YWJpbGl0eVJlZ2lzdHJ5LmdldEFsbFRlc3RhYmlsaXRpZXMiLCJUZXN0YWJpbGl0eVJlZ2lzdHJ5LmdldEFsbFJvb3RFbGVtZW50cyIsIlRlc3RhYmlsaXR5UmVnaXN0cnkuZmluZFRlc3RhYmlsaXR5SW5UcmVlIiwiX05vb3BHZXRUZXN0YWJpbGl0eSIsIl9Ob29wR2V0VGVzdGFiaWxpdHkuYWRkVG9XaW5kb3ciLCJfTm9vcEdldFRlc3RhYmlsaXR5LmZpbmRUZXN0YWJpbGl0eUluVHJlZSIsInNldFRlc3RhYmlsaXR5R2V0dGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7T0FB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Q0EsSUFBSUEsQ0FBQ0E7SUFDZEEsQ0FBQ0E7QUFDSEYsQ0FBQ0E7QUFQRDtJQUFDLEtBQUssRUFBRTs7d0JBT1A7QUFFRDs7R0FFRztBQUNILHFDQUFxQyxNQUFzQjtJQUN6REcsa0JBQWtCQSxHQUFHQSxNQUFNQSxDQUFDQTtBQUM5QkEsQ0FBQ0E7QUFFRCxJQUFJLGtCQUFrQixHQUFtQixVQUFVLENBQUMsSUFBSSxtQkFBbUIsRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7TWFwLCBNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7Q09OU1QsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge05nWm9uZX0gZnJvbSAnLi4vem9uZS9uZ196b25lJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXIsIE9ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcblxuXG4vKipcbiAqIFRoZSBUZXN0YWJpbGl0eSBzZXJ2aWNlIHByb3ZpZGVzIHRlc3RpbmcgaG9va3MgdGhhdCBjYW4gYmUgYWNjZXNzZWQgZnJvbVxuICogdGhlIGJyb3dzZXIgYW5kIGJ5IHNlcnZpY2VzIHN1Y2ggYXMgUHJvdHJhY3Rvci4gRWFjaCBib290c3RyYXBwZWQgQW5ndWxhclxuICogYXBwbGljYXRpb24gb24gdGhlIHBhZ2Ugd2lsbCBoYXZlIGFuIGluc3RhbmNlIG9mIFRlc3RhYmlsaXR5LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGVzdGFiaWxpdHkge1xuICAvKiogQGludGVybmFsICovXG4gIF9wZW5kaW5nQ291bnQ6IG51bWJlciA9IDA7XG4gIC8qKlxuICAgKiBXaGV0aGVyIGFueSB3b3JrIHdhcyBkb25lIHNpbmNlIHRoZSBsYXN0ICd3aGVuU3RhYmxlJyBjYWxsYmFjay4gVGhpcyBpc1xuICAgKiB1c2VmdWwgdG8gZGV0ZWN0IGlmIHRoaXMgY291bGQgaGF2ZSBwb3RlbnRpYWxseSBkZXN0YWJpbGl6ZWQgYW5vdGhlclxuICAgKiBjb21wb25lbnQgd2hpbGUgaXQgaXMgc3RhYmlsaXppbmcuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX2RpZFdvcms6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2FsbGJhY2tzOiBGdW5jdGlvbltdID0gW107XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2lzQW5ndWxhckV2ZW50UGVuZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3Rvcihfbmdab25lOiBOZ1pvbmUpIHsgdGhpcy5fd2F0Y2hBbmd1bGFyRXZlbnRzKF9uZ1pvbmUpOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfd2F0Y2hBbmd1bGFyRXZlbnRzKF9uZ1pvbmU6IE5nWm9uZSk6IHZvaWQge1xuICAgIE9ic2VydmFibGVXcmFwcGVyLnN1YnNjcmliZShfbmdab25lLm9uVHVyblN0YXJ0LCAoXykgPT4ge1xuICAgICAgdGhpcy5fZGlkV29yayA9IHRydWU7XG4gICAgICB0aGlzLl9pc0FuZ3VsYXJFdmVudFBlbmRpbmcgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUoX25nWm9uZS5vbkV2ZW50RG9uZSwgKF8pID0+IHtcbiAgICAgICAgaWYgKCFfbmdab25lLmhhc1BlbmRpbmdUaW1lcnMpIHtcbiAgICAgICAgICB0aGlzLl9pc0FuZ3VsYXJFdmVudFBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLl9ydW5DYWxsYmFja3NJZlJlYWR5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgaW5jcmVhc2VQZW5kaW5nUmVxdWVzdENvdW50KCk6IG51bWJlciB7XG4gICAgdGhpcy5fcGVuZGluZ0NvdW50ICs9IDE7XG4gICAgdGhpcy5fZGlkV29yayA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMuX3BlbmRpbmdDb3VudDtcbiAgfVxuXG4gIGRlY3JlYXNlUGVuZGluZ1JlcXVlc3RDb3VudCgpOiBudW1iZXIge1xuICAgIHRoaXMuX3BlbmRpbmdDb3VudCAtPSAxO1xuICAgIGlmICh0aGlzLl9wZW5kaW5nQ291bnQgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbigncGVuZGluZyBhc3luYyByZXF1ZXN0cyBiZWxvdyB6ZXJvJyk7XG4gICAgfVxuICAgIHRoaXMuX3J1bkNhbGxiYWNrc0lmUmVhZHkoKTtcbiAgICByZXR1cm4gdGhpcy5fcGVuZGluZ0NvdW50O1xuICB9XG5cbiAgaXNTdGFibGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9wZW5kaW5nQ291bnQgPT0gMCAmJiAhdGhpcy5faXNBbmd1bGFyRXZlbnRQZW5kaW5nOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcnVuQ2FsbGJhY2tzSWZSZWFkeSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNTdGFibGUoKSkge1xuICAgICAgdGhpcy5fZGlkV29yayA9IHRydWU7XG4gICAgICByZXR1cm47ICAvLyBOb3QgcmVhZHlcbiAgICB9XG5cbiAgICAvLyBTY2hlZHVsZXMgdGhlIGNhbGwgYmFja3MgaW4gYSBuZXcgZnJhbWUgc28gdGhhdCBpdCBpcyBhbHdheXMgYXN5bmMuXG4gICAgUHJvbWlzZVdyYXBwZXIucmVzb2x2ZShudWxsKS50aGVuKChfKSA9PiB7XG4gICAgICB3aGlsZSAodGhpcy5fY2FsbGJhY2tzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAodGhpcy5fY2FsbGJhY2tzLnBvcCgpKSh0aGlzLl9kaWRXb3JrKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2RpZFdvcmsgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHdoZW5TdGFibGUoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIHRoaXMuX3J1bkNhbGxiYWNrc0lmUmVhZHkoKTtcbiAgfVxuXG4gIGdldFBlbmRpbmdSZXF1ZXN0Q291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3BlbmRpbmdDb3VudDsgfVxuXG4gIC8vIFRoaXMgb25seSBhY2NvdW50cyBmb3Igbmdab25lLCBhbmQgbm90IHBlbmRpbmcgY291bnRzLiBVc2UgYHdoZW5TdGFibGVgIHRvXG4gIC8vIGNoZWNrIGZvciBzdGFiaWxpdHkuXG4gIGlzQW5ndWxhckV2ZW50UGVuZGluZygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzQW5ndWxhckV2ZW50UGVuZGluZzsgfVxuXG4gIGZpbmRCaW5kaW5ncyh1c2luZzogYW55LCBwcm92aWRlcjogc3RyaW5nLCBleGFjdE1hdGNoOiBib29sZWFuKTogYW55W10ge1xuICAgIC8vIFRPRE8oanVsaWVtcik6IGltcGxlbWVudC5cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBmaW5kUHJvdmlkZXJzKHVzaW5nOiBhbnksIHByb3ZpZGVyOiBzdHJpbmcsIGV4YWN0TWF0Y2g6IGJvb2xlYW4pOiBhbnlbXSB7XG4gICAgLy8gVE9ETyhqdWxpZW1yKTogaW1wbGVtZW50LlxuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG4vKipcbiAqIEEgZ2xvYmFsIHJlZ2lzdHJ5IG9mIHtAbGluayBUZXN0YWJpbGl0eX0gaW5zdGFuY2VzIGZvciBzcGVjaWZpYyBlbGVtZW50cy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRlc3RhYmlsaXR5UmVnaXN0cnkge1xuICAvKiogQGludGVybmFsICovXG4gIF9hcHBsaWNhdGlvbnMgPSBuZXcgTWFwPGFueSwgVGVzdGFiaWxpdHk+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IF90ZXN0YWJpbGl0eUdldHRlci5hZGRUb1dpbmRvdyh0aGlzKTsgfVxuXG4gIHJlZ2lzdGVyQXBwbGljYXRpb24odG9rZW46IGFueSwgdGVzdGFiaWxpdHk6IFRlc3RhYmlsaXR5KSB7XG4gICAgdGhpcy5fYXBwbGljYXRpb25zLnNldCh0b2tlbiwgdGVzdGFiaWxpdHkpO1xuICB9XG5cbiAgZ2V0VGVzdGFiaWxpdHkoZWxlbTogYW55KTogVGVzdGFiaWxpdHkgeyByZXR1cm4gdGhpcy5fYXBwbGljYXRpb25zLmdldChlbGVtKTsgfVxuXG4gIGdldEFsbFRlc3RhYmlsaXRpZXMoKTogVGVzdGFiaWxpdHlbXSB7IHJldHVybiBNYXBXcmFwcGVyLnZhbHVlcyh0aGlzLl9hcHBsaWNhdGlvbnMpOyB9XG5cbiAgZ2V0QWxsUm9vdEVsZW1lbnRzKCk6IGFueVtdIHsgcmV0dXJuIE1hcFdyYXBwZXIua2V5cyh0aGlzLl9hcHBsaWNhdGlvbnMpOyB9XG5cbiAgZmluZFRlc3RhYmlsaXR5SW5UcmVlKGVsZW06IE5vZGUsIGZpbmRJbkFuY2VzdG9yczogYm9vbGVhbiA9IHRydWUpOiBUZXN0YWJpbGl0eSB7XG4gICAgcmV0dXJuIF90ZXN0YWJpbGl0eUdldHRlci5maW5kVGVzdGFiaWxpdHlJblRyZWUodGhpcywgZWxlbSwgZmluZEluQW5jZXN0b3JzKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkYXB0ZXIgaW50ZXJmYWNlIGZvciByZXRyaWV2aW5nIHRoZSBgVGVzdGFiaWxpdHlgIHNlcnZpY2UgYXNzb2NpYXRlZCBmb3IgYVxuICogcGFydGljdWxhciBjb250ZXh0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEdldFRlc3RhYmlsaXR5IHtcbiAgYWRkVG9XaW5kb3cocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnkpOiB2b2lkO1xuICBmaW5kVGVzdGFiaWxpdHlJblRyZWUocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnksIGVsZW06IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmRJbkFuY2VzdG9yczogYm9vbGVhbik6IFRlc3RhYmlsaXR5O1xufVxuXG5AQ09OU1QoKVxuY2xhc3MgX05vb3BHZXRUZXN0YWJpbGl0eSBpbXBsZW1lbnRzIEdldFRlc3RhYmlsaXR5IHtcbiAgYWRkVG9XaW5kb3cocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnkpOiB2b2lkIHt9XG4gIGZpbmRUZXN0YWJpbGl0eUluVHJlZShyZWdpc3RyeTogVGVzdGFiaWxpdHlSZWdpc3RyeSwgZWxlbTogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZEluQW5jZXN0b3JzOiBib29sZWFuKTogVGVzdGFiaWxpdHkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogU2V0IHRoZSB7QGxpbmsgR2V0VGVzdGFiaWxpdHl9IGltcGxlbWVudGF0aW9uIHVzZWQgYnkgdGhlIEFuZ3VsYXIgdGVzdGluZyBmcmFtZXdvcmsuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRUZXN0YWJpbGl0eUdldHRlcihnZXR0ZXI6IEdldFRlc3RhYmlsaXR5KTogdm9pZCB7XG4gIF90ZXN0YWJpbGl0eUdldHRlciA9IGdldHRlcjtcbn1cblxudmFyIF90ZXN0YWJpbGl0eUdldHRlcjogR2V0VGVzdGFiaWxpdHkgPSBDT05TVF9FWFBSKG5ldyBfTm9vcEdldFRlc3RhYmlsaXR5KCkpO1xuIl19