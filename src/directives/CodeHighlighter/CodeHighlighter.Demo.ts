import {Component} from '@angular/core';
import {CodeHighlighter} from './CodeHighlighter';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

@Component({
  templateUrl: "directives/CodeHighlighter/CodeHighlighter.Demo.html",
        directives: [CodeHighlighter, TAB_PROVIDERS]
})
export class CodeHighlighterDemo {
    
}

export var CODEHIGHLIGHTER_DEMO_PROVIDERS = [
    CodeHighlighterDemo
];