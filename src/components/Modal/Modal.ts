import {Component, View, CORE_DIRECTIVES, ElementRef, Input, Output, EventEmitter, OnInit} from 'angular2/angular2';
import {AnimationListener} from "../../directives/Animation/AnimationListener";
import {Range} from "../../pipes/Range/Range";

@Component({
	selector: 'modal',
	host:{
		'(click)': 'clickElement($event)'
	}
})
@View({
	styleUrls: ['components/Modal/Modal.css'],
	templateUrl: 'components/Modal/Modal.html',
	directives: [CORE_DIRECTIVES, AnimationListener],
	pipes: [Range]
})
export class Modal {
	private _el:HTMLElement;
	displayed: boolean = false;
	@Input() closeOnUnfocus:boolean = true;
	@Input() closeButton:boolean = true;
    @Input() modalTitle:string = '';

	constructor(el: ElementRef) {
        this._el = el.nativeElement;
    }

	clickElement(e: any){
		if(this.closeOnUnfocus){
			if(e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')
				this.showModal(false);
		}
	}

	getElement(): HTMLElement{
		return this._el;
	}

	showModal(isDisplayed: boolean): boolean {
		var body = document.body;

		if(isDisplayed === undefined){
			this.displayed = !this.displayed;
		}
		else{
			this.displayed = isDisplayed;
		}

		if(this.displayed){
			body.classList.add('modal-open');
		}
		else{
			body.classList.remove('modal-open');

			if(this.closeOnUnfocus){
				this._el.childNodes[0].removeEventListener('click', (e: Event) => {
					if(e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')
						this.showModal(false);
				});
			}
		}

		return false;
	}
}

export var MODAL_PROVIDERS = [
	Modal
];