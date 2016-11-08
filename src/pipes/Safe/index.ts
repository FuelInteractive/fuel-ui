export * from "./SafeStyle";
export * from "./SafeUrl";
export * from "./SafeHtml";
export * from "./SafeScript";

import {NgModule} from "@angular/core";
import {SafeStylePipe} from "./SafeStyle";
import {SafeUrlPipe} from "./SafeUrl";
import {SafeHtmlPipe} from "./SafeHtml";
import {SafeScriptPipe} from "./SafeScript";

export let pipes = [
    SafeStylePipe, 
    SafeUrlPipe,
    SafeHtmlPipe,
    SafeScriptPipe
];

@NgModule({
    declarations: pipes,
    exports: pipes
})
export class FuiSafePipeModule { }