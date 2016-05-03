import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {StringHelper} from '../../utilities/StringUtils';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform  {
  
  datePipe: DatePipe = new DatePipe();
  decimalPipe: DecimalPipe = new DecimalPipe();
  
  constructor(){}
  
  transform(input:string, args:any): any {
    var format = '';
    var parsedFloat = 0;
    var pipeArgs = args.split(':');
    for(var i = 0; i < pipeArgs.length; i++){
      pipeArgs[i] = pipeArgs[i].trim(' ');
    }
    
    //Escape all html if not explicitly set
    if(pipeArgs[0].toLowerCase() !== 'html')
        input = StringHelper.escapeHtml(input);
    
    switch(pipeArgs[0].toLowerCase()) {
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
        if(pipeArgs.length > 1)
        {
            format = '';
            for(var i = 1; i < pipeArgs.length; i++){
                format += pipeArgs[i];
            }
        }
        return this.datePipe.transform(date, format);
      default:
        return input;
    }
  }
}

export var FORMAT_PROVIDERS = [
    FormatPipe
];