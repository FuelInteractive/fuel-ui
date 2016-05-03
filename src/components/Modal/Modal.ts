import {Component, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Animation} from "../../directives/Animation/Animation";

@Component({
	selector: 'modal',
	host:{
		'(click)': 'clickElement($event)'
	},
	styleUrls: ['components/Modal/Modal.css'],
	templateUrl: 'components/Modal/Modal.html',
	directives: [CORE_DIRECTIVES, Animation]
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
			if((e.target && (e.target.className == 'modal customFadeIn' || e.target.className == 'modal-dialog')) 
				|| (e.srcElement && (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog')))
				this.showModal(false);
		}
	}

	getElement(): HTMLElement{
		return this._el;
	}
    
    closeModal(): boolean {
        return this.showModal(false);
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