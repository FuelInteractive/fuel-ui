'use strict';"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var o = require('../output/output_ast');
var identifiers_1 = require('../identifiers');
var constants_1 = require('./constants');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var template_ast_1 = require('../template_ast');
var compile_metadata_1 = require('../compile_metadata');
var util_1 = require('./util');
var compile_query_1 = require('./compile_query');
var compile_method_1 = require('./compile_method');
var CompileNode = (function () {
    function CompileNode(parent, view, nodeIndex, renderNode, sourceAst) {
        this.parent = parent;
        this.view = view;
        this.nodeIndex = nodeIndex;
        this.renderNode = renderNode;
        this.sourceAst = sourceAst;
    }
    CompileNode.prototype.isNull = function () { return lang_1.isBlank(this.renderNode); };
    CompileNode.prototype.isRootElement = function () { return this.view != this.parent.view; };
    return CompileNode;
}());
exports.CompileNode = CompileNode;
var CompileElement = (function (_super) {
    __extends(CompileElement, _super);
    function CompileElement(parent, view, nodeIndex, renderNode, sourceAst, component, _directives, _resolvedProvidersArray, hasViewContainer, hasEmbeddedView, references) {
        var _this = this;
        _super.call(this, parent, view, nodeIndex, renderNode, sourceAst);
        this.component = component;
        this._directives = _directives;
        this._resolvedProvidersArray = _resolvedProvidersArray;
        this.hasViewContainer = hasViewContainer;
        this.hasEmbeddedView = hasEmbeddedView;
        this._compViewExpr = null;
        this._instances = new compile_metadata_1.CompileTokenMap();
        this._queryCount = 0;
        this._queries = new compile_metadata_1.CompileTokenMap();
        this._componentConstructorViewQueryLists = [];
        this.contentNodesByNgContentIndex = null;
        this.referenceTokens = {};
        references.forEach(function (ref) { return _this.referenceTokens[ref.name] = ref.value; });
        this.elementRef = o.importExpr(identifiers_1.Identifiers.ElementRef).instantiate([this.renderNode]);
        this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.ElementRef), this.elementRef);
        this.injector = o.THIS_EXPR.callMethod('injector', [o.literal(this.nodeIndex)]);
        this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.Injector), this.injector);
        this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.Renderer), o.THIS_EXPR.prop('renderer'));
        if (this.hasViewContainer || this.hasEmbeddedView || lang_1.isPresent(this.component)) {
            this._createAppElement();
        }
    }
    CompileElement.createNull = function () {
        return new CompileElement(null, null, null, null, null, null, [], [], false, false, []);
    };
    CompileElement.prototype._createAppElement = function () {
        var fieldName = "_appEl_" + this.nodeIndex;
        var parentNodeIndex = this.isRootElement() ? null : this.parent.nodeIndex;
        this.view.fields.push(new o.ClassField(fieldName, o.importType(identifiers_1.Identifiers.AppElement), [o.StmtModifier.Private]));
        var statement = o.THIS_EXPR.prop(fieldName)
            .set(o.importExpr(identifiers_1.Identifiers.AppElement)
            .instantiate([
            o.literal(this.nodeIndex),
            o.literal(parentNodeIndex),
            o.THIS_EXPR,
            this.renderNode
        ]))
            .toStmt();
        this.view.createMethod.addStmt(statement);
        this.appElement = o.THIS_EXPR.prop(fieldName);
        this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.AppElement), this.appElement);
    };
    CompileElement.prototype.setComponentView = function (compViewExpr) {
        this._compViewExpr = compViewExpr;
        this.contentNodesByNgContentIndex =
            collection_1.ListWrapper.createFixedSize(this.component.template.ngContentSelectors.length);
        for (var i = 0; i < this.contentNodesByNgContentIndex.length; i++) {
            this.contentNodesByNgContentIndex[i] = [];
        }
    };
    CompileElement.prototype.setEmbeddedView = function (embeddedView) {
        this.embeddedView = embeddedView;
        if (lang_1.isPresent(embeddedView)) {
            var createTemplateRefExpr = o.importExpr(identifiers_1.Identifiers.TemplateRef_)
                .instantiate([this.appElement, this.embeddedView.viewFactory]);
            var provider = new compile_metadata_1.CompileProviderMetadata({ token: identifiers_1.identifierToken(identifiers_1.Identifiers.TemplateRef), useValue: createTemplateRefExpr });
            // Add TemplateRef as first provider as it does not have deps on other providers
            this._resolvedProvidersArray.unshift(new template_ast_1.ProviderAst(provider.token, false, true, [provider], template_ast_1.ProviderAstType.Builtin, this.sourceAst.sourceSpan));
        }
    };
    CompileElement.prototype.beforeChildren = function () {
        var _this = this;
        if (this.hasViewContainer) {
            this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.ViewContainerRef), this.appElement.prop('vcRef'));
        }
        this._resolvedProviders = new compile_metadata_1.CompileTokenMap();
        this._resolvedProvidersArray.forEach(function (provider) {
            return _this._resolvedProviders.add(provider.token, provider);
        });
        // create all the provider instances, some in the view constructor,
        // some as getters. We rely on the fact that they are already sorted topologically.
        this._resolvedProviders.values().forEach(function (resolvedProvider) {
            var providerValueExpressions = resolvedProvider.providers.map(function (provider) {
                if (lang_1.isPresent(provider.useExisting)) {
                    return _this._getDependency(resolvedProvider.providerType, new compile_metadata_1.CompileDiDependencyMetadata({ token: provider.useExisting }));
                }
                else if (lang_1.isPresent(provider.useFactory)) {
                    var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useFactory.diDeps;
                    var depsExpr = deps.map(function (dep) { return _this._getDependency(resolvedProvider.providerType, dep); });
                    return o.importExpr(provider.useFactory).callFn(depsExpr);
                }
                else if (lang_1.isPresent(provider.useClass)) {
                    var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useClass.diDeps;
                    var depsExpr = deps.map(function (dep) { return _this._getDependency(resolvedProvider.providerType, dep); });
                    return o.importExpr(provider.useClass)
                        .instantiate(depsExpr, o.importType(provider.useClass));
                }
                else {
                    if (provider.useValue instanceof compile_metadata_1.CompileIdentifierMetadata) {
                        return o.importExpr(provider.useValue);
                    }
                    else if (provider.useValue instanceof o.Expression) {
                        return provider.useValue;
                    }
                    else {
                        return o.literal(provider.useValue);
                    }
                }
            });
            var propName = "_" + resolvedProvider.token.name + "_" + _this.nodeIndex + "_" + _this._instances.size;
            var instance = createProviderProperty(propName, resolvedProvider, providerValueExpressions, resolvedProvider.multiProvider, resolvedProvider.eager, _this);
            _this._instances.add(resolvedProvider.token, instance);
        });
        this.directiveInstances =
            this._directives.map(function (directive) { return _this._instances.get(identifiers_1.identifierToken(directive.type)); });
        for (var i = 0; i < this.directiveInstances.length; i++) {
            var directiveInstance = this.directiveInstances[i];
            var directive = this._directives[i];
            directive.queries.forEach(function (queryMeta) { _this._addQuery(queryMeta, directiveInstance); });
        }
        var queriesWithReads = [];
        this._resolvedProviders.values().forEach(function (resolvedProvider) {
            var queriesForProvider = _this._getQueriesFor(resolvedProvider.token);
            collection_1.ListWrapper.addAll(queriesWithReads, queriesForProvider.map(function (query) { return new _QueryWithRead(query, resolvedProvider.token); }));
        });
        collection_1.StringMapWrapper.forEach(this.referenceTokens, function (_, varName) {
            var token = _this.referenceTokens[varName];
            var varValue;
            if (lang_1.isPresent(token)) {
                varValue = _this._instances.get(token);
            }
            else {
                varValue = _this.renderNode;
            }
            _this.view.locals.set(varName, varValue);
            var varToken = new compile_metadata_1.CompileTokenMetadata({ value: varName });
            collection_1.ListWrapper.addAll(queriesWithReads, _this._getQueriesFor(varToken)
                .map(function (query) { return new _QueryWithRead(query, varToken); }));
        });
        queriesWithReads.forEach(function (queryWithRead) {
            var value;
            if (lang_1.isPresent(queryWithRead.read.identifier)) {
                // query for an identifier
                value = _this._instances.get(queryWithRead.read);
            }
            else {
                // query for a reference
                var token = _this.referenceTokens[queryWithRead.read.value];
                if (lang_1.isPresent(token)) {
                    value = _this._instances.get(token);
                }
                else {
                    value = _this.elementRef;
                }
            }
            if (lang_1.isPresent(value)) {
                queryWithRead.query.addValue(value, _this.view);
            }
        });
        if (lang_1.isPresent(this.component)) {
            var componentConstructorViewQueryList = lang_1.isPresent(this.component) ? o.literalArr(this._componentConstructorViewQueryLists) :
                o.NULL_EXPR;
            var compExpr = lang_1.isPresent(this.getComponent()) ? this.getComponent() : o.NULL_EXPR;
            this.view.createMethod.addStmt(this.appElement.callMethod('initComponent', [compExpr, componentConstructorViewQueryList, this._compViewExpr])
                .toStmt());
        }
    };
    CompileElement.prototype.afterChildren = function (childNodeCount) {
        var _this = this;
        this._resolvedProviders.values().forEach(function (resolvedProvider) {
            // Note: afterChildren is called after recursing into children.
            // This is good so that an injector match in an element that is closer to a requesting element
            // matches first.
            var providerExpr = _this._instances.get(resolvedProvider.token);
            // Note: view providers are only visible on the injector of that element.
            // This is not fully correct as the rules during codegen don't allow a directive
            // to get hold of a view provdier on the same element. We still do this semantic
            // as it simplifies our model to having only one runtime injector per element.
            var providerChildNodeCount = resolvedProvider.providerType === template_ast_1.ProviderAstType.PrivateService ? 0 : childNodeCount;
            _this.view.injectorGetMethod.addStmt(createInjectInternalCondition(_this.nodeIndex, providerChildNodeCount, resolvedProvider, providerExpr));
        });
        this._queries.values().forEach(function (queries) {
            return queries.forEach(function (query) { return query.afterChildren(_this.view.updateContentQueriesMethod); });
        });
    };
    CompileElement.prototype.addContentNode = function (ngContentIndex, nodeExpr) {
        this.contentNodesByNgContentIndex[ngContentIndex].push(nodeExpr);
    };
    CompileElement.prototype.getComponent = function () {
        return lang_1.isPresent(this.component) ? this._instances.get(identifiers_1.identifierToken(this.component.type)) :
            null;
    };
    CompileElement.prototype.getProviderTokens = function () {
        return this._resolvedProviders.values().map(function (resolvedProvider) { return util_1.createDiTokenExpression(resolvedProvider.token); });
    };
    CompileElement.prototype._getQueriesFor = function (token) {
        var result = [];
        var currentEl = this;
        var distance = 0;
        var queries;
        while (!currentEl.isNull()) {
            queries = currentEl._queries.get(token);
            if (lang_1.isPresent(queries)) {
                collection_1.ListWrapper.addAll(result, queries.filter(function (query) { return query.meta.descendants || distance <= 1; }));
            }
            if (currentEl._directives.length > 0) {
                distance++;
            }
            currentEl = currentEl.parent;
        }
        queries = this.view.componentView.viewQueries.get(token);
        if (lang_1.isPresent(queries)) {
            collection_1.ListWrapper.addAll(result, queries);
        }
        return result;
    };
    CompileElement.prototype._addQuery = function (queryMeta, directiveInstance) {
        var propName = "_query_" + queryMeta.selectors[0].name + "_" + this.nodeIndex + "_" + this._queryCount++;
        var queryList = compile_query_1.createQueryList(queryMeta, directiveInstance, propName, this.view);
        var query = new compile_query_1.CompileQuery(queryMeta, queryList, directiveInstance, this.view);
        compile_query_1.addQueryToTokenMap(this._queries, query);
        return query;
    };
    CompileElement.prototype._getLocalDependency = function (requestingProviderType, dep) {
        var result = null;
        // constructor content query
        if (lang_1.isBlank(result) && lang_1.isPresent(dep.query)) {
            result = this._addQuery(dep.query, null).queryList;
        }
        // constructor view query
        if (lang_1.isBlank(result) && lang_1.isPresent(dep.viewQuery)) {
            result = compile_query_1.createQueryList(dep.viewQuery, null, "_viewQuery_" + dep.viewQuery.selectors[0].name + "_" + this.nodeIndex + "_" + this._componentConstructorViewQueryLists.length, this.view);
            this._componentConstructorViewQueryLists.push(result);
        }
        if (lang_1.isPresent(dep.token)) {
            // access builtins with special visibility
            if (lang_1.isBlank(result)) {
                if (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ChangeDetectorRef))) {
                    if (requestingProviderType === template_ast_1.ProviderAstType.Component) {
                        return this._compViewExpr.prop('ref');
                    }
                    else {
                        return o.THIS_EXPR.prop('ref');
                    }
                }
            }
            // access regular providers on the element
            if (lang_1.isBlank(result)) {
                result = this._instances.get(dep.token);
            }
        }
        return result;
    };
    CompileElement.prototype._getDependency = function (requestingProviderType, dep) {
        var currElement = this;
        var result = null;
        if (dep.isValue) {
            result = o.literal(dep.value);
        }
        if (lang_1.isBlank(result) && !dep.isSkipSelf) {
            result = this._getLocalDependency(requestingProviderType, dep);
        }
        // check parent elements
        while (lang_1.isBlank(result) && !currElement.parent.isNull()) {
            currElement = currElement.parent;
            result = currElement._getLocalDependency(template_ast_1.ProviderAstType.PublicService, new compile_metadata_1.CompileDiDependencyMetadata({ token: dep.token }));
        }
        if (lang_1.isBlank(result)) {
            result = util_1.injectFromViewParentInjector(dep.token, dep.isOptional);
        }
        if (lang_1.isBlank(result)) {
            result = o.NULL_EXPR;
        }
        return util_1.getPropertyInView(result, this.view, currElement.view);
    };
    return CompileElement;
}(CompileNode));
exports.CompileElement = CompileElement;
function createInjectInternalCondition(nodeIndex, childNodeCount, provider, providerExpr) {
    var indexCondition;
    if (childNodeCount > 0) {
        indexCondition = o.literal(nodeIndex)
            .lowerEquals(constants_1.InjectMethodVars.requestNodeIndex)
            .and(constants_1.InjectMethodVars.requestNodeIndex.lowerEquals(o.literal(nodeIndex + childNodeCount)));
    }
    else {
        indexCondition = o.literal(nodeIndex).identical(constants_1.InjectMethodVars.requestNodeIndex);
    }
    return new o.IfStmt(constants_1.InjectMethodVars.token.identical(util_1.createDiTokenExpression(provider.token)).and(indexCondition), [new o.ReturnStatement(providerExpr)]);
}
function createProviderProperty(propName, provider, providerValueExpressions, isMulti, isEager, compileElement) {
    var view = compileElement.view;
    var resolvedProviderValueExpr;
    var type;
    if (isMulti) {
        resolvedProviderValueExpr = o.literalArr(providerValueExpressions);
        type = new o.ArrayType(o.DYNAMIC_TYPE);
    }
    else {
        resolvedProviderValueExpr = providerValueExpressions[0];
        type = providerValueExpressions[0].type;
    }
    if (lang_1.isBlank(type)) {
        type = o.DYNAMIC_TYPE;
    }
    if (isEager) {
        view.fields.push(new o.ClassField(propName, type, [o.StmtModifier.Private]));
        view.createMethod.addStmt(o.THIS_EXPR.prop(propName).set(resolvedProviderValueExpr).toStmt());
    }
    else {
        var internalField = "_" + propName;
        view.fields.push(new o.ClassField(internalField, type, [o.StmtModifier.Private]));
        var getter = new compile_method_1.CompileMethod(view);
        getter.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
        // Note: Equals is important for JS so that it also checks the undefined case!
        getter.addStmt(new o.IfStmt(o.THIS_EXPR.prop(internalField).isBlank(), [o.THIS_EXPR.prop(internalField).set(resolvedProviderValueExpr).toStmt()]));
        getter.addStmt(new o.ReturnStatement(o.THIS_EXPR.prop(internalField)));
        view.getters.push(new o.ClassGetter(propName, getter.finish(), type));
    }
    return o.THIS_EXPR.prop(propName);
}
var _QueryWithRead = (function () {
    function _QueryWithRead(query, match) {
        this.query = query;
        this.read = lang_1.isPresent(query.meta.read) ? query.meta.read : match;
    }
    return _QueryWithRead;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZV9lbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1CUkplcjFKOS50bXAvYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3ZpZXdfY29tcGlsZXIvY29tcGlsZV9lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksQ0FBQyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDMUMsNEJBQTJDLGdCQUFnQixDQUFDLENBQUE7QUFDNUQsMEJBQStCLGFBQWEsQ0FBQyxDQUFBO0FBRTdDLHFCQUFpQywwQkFBMEIsQ0FBQyxDQUFBO0FBQzVELDJCQUE0QyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzdFLDZCQUFzRSxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hGLGlDQVNPLHFCQUFxQixDQUFDLENBQUE7QUFDN0IscUJBQXVGLFFBQVEsQ0FBQyxDQUFBO0FBQ2hHLDhCQUFnRSxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2xGLCtCQUE0QixrQkFBa0IsQ0FBQyxDQUFBO0FBRS9DO0lBQ0UscUJBQW1CLE1BQXNCLEVBQVMsSUFBaUIsRUFBUyxTQUFpQixFQUMxRSxVQUF3QixFQUFTLFNBQXNCO1FBRHZELFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDMUUsZUFBVSxHQUFWLFVBQVUsQ0FBYztRQUFTLGNBQVMsR0FBVCxTQUFTLENBQWE7SUFBRyxDQUFDO0lBRTlFLDRCQUFNLEdBQU4sY0FBb0IsTUFBTSxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRELG1DQUFhLEdBQWIsY0FBMkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLGtCQUFDO0FBQUQs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O1FBQzFFLDhFQUE4RTtRQUM5RSxNQUFNLENBQUMsT0FBTyxDQUNWLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFDekMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFFRDtJQUVFLHdCQUFtQixLQUFtQixFQUFFLEtBQTJCO1FBQWhELFVBQUssR0FBTCxLQUFLLENBQWM7UUFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ25FLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFMRCxJQUtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbyBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge0lkZW50aWZpZXJzLCBpZGVudGlmaWVyVG9rZW59IGZyb20gJy4uL2lkZW50aWZpZXJzJztcbmltcG9ydCB7SW5qZWN0TWV0aG9kVmFyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtDb21waWxlVmlld30gZnJvbSAnLi9jb21waWxlX3ZpZXcnO1xuaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyLCBTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtUZW1wbGF0ZUFzdCwgUHJvdmlkZXJBc3QsIFByb3ZpZGVyQXN0VHlwZSwgUmVmZXJlbmNlQXN0fSBmcm9tICcuLi90ZW1wbGF0ZV9hc3QnO1xuaW1wb3J0IHtcbiAgQ29tcGlsZVRva2VuTWFwLFxuICBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gIENvbXBpbGVUb2tlbk1ldGFkYXRhLFxuICBDb21waWxlUXVlcnlNZXRhZGF0YSxcbiAgQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGEsXG4gIENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YSxcbiAgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSxcbiAgQ29tcGlsZVR5cGVNZXRhZGF0YSxcbn0gZnJvbSAnLi4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge2dldFByb3BlcnR5SW5WaWV3LCBjcmVhdGVEaVRva2VuRXhwcmVzc2lvbiwgaW5qZWN0RnJvbVZpZXdQYXJlbnRJbmplY3Rvcn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7Q29tcGlsZVF1ZXJ5LCBjcmVhdGVRdWVyeUxpc3QsIGFkZFF1ZXJ5VG9Ub2tlbk1hcH0gZnJvbSAnLi9jb21waWxlX3F1ZXJ5JztcbmltcG9ydCB7Q29tcGlsZU1ldGhvZH0gZnJvbSAnLi9jb21waWxlX21ldGhvZCc7XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlTm9kZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXJlbnQ6IENvbXBpbGVFbGVtZW50LCBwdWJsaWMgdmlldzogQ29tcGlsZVZpZXcsIHB1YmxpYyBub2RlSW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICAgcHVibGljIHJlbmRlck5vZGU6IG8uRXhwcmVzc2lvbiwgcHVibGljIHNvdXJjZUFzdDogVGVtcGxhdGVBc3QpIHt9XG5cbiAgaXNOdWxsKCk6IGJvb2xlYW4geyByZXR1cm4gaXNCbGFuayh0aGlzLnJlbmRlck5vZGUpOyB9XG5cbiAgaXNSb290RWxlbWVudCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMudmlldyAhPSB0aGlzLnBhcmVudC52aWV3OyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlRWxlbWVudCBleHRlbmRzIENvbXBpbGVOb2RlIHtcbiAgc3RhdGljIGNyZWF0ZU51bGwoKTogQ29tcGlsZUVsZW1lbnQge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZUVsZW1lbnQobnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgW10sIFtdLCBmYWxzZSwgZmFsc2UsIFtdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBWaWV3RXhwcjogby5FeHByZXNzaW9uID0gbnVsbDtcbiAgcHVibGljIGFwcEVsZW1lbnQ6IG8uUmVhZFByb3BFeHByO1xuICBwdWJsaWMgZWxlbWVudFJlZjogby5FeHByZXNzaW9uO1xuICBwdWJsaWMgaW5qZWN0b3I6IG8uRXhwcmVzc2lvbjtcbiAgcHJpdmF0ZSBfaW5zdGFuY2VzID0gbmV3IENvbXBpbGVUb2tlbk1hcDxvLkV4cHJlc3Npb24+KCk7XG4gIHByaXZhdGUgX3Jlc29sdmVkUHJvdmlkZXJzOiBDb21waWxlVG9rZW5NYXA8UHJvdmlkZXJBc3Q+O1xuXG4gIHByaXZhdGUgX3F1ZXJ5Q291bnQgPSAwO1xuICBwcml2YXRlIF9xdWVyaWVzID0gbmV3IENvbXBpbGVUb2tlbk1hcDxDb21waWxlUXVlcnlbXT4oKTtcbiAgcHJpdmF0ZSBfY29tcG9uZW50Q29uc3RydWN0b3JWaWV3UXVlcnlMaXN0czogby5FeHByZXNzaW9uW10gPSBbXTtcblxuICBwdWJsaWMgY29udGVudE5vZGVzQnlOZ0NvbnRlbnRJbmRleDogQXJyYXk8by5FeHByZXNzaW9uPltdID0gbnVsbDtcbiAgcHVibGljIGVtYmVkZGVkVmlldzogQ29tcGlsZVZpZXc7XG4gIHB1YmxpYyBkaXJlY3RpdmVJbnN0YW5jZXM6IG8uRXhwcmVzc2lvbltdO1xuICBwdWJsaWMgcmVmZXJlbmNlVG9rZW5zOiB7W2tleTogc3RyaW5nXTogQ29tcGlsZVRva2VuTWV0YWRhdGF9O1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogQ29tcGlsZUVsZW1lbnQsIHZpZXc6IENvbXBpbGVWaWV3LCBub2RlSW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICAgcmVuZGVyTm9kZTogby5FeHByZXNzaW9uLCBzb3VyY2VBc3Q6IFRlbXBsYXRlQXN0LFxuICAgICAgICAgICAgICBwdWJsaWMgY29tcG9uZW50OiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2RpcmVjdGl2ZXM6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YVtdLFxuICAgICAgICAgICAgICBwcml2YXRlIF9yZXNvbHZlZFByb3ZpZGVyc0FycmF5OiBQcm92aWRlckFzdFtdLCBwdWJsaWMgaGFzVmlld0NvbnRhaW5lcjogYm9vbGVhbixcbiAgICAgICAgICAgICAgcHVibGljIGhhc0VtYmVkZGVkVmlldzogYm9vbGVhbiwgcmVmZXJlbmNlczogUmVmZXJlbmNlQXN0W10pIHtcbiAgICBzdXBlcihwYXJlbnQsIHZpZXcsIG5vZGVJbmRleCwgcmVuZGVyTm9kZSwgc291cmNlQXN0KTtcbiAgICB0aGlzLnJlZmVyZW5jZVRva2VucyA9IHt9O1xuICAgIHJlZmVyZW5jZXMuZm9yRWFjaChyZWYgPT4gdGhpcy5yZWZlcmVuY2VUb2tlbnNbcmVmLm5hbWVdID0gcmVmLnZhbHVlKTtcblxuICAgIHRoaXMuZWxlbWVudFJlZiA9IG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy5FbGVtZW50UmVmKS5pbnN0YW50aWF0ZShbdGhpcy5yZW5kZXJOb2RlXSk7XG4gICAgdGhpcy5faW5zdGFuY2VzLmFkZChpZGVudGlmaWVyVG9rZW4oSWRlbnRpZmllcnMuRWxlbWVudFJlZiksIHRoaXMuZWxlbWVudFJlZik7XG4gICAgdGhpcy5pbmplY3RvciA9IG8uVEhJU19FWFBSLmNhbGxNZXRob2QoJ2luamVjdG9yJywgW28ubGl0ZXJhbCh0aGlzLm5vZGVJbmRleCldKTtcbiAgICB0aGlzLl9pbnN0YW5jZXMuYWRkKGlkZW50aWZpZXJUb2tlbihJZGVudGlmaWVycy5JbmplY3RvciksIHRoaXMuaW5qZWN0b3IpO1xuICAgIHRoaXMuX2luc3RhbmNlcy5hZGQoaWRlbnRpZmllclRva2VuKElkZW50aWZpZXJzLlJlbmRlcmVyKSwgby5USElTX0VYUFIucHJvcCgncmVuZGVyZXInKSk7XG4gICAgaWYgKHRoaXMuaGFzVmlld0NvbnRhaW5lciB8fCB0aGlzLmhhc0VtYmVkZGVkVmlldyB8fCBpc1ByZXNlbnQodGhpcy5jb21wb25lbnQpKSB7XG4gICAgICB0aGlzLl9jcmVhdGVBcHBFbGVtZW50KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlQXBwRWxlbWVudCgpIHtcbiAgICB2YXIgZmllbGROYW1lID0gYF9hcHBFbF8ke3RoaXMubm9kZUluZGV4fWA7XG4gICAgdmFyIHBhcmVudE5vZGVJbmRleCA9IHRoaXMuaXNSb290RWxlbWVudCgpID8gbnVsbCA6IHRoaXMucGFyZW50Lm5vZGVJbmRleDtcbiAgICB0aGlzLnZpZXcuZmllbGRzLnB1c2gobmV3IG8uQ2xhc3NGaWVsZChmaWVsZE5hbWUsIG8uaW1wb3J0VHlwZShJZGVudGlmaWVycy5BcHBFbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbby5TdG10TW9kaWZpZXIuUHJpdmF0ZV0pKTtcbiAgICB2YXIgc3RhdGVtZW50ID0gby5USElTX0VYUFIucHJvcChmaWVsZE5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0KG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy5BcHBFbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmluc3RhbnRpYXRlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5saXRlcmFsKHRoaXMubm9kZUluZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5saXRlcmFsKHBhcmVudE5vZGVJbmRleCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uVEhJU19FWFBSLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlck5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RtdCgpO1xuICAgIHRoaXMudmlldy5jcmVhdGVNZXRob2QuYWRkU3RtdChzdGF0ZW1lbnQpO1xuICAgIHRoaXMuYXBwRWxlbWVudCA9IG8uVEhJU19FWFBSLnByb3AoZmllbGROYW1lKTtcbiAgICB0aGlzLl9pbnN0YW5jZXMuYWRkKGlkZW50aWZpZXJUb2tlbihJZGVudGlmaWVycy5BcHBFbGVtZW50KSwgdGhpcy5hcHBFbGVtZW50KTtcbiAgfVxuXG4gIHNldENvbXBvbmVudFZpZXcoY29tcFZpZXdFeHByOiBvLkV4cHJlc3Npb24pIHtcbiAgICB0aGlzLl9jb21wVmlld0V4cHIgPSBjb21wVmlld0V4cHI7XG4gICAgdGhpcy5jb250ZW50Tm9kZXNCeU5nQ29udGVudEluZGV4ID1cbiAgICAgICAgTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKHRoaXMuY29tcG9uZW50LnRlbXBsYXRlLm5nQ29udGVudFNlbGVjdG9ycy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb250ZW50Tm9kZXNCeU5nQ29udGVudEluZGV4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmNvbnRlbnROb2Rlc0J5TmdDb250ZW50SW5kZXhbaV0gPSBbXTtcbiAgICB9XG4gIH1cblxuICBzZXRFbWJlZGRlZFZpZXcoZW1iZWRkZWRWaWV3OiBDb21waWxlVmlldykge1xuICAgIHRoaXMuZW1iZWRkZWRWaWV3ID0gZW1iZWRkZWRWaWV3O1xuICAgIGlmIChpc1ByZXNlbnQoZW1iZWRkZWRWaWV3KSkge1xuICAgICAgdmFyIGNyZWF0ZVRlbXBsYXRlUmVmRXhwciA9XG4gICAgICAgICAgby5pbXBvcnRFeHByKElkZW50aWZpZXJzLlRlbXBsYXRlUmVmXylcbiAgICAgICAgICAgICAgLmluc3RhbnRpYXRlKFt0aGlzLmFwcEVsZW1lbnQsIHRoaXMuZW1iZWRkZWRWaWV3LnZpZXdGYWN0b3J5XSk7XG4gICAgICB2YXIgcHJvdmlkZXIgPSBuZXcgQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGEoXG4gICAgICAgICAge3Rva2VuOiBpZGVudGlmaWVyVG9rZW4oSWRlbnRpZmllcnMuVGVtcGxhdGVSZWYpLCB1c2VWYWx1ZTogY3JlYXRlVGVtcGxhdGVSZWZFeHByfSk7XG4gICAgICAvLyBBZGQgVGVtcGxhdGVSZWYgYXMgZmlyc3QgcHJvdmlkZXIgYXMgaXQgZG9lcyBub3QgaGF2ZSBkZXBzIG9uIG90aGVyIHByb3ZpZGVyc1xuICAgICAgdGhpcy5fcmVzb2x2ZWRQcm92aWRlcnNBcnJheS51bnNoaWZ0KG5ldyBQcm92aWRlckFzdChwcm92aWRlci50b2tlbiwgZmFsc2UsIHRydWUsIFtwcm92aWRlcl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb3ZpZGVyQXN0VHlwZS5CdWlsdGluLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZUFzdC5zb3VyY2VTcGFuKSk7XG4gICAgfVxuICB9XG5cbiAgYmVmb3JlQ2hpbGRyZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaGFzVmlld0NvbnRhaW5lcikge1xuICAgICAgdGhpcy5faW5zdGFuY2VzLmFkZChpZGVudGlmaWVyVG9rZW4oSWRlbnRpZmllcnMuVmlld0NvbnRhaW5lclJlZiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwRWxlbWVudC5wcm9wKCd2Y1JlZicpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZXNvbHZlZFByb3ZpZGVycyA9IG5ldyBDb21waWxlVG9rZW5NYXA8UHJvdmlkZXJBc3Q+KCk7XG4gICAgdGhpcy5fcmVzb2x2ZWRQcm92aWRlcnNBcnJheS5mb3JFYWNoKHByb3ZpZGVyID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvbHZlZFByb3ZpZGVycy5hZGQocHJvdmlkZXIudG9rZW4sIHByb3ZpZGVyKSk7XG5cbiAgICAvLyBjcmVhdGUgYWxsIHRoZSBwcm92aWRlciBpbnN0YW5jZXMsIHNvbWUgaW4gdGhlIHZpZXcgY29uc3RydWN0b3IsXG4gICAgLy8gc29tZSBhcyBnZXR0ZXJzLiBXZSByZWx5IG9uIHRoZSBmYWN0IHRoYXQgdGhleSBhcmUgYWxyZWFkeSBzb3J0ZWQgdG9wb2xvZ2ljYWxseS5cbiAgICB0aGlzLl9yZXNvbHZlZFByb3ZpZGVycy52YWx1ZXMoKS5mb3JFYWNoKChyZXNvbHZlZFByb3ZpZGVyKSA9PiB7XG4gICAgICB2YXIgcHJvdmlkZXJWYWx1ZUV4cHJlc3Npb25zID0gcmVzb2x2ZWRQcm92aWRlci5wcm92aWRlcnMubWFwKChwcm92aWRlcikgPT4ge1xuICAgICAgICBpZiAoaXNQcmVzZW50KHByb3ZpZGVyLnVzZUV4aXN0aW5nKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9nZXREZXBlbmRlbmN5KFxuICAgICAgICAgICAgICByZXNvbHZlZFByb3ZpZGVyLnByb3ZpZGVyVHlwZSxcbiAgICAgICAgICAgICAgbmV3IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YSh7dG9rZW46IHByb3ZpZGVyLnVzZUV4aXN0aW5nfSkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChwcm92aWRlci51c2VGYWN0b3J5KSkge1xuICAgICAgICAgIHZhciBkZXBzID0gaXNQcmVzZW50KHByb3ZpZGVyLmRlcHMpID8gcHJvdmlkZXIuZGVwcyA6IHByb3ZpZGVyLnVzZUZhY3RvcnkuZGlEZXBzO1xuICAgICAgICAgIHZhciBkZXBzRXhwciA9IGRlcHMubWFwKChkZXApID0+IHRoaXMuX2dldERlcGVuZGVuY3kocmVzb2x2ZWRQcm92aWRlci5wcm92aWRlclR5cGUsIGRlcCkpO1xuICAgICAgICAgIHJldHVybiBvLmltcG9ydEV4cHIocHJvdmlkZXIudXNlRmFjdG9yeSkuY2FsbEZuKGRlcHNFeHByKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQocHJvdmlkZXIudXNlQ2xhc3MpKSB7XG4gICAgICAgICAgdmFyIGRlcHMgPSBpc1ByZXNlbnQocHJvdmlkZXIuZGVwcykgPyBwcm92aWRlci5kZXBzIDogcHJvdmlkZXIudXNlQ2xhc3MuZGlEZXBzO1xuICAgICAgICAgIHZhciBkZXBzRXhwciA9IGRlcHMubWFwKChkZXApID0+IHRoaXMuX2dldERlcGVuZGVuY3kocmVzb2x2ZWRQcm92aWRlci5wcm92aWRlclR5cGUsIGRlcCkpO1xuICAgICAgICAgIHJldHVybiBvLmltcG9ydEV4cHIocHJvdmlkZXIudXNlQ2xhc3MpXG4gICAgICAgICAgICAgIC5pbnN0YW50aWF0ZShkZXBzRXhwciwgby5pbXBvcnRUeXBlKHByb3ZpZGVyLnVzZUNsYXNzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHByb3ZpZGVyLnVzZVZhbHVlIGluc3RhbmNlb2YgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIG8uaW1wb3J0RXhwcihwcm92aWRlci51c2VWYWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChwcm92aWRlci51c2VWYWx1ZSBpbnN0YW5jZW9mIG8uRXhwcmVzc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyLnVzZVZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gby5saXRlcmFsKHByb3ZpZGVyLnVzZVZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIHByb3BOYW1lID0gYF8ke3Jlc29sdmVkUHJvdmlkZXIudG9rZW4ubmFtZX1fJHt0aGlzLm5vZGVJbmRleH1fJHt0aGlzLl9pbnN0YW5jZXMuc2l6ZX1gO1xuICAgICAgdmFyIGluc3RhbmNlID1cbiAgICAgICAgICBjcmVhdGVQcm92aWRlclByb3BlcnR5KHByb3BOYW1lLCByZXNvbHZlZFByb3ZpZGVyLCBwcm92aWRlclZhbHVlRXhwcmVzc2lvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZFByb3ZpZGVyLm11bHRpUHJvdmlkZXIsIHJlc29sdmVkUHJvdmlkZXIuZWFnZXIsIHRoaXMpO1xuICAgICAgdGhpcy5faW5zdGFuY2VzLmFkZChyZXNvbHZlZFByb3ZpZGVyLnRva2VuLCBpbnN0YW5jZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRpcmVjdGl2ZUluc3RhbmNlcyA9XG4gICAgICAgIHRoaXMuX2RpcmVjdGl2ZXMubWFwKChkaXJlY3RpdmUpID0+IHRoaXMuX2luc3RhbmNlcy5nZXQoaWRlbnRpZmllclRva2VuKGRpcmVjdGl2ZS50eXBlKSkpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kaXJlY3RpdmVJbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkaXJlY3RpdmVJbnN0YW5jZSA9IHRoaXMuZGlyZWN0aXZlSW5zdGFuY2VzW2ldO1xuICAgICAgdmFyIGRpcmVjdGl2ZSA9IHRoaXMuX2RpcmVjdGl2ZXNbaV07XG4gICAgICBkaXJlY3RpdmUucXVlcmllcy5mb3JFYWNoKChxdWVyeU1ldGEpID0+IHsgdGhpcy5fYWRkUXVlcnkocXVlcnlNZXRhLCBkaXJlY3RpdmVJbnN0YW5jZSk7IH0pO1xuICAgIH1cbiAgICB2YXIgcXVlcmllc1dpdGhSZWFkczogX1F1ZXJ5V2l0aFJlYWRbXSA9IFtdO1xuICAgIHRoaXMuX3Jlc29sdmVkUHJvdmlkZXJzLnZhbHVlcygpLmZvckVhY2goKHJlc29sdmVkUHJvdmlkZXIpID0+IHtcbiAgICAgIHZhciBxdWVyaWVzRm9yUHJvdmlkZXIgPSB0aGlzLl9nZXRRdWVyaWVzRm9yKHJlc29sdmVkUHJvdmlkZXIudG9rZW4pO1xuICAgICAgTGlzdFdyYXBwZXIuYWRkQWxsKFxuICAgICAgICAgIHF1ZXJpZXNXaXRoUmVhZHMsXG4gICAgICAgICAgcXVlcmllc0ZvclByb3ZpZGVyLm1hcChxdWVyeSA9PiBuZXcgX1F1ZXJ5V2l0aFJlYWQocXVlcnksIHJlc29sdmVkUHJvdmlkZXIudG9rZW4pKSk7XG4gICAgfSk7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKHRoaXMucmVmZXJlbmNlVG9rZW5zLCAoXywgdmFyTmFtZSkgPT4ge1xuICAgICAgdmFyIHRva2VuID0gdGhpcy5yZWZlcmVuY2VUb2tlbnNbdmFyTmFtZV07XG4gICAgICB2YXIgdmFyVmFsdWU7XG4gICAgICBpZiAoaXNQcmVzZW50KHRva2VuKSkge1xuICAgICAgICB2YXJWYWx1ZSA9IHRoaXMuX2luc3RhbmNlcy5nZXQodG9rZW4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyVmFsdWUgPSB0aGlzLnJlbmRlck5vZGU7XG4gICAgICB9XG4gICAgICB0aGlzLnZpZXcubG9jYWxzLnNldCh2YXJOYW1lLCB2YXJWYWx1ZSk7XG4gICAgICB2YXIgdmFyVG9rZW4gPSBuZXcgQ29tcGlsZVRva2VuTWV0YWRhdGEoe3ZhbHVlOiB2YXJOYW1lfSk7XG4gICAgICBMaXN0V3JhcHBlci5hZGRBbGwocXVlcmllc1dpdGhSZWFkcywgdGhpcy5fZ2V0UXVlcmllc0Zvcih2YXJUb2tlbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChxdWVyeSA9PiBuZXcgX1F1ZXJ5V2l0aFJlYWQocXVlcnksIHZhclRva2VuKSkpO1xuICAgIH0pO1xuICAgIHF1ZXJpZXNXaXRoUmVhZHMuZm9yRWFjaCgocXVlcnlXaXRoUmVhZCkgPT4ge1xuICAgICAgdmFyIHZhbHVlOiBvLkV4cHJlc3Npb247XG4gICAgICBpZiAoaXNQcmVzZW50KHF1ZXJ5V2l0aFJlYWQucmVhZC5pZGVudGlmaWVyKSkge1xuICAgICAgICAvLyBxdWVyeSBmb3IgYW4gaWRlbnRpZmllclxuICAgICAgICB2YWx1ZSA9IHRoaXMuX2luc3RhbmNlcy5nZXQocXVlcnlXaXRoUmVhZC5yZWFkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHF1ZXJ5IGZvciBhIHJlZmVyZW5jZVxuICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLnJlZmVyZW5jZVRva2Vuc1txdWVyeVdpdGhSZWFkLnJlYWQudmFsdWVdO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRva2VuKSkge1xuICAgICAgICAgIHZhbHVlID0gdGhpcy5faW5zdGFuY2VzLmdldCh0b2tlbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWUgPSB0aGlzLmVsZW1lbnRSZWY7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpc1ByZXNlbnQodmFsdWUpKSB7XG4gICAgICAgIHF1ZXJ5V2l0aFJlYWQucXVlcnkuYWRkVmFsdWUodmFsdWUsIHRoaXMudmlldyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuY29tcG9uZW50KSkge1xuICAgICAgdmFyIGNvbXBvbmVudENvbnN0cnVjdG9yVmlld1F1ZXJ5TGlzdCA9XG4gICAgICAgICAgaXNQcmVzZW50KHRoaXMuY29tcG9uZW50KSA/IG8ubGl0ZXJhbEFycih0aGlzLl9jb21wb25lbnRDb25zdHJ1Y3RvclZpZXdRdWVyeUxpc3RzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uTlVMTF9FWFBSO1xuICAgICAgdmFyIGNvbXBFeHByID0gaXNQcmVzZW50KHRoaXMuZ2V0Q29tcG9uZW50KCkpID8gdGhpcy5nZXRDb21wb25lbnQoKSA6IG8uTlVMTF9FWFBSO1xuICAgICAgdGhpcy52aWV3LmNyZWF0ZU1ldGhvZC5hZGRTdG10KFxuICAgICAgICAgIHRoaXMuYXBwRWxlbWVudC5jYWxsTWV0aG9kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5pdENvbXBvbmVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjb21wRXhwciwgY29tcG9uZW50Q29uc3RydWN0b3JWaWV3UXVlcnlMaXN0LCB0aGlzLl9jb21wVmlld0V4cHJdKVxuICAgICAgICAgICAgICAudG9TdG10KCkpO1xuICAgIH1cbiAgfVxuXG4gIGFmdGVyQ2hpbGRyZW4oY2hpbGROb2RlQ291bnQ6IG51bWJlcikge1xuICAgIHRoaXMuX3Jlc29sdmVkUHJvdmlkZXJzLnZhbHVlcygpLmZvckVhY2goKHJlc29sdmVkUHJvdmlkZXIpID0+IHtcbiAgICAgIC8vIE5vdGU6IGFmdGVyQ2hpbGRyZW4gaXMgY2FsbGVkIGFmdGVyIHJlY3Vyc2luZyBpbnRvIGNoaWxkcmVuLlxuICAgICAgLy8gVGhpcyBpcyBnb29kIHNvIHRoYXQgYW4gaW5qZWN0b3IgbWF0Y2ggaW4gYW4gZWxlbWVudCB0aGF0IGlzIGNsb3NlciB0byBhIHJlcXVlc3RpbmcgZWxlbWVudFxuICAgICAgLy8gbWF0Y2hlcyBmaXJzdC5cbiAgICAgIHZhciBwcm92aWRlckV4cHIgPSB0aGlzLl9pbnN0YW5jZXMuZ2V0KHJlc29sdmVkUHJvdmlkZXIudG9rZW4pO1xuICAgICAgLy8gTm90ZTogdmlldyBwcm92aWRlcnMgYXJlIG9ubHkgdmlzaWJsZSBvbiB0aGUgaW5qZWN0b3Igb2YgdGhhdCBlbGVtZW50LlxuICAgICAgLy8gVGhpcyBpcyBub3QgZnVsbHkgY29ycmVjdCBhcyB0aGUgcnVsZXMgZHVyaW5nIGNvZGVnZW4gZG9uJ3QgYWxsb3cgYSBkaXJlY3RpdmVcbiAgICAgIC8vIHRvIGdldCBob2xkIG9mIGEgdmlldyBwcm92ZGllciBvbiB0aGUgc2FtZSBlbGVtZW50LiBXZSBzdGlsbCBkbyB0aGlzIHNlbWFudGljXG4gICAgICAvLyBhcyBpdCBzaW1wbGlmaWVzIG91ciBtb2RlbCB0byBoYXZpbmcgb25seSBvbmUgcnVudGltZSBpbmplY3RvciBwZXIgZWxlbWVudC5cbiAgICAgIHZhciBwcm92aWRlckNoaWxkTm9kZUNvdW50ID1cbiAgICAgICAgICByZXNvbHZlZFByb3ZpZGVyLnByb3ZpZGVyVHlwZSA9PT0gUHJvdmlkZXJBc3RUeXBlLlByaXZhdGVTZXJ2aWNlID8gMCA6IGNoaWxkTm9kZUNvdW50O1xuICAgICAgdGhpcy52aWV3LmluamVjdG9yR2V0TWV0aG9kLmFkZFN0bXQoY3JlYXRlSW5qZWN0SW50ZXJuYWxDb25kaXRpb24oXG4gICAgICAgICAgdGhpcy5ub2RlSW5kZXgsIHByb3ZpZGVyQ2hpbGROb2RlQ291bnQsIHJlc29sdmVkUHJvdmlkZXIsIHByb3ZpZGVyRXhwcikpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fcXVlcmllcy52YWx1ZXMoKS5mb3JFYWNoKFxuICAgICAgICAocXVlcmllcykgPT5cbiAgICAgICAgICAgIHF1ZXJpZXMuZm9yRWFjaCgocXVlcnkpID0+IHF1ZXJ5LmFmdGVyQ2hpbGRyZW4odGhpcy52aWV3LnVwZGF0ZUNvbnRlbnRRdWVyaWVzTWV0aG9kKSkpO1xuICB9XG5cbiAgYWRkQ29udGVudE5vZGUobmdDb250ZW50SW5kZXg6IG51bWJlciwgbm9kZUV4cHI6IG8uRXhwcmVzc2lvbikge1xuICAgIHRoaXMuY29udGVudE5vZGVzQnlOZ0NvbnRlbnRJbmRleFtuZ0NvbnRlbnRJbmRleF0ucHVzaChub2RlRXhwcik7XG4gIH1cblxuICBnZXRDb21wb25lbnQoKTogby5FeHByZXNzaW9uIHtcbiAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuY29tcG9uZW50KSA/IHRoaXMuX2luc3RhbmNlcy5nZXQoaWRlbnRpZmllclRva2VuKHRoaXMuY29tcG9uZW50LnR5cGUpKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuICB9XG5cbiAgZ2V0UHJvdmlkZXJUb2tlbnMoKTogby5FeHByZXNzaW9uW10ge1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlZFByb3ZpZGVycy52YWx1ZXMoKS5tYXAoXG4gICAgICAgIChyZXNvbHZlZFByb3ZpZGVyKSA9PiBjcmVhdGVEaVRva2VuRXhwcmVzc2lvbihyZXNvbHZlZFByb3ZpZGVyLnRva2VuKSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRRdWVyaWVzRm9yKHRva2VuOiBDb21waWxlVG9rZW5NZXRhZGF0YSk6IENvbXBpbGVRdWVyeVtdIHtcbiAgICB2YXIgcmVzdWx0OiBDb21waWxlUXVlcnlbXSA9IFtdO1xuICAgIHZhciBjdXJyZW50RWw6IENvbXBpbGVFbGVtZW50ID0gdGhpcztcbiAgICB2YXIgZGlzdGFuY2UgPSAwO1xuICAgIHZhciBxdWVyaWVzOiBDb21waWxlUXVlcnlbXTtcbiAgICB3aGlsZSAoIWN1cnJlbnRFbC5pc051bGwoKSkge1xuICAgICAgcXVlcmllcyA9IGN1cnJlbnRFbC5fcXVlcmllcy5nZXQodG9rZW4pO1xuICAgICAgaWYgKGlzUHJlc2VudChxdWVyaWVzKSkge1xuICAgICAgICBMaXN0V3JhcHBlci5hZGRBbGwocmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcmllcy5maWx0ZXIoKHF1ZXJ5KSA9PiBxdWVyeS5tZXRhLmRlc2NlbmRhbnRzIHx8IGRpc3RhbmNlIDw9IDEpKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50RWwuX2RpcmVjdGl2ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBkaXN0YW5jZSsrO1xuICAgICAgfVxuICAgICAgY3VycmVudEVsID0gY3VycmVudEVsLnBhcmVudDtcbiAgICB9XG4gICAgcXVlcmllcyA9IHRoaXMudmlldy5jb21wb25lbnRWaWV3LnZpZXdRdWVyaWVzLmdldCh0b2tlbik7XG4gICAgaWYgKGlzUHJlc2VudChxdWVyaWVzKSkge1xuICAgICAgTGlzdFdyYXBwZXIuYWRkQWxsKHJlc3VsdCwgcXVlcmllcyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9hZGRRdWVyeShxdWVyeU1ldGE6IENvbXBpbGVRdWVyeU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVJbnN0YW5jZTogby5FeHByZXNzaW9uKTogQ29tcGlsZVF1ZXJ5IHtcbiAgICB2YXIgcHJvcE5hbWUgPSBgX3F1ZXJ5XyR7cXVlcnlNZXRhLnNlbGVjdG9yc1swXS5uYW1lfV8ke3RoaXMubm9kZUluZGV4fV8ke3RoaXMuX3F1ZXJ5Q291bnQrK31gO1xuICAgIHZhciBxdWVyeUxpc3QgPSBjcmVhdGVRdWVyeUxpc3QocXVlcnlNZXRhLCBkaXJlY3RpdmVJbnN0YW5jZSwgcHJvcE5hbWUsIHRoaXMudmlldyk7XG4gICAgdmFyIHF1ZXJ5ID0gbmV3IENvbXBpbGVRdWVyeShxdWVyeU1ldGEsIHF1ZXJ5TGlzdCwgZGlyZWN0aXZlSW5zdGFuY2UsIHRoaXMudmlldyk7XG4gICAgYWRkUXVlcnlUb1Rva2VuTWFwKHRoaXMuX3F1ZXJpZXMsIHF1ZXJ5KTtcbiAgICByZXR1cm4gcXVlcnk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMb2NhbERlcGVuZGVuY3kocmVxdWVzdGluZ1Byb3ZpZGVyVHlwZTogUHJvdmlkZXJBc3RUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEpOiBvLkV4cHJlc3Npb24ge1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIC8vIGNvbnN0cnVjdG9yIGNvbnRlbnQgcXVlcnlcbiAgICBpZiAoaXNCbGFuayhyZXN1bHQpICYmIGlzUHJlc2VudChkZXAucXVlcnkpKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl9hZGRRdWVyeShkZXAucXVlcnksIG51bGwpLnF1ZXJ5TGlzdDtcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3RvciB2aWV3IHF1ZXJ5XG4gICAgaWYgKGlzQmxhbmsocmVzdWx0KSAmJiBpc1ByZXNlbnQoZGVwLnZpZXdRdWVyeSkpIHtcbiAgICAgIHJlc3VsdCA9IGNyZWF0ZVF1ZXJ5TGlzdChcbiAgICAgICAgICBkZXAudmlld1F1ZXJ5LCBudWxsLFxuICAgICAgICAgIGBfdmlld1F1ZXJ5XyR7ZGVwLnZpZXdRdWVyeS5zZWxlY3RvcnNbMF0ubmFtZX1fJHt0aGlzLm5vZGVJbmRleH1fJHt0aGlzLl9jb21wb25lbnRDb25zdHJ1Y3RvclZpZXdRdWVyeUxpc3RzLmxlbmd0aH1gLFxuICAgICAgICAgIHRoaXMudmlldyk7XG4gICAgICB0aGlzLl9jb21wb25lbnRDb25zdHJ1Y3RvclZpZXdRdWVyeUxpc3RzLnB1c2gocmVzdWx0KTtcbiAgICB9XG5cbiAgICBpZiAoaXNQcmVzZW50KGRlcC50b2tlbikpIHtcbiAgICAgIC8vIGFjY2VzcyBidWlsdGlucyB3aXRoIHNwZWNpYWwgdmlzaWJpbGl0eVxuICAgICAgaWYgKGlzQmxhbmsocmVzdWx0KSkge1xuICAgICAgICBpZiAoZGVwLnRva2VuLmVxdWFsc1RvKGlkZW50aWZpZXJUb2tlbihJZGVudGlmaWVycy5DaGFuZ2VEZXRlY3RvclJlZikpKSB7XG4gICAgICAgICAgaWYgKHJlcXVlc3RpbmdQcm92aWRlclR5cGUgPT09IFByb3ZpZGVyQXN0VHlwZS5Db21wb25lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb21wVmlld0V4cHIucHJvcCgncmVmJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvLlRISVNfRVhQUi5wcm9wKCdyZWYnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGFjY2VzcyByZWd1bGFyIHByb3ZpZGVycyBvbiB0aGUgZWxlbWVudFxuICAgICAgaWYgKGlzQmxhbmsocmVzdWx0KSkge1xuICAgICAgICByZXN1bHQgPSB0aGlzLl9pbnN0YW5jZXMuZ2V0KGRlcC50b2tlbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXREZXBlbmRlbmN5KHJlcXVlc3RpbmdQcm92aWRlclR5cGU6IFByb3ZpZGVyQXN0VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBkZXA6IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YSk6IG8uRXhwcmVzc2lvbiB7XG4gICAgdmFyIGN1cnJFbGVtZW50OiBDb21waWxlRWxlbWVudCA9IHRoaXM7XG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgaWYgKGRlcC5pc1ZhbHVlKSB7XG4gICAgICByZXN1bHQgPSBvLmxpdGVyYWwoZGVwLnZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGlzQmxhbmsocmVzdWx0KSAmJiAhZGVwLmlzU2tpcFNlbGYpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX2dldExvY2FsRGVwZW5kZW5jeShyZXF1ZXN0aW5nUHJvdmlkZXJUeXBlLCBkZXApO1xuICAgIH1cbiAgICAvLyBjaGVjayBwYXJlbnQgZWxlbWVudHNcbiAgICB3aGlsZSAoaXNCbGFuayhyZXN1bHQpICYmICFjdXJyRWxlbWVudC5wYXJlbnQuaXNOdWxsKCkpIHtcbiAgICAgIGN1cnJFbGVtZW50ID0gY3VyckVsZW1lbnQucGFyZW50O1xuICAgICAgcmVzdWx0ID0gY3VyckVsZW1lbnQuX2dldExvY2FsRGVwZW5kZW5jeShQcm92aWRlckFzdFR5cGUuUHVibGljU2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YSh7dG9rZW46IGRlcC50b2tlbn0pKTtcbiAgICB9XG5cbiAgICBpZiAoaXNCbGFuayhyZXN1bHQpKSB7XG4gICAgICByZXN1bHQgPSBpbmplY3RGcm9tVmlld1BhcmVudEluamVjdG9yKGRlcC50b2tlbiwgZGVwLmlzT3B0aW9uYWwpO1xuICAgIH1cbiAgICBpZiAoaXNCbGFuayhyZXN1bHQpKSB7XG4gICAgICByZXN1bHQgPSBvLk5VTExfRVhQUjtcbiAgICB9XG4gICAgcmV0dXJuIGdldFByb3BlcnR5SW5WaWV3KHJlc3VsdCwgdGhpcy52aWV3LCBjdXJyRWxlbWVudC52aWV3KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVJbmplY3RJbnRlcm5hbENvbmRpdGlvbihub2RlSW5kZXg6IG51bWJlciwgY2hpbGROb2RlQ291bnQ6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyOiBQcm92aWRlckFzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyRXhwcjogby5FeHByZXNzaW9uKTogby5TdGF0ZW1lbnQge1xuICB2YXIgaW5kZXhDb25kaXRpb247XG4gIGlmIChjaGlsZE5vZGVDb3VudCA+IDApIHtcbiAgICBpbmRleENvbmRpdGlvbiA9IG8ubGl0ZXJhbChub2RlSW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgLmxvd2VyRXF1YWxzKEluamVjdE1ldGhvZFZhcnMucmVxdWVzdE5vZGVJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAuYW5kKEluamVjdE1ldGhvZFZhcnMucmVxdWVzdE5vZGVJbmRleC5sb3dlckVxdWFscyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgby5saXRlcmFsKG5vZGVJbmRleCArIGNoaWxkTm9kZUNvdW50KSkpO1xuICB9IGVsc2Uge1xuICAgIGluZGV4Q29uZGl0aW9uID0gby5saXRlcmFsKG5vZGVJbmRleCkuaWRlbnRpY2FsKEluamVjdE1ldGhvZFZhcnMucmVxdWVzdE5vZGVJbmRleCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBvLklmU3RtdChcbiAgICAgIEluamVjdE1ldGhvZFZhcnMudG9rZW4uaWRlbnRpY2FsKGNyZWF0ZURpVG9rZW5FeHByZXNzaW9uKHByb3ZpZGVyLnRva2VuKSkuYW5kKGluZGV4Q29uZGl0aW9uKSxcbiAgICAgIFtuZXcgby5SZXR1cm5TdGF0ZW1lbnQocHJvdmlkZXJFeHByKV0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm92aWRlclByb3BlcnR5KHByb3BOYW1lOiBzdHJpbmcsIHByb3ZpZGVyOiBQcm92aWRlckFzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJWYWx1ZUV4cHJlc3Npb25zOiBvLkV4cHJlc3Npb25bXSwgaXNNdWx0aTogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFYWdlcjogYm9vbGVhbiwgY29tcGlsZUVsZW1lbnQ6IENvbXBpbGVFbGVtZW50KTogby5FeHByZXNzaW9uIHtcbiAgdmFyIHZpZXcgPSBjb21waWxlRWxlbWVudC52aWV3O1xuICB2YXIgcmVzb2x2ZWRQcm92aWRlclZhbHVlRXhwcjtcbiAgdmFyIHR5cGU7XG4gIGlmIChpc011bHRpKSB7XG4gICAgcmVzb2x2ZWRQcm92aWRlclZhbHVlRXhwciA9IG8ubGl0ZXJhbEFycihwcm92aWRlclZhbHVlRXhwcmVzc2lvbnMpO1xuICAgIHR5cGUgPSBuZXcgby5BcnJheVR5cGUoby5EWU5BTUlDX1RZUEUpO1xuICB9IGVsc2Uge1xuICAgIHJlc29sdmVkUHJvdmlkZXJWYWx1ZUV4cHIgPSBwcm92aWRlclZhbHVlRXhwcmVzc2lvbnNbMF07XG4gICAgdHlwZSA9IHByb3ZpZGVyVmFsdWVFeHByZXNzaW9uc1swXS50eXBlO1xuICB9XG4gIGlmIChpc0JsYW5rKHR5cGUpKSB7XG4gICAgdHlwZSA9IG8uRFlOQU1JQ19UWVBFO1xuICB9XG4gIGlmIChpc0VhZ2VyKSB7XG4gICAgdmlldy5maWVsZHMucHVzaChuZXcgby5DbGFzc0ZpZWxkKHByb3BOYW1lLCB0eXBlLCBbby5TdG10TW9kaWZpZXIuUHJpdmF0ZV0pKTtcbiAgICB2aWV3LmNyZWF0ZU1ldGhvZC5hZGRTdG10KG8uVEhJU19FWFBSLnByb3AocHJvcE5hbWUpLnNldChyZXNvbHZlZFByb3ZpZGVyVmFsdWVFeHByKS50b1N0bXQoKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGludGVybmFsRmllbGQgPSBgXyR7cHJvcE5hbWV9YDtcbiAgICB2aWV3LmZpZWxkcy5wdXNoKG5ldyBvLkNsYXNzRmllbGQoaW50ZXJuYWxGaWVsZCwgdHlwZSwgW28uU3RtdE1vZGlmaWVyLlByaXZhdGVdKSk7XG4gICAgdmFyIGdldHRlciA9IG5ldyBDb21waWxlTWV0aG9kKHZpZXcpO1xuICAgIGdldHRlci5yZXNldERlYnVnSW5mbyhjb21waWxlRWxlbWVudC5ub2RlSW5kZXgsIGNvbXBpbGVFbGVtZW50LnNvdXJjZUFzdCk7XG4gICAgLy8gTm90ZTogRXF1YWxzIGlzIGltcG9ydGFudCBmb3IgSlMgc28gdGhhdCBpdCBhbHNvIGNoZWNrcyB0aGUgdW5kZWZpbmVkIGNhc2UhXG4gICAgZ2V0dGVyLmFkZFN0bXQoXG4gICAgICAgIG5ldyBvLklmU3RtdChvLlRISVNfRVhQUi5wcm9wKGludGVybmFsRmllbGQpLmlzQmxhbmsoKSxcbiAgICAgICAgICAgICAgICAgICAgIFtvLlRISVNfRVhQUi5wcm9wKGludGVybmFsRmllbGQpLnNldChyZXNvbHZlZFByb3ZpZGVyVmFsdWVFeHByKS50b1N0bXQoKV0pKTtcbiAgICBnZXR0ZXIuYWRkU3RtdChuZXcgby5SZXR1cm5TdGF0ZW1lbnQoby5USElTX0VYUFIucHJvcChpbnRlcm5hbEZpZWxkKSkpO1xuICAgIHZpZXcuZ2V0dGVycy5wdXNoKG5ldyBvLkNsYXNzR2V0dGVyKHByb3BOYW1lLCBnZXR0ZXIuZmluaXNoKCksIHR5cGUpKTtcbiAgfVxuICByZXR1cm4gby5USElTX0VYUFIucHJvcChwcm9wTmFtZSk7XG59XG5cbmNsYXNzIF9RdWVyeVdpdGhSZWFkIHtcbiAgcHVibGljIHJlYWQ6IENvbXBpbGVUb2tlbk1ldGFkYXRhO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcXVlcnk6IENvbXBpbGVRdWVyeSwgbWF0Y2g6IENvbXBpbGVUb2tlbk1ldGFkYXRhKSB7XG4gICAgdGhpcy5yZWFkID0gaXNQcmVzZW50KHF1ZXJ5Lm1ldGEucmVhZCkgPyBxdWVyeS5tZXRhLnJlYWQgOiBtYXRjaDtcbiAgfVxufVxuIl19