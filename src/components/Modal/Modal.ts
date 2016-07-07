import {Component, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Animation} from "../../directives/Animation/Animation";

@Component({
	selector: 'modal',
	host:{
		'(click)': 'clickElement($event)'
	},
	templateUrl: 'components/Modal/Modal.html',
	directives: [CORE_DIRECTIVES, Animation]
})
export class Modal {
	private _el:HTMLElement;
	displayed: boolean = false;
	@Input() closeOnUnfocus:boolean = true;
	@Input() closeButton:boolean = true;
    @Input() modalTitle:string = '';
    @Input() size:string = '';
	@Output() close:EventEmitter<any> = new EventEmitter<any>();
	@Output() open:EventEmitter<any> = new EventEmitter<any>();

	constructor(el: ElementRef) {
        this._el = el.nativeElement;
    }

	clickElement(e: any){
		if(this.closeOnUnfocus){
			if((e.target && (e.target.className == 'modal customFadeIn' || e.target.className == 'modal-dialog')) 
				|| (e.srcElement && (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')))
				this.closeModal();
		}
	}

	getElement(): HTMLElement{
		return this._el;
	}
    
    closeModal(): boolean {
        this.showModal(false);
		this.close.next(null);
		return false;
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
			this.open.next(null);
		}
		else{
			body.classList.remove('modal-open');

			if(this.closeOnUnfocus){
				this._el.childNodes[0].removeEventListener('click', (e: Event) => {
					if((e.target && (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')) 
						|| (e.srcElement && (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')))
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