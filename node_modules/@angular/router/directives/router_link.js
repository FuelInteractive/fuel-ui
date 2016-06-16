"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('../router');
var router_state_1 = require('../router_state');
var RouterLink = (function () {
    function RouterLink(router, route) {
        this.router = router;
        this.route = route;
        this.commands = [];
    }
    Object.defineProperty(RouterLink.prototype, "routerLink", {
        set: function (data) {
            if (Array.isArray(data)) {
                this.commands = data;
            }
            else {
                this.commands = [data];
            }
        },
        enumerable: true,
        configurable: true
    });
    RouterLink.prototype.ngOnChanges = function (changes) { this.updateTargetUrlAndHref(); };
    RouterLink.prototype.onClick = function () {
        if (!(typeof this.target === 'string') || this.target == '_self') {
            this.router.navigate(this.commands, { relativeTo: this.route, queryParams: this.queryParams, fragment: this.fragment });
            return false;
        }
        return true;
    };
    RouterLink.prototype.updateTargetUrlAndHref = function () {
        var tree = this.router.createUrlTree(this.commands, { relativeTo: this.route, queryParams: this.queryParams, fragment: this.fragment });
        if (tree) {
            this.href = this.router.serializeUrl(tree);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RouterLink.prototype, "target", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RouterLink.prototype, "queryParams", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RouterLink.prototype, "fragment", void 0);
    __decorate([
        core_1.HostBinding(), 
        __metadata('design:type', String)
    ], RouterLink.prototype, "href", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], RouterLink.prototype, "routerLink", null);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', Boolean)
    ], RouterLink.prototype, "onClick", null);
    RouterLink = __decorate([
        core_1.Directive({ selector: '[routerLink]' }), 
        __metadata('design:paramtypes', [router_1.Router, router_state_1.ActivatedRoute])
    ], RouterLink);
    return RouterLink;
}());
exports.RouterLink = RouterLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX2xpbmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGlyZWN0aXZlcy9yb3V0ZXJfbGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXFFLGVBQWUsQ0FBQyxDQUFBO0FBRXJGLHVCQUFxQixXQUFXLENBQUMsQ0FBQTtBQUNqQyw2QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQTZCL0M7SUFZRSxvQkFBb0IsTUFBYyxFQUFVLEtBQXFCO1FBQTdDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQVZ6RCxhQUFRLEdBQVUsRUFBRSxDQUFDO0lBVXVDLENBQUM7SUFHckUsc0JBQUksa0NBQVU7YUFBZCxVQUFlLElBQWtCO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxHQUFRLElBQUksQ0FBQztZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLENBQUM7UUFDSCxDQUFDOzs7T0FBQTtJQUVELGdDQUFXLEdBQVgsVUFBWSxPQUFXLElBQVMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBR2hFLDRCQUFPLEdBQVA7UUFFRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDaEIsSUFBSSxDQUFDLFFBQVEsRUFDYixFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztZQUN0RixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sMkNBQXNCLEdBQTlCO1FBQ0UsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQ2IsRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDdEYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNULElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQztJQUNILENBQUM7SUEzQ0Q7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O21EQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBR1I7UUFBQyxrQkFBVyxFQUFFOzs0Q0FBQTtJQU9kO1FBQUMsWUFBSyxFQUFFOzs7Z0RBQUE7SUFXUjtRQUFDLG1CQUFZLENBQUMsT0FBTyxDQUFDOzs7OzZDQUFBO0lBMUJ4QjtRQUFDLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsY0FBYyxFQUFDLENBQUM7O2tCQUFBO0lBOEN0QyxpQkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7QUE3Q1ksa0JBQVUsYUE2Q3RCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Um91dGVyfSBmcm9tICcuLi9yb3V0ZXInO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnLi4vcm91dGVyX3N0YXRlJztcblxuXG4vKipcbiAqIFRoZSBSb3V0ZXJMaW5rIGRpcmVjdGl2ZSBsZXRzIHlvdSBsaW5rIHRvIHNwZWNpZmljIHBhcnRzIG9mIHlvdXIgYXBwLlxuICpcbiAqIENvbnNpZGVyIHRoZSBmb2xsb3dpbmcgcm91dGUgY29uZmlndXJhdGlvbjpcblxuICogYGBgXG4gKiBbeyBwYXRoOiAnL3VzZXInLCBjb21wb25lbnQ6IFVzZXJDbXAgfV1cbiAqIGBgYFxuICpcbiAqIFdoZW4gbGlua2luZyB0byB0aGlzIGBVc2VyYCByb3V0ZSwgeW91IGNhbiB3cml0ZTpcbiAqXG4gKiBgYGBcbiAqIDxhIFtyb3V0ZXJMaW5rXT1cIlsnL3VzZXInXVwiPmxpbmsgdG8gdXNlciBjb21wb25lbnQ8L2E+XG4gKiBgYGBcbiAqXG4gKiBSb3V0ZXJMaW5rIGV4cGVjdHMgdGhlIHZhbHVlIHRvIGJlIGFuIGFycmF5IG9mIHBhdGggc2VnbWVudHMsIGZvbGxvd2VkIGJ5IHRoZSBwYXJhbXNcbiAqIGZvciB0aGF0IGxldmVsIG9mIHJvdXRpbmcuIEZvciBpbnN0YW5jZSBgWycvdGVhbScsIHt0ZWFtSWQ6IDF9LCAndXNlcicsIHt1c2VySWQ6IDJ9XWBcbiAqIG1lYW5zIHRoYXQgd2Ugd2FudCB0byBnZW5lcmF0ZSBhIGxpbmsgdG8gYC90ZWFtO3RlYW1JZD0xL3VzZXI7dXNlcklkPTJgLlxuICpcbiAqIFRoZSBmaXJzdCBzZWdtZW50IG5hbWUgY2FuIGJlIHByZXBlbmRlZCB3aXRoIGAvYCwgYC4vYCwgb3IgYC4uL2AuXG4gKiBJZiB0aGUgc2VnbWVudCBiZWdpbnMgd2l0aCBgL2AsIHRoZSByb3V0ZXIgd2lsbCBsb29rIHVwIHRoZSByb3V0ZSBmcm9tIHRoZSByb290IG9mIHRoZSBhcHAuXG4gKiBJZiB0aGUgc2VnbWVudCBiZWdpbnMgd2l0aCBgLi9gLCBvciBkb2Vzbid0IGJlZ2luIHdpdGggYSBzbGFzaCwgdGhlIHJvdXRlciB3aWxsXG4gKiBpbnN0ZWFkIGxvb2sgaW4gdGhlIGN1cnJlbnQgY29tcG9uZW50J3MgY2hpbGRyZW4gZm9yIHRoZSByb3V0ZS5cbiAqIEFuZCBpZiB0aGUgc2VnbWVudCBiZWdpbnMgd2l0aCBgLi4vYCwgdGhlIHJvdXRlciB3aWxsIGdvIHVwIG9uZSBsZXZlbC5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbcm91dGVyTGlua10nfSlcbmV4cG9ydCBjbGFzcyBSb3V0ZXJMaW5rIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgdGFyZ2V0OiBzdHJpbmc7XG4gIHByaXZhdGUgY29tbWFuZHM6IGFueVtdID0gW107XG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zOiB7W2s6IHN0cmluZ106IGFueX07XG4gIEBJbnB1dCgpIGZyYWdtZW50OiBzdHJpbmc7XG5cbiAgLy8gdGhlIHVybCBkaXNwbGF5ZWQgb24gdGhlIGFuY2hvciBlbGVtZW50LlxuICBASG9zdEJpbmRpbmcoKSBocmVmOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHt9XG5cbiAgQElucHV0KClcbiAgc2V0IHJvdXRlckxpbmsoZGF0YTogYW55W118c3RyaW5nKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHRoaXMuY29tbWFuZHMgPSA8YW55PmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBbZGF0YV07XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczoge30pOiBhbnkgeyB0aGlzLnVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTsgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpOiBib29sZWFuIHtcbiAgICAvLyBJZiBubyB0YXJnZXQsIG9yIGlmIHRhcmdldCBpcyBfc2VsZiwgcHJldmVudCBkZWZhdWx0IGJyb3dzZXIgYmVoYXZpb3JcbiAgICBpZiAoISh0eXBlb2YgdGhpcy50YXJnZXQgPT09ICdzdHJpbmcnKSB8fCB0aGlzLnRhcmdldCA9PSAnX3NlbGYnKSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcbiAgICAgICAgICB0aGlzLmNvbW1hbmRzLFxuICAgICAgICAgIHtyZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLCBxdWVyeVBhcmFtczogdGhpcy5xdWVyeVBhcmFtcywgZnJhZ21lbnQ6IHRoaXMuZnJhZ21lbnR9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTogdm9pZCB7XG4gICAgY29uc3QgdHJlZSA9IHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUoXG4gICAgICAgIHRoaXMuY29tbWFuZHMsXG4gICAgICAgIHtyZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLCBxdWVyeVBhcmFtczogdGhpcy5xdWVyeVBhcmFtcywgZnJhZ21lbnQ6IHRoaXMuZnJhZ21lbnR9KTtcbiAgICBpZiAodHJlZSkge1xuICAgICAgdGhpcy5ocmVmID0gdGhpcy5yb3V0ZXIuc2VyaWFsaXplVXJsKHRyZWUpO1xuICAgIH1cbiAgfVxufVxuIl19