import {Component, View, CORE_DIRECTIVES, ElementRef, Input, Output, EventEmitter, SlicePipe, OnChanges} from 'angular2/angular2';
import {Range} from '../../pipes/Range/Range';

@Component({
    selector: 'pagination',
    properties: [
        "totalPages: total-pages",
        "pagesAtOnce: pages-at-once"
    ]
})
@View({
    styleUrls: ['components/Pagination/Pagination.css'],
    templateUrl: 'components/Pagination/Pagination.html',
    directives: [CORE_DIRECTIVES],
    pipes: [SlicePipe, Range]
})
export class Pagination implements OnChanges {
    private _el:HTMLElement;
    @Input() currentPage: number;
    @Input() pagesAtOnce: number;
    @Input() totalPages: number;
    @Output() currentPageChange = new EventEmitter<any>();
    pagesBlank:Array<number> = [];
    startingIndex:number;
    endingIndex:number;

    constructor(el: ElementRef){
        this._el = el.nativeElement;
    }

    ngOnChanges(changes:any):void{
        this.setPage(this.currentPage);
    }

    getElement(): HTMLElement{
        return this._el;
    }

    setPage(newPage:number):void{
        if(newPage < 1 || newPage > this.totalPages) return;

        this.currentPage = newPage;

        //Shift pagination stuffs
        if(this.currentPage - Math.ceil(this.pagesAtOnce / 2) < 0 || this.totalPages - this.pagesAtOnce <= 0){
            this.startingIndex = 0;
            this.endingIndex = this.pagesAtOnce;

            console.log('start', this.startingIndex, this.endingIndex);
        }
        else if(this.totalPages - this.currentPage <= this.pagesAtOnce - Math.ceil(this.pagesAtOnce / 2)){
            this.startingIndex = this.totalPages - this.pagesAtOnce;
            this.endingIndex = this.totalPages;

            console.log('end', this.startingIndex, this.endingIndex);
        }
        else{
            this.startingIndex = this.currentPage - Math.ceil(this.pagesAtOnce / 2);
            this.endingIndex = this.startingIndex + this.pagesAtOnce < this.totalPages
                                ? this.startingIndex + this.pagesAtOnce
                                : this.totalPages;

            console.log('maths', this.startingIndex, this.endingIndex);
        }

        this.currentPageChange.next(this.currentPage);
    }
}

export var PAGINATION_PROVIDERS = [
    Pagination
];