"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var TextExpander = (function () {
    function TextExpander() {
        this.expanded = false;
        this.ellipsis = true;
        this.text = null;
        this.characters = 50;
        this.words = 0;
        this.expandText = "show more";
        this.shrinkText = "show less";
        this.expandedChange = new core_1.EventEmitter();
    }
    TextExpander.prototype.toggleExpand = function () {
        this.expanded = !this.expanded;
        this.expandedChange.next(this.expanded);
    };
    TextExpander.prototype.amountOfCharacters = function () {
        if (this.words > 0)
            return this.getCharactersUpToNumberOfWords(this.words);
        return this.characters;
    };
    TextExpander.prototype.getCharactersUpToNumberOfWords = function (words) {
        //make copy of text to remove multiple spaces between words
        var textCopy = this.text;
        textCopy = textCopy.replace(/(^\s*)|(\s*$)/gi, "");
        textCopy = textCopy.replace(/[ ]{2,}/gi, " ");
        textCopy = textCopy.replace(/\n /, "\n");
        //get all words of new string
        var wordsArr = textCopy.split(' ');
        //show the entire text if requested words is higher or equal to actual
        if (words >= wordsArr.length - 1)
            return this.text.length;
        //split array up to the number of words needed
        wordsArr = wordsArr.splice(0, words);
        //get the last word that will be showing
        var lastWordToShow = wordsArr[wordsArr.length - 1];
        //find the number of times that word is in the new array
        var occurencesOfLastWord = wordsArr.filter(function (str) { return str === lastWordToShow; }).length;
        //word only shows once so get the location in original text and add the length of the word
        if (occurencesOfLastWord == 1)
            return this.text.split(lastWordToShow)[0].length + lastWordToShow.length;
        //loop over each occurence of the last word and sum up characters
        var charactersUntilLastWord = 0;
        for (var i = 0; i < occurencesOfLastWord; i++) {
            charactersUntilLastWord += this.text.split(lastWordToShow)[i].length;
        }
        return charactersUntilLastWord + lastWordToShow.length;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TextExpander.prototype, "expanded", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TextExpander.prototype, "ellipsis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TextExpander.prototype, "text", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TextExpander.prototype, "characters", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TextExpander.prototype, "words", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TextExpander.prototype, "expandText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TextExpander.prototype, "shrinkText", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TextExpander.prototype, "expandedChange", void 0);
    TextExpander = __decorate([
        core_1.Component({
            selector: 'text-expander',
            template: "\n      <span *ngIf=\"text\">\n          {{text | slice : 0 : (expanded ? text.length : amountOfCharacters())}}\n          <span *ngIf=\"!expanded && text.length > amountOfCharacters()\">\n              <span *ngIf=\"ellipsis\">&hellip;</span>\n              <a href=\"javascript:void(8);\" (click)=\"toggleExpand()\">\n                  {{expandText}}\n              </a>\n          </span>\n          <span *ngIf=\"expanded && text.length > amountOfCharacters()\">\n              <a href=\"javascript:void(8);\" (click)=\"toggleExpand()\">\n                  {{shrinkText}}\n              </a>\n          </span>\n      </span>\n    ",
            directives: [common_1.CORE_DIRECTIVES],
            pipes: [common_1.SlicePipe]
        }), 
        __metadata('design:paramtypes', [])
    ], TextExpander);
    return TextExpander;
}());
exports.TextExpander = TextExpander;
exports.TEXTEXPANDER_PROVIDERS = [
    TextExpander
];

//# sourceMappingURL=TextExpander.js.map
