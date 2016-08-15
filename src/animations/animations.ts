import {NgModule} from "@angular/core";

import {Collapse} from "./collapse/collapse";

export * from "./collapse/collapse";

const animationComponents = [

];

const animationProviders = [
    Collapse
];

@NgModule({
    imports: [],
    declarations: [],
    providers: animationProviders,
    exports: [
        ...animationProviders
    ]
})
export class FuiAnimationsModule { }
