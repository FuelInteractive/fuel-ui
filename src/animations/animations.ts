import {NgModule} from "@angular/core";

import {Collapse} from "./Collapse/Collapse";

export * from "./Collapse/Collapse";

const animationComponents = [

];

const animationProviders = [
    //Collapse
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
