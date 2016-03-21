import { ParseError } from 'angular2/src/compiler/parse_util';
import { HtmlElementAst, HtmlCommentAst, htmlVisitAll } from 'angular2/src/compiler/html_ast';
import { isPresent, isBlank } from 'angular2/src/facade/lang';
import { StringMapWrapper } from 'angular2/src/facade/collection';
import { Message, id } from './message';
const I18N_ATTR = "i18n";
const I18N_ATTR_PREFIX = "i18n-";
/**
 * All messages extracted from a template.
 */
export class ExtractionResult {
    constructor(messages, errors) {
        this.messages = messages;
        this.errors = errors;
    }
}
/**
 * An extraction error.
 */
export class I18nExtractionError extends ParseError {
    constructor(span, msg) {
        super(span, msg);
    }
}
/**
 * Removes duplicate messages.
 *
 * E.g.
 *
 * ```
 *  var m = [new Message("message", "meaning", "desc1"), new Message("message", "meaning",
 * "desc2")];
 *  expect(removeDuplicates(m)).toEqual([new Message("message", "meaning", "desc1")]);
 * ```
 */
export function removeDuplicates(messages) {
    let uniq = {};
    messages.forEach(m => {
        if (!StringMapWrapper.contains(uniq, id(m))) {
            uniq[id(m)] = m;
        }
    });
    return StringMapWrapper.values(uniq);
}
/**
 * Extracts all messages from a template.
 *
 * It works like this. First, the extractor uses the provided html parser to get
 * the html AST of the template. Then it partitions the root nodes into parts.
 * Everything between two i18n comments becomes a single part. Every other nodes becomes
 * a part too.
 *
 * We process every part as follows. Say we have a part A.
 *
 * If the part has the i18n attribute, it gets converted into a message.
 * And we do not recurse into that part, except to extract messages from the attributes.
 *
 * If the part doesn't have the i18n attribute, we recurse into that part and
 * partition its children.
 *
 * While walking the AST we also remove i18n attributes from messages.
 */
export class MessageExtractor {
    constructor(_htmlParser, _parser) {
        this._htmlParser = _htmlParser;
        this._parser = _parser;
    }
    extract(template, sourceUrl) {
        this.messages = [];
        this.errors = [];
        let res = this._htmlParser.parse(template, sourceUrl);
        if (res.errors.length > 0) {
            return new ExtractionResult([], res.errors);
        }
        else {
            let ps = this._partition(res.rootNodes);
            ps.forEach(p => this._extractMessagesFromPart(p));
            return new ExtractionResult(this.messages, this.errors);
        }
    }
    _extractMessagesFromPart(p) {
        if (p.hasI18n) {
            this.messages.push(new Message(_stringifyNodes(p.children, this._parser), _meaning(p.i18n), _description(p.i18n)));
            this._recurseToExtractMessagesFromAttributes(p.children);
        }
        else {
            this._recurse(p.children);
        }
        if (isPresent(p.rootElement)) {
            this._extractMessagesFromAttributes(p.rootElement);
        }
    }
    _recurse(nodes) {
        let ps = this._partition(nodes);
        ps.forEach(p => this._extractMessagesFromPart(p));
    }
    _recurseToExtractMessagesFromAttributes(nodes) {
        nodes.forEach(n => {
            if (n instanceof HtmlElementAst) {
                this._extractMessagesFromAttributes(n);
                this._recurseToExtractMessagesFromAttributes(n.children);
            }
        });
    }
    _extractMessagesFromAttributes(p) {
        p.attrs.forEach(attr => {
            if (attr.name.startsWith(I18N_ATTR_PREFIX)) {
                let expectedName = attr.name.substring(5);
                let matching = p.attrs.filter(a => a.name == expectedName);
                if (matching.length > 0) {
                    let value = _removeInterpolation(matching[0].value, p.sourceSpan, this._parser);
                    this.messages.push(new Message(value, _meaning(attr.value), _description(attr.value)));
                }
                else {
                    this.errors.push(new I18nExtractionError(p.sourceSpan, `Missing attribute '${expectedName}'.`));
                }
            }
        });
    }
    // Man, this is so ugly!
    _partition(nodes) {
        let res = [];
        for (let i = 0; i < nodes.length; ++i) {
            let n = nodes[i];
            let temp = [];
            if (_isOpeningComment(n)) {
                let i18n = n.value.substring(5).trim();
                i++;
                while (!_isClosingComment(nodes[i])) {
                    temp.push(nodes[i++]);
                    if (i === nodes.length) {
                        this.errors.push(new I18nExtractionError(n.sourceSpan, "Missing closing 'i18n' comment."));
                        break;
                    }
                }
                res.push(new _Part(null, temp, i18n, true));
            }
            else if (n instanceof HtmlElementAst) {
                let i18n = _findI18nAttr(n);
                res.push(new _Part(n, n.children, isPresent(i18n) ? i18n.value : null, isPresent(i18n)));
            }
        }
        return res;
    }
}
class _Part {
    constructor(rootElement, children, i18n, hasI18n) {
        this.rootElement = rootElement;
        this.children = children;
        this.i18n = i18n;
        this.hasI18n = hasI18n;
    }
}
function _isOpeningComment(n) {
    return n instanceof HtmlCommentAst && isPresent(n.value) && n.value.startsWith("i18n:");
}
function _isClosingComment(n) {
    return n instanceof HtmlCommentAst && isPresent(n.value) && n.value == "/i18n";
}
function _stringifyNodes(nodes, parser) {
    let visitor = new _StringifyVisitor(parser);
    return htmlVisitAll(visitor, nodes).join("");
}
class _StringifyVisitor {
    constructor(_parser) {
        this._parser = _parser;
    }
    visitElement(ast, context) {
        let attrs = this._join(htmlVisitAll(this, ast.attrs), " ");
        let children = this._join(htmlVisitAll(this, ast.children), "");
        return `<${ast.name} ${attrs}>${children}</${ast.name}>`;
    }
    visitAttr(ast, context) {
        if (ast.name.startsWith(I18N_ATTR_PREFIX)) {
            return "";
        }
        else {
            return `${ast.name}="${ast.value}"`;
        }
    }
    visitText(ast, context) {
        return _removeInterpolation(ast.value, ast.sourceSpan, this._parser);
    }
    visitComment(ast, context) { return ""; }
    _join(strs, str) {
        return strs.filter(s => s.length > 0).join(str);
    }
}
function _removeInterpolation(value, source, parser) {
    try {
        let parsed = parser.parseInterpolation(value, source.toString());
        if (isPresent(parsed)) {
            let ast = parsed.ast;
            let res = "";
            for (let i = 0; i < ast.strings.length; ++i) {
                res += ast.strings[i];
                if (i != ast.strings.length - 1) {
                    res += `{{I${i}}}`;
                }
            }
            return res;
        }
        else {
            return value;
        }
    }
    catch (e) {
        return value;
    }
}
function _findI18nAttr(p) {
    let i18n = p.attrs.filter(a => a.name == I18N_ATTR);
    return i18n.length == 0 ? null : i18n[0];
}
function _meaning(i18n) {
    if (isBlank(i18n) || i18n == "")
        return null;
    return i18n.split("|")[0];
}
function _description(i18n) {
    if (isBlank(i18n) || i18n == "")
        return null;
    let parts = i18n.split("|");
    return parts.length > 1 ? parts[1] : null;
}
