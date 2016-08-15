import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORMAT_PROVIDERS} from './Format';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';

export class DataType{
    public Type: string;
    public Parameters: string;
    public Input: string;
    public Output: string;
    
    constructor(Type: string, Parameters: string, Input: string, Output: string) {
        this.Type = Type;
        this.Parameters = Parameters;
        this.Input = Input;
        this.Output = Output;
    }
}

@Component({
  templateUrl: "pipes/Format/Format.demo.html",
    directives: [CORE_DIRECTIVES, CodeHighlighter, TableSortable, TAB_PROVIDERS],
    pipes: [FORMAT_PROVIDERS]
})
export class FormatDemo {
    htmlCodeExample = `&lt;span&gt;{{someVar | format : "number : 1.0-2"}}&lt;/span&gt;
&lt;span&gt;{{someTimestamp | format : "dateTime : MMM d, y h:mm:ss a"}}&lt;/span&gt;`;

    someNumberVar: string = '435.23528';
    someTimestamp: number = 1442187616000;
    
    parameters:Attribute[] = [
        new Attribute('Name', 'string', 'text', 'The type of data you want the input to be output as'),
    ];
    parametersColumns:TableSortableColumn[] = AttributeColumns;
    parametersSort:TableSortableSorting = AttributesDefaultSort;
    
    dataTypes:DataType[] = [
        new DataType('date', "true - format of date - default: 'MMM d, y h:mm:ss a'", '"1442187616000"', 'Sep 13, 2015, 7:40:16 PM'),
        new DataType('datetime', "true - format of date - default: 'MMM d, y h:mm:ss a'", '"1442187616000"', 'Sep 13, 2015, 7:40:16 PM'),
        new DataType('decimal', "true - number formatting - default: '1.0-0'", '"1442187616000"', '1442187616000'),
        new DataType('html', 'false', '"&lt;a href=&quot;http://fueltravel.com&quot; target=&quot;_blank&quot;&gt;Fuel Travel&lt;/a&gt;"', '<a href="http://fueltravel.com" target="_blank">Fuel Travel</a>'),
        new DataType('number', "true - number formatting - default: '1.0-0'", '"1442187616000"', '1442187616000'),
        new DataType('percentage', "true - number formatting - default: '1.0-0'", '"1442187616000"', '"1442187616000%"'),
        new DataType('text', 'false', '"&lt;a href=&quot;http://fueltravel.com&quot; target=&quot;_blank&quot;&gt;Fuel Travel&lt;/a&gt;"', '"&lt;a href=&quot;http://fueltravel.com&quot; target=&quot;_blank&quot;&gt;Fuel Travel&lt;/a&gt;"')
    ];
    dataTypesColumns:TableSortableColumn[] = [
        new TableSortableColumn('Type', 'Type', 'string'),
        new TableSortableColumn('Parameters?', 'Parameters', 'html'), 
        new TableSortableColumn('Input', 'Input', 'html'), 
        new TableSortableColumn('Output', 'Output', 'html'),
    ];
    dataTypesSort:TableSortableSorting = new TableSortableSorting('Type', false);
}

export var FORMAT_DEMO_PROVIDERS = [
    FormatDemo
];