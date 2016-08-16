import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {routing} from "./demo/demo.routing";

import {FuelUiModule} from "./fuel-ui";
import {FuiDemoModule} from "./demo/demo";
import {DemoComponent} from "./demo/demo.component";



@NgModule({
    declarations: [DemoComponent],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        FuelUiModule,
        FuiDemoModule
    ],
    bootstrap: [DemoComponent]
}) 
export class DemoAppModule {

}


platformBrowserDynamic().bootstrapModule(DemoAppModule);