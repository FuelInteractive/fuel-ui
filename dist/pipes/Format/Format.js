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
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var StringUtils_1 = require('../../utilities/StringUtils');
var FormatPipe = (function () {
    function FormatPipe() {
        this.datePipe = new common_1.DatePipe();
        this.decimalPipe = new common_1.DecimalPipe();
    }
    FormatPipe.prototype.transform = function (input, args) {
        var format = '';
        var parsedFloat = 0;
        var pipeArgs = args.split(':');
        for (var i = 0; i < pipeArgs.length; i++) {
            pipeArgs[i] = pipeArgs[i].trim(' ');
        }
        //Escape all html if not explicitly set
        if (pipeArgs[0].toLowerCase() !== 'html')
            input = StringUtils_1.StringHelper.escapeHtml(input);
        switch (pipeArgs[0].toLowerCase()) {
            case 'text':
                return input;
            case 'decimal':
            case 'number':
                parsedFloat = !isNaN(parseFloat(input)) ? parseFloat(input) : 0;
                format = pipeArgs.length > 1 ? pipeArgs[1] : null;
                return this.decimalPipe.transform(parsedFloat, format);
            case 'percentage':
                parsedFloat = !isNaN(parseFloat(input)) ? parseFloat(input) : 0;
                format = pipeArgs.length > 1 ? pipeArgs[1] : null;
                return this.decimalPipe.transform(parsedFloat, format) + '%';
            case 'date':
            case 'datetime':
                var date = !isNaN(parseInt(input)) ? parseInt(input) : new Date(input);
                format = 'MMM d, y h:mm:ss a';
                if (pipeArgs.length > 1) {
                    format = '';
                    for (var i = 1; i < pipeArgs.length; i++) {
                        format += pipeArgs[i];
                    }
                }
                return this.datePipe.transform(date, format);
            default:
                return input;
        }
    };
    FormatPipe = __decorate([
        core_1.Pipe({
            name: 'format'
        }), 
        __metadata('design:paramtypes', [])
    ], FormatPipe);
    return FormatPipe;
}());
exports.FormatPipe = FormatPipe;
exports.FORMAT_PROVIDERS = [
    FormatPipe
];

//# sourceMappingURL=Format.js.map
