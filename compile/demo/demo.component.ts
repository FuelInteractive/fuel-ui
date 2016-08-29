import {Component, ViewEncapsulation, provide, ChangeDetectionStrategy, enableProdMode, trigger, state, style, transition, animate} from "@angular/core";
import {LocationStrategy, HashLocationStrategy } from "@angular/common";
import {Router, RoutesRecognized} from '@angular/router';
import {provideForms, disableDeprecatedForms} from '@angular/forms';

@Component({
	selector: "fuel-ui",
    templateUrl: "demo.component.html",
    encapsulation: ViewEncapsulation.None
})
export class DemoComponent {
    toggled: boolean = false;

    constructor(private _router: Router) {
        this._router.events.subscribe((event: any) => {
            if(!(event instanceof RoutesRecognized)) return;

            if(this.toggled && document.querySelector("#sidebar-wrapper") && document.querySelector("#sidebar-wrapper").scrollTop) 
                document.querySelector("#sidebar-wrapper").scrollTop = 0;

            this.toggled = this.toggled ? !this.toggled : this.toggled;
        });
    }
}