import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {DemoComponent} from "./demo.component";
import {routing} from "./demo.routing";

@NgModule({
    declarations: [DemoComponent],
    imports: [
        BrowserModule,
        routing
    ],
    bootstrap: [DemoComponent]
}) 
export class DemoModule {

}
