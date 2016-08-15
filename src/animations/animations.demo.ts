import {NgModule} from "@angular/core";
import {CollapseDemo} from "./Collapse/Collapse.Demo";
import {FuiAnimationsModule} from "./animations";

const animationsDemoComponents = [
    CollapseDemo
]

@NgModule({
    imports: [FuiAnimationsModule],
    declarations: [
        ...animationsDemoComponents
    ],
    exports: [
        ...animationsDemoComponents
    ]
})
export class FuiAnimationsDemoModule { }

export * from "./Collapse/Collapse.Demo";