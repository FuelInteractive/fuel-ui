'use strict';var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var profile_1 = require('../profile/profile');
/**
 * Stores error information; delivered via [NgZone.onError] stream.
 */
var NgZoneError = (function () {
    function NgZoneError(error, stackTrace) {
        this.error = error;
        this.stackTrace = stackTrace;
    }
    return NgZoneError;
})();
exports.NgZoneError = NgZoneError;
/**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {@link #runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {@link #run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * ### Example ([live demo](http://plnkr.co/edit/lY9m8HLy7z06vDoUaSN2?p=preview))
 * ```
 * import {Component, View, NgZone} from 'angular2/core';
 * import {NgIf} from 'angular2/common';
 *
 * @Component({
 *   selector: 'ng-zone-demo'.
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 *   directives: [NgIf]
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *       // reenter the Angular zone and display done
 *       this._ngZone.run(() => {console.log('Outside Done!') });
 *     }}));
 *   }
 *
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback)), 10)
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 */
var NgZone = (function () {
    /**
     * @param {bool} enableLongStackTrace whether to enable long stack trace. They should only be
     *               enabled in development mode as they significantly impact perf.
     */
    function NgZone(_a) {
        var enableLongStackTrace = _a.enableLongStackTrace;
        /** @internal */
        this._runScope = profile_1.wtfCreateScope("NgZone#run()");
        /** @internal */
        this._microtaskScope = profile_1.wtfCreateScope("NgZone#microtask()");
        // Number of microtasks pending from _innerZone (& descendants)
        /** @internal */
        this._pendingMicrotasks = 0;
        // Whether some code has been executed in the _innerZone (& descendants) in the current turn
        /** @internal */
        this._hasExecutedCodeInInnerZone = false;
        // run() call depth in _mountZone. 0 at the end of a macrotask
        // zone.run(() => {         // top-level call
        //   zone.run(() => {});    // nested call -> in-turn
        // });
        /** @internal */
        this._nestedRun = 0;
        /** @internal */
        this._inVmTurnDone = false;
        /** @internal */
        this._pendingTimeouts = [];
        if (lang_1.global.zone) {
            this._disabled = false;
            this._mountZone = lang_1.global.zone;
            this._innerZone = this._createInnerZone(this._mountZone, enableLongStackTrace);
        }
        else {
            this._disabled = true;
            this._mountZone = null;
        }
        this._onTurnStartEvents = new async_1.EventEmitter(false);
        this._onTurnDoneEvents = new async_1.EventEmitter(false);
        this._onEventDoneEvents = new async_1.EventEmitter(false);
        this._onErrorEvents = new async_1.EventEmitter(false);
    }
    /**
     * Sets the zone hook that is called just before a browser task that is handled by Angular
     * executes.
     *
     * The hook is called once per browser task that is handled by Angular.
     *
     * Setting the hook overrides any previously set hook.
     *
     * @deprecated this API will be removed in the future. Use `onTurnStart` instead.
     */
    NgZone.prototype.overrideOnTurnStart = function (onTurnStartHook) {
        this._onTurnStart = lang_1.normalizeBlank(onTurnStartHook);
    };
    Object.defineProperty(NgZone.prototype, "onTurnStart", {
        /**
         * Notifies subscribers just before Angular event turn starts.
         *
         * Emits an event once per browser task that is handled by Angular.
         */
        get: function () { return this._onTurnStartEvents; },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    NgZone.prototype._notifyOnTurnStart = function (parentRun) {
        var _this = this;
        parentRun.call(this._innerZone, function () { _this._onTurnStartEvents.emit(null); });
    };
    /**
     * Sets the zone hook that is called immediately after Angular zone is done processing the current
     * task and any microtasks scheduled from that task.
     *
     * This is where we typically do change-detection.
     *
     * The hook is called once per browser task that is handled by Angular.
     *
     * Setting the hook overrides any previously set hook.
     *
     * @deprecated this API will be removed in the future. Use `onTurnDone` instead.
     */
    NgZone.prototype.overrideOnTurnDone = function (onTurnDoneHook) {
        this._onTurnDone = lang_1.normalizeBlank(onTurnDoneHook);
    };
    Object.defineProperty(NgZone.prototype, "onTurnDone", {
        /**
         * Notifies subscribers immediately after Angular zone is done processing
         * the current turn and any microtasks scheduled from that turn.
         *
         * Used by Angular as a signal to kick off change-detection.
         */
        get: function () { return this._onTurnDoneEvents; },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    NgZone.prototype._notifyOnTurnDone = function (parentRun) {
        var _this = this;
        parentRun.call(this._innerZone, function () { _this._onTurnDoneEvents.emit(null); });
    };
    /**
     * Sets the zone hook that is called immediately after the `onTurnDone` callback is called and any
     * microstasks scheduled from within that callback are drained.
     *
     * `onEventDoneFn` is executed outside Angular zone, which means that we will no longer attempt to
     * sync the UI with any model changes that occur within this callback.
     *
     * This hook is useful for validating application state (e.g. in a test).
     *
     * Setting the hook overrides any previously set hook.
     *
     * @deprecated this API will be removed in the future. Use `onEventDone` instead.
     */
    NgZone.prototype.overrideOnEventDone = function (onEventDoneFn, opt_waitForAsync) {
        var _this = this;
        if (opt_waitForAsync === void 0) { opt_waitForAsync = false; }
        var normalizedOnEventDone = lang_1.normalizeBlank(onEventDoneFn);
        if (opt_waitForAsync) {
            this._onEventDone = function () {
                if (!_this._pendingTimeouts.length) {
                    normalizedOnEventDone();
                }
            };
        }
        else {
            this._onEventDone = normalizedOnEventDone;
        }
    };
    Object.defineProperty(NgZone.prototype, "onEventDone", {
        /**
         * Notifies subscribers immediately after the final `onTurnDone` callback
         * before ending VM event.
         *
         * This event is useful for validating application state (e.g. in a test).
         */
        get: function () { return this._onEventDoneEvents; },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    NgZone.prototype._notifyOnEventDone = function () {
        var _this = this;
        this.runOutsideAngular(function () { _this._onEventDoneEvents.emit(null); });
    };
    Object.defineProperty(NgZone.prototype, "hasPendingMicrotasks", {
        /**
         * Whether there are any outstanding microtasks.
         */
        get: function () { return this._pendingMicrotasks > 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "hasPendingTimers", {
        /**
         * Whether there are any outstanding timers.
         */
        get: function () { return this._pendingTimeouts.length > 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "hasPendingAsyncTasks", {
        /**
         * Whether there are any outstanding asynchronous tasks of any kind that are
         * scheduled to run within Angular zone.
         *
         * Useful as a signal of UI stability. For example, when a test reaches a
         * point when [hasPendingAsyncTasks] is `false` it might be a good time to run
         * test expectations.
         */
        get: function () { return this.hasPendingMicrotasks || this.hasPendingTimers; },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the zone hook that is called when an error is thrown in the Angular zone.
     *
     * Setting the hook overrides any previously set hook.
     *
     * @deprecated this API will be removed in the future. Use `onError` instead.
     */
    NgZone.prototype.overrideOnErrorHandler = function (errorHandler) {
        this._onErrorHandler = lang_1.normalizeBlank(errorHandler);
    };
    Object.defineProperty(NgZone.prototype, "onError", {
        get: function () { return this._onErrorEvents; },
        enumerable: true,
        configurable: true
    });
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     */
    NgZone.prototype.run = function (fn) {
        if (this._disabled) {
            return fn();
        }
        else {
            var s = this._runScope();
            try {
                return this._innerZone.run(fn);
            }
            finally {
                profile_1.wtfLeave(s);
            }
        }
    };
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via `runOutsideAngular` allows you to escape Angular's zone and do work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
     */
    NgZone.prototype.runOutsideAngular = function (fn) {
        if (this._disabled) {
            return fn();
        }
        else {
            return this._mountZone.run(fn);
        }
    };
    /** @internal */
    NgZone.prototype._createInnerZone = function (zone, enableLongStackTrace) {
        var microtaskScope = this._microtaskScope;
        var ngZone = this;
        var errorHandling;
        if (enableLongStackTrace) {
            errorHandling =
                collection_1.StringMapWrapper.merge(lang_1.global.Zone.longStackTraceZone, { onError: function (e) { ngZone._notifyOnError(this, e); } });
        }
        else {
            errorHandling = { onError: function (e) { ngZone._notifyOnError(this, e); } };
        }
        return zone.fork(errorHandling)
            .fork({
            '$run': function (parentRun) {
                return function () {
                    try {
                        ngZone._nestedRun++;
                        if (!ngZone._hasExecutedCodeInInnerZone) {
                            ngZone._hasExecutedCodeInInnerZone = true;
                            ngZone._notifyOnTurnStart(parentRun);
                            if (ngZone._onTurnStart) {
                                parentRun.call(ngZone._innerZone, ngZone._onTurnStart);
                            }
                        }
                        return parentRun.apply(this, arguments);
                    }
                    finally {
                        ngZone._nestedRun--;
                        // If there are no more pending microtasks, we are at the end of a VM turn (or in
                        // onTurnStart)
                        // _nestedRun will be 0 at the end of a macrotasks (it could be > 0 when there are
                        // nested calls
                        // to run()).
                        if (ngZone._pendingMicrotasks == 0 && ngZone._nestedRun == 0 &&
                            !this._inVmTurnDone) {
                            if (ngZone._hasExecutedCodeInInnerZone) {
                                try {
                                    this._inVmTurnDone = true;
                                    ngZone._notifyOnTurnDone(parentRun);
                                    if (ngZone._onTurnDone) {
                                        parentRun.call(ngZone._innerZone, ngZone._onTurnDone);
                                    }
                                }
                                finally {
                                    this._inVmTurnDone = false;
                                    ngZone._hasExecutedCodeInInnerZone = false;
                                }
                            }
                            if (ngZone._pendingMicrotasks === 0) {
                                ngZone._notifyOnEventDone();
                                if (lang_1.isPresent(ngZone._onEventDone)) {
                                    ngZone.runOutsideAngular(ngZone._onEventDone);
                                }
                            }
                        }
                    }
                };
            },
            '$scheduleMicrotask': function (parentScheduleMicrotask) {
                return function (fn) {
                    ngZone._pendingMicrotasks++;
                    var microtask = function () {
                        var s = microtaskScope();
                        try {
                            fn();
                        }
                        finally {
                            ngZone._pendingMicrotasks--;
                            profile_1.wtfLeave(s);
                        }
                    };
                    parentScheduleMicrotask.call(this, microtask);
                };
            },
            '$setTimeout': function (parentSetTimeout) {
                return function (fn, delay) {
                    var args = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        args[_i - 2] = arguments[_i];
                    }
                    var id;
                    var cb = function () {
                        fn();
                        collection_1.ListWrapper.remove(ngZone._pendingTimeouts, id);
                    };
                    id = parentSetTimeout.call(this, cb, delay, args);
                    ngZone._pendingTimeouts.push(id);
                    return id;
                };
            },
            '$clearTimeout': function (parentClearTimeout) {
                return function (id) {
                    parentClearTimeout.call(this, id);
                    collection_1.ListWrapper.remove(ngZone._pendingTimeouts, id);
                };
            },
            _innerZone: true
        });
    };
    /** @internal */
    NgZone.prototype._notifyOnError = function (zone, e) {
        if (lang_1.isPresent(this._onErrorHandler) || async_1.ObservableWrapper.hasSubscribers(this._onErrorEvents)) {
            var trace = [lang_1.normalizeBlank(e.stack)];
            while (zone && zone.constructedAtException) {
                trace.push(zone.constructedAtException.get());
                zone = zone.parent;
            }
            if (async_1.ObservableWrapper.hasSubscribers(this._onErrorEvents)) {
                async_1.ObservableWrapper.callEmit(this._onErrorEvents, new NgZoneError(e, trace));
            }
            if (lang_1.isPresent(this._onErrorHandler)) {
                this._onErrorHandler(e, trace);
            }
        }
        else {
            console.log('## _notifyOnError ##');
            console.log(e.stack);
            throw e;
        }
    };
    return NgZone;
})();
exports.NgZone = NgZone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfem9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy9jb3JlL3pvbmUvbmdfem9uZS50cyJdLCJuYW1lcyI6WyJOZ1pvbmVFcnJvciIsIk5nWm9uZUVycm9yLmNvbnN0cnVjdG9yIiwiTmdab25lIiwiTmdab25lLmNvbnN0cnVjdG9yIiwiTmdab25lLm92ZXJyaWRlT25UdXJuU3RhcnQiLCJOZ1pvbmUub25UdXJuU3RhcnQiLCJOZ1pvbmUuX25vdGlmeU9uVHVyblN0YXJ0IiwiTmdab25lLm92ZXJyaWRlT25UdXJuRG9uZSIsIk5nWm9uZS5vblR1cm5Eb25lIiwiTmdab25lLl9ub3RpZnlPblR1cm5Eb25lIiwiTmdab25lLm92ZXJyaWRlT25FdmVudERvbmUiLCJOZ1pvbmUub25FdmVudERvbmUiLCJOZ1pvbmUuX25vdGlmeU9uRXZlbnREb25lIiwiTmdab25lLmhhc1BlbmRpbmdNaWNyb3Rhc2tzIiwiTmdab25lLmhhc1BlbmRpbmdUaW1lcnMiLCJOZ1pvbmUuaGFzUGVuZGluZ0FzeW5jVGFza3MiLCJOZ1pvbmUub3ZlcnJpZGVPbkVycm9ySGFuZGxlciIsIk5nWm9uZS5vbkVycm9yIiwiTmdab25lLnJ1biIsIk5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhciIsIk5nWm9uZS5fY3JlYXRlSW5uZXJab25lIiwiTmdab25lLl9ub3RpZnlPbkVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQSwyQkFBNEMsZ0NBQWdDLENBQUMsQ0FBQTtBQUM3RSxxQkFBMEQsMEJBQTBCLENBQUMsQ0FBQTtBQUNyRixzQkFBOEMsMkJBQTJCLENBQUMsQ0FBQTtBQUMxRSx3QkFBbUQsb0JBQW9CLENBQUMsQ0FBQTtBQWlCeEU7O0dBRUc7QUFDSDtJQUNFQSxxQkFBbUJBLEtBQVVBLEVBQVNBLFVBQWVBO1FBQWxDQyxVQUFLQSxHQUFMQSxLQUFLQSxDQUFLQTtRQUFTQSxlQUFVQSxHQUFWQSxVQUFVQSxDQUFLQTtJQUFHQSxDQUFDQTtJQUMzREQsa0JBQUNB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QUFDQSxjQUFjQSxFQUFFQSxJQUFJQSxXQUFXQSxDQUFDQSxDQUFDQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM3RUEsQ0FBQ0E7WUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsZ0JBQVNBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNwQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDakNBLENBQUNBO1FBQ0hBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ05BLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0E7WUFDcENBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQ3JCQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUNWQSxDQUFDQTtJQUNIQSxDQUFDQTtJQUNIbkIsYUFBQ0E7QUFBREEsQ0FBQ0EsQUEzV0QsSUEyV0M7QUEzV1ksY0FBTSxTQTJXbEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge25vcm1hbGl6ZUJsYW5rLCBpc1ByZXNlbnQsIGdsb2JhbCwgWm9uZUxpa2V9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge09ic2VydmFibGVXcmFwcGVyLCBFdmVudEVtaXR0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHt3dGZMZWF2ZSwgd3RmQ3JlYXRlU2NvcGUsIFd0ZlNjb3BlRm59IGZyb20gJy4uL3Byb2ZpbGUvcHJvZmlsZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmdab25lWm9uZSBleHRlbmRzIFpvbmVMaWtlIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaW5uZXJab25lOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgYSBmdW5jdGlvbiB3aXRoIHplcm8gYXJndW1lbnRzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFplcm9BcmdGdW5jdGlvbiB7ICgpOiB2b2lkOyB9XG5cbi8qKlxuICogRnVuY3Rpb24gdHlwZSBmb3IgYW4gZXJyb3IgaGFuZGxlciwgd2hpY2ggdGFrZXMgYW4gZXJyb3IgYW5kIGEgc3RhY2sgdHJhY2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JIYW5kbGluZ0ZuIHsgKGVycm9yOiBhbnksIHN0YWNrVHJhY2U6IGFueSk6IHZvaWQ7IH1cblxuLyoqXG4gKiBTdG9yZXMgZXJyb3IgaW5mb3JtYXRpb247IGRlbGl2ZXJlZCB2aWEgW05nWm9uZS5vbkVycm9yXSBzdHJlYW0uXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ1pvbmVFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlcnJvcjogYW55LCBwdWJsaWMgc3RhY2tUcmFjZTogYW55KSB7fVxufVxuXG4vKipcbiAqIEFuIGluamVjdGFibGUgc2VydmljZSBmb3IgZXhlY3V0aW5nIHdvcmsgaW5zaWRlIG9yIG91dHNpZGUgb2YgdGhlIEFuZ3VsYXIgem9uZS5cbiAqXG4gKiBUaGUgbW9zdCBjb21tb24gdXNlIG9mIHRoaXMgc2VydmljZSBpcyB0byBvcHRpbWl6ZSBwZXJmb3JtYW5jZSB3aGVuIHN0YXJ0aW5nIGEgd29yayBjb25zaXN0aW5nIG9mXG4gKiBvbmUgb3IgbW9yZSBhc3luY2hyb25vdXMgdGFza3MgdGhhdCBkb24ndCByZXF1aXJlIFVJIHVwZGF0ZXMgb3IgZXJyb3IgaGFuZGxpbmcgdG8gYmUgaGFuZGxlZCBieVxuICogQW5ndWxhci4gU3VjaCB0YXNrcyBjYW4gYmUga2lja2VkIG9mZiB2aWEge0BsaW5rICNydW5PdXRzaWRlQW5ndWxhcn0gYW5kIGlmIG5lZWRlZCwgdGhlc2UgdGFza3NcbiAqIGNhbiByZWVudGVyIHRoZSBBbmd1bGFyIHpvbmUgdmlhIHtAbGluayAjcnVufS5cbiAqXG4gKiA8IS0tIFRPRE86IGFkZC9maXggbGlua3MgdG86XG4gKiAgIC0gZG9jcyBleHBsYWluaW5nIHpvbmVzIGFuZCB0aGUgdXNlIG9mIHpvbmVzIGluIEFuZ3VsYXIgYW5kIGNoYW5nZS1kZXRlY3Rpb25cbiAqICAgLSBsaW5rIHRvIHJ1bk91dHNpZGVBbmd1bGFyL3J1biAodGhyb3VnaG91dCB0aGlzIGZpbGUhKVxuICogICAtLT5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvbFk5bThITHk3ejA2dkRvVWFTTjI/cD1wcmV2aWV3KSlcbiAqIGBgYFxuICogaW1wb3J0IHtDb21wb25lbnQsIFZpZXcsIE5nWm9uZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG4gKiBpbXBvcnQge05nSWZ9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbmctem9uZS1kZW1vJy5cbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgICA8aDI+RGVtbzogTmdab25lPC9oMj5cbiAqXG4gKiAgICAgPHA+UHJvZ3Jlc3M6IHt7cHJvZ3Jlc3N9fSU8L3A+XG4gKiAgICAgPHAgKm5nSWY9XCJwcm9ncmVzcyA+PSAxMDBcIj5Eb25lIHByb2Nlc3Npbmcge3tsYWJlbH19IG9mIEFuZ3VsYXIgem9uZSE8L3A+XG4gKlxuICogICAgIDxidXR0b24gKGNsaWNrKT1cInByb2Nlc3NXaXRoaW5Bbmd1bGFyWm9uZSgpXCI+UHJvY2VzcyB3aXRoaW4gQW5ndWxhciB6b25lPC9idXR0b24+XG4gKiAgICAgPGJ1dHRvbiAoY2xpY2spPVwicHJvY2Vzc091dHNpZGVPZkFuZ3VsYXJab25lKClcIj5Qcm9jZXNzIG91dHNpZGUgb2YgQW5ndWxhciB6b25lPC9idXR0b24+XG4gKiAgIGAsXG4gKiAgIGRpcmVjdGl2ZXM6IFtOZ0lmXVxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBOZ1pvbmVEZW1vIHtcbiAqICAgcHJvZ3Jlc3M6IG51bWJlciA9IDA7XG4gKiAgIGxhYmVsOiBzdHJpbmc7XG4gKlxuICogICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge31cbiAqXG4gKiAgIC8vIExvb3AgaW5zaWRlIHRoZSBBbmd1bGFyIHpvbmVcbiAqICAgLy8gc28gdGhlIFVJIERPRVMgcmVmcmVzaCBhZnRlciBlYWNoIHNldFRpbWVvdXQgY3ljbGVcbiAqICAgcHJvY2Vzc1dpdGhpbkFuZ3VsYXJab25lKCkge1xuICogICAgIHRoaXMubGFiZWwgPSAnaW5zaWRlJztcbiAqICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAqICAgICB0aGlzLl9pbmNyZWFzZVByb2dyZXNzKCgpID0+IGNvbnNvbGUubG9nKCdJbnNpZGUgRG9uZSEnKSk7XG4gKiAgIH1cbiAqXG4gKiAgIC8vIExvb3Agb3V0c2lkZSBvZiB0aGUgQW5ndWxhciB6b25lXG4gKiAgIC8vIHNvIHRoZSBVSSBET0VTIE5PVCByZWZyZXNoIGFmdGVyIGVhY2ggc2V0VGltZW91dCBjeWNsZVxuICogICBwcm9jZXNzT3V0c2lkZU9mQW5ndWxhclpvbmUoKSB7XG4gKiAgICAgdGhpcy5sYWJlbCA9ICdvdXRzaWRlJztcbiAqICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAqICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICogICAgICAgdGhpcy5faW5jcmVhc2VQcm9ncmVzcygoKSA9PiB7XG4gKiAgICAgICAvLyByZWVudGVyIHRoZSBBbmd1bGFyIHpvbmUgYW5kIGRpc3BsYXkgZG9uZVxuICogICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7Y29uc29sZS5sb2coJ091dHNpZGUgRG9uZSEnKSB9KTtcbiAqICAgICB9fSkpO1xuICogICB9XG4gKlxuICpcbiAqICAgX2luY3JlYXNlUHJvZ3Jlc3MoZG9uZUNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gKiAgICAgdGhpcy5wcm9ncmVzcyArPSAxO1xuICogICAgIGNvbnNvbGUubG9nKGBDdXJyZW50IHByb2dyZXNzOiAke3RoaXMucHJvZ3Jlc3N9JWApO1xuICpcbiAqICAgICBpZiAodGhpcy5wcm9ncmVzcyA8IDEwMCkge1xuICogICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5faW5jcmVhc2VQcm9ncmVzcyhkb25lQ2FsbGJhY2spKSwgMTApXG4gKiAgICAgfSBlbHNlIHtcbiAqICAgICAgIGRvbmVDYWxsYmFjaygpO1xuICogICAgIH1cbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ1pvbmUge1xuICAvKiogQGludGVybmFsICovXG4gIF9ydW5TY29wZTogV3RmU2NvcGVGbiA9IHd0ZkNyZWF0ZVNjb3BlKGBOZ1pvbmUjcnVuKClgKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbWljcm90YXNrU2NvcGU6IFd0ZlNjb3BlRm4gPSB3dGZDcmVhdGVTY29wZShgTmdab25lI21pY3JvdGFzaygpYCk7XG5cbiAgLy8gQ29kZSBleGVjdXRlZCBpbiBfbW91bnRab25lIGRvZXMgbm90IHRyaWdnZXIgdGhlIG9uVHVybkRvbmUuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX21vdW50Wm9uZTtcbiAgLy8gX2lubmVyWm9uZSBpcyB0aGUgY2hpbGQgb2YgX21vdW50Wm9uZS4gQW55IGNvZGUgZXhlY3V0ZWQgaW4gdGhpcyB6b25lIHdpbGwgdHJpZ2dlciB0aGVcbiAgLy8gb25UdXJuRG9uZSBob29rIGF0IHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgVk0gdHVybi5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaW5uZXJab25lO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX29uVHVyblN0YXJ0OiBaZXJvQXJnRnVuY3Rpb247XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX29uVHVybkRvbmU6IFplcm9BcmdGdW5jdGlvbjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfb25FdmVudERvbmU6IFplcm9BcmdGdW5jdGlvbjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfb25FcnJvckhhbmRsZXI6IEVycm9ySGFuZGxpbmdGbjtcblxuICAvKiogQGludGVybmFsICovXG4gIF9vblR1cm5TdGFydEV2ZW50czogRXZlbnRFbWl0dGVyPGFueT47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX29uVHVybkRvbmVFdmVudHM6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICAvKiogQGludGVybmFsICovXG4gIF9vbkV2ZW50RG9uZUV2ZW50czogRXZlbnRFbWl0dGVyPGFueT47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX29uRXJyb3JFdmVudHM6IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG4gIC8vIE51bWJlciBvZiBtaWNyb3Rhc2tzIHBlbmRpbmcgZnJvbSBfaW5uZXJab25lICgmIGRlc2NlbmRhbnRzKVxuICAvKiogQGludGVybmFsICovXG4gIF9wZW5kaW5nTWljcm90YXNrczogbnVtYmVyID0gMDtcbiAgLy8gV2hldGhlciBzb21lIGNvZGUgaGFzIGJlZW4gZXhlY3V0ZWQgaW4gdGhlIF9pbm5lclpvbmUgKCYgZGVzY2VuZGFudHMpIGluIHRoZSBjdXJyZW50IHR1cm5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfaGFzRXhlY3V0ZWRDb2RlSW5Jbm5lclpvbmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gcnVuKCkgY2FsbCBkZXB0aCBpbiBfbW91bnRab25lLiAwIGF0IHRoZSBlbmQgb2YgYSBtYWNyb3Rhc2tcbiAgLy8gem9uZS5ydW4oKCkgPT4geyAgICAgICAgIC8vIHRvcC1sZXZlbCBjYWxsXG4gIC8vICAgem9uZS5ydW4oKCkgPT4ge30pOyAgICAvLyBuZXN0ZWQgY2FsbCAtPiBpbi10dXJuXG4gIC8vIH0pO1xuICAvKiogQGludGVybmFsICovXG4gIF9uZXN0ZWRSdW46IG51bWJlciA9IDA7XG5cbiAgLy8gVE9ETyh2aWNiKTogaW1wbGVtZW50IHRoaXMgY2xhc3MgcHJvcGVybHkgZm9yIG5vZGUuanMgZW52aXJvbm1lbnRcbiAgLy8gVGhpcyBkaXNhYmxlZCBmbGFnIGlzIG9ubHkgaGVyZSB0byBwbGVhc2UgY2pzIHRlc3RzXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2luVm1UdXJuRG9uZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BlbmRpbmdUaW1lb3V0czogbnVtYmVyW10gPSBbXTtcblxuICAvKipcbiAgICogQHBhcmFtIHtib29sfSBlbmFibGVMb25nU3RhY2tUcmFjZSB3aGV0aGVyIHRvIGVuYWJsZSBsb25nIHN0YWNrIHRyYWNlLiBUaGV5IHNob3VsZCBvbmx5IGJlXG4gICAqICAgICAgICAgICAgICAgZW5hYmxlZCBpbiBkZXZlbG9wbWVudCBtb2RlIGFzIHRoZXkgc2lnbmlmaWNhbnRseSBpbXBhY3QgcGVyZi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHtlbmFibGVMb25nU3RhY2tUcmFjZX0pIHtcbiAgICBpZiAoZ2xvYmFsLnpvbmUpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9tb3VudFpvbmUgPSBnbG9iYWwuem9uZTtcbiAgICAgIHRoaXMuX2lubmVyWm9uZSA9IHRoaXMuX2NyZWF0ZUlubmVyWm9uZSh0aGlzLl9tb3VudFpvbmUsIGVuYWJsZUxvbmdTdGFja1RyYWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fbW91bnRab25lID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fb25UdXJuU3RhcnRFdmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgICB0aGlzLl9vblR1cm5Eb25lRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gICAgdGhpcy5fb25FdmVudERvbmVFdmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgICB0aGlzLl9vbkVycm9yRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgem9uZSBob29rIHRoYXQgaXMgY2FsbGVkIGp1c3QgYmVmb3JlIGEgYnJvd3NlciB0YXNrIHRoYXQgaXMgaGFuZGxlZCBieSBBbmd1bGFyXG4gICAqIGV4ZWN1dGVzLlxuICAgKlxuICAgKiBUaGUgaG9vayBpcyBjYWxsZWQgb25jZSBwZXIgYnJvd3NlciB0YXNrIHRoYXQgaXMgaGFuZGxlZCBieSBBbmd1bGFyLlxuICAgKlxuICAgKiBTZXR0aW5nIHRoZSBob29rIG92ZXJyaWRlcyBhbnkgcHJldmlvdXNseSBzZXQgaG9vay5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgdGhpcyBBUEkgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUuIFVzZSBgb25UdXJuU3RhcnRgIGluc3RlYWQuXG4gICAqL1xuICBvdmVycmlkZU9uVHVyblN0YXJ0KG9uVHVyblN0YXJ0SG9vazogWmVyb0FyZ0Z1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fb25UdXJuU3RhcnQgPSBub3JtYWxpemVCbGFuayhvblR1cm5TdGFydEhvb2spO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIHN1YnNjcmliZXJzIGp1c3QgYmVmb3JlIEFuZ3VsYXIgZXZlbnQgdHVybiBzdGFydHMuXG4gICAqXG4gICAqIEVtaXRzIGFuIGV2ZW50IG9uY2UgcGVyIGJyb3dzZXIgdGFzayB0aGF0IGlzIGhhbmRsZWQgYnkgQW5ndWxhci5cbiAgICovXG4gIGdldCBvblR1cm5TdGFydCgpOiAvKiBTdWJqZWN0ICovIGFueSB7IHJldHVybiB0aGlzLl9vblR1cm5TdGFydEV2ZW50czsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25vdGlmeU9uVHVyblN0YXJ0KHBhcmVudFJ1bik6IHZvaWQge1xuICAgIHBhcmVudFJ1bi5jYWxsKHRoaXMuX2lubmVyWm9uZSwgKCkgPT4geyB0aGlzLl9vblR1cm5TdGFydEV2ZW50cy5lbWl0KG51bGwpOyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB6b25lIGhvb2sgdGhhdCBpcyBjYWxsZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgQW5ndWxhciB6b25lIGlzIGRvbmUgcHJvY2Vzc2luZyB0aGUgY3VycmVudFxuICAgKiB0YXNrIGFuZCBhbnkgbWljcm90YXNrcyBzY2hlZHVsZWQgZnJvbSB0aGF0IHRhc2suXG4gICAqXG4gICAqIFRoaXMgaXMgd2hlcmUgd2UgdHlwaWNhbGx5IGRvIGNoYW5nZS1kZXRlY3Rpb24uXG4gICAqXG4gICAqIFRoZSBob29rIGlzIGNhbGxlZCBvbmNlIHBlciBicm93c2VyIHRhc2sgdGhhdCBpcyBoYW5kbGVkIGJ5IEFuZ3VsYXIuXG4gICAqXG4gICAqIFNldHRpbmcgdGhlIGhvb2sgb3ZlcnJpZGVzIGFueSBwcmV2aW91c2x5IHNldCBob29rLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCB0aGlzIEFQSSB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZS4gVXNlIGBvblR1cm5Eb25lYCBpbnN0ZWFkLlxuICAgKi9cbiAgb3ZlcnJpZGVPblR1cm5Eb25lKG9uVHVybkRvbmVIb29rOiBaZXJvQXJnRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9vblR1cm5Eb25lID0gbm9ybWFsaXplQmxhbmsob25UdXJuRG9uZUhvb2spO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIHN1YnNjcmliZXJzIGltbWVkaWF0ZWx5IGFmdGVyIEFuZ3VsYXIgem9uZSBpcyBkb25lIHByb2Nlc3NpbmdcbiAgICogdGhlIGN1cnJlbnQgdHVybiBhbmQgYW55IG1pY3JvdGFza3Mgc2NoZWR1bGVkIGZyb20gdGhhdCB0dXJuLlxuICAgKlxuICAgKiBVc2VkIGJ5IEFuZ3VsYXIgYXMgYSBzaWduYWwgdG8ga2ljayBvZmYgY2hhbmdlLWRldGVjdGlvbi5cbiAgICovXG4gIGdldCBvblR1cm5Eb25lKCkgeyByZXR1cm4gdGhpcy5fb25UdXJuRG9uZUV2ZW50czsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25vdGlmeU9uVHVybkRvbmUocGFyZW50UnVuKTogdm9pZCB7XG4gICAgcGFyZW50UnVuLmNhbGwodGhpcy5faW5uZXJab25lLCAoKSA9PiB7IHRoaXMuX29uVHVybkRvbmVFdmVudHMuZW1pdChudWxsKTsgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgem9uZSBob29rIHRoYXQgaXMgY2FsbGVkIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBgb25UdXJuRG9uZWAgY2FsbGJhY2sgaXMgY2FsbGVkIGFuZCBhbnlcbiAgICogbWljcm9zdGFza3Mgc2NoZWR1bGVkIGZyb20gd2l0aGluIHRoYXQgY2FsbGJhY2sgYXJlIGRyYWluZWQuXG4gICAqXG4gICAqIGBvbkV2ZW50RG9uZUZuYCBpcyBleGVjdXRlZCBvdXRzaWRlIEFuZ3VsYXIgem9uZSwgd2hpY2ggbWVhbnMgdGhhdCB3ZSB3aWxsIG5vIGxvbmdlciBhdHRlbXB0IHRvXG4gICAqIHN5bmMgdGhlIFVJIHdpdGggYW55IG1vZGVsIGNoYW5nZXMgdGhhdCBvY2N1ciB3aXRoaW4gdGhpcyBjYWxsYmFjay5cbiAgICpcbiAgICogVGhpcyBob29rIGlzIHVzZWZ1bCBmb3IgdmFsaWRhdGluZyBhcHBsaWNhdGlvbiBzdGF0ZSAoZS5nLiBpbiBhIHRlc3QpLlxuICAgKlxuICAgKiBTZXR0aW5nIHRoZSBob29rIG92ZXJyaWRlcyBhbnkgcHJldmlvdXNseSBzZXQgaG9vay5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgdGhpcyBBUEkgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUuIFVzZSBgb25FdmVudERvbmVgIGluc3RlYWQuXG4gICAqL1xuICBvdmVycmlkZU9uRXZlbnREb25lKG9uRXZlbnREb25lRm46IFplcm9BcmdGdW5jdGlvbiwgb3B0X3dhaXRGb3JBc3luYzogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgdmFyIG5vcm1hbGl6ZWRPbkV2ZW50RG9uZSA9IG5vcm1hbGl6ZUJsYW5rKG9uRXZlbnREb25lRm4pO1xuICAgIGlmIChvcHRfd2FpdEZvckFzeW5jKSB7XG4gICAgICB0aGlzLl9vbkV2ZW50RG9uZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9wZW5kaW5nVGltZW91dHMubGVuZ3RoKSB7XG4gICAgICAgICAgbm9ybWFsaXplZE9uRXZlbnREb25lKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX29uRXZlbnREb25lID0gbm9ybWFsaXplZE9uRXZlbnREb25lO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOb3RpZmllcyBzdWJzY3JpYmVycyBpbW1lZGlhdGVseSBhZnRlciB0aGUgZmluYWwgYG9uVHVybkRvbmVgIGNhbGxiYWNrXG4gICAqIGJlZm9yZSBlbmRpbmcgVk0gZXZlbnQuXG4gICAqXG4gICAqIFRoaXMgZXZlbnQgaXMgdXNlZnVsIGZvciB2YWxpZGF0aW5nIGFwcGxpY2F0aW9uIHN0YXRlIChlLmcuIGluIGEgdGVzdCkuXG4gICAqL1xuICBnZXQgb25FdmVudERvbmUoKSB7IHJldHVybiB0aGlzLl9vbkV2ZW50RG9uZUV2ZW50czsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25vdGlmeU9uRXZlbnREb25lKCk6IHZvaWQge1xuICAgIHRoaXMucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4geyB0aGlzLl9vbkV2ZW50RG9uZUV2ZW50cy5lbWl0KG51bGwpOyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZXJlIGFyZSBhbnkgb3V0c3RhbmRpbmcgbWljcm90YXNrcy5cbiAgICovXG4gIGdldCBoYXNQZW5kaW5nTWljcm90YXNrcygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3BlbmRpbmdNaWNyb3Rhc2tzID4gMDsgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZXJlIGFyZSBhbnkgb3V0c3RhbmRpbmcgdGltZXJzLlxuICAgKi9cbiAgZ2V0IGhhc1BlbmRpbmdUaW1lcnMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9wZW5kaW5nVGltZW91dHMubGVuZ3RoID4gMDsgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZXJlIGFyZSBhbnkgb3V0c3RhbmRpbmcgYXN5bmNocm9ub3VzIHRhc2tzIG9mIGFueSBraW5kIHRoYXQgYXJlXG4gICAqIHNjaGVkdWxlZCB0byBydW4gd2l0aGluIEFuZ3VsYXIgem9uZS5cbiAgICpcbiAgICogVXNlZnVsIGFzIGEgc2lnbmFsIG9mIFVJIHN0YWJpbGl0eS4gRm9yIGV4YW1wbGUsIHdoZW4gYSB0ZXN0IHJlYWNoZXMgYVxuICAgKiBwb2ludCB3aGVuIFtoYXNQZW5kaW5nQXN5bmNUYXNrc10gaXMgYGZhbHNlYCBpdCBtaWdodCBiZSBhIGdvb2QgdGltZSB0byBydW5cbiAgICogdGVzdCBleHBlY3RhdGlvbnMuXG4gICAqL1xuICBnZXQgaGFzUGVuZGluZ0FzeW5jVGFza3MoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmhhc1BlbmRpbmdNaWNyb3Rhc2tzIHx8IHRoaXMuaGFzUGVuZGluZ1RpbWVyczsgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB6b25lIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbiBlcnJvciBpcyB0aHJvd24gaW4gdGhlIEFuZ3VsYXIgem9uZS5cbiAgICpcbiAgICogU2V0dGluZyB0aGUgaG9vayBvdmVycmlkZXMgYW55IHByZXZpb3VzbHkgc2V0IGhvb2suXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIHRoaXMgQVBJIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlLiBVc2UgYG9uRXJyb3JgIGluc3RlYWQuXG4gICAqL1xuICBvdmVycmlkZU9uRXJyb3JIYW5kbGVyKGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGluZ0ZuKSB7XG4gICAgdGhpcy5fb25FcnJvckhhbmRsZXIgPSBub3JtYWxpemVCbGFuayhlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgZ2V0IG9uRXJyb3IoKSB7IHJldHVybiB0aGlzLl9vbkVycm9yRXZlbnRzOyB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIHRoZSBgZm5gIGZ1bmN0aW9uIHN5bmNocm9ub3VzbHkgd2l0aGluIHRoZSBBbmd1bGFyIHpvbmUgYW5kIHJldHVybnMgdmFsdWUgcmV0dXJuZWQgYnlcbiAgICogdGhlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBSdW5uaW5nIGZ1bmN0aW9ucyB2aWEgYHJ1bmAgYWxsb3dzIHlvdSB0byByZWVudGVyIEFuZ3VsYXIgem9uZSBmcm9tIGEgdGFzayB0aGF0IHdhcyBleGVjdXRlZFxuICAgKiBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyIHpvbmUgKHR5cGljYWxseSBzdGFydGVkIHZpYSB7QGxpbmsgI3J1bk91dHNpZGVBbmd1bGFyfSkuXG4gICAqXG4gICAqIEFueSBmdXR1cmUgdGFza3Mgb3IgbWljcm90YXNrcyBzY2hlZHVsZWQgZnJvbSB3aXRoaW4gdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnRpbnVlIGV4ZWN1dGluZyBmcm9tXG4gICAqIHdpdGhpbiB0aGUgQW5ndWxhciB6b25lLlxuICAgKi9cbiAgcnVuKGZuOiAoKSA9PiBhbnkpOiBhbnkge1xuICAgIGlmICh0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzID0gdGhpcy5fcnVuU2NvcGUoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbm5lclpvbmUucnVuKGZuKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHd0ZkxlYXZlKHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyB0aGUgYGZuYCBmdW5jdGlvbiBzeW5jaHJvbm91c2x5IGluIEFuZ3VsYXIncyBwYXJlbnQgem9uZSBhbmQgcmV0dXJucyB2YWx1ZSByZXR1cm5lZCBieVxuICAgKiB0aGUgZnVuY3Rpb24uXG4gICAqXG4gICAqIFJ1bm5pbmcgZnVuY3Rpb25zIHZpYSBgcnVuT3V0c2lkZUFuZ3VsYXJgIGFsbG93cyB5b3UgdG8gZXNjYXBlIEFuZ3VsYXIncyB6b25lIGFuZCBkbyB3b3JrIHRoYXRcbiAgICogZG9lc24ndCB0cmlnZ2VyIEFuZ3VsYXIgY2hhbmdlLWRldGVjdGlvbiBvciBpcyBzdWJqZWN0IHRvIEFuZ3VsYXIncyBlcnJvciBoYW5kbGluZy5cbiAgICpcbiAgICogQW55IGZ1dHVyZSB0YXNrcyBvciBtaWNyb3Rhc2tzIHNjaGVkdWxlZCBmcm9tIHdpdGhpbiB0aGlzIGZ1bmN0aW9uIHdpbGwgY29udGludWUgZXhlY3V0aW5nIGZyb21cbiAgICogb3V0c2lkZSBvZiB0aGUgQW5ndWxhciB6b25lLlxuICAgKlxuICAgKiBVc2Uge0BsaW5rICNydW59IHRvIHJlZW50ZXIgdGhlIEFuZ3VsYXIgem9uZSBhbmQgZG8gd29yayB0aGF0IHVwZGF0ZXMgdGhlIGFwcGxpY2F0aW9uIG1vZGVsLlxuICAgKi9cbiAgcnVuT3V0c2lkZUFuZ3VsYXIoZm46ICgpID0+IGFueSk6IGFueSB7XG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICByZXR1cm4gZm4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX21vdW50Wm9uZS5ydW4oZm4pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NyZWF0ZUlubmVyWm9uZSh6b25lLCBlbmFibGVMb25nU3RhY2tUcmFjZSkge1xuICAgIHZhciBtaWNyb3Rhc2tTY29wZSA9IHRoaXMuX21pY3JvdGFza1Njb3BlO1xuICAgIHZhciBuZ1pvbmUgPSB0aGlzO1xuICAgIHZhciBlcnJvckhhbmRsaW5nO1xuXG4gICAgaWYgKGVuYWJsZUxvbmdTdGFja1RyYWNlKSB7XG4gICAgICBlcnJvckhhbmRsaW5nID1cbiAgICAgICAgICBTdHJpbmdNYXBXcmFwcGVyLm1lcmdlKGdsb2JhbC5ab25lLmxvbmdTdGFja1RyYWNlWm9uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtvbkVycm9yOiBmdW5jdGlvbihlKSB7IG5nWm9uZS5fbm90aWZ5T25FcnJvcih0aGlzLCBlKTsgfX0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvckhhbmRsaW5nID0ge29uRXJyb3I6IGZ1bmN0aW9uKGUpIHsgbmdab25lLl9ub3RpZnlPbkVycm9yKHRoaXMsIGUpOyB9fTtcbiAgICB9XG5cbiAgICByZXR1cm4gem9uZS5mb3JrKGVycm9ySGFuZGxpbmcpXG4gICAgICAgIC5mb3JrKHtcbiAgICAgICAgICAnJHJ1bic6IGZ1bmN0aW9uKHBhcmVudFJ1bikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG5nWm9uZS5fbmVzdGVkUnVuKys7XG4gICAgICAgICAgICAgICAgaWYgKCFuZ1pvbmUuX2hhc0V4ZWN1dGVkQ29kZUluSW5uZXJab25lKSB7XG4gICAgICAgICAgICAgICAgICBuZ1pvbmUuX2hhc0V4ZWN1dGVkQ29kZUluSW5uZXJab25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIG5nWm9uZS5fbm90aWZ5T25UdXJuU3RhcnQocGFyZW50UnVuKTtcbiAgICAgICAgICAgICAgICAgIGlmIChuZ1pvbmUuX29uVHVyblN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudFJ1bi5jYWxsKG5nWm9uZS5faW5uZXJab25lLCBuZ1pvbmUuX29uVHVyblN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudFJ1bi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIG5nWm9uZS5fbmVzdGVkUnVuLS07XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIG1vcmUgcGVuZGluZyBtaWNyb3Rhc2tzLCB3ZSBhcmUgYXQgdGhlIGVuZCBvZiBhIFZNIHR1cm4gKG9yIGluXG4gICAgICAgICAgICAgICAgLy8gb25UdXJuU3RhcnQpXG4gICAgICAgICAgICAgICAgLy8gX25lc3RlZFJ1biB3aWxsIGJlIDAgYXQgdGhlIGVuZCBvZiBhIG1hY3JvdGFza3MgKGl0IGNvdWxkIGJlID4gMCB3aGVuIHRoZXJlIGFyZVxuICAgICAgICAgICAgICAgIC8vIG5lc3RlZCBjYWxsc1xuICAgICAgICAgICAgICAgIC8vIHRvIHJ1bigpKS5cbiAgICAgICAgICAgICAgICBpZiAobmdab25lLl9wZW5kaW5nTWljcm90YXNrcyA9PSAwICYmIG5nWm9uZS5fbmVzdGVkUnVuID09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgIXRoaXMuX2luVm1UdXJuRG9uZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKG5nWm9uZS5faGFzRXhlY3V0ZWRDb2RlSW5Jbm5lclpvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pblZtVHVybkRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgIG5nWm9uZS5fbm90aWZ5T25UdXJuRG9uZShwYXJlbnRSdW4pO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChuZ1pvbmUuX29uVHVybkRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFJ1bi5jYWxsKG5nWm9uZS5faW5uZXJab25lLCBuZ1pvbmUuX29uVHVybkRvbmUpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pblZtVHVybkRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICBuZ1pvbmUuX2hhc0V4ZWN1dGVkQ29kZUluSW5uZXJab25lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKG5nWm9uZS5fcGVuZGluZ01pY3JvdGFza3MgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbmdab25lLl9ub3RpZnlPbkV2ZW50RG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcmVzZW50KG5nWm9uZS5fb25FdmVudERvbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKG5nWm9uZS5fb25FdmVudERvbmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJyRzY2hlZHVsZU1pY3JvdGFzayc6IGZ1bmN0aW9uKHBhcmVudFNjaGVkdWxlTWljcm90YXNrKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgbmdab25lLl9wZW5kaW5nTWljcm90YXNrcysrO1xuICAgICAgICAgICAgICB2YXIgbWljcm90YXNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBtaWNyb3Rhc2tTY29wZSgpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICBuZ1pvbmUuX3BlbmRpbmdNaWNyb3Rhc2tzLS07XG4gICAgICAgICAgICAgICAgICB3dGZMZWF2ZShzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHBhcmVudFNjaGVkdWxlTWljcm90YXNrLmNhbGwodGhpcywgbWljcm90YXNrKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnJHNldFRpbWVvdXQnOiBmdW5jdGlvbihwYXJlbnRTZXRUaW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oZm46IEZ1bmN0aW9uLCBkZWxheTogbnVtYmVyLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICAgIHZhciBpZDtcbiAgICAgICAgICAgICAgdmFyIGNiID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICBMaXN0V3JhcHBlci5yZW1vdmUobmdab25lLl9wZW5kaW5nVGltZW91dHMsIGlkKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgaWQgPSBwYXJlbnRTZXRUaW1lb3V0LmNhbGwodGhpcywgY2IsIGRlbGF5LCBhcmdzKTtcbiAgICAgICAgICAgICAgbmdab25lLl9wZW5kaW5nVGltZW91dHMucHVzaChpZCk7XG4gICAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnJGNsZWFyVGltZW91dCc6IGZ1bmN0aW9uKHBhcmVudENsZWFyVGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGlkOiBudW1iZXIpIHtcbiAgICAgICAgICAgICAgcGFyZW50Q2xlYXJUaW1lb3V0LmNhbGwodGhpcywgaWQpO1xuICAgICAgICAgICAgICBMaXN0V3JhcHBlci5yZW1vdmUobmdab25lLl9wZW5kaW5nVGltZW91dHMsIGlkKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBfaW5uZXJab25lOiB0cnVlXG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbm90aWZ5T25FcnJvcih6b25lLCBlKTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9vbkVycm9ySGFuZGxlcikgfHwgT2JzZXJ2YWJsZVdyYXBwZXIuaGFzU3Vic2NyaWJlcnModGhpcy5fb25FcnJvckV2ZW50cykpIHtcbiAgICAgIHZhciB0cmFjZSA9IFtub3JtYWxpemVCbGFuayhlLnN0YWNrKV07XG5cbiAgICAgIHdoaWxlICh6b25lICYmIHpvbmUuY29uc3RydWN0ZWRBdEV4Y2VwdGlvbikge1xuICAgICAgICB0cmFjZS5wdXNoKHpvbmUuY29uc3RydWN0ZWRBdEV4Y2VwdGlvbi5nZXQoKSk7XG4gICAgICAgIHpvbmUgPSB6b25lLnBhcmVudDtcbiAgICAgIH1cbiAgICAgIGlmIChPYnNlcnZhYmxlV3JhcHBlci5oYXNTdWJzY3JpYmVycyh0aGlzLl9vbkVycm9yRXZlbnRzKSkge1xuICAgICAgICBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRW1pdCh0aGlzLl9vbkVycm9yRXZlbnRzLCBuZXcgTmdab25lRXJyb3IoZSwgdHJhY2UpKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fb25FcnJvckhhbmRsZXIpKSB7XG4gICAgICAgIHRoaXMuX29uRXJyb3JIYW5kbGVyKGUsIHRyYWNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJyMjIF9ub3RpZnlPbkVycm9yICMjJyk7XG4gICAgICBjb25zb2xlLmxvZyhlLnN0YWNrKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG59XG4iXX0=