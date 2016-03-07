'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var core_1 = require('angular2/core');
var invalid_pipe_argument_exception_1 = require('./invalid_pipe_argument_exception');
var ObservableStrategy = (function () {
    function ObservableStrategy() {
    }
    ObservableStrategy.prototype.createSubscription = function (async, updateLatestValue) {
        return async_1.ObservableWrapper.subscribe(async, updateLatestValue, function (e) { throw e; });
    };
    ObservableStrategy.prototype.dispose = function (subscription) { async_1.ObservableWrapper.dispose(subscription); };
    ObservableStrategy.prototype.onDestroy = function (subscription) { async_1.ObservableWrapper.dispose(subscription); };
    return ObservableStrategy;
})();
var PromiseStrategy = (function () {
    function PromiseStrategy() {
    }
    PromiseStrategy.prototype.createSubscription = function (async, updateLatestValue) {
        return async.then(updateLatestValue);
    };
    PromiseStrategy.prototype.dispose = function (subscription) { };
    PromiseStrategy.prototype.onDestroy = function (subscription) { };
    return PromiseStrategy;
})();
var _promiseStrategy = new PromiseStrategy();
var _observableStrategy = new ObservableStrategy();
var __unused; // avoid unused import when Promise union types are erased
/**
 * The `async` pipe subscribes to an Observable or Promise and returns the latest value it has
 * emitted.
 * When a new value is emitted, the `async` pipe marks the component to be checked for changes.
 *
 * ### Example
 *
 * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
 * promise.
 *
 * {@example core/pipes/ts/async_pipe/async_pipe_example.ts region='AsyncPipe'}
 *
 * It's also possible to use `async` with Observables. The example below binds the `time` Observable
 * to the view. Every 500ms, the `time` Observable updates the view with the current time.
 *
 * ```typescript
 * ```
 */
var AsyncPipe = (function () {
    function AsyncPipe(_ref) {
        /** @internal */
        this._latestValue = null;
        /** @internal */
        this._latestReturnedValue = null;
        /** @internal */
        this._subscription = null;
        /** @internal */
        this._obj = null;
        this._strategy = null;
        this._ref = _ref;
    }
    AsyncPipe.prototype.ngOnDestroy = function () {
        if (lang_1.isPresent(this._subscription)) {
            this._dispose();
        }
    };
    AsyncPipe.prototype.transform = function (obj, args) {
        if (lang_1.isBlank(this._obj)) {
            if (lang_1.isPresent(obj)) {
                this._subscribe(obj);
            }
            this._latestReturnedValue = this._latestValue;
            return this._latestValue;
        }
        if (obj !== this._obj) {
            this._dispose();
            return this.transform(obj);
        }
        if (this._latestValue === this._latestReturnedValue) {
            return this._latestReturnedValue;
        }
        else {
            this._latestReturnedValue = this._latestValue;
            return core_1.WrappedValue.wrap(this._latestValue);
        }
    };
    /** @internal */
    AsyncPipe.prototype._subscribe = function (obj) {
        var _this = this;
        this._obj = obj;
        this._strategy = this._selectStrategy(obj);
        this._subscription = this._strategy.createSubscription(obj, function (value) { return _this._updateLatestValue(obj, value); });
    };
    /** @internal */
    AsyncPipe.prototype._selectStrategy = function (obj) {
        if (lang_1.isPromise(obj)) {
            return _promiseStrategy;
        }
        else if (async_1.ObservableWrapper.isObservable(obj)) {
            return _observableStrategy;
        }
        else {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(AsyncPipe, obj);
        }
    };
    /** @internal */
    AsyncPipe.prototype._dispose = function () {
        this._strategy.dispose(this._subscription);
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
    };
    /** @internal */
    AsyncPipe.prototype._updateLatestValue = function (async, value) {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref.markForCheck();
        }
    };
    AsyncPipe = __decorate([
        // avoid unused import when Promise union types are erased
        core_1.Pipe({ name: 'async', pure: false }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], AsyncPipe);
    return AsyncPipe;
})();
exports.AsyncPipe = AsyncPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfcGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy9jb21tb24vcGlwZXMvYXN5bmNfcGlwZS50cyJdLCJuYW1lcyI6WyJPYnNlcnZhYmxlU3RyYXRlZ3kiLCJPYnNlcnZhYmxlU3RyYXRlZ3kuY29uc3RydWN0b3IiLCJPYnNlcnZhYmxlU3RyYXRlZ3kuY3JlYXRlU3Vic2NyaXB0aW9uIiwiT2JzZXJ2YWJsZVN0cmF0ZWd5LmRpc3Bvc2UiLCJPYnNlcnZhYmxlU3RyYXRlZ3kub25EZXN0cm95IiwiUHJvbWlzZVN0cmF0ZWd5IiwiUHJvbWlzZVN0cmF0ZWd5LmNvbnN0cnVjdG9yIiwiUHJvbWlzZVN0cmF0ZWd5LmNyZWF0ZVN1YnNjcmlwdGlvbiIsIlByb21pc2VTdHJhdGVneS5kaXNwb3NlIiwiUHJvbWlzZVN0cmF0ZWd5Lm9uRGVzdHJveSIsIkFzeW5jUGlwZSIsIkFzeW5jUGlwZS5jb25zdHJ1Y3RvciIsIkFzeW5jUGlwZS5uZ09uRGVzdHJveSIsIkFzeW5jUGlwZS50cmFuc2Zvcm0iLCJBc3luY1BpcGUuX3N1YnNjcmliZSIsIkFzeW5jUGlwZS5fc2VsZWN0U3RyYXRlZ3kiLCJBc3luY1BpcGUuX2Rpc3Bvc2UiLCJBc3luY1BpcGUuX3VwZGF0ZUxhdGVzdFZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxxQkFBbUQsMEJBQTBCLENBQUMsQ0FBQTtBQUM5RSxzQkFBMEQsMkJBQTJCLENBQUMsQ0FBQTtBQUN0RixxQkFPTyxlQUFlLENBQUMsQ0FBQTtBQUV2QixnREFBMkMsbUNBQW1DLENBQUMsQ0FBQTtBQUUvRTtJQUFBQTtJQVFBQyxDQUFDQTtJQVBDRCwrQ0FBa0JBLEdBQWxCQSxVQUFtQkEsS0FBVUEsRUFBRUEsaUJBQXNCQTtRQUNuREUsTUFBTUEsQ0FBQ0EseUJBQWlCQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxFQUFFQSxpQkFBaUJBLEVBQUVBLFVBQUFBLENBQUNBLElBQU1BLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQ2xGQSxDQUFDQTtJQUVERixvQ0FBT0EsR0FBUEEsVUFBUUEsWUFBaUJBLElBQVVHLHlCQUFpQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFN0VILHNDQUFTQSxHQUFUQSxVQUFVQSxZQUFpQkEsSUFBVUkseUJBQWlCQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNqRkoseUJBQUNBO0FBQURBLENBQUNBLEFBUkQsSUFRQztBQUVEO0lBQUFLO0lBUUFDLENBQUNBO0lBUENELDRDQUFrQkEsR0FBbEJBLFVBQW1CQSxLQUFVQSxFQUFFQSxpQkFBc0JBO1FBQ25ERSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO0lBQ3ZDQSxDQUFDQTtJQUVERixpQ0FBT0EsR0FBUEEsVUFBUUEsWUFBaUJBLElBQVNHLENBQUNBO0lBRW5DSCxtQ0FBU0EsR0FBVEEsVUFBVUEsWUFBaUJBLElBQVNJLENBQUNBO0lBQ3ZDSixzQkFBQ0E7QUFBREEsQ0FBQ0EsQUFSRCxJQVFDO0FBRUQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0FBQzdDLElBQUksbUJBQW1CLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO0FBQ25ELElBQUksUUFBc0IsQ0FBQyxDQUFFLDBEQUEwRDtBQUV2Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSDtJQWVFSyxtQkFBWUEsSUFBdUJBO1FBWm5DQyxnQkFBZ0JBO1FBQ2hCQSxpQkFBWUEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDNUJBLGdCQUFnQkE7UUFDaEJBLHlCQUFvQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFFcENBLGdCQUFnQkE7UUFDaEJBLGtCQUFhQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUM3QkEsZ0JBQWdCQTtRQUNoQkEsU0FBSUEsR0FBcURBLElBQUlBLENBQUNBO1FBQ3REQSxjQUFTQSxHQUFRQSxJQUFJQSxDQUFDQTtRQUdTQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUFDQSxDQUFDQTtJQUUxREQsK0JBQVdBLEdBQVhBO1FBQ0VFLEVBQUVBLENBQUNBLENBQUNBLGdCQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFDbEJBLENBQUNBO0lBQ0hBLENBQUNBO0lBRURGLDZCQUFTQSxHQUFUQSxVQUFVQSxHQUFxREEsRUFBRUEsSUFBWUE7UUFDM0VHLEVBQUVBLENBQUNBLENBQUNBLGNBQU9BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3ZCQSxFQUFFQSxDQUFDQSxDQUFDQSxnQkFBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25CQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN2QkEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtZQUM5Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFDM0JBLENBQUNBO1FBRURBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RCQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTtZQUNoQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBRURBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLEtBQUtBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDcERBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0E7UUFDbkNBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ05BLElBQUlBLENBQUNBLG9CQUFvQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7WUFDOUNBLE1BQU1BLENBQUNBLG1CQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtRQUM5Q0EsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFFREgsZ0JBQWdCQTtJQUNoQkEsOEJBQVVBLEdBQVZBLFVBQVdBLEdBQXFEQTtRQUFoRUksaUJBS0NBO1FBSkNBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ2hCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUMzQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0Esa0JBQWtCQSxDQUNsREEsR0FBR0EsRUFBRUEsVUFBQ0EsS0FBYUEsSUFBS0EsT0FBQUEsS0FBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxDQUFDQSxFQUFuQ0EsQ0FBbUNBLENBQUNBLENBQUNBO0lBQ25FQSxDQUFDQTtJQUVESixnQkFBZ0JBO0lBQ2hCQSxtQ0FBZUEsR0FBZkEsVUFBZ0JBLEdBQXFEQTtRQUNuRUssRUFBRUEsQ0FBQ0EsQ0FBQ0EsZ0JBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ25CQSxNQUFNQSxDQUFDQSxnQkFBZ0JBLENBQUNBO1FBQzFCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSx5QkFBaUJBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQy9DQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBO1FBQzdCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNOQSxNQUFNQSxJQUFJQSw4REFBNEJBLENBQUNBLFNBQVNBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO1FBQ3pEQSxDQUFDQTtJQUNIQSxDQUFDQTtJQUVETCxnQkFBZ0JBO0lBQ2hCQSw0QkFBUUEsR0FBUkE7UUFDRU0sSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7UUFDM0NBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3pCQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEdBQUdBLElBQUlBLENBQUNBO1FBQ2pDQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUMxQkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0E7SUFDbkJBLENBQUNBO0lBRUROLGdCQUFnQkE7SUFDaEJBLHNDQUFrQkEsR0FBbEJBLFVBQW1CQSxLQUFVQSxFQUFFQSxLQUFhQTtRQUMxQ08sRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsS0FBS0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDeEJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLEtBQUtBLENBQUNBO1lBQzFCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUEvRUhQO1FBcEI2QkEsMERBQTBEQTtRQW9CdEZBLFdBQUlBLENBQUNBLEVBQUNBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUNBLENBQUNBO1FBQ2xDQSxpQkFBVUEsRUFBRUE7O2tCQStFWkE7SUFBREEsZ0JBQUNBO0FBQURBLENBQUNBLEFBaEZELElBZ0ZDO0FBOUVZLGlCQUFTLFlBOEVyQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIGlzUHJvbWlzZSwgQ09OU1R9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge09ic2VydmFibGVXcmFwcGVyLCBPYnNlcnZhYmxlLCBFdmVudEVtaXR0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtcbiAgUGlwZSxcbiAgSW5qZWN0YWJsZSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9uRGVzdHJveSxcbiAgUGlwZVRyYW5zZm9ybSxcbiAgV3JhcHBlZFZhbHVlXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5pbXBvcnQge0ludmFsaWRQaXBlQXJndW1lbnRFeGNlcHRpb259IGZyb20gJy4vaW52YWxpZF9waXBlX2FyZ3VtZW50X2V4Y2VwdGlvbic7XG5cbmNsYXNzIE9ic2VydmFibGVTdHJhdGVneSB7XG4gIGNyZWF0ZVN1YnNjcmlwdGlvbihhc3luYzogYW55LCB1cGRhdGVMYXRlc3RWYWx1ZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZVdyYXBwZXIuc3Vic2NyaWJlKGFzeW5jLCB1cGRhdGVMYXRlc3RWYWx1ZSwgZSA9PiB7IHRocm93IGU7IH0pO1xuICB9XG5cbiAgZGlzcG9zZShzdWJzY3JpcHRpb246IGFueSk6IHZvaWQgeyBPYnNlcnZhYmxlV3JhcHBlci5kaXNwb3NlKHN1YnNjcmlwdGlvbik7IH1cblxuICBvbkRlc3Ryb3koc3Vic2NyaXB0aW9uOiBhbnkpOiB2b2lkIHsgT2JzZXJ2YWJsZVdyYXBwZXIuZGlzcG9zZShzdWJzY3JpcHRpb24pOyB9XG59XG5cbmNsYXNzIFByb21pc2VTdHJhdGVneSB7XG4gIGNyZWF0ZVN1YnNjcmlwdGlvbihhc3luYzogYW55LCB1cGRhdGVMYXRlc3RWYWx1ZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gYXN5bmMudGhlbih1cGRhdGVMYXRlc3RWYWx1ZSk7XG4gIH1cblxuICBkaXNwb3NlKHN1YnNjcmlwdGlvbjogYW55KTogdm9pZCB7fVxuXG4gIG9uRGVzdHJveShzdWJzY3JpcHRpb246IGFueSk6IHZvaWQge31cbn1cblxudmFyIF9wcm9taXNlU3RyYXRlZ3kgPSBuZXcgUHJvbWlzZVN0cmF0ZWd5KCk7XG52YXIgX29ic2VydmFibGVTdHJhdGVneSA9IG5ldyBPYnNlcnZhYmxlU3RyYXRlZ3koKTtcbnZhciBfX3VudXNlZDogUHJvbWlzZTxhbnk+OyAgLy8gYXZvaWQgdW51c2VkIGltcG9ydCB3aGVuIFByb21pc2UgdW5pb24gdHlwZXMgYXJlIGVyYXNlZFxuXG4vKipcbiAqIFRoZSBgYXN5bmNgIHBpcGUgc3Vic2NyaWJlcyB0byBhbiBPYnNlcnZhYmxlIG9yIFByb21pc2UgYW5kIHJldHVybnMgdGhlIGxhdGVzdCB2YWx1ZSBpdCBoYXNcbiAqIGVtaXR0ZWQuXG4gKiBXaGVuIGEgbmV3IHZhbHVlIGlzIGVtaXR0ZWQsIHRoZSBgYXN5bmNgIHBpcGUgbWFya3MgdGhlIGNvbXBvbmVudCB0byBiZSBjaGVja2VkIGZvciBjaGFuZ2VzLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogVGhpcyBleGFtcGxlIGJpbmRzIGEgYFByb21pc2VgIHRvIHRoZSB2aWV3LiBDbGlja2luZyB0aGUgYFJlc29sdmVgIGJ1dHRvbiByZXNvbHZlcyB0aGVcbiAqIHByb21pc2UuXG4gKlxuICoge0BleGFtcGxlIGNvcmUvcGlwZXMvdHMvYXN5bmNfcGlwZS9hc3luY19waXBlX2V4YW1wbGUudHMgcmVnaW9uPSdBc3luY1BpcGUnfVxuICpcbiAqIEl0J3MgYWxzbyBwb3NzaWJsZSB0byB1c2UgYGFzeW5jYCB3aXRoIE9ic2VydmFibGVzLiBUaGUgZXhhbXBsZSBiZWxvdyBiaW5kcyB0aGUgYHRpbWVgIE9ic2VydmFibGVcbiAqIHRvIHRoZSB2aWV3LiBFdmVyeSA1MDBtcywgdGhlIGB0aW1lYCBPYnNlcnZhYmxlIHVwZGF0ZXMgdGhlIHZpZXcgd2l0aCB0aGUgY3VycmVudCB0aW1lLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGBgYFxuICovXG5AUGlwZSh7bmFtZTogJ2FzeW5jJywgcHVyZTogZmFsc2V9KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFzeW5jUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2xhdGVzdFZhbHVlOiBPYmplY3QgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9sYXRlc3RSZXR1cm5lZFZhbHVlOiBPYmplY3QgPSBudWxsO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3N1YnNjcmlwdGlvbjogT2JqZWN0ID0gbnVsbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfb2JqOiBPYnNlcnZhYmxlPGFueT58IFByb21pc2U8YW55PnwgRXZlbnRFbWl0dGVyPGFueT4gPSBudWxsO1xuICBwcml2YXRlIF9zdHJhdGVneTogYW55ID0gbnVsbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgX3JlZjogQ2hhbmdlRGV0ZWN0b3JSZWY7XG4gIGNvbnN0cnVjdG9yKF9yZWY6IENoYW5nZURldGVjdG9yUmVmKSB7IHRoaXMuX3JlZiA9IF9yZWY7IH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3N1YnNjcmlwdGlvbikpIHtcbiAgICAgIHRoaXMuX2Rpc3Bvc2UoKTtcbiAgICB9XG4gIH1cblxuICB0cmFuc2Zvcm0ob2JqOiBPYnNlcnZhYmxlPGFueT58IFByb21pc2U8YW55PnwgRXZlbnRFbWl0dGVyPGFueT4sIGFyZ3M/OiBhbnlbXSk6IGFueSB7XG4gICAgaWYgKGlzQmxhbmsodGhpcy5fb2JqKSkge1xuICAgICAgaWYgKGlzUHJlc2VudChvYmopKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmliZShvYmopO1xuICAgICAgfVxuICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xuICAgICAgcmV0dXJuIHRoaXMuX2xhdGVzdFZhbHVlO1xuICAgIH1cblxuICAgIGlmIChvYmogIT09IHRoaXMuX29iaikge1xuICAgICAgdGhpcy5fZGlzcG9zZSgpO1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xhdGVzdFZhbHVlID09PSB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xuICAgICAgcmV0dXJuIFdyYXBwZWRWYWx1ZS53cmFwKHRoaXMuX2xhdGVzdFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9zdWJzY3JpYmUob2JqOiBPYnNlcnZhYmxlPGFueT58IFByb21pc2U8YW55PnwgRXZlbnRFbWl0dGVyPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLl9vYmogPSBvYmo7XG4gICAgdGhpcy5fc3RyYXRlZ3kgPSB0aGlzLl9zZWxlY3RTdHJhdGVneShvYmopO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX3N0cmF0ZWd5LmNyZWF0ZVN1YnNjcmlwdGlvbihcbiAgICAgICAgb2JqLCAodmFsdWU6IE9iamVjdCkgPT4gdGhpcy5fdXBkYXRlTGF0ZXN0VmFsdWUob2JqLCB2YWx1ZSkpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2VsZWN0U3RyYXRlZ3kob2JqOiBPYnNlcnZhYmxlPGFueT58IFByb21pc2U8YW55PnwgRXZlbnRFbWl0dGVyPGFueT4pOiBhbnkge1xuICAgIGlmIChpc1Byb21pc2Uob2JqKSkge1xuICAgICAgcmV0dXJuIF9wcm9taXNlU3RyYXRlZ3k7XG4gICAgfSBlbHNlIGlmIChPYnNlcnZhYmxlV3JhcHBlci5pc09ic2VydmFibGUob2JqKSkge1xuICAgICAgcmV0dXJuIF9vYnNlcnZhYmxlU3RyYXRlZ3k7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkUGlwZUFyZ3VtZW50RXhjZXB0aW9uKEFzeW5jUGlwZSwgb2JqKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9kaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmF0ZWd5LmRpc3Bvc2UodGhpcy5fc3Vic2NyaXB0aW9uKTtcbiAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB0aGlzLl9vYmogPSBudWxsO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdXBkYXRlTGF0ZXN0VmFsdWUoYXN5bmM6IGFueSwgdmFsdWU6IE9iamVjdCkge1xuICAgIGlmIChhc3luYyA9PT0gdGhpcy5fb2JqKSB7XG4gICAgICB0aGlzLl9sYXRlc3RWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fcmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxufVxuIl19