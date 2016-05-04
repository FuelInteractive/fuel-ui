import { Directive, HostListener, HostBinding, Input, Optional } from '@angular/core';
import { Router } from '../router';
import { RouteSegment } from '../segments';
import { isString, isPresent } from '../facade/lang';
import { ObservableWrapper } from '../facade/async';
export class RouterLink {
    constructor(_routeSegment, _router) {
        this._routeSegment = _routeSegment;
        this._router = _router;
        this._changes = [];
        this.isActive = false;
        this._subscription =
            ObservableWrapper.subscribe(_router.changes, (_) => { this._updateTargetUrlAndHref(); });
    }
    ngOnDestroy() { ObservableWrapper.dispose(this._subscription); }
    set routerLink(data) {
        this._changes = data;
        this._updateTargetUrlAndHref();
    }
    onClick() {
        if (!isString(this.target) || this.target == '_self') {
            this._router.navigate(this._changes, this._routeSegment);
            return false;
        }
        return true;
    }
    _updateTargetUrlAndHref() {
        let tree = this._router.createUrlTree(this._changes, this._routeSegment);
        if (isPresent(tree)) {
            this.href = this._router.serializeUrl(tree);
            this.isActive = this._router.urlTree.contains(tree);
        }
        else {
            this.isActive = false;
        }
    }
}
RouterLink.decorators = [
    { type: Directive, args: [{ selector: '[routerLink]' },] },
];
RouterLink.ctorParameters = [
    { type: RouteSegment, decorators: [{ type: Optional },] },
    { type: Router, },
];
RouterLink.propDecorators = {
    'target': [{ type: Input },],
    'href': [{ type: HostBinding },],
    'isActive': [{ type: HostBinding, args: ['class.router-link-active',] },],
    'routerLink': [{ type: Input },],
    'onClick': [{ type: HostListener, args: ["click",] },],
};
//# sourceMappingURL=router_link.js.map