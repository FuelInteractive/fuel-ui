import { HtmlParser } from 'angular2/src/compiler/html_parser';
import { ParseSourceSpan, ParseError } from 'angular2/src/compiler/parse_util';
import { Parser } from 'angular2/src/core/change_detection/parser/parser';
import { Message } from './message';
/**
 * All messages extracted from a template.
 */
export declare class ExtractionResult {
    messages: Message[];
    errors: ParseError[];
    constructor(messages: Message[], errors: ParseError[]);
}
/**
 * An extraction error.
 */
export declare class I18nExtractionError extends ParseError {
    constructor(span: ParseSourceSpan, msg: string);
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
export declare function removeDuplicates(messages: Message[]): Message[];
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
export declare class MessageExtractor {
    private _htmlParser;
    private _parser;
    messages: Message[];
    errors: ParseError[];
    constructor(_htmlParser: HtmlParser, _parser: Parser);
    extract(template: string, sourceUrl: string): ExtractionResult;
    private _extractMessagesFromPart(p);
    private _recurse(nodes);
    private _recurseToExtractMessagesFromAttributes(nodes);
    private _extractMessagesFromAttributes(p);
    private _partition(nodes);
}
