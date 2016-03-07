'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var async_1 = require('angular2/src/facade/async');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var core_1 = require('angular2/core');
var route_registry_1 = require('./route_registry');
var location_1 = require('./location');
var route_lifecycle_reflector_1 = require('./route_lifecycle_reflector');
var _resolveToTrue = async_1.PromiseWrapper.resolve(true);
var _resolveToFalse = async_1.PromiseWrapper.resolve(false);
/**
 * The `Router` is responsible for mapping URLs to components.
 *
 * You can see the state of the router by inspecting the read-only field `router.navigating`.
 * This may be useful for showing a spinner, for instance.
 *
 * ## Concepts
 *
 * Routers and component instances have a 1:1 correspondence.
 *
 * The router holds reference to a number of {@link RouterOutlet}.
 * An outlet is a placeholder that the router dynamically fills in depending on the current URL.
 *
 * When the router navigates from a URL, it must first recognize it and serialize it into an
 * `Instruction`.
 * The router uses the `RouteRegistry` to get an `Instruction`.
 */
var Router = (function () {
    function Router(registry, parent, hostComponent) {
        this.registry = registry;
        this.parent = parent;
        this.hostComponent = hostComponent;
        this.navigating = false;
        this._currentInstruction = null;
        this._currentNavigation = _resolveToTrue;
        this._outlet = null;
        this._auxRouters = new collection_1.Map();
        this._subject = new async_1.EventEmitter();
    }
    /**
     * Constructs a child router. You probably don't need to use this unless you're writing a reusable
     * component.
     */
    Router.prototype.childRouter = function (hostComponent) {
        return this._childRouter = new ChildRouter(this, hostComponent);
    };
    /**
     * Constructs a child router. You probably don't need to use this unless you're writing a reusable
     * component.
     */
    Router.prototype.auxRouter = function (hostComponent) { return new ChildRouter(this, hostComponent); };
    /**
     * Register an outlet to be notified of primary route changes.
     *
     * You probably don't need to use this unless you're writing a reusable component.
     */
    Router.prototype.registerPrimaryOutlet = function (outlet) {
        if (lang_1.isPresent(outlet.name)) {
            throw new exceptions_1.BaseException("registerPrimaryOutlet expects to be called with an unnamed outlet.");
        }
        this._outlet = outlet;
        if (lang_1.isPresent(this._currentInstruction)) {
            return this.commit(this._currentInstruction, false);
        }
        return _resolveToTrue;
    };
    /**
     * Register an outlet to notified of auxiliary route changes.
     *
     * You probably don't need to use this unless you're writing a reusable component.
     */
    Router.prototype.registerAuxOutlet = function (outlet) {
        var outletName = outlet.name;
        if (lang_1.isBlank(outletName)) {
            throw new exceptions_1.BaseException("registerAuxOutlet expects to be called with an outlet with a name.");
        }
        var router = this.auxRouter(this.hostComponent);
        this._auxRouters.set(outletName, router);
        router._outlet = outlet;
        var auxInstruction;
        if (lang_1.isPresent(this._currentInstruction) &&
            lang_1.isPresent(auxInstruction = this._currentInstruction.auxInstruction[outletName])) {
            return router.commit(auxInstruction);
        }
        return _resolveToTrue;
    };
    /**
     * Given an instruction, returns `true` if the instruction is currently active,
     * otherwise `false`.
     */
    Router.prototype.isRouteActive = function (instruction) {
        var router = this;
        while (lang_1.isPresent(router.parent) && lang_1.isPresent(instruction.child)) {
            router = router.parent;
            instruction = instruction.child;
        }
        return lang_1.isPresent(this._currentInstruction) &&
            this._currentInstruction.component == instruction.component;
    };
    /**
     * Dynamically update the routing configuration and trigger a navigation.
     *
     * ### Usage
     *
     * ```
     * router.config([
     *   { 'path': '/', 'component': IndexComp },
     *   { 'path': '/user/:id', 'component': UserComp },
     * ]);
     * ```
     */
    Router.prototype.config = function (definitions) {
        var _this = this;
        definitions.forEach(function (routeDefinition) { _this.registry.config(_this.hostComponent, routeDefinition); });
        return this.renavigate();
    };
    /**
     * Navigate based on the provided Route Link DSL. It's preferred to navigate with this method
     * over `navigateByUrl`.
     *
     * ### Usage
     *
     * This method takes an array representing the Route Link DSL:
     * ```
     * ['./MyCmp', {param: 3}]
     * ```
     * See the {@link RouterLink} directive for more.
     */
    Router.prototype.navigate = function (linkParams) {
        var instruction = this.generate(linkParams);
        return this.navigateByInstruction(instruction, false);
    };
    /**
     * Navigate to a URL. Returns a promise that resolves when navigation is complete.
     * It's preferred to navigate with `navigate` instead of this method, since URLs are more brittle.
     *
     * If the given URL begins with a `/`, router will navigate absolutely.
     * If the given URL does not begin with `/`, the router will navigate relative to this component.
     */
    Router.prototype.navigateByUrl = function (url, _skipLocationChange) {
        var _this = this;
        if (_skipLocationChange === void 0) { _skipLocationChange = false; }
        return this._currentNavigation = this._currentNavigation.then(function (_) {
            _this.lastNavigationAttempt = url;
            _this._startNavigating();
            return _this._afterPromiseFinishNavigating(_this.recognize(url).then(function (instruction) {
                if (lang_1.isBlank(instruction)) {
                    return false;
                }
                return _this._navigate(instruction, _skipLocationChange);
            }));
        });
    };
    /**
     * Navigate via the provided instruction. Returns a promise that resolves when navigation is
     * complete.
     */
    Router.prototype.navigateByInstruction = function (instruction, _skipLocationChange) {
        var _this = this;
        if (_skipLocationChange === void 0) { _skipLocationChange = false; }
        if (lang_1.isBlank(instruction)) {
            return _resolveToFalse;
        }
        return this._currentNavigation = this._currentNavigation.then(function (_) {
            _this._startNavigating();
            return _this._afterPromiseFinishNavigating(_this._navigate(instruction, _skipLocationChange));
        });
    };
    /** @internal */
    Router.prototype._navigate = function (instruction, _skipLocationChange) {
        var _this = this;
        return this._settleInstruction(instruction)
            .then(function (_) { return _this._routerCanReuse(instruction); })
            .then(function (_) { return _this._canActivate(instruction); })
            .then(function (result) {
            if (!result) {
                return false;
            }
            return _this._routerCanDeactivate(instruction)
                .then(function (result) {
                if (result) {
                    return _this.commit(instruction, _skipLocationChange)
                        .then(function (_) {
                        _this._emitNavigationFinish(instruction.toRootUrl());
                        return true;
                    });
                }
            });
        });
    };
    /** @internal */
    Router.prototype._settleInstruction = function (instruction) {
        var _this = this;
        return instruction.resolveComponent().then(function (_) {
            var unsettledInstructions = [];
            if (lang_1.isPresent(instruction.component)) {
                instruction.component.reuse = false;
            }
            if (lang_1.isPresent(instruction.child)) {
                unsettledInstructions.push(_this._settleInstruction(instruction.child));
            }
            collection_1.StringMapWrapper.forEach(instruction.auxInstruction, function (instruction, _) {
                unsettledInstructions.push(_this._settleInstruction(instruction));
            });
            return async_1.PromiseWrapper.all(unsettledInstructions);
        });
    };
    Router.prototype._emitNavigationFinish = function (url) { async_1.ObservableWrapper.callEmit(this._subject, url); };
    Router.prototype._afterPromiseFinishNavigating = function (promise) {
        var _this = this;
        return async_1.PromiseWrapper.catchError(promise.then(function (_) { return _this._finishNavigating(); }), function (err) {
            _this._finishNavigating();
            throw err;
        });
    };
    /*
     * Recursively set reuse flags
     */
    /** @internal */
    Router.prototype._routerCanReuse = function (instruction) {
        var _this = this;
        if (lang_1.isBlank(this._outlet)) {
            return _resolveToFalse;
        }
        if (lang_1.isBlank(instruction.component)) {
            return _resolveToTrue;
        }
        return this._outlet.routerCanReuse(instruction.component)
            .then(function (result) {
            instruction.component.reuse = result;
            if (result && lang_1.isPresent(_this._childRouter) && lang_1.isPresent(instruction.child)) {
                return _this._childRouter._routerCanReuse(instruction.child);
            }
        });
    };
    Router.prototype._canActivate = function (nextInstruction) {
        return canActivateOne(nextInstruction, this._currentInstruction);
    };
    Router.prototype._routerCanDeactivate = function (instruction) {
        var _this = this;
        if (lang_1.isBlank(this._outlet)) {
            return _resolveToTrue;
        }
        var next;
        var childInstruction = null;
        var reuse = false;
        var componentInstruction = null;
        if (lang_1.isPresent(instruction)) {
            childInstruction = instruction.child;
            componentInstruction = instruction.component;
            reuse = lang_1.isBlank(instruction.component) || instruction.component.reuse;
        }
        if (reuse) {
            next = _resolveToTrue;
        }
        else {
            next = this._outlet.routerCanDeactivate(componentInstruction);
        }
        // TODO: aux route lifecycle hooks
        return next.then(function (result) {
            if (result == false) {
                return false;
            }
            if (lang_1.isPresent(_this._childRouter)) {
                return _this._childRouter._routerCanDeactivate(childInstruction);
            }
            return true;
        });
    };
    /**
     * Updates this router and all descendant routers according to the given instruction
     */
    Router.prototype.commit = function (instruction, _skipLocationChange) {
        var _this = this;
        if (_skipLocationChange === void 0) { _skipLocationChange = false; }
        this._currentInstruction = instruction;
        var next = _resolveToTrue;
        if (lang_1.isPresent(this._outlet) && lang_1.isPresent(instruction.component)) {
            var componentInstruction = instruction.component;
            if (componentInstruction.reuse) {
                next = this._outlet.reuse(componentInstruction);
            }
            else {
                next =
                    this.deactivate(instruction).then(function (_) { return _this._outlet.activate(componentInstruction); });
            }
            if (lang_1.isPresent(instruction.child)) {
                next = next.then(function (_) {
                    if (lang_1.isPresent(_this._childRouter)) {
                        return _this._childRouter.commit(instruction.child);
                    }
                });
            }
        }
        var promises = [];
        this._auxRouters.forEach(function (router, name) {
            if (lang_1.isPresent(instruction.auxInstruction[name])) {
                promises.push(router.commit(instruction.auxInstruction[name]));
            }
        });
        return next.then(function (_) { return async_1.PromiseWrapper.all(promises); });
    };
    /** @internal */
    Router.prototype._startNavigating = function () { this.navigating = true; };
    /** @internal */
    Router.prototype._finishNavigating = function () { this.navigating = false; };
    /**
     * Subscribe to URL updates from the router
     */
    Router.prototype.subscribe = function (onNext) {
        return async_1.ObservableWrapper.subscribe(this._subject, onNext);
    };
    /**
     * Removes the contents of this router's outlet and all descendant outlets
     */
    Router.prototype.deactivate = function (instruction) {
        var _this = this;
        var childInstruction = null;
        var componentInstruction = null;
        if (lang_1.isPresent(instruction)) {
            childInstruction = instruction.child;
            componentInstruction = instruction.component;
        }
        var next = _resolveToTrue;
        if (lang_1.isPresent(this._childRouter)) {
            next = this._childRouter.deactivate(childInstruction);
        }
        if (lang_1.isPresent(this._outlet)) {
            next = next.then(function (_) { return _this._outlet.deactivate(componentInstruction); });
        }
        // TODO: handle aux routes
        return next;
    };
    /**
     * Given a URL, returns an instruction representing the component graph
     */
    Router.prototype.recognize = function (url) {
        var ancestorComponents = this._getAncestorInstructions();
        return this.registry.recognize(url, ancestorComponents);
    };
    Router.prototype._getAncestorInstructions = function () {
        var ancestorInstructions = [this._currentInstruction];
        var ancestorRouter = this;
        while (lang_1.isPresent(ancestorRouter = ancestorRouter.parent)) {
            ancestorInstructions.unshift(ancestorRouter._currentInstruction);
        }
        return ancestorInstructions;
    };
    /**
     * Navigates to either the last URL successfully navigated to, or the last URL requested if the
     * router has yet to successfully navigate.
     */
    Router.prototype.renavigate = function () {
        if (lang_1.isBlank(this.lastNavigationAttempt)) {
            return this._currentNavigation;
        }
        return this.navigateByUrl(this.lastNavigationAttempt);
    };
    /**
     * Generate an `Instruction` based on the provided Route Link DSL.
     */
    Router.prototype.generate = function (linkParams) {
        var ancestorInstructions = this._getAncestorInstructions();
        return this.registry.generate(linkParams, ancestorInstructions);
    };
    Router = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [route_registry_1.RouteRegistry, Router, Object])
    ], Router);
    return Router;
})();
exports.Router = Router;
var RootRouter = (function (_super) {
    __extends(RootRouter, _super);
    function RootRouter(registry, location, primaryComponent) {
        var _this = this;
        _super.call(this, registry, null, primaryComponent);
        this._location = location;
        this._locationSub = this._location.subscribe(function (change) {
            // we call recognize ourselves
            _this.recognize(change['url'])
                .then(function (instruction) {
                _this.navigateByInstruction(instruction, lang_1.isPresent(change['pop']))
                    .then(function (_) {
                    // this is a popstate event; no need to change the URL
                    if (lang_1.isPresent(change['pop']) && change['type'] != 'hashchange') {
                        return;
                    }
                    var emitPath = instruction.toUrlPath();
                    var emitQuery = instruction.toUrlQuery();
                    if (emitPath.length > 0 && emitPath[0] != '/') {
                        emitPath = '/' + emitPath;
                    }
                    // Because we've opted to use All hashchange events occur outside Angular.
                    // However, apps that are migrating might have hash links that operate outside
                    // angular to which routing must respond.
                    // To support these cases where we respond to hashchanges and redirect as a
                    // result, we need to replace the top item on the stack.
                    if (change['type'] == 'hashchange') {
                        if (instruction.toRootUrl() != _this._location.path()) {
                            _this._location.replaceState(emitPath, emitQuery);
                        }
                    }
                    else {
                        _this._location.go(emitPath, emitQuery);
                    }
                });
            });
        });
        this.registry.configFromComponent(primaryComponent);
        this.navigateByUrl(location.path());
    }
    RootRouter.prototype.commit = function (instruction, _skipLocationChange) {
        var _this = this;
        if (_skipLocationChange === void 0) { _skipLocationChange = false; }
        var emitPath = instruction.toUrlPath();
        var emitQuery = instruction.toUrlQuery();
        if (emitPath.length > 0 && emitPath[0] != '/') {
            emitPath = '/' + emitPath;
        }
        var promise = _super.prototype.commit.call(this, instruction);
        if (!_skipLocationChange) {
            promise = promise.then(function (_) { _this._location.go(emitPath, emitQuery); });
        }
        return promise;
    };
    RootRouter.prototype.dispose = function () {
        if (lang_1.isPresent(this._locationSub)) {
            async_1.ObservableWrapper.dispose(this._locationSub);
            this._locationSub = null;
        }
    };
    RootRouter = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Inject(route_registry_1.ROUTER_PRIMARY_COMPONENT)), 
        __metadata('design:paramtypes', [route_registry_1.RouteRegistry, location_1.Location, lang_1.Type])
    ], RootRouter);
    return RootRouter;
})(Router);
exports.RootRouter = RootRouter;
var ChildRouter = (function (_super) {
    __extends(ChildRouter, _super);
    function ChildRouter(parent, hostComponent) {
        _super.call(this, parent.registry, parent, hostComponent);
        this.parent = parent;
    }
    ChildRouter.prototype.navigateByUrl = function (url, _skipLocationChange) {
        if (_skipLocationChange === void 0) { _skipLocationChange = false; }
        // Delegate navigation to the root router
        return this.parent.navigateByUrl(url, _skipLocationChange);
    };
    ChildRouter.prototype.navigateByInstruction = function (instruction, _skipLocationChange) {
        if (_skipLocationChange === void 0) { _skipLocationChange = false; }
        // Delegate navigation to the root router
        return this.parent.navigateByInstruction(instruction, _skipLocationChange);
    };
    return ChildRouter;
})(Router);
function canActivateOne(nextInstruction, prevInstruction) {
    var next = _resolveToTrue;
    if (lang_1.isBlank(nextInstruction.component)) {
        return next;
    }
    if (lang_1.isPresent(nextInstruction.child)) {
        next = canActivateOne(nextInstruction.child, lang_1.isPresent(prevInstruction) ? prevInstruction.child : null);
    }
    return next.then(function (result) {
        if (result == false) {
            return false;
        }
        if (nextInstruction.component.reuse) {
            return true;
        }
        var hook = route_lifecycle_reflector_1.getCanActivateHook(nextInstruction.component.componentType);
        if (lang_1.isPresent(hook)) {
            return hook(nextInstruction.component, lang_1.isPresent(prevInstruction) ? prevInstruction.component : null);
        }
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL3JvdXRlci9yb3V0ZXIudHMiXSwibmFtZXMiOlsiUm91dGVyIiwiUm91dGVyLmNvbnN0cnVjdG9yIiwiUm91dGVyLmNoaWxkUm91dGVyIiwiUm91dGVyLmF1eFJvdXRlciIsIlJvdXRlci5yZWdpc3RlclByaW1hcnlPdXRsZXQiLCJSb3V0ZXIucmVnaXN0ZXJBdXhPdXRsZXQiLCJSb3V0ZXIuaXNSb3V0ZUFjdGl2ZSIsIlJvdXRlci5jb25maWciLCJSb3V0ZXIubmF2aWdhdGUiLCJSb3V0ZXIubmF2aWdhdGVCeVVybCIsIlJvdXRlci5uYXZpZ2F0ZUJ5SW5zdHJ1Y3Rpb24iLCJSb3V0ZXIuX25hdmlnYXRlIiwiUm91dGVyLl9zZXR0bGVJbnN0cnVjdGlvbiIsIlJvdXRlci5fZW1pdE5hdmlnYXRpb25GaW5pc2giLCJSb3V0ZXIuX2FmdGVyUHJvbWlzZUZpbmlzaE5hdmlnYXRpbmciLCJSb3V0ZXIuX3JvdXRlckNhblJldXNlIiwiUm91dGVyLl9jYW5BY3RpdmF0ZSIsIlJvdXRlci5fcm91dGVyQ2FuRGVhY3RpdmF0ZSIsIlJvdXRlci5jb21taXQiLCJSb3V0ZXIuX3N0YXJ0TmF2aWdhdGluZyIsIlJvdXRlci5fZmluaXNoTmF2aWdhdGluZyIsIlJvdXRlci5zdWJzY3JpYmUiLCJSb3V0ZXIuZGVhY3RpdmF0ZSIsIlJvdXRlci5yZWNvZ25pemUiLCJSb3V0ZXIuX2dldEFuY2VzdG9ySW5zdHJ1Y3Rpb25zIiwiUm91dGVyLnJlbmF2aWdhdGUiLCJSb3V0ZXIuZ2VuZXJhdGUiLCJSb290Um91dGVyIiwiUm9vdFJvdXRlci5jb25zdHJ1Y3RvciIsIlJvb3RSb3V0ZXIuY29tbWl0IiwiUm9vdFJvdXRlci5kaXNwb3NlIiwiQ2hpbGRSb3V0ZXIiLCJDaGlsZFJvdXRlci5jb25zdHJ1Y3RvciIsIkNoaWxkUm91dGVyLm5hdmlnYXRlQnlVcmwiLCJDaGlsZFJvdXRlci5uYXZpZ2F0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QSxDQUFDQSxDQUFDQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwQkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDZkEsQ0FBQ0E7UUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDcENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2RBLENBQUNBO1FBQ0RBLElBQUlBLElBQUlBLEdBQUdBLDhDQUFrQkEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7UUFDdkVBLEVBQUVBLENBQUNBLENBQUNBLGdCQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNwQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsU0FBU0EsRUFDekJBLGdCQUFTQSxDQUFDQSxlQUFlQSxDQUFDQSxHQUFHQSxlQUFlQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUM3RUEsQ0FBQ0E7UUFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7SUFDZEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7QUFDTEEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Byb21pc2VXcmFwcGVyLCBFdmVudEVtaXR0ZXIsIE9ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7TWFwLCBTdHJpbmdNYXBXcmFwcGVyLCBNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7aXNCbGFuaywgaXNTdHJpbmcsIGlzUHJlc2VudCwgVHlwZSwgaXNBcnJheX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuaW1wb3J0IHtSb3V0ZVJlZ2lzdHJ5LCBST1VURVJfUFJJTUFSWV9DT01QT05FTlR9IGZyb20gJy4vcm91dGVfcmVnaXN0cnknO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50SW5zdHJ1Y3Rpb24sXG4gIEluc3RydWN0aW9uLFxufSBmcm9tICcuL2luc3RydWN0aW9uJztcbmltcG9ydCB7Um91dGVyT3V0bGV0fSBmcm9tICcuL3JvdXRlcl9vdXRsZXQnO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnLi9sb2NhdGlvbic7XG5pbXBvcnQge2dldENhbkFjdGl2YXRlSG9va30gZnJvbSAnLi9yb3V0ZV9saWZlY3ljbGVfcmVmbGVjdG9yJztcbmltcG9ydCB7Um91dGVEZWZpbml0aW9ufSBmcm9tICcuL3JvdXRlX2NvbmZpZ19pbXBsJztcblxubGV0IF9yZXNvbHZlVG9UcnVlID0gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZSh0cnVlKTtcbmxldCBfcmVzb2x2ZVRvRmFsc2UgPSBQcm9taXNlV3JhcHBlci5yZXNvbHZlKGZhbHNlKTtcblxuLyoqXG4gKiBUaGUgYFJvdXRlcmAgaXMgcmVzcG9uc2libGUgZm9yIG1hcHBpbmcgVVJMcyB0byBjb21wb25lbnRzLlxuICpcbiAqIFlvdSBjYW4gc2VlIHRoZSBzdGF0ZSBvZiB0aGUgcm91dGVyIGJ5IGluc3BlY3RpbmcgdGhlIHJlYWQtb25seSBmaWVsZCBgcm91dGVyLm5hdmlnYXRpbmdgLlxuICogVGhpcyBtYXkgYmUgdXNlZnVsIGZvciBzaG93aW5nIGEgc3Bpbm5lciwgZm9yIGluc3RhbmNlLlxuICpcbiAqICMjIENvbmNlcHRzXG4gKlxuICogUm91dGVycyBhbmQgY29tcG9uZW50IGluc3RhbmNlcyBoYXZlIGEgMToxIGNvcnJlc3BvbmRlbmNlLlxuICpcbiAqIFRoZSByb3V0ZXIgaG9sZHMgcmVmZXJlbmNlIHRvIGEgbnVtYmVyIG9mIHtAbGluayBSb3V0ZXJPdXRsZXR9LlxuICogQW4gb3V0bGV0IGlzIGEgcGxhY2Vob2xkZXIgdGhhdCB0aGUgcm91dGVyIGR5bmFtaWNhbGx5IGZpbGxzIGluIGRlcGVuZGluZyBvbiB0aGUgY3VycmVudCBVUkwuXG4gKlxuICogV2hlbiB0aGUgcm91dGVyIG5hdmlnYXRlcyBmcm9tIGEgVVJMLCBpdCBtdXN0IGZpcnN0IHJlY29nbml6ZSBpdCBhbmQgc2VyaWFsaXplIGl0IGludG8gYW5cbiAqIGBJbnN0cnVjdGlvbmAuXG4gKiBUaGUgcm91dGVyIHVzZXMgdGhlIGBSb3V0ZVJlZ2lzdHJ5YCB0byBnZXQgYW4gYEluc3RydWN0aW9uYC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvdXRlciB7XG4gIG5hdmlnYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbGFzdE5hdmlnYXRpb25BdHRlbXB0OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfY3VycmVudEluc3RydWN0aW9uOiBJbnN0cnVjdGlvbiA9IG51bGw7XG5cbiAgcHJpdmF0ZSBfY3VycmVudE5hdmlnYXRpb246IFByb21pc2U8YW55PiA9IF9yZXNvbHZlVG9UcnVlO1xuICBwcml2YXRlIF9vdXRsZXQ6IFJvdXRlck91dGxldCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBfYXV4Um91dGVycyA9IG5ldyBNYXA8c3RyaW5nLCBSb3V0ZXI+KCk7XG4gIHByaXZhdGUgX2NoaWxkUm91dGVyOiBSb3V0ZXI7XG5cbiAgcHJpdmF0ZSBfc3ViamVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVnaXN0cnk6IFJvdXRlUmVnaXN0cnksIHB1YmxpYyBwYXJlbnQ6IFJvdXRlciwgcHVibGljIGhvc3RDb21wb25lbnQ6IGFueSkge31cblxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgY2hpbGQgcm91dGVyLiBZb3UgcHJvYmFibHkgZG9uJ3QgbmVlZCB0byB1c2UgdGhpcyB1bmxlc3MgeW91J3JlIHdyaXRpbmcgYSByZXVzYWJsZVxuICAgKiBjb21wb25lbnQuXG4gICAqL1xuICBjaGlsZFJvdXRlcihob3N0Q29tcG9uZW50OiBhbnkpOiBSb3V0ZXIge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZFJvdXRlciA9IG5ldyBDaGlsZFJvdXRlcih0aGlzLCBob3N0Q29tcG9uZW50KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBjaGlsZCByb3V0ZXIuIFlvdSBwcm9iYWJseSBkb24ndCBuZWVkIHRvIHVzZSB0aGlzIHVubGVzcyB5b3UncmUgd3JpdGluZyBhIHJldXNhYmxlXG4gICAqIGNvbXBvbmVudC5cbiAgICovXG4gIGF1eFJvdXRlcihob3N0Q29tcG9uZW50OiBhbnkpOiBSb3V0ZXIgeyByZXR1cm4gbmV3IENoaWxkUm91dGVyKHRoaXMsIGhvc3RDb21wb25lbnQpOyB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGFuIG91dGxldCB0byBiZSBub3RpZmllZCBvZiBwcmltYXJ5IHJvdXRlIGNoYW5nZXMuXG4gICAqXG4gICAqIFlvdSBwcm9iYWJseSBkb24ndCBuZWVkIHRvIHVzZSB0aGlzIHVubGVzcyB5b3UncmUgd3JpdGluZyBhIHJldXNhYmxlIGNvbXBvbmVudC5cbiAgICovXG4gIHJlZ2lzdGVyUHJpbWFyeU91dGxldChvdXRsZXQ6IFJvdXRlck91dGxldCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmIChpc1ByZXNlbnQob3V0bGV0Lm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgcmVnaXN0ZXJQcmltYXJ5T3V0bGV0IGV4cGVjdHMgdG8gYmUgY2FsbGVkIHdpdGggYW4gdW5uYW1lZCBvdXRsZXQuYCk7XG4gICAgfVxuXG4gICAgdGhpcy5fb3V0bGV0ID0gb3V0bGV0O1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fY3VycmVudEluc3RydWN0aW9uKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29tbWl0KHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbiwgZmFsc2UpO1xuICAgIH1cbiAgICByZXR1cm4gX3Jlc29sdmVUb1RydWU7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYW4gb3V0bGV0IHRvIG5vdGlmaWVkIG9mIGF1eGlsaWFyeSByb3V0ZSBjaGFuZ2VzLlxuICAgKlxuICAgKiBZb3UgcHJvYmFibHkgZG9uJ3QgbmVlZCB0byB1c2UgdGhpcyB1bmxlc3MgeW91J3JlIHdyaXRpbmcgYSByZXVzYWJsZSBjb21wb25lbnQuXG4gICAqL1xuICByZWdpc3RlckF1eE91dGxldChvdXRsZXQ6IFJvdXRlck91dGxldCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHZhciBvdXRsZXROYW1lID0gb3V0bGV0Lm5hbWU7XG4gICAgaWYgKGlzQmxhbmsob3V0bGV0TmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGByZWdpc3RlckF1eE91dGxldCBleHBlY3RzIHRvIGJlIGNhbGxlZCB3aXRoIGFuIG91dGxldCB3aXRoIGEgbmFtZS5gKTtcbiAgICB9XG5cbiAgICB2YXIgcm91dGVyID0gdGhpcy5hdXhSb3V0ZXIodGhpcy5ob3N0Q29tcG9uZW50KTtcblxuICAgIHRoaXMuX2F1eFJvdXRlcnMuc2V0KG91dGxldE5hbWUsIHJvdXRlcik7XG4gICAgcm91dGVyLl9vdXRsZXQgPSBvdXRsZXQ7XG5cbiAgICB2YXIgYXV4SW5zdHJ1Y3Rpb247XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9jdXJyZW50SW5zdHJ1Y3Rpb24pICYmXG4gICAgICAgIGlzUHJlc2VudChhdXhJbnN0cnVjdGlvbiA9IHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbi5hdXhJbnN0cnVjdGlvbltvdXRsZXROYW1lXSkpIHtcbiAgICAgIHJldHVybiByb3V0ZXIuY29tbWl0KGF1eEluc3RydWN0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIF9yZXNvbHZlVG9UcnVlO1xuICB9XG5cblxuICAvKipcbiAgICogR2l2ZW4gYW4gaW5zdHJ1Y3Rpb24sIHJldHVybnMgYHRydWVgIGlmIHRoZSBpbnN0cnVjdGlvbiBpcyBjdXJyZW50bHkgYWN0aXZlLFxuICAgKiBvdGhlcndpc2UgYGZhbHNlYC5cbiAgICovXG4gIGlzUm91dGVBY3RpdmUoaW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uKTogYm9vbGVhbiB7XG4gICAgdmFyIHJvdXRlcjogUm91dGVyID0gdGhpcztcbiAgICB3aGlsZSAoaXNQcmVzZW50KHJvdXRlci5wYXJlbnQpICYmIGlzUHJlc2VudChpbnN0cnVjdGlvbi5jaGlsZCkpIHtcbiAgICAgIHJvdXRlciA9IHJvdXRlci5wYXJlbnQ7XG4gICAgICBpbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uLmNoaWxkO1xuICAgIH1cbiAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbikgJiZcbiAgICAgICAgICAgdGhpcy5fY3VycmVudEluc3RydWN0aW9uLmNvbXBvbmVudCA9PSBpbnN0cnVjdGlvbi5jb21wb25lbnQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBEeW5hbWljYWxseSB1cGRhdGUgdGhlIHJvdXRpbmcgY29uZmlndXJhdGlvbiBhbmQgdHJpZ2dlciBhIG5hdmlnYXRpb24uXG4gICAqXG4gICAqICMjIyBVc2FnZVxuICAgKlxuICAgKiBgYGBcbiAgICogcm91dGVyLmNvbmZpZyhbXG4gICAqICAgeyAncGF0aCc6ICcvJywgJ2NvbXBvbmVudCc6IEluZGV4Q29tcCB9LFxuICAgKiAgIHsgJ3BhdGgnOiAnL3VzZXIvOmlkJywgJ2NvbXBvbmVudCc6IFVzZXJDb21wIH0sXG4gICAqIF0pO1xuICAgKiBgYGBcbiAgICovXG4gIGNvbmZpZyhkZWZpbml0aW9uczogUm91dGVEZWZpbml0aW9uW10pOiBQcm9taXNlPGFueT4ge1xuICAgIGRlZmluaXRpb25zLmZvckVhY2goXG4gICAgICAgIChyb3V0ZURlZmluaXRpb24pID0+IHsgdGhpcy5yZWdpc3RyeS5jb25maWcodGhpcy5ob3N0Q29tcG9uZW50LCByb3V0ZURlZmluaXRpb24pOyB9KTtcbiAgICByZXR1cm4gdGhpcy5yZW5hdmlnYXRlKCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgUm91dGUgTGluayBEU0wuIEl0J3MgcHJlZmVycmVkIHRvIG5hdmlnYXRlIHdpdGggdGhpcyBtZXRob2RcbiAgICogb3ZlciBgbmF2aWdhdGVCeVVybGAuXG4gICAqXG4gICAqICMjIyBVc2FnZVxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCB0YWtlcyBhbiBhcnJheSByZXByZXNlbnRpbmcgdGhlIFJvdXRlIExpbmsgRFNMOlxuICAgKiBgYGBcbiAgICogWycuL015Q21wJywge3BhcmFtOiAzfV1cbiAgICogYGBgXG4gICAqIFNlZSB0aGUge0BsaW5rIFJvdXRlckxpbmt9IGRpcmVjdGl2ZSBmb3IgbW9yZS5cbiAgICovXG4gIG5hdmlnYXRlKGxpbmtQYXJhbXM6IGFueVtdKTogUHJvbWlzZTxhbnk+IHtcbiAgICB2YXIgaW5zdHJ1Y3Rpb24gPSB0aGlzLmdlbmVyYXRlKGxpbmtQYXJhbXMpO1xuICAgIHJldHVybiB0aGlzLm5hdmlnYXRlQnlJbnN0cnVjdGlvbihpbnN0cnVjdGlvbiwgZmFsc2UpO1xuICB9XG5cblxuICAvKipcbiAgICogTmF2aWdhdGUgdG8gYSBVUkwuIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBuYXZpZ2F0aW9uIGlzIGNvbXBsZXRlLlxuICAgKiBJdCdzIHByZWZlcnJlZCB0byBuYXZpZ2F0ZSB3aXRoIGBuYXZpZ2F0ZWAgaW5zdGVhZCBvZiB0aGlzIG1ldGhvZCwgc2luY2UgVVJMcyBhcmUgbW9yZSBicml0dGxlLlxuICAgKlxuICAgKiBJZiB0aGUgZ2l2ZW4gVVJMIGJlZ2lucyB3aXRoIGEgYC9gLCByb3V0ZXIgd2lsbCBuYXZpZ2F0ZSBhYnNvbHV0ZWx5LlxuICAgKiBJZiB0aGUgZ2l2ZW4gVVJMIGRvZXMgbm90IGJlZ2luIHdpdGggYC9gLCB0aGUgcm91dGVyIHdpbGwgbmF2aWdhdGUgcmVsYXRpdmUgdG8gdGhpcyBjb21wb25lbnQuXG4gICAqL1xuICBuYXZpZ2F0ZUJ5VXJsKHVybDogc3RyaW5nLCBfc2tpcExvY2F0aW9uQ2hhbmdlOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50TmF2aWdhdGlvbiA9IHRoaXMuX2N1cnJlbnROYXZpZ2F0aW9uLnRoZW4oKF8pID0+IHtcbiAgICAgIHRoaXMubGFzdE5hdmlnYXRpb25BdHRlbXB0ID0gdXJsO1xuICAgICAgdGhpcy5fc3RhcnROYXZpZ2F0aW5nKCk7XG4gICAgICByZXR1cm4gdGhpcy5fYWZ0ZXJQcm9taXNlRmluaXNoTmF2aWdhdGluZyh0aGlzLnJlY29nbml6ZSh1cmwpLnRoZW4oKGluc3RydWN0aW9uKSA9PiB7XG4gICAgICAgIGlmIChpc0JsYW5rKGluc3RydWN0aW9uKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbmF2aWdhdGUoaW5zdHJ1Y3Rpb24sIF9za2lwTG9jYXRpb25DaGFuZ2UpO1xuICAgICAgfSkpO1xuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogTmF2aWdhdGUgdmlhIHRoZSBwcm92aWRlZCBpbnN0cnVjdGlvbi4gUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIG5hdmlnYXRpb24gaXNcbiAgICogY29tcGxldGUuXG4gICAqL1xuICBuYXZpZ2F0ZUJ5SW5zdHJ1Y3Rpb24oaW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3NraXBMb2NhdGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAoaXNCbGFuayhpbnN0cnVjdGlvbikpIHtcbiAgICAgIHJldHVybiBfcmVzb2x2ZVRvRmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50TmF2aWdhdGlvbiA9IHRoaXMuX2N1cnJlbnROYXZpZ2F0aW9uLnRoZW4oKF8pID0+IHtcbiAgICAgIHRoaXMuX3N0YXJ0TmF2aWdhdGluZygpO1xuICAgICAgcmV0dXJuIHRoaXMuX2FmdGVyUHJvbWlzZUZpbmlzaE5hdmlnYXRpbmcodGhpcy5fbmF2aWdhdGUoaW5zdHJ1Y3Rpb24sIF9za2lwTG9jYXRpb25DaGFuZ2UpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25hdmlnYXRlKGluc3RydWN0aW9uOiBJbnN0cnVjdGlvbiwgX3NraXBMb2NhdGlvbkNoYW5nZTogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NldHRsZUluc3RydWN0aW9uKGluc3RydWN0aW9uKVxuICAgICAgICAudGhlbigoXykgPT4gdGhpcy5fcm91dGVyQ2FuUmV1c2UoaW5zdHJ1Y3Rpb24pKVxuICAgICAgICAudGhlbigoXykgPT4gdGhpcy5fY2FuQWN0aXZhdGUoaW5zdHJ1Y3Rpb24pKVxuICAgICAgICAudGhlbigocmVzdWx0OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3JvdXRlckNhbkRlYWN0aXZhdGUoaW5zdHJ1Y3Rpb24pXG4gICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb21taXQoaW5zdHJ1Y3Rpb24sIF9za2lwTG9jYXRpb25DaGFuZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKF8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VtaXROYXZpZ2F0aW9uRmluaXNoKGluc3RydWN0aW9uLnRvUm9vdFVybCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2V0dGxlSW5zdHJ1Y3Rpb24oaW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gaW5zdHJ1Y3Rpb24ucmVzb2x2ZUNvbXBvbmVudCgpLnRoZW4oKF8pID0+IHtcbiAgICAgIHZhciB1bnNldHRsZWRJbnN0cnVjdGlvbnM6IEFycmF5PFByb21pc2U8YW55Pj4gPSBbXTtcblxuICAgICAgaWYgKGlzUHJlc2VudChpbnN0cnVjdGlvbi5jb21wb25lbnQpKSB7XG4gICAgICAgIGluc3RydWN0aW9uLmNvbXBvbmVudC5yZXVzZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNQcmVzZW50KGluc3RydWN0aW9uLmNoaWxkKSkge1xuICAgICAgICB1bnNldHRsZWRJbnN0cnVjdGlvbnMucHVzaCh0aGlzLl9zZXR0bGVJbnN0cnVjdGlvbihpbnN0cnVjdGlvbi5jaGlsZCkpO1xuICAgICAgfVxuXG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goaW5zdHJ1Y3Rpb24uYXV4SW5zdHJ1Y3Rpb24sIChpbnN0cnVjdGlvbiwgXykgPT4ge1xuICAgICAgICB1bnNldHRsZWRJbnN0cnVjdGlvbnMucHVzaCh0aGlzLl9zZXR0bGVJbnN0cnVjdGlvbihpbnN0cnVjdGlvbikpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIuYWxsKHVuc2V0dGxlZEluc3RydWN0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9lbWl0TmF2aWdhdGlvbkZpbmlzaCh1cmwpOiB2b2lkIHsgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQodGhpcy5fc3ViamVjdCwgdXJsKTsgfVxuXG4gIHByaXZhdGUgX2FmdGVyUHJvbWlzZUZpbmlzaE5hdmlnYXRpbmcocHJvbWlzZTogUHJvbWlzZTxhbnk+KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIuY2F0Y2hFcnJvcihwcm9taXNlLnRoZW4oKF8pID0+IHRoaXMuX2ZpbmlzaE5hdmlnYXRpbmcoKSksIChlcnIpID0+IHtcbiAgICAgIHRoaXMuX2ZpbmlzaE5hdmlnYXRpbmcoKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIFJlY3Vyc2l2ZWx5IHNldCByZXVzZSBmbGFnc1xuICAgKi9cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcm91dGVyQ2FuUmV1c2UoaW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAoaXNCbGFuayh0aGlzLl9vdXRsZXQpKSB7XG4gICAgICByZXR1cm4gX3Jlc29sdmVUb0ZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXNCbGFuayhpbnN0cnVjdGlvbi5jb21wb25lbnQpKSB7XG4gICAgICByZXR1cm4gX3Jlc29sdmVUb1RydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9vdXRsZXQucm91dGVyQ2FuUmV1c2UoaW5zdHJ1Y3Rpb24uY29tcG9uZW50KVxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgaW5zdHJ1Y3Rpb24uY29tcG9uZW50LnJldXNlID0gcmVzdWx0O1xuICAgICAgICAgIGlmIChyZXN1bHQgJiYgaXNQcmVzZW50KHRoaXMuX2NoaWxkUm91dGVyKSAmJiBpc1ByZXNlbnQoaW5zdHJ1Y3Rpb24uY2hpbGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRSb3V0ZXIuX3JvdXRlckNhblJldXNlKGluc3RydWN0aW9uLmNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2FuQWN0aXZhdGUobmV4dEluc3RydWN0aW9uOiBJbnN0cnVjdGlvbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBjYW5BY3RpdmF0ZU9uZShuZXh0SW5zdHJ1Y3Rpb24sIHRoaXMuX2N1cnJlbnRJbnN0cnVjdGlvbik7XG4gIH1cblxuICBwcml2YXRlIF9yb3V0ZXJDYW5EZWFjdGl2YXRlKGluc3RydWN0aW9uOiBJbnN0cnVjdGlvbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmIChpc0JsYW5rKHRoaXMuX291dGxldCkpIHtcbiAgICAgIHJldHVybiBfcmVzb2x2ZVRvVHJ1ZTtcbiAgICB9XG4gICAgdmFyIG5leHQ6IFByb21pc2U8Ym9vbGVhbj47XG4gICAgdmFyIGNoaWxkSW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uID0gbnVsbDtcbiAgICB2YXIgcmV1c2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB2YXIgY29tcG9uZW50SW5zdHJ1Y3Rpb246IENvbXBvbmVudEluc3RydWN0aW9uID0gbnVsbDtcbiAgICBpZiAoaXNQcmVzZW50KGluc3RydWN0aW9uKSkge1xuICAgICAgY2hpbGRJbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uLmNoaWxkO1xuICAgICAgY29tcG9uZW50SW5zdHJ1Y3Rpb24gPSBpbnN0cnVjdGlvbi5jb21wb25lbnQ7XG4gICAgICByZXVzZSA9IGlzQmxhbmsoaW5zdHJ1Y3Rpb24uY29tcG9uZW50KSB8fCBpbnN0cnVjdGlvbi5jb21wb25lbnQucmV1c2U7XG4gICAgfVxuICAgIGlmIChyZXVzZSkge1xuICAgICAgbmV4dCA9IF9yZXNvbHZlVG9UcnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0ID0gdGhpcy5fb3V0bGV0LnJvdXRlckNhbkRlYWN0aXZhdGUoY29tcG9uZW50SW5zdHJ1Y3Rpb24pO1xuICAgIH1cbiAgICAvLyBUT0RPOiBhdXggcm91dGUgbGlmZWN5Y2xlIGhvb2tzXG4gICAgcmV0dXJuIG5leHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICBpZiAocmVzdWx0ID09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5fY2hpbGRSb3V0ZXIpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZFJvdXRlci5fcm91dGVyQ2FuRGVhY3RpdmF0ZShjaGlsZEluc3RydWN0aW9uKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhpcyByb3V0ZXIgYW5kIGFsbCBkZXNjZW5kYW50IHJvdXRlcnMgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBpbnN0cnVjdGlvblxuICAgKi9cbiAgY29tbWl0KGluc3RydWN0aW9uOiBJbnN0cnVjdGlvbiwgX3NraXBMb2NhdGlvbkNoYW5nZTogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0aGlzLl9jdXJyZW50SW5zdHJ1Y3Rpb24gPSBpbnN0cnVjdGlvbjtcblxuICAgIHZhciBuZXh0OiBQcm9taXNlPGFueT4gPSBfcmVzb2x2ZVRvVHJ1ZTtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX291dGxldCkgJiYgaXNQcmVzZW50KGluc3RydWN0aW9uLmNvbXBvbmVudCkpIHtcbiAgICAgIHZhciBjb21wb25lbnRJbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uLmNvbXBvbmVudDtcbiAgICAgIGlmIChjb21wb25lbnRJbnN0cnVjdGlvbi5yZXVzZSkge1xuICAgICAgICBuZXh0ID0gdGhpcy5fb3V0bGV0LnJldXNlKGNvbXBvbmVudEluc3RydWN0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHQgPVxuICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlKGluc3RydWN0aW9uKS50aGVuKChfKSA9PiB0aGlzLl9vdXRsZXQuYWN0aXZhdGUoY29tcG9uZW50SW5zdHJ1Y3Rpb24pKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ByZXNlbnQoaW5zdHJ1Y3Rpb24uY2hpbGQpKSB7XG4gICAgICAgIG5leHQgPSBuZXh0LnRoZW4oKF8pID0+IHtcbiAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuX2NoaWxkUm91dGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkUm91dGVyLmNvbW1pdChpbnN0cnVjdGlvbi5jaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJvbWlzZXMgPSBbXTtcbiAgICB0aGlzLl9hdXhSb3V0ZXJzLmZvckVhY2goKHJvdXRlciwgbmFtZSkgPT4ge1xuICAgICAgaWYgKGlzUHJlc2VudChpbnN0cnVjdGlvbi5hdXhJbnN0cnVjdGlvbltuYW1lXSkpIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChyb3V0ZXIuY29tbWl0KGluc3RydWN0aW9uLmF1eEluc3RydWN0aW9uW25hbWVdKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV4dC50aGVuKChfKSA9PiBQcm9taXNlV3JhcHBlci5hbGwocHJvbWlzZXMpKTtcbiAgfVxuXG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RhcnROYXZpZ2F0aW5nKCk6IHZvaWQgeyB0aGlzLm5hdmlnYXRpbmcgPSB0cnVlOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluaXNoTmF2aWdhdGluZygpOiB2b2lkIHsgdGhpcy5uYXZpZ2F0aW5nID0gZmFsc2U7IH1cblxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gVVJMIHVwZGF0ZXMgZnJvbSB0aGUgcm91dGVyXG4gICAqL1xuICBzdWJzY3JpYmUob25OZXh0OiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IE9iamVjdCB7XG4gICAgcmV0dXJuIE9ic2VydmFibGVXcmFwcGVyLnN1YnNjcmliZSh0aGlzLl9zdWJqZWN0LCBvbk5leHQpO1xuICB9XG5cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY29udGVudHMgb2YgdGhpcyByb3V0ZXIncyBvdXRsZXQgYW5kIGFsbCBkZXNjZW5kYW50IG91dGxldHNcbiAgICovXG4gIGRlYWN0aXZhdGUoaW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uKTogUHJvbWlzZTxhbnk+IHtcbiAgICB2YXIgY2hpbGRJbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24gPSBudWxsO1xuICAgIHZhciBjb21wb25lbnRJbnN0cnVjdGlvbjogQ29tcG9uZW50SW5zdHJ1Y3Rpb24gPSBudWxsO1xuICAgIGlmIChpc1ByZXNlbnQoaW5zdHJ1Y3Rpb24pKSB7XG4gICAgICBjaGlsZEluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb24uY2hpbGQ7XG4gICAgICBjb21wb25lbnRJbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uLmNvbXBvbmVudDtcbiAgICB9XG4gICAgdmFyIG5leHQ6IFByb21pc2U8YW55PiA9IF9yZXNvbHZlVG9UcnVlO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fY2hpbGRSb3V0ZXIpKSB7XG4gICAgICBuZXh0ID0gdGhpcy5fY2hpbGRSb3V0ZXIuZGVhY3RpdmF0ZShjaGlsZEluc3RydWN0aW9uKTtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9vdXRsZXQpKSB7XG4gICAgICBuZXh0ID0gbmV4dC50aGVuKChfKSA9PiB0aGlzLl9vdXRsZXQuZGVhY3RpdmF0ZShjb21wb25lbnRJbnN0cnVjdGlvbikpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGhhbmRsZSBhdXggcm91dGVzXG5cbiAgICByZXR1cm4gbmV4dDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgVVJMLCByZXR1cm5zIGFuIGluc3RydWN0aW9uIHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50IGdyYXBoXG4gICAqL1xuICByZWNvZ25pemUodXJsOiBzdHJpbmcpOiBQcm9taXNlPEluc3RydWN0aW9uPiB7XG4gICAgdmFyIGFuY2VzdG9yQ29tcG9uZW50cyA9IHRoaXMuX2dldEFuY2VzdG9ySW5zdHJ1Y3Rpb25zKCk7XG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cnkucmVjb2duaXplKHVybCwgYW5jZXN0b3JDb21wb25lbnRzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEFuY2VzdG9ySW5zdHJ1Y3Rpb25zKCk6IEluc3RydWN0aW9uW10ge1xuICAgIHZhciBhbmNlc3Rvckluc3RydWN0aW9ucyA9IFt0aGlzLl9jdXJyZW50SW5zdHJ1Y3Rpb25dO1xuICAgIHZhciBhbmNlc3RvclJvdXRlcjogUm91dGVyID0gdGhpcztcbiAgICB3aGlsZSAoaXNQcmVzZW50KGFuY2VzdG9yUm91dGVyID0gYW5jZXN0b3JSb3V0ZXIucGFyZW50KSkge1xuICAgICAgYW5jZXN0b3JJbnN0cnVjdGlvbnMudW5zaGlmdChhbmNlc3RvclJvdXRlci5fY3VycmVudEluc3RydWN0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGFuY2VzdG9ySW5zdHJ1Y3Rpb25zO1xuICB9XG5cblxuICAvKipcbiAgICogTmF2aWdhdGVzIHRvIGVpdGhlciB0aGUgbGFzdCBVUkwgc3VjY2Vzc2Z1bGx5IG5hdmlnYXRlZCB0bywgb3IgdGhlIGxhc3QgVVJMIHJlcXVlc3RlZCBpZiB0aGVcbiAgICogcm91dGVyIGhhcyB5ZXQgdG8gc3VjY2Vzc2Z1bGx5IG5hdmlnYXRlLlxuICAgKi9cbiAgcmVuYXZpZ2F0ZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmIChpc0JsYW5rKHRoaXMubGFzdE5hdmlnYXRpb25BdHRlbXB0KSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnROYXZpZ2F0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZUJ5VXJsKHRoaXMubGFzdE5hdmlnYXRpb25BdHRlbXB0KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGFuIGBJbnN0cnVjdGlvbmAgYmFzZWQgb24gdGhlIHByb3ZpZGVkIFJvdXRlIExpbmsgRFNMLlxuICAgKi9cbiAgZ2VuZXJhdGUobGlua1BhcmFtczogYW55W10pOiBJbnN0cnVjdGlvbiB7XG4gICAgdmFyIGFuY2VzdG9ySW5zdHJ1Y3Rpb25zID0gdGhpcy5fZ2V0QW5jZXN0b3JJbnN0cnVjdGlvbnMoKTtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5nZW5lcmF0ZShsaW5rUGFyYW1zLCBhbmNlc3Rvckluc3RydWN0aW9ucyk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvb3RSb3V0ZXIgZXh0ZW5kcyBSb3V0ZXIge1xuICAvKiogQGludGVybmFsICovXG4gIF9sb2NhdGlvbjogTG9jYXRpb247XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2xvY2F0aW9uU3ViOiBPYmplY3Q7XG5cbiAgY29uc3RydWN0b3IocmVnaXN0cnk6IFJvdXRlUmVnaXN0cnksIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICAgICAgICAgICAgQEluamVjdChST1VURVJfUFJJTUFSWV9DT01QT05FTlQpIHByaW1hcnlDb21wb25lbnQ6IFR5cGUpIHtcbiAgICBzdXBlcihyZWdpc3RyeSwgbnVsbCwgcHJpbWFyeUNvbXBvbmVudCk7XG4gICAgdGhpcy5fbG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICB0aGlzLl9sb2NhdGlvblN1YiA9IHRoaXMuX2xvY2F0aW9uLnN1YnNjcmliZSgoY2hhbmdlKSA9PiB7XG4gICAgICAvLyB3ZSBjYWxsIHJlY29nbml6ZSBvdXJzZWx2ZXNcbiAgICAgIHRoaXMucmVjb2duaXplKGNoYW5nZVsndXJsJ10pXG4gICAgICAgICAgLnRoZW4oKGluc3RydWN0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlQnlJbnN0cnVjdGlvbihpbnN0cnVjdGlvbiwgaXNQcmVzZW50KGNoYW5nZVsncG9wJ10pKVxuICAgICAgICAgICAgICAgIC50aGVuKChfKSA9PiB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgcG9wc3RhdGUgZXZlbnQ7IG5vIG5lZWQgdG8gY2hhbmdlIHRoZSBVUkxcbiAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXNlbnQoY2hhbmdlWydwb3AnXSkgJiYgY2hhbmdlWyd0eXBlJ10gIT0gJ2hhc2hjaGFuZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHZhciBlbWl0UGF0aCA9IGluc3RydWN0aW9uLnRvVXJsUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgdmFyIGVtaXRRdWVyeSA9IGluc3RydWN0aW9uLnRvVXJsUXVlcnkoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChlbWl0UGF0aC5sZW5ndGggPiAwICYmIGVtaXRQYXRoWzBdICE9ICcvJykge1xuICAgICAgICAgICAgICAgICAgICBlbWl0UGF0aCA9ICcvJyArIGVtaXRQYXRoO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAvLyBCZWNhdXNlIHdlJ3ZlIG9wdGVkIHRvIHVzZSBBbGwgaGFzaGNoYW5nZSBldmVudHMgb2NjdXIgb3V0c2lkZSBBbmd1bGFyLlxuICAgICAgICAgICAgICAgICAgLy8gSG93ZXZlciwgYXBwcyB0aGF0IGFyZSBtaWdyYXRpbmcgbWlnaHQgaGF2ZSBoYXNoIGxpbmtzIHRoYXQgb3BlcmF0ZSBvdXRzaWRlXG4gICAgICAgICAgICAgICAgICAvLyBhbmd1bGFyIHRvIHdoaWNoIHJvdXRpbmcgbXVzdCByZXNwb25kLlxuICAgICAgICAgICAgICAgICAgLy8gVG8gc3VwcG9ydCB0aGVzZSBjYXNlcyB3aGVyZSB3ZSByZXNwb25kIHRvIGhhc2hjaGFuZ2VzIGFuZCByZWRpcmVjdCBhcyBhXG4gICAgICAgICAgICAgICAgICAvLyByZXN1bHQsIHdlIG5lZWQgdG8gcmVwbGFjZSB0aGUgdG9wIGl0ZW0gb24gdGhlIHN0YWNrLlxuICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZVsndHlwZSddID09ICdoYXNoY2hhbmdlJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdHJ1Y3Rpb24udG9Sb290VXJsKCkgIT0gdGhpcy5fbG9jYXRpb24ucGF0aCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb24ucmVwbGFjZVN0YXRlKGVtaXRQYXRoLCBlbWl0UXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbi5nbyhlbWl0UGF0aCwgZW1pdFF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVnaXN0cnkuY29uZmlnRnJvbUNvbXBvbmVudChwcmltYXJ5Q29tcG9uZW50KTtcbiAgICB0aGlzLm5hdmlnYXRlQnlVcmwobG9jYXRpb24ucGF0aCgpKTtcbiAgfVxuXG4gIGNvbW1pdChpbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24sIF9za2lwTG9jYXRpb25DaGFuZ2U6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8YW55PiB7XG4gICAgdmFyIGVtaXRQYXRoID0gaW5zdHJ1Y3Rpb24udG9VcmxQYXRoKCk7XG4gICAgdmFyIGVtaXRRdWVyeSA9IGluc3RydWN0aW9uLnRvVXJsUXVlcnkoKTtcbiAgICBpZiAoZW1pdFBhdGgubGVuZ3RoID4gMCAmJiBlbWl0UGF0aFswXSAhPSAnLycpIHtcbiAgICAgIGVtaXRQYXRoID0gJy8nICsgZW1pdFBhdGg7XG4gICAgfVxuICAgIHZhciBwcm9taXNlID0gc3VwZXIuY29tbWl0KGluc3RydWN0aW9uKTtcbiAgICBpZiAoIV9za2lwTG9jYXRpb25DaGFuZ2UpIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oKF8pID0+IHsgdGhpcy5fbG9jYXRpb24uZ28oZW1pdFBhdGgsIGVtaXRRdWVyeSk7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9sb2NhdGlvblN1YikpIHtcbiAgICAgIE9ic2VydmFibGVXcmFwcGVyLmRpc3Bvc2UodGhpcy5fbG9jYXRpb25TdWIpO1xuICAgICAgdGhpcy5fbG9jYXRpb25TdWIgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBDaGlsZFJvdXRlciBleHRlbmRzIFJvdXRlciB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudDogUm91dGVyLCBob3N0Q29tcG9uZW50KSB7XG4gICAgc3VwZXIocGFyZW50LnJlZ2lzdHJ5LCBwYXJlbnQsIGhvc3RDb21wb25lbnQpO1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB9XG5cblxuICBuYXZpZ2F0ZUJ5VXJsKHVybDogc3RyaW5nLCBfc2tpcExvY2F0aW9uQ2hhbmdlOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIERlbGVnYXRlIG5hdmlnYXRpb24gdG8gdGhlIHJvb3Qgcm91dGVyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50Lm5hdmlnYXRlQnlVcmwodXJsLCBfc2tpcExvY2F0aW9uQ2hhbmdlKTtcbiAgfVxuXG4gIG5hdmlnYXRlQnlJbnN0cnVjdGlvbihpbnN0cnVjdGlvbjogSW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBfc2tpcExvY2F0aW9uQ2hhbmdlOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIERlbGVnYXRlIG5hdmlnYXRpb24gdG8gdGhlIHJvb3Qgcm91dGVyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50Lm5hdmlnYXRlQnlJbnN0cnVjdGlvbihpbnN0cnVjdGlvbiwgX3NraXBMb2NhdGlvbkNoYW5nZSk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBjYW5BY3RpdmF0ZU9uZShuZXh0SW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkluc3RydWN0aW9uOiBJbnN0cnVjdGlvbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICB2YXIgbmV4dCA9IF9yZXNvbHZlVG9UcnVlO1xuICBpZiAoaXNCbGFuayhuZXh0SW5zdHJ1Y3Rpb24uY29tcG9uZW50KSkge1xuICAgIHJldHVybiBuZXh0O1xuICB9XG4gIGlmIChpc1ByZXNlbnQobmV4dEluc3RydWN0aW9uLmNoaWxkKSkge1xuICAgIG5leHQgPSBjYW5BY3RpdmF0ZU9uZShuZXh0SW5zdHJ1Y3Rpb24uY2hpbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJlc2VudChwcmV2SW5zdHJ1Y3Rpb24pID8gcHJldkluc3RydWN0aW9uLmNoaWxkIDogbnVsbCk7XG4gIH1cbiAgcmV0dXJuIG5leHQudGhlbigocmVzdWx0KSA9PiB7XG4gICAgaWYgKHJlc3VsdCA9PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobmV4dEluc3RydWN0aW9uLmNvbXBvbmVudC5yZXVzZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHZhciBob29rID0gZ2V0Q2FuQWN0aXZhdGVIb29rKG5leHRJbnN0cnVjdGlvbi5jb21wb25lbnQuY29tcG9uZW50VHlwZSk7XG4gICAgaWYgKGlzUHJlc2VudChob29rKSkge1xuICAgICAgcmV0dXJuIGhvb2sobmV4dEluc3RydWN0aW9uLmNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgIGlzUHJlc2VudChwcmV2SW5zdHJ1Y3Rpb24pID8gcHJldkluc3RydWN0aW9uLmNvbXBvbmVudCA6IG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG59XG4iXX0=