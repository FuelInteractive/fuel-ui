import {NgModule} from "@angular/core";
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
