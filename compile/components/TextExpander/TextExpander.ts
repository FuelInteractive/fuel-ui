import {NgModule, Component, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule, SlicePipe} from '@angular/common';

@Component({
    selector: 'text-expander',
    templateUrl: 'TextExpander.html',
    pipes: [SlicePipe]
})
export class TextExpander {
    @Input() expanded: boolean = false;
    @Input() ellipsis: boolean = true;
    @Input() text: string = null;
    @Input() characters: number = 50;
    @Input() words: number = 0;
    @Input() expandText: string = "show more";
    @Input() shrinkText: string = "show less";
    @Output() expandedChange = new EventEmitter<any>()

    toggleExpand(): void{
        this.expanded = !this.expanded;
        this.expandedChange.next(this.expanded);
    }

    amountOfCharacters(): number{
        if(this.words > 0)
            return this.getCharactersUpToNumberOfWords(this.words);
            
        return this.characters;
    }

    getCharactersUpToNumberOfWords(words: number): number{
        //make copy of text to remove multiple spaces between words
        let textCopy = this.text;
        textCopy = textCopy.replace(/(^\s*)|(\s*$)/gi,"");
        textCopy = textCopy.replace(/[ ]{2,}/gi," ");
        textCopy = textCopy.replace(/\n /,"\n");

        //get all words of new string
        let wordsArr = textCopy.split(' ');

        //show the entire text if requested words is higher or equal to actual
        if(words >= wordsArr.length - 1) 
            return this.text.length;

        //split array up to the number of words needed
        wordsArr = wordsArr.splice(0, words);

        //get the last word that will be showing
        let lastWordToShow = wordsArr[wordsArr.length - 1];

        //find the number of times that word is in the new array
        let occurencesOfLastWord = wordsArr.filter((str) => {return str === lastWordToShow}).length;
        
        //word only shows once so get the location in original text and add the length of the word
        if(occurencesOfLastWord == 1)
            return this.text.split(lastWordToShow)[0].length + lastWordToShow.length;
        
        //loop over each occurence of the last word and sum up characters
        let charactersUntilLastWord = 0;
        for(let i = 0; i < occurencesOfLastWord; i++){
            charactersUntilLastWord += this.text.split(lastWordToShow)[i].length;
        }

        return charactersUntilLastWord + lastWordToShow.length;
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [TextExpander],
    exports: [TextExpander]
})
export class FuiTextExpanderModule { }