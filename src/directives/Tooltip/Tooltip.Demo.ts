import {Component} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "directives/Tooltip/Tooltip.Demo.html"
})
export class TooltipDemo {
    codeExample1 = `&lt;a href=&quot;#&quot; tooltip=&quot;Tooltip text goes here.&quot; 
    [position]=&quot;position&quot; [color]=&quot;color&quot; [size]=&quot;size&quot;
    [rounded]=&quot;rounded&quot; [always]=&quot;always&quot;&gt;
    Some text here.
&lt;/a&gt;

&lt;div class=&quot;col-md-4 form-group&quot;&gt;
    &lt;div tooltip=&quot;You have entered: {{tooltipText}}!&quot; 
                [position]=&quot;position&quot; [color]=&quot;color&quot; [size]=&quot;size&quot;
                [rounded]=&quot;rounded&quot; [always]=&quot;always&quot;&gt;
        &lt;input [(ngModel)]=&quot;tooltipText&quot; type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Tooltip text&quot; /&gt; 
    &lt;/div&gt;
    &lt;small class=&quot;text-muted&quot;&gt;Enter text above, then hover the input.&lt;/small&gt;
&lt;/div&gt;`;

    attributes:Attribute[] = [
        new Attribute('tooltip', 'string', 'null', 'Text of the tooltip'),
        new Attribute('position', 'string', 'top', "Position of the tooltip compared to the element. Allows for: 'bottom-right', 'bottom', 'bottom-left', 'right', 'left', 'top-right,' 'top', or 'top-left'"),
        new Attribute('color', 'string', 'none', "Color of tooltip. Allows for: 'error', 'info', 'success', and 'warning'. Using anything else, include 'none', will result in the default black background with white text"),
        new Attribute('rounded', 'boolean', 'false', 'Rounded edges of tooltip'),
        new Attribute('always', 'boolean', 'false', 'Tooltip always displays even on mouseout and unfocus'),
        new Attribute('size', 'string', 'auto', "Forced size of the tooltip. Allows for: 'small', 'medium', and 'large'. Anything else will cause the tooltip to shrink to fit, and stay on a single line."),
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
    position: string = "top";
    color: string = "none";
    size: string = "auto";
    rounded: boolean = false;
    always: boolean = false;
}