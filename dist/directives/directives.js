"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var AnimationListener_1 = require("./Animation/AnimationListener");
var Animation_1 = require('./Animation/Animation');
var Tooltip_1 = require("./Tooltip/Tooltip");
var CodeHighlighter_1 = require("./CodeHighlighter/CodeHighlighter");
exports.FUELUI_DIRECTIVE_PROVIDERS = [
    Tooltip_1.TOOLTIP_PROVIDERS,
    Animation_1.Animation,
    AnimationListener_1.AnimationListener,
    CodeHighlighter_1.CodeHighlighter
];
__export(require("./Animation/AnimationListener"));
__export(require('./Animation/Animation'));
__export(require("./Tooltip/Tooltip"));
__export(require("./CodeHighlighter/CodeHighlighter"));

//# sourceMappingURL=directives.js.map
