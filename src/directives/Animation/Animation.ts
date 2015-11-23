import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/angular2';

@Directive({
    selector: '[animation]',
    host: {
        '(animationstart)': 'animationStarted($event)',
        '(webkitAnimationStart)': 'animationStarted($event)',
        '(oanimationstart)': 'animationStarted($event)',
        '(MSAnimationStart)': 'animationStarted($event)',
        '(animationend)': 'animationEnded($event)',
        '(webkitAnimationEnd)': 'animationEnded($event)',
        '(oanimationend)': 'animationEnded($event)',
        '(MSAnimationEnd)': 'animationEnded($event)'
    }
})
export class Animation {
    @Output() onAnimationStart = new EventEmitter<any>();
    @Output() onAnimationEnd = new EventEmitter<any>();

	@Input('animation') animationClasses: string = '';
	@Input() play: boolean = false; 
	@Input() id: string = '';  // use for query filtering
	@Input() group: string = ''; // use for query filtering
	
	_animationQueue: string[] = [];
	_callbacks: (() => void)[] = [];
	element: Element;
	
    constructor(element: ElementRef) {
		this.element = element.nativeElement;
    }
	
	onChange(): void {
		this.setup();
	}
	
	onInit(): void {
		this.setup();
	}

	addAnimation(animationClasses: string): Animation {
		animationClasses.split(' ')
			.map(c => this._animationQueue.push(c));
		this.animationClasses += " " + animationClasses;
		return this;
	}

	setup(): Animation {
		this._animationQueue = this.animationClasses
			.split(" ")
			.filter((c) => c.length > 0);
			
		if(this.play && this._animationQueue.length > 0)
			this.startAnimation();
		return this;
	}

	startAnimation(callback: () => void = null): Animation {
		if(callback != null)
			this._callbacks.push(callback);
		
		this._animationQueue.shift()
			.split('.')
			.filter((c) => c.length > 0)
			.map((c) => this.element.classList.add(c));
		return this;	
	}

	cleanAnimation(): Animation {
		this.animationClasses
			.replace('.', ' ')
			.split(' ')
			.filter((c) => c.length > 0)
			.map((c) => {
				this.element.classList.remove(c)
			});
		return this;
	}

    animationStarted(event: Event): void {
        this.onAnimationStart.next(null);
    }

    animationEnded(event: Event): void {
		this.cleanAnimation();
		if(this._animationQueue.length > 0){
			this.startAnimation();
			return;
		}			
		 
		while(this._callbacks.length > 0)
			this._callbacks.shift()(); 
		 
		this.onAnimationEnd.next(null);
    }
}