import { ResolvedReflectiveProvider, ViewContainerRef, ComponentRef, ComponentFactory } from '@angular/core';
import { RouterOutletMap } from '../router';
export declare class RouterOutlet {
    private _location;
    private _loaded;
    outletMap: RouterOutletMap;
    constructor(parentOutletMap: RouterOutletMap, _location: ViewContainerRef, name: string);
    unload(): void;
    readonly loadedComponent: Object;
    readonly isLoaded: boolean;
    load(factory: ComponentFactory<any>, providers: ResolvedReflectiveProvider[], outletMap: RouterOutletMap): ComponentRef<any>;
}
