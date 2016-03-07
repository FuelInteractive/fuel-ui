var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from 'angular2/core';
import { StringMapWrapper } from 'angular2/src/facade/collection';
import { isPresent, isArray } from 'angular2/src/facade/lang';
import * as modelModule from './model';
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
export let FormBuilder = class {
    /**
     * Construct a new {@link ControlGroup} with the given map of configuration.
     * Valid keys for the `extra` parameter map are `optionals` and `validator`.
     *
     * See the {@link ControlGroup} constructor for more details.
     */
    group(controlsConfig, extra = null) {
        var controls = this._reduceControls(controlsConfig);
        var optionals = isPresent(extra) ? StringMapWrapper.get(extra, "optionals") : null;
        var validator = isPresent(extra) ? StringMapWrapper.get(extra, "validator") : null;
        var asyncValidator = isPresent(extra) ? StringMapWrapper.get(extra, "asyncValidator") : null;
        return new modelModule.ControlGroup(controls, optionals, validator, asyncValidator);
    }
    /**
     * Construct a new {@link Control} with the given `value`,`validator`, and `asyncValidator`.
     */
    control(value, validator = null, asyncValidator = null) {
        return new modelModule.Control(value, validator, asyncValidator);
    }
    /**
     * Construct an array of {@link Control}s from the given `controlsConfig` array of
     * configuration, with the given optional `validator` and `asyncValidator`.
     */
    array(controlsConfig, validator = null, asyncValidator = null) {
        var controls = controlsConfig.map(c => this._createControl(c));
        return new modelModule.ControlArray(controls, validator, asyncValidator);
    }
    /** @internal */
    _reduceControls(controlsConfig) {
        var controls = {};
        StringMapWrapper.forEach(controlsConfig, (controlConfig, controlName) => {
            controls[controlName] = this._createControl(controlConfig);
        });
        return controls;
    }
    /** @internal */
    _createControl(controlConfig) {
        if (controlConfig instanceof modelModule.Control ||
            controlConfig instanceof modelModule.ControlGroup ||
            controlConfig instanceof modelModule.ControlArray) {
            return controlConfig;
        }
        else if (isArray(controlConfig)) {
            var value = controlConfig[0];
            var validator = controlConfig.length > 1 ? controlConfig[1] : null;
            var asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
            return this.control(value, validator, asyncValidator);
        }
        else {
            return this.control(controlConfig);
        }
    }
};
FormBuilder = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], FormBuilder);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvbW1vbi9mb3Jtcy9mb3JtX2J1aWxkZXIudHMiXSwibmFtZXMiOlsiRm9ybUJ1aWxkZXIiLCJGb3JtQnVpbGRlci5ncm91cCIsIkZvcm1CdWlsZGVyLmNvbnRyb2wiLCJGb3JtQnVpbGRlci5hcnJheSIsIkZvcm1CdWlsZGVyLl9yZWR1Y2VDb250cm9scyIsIkZvcm1CdWlsZGVyLl9jcmVhdGVDb250cm9sIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7T0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWU7T0FDakMsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGdDQUFnQztPQUN4RCxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQW1CLE1BQU0sMEJBQTBCO09BQ3RFLEtBQUssV0FBVyxNQUFNLFNBQVM7QUFHdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Q0c7QUFDSDtJQUVFQTs7Ozs7T0FLR0E7SUFDSEEsS0FBS0EsQ0FBQ0EsY0FBb0NBLEVBQ3BDQSxLQUFLQSxHQUF5QkEsSUFBSUE7UUFDdENDLElBQUlBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBO1FBQ3BEQSxJQUFJQSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxnQkFBZ0JBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLFdBQVdBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQ25GQSxJQUFJQSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxnQkFBZ0JBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLFdBQVdBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO1FBQ25GQSxJQUFJQSxjQUFjQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxnQkFBZ0JBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLGdCQUFnQkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDN0ZBLE1BQU1BLENBQUNBLElBQUlBLFdBQVdBLENBQUNBLFlBQVlBLENBQUNBLFFBQVFBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLGNBQWNBLENBQUNBLENBQUNBO0lBQ3RGQSxDQUFDQTtJQUNERDs7T0FFR0E7SUFDSEEsT0FBT0EsQ0FBQ0EsS0FBYUEsRUFBRUEsU0FBU0EsR0FBYUEsSUFBSUEsRUFDekNBLGNBQWNBLEdBQWFBLElBQUlBO1FBQ3JDRSxNQUFNQSxDQUFDQSxJQUFJQSxXQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxTQUFTQSxFQUFFQSxjQUFjQSxDQUFDQSxDQUFDQTtJQUNuRUEsQ0FBQ0E7SUFFREY7OztPQUdHQTtJQUNIQSxLQUFLQSxDQUFDQSxjQUFxQkEsRUFBRUEsU0FBU0EsR0FBYUEsSUFBSUEsRUFDakRBLGNBQWNBLEdBQWFBLElBQUlBO1FBQ25DRyxJQUFJQSxRQUFRQSxHQUFHQSxjQUFjQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMvREEsTUFBTUEsQ0FBQ0EsSUFBSUEsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsUUFBUUEsRUFBRUEsU0FBU0EsRUFBRUEsY0FBY0EsQ0FBQ0EsQ0FBQ0E7SUFDM0VBLENBQUNBO0lBRURILGdCQUFnQkE7SUFDaEJBLGVBQWVBLENBQUNBLGNBQ3lCQTtRQUN2Q0ksSUFBSUEsUUFBUUEsR0FBaURBLEVBQUVBLENBQUNBO1FBQ2hFQSxnQkFBZ0JBLENBQUNBLE9BQU9BLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBLGFBQWtCQSxFQUFFQSxXQUFtQkE7WUFDL0VBLFFBQVFBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1FBQzdEQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNIQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQTtJQUNsQkEsQ0FBQ0E7SUFFREosZ0JBQWdCQTtJQUNoQkEsY0FBY0EsQ0FBQ0EsYUFBa0JBO1FBQy9CSyxFQUFFQSxDQUFDQSxDQUFDQSxhQUFhQSxZQUFZQSxXQUFXQSxDQUFDQSxPQUFPQTtZQUM1Q0EsYUFBYUEsWUFBWUEsV0FBV0EsQ0FBQ0EsWUFBWUE7WUFDakRBLGFBQWFBLFlBQVlBLFdBQVdBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO1lBQ3REQSxNQUFNQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUV2QkEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbENBLElBQUlBLEtBQUtBLEdBQUdBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzdCQSxJQUFJQSxTQUFTQSxHQUFHQSxhQUFhQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxHQUFHQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUNuRUEsSUFBSUEsY0FBY0EsR0FBR0EsYUFBYUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsR0FBR0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDeEVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLEVBQUVBLFNBQVNBLEVBQUVBLGNBQWNBLENBQUNBLENBQUNBO1FBRXhEQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNOQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtRQUNyQ0EsQ0FBQ0E7SUFDSEEsQ0FBQ0E7QUFDSEwsQ0FBQ0E7QUE3REQ7SUFBQyxVQUFVLEVBQUU7O2dCQTZEWjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0FycmF5LCBDT05TVF9FWFBSLCBUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0ICogYXMgbW9kZWxNb2R1bGUgZnJvbSAnLi9tb2RlbCc7XG5cblxuLyoqXG4gKiBDcmVhdGVzIGEgZm9ybSBvYmplY3QgZnJvbSBhIHVzZXItc3BlY2lmaWVkIGNvbmZpZ3VyYXRpb24uXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L0VOZ1pvOEV1SUVDWk5lbnNaQ1ZyP3A9cHJldmlldykpXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAqICAgdmlld0JpbmRpbmdzOiBbRk9STV9CSU5ESU5HU11cbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgICA8Zm9ybSBbbmdGb3JtTW9kZWxdPVwibG9naW5Gb3JtXCI+XG4gKiAgICAgICA8cD5Mb2dpbiA8aW5wdXQgbmdDb250cm9sPVwibG9naW5cIj48L3A+XG4gKiAgICAgICA8ZGl2IG5nQ29udHJvbEdyb3VwPVwicGFzc3dvcmRSZXRyeVwiPlxuICogICAgICAgICA8cD5QYXNzd29yZCA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmdDb250cm9sPVwicGFzc3dvcmRcIj48L3A+XG4gKiAgICAgICAgIDxwPkNvbmZpcm0gcGFzc3dvcmQgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5nQ29udHJvbD1cInBhc3N3b3JkQ29uZmlybWF0aW9uXCI+PC9wPlxuICogICAgICAgPC9kaXY+XG4gKiAgICAgPC9mb3JtPlxuICogICAgIDxoMz5Gb3JtIHZhbHVlOjwvaDM+XG4gKiAgICAgPHByZT57e3ZhbHVlfX08L3ByZT5cbiAqICAgYCxcbiAqICAgZGlyZWN0aXZlczogW0ZPUk1fRElSRUNUSVZFU11cbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgQXBwIHtcbiAqICAgbG9naW5Gb3JtOiBDb250cm9sR3JvdXA7XG4gKlxuICogICBjb25zdHJ1Y3RvcihidWlsZGVyOiBGb3JtQnVpbGRlcikge1xuICogICAgIHRoaXMubG9naW5Gb3JtID0gYnVpbGRlci5ncm91cCh7XG4gKiAgICAgICBsb2dpbjogW1wiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICogICAgICAgcGFzc3dvcmRSZXRyeTogYnVpbGRlci5ncm91cCh7XG4gKiAgICAgICAgIHBhc3N3b3JkOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gKiAgICAgICAgIHBhc3N3b3JkQ29uZmlybWF0aW9uOiBbXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZCwgYXN5bmNWYWxpZGF0b3JdXG4gKiAgICAgICB9KVxuICogICAgIH0pO1xuICogICB9XG4gKlxuICogICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAqICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5sb2dpbkZvcm0udmFsdWUsIG51bGwsIDIpO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvcm1CdWlsZGVyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB7QGxpbmsgQ29udHJvbEdyb3VwfSB3aXRoIHRoZSBnaXZlbiBtYXAgb2YgY29uZmlndXJhdGlvbi5cbiAgICogVmFsaWQga2V5cyBmb3IgdGhlIGBleHRyYWAgcGFyYW1ldGVyIG1hcCBhcmUgYG9wdGlvbmFsc2AgYW5kIGB2YWxpZGF0b3JgLlxuICAgKlxuICAgKiBTZWUgdGhlIHtAbGluayBDb250cm9sR3JvdXB9IGNvbnN0cnVjdG9yIGZvciBtb3JlIGRldGFpbHMuXG4gICAqL1xuICBncm91cChjb250cm9sc0NvbmZpZzoge1trZXk6IHN0cmluZ106IGFueX0sXG4gICAgICAgIGV4dHJhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IG51bGwpOiBtb2RlbE1vZHVsZS5Db250cm9sR3JvdXAge1xuICAgIHZhciBjb250cm9scyA9IHRoaXMuX3JlZHVjZUNvbnRyb2xzKGNvbnRyb2xzQ29uZmlnKTtcbiAgICB2YXIgb3B0aW9uYWxzID0gaXNQcmVzZW50KGV4dHJhKSA/IFN0cmluZ01hcFdyYXBwZXIuZ2V0KGV4dHJhLCBcIm9wdGlvbmFsc1wiKSA6IG51bGw7XG4gICAgdmFyIHZhbGlkYXRvciA9IGlzUHJlc2VudChleHRyYSkgPyBTdHJpbmdNYXBXcmFwcGVyLmdldChleHRyYSwgXCJ2YWxpZGF0b3JcIikgOiBudWxsO1xuICAgIHZhciBhc3luY1ZhbGlkYXRvciA9IGlzUHJlc2VudChleHRyYSkgPyBTdHJpbmdNYXBXcmFwcGVyLmdldChleHRyYSwgXCJhc3luY1ZhbGlkYXRvclwiKSA6IG51bGw7XG4gICAgcmV0dXJuIG5ldyBtb2RlbE1vZHVsZS5Db250cm9sR3JvdXAoY29udHJvbHMsIG9wdGlvbmFscywgdmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcik7XG4gIH1cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyB7QGxpbmsgQ29udHJvbH0gd2l0aCB0aGUgZ2l2ZW4gYHZhbHVlYCxgdmFsaWRhdG9yYCwgYW5kIGBhc3luY1ZhbGlkYXRvcmAuXG4gICAqL1xuICBjb250cm9sKHZhbHVlOiBPYmplY3QsIHZhbGlkYXRvcjogRnVuY3Rpb24gPSBudWxsLFxuICAgICAgICAgIGFzeW5jVmFsaWRhdG9yOiBGdW5jdGlvbiA9IG51bGwpOiBtb2RlbE1vZHVsZS5Db250cm9sIHtcbiAgICByZXR1cm4gbmV3IG1vZGVsTW9kdWxlLkNvbnRyb2wodmFsdWUsIHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhbiBhcnJheSBvZiB7QGxpbmsgQ29udHJvbH1zIGZyb20gdGhlIGdpdmVuIGBjb250cm9sc0NvbmZpZ2AgYXJyYXkgb2ZcbiAgICogY29uZmlndXJhdGlvbiwgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9uYWwgYHZhbGlkYXRvcmAgYW5kIGBhc3luY1ZhbGlkYXRvcmAuXG4gICAqL1xuICBhcnJheShjb250cm9sc0NvbmZpZzogYW55W10sIHZhbGlkYXRvcjogRnVuY3Rpb24gPSBudWxsLFxuICAgICAgICBhc3luY1ZhbGlkYXRvcjogRnVuY3Rpb24gPSBudWxsKTogbW9kZWxNb2R1bGUuQ29udHJvbEFycmF5IHtcbiAgICB2YXIgY29udHJvbHMgPSBjb250cm9sc0NvbmZpZy5tYXAoYyA9PiB0aGlzLl9jcmVhdGVDb250cm9sKGMpKTtcbiAgICByZXR1cm4gbmV3IG1vZGVsTW9kdWxlLkNvbnRyb2xBcnJheShjb250cm9scywgdmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcik7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZWR1Y2VDb250cm9scyhjb250cm9sc0NvbmZpZzoge1trOiBzdHJpbmddOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW55fSk6IHtba2V5OiBzdHJpbmddOiBtb2RlbE1vZHVsZS5BYnN0cmFjdENvbnRyb2x9IHtcbiAgICB2YXIgY29udHJvbHM6IHtba2V5OiBzdHJpbmddOiBtb2RlbE1vZHVsZS5BYnN0cmFjdENvbnRyb2x9ID0ge307XG4gICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKGNvbnRyb2xzQ29uZmlnLCAoY29udHJvbENvbmZpZzogYW55LCBjb250cm9sTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb250cm9sc1tjb250cm9sTmFtZV0gPSB0aGlzLl9jcmVhdGVDb250cm9sKGNvbnRyb2xDb25maWcpO1xuICAgIH0pO1xuICAgIHJldHVybiBjb250cm9scztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NyZWF0ZUNvbnRyb2woY29udHJvbENvbmZpZzogYW55KTogbW9kZWxNb2R1bGUuQWJzdHJhY3RDb250cm9sIHtcbiAgICBpZiAoY29udHJvbENvbmZpZyBpbnN0YW5jZW9mIG1vZGVsTW9kdWxlLkNvbnRyb2wgfHxcbiAgICAgICAgY29udHJvbENvbmZpZyBpbnN0YW5jZW9mIG1vZGVsTW9kdWxlLkNvbnRyb2xHcm91cCB8fFxuICAgICAgICBjb250cm9sQ29uZmlnIGluc3RhbmNlb2YgbW9kZWxNb2R1bGUuQ29udHJvbEFycmF5KSB7XG4gICAgICByZXR1cm4gY29udHJvbENvbmZpZztcblxuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250cm9sQ29uZmlnKSkge1xuICAgICAgdmFyIHZhbHVlID0gY29udHJvbENvbmZpZ1swXTtcbiAgICAgIHZhciB2YWxpZGF0b3IgPSBjb250cm9sQ29uZmlnLmxlbmd0aCA+IDEgPyBjb250cm9sQ29uZmlnWzFdIDogbnVsbDtcbiAgICAgIHZhciBhc3luY1ZhbGlkYXRvciA9IGNvbnRyb2xDb25maWcubGVuZ3RoID4gMiA/IGNvbnRyb2xDb25maWdbMl0gOiBudWxsO1xuICAgICAgcmV0dXJuIHRoaXMuY29udHJvbCh2YWx1ZSwgdmFsaWRhdG9yLCBhc3luY1ZhbGlkYXRvcik7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY29udHJvbChjb250cm9sQ29uZmlnKTtcbiAgICB9XG4gIH1cbn0iXX0=