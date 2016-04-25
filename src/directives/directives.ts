import {Animation} from './Animation/Animation';
import {TOOLTIP_PROVIDERS, Tooltip} from "./Tooltip/Tooltip";
import {CodeHighlighter} from "./CodeHighlighter/CodeHighlighter";
import {Collapse} from "./Collapse/Collapse";

export var FUELUI_DIRECTIVE_PROVIDERS = [
    TOOLTIP_PROVIDERS,
    Animation,
    CodeHighlighter,
    Collapse
];
export * from './Animation/Animation';
export * from "./Tooltip/Tooltip";
export * from "./CodeHighlighter/CodeHighlighter";
export * from "./Collapse/Collapse";