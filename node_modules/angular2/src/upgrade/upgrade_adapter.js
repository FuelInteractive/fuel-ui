'use strict';var core_1 = require('angular2/core');
var async_1 = require('angular2/src/facade/async');
var browser_1 = require('angular2/platform/browser');
var metadata_1 = require('./metadata');
var util_1 = require('./util');
var constants_1 = require('./constants');
var downgrade_ng2_adapter_1 = require('./downgrade_ng2_adapter');
var upgrade_ng1_adapter_1 = require('./upgrade_ng1_adapter');
var angular = require('./angular_js');
var upgradeCount = 0;
/**
 * Use `UpgradeAdapter` to allow AngularJS v1 and Angular v2 to coexist in a single application.
 *
 * The `UpgradeAdapter` allows:
 * 1. creation of Angular v2 component from AngularJS v1 component directive
 *    (See [UpgradeAdapter#upgradeNg1Component()])
 * 2. creation of AngularJS v1 directive from Angular v2 component.
 *    (See [UpgradeAdapter#downgradeNg2Component()])
 * 3. Bootstrapping of a hybrid Angular application which contains both of the frameworks
 *    coexisting in a single application.
 *
 * ## Mental Model
 *
 * When reasoning about how a hybrid application works it is useful to have a mental model which
 * describes what is happening and explains what is happening at the lowest level.
 *
 * 1. There are two independent frameworks running in a single application, each framework treats
 *    the other as a black box.
 * 2. Each DOM element on the page is owned exactly by one framework. Whichever framework
 *    instantiated the element is the owner. Each framework only updates/interacts with its own
 *    DOM elements and ignores others.
 * 3. AngularJS v1 directives always execute inside AngularJS v1 framework codebase regardless of
 *    where they are instantiated.
 * 4. Angular v2 components always execute inside Angular v2 framework codebase regardless of
 *    where they are instantiated.
 * 5. An AngularJS v1 component can be upgraded to an Angular v2 component. This creates an
 *    Angular v2 directive, which bootstraps the AngularJS v1 component directive in that location.
 * 6. An Angular v2 component can be downgraded to an AngularJS v1 component directive. This creates
 *    an AngularJS v1 directive, which bootstraps the Angular v2 component in that location.
 * 7. Whenever an adapter component is instantiated the host element is owned by the framework
 *    doing the instantiation. The other framework then instantiates and owns the view for that
 *    component. This implies that component bindings will always follow the semantics of the
 *    instantiation framework. The syntax is always that of Angular v2 syntax.
 * 8. AngularJS v1 is always bootstrapped first and owns the bottom most view.
 * 9. The new application is running in Angular v2 zone, and therefore it no longer needs calls to
 *    `$apply()`.
 *
 * ### Example
 *
 * ```
 * var adapter = new UpgradeAdapter();
 * var module = angular.module('myExample', []);
 * module.directive('ng2', adapter.downgradeNg2Component(Ng2));
 *
 * module.directive('ng1', function() {
 *   return {
 *      scope: { title: '=' },
 *      template: 'ng1[Hello {{title}}!](<span ng-transclude></span>)'
 *   };
 * });
 *
 *
 * @Component({
 *   selector: 'ng2',
 *   inputs: ['name'],
 *   template: 'ng2[<ng1 [title]="name">transclude</ng1>](<ng-content></ng-content>)',
 *   directives: [adapter.upgradeNg1Component('ng1')]
 * })
 * class Ng2 {
 * }
 *
 * document.body.innerHTML = '<ng2 name="World">project</ng2>';
 *
 * adapter.bootstrap(document.body, ['myExample']).ready(function() {
 *   expect(document.body.textContent).toEqual(
 *       "ng2[ng1[Hello World!](transclude)](project)");
 * });
 * ```
 */
var UpgradeAdapter = (function () {
    function UpgradeAdapter() {
        /* @internal */
        this.idPrefix = "NG2_UPGRADE_" + upgradeCount++ + "_";
        /* @internal */
        this.upgradedComponents = [];
        /* @internal */
        this.downgradedComponents = {};
        /* @internal */
        this.providers = [];
    }
    /**
     * Allows Angular v2 Component to be used from AngularJS v1.
     *
     * Use `downgradeNg2Component` to create an AngularJS v1 Directive Definition Factory from
     * Angular v2 Component. The adapter will bootstrap Angular v2 component from within the
     * AngularJS v1 template.
     *
     * ## Mental Model
     *
     * 1. The component is instantiated by being listed in AngularJS v1 template. This means that the
     *    host element is controlled by AngularJS v1, but the component's view will be controlled by
     *    Angular v2.
     * 2. Even thought the component is instantiated in AngularJS v1, it will be using Angular v2
     *    syntax. This has to be done, this way because we must follow Angular v2 components do not
     *    declare how the attributes should be interpreted.
     *
     * ## Supported Features
     *
     * - Bindings:
     *   - Attribute: `<comp name="World">`
     *   - Interpolation:  `<comp greeting="Hello {{name}}!">`
     *   - Expression:  `<comp [name]="username">`
     *   - Event:  `<comp (close)="doSomething()">`
     * - Content projection: yes
     *
     * ### Example
     *
     * ```
     * var adapter = new UpgradeAdapter();
     * var module = angular.module('myExample', []);
     * module.directive('greet', adapter.downgradeNg2Component(Greeter));
     *
     * @Component({
     *   selector: 'greet',
     *   template: '{{salutation}} {{name}}! - <ng-content></ng-content>'
     * })
     * class Greeter {
     *   @Input() salutation: string;
     *   @Input() name: string;
     * }
     *
     * document.body.innerHTML =
     *   'ng1 template: <greet salutation="Hello" [name]="world">text</greet>';
     *
     * adapter.bootstrap(document.body, ['myExample']).ready(function() {
     *   expect(document.body.textContent).toEqual("ng1 template: Hello world! - text");
     * });
     * ```
     */
    UpgradeAdapter.prototype.downgradeNg2Component = function (type) {
        this.upgradedComponents.push(type);
        var info = metadata_1.getComponentInfo(type);
        return ng1ComponentDirective(info, "" + this.idPrefix + info.selector + "_c");
    };
    /**
     * Allows AngularJS v1 Component to be used from Angular v2.
     *
     * Use `upgradeNg1Component` to create an Angular v2 component from AngularJS v1 Component
     * directive. The adapter will bootstrap AngularJS v1 component from within the Angular v2
     * template.
     *
     * ## Mental Model
     *
     * 1. The component is instantiated by being listed in Angular v2 template. This means that the
     *    host element is controlled by Angular v2, but the component's view will be controlled by
     *    AngularJS v1.
     *
     * ## Supported Features
     *
     * - Bindings:
     *   - Attribute: `<comp name="World">`
     *   - Interpolation:  `<comp greeting="Hello {{name}}!">`
     *   - Expression:  `<comp [name]="username">`
     *   - Event:  `<comp (close)="doSomething()">`
     * - Transclusion: yes
     * - Only some of the features of
     *   [Directive Definition Object](https://docs.angularjs.org/api/ng/service/$compile) are
     *   supported:
     *   - `compile`: not supported because the host element is owned by Angular v2, which does
     *     not allow modifying DOM structure during compilation.
     *   - `controller`: supported. (NOTE: injection of `$attrs` and `$transclude` is not supported.)
     *   - `controllerAs': supported.
     *   - `bindToController': supported.
     *   - `link': supported. (NOTE: only pre-link function is supported.)
     *   - `name': supported.
     *   - `priority': ignored.
     *   - `replace': not supported.
     *   - `require`: supported.
     *   - `restrict`: must be set to 'E'.
     *   - `scope`: supported.
     *   - `template`: supported.
     *   - `templateUrl`: supported.
     *   - `terminal`: ignored.
     *   - `transclude`: supported.
     *
     *
     * ### Example
     *
     * ```
     * var adapter = new UpgradeAdapter();
     * var module = angular.module('myExample', []);
     *
     * module.directive('greet', function() {
     *   return {
     *     scope: {salutation: '=', name: '=' },
     *     template: '{{salutation}} {{name}}! - <span ng-transclude></span>'
     *   };
     * });
     *
     * module.directive('ng2', adapter.downgradeNg2Component(Ng2));
     *
     * @Component({
     *   selector: 'ng2',
     *   template: 'ng2 template: <greet salutation="Hello" [name]="world">text</greet>'
     *   directives: [adapter.upgradeNg1Component('greet')]
     * })
     * class Ng2 {
     * }
     *
     * document.body.innerHTML = '<ng2></ng2>';
     *
     * adapter.bootstrap(document.body, ['myExample']).ready(function() {
     *   expect(document.body.textContent).toEqual("ng2 template: Hello world! - text");
     * });
     * ```
     */
    UpgradeAdapter.prototype.upgradeNg1Component = function (name) {
        if (this.downgradedComponents.hasOwnProperty(name)) {
            return this.downgradedComponents[name].type;
        }
        else {
            return (this.downgradedComponents[name] = new upgrade_ng1_adapter_1.UpgradeNg1ComponentAdapterBuilder(name)).type;
        }
    };
    /**
     * Bootstrap a hybrid AngularJS v1 / Angular v2 application.
     *
     * This `bootstrap` method is a direct replacement (takes same arguments) for AngularJS v1
     * [`bootstrap`](https://docs.angularjs.org/api/ng/function/angular.bootstrap) method. Unlike
     * AngularJS v1, this bootstrap is asynchronous.
     *
     * ### Example
     *
     * ```
     * var adapter = new UpgradeAdapter();
     * var module = angular.module('myExample', []);
     * module.directive('ng2', adapter.downgradeNg2Component(Ng2));
     *
     * module.directive('ng1', function() {
     *   return {
     *      scope: { title: '=' },
     *      template: 'ng1[Hello {{title}}!](<span ng-transclude></span>)'
     *   };
     * });
     *
     *
     * @Component({
     *   selector: 'ng2',
     *   inputs: ['name'],
     *   template: 'ng2[<ng1 [title]="name">transclude</ng1>](<ng-content></ng-content>)',
     *   directives: [adapter.upgradeNg1Component('ng1')]
     * })
     * class Ng2 {
     * }
     *
     * document.body.innerHTML = '<ng2 name="World">project</ng2>';
     *
     * adapter.bootstrap(document.body, ['myExample']).ready(function() {
     *   expect(document.body.textContent).toEqual(
     *       "ng2[ng1[Hello World!](transclude)](project)");
     * });
     * ```
     */
    UpgradeAdapter.prototype.bootstrap = function (element, modules, config) {
        var _this = this;
        var upgrade = new UpgradeAdapterRef();
        var ng1Injector = null;
        var platformRef = core_1.platform(browser_1.BROWSER_PROVIDERS);
        var applicationRef = platformRef.application([
            browser_1.BROWSER_APP_PROVIDERS,
            core_1.provide(constants_1.NG1_INJECTOR, { useFactory: function () { return ng1Injector; } }),
            core_1.provide(constants_1.NG1_COMPILE, { useFactory: function () { return ng1Injector.get(constants_1.NG1_COMPILE); } }),
            this.providers
        ]);
        var injector = applicationRef.injector;
        var ngZone = injector.get(core_1.NgZone);
        var compiler = injector.get(core_1.Compiler);
        var delayApplyExps = [];
        var original$applyFn;
        var rootScopePrototype;
        var rootScope;
        var hostViewFactoryRefMap = {};
        var ng1Module = angular.module(this.idPrefix, modules);
        var ng1compilePromise = null;
        ng1Module.value(constants_1.NG2_INJECTOR, injector)
            .value(constants_1.NG2_ZONE, ngZone)
            .value(constants_1.NG2_COMPILER, compiler)
            .value(constants_1.NG2_HOST_VIEW_FACTORY_REF_MAP, hostViewFactoryRefMap)
            .value(constants_1.NG2_APP_VIEW_MANAGER, injector.get(core_1.AppViewManager))
            .config([
            '$provide',
            function (provide) {
                provide.decorator(constants_1.NG1_ROOT_SCOPE, [
                    '$delegate',
                    function (rootScopeDelegate) {
                        rootScopePrototype = rootScopeDelegate.constructor.prototype;
                        if (rootScopePrototype.hasOwnProperty('$apply')) {
                            original$applyFn = rootScopePrototype.$apply;
                            rootScopePrototype.$apply = function (exp) { return delayApplyExps.push(exp); };
                        }
                        else {
                            throw new Error("Failed to find '$apply' on '$rootScope'!");
                        }
                        return rootScope = rootScopeDelegate;
                    }
                ]);
            }
        ])
            .run([
            '$injector',
            '$rootScope',
            function (injector, rootScope) {
                ng1Injector = injector;
                async_1.ObservableWrapper.subscribe(ngZone.onTurnDone, function (_) { return ngZone.runOutsideAngular(function () { return rootScope.$apply(); }); });
                ng1compilePromise =
                    upgrade_ng1_adapter_1.UpgradeNg1ComponentAdapterBuilder.resolve(_this.downgradedComponents, injector);
            }
        ]);
        angular.element(element).data(util_1.controllerKey(constants_1.NG2_INJECTOR), injector);
        ngZone.run(function () { angular.bootstrap(element, [_this.idPrefix], config); });
        Promise.all([this.compileNg2Components(compiler, hostViewFactoryRefMap), ng1compilePromise])
            .then(function () {
            ngZone.run(function () {
                if (rootScopePrototype) {
                    rootScopePrototype.$apply = original$applyFn; // restore original $apply
                    while (delayApplyExps.length) {
                        rootScope.$apply(delayApplyExps.shift());
                    }
                    upgrade._bootstrapDone(applicationRef, ng1Injector);
                    rootScopePrototype = null;
                }
            });
        }, util_1.onError);
        return upgrade;
    };
    /**
     * Adds a provider to the top level environment of a hybrid AngularJS v1 / Angular v2 application.
     *
     * In hybrid AngularJS v1 / Angular v2 application, there is no one root Angular v2 component,
     * for this reason we provide an application global way of registering providers which is
     * consistent with single global injection in AngularJS v1.
     *
     * ### Example
     *
     * ```
     * class Greeter {
     *   greet(name) {
     *     alert('Hello ' + name + '!');
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   template: ''
     * })
     * class App {
     *   constructor(greeter: Greeter) {
     *     this.greeter('World');
     *   }
     * }
     *
     * var adapter = new UpgradeAdapter();
     * adapter.addProvider(Greeter);
     *
     * var module = angular.module('myExample', []);
     * module.directive('app', adapter.downgradeNg2Component(App));
     *
     * document.body.innerHTML = '<app></app>'
     * adapter.bootstrap(document.body, ['myExample']);
     *```
     */
    UpgradeAdapter.prototype.addProvider = function (provider) { this.providers.push(provider); };
    /**
     * Allows AngularJS v1 service to be accessible from Angular v2.
     *
     *
     * ### Example
     *
     * ```
     * class Login { ... }
     * class Server { ... }
     *
     * @Injectable()
     * class Example {
     *   constructor(@Inject('server') server, login: Login) {
     *     ...
     *   }
     * }
     *
     * var module = angular.module('myExample', []);
     * module.service('server', Server);
     * module.service('login', Login);
     *
     * var adapter = new UpgradeAdapter();
     * adapter.upgradeNg1Provider('server');
     * adapter.upgradeNg1Provider('login', {asToken: Login});
     * adapter.addProvider(Example);
     *
     * adapter.bootstrap(document.body, ['myExample']).ready((ref) => {
     *   var example: Example = ref.ng2Injector.get(Example);
     * });
     *
     * ```
     */
    UpgradeAdapter.prototype.upgradeNg1Provider = function (name, options) {
        var token = options && options.asToken || name;
        this.providers.push(core_1.provide(token, {
            useFactory: function (ng1Injector) { return ng1Injector.get(name); },
            deps: [constants_1.NG1_INJECTOR]
        }));
    };
    /**
     * Allows Angular v2 service to be accessible from AngularJS v1.
     *
     *
     * ### Example
     *
     * ```
     * class Example {
     * }
     *
     * var adapter = new UpgradeAdapter();
     * adapter.addProvider(Example);
     *
     * var module = angular.module('myExample', []);
     * module.factory('example', adapter.downgradeNg2Provider(Example));
     *
     * adapter.bootstrap(document.body, ['myExample']).ready((ref) => {
     *   var example: Example = ref.ng1Injector.get('example');
     * });
     *
     * ```
     */
    UpgradeAdapter.prototype.downgradeNg2Provider = function (token) {
        var factory = function (injector) { return injector.get(token); };
        factory.$inject = [constants_1.NG2_INJECTOR];
        return factory;
    };
    /* @internal */
    UpgradeAdapter.prototype.compileNg2Components = function (compiler, hostViewFactoryRefMap) {
        var _this = this;
        var promises = [];
        var types = this.upgradedComponents;
        for (var i = 0; i < types.length; i++) {
            promises.push(compiler.compileInHost(types[i]));
        }
        return Promise.all(promises).then(function (hostViewFactories) {
            var types = _this.upgradedComponents;
            for (var i = 0; i < hostViewFactories.length; i++) {
                hostViewFactoryRefMap[metadata_1.getComponentInfo(types[i]).selector] = hostViewFactories[i];
            }
            return hostViewFactoryRefMap;
        }, util_1.onError);
    };
    return UpgradeAdapter;
})();
exports.UpgradeAdapter = UpgradeAdapter;
function ng1ComponentDirective(info, idPrefix) {
    directiveFactory.$inject =
        [constants_1.NG2_HOST_VIEW_FACTORY_REF_MAP, constants_1.NG2_APP_VIEW_MANAGER, constants_1.NG1_PARSE];
    function directiveFactory(hostViewFactoryRefMap, viewManager, parse) {
        var hostViewFactory = hostViewFactoryRefMap[info.selector];
        if (!hostViewFactory)
            throw new Error('Expecting HostViewFactoryRef for: ' + info.selector);
        var idCount = 0;
        return {
            restrict: 'E',
            require: constants_1.REQUIRE_INJECTOR,
            link: {
                post: function (scope, element, attrs, parentInjector, transclude) {
                    var domElement = element[0];
                    var facade = new downgrade_ng2_adapter_1.DowngradeNg2ComponentAdapter(idPrefix + (idCount++), info, element, attrs, scope, parentInjector, parse, viewManager, hostViewFactory);
                    facade.setupInputs();
                    facade.bootstrapNg2();
                    facade.projectContent();
                    facade.setupOutputs();
                    facade.registerCleanup();
                }
            }
        };
    }
    return directiveFactory;
}
/**
 * Use `UgradeAdapterRef` to control a hybrid AngularJS v1 / Angular v2 application.
 */
var UpgradeAdapterRef = (function () {
    function UpgradeAdapterRef() {
        /* @internal */
        this._readyFn = null;
        this.ng1RootScope = null;
        this.ng1Injector = null;
        this.ng2ApplicationRef = null;
        this.ng2Injector = null;
    }
    /* @internal */
    UpgradeAdapterRef.prototype._bootstrapDone = function (applicationRef, ng1Injector) {
        this.ng2ApplicationRef = applicationRef;
        this.ng2Injector = applicationRef.injector;
        this.ng1Injector = ng1Injector;
        this.ng1RootScope = ng1Injector.get(constants_1.NG1_ROOT_SCOPE);
        this._readyFn && this._readyFn(this);
    };
    /**
     * Register a callback function which is notified upon successful hybrid AngularJS v1 / Angular v2
     * application has been bootstrapped.
     *
     * The `ready` callback function is invoked inside the Angular v2 zone, therefore it does not
     * require a call to `$apply()`.
     */
    UpgradeAdapterRef.prototype.ready = function (fn) { this._readyFn = fn; };
    /**
     * Dispose of running hybrid AngularJS v1 / Angular v2 application.
     */
    UpgradeAdapterRef.prototype.dispose = function () {
        this.ng1Injector.get(constants_1.NG1_ROOT_SCOPE).$destroy();
        this.ng2ApplicationRef.dispose();
    };
    return UpgradeAdapterRef;
})();
exports.UpgradeAdapterRef = UpgradeAdapterRef;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBncmFkZV9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL3VwZ3JhZGUvdXBncmFkZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbIlVwZ3JhZGVBZGFwdGVyIiwiVXBncmFkZUFkYXB0ZXIuY29uc3RydWN0b3IiLCJVcGdyYWRlQWRhcHRlci5kb3duZ3JhZGVOZzJDb21wb25lbnQiLCJVcGdyYWRlQWRhcHRlci51cGdyYWRlTmcxQ29tcG9uZW50IiwiVXBncmFkZUFkYXB0ZXIuYm9vdHN0cmFwIiwiVXBncmFkZUFkYXB0ZXIuYWRkUHJvdmlkZXIiLCJVcGdyYWRlQWRhcHRlci51cGdyYWRlTmcxUHJvdmlkZXIiLCJVcGdyYWRlQWRhcHRlci5kb3duZ3JhZGVOZzJQcm92aWRlciIsIlVwZ3JhZGVBZGFwdGVyLmNvbXBpbGVOZzJDb21wb25lbnRzIiwibmcxQ29tcG9uZW50RGlyZWN0aXZlIiwibmcxQ29tcG9uZW50RGlyZWN0aXZlLmRpcmVjdGl2ZUZhY3RvcnkiLCJVcGdyYWRlQWRhcHRlclJlZiIsIlVwZ3JhZGVBZGFwdGVyUmVmLmNvbnN0cnVjdG9yIiwiVXBncmFkZUFkYXB0ZXJSZWYuX2Jvb3RzdHJhcERvbmUiLCJVcGdyYWRlQWRhcHRlclJlZi5yZWFkeSIsIlVwZ3JhZGVBZGFwdGVyUmVmLmRpc3Bvc2UiXSwibWFwcGluZ3MiOiJBQUFBLHFCQWFPLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHNCQUFnQywyQkFBMkIsQ0FBQyxDQUFBO0FBQzVELHdCQUF1RCwyQkFBMkIsQ0FBQyxDQUFBO0FBRW5GLHlCQUE4QyxZQUFZLENBQUMsQ0FBQTtBQUMzRCxxQkFBcUMsUUFBUSxDQUFDLENBQUE7QUFDOUMsMEJBWU8sYUFBYSxDQUFDLENBQUE7QUFDckIsc0NBQTJDLHlCQUF5QixDQUFDLENBQUE7QUFDckUsb0NBQWdELHVCQUF1QixDQUFDLENBQUE7QUFDeEUsSUFBWSxPQUFPLFdBQU0sY0FBYyxDQUFDLENBQUE7QUFFeEMs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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgcHJvdmlkZSxcbiAgcGxhdGZvcm0sXG4gIEFwcGxpY2F0aW9uUmVmLFxuICBBcHBWaWV3TWFuYWdlcixcbiAgQ29tcGlsZXIsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG4gIFBsYXRmb3JtUmVmLFxuICBIb3N0Vmlld0ZhY3RvcnlSZWYsXG4gIFByb3ZpZGVyLFxuICBUeXBlLFxuICBBUFBMSUNBVElPTl9DT01NT05fUFJPVklERVJTXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge0JST1dTRVJfUFJPVklERVJTLCBCUk9XU0VSX0FQUF9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuXG5pbXBvcnQge2dldENvbXBvbmVudEluZm8sIENvbXBvbmVudEluZm99IGZyb20gJy4vbWV0YWRhdGEnO1xuaW1wb3J0IHtvbkVycm9yLCBjb250cm9sbGVyS2V5fSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtcbiAgTkcxX0NPTVBJTEUsXG4gIE5HMV9JTkpFQ1RPUixcbiAgTkcxX1BBUlNFLFxuICBORzFfUk9PVF9TQ09QRSxcbiAgTkcxX1NDT1BFLFxuICBORzJfQVBQX1ZJRVdfTUFOQUdFUixcbiAgTkcyX0NPTVBJTEVSLFxuICBORzJfSU5KRUNUT1IsXG4gIE5HMl9IT1NUX1ZJRVdfRkFDVE9SWV9SRUZfTUFQLFxuICBORzJfWk9ORSxcbiAgUkVRVUlSRV9JTkpFQ1RPUlxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge0Rvd25ncmFkZU5nMkNvbXBvbmVudEFkYXB0ZXJ9IGZyb20gJy4vZG93bmdyYWRlX25nMl9hZGFwdGVyJztcbmltcG9ydCB7VXBncmFkZU5nMUNvbXBvbmVudEFkYXB0ZXJCdWlsZGVyfSBmcm9tICcuL3VwZ3JhZGVfbmcxX2FkYXB0ZXInO1xuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tICcuL2FuZ3VsYXJfanMnO1xuXG52YXIgdXBncmFkZUNvdW50OiBudW1iZXIgPSAwO1xuXG4vKipcbiAqIFVzZSBgVXBncmFkZUFkYXB0ZXJgIHRvIGFsbG93IEFuZ3VsYXJKUyB2MSBhbmQgQW5ndWxhciB2MiB0byBjb2V4aXN0IGluIGEgc2luZ2xlIGFwcGxpY2F0aW9uLlxuICpcbiAqIFRoZSBgVXBncmFkZUFkYXB0ZXJgIGFsbG93czpcbiAqIDEuIGNyZWF0aW9uIG9mIEFuZ3VsYXIgdjIgY29tcG9uZW50IGZyb20gQW5ndWxhckpTIHYxIGNvbXBvbmVudCBkaXJlY3RpdmVcbiAqICAgIChTZWUgW1VwZ3JhZGVBZGFwdGVyI3VwZ3JhZGVOZzFDb21wb25lbnQoKV0pXG4gKiAyLiBjcmVhdGlvbiBvZiBBbmd1bGFySlMgdjEgZGlyZWN0aXZlIGZyb20gQW5ndWxhciB2MiBjb21wb25lbnQuXG4gKiAgICAoU2VlIFtVcGdyYWRlQWRhcHRlciNkb3duZ3JhZGVOZzJDb21wb25lbnQoKV0pXG4gKiAzLiBCb290c3RyYXBwaW5nIG9mIGEgaHlicmlkIEFuZ3VsYXIgYXBwbGljYXRpb24gd2hpY2ggY29udGFpbnMgYm90aCBvZiB0aGUgZnJhbWV3b3Jrc1xuICogICAgY29leGlzdGluZyBpbiBhIHNpbmdsZSBhcHBsaWNhdGlvbi5cbiAqXG4gKiAjIyBNZW50YWwgTW9kZWxcbiAqXG4gKiBXaGVuIHJlYXNvbmluZyBhYm91dCBob3cgYSBoeWJyaWQgYXBwbGljYXRpb24gd29ya3MgaXQgaXMgdXNlZnVsIHRvIGhhdmUgYSBtZW50YWwgbW9kZWwgd2hpY2hcbiAqIGRlc2NyaWJlcyB3aGF0IGlzIGhhcHBlbmluZyBhbmQgZXhwbGFpbnMgd2hhdCBpcyBoYXBwZW5pbmcgYXQgdGhlIGxvd2VzdCBsZXZlbC5cbiAqXG4gKiAxLiBUaGVyZSBhcmUgdHdvIGluZGVwZW5kZW50IGZyYW1ld29ya3MgcnVubmluZyBpbiBhIHNpbmdsZSBhcHBsaWNhdGlvbiwgZWFjaCBmcmFtZXdvcmsgdHJlYXRzXG4gKiAgICB0aGUgb3RoZXIgYXMgYSBibGFjayBib3guXG4gKiAyLiBFYWNoIERPTSBlbGVtZW50IG9uIHRoZSBwYWdlIGlzIG93bmVkIGV4YWN0bHkgYnkgb25lIGZyYW1ld29yay4gV2hpY2hldmVyIGZyYW1ld29ya1xuICogICAgaW5zdGFudGlhdGVkIHRoZSBlbGVtZW50IGlzIHRoZSBvd25lci4gRWFjaCBmcmFtZXdvcmsgb25seSB1cGRhdGVzL2ludGVyYWN0cyB3aXRoIGl0cyBvd25cbiAqICAgIERPTSBlbGVtZW50cyBhbmQgaWdub3JlcyBvdGhlcnMuXG4gKiAzLiBBbmd1bGFySlMgdjEgZGlyZWN0aXZlcyBhbHdheXMgZXhlY3V0ZSBpbnNpZGUgQW5ndWxhckpTIHYxIGZyYW1ld29yayBjb2RlYmFzZSByZWdhcmRsZXNzIG9mXG4gKiAgICB3aGVyZSB0aGV5IGFyZSBpbnN0YW50aWF0ZWQuXG4gKiA0LiBBbmd1bGFyIHYyIGNvbXBvbmVudHMgYWx3YXlzIGV4ZWN1dGUgaW5zaWRlIEFuZ3VsYXIgdjIgZnJhbWV3b3JrIGNvZGViYXNlIHJlZ2FyZGxlc3Mgb2ZcbiAqICAgIHdoZXJlIHRoZXkgYXJlIGluc3RhbnRpYXRlZC5cbiAqIDUuIEFuIEFuZ3VsYXJKUyB2MSBjb21wb25lbnQgY2FuIGJlIHVwZ3JhZGVkIHRvIGFuIEFuZ3VsYXIgdjIgY29tcG9uZW50LiBUaGlzIGNyZWF0ZXMgYW5cbiAqICAgIEFuZ3VsYXIgdjIgZGlyZWN0aXZlLCB3aGljaCBib290c3RyYXBzIHRoZSBBbmd1bGFySlMgdjEgY29tcG9uZW50IGRpcmVjdGl2ZSBpbiB0aGF0IGxvY2F0aW9uLlxuICogNi4gQW4gQW5ndWxhciB2MiBjb21wb25lbnQgY2FuIGJlIGRvd25ncmFkZWQgdG8gYW4gQW5ndWxhckpTIHYxIGNvbXBvbmVudCBkaXJlY3RpdmUuIFRoaXMgY3JlYXRlc1xuICogICAgYW4gQW5ndWxhckpTIHYxIGRpcmVjdGl2ZSwgd2hpY2ggYm9vdHN0cmFwcyB0aGUgQW5ndWxhciB2MiBjb21wb25lbnQgaW4gdGhhdCBsb2NhdGlvbi5cbiAqIDcuIFdoZW5ldmVyIGFuIGFkYXB0ZXIgY29tcG9uZW50IGlzIGluc3RhbnRpYXRlZCB0aGUgaG9zdCBlbGVtZW50IGlzIG93bmVkIGJ5IHRoZSBmcmFtZXdvcmtcbiAqICAgIGRvaW5nIHRoZSBpbnN0YW50aWF0aW9uLiBUaGUgb3RoZXIgZnJhbWV3b3JrIHRoZW4gaW5zdGFudGlhdGVzIGFuZCBvd25zIHRoZSB2aWV3IGZvciB0aGF0XG4gKiAgICBjb21wb25lbnQuIFRoaXMgaW1wbGllcyB0aGF0IGNvbXBvbmVudCBiaW5kaW5ncyB3aWxsIGFsd2F5cyBmb2xsb3cgdGhlIHNlbWFudGljcyBvZiB0aGVcbiAqICAgIGluc3RhbnRpYXRpb24gZnJhbWV3b3JrLiBUaGUgc3ludGF4IGlzIGFsd2F5cyB0aGF0IG9mIEFuZ3VsYXIgdjIgc3ludGF4LlxuICogOC4gQW5ndWxhckpTIHYxIGlzIGFsd2F5cyBib290c3RyYXBwZWQgZmlyc3QgYW5kIG93bnMgdGhlIGJvdHRvbSBtb3N0IHZpZXcuXG4gKiA5LiBUaGUgbmV3IGFwcGxpY2F0aW9uIGlzIHJ1bm5pbmcgaW4gQW5ndWxhciB2MiB6b25lLCBhbmQgdGhlcmVmb3JlIGl0IG5vIGxvbmdlciBuZWVkcyBjYWxscyB0b1xuICogICAgYCRhcHBseSgpYC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogdmFyIGFkYXB0ZXIgPSBuZXcgVXBncmFkZUFkYXB0ZXIoKTtcbiAqIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbXlFeGFtcGxlJywgW10pO1xuICogbW9kdWxlLmRpcmVjdGl2ZSgnbmcyJywgYWRhcHRlci5kb3duZ3JhZGVOZzJDb21wb25lbnQoTmcyKSk7XG4gKlxuICogbW9kdWxlLmRpcmVjdGl2ZSgnbmcxJywgZnVuY3Rpb24oKSB7XG4gKiAgIHJldHVybiB7XG4gKiAgICAgIHNjb3BlOiB7IHRpdGxlOiAnPScgfSxcbiAqICAgICAgdGVtcGxhdGU6ICduZzFbSGVsbG8ge3t0aXRsZX19IV0oPHNwYW4gbmctdHJhbnNjbHVkZT48L3NwYW4+KSdcbiAqICAgfTtcbiAqIH0pO1xuICpcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICduZzInLFxuICogICBpbnB1dHM6IFsnbmFtZSddLFxuICogICB0ZW1wbGF0ZTogJ25nMls8bmcxIFt0aXRsZV09XCJuYW1lXCI+dHJhbnNjbHVkZTwvbmcxPl0oPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiknLFxuICogICBkaXJlY3RpdmVzOiBbYWRhcHRlci51cGdyYWRlTmcxQ29tcG9uZW50KCduZzEnKV1cbiAqIH0pXG4gKiBjbGFzcyBOZzIge1xuICogfVxuICpcbiAqIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gJzxuZzIgbmFtZT1cIldvcmxkXCI+cHJvamVjdDwvbmcyPic7XG4gKlxuICogYWRhcHRlci5ib290c3RyYXAoZG9jdW1lbnQuYm9keSwgWydteUV4YW1wbGUnXSkucmVhZHkoZnVuY3Rpb24oKSB7XG4gKiAgIGV4cGVjdChkb2N1bWVudC5ib2R5LnRleHRDb250ZW50KS50b0VxdWFsKFxuICogICAgICAgXCJuZzJbbmcxW0hlbGxvIFdvcmxkIV0odHJhbnNjbHVkZSldKHByb2plY3QpXCIpO1xuICogfSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIFVwZ3JhZGVBZGFwdGVyIHtcbiAgLyogQGludGVybmFsICovXG4gIHByaXZhdGUgaWRQcmVmaXg6IHN0cmluZyA9IGBORzJfVVBHUkFERV8ke3VwZ3JhZGVDb3VudCsrfV9gO1xuICAvKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSB1cGdyYWRlZENvbXBvbmVudHM6IFR5cGVbXSA9IFtdO1xuICAvKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBkb3duZ3JhZGVkQ29tcG9uZW50czoge1tuYW1lOiBzdHJpbmddOiBVcGdyYWRlTmcxQ29tcG9uZW50QWRhcHRlckJ1aWxkZXJ9ID0ge307XG4gIC8qIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIHByb3ZpZGVyczogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+ID0gW107XG5cbiAgLyoqXG4gICAqIEFsbG93cyBBbmd1bGFyIHYyIENvbXBvbmVudCB0byBiZSB1c2VkIGZyb20gQW5ndWxhckpTIHYxLlxuICAgKlxuICAgKiBVc2UgYGRvd25ncmFkZU5nMkNvbXBvbmVudGAgdG8gY3JlYXRlIGFuIEFuZ3VsYXJKUyB2MSBEaXJlY3RpdmUgRGVmaW5pdGlvbiBGYWN0b3J5IGZyb21cbiAgICogQW5ndWxhciB2MiBDb21wb25lbnQuIFRoZSBhZGFwdGVyIHdpbGwgYm9vdHN0cmFwIEFuZ3VsYXIgdjIgY29tcG9uZW50IGZyb20gd2l0aGluIHRoZVxuICAgKiBBbmd1bGFySlMgdjEgdGVtcGxhdGUuXG4gICAqXG4gICAqICMjIE1lbnRhbCBNb2RlbFxuICAgKlxuICAgKiAxLiBUaGUgY29tcG9uZW50IGlzIGluc3RhbnRpYXRlZCBieSBiZWluZyBsaXN0ZWQgaW4gQW5ndWxhckpTIHYxIHRlbXBsYXRlLiBUaGlzIG1lYW5zIHRoYXQgdGhlXG4gICAqICAgIGhvc3QgZWxlbWVudCBpcyBjb250cm9sbGVkIGJ5IEFuZ3VsYXJKUyB2MSwgYnV0IHRoZSBjb21wb25lbnQncyB2aWV3IHdpbGwgYmUgY29udHJvbGxlZCBieVxuICAgKiAgICBBbmd1bGFyIHYyLlxuICAgKiAyLiBFdmVuIHRob3VnaHQgdGhlIGNvbXBvbmVudCBpcyBpbnN0YW50aWF0ZWQgaW4gQW5ndWxhckpTIHYxLCBpdCB3aWxsIGJlIHVzaW5nIEFuZ3VsYXIgdjJcbiAgICogICAgc3ludGF4LiBUaGlzIGhhcyB0byBiZSBkb25lLCB0aGlzIHdheSBiZWNhdXNlIHdlIG11c3QgZm9sbG93IEFuZ3VsYXIgdjIgY29tcG9uZW50cyBkbyBub3RcbiAgICogICAgZGVjbGFyZSBob3cgdGhlIGF0dHJpYnV0ZXMgc2hvdWxkIGJlIGludGVycHJldGVkLlxuICAgKlxuICAgKiAjIyBTdXBwb3J0ZWQgRmVhdHVyZXNcbiAgICpcbiAgICogLSBCaW5kaW5nczpcbiAgICogICAtIEF0dHJpYnV0ZTogYDxjb21wIG5hbWU9XCJXb3JsZFwiPmBcbiAgICogICAtIEludGVycG9sYXRpb246ICBgPGNvbXAgZ3JlZXRpbmc9XCJIZWxsbyB7e25hbWV9fSFcIj5gXG4gICAqICAgLSBFeHByZXNzaW9uOiAgYDxjb21wIFtuYW1lXT1cInVzZXJuYW1lXCI+YFxuICAgKiAgIC0gRXZlbnQ6ICBgPGNvbXAgKGNsb3NlKT1cImRvU29tZXRoaW5nKClcIj5gXG4gICAqIC0gQ29udGVudCBwcm9qZWN0aW9uOiB5ZXNcbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgXG4gICAqIHZhciBhZGFwdGVyID0gbmV3IFVwZ3JhZGVBZGFwdGVyKCk7XG4gICAqIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbXlFeGFtcGxlJywgW10pO1xuICAgKiBtb2R1bGUuZGlyZWN0aXZlKCdncmVldCcsIGFkYXB0ZXIuZG93bmdyYWRlTmcyQ29tcG9uZW50KEdyZWV0ZXIpKTtcbiAgICpcbiAgICogQENvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICdncmVldCcsXG4gICAqICAgdGVtcGxhdGU6ICd7e3NhbHV0YXRpb259fSB7e25hbWV9fSEgLSA8bmctY29udGVudD48L25nLWNvbnRlbnQ+J1xuICAgKiB9KVxuICAgKiBjbGFzcyBHcmVldGVyIHtcbiAgICogICBASW5wdXQoKSBzYWx1dGF0aW9uOiBzdHJpbmc7XG4gICAqICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICAgKiB9XG4gICAqXG4gICAqIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID1cbiAgICogICAnbmcxIHRlbXBsYXRlOiA8Z3JlZXQgc2FsdXRhdGlvbj1cIkhlbGxvXCIgW25hbWVdPVwid29ybGRcIj50ZXh0PC9ncmVldD4nO1xuICAgKlxuICAgKiBhZGFwdGVyLmJvb3RzdHJhcChkb2N1bWVudC5ib2R5LCBbJ215RXhhbXBsZSddKS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICogICBleHBlY3QoZG9jdW1lbnQuYm9keS50ZXh0Q29udGVudCkudG9FcXVhbChcIm5nMSB0ZW1wbGF0ZTogSGVsbG8gd29ybGQhIC0gdGV4dFwiKTtcbiAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgZG93bmdyYWRlTmcyQ29tcG9uZW50KHR5cGU6IFR5cGUpOiBGdW5jdGlvbiB7XG4gICAgdGhpcy51cGdyYWRlZENvbXBvbmVudHMucHVzaCh0eXBlKTtcbiAgICB2YXIgaW5mbzogQ29tcG9uZW50SW5mbyA9IGdldENvbXBvbmVudEluZm8odHlwZSk7XG4gICAgcmV0dXJuIG5nMUNvbXBvbmVudERpcmVjdGl2ZShpbmZvLCBgJHt0aGlzLmlkUHJlZml4fSR7aW5mby5zZWxlY3Rvcn1fY2ApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBBbmd1bGFySlMgdjEgQ29tcG9uZW50IHRvIGJlIHVzZWQgZnJvbSBBbmd1bGFyIHYyLlxuICAgKlxuICAgKiBVc2UgYHVwZ3JhZGVOZzFDb21wb25lbnRgIHRvIGNyZWF0ZSBhbiBBbmd1bGFyIHYyIGNvbXBvbmVudCBmcm9tIEFuZ3VsYXJKUyB2MSBDb21wb25lbnRcbiAgICogZGlyZWN0aXZlLiBUaGUgYWRhcHRlciB3aWxsIGJvb3RzdHJhcCBBbmd1bGFySlMgdjEgY29tcG9uZW50IGZyb20gd2l0aGluIHRoZSBBbmd1bGFyIHYyXG4gICAqIHRlbXBsYXRlLlxuICAgKlxuICAgKiAjIyBNZW50YWwgTW9kZWxcbiAgICpcbiAgICogMS4gVGhlIGNvbXBvbmVudCBpcyBpbnN0YW50aWF0ZWQgYnkgYmVpbmcgbGlzdGVkIGluIEFuZ3VsYXIgdjIgdGVtcGxhdGUuIFRoaXMgbWVhbnMgdGhhdCB0aGVcbiAgICogICAgaG9zdCBlbGVtZW50IGlzIGNvbnRyb2xsZWQgYnkgQW5ndWxhciB2MiwgYnV0IHRoZSBjb21wb25lbnQncyB2aWV3IHdpbGwgYmUgY29udHJvbGxlZCBieVxuICAgKiAgICBBbmd1bGFySlMgdjEuXG4gICAqXG4gICAqICMjIFN1cHBvcnRlZCBGZWF0dXJlc1xuICAgKlxuICAgKiAtIEJpbmRpbmdzOlxuICAgKiAgIC0gQXR0cmlidXRlOiBgPGNvbXAgbmFtZT1cIldvcmxkXCI+YFxuICAgKiAgIC0gSW50ZXJwb2xhdGlvbjogIGA8Y29tcCBncmVldGluZz1cIkhlbGxvIHt7bmFtZX19IVwiPmBcbiAgICogICAtIEV4cHJlc3Npb246ICBgPGNvbXAgW25hbWVdPVwidXNlcm5hbWVcIj5gXG4gICAqICAgLSBFdmVudDogIGA8Y29tcCAoY2xvc2UpPVwiZG9Tb21ldGhpbmcoKVwiPmBcbiAgICogLSBUcmFuc2NsdXNpb246IHllc1xuICAgKiAtIE9ubHkgc29tZSBvZiB0aGUgZmVhdHVyZXMgb2ZcbiAgICogICBbRGlyZWN0aXZlIERlZmluaXRpb24gT2JqZWN0XShodHRwczovL2RvY3MuYW5ndWxhcmpzLm9yZy9hcGkvbmcvc2VydmljZS8kY29tcGlsZSkgYXJlXG4gICAqICAgc3VwcG9ydGVkOlxuICAgKiAgIC0gYGNvbXBpbGVgOiBub3Qgc3VwcG9ydGVkIGJlY2F1c2UgdGhlIGhvc3QgZWxlbWVudCBpcyBvd25lZCBieSBBbmd1bGFyIHYyLCB3aGljaCBkb2VzXG4gICAqICAgICBub3QgYWxsb3cgbW9kaWZ5aW5nIERPTSBzdHJ1Y3R1cmUgZHVyaW5nIGNvbXBpbGF0aW9uLlxuICAgKiAgIC0gYGNvbnRyb2xsZXJgOiBzdXBwb3J0ZWQuIChOT1RFOiBpbmplY3Rpb24gb2YgYCRhdHRyc2AgYW5kIGAkdHJhbnNjbHVkZWAgaXMgbm90IHN1cHBvcnRlZC4pXG4gICAqICAgLSBgY29udHJvbGxlckFzJzogc3VwcG9ydGVkLlxuICAgKiAgIC0gYGJpbmRUb0NvbnRyb2xsZXInOiBzdXBwb3J0ZWQuXG4gICAqICAgLSBgbGluayc6IHN1cHBvcnRlZC4gKE5PVEU6IG9ubHkgcHJlLWxpbmsgZnVuY3Rpb24gaXMgc3VwcG9ydGVkLilcbiAgICogICAtIGBuYW1lJzogc3VwcG9ydGVkLlxuICAgKiAgIC0gYHByaW9yaXR5JzogaWdub3JlZC5cbiAgICogICAtIGByZXBsYWNlJzogbm90IHN1cHBvcnRlZC5cbiAgICogICAtIGByZXF1aXJlYDogc3VwcG9ydGVkLlxuICAgKiAgIC0gYHJlc3RyaWN0YDogbXVzdCBiZSBzZXQgdG8gJ0UnLlxuICAgKiAgIC0gYHNjb3BlYDogc3VwcG9ydGVkLlxuICAgKiAgIC0gYHRlbXBsYXRlYDogc3VwcG9ydGVkLlxuICAgKiAgIC0gYHRlbXBsYXRlVXJsYDogc3VwcG9ydGVkLlxuICAgKiAgIC0gYHRlcm1pbmFsYDogaWdub3JlZC5cbiAgICogICAtIGB0cmFuc2NsdWRlYDogc3VwcG9ydGVkLlxuICAgKlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBgYGBcbiAgICogdmFyIGFkYXB0ZXIgPSBuZXcgVXBncmFkZUFkYXB0ZXIoKTtcbiAgICogdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdteUV4YW1wbGUnLCBbXSk7XG4gICAqXG4gICAqIG1vZHVsZS5kaXJlY3RpdmUoJ2dyZWV0JywgZnVuY3Rpb24oKSB7XG4gICAqICAgcmV0dXJuIHtcbiAgICogICAgIHNjb3BlOiB7c2FsdXRhdGlvbjogJz0nLCBuYW1lOiAnPScgfSxcbiAgICogICAgIHRlbXBsYXRlOiAne3tzYWx1dGF0aW9ufX0ge3tuYW1lfX0hIC0gPHNwYW4gbmctdHJhbnNjbHVkZT48L3NwYW4+J1xuICAgKiAgIH07XG4gICAqIH0pO1xuICAgKlxuICAgKiBtb2R1bGUuZGlyZWN0aXZlKCduZzInLCBhZGFwdGVyLmRvd25ncmFkZU5nMkNvbXBvbmVudChOZzIpKTtcbiAgICpcbiAgICogQENvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICduZzInLFxuICAgKiAgIHRlbXBsYXRlOiAnbmcyIHRlbXBsYXRlOiA8Z3JlZXQgc2FsdXRhdGlvbj1cIkhlbGxvXCIgW25hbWVdPVwid29ybGRcIj50ZXh0PC9ncmVldD4nXG4gICAqICAgZGlyZWN0aXZlczogW2FkYXB0ZXIudXBncmFkZU5nMUNvbXBvbmVudCgnZ3JlZXQnKV1cbiAgICogfSlcbiAgICogY2xhc3MgTmcyIHtcbiAgICogfVxuICAgKlxuICAgKiBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9ICc8bmcyPjwvbmcyPic7XG4gICAqXG4gICAqIGFkYXB0ZXIuYm9vdHN0cmFwKGRvY3VtZW50LmJvZHksIFsnbXlFeGFtcGxlJ10pLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgKiAgIGV4cGVjdChkb2N1bWVudC5ib2R5LnRleHRDb250ZW50KS50b0VxdWFsKFwibmcyIHRlbXBsYXRlOiBIZWxsbyB3b3JsZCEgLSB0ZXh0XCIpO1xuICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICB1cGdyYWRlTmcxQ29tcG9uZW50KG5hbWU6IHN0cmluZyk6IFR5cGUge1xuICAgIGlmICgoPGFueT50aGlzLmRvd25ncmFkZWRDb21wb25lbnRzKS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZG93bmdyYWRlZENvbXBvbmVudHNbbmFtZV0udHlwZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICh0aGlzLmRvd25ncmFkZWRDb21wb25lbnRzW25hbWVdID0gbmV3IFVwZ3JhZGVOZzFDb21wb25lbnRBZGFwdGVyQnVpbGRlcihuYW1lKSkudHlwZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQm9vdHN0cmFwIGEgaHlicmlkIEFuZ3VsYXJKUyB2MSAvIEFuZ3VsYXIgdjIgYXBwbGljYXRpb24uXG4gICAqXG4gICAqIFRoaXMgYGJvb3RzdHJhcGAgbWV0aG9kIGlzIGEgZGlyZWN0IHJlcGxhY2VtZW50ICh0YWtlcyBzYW1lIGFyZ3VtZW50cykgZm9yIEFuZ3VsYXJKUyB2MVxuICAgKiBbYGJvb3RzdHJhcGBdKGh0dHBzOi8vZG9jcy5hbmd1bGFyanMub3JnL2FwaS9uZy9mdW5jdGlvbi9hbmd1bGFyLmJvb3RzdHJhcCkgbWV0aG9kLiBVbmxpa2VcbiAgICogQW5ndWxhckpTIHYxLCB0aGlzIGJvb3RzdHJhcCBpcyBhc3luY2hyb25vdXMuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiB2YXIgYWRhcHRlciA9IG5ldyBVcGdyYWRlQWRhcHRlcigpO1xuICAgKiB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ215RXhhbXBsZScsIFtdKTtcbiAgICogbW9kdWxlLmRpcmVjdGl2ZSgnbmcyJywgYWRhcHRlci5kb3duZ3JhZGVOZzJDb21wb25lbnQoTmcyKSk7XG4gICAqXG4gICAqIG1vZHVsZS5kaXJlY3RpdmUoJ25nMScsIGZ1bmN0aW9uKCkge1xuICAgKiAgIHJldHVybiB7XG4gICAqICAgICAgc2NvcGU6IHsgdGl0bGU6ICc9JyB9LFxuICAgKiAgICAgIHRlbXBsYXRlOiAnbmcxW0hlbGxvIHt7dGl0bGV9fSFdKDxzcGFuIG5nLXRyYW5zY2x1ZGU+PC9zcGFuPiknXG4gICAqICAgfTtcbiAgICogfSk7XG4gICAqXG4gICAqXG4gICAqIEBDb21wb25lbnQoe1xuICAgKiAgIHNlbGVjdG9yOiAnbmcyJyxcbiAgICogICBpbnB1dHM6IFsnbmFtZSddLFxuICAgKiAgIHRlbXBsYXRlOiAnbmcyWzxuZzEgW3RpdGxlXT1cIm5hbWVcIj50cmFuc2NsdWRlPC9uZzE+XSg8bmctY29udGVudD48L25nLWNvbnRlbnQ+KScsXG4gICAqICAgZGlyZWN0aXZlczogW2FkYXB0ZXIudXBncmFkZU5nMUNvbXBvbmVudCgnbmcxJyldXG4gICAqIH0pXG4gICAqIGNsYXNzIE5nMiB7XG4gICAqIH1cbiAgICpcbiAgICogZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSAnPG5nMiBuYW1lPVwiV29ybGRcIj5wcm9qZWN0PC9uZzI+JztcbiAgICpcbiAgICogYWRhcHRlci5ib290c3RyYXAoZG9jdW1lbnQuYm9keSwgWydteUV4YW1wbGUnXSkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAqICAgZXhwZWN0KGRvY3VtZW50LmJvZHkudGV4dENvbnRlbnQpLnRvRXF1YWwoXG4gICAqICAgICAgIFwibmcyW25nMVtIZWxsbyBXb3JsZCFdKHRyYW5zY2x1ZGUpXShwcm9qZWN0KVwiKTtcbiAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgYm9vdHN0cmFwKGVsZW1lbnQ6IEVsZW1lbnQsIG1vZHVsZXM/OiBhbnlbXSxcbiAgICAgICAgICAgIGNvbmZpZz86IGFuZ3VsYXIuSUFuZ3VsYXJCb290c3RyYXBDb25maWcpOiBVcGdyYWRlQWRhcHRlclJlZiB7XG4gICAgdmFyIHVwZ3JhZGUgPSBuZXcgVXBncmFkZUFkYXB0ZXJSZWYoKTtcbiAgICB2YXIgbmcxSW5qZWN0b3I6IGFuZ3VsYXIuSUluamVjdG9yU2VydmljZSA9IG51bGw7XG4gICAgdmFyIHBsYXRmb3JtUmVmOiBQbGF0Zm9ybVJlZiA9IHBsYXRmb3JtKEJST1dTRVJfUFJPVklERVJTKTtcbiAgICB2YXIgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmID0gcGxhdGZvcm1SZWYuYXBwbGljYXRpb24oW1xuICAgICAgQlJPV1NFUl9BUFBfUFJPVklERVJTLFxuICAgICAgcHJvdmlkZShORzFfSU5KRUNUT1IsIHt1c2VGYWN0b3J5OiAoKSA9PiBuZzFJbmplY3Rvcn0pLFxuICAgICAgcHJvdmlkZShORzFfQ09NUElMRSwge3VzZUZhY3Rvcnk6ICgpID0+IG5nMUluamVjdG9yLmdldChORzFfQ09NUElMRSl9KSxcbiAgICAgIHRoaXMucHJvdmlkZXJzXG4gICAgXSk7XG4gICAgdmFyIGluamVjdG9yOiBJbmplY3RvciA9IGFwcGxpY2F0aW9uUmVmLmluamVjdG9yO1xuICAgIHZhciBuZ1pvbmU6IE5nWm9uZSA9IGluamVjdG9yLmdldChOZ1pvbmUpO1xuICAgIHZhciBjb21waWxlcjogQ29tcGlsZXIgPSBpbmplY3Rvci5nZXQoQ29tcGlsZXIpO1xuICAgIHZhciBkZWxheUFwcGx5RXhwczogRnVuY3Rpb25bXSA9IFtdO1xuICAgIHZhciBvcmlnaW5hbCRhcHBseUZuOiBGdW5jdGlvbjtcbiAgICB2YXIgcm9vdFNjb3BlUHJvdG90eXBlOiBhbnk7XG4gICAgdmFyIHJvb3RTY29wZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZTtcbiAgICB2YXIgaG9zdFZpZXdGYWN0b3J5UmVmTWFwOiBIb3N0Vmlld0ZhY3RvcnlSZWZNYXAgPSB7fTtcbiAgICB2YXIgbmcxTW9kdWxlID0gYW5ndWxhci5tb2R1bGUodGhpcy5pZFByZWZpeCwgbW9kdWxlcyk7XG4gICAgdmFyIG5nMWNvbXBpbGVQcm9taXNlOiBQcm9taXNlPGFueT4gPSBudWxsO1xuICAgIG5nMU1vZHVsZS52YWx1ZShORzJfSU5KRUNUT1IsIGluamVjdG9yKVxuICAgICAgICAudmFsdWUoTkcyX1pPTkUsIG5nWm9uZSlcbiAgICAgICAgLnZhbHVlKE5HMl9DT01QSUxFUiwgY29tcGlsZXIpXG4gICAgICAgIC52YWx1ZShORzJfSE9TVF9WSUVXX0ZBQ1RPUllfUkVGX01BUCwgaG9zdFZpZXdGYWN0b3J5UmVmTWFwKVxuICAgICAgICAudmFsdWUoTkcyX0FQUF9WSUVXX01BTkFHRVIsIGluamVjdG9yLmdldChBcHBWaWV3TWFuYWdlcikpXG4gICAgICAgIC5jb25maWcoW1xuICAgICAgICAgICckcHJvdmlkZScsXG4gICAgICAgICAgKHByb3ZpZGUpID0+IHtcbiAgICAgICAgICAgIHByb3ZpZGUuZGVjb3JhdG9yKE5HMV9ST09UX1NDT1BFLCBbXG4gICAgICAgICAgICAgICckZGVsZWdhdGUnLFxuICAgICAgICAgICAgICBmdW5jdGlvbihyb290U2NvcGVEZWxlZ2F0ZTogYW5ndWxhci5JUm9vdFNjb3BlU2VydmljZSkge1xuICAgICAgICAgICAgICAgIHJvb3RTY29wZVByb3RvdHlwZSA9IHJvb3RTY29wZURlbGVnYXRlLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICAgICAgICAgICAgICBpZiAocm9vdFNjb3BlUHJvdG90eXBlLmhhc093blByb3BlcnR5KCckYXBwbHknKSkge1xuICAgICAgICAgICAgICAgICAgb3JpZ2luYWwkYXBwbHlGbiA9IHJvb3RTY29wZVByb3RvdHlwZS4kYXBwbHk7XG4gICAgICAgICAgICAgICAgICByb290U2NvcGVQcm90b3R5cGUuJGFwcGx5ID0gKGV4cCkgPT4gZGVsYXlBcHBseUV4cHMucHVzaChleHApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCAnJGFwcGx5JyBvbiAnJHJvb3RTY29wZSchXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdFNjb3BlID0gcm9vdFNjb3BlRGVsZWdhdGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgXSlcbiAgICAgICAgLnJ1bihbXG4gICAgICAgICAgJyRpbmplY3RvcicsXG4gICAgICAgICAgJyRyb290U2NvcGUnLFxuICAgICAgICAgIChpbmplY3RvcjogYW5ndWxhci5JSW5qZWN0b3JTZXJ2aWNlLCByb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UpID0+IHtcbiAgICAgICAgICAgIG5nMUluamVjdG9yID0gaW5qZWN0b3I7XG4gICAgICAgICAgICBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUobmdab25lLm9uVHVybkRvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKF8pID0+IG5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiByb290U2NvcGUuJGFwcGx5KCkpKTtcbiAgICAgICAgICAgIG5nMWNvbXBpbGVQcm9taXNlID1cbiAgICAgICAgICAgICAgICBVcGdyYWRlTmcxQ29tcG9uZW50QWRhcHRlckJ1aWxkZXIucmVzb2x2ZSh0aGlzLmRvd25ncmFkZWRDb21wb25lbnRzLCBpbmplY3Rvcik7XG4gICAgICAgICAgfVxuICAgICAgICBdKTtcblxuICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5kYXRhKGNvbnRyb2xsZXJLZXkoTkcyX0lOSkVDVE9SKSwgaW5qZWN0b3IpO1xuICAgIG5nWm9uZS5ydW4oKCkgPT4geyBhbmd1bGFyLmJvb3RzdHJhcChlbGVtZW50LCBbdGhpcy5pZFByZWZpeF0sIGNvbmZpZyk7IH0pO1xuICAgIFByb21pc2UuYWxsKFt0aGlzLmNvbXBpbGVOZzJDb21wb25lbnRzKGNvbXBpbGVyLCBob3N0Vmlld0ZhY3RvcnlSZWZNYXApLCBuZzFjb21waWxlUHJvbWlzZV0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBuZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChyb290U2NvcGVQcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgcm9vdFNjb3BlUHJvdG90eXBlLiRhcHBseSA9IG9yaWdpbmFsJGFwcGx5Rm47ICAvLyByZXN0b3JlIG9yaWdpbmFsICRhcHBseVxuICAgICAgICAgICAgICB3aGlsZSAoZGVsYXlBcHBseUV4cHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcm9vdFNjb3BlLiRhcHBseShkZWxheUFwcGx5RXhwcy5zaGlmdCgpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAoPGFueT51cGdyYWRlKS5fYm9vdHN0cmFwRG9uZShhcHBsaWNhdGlvblJlZiwgbmcxSW5qZWN0b3IpO1xuICAgICAgICAgICAgICByb290U2NvcGVQcm90b3R5cGUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LCBvbkVycm9yKTtcbiAgICByZXR1cm4gdXBncmFkZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgcHJvdmlkZXIgdG8gdGhlIHRvcCBsZXZlbCBlbnZpcm9ubWVudCBvZiBhIGh5YnJpZCBBbmd1bGFySlMgdjEgLyBBbmd1bGFyIHYyIGFwcGxpY2F0aW9uLlxuICAgKlxuICAgKiBJbiBoeWJyaWQgQW5ndWxhckpTIHYxIC8gQW5ndWxhciB2MiBhcHBsaWNhdGlvbiwgdGhlcmUgaXMgbm8gb25lIHJvb3QgQW5ndWxhciB2MiBjb21wb25lbnQsXG4gICAqIGZvciB0aGlzIHJlYXNvbiB3ZSBwcm92aWRlIGFuIGFwcGxpY2F0aW9uIGdsb2JhbCB3YXkgb2YgcmVnaXN0ZXJpbmcgcHJvdmlkZXJzIHdoaWNoIGlzXG4gICAqIGNvbnNpc3RlbnQgd2l0aCBzaW5nbGUgZ2xvYmFsIGluamVjdGlvbiBpbiBBbmd1bGFySlMgdjEuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiBjbGFzcyBHcmVldGVyIHtcbiAgICogICBncmVldChuYW1lKSB7XG4gICAqICAgICBhbGVydCgnSGVsbG8gJyArIG5hbWUgKyAnIScpO1xuICAgKiAgIH1cbiAgICogfVxuICAgKlxuICAgKiBAQ29tcG9uZW50KHtcbiAgICogICBzZWxlY3RvcjogJ2FwcCcsXG4gICAqICAgdGVtcGxhdGU6ICcnXG4gICAqIH0pXG4gICAqIGNsYXNzIEFwcCB7XG4gICAqICAgY29uc3RydWN0b3IoZ3JlZXRlcjogR3JlZXRlcikge1xuICAgKiAgICAgdGhpcy5ncmVldGVyKCdXb3JsZCcpO1xuICAgKiAgIH1cbiAgICogfVxuICAgKlxuICAgKiB2YXIgYWRhcHRlciA9IG5ldyBVcGdyYWRlQWRhcHRlcigpO1xuICAgKiBhZGFwdGVyLmFkZFByb3ZpZGVyKEdyZWV0ZXIpO1xuICAgKlxuICAgKiB2YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ215RXhhbXBsZScsIFtdKTtcbiAgICogbW9kdWxlLmRpcmVjdGl2ZSgnYXBwJywgYWRhcHRlci5kb3duZ3JhZGVOZzJDb21wb25lbnQoQXBwKSk7XG4gICAqXG4gICAqIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gJzxhcHA+PC9hcHA+J1xuICAgKiBhZGFwdGVyLmJvb3RzdHJhcChkb2N1bWVudC5ib2R5LCBbJ215RXhhbXBsZSddKTtcbiAgICpgYGBcbiAgICovXG4gIHB1YmxpYyBhZGRQcm92aWRlcihwcm92aWRlcjogVHlwZSB8IFByb3ZpZGVyIHwgYW55W10pOiB2b2lkIHsgdGhpcy5wcm92aWRlcnMucHVzaChwcm92aWRlcik7IH1cblxuICAvKipcbiAgICogQWxsb3dzIEFuZ3VsYXJKUyB2MSBzZXJ2aWNlIHRvIGJlIGFjY2Vzc2libGUgZnJvbSBBbmd1bGFyIHYyLlxuICAgKlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBgYGBcbiAgICogY2xhc3MgTG9naW4geyAuLi4gfVxuICAgKiBjbGFzcyBTZXJ2ZXIgeyAuLi4gfVxuICAgKlxuICAgKiBASW5qZWN0YWJsZSgpXG4gICAqIGNsYXNzIEV4YW1wbGUge1xuICAgKiAgIGNvbnN0cnVjdG9yKEBJbmplY3QoJ3NlcnZlcicpIHNlcnZlciwgbG9naW46IExvZ2luKSB7XG4gICAqICAgICAuLi5cbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogdmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdteUV4YW1wbGUnLCBbXSk7XG4gICAqIG1vZHVsZS5zZXJ2aWNlKCdzZXJ2ZXInLCBTZXJ2ZXIpO1xuICAgKiBtb2R1bGUuc2VydmljZSgnbG9naW4nLCBMb2dpbik7XG4gICAqXG4gICAqIHZhciBhZGFwdGVyID0gbmV3IFVwZ3JhZGVBZGFwdGVyKCk7XG4gICAqIGFkYXB0ZXIudXBncmFkZU5nMVByb3ZpZGVyKCdzZXJ2ZXInKTtcbiAgICogYWRhcHRlci51cGdyYWRlTmcxUHJvdmlkZXIoJ2xvZ2luJywge2FzVG9rZW46IExvZ2lufSk7XG4gICAqIGFkYXB0ZXIuYWRkUHJvdmlkZXIoRXhhbXBsZSk7XG4gICAqXG4gICAqIGFkYXB0ZXIuYm9vdHN0cmFwKGRvY3VtZW50LmJvZHksIFsnbXlFeGFtcGxlJ10pLnJlYWR5KChyZWYpID0+IHtcbiAgICogICB2YXIgZXhhbXBsZTogRXhhbXBsZSA9IHJlZi5uZzJJbmplY3Rvci5nZXQoRXhhbXBsZSk7XG4gICAqIH0pO1xuICAgKlxuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyB1cGdyYWRlTmcxUHJvdmlkZXIobmFtZTogc3RyaW5nLCBvcHRpb25zPzoge2FzVG9rZW46IGFueX0pIHtcbiAgICB2YXIgdG9rZW4gPSBvcHRpb25zICYmIG9wdGlvbnMuYXNUb2tlbiB8fCBuYW1lO1xuICAgIHRoaXMucHJvdmlkZXJzLnB1c2gocHJvdmlkZSh0b2tlbiwge1xuICAgICAgdXNlRmFjdG9yeTogKG5nMUluamVjdG9yOiBhbmd1bGFyLklJbmplY3RvclNlcnZpY2UpID0+IG5nMUluamVjdG9yLmdldChuYW1lKSxcbiAgICAgIGRlcHM6IFtORzFfSU5KRUNUT1JdXG4gICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBBbmd1bGFyIHYyIHNlcnZpY2UgdG8gYmUgYWNjZXNzaWJsZSBmcm9tIEFuZ3VsYXJKUyB2MS5cbiAgICpcbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgXG4gICAqIGNsYXNzIEV4YW1wbGUge1xuICAgKiB9XG4gICAqXG4gICAqIHZhciBhZGFwdGVyID0gbmV3IFVwZ3JhZGVBZGFwdGVyKCk7XG4gICAqIGFkYXB0ZXIuYWRkUHJvdmlkZXIoRXhhbXBsZSk7XG4gICAqXG4gICAqIHZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbXlFeGFtcGxlJywgW10pO1xuICAgKiBtb2R1bGUuZmFjdG9yeSgnZXhhbXBsZScsIGFkYXB0ZXIuZG93bmdyYWRlTmcyUHJvdmlkZXIoRXhhbXBsZSkpO1xuICAgKlxuICAgKiBhZGFwdGVyLmJvb3RzdHJhcChkb2N1bWVudC5ib2R5LCBbJ215RXhhbXBsZSddKS5yZWFkeSgocmVmKSA9PiB7XG4gICAqICAgdmFyIGV4YW1wbGU6IEV4YW1wbGUgPSByZWYubmcxSW5qZWN0b3IuZ2V0KCdleGFtcGxlJyk7XG4gICAqIH0pO1xuICAgKlxuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBkb3duZ3JhZGVOZzJQcm92aWRlcih0b2tlbjogYW55KTogRnVuY3Rpb24ge1xuICAgIHZhciBmYWN0b3J5ID0gZnVuY3Rpb24oaW5qZWN0b3I6IEluamVjdG9yKSB7IHJldHVybiBpbmplY3Rvci5nZXQodG9rZW4pOyB9O1xuICAgICg8YW55PmZhY3RvcnkpLiRpbmplY3QgPSBbTkcyX0lOSkVDVE9SXTtcbiAgICByZXR1cm4gZmFjdG9yeTtcbiAgfVxuXG4gIC8qIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIGNvbXBpbGVOZzJDb21wb25lbnRzKGNvbXBpbGVyOiBDb21waWxlciwgaG9zdFZpZXdGYWN0b3J5UmVmTWFwOiBIb3N0Vmlld0ZhY3RvcnlSZWZNYXApOlxuICAgICAgUHJvbWlzZTxIb3N0Vmlld0ZhY3RvcnlSZWZNYXA+IHtcbiAgICB2YXIgcHJvbWlzZXM6IEFycmF5PFByb21pc2U8SG9zdFZpZXdGYWN0b3J5UmVmPj4gPSBbXTtcbiAgICB2YXIgdHlwZXMgPSB0aGlzLnVwZ3JhZGVkQ29tcG9uZW50cztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwcm9taXNlcy5wdXNoKGNvbXBpbGVyLmNvbXBpbGVJbkhvc3QodHlwZXNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKChob3N0Vmlld0ZhY3RvcmllczogQXJyYXk8SG9zdFZpZXdGYWN0b3J5UmVmPikgPT4ge1xuICAgICAgdmFyIHR5cGVzID0gdGhpcy51cGdyYWRlZENvbXBvbmVudHM7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvc3RWaWV3RmFjdG9yaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhvc3RWaWV3RmFjdG9yeVJlZk1hcFtnZXRDb21wb25lbnRJbmZvKHR5cGVzW2ldKS5zZWxlY3Rvcl0gPSBob3N0Vmlld0ZhY3Rvcmllc1tpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBob3N0Vmlld0ZhY3RvcnlSZWZNYXA7XG4gICAgfSwgb25FcnJvcik7XG4gIH1cbn1cblxuaW50ZXJmYWNlIEhvc3RWaWV3RmFjdG9yeVJlZk1hcCB7XG4gIFtzZWxlY3Rvcjogc3RyaW5nXTogSG9zdFZpZXdGYWN0b3J5UmVmO1xufVxuXG5mdW5jdGlvbiBuZzFDb21wb25lbnREaXJlY3RpdmUoaW5mbzogQ29tcG9uZW50SW5mbywgaWRQcmVmaXg6IHN0cmluZyk6IEZ1bmN0aW9uIHtcbiAgKDxhbnk+ZGlyZWN0aXZlRmFjdG9yeSkuJGluamVjdCA9XG4gICAgICBbTkcyX0hPU1RfVklFV19GQUNUT1JZX1JFRl9NQVAsIE5HMl9BUFBfVklFV19NQU5BR0VSLCBORzFfUEFSU0VdO1xuICBmdW5jdGlvbiBkaXJlY3RpdmVGYWN0b3J5KGhvc3RWaWV3RmFjdG9yeVJlZk1hcDogSG9zdFZpZXdGYWN0b3J5UmVmTWFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdNYW5hZ2VyOiBBcHBWaWV3TWFuYWdlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZTogYW5ndWxhci5JUGFyc2VTZXJ2aWNlKTogYW5ndWxhci5JRGlyZWN0aXZlIHtcbiAgICB2YXIgaG9zdFZpZXdGYWN0b3J5OiBIb3N0Vmlld0ZhY3RvcnlSZWYgPSBob3N0Vmlld0ZhY3RvcnlSZWZNYXBbaW5mby5zZWxlY3Rvcl07XG4gICAgaWYgKCFob3N0Vmlld0ZhY3RvcnkpIHRocm93IG5ldyBFcnJvcignRXhwZWN0aW5nIEhvc3RWaWV3RmFjdG9yeVJlZiBmb3I6ICcgKyBpbmZvLnNlbGVjdG9yKTtcbiAgICB2YXIgaWRDb3VudCA9IDA7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICByZXF1aXJlOiBSRVFVSVJFX0lOSkVDVE9SLFxuICAgICAgbGluazoge1xuICAgICAgICBwb3N0OiAoc2NvcGU6IGFuZ3VsYXIuSVNjb3BlLCBlbGVtZW50OiBhbmd1bGFyLklBdWdtZW50ZWRKUXVlcnksIGF0dHJzOiBhbmd1bGFyLklBdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICAgcGFyZW50SW5qZWN0b3I6IGFueSwgdHJhbnNjbHVkZTogYW5ndWxhci5JVHJhbnNjbHVkZUZ1bmN0aW9uKTogdm9pZCA9PiB7XG4gICAgICAgICAgdmFyIGRvbUVsZW1lbnQgPSA8YW55PmVsZW1lbnRbMF07XG4gICAgICAgICAgdmFyIGZhY2FkZSA9IG5ldyBEb3duZ3JhZGVOZzJDb21wb25lbnRBZGFwdGVyKGlkUHJlZml4ICsgKGlkQ291bnQrKyksIGluZm8sIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzLCBzY29wZSwgPEluamVjdG9yPnBhcmVudEluamVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZSwgdmlld01hbmFnZXIsIGhvc3RWaWV3RmFjdG9yeSk7XG4gICAgICAgICAgZmFjYWRlLnNldHVwSW5wdXRzKCk7XG4gICAgICAgICAgZmFjYWRlLmJvb3RzdHJhcE5nMigpO1xuICAgICAgICAgIGZhY2FkZS5wcm9qZWN0Q29udGVudCgpO1xuICAgICAgICAgIGZhY2FkZS5zZXR1cE91dHB1dHMoKTtcbiAgICAgICAgICBmYWNhZGUucmVnaXN0ZXJDbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIHJldHVybiBkaXJlY3RpdmVGYWN0b3J5O1xufVxuXG4vKipcbiAqIFVzZSBgVWdyYWRlQWRhcHRlclJlZmAgdG8gY29udHJvbCBhIGh5YnJpZCBBbmd1bGFySlMgdjEgLyBBbmd1bGFyIHYyIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgVXBncmFkZUFkYXB0ZXJSZWYge1xuICAvKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfcmVhZHlGbjogKHVwZ3JhZGVBZGFwdGVyUmVmPzogVXBncmFkZUFkYXB0ZXJSZWYpID0+IHZvaWQgPSBudWxsO1xuXG4gIHB1YmxpYyBuZzFSb290U2NvcGU6IGFuZ3VsYXIuSVJvb3RTY29wZVNlcnZpY2UgPSBudWxsO1xuICBwdWJsaWMgbmcxSW5qZWN0b3I6IGFuZ3VsYXIuSUluamVjdG9yU2VydmljZSA9IG51bGw7XG4gIHB1YmxpYyBuZzJBcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYgPSBudWxsO1xuICBwdWJsaWMgbmcySW5qZWN0b3I6IEluamVjdG9yID0gbnVsbDtcblxuICAvKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfYm9vdHN0cmFwRG9uZShhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsIG5nMUluamVjdG9yOiBhbmd1bGFyLklJbmplY3RvclNlcnZpY2UpIHtcbiAgICB0aGlzLm5nMkFwcGxpY2F0aW9uUmVmID0gYXBwbGljYXRpb25SZWY7XG4gICAgdGhpcy5uZzJJbmplY3RvciA9IGFwcGxpY2F0aW9uUmVmLmluamVjdG9yO1xuICAgIHRoaXMubmcxSW5qZWN0b3IgPSBuZzFJbmplY3RvcjtcbiAgICB0aGlzLm5nMVJvb3RTY29wZSA9IG5nMUluamVjdG9yLmdldChORzFfUk9PVF9TQ09QRSk7XG4gICAgdGhpcy5fcmVhZHlGbiAmJiB0aGlzLl9yZWFkeUZuKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgbm90aWZpZWQgdXBvbiBzdWNjZXNzZnVsIGh5YnJpZCBBbmd1bGFySlMgdjEgLyBBbmd1bGFyIHYyXG4gICAqIGFwcGxpY2F0aW9uIGhhcyBiZWVuIGJvb3RzdHJhcHBlZC5cbiAgICpcbiAgICogVGhlIGByZWFkeWAgY2FsbGJhY2sgZnVuY3Rpb24gaXMgaW52b2tlZCBpbnNpZGUgdGhlIEFuZ3VsYXIgdjIgem9uZSwgdGhlcmVmb3JlIGl0IGRvZXMgbm90XG4gICAqIHJlcXVpcmUgYSBjYWxsIHRvIGAkYXBwbHkoKWAuXG4gICAqL1xuICBwdWJsaWMgcmVhZHkoZm46ICh1cGdyYWRlQWRhcHRlclJlZj86IFVwZ3JhZGVBZGFwdGVyUmVmKSA9PiB2b2lkKSB7IHRoaXMuX3JlYWR5Rm4gPSBmbjsgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIG9mIHJ1bm5pbmcgaHlicmlkIEFuZ3VsYXJKUyB2MSAvIEFuZ3VsYXIgdjIgYXBwbGljYXRpb24uXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSgpIHtcbiAgICB0aGlzLm5nMUluamVjdG9yLmdldChORzFfUk9PVF9TQ09QRSkuJGRlc3Ryb3koKTtcbiAgICB0aGlzLm5nMkFwcGxpY2F0aW9uUmVmLmRpc3Bvc2UoKTtcbiAgfVxufVxuIl19