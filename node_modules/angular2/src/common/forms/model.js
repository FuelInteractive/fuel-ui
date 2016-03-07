'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var promise_1 = require('angular2/src/facade/promise');
var collection_1 = require('angular2/src/facade/collection');
/**
 * Indicates that a Control is valid, i.e. that no errors exist in the input value.
 */
exports.VALID = "VALID";
/**
 * Indicates that a Control is invalid, i.e. that an error exists in the input value.
 */
exports.INVALID = "INVALID";
/**
 * Indicates that a Control is pending, i.e. that async validation is occurring and
 * errors are not yet available for the input value.
 */
exports.PENDING = "PENDING";
function isControl(control) {
    return control instanceof AbstractControl;
}
exports.isControl = isControl;
function _find(control, path) {
    if (lang_1.isBlank(path))
        return null;
    if (!(path instanceof Array)) {
        path = path.split("/");
    }
    if (path instanceof Array && collection_1.ListWrapper.isEmpty(path))
        return null;
    return path
        .reduce(function (v, name) {
        if (v instanceof ControlGroup) {
            return lang_1.isPresent(v.controls[name]) ? v.controls[name] : null;
        }
        else if (v instanceof ControlArray) {
            var index = name;
            return lang_1.isPresent(v.at(index)) ? v.at(index) : null;
        }
        else {
            return null;
        }
    }, control);
}
function toObservable(r) {
    return promise_1.PromiseWrapper.isPromise(r) ? async_1.ObservableWrapper.fromPromise(r) : r;
}
/**
 *
 */
var AbstractControl = (function () {
    function AbstractControl(validator, asyncValidator) {
        this.validator = validator;
        this.asyncValidator = asyncValidator;
        this._pristine = true;
        this._touched = false;
    }
    Object.defineProperty(AbstractControl.prototype, "value", {
        get: function () { return this._value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "status", {
        get: function () { return this._status; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "valid", {
        get: function () { return this._status === exports.VALID; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "errors", {
        /**
         * Returns the errors of this control.
         */
        get: function () { return this._errors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "pristine", {
        get: function () { return this._pristine; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "dirty", {
        get: function () { return !this.pristine; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "touched", {
        get: function () { return this._touched; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "untouched", {
        get: function () { return !this._touched; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "valueChanges", {
        get: function () { return this._valueChanges; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "statusChanges", {
        get: function () { return this._statusChanges; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "pending", {
        get: function () { return this._status == exports.PENDING; },
        enumerable: true,
        configurable: true
    });
    AbstractControl.prototype.markAsTouched = function () { this._touched = true; };
    AbstractControl.prototype.markAsDirty = function (_a) {
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        onlySelf = lang_1.normalizeBool(onlySelf);
        this._pristine = false;
        if (lang_1.isPresent(this._parent) && !onlySelf) {
            this._parent.markAsDirty({ onlySelf: onlySelf });
        }
    };
    AbstractControl.prototype.markAsPending = function (_a) {
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        onlySelf = lang_1.normalizeBool(onlySelf);
        this._status = exports.PENDING;
        if (lang_1.isPresent(this._parent) && !onlySelf) {
            this._parent.markAsPending({ onlySelf: onlySelf });
        }
    };
    AbstractControl.prototype.setParent = function (parent) { this._parent = parent; };
    AbstractControl.prototype.updateValueAndValidity = function (_a) {
        var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent;
        onlySelf = lang_1.normalizeBool(onlySelf);
        emitEvent = lang_1.isPresent(emitEvent) ? emitEvent : true;
        this._updateValue();
        this._errors = this._runValidator();
        this._status = this._calculateStatus();
        if (this._status == exports.VALID || this._status == exports.PENDING) {
            this._runAsyncValidator(emitEvent);
        }
        if (emitEvent) {
            async_1.ObservableWrapper.callEmit(this._valueChanges, this._value);
            async_1.ObservableWrapper.callEmit(this._statusChanges, this._status);
        }
        if (lang_1.isPresent(this._parent) && !onlySelf) {
            this._parent.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
        }
    };
    AbstractControl.prototype._runValidator = function () { return lang_1.isPresent(this.validator) ? this.validator(this) : null; };
    AbstractControl.prototype._runAsyncValidator = function (emitEvent) {
        var _this = this;
        if (lang_1.isPresent(this.asyncValidator)) {
            this._status = exports.PENDING;
            this._cancelExistingSubscription();
            var obs = toObservable(this.asyncValidator(this));
            this._asyncValidationSubscription =
                async_1.ObservableWrapper.subscribe(obs, function (res) { return _this.setErrors(res, { emitEvent: emitEvent }); });
        }
    };
    AbstractControl.prototype._cancelExistingSubscription = function () {
        if (lang_1.isPresent(this._asyncValidationSubscription)) {
            async_1.ObservableWrapper.dispose(this._asyncValidationSubscription);
        }
    };
    /**
     * Sets errors on a control.
     *
     * This is used when validations are run not automatically, but manually by the user.
     *
     * Calling `setErrors` will also update the validity of the parent control.
     *
     * ## Usage
     *
     * ```
     * var login = new Control("someLogin");
     * login.setErrors({
     *   "notUnique": true
     * });
     *
     * expect(login.valid).toEqual(false);
     * expect(login.errors).toEqual({"notUnique": true});
     *
     * login.updateValue("someOtherLogin");
     *
     * expect(login.valid).toEqual(true);
     * ```
     */
    AbstractControl.prototype.setErrors = function (errors, _a) {
        var emitEvent = (_a === void 0 ? {} : _a).emitEvent;
        emitEvent = lang_1.isPresent(emitEvent) ? emitEvent : true;
        this._errors = errors;
        this._status = this._calculateStatus();
        if (emitEvent) {
            async_1.ObservableWrapper.callEmit(this._statusChanges, this._status);
        }
        if (lang_1.isPresent(this._parent)) {
            this._parent._updateControlsErrors();
        }
    };
    AbstractControl.prototype.find = function (path) { return _find(this, path); };
    AbstractControl.prototype.getError = function (errorCode, path) {
        if (path === void 0) { path = null; }
        var control = lang_1.isPresent(path) && !collection_1.ListWrapper.isEmpty(path) ? this.find(path) : this;
        if (lang_1.isPresent(control) && lang_1.isPresent(control._errors)) {
            return collection_1.StringMapWrapper.get(control._errors, errorCode);
        }
        else {
            return null;
        }
    };
    AbstractControl.prototype.hasError = function (errorCode, path) {
        if (path === void 0) { path = null; }
        return lang_1.isPresent(this.getError(errorCode, path));
    };
    Object.defineProperty(AbstractControl.prototype, "root", {
        get: function () {
            var x = this;
            while (lang_1.isPresent(x._parent)) {
                x = x._parent;
            }
            return x;
        },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    AbstractControl.prototype._updateControlsErrors = function () {
        this._status = this._calculateStatus();
        if (lang_1.isPresent(this._parent)) {
            this._parent._updateControlsErrors();
        }
    };
    /** @internal */
    AbstractControl.prototype._initObservables = function () {
        this._valueChanges = new async_1.EventEmitter();
        this._statusChanges = new async_1.EventEmitter();
    };
    AbstractControl.prototype._calculateStatus = function () {
        if (lang_1.isPresent(this._errors))
            return exports.INVALID;
        if (this._anyControlsHaveStatus(exports.PENDING))
            return exports.PENDING;
        if (this._anyControlsHaveStatus(exports.INVALID))
            return exports.INVALID;
        return exports.VALID;
    };
    return AbstractControl;
})();
exports.AbstractControl = AbstractControl;
/**
 * Defines a part of a form that cannot be divided into other controls. `Control`s have values and
 * validation state, which is determined by an optional validation function.
 *
 * `Control` is one of the three fundamental building blocks used to define forms in Angular, along
 * with {@link ControlGroup} and {@link ControlArray}.
 *
 * ## Usage
 *
 * By default, a `Control` is created for every `<input>` or other form component.
 * With {@link NgFormControl} or {@link NgFormModel} an existing {@link Control} can be
 * bound to a DOM element instead. This `Control` can be configured with a custom
 * validation function.
 *
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 */
var Control = (function (_super) {
    __extends(Control, _super);
    function Control(value, validator, asyncValidator) {
        if (value === void 0) { value = null; }
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        _super.call(this, validator, asyncValidator);
        this._value = value;
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        this._initObservables();
    }
    /**
     * Set the value of the control to `value`.
     *
     * If `onlySelf` is `true`, this change will only affect the validation of this `Control`
     * and not its parent component. If `emitEvent` is `true`, this change will cause a
     * `valueChanges` event on the `Control` to be emitted. Both of these options default to
     * `false`.
     *
     * If `emitModelToViewChange` is `true`, the view will be notified about the new value
     * via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not
     * specified.
     */
    Control.prototype.updateValue = function (value, _a) {
        var _b = _a === void 0 ? {} : _a, onlySelf = _b.onlySelf, emitEvent = _b.emitEvent, emitModelToViewChange = _b.emitModelToViewChange;
        emitModelToViewChange = lang_1.isPresent(emitModelToViewChange) ? emitModelToViewChange : true;
        this._value = value;
        if (lang_1.isPresent(this._onChange) && emitModelToViewChange)
            this._onChange(this._value);
        this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
    };
    /**
     * @internal
     */
    Control.prototype._updateValue = function () { };
    /**
     * @internal
     */
    Control.prototype._anyControlsHaveStatus = function (status) { return false; };
    /**
     * Register a listener for change events.
     */
    Control.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    return Control;
})(AbstractControl);
exports.Control = Control;
/**
 * Defines a part of a form, of fixed length, that can contain other controls.
 *
 * A `ControlGroup` aggregates the values and errors of each {@link Control} in the group. Thus, if
 * one of the controls in a group is invalid, the entire group is invalid. Similarly, if a control
 * changes its value, the entire group changes as well.
 *
 * `ControlGroup` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {@link Control} and {@link ControlArray}. {@link ControlArray} can also contain other
 * controls, but is of variable length.
 *
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 */
var ControlGroup = (function (_super) {
    __extends(ControlGroup, _super);
    function ControlGroup(controls, optionals, validator, asyncValidator) {
        if (optionals === void 0) { optionals = null; }
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        _super.call(this, validator, asyncValidator);
        this.controls = controls;
        this._optionals = lang_1.isPresent(optionals) ? optionals : {};
        this._initObservables();
        this._setParentForControls();
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    /**
     * Add a control to this group.
     */
    ControlGroup.prototype.addControl = function (name, control) {
        this.controls[name] = control;
        control.setParent(this);
    };
    /**
     * Remove a control from this group.
     */
    ControlGroup.prototype.removeControl = function (name) { collection_1.StringMapWrapper.delete(this.controls, name); };
    /**
     * Mark the named control as non-optional.
     */
    ControlGroup.prototype.include = function (controlName) {
        collection_1.StringMapWrapper.set(this._optionals, controlName, true);
        this.updateValueAndValidity();
    };
    /**
     * Mark the named control as optional.
     */
    ControlGroup.prototype.exclude = function (controlName) {
        collection_1.StringMapWrapper.set(this._optionals, controlName, false);
        this.updateValueAndValidity();
    };
    /**
     * Check whether there is a control with the given name in the group.
     */
    ControlGroup.prototype.contains = function (controlName) {
        var c = collection_1.StringMapWrapper.contains(this.controls, controlName);
        return c && this._included(controlName);
    };
    /** @internal */
    ControlGroup.prototype._setParentForControls = function () {
        var _this = this;
        collection_1.StringMapWrapper.forEach(this.controls, function (control, name) { control.setParent(_this); });
    };
    /** @internal */
    ControlGroup.prototype._updateValue = function () { this._value = this._reduceValue(); };
    /** @internal */
    ControlGroup.prototype._anyControlsHaveStatus = function (status) {
        var _this = this;
        var res = false;
        collection_1.StringMapWrapper.forEach(this.controls, function (control, name) {
            res = res || (_this.contains(name) && control.status == status);
        });
        return res;
    };
    /** @internal */
    ControlGroup.prototype._reduceValue = function () {
        return this._reduceChildren({}, function (acc, control, name) {
            acc[name] = control.value;
            return acc;
        });
    };
    /** @internal */
    ControlGroup.prototype._reduceChildren = function (initValue, fn) {
        var _this = this;
        var res = initValue;
        collection_1.StringMapWrapper.forEach(this.controls, function (control, name) {
            if (_this._included(name)) {
                res = fn(res, control, name);
            }
        });
        return res;
    };
    /** @internal */
    ControlGroup.prototype._included = function (controlName) {
        var isOptional = collection_1.StringMapWrapper.contains(this._optionals, controlName);
        return !isOptional || collection_1.StringMapWrapper.get(this._optionals, controlName);
    };
    return ControlGroup;
})(AbstractControl);
exports.ControlGroup = ControlGroup;
/**
 * Defines a part of a form, of variable length, that can contain other controls.
 *
 * A `ControlArray` aggregates the values and errors of each {@link Control} in the group. Thus, if
 * one of the controls in a group is invalid, the entire group is invalid. Similarly, if a control
 * changes its value, the entire group changes as well.
 *
 * `ControlArray` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {@link Control} and {@link ControlGroup}. {@link ControlGroup} can also contain
 * other controls, but is of fixed length.
 *
 * ## Adding or removing controls
 *
 * To change the controls in the array, use the `push`, `insert`, or `removeAt` methods
 * in `ControlArray` itself. These methods ensure the controls are properly tracked in the
 * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
 * the `ControlArray` directly, as that will result in strange and unexpected behavior such
 * as broken change detection.
 *
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 */
var ControlArray = (function (_super) {
    __extends(ControlArray, _super);
    function ControlArray(controls, validator, asyncValidator) {
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        _super.call(this, validator, asyncValidator);
        this.controls = controls;
        this._initObservables();
        this._setParentForControls();
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    /**
     * Get the {@link AbstractControl} at the given `index` in the array.
     */
    ControlArray.prototype.at = function (index) { return this.controls[index]; };
    /**
     * Insert a new {@link AbstractControl} at the end of the array.
     */
    ControlArray.prototype.push = function (control) {
        this.controls.push(control);
        control.setParent(this);
        this.updateValueAndValidity();
    };
    /**
     * Insert a new {@link AbstractControl} at the given `index` in the array.
     */
    ControlArray.prototype.insert = function (index, control) {
        collection_1.ListWrapper.insert(this.controls, index, control);
        control.setParent(this);
        this.updateValueAndValidity();
    };
    /**
     * Remove the control at the given `index` in the array.
     */
    ControlArray.prototype.removeAt = function (index) {
        collection_1.ListWrapper.removeAt(this.controls, index);
        this.updateValueAndValidity();
    };
    Object.defineProperty(ControlArray.prototype, "length", {
        /**
         * Length of the control array.
         */
        get: function () { return this.controls.length; },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    ControlArray.prototype._updateValue = function () { this._value = this.controls.map(function (control) { return control.value; }); };
    /** @internal */
    ControlArray.prototype._anyControlsHaveStatus = function (status) {
        return this.controls.some(function (c) { return c.status == status; });
    };
    /** @internal */
    ControlArray.prototype._setParentForControls = function () {
        var _this = this;
        this.controls.forEach(function (control) { control.setParent(_this); });
    };
    return ControlArray;
})(AbstractControl);
exports.ControlArray = ControlArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvY29tbW9uL2Zvcm1zL21vZGVsLnRzIl0sIm5hbWVzIjpbImlzQ29udHJvbCIsIl9maW5kIiwidG9PYnNlcnZhYmxlIiwiQWJzdHJhY3RDb250cm9sIiwiQWJzdHJhY3RDb250cm9sLmNvbnN0cnVjdG9yIiwiQWJzdHJhY3RDb250cm9sLnZhbHVlIiwiQWJzdHJhY3RDb250cm9sLnN0YXR1cyIsIkFic3RyYWN0Q29udHJvbC52YWxpZCIsIkFic3RyYWN0Q29udHJvbC5lcnJvcnMiLCJBYnN0cmFjdENvbnRyb2wucHJpc3RpbmUiLCJBYnN0cmFjdENvbnRyb2wuZGlydHkiLCJBYnN0cmFjdENvbnRyb2wudG91Y2hlZCIsIkFic3RyYWN0Q29udHJvbC51bnRvdWNoZWQiLCJBYnN0cmFjdENvbnRyb2wudmFsdWVDaGFuZ2VzIiwiQWJzdHJhY3RDb250cm9sLnN0YXR1c0NoYW5nZXMiLCJBYnN0cmFjdENvbnRyb2wucGVuZGluZyIsIkFic3RyYWN0Q29udHJvbC5tYXJrQXNUb3VjaGVkIiwiQWJzdHJhY3RDb250cm9sLm1hcmtBc0RpcnR5IiwiQWJzdHJhY3RDb250cm9sLm1hcmtBc1BlbmRpbmciLCJBYnN0cmFjdENvbnRyb2wuc2V0UGFyZW50IiwiQWJzdHJhY3RDb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkiLCJBYnN0cmFjdENvbnRyb2wuX3J1blZhbGlkYXRvciIsIkFic3RyYWN0Q29udHJvbC5fcnVuQXN5bmNWYWxpZGF0b3IiLCJBYnN0cmFjdENvbnRyb2wuX2NhbmNlbEV4aXN0aW5nU3Vic2NyaXB0aW9uIiwiQWJzdHJhY3RDb250cm9sLnNldEVycm9ycyIsIkFic3RyYWN0Q29udHJvbC5maW5kIiwiQWJzdHJhY3RDb250cm9sLmdldEVycm9yIiwiQWJzdHJhY3RDb250cm9sLmhhc0Vycm9yIiwiQWJzdHJhY3RDb250cm9sLnJvb3QiLCJBYnN0cmFjdENvbnRyb2wuX3VwZGF0ZUNvbnRyb2xzRXJyb3JzIiwiQWJzdHJhY3RDb250cm9sLl9pbml0T2JzZXJ2YWJsZXMiLCJBYnN0cmFjdENvbnRyb2wuX2NhbGN1bGF0ZVN0YXR1cyIsIkNvbnRyb2wiLCJDb250cm9sLmNvbnN0cnVjdG9yIiwiQ29udHJvbC51cGRhdGVWYWx1ZSIsIkNvbnRyb2wuX3VwZGF0ZVZhbHVlIiwiQ29udHJvbC5fYW55Q29udHJvbHNIYXZlU3RhdHVzIiwiQ29udHJvbC5yZWdpc3Rlck9uQ2hhbmdlIiwiQ29udHJvbEdyb3VwIiwiQ29udHJvbEdyb3VwLmNvbnN0cnVjdG9yIiwiQ29udHJvbEdyb3VwLmFkZENvbnRyb2wiLCJDb250cm9sR3JvdXAucmVtb3ZlQ29udHJvbCIsIkNvbnRyb2xHcm91cC5pbmNsdWRlIiwiQ29udHJvbEdyb3VwLmV4Y2x1ZGUiLCJDb250cm9sR3JvdXAuY29udGFpbnMiLCJDb250cm9sR3JvdXAuX3NldFBhcmVudEZvckNvbnRyb2xzIiwiQ29udHJvbEdyb3VwLl91cGRhdGVWYWx1ZSIsIkNvbnRyb2xHcm91cC5fYW55Q29udHJvbHNIYXZlU3RhdHVzIiwiQ29udHJvbEdyb3VwLl9yZWR1Y2VWYWx1ZSIsIkNvbnRyb2xHcm91cC5fcmVkdWNlQ2hpbGRyZW4iLCJDb250cm9sR3JvdXAuX2luY2x1ZGVkIiwiQ29udHJvbEFycmF5IiwiQ29udHJvbEFycmF5LmNvbnN0cnVjdG9yIiwiQ29udHJvbEFycmF5LmF0IiwiQ29udHJvbEFycmF5LnB1c2giLCJDb250cm9sQXJyYXkuaW5zZXJ0IiwiQ29udHJvbEFycmF5LnJlbW92ZUF0IiwiQ29udHJvbEFycmF5Lmxlbmd0aCIsIkNvbnRyb2xBcnJheS5fdXBkYXRlVmFsdWUiLCJDb250cm9sQXJyYXkuX2FueUNvbnRyb2xzSGF2ZVN0YXR1cyIsIkNvbnRyb2xBcnJheS5fc2V0UGFyZW50Rm9yQ29udHJvbHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUJBQStELDBCQUEwQixDQUFDLENBQUE7QUFDMUYsc0JBQTBELDJC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QU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBOzs7T0FBQU47SUFFckRBLGdCQUFnQkE7SUFDaEJBLG1DQUFZQSxHQUFaQSxjQUF1Qk8sSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBQ0EsT0FBT0EsSUFBS0EsT0FBQUEsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBYkEsQ0FBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFckZQLGdCQUFnQkE7SUFDaEJBLDZDQUFzQkEsR0FBdEJBLFVBQXVCQSxNQUFjQTtRQUNuQ1EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBQUEsQ0FBQ0EsSUFBSUEsT0FBQUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsSUFBSUEsTUFBTUEsRUFBbEJBLENBQWtCQSxDQUFDQSxDQUFDQTtJQUNyREEsQ0FBQ0E7SUFHRFIsZ0JBQWdCQTtJQUNoQkEsNENBQXFCQSxHQUFyQkE7UUFBQVMsaUJBRUNBO1FBRENBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLE9BQU9BLElBQU9BLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLEtBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQ25FQSxDQUFDQTtJQUNIVCxtQkFBQ0E7QUFBREEsQ0FBQ0EsQUExREQsRUFBa0MsZUFBZSxFQTBEaEQ7QUExRFksb0JBQVksZUEwRHhCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0cmluZ1dyYXBwZXIsIGlzUHJlc2VudCwgaXNCbGFuaywgbm9ybWFsaXplQm9vbH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgRXZlbnRFbWl0dGVyLCBPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL3Byb21pc2UnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCBhIENvbnRyb2wgaXMgdmFsaWQsIGkuZS4gdGhhdCBubyBlcnJvcnMgZXhpc3QgaW4gdGhlIGlucHV0IHZhbHVlLlxuICovXG5leHBvcnQgY29uc3QgVkFMSUQgPSBcIlZBTElEXCI7XG5cbi8qKlxuICogSW5kaWNhdGVzIHRoYXQgYSBDb250cm9sIGlzIGludmFsaWQsIGkuZS4gdGhhdCBhbiBlcnJvciBleGlzdHMgaW4gdGhlIGlucHV0IHZhbHVlLlxuICovXG5leHBvcnQgY29uc3QgSU5WQUxJRCA9IFwiSU5WQUxJRFwiO1xuXG4vKipcbiAqIEluZGljYXRlcyB0aGF0IGEgQ29udHJvbCBpcyBwZW5kaW5nLCBpLmUuIHRoYXQgYXN5bmMgdmFsaWRhdGlvbiBpcyBvY2N1cnJpbmcgYW5kXG4gKiBlcnJvcnMgYXJlIG5vdCB5ZXQgYXZhaWxhYmxlIGZvciB0aGUgaW5wdXQgdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBQRU5ESU5HID0gXCJQRU5ESU5HXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbnRyb2woY29udHJvbDogT2JqZWN0KTogYm9vbGVhbiB7XG4gIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgQWJzdHJhY3RDb250cm9sO1xufVxuXG5mdW5jdGlvbiBfZmluZChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIHBhdGg6IEFycmF5PHN0cmluZyB8IG51bWJlcj58IHN0cmluZykge1xuICBpZiAoaXNCbGFuayhwYXRoKSkgcmV0dXJuIG51bGw7XG5cbiAgaWYgKCEocGF0aCBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIHBhdGggPSAoPHN0cmluZz5wYXRoKS5zcGxpdChcIi9cIik7XG4gIH1cbiAgaWYgKHBhdGggaW5zdGFuY2VvZiBBcnJheSAmJiBMaXN0V3JhcHBlci5pc0VtcHR5KHBhdGgpKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gKDxBcnJheTxzdHJpbmcgfCBudW1iZXI+PnBhdGgpXG4gICAgICAucmVkdWNlKCh2LCBuYW1lKSA9PiB7XG4gICAgICAgIGlmICh2IGluc3RhbmNlb2YgQ29udHJvbEdyb3VwKSB7XG4gICAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh2LmNvbnRyb2xzW25hbWVdKSA/IHYuY29udHJvbHNbbmFtZV0gOiBudWxsO1xuICAgICAgICB9IGVsc2UgaWYgKHYgaW5zdGFuY2VvZiBDb250cm9sQXJyYXkpIHtcbiAgICAgICAgICB2YXIgaW5kZXggPSA8bnVtYmVyPm5hbWU7XG4gICAgICAgICAgcmV0dXJuIGlzUHJlc2VudCh2LmF0KGluZGV4KSkgPyB2LmF0KGluZGV4KSA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sIGNvbnRyb2wpO1xufVxuXG5mdW5jdGlvbiB0b09ic2VydmFibGUocjogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgcmV0dXJuIFByb21pc2VXcmFwcGVyLmlzUHJvbWlzZShyKSA/IE9ic2VydmFibGVXcmFwcGVyLmZyb21Qcm9taXNlKHIpIDogcjtcbn1cblxuLyoqXG4gKlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RDb250cm9sIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdmFsdWU6IGFueTtcblxuICBwcml2YXRlIF92YWx1ZUNoYW5nZXM6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICBwcml2YXRlIF9zdGF0dXNDaGFuZ2VzOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgcHJpdmF0ZSBfc3RhdHVzOiBzdHJpbmc7XG4gIHByaXZhdGUgX2Vycm9yczoge1trZXk6IHN0cmluZ106IGFueX07XG4gIHByaXZhdGUgX3ByaXN0aW5lOiBib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfdG91Y2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9wYXJlbnQ6IENvbnRyb2xHcm91cCB8IENvbnRyb2xBcnJheTtcbiAgcHJpdmF0ZSBfYXN5bmNWYWxpZGF0aW9uU3Vic2NyaXB0aW9uOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHZhbGlkYXRvcjogRnVuY3Rpb24sIHB1YmxpYyBhc3luY1ZhbGlkYXRvcjogRnVuY3Rpb24pIHt9XG5cbiAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuXG4gIGdldCBzdGF0dXMoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3N0YXR1czsgfVxuXG4gIGdldCB2YWxpZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3N0YXR1cyA9PT0gVkFMSUQ7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZXJyb3JzIG9mIHRoaXMgY29udHJvbC5cbiAgICovXG4gIGdldCBlcnJvcnMoKToge1trZXk6IHN0cmluZ106IGFueX0geyByZXR1cm4gdGhpcy5fZXJyb3JzOyB9XG5cbiAgZ2V0IHByaXN0aW5lKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcHJpc3RpbmU7IH1cblxuICBnZXQgZGlydHkoKTogYm9vbGVhbiB7IHJldHVybiAhdGhpcy5wcmlzdGluZTsgfVxuXG4gIGdldCB0b3VjaGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdG91Y2hlZDsgfVxuXG4gIGdldCB1bnRvdWNoZWQoKTogYm9vbGVhbiB7IHJldHVybiAhdGhpcy5fdG91Y2hlZDsgfVxuXG4gIGdldCB2YWx1ZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTxhbnk+IHsgcmV0dXJuIHRoaXMuX3ZhbHVlQ2hhbmdlczsgfVxuXG4gIGdldCBzdGF0dXNDaGFuZ2VzKCk6IE9ic2VydmFibGU8YW55PiB7IHJldHVybiB0aGlzLl9zdGF0dXNDaGFuZ2VzOyB9XG5cbiAgZ2V0IHBlbmRpbmcoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zdGF0dXMgPT0gUEVORElORzsgfVxuXG4gIG1hcmtBc1RvdWNoZWQoKTogdm9pZCB7IHRoaXMuX3RvdWNoZWQgPSB0cnVlOyB9XG5cbiAgbWFya0FzRGlydHkoe29ubHlTZWxmfToge29ubHlTZWxmPzogYm9vbGVhbn0gPSB7fSk6IHZvaWQge1xuICAgIG9ubHlTZWxmID0gbm9ybWFsaXplQm9vbChvbmx5U2VsZik7XG4gICAgdGhpcy5fcHJpc3RpbmUgPSBmYWxzZTtcblxuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcGFyZW50KSAmJiAhb25seVNlbGYpIHtcbiAgICAgIHRoaXMuX3BhcmVudC5tYXJrQXNEaXJ0eSh7b25seVNlbGY6IG9ubHlTZWxmfSk7XG4gICAgfVxuICB9XG5cbiAgbWFya0FzUGVuZGluZyh7b25seVNlbGZ9OiB7b25seVNlbGY/OiBib29sZWFufSA9IHt9KTogdm9pZCB7XG4gICAgb25seVNlbGYgPSBub3JtYWxpemVCb29sKG9ubHlTZWxmKTtcbiAgICB0aGlzLl9zdGF0dXMgPSBQRU5ESU5HO1xuXG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9wYXJlbnQpICYmICFvbmx5U2VsZikge1xuICAgICAgdGhpcy5fcGFyZW50Lm1hcmtBc1BlbmRpbmcoe29ubHlTZWxmOiBvbmx5U2VsZn0pO1xuICAgIH1cbiAgfVxuXG4gIHNldFBhcmVudChwYXJlbnQ6IENvbnRyb2xHcm91cCB8IENvbnRyb2xBcnJheSk6IHZvaWQgeyB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7IH1cblxuICB1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KFxuICAgICAge29ubHlTZWxmLCBlbWl0RXZlbnR9OiB7b25seVNlbGY/OiBib29sZWFuLCBlbWl0RXZlbnQ/OiBib29sZWFufSA9IHt9KTogdm9pZCB7XG4gICAgb25seVNlbGYgPSBub3JtYWxpemVCb29sKG9ubHlTZWxmKTtcbiAgICBlbWl0RXZlbnQgPSBpc1ByZXNlbnQoZW1pdEV2ZW50KSA/IGVtaXRFdmVudCA6IHRydWU7XG5cbiAgICB0aGlzLl91cGRhdGVWYWx1ZSgpO1xuXG4gICAgdGhpcy5fZXJyb3JzID0gdGhpcy5fcnVuVmFsaWRhdG9yKCk7XG4gICAgdGhpcy5fc3RhdHVzID0gdGhpcy5fY2FsY3VsYXRlU3RhdHVzKCk7XG5cbiAgICBpZiAodGhpcy5fc3RhdHVzID09IFZBTElEIHx8IHRoaXMuX3N0YXR1cyA9PSBQRU5ESU5HKSB7XG4gICAgICB0aGlzLl9ydW5Bc3luY1ZhbGlkYXRvcihlbWl0RXZlbnQpO1xuICAgIH1cblxuICAgIGlmIChlbWl0RXZlbnQpIHtcbiAgICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMuX3ZhbHVlQ2hhbmdlcywgdGhpcy5fdmFsdWUpO1xuICAgICAgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQodGhpcy5fc3RhdHVzQ2hhbmdlcywgdGhpcy5fc3RhdHVzKTtcbiAgICB9XG5cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3BhcmVudCkgJiYgIW9ubHlTZWxmKSB7XG4gICAgICB0aGlzLl9wYXJlbnQudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7b25seVNlbGY6IG9ubHlTZWxmLCBlbWl0RXZlbnQ6IGVtaXRFdmVudH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3J1blZhbGlkYXRvcigpIHsgcmV0dXJuIGlzUHJlc2VudCh0aGlzLnZhbGlkYXRvcikgPyB0aGlzLnZhbGlkYXRvcih0aGlzKSA6IG51bGw7IH1cblxuICBwcml2YXRlIF9ydW5Bc3luY1ZhbGlkYXRvcihlbWl0RXZlbnQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuYXN5bmNWYWxpZGF0b3IpKSB7XG4gICAgICB0aGlzLl9zdGF0dXMgPSBQRU5ESU5HO1xuICAgICAgdGhpcy5fY2FuY2VsRXhpc3RpbmdTdWJzY3JpcHRpb24oKTtcbiAgICAgIHZhciBvYnMgPSB0b09ic2VydmFibGUodGhpcy5hc3luY1ZhbGlkYXRvcih0aGlzKSk7XG4gICAgICB0aGlzLl9hc3luY1ZhbGlkYXRpb25TdWJzY3JpcHRpb24gPVxuICAgICAgICAgIE9ic2VydmFibGVXcmFwcGVyLnN1YnNjcmliZShvYnMsIHJlcyA9PiB0aGlzLnNldEVycm9ycyhyZXMsIHtlbWl0RXZlbnQ6IGVtaXRFdmVudH0pKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jYW5jZWxFeGlzdGluZ1N1YnNjcmlwdGlvbigpOiB2b2lkIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX2FzeW5jVmFsaWRhdGlvblN1YnNjcmlwdGlvbikpIHtcbiAgICAgIE9ic2VydmFibGVXcmFwcGVyLmRpc3Bvc2UodGhpcy5fYXN5bmNWYWxpZGF0aW9uU3Vic2NyaXB0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBlcnJvcnMgb24gYSBjb250cm9sLlxuICAgKlxuICAgKiBUaGlzIGlzIHVzZWQgd2hlbiB2YWxpZGF0aW9ucyBhcmUgcnVuIG5vdCBhdXRvbWF0aWNhbGx5LCBidXQgbWFudWFsbHkgYnkgdGhlIHVzZXIuXG4gICAqXG4gICAqIENhbGxpbmcgYHNldEVycm9yc2Agd2lsbCBhbHNvIHVwZGF0ZSB0aGUgdmFsaWRpdHkgb2YgdGhlIHBhcmVudCBjb250cm9sLlxuICAgKlxuICAgKiAjIyBVc2FnZVxuICAgKlxuICAgKiBgYGBcbiAgICogdmFyIGxvZ2luID0gbmV3IENvbnRyb2woXCJzb21lTG9naW5cIik7XG4gICAqIGxvZ2luLnNldEVycm9ycyh7XG4gICAqICAgXCJub3RVbmlxdWVcIjogdHJ1ZVxuICAgKiB9KTtcbiAgICpcbiAgICogZXhwZWN0KGxvZ2luLnZhbGlkKS50b0VxdWFsKGZhbHNlKTtcbiAgICogZXhwZWN0KGxvZ2luLmVycm9ycykudG9FcXVhbCh7XCJub3RVbmlxdWVcIjogdHJ1ZX0pO1xuICAgKlxuICAgKiBsb2dpbi51cGRhdGVWYWx1ZShcInNvbWVPdGhlckxvZ2luXCIpO1xuICAgKlxuICAgKiBleHBlY3QobG9naW4udmFsaWQpLnRvRXF1YWwodHJ1ZSk7XG4gICAqIGBgYFxuICAgKi9cbiAgc2V0RXJyb3JzKGVycm9yczoge1trZXk6IHN0cmluZ106IGFueX0sIHtlbWl0RXZlbnR9OiB7ZW1pdEV2ZW50PzogYm9vbGVhbn0gPSB7fSk6IHZvaWQge1xuICAgIGVtaXRFdmVudCA9IGlzUHJlc2VudChlbWl0RXZlbnQpID8gZW1pdEV2ZW50IDogdHJ1ZTtcblxuICAgIHRoaXMuX2Vycm9ycyA9IGVycm9ycztcbiAgICB0aGlzLl9zdGF0dXMgPSB0aGlzLl9jYWxjdWxhdGVTdGF0dXMoKTtcblxuICAgIGlmIChlbWl0RXZlbnQpIHtcbiAgICAgIE9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0KHRoaXMuX3N0YXR1c0NoYW5nZXMsIHRoaXMuX3N0YXR1cyk7XG4gICAgfVxuXG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9wYXJlbnQpKSB7XG4gICAgICB0aGlzLl9wYXJlbnQuX3VwZGF0ZUNvbnRyb2xzRXJyb3JzKCk7XG4gICAgfVxuICB9XG5cbiAgZmluZChwYXRoOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+fCBzdHJpbmcpOiBBYnN0cmFjdENvbnRyb2wgeyByZXR1cm4gX2ZpbmQodGhpcywgcGF0aCk7IH1cblxuICBnZXRFcnJvcihlcnJvckNvZGU6IHN0cmluZywgcGF0aDogc3RyaW5nW10gPSBudWxsKTogYW55IHtcbiAgICB2YXIgY29udHJvbCA9IGlzUHJlc2VudChwYXRoKSAmJiAhTGlzdFdyYXBwZXIuaXNFbXB0eShwYXRoKSA/IHRoaXMuZmluZChwYXRoKSA6IHRoaXM7XG4gICAgaWYgKGlzUHJlc2VudChjb250cm9sKSAmJiBpc1ByZXNlbnQoY29udHJvbC5fZXJyb3JzKSkge1xuICAgICAgcmV0dXJuIFN0cmluZ01hcFdyYXBwZXIuZ2V0KGNvbnRyb2wuX2Vycm9ycywgZXJyb3JDb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgaGFzRXJyb3IoZXJyb3JDb2RlOiBzdHJpbmcsIHBhdGg6IHN0cmluZ1tdID0gbnVsbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5nZXRFcnJvcihlcnJvckNvZGUsIHBhdGgpKTtcbiAgfVxuXG4gIGdldCByb290KCk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgbGV0IHg6IEFic3RyYWN0Q29udHJvbCA9IHRoaXM7XG5cbiAgICB3aGlsZSAoaXNQcmVzZW50KHguX3BhcmVudCkpIHtcbiAgICAgIHggPSB4Ll9wYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHg7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF91cGRhdGVDb250cm9sc0Vycm9ycygpOiB2b2lkIHtcbiAgICB0aGlzLl9zdGF0dXMgPSB0aGlzLl9jYWxjdWxhdGVTdGF0dXMoKTtcblxuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fcGFyZW50KSkge1xuICAgICAgdGhpcy5fcGFyZW50Ll91cGRhdGVDb250cm9sc0Vycm9ycygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2luaXRPYnNlcnZhYmxlcygpIHtcbiAgICB0aGlzLl92YWx1ZUNoYW5nZXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5fc3RhdHVzQ2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlU3RhdHVzKCk6IHN0cmluZyB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9lcnJvcnMpKSByZXR1cm4gSU5WQUxJRDtcbiAgICBpZiAodGhpcy5fYW55Q29udHJvbHNIYXZlU3RhdHVzKFBFTkRJTkcpKSByZXR1cm4gUEVORElORztcbiAgICBpZiAodGhpcy5fYW55Q29udHJvbHNIYXZlU3RhdHVzKElOVkFMSUQpKSByZXR1cm4gSU5WQUxJRDtcbiAgICByZXR1cm4gVkFMSUQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIGFic3RyYWN0IF91cGRhdGVWYWx1ZSgpOiB2b2lkO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgYWJzdHJhY3QgX2FueUNvbnRyb2xzSGF2ZVN0YXR1cyhzdGF0dXM6IHN0cmluZyk6IGJvb2xlYW47XG59XG5cbi8qKlxuICogRGVmaW5lcyBhIHBhcnQgb2YgYSBmb3JtIHRoYXQgY2Fubm90IGJlIGRpdmlkZWQgaW50byBvdGhlciBjb250cm9scy4gYENvbnRyb2xgcyBoYXZlIHZhbHVlcyBhbmRcbiAqIHZhbGlkYXRpb24gc3RhdGUsIHdoaWNoIGlzIGRldGVybWluZWQgYnkgYW4gb3B0aW9uYWwgdmFsaWRhdGlvbiBmdW5jdGlvbi5cbiAqXG4gKiBgQ29udHJvbGAgaXMgb25lIG9mIHRoZSB0aHJlZSBmdW5kYW1lbnRhbCBidWlsZGluZyBibG9ja3MgdXNlZCB0byBkZWZpbmUgZm9ybXMgaW4gQW5ndWxhciwgYWxvbmdcbiAqIHdpdGgge0BsaW5rIENvbnRyb2xHcm91cH0gYW5kIHtAbGluayBDb250cm9sQXJyYXl9LlxuICpcbiAqICMjIFVzYWdlXG4gKlxuICogQnkgZGVmYXVsdCwgYSBgQ29udHJvbGAgaXMgY3JlYXRlZCBmb3IgZXZlcnkgYDxpbnB1dD5gIG9yIG90aGVyIGZvcm0gY29tcG9uZW50LlxuICogV2l0aCB7QGxpbmsgTmdGb3JtQ29udHJvbH0gb3Ige0BsaW5rIE5nRm9ybU1vZGVsfSBhbiBleGlzdGluZyB7QGxpbmsgQ29udHJvbH0gY2FuIGJlXG4gKiBib3VuZCB0byBhIERPTSBlbGVtZW50IGluc3RlYWQuIFRoaXMgYENvbnRyb2xgIGNhbiBiZSBjb25maWd1cmVkIHdpdGggYSBjdXN0b21cbiAqIHZhbGlkYXRpb24gZnVuY3Rpb24uXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0LzIzREVTT3BiTm5CcEJIWnQxQlI0P3A9cHJldmlldykpXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250cm9sIGV4dGVuZHMgQWJzdHJhY3RDb250cm9sIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfb25DaGFuZ2U6IEZ1bmN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHZhbHVlOiBhbnkgPSBudWxsLCB2YWxpZGF0b3I6IEZ1bmN0aW9uID0gbnVsbCwgYXN5bmNWYWxpZGF0b3I6IEZ1bmN0aW9uID0gbnVsbCkge1xuICAgIHN1cGVyKHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZX0pO1xuICAgIHRoaXMuX2luaXRPYnNlcnZhYmxlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wgdG8gYHZhbHVlYC5cbiAgICpcbiAgICogSWYgYG9ubHlTZWxmYCBpcyBgdHJ1ZWAsIHRoaXMgY2hhbmdlIHdpbGwgb25seSBhZmZlY3QgdGhlIHZhbGlkYXRpb24gb2YgdGhpcyBgQ29udHJvbGBcbiAgICogYW5kIG5vdCBpdHMgcGFyZW50IGNvbXBvbmVudC4gSWYgYGVtaXRFdmVudGAgaXMgYHRydWVgLCB0aGlzIGNoYW5nZSB3aWxsIGNhdXNlIGFcbiAgICogYHZhbHVlQ2hhbmdlc2AgZXZlbnQgb24gdGhlIGBDb250cm9sYCB0byBiZSBlbWl0dGVkLiBCb3RoIG9mIHRoZXNlIG9wdGlvbnMgZGVmYXVsdCB0b1xuICAgKiBgZmFsc2VgLlxuICAgKlxuICAgKiBJZiBgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlYCBpcyBgdHJ1ZWAsIHRoZSB2aWV3IHdpbGwgYmUgbm90aWZpZWQgYWJvdXQgdGhlIG5ldyB2YWx1ZVxuICAgKiB2aWEgYW4gYG9uQ2hhbmdlYCBldmVudC4gVGhpcyBpcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBpZiBgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlYCBpcyBub3RcbiAgICogc3BlY2lmaWVkLlxuICAgKi9cbiAgdXBkYXRlVmFsdWUodmFsdWU6IGFueSwge29ubHlTZWxmLCBlbWl0RXZlbnQsIGVtaXRNb2RlbFRvVmlld0NoYW5nZX06IHtcbiAgICBvbmx5U2VsZj86IGJvb2xlYW4sXG4gICAgZW1pdEV2ZW50PzogYm9vbGVhbixcbiAgICBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U/OiBib29sZWFuXG4gIH0gPSB7fSk6IHZvaWQge1xuICAgIGVtaXRNb2RlbFRvVmlld0NoYW5nZSA9IGlzUHJlc2VudChlbWl0TW9kZWxUb1ZpZXdDaGFuZ2UpID8gZW1pdE1vZGVsVG9WaWV3Q2hhbmdlIDogdHJ1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5fb25DaGFuZ2UpICYmIGVtaXRNb2RlbFRvVmlld0NoYW5nZSkgdGhpcy5fb25DaGFuZ2UodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7b25seVNlbGY6IG9ubHlTZWxmLCBlbWl0RXZlbnQ6IGVtaXRFdmVudH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX3VwZGF0ZVZhbHVlKCkge31cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfYW55Q29udHJvbHNIYXZlU3RhdHVzKHN0YXR1czogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGxpc3RlbmVyIGZvciBjaGFuZ2UgZXZlbnRzLlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHsgdGhpcy5fb25DaGFuZ2UgPSBmbjsgfVxufVxuXG4vKipcbiAqIERlZmluZXMgYSBwYXJ0IG9mIGEgZm9ybSwgb2YgZml4ZWQgbGVuZ3RoLCB0aGF0IGNhbiBjb250YWluIG90aGVyIGNvbnRyb2xzLlxuICpcbiAqIEEgYENvbnRyb2xHcm91cGAgYWdncmVnYXRlcyB0aGUgdmFsdWVzIGFuZCBlcnJvcnMgb2YgZWFjaCB7QGxpbmsgQ29udHJvbH0gaW4gdGhlIGdyb3VwLiBUaHVzLCBpZlxuICogb25lIG9mIHRoZSBjb250cm9scyBpbiBhIGdyb3VwIGlzIGludmFsaWQsIHRoZSBlbnRpcmUgZ3JvdXAgaXMgaW52YWxpZC4gU2ltaWxhcmx5LCBpZiBhIGNvbnRyb2xcbiAqIGNoYW5nZXMgaXRzIHZhbHVlLCB0aGUgZW50aXJlIGdyb3VwIGNoYW5nZXMgYXMgd2VsbC5cbiAqXG4gKiBgQ29udHJvbEdyb3VwYCBpcyBvbmUgb2YgdGhlIHRocmVlIGZ1bmRhbWVudGFsIGJ1aWxkaW5nIGJsb2NrcyB1c2VkIHRvIGRlZmluZSBmb3JtcyBpbiBBbmd1bGFyLFxuICogYWxvbmcgd2l0aCB7QGxpbmsgQ29udHJvbH0gYW5kIHtAbGluayBDb250cm9sQXJyYXl9LiB7QGxpbmsgQ29udHJvbEFycmF5fSBjYW4gYWxzbyBjb250YWluIG90aGVyXG4gKiBjb250cm9scywgYnV0IGlzIG9mIHZhcmlhYmxlIGxlbmd0aC5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvMjNERVNPcGJObkJwQkhadDFCUjQ/cD1wcmV2aWV3KSlcbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRyb2xHcm91cCBleHRlbmRzIEFic3RyYWN0Q29udHJvbCB7XG4gIHByaXZhdGUgX29wdGlvbmFsczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250cm9sczoge1trZXk6IHN0cmluZ106IEFic3RyYWN0Q29udHJvbH0sXG4gICAgICAgICAgICAgIG9wdGlvbmFsczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0gbnVsbCwgdmFsaWRhdG9yOiBGdW5jdGlvbiA9IG51bGwsXG4gICAgICAgICAgICAgIGFzeW5jVmFsaWRhdG9yOiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICBzdXBlcih2YWxpZGF0b3IsIGFzeW5jVmFsaWRhdG9yKTtcbiAgICB0aGlzLl9vcHRpb25hbHMgPSBpc1ByZXNlbnQob3B0aW9uYWxzKSA/IG9wdGlvbmFscyA6IHt9O1xuICAgIHRoaXMuX2luaXRPYnNlcnZhYmxlcygpO1xuICAgIHRoaXMuX3NldFBhcmVudEZvckNvbnRyb2xzKCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGNvbnRyb2wgdG8gdGhpcyBncm91cC5cbiAgICovXG4gIGFkZENvbnRyb2wobmFtZTogc3RyaW5nLCBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRyb2xzW25hbWVdID0gY29udHJvbDtcbiAgICBjb250cm9sLnNldFBhcmVudCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjb250cm9sIGZyb20gdGhpcyBncm91cC5cbiAgICovXG4gIHJlbW92ZUNvbnRyb2wobmFtZTogc3RyaW5nKTogdm9pZCB7IFN0cmluZ01hcFdyYXBwZXIuZGVsZXRlKHRoaXMuY29udHJvbHMsIG5hbWUpOyB9XG5cbiAgLyoqXG4gICAqIE1hcmsgdGhlIG5hbWVkIGNvbnRyb2wgYXMgbm9uLW9wdGlvbmFsLlxuICAgKi9cbiAgaW5jbHVkZShjb250cm9sTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5zZXQodGhpcy5fb3B0aW9uYWxzLCBjb250cm9sTmFtZSwgdHJ1ZSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gIH1cblxuICAvKipcbiAgICogTWFyayB0aGUgbmFtZWQgY29udHJvbCBhcyBvcHRpb25hbC5cbiAgICovXG4gIGV4Y2x1ZGUoY29udHJvbE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHRoaXMuX29wdGlvbmFscywgY29udHJvbE5hbWUsIGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHRoZXJlIGlzIGEgY29udHJvbCB3aXRoIHRoZSBnaXZlbiBuYW1lIGluIHRoZSBncm91cC5cbiAgICovXG4gIGNvbnRhaW5zKGNvbnRyb2xOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB2YXIgYyA9IFN0cmluZ01hcFdyYXBwZXIuY29udGFpbnModGhpcy5jb250cm9scywgY29udHJvbE5hbWUpO1xuICAgIHJldHVybiBjICYmIHRoaXMuX2luY2x1ZGVkKGNvbnRyb2xOYW1lKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NldFBhcmVudEZvckNvbnRyb2xzKCkge1xuICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChcbiAgICAgICAgdGhpcy5jb250cm9scywgKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCwgbmFtZTogc3RyaW5nKSA9PiB7IGNvbnRyb2wuc2V0UGFyZW50KHRoaXMpOyB9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3VwZGF0ZVZhbHVlKCkgeyB0aGlzLl92YWx1ZSA9IHRoaXMuX3JlZHVjZVZhbHVlKCk7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hbnlDb250cm9sc0hhdmVTdGF0dXMoc3RhdHVzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB2YXIgcmVzID0gZmFsc2U7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKHRoaXMuY29udHJvbHMsIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgcmVzID0gcmVzIHx8ICh0aGlzLmNvbnRhaW5zKG5hbWUpICYmIGNvbnRyb2wuc3RhdHVzID09IHN0YXR1cyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlZHVjZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWR1Y2VDaGlsZHJlbihcbiAgICAgICAge30sIChhY2M6IHtbazogc3RyaW5nXTogQWJzdHJhY3RDb250cm9sfSwgY29udHJvbDogQWJzdHJhY3RDb250cm9sLCBuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBhY2NbbmFtZV0gPSBjb250cm9sLnZhbHVlO1xuICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVkdWNlQ2hpbGRyZW4oaW5pdFZhbHVlOiBhbnksIGZuOiBGdW5jdGlvbikge1xuICAgIHZhciByZXMgPSBpbml0VmFsdWU7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKHRoaXMuY29udHJvbHMsIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHRoaXMuX2luY2x1ZGVkKG5hbWUpKSB7XG4gICAgICAgIHJlcyA9IGZuKHJlcywgY29udHJvbCwgbmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2luY2x1ZGVkKGNvbnRyb2xOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB2YXIgaXNPcHRpb25hbCA9IFN0cmluZ01hcFdyYXBwZXIuY29udGFpbnModGhpcy5fb3B0aW9uYWxzLCBjb250cm9sTmFtZSk7XG4gICAgcmV0dXJuICFpc09wdGlvbmFsIHx8IFN0cmluZ01hcFdyYXBwZXIuZ2V0KHRoaXMuX29wdGlvbmFscywgY29udHJvbE5hbWUpO1xuICB9XG59XG5cbi8qKlxuICogRGVmaW5lcyBhIHBhcnQgb2YgYSBmb3JtLCBvZiB2YXJpYWJsZSBsZW5ndGgsIHRoYXQgY2FuIGNvbnRhaW4gb3RoZXIgY29udHJvbHMuXG4gKlxuICogQSBgQ29udHJvbEFycmF5YCBhZ2dyZWdhdGVzIHRoZSB2YWx1ZXMgYW5kIGVycm9ycyBvZiBlYWNoIHtAbGluayBDb250cm9sfSBpbiB0aGUgZ3JvdXAuIFRodXMsIGlmXG4gKiBvbmUgb2YgdGhlIGNvbnRyb2xzIGluIGEgZ3JvdXAgaXMgaW52YWxpZCwgdGhlIGVudGlyZSBncm91cCBpcyBpbnZhbGlkLiBTaW1pbGFybHksIGlmIGEgY29udHJvbFxuICogY2hhbmdlcyBpdHMgdmFsdWUsIHRoZSBlbnRpcmUgZ3JvdXAgY2hhbmdlcyBhcyB3ZWxsLlxuICpcbiAqIGBDb250cm9sQXJyYXlgIGlzIG9uZSBvZiB0aGUgdGhyZWUgZnVuZGFtZW50YWwgYnVpbGRpbmcgYmxvY2tzIHVzZWQgdG8gZGVmaW5lIGZvcm1zIGluIEFuZ3VsYXIsXG4gKiBhbG9uZyB3aXRoIHtAbGluayBDb250cm9sfSBhbmQge0BsaW5rIENvbnRyb2xHcm91cH0uIHtAbGluayBDb250cm9sR3JvdXB9IGNhbiBhbHNvIGNvbnRhaW5cbiAqIG90aGVyIGNvbnRyb2xzLCBidXQgaXMgb2YgZml4ZWQgbGVuZ3RoLlxuICpcbiAqICMjIEFkZGluZyBvciByZW1vdmluZyBjb250cm9sc1xuICpcbiAqIFRvIGNoYW5nZSB0aGUgY29udHJvbHMgaW4gdGhlIGFycmF5LCB1c2UgdGhlIGBwdXNoYCwgYGluc2VydGAsIG9yIGByZW1vdmVBdGAgbWV0aG9kc1xuICogaW4gYENvbnRyb2xBcnJheWAgaXRzZWxmLiBUaGVzZSBtZXRob2RzIGVuc3VyZSB0aGUgY29udHJvbHMgYXJlIHByb3Blcmx5IHRyYWNrZWQgaW4gdGhlXG4gKiBmb3JtJ3MgaGllcmFyY2h5LiBEbyBub3QgbW9kaWZ5IHRoZSBhcnJheSBvZiBgQWJzdHJhY3RDb250cm9sYHMgdXNlZCB0byBpbnN0YW50aWF0ZVxuICogdGhlIGBDb250cm9sQXJyYXlgIGRpcmVjdGx5LCBhcyB0aGF0IHdpbGwgcmVzdWx0IGluIHN0cmFuZ2UgYW5kIHVuZXhwZWN0ZWQgYmVoYXZpb3Igc3VjaFxuICogYXMgYnJva2VuIGNoYW5nZSBkZXRlY3Rpb24uXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0LzIzREVTT3BiTm5CcEJIWnQxQlI0P3A9cHJldmlldykpXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250cm9sQXJyYXkgZXh0ZW5kcyBBYnN0cmFjdENvbnRyb2wge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udHJvbHM6IEFic3RyYWN0Q29udHJvbFtdLCB2YWxpZGF0b3I6IEZ1bmN0aW9uID0gbnVsbCxcbiAgICAgICAgICAgICAgYXN5bmNWYWxpZGF0b3I6IEZ1bmN0aW9uID0gbnVsbCkge1xuICAgIHN1cGVyKHZhbGlkYXRvciwgYXN5bmNWYWxpZGF0b3IpO1xuICAgIHRoaXMuX2luaXRPYnNlcnZhYmxlcygpO1xuICAgIHRoaXMuX3NldFBhcmVudEZvckNvbnRyb2xzKCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtvbmx5U2VsZjogdHJ1ZSwgZW1pdEV2ZW50OiBmYWxzZX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUge0BsaW5rIEFic3RyYWN0Q29udHJvbH0gYXQgdGhlIGdpdmVuIGBpbmRleGAgaW4gdGhlIGFycmF5LlxuICAgKi9cbiAgYXQoaW5kZXg6IG51bWJlcik6IEFic3RyYWN0Q29udHJvbCB7IHJldHVybiB0aGlzLmNvbnRyb2xzW2luZGV4XTsgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgYSBuZXcge0BsaW5rIEFic3RyYWN0Q29udHJvbH0gYXQgdGhlIGVuZCBvZiB0aGUgYXJyYXkuXG4gICAqL1xuICBwdXNoKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHZvaWQge1xuICAgIHRoaXMuY29udHJvbHMucHVzaChjb250cm9sKTtcbiAgICBjb250cm9sLnNldFBhcmVudCh0aGlzKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgYSBuZXcge0BsaW5rIEFic3RyYWN0Q29udHJvbH0gYXQgdGhlIGdpdmVuIGBpbmRleGAgaW4gdGhlIGFycmF5LlxuICAgKi9cbiAgaW5zZXJ0KGluZGV4OiBudW1iZXIsIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHZvaWQge1xuICAgIExpc3RXcmFwcGVyLmluc2VydCh0aGlzLmNvbnRyb2xzLCBpbmRleCwgY29udHJvbCk7XG4gICAgY29udHJvbC5zZXRQYXJlbnQodGhpcyk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHRoZSBjb250cm9sIGF0IHRoZSBnaXZlbiBgaW5kZXhgIGluIHRoZSBhcnJheS5cbiAgICovXG4gIHJlbW92ZUF0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBMaXN0V3JhcHBlci5yZW1vdmVBdCh0aGlzLmNvbnRyb2xzLCBpbmRleCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gIH1cblxuICAvKipcbiAgICogTGVuZ3RoIG9mIHRoZSBjb250cm9sIGFycmF5LlxuICAgKi9cbiAgZ2V0IGxlbmd0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jb250cm9scy5sZW5ndGg7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIF91cGRhdGVWYWx1ZSgpOiB2b2lkIHsgdGhpcy5fdmFsdWUgPSB0aGlzLmNvbnRyb2xzLm1hcCgoY29udHJvbCkgPT4gY29udHJvbC52YWx1ZSk7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hbnlDb250cm9sc0hhdmVTdGF0dXMoc3RhdHVzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb250cm9scy5zb21lKGMgPT4gYy5zdGF0dXMgPT0gc3RhdHVzKTtcbiAgfVxuXG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2V0UGFyZW50Rm9yQ29udHJvbHMoKTogdm9pZCB7XG4gICAgdGhpcy5jb250cm9scy5mb3JFYWNoKChjb250cm9sKSA9PiB7IGNvbnRyb2wuc2V0UGFyZW50KHRoaXMpOyB9KTtcbiAgfVxufVxuIl19