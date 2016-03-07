'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var decorators_1 = require('angular2/src/core/di/decorators');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var collection_1 = require('angular2/src/facade/collection');
var lexer_1 = require('./lexer');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var ast_1 = require('./ast');
var _implicitReceiver = new ast_1.ImplicitReceiver();
// TODO(tbosch): Cannot make this const/final right now because of the transpiler...
var INTERPOLATION_REGEXP = /\{\{([\s\S]*?)\}\}/g;
var ParseException = (function (_super) {
    __extends(ParseException, _super);
    function ParseException(message, input, errLocation, ctxLocation) {
        _super.call(this, "Parser Error: " + message + " " + errLocation + " [" + input + "] in " + ctxLocation);
    }
    return ParseException;
})(exceptions_1.BaseException);
var Parser = (function () {
    function Parser(/** @internal */ _lexer, providedReflector) {
        if (providedReflector === void 0) { providedReflector = null; }
        this._lexer = _lexer;
        this._reflector = lang_1.isPresent(providedReflector) ? providedReflector : reflection_1.reflector;
    }
    Parser.prototype.parseAction = function (input, location) {
        this._checkNoInterpolation(input, location);
        var tokens = this._lexer.tokenize(input);
        var ast = new _ParseAST(input, location, tokens, this._reflector, true).parseChain();
        return new ast_1.ASTWithSource(ast, input, location);
    };
    Parser.prototype.parseBinding = function (input, location) {
        var ast = this._parseBindingAst(input, location);
        return new ast_1.ASTWithSource(ast, input, location);
    };
    Parser.prototype.parseSimpleBinding = function (input, location) {
        var ast = this._parseBindingAst(input, location);
        if (!SimpleExpressionChecker.check(ast)) {
            throw new ParseException('Host binding expression can only contain field access and constants', input, location);
        }
        return new ast_1.ASTWithSource(ast, input, location);
    };
    Parser.prototype._parseBindingAst = function (input, location) {
        // Quotes expressions use 3rd-party expression language. We don't want to use
        // our lexer or parser for that, so we check for that ahead of time.
        var quote = this._parseQuote(input, location);
        if (lang_1.isPresent(quote)) {
            return quote;
        }
        this._checkNoInterpolation(input, location);
        var tokens = this._lexer.tokenize(input);
        return new _ParseAST(input, location, tokens, this._reflector, false).parseChain();
    };
    Parser.prototype._parseQuote = function (input, location) {
        if (lang_1.isBlank(input))
            return null;
        var prefixSeparatorIndex = input.indexOf(':');
        if (prefixSeparatorIndex == -1)
            return null;
        var prefix = input.substring(0, prefixSeparatorIndex).trim();
        if (!lexer_1.isIdentifier(prefix))
            return null;
        var uninterpretedExpression = input.substring(prefixSeparatorIndex + 1);
        return new ast_1.Quote(prefix, uninterpretedExpression, location);
    };
    Parser.prototype.parseTemplateBindings = function (input, location) {
        var tokens = this._lexer.tokenize(input);
        return new _ParseAST(input, location, tokens, this._reflector, false).parseTemplateBindings();
    };
    Parser.prototype.parseInterpolation = function (input, location) {
        var parts = lang_1.StringWrapper.split(input, INTERPOLATION_REGEXP);
        if (parts.length <= 1) {
            return null;
        }
        var strings = [];
        var expressions = [];
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (i % 2 === 0) {
                // fixed string
                strings.push(part);
            }
            else if (part.trim().length > 0) {
                var tokens = this._lexer.tokenize(part);
                var ast = new _ParseAST(input, location, tokens, this._reflector, false).parseChain();
                expressions.push(ast);
            }
            else {
                throw new ParseException('Blank expressions are not allowed in interpolated strings', input, "at column " + this._findInterpolationErrorColumn(parts, i) + " in", location);
            }
        }
        return new ast_1.ASTWithSource(new ast_1.Interpolation(strings, expressions), input, location);
    };
    Parser.prototype.wrapLiteralPrimitive = function (input, location) {
        return new ast_1.ASTWithSource(new ast_1.LiteralPrimitive(input), input, location);
    };
    Parser.prototype._checkNoInterpolation = function (input, location) {
        var parts = lang_1.StringWrapper.split(input, INTERPOLATION_REGEXP);
        if (parts.length > 1) {
            throw new ParseException('Got interpolation ({{}}) where expression was expected', input, "at column " + this._findInterpolationErrorColumn(parts, 1) + " in", location);
        }
    };
    Parser.prototype._findInterpolationErrorColumn = function (parts, partInErrIdx) {
        var errLocation = '';
        for (var j = 0; j < partInErrIdx; j++) {
            errLocation += j % 2 === 0 ? parts[j] : "{{" + parts[j] + "}}";
        }
        return errLocation.length;
    };
    Parser = __decorate([
        decorators_1.Injectable(), 
        __metadata('design:paramtypes', [lexer_1.Lexer, reflection_1.Reflector])
    ], Parser);
    return Parser;
})();
exports.Parser = Parser;
var _ParseAST = (function () {
    function _ParseAST(input, location, tokens, reflector, parseAction) {
        this.input = input;
        this.location = location;
        this.tokens = tokens;
        this.reflector = reflector;
        this.parseAction = parseAction;
        this.index = 0;
    }
    _ParseAST.prototype.peek = function (offset) {
        var i = this.index + offset;
        return i < this.tokens.length ? this.tokens[i] : lexer_1.EOF;
    };
    Object.defineProperty(_ParseAST.prototype, "next", {
        get: function () { return this.peek(0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_ParseAST.prototype, "inputIndex", {
        get: function () {
            return (this.index < this.tokens.length) ? this.next.index : this.input.length;
        },
        enumerable: true,
        configurable: true
    });
    _ParseAST.prototype.advance = function () { this.index++; };
    _ParseAST.prototype.optionalCharacter = function (code) {
        if (this.next.isCharacter(code)) {
            this.advance();
            return true;
        }
        else {
            return false;
        }
    };
    _ParseAST.prototype.optionalKeywordVar = function () {
        if (this.peekKeywordVar()) {
            this.advance();
            return true;
        }
        else {
            return false;
        }
    };
    _ParseAST.prototype.peekKeywordVar = function () { return this.next.isKeywordVar() || this.next.isOperator('#'); };
    _ParseAST.prototype.expectCharacter = function (code) {
        if (this.optionalCharacter(code))
            return;
        this.error("Missing expected " + lang_1.StringWrapper.fromCharCode(code));
    };
    _ParseAST.prototype.optionalOperator = function (op) {
        if (this.next.isOperator(op)) {
            this.advance();
            return true;
        }
        else {
            return false;
        }
    };
    _ParseAST.prototype.expectOperator = function (operator) {
        if (this.optionalOperator(operator))
            return;
        this.error("Missing expected operator " + operator);
    };
    _ParseAST.prototype.expectIdentifierOrKeyword = function () {
        var n = this.next;
        if (!n.isIdentifier() && !n.isKeyword()) {
            this.error("Unexpected token " + n + ", expected identifier or keyword");
        }
        this.advance();
        return n.toString();
    };
    _ParseAST.prototype.expectIdentifierOrKeywordOrString = function () {
        var n = this.next;
        if (!n.isIdentifier() && !n.isKeyword() && !n.isString()) {
            this.error("Unexpected token " + n + ", expected identifier, keyword, or string");
        }
        this.advance();
        return n.toString();
    };
    _ParseAST.prototype.parseChain = function () {
        var exprs = [];
        while (this.index < this.tokens.length) {
            var expr = this.parsePipe();
            exprs.push(expr);
            if (this.optionalCharacter(lexer_1.$SEMICOLON)) {
                if (!this.parseAction) {
                    this.error("Binding expression cannot contain chained expression");
                }
                while (this.optionalCharacter(lexer_1.$SEMICOLON)) {
                } // read all semicolons
            }
            else if (this.index < this.tokens.length) {
                this.error("Unexpected token '" + this.next + "'");
            }
        }
        if (exprs.length == 0)
            return new ast_1.EmptyExpr();
        if (exprs.length == 1)
            return exprs[0];
        return new ast_1.Chain(exprs);
    };
    _ParseAST.prototype.parsePipe = function () {
        var result = this.parseExpression();
        if (this.optionalOperator("|")) {
            if (this.parseAction) {
                this.error("Cannot have a pipe in an action expression");
            }
            do {
                var name = this.expectIdentifierOrKeyword();
                var args = [];
                while (this.optionalCharacter(lexer_1.$COLON)) {
                    args.push(this.parseExpression());
                }
                result = new ast_1.BindingPipe(result, name, args);
            } while (this.optionalOperator("|"));
        }
        return result;
    };
    _ParseAST.prototype.parseExpression = function () { return this.parseConditional(); };
    _ParseAST.prototype.parseConditional = function () {
        var start = this.inputIndex;
        var result = this.parseLogicalOr();
        if (this.optionalOperator('?')) {
            var yes = this.parsePipe();
            if (!this.optionalCharacter(lexer_1.$COLON)) {
                var end = this.inputIndex;
                var expression = this.input.substring(start, end);
                this.error("Conditional expression " + expression + " requires all 3 expressions");
            }
            var no = this.parsePipe();
            return new ast_1.Conditional(result, yes, no);
        }
        else {
            return result;
        }
    };
    _ParseAST.prototype.parseLogicalOr = function () {
        // '||'
        var result = this.parseLogicalAnd();
        while (this.optionalOperator('||')) {
            result = new ast_1.Binary('||', result, this.parseLogicalAnd());
        }
        return result;
    };
    _ParseAST.prototype.parseLogicalAnd = function () {
        // '&&'
        var result = this.parseEquality();
        while (this.optionalOperator('&&')) {
            result = new ast_1.Binary('&&', result, this.parseEquality());
        }
        return result;
    };
    _ParseAST.prototype.parseEquality = function () {
        // '==','!=','===','!=='
        var result = this.parseRelational();
        while (true) {
            if (this.optionalOperator('==')) {
                result = new ast_1.Binary('==', result, this.parseRelational());
            }
            else if (this.optionalOperator('===')) {
                result = new ast_1.Binary('===', result, this.parseRelational());
            }
            else if (this.optionalOperator('!=')) {
                result = new ast_1.Binary('!=', result, this.parseRelational());
            }
            else if (this.optionalOperator('!==')) {
                result = new ast_1.Binary('!==', result, this.parseRelational());
            }
            else {
                return result;
            }
        }
    };
    _ParseAST.prototype.parseRelational = function () {
        // '<', '>', '<=', '>='
        var result = this.parseAdditive();
        while (true) {
            if (this.optionalOperator('<')) {
                result = new ast_1.Binary('<', result, this.parseAdditive());
            }
            else if (this.optionalOperator('>')) {
                result = new ast_1.Binary('>', result, this.parseAdditive());
            }
            else if (this.optionalOperator('<=')) {
                result = new ast_1.Binary('<=', result, this.parseAdditive());
            }
            else if (this.optionalOperator('>=')) {
                result = new ast_1.Binary('>=', result, this.parseAdditive());
            }
            else {
                return result;
            }
        }
    };
    _ParseAST.prototype.parseAdditive = function () {
        // '+', '-'
        var result = this.parseMultiplicative();
        while (true) {
            if (this.optionalOperator('+')) {
                result = new ast_1.Binary('+', result, this.parseMultiplicative());
            }
            else if (this.optionalOperator('-')) {
                result = new ast_1.Binary('-', result, this.parseMultiplicative());
            }
            else {
                return result;
            }
        }
    };
    _ParseAST.prototype.parseMultiplicative = function () {
        // '*', '%', '/'
        var result = this.parsePrefix();
        while (true) {
            if (this.optionalOperator('*')) {
                result = new ast_1.Binary('*', result, this.parsePrefix());
            }
            else if (this.optionalOperator('%')) {
                result = new ast_1.Binary('%', result, this.parsePrefix());
            }
            else if (this.optionalOperator('/')) {
                result = new ast_1.Binary('/', result, this.parsePrefix());
            }
            else {
                return result;
            }
        }
    };
    _ParseAST.prototype.parsePrefix = function () {
        if (this.optionalOperator('+')) {
            return this.parsePrefix();
        }
        else if (this.optionalOperator('-')) {
            return new ast_1.Binary('-', new ast_1.LiteralPrimitive(0), this.parsePrefix());
        }
        else if (this.optionalOperator('!')) {
            return new ast_1.PrefixNot(this.parsePrefix());
        }
        else {
            return this.parseCallChain();
        }
    };
    _ParseAST.prototype.parseCallChain = function () {
        var result = this.parsePrimary();
        while (true) {
            if (this.optionalCharacter(lexer_1.$PERIOD)) {
                result = this.parseAccessMemberOrMethodCall(result, false);
            }
            else if (this.optionalOperator('?.')) {
                result = this.parseAccessMemberOrMethodCall(result, true);
            }
            else if (this.optionalCharacter(lexer_1.$LBRACKET)) {
                var key = this.parsePipe();
                this.expectCharacter(lexer_1.$RBRACKET);
                if (this.optionalOperator("=")) {
                    var value = this.parseConditional();
                    result = new ast_1.KeyedWrite(result, key, value);
                }
                else {
                    result = new ast_1.KeyedRead(result, key);
                }
            }
            else if (this.optionalCharacter(lexer_1.$LPAREN)) {
                var args = this.parseCallArguments();
                this.expectCharacter(lexer_1.$RPAREN);
                result = new ast_1.FunctionCall(result, args);
            }
            else {
                return result;
            }
        }
    };
    _ParseAST.prototype.parsePrimary = function () {
        if (this.optionalCharacter(lexer_1.$LPAREN)) {
            var result = this.parsePipe();
            this.expectCharacter(lexer_1.$RPAREN);
            return result;
        }
        else if (this.next.isKeywordNull() || this.next.isKeywordUndefined()) {
            this.advance();
            return new ast_1.LiteralPrimitive(null);
        }
        else if (this.next.isKeywordTrue()) {
            this.advance();
            return new ast_1.LiteralPrimitive(true);
        }
        else if (this.next.isKeywordFalse()) {
            this.advance();
            return new ast_1.LiteralPrimitive(false);
        }
        else if (this.optionalCharacter(lexer_1.$LBRACKET)) {
            var elements = this.parseExpressionList(lexer_1.$RBRACKET);
            this.expectCharacter(lexer_1.$RBRACKET);
            return new ast_1.LiteralArray(elements);
        }
        else if (this.next.isCharacter(lexer_1.$LBRACE)) {
            return this.parseLiteralMap();
        }
        else if (this.next.isIdentifier()) {
            return this.parseAccessMemberOrMethodCall(_implicitReceiver, false);
        }
        else if (this.next.isNumber()) {
            var value = this.next.toNumber();
            this.advance();
            return new ast_1.LiteralPrimitive(value);
        }
        else if (this.next.isString()) {
            var literalValue = this.next.toString();
            this.advance();
            return new ast_1.LiteralPrimitive(literalValue);
        }
        else if (this.index >= this.tokens.length) {
            this.error("Unexpected end of expression: " + this.input);
        }
        else {
            this.error("Unexpected token " + this.next);
        }
        // error() throws, so we don't reach here.
        throw new exceptions_1.BaseException("Fell through all cases in parsePrimary");
    };
    _ParseAST.prototype.parseExpressionList = function (terminator) {
        var result = [];
        if (!this.next.isCharacter(terminator)) {
            do {
                result.push(this.parsePipe());
            } while (this.optionalCharacter(lexer_1.$COMMA));
        }
        return result;
    };
    _ParseAST.prototype.parseLiteralMap = function () {
        var keys = [];
        var values = [];
        this.expectCharacter(lexer_1.$LBRACE);
        if (!this.optionalCharacter(lexer_1.$RBRACE)) {
            do {
                var key = this.expectIdentifierOrKeywordOrString();
                keys.push(key);
                this.expectCharacter(lexer_1.$COLON);
                values.push(this.parsePipe());
            } while (this.optionalCharacter(lexer_1.$COMMA));
            this.expectCharacter(lexer_1.$RBRACE);
        }
        return new ast_1.LiteralMap(keys, values);
    };
    _ParseAST.prototype.parseAccessMemberOrMethodCall = function (receiver, isSafe) {
        if (isSafe === void 0) { isSafe = false; }
        var id = this.expectIdentifierOrKeyword();
        if (this.optionalCharacter(lexer_1.$LPAREN)) {
            var args = this.parseCallArguments();
            this.expectCharacter(lexer_1.$RPAREN);
            var fn = this.reflector.method(id);
            return isSafe ? new ast_1.SafeMethodCall(receiver, id, fn, args) :
                new ast_1.MethodCall(receiver, id, fn, args);
        }
        else {
            if (isSafe) {
                if (this.optionalOperator("=")) {
                    this.error("The '?.' operator cannot be used in the assignment");
                }
                else {
                    return new ast_1.SafePropertyRead(receiver, id, this.reflector.getter(id));
                }
            }
            else {
                if (this.optionalOperator("=")) {
                    if (!this.parseAction) {
                        this.error("Bindings cannot contain assignments");
                    }
                    var value = this.parseConditional();
                    return new ast_1.PropertyWrite(receiver, id, this.reflector.setter(id), value);
                }
                else {
                    return new ast_1.PropertyRead(receiver, id, this.reflector.getter(id));
                }
            }
        }
        return null;
    };
    _ParseAST.prototype.parseCallArguments = function () {
        if (this.next.isCharacter(lexer_1.$RPAREN))
            return [];
        var positionals = [];
        do {
            positionals.push(this.parsePipe());
        } while (this.optionalCharacter(lexer_1.$COMMA));
        return positionals;
    };
    _ParseAST.prototype.parseBlockContent = function () {
        if (!this.parseAction) {
            this.error("Binding expression cannot contain chained expression");
        }
        var exprs = [];
        while (this.index < this.tokens.length && !this.next.isCharacter(lexer_1.$RBRACE)) {
            var expr = this.parseExpression();
            exprs.push(expr);
            if (this.optionalCharacter(lexer_1.$SEMICOLON)) {
                while (this.optionalCharacter(lexer_1.$SEMICOLON)) {
                } // read all semicolons
            }
        }
        if (exprs.length == 0)
            return new ast_1.EmptyExpr();
        if (exprs.length == 1)
            return exprs[0];
        return new ast_1.Chain(exprs);
    };
    /**
     * An identifier, a keyword, a string with an optional `-` inbetween.
     */
    _ParseAST.prototype.expectTemplateBindingKey = function () {
        var result = '';
        var operatorFound = false;
        do {
            result += this.expectIdentifierOrKeywordOrString();
            operatorFound = this.optionalOperator('-');
            if (operatorFound) {
                result += '-';
            }
        } while (operatorFound);
        return result.toString();
    };
    _ParseAST.prototype.parseTemplateBindings = function () {
        var bindings = [];
        var prefix = null;
        while (this.index < this.tokens.length) {
            var keyIsVar = this.optionalKeywordVar();
            var key = this.expectTemplateBindingKey();
            if (!keyIsVar) {
                if (prefix == null) {
                    prefix = key;
                }
                else {
                    key = prefix + key[0].toUpperCase() + key.substring(1);
                }
            }
            this.optionalCharacter(lexer_1.$COLON);
            var name = null;
            var expression = null;
            if (keyIsVar) {
                if (this.optionalOperator("=")) {
                    name = this.expectTemplateBindingKey();
                }
                else {
                    name = '\$implicit';
                }
            }
            else if (this.next !== lexer_1.EOF && !this.peekKeywordVar()) {
                var start = this.inputIndex;
                var ast = this.parsePipe();
                var source = this.input.substring(start, this.inputIndex);
                expression = new ast_1.ASTWithSource(ast, source, this.location);
            }
            bindings.push(new ast_1.TemplateBinding(key, keyIsVar, name, expression));
            if (!this.optionalCharacter(lexer_1.$SEMICOLON)) {
                this.optionalCharacter(lexer_1.$COMMA);
            }
        }
        return bindings;
    };
    _ParseAST.prototype.error = function (message, index) {
        if (index === void 0) { index = null; }
        if (lang_1.isBlank(index))
            index = this.index;
        var location = (index < this.tokens.length) ? "at column " + (this.tokens[index].index + 1) + " in" :
            "at the end of the expression";
        throw new ParseException(message, this.input, location, this.location);
    };
    return _ParseAST;
})();
exports._ParseAST = _ParseAST;
var SimpleExpressionChecker = (function () {
    function SimpleExpressionChecker() {
        this.simple = true;
    }
    SimpleExpressionChecker.check = function (ast) {
        var s = new SimpleExpressionChecker();
        ast.visit(s);
        return s.simple;
    };
    SimpleExpressionChecker.prototype.visitImplicitReceiver = function (ast) { };
    SimpleExpressionChecker.prototype.visitInterpolation = function (ast) { this.simple = false; };
    SimpleExpressionChecker.prototype.visitLiteralPrimitive = function (ast) { };
    SimpleExpressionChecker.prototype.visitPropertyRead = function (ast) { };
    SimpleExpressionChecker.prototype.visitPropertyWrite = function (ast) { this.simple = false; };
    SimpleExpressionChecker.prototype.visitSafePropertyRead = function (ast) { this.simple = false; };
    SimpleExpressionChecker.prototype.visitMethodCall = function (ast) { this.simple = false; };
    SimpleExpressionChecker.prototype.visitSafeMethodCall = function (ast) { this.simple = false; };
    SimpleExpressionChecker.prototype.visitFunctionCall = function (ast) { this.simple = false; };
    SimpleExpressionChecker.prototype.visitLiteralArray = function (ast) { this.visitAll(ast.expressions); };
    SimpleExpressionChecker.prototype.visitLiteralMap = function (ast) { this.visitAll(ast.values); };
    SimpleExpressionChecker.prototype.visitBinary = function (ast) { this.simple = false; };
    SimpleExpressionChecker.prototype.visitPrefixNot = function (ast) { this.simple = false; };
    SimpleExpressionChecker.prototype.visitConditional = function (ast) { this.simple = false; };
    SimpleExpressionChecker.prototype.visitPipe = function (ast) { this.simple = false; };
    SimpleExpressionChecker.prototype.visitKeyedRead = function (ast) { this.simple = false; };
    SimpleExpressionChecker.prototype.visitKeyedWrite = function (ast) { this.simple = false; };
    SimpleExpressionChecker.prototype.visitAll = function (asts) {
        var res = collection_1.ListWrapper.createFixedSize(asts.length);
        for (var i = 0; i < asts.length; ++i) {
            res[i] = asts[i].visit(this);
        }
        return res;
    };
    SimpleExpressionChecker.prototype.visitChain = function (ast) { this.simple = false; };
    SimpleExpressionChecker.prototype.visitQuote = function (ast) { this.simple = false; };
    return SimpleExpressionChecker;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9wYXJzZXIvcGFyc2VyLnRzIl0sIm5hbWVzIjpbIlBhcnNlRXhjZXB0aW9uIiwiUGFyc2VFeGNlcHRpb24uY29uc3RydWN0b3IiLCJQYXJzZXIiLCJQYXJzZXIuY29uc3RydWN0b3IiLCJQYXJzZXIucGFyc2VBY3Rpb24iLCJQYXJzZXIucGFyc2VCaW5kaW5nIiwiUGFyc2VyLnBhcnNlU2ltcGxlQmluZGluZyIsIlBhcnNlci5fcGFyc2VCaW5kaW5nQXN0IiwiUGFyc2VyLl9wYXJzZVF1b3RlIiwiUGFyc2VyLnBhcnNlVGVtcGxhdGVCaW5kaW5ncyIsIlBhcnNlci5wYXJzZUludGVycG9sYXRpb24iLCJQYXJzZXIud3JhcExpdGVyYWxQcmltaXRpdmUiLCJQYXJzZXIuX2NoZWNrTm9JbnRlcnBvbGF0aW9uIiwiUGFyc2VyLl9maW5kSW50ZXJwb2xhdGlvbkVycm9yQ29sdW1uIiwiX1BhcnNlQVNUIiwiX1BhcnNlQVNULmNvbnN0cnVjdG9yIiwiX1BhcnNlQVNULnBlZWsiLCJfUGFyc2VBU1QubmV4dCIsIl9QYXJzZUFTVC5pbnB1dEluZGV4IiwiX1BhcnNlQVNULmFkdmFuY2UiLCJfUGFyc2VBU1Qub3B0aW9uYWxDaGFyYWN0ZXIiLCJfUGFyc2VBU1Qub3B0aW9uYWxLZXl3b3JkVmFyIiwiX1BhcnNlQVNULnBlZWtLZXl3b3JkVmFyIiwiX1BhcnNlQVNULmV4cGVjdENoYXJhY3RlciIsIl9QYXJzZUFTVC5vcHRpb25hbE9wZXJhdG9yIiwiX1BhcnNlQVNULmV4cGVjdE9wZXJhdG9yIiwiX1BhcnNlQVNULmV4cGVjdElkZW50aWZpZXJPcktleXdvcmQiLCJfUGFyc2VBU1QuZXhwZWN0SWRlbnRpZmllck9yS2V5d29yZE9yU3RyaW5nIiwiX1BhcnNlQVNULnBhcnNlQ2hhaW4iLCJfUGFyc2VBU1QucGFyc2VQaXBlIiwiX1BhcnNlQVNULnBhcnNlRXhwcmVzc2lvbiIsIl9QYXJzZUFTVC5wYXJzZUNvbmRpdGlvbmFsIiwiX1BhcnNlQVNULnBhcnNlTG9naWNhbE9yIiwiX1BhcnNlQVNULnBhcnNlTG9naWNhbEFuZCIsIl9QYXJzZUFTVC5wYXJzZUVxdWFsaXR5IiwiX1BhcnNlQVNULnBhcnNlUmVsYXRpb25hbCIsIl9QYXJzZUFTVC5wYXJzZUFkZGl0aXZlIiwiX1BhcnNlQVNULnBhcnNlTXVsdGlwbGljYXRpdmUiLCJfUGFyc2VBU1QucGFyc2VQcmVmaXgiLCJfUGFyc2VBU1QucGFyc2VDYWxsQ2hhaW4iLCJfUGFyc2VBU1QucGFyc2VQcmltYXJ5IiwiX1BhcnNlQVNULnBhcnNlRXhwcmVzc2lvbkxpc3QiLCJfUGFyc2VBU1QucGFyc2VMaXRlcmFsTWFwIiwiX1BhcnNlQVNULnBhcnNlQWNjZXNzTWVtYmVyT3JNZXRob2RDYWxsIiwiX1BhcnNlQVNULnBhcnNlQ2FsbEFyZ3VtZW50cyIsIl9QYXJzZUFTVC5wYXJzZUJsb2NrQ29udGVudCIsIl9QYXJzZUFTVC5leHBlY3RUZW1wbGF0ZUJpbmRpbmdLZXkiLCJfUGFyc2VBU1QucGFyc2VUZW1wbGF0ZUJpbmRpbmdzIiwiX1BhcnNlQVNULmVycm9yIiwiU2ltcGxlRXhwcmVzc2lvbkNoZWNrZXIiLCJTaW1wbGVFeHByZXNzaW9uQ2hlY2tlci5jb25zdHJ1Y3RvciIsIlNpbXBsZUV4cHJlc3Npb25DaGVja2VyLmNoZWNrIiwiU2ltcGxlRXhwcmVzc2lvbkNoZWNrZXIudmlzaXRJbXBsaWNpdFJlY2VpdmVyIiwiU2ltcGxlRXhwcmVzc2lvbkNoZWNrZXIudmlzaXRJbnRlcnBvbGF0aW9uIiwiU2ltcGxlRXhwcmVzc2lvbkNoZWNrZXIudmlzaXRMaXRlcmFsUHJpbWl0aXZlIiwiU2ltcGxlRXhwcmVzc2lvbkNoZWNrZXIudmlzaXRQcm9wZXJ0eVJlYWQiLCJTaW1wbGVFeHByZXNzaW9uQ2hlY2tlci52aXNpdFByb3BlcnR5V3JpdGUiLCJTaW1wbGVFeHByZXNzaW9uQ2hlY2tlci52aXNpdFNhZmVQcm9wZXJ0eVJlYWQiLCJTaW1wbGVFeHByZXNzaW9uQ2hlY2tlci52aXNpdE1ldGhvZENhbGwiLCJTaW1wbGVFeHByZXNzaW9uQ2hlY2tlci52aXNpdFNhZmVNZXRob2RDYWxsIiwiU2ltcGxlRXhwcmVzc2lvbkNoZWNrZXIudmlzaXRGdW5jdGlvbkNhbGwiLCJTaW1wbGVFeHByZXNzaW9uQ2hlY2tlci52aXNpdExpdGVyYWxBcnJheSIsIlNpbXBsZUV4cHJlc3Npb25DaGVja2VyLnZpc2l0TGl0ZXJhbE1hcCIsIlNpbXBsZUV4cHJlc3Npb25DaGVja2VyLnZpc2l0QmluYXJ5IiwiU2ltcGxlRXhwcmVzc2lvbkNoZWNrZXIudmlzaXRQcmVmaXhOb3QiLCJTaW1wbGVFeHByZXNzaW9uQ2hlY2tlci52aXNpdENvbmRpdGlvbmFsIiwiU2ltcGxlRXhwcmVzc2lvbkNoZWNrZXIudmlzaXRQaXBlIiwiU2ltcGxlRXhwcmVzc2lvbkNoZWNrZXIudmlzaXRLZXllZFJlYWQiLCJTaW1wbGVFeHByZXNzaW9uQ2hlY2tlci52aXNpdEtleWVkV3JpdGUiLCJTaW1wbGVFeHByZXNzaW9uQ2hlY2tlci52aXNpdEFsbCIsIlNpbXBsZUV4cHJlc3Npb25DaGVja2VyLnZpc2l0Q2hhaW4iLCJTaW1wbGVFeHByZXNzaW9uQ2hlY2tlci52aXNpdFF1b3RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDJCQUF5QixpQ0FBaUMsQ0FBQyxDQUFBO0FBQzNELHFCQUFnRCwwQkFBMEIsQ0FBQyxDQUFBO0FBQzNFLDJCQUE4QyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQy9FLDJCQUEwQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzNELHNCQWVPLFNBQVMsQ0FBQyxDQUFBO0FBQ2pCLDJCQUFtQyx5Q0FBeUMsQ0FBQyxDQUFBO0FBQzdFLG9CQXlCTyxPQUFPLENBQUMsQ0FBQTtBQUdmLElBQUksaUJBQWlCLEdBQUcsSUFBSSxzQkFBZ0IsRUFBRSxDQUFDO0FBQy9DLG9GQUFvRjtBQUNwRixJQUFJLG9CQUFvQixHQUFHLHFCQUFxQixDQUFDO0FBRWpEO0lBQTZCQSxrQ0FBYUE7SUFDeENBLHdCQUFZQSxPQUFlQSxFQUFFQSxLQUFhQSxFQUFFQSxXQUFtQkEsRUFBRUEsV0FBaUJBO1FBQ2hGQyxrQkFBTUEsbUJBQWlCQSxPQUFPQSxTQUFJQSxXQUFXQSxVQUFLQSxLQUFLQSxhQUFRQSxXQUFhQSxDQUFDQSxDQUFDQTtJQUNoRkEsQ0FBQ0E7SUFDSEQscUJBQUNBO0FBQURBLENBQUNBLEFBSkQsRUFBNkIsMEJBQWEsRUFJekM7QUFFRDtJQUtFRSxnQkFBWUEsZ0JBQWdCQSxDQUNUQSxNQUFhQSxFQUFFQSxpQkFBbUNBO1FBQW5DQyxpQ0FBbUNBLEdBQW5DQSx3QkFBbUNBO1FBQWxEQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUFPQTtRQUM5QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsZ0JBQVNBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsR0FBR0EsaUJBQWlCQSxHQUFHQSxzQkFBU0EsQ0FBQ0E7SUFDakZBLENBQUNBO0lBRURELDRCQUFXQSxHQUFYQSxVQUFZQSxLQUFhQSxFQUFFQSxRQUFhQTtRQUN0Q0UsSUFBSUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxLQUFLQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUM1Q0EsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDekNBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLFNBQVNBLENBQUNBLEtBQUtBLEVBQUVBLFFBQVFBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBO1FBQ3JGQSxNQUFNQSxDQUFDQSxJQUFJQSxtQkFBYUEsQ0FBQ0EsR0FBR0EsRUFBRUEsS0FBS0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7SUFDakRBLENBQUNBO0lBRURGLDZCQUFZQSxHQUFaQSxVQUFhQSxLQUFhQSxFQUFFQSxRQUFhQTtRQUN2Q0csSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxLQUFLQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUNqREEsTUFBTUEsQ0FBQ0EsSUFBSUEsbUJBQWFBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO0lBQ2pEQSxDQUFDQTtJQUVESCxtQ0FBa0JBLEdBQWxCQSxVQUFtQkEsS0FBYUEsRUFBRUEsUUFBZ0JBO1FBQ2hESSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEtBQUtBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1FBQ2pEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSx1QkFBdUJBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hDQSxNQUFNQSxJQUFJQSxjQUFjQSxDQUNwQkEscUVBQXFFQSxFQUFFQSxLQUFLQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUM5RkEsQ0FBQ0E7UUFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsbUJBQWFBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO0lBQ2pEQSxDQUFDQTtJQUVPSixpQ0FBZ0JBLEdBQXhCQSxVQUF5QkEsS0FBYUEsRUFBRUEsUUFBZ0JBO1FBQ3RESyw2RUFBNkVBO1FBQzdFQSxvRUFBb0VBO1FBQ3BFQSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxLQUFLQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUU5Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsZ0JBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JCQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUNmQSxDQUFDQTtRQUVEQSxJQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBLEtBQUtBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1FBQzVDQSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUN6Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsS0FBS0EsRUFBRUEsUUFBUUEsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7SUFDckZBLENBQUNBO0lBRU9MLDRCQUFXQSxHQUFuQkEsVUFBb0JBLEtBQWFBLEVBQUVBLFFBQWFBO1FBQzlDTSxFQUFFQSxDQUFDQSxDQUFDQSxjQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQ0EsSUFBSUEsb0JBQW9CQSxHQUFHQSxLQUFLQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUM5Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0Esb0JBQW9CQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUM1Q0EsSUFBSUEsTUFBTUEsR0FBR0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsb0JBQW9CQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtRQUM3REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0Esb0JBQVlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ3ZDQSxJQUFJQSx1QkFBdUJBLEdBQUdBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLG9CQUFvQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDeEVBLE1BQU1BLENBQUNBLElBQUlBLFdBQUtBLENBQUNBLE1BQU1BLEVBQUVBLHVCQUF1QkEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7SUFDOURBLENBQUNBO0lBRUROLHNDQUFxQkEsR0FBckJBLFVBQXNCQSxLQUFhQSxFQUFFQSxRQUFhQTtRQUNoRE8sSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDekNBLE1BQU1BLENBQUNBLElBQUlBLFNBQVNBLENBQUNBLEtBQUtBLEVBQUVBLFFBQVFBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBLHFCQUFxQkEsRUFBRUEsQ0FBQ0E7SUFDaEdBLENBQUNBO0lBRURQLG1DQUFrQkEsR0FBbEJBLFVBQW1CQSxLQUFhQSxFQUFFQSxRQUFhQTtRQUM3Q1EsSUFBSUEsS0FBS0EsR0FBR0Esb0JBQWFBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEVBQUVBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0E7UUFDN0RBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNkQSxDQUFDQTtRQUNEQSxJQUFJQSxPQUFPQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUNqQkEsSUFBSUEsV0FBV0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFFckJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO1lBQ3RDQSxJQUFJQSxJQUFJQSxHQUFXQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hCQSxlQUFlQTtnQkFDZkEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDckJBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNsQ0EsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hDQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxTQUFTQSxDQUFDQSxLQUFLQSxFQUFFQSxRQUFRQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtnQkFDdEZBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3hCQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDTkEsTUFBTUEsSUFBSUEsY0FBY0EsQ0FBQ0EsMkRBQTJEQSxFQUFFQSxLQUFLQSxFQUNsRUEsZUFBYUEsSUFBSUEsQ0FBQ0EsNkJBQTZCQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFLQSxFQUM5REEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDckNBLENBQUNBO1FBQ0hBLENBQUNBO1FBQ0RBLE1BQU1BLENBQUNBLElBQUlBLG1CQUFhQSxDQUFDQSxJQUFJQSxtQkFBYUEsQ0FBQ0EsT0FBT0EsRUFBRUEsV0FBV0EsQ0FBQ0EsRUFBRUEsS0FBS0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7SUFDckZBLENBQUNBO0lBRURSLHFDQUFvQkEsR0FBcEJBLFVBQXFCQSxLQUFhQSxFQUFFQSxRQUFhQTtRQUMvQ1MsTUFBTUEsQ0FBQ0EsSUFBSUEsbUJBQWFBLENBQUNBLElBQUlBLHNCQUFnQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsS0FBS0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7SUFDekVBLENBQUNBO0lBRU9ULHNDQUFxQkEsR0FBN0JBLFVBQThCQSxLQUFhQSxFQUFFQSxRQUFhQTtRQUN4RFUsSUFBSUEsS0FBS0EsR0FBR0Esb0JBQWFBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEVBQUVBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0E7UUFDN0RBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JCQSxNQUFNQSxJQUFJQSxjQUFjQSxDQUFDQSx3REFBd0RBLEVBQUVBLEtBQUtBLEVBQy9EQSxlQUFhQSxJQUFJQSxDQUFDQSw2QkFBNkJBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBLFFBQUtBLEVBQzlEQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUNyQ0EsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFFT1YsOENBQTZCQSxHQUFyQ0EsVUFBc0NBLEtBQWVBLEVBQUVBLFlBQW9CQTtRQUN6RVcsSUFBSUEsV0FBV0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDckJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFlBQVlBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO1lBQ3RDQSxXQUFXQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFLQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFJQSxDQUFDQTtRQUM1REEsQ0FBQ0E7UUFFREEsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7SUFDNUJBLENBQUNBO0lBMUdIWDtRQUFDQSx1QkFBVUEsRUFBRUE7O2VBMkdaQTtJQUFEQSxhQUFDQTtBQUFEQSxDQUFDQSxBQTNHRCxJQTJHQztBQTFHWSxjQUFNLFNBMEdsQixDQUFBO0FBRUQ7SUFFRVksbUJBQW1CQSxLQUFhQSxFQUFTQSxRQUFhQSxFQUFTQSxNQUFhQSxFQUN6REEsU0FBb0JBLEVBQVNBLFdBQW9CQTtRQURqREMsVUFBS0EsR0FBTEEsS0FBS0EsQ0FBUUE7UUFBU0EsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBS0E7UUFBU0EsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBT0E7UUFDekRBLGNBQVNBLEdBQVRBLFNBQVNBLENBQVdBO1FBQVNBLGdCQUFXQSxHQUFYQSxXQUFXQSxDQUFTQTtRQUZwRUEsVUFBS0EsR0FBV0EsQ0FBQ0EsQ0FBQ0E7SUFFcURBLENBQUNBO0lBRXhFRCx3QkFBSUEsR0FBSkEsVUFBS0EsTUFBY0E7UUFDakJFLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLE1BQU1BLENBQUNBO1FBQzVCQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxXQUFHQSxDQUFDQTtJQUN2REEsQ0FBQ0E7SUFFREYsc0JBQUlBLDJCQUFJQTthQUFSQSxjQUFvQkcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7OztPQUFBSDtJQUUxQ0Esc0JBQUlBLGlDQUFVQTthQUFkQTtZQUNFSSxNQUFNQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNqRkEsQ0FBQ0E7OztPQUFBSjtJQUVEQSwyQkFBT0EsR0FBUEEsY0FBWUssSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFM0JMLHFDQUFpQkEsR0FBakJBLFVBQWtCQSxJQUFZQTtRQUM1Qk0sRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1lBQ2ZBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2RBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ05BLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1FBQ2ZBLENBQUNBO0lBQ0hBLENBQUNBO0lBRUROLHNDQUFrQkEsR0FBbEJBO1FBQ0VPLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQzFCQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtZQUNmQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNkQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNOQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUNmQSxDQUFDQTtJQUNIQSxDQUFDQTtJQUVEUCxrQ0FBY0EsR0FBZEEsY0FBNEJRLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLEVBQUVBLElBQUlBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBRTNGUixtQ0FBZUEsR0FBZkEsVUFBZ0JBLElBQVlBO1FBQzFCUyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQUNBLE1BQU1BLENBQUNBO1FBQ3pDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxzQkFBb0JBLG9CQUFhQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFHQSxDQUFDQSxDQUFDQTtJQUNyRUEsQ0FBQ0E7SUFHRFQsb0NBQWdCQSxHQUFoQkEsVUFBaUJBLEVBQVVBO1FBQ3pCVSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM3QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7WUFDZkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDZEEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDTkEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDZkEsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFFRFYsa0NBQWNBLEdBQWRBLFVBQWVBLFFBQWdCQTtRQUM3QlcsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUFDQSxNQUFNQSxDQUFDQTtRQUM1Q0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsK0JBQTZCQSxRQUFVQSxDQUFDQSxDQUFDQTtJQUN0REEsQ0FBQ0E7SUFFRFgsNkNBQXlCQSxHQUF6QkE7UUFDRVksSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDbEJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFlBQVlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxzQkFBb0JBLENBQUNBLHFDQUFrQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdEVBLENBQUNBO1FBQ0RBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1FBQ2ZBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO0lBQ3RCQSxDQUFDQTtJQUVEWixxREFBaUNBLEdBQWpDQTtRQUNFYSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNsQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekRBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLHNCQUFvQkEsQ0FBQ0EsOENBQTJDQSxDQUFDQSxDQUFDQTtRQUMvRUEsQ0FBQ0E7UUFDREEsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7UUFDZkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7SUFDdEJBLENBQUNBO0lBRURiLDhCQUFVQSxHQUFWQTtRQUNFYyxJQUFJQSxLQUFLQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUNmQSxPQUFPQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQUN2Q0EsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7WUFDNUJBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBRWpCQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLGtCQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBLENBQUNBO29CQUN0QkEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0Esc0RBQXNEQSxDQUFDQSxDQUFDQTtnQkFDckVBLENBQUNBO2dCQUNEQSxPQUFPQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBLGtCQUFVQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDNUNBLENBQUNBLENBQUVBLHNCQUFzQkE7WUFDM0JBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2dCQUMzQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsdUJBQXFCQSxJQUFJQSxDQUFDQSxJQUFJQSxNQUFHQSxDQUFDQSxDQUFDQTtZQUNoREEsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsZUFBU0EsRUFBRUEsQ0FBQ0E7UUFDOUNBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBO1lBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQ3ZDQSxNQUFNQSxDQUFDQSxJQUFJQSxXQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtJQUMxQkEsQ0FBQ0E7SUFFRGQsNkJBQVNBLEdBQVRBO1FBQ0VlLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBO1FBQ3BDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQy9CQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDckJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLDRDQUE0Q0EsQ0FBQ0EsQ0FBQ0E7WUFDM0RBLENBQUNBO1lBRURBLEdBQUdBLENBQUNBO2dCQUNGQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSx5QkFBeUJBLEVBQUVBLENBQUNBO2dCQUM1Q0EsSUFBSUEsSUFBSUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ2RBLE9BQU9BLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsY0FBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ3RDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDcENBLENBQUNBO2dCQUNEQSxNQUFNQSxHQUFHQSxJQUFJQSxpQkFBV0EsQ0FBQ0EsTUFBTUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDL0NBLENBQUNBLFFBQVFBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUE7UUFDdkNBLENBQUNBO1FBRURBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBO0lBQ2hCQSxDQUFDQTtJQUVEZixtQ0FBZUEsR0FBZkEsY0FBeUJnQixNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO0lBRTFEaEIsb0NBQWdCQSxHQUFoQkE7UUFDRWlCLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1FBQzVCQSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxFQUFFQSxDQUFDQTtRQUVuQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMvQkEsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7WUFDM0JBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsY0FBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BDQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDMUJBLElBQUlBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNsREEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsNEJBQTBCQSxVQUFVQSxnQ0FBNkJBLENBQUNBLENBQUNBO1lBQ2hGQSxDQUFDQTtZQUNEQSxJQUFJQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtZQUMxQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsaUJBQVdBLENBQUNBLE1BQU1BLEVBQUVBLEdBQUdBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO1FBQzFDQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNOQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFFRGpCLGtDQUFjQSxHQUFkQTtRQUNFa0IsT0FBT0E7UUFDUEEsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7UUFDcENBLE9BQU9BLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDbkNBLE1BQU1BLEdBQUdBLElBQUlBLFlBQU1BLENBQUNBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBLENBQUNBO1FBQzVEQSxDQUFDQTtRQUNEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtJQUNoQkEsQ0FBQ0E7SUFFRGxCLG1DQUFlQSxHQUFmQTtRQUNFbUIsT0FBT0E7UUFDUEEsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7UUFDbENBLE9BQU9BLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDbkNBLE1BQU1BLEdBQUdBLElBQUlBLFlBQU1BLENBQUNBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLENBQUNBO1FBQzFEQSxDQUFDQTtRQUNEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtJQUNoQkEsQ0FBQ0E7SUFFRG5CLGlDQUFhQSxHQUFiQTtRQUNFb0Isd0JBQXdCQTtRQUN4QkEsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7UUFDcENBLE9BQU9BLElBQUlBLEVBQUVBLENBQUNBO1lBQ1pBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hDQSxNQUFNQSxHQUFHQSxJQUFJQSxZQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUM1REEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDeENBLE1BQU1BLEdBQUdBLElBQUlBLFlBQU1BLENBQUNBLEtBQUtBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBLENBQUNBO1lBQzdEQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2Q0EsTUFBTUEsR0FBR0EsSUFBSUEsWUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDNURBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hDQSxNQUFNQSxHQUFHQSxJQUFJQSxZQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUM3REEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBO1lBQ2hCQSxDQUFDQTtRQUNIQSxDQUFDQTtJQUNIQSxDQUFDQTtJQUVEcEIsbUNBQWVBLEdBQWZBO1FBQ0VxQix1QkFBdUJBO1FBQ3ZCQSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQTtRQUNsQ0EsT0FBT0EsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFDWkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDL0JBLE1BQU1BLEdBQUdBLElBQUlBLFlBQU1BLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLENBQUNBO1lBQ3pEQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN0Q0EsTUFBTUEsR0FBR0EsSUFBSUEsWUFBTUEsQ0FBQ0EsR0FBR0EsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDekRBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZDQSxNQUFNQSxHQUFHQSxJQUFJQSxZQUFNQSxDQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUMxREEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkNBLE1BQU1BLEdBQUdBLElBQUlBLFlBQU1BLENBQUNBLElBQUlBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLENBQUNBO1lB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QUNsQm9CLElBQUlBLEdBQUdBLEdBQUdBLHdCQUFXQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUNuREEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDckNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQy9CQSxDQUFDQTtRQUNEQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQTtJQUNiQSxDQUFDQTtJQUVEcEIsNENBQVVBLEdBQVZBLFVBQVdBLEdBQVVBLElBQUlxQixJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUUvQ3JCLDRDQUFVQSxHQUFWQSxVQUFXQSxHQUFVQSxJQUFJc0IsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDakR0Qiw4QkFBQ0E7QUFBREEsQ0FBQ0EsQUF0REQsSUFzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpL2RlY29yYXRvcnMnO1xuaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIFN0cmluZ1dyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtcbiAgTGV4ZXIsXG4gIEVPRixcbiAgaXNJZGVudGlmaWVyLFxuICBUb2tlbixcbiAgJFBFUklPRCxcbiAgJENPTE9OLFxuICAkU0VNSUNPTE9OLFxuICAkTEJSQUNLRVQsXG4gICRSQlJBQ0tFVCxcbiAgJENPTU1BLFxuICAkTEJSQUNFLFxuICAkUkJSQUNFLFxuICAkTFBBUkVOLFxuICAkUlBBUkVOXG59IGZyb20gJy4vbGV4ZXInO1xuaW1wb3J0IHtyZWZsZWN0b3IsIFJlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcbmltcG9ydCB7XG4gIEFTVCxcbiAgRW1wdHlFeHByLFxuICBJbXBsaWNpdFJlY2VpdmVyLFxuICBQcm9wZXJ0eVJlYWQsXG4gIFByb3BlcnR5V3JpdGUsXG4gIFNhZmVQcm9wZXJ0eVJlYWQsXG4gIExpdGVyYWxQcmltaXRpdmUsXG4gIEJpbmFyeSxcbiAgUHJlZml4Tm90LFxuICBDb25kaXRpb25hbCxcbiAgQmluZGluZ1BpcGUsXG4gIENoYWluLFxuICBLZXllZFJlYWQsXG4gIEtleWVkV3JpdGUsXG4gIExpdGVyYWxBcnJheSxcbiAgTGl0ZXJhbE1hcCxcbiAgSW50ZXJwb2xhdGlvbixcbiAgTWV0aG9kQ2FsbCxcbiAgU2FmZU1ldGhvZENhbGwsXG4gIEZ1bmN0aW9uQ2FsbCxcbiAgVGVtcGxhdGVCaW5kaW5nLFxuICBBU1RXaXRoU291cmNlLFxuICBBc3RWaXNpdG9yLFxuICBRdW90ZVxufSBmcm9tICcuL2FzdCc7XG5cblxudmFyIF9pbXBsaWNpdFJlY2VpdmVyID0gbmV3IEltcGxpY2l0UmVjZWl2ZXIoKTtcbi8vIFRPRE8odGJvc2NoKTogQ2Fubm90IG1ha2UgdGhpcyBjb25zdC9maW5hbCByaWdodCBub3cgYmVjYXVzZSBvZiB0aGUgdHJhbnNwaWxlci4uLlxudmFyIElOVEVSUE9MQVRJT05fUkVHRVhQID0gL1xce1xceyhbXFxzXFxTXSo/KVxcfVxcfS9nO1xuXG5jbGFzcyBQYXJzZUV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGlucHV0OiBzdHJpbmcsIGVyckxvY2F0aW9uOiBzdHJpbmcsIGN0eExvY2F0aW9uPzogYW55KSB7XG4gICAgc3VwZXIoYFBhcnNlciBFcnJvcjogJHttZXNzYWdlfSAke2VyckxvY2F0aW9ufSBbJHtpbnB1dH1dIGluICR7Y3R4TG9jYXRpb259YCk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhcnNlciB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlZmxlY3RvcjogUmVmbGVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKC8qKiBAaW50ZXJuYWwgKi9cbiAgICAgICAgICAgICAgcHVibGljIF9sZXhlcjogTGV4ZXIsIHByb3ZpZGVkUmVmbGVjdG9yOiBSZWZsZWN0b3IgPSBudWxsKSB7XG4gICAgdGhpcy5fcmVmbGVjdG9yID0gaXNQcmVzZW50KHByb3ZpZGVkUmVmbGVjdG9yKSA/IHByb3ZpZGVkUmVmbGVjdG9yIDogcmVmbGVjdG9yO1xuICB9XG5cbiAgcGFyc2VBY3Rpb24oaW5wdXQ6IHN0cmluZywgbG9jYXRpb246IGFueSk6IEFTVFdpdGhTb3VyY2Uge1xuICAgIHRoaXMuX2NoZWNrTm9JbnRlcnBvbGF0aW9uKGlucHV0LCBsb2NhdGlvbik7XG4gICAgdmFyIHRva2VucyA9IHRoaXMuX2xleGVyLnRva2VuaXplKGlucHV0KTtcbiAgICB2YXIgYXN0ID0gbmV3IF9QYXJzZUFTVChpbnB1dCwgbG9jYXRpb24sIHRva2VucywgdGhpcy5fcmVmbGVjdG9yLCB0cnVlKS5wYXJzZUNoYWluKCk7XG4gICAgcmV0dXJuIG5ldyBBU1RXaXRoU291cmNlKGFzdCwgaW5wdXQsIGxvY2F0aW9uKTtcbiAgfVxuXG4gIHBhcnNlQmluZGluZyhpbnB1dDogc3RyaW5nLCBsb2NhdGlvbjogYW55KTogQVNUV2l0aFNvdXJjZSB7XG4gICAgdmFyIGFzdCA9IHRoaXMuX3BhcnNlQmluZGluZ0FzdChpbnB1dCwgbG9jYXRpb24pO1xuICAgIHJldHVybiBuZXcgQVNUV2l0aFNvdXJjZShhc3QsIGlucHV0LCBsb2NhdGlvbik7XG4gIH1cblxuICBwYXJzZVNpbXBsZUJpbmRpbmcoaW5wdXQ6IHN0cmluZywgbG9jYXRpb246IHN0cmluZyk6IEFTVFdpdGhTb3VyY2Uge1xuICAgIHZhciBhc3QgPSB0aGlzLl9wYXJzZUJpbmRpbmdBc3QoaW5wdXQsIGxvY2F0aW9uKTtcbiAgICBpZiAoIVNpbXBsZUV4cHJlc3Npb25DaGVja2VyLmNoZWNrKGFzdCkpIHtcbiAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbihcbiAgICAgICAgICAnSG9zdCBiaW5kaW5nIGV4cHJlc3Npb24gY2FuIG9ubHkgY29udGFpbiBmaWVsZCBhY2Nlc3MgYW5kIGNvbnN0YW50cycsIGlucHV0LCBsb2NhdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQVNUV2l0aFNvdXJjZShhc3QsIGlucHV0LCBsb2NhdGlvbik7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZUJpbmRpbmdBc3QoaW5wdXQ6IHN0cmluZywgbG9jYXRpb246IHN0cmluZyk6IEFTVCB7XG4gICAgLy8gUXVvdGVzIGV4cHJlc3Npb25zIHVzZSAzcmQtcGFydHkgZXhwcmVzc2lvbiBsYW5ndWFnZS4gV2UgZG9uJ3Qgd2FudCB0byB1c2VcbiAgICAvLyBvdXIgbGV4ZXIgb3IgcGFyc2VyIGZvciB0aGF0LCBzbyB3ZSBjaGVjayBmb3IgdGhhdCBhaGVhZCBvZiB0aW1lLlxuICAgIHZhciBxdW90ZSA9IHRoaXMuX3BhcnNlUXVvdGUoaW5wdXQsIGxvY2F0aW9uKTtcblxuICAgIGlmIChpc1ByZXNlbnQocXVvdGUpKSB7XG4gICAgICByZXR1cm4gcXVvdGU7XG4gICAgfVxuXG4gICAgdGhpcy5fY2hlY2tOb0ludGVycG9sYXRpb24oaW5wdXQsIGxvY2F0aW9uKTtcbiAgICB2YXIgdG9rZW5zID0gdGhpcy5fbGV4ZXIudG9rZW5pemUoaW5wdXQpO1xuICAgIHJldHVybiBuZXcgX1BhcnNlQVNUKGlucHV0LCBsb2NhdGlvbiwgdG9rZW5zLCB0aGlzLl9yZWZsZWN0b3IsIGZhbHNlKS5wYXJzZUNoYWluKCk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVF1b3RlKGlucHV0OiBzdHJpbmcsIGxvY2F0aW9uOiBhbnkpOiBBU1Qge1xuICAgIGlmIChpc0JsYW5rKGlucHV0KSkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHByZWZpeFNlcGFyYXRvckluZGV4ID0gaW5wdXQuaW5kZXhPZignOicpO1xuICAgIGlmIChwcmVmaXhTZXBhcmF0b3JJbmRleCA9PSAtMSkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHByZWZpeCA9IGlucHV0LnN1YnN0cmluZygwLCBwcmVmaXhTZXBhcmF0b3JJbmRleCkudHJpbSgpO1xuICAgIGlmICghaXNJZGVudGlmaWVyKHByZWZpeCkpIHJldHVybiBudWxsO1xuICAgIHZhciB1bmludGVycHJldGVkRXhwcmVzc2lvbiA9IGlucHV0LnN1YnN0cmluZyhwcmVmaXhTZXBhcmF0b3JJbmRleCArIDEpO1xuICAgIHJldHVybiBuZXcgUXVvdGUocHJlZml4LCB1bmludGVycHJldGVkRXhwcmVzc2lvbiwgbG9jYXRpb24pO1xuICB9XG5cbiAgcGFyc2VUZW1wbGF0ZUJpbmRpbmdzKGlucHV0OiBzdHJpbmcsIGxvY2F0aW9uOiBhbnkpOiBUZW1wbGF0ZUJpbmRpbmdbXSB7XG4gICAgdmFyIHRva2VucyA9IHRoaXMuX2xleGVyLnRva2VuaXplKGlucHV0KTtcbiAgICByZXR1cm4gbmV3IF9QYXJzZUFTVChpbnB1dCwgbG9jYXRpb24sIHRva2VucywgdGhpcy5fcmVmbGVjdG9yLCBmYWxzZSkucGFyc2VUZW1wbGF0ZUJpbmRpbmdzKCk7XG4gIH1cblxuICBwYXJzZUludGVycG9sYXRpb24oaW5wdXQ6IHN0cmluZywgbG9jYXRpb246IGFueSk6IEFTVFdpdGhTb3VyY2Uge1xuICAgIHZhciBwYXJ0cyA9IFN0cmluZ1dyYXBwZXIuc3BsaXQoaW5wdXQsIElOVEVSUE9MQVRJT05fUkVHRVhQKTtcbiAgICBpZiAocGFydHMubGVuZ3RoIDw9IDEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgc3RyaW5ncyA9IFtdO1xuICAgIHZhciBleHByZXNzaW9ucyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBhcnQ6IHN0cmluZyA9IHBhcnRzW2ldO1xuICAgICAgaWYgKGkgJSAyID09PSAwKSB7XG4gICAgICAgIC8vIGZpeGVkIHN0cmluZ1xuICAgICAgICBzdHJpbmdzLnB1c2gocGFydCk7XG4gICAgICB9IGVsc2UgaWYgKHBhcnQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHRva2VucyA9IHRoaXMuX2xleGVyLnRva2VuaXplKHBhcnQpO1xuICAgICAgICB2YXIgYXN0ID0gbmV3IF9QYXJzZUFTVChpbnB1dCwgbG9jYXRpb24sIHRva2VucywgdGhpcy5fcmVmbGVjdG9yLCBmYWxzZSkucGFyc2VDaGFpbigpO1xuICAgICAgICBleHByZXNzaW9ucy5wdXNoKGFzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24oJ0JsYW5rIGV4cHJlc3Npb25zIGFyZSBub3QgYWxsb3dlZCBpbiBpbnRlcnBvbGF0ZWQgc3RyaW5ncycsIGlucHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGF0IGNvbHVtbiAke3RoaXMuX2ZpbmRJbnRlcnBvbGF0aW9uRXJyb3JDb2x1bW4ocGFydHMsIGkpfSBpbmAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgQVNUV2l0aFNvdXJjZShuZXcgSW50ZXJwb2xhdGlvbihzdHJpbmdzLCBleHByZXNzaW9ucyksIGlucHV0LCBsb2NhdGlvbik7XG4gIH1cblxuICB3cmFwTGl0ZXJhbFByaW1pdGl2ZShpbnB1dDogc3RyaW5nLCBsb2NhdGlvbjogYW55KTogQVNUV2l0aFNvdXJjZSB7XG4gICAgcmV0dXJuIG5ldyBBU1RXaXRoU291cmNlKG5ldyBMaXRlcmFsUHJpbWl0aXZlKGlucHV0KSwgaW5wdXQsIGxvY2F0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoZWNrTm9JbnRlcnBvbGF0aW9uKGlucHV0OiBzdHJpbmcsIGxvY2F0aW9uOiBhbnkpOiB2b2lkIHtcbiAgICB2YXIgcGFydHMgPSBTdHJpbmdXcmFwcGVyLnNwbGl0KGlucHV0LCBJTlRFUlBPTEFUSU9OX1JFR0VYUCk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbignR290IGludGVycG9sYXRpb24gKHt7fX0pIHdoZXJlIGV4cHJlc3Npb24gd2FzIGV4cGVjdGVkJywgaW5wdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGF0IGNvbHVtbiAke3RoaXMuX2ZpbmRJbnRlcnBvbGF0aW9uRXJyb3JDb2x1bW4ocGFydHMsIDEpfSBpbmAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRJbnRlcnBvbGF0aW9uRXJyb3JDb2x1bW4ocGFydHM6IHN0cmluZ1tdLCBwYXJ0SW5FcnJJZHg6IG51bWJlcik6IG51bWJlciB7XG4gICAgdmFyIGVyckxvY2F0aW9uID0gJyc7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBwYXJ0SW5FcnJJZHg7IGorKykge1xuICAgICAgZXJyTG9jYXRpb24gKz0gaiAlIDIgPT09IDAgPyBwYXJ0c1tqXSA6IGB7eyR7cGFydHNbal19fX1gO1xuICAgIH1cblxuICAgIHJldHVybiBlcnJMb2NhdGlvbi5sZW5ndGg7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIF9QYXJzZUFTVCB7XG4gIGluZGV4OiBudW1iZXIgPSAwO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5wdXQ6IHN0cmluZywgcHVibGljIGxvY2F0aW9uOiBhbnksIHB1YmxpYyB0b2tlbnM6IGFueVtdLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVmbGVjdG9yOiBSZWZsZWN0b3IsIHB1YmxpYyBwYXJzZUFjdGlvbjogYm9vbGVhbikge31cblxuICBwZWVrKG9mZnNldDogbnVtYmVyKTogVG9rZW4ge1xuICAgIHZhciBpID0gdGhpcy5pbmRleCArIG9mZnNldDtcbiAgICByZXR1cm4gaSA8IHRoaXMudG9rZW5zLmxlbmd0aCA/IHRoaXMudG9rZW5zW2ldIDogRU9GO1xuICB9XG5cbiAgZ2V0IG5leHQoKTogVG9rZW4geyByZXR1cm4gdGhpcy5wZWVrKDApOyB9XG5cbiAgZ2V0IGlucHV0SW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGgpID8gdGhpcy5uZXh0LmluZGV4IDogdGhpcy5pbnB1dC5sZW5ndGg7XG4gIH1cblxuICBhZHZhbmNlKCkgeyB0aGlzLmluZGV4Kys7IH1cblxuICBvcHRpb25hbENoYXJhY3Rlcihjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5uZXh0LmlzQ2hhcmFjdGVyKGNvZGUpKSB7XG4gICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgb3B0aW9uYWxLZXl3b3JkVmFyKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnBlZWtLZXl3b3JkVmFyKCkpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwZWVrS2V5d29yZFZhcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubmV4dC5pc0tleXdvcmRWYXIoKSB8fCB0aGlzLm5leHQuaXNPcGVyYXRvcignIycpOyB9XG5cbiAgZXhwZWN0Q2hhcmFjdGVyKGNvZGU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLm9wdGlvbmFsQ2hhcmFjdGVyKGNvZGUpKSByZXR1cm47XG4gICAgdGhpcy5lcnJvcihgTWlzc2luZyBleHBlY3RlZCAke1N0cmluZ1dyYXBwZXIuZnJvbUNoYXJDb2RlKGNvZGUpfWApO1xuICB9XG5cblxuICBvcHRpb25hbE9wZXJhdG9yKG9wOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5uZXh0LmlzT3BlcmF0b3Iob3ApKSB7XG4gICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZXhwZWN0T3BlcmF0b3Iob3BlcmF0b3I6IHN0cmluZykge1xuICAgIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3Iob3BlcmF0b3IpKSByZXR1cm47XG4gICAgdGhpcy5lcnJvcihgTWlzc2luZyBleHBlY3RlZCBvcGVyYXRvciAke29wZXJhdG9yfWApO1xuICB9XG5cbiAgZXhwZWN0SWRlbnRpZmllck9yS2V5d29yZCgpOiBzdHJpbmcge1xuICAgIHZhciBuID0gdGhpcy5uZXh0O1xuICAgIGlmICghbi5pc0lkZW50aWZpZXIoKSAmJiAhbi5pc0tleXdvcmQoKSkge1xuICAgICAgdGhpcy5lcnJvcihgVW5leHBlY3RlZCB0b2tlbiAke259LCBleHBlY3RlZCBpZGVudGlmaWVyIG9yIGtleXdvcmRgKTtcbiAgICB9XG4gICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgcmV0dXJuIG4udG9TdHJpbmcoKTtcbiAgfVxuXG4gIGV4cGVjdElkZW50aWZpZXJPcktleXdvcmRPclN0cmluZygpOiBzdHJpbmcge1xuICAgIHZhciBuID0gdGhpcy5uZXh0O1xuICAgIGlmICghbi5pc0lkZW50aWZpZXIoKSAmJiAhbi5pc0tleXdvcmQoKSAmJiAhbi5pc1N0cmluZygpKSB7XG4gICAgICB0aGlzLmVycm9yKGBVbmV4cGVjdGVkIHRva2VuICR7bn0sIGV4cGVjdGVkIGlkZW50aWZpZXIsIGtleXdvcmQsIG9yIHN0cmluZ2ApO1xuICAgIH1cbiAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICByZXR1cm4gbi50b1N0cmluZygpO1xuICB9XG5cbiAgcGFyc2VDaGFpbigpOiBBU1Qge1xuICAgIHZhciBleHBycyA9IFtdO1xuICAgIHdoaWxlICh0aGlzLmluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICB2YXIgZXhwciA9IHRoaXMucGFyc2VQaXBlKCk7XG4gICAgICBleHBycy5wdXNoKGV4cHIpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkU0VNSUNPTE9OKSkge1xuICAgICAgICBpZiAoIXRoaXMucGFyc2VBY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLmVycm9yKFwiQmluZGluZyBleHByZXNzaW9uIGNhbm5vdCBjb250YWluIGNoYWluZWQgZXhwcmVzc2lvblwiKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkU0VNSUNPTE9OKSkge1xuICAgICAgICB9ICAvLyByZWFkIGFsbCBzZW1pY29sb25zXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5lcnJvcihgVW5leHBlY3RlZCB0b2tlbiAnJHt0aGlzLm5leHR9J2ApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXhwcnMubGVuZ3RoID09IDApIHJldHVybiBuZXcgRW1wdHlFeHByKCk7XG4gICAgaWYgKGV4cHJzLmxlbmd0aCA9PSAxKSByZXR1cm4gZXhwcnNbMF07XG4gICAgcmV0dXJuIG5ldyBDaGFpbihleHBycyk7XG4gIH1cblxuICBwYXJzZVBpcGUoKTogQVNUIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKFwifFwiKSkge1xuICAgICAgaWYgKHRoaXMucGFyc2VBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5lcnJvcihcIkNhbm5vdCBoYXZlIGEgcGlwZSBpbiBhbiBhY3Rpb24gZXhwcmVzc2lvblwiKTtcbiAgICAgIH1cblxuICAgICAgZG8ge1xuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZXhwZWN0SWRlbnRpZmllck9yS2V5d29yZCgpO1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICB3aGlsZSAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkQ09MT04pKSB7XG4gICAgICAgICAgYXJncy5wdXNoKHRoaXMucGFyc2VFeHByZXNzaW9uKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5kaW5nUGlwZShyZXN1bHQsIG5hbWUsIGFyZ3MpO1xuICAgICAgfSB3aGlsZSAodGhpcy5vcHRpb25hbE9wZXJhdG9yKFwifFwiKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHBhcnNlRXhwcmVzc2lvbigpOiBBU1QgeyByZXR1cm4gdGhpcy5wYXJzZUNvbmRpdGlvbmFsKCk7IH1cblxuICBwYXJzZUNvbmRpdGlvbmFsKCk6IEFTVCB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5pbnB1dEluZGV4O1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCc/JykpIHtcbiAgICAgIHZhciB5ZXMgPSB0aGlzLnBhcnNlUGlwZSgpO1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbmFsQ2hhcmFjdGVyKCRDT0xPTikpIHtcbiAgICAgICAgdmFyIGVuZCA9IHRoaXMuaW5wdXRJbmRleDtcbiAgICAgICAgdmFyIGV4cHJlc3Npb24gPSB0aGlzLmlucHV0LnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbiAgICAgICAgdGhpcy5lcnJvcihgQ29uZGl0aW9uYWwgZXhwcmVzc2lvbiAke2V4cHJlc3Npb259IHJlcXVpcmVzIGFsbCAzIGV4cHJlc3Npb25zYCk7XG4gICAgICB9XG4gICAgICB2YXIgbm8gPSB0aGlzLnBhcnNlUGlwZSgpO1xuICAgICAgcmV0dXJuIG5ldyBDb25kaXRpb25hbChyZXN1bHQsIHllcywgbm8pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlTG9naWNhbE9yKCk6IEFTVCB7XG4gICAgLy8gJ3x8J1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpO1xuICAgIHdoaWxlICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJ3x8JykpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJ3x8JywgcmVzdWx0LCB0aGlzLnBhcnNlTG9naWNhbEFuZCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHBhcnNlTG9naWNhbEFuZCgpOiBBU1Qge1xuICAgIC8vICcmJidcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5wYXJzZUVxdWFsaXR5KCk7XG4gICAgd2hpbGUgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignJiYnKSkge1xuICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnJiYnLCByZXN1bHQsIHRoaXMucGFyc2VFcXVhbGl0eSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHBhcnNlRXF1YWxpdHkoKTogQVNUIHtcbiAgICAvLyAnPT0nLCchPScsJz09PScsJyE9PSdcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5wYXJzZVJlbGF0aW9uYWwoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignPT0nKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCc9PScsIHJlc3VsdCwgdGhpcy5wYXJzZVJlbGF0aW9uYWwoKSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignPT09JykpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnPT09JywgcmVzdWx0LCB0aGlzLnBhcnNlUmVsYXRpb25hbCgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCchPScpKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJyE9JywgcmVzdWx0LCB0aGlzLnBhcnNlUmVsYXRpb25hbCgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCchPT0nKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCchPT0nLCByZXN1bHQsIHRoaXMucGFyc2VSZWxhdGlvbmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJzZVJlbGF0aW9uYWwoKTogQVNUIHtcbiAgICAvLyAnPCcsICc+JywgJzw9JywgJz49J1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlQWRkaXRpdmUoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignPCcpKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJzwnLCByZXN1bHQsIHRoaXMucGFyc2VBZGRpdGl2ZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCc+JykpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnPicsIHJlc3VsdCwgdGhpcy5wYXJzZUFkZGl0aXZlKCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJzw9JykpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnPD0nLCByZXN1bHQsIHRoaXMucGFyc2VBZGRpdGl2ZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCc+PScpKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJz49JywgcmVzdWx0LCB0aGlzLnBhcnNlQWRkaXRpdmUoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBhcnNlQWRkaXRpdmUoKTogQVNUIHtcbiAgICAvLyAnKycsICctJ1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlTXVsdGlwbGljYXRpdmUoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignKycpKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBCaW5hcnkoJysnLCByZXN1bHQsIHRoaXMucGFyc2VNdWx0aXBsaWNhdGl2ZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCctJykpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEJpbmFyeSgnLScsIHJlc3VsdCwgdGhpcy5wYXJzZU11bHRpcGxpY2F0aXZlKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJzZU11bHRpcGxpY2F0aXZlKCk6IEFTVCB7XG4gICAgLy8gJyonLCAnJScsICcvJ1xuICAgIHZhciByZXN1bHQgPSB0aGlzLnBhcnNlUHJlZml4KCk7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJyonKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCcqJywgcmVzdWx0LCB0aGlzLnBhcnNlUHJlZml4KCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJyUnKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCclJywgcmVzdWx0LCB0aGlzLnBhcnNlUHJlZml4KCkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJy8nKSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgQmluYXJ5KCcvJywgcmVzdWx0LCB0aGlzLnBhcnNlUHJlZml4KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJzZVByZWZpeCgpOiBBU1Qge1xuICAgIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJysnKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyc2VQcmVmaXgoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcignLScpKSB7XG4gICAgICByZXR1cm4gbmV3IEJpbmFyeSgnLScsIG5ldyBMaXRlcmFsUHJpbWl0aXZlKDApLCB0aGlzLnBhcnNlUHJlZml4KCkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKCchJykpIHtcbiAgICAgIHJldHVybiBuZXcgUHJlZml4Tm90KHRoaXMucGFyc2VQcmVmaXgoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlQ2FsbENoYWluKCk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VDYWxsQ2hhaW4oKTogQVNUIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5wYXJzZVByaW1hcnkoKTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJFBFUklPRCkpIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5wYXJzZUFjY2Vzc01lbWJlck9yTWV0aG9kQ2FsbChyZXN1bHQsIGZhbHNlKTtcblxuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJz8uJykpIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5wYXJzZUFjY2Vzc01lbWJlck9yTWV0aG9kQ2FsbChyZXN1bHQsIHRydWUpO1xuXG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJExCUkFDS0VUKSkge1xuICAgICAgICB2YXIga2V5ID0gdGhpcy5wYXJzZVBpcGUoKTtcbiAgICAgICAgdGhpcy5leHBlY3RDaGFyYWN0ZXIoJFJCUkFDS0VUKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcihcIj1cIikpIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnBhcnNlQ29uZGl0aW9uYWwoKTtcbiAgICAgICAgICByZXN1bHQgPSBuZXcgS2V5ZWRXcml0ZShyZXN1bHQsIGtleSwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCA9IG5ldyBLZXllZFJlYWQocmVzdWx0LCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkTFBBUkVOKSkge1xuICAgICAgICB2YXIgYXJncyA9IHRoaXMucGFyc2VDYWxsQXJndW1lbnRzKCk7XG4gICAgICAgIHRoaXMuZXhwZWN0Q2hhcmFjdGVyKCRSUEFSRU4pO1xuICAgICAgICByZXN1bHQgPSBuZXcgRnVuY3Rpb25DYWxsKHJlc3VsdCwgYXJncyk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGFyc2VQcmltYXJ5KCk6IEFTVCB7XG4gICAgaWYgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJExQQVJFTikpIHtcbiAgICAgIGxldCByZXN1bHQgPSB0aGlzLnBhcnNlUGlwZSgpO1xuICAgICAgdGhpcy5leHBlY3RDaGFyYWN0ZXIoJFJQQVJFTik7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0LmlzS2V5d29yZE51bGwoKSB8fCB0aGlzLm5leHQuaXNLZXl3b3JkVW5kZWZpbmVkKCkpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIG5ldyBMaXRlcmFsUHJpbWl0aXZlKG51bGwpO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLm5leHQuaXNLZXl3b3JkVHJ1ZSgpKSB7XG4gICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICAgIHJldHVybiBuZXcgTGl0ZXJhbFByaW1pdGl2ZSh0cnVlKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0LmlzS2V5d29yZEZhbHNlKCkpIHtcbiAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIG5ldyBMaXRlcmFsUHJpbWl0aXZlKGZhbHNlKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkTEJSQUNLRVQpKSB7XG4gICAgICB2YXIgZWxlbWVudHMgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbkxpc3QoJFJCUkFDS0VUKTtcbiAgICAgIHRoaXMuZXhwZWN0Q2hhcmFjdGVyKCRSQlJBQ0tFVCk7XG4gICAgICByZXR1cm4gbmV3IExpdGVyYWxBcnJheShlbGVtZW50cyk7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMubmV4dC5pc0NoYXJhY3RlcigkTEJSQUNFKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaXRlcmFsTWFwKCk7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMubmV4dC5pc0lkZW50aWZpZXIoKSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyc2VBY2Nlc3NNZW1iZXJPck1ldGhvZENhbGwoX2ltcGxpY2l0UmVjZWl2ZXIsIGZhbHNlKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5uZXh0LmlzTnVtYmVyKCkpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMubmV4dC50b051bWJlcigpO1xuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgICByZXR1cm4gbmV3IExpdGVyYWxQcmltaXRpdmUodmFsdWUpO1xuXG4gICAgfSBlbHNlIGlmICh0aGlzLm5leHQuaXNTdHJpbmcoKSkge1xuICAgICAgdmFyIGxpdGVyYWxWYWx1ZSA9IHRoaXMubmV4dC50b1N0cmluZygpO1xuICAgICAgdGhpcy5hZHZhbmNlKCk7XG4gICAgICByZXR1cm4gbmV3IExpdGVyYWxQcmltaXRpdmUobGl0ZXJhbFZhbHVlKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5pbmRleCA+PSB0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZXJyb3IoYFVuZXhwZWN0ZWQgZW5kIG9mIGV4cHJlc3Npb246ICR7dGhpcy5pbnB1dH1gKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVycm9yKGBVbmV4cGVjdGVkIHRva2VuICR7dGhpcy5uZXh0fWApO1xuICAgIH1cbiAgICAvLyBlcnJvcigpIHRocm93cywgc28gd2UgZG9uJ3QgcmVhY2ggaGVyZS5cbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIkZlbGwgdGhyb3VnaCBhbGwgY2FzZXMgaW4gcGFyc2VQcmltYXJ5XCIpO1xuICB9XG5cbiAgcGFyc2VFeHByZXNzaW9uTGlzdCh0ZXJtaW5hdG9yOiBudW1iZXIpOiBhbnlbXSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGlmICghdGhpcy5uZXh0LmlzQ2hhcmFjdGVyKHRlcm1pbmF0b3IpKSB7XG4gICAgICBkbyB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucGFyc2VQaXBlKCkpO1xuICAgICAgfSB3aGlsZSAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkQ09NTUEpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHBhcnNlTGl0ZXJhbE1hcCgpOiBMaXRlcmFsTWFwIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICB0aGlzLmV4cGVjdENoYXJhY3RlcigkTEJSQUNFKTtcbiAgICBpZiAoIXRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJFJCUkFDRSkpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgdmFyIGtleSA9IHRoaXMuZXhwZWN0SWRlbnRpZmllck9yS2V5d29yZE9yU3RyaW5nKCk7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICB0aGlzLmV4cGVjdENoYXJhY3RlcigkQ09MT04pO1xuICAgICAgICB2YWx1ZXMucHVzaCh0aGlzLnBhcnNlUGlwZSgpKTtcbiAgICAgIH0gd2hpbGUgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJENPTU1BKSk7XG4gICAgICB0aGlzLmV4cGVjdENoYXJhY3RlcigkUkJSQUNFKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBMaXRlcmFsTWFwKGtleXMsIHZhbHVlcyk7XG4gIH1cblxuICBwYXJzZUFjY2Vzc01lbWJlck9yTWV0aG9kQ2FsbChyZWNlaXZlcjogQVNULCBpc1NhZmU6IGJvb2xlYW4gPSBmYWxzZSk6IEFTVCB7XG4gICAgbGV0IGlkID0gdGhpcy5leHBlY3RJZGVudGlmaWVyT3JLZXl3b3JkKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkTFBBUkVOKSkge1xuICAgICAgbGV0IGFyZ3MgPSB0aGlzLnBhcnNlQ2FsbEFyZ3VtZW50cygpO1xuICAgICAgdGhpcy5leHBlY3RDaGFyYWN0ZXIoJFJQQVJFTik7XG4gICAgICBsZXQgZm4gPSB0aGlzLnJlZmxlY3Rvci5tZXRob2QoaWQpO1xuICAgICAgcmV0dXJuIGlzU2FmZSA/IG5ldyBTYWZlTWV0aG9kQ2FsbChyZWNlaXZlciwgaWQsIGZuLCBhcmdzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgbmV3IE1ldGhvZENhbGwocmVjZWl2ZXIsIGlkLCBmbiwgYXJncyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzU2FmZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKFwiPVwiKSkge1xuICAgICAgICAgIHRoaXMuZXJyb3IoXCJUaGUgJz8uJyBvcGVyYXRvciBjYW5ub3QgYmUgdXNlZCBpbiB0aGUgYXNzaWdubWVudFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFNhZmVQcm9wZXJ0eVJlYWQocmVjZWl2ZXIsIGlkLCB0aGlzLnJlZmxlY3Rvci5nZXR0ZXIoaWQpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uYWxPcGVyYXRvcihcIj1cIikpIHtcbiAgICAgICAgICBpZiAoIXRoaXMucGFyc2VBY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoXCJCaW5kaW5ncyBjYW5ub3QgY29udGFpbiBhc3NpZ25tZW50c1wiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnBhcnNlQ29uZGl0aW9uYWwoKTtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5V3JpdGUocmVjZWl2ZXIsIGlkLCB0aGlzLnJlZmxlY3Rvci5zZXR0ZXIoaWQpLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVJlYWQocmVjZWl2ZXIsIGlkLCB0aGlzLnJlZmxlY3Rvci5nZXR0ZXIoaWQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcGFyc2VDYWxsQXJndW1lbnRzKCk6IEJpbmRpbmdQaXBlW10ge1xuICAgIGlmICh0aGlzLm5leHQuaXNDaGFyYWN0ZXIoJFJQQVJFTikpIHJldHVybiBbXTtcbiAgICB2YXIgcG9zaXRpb25hbHMgPSBbXTtcbiAgICBkbyB7XG4gICAgICBwb3NpdGlvbmFscy5wdXNoKHRoaXMucGFyc2VQaXBlKCkpO1xuICAgIH0gd2hpbGUgKHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJENPTU1BKSk7XG4gICAgcmV0dXJuIHBvc2l0aW9uYWxzO1xuICB9XG5cbiAgcGFyc2VCbG9ja0NvbnRlbnQoKTogQVNUIHtcbiAgICBpZiAoIXRoaXMucGFyc2VBY3Rpb24pIHtcbiAgICAgIHRoaXMuZXJyb3IoXCJCaW5kaW5nIGV4cHJlc3Npb24gY2Fubm90IGNvbnRhaW4gY2hhaW5lZCBleHByZXNzaW9uXCIpO1xuICAgIH1cbiAgICB2YXIgZXhwcnMgPSBbXTtcbiAgICB3aGlsZSAodGhpcy5pbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aCAmJiAhdGhpcy5uZXh0LmlzQ2hhcmFjdGVyKCRSQlJBQ0UpKSB7XG4gICAgICB2YXIgZXhwciA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG4gICAgICBleHBycy5wdXNoKGV4cHIpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkU0VNSUNPTE9OKSkge1xuICAgICAgICB3aGlsZSAodGhpcy5vcHRpb25hbENoYXJhY3RlcigkU0VNSUNPTE9OKSkge1xuICAgICAgICB9ICAvLyByZWFkIGFsbCBzZW1pY29sb25zXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChleHBycy5sZW5ndGggPT0gMCkgcmV0dXJuIG5ldyBFbXB0eUV4cHIoKTtcbiAgICBpZiAoZXhwcnMubGVuZ3RoID09IDEpIHJldHVybiBleHByc1swXTtcblxuICAgIHJldHVybiBuZXcgQ2hhaW4oZXhwcnMpO1xuICB9XG5cblxuICAvKipcbiAgICogQW4gaWRlbnRpZmllciwgYSBrZXl3b3JkLCBhIHN0cmluZyB3aXRoIGFuIG9wdGlvbmFsIGAtYCBpbmJldHdlZW4uXG4gICAqL1xuICBleHBlY3RUZW1wbGF0ZUJpbmRpbmdLZXkoKTogc3RyaW5nIHtcbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgdmFyIG9wZXJhdG9yRm91bmQgPSBmYWxzZTtcbiAgICBkbyB7XG4gICAgICByZXN1bHQgKz0gdGhpcy5leHBlY3RJZGVudGlmaWVyT3JLZXl3b3JkT3JTdHJpbmcoKTtcbiAgICAgIG9wZXJhdG9yRm91bmQgPSB0aGlzLm9wdGlvbmFsT3BlcmF0b3IoJy0nKTtcbiAgICAgIGlmIChvcGVyYXRvckZvdW5kKSB7XG4gICAgICAgIHJlc3VsdCArPSAnLSc7XG4gICAgICB9XG4gICAgfSB3aGlsZSAob3BlcmF0b3JGb3VuZCk7XG5cbiAgICByZXR1cm4gcmVzdWx0LnRvU3RyaW5nKCk7XG4gIH1cblxuICBwYXJzZVRlbXBsYXRlQmluZGluZ3MoKTogYW55W10ge1xuICAgIHZhciBiaW5kaW5ncyA9IFtdO1xuICAgIHZhciBwcmVmaXggPSBudWxsO1xuICAgIHdoaWxlICh0aGlzLmluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICB2YXIga2V5SXNWYXI6IGJvb2xlYW4gPSB0aGlzLm9wdGlvbmFsS2V5d29yZFZhcigpO1xuICAgICAgdmFyIGtleSA9IHRoaXMuZXhwZWN0VGVtcGxhdGVCaW5kaW5nS2V5KCk7XG4gICAgICBpZiAoIWtleUlzVmFyKSB7XG4gICAgICAgIGlmIChwcmVmaXggPT0gbnVsbCkge1xuICAgICAgICAgIHByZWZpeCA9IGtleTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBrZXkgPSBwcmVmaXggKyBrZXlbMF0udG9VcHBlckNhc2UoKSArIGtleS5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMub3B0aW9uYWxDaGFyYWN0ZXIoJENPTE9OKTtcbiAgICAgIHZhciBuYW1lID0gbnVsbDtcbiAgICAgIHZhciBleHByZXNzaW9uID0gbnVsbDtcbiAgICAgIGlmIChrZXlJc1Zhcikge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25hbE9wZXJhdG9yKFwiPVwiKSkge1xuICAgICAgICAgIG5hbWUgPSB0aGlzLmV4cGVjdFRlbXBsYXRlQmluZGluZ0tleSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5hbWUgPSAnXFwkaW1wbGljaXQnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubmV4dCAhPT0gRU9GICYmICF0aGlzLnBlZWtLZXl3b3JkVmFyKCkpIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5pbnB1dEluZGV4O1xuICAgICAgICB2YXIgYXN0ID0gdGhpcy5wYXJzZVBpcGUoKTtcbiAgICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuaW5wdXQuc3Vic3RyaW5nKHN0YXJ0LCB0aGlzLmlucHV0SW5kZXgpO1xuICAgICAgICBleHByZXNzaW9uID0gbmV3IEFTVFdpdGhTb3VyY2UoYXN0LCBzb3VyY2UsIHRoaXMubG9jYXRpb24pO1xuICAgICAgfVxuICAgICAgYmluZGluZ3MucHVzaChuZXcgVGVtcGxhdGVCaW5kaW5nKGtleSwga2V5SXNWYXIsIG5hbWUsIGV4cHJlc3Npb24pKTtcbiAgICAgIGlmICghdGhpcy5vcHRpb25hbENoYXJhY3RlcigkU0VNSUNPTE9OKSkge1xuICAgICAgICB0aGlzLm9wdGlvbmFsQ2hhcmFjdGVyKCRDT01NQSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBiaW5kaW5ncztcbiAgfVxuXG4gIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgaW5kZXg6IG51bWJlciA9IG51bGwpIHtcbiAgICBpZiAoaXNCbGFuayhpbmRleCkpIGluZGV4ID0gdGhpcy5pbmRleDtcblxuICAgIHZhciBsb2NhdGlvbiA9IChpbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aCkgPyBgYXQgY29sdW1uICR7dGhpcy50b2tlbnNbaW5kZXhdLmluZGV4ICsgMX0gaW5gIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGF0IHRoZSBlbmQgb2YgdGhlIGV4cHJlc3Npb25gO1xuXG4gICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uKG1lc3NhZ2UsIHRoaXMuaW5wdXQsIGxvY2F0aW9uLCB0aGlzLmxvY2F0aW9uKTtcbiAgfVxufVxuXG5jbGFzcyBTaW1wbGVFeHByZXNzaW9uQ2hlY2tlciBpbXBsZW1lbnRzIEFzdFZpc2l0b3Ige1xuICBzdGF0aWMgY2hlY2soYXN0OiBBU1QpOiBib29sZWFuIHtcbiAgICB2YXIgcyA9IG5ldyBTaW1wbGVFeHByZXNzaW9uQ2hlY2tlcigpO1xuICAgIGFzdC52aXNpdChzKTtcbiAgICByZXR1cm4gcy5zaW1wbGU7XG4gIH1cblxuICBzaW1wbGUgPSB0cnVlO1xuXG4gIHZpc2l0SW1wbGljaXRSZWNlaXZlcihhc3Q6IEltcGxpY2l0UmVjZWl2ZXIpIHt9XG5cbiAgdmlzaXRJbnRlcnBvbGF0aW9uKGFzdDogSW50ZXJwb2xhdGlvbikgeyB0aGlzLnNpbXBsZSA9IGZhbHNlOyB9XG5cbiAgdmlzaXRMaXRlcmFsUHJpbWl0aXZlKGFzdDogTGl0ZXJhbFByaW1pdGl2ZSkge31cblxuICB2aXNpdFByb3BlcnR5UmVhZChhc3Q6IFByb3BlcnR5UmVhZCkge31cblxuICB2aXNpdFByb3BlcnR5V3JpdGUoYXN0OiBQcm9wZXJ0eVdyaXRlKSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdFNhZmVQcm9wZXJ0eVJlYWQoYXN0OiBTYWZlUHJvcGVydHlSZWFkKSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdE1ldGhvZENhbGwoYXN0OiBNZXRob2RDYWxsKSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdFNhZmVNZXRob2RDYWxsKGFzdDogU2FmZU1ldGhvZENhbGwpIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0RnVuY3Rpb25DYWxsKGFzdDogRnVuY3Rpb25DYWxsKSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IExpdGVyYWxBcnJheSkgeyB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucyk7IH1cblxuICB2aXNpdExpdGVyYWxNYXAoYXN0OiBMaXRlcmFsTWFwKSB7IHRoaXMudmlzaXRBbGwoYXN0LnZhbHVlcyk7IH1cblxuICB2aXNpdEJpbmFyeShhc3Q6IEJpbmFyeSkgeyB0aGlzLnNpbXBsZSA9IGZhbHNlOyB9XG5cbiAgdmlzaXRQcmVmaXhOb3QoYXN0OiBQcmVmaXhOb3QpIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0Q29uZGl0aW9uYWwoYXN0OiBDb25kaXRpb25hbCkgeyB0aGlzLnNpbXBsZSA9IGZhbHNlOyB9XG5cbiAgdmlzaXRQaXBlKGFzdDogQmluZGluZ1BpcGUpIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0S2V5ZWRSZWFkKGFzdDogS2V5ZWRSZWFkKSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdEtleWVkV3JpdGUoYXN0OiBLZXllZFdyaXRlKSB7IHRoaXMuc2ltcGxlID0gZmFsc2U7IH1cblxuICB2aXNpdEFsbChhc3RzOiBhbnlbXSk6IGFueVtdIHtcbiAgICB2YXIgcmVzID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKGFzdHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFzdHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHJlc1tpXSA9IGFzdHNbaV0udmlzaXQodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICB2aXNpdENoYWluKGFzdDogQ2hhaW4pIHsgdGhpcy5zaW1wbGUgPSBmYWxzZTsgfVxuXG4gIHZpc2l0UXVvdGUoYXN0OiBRdW90ZSkgeyB0aGlzLnNpbXBsZSA9IGZhbHNlOyB9XG59XG4iXX0=