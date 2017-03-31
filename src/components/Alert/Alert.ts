import {NgModule, ViewEncapsulation, Component, ElementRef, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'alert',
    templateUrl: 'Alert.html',
    styleUrls: ['Alert.css'],
    encapsulation: ViewEncapsulation.None
})
export class Alert implements OnChanges {
    @Input() displayed: boolean = false;
    @Input() closeButton: boolean = true;
    @Input() type: string = 'success';
    @Input() closeDelay: number = 0;
    @Output() displayedChange = new EventEmitter<any>();

    constructor(private _el:ElementRef){}

    ngOnChanges(event: any): void {
        if(this.displayed && this._el.nativeElement.querySelector('.alert')){
            let classes = this._el.nativeElement.querySelector('.alert').className;
            classes = classes.replace('fuel-ui-alert-fade-out', 'fuel-ui-alert-fade-in');
            this._el.nativeElement.querySelector('.alert').className = classes;
        }

        if(this.closeDelay > 0) {
            setTimeout(() => {
                this.close();
            }, this.closeDelay);
        }
    }

    close():void{
        if(this._el.nativeElement.querySelector('.alert')){
            let classes = this._el.nativeElement.querySelector('.alert').className;
            classes = classes.replace('fuel-ui-alert-fade-in', 'fuel-ui-alert-fade-out');
            this._el.nativeElement.querySelector('.alert').className = classes;
        }
        setTimeout(() => {
            this.displayed = false;
            this.displayedChange.next(null);
        }, 1000);
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [Alert],
    exports: [Alert]
})
export class FuiAlertModule { }
