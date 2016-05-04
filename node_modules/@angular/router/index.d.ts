/**
 * @module
 * @description
 * Alternative implementation of the router. Experimental.
 */
export { Router, RouterOutletMap } from './src/router';
export { RouteSegment, UrlSegment, Tree, UrlTree, RouteTree } from './src/segments';
export { Routes } from './src/metadata/decorators';
export { Route } from './src/metadata/metadata';
export { RouterUrlSerializer, DefaultRouterUrlSerializer } from './src/router_url_serializer';
export { OnActivate, CanDeactivate } from './src/interfaces';
export { ROUTER_PROVIDERS } from './src/router_providers';
export declare const ROUTER_DIRECTIVES: any[];
