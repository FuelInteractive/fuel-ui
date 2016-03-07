'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var lang_1 = require('angular2/src/facade/lang');
var di_1 = require('angular2/src/core/di');
var application_tokens_1 = require('./application_tokens');
var async_1 = require('angular2/src/facade/async');
var collection_1 = require('angular2/src/facade/collection');
var testability_1 = require('angular2/src/core/testability/testability');
var dynamic_component_loader_1 = require('angular2/src/core/linker/dynamic_component_loader');
var exceptions_1 = require('angular2/src/facade/exceptions');
var console_1 = require('angular2/src/core/console');
var profile_1 = require('./profile/profile');
var lang_2 = require('angular2/src/facade/lang');
/**
 * Construct providers specific to an individual root component.
 */
function _componentProviders(appComponentType) {
    return [
        di_1.provide(application_tokens_1.APP_COMPONENT, { useValue: appComponentType }),
        di_1.provide(application_tokens_1.APP_COMPONENT_REF_PROMISE, {
            useFactory: function (dynamicComponentLoader, appRef, injector) {
                // Save the ComponentRef for disposal later.
                var ref;
                // TODO(rado): investigate whether to support providers on root component.
                return dynamicComponentLoader.loadAsRoot(appComponentType, null, injector, function () { appRef._unloadComponent(ref); })
                    .then(function (componentRef) {
                    ref = componentRef;
                    var testability = injector.getOptional(testability_1.Testability);
                    if (lang_1.isPresent(testability)) {
                        injector.get(testability_1.TestabilityRegistry)
                            .registerApplication(componentRef.location.nativeElement, testability);
                    }
                    return componentRef;
                });
            },
            deps: [dynamic_component_loader_1.DynamicComponentLoader, ApplicationRef, di_1.Injector]
        }),
        di_1.provide(appComponentType, {
            useFactory: function (p) { return p.then(function (ref) { return ref.instance; }); },
            deps: [application_tokens_1.APP_COMPONENT_REF_PROMISE]
        }),
    ];
}
/**
 * Create an Angular zone.
 */
function createNgZone() {
    return new ng_zone_1.NgZone({ enableLongStackTrace: lang_1.assertionsEnabled() });
}
exports.createNgZone = createNgZone;
var _platform;
var _platformProviders;
/**
 * Initialize the Angular 'platform' on the page.
 *
 * See {@link PlatformRef} for details on the Angular platform.
 *
 * It is also possible to specify providers to be made in the new platform. These providers
 * will be shared between all applications on the page. For example, an abstraction for
 * the browser cookie jar should be bound at the platform level, because there is only one
 * cookie jar regardless of how many applications on the page will be accessing it.
 *
 * The platform function can be called multiple times as long as the same list of providers
 * is passed into each call. If the platform function is called with a different set of
 * provides, Angular will throw an exception.
 */
function platform(providers) {
    lang_2.lockMode();
    if (lang_1.isPresent(_platform)) {
        if (collection_1.ListWrapper.equals(_platformProviders, providers)) {
            return _platform;
        }
        else {
            throw new exceptions_1.BaseException("platform cannot be initialized with different sets of providers.");
        }
    }
    else {
        return _createPlatform(providers);
    }
}
exports.platform = platform;
/**
 * Dispose the existing platform.
 */
function disposePlatform() {
    if (lang_1.isPresent(_platform)) {
        _platform.dispose();
        _platform = null;
    }
}
exports.disposePlatform = disposePlatform;
function _createPlatform(providers) {
    _platformProviders = providers;
    var injector = di_1.Injector.resolveAndCreate(providers);
    _platform = new PlatformRef_(injector, function () {
        _platform = null;
        _platformProviders = null;
    });
    _runPlatformInitializers(injector);
    return _platform;
}
function _runPlatformInitializers(injector) {
    var inits = injector.getOptional(application_tokens_1.PLATFORM_INITIALIZER);
    if (lang_1.isPresent(inits))
        inits.forEach(function (init) { return init(); });
}
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
 * explicitly by calling {@link platform}().
 */
var PlatformRef = (function () {
    function PlatformRef() {
    }
    Object.defineProperty(PlatformRef.prototype, "injector", {
        /**
         * Retrieve the platform {@link Injector}, which is the parent injector for
         * every Angular application on the page and provides singleton providers.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    return PlatformRef;
})();
exports.PlatformRef = PlatformRef;
var PlatformRef_ = (function (_super) {
    __extends(PlatformRef_, _super);
    function PlatformRef_(_injector, _dispose) {
        _super.call(this);
        this._injector = _injector;
        this._dispose = _dispose;
        /** @internal */
        this._applications = [];
        /** @internal */
        this._disposeListeners = [];
    }
    PlatformRef_.prototype.registerDisposeListener = function (dispose) { this._disposeListeners.push(dispose); };
    Object.defineProperty(PlatformRef_.prototype, "injector", {
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    PlatformRef_.prototype.application = function (providers) {
        var app = this._initApp(createNgZone(), providers);
        if (async_1.PromiseWrapper.isPromise(app)) {
            throw new exceptions_1.BaseException("Cannot use asyncronous app initializers with application. Use asyncApplication instead.");
        }
        return app;
    };
    PlatformRef_.prototype.asyncApplication = function (bindingFn, additionalProviders) {
        var _this = this;
        var zone = createNgZone();
        var completer = async_1.PromiseWrapper.completer();
        if (bindingFn === null) {
            completer.resolve(this._initApp(zone, additionalProviders));
        }
        else {
            zone.run(function () {
                async_1.PromiseWrapper.then(bindingFn(zone), function (providers) {
                    if (lang_1.isPresent(additionalProviders)) {
                        providers = collection_1.ListWrapper.concat(providers, additionalProviders);
                    }
                    var promise = _this._initApp(zone, providers);
                    completer.resolve(promise);
                });
            });
        }
        return completer.promise;
    };
    PlatformRef_.prototype._initApp = function (zone, providers) {
        var _this = this;
        var injector;
        var app;
        zone.run(function () {
            providers = collection_1.ListWrapper.concat(providers, [
                di_1.provide(ng_zone_1.NgZone, { useValue: zone }),
                di_1.provide(ApplicationRef, { useFactory: function () { return app; }, deps: [] })
            ]);
            var exceptionHandler;
            try {
                injector = _this.injector.resolveAndCreateChild(providers);
                exceptionHandler = injector.get(exceptions_1.ExceptionHandler);
                zone.overrideOnErrorHandler(function (e, s) { return exceptionHandler.call(e, s); });
            }
            catch (e) {
                if (lang_1.isPresent(exceptionHandler)) {
                    exceptionHandler.call(e, e.stack);
                }
                else {
                    lang_1.print(e.toString());
                }
            }
        });
        app = new ApplicationRef_(this, zone, injector);
        this._applications.push(app);
        var promise = _runAppInitializers(injector);
        if (promise !== null) {
            return async_1.PromiseWrapper.then(promise, function (_) { return app; });
        }
        else {
            return app;
        }
    };
    PlatformRef_.prototype.dispose = function () {
        collection_1.ListWrapper.clone(this._applications).forEach(function (app) { return app.dispose(); });
        this._disposeListeners.forEach(function (dispose) { return dispose(); });
        this._dispose();
    };
    /** @internal */
    PlatformRef_.prototype._applicationDisposed = function (app) { collection_1.ListWrapper.remove(this._applications, app); };
    return PlatformRef_;
})(PlatformRef);
exports.PlatformRef_ = PlatformRef_;
function _runAppInitializers(injector) {
    var inits = injector.getOptional(application_tokens_1.APP_INITIALIZER);
    var promises = [];
    if (lang_1.isPresent(inits)) {
        inits.forEach(function (init) {
            var retVal = init();
            if (async_1.PromiseWrapper.isPromise(retVal)) {
                promises.push(retVal);
            }
        });
    }
    if (promises.length > 0) {
        return async_1.PromiseWrapper.all(promises);
    }
    else {
        return null;
    }
}
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {@link bootstrap}.
 */
var ApplicationRef = (function () {
    function ApplicationRef() {
    }
    Object.defineProperty(ApplicationRef.prototype, "injector", {
        /**
         * Retrieve the application {@link Injector}.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ApplicationRef.prototype, "zone", {
        /**
         * Retrieve the application {@link NgZone}.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ApplicationRef.prototype, "componentTypes", {
        /**
         * Get a list of component types registered to this application.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    return ApplicationRef;
})();
exports.ApplicationRef = ApplicationRef;
var ApplicationRef_ = (function (_super) {
    __extends(ApplicationRef_, _super);
    function ApplicationRef_(_platform, _zone, _injector) {
        var _this = this;
        _super.call(this);
        this._platform = _platform;
        this._zone = _zone;
        this._injector = _injector;
        /** @internal */
        this._bootstrapListeners = [];
        /** @internal */
        this._disposeListeners = [];
        /** @internal */
        this._rootComponents = [];
        /** @internal */
        this._rootComponentTypes = [];
        /** @internal */
        this._changeDetectorRefs = [];
        /** @internal */
        this._runningTick = false;
        /** @internal */
        this._enforceNoNewChanges = false;
        if (lang_1.isPresent(this._zone)) {
            async_1.ObservableWrapper.subscribe(this._zone.onTurnDone, function (_) { _this._zone.run(function () { _this.tick(); }); });
        }
        this._enforceNoNewChanges = lang_1.assertionsEnabled();
    }
    ApplicationRef_.prototype.registerBootstrapListener = function (listener) {
        this._bootstrapListeners.push(listener);
    };
    ApplicationRef_.prototype.registerDisposeListener = function (dispose) { this._disposeListeners.push(dispose); };
    ApplicationRef_.prototype.registerChangeDetector = function (changeDetector) {
        this._changeDetectorRefs.push(changeDetector);
    };
    ApplicationRef_.prototype.unregisterChangeDetector = function (changeDetector) {
        collection_1.ListWrapper.remove(this._changeDetectorRefs, changeDetector);
    };
    ApplicationRef_.prototype.bootstrap = function (componentType, providers) {
        var _this = this;
        var completer = async_1.PromiseWrapper.completer();
        this._zone.run(function () {
            var componentProviders = _componentProviders(componentType);
            if (lang_1.isPresent(providers)) {
                componentProviders.push(providers);
            }
            var exceptionHandler = _this._injector.get(exceptions_1.ExceptionHandler);
            _this._rootComponentTypes.push(componentType);
            try {
                var injector = _this._injector.resolveAndCreateChild(componentProviders);
                var compRefToken = injector.get(application_tokens_1.APP_COMPONENT_REF_PROMISE);
                var tick = function (componentRef) {
                    _this._loadComponent(componentRef);
                    completer.resolve(componentRef);
                };
                var tickResult = async_1.PromiseWrapper.then(compRefToken, tick);
                // THIS MUST ONLY RUN IN DART.
                // This is required to report an error when no components with a matching selector found.
                // Otherwise the promise will never be completed.
                // Doing this in JS causes an extra error message to appear.
                if (lang_1.IS_DART) {
                    async_1.PromiseWrapper.then(tickResult, function (_) { });
                }
                async_1.PromiseWrapper.then(tickResult, null, function (err, stackTrace) { return completer.reject(err, stackTrace); });
            }
            catch (e) {
                exceptionHandler.call(e, e.stack);
                completer.reject(e, e.stack);
            }
        });
        return completer.promise.then(function (_) {
            var c = _this._injector.get(console_1.Console);
            if (lang_1.assertionsEnabled()) {
                c.log("Angular 2 is running in the development mode. Call enableProdMode() to enable the production mode.");
            }
            return _;
        });
    };
    /** @internal */
    ApplicationRef_.prototype._loadComponent = function (componentRef) {
        var appChangeDetector = componentRef.location.internalElement.parentView.changeDetector;
        this._changeDetectorRefs.push(appChangeDetector.ref);
        this.tick();
        this._rootComponents.push(componentRef);
        this._bootstrapListeners.forEach(function (listener) { return listener(componentRef); });
    };
    /** @internal */
    ApplicationRef_.prototype._unloadComponent = function (componentRef) {
        if (!collection_1.ListWrapper.contains(this._rootComponents, componentRef)) {
            return;
        }
        this.unregisterChangeDetector(componentRef.location.internalElement.parentView.changeDetector.ref);
        collection_1.ListWrapper.remove(this._rootComponents, componentRef);
    };
    Object.defineProperty(ApplicationRef_.prototype, "injector", {
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef_.prototype, "zone", {
        get: function () { return this._zone; },
        enumerable: true,
        configurable: true
    });
    ApplicationRef_.prototype.tick = function () {
        if (this._runningTick) {
            throw new exceptions_1.BaseException("ApplicationRef.tick is called recursively");
        }
        var s = ApplicationRef_._tickScope();
        try {
            this._runningTick = true;
            this._changeDetectorRefs.forEach(function (detector) { return detector.detectChanges(); });
            if (this._enforceNoNewChanges) {
                this._changeDetectorRefs.forEach(function (detector) { return detector.checkNoChanges(); });
            }
        }
        finally {
            this._runningTick = false;
            profile_1.wtfLeave(s);
        }
    };
    ApplicationRef_.prototype.dispose = function () {
        // TODO(alxhub): Dispose of the NgZone.
        collection_1.ListWrapper.clone(this._rootComponents).forEach(function (ref) { return ref.dispose(); });
        this._disposeListeners.forEach(function (dispose) { return dispose(); });
        this._platform._applicationDisposed(this);
    };
    Object.defineProperty(ApplicationRef_.prototype, "componentTypes", {
        get: function () { return this._rootComponentTypes; },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    ApplicationRef_._tickScope = profile_1.wtfCreateScope('ApplicationRef#tick()');
    return ApplicationRef_;
})(ApplicationRef);
exports.ApplicationRef_ = ApplicationRef_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvcmUvYXBwbGljYXRpb25fcmVmLnRzIl0sIm5hbWVzIjpbIl9jb21wb25lbnRQcm92aWRlcnMiLCJjcmVhdGVOZ1pvbmUiLCJwbGF0Zm9ybSIsImRpc3Bvc2VQbGF0Zm9ybSIsIl9jcmVhdGVQbGF0Zm9ybSIsIl9ydW5QbGF0Zm9ybUluaXRpYWxpemVycyIsIlBsYXRmb3JtUmVmIiwiUGxhdGZvcm1SZWYuY29uc3RydWN0b3IiLCJQbGF0Zm9ybVJlZi5pbmplY3RvciIsIlBsYXRmb3JtUmVmXyIsIlBsYXRmb3JtUmVmXy5jb25zdHJ1Y3RvciIsIlBsYXRmb3JtUmVmXy5yZWdpc3RlckRpc3Bvc2VMaXN0ZW5lciIsIlBsYXRmb3JtUmVmXy5pbmplY3RvciIsIlBsYXRmb3JtUmVmXy5hcHBsaWNhdGlvbiIsIlBsYXRmb3JtUmVmXy5hc3luY0FwcGxpY2F0aW9uIiwiUGxhdGZvcm1SZWZfLl9pbml0QXBwIiwiUGxhdGZvcm1SZWZfLmRpc3Bvc2UiLCJQbGF0Zm9ybVJlZl8uX2FwcGxpY2F0aW9uRGlzcG9zZWQiLCJfcnVuQXBwSW5pdGlhbGl6ZXJzIiwiQXBwbGljYXRpb25SZWYiLCJBcHBsaWNhdGlvblJlZi5jb25zdHJ1Y3RvciIsIkFwcGxpY2F0aW9uUmVmLmluamVjdG9yIiwiQXBwbGljYXRpb25SZWYuem9uZSIsIkFwcGxpY2F0aW9uUmVmLmNvbXBvbmVudFR5cGVzIiwiQXBwbGljYXRpb25SZWZfIiwiQXBwbGljYXRpb25SZWZfLmNvbnN0cnVjdG9yIiwiQXBwbGljYXRpb25SZWZfLnJlZ2lzdGVyQm9vdHN0cmFwTGlzdGVuZXIiLCJBcHBsaWNhdGlvblJlZl8ucmVnaXN0ZXJEaXNwb3NlTGlzdGVuZXIiLCJBcHBsaWNhdGlvblJlZl8ucmVnaXN0ZXJDaGFuZ2VEZXRlY3RvciIsIkFwcGxpY2F0aW9uUmVmXy51bnJlZ2lzdGVyQ2hhbmdlRGV0ZWN0b3IiLCJBcHBsaWNhdGlvblJlZl8uYm9vdHN0cmFwIiwiQXBwbGljYXRpb25SZWZfLl9sb2FkQ29tcG9uZW50IiwiQXBwbGljYXRpb25SZWZfLl91bmxvYWRDb21wb25lbnQiLCJBcHBsaWNhdGlvblJlZl8uaW5qZWN0b3IiLCJBcHBsaWNhdGlvblJlZl8uem9uZSIsIkFwcGxpY2F0aW9uUmVmXy50aWNrIiwiQXBwbGljYXRpb25SZWZfLmRpc3Bvc2UiLCJBcHBsaWNhdGlvblJlZl8uY29tcG9uZW50VHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0JBQXFCLGdDQUFnQyxDQUFDLENBQUE7QUFDdEQscUJBT08sMEJBQTBCLENBQUMsQ0FBQTtBQUNsQyxtQkFBdUQsc0JBQXNCLENBQUMsQ0FBQTtBQUM5RSxtQ0FNTyxzQkFBc0IsQ0FBQyxDQUFBO0FBQzlCLHNCQUFrRSwyQkFBMkIsQ0FBQyxDQUFBO0FBQzlGLDJCQUEwQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzNELDRCQUErQywyQ0FBMkMsQ0FBQyxDQUFBO0FBQzNGLHlDQUdPLG1EQUFtRCxDQUFDLENBQUE7QUFDM0QsMkJBS08sZ0NBQWdDLENBQUMsQ0FBQTtBQUN4Qyx3QkFBc0IsMkJBQTJCLENBQUMsQ0FBQTtBQUNsRCx3QkFBbUQsbUJBQW1CLENBQUMsQ0FBQTtBQUV2RSxxQkFBdUIsMEJBQTBCLENBQUMsQ0FBQTtBQUdsRDs7R0FFRztBQUNILDZCQUE2QixnQkFBc0I7SUFDakRBLE1BQU1BLENBQUNBO1FBQ0xBLFlBQU9BLENBQUNBLGtDQUFhQSxFQUFFQSxFQUFDQSxRQUFRQSxFQUFFQSxnQkFBZ0JBLEVBQUNBLENBQUNBO1FBQ3BEQSxZQUFPQSxDQUFDQSw4Q0FBeUJBLEVBQ3pCQTtZQUNFQSxVQUFVQSxFQUFFQSxVQUFDQSxzQkFBOENBLEVBQUVBLE1BQXVCQSxFQUN2RUEsUUFBa0JBO2dCQUM3QkEsNENBQTRDQTtnQkFDNUNBLElBQUlBLEdBQWlCQSxDQUFDQTtnQkFDdEJBLDBFQUEwRUE7Z0JBQzFFQSxNQUFNQSxDQUFDQSxzQkFB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QkEsY0FBK0JhLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7OztPQUFBYjtJQXZJakVBLGdCQUFnQkE7SUFDVEEsMEJBQVVBLEdBQWVBLHdCQUFjQSxDQUFDQSx1QkFBdUJBLENBQUNBLENBQUNBO0lBdUkxRUEsc0JBQUNBO0FBQURBLENBQUNBLEFBeklELEVBQXFDLGNBQWMsRUF5SWxEO0FBeklZLHVCQUFlLGtCQXlJM0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Tmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS96b25lL25nX3pvbmUnO1xuaW1wb3J0IHtcbiAgVHlwZSxcbiAgaXNCbGFuayxcbiAgaXNQcmVzZW50LFxuICBhc3NlcnRpb25zRW5hYmxlZCxcbiAgcHJpbnQsXG4gIElTX0RBUlRcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7cHJvdmlkZSwgUHJvdmlkZXIsIEluamVjdG9yLCBPcGFxdWVUb2tlbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtcbiAgQVBQX0NPTVBPTkVOVF9SRUZfUFJPTUlTRSxcbiAgQVBQX0NPTVBPTkVOVCxcbiAgQVBQX0lEX1JBTkRPTV9QUk9WSURFUixcbiAgUExBVEZPUk1fSU5JVElBTElaRVIsXG4gIEFQUF9JTklUSUFMSVpFUlxufSBmcm9tICcuL2FwcGxpY2F0aW9uX3Rva2Vucyc7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyLCBQcm9taXNlQ29tcGxldGVyLCBPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBUZXN0YWJpbGl0eX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvdGVzdGFiaWxpdHkvdGVzdGFiaWxpdHknO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBEeW5hbWljQ29tcG9uZW50TG9hZGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9keW5hbWljX2NvbXBvbmVudF9sb2FkZXInO1xuaW1wb3J0IHtcbiAgQmFzZUV4Y2VwdGlvbixcbiAgV3JhcHBlZEV4Y2VwdGlvbixcbiAgRXhjZXB0aW9uSGFuZGxlcixcbiAgdW5pbXBsZW1lbnRlZFxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtDb25zb2xlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jb25zb2xlJztcbmltcG9ydCB7d3RmTGVhdmUsIHd0ZkNyZWF0ZVNjb3BlLCBXdGZTY29wZUZufSBmcm9tICcuL3Byb2ZpbGUvcHJvZmlsZSc7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rvcl9yZWYnO1xuaW1wb3J0IHtsb2NrTW9kZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7RWxlbWVudFJlZl99IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50X3JlZic7XG5cbi8qKlxuICogQ29uc3RydWN0IHByb3ZpZGVycyBzcGVjaWZpYyB0byBhbiBpbmRpdmlkdWFsIHJvb3QgY29tcG9uZW50LlxuICovXG5mdW5jdGlvbiBfY29tcG9uZW50UHJvdmlkZXJzKGFwcENvbXBvbmVudFR5cGU6IFR5cGUpOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4ge1xuICByZXR1cm4gW1xuICAgIHByb3ZpZGUoQVBQX0NPTVBPTkVOVCwge3VzZVZhbHVlOiBhcHBDb21wb25lbnRUeXBlfSksXG4gICAgcHJvdmlkZShBUFBfQ09NUE9ORU5UX1JFRl9QUk9NSVNFLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB1c2VGYWN0b3J5OiAoZHluYW1pY0NvbXBvbmVudExvYWRlcjogRHluYW1pY0NvbXBvbmVudExvYWRlciwgYXBwUmVmOiBBcHBsaWNhdGlvblJlZl8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpbmplY3RvcjogSW5qZWN0b3IpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTYXZlIHRoZSBDb21wb25lbnRSZWYgZm9yIGRpc3Bvc2FsIGxhdGVyLlxuICAgICAgICAgICAgICAgIHZhciByZWY6IENvbXBvbmVudFJlZjtcbiAgICAgICAgICAgICAgICAvLyBUT0RPKHJhZG8pOiBpbnZlc3RpZ2F0ZSB3aGV0aGVyIHRvIHN1cHBvcnQgcHJvdmlkZXJzIG9uIHJvb3QgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgIHJldHVybiBkeW5hbWljQ29tcG9uZW50TG9hZGVyLmxvYWRBc1Jvb3QoYXBwQ29tcG9uZW50VHlwZSwgbnVsbCwgaW5qZWN0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGFwcFJlZi5fdW5sb2FkQ29tcG9uZW50KHJlZik7IH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChjb21wb25lbnRSZWYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZWYgPSBjb21wb25lbnRSZWY7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHRlc3RhYmlsaXR5ID0gaW5qZWN0b3IuZ2V0T3B0aW9uYWwoVGVzdGFiaWxpdHkpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQodGVzdGFiaWxpdHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmplY3Rvci5nZXQoVGVzdGFiaWxpdHlSZWdpc3RyeSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVnaXN0ZXJBcHBsaWNhdGlvbihjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGVzdGFiaWxpdHkpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9uZW50UmVmO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZGVwczogW0R5bmFtaWNDb21wb25lbnRMb2FkZXIsIEFwcGxpY2F0aW9uUmVmLCBJbmplY3Rvcl1cbiAgICAgICAgICAgIH0pLFxuICAgIHByb3ZpZGUoYXBwQ29tcG9uZW50VHlwZSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdXNlRmFjdG9yeTogKHA6IFByb21pc2U8YW55PikgPT4gcC50aGVuKHJlZiA9PiByZWYuaW5zdGFuY2UpLFxuICAgICAgICAgICAgICBkZXBzOiBbQVBQX0NPTVBPTkVOVF9SRUZfUFJPTUlTRV1cbiAgICAgICAgICAgIH0pLFxuICBdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBBbmd1bGFyIHpvbmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOZ1pvbmUoKTogTmdab25lIHtcbiAgcmV0dXJuIG5ldyBOZ1pvbmUoe2VuYWJsZUxvbmdTdGFja1RyYWNlOiBhc3NlcnRpb25zRW5hYmxlZCgpfSk7XG59XG5cbnZhciBfcGxhdGZvcm06IFBsYXRmb3JtUmVmO1xudmFyIF9wbGF0Zm9ybVByb3ZpZGVyczogYW55W107XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgQW5ndWxhciAncGxhdGZvcm0nIG9uIHRoZSBwYWdlLlxuICpcbiAqIFNlZSB7QGxpbmsgUGxhdGZvcm1SZWZ9IGZvciBkZXRhaWxzIG9uIHRoZSBBbmd1bGFyIHBsYXRmb3JtLlxuICpcbiAqIEl0IGlzIGFsc28gcG9zc2libGUgdG8gc3BlY2lmeSBwcm92aWRlcnMgdG8gYmUgbWFkZSBpbiB0aGUgbmV3IHBsYXRmb3JtLiBUaGVzZSBwcm92aWRlcnNcbiAqIHdpbGwgYmUgc2hhcmVkIGJldHdlZW4gYWxsIGFwcGxpY2F0aW9ucyBvbiB0aGUgcGFnZS4gRm9yIGV4YW1wbGUsIGFuIGFic3RyYWN0aW9uIGZvclxuICogdGhlIGJyb3dzZXIgY29va2llIGphciBzaG91bGQgYmUgYm91bmQgYXQgdGhlIHBsYXRmb3JtIGxldmVsLCBiZWNhdXNlIHRoZXJlIGlzIG9ubHkgb25lXG4gKiBjb29raWUgamFyIHJlZ2FyZGxlc3Mgb2YgaG93IG1hbnkgYXBwbGljYXRpb25zIG9uIHRoZSBwYWdlIHdpbGwgYmUgYWNjZXNzaW5nIGl0LlxuICpcbiAqIFRoZSBwbGF0Zm9ybSBmdW5jdGlvbiBjYW4gYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGFzIGxvbmcgYXMgdGhlIHNhbWUgbGlzdCBvZiBwcm92aWRlcnNcbiAqIGlzIHBhc3NlZCBpbnRvIGVhY2ggY2FsbC4gSWYgdGhlIHBsYXRmb3JtIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIGEgZGlmZmVyZW50IHNldCBvZlxuICogcHJvdmlkZXMsIEFuZ3VsYXIgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwbGF0Zm9ybShwcm92aWRlcnM/OiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4pOiBQbGF0Zm9ybVJlZiB7XG4gIGxvY2tNb2RlKCk7XG4gIGlmIChpc1ByZXNlbnQoX3BsYXRmb3JtKSkge1xuICAgIGlmIChMaXN0V3JhcHBlci5lcXVhbHMoX3BsYXRmb3JtUHJvdmlkZXJzLCBwcm92aWRlcnMpKSB7XG4gICAgICByZXR1cm4gX3BsYXRmb3JtO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcInBsYXRmb3JtIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRpZmZlcmVudCBzZXRzIG9mIHByb3ZpZGVycy5cIik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBfY3JlYXRlUGxhdGZvcm0ocHJvdmlkZXJzKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3Bvc2UgdGhlIGV4aXN0aW5nIHBsYXRmb3JtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcG9zZVBsYXRmb3JtKCk6IHZvaWQge1xuICBpZiAoaXNQcmVzZW50KF9wbGF0Zm9ybSkpIHtcbiAgICBfcGxhdGZvcm0uZGlzcG9zZSgpO1xuICAgIF9wbGF0Zm9ybSA9IG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVBsYXRmb3JtKHByb3ZpZGVycz86IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IFBsYXRmb3JtUmVmIHtcbiAgX3BsYXRmb3JtUHJvdmlkZXJzID0gcHJvdmlkZXJzO1xuICBsZXQgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKHByb3ZpZGVycyk7XG4gIF9wbGF0Zm9ybSA9IG5ldyBQbGF0Zm9ybVJlZl8oaW5qZWN0b3IsICgpID0+IHtcbiAgICBfcGxhdGZvcm0gPSBudWxsO1xuICAgIF9wbGF0Zm9ybVByb3ZpZGVycyA9IG51bGw7XG4gIH0pO1xuICBfcnVuUGxhdGZvcm1Jbml0aWFsaXplcnMoaW5qZWN0b3IpO1xuICByZXR1cm4gX3BsYXRmb3JtO1xufVxuXG5mdW5jdGlvbiBfcnVuUGxhdGZvcm1Jbml0aWFsaXplcnMoaW5qZWN0b3I6IEluamVjdG9yKTogdm9pZCB7XG4gIGxldCBpbml0czogRnVuY3Rpb25bXSA9IGluamVjdG9yLmdldE9wdGlvbmFsKFBMQVRGT1JNX0lOSVRJQUxJWkVSKTtcbiAgaWYgKGlzUHJlc2VudChpbml0cykpIGluaXRzLmZvckVhY2goaW5pdCA9PiBpbml0KCkpO1xufVxuXG4vKipcbiAqIFRoZSBBbmd1bGFyIHBsYXRmb3JtIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgQW5ndWxhciBvbiBhIHdlYiBwYWdlLiBFYWNoIHBhZ2VcbiAqIGhhcyBleGFjdGx5IG9uZSBwbGF0Zm9ybSwgYW5kIHNlcnZpY2VzIChzdWNoIGFzIHJlZmxlY3Rpb24pIHdoaWNoIGFyZSBjb21tb25cbiAqIHRvIGV2ZXJ5IEFuZ3VsYXIgYXBwbGljYXRpb24gcnVubmluZyBvbiB0aGUgcGFnZSBhcmUgYm91bmQgaW4gaXRzIHNjb3BlLlxuICpcbiAqIEEgcGFnZSdzIHBsYXRmb3JtIGlzIGluaXRpYWxpemVkIGltcGxpY2l0bHkgd2hlbiB7QGxpbmsgYm9vdHN0cmFwfSgpIGlzIGNhbGxlZCwgb3JcbiAqIGV4cGxpY2l0bHkgYnkgY2FsbGluZyB7QGxpbmsgcGxhdGZvcm19KCkuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQbGF0Zm9ybVJlZiB7XG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGxpc3RlbmVyIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBwbGF0Zm9ybSBpcyBkaXNwb3NlZC5cbiAgICovXG4gIGFic3RyYWN0IHJlZ2lzdGVyRGlzcG9zZUxpc3RlbmVyKGRpc3Bvc2U6ICgpID0+IHZvaWQpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgcGxhdGZvcm0ge0BsaW5rIEluamVjdG9yfSwgd2hpY2ggaXMgdGhlIHBhcmVudCBpbmplY3RvciBmb3JcbiAgICogZXZlcnkgQW5ndWxhciBhcHBsaWNhdGlvbiBvbiB0aGUgcGFnZSBhbmQgcHJvdmlkZXMgc2luZ2xldG9uIHByb3ZpZGVycy5cbiAgICovXG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH07XG5cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlIGEgbmV3IEFuZ3VsYXIgYXBwbGljYXRpb24gb24gdGhlIHBhZ2UuXG4gICAqXG4gICAqICMjIyBXaGF0IGlzIGFuIGFwcGxpY2F0aW9uP1xuICAgKlxuICAgKiBFYWNoIEFuZ3VsYXIgYXBwbGljYXRpb24gaGFzIGl0cyBvd24gem9uZSwgY2hhbmdlIGRldGVjdGlvbiwgY29tcGlsZXIsXG4gICAqIHJlbmRlcmVyLCBhbmQgb3RoZXIgZnJhbWV3b3JrIGNvbXBvbmVudHMuIEFuIGFwcGxpY2F0aW9uIGhvc3RzIG9uZSBvciBtb3JlXG4gICAqIHJvb3QgY29tcG9uZW50cywgd2hpY2ggY2FuIGJlIGluaXRpYWxpemVkIHZpYSBgQXBwbGljYXRpb25SZWYuYm9vdHN0cmFwKClgLlxuICAgKlxuICAgKiAjIyMgQXBwbGljYXRpb24gUHJvdmlkZXJzXG4gICAqXG4gICAqIEFuZ3VsYXIgYXBwbGljYXRpb25zIHJlcXVpcmUgbnVtZXJvdXMgcHJvdmlkZXJzIHRvIGJlIHByb3Blcmx5IGluc3RhbnRpYXRlZC5cbiAgICogV2hlbiB1c2luZyBgYXBwbGljYXRpb24oKWAgdG8gY3JlYXRlIGEgbmV3IGFwcCBvbiB0aGUgcGFnZSwgdGhlc2UgcHJvdmlkZXJzXG4gICAqIG11c3QgYmUgcHJvdmlkZWQuIEZvcnR1bmF0ZWx5LCB0aGVyZSBhcmUgaGVscGVyIGZ1bmN0aW9ucyB0byBjb25maWd1cmVcbiAgICogdHlwaWNhbCBwcm92aWRlcnMsIGFzIHNob3duIGluIHRoZSBleGFtcGxlIGJlbG93LlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS90cy9wbGF0Zm9ybS9wbGF0Zm9ybS50cyByZWdpb249J2xvbmdmb3JtJ31cbiAgICogIyMjIFNlZSBBbHNvXG4gICAqXG4gICAqIFNlZSB0aGUge0BsaW5rIGJvb3RzdHJhcH0gZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKi9cbiAgYWJzdHJhY3QgYXBwbGljYXRpb24ocHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4pOiBBcHBsaWNhdGlvblJlZjtcblxuICAvKipcbiAgICogSW5zdGFudGlhdGUgYSBuZXcgQW5ndWxhciBhcHBsaWNhdGlvbiBvbiB0aGUgcGFnZSwgdXNpbmcgcHJvdmlkZXJzIHdoaWNoXG4gICAqIGFyZSBvbmx5IGF2YWlsYWJsZSBhc3luY2hyb25vdXNseS4gT25lIHN1Y2ggdXNlIGNhc2UgaXMgdG8gaW5pdGlhbGl6ZSBhblxuICAgKiBhcHBsaWNhdGlvbiBydW5uaW5nIGluIGEgd2ViIHdvcmtlci5cbiAgICpcbiAgICogIyMjIFVzYWdlXG4gICAqXG4gICAqIGBiaW5kaW5nRm5gIGlzIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCBpbiB0aGUgbmV3IGFwcGxpY2F0aW9uJ3Mgem9uZS5cbiAgICogSXQgc2hvdWxkIHJldHVybiBhIGBQcm9taXNlYCB0byBhIGxpc3Qgb2YgcHJvdmlkZXJzIHRvIGJlIHVzZWQgZm9yIHRoZVxuICAgKiBuZXcgYXBwbGljYXRpb24uIE9uY2UgdGhpcyBwcm9taXNlIHJlc29sdmVzLCB0aGUgYXBwbGljYXRpb24gd2lsbCBiZVxuICAgKiBjb25zdHJ1Y3RlZCBpbiB0aGUgc2FtZSBtYW5uZXIgYXMgYSBub3JtYWwgYGFwcGxpY2F0aW9uKClgLlxuICAgKi9cbiAgYWJzdHJhY3QgYXN5bmNBcHBsaWNhdGlvbihiaW5kaW5nRm46ICh6b25lOiBOZ1pvbmUpID0+IFByb21pc2U8QXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlcnM/OiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4pOiBQcm9taXNlPEFwcGxpY2F0aW9uUmVmPjtcblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgQW5ndWxhciBwbGF0Zm9ybSBhbmQgYWxsIEFuZ3VsYXIgYXBwbGljYXRpb25zIG9uIHRoZSBwYWdlLlxuICAgKi9cbiAgYWJzdHJhY3QgZGlzcG9zZSgpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgUGxhdGZvcm1SZWZfIGV4dGVuZHMgUGxhdGZvcm1SZWYge1xuICAvKiogQGludGVybmFsICovXG4gIF9hcHBsaWNhdGlvbnM6IEFwcGxpY2F0aW9uUmVmW10gPSBbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZGlzcG9zZUxpc3RlbmVyczogRnVuY3Rpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBfZGlzcG9zZTogKCkgPT4gdm9pZCkgeyBzdXBlcigpOyB9XG5cbiAgcmVnaXN0ZXJEaXNwb3NlTGlzdGVuZXIoZGlzcG9zZTogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLl9kaXNwb3NlTGlzdGVuZXJzLnB1c2goZGlzcG9zZSk7IH1cblxuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gdGhpcy5faW5qZWN0b3I7IH1cblxuICBhcHBsaWNhdGlvbihwcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IEFwcGxpY2F0aW9uUmVmIHtcbiAgICB2YXIgYXBwID0gdGhpcy5faW5pdEFwcChjcmVhdGVOZ1pvbmUoKSwgcHJvdmlkZXJzKTtcbiAgICBpZiAoUHJvbWlzZVdyYXBwZXIuaXNQcm9taXNlKGFwcCkpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgIFwiQ2Fubm90IHVzZSBhc3luY3Jvbm91cyBhcHAgaW5pdGlhbGl6ZXJzIHdpdGggYXBwbGljYXRpb24uIFVzZSBhc3luY0FwcGxpY2F0aW9uIGluc3RlYWQuXCIpO1xuICAgIH1cbiAgICByZXR1cm4gPEFwcGxpY2F0aW9uUmVmPmFwcDtcbiAgfVxuXG4gIGFzeW5jQXBwbGljYXRpb24oYmluZGluZ0ZuOiAoem9uZTogTmdab25lKSA9PiBQcm9taXNlPEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPj4sXG4gICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbFByb3ZpZGVycz86IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IFByb21pc2U8QXBwbGljYXRpb25SZWY+IHtcbiAgICB2YXIgem9uZSA9IGNyZWF0ZU5nWm9uZSgpO1xuICAgIHZhciBjb21wbGV0ZXIgPSBQcm9taXNlV3JhcHBlci5jb21wbGV0ZXIoKTtcbiAgICBpZiAoYmluZGluZ0ZuID09PSBudWxsKSB7XG4gICAgICBjb21wbGV0ZXIucmVzb2x2ZSh0aGlzLl9pbml0QXBwKHpvbmUsIGFkZGl0aW9uYWxQcm92aWRlcnMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICBQcm9taXNlV3JhcHBlci50aGVuKGJpbmRpbmdGbih6b25lKSwgKHByb3ZpZGVyczogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+KSA9PiB7XG4gICAgICAgICAgaWYgKGlzUHJlc2VudChhZGRpdGlvbmFsUHJvdmlkZXJzKSkge1xuICAgICAgICAgICAgcHJvdmlkZXJzID0gTGlzdFdyYXBwZXIuY29uY2F0KHByb3ZpZGVycywgYWRkaXRpb25hbFByb3ZpZGVycyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5faW5pdEFwcCh6b25lLCBwcm92aWRlcnMpO1xuICAgICAgICAgIGNvbXBsZXRlci5yZXNvbHZlKHByb21pc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29tcGxldGVyLnByb21pc2U7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QXBwKHpvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICAgICBwcm92aWRlcnM6IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IFByb21pc2U8QXBwbGljYXRpb25SZWY+fFxuICAgICAgQXBwbGljYXRpb25SZWYge1xuICAgIHZhciBpbmplY3RvcjogSW5qZWN0b3I7XG4gICAgdmFyIGFwcDogQXBwbGljYXRpb25SZWY7XG4gICAgem9uZS5ydW4oKCkgPT4ge1xuICAgICAgcHJvdmlkZXJzID0gTGlzdFdyYXBwZXIuY29uY2F0KHByb3ZpZGVycywgW1xuICAgICAgICBwcm92aWRlKE5nWm9uZSwge3VzZVZhbHVlOiB6b25lfSksXG4gICAgICAgIHByb3ZpZGUoQXBwbGljYXRpb25SZWYsIHt1c2VGYWN0b3J5OiAoKTogQXBwbGljYXRpb25SZWYgPT4gYXBwLCBkZXBzOiBbXX0pXG4gICAgICBdKTtcblxuICAgICAgdmFyIGV4Y2VwdGlvbkhhbmRsZXI6IEZ1bmN0aW9uO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaW5qZWN0b3IgPSB0aGlzLmluamVjdG9yLnJlc29sdmVBbmRDcmVhdGVDaGlsZChwcm92aWRlcnMpO1xuICAgICAgICBleGNlcHRpb25IYW5kbGVyID0gaW5qZWN0b3IuZ2V0KEV4Y2VwdGlvbkhhbmRsZXIpO1xuICAgICAgICB6b25lLm92ZXJyaWRlT25FcnJvckhhbmRsZXIoKGUsIHMpID0+IGV4Y2VwdGlvbkhhbmRsZXIuY2FsbChlLCBzKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoZXhjZXB0aW9uSGFuZGxlcikpIHtcbiAgICAgICAgICBleGNlcHRpb25IYW5kbGVyLmNhbGwoZSwgZS5zdGFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJpbnQoZS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGFwcCA9IG5ldyBBcHBsaWNhdGlvblJlZl8odGhpcywgem9uZSwgaW5qZWN0b3IpO1xuICAgIHRoaXMuX2FwcGxpY2F0aW9ucy5wdXNoKGFwcCk7XG4gICAgdmFyIHByb21pc2UgPSBfcnVuQXBwSW5pdGlhbGl6ZXJzKGluamVjdG9yKTtcbiAgICBpZiAocHJvbWlzZSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnRoZW4ocHJvbWlzZSwgKF8pID0+IGFwcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhcHA7XG4gICAgfVxuICB9XG5cbiAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBMaXN0V3JhcHBlci5jbG9uZSh0aGlzLl9hcHBsaWNhdGlvbnMpLmZvckVhY2goKGFwcCkgPT4gYXBwLmRpc3Bvc2UoKSk7XG4gICAgdGhpcy5fZGlzcG9zZUxpc3RlbmVycy5mb3JFYWNoKChkaXNwb3NlKSA9PiBkaXNwb3NlKCkpO1xuICAgIHRoaXMuX2Rpc3Bvc2UoKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FwcGxpY2F0aW9uRGlzcG9zZWQoYXBwOiBBcHBsaWNhdGlvblJlZik6IHZvaWQgeyBMaXN0V3JhcHBlci5yZW1vdmUodGhpcy5fYXBwbGljYXRpb25zLCBhcHApOyB9XG59XG5cbmZ1bmN0aW9uIF9ydW5BcHBJbml0aWFsaXplcnMoaW5qZWN0b3I6IEluamVjdG9yKTogUHJvbWlzZTxhbnk+IHtcbiAgbGV0IGluaXRzOiBGdW5jdGlvbltdID0gaW5qZWN0b3IuZ2V0T3B0aW9uYWwoQVBQX0lOSVRJQUxJWkVSKTtcbiAgbGV0IHByb21pc2VzOiBQcm9taXNlPGFueT5bXSA9IFtdO1xuICBpZiAoaXNQcmVzZW50KGluaXRzKSkge1xuICAgIGluaXRzLmZvckVhY2goaW5pdCA9PiB7XG4gICAgICB2YXIgcmV0VmFsID0gaW5pdCgpO1xuICAgICAgaWYgKFByb21pc2VXcmFwcGVyLmlzUHJvbWlzZShyZXRWYWwpKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gocmV0VmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBpZiAocHJvbWlzZXMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5hbGwocHJvbWlzZXMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogQSByZWZlcmVuY2UgdG8gYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBydW5uaW5nIG9uIGEgcGFnZS5cbiAqXG4gKiBGb3IgbW9yZSBhYm91dCBBbmd1bGFyIGFwcGxpY2F0aW9ucywgc2VlIHRoZSBkb2N1bWVudGF0aW9uIGZvciB7QGxpbmsgYm9vdHN0cmFwfS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFwcGxpY2F0aW9uUmVmIHtcbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgbGlzdGVuZXIgdG8gYmUgY2FsbGVkIGVhY2ggdGltZSBgYm9vdHN0cmFwKClgIGlzIGNhbGxlZCB0byBib290c3RyYXBcbiAgICogYSBuZXcgcm9vdCBjb21wb25lbnQuXG4gICAqL1xuICBhYnN0cmFjdCByZWdpc3RlckJvb3RzdHJhcExpc3RlbmVyKGxpc3RlbmVyOiAocmVmOiBDb21wb25lbnRSZWYpID0+IHZvaWQpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGxpc3RlbmVyIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBhcHBsaWNhdGlvbiBpcyBkaXNwb3NlZC5cbiAgICovXG4gIGFic3RyYWN0IHJlZ2lzdGVyRGlzcG9zZUxpc3RlbmVyKGRpc3Bvc2U6ICgpID0+IHZvaWQpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBCb290c3RyYXAgYSBuZXcgY29tcG9uZW50IGF0IHRoZSByb290IGxldmVsIG9mIHRoZSBhcHBsaWNhdGlvbi5cbiAgICpcbiAgICogIyMjIEJvb3RzdHJhcCBwcm9jZXNzXG4gICAqXG4gICAqIFdoZW4gYm9vdHN0cmFwcGluZyBhIG5ldyByb290IGNvbXBvbmVudCBpbnRvIGFuIGFwcGxpY2F0aW9uLCBBbmd1bGFyIG1vdW50cyB0aGVcbiAgICogc3BlY2lmaWVkIGFwcGxpY2F0aW9uIGNvbXBvbmVudCBvbnRvIERPTSBlbGVtZW50cyBpZGVudGlmaWVkIGJ5IHRoZSBbY29tcG9uZW50VHlwZV0nc1xuICAgKiBzZWxlY3RvciBhbmQga2lja3Mgb2ZmIGF1dG9tYXRpYyBjaGFuZ2UgZGV0ZWN0aW9uIHRvIGZpbmlzaCBpbml0aWFsaXppbmcgdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogIyMjIE9wdGlvbmFsIFByb3ZpZGVyc1xuICAgKlxuICAgKiBQcm92aWRlcnMgZm9yIHRoZSBnaXZlbiBjb21wb25lbnQgY2FuIG9wdGlvbmFsbHkgYmUgb3ZlcnJpZGRlbiB2aWEgdGhlIGBwcm92aWRlcnNgXG4gICAqIHBhcmFtZXRlci4gVGhlc2UgcHJvdmlkZXJzIHdpbGwgb25seSBhcHBseSBmb3IgdGhlIHJvb3QgY29tcG9uZW50IGJlaW5nIGFkZGVkIGFuZCBhbnlcbiAgICogY2hpbGQgY29tcG9uZW50cyB1bmRlciBpdC5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICoge0BleGFtcGxlIGNvcmUvdHMvcGxhdGZvcm0vcGxhdGZvcm0udHMgcmVnaW9uPSdsb25nZm9ybSd9XG4gICAqL1xuICBhYnN0cmFjdCBib290c3RyYXAoY29tcG9uZW50VHlwZTogVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVycz86IEFycmF5PFR5cGUgfCBQcm92aWRlciB8IGFueVtdPik6IFByb21pc2U8Q29tcG9uZW50UmVmPjtcblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIGFwcGxpY2F0aW9uIHtAbGluayBJbmplY3Rvcn0uXG4gICAqL1xuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9O1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgYXBwbGljYXRpb24ge0BsaW5rIE5nWm9uZX0uXG4gICAqL1xuICBnZXQgem9uZSgpOiBOZ1pvbmUgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9O1xuXG4gIC8qKlxuICAgKiBEaXNwb3NlIG9mIHRoaXMgYXBwbGljYXRpb24gYW5kIGFsbCBvZiBpdHMgY29tcG9uZW50cy5cbiAgICovXG4gIGFic3RyYWN0IGRpc3Bvc2UoKTogdm9pZDtcblxuICAvKipcbiAgICogSW52b2tlIHRoaXMgbWV0aG9kIHRvIGV4cGxpY2l0bHkgcHJvY2VzcyBjaGFuZ2UgZGV0ZWN0aW9uIGFuZCBpdHMgc2lkZS1lZmZlY3RzLlxuICAgKlxuICAgKiBJbiBkZXZlbG9wbWVudCBtb2RlLCBgdGljaygpYCBhbHNvIHBlcmZvcm1zIGEgc2Vjb25kIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgdG8gZW5zdXJlIHRoYXQgbm9cbiAgICogZnVydGhlciBjaGFuZ2VzIGFyZSBkZXRlY3RlZC4gSWYgYWRkaXRpb25hbCBjaGFuZ2VzIGFyZSBwaWNrZWQgdXAgZHVyaW5nIHRoaXMgc2Vjb25kIGN5Y2xlLFxuICAgKiBiaW5kaW5ncyBpbiB0aGUgYXBwIGhhdmUgc2lkZS1lZmZlY3RzIHRoYXQgY2Fubm90IGJlIHJlc29sdmVkIGluIGEgc2luZ2xlIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogcGFzcy5cbiAgICogSW4gdGhpcyBjYXNlLCBBbmd1bGFyIHRocm93cyBhbiBlcnJvciwgc2luY2UgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBjYW4gb25seSBoYXZlIG9uZSBjaGFuZ2VcbiAgICogZGV0ZWN0aW9uIHBhc3MgZHVyaW5nIHdoaWNoIGFsbCBjaGFuZ2UgZGV0ZWN0aW9uIG11c3QgY29tcGxldGUuXG4gICAqL1xuICBhYnN0cmFjdCB0aWNrKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEdldCBhIGxpc3Qgb2YgY29tcG9uZW50IHR5cGVzIHJlZ2lzdGVyZWQgdG8gdGhpcyBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGdldCBjb21wb25lbnRUeXBlcygpOiBUeXBlW10geyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9O1xufVxuXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25SZWZfIGV4dGVuZHMgQXBwbGljYXRpb25SZWYge1xuICAvKiogQGludGVybmFsICovXG4gIHN0YXRpYyBfdGlja1Njb3BlOiBXdGZTY29wZUZuID0gd3RmQ3JlYXRlU2NvcGUoJ0FwcGxpY2F0aW9uUmVmI3RpY2soKScpO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfYm9vdHN0cmFwTGlzdGVuZXJzOiBGdW5jdGlvbltdID0gW107XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfZGlzcG9zZUxpc3RlbmVyczogRnVuY3Rpb25bXSA9IFtdO1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgX3Jvb3RDb21wb25lbnRzOiBDb21wb25lbnRSZWZbXSA9IFtdO1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgX3Jvb3RDb21wb25lbnRUeXBlczogVHlwZVtdID0gW107XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWZzOiBDaGFuZ2VEZXRlY3RvclJlZltdID0gW107XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfcnVubmluZ1RpY2s6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9lbmZvcmNlTm9OZXdDaGFuZ2VzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGxhdGZvcm06IFBsYXRmb3JtUmVmXywgcHJpdmF0ZSBfem9uZTogTmdab25lLCBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fem9uZSkpIHtcbiAgICAgIE9ic2VydmFibGVXcmFwcGVyLnN1YnNjcmliZSh0aGlzLl96b25lLm9uVHVybkRvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKF8pID0+IHsgdGhpcy5fem9uZS5ydW4oKCkgPT4geyB0aGlzLnRpY2soKTsgfSk7IH0pO1xuICAgIH1cbiAgICB0aGlzLl9lbmZvcmNlTm9OZXdDaGFuZ2VzID0gYXNzZXJ0aW9uc0VuYWJsZWQoKTtcbiAgfVxuXG4gIHJlZ2lzdGVyQm9vdHN0cmFwTGlzdGVuZXIobGlzdGVuZXI6IChyZWY6IENvbXBvbmVudFJlZikgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX2Jvb3RzdHJhcExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJlZ2lzdGVyRGlzcG9zZUxpc3RlbmVyKGRpc3Bvc2U6ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fZGlzcG9zZUxpc3RlbmVycy5wdXNoKGRpc3Bvc2UpOyB9XG5cbiAgcmVnaXN0ZXJDaGFuZ2VEZXRlY3RvcihjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpOiB2b2lkIHtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZnMucHVzaChjaGFuZ2VEZXRlY3Rvcik7XG4gIH1cblxuICB1bnJlZ2lzdGVyQ2hhbmdlRGV0ZWN0b3IoY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKTogdm9pZCB7XG4gICAgTGlzdFdyYXBwZXIucmVtb3ZlKHRoaXMuX2NoYW5nZURldGVjdG9yUmVmcywgY2hhbmdlRGV0ZWN0b3IpO1xuICB9XG5cbiAgYm9vdHN0cmFwKGNvbXBvbmVudFR5cGU6IFR5cGUsXG4gICAgICAgICAgICBwcm92aWRlcnM/OiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4pOiBQcm9taXNlPENvbXBvbmVudFJlZj4ge1xuICAgIHZhciBjb21wbGV0ZXIgPSBQcm9taXNlV3JhcHBlci5jb21wbGV0ZXIoKTtcbiAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICB2YXIgY29tcG9uZW50UHJvdmlkZXJzID0gX2NvbXBvbmVudFByb3ZpZGVycyhjb21wb25lbnRUeXBlKTtcbiAgICAgIGlmIChpc1ByZXNlbnQocHJvdmlkZXJzKSkge1xuICAgICAgICBjb21wb25lbnRQcm92aWRlcnMucHVzaChwcm92aWRlcnMpO1xuICAgICAgfVxuICAgICAgdmFyIGV4Y2VwdGlvbkhhbmRsZXIgPSB0aGlzLl9pbmplY3Rvci5nZXQoRXhjZXB0aW9uSGFuZGxlcik7XG4gICAgICB0aGlzLl9yb290Q29tcG9uZW50VHlwZXMucHVzaChjb21wb25lbnRUeXBlKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBpbmplY3RvcjogSW5qZWN0b3IgPSB0aGlzLl9pbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlQ2hpbGQoY29tcG9uZW50UHJvdmlkZXJzKTtcbiAgICAgICAgdmFyIGNvbXBSZWZUb2tlbjogUHJvbWlzZTxDb21wb25lbnRSZWY+ID0gaW5qZWN0b3IuZ2V0KEFQUF9DT01QT05FTlRfUkVGX1BST01JU0UpO1xuICAgICAgICB2YXIgdGljayA9IChjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZikgPT4ge1xuICAgICAgICAgIHRoaXMuX2xvYWRDb21wb25lbnQoY29tcG9uZW50UmVmKTtcbiAgICAgICAgICBjb21wbGV0ZXIucmVzb2x2ZShjb21wb25lbnRSZWYpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0aWNrUmVzdWx0ID0gUHJvbWlzZVdyYXBwZXIudGhlbihjb21wUmVmVG9rZW4sIHRpY2spO1xuXG4gICAgICAgIC8vIFRISVMgTVVTVCBPTkxZIFJVTiBJTiBEQVJULlxuICAgICAgICAvLyBUaGlzIGlzIHJlcXVpcmVkIHRvIHJlcG9ydCBhbiBlcnJvciB3aGVuIG5vIGNvbXBvbmVudHMgd2l0aCBhIG1hdGNoaW5nIHNlbGVjdG9yIGZvdW5kLlxuICAgICAgICAvLyBPdGhlcndpc2UgdGhlIHByb21pc2Ugd2lsbCBuZXZlciBiZSBjb21wbGV0ZWQuXG4gICAgICAgIC8vIERvaW5nIHRoaXMgaW4gSlMgY2F1c2VzIGFuIGV4dHJhIGVycm9yIG1lc3NhZ2UgdG8gYXBwZWFyLlxuICAgICAgICBpZiAoSVNfREFSVCkge1xuICAgICAgICAgIFByb21pc2VXcmFwcGVyLnRoZW4odGlja1Jlc3VsdCwgKF8pID0+IHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIFByb21pc2VXcmFwcGVyLnRoZW4odGlja1Jlc3VsdCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXJyLCBzdGFja1RyYWNlKSA9PiBjb21wbGV0ZXIucmVqZWN0KGVyciwgc3RhY2tUcmFjZSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBleGNlcHRpb25IYW5kbGVyLmNhbGwoZSwgZS5zdGFjayk7XG4gICAgICAgIGNvbXBsZXRlci5yZWplY3QoZSwgZS5zdGFjayk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbXBsZXRlci5wcm9taXNlLnRoZW4oXyA9PiB7XG4gICAgICBsZXQgYyA9IHRoaXMuX2luamVjdG9yLmdldChDb25zb2xlKTtcbiAgICAgIGlmIChhc3NlcnRpb25zRW5hYmxlZCgpKSB7XG4gICAgICAgIGMubG9nKFxuICAgICAgICAgICAgXCJBbmd1bGFyIDIgaXMgcnVubmluZyBpbiB0aGUgZGV2ZWxvcG1lbnQgbW9kZS4gQ2FsbCBlbmFibGVQcm9kTW9kZSgpIHRvIGVuYWJsZSB0aGUgcHJvZHVjdGlvbiBtb2RlLlwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbG9hZENvbXBvbmVudChjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZik6IHZvaWQge1xuICAgIHZhciBhcHBDaGFuZ2VEZXRlY3RvciA9XG4gICAgICAgICg8RWxlbWVudFJlZl8+Y29tcG9uZW50UmVmLmxvY2F0aW9uKS5pbnRlcm5hbEVsZW1lbnQucGFyZW50Vmlldy5jaGFuZ2VEZXRlY3RvcjtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZnMucHVzaChhcHBDaGFuZ2VEZXRlY3Rvci5yZWYpO1xuICAgIHRoaXMudGljaygpO1xuICAgIHRoaXMuX3Jvb3RDb21wb25lbnRzLnB1c2goY29tcG9uZW50UmVmKTtcbiAgICB0aGlzLl9ib290c3RyYXBMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IGxpc3RlbmVyKGNvbXBvbmVudFJlZikpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdW5sb2FkQ29tcG9uZW50KGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmKTogdm9pZCB7XG4gICAgaWYgKCFMaXN0V3JhcHBlci5jb250YWlucyh0aGlzLl9yb290Q29tcG9uZW50cywgY29tcG9uZW50UmVmKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnVucmVnaXN0ZXJDaGFuZ2VEZXRlY3RvcihcbiAgICAgICAgKDxFbGVtZW50UmVmXz5jb21wb25lbnRSZWYubG9jYXRpb24pLmludGVybmFsRWxlbWVudC5wYXJlbnRWaWV3LmNoYW5nZURldGVjdG9yLnJlZik7XG4gICAgTGlzdFdyYXBwZXIucmVtb3ZlKHRoaXMuX3Jvb3RDb21wb25lbnRzLCBjb21wb25lbnRSZWYpO1xuICB9XG5cbiAgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yIHsgcmV0dXJuIHRoaXMuX2luamVjdG9yOyB9XG5cbiAgZ2V0IHpvbmUoKTogTmdab25lIHsgcmV0dXJuIHRoaXMuX3pvbmU7IH1cblxuICB0aWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9ydW5uaW5nVGljaykge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXCJBcHBsaWNhdGlvblJlZi50aWNrIGlzIGNhbGxlZCByZWN1cnNpdmVseVwiKTtcbiAgICB9XG5cbiAgICB2YXIgcyA9IEFwcGxpY2F0aW9uUmVmXy5fdGlja1Njb3BlKCk7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX3J1bm5pbmdUaWNrID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmcy5mb3JFYWNoKChkZXRlY3RvcikgPT4gZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpKTtcbiAgICAgIGlmICh0aGlzLl9lbmZvcmNlTm9OZXdDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmcy5mb3JFYWNoKChkZXRlY3RvcikgPT4gZGV0ZWN0b3IuY2hlY2tOb0NoYW5nZXMoKSk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX3J1bm5pbmdUaWNrID0gZmFsc2U7XG4gICAgICB3dGZMZWF2ZShzKTtcbiAgICB9XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIC8vIFRPRE8oYWx4aHViKTogRGlzcG9zZSBvZiB0aGUgTmdab25lLlxuICAgIExpc3RXcmFwcGVyLmNsb25lKHRoaXMuX3Jvb3RDb21wb25lbnRzKS5mb3JFYWNoKChyZWYpID0+IHJlZi5kaXNwb3NlKCkpO1xuICAgIHRoaXMuX2Rpc3Bvc2VMaXN0ZW5lcnMuZm9yRWFjaCgoZGlzcG9zZSkgPT4gZGlzcG9zZSgpKTtcbiAgICB0aGlzLl9wbGF0Zm9ybS5fYXBwbGljYXRpb25EaXNwb3NlZCh0aGlzKTtcbiAgfVxuXG4gIGdldCBjb21wb25lbnRUeXBlcygpOiBUeXBlW10geyByZXR1cm4gdGhpcy5fcm9vdENvbXBvbmVudFR5cGVzOyB9XG59XG4iXX0=