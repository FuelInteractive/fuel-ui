import {NgModule} from "@angular/core";
import {CollapseDemo} from "./Collapse/Collapse.Demo";

const animationModules = [

];

const animationExports = [
    ...animationModules,
    CollapseDemo
];

@NgModule({
    imports: animationModules,
    exports: animationExports
})
export class FuiAnimationsDemoModule { }

export * from "./Collapse/Collapse.Demo";