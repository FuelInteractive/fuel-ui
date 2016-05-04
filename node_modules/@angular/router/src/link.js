"use strict";
var segments_1 = require('./segments');
var lang_1 = require('./facade/lang');
var collection_1 = require('./facade/collection');
function link(segment, routeTree, urlTree, change) {
    if (change.length === 0)
        return urlTree;
    var startingNode;
    var normalizedChange;
    if (lang_1.isString(change[0]) && change[0].startsWith("./")) {
        normalizedChange = ["/", change[0].substring(2)].concat(change.slice(1));
        startingNode = _findStartingNode(_findUrlSegment(segment, routeTree), segments_1.rootNode(urlTree));
    }
    else if (lang_1.isString(change[0]) && change.length === 1 && change[0] == "/") {
        normalizedChange = change;
        startingNode = segments_1.rootNode(urlTree);
    }
    else if (lang_1.isString(change[0]) && !change[0].startsWith("/")) {
        normalizedChange = ["/"].concat(change);
        startingNode = _findStartingNode(_findUrlSegment(segment, routeTree), segments_1.rootNode(urlTree));
    }
    else {
        normalizedChange = ["/"].concat(change);
        startingNode = segments_1.rootNode(urlTree);
    }
    var updated = _update(startingNode, normalizedChange);
    var newRoot = _constructNewTree(segments_1.rootNode(urlTree), startingNode, updated);
    return new segments_1.UrlTree(newRoot);
}
exports.link = link;
function _findUrlSegment(segment, routeTree) {
    var s = segment;
    var res = null;
    while (lang_1.isBlank(res)) {
        res = collection_1.ListWrapper.last(s.urlSegments);
        s = routeTree.parent(s);
    }
    return res;
}
function _findStartingNode(segment, node) {
    if (node.value === segment)
        return node;
    for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
        var c = _a[_i];
        var r = _findStartingNode(segment, c);
        if (lang_1.isPresent(r))
            return r;
    }
    return null;
}
function _constructNewTree(node, original, updated) {
    if (node === original) {
        return new segments_1.TreeNode(node.value, updated.children);
    }
    else {
        return new segments_1.TreeNode(node.value, node.children.map(function (c) { return _constructNewTree(c, original, updated); }));
    }
}
function _update(node, changes) {
    var rest = changes.slice(1);
    var outlet = _outlet(changes);
    var segment = _segment(changes);
    if (lang_1.isString(segment) && segment[0] == "/")
        segment = segment.substring(1);
    // reach the end of the tree => create new tree nodes.
    if (lang_1.isBlank(node)) {
        var urlSegment = new segments_1.UrlSegment(segment, null, outlet);
        var children = rest.length === 0 ? [] : [_update(null, rest)];
        return new segments_1.TreeNode(urlSegment, children);
    }
    else if (outlet != node.value.outlet) {
        return node;
    }
    else {
        var urlSegment = lang_1.isStringMap(segment) ? new segments_1.UrlSegment(null, segment, null) :
            new segments_1.UrlSegment(segment, null, outlet);
        if (rest.length === 0) {
            return new segments_1.TreeNode(urlSegment, []);
        }
        return new segments_1.TreeNode(urlSegment, _updateMany(collection_1.ListWrapper.clone(node.children), rest));
    }
}
function _updateMany(nodes, changes) {
    var outlet = _outlet(changes);
    var nodesInRightOutlet = nodes.filter(function (c) { return c.value.outlet == outlet; });
    if (nodesInRightOutlet.length > 0) {
        var nodeRightOutlet = nodesInRightOutlet[0]; // there can be only one
        nodes[nodes.indexOf(nodeRightOutlet)] = _update(nodeRightOutlet, changes);
    }
    else {
        nodes.push(_update(null, changes));
    }
    return nodes;
}
function _segment(changes) {
    if (!lang_1.isString(changes[0]))
        return changes[0];
    var parts = changes[0].toString().split(":");
    return parts.length > 1 ? parts[1] : changes[0];
}
function _outlet(changes) {
    if (!lang_1.isString(changes[0]))
        return null;
    var parts = changes[0].toString().split(":");
    return parts.length > 1 ? parts[0] : null;
}
//# sourceMappingURL=link.js.map