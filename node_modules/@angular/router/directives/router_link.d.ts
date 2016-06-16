import { OnChanges } from '@angular/core';
import { Router } from '../router';
import { ActivatedRoute } from '../router_state';
export declare class RouterLink implements OnChanges {
    private router;
    private route;
    target: string;
    private commands;
    queryParams: {
        [k: string]: any;
    };
    fragment: string;
    href: string;
    constructor(router: Router, route: ActivatedRoute);
    routerLink: any[] | string;
    ngOnChanges(changes: {}): any;
    onClick(): boolean;
    private updateTargetUrlAndHref();
}
