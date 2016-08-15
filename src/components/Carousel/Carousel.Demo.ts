import {Component} from '@angular/core';
import {CodeHighlighter} from '../../directives/CodeHighlighter/CodeHighlighter';
import {TAB_PROVIDERS} from '../../components/Tab/Tab';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "components/carousel/carousel.demo.html"
})
export class CarouselDemo {
    carouselImages: string[] = [
        "images/carouselImages/beach.png",
        "images/carouselImages/river.jpg",
        "images/carouselImages/windmill.jpg"
    ];
    
    attributes:any[] = [
        new Attribute('interval', 'number', '0', 'Time in ms before auto-advancing slide. If set to 0 slides will not auto-advance')
    ];
    
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}