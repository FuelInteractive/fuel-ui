"use strict";
require('rxjs/add/operator/map');
require('rxjs/add/operator/scan');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/concat');
require('rxjs/add/operator/concatMap');
require('rxjs/add/operator/every');
require('rxjs/add/operator/mergeAll');
require('rxjs/add/observable/from');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var of_1 = require('rxjs/observable/of');
var apply_redirects_1 = require('./apply_redirects');
var create_router_state_1 = require('./create_router_state');
var create_url_tree_1 = require('./create_url_tree');
var recognize_1 = require('./recognize');
var resolve_1 = require('./resolve');
var router_outlet_map_1 = require('./router_outlet_map');
var router_state_1 = require('./router_state');
var shared_1 = require('./shared');
var url_tree_1 = require('./url_tree');
var collection_1 = require('./utils/collection');
var NavigationStart = (function () {
    function NavigationStart(id, url) {
        this.id = id;
        this.url = url;
    }
    return NavigationStart;
}());
exports.NavigationStart = NavigationStart;
var NavigationEnd = (function () {
    function NavigationEnd(id, url) {
        this.id = id;
        this.url = url;
    }
    return NavigationEnd;
}());
exports.NavigationEnd = NavigationEnd;
var NavigationCancel = (function () {
    function NavigationCancel(id, url) {
        this.id = id;
        this.url = url;
    }
    return NavigationCancel;
}());
exports.NavigationCancel = NavigationCancel;
var NavigationError = (function () {
    function NavigationError(id, url, error) {
        this.id = id;
        this.url = url;
        this.error = error;
    }
    return NavigationError;
}());
exports.NavigationError = NavigationError;
var Router = (function () {
    function Router(rootComponentType, resolver, urlSerializer, outletMap, location, injector, config) {
        this.rootComponentType = rootComponentType;
        this.resolver = resolver;
        this.urlSerializer = urlSerializer;
        this.outletMap = outletMap;
        this.location = location;
        this.injector = injector;
        this.config = config;
        this.navigationId = 0;
        this.routerEvents = new Subject_1.Subject();
        this.currentUrlTree = url_tree_1.createEmptyUrlTree();
        this.currentRouterState = router_state_1.createEmptyState(this.rootComponentType);
    }
    Router.prototype.initialNavigation = function () {
        this.setUpLocationChangeListener();
        this.navigateByUrl(this.location.path());
    };
    Object.defineProperty(Router.prototype, "routerState", {
        get: function () { return this.currentRouterState; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "urlTree", {
        get: function () { return this.currentUrlTree; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "events", {
        get: function () { return this.routerEvents; },
        enumerable: true,
        configurable: true
    });
    Router.prototype.navigateByUrl = function (url) {
        var urlTree = this.urlSerializer.parse(url);
        return this.scheduleNavigation(urlTree, false);
    };
    Router.prototype.resetConfig = function (config) { this.config = config; };
    Router.prototype.dispose = function () { this.locationSubscription.unsubscribe(); };
    Router.prototype.createUrlTree = function (commands, _a) {
        var _b = _a === void 0 ? {} : _a, relativeTo = _b.relativeTo, queryParams = _b.queryParams, fragment = _b.fragment;
        var a = relativeTo ? relativeTo : this.routerState.root;
        return create_url_tree_1.createUrlTree(a, this.currentUrlTree, commands, queryParams, fragment);
    };
    Router.prototype.navigate = function (commands, extras) {
        if (extras === void 0) { extras = {}; }
        return this.scheduleNavigation(this.createUrlTree(commands, extras), false);
    };
    Router.prototype.serializeUrl = function (url) { return this.urlSerializer.serialize(url); };
    Router.prototype.parseUrl = function (url) { return this.urlSerializer.parse(url); };
    Router.prototype.scheduleNavigation = function (url, pop) {
        var _this = this;
        var id = ++this.navigationId;
        this.routerEvents.next(new NavigationStart(id, url));
        return Promise.resolve().then(function (_) { return _this.runNavigate(url, false, id); });
    };
    Router.prototype.setUpLocationChangeListener = function () {
        var _this = this;
        this.locationSubscription = this.location.subscribe(function (change) {
            return _this.scheduleNavigation(_this.urlSerializer.parse(change['url']), change['pop']);
        });
    };
    Router.prototype.runNavigate = function (url, pop, id) {
        var _this = this;
        if (id !== this.navigationId) {
            this.location.go(this.urlSerializer.serialize(this.currentUrlTree));
            this.routerEvents.next(new NavigationCancel(id, url));
            return Promise.resolve(false);
        }
        return new Promise(function (resolvePromise, rejectPromise) {
            var updatedUrl;
            var state;
            apply_redirects_1.applyRedirects(url, _this.config)
                .mergeMap(function (u) {
                updatedUrl = u;
                return recognize_1.recognize(_this.rootComponentType, _this.config, updatedUrl);
            })
                .mergeMap(function (newRouterStateSnapshot) {
                return resolve_1.resolve(_this.resolver, newRouterStateSnapshot);
            })
                .map(function (routerStateSnapshot) {
                return create_router_state_1.createRouterState(routerStateSnapshot, _this.currentRouterState);
            })
                .map(function (newState) {
                state = newState;
            })
                .mergeMap(function (_) {
                return new GuardChecks(state.snapshot, _this.currentRouterState.snapshot, _this.injector)
                    .check(_this.outletMap);
            })
                .forEach(function (shouldActivate) {
                if (!shouldActivate || id !== _this.navigationId) {
                    _this.location.go(_this.urlSerializer.serialize(_this.currentUrlTree));
                    _this.routerEvents.next(new NavigationCancel(id, url));
                    return Promise.resolve(false);
                }
                new ActivateRoutes(state, _this.currentRouterState).activate(_this.outletMap);
                _this.currentUrlTree = url;
                _this.currentRouterState = state;
                if (!pop) {
                    _this.location.go(_this.urlSerializer.serialize(updatedUrl));
                }
            })
                .then(function () {
                _this.routerEvents.next(new NavigationEnd(id, url));
                resolvePromise(true);
            }, function (e) {
                _this.routerEvents.next(new NavigationError(id, url, e));
                rejectPromise(e);
            });
        });
    };
    return Router;
}());
exports.Router = Router;
var CanActivate = (function () {
    function CanActivate(route) {
        this.route = route;
    }
    return CanActivate;
}());
var CanDeactivate = (function () {
    function CanDeactivate(component, route) {
        this.component = component;
        this.route = route;
    }
    return CanDeactivate;
}());
var GuardChecks = (function () {
    function GuardChecks(future, curr, injector) {
        this.future = future;
        this.curr = curr;
        this.injector = injector;
        this.checks = [];
    }
    GuardChecks.prototype.check = function (parentOutletMap) {
        var _this = this;
        var futureRoot = this.future._root;
        var currRoot = this.curr ? this.curr._root : null;
        this.traverseChildRoutes(futureRoot, currRoot, parentOutletMap);
        if (this.checks.length === 0)
            return of_1.of(true);
        return Observable_1.Observable.from(this.checks)
            .map(function (s) {
            if (s instanceof CanActivate) {
                return _this.runCanActivate(s.route);
            }
            else if (s instanceof CanDeactivate) {
                return _this.runCanDeactivate(s.component, s.route);
            }
            else {
                throw new Error('Cannot be reached');
            }
        })
            .mergeAll()
            .every(function (result) { return result === true; });
    };
    GuardChecks.prototype.traverseChildRoutes = function (futureNode, currNode, outletMap) {
        var _this = this;
        var prevChildren = nodeChildrenAsMap(currNode);
        futureNode.children.forEach(function (c) {
            _this.traverseRoutes(c, prevChildren[c.value.outlet], outletMap);
            delete prevChildren[c.value.outlet];
        });
        collection_1.forEach(prevChildren, function (v, k) { return _this.deactivateOutletAndItChildren(v, outletMap._outlets[k]); });
    };
    GuardChecks.prototype.traverseRoutes = function (futureNode, currNode, parentOutletMap) {
        var future = futureNode.value;
        var curr = currNode ? currNode.value : null;
        var outlet = parentOutletMap ? parentOutletMap._outlets[futureNode.value.outlet] : null;
        if (curr && future._routeConfig === curr._routeConfig) {
            if (!collection_1.shallowEqual(future.params, curr.params)) {
                this.checks.push(new CanDeactivate(outlet.component, curr), new CanActivate(future));
            }
            this.traverseChildRoutes(futureNode, currNode, outlet ? outlet.outletMap : null);
        }
        else {
            this.deactivateOutletAndItChildren(curr, outlet);
            this.checks.push(new CanActivate(future));
            this.traverseChildRoutes(futureNode, null, outlet ? outlet.outletMap : null);
        }
    };
    GuardChecks.prototype.deactivateOutletAndItChildren = function (route, outlet) {
        var _this = this;
        if (outlet && outlet.isActivated) {
            collection_1.forEach(outlet.outletMap._outlets, function (v, k) { return _this.deactivateOutletAndItChildren(v.activatedRoute.snapshot, v); });
            this.checks.push(new CanDeactivate(outlet.component, route));
        }
    };
    GuardChecks.prototype.runCanActivate = function (future) {
        var _this = this;
        var canActivate = future._routeConfig ? future._routeConfig.canActivate : null;
        if (!canActivate || canActivate.length === 0)
            return of_1.of(true);
        return Observable_1.Observable.from(canActivate)
            .map(function (c) {
            var guard = _this.injector.get(c);
            if (guard.canActivate) {
                return wrapIntoObservable(guard.canActivate(future, _this.future));
            }
            else {
                return wrapIntoObservable(guard(future, _this.future));
            }
        })
            .mergeAll()
            .every(function (result) { return result === true; });
    };
    GuardChecks.prototype.runCanDeactivate = function (component, curr) {
        var _this = this;
        var canDeactivate = curr._routeConfig ? curr._routeConfig.canDeactivate : null;
        if (!canDeactivate || canDeactivate.length === 0)
            return of_1.of(true);
        return Observable_1.Observable.from(canDeactivate)
            .map(function (c) {
            var guard = _this.injector.get(c);
            if (guard.canDeactivate) {
                return wrapIntoObservable(guard.canDeactivate(component, curr, _this.curr));
            }
            else {
                return wrapIntoObservable(guard(component, curr, _this.curr));
            }
        })
            .mergeAll()
            .every(function (result) { return result === true; });
    };
    return GuardChecks;
}());
function wrapIntoObservable(value) {
    if (value instanceof Observable_1.Observable) {
        return value;
    }
    else {
        return of_1.of(value);
    }
}
var ActivateRoutes = (function () {
    function ActivateRoutes(futureState, currState) {
        this.futureState = futureState;
        this.currState = currState;
    }
    ActivateRoutes.prototype.activate = function (parentOutletMap) {
        var futureRoot = this.futureState._root;
        var currRoot = this.currState ? this.currState._root : null;
        pushQueryParamsAndFragment(this.futureState);
        this.activateChildRoutes(futureRoot, currRoot, parentOutletMap);
    };
    ActivateRoutes.prototype.activateChildRoutes = function (futureNode, currNode, outletMap) {
        var _this = this;
        var prevChildren = nodeChildrenAsMap(currNode);
        futureNode.children.forEach(function (c) {
            _this.activateRoutes(c, prevChildren[c.value.outlet], outletMap);
            delete prevChildren[c.value.outlet];
        });
        collection_1.forEach(prevChildren, function (v, k) { return _this.deactivateOutletAndItChildren(outletMap._outlets[k]); });
    };
    ActivateRoutes.prototype.activateRoutes = function (futureNode, currNode, parentOutletMap) {
        var future = futureNode.value;
        var curr = currNode ? currNode.value : null;
        var outlet = getOutlet(parentOutletMap, futureNode.value);
        if (future === curr) {
            router_state_1.advanceActivatedRoute(future);
            this.activateChildRoutes(futureNode, currNode, outlet.outletMap);
        }
        else {
            this.deactivateOutletAndItChildren(outlet);
            var outletMap = new router_outlet_map_1.RouterOutletMap();
            this.activateNewRoutes(outletMap, future, outlet);
            this.activateChildRoutes(futureNode, null, outletMap);
        }
    };
    ActivateRoutes.prototype.activateNewRoutes = function (outletMap, future, outlet) {
        var resolved = core_1.ReflectiveInjector.resolve([
            { provide: router_state_1.ActivatedRoute, useValue: future },
            { provide: router_outlet_map_1.RouterOutletMap, useValue: outletMap }
        ]);
        outlet.activate(future._futureSnapshot._resolvedComponentFactory, future, resolved, outletMap);
        router_state_1.advanceActivatedRoute(future);
    };
    ActivateRoutes.prototype.deactivateOutletAndItChildren = function (outlet) {
        var _this = this;
        if (outlet && outlet.isActivated) {
            collection_1.forEach(outlet.outletMap._outlets, function (v, k) { return _this.deactivateOutletAndItChildren(v); });
            outlet.deactivate();
        }
    };
    return ActivateRoutes;
}());
function pushQueryParamsAndFragment(state) {
    if (!collection_1.shallowEqual(state.snapshot.queryParams, state.queryParams.value)) {
        state.queryParams.next(state.snapshot.queryParams);
    }
    if (state.snapshot.fragment !== state.fragment.value) {
        state.fragment.next(state.snapshot.fragment);
    }
}
function nodeChildrenAsMap(node) {
    return node ? node.children.reduce(function (m, c) {
        m[c.value.outlet] = c;
        return m;
    }, {}) : {};
}
function getOutlet(outletMap, route) {
    var outlet = outletMap._outlets[route.outlet];
    if (!outlet) {
        if (route.outlet === shared_1.PRIMARY_OUTLET) {
            throw new Error("Cannot find primary outlet");
        }
        else {
            throw new Error("Cannot find the outlet " + route.outlet);
        }
    }
    return outlet;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsUUFBTyx1QkFBdUIsQ0FBQyxDQUFBO0FBQy9CLFFBQU8sd0JBQXdCLENBQUMsQ0FBQTtBQUNoQyxRQUFPLDRCQUE0QixDQUFDLENBQUE7QUFDcEMsUUFBTywwQkFBMEIsQ0FBQyxDQUFBO0FBQ2xDLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQUNyQyxRQUFPLHlCQUF5QixDQUFDLENBQUE7QUFDakMsUUFBTyw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3BDLFFBQU8sMEJBQTBCLENBQUMsQ0FBQTtBQUdsQyxxQkFBb0UsZUFBZSxDQUFDLENBQUE7QUFDcEYsMkJBQXlCLGlCQUFpQixDQUFDLENBQUE7QUFDM0Msd0JBQXNCLGNBQWMsQ0FBQyxDQUFBO0FBRXJDLG1CQUFrQixvQkFBb0IsQ0FBQyxDQUFBO0FBRXZDLGdDQUE2QixtQkFBbUIsQ0FBQyxDQUFBO0FBRWpELG9DQUFnQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3hELGdDQUE0QixtQkFBbUIsQ0FBQyxDQUFBO0FBRWhELDBCQUF3QixhQUFhLENBQUMsQ0FBQTtBQUN0Qyx3QkFBc0IsV0FBVyxDQUFDLENBQUE7QUFDbEMsa0NBQThCLHFCQUFxQixDQUFDLENBQUE7QUFDcEQsNkJBQWdJLGdCQUFnQixDQUFDLENBQUE7QUFDakosdUJBQXFDLFVBQVUsQ0FBQyxDQUFBO0FBRWhELHlCQUEwQyxZQUFZLENBQUMsQ0FBQTtBQUN2RCwyQkFBb0Msb0JBQW9CLENBQUMsQ0FBQTtBQVl6RDtJQUNFLHlCQUFtQixFQUFVLEVBQVMsR0FBWTtRQUEvQixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBUztJQUFHLENBQUM7SUFDeEQsc0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLHVCQUFlLGtCQUUzQixDQUFBO0FBS0Q7SUFDRSx1QkFBbUIs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QUFNLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ1osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyx1QkFBYyxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBMEIsS0FBSyxDQUFDLE1BQVEsQ0FBQyxDQUFDO1FBQzVELENBQUM7SUFDSCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9zY2FuJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWVyZ2VNYXAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jb25jYXQnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jb25jYXRNYXAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9ldmVyeSc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21lcmdlQWxsJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9mcm9tJztcblxuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q29tcG9uZW50UmVzb2x2ZXIsIEluamVjdG9yLCBSZWZsZWN0aXZlSW5qZWN0b3IsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7b2YgfSBmcm9tICdyeGpzL29ic2VydmFibGUvb2YnO1xuXG5pbXBvcnQge2FwcGx5UmVkaXJlY3RzfSBmcm9tICcuL2FwcGx5X3JlZGlyZWN0cyc7XG5pbXBvcnQge1JvdXRlckNvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtjcmVhdGVSb3V0ZXJTdGF0ZX0gZnJvbSAnLi9jcmVhdGVfcm91dGVyX3N0YXRlJztcbmltcG9ydCB7Y3JlYXRlVXJsVHJlZX0gZnJvbSAnLi9jcmVhdGVfdXJsX3RyZWUnO1xuaW1wb3J0IHtSb3V0ZXJPdXRsZXR9IGZyb20gJy4vZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0JztcbmltcG9ydCB7cmVjb2duaXplfSBmcm9tICcuL3JlY29nbml6ZSc7XG5pbXBvcnQge3Jlc29sdmV9IGZyb20gJy4vcmVzb2x2ZSc7XG5pbXBvcnQge1JvdXRlck91dGxldE1hcH0gZnJvbSAnLi9yb3V0ZXJfb3V0bGV0X21hcCc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZSwgUm91dGVyU3RhdGVTbmFwc2hvdCwgYWR2YW5jZUFjdGl2YXRlZFJvdXRlLCBjcmVhdGVFbXB0eVN0YXRlfSBmcm9tICcuL3JvdXRlcl9zdGF0ZSc7XG5pbXBvcnQge1BSSU1BUllfT1VUTEVULCBQYXJhbXN9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7VXJsU2VyaWFsaXplcn0gZnJvbSAnLi91cmxfc2VyaWFsaXplcic7XG5pbXBvcnQge1VybFRyZWUsIGNyZWF0ZUVtcHR5VXJsVHJlZX0gZnJvbSAnLi91cmxfdHJlZSc7XG5pbXBvcnQge2ZvckVhY2gsIHNoYWxsb3dFcXVhbH0gZnJvbSAnLi91dGlscy9jb2xsZWN0aW9uJztcbmltcG9ydCB7VHJlZU5vZGV9IGZyb20gJy4vdXRpbHMvdHJlZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmF2aWdhdGlvbkV4dHJhcyB7XG4gIHJlbGF0aXZlVG8/OiBBY3RpdmF0ZWRSb3V0ZTtcbiAgcXVlcnlQYXJhbXM/OiBQYXJhbXM7XG4gIGZyYWdtZW50Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFuIGV2ZW50IHRyaWdnZXJlZCB3aGVuIGEgbmF2aWdhdGlvbiBzdGFydHNcbiAqL1xuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TdGFydCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogbnVtYmVyLCBwdWJsaWMgdXJsOiBVcmxUcmVlKSB7fVxufVxuXG4vKipcbiAqIEFuIGV2ZW50IHRyaWdnZXJlZCB3aGVuIGEgbmF2aWdhdGlvbiBlbmRzIHN1Y2Nlc3NmdWxseVxuICovXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkVuZCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogbnVtYmVyLCBwdWJsaWMgdXJsOiBVcmxUcmVlKSB7fVxufVxuXG4vKipcbiAqIEFuIGV2ZW50IHRyaWdnZXJlZCB3aGVuIGEgbmF2aWdhdGlvbiBpcyBjYW5jZWxlZFxuICovXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkNhbmNlbCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogbnVtYmVyLCBwdWJsaWMgdXJsOiBVcmxUcmVlKSB7fVxufVxuXG4vKipcbiAqIEFuIGV2ZW50IHRyaWdnZXJlZCB3aGVuIGEgbmF2aWdhdGlvbiBmYWlscyBkdWUgdG8gdW5leHBlY3RlZCBlcnJvclxuICovXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkVycm9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIGlkOiBudW1iZXIsIHB1YmxpYyB1cmw6IFVybFRyZWUsIHB1YmxpYyBlcnJvcjogYW55KSB7fVxufVxuXG5leHBvcnQgdHlwZSBFdmVudCA9IE5hdmlnYXRpb25TdGFydCB8IE5hdmlnYXRpb25FbmQgfCBOYXZpZ2F0aW9uQ2FuY2VsIHwgTmF2aWdhdGlvbkVycm9yO1xuXG4vKipcbiAqIFRoZSBgUm91dGVyYCBpcyByZXNwb25zaWJsZSBmb3IgbWFwcGluZyBVUkxzIHRvIGNvbXBvbmVudHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSb3V0ZXIge1xuICBwcml2YXRlIGN1cnJlbnRVcmxUcmVlOiBVcmxUcmVlO1xuICBwcml2YXRlIGN1cnJlbnRSb3V0ZXJTdGF0ZTogUm91dGVyU3RhdGU7XG4gIHByaXZhdGUgbG9jYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSByb3V0ZXJFdmVudHM6IFN1YmplY3Q8RXZlbnQ+O1xuICBwcml2YXRlIG5hdmlnYXRpb25JZDogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcm9vdENvbXBvbmVudFR5cGU6IFR5cGUsIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLFxuICAgICAgcHJpdmF0ZSB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLCBwcml2YXRlIG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwLFxuICAgICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIGNvbmZpZzogUm91dGVyQ29uZmlnKSB7XG4gICAgdGhpcy5yb3V0ZXJFdmVudHMgPSBuZXcgU3ViamVjdDxFdmVudD4oKTtcbiAgICB0aGlzLmN1cnJlbnRVcmxUcmVlID0gY3JlYXRlRW1wdHlVcmxUcmVlKCk7XG4gICAgdGhpcy5jdXJyZW50Um91dGVyU3RhdGUgPSBjcmVhdGVFbXB0eVN0YXRlKHRoaXMucm9vdENvbXBvbmVudFR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgaW5pdGlhbE5hdmlnYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5zZXRVcExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIoKTtcbiAgICB0aGlzLm5hdmlnYXRlQnlVcmwodGhpcy5sb2NhdGlvbi5wYXRoKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgcm91dGUgc3RhdGUuXG4gICAqL1xuICBnZXQgcm91dGVyU3RhdGUoKTogUm91dGVyU3RhdGUgeyByZXR1cm4gdGhpcy5jdXJyZW50Um91dGVyU3RhdGU7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCB1cmwgdHJlZS5cbiAgICovXG4gIGdldCB1cmxUcmVlKCk6IFVybFRyZWUgeyByZXR1cm4gdGhpcy5jdXJyZW50VXJsVHJlZTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgb2Ygcm91dGUgZXZlbnRzXG4gICAqL1xuICBnZXQgZXZlbnRzKCk6IE9ic2VydmFibGU8RXZlbnQ+IHsgcmV0dXJuIHRoaXMucm91dGVyRXZlbnRzOyB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCB1cmwuIFRoaXMgbmF2aWdhdGlvbiBpcyBhbHdheXMgYWJzb2x1dGUuXG4gICAqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQ6XG4gICAqIC0gaXMgcmVzb2x2ZWQgd2l0aCAndHJ1ZScgd2hlbiBuYXZpZ2F0aW9uIHN1Y2NlZWRzXG4gICAqIC0gaXMgcmVzb2x2ZWQgd2l0aCAnZmFsc2UnIHdoZW4gbmF2aWdhdGlvbiBmYWlsc1xuICAgKiAtIGlzIHJlamVjdGVkIHdoZW4gYW4gZXJyb3IgaGFwcGVuc1xuICAgKlxuICAgKiAjIyMgVXNhZ2VcbiAgICpcbiAgICogYGBgXG4gICAqIHJvdXRlci5uYXZpZ2F0ZUJ5VXJsKFwiL3RlYW0vMzMvdXNlci8xMVwiKTtcbiAgICogYGBgXG4gICAqL1xuICBuYXZpZ2F0ZUJ5VXJsKHVybDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgdXJsVHJlZSA9IHRoaXMudXJsU2VyaWFsaXplci5wYXJzZSh1cmwpO1xuICAgIHJldHVybiB0aGlzLnNjaGVkdWxlTmF2aWdhdGlvbih1cmxUcmVlLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBjb25maWd1cmF0aW9uIHVzZWQgZm9yIG5hdmlnYXRpb24gYW5kIGdlbmVyYXRpbmcgbGlua3MuXG4gICAqXG4gICAqICMjIyBVc2FnZVxuICAgKlxuICAgKiBgYGBcbiAgICogcm91dGVyLnJlc2V0Q29uZmlnKFtcbiAgICogIHsgcGF0aDogJ3RlYW0vOmlkJywgY29tcG9uZW50OiBUZWFtQ21wLCBjaGlsZHJlbjogW1xuICAgKiAgICB7IHBhdGg6ICdzaW1wbGUnLCBjb21wb25lbnQ6IFNpbXBsZUNtcCB9LFxuICAgKiAgICB7IHBhdGg6ICd1c2VyLzpuYW1lJywgY29tcG9uZW50OiBVc2VyQ21wIH1cbiAgICogIF0gfVxuICAgKiBdKTtcbiAgICogYGBgXG4gICAqL1xuICByZXNldENvbmZpZyhjb25maWc6IFJvdXRlckNvbmZpZyk6IHZvaWQgeyB0aGlzLmNvbmZpZyA9IGNvbmZpZzsgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGRpc3Bvc2UoKTogdm9pZCB7IHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTsgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGFuIGFycmF5IG9mIGNvbW1hbmRzIHRvIHRoZSBjdXJyZW50IHVybCB0cmVlIGFuZCBjcmVhdGVzXG4gICAqIGEgbmV3IHVybCB0cmVlLlxuICAgKlxuICAgKiBXaGVuIGdpdmVuIGFuIGFjdGl2YXRlIHJvdXRlLCBhcHBsaWVzIHRoZSBnaXZlbiBjb21tYW5kcyBzdGFydGluZyBmcm9tIHRoZSByb3V0ZS5cbiAgICogV2hlbiBub3QgZ2l2ZW4gYSByb3V0ZSwgYXBwbGllcyB0aGUgZ2l2ZW4gY29tbWFuZCBzdGFydGluZyBmcm9tIHRoZSByb290LlxuICAgKlxuICAgKiAjIyMgVXNhZ2VcbiAgICpcbiAgICogYGBgXG4gICAqIC8vIGNyZWF0ZSAvdGVhbS8zMy91c2VyLzExXG4gICAqIHJvdXRlci5jcmVhdGVVcmxUcmVlKFsnL3RlYW0nLCAzMywgJ3VzZXInLCAxMV0pO1xuICAgKlxuICAgKiAvLyBjcmVhdGUgL3RlYW0vMzM7ZXhwYW5kPXRydWUvdXNlci8xMVxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy90ZWFtJywgMzMsIHtleHBhbmQ6IHRydWV9LCAndXNlcicsIDExXSk7XG4gICAqXG4gICAqIC8vIHlvdSBjYW4gY29sbGFwc2Ugc3RhdGljIGZyYWdtZW50cyBsaWtlIHRoaXNcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWycvdGVhbS8zMy91c2VyJywgdXNlcklkXSk7XG4gICAqXG4gICAqIC8vIGFzc3VtaW5nIHRoZSBjdXJyZW50IHVybCBpcyBgL3RlYW0vMzMvdXNlci8xMWAgYW5kIHRoZSByb3V0ZSBwb2ludHMgdG8gYHVzZXIvMTFgXG4gICAqXG4gICAqIC8vIG5hdmlnYXRlIHRvIC90ZWFtLzMzL3VzZXIvMTEvZGV0YWlsc1xuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJ2RldGFpbHMnXSwge3JlbGF0aXZlVG86IHJvdXRlfSk7XG4gICAqXG4gICAqIC8vIG5hdmlnYXRlIHRvIC90ZWFtLzMzL3VzZXIvMjJcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWycuLi8yMiddLCB7cmVsYXRpdmVUbzogcm91dGV9KTtcbiAgICpcbiAgICogLy8gbmF2aWdhdGUgdG8gL3RlYW0vNDQvdXNlci8yMlxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy4uLy4uL3RlYW0vNDQvdXNlci8yMiddLCB7cmVsYXRpdmVUbzogcm91dGV9KTtcbiAgICogYGBgXG4gICAqL1xuICBjcmVhdGVVcmxUcmVlKGNvbW1hbmRzOiBhbnlbXSwge3JlbGF0aXZlVG8sIHF1ZXJ5UGFyYW1zLCBmcmFnbWVudH06IE5hdmlnYXRpb25FeHRyYXMgPSB7fSk6XG4gICAgICBVcmxUcmVlIHtcbiAgICBjb25zdCBhID0gcmVsYXRpdmVUbyA/IHJlbGF0aXZlVG8gOiB0aGlzLnJvdXRlclN0YXRlLnJvb3Q7XG4gICAgcmV0dXJuIGNyZWF0ZVVybFRyZWUoYSwgdGhpcy5jdXJyZW50VXJsVHJlZSwgY29tbWFuZHMsIHF1ZXJ5UGFyYW1zLCBmcmFnbWVudCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgYXJyYXkgb2YgY29tbWFuZHMgYW5kIGEgc3RhcnRpbmcgcG9pbnQuXG4gICAqIElmIG5vIHN0YXJ0aW5nIHJvdXRlIGlzIHByb3ZpZGVkLCB0aGUgbmF2aWdhdGlvbiBpcyBhYnNvbHV0ZS5cbiAgICpcbiAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdDpcbiAgICogLSBpcyByZXNvbHZlZCB3aXRoICd0cnVlJyB3aGVuIG5hdmlnYXRpb24gc3VjY2VlZHNcbiAgICogLSBpcyByZXNvbHZlZCB3aXRoICdmYWxzZScgd2hlbiBuYXZpZ2F0aW9uIGZhaWxzXG4gICAqIC0gaXMgcmVqZWN0ZWQgd2hlbiBhbiBlcnJvciBoYXBwZW5zXG4gICAqXG4gICAqICMjIyBVc2FnZVxuICAgKlxuICAgKiBgYGBcbiAgICogcm91dGVyLm5hdmlnYXRlKFsndGVhbScsIDMzLCAndGVhbScsICcxMV0sIHtyZWxhdGl2ZVRvOiByb3V0ZX0pO1xuICAgKiBgYGBcbiAgICovXG4gIG5hdmlnYXRlKGNvbW1hbmRzOiBhbnlbXSwgZXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge30pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zY2hlZHVsZU5hdmlnYXRpb24odGhpcy5jcmVhdGVVcmxUcmVlKGNvbW1hbmRzLCBleHRyYXMpLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplcyBhIHtAbGluayBVcmxUcmVlfSBpbnRvIGEgc3RyaW5nLlxuICAgKi9cbiAgc2VyaWFsaXplVXJsKHVybDogVXJsVHJlZSk6IHN0cmluZyB7IHJldHVybiB0aGlzLnVybFNlcmlhbGl6ZXIuc2VyaWFsaXplKHVybCk7IH1cblxuICAvKipcbiAgICogUGFyc2UgYSBzdHJpbmcgaW50byBhIHtAbGluayBVcmxUcmVlfS5cbiAgICovXG4gIHBhcnNlVXJsKHVybDogc3RyaW5nKTogVXJsVHJlZSB7IHJldHVybiB0aGlzLnVybFNlcmlhbGl6ZXIucGFyc2UodXJsKTsgfVxuXG4gIHByaXZhdGUgc2NoZWR1bGVOYXZpZ2F0aW9uKHVybDogVXJsVHJlZSwgcG9wOiBib29sZWFuKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgaWQgPSArK3RoaXMubmF2aWdhdGlvbklkO1xuICAgIHRoaXMucm91dGVyRXZlbnRzLm5leHQobmV3IE5hdmlnYXRpb25TdGFydChpZCwgdXJsKSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKF8pID0+IHRoaXMucnVuTmF2aWdhdGUodXJsLCBmYWxzZSwgaWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VXBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKCk6IHZvaWQge1xuICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24gPSA8YW55PnRoaXMubG9jYXRpb24uc3Vic2NyaWJlKChjaGFuZ2UpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnNjaGVkdWxlTmF2aWdhdGlvbih0aGlzLnVybFNlcmlhbGl6ZXIucGFyc2UoY2hhbmdlWyd1cmwnXSksIGNoYW5nZVsncG9wJ10pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBydW5OYXZpZ2F0ZSh1cmw6IFVybFRyZWUsIHBvcDogYm9vbGVhbiwgaWQ6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmIChpZCAhPT0gdGhpcy5uYXZpZ2F0aW9uSWQpIHtcbiAgICAgIHRoaXMubG9jYXRpb24uZ28odGhpcy51cmxTZXJpYWxpemVyLnNlcmlhbGl6ZSh0aGlzLmN1cnJlbnRVcmxUcmVlKSk7XG4gICAgICB0aGlzLnJvdXRlckV2ZW50cy5uZXh0KG5ldyBOYXZpZ2F0aW9uQ2FuY2VsKGlkLCB1cmwpKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZVByb21pc2UsIHJlamVjdFByb21pc2UpID0+IHtcbiAgICAgIGxldCB1cGRhdGVkVXJsO1xuICAgICAgbGV0IHN0YXRlO1xuICAgICAgYXBwbHlSZWRpcmVjdHModXJsLCB0aGlzLmNvbmZpZylcbiAgICAgICAgICAubWVyZ2VNYXAodSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVkVXJsID0gdTtcbiAgICAgICAgICAgIHJldHVybiByZWNvZ25pemUodGhpcy5yb290Q29tcG9uZW50VHlwZSwgdGhpcy5jb25maWcsIHVwZGF0ZWRVcmwpO1xuICAgICAgICAgIH0pXG5cbiAgICAgICAgICAubWVyZ2VNYXAoKG5ld1JvdXRlclN0YXRlU25hcHNob3QpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMucmVzb2x2ZXIsIG5ld1JvdXRlclN0YXRlU25hcHNob3QpO1xuXG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKChyb3V0ZXJTdGF0ZVNuYXBzaG90KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlUm91dGVyU3RhdGUocm91dGVyU3RhdGVTbmFwc2hvdCwgdGhpcy5jdXJyZW50Um91dGVyU3RhdGUpO1xuXG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKChuZXdTdGF0ZTogUm91dGVyU3RhdGUpID0+IHtcbiAgICAgICAgICAgIHN0YXRlID0gbmV3U3RhdGU7XG5cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5tZXJnZU1hcChfID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgR3VhcmRDaGVja3Moc3RhdGUuc25hcHNob3QsIHRoaXMuY3VycmVudFJvdXRlclN0YXRlLnNuYXBzaG90LCB0aGlzLmluamVjdG9yKVxuICAgICAgICAgICAgICAgIC5jaGVjayh0aGlzLm91dGxldE1hcCk7XG5cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mb3JFYWNoKChzaG91bGRBY3RpdmF0ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFzaG91bGRBY3RpdmF0ZSB8fCBpZCAhPT0gdGhpcy5uYXZpZ2F0aW9uSWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5nbyh0aGlzLnVybFNlcmlhbGl6ZXIuc2VyaWFsaXplKHRoaXMuY3VycmVudFVybFRyZWUpKTtcbiAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHMubmV4dChuZXcgTmF2aWdhdGlvbkNhbmNlbChpZCwgdXJsKSk7XG4gICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXcgQWN0aXZhdGVSb3V0ZXMoc3RhdGUsIHRoaXMuY3VycmVudFJvdXRlclN0YXRlKS5hY3RpdmF0ZSh0aGlzLm91dGxldE1hcCk7XG5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudFVybFRyZWUgPSB1cmw7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRSb3V0ZXJTdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgaWYgKCFwb3ApIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5nbyh0aGlzLnVybFNlcmlhbGl6ZXIuc2VyaWFsaXplKHVwZGF0ZWRVcmwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHMubmV4dChuZXcgTmF2aWdhdGlvbkVuZChpZCwgdXJsKSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHMubmV4dChuZXcgTmF2aWdhdGlvbkVycm9yKGlkLCB1cmwsIGUpKTtcbiAgICAgICAgICAgICAgICByZWplY3RQcm9taXNlKGUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5jbGFzcyBDYW5BY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCkge31cbn1cbmNsYXNzIENhbkRlYWN0aXZhdGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50OiBPYmplY3QsIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCkge31cbn1cblxuY2xhc3MgR3VhcmRDaGVja3Mge1xuICBwcml2YXRlIGNoZWNrcyA9IFtdO1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZnV0dXJlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBwcml2YXRlIGN1cnI6IFJvdXRlclN0YXRlU25hcHNob3QsXG4gICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge31cblxuICBjaGVjayhwYXJlbnRPdXRsZXRNYXA6IFJvdXRlck91dGxldE1hcCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGZ1dHVyZVJvb3QgPSB0aGlzLmZ1dHVyZS5fcm9vdDtcbiAgICBjb25zdCBjdXJyUm9vdCA9IHRoaXMuY3VyciA/IHRoaXMuY3Vyci5fcm9vdCA6IG51bGw7XG4gICAgdGhpcy50cmF2ZXJzZUNoaWxkUm91dGVzKGZ1dHVyZVJvb3QsIGN1cnJSb290LCBwYXJlbnRPdXRsZXRNYXApO1xuICAgIGlmICh0aGlzLmNoZWNrcy5sZW5ndGggPT09IDApIHJldHVybiBvZiAodHJ1ZSk7XG4gICAgcmV0dXJuIE9ic2VydmFibGUuZnJvbSh0aGlzLmNoZWNrcylcbiAgICAgICAgLm1hcChzID0+IHtcbiAgICAgICAgICBpZiAocyBpbnN0YW5jZW9mIENhbkFjdGl2YXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ydW5DYW5BY3RpdmF0ZShzLnJvdXRlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHMgaW5zdGFuY2VvZiBDYW5EZWFjdGl2YXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ydW5DYW5EZWFjdGl2YXRlKHMuY29tcG9uZW50LCBzLnJvdXRlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYmUgcmVhY2hlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm1lcmdlQWxsKClcbiAgICAgICAgLmV2ZXJ5KHJlc3VsdCA9PiByZXN1bHQgPT09IHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmF2ZXJzZUNoaWxkUm91dGVzKFxuICAgICAgZnV0dXJlTm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4sIGN1cnJOb2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PnxudWxsLFxuICAgICAgb3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXB8bnVsbCk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZDaGlsZHJlbiA9IG5vZGVDaGlsZHJlbkFzTWFwKGN1cnJOb2RlKTtcbiAgICBmdXR1cmVOb2RlLmNoaWxkcmVuLmZvckVhY2goYyA9PiB7XG4gICAgICB0aGlzLnRyYXZlcnNlUm91dGVzKGMsIHByZXZDaGlsZHJlbltjLnZhbHVlLm91dGxldF0sIG91dGxldE1hcCk7XG4gICAgICBkZWxldGUgcHJldkNoaWxkcmVuW2MudmFsdWUub3V0bGV0XTtcbiAgICB9KTtcbiAgICBmb3JFYWNoKHByZXZDaGlsZHJlbiwgKHYsIGspID0+IHRoaXMuZGVhY3RpdmF0ZU91dGxldEFuZEl0Q2hpbGRyZW4odiwgb3V0bGV0TWFwLl9vdXRsZXRzW2tdKSk7XG4gIH1cblxuICB0cmF2ZXJzZVJvdXRlcyhcbiAgICAgIGZ1dHVyZU5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+LCBjdXJyTm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD58bnVsbCxcbiAgICAgIHBhcmVudE91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwfG51bGwpOiB2b2lkIHtcbiAgICBjb25zdCBmdXR1cmUgPSBmdXR1cmVOb2RlLnZhbHVlO1xuICAgIGNvbnN0IGN1cnIgPSBjdXJyTm9kZSA/IGN1cnJOb2RlLnZhbHVlIDogbnVsbDtcbiAgICBjb25zdCBvdXRsZXQgPSBwYXJlbnRPdXRsZXRNYXAgPyBwYXJlbnRPdXRsZXRNYXAuX291dGxldHNbZnV0dXJlTm9kZS52YWx1ZS5vdXRsZXRdIDogbnVsbDtcblxuICAgIGlmIChjdXJyICYmIGZ1dHVyZS5fcm91dGVDb25maWcgPT09IGN1cnIuX3JvdXRlQ29uZmlnKSB7XG4gICAgICBpZiAoIXNoYWxsb3dFcXVhbChmdXR1cmUucGFyYW1zLCBjdXJyLnBhcmFtcykpIHtcbiAgICAgICAgdGhpcy5jaGVja3MucHVzaChuZXcgQ2FuRGVhY3RpdmF0ZShvdXRsZXQuY29tcG9uZW50LCBjdXJyKSwgbmV3IENhbkFjdGl2YXRlKGZ1dHVyZSkpO1xuICAgICAgfVxuICAgICAgdGhpcy50cmF2ZXJzZUNoaWxkUm91dGVzKGZ1dHVyZU5vZGUsIGN1cnJOb2RlLCBvdXRsZXQgPyBvdXRsZXQub3V0bGV0TWFwIDogbnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZU91dGxldEFuZEl0Q2hpbGRyZW4oY3Vyciwgb3V0bGV0KTtcbiAgICAgIHRoaXMuY2hlY2tzLnB1c2gobmV3IENhbkFjdGl2YXRlKGZ1dHVyZSkpO1xuICAgICAgdGhpcy50cmF2ZXJzZUNoaWxkUm91dGVzKGZ1dHVyZU5vZGUsIG51bGwsIG91dGxldCA/IG91dGxldC5vdXRsZXRNYXAgOiBudWxsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlYWN0aXZhdGVPdXRsZXRBbmRJdENoaWxkcmVuKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBvdXRsZXQ6IFJvdXRlck91dGxldCk6IHZvaWQge1xuICAgIGlmIChvdXRsZXQgJiYgb3V0bGV0LmlzQWN0aXZhdGVkKSB7XG4gICAgICBmb3JFYWNoKFxuICAgICAgICAgIG91dGxldC5vdXRsZXRNYXAuX291dGxldHMsXG4gICAgICAgICAgKHYsIGspID0+IHRoaXMuZGVhY3RpdmF0ZU91dGxldEFuZEl0Q2hpbGRyZW4odi5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdCwgdikpO1xuICAgICAgdGhpcy5jaGVja3MucHVzaChuZXcgQ2FuRGVhY3RpdmF0ZShvdXRsZXQuY29tcG9uZW50LCByb3V0ZSkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcnVuQ2FuQWN0aXZhdGUoZnV0dXJlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc3QgY2FuQWN0aXZhdGUgPSBmdXR1cmUuX3JvdXRlQ29uZmlnID8gZnV0dXJlLl9yb3V0ZUNvbmZpZy5jYW5BY3RpdmF0ZSA6IG51bGw7XG4gICAgaWYgKCFjYW5BY3RpdmF0ZSB8fCBjYW5BY3RpdmF0ZS5sZW5ndGggPT09IDApIHJldHVybiBvZiAodHJ1ZSk7XG4gICAgcmV0dXJuIE9ic2VydmFibGUuZnJvbShjYW5BY3RpdmF0ZSlcbiAgICAgICAgLm1hcChjID0+IHtcbiAgICAgICAgICBjb25zdCBndWFyZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KGMpO1xuICAgICAgICAgIGlmIChndWFyZC5jYW5BY3RpdmF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBJbnRvT2JzZXJ2YWJsZShndWFyZC5jYW5BY3RpdmF0ZShmdXR1cmUsIHRoaXMuZnV0dXJlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwSW50b09ic2VydmFibGUoZ3VhcmQoZnV0dXJlLCB0aGlzLmZ1dHVyZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm1lcmdlQWxsKClcbiAgICAgICAgLmV2ZXJ5KHJlc3VsdCA9PiByZXN1bHQgPT09IHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBydW5DYW5EZWFjdGl2YXRlKGNvbXBvbmVudDogT2JqZWN0LCBjdXJyOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc3QgY2FuRGVhY3RpdmF0ZSA9IGN1cnIuX3JvdXRlQ29uZmlnID8gY3Vyci5fcm91dGVDb25maWcuY2FuRGVhY3RpdmF0ZSA6IG51bGw7XG4gICAgaWYgKCFjYW5EZWFjdGl2YXRlIHx8IGNhbkRlYWN0aXZhdGUubGVuZ3RoID09PSAwKSByZXR1cm4gb2YgKHRydWUpO1xuICAgIHJldHVybiBPYnNlcnZhYmxlLmZyb20oY2FuRGVhY3RpdmF0ZSlcbiAgICAgICAgLm1hcChjID0+IHtcbiAgICAgICAgICBjb25zdCBndWFyZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KGMpO1xuICAgICAgICAgIGlmIChndWFyZC5jYW5EZWFjdGl2YXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcEludG9PYnNlcnZhYmxlKGd1YXJkLmNhbkRlYWN0aXZhdGUoY29tcG9uZW50LCBjdXJyLCB0aGlzLmN1cnIpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBJbnRvT2JzZXJ2YWJsZShndWFyZChjb21wb25lbnQsIGN1cnIsIHRoaXMuY3VycikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm1lcmdlQWxsKClcbiAgICAgICAgLmV2ZXJ5KHJlc3VsdCA9PiByZXN1bHQgPT09IHRydWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBJbnRvT2JzZXJ2YWJsZTxUPih2YWx1ZTogVCB8IE9ic2VydmFibGU8VD4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2YgKHZhbHVlKTtcbiAgfVxufVxuXG5jbGFzcyBBY3RpdmF0ZVJvdXRlcyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnV0dXJlU3RhdGU6IFJvdXRlclN0YXRlLCBwcml2YXRlIGN1cnJTdGF0ZTogUm91dGVyU3RhdGUpIHt9XG5cbiAgYWN0aXZhdGUocGFyZW50T3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXApOiB2b2lkIHtcbiAgICBjb25zdCBmdXR1cmVSb290ID0gdGhpcy5mdXR1cmVTdGF0ZS5fcm9vdDtcbiAgICBjb25zdCBjdXJyUm9vdCA9IHRoaXMuY3VyclN0YXRlID8gdGhpcy5jdXJyU3RhdGUuX3Jvb3QgOiBudWxsO1xuXG4gICAgcHVzaFF1ZXJ5UGFyYW1zQW5kRnJhZ21lbnQodGhpcy5mdXR1cmVTdGF0ZSk7XG4gICAgdGhpcy5hY3RpdmF0ZUNoaWxkUm91dGVzKGZ1dHVyZVJvb3QsIGN1cnJSb290LCBwYXJlbnRPdXRsZXRNYXApO1xuICB9XG5cbiAgcHJpdmF0ZSBhY3RpdmF0ZUNoaWxkUm91dGVzKFxuICAgICAgZnV0dXJlTm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+LCBjdXJyTm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+fG51bGwsXG4gICAgICBvdXRsZXRNYXA6IFJvdXRlck91dGxldE1hcCk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZDaGlsZHJlbiA9IG5vZGVDaGlsZHJlbkFzTWFwKGN1cnJOb2RlKTtcbiAgICBmdXR1cmVOb2RlLmNoaWxkcmVuLmZvckVhY2goYyA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRlUm91dGVzKGMsIHByZXZDaGlsZHJlbltjLnZhbHVlLm91dGxldF0sIG91dGxldE1hcCk7XG4gICAgICBkZWxldGUgcHJldkNoaWxkcmVuW2MudmFsdWUub3V0bGV0XTtcbiAgICB9KTtcbiAgICBmb3JFYWNoKHByZXZDaGlsZHJlbiwgKHYsIGspID0+IHRoaXMuZGVhY3RpdmF0ZU91dGxldEFuZEl0Q2hpbGRyZW4ob3V0bGV0TWFwLl9vdXRsZXRzW2tdKSk7XG4gIH1cblxuICBhY3RpdmF0ZVJvdXRlcyhcbiAgICAgIGZ1dHVyZU5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPiwgY3Vyck5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPnxudWxsLFxuICAgICAgcGFyZW50T3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXApOiB2b2lkIHtcbiAgICBjb25zdCBmdXR1cmUgPSBmdXR1cmVOb2RlLnZhbHVlO1xuICAgIGNvbnN0IGN1cnIgPSBjdXJyTm9kZSA/IGN1cnJOb2RlLnZhbHVlIDogbnVsbDtcbiAgICBjb25zdCBvdXRsZXQgPSBnZXRPdXRsZXQocGFyZW50T3V0bGV0TWFwLCBmdXR1cmVOb2RlLnZhbHVlKTtcblxuICAgIGlmIChmdXR1cmUgPT09IGN1cnIpIHtcbiAgICAgIGFkdmFuY2VBY3RpdmF0ZWRSb3V0ZShmdXR1cmUpO1xuICAgICAgdGhpcy5hY3RpdmF0ZUNoaWxkUm91dGVzKGZ1dHVyZU5vZGUsIGN1cnJOb2RlLCBvdXRsZXQub3V0bGV0TWFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWFjdGl2YXRlT3V0bGV0QW5kSXRDaGlsZHJlbihvdXRsZXQpO1xuICAgICAgY29uc3Qgb3V0bGV0TWFwID0gbmV3IFJvdXRlck91dGxldE1hcCgpO1xuICAgICAgdGhpcy5hY3RpdmF0ZU5ld1JvdXRlcyhvdXRsZXRNYXAsIGZ1dHVyZSwgb3V0bGV0KTtcbiAgICAgIHRoaXMuYWN0aXZhdGVDaGlsZFJvdXRlcyhmdXR1cmVOb2RlLCBudWxsLCBvdXRsZXRNYXApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWN0aXZhdGVOZXdSb3V0ZXMoXG4gICAgICBvdXRsZXRNYXA6IFJvdXRlck91dGxldE1hcCwgZnV0dXJlOiBBY3RpdmF0ZWRSb3V0ZSwgb3V0bGV0OiBSb3V0ZXJPdXRsZXQpOiB2b2lkIHtcbiAgICBjb25zdCByZXNvbHZlZCA9IFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlKFtcbiAgICAgIHtwcm92aWRlOiBBY3RpdmF0ZWRSb3V0ZSwgdXNlVmFsdWU6IGZ1dHVyZX0sXG4gICAgICB7cHJvdmlkZTogUm91dGVyT3V0bGV0TWFwLCB1c2VWYWx1ZTogb3V0bGV0TWFwfVxuICAgIF0pO1xuICAgIG91dGxldC5hY3RpdmF0ZShmdXR1cmUuX2Z1dHVyZVNuYXBzaG90Ll9yZXNvbHZlZENvbXBvbmVudEZhY3RvcnksIGZ1dHVyZSwgcmVzb2x2ZWQsIG91dGxldE1hcCk7XG4gICAgYWR2YW5jZUFjdGl2YXRlZFJvdXRlKGZ1dHVyZSk7XG4gIH1cblxuICBwcml2YXRlIGRlYWN0aXZhdGVPdXRsZXRBbmRJdENoaWxkcmVuKG91dGxldDogUm91dGVyT3V0bGV0KTogdm9pZCB7XG4gICAgaWYgKG91dGxldCAmJiBvdXRsZXQuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIGZvckVhY2gob3V0bGV0Lm91dGxldE1hcC5fb3V0bGV0cywgKHYsIGspID0+IHRoaXMuZGVhY3RpdmF0ZU91dGxldEFuZEl0Q2hpbGRyZW4odikpO1xuICAgICAgb3V0bGV0LmRlYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcHVzaFF1ZXJ5UGFyYW1zQW5kRnJhZ21lbnQoc3RhdGU6IFJvdXRlclN0YXRlKTogdm9pZCB7XG4gIGlmICghc2hhbGxvd0VxdWFsKHN0YXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zLCAoPGFueT5zdGF0ZS5xdWVyeVBhcmFtcykudmFsdWUpKSB7XG4gICAgKDxhbnk+c3RhdGUucXVlcnlQYXJhbXMpLm5leHQoc3RhdGUuc25hcHNob3QucXVlcnlQYXJhbXMpO1xuICB9XG5cbiAgaWYgKHN0YXRlLnNuYXBzaG90LmZyYWdtZW50ICE9PSAoPGFueT5zdGF0ZS5mcmFnbWVudCkudmFsdWUpIHtcbiAgICAoPGFueT5zdGF0ZS5mcmFnbWVudCkubmV4dChzdGF0ZS5zbmFwc2hvdC5mcmFnbWVudCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbm9kZUNoaWxkcmVuQXNNYXAobm9kZTogVHJlZU5vZGU8YW55PnwgbnVsbCkge1xuICByZXR1cm4gbm9kZSA/IG5vZGUuY2hpbGRyZW4ucmVkdWNlKChtLCBjKSA9PiB7XG4gICAgbVtjLnZhbHVlLm91dGxldF0gPSBjO1xuICAgIHJldHVybiBtO1xuICB9LCB7fSkgOiB7fTtcbn1cblxuZnVuY3Rpb24gZ2V0T3V0bGV0KG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwLCByb3V0ZTogQWN0aXZhdGVkUm91dGUpOiBSb3V0ZXJPdXRsZXQge1xuICBsZXQgb3V0bGV0ID0gb3V0bGV0TWFwLl9vdXRsZXRzW3JvdXRlLm91dGxldF07XG4gIGlmICghb3V0bGV0KSB7XG4gICAgaWYgKHJvdXRlLm91dGxldCA9PT0gUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgcHJpbWFyeSBvdXRsZXRgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCB0aGUgb3V0bGV0ICR7cm91dGUub3V0bGV0fWApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0bGV0O1xufVxuIl19