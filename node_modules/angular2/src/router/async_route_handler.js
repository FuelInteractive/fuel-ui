'use strict';var lang_1 = require('angular2/src/facade/lang');
var instruction_1 = require('./instruction');
var AsyncRouteHandler = (function () {
    function AsyncRouteHandler(_loader, data) {
        if (data === void 0) { data = null; }
        this._loader = _loader;
        /** @internal */
        this._resolvedComponent = null;
        this.data = lang_1.isPresent(data) ? new instruction_1.RouteData(data) : instruction_1.BLANK_ROUTE_DATA;
    }
    AsyncRouteHandler.prototype.resolveComponentType = function () {
        var _this = this;
        if (lang_1.isPresent(this._resolvedComponent)) {
            return this._resolvedComponent;
        }
        return this._resolvedComponent = this._loader().then(function (componentType) {
            _this.componentType = componentType;
            return componentType;
        });
    };
    return AsyncRouteHandler;
})();
exports.AsyncRouteHandler = AsyncRouteHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfcm91dGVfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy9yb3V0ZXIvYXN5bmNfcm91dGVfaGFuZGxlci50cyJdLCJuYW1lcyI6WyJBc3luY1JvdXRlSGFuZGxlciIsIkFzeW5jUm91dGVIYW5kbGVyLmNvbnN0cnVjdG9yIiwiQXN5bmNSb3V0ZUhhbmRsZXIucmVzb2x2ZUNvbXBvbmVudFR5cGUiXSwibWFwcGluZ3MiOiJBQUFBLHFCQUE4QiwwQkFBMEIsQ0FBQyxDQUFBO0FBR3pELDRCQUEwQyxlQUFlLENBQUMsQ0FBQTtBQUcxRDtJQU1FQSwyQkFBb0JBLE9BQWlCQSxFQUFFQSxJQUFpQ0E7UUFBakNDLG9CQUFpQ0EsR0FBakNBLFdBQWlDQTtRQUFwREEsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBVUE7UUFMckNBLGdCQUFnQkE7UUFDaEJBLHVCQUFrQkEsR0FBaUJBLElBQUlBLENBQUNBO1FBS3RDQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxnQkFBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsdUJBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLDhCQUFnQkEsQ0FBQ0E7SUFDdkVBLENBQUNBO0lBRURELGdEQUFvQkEsR0FBcEJBO1FBQUFFLGlCQVNDQTtRQVJDQSxFQUFFQSxDQUFDQSxDQUFDQSxnQkFBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN2Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtRQUNqQ0EsQ0FBQ0E7UUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFDQSxhQUFhQTtZQUNqRUEsS0FBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsYUFBYUEsQ0FBQ0E7WUFDbkNBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBO1FBQ3ZCQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNMQSxDQUFDQTtJQUNIRix3QkFBQ0E7QUFBREEsQ0FBQ0EsQUFwQkQsSUFvQkM7QUFwQlkseUJBQWlCLG9CQW9CN0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge1JvdXRlSGFuZGxlcn0gZnJvbSAnLi9yb3V0ZV9oYW5kbGVyJztcbmltcG9ydCB7Um91dGVEYXRhLCBCTEFOS19ST1VURV9EQVRBfSBmcm9tICcuL2luc3RydWN0aW9uJztcblxuXG5leHBvcnQgY2xhc3MgQXN5bmNSb3V0ZUhhbmRsZXIgaW1wbGVtZW50cyBSb3V0ZUhhbmRsZXIge1xuICAvKiogQGludGVybmFsICovXG4gIF9yZXNvbHZlZENvbXBvbmVudDogUHJvbWlzZTxhbnk+ID0gbnVsbDtcbiAgY29tcG9uZW50VHlwZTogVHlwZTtcbiAgcHVibGljIGRhdGE6IFJvdXRlRGF0YTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2FkZXI6IEZ1bmN0aW9uLCBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IG51bGwpIHtcbiAgICB0aGlzLmRhdGEgPSBpc1ByZXNlbnQoZGF0YSkgPyBuZXcgUm91dGVEYXRhKGRhdGEpIDogQkxBTktfUk9VVEVfREFUQTtcbiAgfVxuXG4gIHJlc29sdmVDb21wb25lbnRUeXBlKCk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9yZXNvbHZlZENvbXBvbmVudCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXNvbHZlZENvbXBvbmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZWRDb21wb25lbnQgPSB0aGlzLl9sb2FkZXIoKS50aGVuKChjb21wb25lbnRUeXBlKSA9PiB7XG4gICAgICB0aGlzLmNvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlO1xuICAgICAgcmV0dXJuIGNvbXBvbmVudFR5cGU7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==