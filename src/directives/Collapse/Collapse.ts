import {Directive, Input, OnChanges, ElementRef} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';
import {CssAnimationBuilder} from 'angular2/src/animate/css_animation_builder';

@Directive({
    selector: '[collapse]',
    host: {
        '[attr.aria-expanded]': '!collapse',
        '[attr.aria-hidden]': 'collapse'
    }
})
export class Collapse implements OnChanges{
    @Input() duration: number = 500;
    @Input() collapse: boolean = false;
    private _animation: CssAnimationBuilder;

    constructor(animationBuilder:AnimationBuilder, public element:ElementRef) {
        this._animation = animationBuilder.css();
    }
        
    private get _elementHeight(): number {
        let el = this.element.nativeElement;
        let height = el.offsetHeight;
        let style = getComputedStyle(el);
        
        return height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    }
    
    private get _baseSequence(): CssAnimationBuilder {
        return this._animation
                    .setDuration(this.duration)
                    .removeClass('fuel-ui-collapse')
                    .removeClass('in')
                    .addAnimationClass('fuel-ui-collapsing')
    }

    ngOnChanges(changes: any) {
        if (!changes.collapse || typeof changes.collapse.previousValue !== 'boolean') return;
        return this.collapse ? this.hide() : this.show();
    }
    
    hide(): void {
        this._baseSequence
            .setFromStyles({
                height: this.element.nativeElement.scrollHeight + 'px',
                overflow: 'hidden'
            })
            .setToStyles({
                height: '0',
                paddingTop: '0',
                paddingBottom: '0'
            });
        
        let a = this._animation.start(this.element.nativeElement);
        a.onComplete(() => {
            a.removeClasses(['in']);
            a.addClasses(['fuel-ui-collapse']);
        });
    }

    show(): void {
        this._animation
        .setDuration(0)
        .addClass('in')
        .setFromStyles({
            overflow: 'hidden'
        })
        .setToStyles({
            paddingTop: '',
            paddingBottom: ''
        })
        .start(this.element.nativeElement)
        .onComplete(() => {
            let a = this._baseSequence
                        .setFromStyles({
                            height: '0' 
                        })
                        .setToStyles({
                            height: this.element.nativeElement.scrollHeight + 'px'
                        })
                        .start(this.element.nativeElement);
            
            a.onComplete(() =>  a.addClasses(['fuel-ui-collapse', 'in']) );
        });
    }
    
}

export var COLLAPSE_PROVIDERS = [
    Collapse
];