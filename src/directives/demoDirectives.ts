import {ANIMATION_DEMO_PROVIDERS, AnimationDemo} from "./Animation/Animation.Demo";
import {TOOLTIP_DEMO_PROVIDERS, TooltipDemo} from "./Tooltip/Tooltip.Demo";
import {CODEHIGHLIGHTER_DEMO_PROVIDERS, CodeHighlighterDemo} from "./CodeHighlighter/CodeHighlighter.Demo";

export var FUELUI_DEMO_DIRECTIVE_PROVIDERS = [
	ANIMATION_DEMO_PROVIDERS,
    TOOLTIP_DEMO_PROVIDERS,
    CODEHIGHLIGHTER_DEMO_PROVIDERS
];

export * from "./Animation/Animation.Demo";
export * from "./Tooltip/Tooltip.Demo";
export * from "./CodeHighlighter/CodeHighlighter.Demo";