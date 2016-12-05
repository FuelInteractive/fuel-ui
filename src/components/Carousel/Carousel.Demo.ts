import {Component} from '@angular/core';
import {TableSortableColumn, TableSortableSorting} from '../../components/TableSortable/TableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';

@Component({
  templateUrl: "Carousel.Demo.html"
})
export class CarouselDemo {
    carouselImages: string[] = [
        "https://placeimg.com/640/300/any",
        "https://placeimg.com/640/300/any",
        "https://placeimg.com/640/300/any"
    ];

    attributes:any[] = [
        new Attribute('interval', 'number', '300', 'Time in ms before auto-advancing slide. If set to 0 slides will not auto-advance'),
        new Attribute('height', 'number', '0', 'Height of carousel in pixels')
    ];

    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}
