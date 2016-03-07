'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var modelModule = require('./model');
/**
 * Creates a form object from a user-specified configuration.
 *
 * ### Example ([live demo](http://plnkr.co/edit/ENgZo8EuIECZNensZCVr?p=preview))
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   viewBindings: [FORM_BINDINGS]
 *   template: `
 *     <form [ngFormModel]="loginForm">
 *       <p>Login <input ngControl="login"></p>
 *       <div ngControlGroup="passwordRetry">
 *         <p>Password <input type="password" ngControl="password"></p>
 *         <p>Confirm password <input type="password" ngControl="passwordConfirmation"></p>
 *       </div>
 *     </form>
 *     <h3>Form value:</h3>
 *     <pre>{{value}}</pre>
 *   `,
 *   directives: [FORM_DIRECTIVES]
 * })
 * export class App {
 *   loginForm: ControlGroup;
 *
 *   constructor(builder: FormBuilder) {
 *     this.loginForm = builder.group({
 *       login: ["", Validators.required],
 *       passwordRetry: builder.group({
 *         password: ["", Validators.required],
 *         passwordConfirmation: ["", Validators.required, asyncValidator]
 *       })
 *     });
 *   }
 *
 *   get value(): string {
 *     return JSON.stringify(this.loginForm.value, null, 2);
 *   }
 * }
 * ```
 */
var FormBuilder = (function () {
    function FormBuilder() {
    }
    /**
     * Construct a new {@link ControlGroup} with the given map of configuration.
     * Valid keys for the `extra` parameter map are `optionals` and `validator`.
     *
     * See the {@link ControlGroup} constructor for more details.
     */
    FormBuilder.prototype.group = function (controlsConfig, extra) {
        if (extra === void 0) { extra = null; }
        var controls = this._reduceControls(controlsConfig);
        var optionals = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "optionals") : null;
        var validator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "validator") : null;
        var asyncValidator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "asyncValidator") : null;
        return new modelModule.ControlGroup(controls, optionals, validator, asyncValidator);
    };
    /**
     * Construct a new {@link Control} with the given `value`,`validator`, and `asyncValidator`.
     */
    FormBuilder.prototype.control = function (value, validator, asyncValidator) {
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        return new modelModule.Control(value, validator, asyncValidator);
    };
    /**
     * Construct an array of {@link Control}s from the given `controlsConfig` array of
     * configuration, with the given optional `validator` and `asyncValidator`.
     */
    FormBuilder.prototype.array = function (controlsConfig, validator, asyncValidator) {
        var _this = this;
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        var controls = controlsConfig.map(function (c) { return _this._createControl(c); });
        return new modelModule.ControlArray(controls, validator, asyncValidator);
    };
    /** @internal */
    FormBuilder.prototype._reduceControls = function (controlsConfig) {
        var _this = this;
        var controls = {};
        collection_1.StringMapWrapper.forEach(controlsConfig, function (controlConfig, controlName) {
            controls[controlName] = _this._createControl(controlConfig);
        });
        return controls;
    };
    /** @internal */
    FormBuilder.prototype._createControl = function (controlConfig) {
        if (controlConfig instanceof modelModule.Control ||
            controlConfig instanceof modelModule.ControlGroup ||
            controlConfig instanceof modelModule.ControlArray) {
            return controlConfig;
        }
        else if (lang_1.isArray(controlConfig)) {
            var value = controlConfig[0];
            var validator = controlConfig.length > 1 ? controlConfig[1] : null;
            var asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
            return this.control(value, validator, asyncValidator);
        }
        else {
            return this.control(controlConfig);
        }
    };
    FormBuilder = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FormBuilder);
    return FormBuilder;
})();
exports.FormBuilder = FormBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvbW1vbi9mb3Jtcy9mb3JtX2J1aWxkZXIudHMiXSwibmFtZXMiOlsiRm9ybUJ1aWxkZXIiLCJGb3JtQnVpbGRlci5jb25zdHJ1Y3RvciIsIkZvcm1CdWlsZGVyLmdyb3VwIiwiRm9ybUJ1aWxkZXIuY29udHJvbCIsIkZvcm1CdWlsZGVyLmFycmF5IiwiRm9ybUJ1aWxkZXIuX3JlZHVjZUNvbnRyb2xzIiwiRm9ybUJ1aWxkZXIuX2NyZWF0ZUNvbnRyb2wiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUN6QywyQkFBK0IsZ0NBQWdDLENBQUMsQ0FBQTtBQUNoRSxxQkFBbUQsMEJBQTBCLENBQUMsQ0FBQTtBQUM5RSxJQUFZLFdBQVcsV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUd2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdDRztBQUNIO0lBQUFBO0lBNkRBQyxDQUFDQTtJQTNEQ0Q7Ozs7O09BS0dBO0lBQ0hBLDJCQUFLQSxHQUFMQSxVQUFNQSxjQUFvQ0EsRUFDcENBLEtBQWtDQTtRQUFsQ0UscUJBQWtDQSxHQUFsQ0EsWUFBa0NBO1FBQ3RDQSxJQUFJQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQTtRQUNwREEsSUFBSUEsU0FBU0EsR0FBR0EsZ0JBQVNBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLDZCQUFnQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsV0FBV0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDbkZBLElBQUlBLFNBQVNBLEdBQUdBLGdCQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSw2QkFBZ0JBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLFdBQVdBLENBQUNBLEdBQUdBLElBQUlB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LENBQUNBLEtBQUtBLEVBQUVBLFNBQVNBLEVBQUVBLGNBQWNBLENBQUNBLENBQUNBO1FBRXhEQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNOQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtRQUNyQ0EsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUE1REhOO1FBQUNBLGlCQUFVQSxFQUFFQTs7b0JBNkRaQTtJQUFEQSxrQkFBQ0E7QUFBREEsQ0FBQ0EsQUE3REQsSUE2REM7QUE1RFksbUJBQVcsY0E0RHZCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtpc1ByZXNlbnQsIGlzQXJyYXksIENPTlNUX0VYUFIsIFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQgKiBhcyBtb2RlbE1vZHVsZSBmcm9tICcuL21vZGVsJztcblxuXG4vKipcbiAqIENyZWF0ZXMgYSBmb3JtIG9iamVjdCBmcm9tIGEgdXNlci1zcGVjaWZpZWQgY29uZmlndXJhdGlvbi5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvRU5nWm84RXVJRUNaTmVuc1pDVnI/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICogICB2aWV3QmluZGluZ3M6IFtGT1JNX0JJTkRJTkdTXVxuICogICB0ZW1wbGF0ZTogYFxuICogICAgIDxmb3JtIFtuZ0Zvcm1Nb2RlbF09XCJsb2dpbkZvcm1cIj5cbiAqICAgICAgIDxwPkxvZ2luIDxpbnB1dCBuZ0NvbnRyb2w9XCJsb2dpblwiPjwvcD5cbiAqICAgICAgIDxkaXYgbmdDb250cm9sR3JvdXA9XCJwYXNzd29yZFJldHJ5XCI+XG4gKiAgICAgICAgIDxwPlBhc3N3b3JkIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuZ0NvbnRyb2w9XCJwYXNzd29yZFwiPjwvcD5cbiAqICAgICAgICAgPHA+Q29uZmlybSBwYXNzd29yZCA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmdDb250cm9sPVwicGFzc3dvcmRDb25maXJtYXRpb25cIj48L3A+XG4gKiAgICAgICA8L2Rpdj5cbiAqICAgICA8L2Zvcm0+XG4gKiAgICAgPGgzPkZvcm0gdmFsdWU6PC9oMz5cbiAqICAgICA8cHJlPnt7dmFsdWV9fTwvcHJlPlxuICogICBgLFxuICogICBkaXJlY3RpdmVzOiBbRk9STV9ESVJFQ1RJVkVTXVxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBBcHAge1xuICogICBsb2dpbkZvcm06IENvbnRyb2xHcm91cDtcbiAqXG4gKiAgIGNvbnN0cnVjdG9yKGJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7XG4gKiAgICAgdGhpcy5sb2dpbkZvcm0gPSBidWlsZGVyLmdyb3VwKHtcbiAqICAgICAgIGxvZ2luOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gKiAgICAgICBwYXNzd29yZFJldHJ5OiBidWlsZGVyLmdyb3VwKHtcbiAqICAgICAgICAgcGFzc3dvcmQ6IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAqICAgICAgICAgcGFzc3dvcmRDb25maXJtYXRpb246IFtcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkLCBhc3luY1ZhbGlkYXRvcl1cbiAqICAgICAgIH0pXG4gKiAgICAgfSk7XG4gKiAgIH1cbiAqXG4gKiAgIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICogICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmxvZ2luRm9ybS52YWx1ZSwgbnVsbCwgMik7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybUJ1aWxkZXIge1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHtAbGluayBDb250cm9sR3JvdXB9IHdpdGggdGhlIGdpdmVuIG1hcCBvZiBjb25maWd1cmF0aW9uLlxuICAgKiBWYWxpZCBrZXlzIGZvciB0aGUgYGV4dHJhYCBwYXJhbWV0ZXIgbWFwIGFyZSBgb3B0aW9uYWxzYCBhbmQgYHZhbGlkYXRvcmAuXG4gICAqXG4gICAqIFNlZSB0aGUge0BsaW5rIENvbnRyb2xHcm91cH0gY29uc3RydWN0b3IgZm9yIG1vcmUgZGV0YWlscy5cbiAgICovXG4gIGdyb3VwKGNvbnRyb2xzQ29uZmlnOiB7W2tleTogc3RyaW5nXTogYW55fSxcbiAgICAgICAgZXh0cmE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gbnVsbCk6IG1vZGVsTW9kdWxlLkNvbnRyb2xHcm91cCB7XG4gICAgdmFyIGNvbnRyb2xzID0gdGhpcy5fcmVkdWNlQ29udHJvbHMoY29udHJvbHNDb25maWcpO1xuICAgIHZhciBvcHRpb25hbHMgPSBpc1ByZXNlbnQoZXh0cmEpID8gU3RyaW5nTWFwV3JhcHBlci5nZXQoZXh0cmEsIFwib3B0aW9uYWxzXCIpIDogbnVsbDtcbiAgICB2YXIgdmFsaWRhdG9yID0gaXNQcmVzZW50KGV4dHJhKSA/IFN0cmluZ01hcFdyYXBwZXIuZ2V0KGV4dHJhLCBcInZhbGlkYXRvclwiKSA6IG51bGw7XG4gICAgdmFyIGFzeW5jVmFsaWRhdG9yID0gaXNQcmVzZW50KGV4dHJhKSA/IFN0cmluZ01hcFdyYXBwZXIuZ2V0KGV4dHJhLCBcImFzeW5jVmFsaWRhdG9yXCIpIDogbnVsbDtcbiAgICByZXR1cm4gbmV3IG1vZGVsTW9kdWxlLkNvbnRyb2xHcm91cChjb250cm9scywgb3B0aW9uYWxzLCB2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcbiAgfVxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IHtAbGluayBDb250cm9sfSB3aXRoIHRoZSBnaXZlbiBgdmFsdWVgLGB2YWxpZGF0b3JgLCBhbmQgYGFzeW5jVmFsaWRhdG9yYC5cbiAgICovXG4gIGNvbnRyb2wodmFsdWU6IE9iamVjdCwgdmFsaWRhdG9yOiBGdW5jdGlvbiA9IG51bGwsXG4gICAgICAgICAgYXN5bmNWYWxpZGF0b3I6IEZ1bmN0aW9uID0gbnVsbCk6IG1vZGVsTW9kdWxlLkNvbnRyb2wge1xuICAgIHJldHVybiBuZXcgbW9kZWxNb2R1bGUuQ29udHJvbCh2YWx1ZSwgdmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcik7XG4gIH1cblxuICAvKipcbiAgICogQ29uc3RydWN0IGFuIGFycmF5IG9mIHtAbGluayBDb250cm9sfXMgZnJvbSB0aGUgZ2l2ZW4gYGNvbnRyb2xzQ29uZmlnYCBhcnJheSBvZlxuICAgKiBjb25maWd1cmF0aW9uLCB3aXRoIHRoZSBnaXZlbiBvcHRpb25hbCBgdmFsaWRhdG9yYCBhbmQgYGFzeW5jVmFsaWRhdG9yYC5cbiAgICovXG4gIGFycmF5KGNvbnRyb2xzQ29uZmlnOiBhbnlbXSwgdmFsaWRhdG9yOiBGdW5jdGlvbiA9IG51bGwsXG4gICAgICAgIGFzeW5jVmFsaWRhdG9yOiBGdW5jdGlvbiA9IG51bGwpOiBtb2RlbE1vZHVsZS5Db250cm9sQXJyYXkge1xuICAgIHZhciBjb250cm9scyA9IGNvbnRyb2xzQ29uZmlnLm1hcChjID0+IHRoaXMuX2NyZWF0ZUNvbnRyb2woYykpO1xuICAgIHJldHVybiBuZXcgbW9kZWxNb2R1bGUuQ29udHJvbEFycmF5KGNvbnRyb2xzLCB2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlZHVjZUNvbnRyb2xzKGNvbnRyb2xzQ29uZmlnOiB7W2s6IHN0cmluZ106XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnl9KToge1trZXk6IHN0cmluZ106IG1vZGVsTW9kdWxlLkFic3RyYWN0Q29udHJvbH0ge1xuICAgIHZhciBjb250cm9sczoge1trZXk6IHN0cmluZ106IG1vZGVsTW9kdWxlLkFic3RyYWN0Q29udHJvbH0gPSB7fTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goY29udHJvbHNDb25maWcsIChjb250cm9sQ29uZmlnOiBhbnksIGNvbnRyb2xOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnRyb2xzW2NvbnRyb2xOYW1lXSA9IHRoaXMuX2NyZWF0ZUNvbnRyb2woY29udHJvbENvbmZpZyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbnRyb2xzO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY3JlYXRlQ29udHJvbChjb250cm9sQ29uZmlnOiBhbnkpOiBtb2RlbE1vZHVsZS5BYnN0cmFjdENvbnRyb2wge1xuICAgIGlmIChjb250cm9sQ29uZmlnIGluc3RhbmNlb2YgbW9kZWxNb2R1bGUuQ29udHJvbCB8fFxuICAgICAgICBjb250cm9sQ29uZmlnIGluc3RhbmNlb2YgbW9kZWxNb2R1bGUuQ29udHJvbEdyb3VwIHx8XG4gICAgICAgIGNvbnRyb2xDb25maWcgaW5zdGFuY2VvZiBtb2RlbE1vZHVsZS5Db250cm9sQXJyYXkpIHtcbiAgICAgIHJldHVybiBjb250cm9sQ29uZmlnO1xuXG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGNvbnRyb2xDb25maWcpKSB7XG4gICAgICB2YXIgdmFsdWUgPSBjb250cm9sQ29uZmlnWzBdO1xuICAgICAgdmFyIHZhbGlkYXRvciA9IGNvbnRyb2xDb25maWcubGVuZ3RoID4gMSA/IGNvbnRyb2xDb25maWdbMV0gOiBudWxsO1xuICAgICAgdmFyIGFzeW5jVmFsaWRhdG9yID0gY29udHJvbENvbmZpZy5sZW5ndGggPiAyID8gY29udHJvbENvbmZpZ1syXSA6IG51bGw7XG4gICAgICByZXR1cm4gdGhpcy5jb250cm9sKHZhbHVlLCB2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jb250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgIH1cbiAgfVxufSJdfQ==