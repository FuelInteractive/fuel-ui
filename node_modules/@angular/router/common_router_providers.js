"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var router_1 = require('./router');
var router_outlet_map_1 = require('./router_outlet_map');
var router_state_1 = require('./router_state');
var url_serializer_1 = require('./url_serializer');
function provideRouter(config) {
    return [
        common_1.Location,
        { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy },
        { provide: url_serializer_1.UrlSerializer, useClass: url_serializer_1.DefaultUrlSerializer },
        {
            provide: router_1.Router,
            useFactory: function (ref, resolver, urlSerializer, outletMap, location, injector) {
                if (ref.componentTypes.length == 0) {
                    throw new Error('Bootstrap at least one component before injecting Router.');
                }
                var componentType = ref.componentTypes[0];
                var r = new router_1.Router(componentType, resolver, urlSerializer, outletMap, location, injector, config);
                ref.registerDisposeListener(function () { return r.dispose(); });
                return r;
            },
            deps: [core_1.ApplicationRef, core_1.ComponentResolver, url_serializer_1.UrlSerializer, router_outlet_map_1.RouterOutletMap, common_1.Location, core_1.Injector]
        },
        router_outlet_map_1.RouterOutletMap,
        { provide: router_state_1.ActivatedRoute, useFactory: function (r) { return r.routerState.root; }, deps: [router_1.Router] },
        {
            provide: core_1.APP_INITIALIZER,
            multi: true,
            useFactory: function (injector) {
                setTimeout(function (_) {
                    var appRef = injector.get(core_1.ApplicationRef);
                    if (appRef.componentTypes.length == 0) {
                        appRef.registerBootstrapListener(function (_) {
                            injector.get(router_1.Router).initialNavigation();
                        });
                    }
                    else {
                        injector.get(router_1.Router).initialNavigation();
                    }
                }, 0);
                return function (_) { return null; };
            },
            deps: [core_1.Injector]
        }
    ];
}
exports.provideRouter = provideRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX3JvdXRlcl9wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tbW9uX3JvdXRlcl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUErRCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2pGLHFCQUEyRSxlQUFlLENBQUMsQ0FBQTtBQUczRix1QkFBcUIsVUFBVSxDQUFDLENBQUE7QUFDaEMsa0NBQThCLHFCQUFxQixDQUFDLENBQUE7QUFDcEQsNkJBQTZCLGdCQUFnQixDQUFDLENBQUE7QUFDOUMsK0JBQWtELGtCQUFrQixDQUFDLENBQUE7QUFxQnJFLHVCQUE4QixNQUFvQjtJQUNoRCxNQUFNLENBQUM7UUFDTCxpQkFBUTtRQUNSLEVBQUMsT0FBTyxFQUFFLHlCQUFnQixFQUFFLFFBQVEsRUFBRSw2QkFBb0IsRUFBQztRQUMzRCxFQUFDLE9BQU8sRUFBRSw4QkFBYSxFQUFFLFFBQVEsRUFBRSxxQ0FBb0IsRUFBQztRQUV4RDtZQUNFLE9BQU8sRUFBRSxlQUFNO1lBQ2YsVUFBVSxFQUFFLFVBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRO2dCQUN0RSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7Z0JBQy9FLENBQUM7Z0JBQ0QsSUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsSUFBTSxDQUFDLEdBQUcsSUFBSSxlQUFNLENBQ2hCLGFBQWEsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRixHQUFHLENBQUMsdUJBQXVCLENBQUMsY0FBTSxPQUFBLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBWCxDQUFXLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUM7WUFDRCxJQUFJLEVBQ0EsQ0FBQyxxQkFBYyxFQUFFLHdCQUFpQixFQUFFLDhCQUFhLEVBQUUsbUNBQWUsRUFBRSxpQkFBUSxFQUFFLGVBQVEsQ0FBQztTQUM1RjtRQUVELG1DQUFlO1FBQ2YsRUFBQyxPQUFPLEVBQUUsNkJBQWMsRUFBRSxVQUFVLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBbEIsQ0FBa0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFNLENBQUMsRUFBQztRQUdoRjtZQUNFLE9BQU8sRUFBRSxzQkFBZTtZQUN4QixLQUFLLEVBQUUsSUFBSTtZQUNYLFVBQVUsRUFBRSxVQUFDLFFBQVE7Z0JBSW5CLFVBQVUsQ0FBQyxVQUFBLENBQUM7b0JBQ1YsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxxQkFBYyxDQUFDLENBQUM7b0JBQzVDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxVQUFDLENBQUM7NEJBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBTSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTt3QkFDMUMsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixRQUFRLENBQUMsR0FBRyxDQUFDLGVBQU0sQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUE7b0JBQzFDLENBQUM7Z0JBQ0gsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLElBQUksRUFBSixDQUFJLENBQUM7WUFDbkIsQ0FBQztZQUNELElBQUksRUFBRSxDQUFDLGVBQVEsQ0FBQztTQUNqQjtLQUNGLENBQUM7QUFDSixDQUFDO0FBaERlLHFCQUFhLGdCQWdENUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TG9jYXRpb24sIExvY2F0aW9uU3RyYXRlZ3ksIFBhdGhMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRSZXNvbHZlciwgSW5qZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1JvdXRlckNvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJy4vcm91dGVyJztcbmltcG9ydCB7Um91dGVyT3V0bGV0TWFwfSBmcm9tICcuL3JvdXRlcl9vdXRsZXRfbWFwJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gJy4vcm91dGVyX3N0YXRlJztcbmltcG9ydCB7RGVmYXVsdFVybFNlcmlhbGl6ZXIsIFVybFNlcmlhbGl6ZXJ9IGZyb20gJy4vdXJsX3NlcmlhbGl6ZXInO1xuXG5cbi8qKlxuICogQSBsaXN0IG9mIHtAbGluayBQcm92aWRlcn1zLiBUbyB1c2UgdGhlIHJvdXRlciwgeW91IG11c3QgYWRkIHRoaXMgdG8geW91ciBhcHBsaWNhdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogQENvbXBvbmVudCh7ZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXX0pXG4gKiBjbGFzcyBBcHBDbXAge1xuICogICAvLyAuLi5cbiAqIH1cbiAqXG4gKiBjb25zdCByb3V0ZXIgPSBbXG4gKiAgIHtwYXRoOiAnL2hvbWUnLCBjb21wb25lbnQ6IEhvbWV9XG4gKiBdO1xuICpcbiAqIGJvb3RzdHJhcChBcHBDbXAsIFtwcm92aWRlUm91dGVyKHJvdXRlcildKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVJvdXRlcihjb25maWc6IFJvdXRlckNvbmZpZyk6IGFueVtdIHtcbiAgcmV0dXJuIFtcbiAgICBMb2NhdGlvbixcbiAgICB7cHJvdmlkZTogTG9jYXRpb25TdHJhdGVneSwgdXNlQ2xhc3M6IFBhdGhMb2NhdGlvblN0cmF0ZWd5fSxcbiAgICB7cHJvdmlkZTogVXJsU2VyaWFsaXplciwgdXNlQ2xhc3M6IERlZmF1bHRVcmxTZXJpYWxpemVyfSxcblxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFJvdXRlcixcbiAgICAgIHVzZUZhY3Rvcnk6IChyZWYsIHJlc29sdmVyLCB1cmxTZXJpYWxpemVyLCBvdXRsZXRNYXAsIGxvY2F0aW9uLCBpbmplY3RvcikgPT4ge1xuICAgICAgICBpZiAocmVmLmNvbXBvbmVudFR5cGVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb290c3RyYXAgYXQgbGVhc3Qgb25lIGNvbXBvbmVudCBiZWZvcmUgaW5qZWN0aW5nIFJvdXRlci4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb21wb25lbnRUeXBlID0gcmVmLmNvbXBvbmVudFR5cGVzWzBdO1xuICAgICAgICBjb25zdCByID0gbmV3IFJvdXRlcihcbiAgICAgICAgICAgIGNvbXBvbmVudFR5cGUsIHJlc29sdmVyLCB1cmxTZXJpYWxpemVyLCBvdXRsZXRNYXAsIGxvY2F0aW9uLCBpbmplY3RvciwgY29uZmlnKTtcbiAgICAgICAgcmVmLnJlZ2lzdGVyRGlzcG9zZUxpc3RlbmVyKCgpID0+IHIuZGlzcG9zZSgpKTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgICB9LFxuICAgICAgZGVwczpcbiAgICAgICAgICBbQXBwbGljYXRpb25SZWYsIENvbXBvbmVudFJlc29sdmVyLCBVcmxTZXJpYWxpemVyLCBSb3V0ZXJPdXRsZXRNYXAsIExvY2F0aW9uLCBJbmplY3Rvcl1cbiAgICB9LFxuXG4gICAgUm91dGVyT3V0bGV0TWFwLFxuICAgIHtwcm92aWRlOiBBY3RpdmF0ZWRSb3V0ZSwgdXNlRmFjdG9yeTogKHIpID0+IHIucm91dGVyU3RhdGUucm9vdCwgZGVwczogW1JvdXRlcl19LFxuXG4gICAgLy8gVHJpZ2dlciBpbml0aWFsIG5hdmlnYXRpb25cbiAgICB7XG4gICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIHVzZUZhY3Rvcnk6IChpbmplY3RvcikgPT4ge1xuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy85MTAxXG4gICAgICAgIC8vIERlbGF5IHRoZSByb3V0ZXIgaW5zdGFudGlhdGlvbiB0byBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmN5IChBcHBsaWNhdGlvblJlZiAtPlxuICAgICAgICAvLyBBUFBfSU5JVElBTElaRVIgLT4gUm91dGVyKVxuICAgICAgICBzZXRUaW1lb3V0KF8gPT4ge1xuICAgICAgICAgIGNvbnN0IGFwcFJlZiA9IGluamVjdG9yLmdldChBcHBsaWNhdGlvblJlZik7XG4gICAgICAgICAgaWYgKGFwcFJlZi5jb21wb25lbnRUeXBlcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgYXBwUmVmLnJlZ2lzdGVyQm9vdHN0cmFwTGlzdGVuZXIoKF8pID0+IHtcbiAgICAgICAgICAgICAgaW5qZWN0b3IuZ2V0KFJvdXRlcikuaW5pdGlhbE5hdmlnYXRpb24oKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluamVjdG9yLmdldChSb3V0ZXIpLmluaXRpYWxOYXZpZ2F0aW9uKClcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgICAgICByZXR1cm4gXyA9PiBudWxsO1xuICAgICAgfSxcbiAgICAgIGRlcHM6IFtJbmplY3Rvcl1cbiAgICB9XG4gIF07XG59XG4iXX0=