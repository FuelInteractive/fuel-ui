import {Component, ViewEncapsulation, ChangeDetectionStrategy} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "fuel-ui",
    templateUrl: "demo.component.html",
    styleUrls: ["demo.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class DemoComponent {
    toggled: boolean = false;

    constructor(private _router: Router) {
        this._router.events.subscribe((event: any) => {
            if(this.toggled && document.querySelector("#sidebar-wrapper") && document.querySelector("#sidebar-wrapper").scrollTop)
                document.querySelector("#sidebar-wrapper").scrollTop = 0;

            this.toggled = this.toggled ? !this.toggled : this.toggled;
        });
    }
}
