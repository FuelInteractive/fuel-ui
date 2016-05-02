'use strict';"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var globalScope;
if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
        globalScope = self;
    }
    else {
        globalScope = global;
    }
}
else {
    globalScope = window;
}
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
exports.scheduleMicroTask = scheduleMicroTask;
exports.IS_DART = false;
// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
var _global = globalScope;
exports.global = _global;
exports.Type = Function;
function getTypeNameForDebugging(type) {
    if (type['name']) {
        return type['name'];
    }
    return typeof type;
}
exports.getTypeNameForDebugging = getTypeNameForDebugging;
exports.Math = _global.Math;
exports.Date = _global.Date;
var _devMode = true;
var _modeLocked = false;
function lockMode() {
    _modeLocked = true;
}
exports.lockMode = lockMode;
/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 */
function enableProdMode() {
    if (_modeLocked) {
        // Cannot use BaseException as that ends up importing from facade/lang.
        throw 'Cannot enable prod mode after platform setup.';
    }
    _devMode = false;
}
exports.enableProdMode = enableProdMode;
function assertionsEnabled() {
    return _devMode;
}
exports.assertionsEnabled = assertionsEnabled;
// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
_global.assert = function assert(condition) {
    // TODO: to be fixed properly via #2830, noop for now
};
// This function is needed only to properly support Dart's const expressions
// see https://github.com/angular/ts2dart/pull/151 for more info
function CONST_EXPR(expr) {
    return expr;
}
exports.CONST_EXPR = CONST_EXPR;
function CONST() {
    return function (target) { return target; };
}
exports.CONST = CONST;
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
exports.isPresent = isPresent;
function isBlank(obj) {
    return obj === undefined || obj === null;
}
exports.isBlank = isBlank;
function isBoolean(obj) {
    return typeof obj === "boolean";
}
exports.isBoolean = isBoolean;
function isNumber(obj) {
    return typeof obj === "number";
}
exports.isNumber = isNumber;
function isString(obj) {
    return typeof obj === "string";
}
exports.isString = isString;
function isFunction(obj) {
    return typeof obj === "function";
}
exports.isFunction = isFunction;
function isType(obj) {
    return isFunction(obj);
}
exports.isType = isType;
function isStringMap(obj) {
    return typeof obj === 'object' && obj !== null;
}
exports.isStringMap = isStringMap;
function isPromise(obj) {
    return obj instanceof _global.Promise;
}
exports.isPromise = isPromise;
function isArray(obj) {
    return Array.isArray(obj);
}
exports.isArray = isArray;
function isDate(obj) {
    return obj instanceof exports.Date && !isNaN(obj.valueOf());
}
exports.isDate = isDate;
function noop() { }
exports.noop = noop;
function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token === undefined || token === null) {
        return '' + token;
    }
    if (token.name) {
        return token.name;
    }
    if (token.overriddenName) {
        return token.overriddenName;
    }
    var res = token.toString();
    var newLineIndex = res.indexOf("\n");
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
exports.stringify = stringify;
// serialize / deserialize enum exist only for consistency with dart API
// enums in typescript don't need to be serialized
function serializeEnum(val) {
    return val;
}
exports.serializeEnum = serializeEnum;
function deserializeEnum(val, values) {
    return val;
}
exports.deserializeEnum = deserializeEnum;
function resolveEnumToken(enumValue, val) {
    return enumValue[val];
}
exports.resolveEnumToken = resolveEnumToken;
var StringWrapper = (function () {
    function StringWrapper() {
    }
    StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
    StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
    StringWrapper.split = function (s, regExp) { return s.split(regExp); };
    StringWrapper.equals = function (s, s2) { return s === s2; };
    StringWrapper.stripLeft = function (s, charVal) {
        if (s && s.length) {
            var pos = 0;
            for (var i = 0; i < s.length; i++) {
                if (s[i] != charVal)
                    break;
                pos++;
            }
            s = s.substring(pos);
        }
        return s;
    };
    StringWrapper.stripRight = function (s, charVal) {
        if (s && s.length) {
            var pos = s.length;
            for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] != charVal)
                    break;
                pos--;
            }
            s = s.substring(0, pos);
        }
        return s;
    };
    StringWrapper.replace = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.replaceAll = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.slice = function (s, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return s.slice(from, to === null ? undefined : to);
    };
    StringWrapper.replaceAllMapped = function (s, from, cb) {
        return s.replace(from, function () {
            var matches = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                matches[_i - 0] = arguments[_i];
            }
            // Remove offset & string from the result array
            matches.splice(-2, 2);
            // The callback receives match, p1, ..., pn
            return cb(matches);
        });
    };
    StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
    StringWrapper.compare = function (a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    };
    return StringWrapper;
}());
exports.StringWrapper = StringWrapper;
var StringJoiner = (function () {
    function StringJoiner(parts) {
        if (parts === void 0) { parts = []; }
        this.parts = parts;
    }
    StringJoiner.prototype.add = function (part) { this.parts.push(part); };
    StringJoiner.prototype.toString = function () { return this.parts.join(""); };
    return StringJoiner;
}());
exports.StringJoiner = StringJoiner;
var NumberParseError = (function (_super) {
    __extends(NumberParseError, _super);
    function NumberParseError(message) {
        _super.call(this);
        this.message = message;
    }
    NumberParseError.prototype.toString = function () { return this.message; };
    return NumberParseError;
}(Error));
exports.NumberParseError = NumberParseError;
var NumberWrapper = (function () {
    function NumberWrapper() {
    }
    NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
    NumberWrapper.equal = function (a, b) { return a === b; };
    NumberWrapper.parseIntAutoRadix = function (text) {
        var result = parseInt(text);
        if (isNaN(result)) {
            throw new NumberParseError("Invalid integer literal when parsing " + text);
        }
        return result;
    };
    NumberWrapper.parseInt = function (text, radix) {
        if (radix == 10) {
            if (/^(\-|\+)?[0-9]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else if (radix == 16) {
            if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else {
            var result = parseInt(text, radix);
            if (!isNaN(result)) {
                return result;
            }
        }
        throw new NumberParseError("Invalid integer literal when parsing " + text + " in base " +
            radix);
    };
    // TODO: NaN is a valid literal but is returned by parseFloat to indicate an error.
    NumberWrapper.parseFloat = function (text) { return parseFloat(text); };
    Object.defineProperty(NumberWrapper, "NaN", {
        get: function () { return NaN; },
        enumerable: true,
        configurable: true
    });
    NumberWrapper.isNaN = function (value) { return isNaN(value); };
    NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
    return NumberWrapper;
}());
exports.NumberWrapper = NumberWrapper;
exports.RegExp = _global.RegExp;
var RegExpWrapper = (function () {
    function RegExpWrapper() {
    }
    RegExpWrapper.create = function (regExpStr, flags) {
        if (flags === void 0) { flags = ''; }
        flags = flags.replace(/g/g, '');
        return new _global.RegExp(regExpStr, flags + 'g');
    };
    RegExpWrapper.firstMatch = function (regExp, input) {
        // Reset multimatch regex state
        regExp.lastIndex = 0;
        return regExp.exec(input);
    };
    RegExpWrapper.test = function (regExp, input) {
        regExp.lastIndex = 0;
        return regExp.test(input);
    };
    RegExpWrapper.matcher = function (regExp, input) {
        // Reset regex state for the case
        // someone did not loop over all matches
        // last time.
        regExp.lastIndex = 0;
        return { re: regExp, input: input };
    };
    RegExpWrapper.replaceAll = function (regExp, input, replace) {
        var c = regExp.exec(input);
        var res = '';
        regExp.lastIndex = 0;
        var prev = 0;
        while (c) {
            res += input.substring(prev, c.index);
            res += replace(c);
            prev = c.index + c[0].length;
            regExp.lastIndex = prev;
            c = regExp.exec(input);
        }
        res += input.substring(prev);
        return res;
    };
    return RegExpWrapper;
}());
exports.RegExpWrapper = RegExpWrapper;
var RegExpMatcherWrapper = (function () {
    function RegExpMatcherWrapper() {
    }
    RegExpMatcherWrapper.next = function (matcher) {
        return matcher.re.exec(matcher.input);
    };
    return RegExpMatcherWrapper;
}());
exports.RegExpMatcherWrapper = RegExpMatcherWrapper;
var FunctionWrapper = (function () {
    function FunctionWrapper() {
    }
    FunctionWrapper.apply = function (fn, posArgs) { return fn.apply(null, posArgs); };
    return FunctionWrapper;
}());
exports.FunctionWrapper = FunctionWrapper;
// JS has NaN !== NaN
function looseIdentical(a, b) {
    return a === b || typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b);
}
exports.looseIdentical = looseIdentical;
// JS considers NaN is the same as NaN for map Key (while NaN !== NaN otherwise)
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
function getMapKey(value) {
    return value;
}
exports.getMapKey = getMapKey;
function normalizeBlank(obj) {
    return isBlank(obj) ? null : obj;
}
exports.normalizeBlank = normalizeBlank;
function normalizeBool(obj) {
    return isBlank(obj) ? false : obj;
}
exports.normalizeBool = normalizeBool;
function isJsObject(o) {
    return o !== null && (typeof o === "function" || typeof o === "object");
}
exports.isJsObject = isJsObject;
function print(obj) {
    console.log(obj);
}
exports.print = print;
function warn(obj) {
    console.warn(obj);
}
exports.warn = warn;
// Can't be all uppercase as our transpiler would think it is a special directive...
var Json = (function () {
    function Json() {
    }
    Json.parse = function (s) { return _global.JSON.parse(s); };
    Json.stringify = function (data) {
        // Dart doesn't take 3 arguments
        return _global.JSON.stringify(data, null, 2);
    };
    return Json;
}());
exports.Json = Json;
var DateWrapper = (function () {
    function DateWrapper() {
    }
    DateWrapper.create = function (year, month, day, hour, minutes, seconds, milliseconds) {
        if (month === void 0) { month = 1; }
        if (day === void 0) { day = 1; }
        if (hour === void 0) { hour = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        if (milliseconds === void 0) { milliseconds = 0; }
        return new exports.Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
    };
    DateWrapper.fromISOString = function (str) { return new exports.Date(str); };
    DateWrapper.fromMillis = function (ms) { return new exports.Date(ms); };
    DateWrapper.toMillis = function (date) { return date.getTime(); };
    DateWrapper.now = function () { return new exports.Date(); };
    DateWrapper.toJson = function (date) { return date.toJSON(); };
    return DateWrapper;
}());
exports.DateWrapper = DateWrapper;
function setValueOnPath(global, path, value) {
    var parts = path.split('.');
    var obj = global;
    while (parts.length > 1) {
        var name = parts.shift();
        if (obj.hasOwnProperty(name) && isPresent(obj[name])) {
            obj = obj[name];
        }
        else {
            obj = obj[name] = {};
        }
    }
    if (obj === undefined || obj === null) {
        obj = {};
    }
    obj[parts.shift()] = value;
}
exports.setValueOnPath = setValueOnPath;
var _symbolIterator = null;
function getSymbolIterator() {
    if (isBlank(_symbolIterator)) {
        if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
            _symbolIterator = Symbol.iterator;
        }
        else {
            // es6-shim specific logic
            var keys = Object.getOwnPropertyNames(Map.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    Map.prototype[key] === Map.prototype['entries']) {
                    _symbolIterator = key;
                }
            }
        }
    }
    return _symbolIterator;
}
exports.getSymbolIterator = getSymbolIterator;
function evalExpression(sourceUrl, expr, declarations, vars) {
    var fnBody = declarations + "\nreturn " + expr + "\n//# sourceURL=" + sourceUrl;
    var fnArgNames = [];
    var fnArgValues = [];
    for (var argName in vars) {
        fnArgNames.push(argName);
        fnArgValues.push(vars[argName]);
    }
    return new (Function.bind.apply(Function, [void 0].concat(fnArgNames.concat(fnBody))))().apply(void 0, fnArgValues);
}
exports.evalExpression = evalExpression;
function isPrimitive(obj) {
    return !isJsObject(obj);
}
exports.isPrimitive = isPrimitive;
function hasConstructor(value, type) {
    return value.constructor === type;
}
exports.hasConstructor = hasConstructor;
function bitWiseOr(values) {
    return values.reduce(function (a, b) { return a | b; });
}
exports.bitWiseOr = bitWiseOr;
function bitWiseAnd(values) {
    return values.reduce(function (a, b) { return a & b; });
}
exports.bitWiseAnd = bitWiseAnd;
function escape(s) {
    return _global.encodeURI(s);
}
exports.escape = escape;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtQlJKZXIxSjkudG1wL2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUF3QkEsSUFBSSxXQUE4QixDQUFDO0FBQ25DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDbEMsRUFBRSxDQUFDLENBQUMsT0FBTyxpQkFBaUIsS0FBSyxXQUFXLElBQUksSUFBSSxZQUFZLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUNsRix5RUFBeUU7UUFDekUsV0FBVyxHQUFRLElBQUksQ0FBQztJQUMxQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixXQUFXLEdBQVEsTUFBTSxDQUFDO0lBQzVCLENBQUM7QUFDSCxDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDTixXQUFXLEdBQVEsTUFBTSxDQUFDO0FBQzVCLENBQUM7QUFFRCwyQkFBa0MsRUFBWTtJQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFGZSx5QkFBaUIsb0JBRWhDLENBQUE7QUFFWSxlQUFPLEdBQUcsS0FBSyxDQUFDO0FBRTdCLGtFQUFrRTtBQUNsRSw0Q0FBNEM7QUFDNUMsSUFBSSxPQUFPLEdBQXNCLFdBQVc7QUFFekIsY0FBTSxXQUZvQjtBQUlsQyxZQUFJLEdBQUcsUUFBUSxDQUFDO0FBZTNCLGlDQUF3QyxJQUFVO0lBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBQ0QsTUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDO0FBQ3JCLENBQUM7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QUFVLGFBRXpCLENBQUE7QUFFRCxnQkFBdUIsQ0FBUztJQUM5QixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBRmUsY0FBTSxTQUVyQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBCcm93c2VyTm9kZUdsb2JhbCB7XG4gIE9iamVjdDogdHlwZW9mIE9iamVjdDtcbiAgQXJyYXk6IHR5cGVvZiBBcnJheTtcbiAgTWFwOiB0eXBlb2YgTWFwO1xuICBTZXQ6IHR5cGVvZiBTZXQ7XG4gIERhdGU6IERhdGVDb25zdHJ1Y3RvcjtcbiAgUmVnRXhwOiBSZWdFeHBDb25zdHJ1Y3RvcjtcbiAgSlNPTjogdHlwZW9mIEpTT047XG4gIE1hdGg6IGFueTsgIC8vIHR5cGVvZiBNYXRoO1xuICBhc3NlcnQoY29uZGl0aW9uOiBhbnkpOiB2b2lkO1xuICBSZWZsZWN0OiBhbnk7XG4gIGdldEFuZ3VsYXJUZXN0YWJpbGl0eTogRnVuY3Rpb247XG4gIGdldEFsbEFuZ3VsYXJUZXN0YWJpbGl0aWVzOiBGdW5jdGlvbjtcbiAgZ2V0QWxsQW5ndWxhclJvb3RFbGVtZW50czogRnVuY3Rpb247XG4gIGZyYW1ld29ya1N0YWJpbGl6ZXJzOiBBcnJheTxGdW5jdGlvbj47XG4gIHNldFRpbWVvdXQ6IEZ1bmN0aW9uO1xuICBjbGVhclRpbWVvdXQ6IEZ1bmN0aW9uO1xuICBzZXRJbnRlcnZhbDogRnVuY3Rpb247XG4gIGNsZWFySW50ZXJ2YWw6IEZ1bmN0aW9uO1xuICBlbmNvZGVVUkk6IEZ1bmN0aW9uO1xufVxuXG4vLyBUT0RPKGp0ZXBsaXR6NjAyKTogTG9hZCBXb3JrZXJHbG9iYWxTY29wZSBmcm9tIGxpYi53ZWJ3b3JrZXIuZC50cyBmaWxlICMzNDkyXG5kZWNsYXJlIHZhciBXb3JrZXJHbG9iYWxTY29wZTtcbnZhciBnbG9iYWxTY29wZTogQnJvd3Nlck5vZGVHbG9iYWw7XG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgaWYgKHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKSB7XG4gICAgLy8gVE9ETzogUmVwbGFjZSBhbnkgd2l0aCBXb3JrZXJHbG9iYWxTY29wZSBmcm9tIGxpYi53ZWJ3b3JrZXIuZC50cyAjMzQ5MlxuICAgIGdsb2JhbFNjb3BlID0gPGFueT5zZWxmO1xuICB9IGVsc2Uge1xuICAgIGdsb2JhbFNjb3BlID0gPGFueT5nbG9iYWw7XG4gIH1cbn0gZWxzZSB7XG4gIGdsb2JhbFNjb3BlID0gPGFueT53aW5kb3c7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZU1pY3JvVGFzayhmbjogRnVuY3Rpb24pIHtcbiAgWm9uZS5jdXJyZW50LnNjaGVkdWxlTWljcm9UYXNrKCdzY2hlZHVsZU1pY3JvdGFzaycsIGZuKTtcbn1cblxuZXhwb3J0IGNvbnN0IElTX0RBUlQgPSBmYWxzZTtcblxuLy8gTmVlZCB0byBkZWNsYXJlIGEgbmV3IHZhcmlhYmxlIGZvciBnbG9iYWwgaGVyZSBzaW5jZSBUeXBlU2NyaXB0XG4vLyBleHBvcnRzIHRoZSBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgc3ltYm9sLlxudmFyIF9nbG9iYWw6IEJyb3dzZXJOb2RlR2xvYmFsID0gZ2xvYmFsU2NvcGU7XG5cbmV4cG9ydCB7X2dsb2JhbCBhcyBnbG9iYWx9O1xuXG5leHBvcnQgdmFyIFR5cGUgPSBGdW5jdGlvbjtcblxuLyoqXG4gKiBSdW50aW1lIHJlcHJlc2VudGF0aW9uIGEgdHlwZSB0aGF0IGEgQ29tcG9uZW50IG9yIG90aGVyIG9iamVjdCBpcyBpbnN0YW5jZXMgb2YuXG4gKlxuICogQW4gZXhhbXBsZSBvZiBhIGBUeXBlYCBpcyBgTXlDdXN0b21Db21wb25lbnRgIGNsYXNzLCB3aGljaCBpbiBKYXZhU2NyaXB0IGlzIGJlIHJlcHJlc2VudGVkIGJ5XG4gKiB0aGUgYE15Q3VzdG9tQ29tcG9uZW50YCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUeXBlIGV4dGVuZHMgRnVuY3Rpb24ge31cblxuLyoqXG4gKiBSdW50aW1lIHJlcHJlc2VudGF0aW9uIG9mIGEgdHlwZSB0aGF0IGlzIGNvbnN0cnVjdGFibGUgKG5vbi1hYnN0cmFjdCkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29uY3JldGVUeXBlIGV4dGVuZHMgVHlwZSB7IG5ldyAoLi4uYXJncyk6IGFueTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHlwZU5hbWVGb3JEZWJ1Z2dpbmcodHlwZTogVHlwZSk6IHN0cmluZyB7XG4gIGlmICh0eXBlWyduYW1lJ10pIHtcbiAgICByZXR1cm4gdHlwZVsnbmFtZSddO1xuICB9XG4gIHJldHVybiB0eXBlb2YgdHlwZTtcbn1cblxuXG5leHBvcnQgdmFyIE1hdGggPSBfZ2xvYmFsLk1hdGg7XG5leHBvcnQgdmFyIERhdGUgPSBfZ2xvYmFsLkRhdGU7XG5cbnZhciBfZGV2TW9kZTogYm9vbGVhbiA9IHRydWU7XG52YXIgX21vZGVMb2NrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2tNb2RlKCkge1xuICBfbW9kZUxvY2tlZCA9IHRydWU7XG59XG5cbi8qKlxuICogRGlzYWJsZSBBbmd1bGFyJ3MgZGV2ZWxvcG1lbnQgbW9kZSwgd2hpY2ggdHVybnMgb2ZmIGFzc2VydGlvbnMgYW5kIG90aGVyXG4gKiBjaGVja3Mgd2l0aGluIHRoZSBmcmFtZXdvcmsuXG4gKlxuICogT25lIGltcG9ydGFudCBhc3NlcnRpb24gdGhpcyBkaXNhYmxlcyB2ZXJpZmllcyB0aGF0IGEgY2hhbmdlIGRldGVjdGlvbiBwYXNzXG4gKiBkb2VzIG5vdCByZXN1bHQgaW4gYWRkaXRpb25hbCBjaGFuZ2VzIHRvIGFueSBiaW5kaW5ncyAoYWxzbyBrbm93biBhc1xuICogdW5pZGlyZWN0aW9uYWwgZGF0YSBmbG93KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZVByb2RNb2RlKCkge1xuICBpZiAoX21vZGVMb2NrZWQpIHtcbiAgICAvLyBDYW5ub3QgdXNlIEJhc2VFeGNlcHRpb24gYXMgdGhhdCBlbmRzIHVwIGltcG9ydGluZyBmcm9tIGZhY2FkZS9sYW5nLlxuICAgIHRocm93ICdDYW5ub3QgZW5hYmxlIHByb2QgbW9kZSBhZnRlciBwbGF0Zm9ybSBzZXR1cC4nO1xuICB9XG4gIF9kZXZNb2RlID0gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRpb25zRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgcmV0dXJuIF9kZXZNb2RlO1xufVxuXG4vLyBUT0RPOiByZW1vdmUgY2FsbHMgdG8gYXNzZXJ0IGluIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcbi8vIE5vdGU6IENhbid0IGp1c3QgZXhwb3J0IHRoaXMgYW5kIGltcG9ydCBpbiBpbiBvdGhlciBmaWxlc1xuLy8gYXMgYGFzc2VydGAgaXMgYSByZXNlcnZlZCBrZXl3b3JkIGluIERhcnRcbl9nbG9iYWwuYXNzZXJ0ID0gZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbikge1xuICAvLyBUT0RPOiB0byBiZSBmaXhlZCBwcm9wZXJseSB2aWEgIzI4MzAsIG5vb3AgZm9yIG5vd1xufTtcblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBuZWVkZWQgb25seSB0byBwcm9wZXJseSBzdXBwb3J0IERhcnQncyBjb25zdCBleHByZXNzaW9uc1xuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3RzMmRhcnQvcHVsbC8xNTEgZm9yIG1vcmUgaW5mb1xuZXhwb3J0IGZ1bmN0aW9uIENPTlNUX0VYUFI8VD4oZXhwcjogVCk6IFQge1xuICByZXR1cm4gZXhwcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENPTlNUKCk6IENsYXNzRGVjb3JhdG9yICYgUHJvcGVydHlEZWNvcmF0b3Ige1xuICByZXR1cm4gKHRhcmdldCkgPT4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcmVzZW50KG9iajogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBvYmogIT09IHVuZGVmaW5lZCAmJiBvYmogIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JsYW5rKG9iajogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4ob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwiYm9vbGVhblwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwibnVtYmVyXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyhvYmo6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVHlwZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gaXNGdW5jdGlvbihvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdNYXAob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgKDxhbnk+X2dsb2JhbCkuUHJvbWlzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZShvYmopOiBib29sZWFuIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKG9iai52YWx1ZU9mKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkodG9rZW4pOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIGlmICh0b2tlbiA9PT0gdW5kZWZpbmVkIHx8IHRva2VuID09PSBudWxsKSB7XG4gICAgcmV0dXJuICcnICsgdG9rZW47XG4gIH1cblxuICBpZiAodG9rZW4ubmFtZSkge1xuICAgIHJldHVybiB0b2tlbi5uYW1lO1xuICB9XG4gIGlmICh0b2tlbi5vdmVycmlkZGVuTmFtZSkge1xuICAgIHJldHVybiB0b2tlbi5vdmVycmlkZGVuTmFtZTtcbiAgfVxuXG4gIHZhciByZXMgPSB0b2tlbi50b1N0cmluZygpO1xuICB2YXIgbmV3TGluZUluZGV4ID0gcmVzLmluZGV4T2YoXCJcXG5cIik7XG4gIHJldHVybiAobmV3TGluZUluZGV4ID09PSAtMSkgPyByZXMgOiByZXMuc3Vic3RyaW5nKDAsIG5ld0xpbmVJbmRleCk7XG59XG5cbi8vIHNlcmlhbGl6ZSAvIGRlc2VyaWFsaXplIGVudW0gZXhpc3Qgb25seSBmb3IgY29uc2lzdGVuY3kgd2l0aCBkYXJ0IEFQSVxuLy8gZW51bXMgaW4gdHlwZXNjcmlwdCBkb24ndCBuZWVkIHRvIGJlIHNlcmlhbGl6ZWRcblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUVudW0odmFsKTogbnVtYmVyIHtcbiAgcmV0dXJuIHZhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplRW51bSh2YWwsIHZhbHVlczogTWFwPG51bWJlciwgYW55Pik6IGFueSB7XG4gIHJldHVybiB2YWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRW51bVRva2VuKGVudW1WYWx1ZSwgdmFsKTogc3RyaW5nIHtcbiAgcmV0dXJuIGVudW1WYWx1ZVt2YWxdO1xufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nV3JhcHBlciB7XG4gIHN0YXRpYyBmcm9tQ2hhckNvZGUoY29kZTogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7IH1cblxuICBzdGF0aWMgY2hhckNvZGVBdChzOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBudW1iZXIgeyByZXR1cm4gcy5jaGFyQ29kZUF0KGluZGV4KTsgfVxuXG4gIHN0YXRpYyBzcGxpdChzOiBzdHJpbmcsIHJlZ0V4cDogUmVnRXhwKTogc3RyaW5nW10geyByZXR1cm4gcy5zcGxpdChyZWdFeHApOyB9XG5cbiAgc3RhdGljIGVxdWFscyhzOiBzdHJpbmcsIHMyOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHMgPT09IHMyOyB9XG5cbiAgc3RhdGljIHN0cmlwTGVmdChzOiBzdHJpbmcsIGNoYXJWYWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHMgJiYgcy5sZW5ndGgpIHtcbiAgICAgIHZhciBwb3MgPSAwO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzW2ldICE9IGNoYXJWYWwpIGJyZWFrO1xuICAgICAgICBwb3MrKztcbiAgICAgIH1cbiAgICAgIHMgPSBzLnN1YnN0cmluZyhwb3MpO1xuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfVxuXG4gIHN0YXRpYyBzdHJpcFJpZ2h0KHM6IHN0cmluZywgY2hhclZhbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAocyAmJiBzLmxlbmd0aCkge1xuICAgICAgdmFyIHBvcyA9IHMubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKHNbaV0gIT0gY2hhclZhbCkgYnJlYWs7XG4gICAgICAgIHBvcy0tO1xuICAgICAgfVxuICAgICAgcyA9IHMuc3Vic3RyaW5nKDAsIHBvcyk7XG4gICAgfVxuICAgIHJldHVybiBzO1xuICB9XG5cbiAgc3RhdGljIHJlcGxhY2Uoczogc3RyaW5nLCBmcm9tOiBzdHJpbmcsIHJlcGxhY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHMucmVwbGFjZShmcm9tLCByZXBsYWNlKTtcbiAgfVxuXG4gIHN0YXRpYyByZXBsYWNlQWxsKHM6IHN0cmluZywgZnJvbTogUmVnRXhwLCByZXBsYWNlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzLnJlcGxhY2UoZnJvbSwgcmVwbGFjZSk7XG4gIH1cblxuICBzdGF0aWMgc2xpY2U8VD4oczogc3RyaW5nLCBmcm9tOiBudW1iZXIgPSAwLCB0bzogbnVtYmVyID0gbnVsbCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHMuc2xpY2UoZnJvbSwgdG8gPT09IG51bGwgPyB1bmRlZmluZWQgOiB0byk7XG4gIH1cblxuICBzdGF0aWMgcmVwbGFjZUFsbE1hcHBlZChzOiBzdHJpbmcsIGZyb206IFJlZ0V4cCwgY2I6IEZ1bmN0aW9uKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKGZyb20sIGZ1bmN0aW9uKC4uLm1hdGNoZXMpIHtcbiAgICAgIC8vIFJlbW92ZSBvZmZzZXQgJiBzdHJpbmcgZnJvbSB0aGUgcmVzdWx0IGFycmF5XG4gICAgICBtYXRjaGVzLnNwbGljZSgtMiwgMik7XG4gICAgICAvLyBUaGUgY2FsbGJhY2sgcmVjZWl2ZXMgbWF0Y2gsIHAxLCAuLi4sIHBuXG4gICAgICByZXR1cm4gY2IobWF0Y2hlcyk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgY29udGFpbnMoczogc3RyaW5nLCBzdWJzdHI6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gcy5pbmRleE9mKHN1YnN0cikgIT0gLTE7IH1cblxuICBzdGF0aWMgY29tcGFyZShhOiBzdHJpbmcsIGI6IHN0cmluZyk6IG51bWJlciB7XG4gICAgaWYgKGEgPCBiKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSBlbHNlIGlmIChhID4gYikge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nSm9pbmVyIHtcbiAgY29uc3RydWN0b3IocHVibGljIHBhcnRzID0gW10pIHt9XG5cbiAgYWRkKHBhcnQ6IHN0cmluZyk6IHZvaWQgeyB0aGlzLnBhcnRzLnB1c2gocGFydCk7IH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5wYXJ0cy5qb2luKFwiXCIpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBOdW1iZXJQYXJzZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG1lc3NhZ2U6IHN0cmluZykgeyBzdXBlcigpOyB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubWVzc2FnZTsgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBOdW1iZXJXcmFwcGVyIHtcbiAgc3RhdGljIHRvRml4ZWQobjogbnVtYmVyLCBmcmFjdGlvbkRpZ2l0czogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIG4udG9GaXhlZChmcmFjdGlvbkRpZ2l0cyk7IH1cblxuICBzdGF0aWMgZXF1YWwoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBib29sZWFuIHsgcmV0dXJuIGEgPT09IGI7IH1cblxuICBzdGF0aWMgcGFyc2VJbnRBdXRvUmFkaXgodGV4dDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICB2YXIgcmVzdWx0OiBudW1iZXIgPSBwYXJzZUludCh0ZXh0KTtcbiAgICBpZiAoaXNOYU4ocmVzdWx0KSkge1xuICAgICAgdGhyb3cgbmV3IE51bWJlclBhcnNlRXJyb3IoXCJJbnZhbGlkIGludGVnZXIgbGl0ZXJhbCB3aGVuIHBhcnNpbmcgXCIgKyB0ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUludCh0ZXh0OiBzdHJpbmcsIHJhZGl4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChyYWRpeCA9PSAxMCkge1xuICAgICAgaWYgKC9eKFxcLXxcXCspP1swLTldKyQvLnRlc3QodGV4dCkpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRleHQsIHJhZGl4KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJhZGl4ID09IDE2KSB7XG4gICAgICBpZiAoL14oXFwtfFxcKyk/WzAtOUFCQ0RFRmFiY2RlZl0rJC8udGVzdCh0ZXh0KSkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGV4dCwgcmFkaXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcmVzdWx0OiBudW1iZXIgPSBwYXJzZUludCh0ZXh0LCByYWRpeCk7XG4gICAgICBpZiAoIWlzTmFOKHJlc3VsdCkpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IE51bWJlclBhcnNlRXJyb3IoXCJJbnZhbGlkIGludGVnZXIgbGl0ZXJhbCB3aGVuIHBhcnNpbmcgXCIgKyB0ZXh0ICsgXCIgaW4gYmFzZSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkaXgpO1xuICB9XG5cbiAgLy8gVE9ETzogTmFOIGlzIGEgdmFsaWQgbGl0ZXJhbCBidXQgaXMgcmV0dXJuZWQgYnkgcGFyc2VGbG9hdCB0byBpbmRpY2F0ZSBhbiBlcnJvci5cbiAgc3RhdGljIHBhcnNlRmxvYXQodGV4dDogc3RyaW5nKTogbnVtYmVyIHsgcmV0dXJuIHBhcnNlRmxvYXQodGV4dCk7IH1cblxuICBzdGF0aWMgZ2V0IE5hTigpOiBudW1iZXIgeyByZXR1cm4gTmFOOyB9XG5cbiAgc3RhdGljIGlzTmFOKHZhbHVlOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIGlzTmFOKHZhbHVlKTsgfVxuXG4gIHN0YXRpYyBpc0ludGVnZXIodmFsdWU6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7IH1cbn1cblxuZXhwb3J0IHZhciBSZWdFeHAgPSBfZ2xvYmFsLlJlZ0V4cDtcblxuZXhwb3J0IGNsYXNzIFJlZ0V4cFdyYXBwZXIge1xuICBzdGF0aWMgY3JlYXRlKHJlZ0V4cFN0cjogc3RyaW5nLCBmbGFnczogc3RyaW5nID0gJycpOiBSZWdFeHAge1xuICAgIGZsYWdzID0gZmxhZ3MucmVwbGFjZSgvZy9nLCAnJyk7XG4gICAgcmV0dXJuIG5ldyBfZ2xvYmFsLlJlZ0V4cChyZWdFeHBTdHIsIGZsYWdzICsgJ2cnKTtcbiAgfVxuICBzdGF0aWMgZmlyc3RNYXRjaChyZWdFeHA6IFJlZ0V4cCwgaW5wdXQ6IHN0cmluZyk6IFJlZ0V4cEV4ZWNBcnJheSB7XG4gICAgLy8gUmVzZXQgbXVsdGltYXRjaCByZWdleCBzdGF0ZVxuICAgIHJlZ0V4cC5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiByZWdFeHAuZXhlYyhpbnB1dCk7XG4gIH1cbiAgc3RhdGljIHRlc3QocmVnRXhwOiBSZWdFeHAsIGlucHV0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZWdFeHAubGFzdEluZGV4ID0gMDtcbiAgICByZXR1cm4gcmVnRXhwLnRlc3QoaW5wdXQpO1xuICB9XG4gIHN0YXRpYyBtYXRjaGVyKHJlZ0V4cDogUmVnRXhwLCBpbnB1dDogc3RyaW5nKToge1xuICAgIHJlOiBSZWdFeHA7XG4gICAgaW5wdXQ6IHN0cmluZ1xuICB9XG4gIHtcbiAgICAvLyBSZXNldCByZWdleCBzdGF0ZSBmb3IgdGhlIGNhc2VcbiAgICAvLyBzb21lb25lIGRpZCBub3QgbG9vcCBvdmVyIGFsbCBtYXRjaGVzXG4gICAgLy8gbGFzdCB0aW1lLlxuICAgIHJlZ0V4cC5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiB7cmU6IHJlZ0V4cCwgaW5wdXQ6IGlucHV0fTtcbiAgfVxuICBzdGF0aWMgcmVwbGFjZUFsbChyZWdFeHA6IFJlZ0V4cCwgaW5wdXQ6IHN0cmluZywgcmVwbGFjZTogRnVuY3Rpb24pOiBzdHJpbmcge1xuICAgIGxldCBjID0gcmVnRXhwLmV4ZWMoaW5wdXQpO1xuICAgIGxldCByZXMgPSAnJztcbiAgICByZWdFeHAubGFzdEluZGV4ID0gMDtcbiAgICBsZXQgcHJldiA9IDA7XG4gICAgd2hpbGUgKGMpIHtcbiAgICAgIHJlcyArPSBpbnB1dC5zdWJzdHJpbmcocHJldiwgYy5pbmRleCk7XG4gICAgICByZXMgKz0gcmVwbGFjZShjKTtcbiAgICAgIHByZXYgPSBjLmluZGV4ICsgY1swXS5sZW5ndGg7XG4gICAgICByZWdFeHAubGFzdEluZGV4ID0gcHJldjtcbiAgICAgIGMgPSByZWdFeHAuZXhlYyhpbnB1dCk7XG4gICAgfVxuICAgIHJlcyArPSBpbnB1dC5zdWJzdHJpbmcocHJldik7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVnRXhwTWF0Y2hlcldyYXBwZXIge1xuICBzdGF0aWMgbmV4dChtYXRjaGVyOiB7XG4gICAgcmU6IFJlZ0V4cDtcbiAgICBpbnB1dDogc3RyaW5nXG4gIH0pOiBSZWdFeHBFeGVjQXJyYXkge1xuICAgIHJldHVybiBtYXRjaGVyLnJlLmV4ZWMobWF0Y2hlci5pbnB1dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uV3JhcHBlciB7XG4gIHN0YXRpYyBhcHBseShmbjogRnVuY3Rpb24sIHBvc0FyZ3M6IGFueSk6IGFueSB7IHJldHVybiBmbi5hcHBseShudWxsLCBwb3NBcmdzKTsgfVxufVxuXG4vLyBKUyBoYXMgTmFOICE9PSBOYU5cbmV4cG9ydCBmdW5jdGlvbiBsb29zZUlkZW50aWNhbChhLCBiKTogYm9vbGVhbiB7XG4gIHJldHVybiBhID09PSBiIHx8IHR5cGVvZiBhID09PSBcIm51bWJlclwiICYmIHR5cGVvZiBiID09PSBcIm51bWJlclwiICYmIGlzTmFOKGEpICYmIGlzTmFOKGIpO1xufVxuXG4vLyBKUyBjb25zaWRlcnMgTmFOIGlzIHRoZSBzYW1lIGFzIE5hTiBmb3IgbWFwIEtleSAod2hpbGUgTmFOICE9PSBOYU4gb3RoZXJ3aXNlKVxuLy8gc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcFxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hcEtleTxUPih2YWx1ZTogVCk6IFQge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVCbGFuayhvYmo6IE9iamVjdCk6IGFueSB7XG4gIHJldHVybiBpc0JsYW5rKG9iaikgPyBudWxsIDogb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQm9vbChvYmo6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgcmV0dXJuIGlzQmxhbmsob2JqKSA/IGZhbHNlIDogb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNKc09iamVjdChvOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIG8gIT09IG51bGwgJiYgKHR5cGVvZiBvID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIG8gPT09IFwib2JqZWN0XCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnQob2JqOiBFcnJvciB8IE9iamVjdCkge1xuICBjb25zb2xlLmxvZyhvYmopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FybihvYmo6IEVycm9yIHwgT2JqZWN0KSB7XG4gIGNvbnNvbGUud2FybihvYmopO1xufVxuXG4vLyBDYW4ndCBiZSBhbGwgdXBwZXJjYXNlIGFzIG91ciB0cmFuc3BpbGVyIHdvdWxkIHRoaW5rIGl0IGlzIGEgc3BlY2lhbCBkaXJlY3RpdmUuLi5cbmV4cG9ydCBjbGFzcyBKc29uIHtcbiAgc3RhdGljIHBhcnNlKHM6IHN0cmluZyk6IE9iamVjdCB7IHJldHVybiBfZ2xvYmFsLkpTT04ucGFyc2Uocyk7IH1cbiAgc3RhdGljIHN0cmluZ2lmeShkYXRhOiBPYmplY3QpOiBzdHJpbmcge1xuICAgIC8vIERhcnQgZG9lc24ndCB0YWtlIDMgYXJndW1lbnRzXG4gICAgcmV0dXJuIF9nbG9iYWwuSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERhdGVXcmFwcGVyIHtcbiAgc3RhdGljIGNyZWF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIgPSAxLCBkYXk6IG51bWJlciA9IDEsIGhvdXI6IG51bWJlciA9IDAsXG4gICAgICAgICAgICAgICAgbWludXRlczogbnVtYmVyID0gMCwgc2Vjb25kczogbnVtYmVyID0gMCwgbWlsbGlzZWNvbmRzOiBudW1iZXIgPSAwKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5LCBob3VyLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMpO1xuICB9XG4gIHN0YXRpYyBmcm9tSVNPU3RyaW5nKHN0cjogc3RyaW5nKTogRGF0ZSB7IHJldHVybiBuZXcgRGF0ZShzdHIpOyB9XG4gIHN0YXRpYyBmcm9tTWlsbGlzKG1zOiBudW1iZXIpOiBEYXRlIHsgcmV0dXJuIG5ldyBEYXRlKG1zKTsgfVxuICBzdGF0aWMgdG9NaWxsaXMoZGF0ZTogRGF0ZSk6IG51bWJlciB7IHJldHVybiBkYXRlLmdldFRpbWUoKTsgfVxuICBzdGF0aWMgbm93KCk6IERhdGUgeyByZXR1cm4gbmV3IERhdGUoKTsgfVxuICBzdGF0aWMgdG9Kc29uKGRhdGU6IERhdGUpOiBzdHJpbmcgeyByZXR1cm4gZGF0ZS50b0pTT04oKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFsdWVPblBhdGgoZ2xvYmFsOiBhbnksIHBhdGg6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICB2YXIgcGFydHMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gIHZhciBvYmo6IGFueSA9IGdsb2JhbDtcbiAgd2hpbGUgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICB2YXIgbmFtZSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiBpc1ByZXNlbnQob2JqW25hbWVdKSkge1xuICAgICAgb2JqID0gb2JqW25hbWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmogPSBvYmpbbmFtZV0gPSB7fTtcbiAgICB9XG4gIH1cbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHt9O1xuICB9XG4gIG9ialtwYXJ0cy5zaGlmdCgpXSA9IHZhbHVlO1xufVxuXG4vLyBXaGVuIFN5bWJvbC5pdGVyYXRvciBkb2Vzbid0IGV4aXN0LCByZXRyaWV2ZXMgdGhlIGtleSB1c2VkIGluIGVzNi1zaGltXG5kZWNsYXJlIHZhciBTeW1ib2w7XG52YXIgX3N5bWJvbEl0ZXJhdG9yID0gbnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBnZXRTeW1ib2xJdGVyYXRvcigpOiBzdHJpbmcgfCBzeW1ib2wge1xuICBpZiAoaXNCbGFuayhfc3ltYm9sSXRlcmF0b3IpKSB7XG4gICAgaWYgKGlzUHJlc2VudCgoPGFueT5nbG9iYWxTY29wZSkuU3ltYm9sKSAmJiBpc1ByZXNlbnQoU3ltYm9sLml0ZXJhdG9yKSkge1xuICAgICAgX3N5bWJvbEl0ZXJhdG9yID0gU3ltYm9sLml0ZXJhdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlczYtc2hpbSBzcGVjaWZpYyBsb2dpY1xuICAgICAgdmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhNYXAucHJvdG90eXBlKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgaWYgKGtleSAhPT0gJ2VudHJpZXMnICYmIGtleSAhPT0gJ3NpemUnICYmXG4gICAgICAgICAgICBNYXAucHJvdG90eXBlW2tleV0gPT09IE1hcC5wcm90b3R5cGVbJ2VudHJpZXMnXSkge1xuICAgICAgICAgIF9zeW1ib2xJdGVyYXRvciA9IGtleTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gX3N5bWJvbEl0ZXJhdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXZhbEV4cHJlc3Npb24oc291cmNlVXJsOiBzdHJpbmcsIGV4cHI6IHN0cmluZywgZGVjbGFyYXRpb25zOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyczoge1trZXk6IHN0cmluZ106IGFueX0pOiBhbnkge1xuICB2YXIgZm5Cb2R5ID0gYCR7ZGVjbGFyYXRpb25zfVxcbnJldHVybiAke2V4cHJ9XFxuLy8jIHNvdXJjZVVSTD0ke3NvdXJjZVVybH1gO1xuICB2YXIgZm5BcmdOYW1lcyA9IFtdO1xuICB2YXIgZm5BcmdWYWx1ZXMgPSBbXTtcbiAgZm9yICh2YXIgYXJnTmFtZSBpbiB2YXJzKSB7XG4gICAgZm5BcmdOYW1lcy5wdXNoKGFyZ05hbWUpO1xuICAgIGZuQXJnVmFsdWVzLnB1c2godmFyc1thcmdOYW1lXSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBGdW5jdGlvbiguLi5mbkFyZ05hbWVzLmNvbmNhdChmbkJvZHkpKSguLi5mbkFyZ1ZhbHVlcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gIWlzSnNPYmplY3Qob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NvbnN0cnVjdG9yKHZhbHVlOiBPYmplY3QsIHR5cGU6IFR5cGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yID09PSB0eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYml0V2lzZU9yKHZhbHVlczogbnVtYmVyW10pOiBudW1iZXIge1xuICByZXR1cm4gdmFsdWVzLnJlZHVjZSgoYSwgYikgPT4geyByZXR1cm4gYSB8IGI7IH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYml0V2lzZUFuZCh2YWx1ZXM6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgcmV0dXJuIHZhbHVlcy5yZWR1Y2UoKGEsIGIpID0+IHsgcmV0dXJuIGEgJiBiOyB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZShzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gX2dsb2JhbC5lbmNvZGVVUkkocyk7XG59XG4iXX0=