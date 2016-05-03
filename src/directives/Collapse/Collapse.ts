import {Directive, Input, OnInit, OnChanges, ElementRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {AnimationBuilder} from '@angular/platform-browser/src/animate/animation_builder';
import {CssAnimationBuilder} from '@angular/platform-browser/src/animate/css_animation_builder';

@Directive({
    selector: '[collapse]',
    host: {
        '[attr.aria-expanded]': '!collapse',
        '[attr.aria-hidden]': 'collapse'
    }
})
export class Collapse implements OnInit, OnChanges{
    @Input() duration: number = 500;
    @Input() collapse: boolean = true;
    private _animation: CssAnimationBuilder;

    constructor(animationBuilder:AnimationBuilder, public element:ElementRef) {
        this._animation = animationBuilder.css();
    }
        
    private get _baseSequence(): CssAnimationBuilder {
        return this._animation
                    .setDuration(this.duration)
                    .removeClass('fuel-ui-collapse')
                    .removeClass('in')
                    .addAnimationClass('fuel-ui-collapsing')
    }
    
    ngOnInit(): void {
        if(!this.collapse) {
            this._animation
                .setDuration(0)
                .addClass('in')
                .start(this.element.nativeElement);
        }
    }

    ngOnChanges(changes: any) {
        if (!changes.collapse || typeof changes.collapse.previousValue !== 'boolean') return;
        return this.collapse ? this.hide() : this.show();
    }
    
    hide(): void {
        
        //Webkit fix
        this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + 'px';
        
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
        
        let a = this._animation.setDuration(this.duration).start(this.element.nativeElement);
        a.onComplete(() => {
            //Check if user toggled collapse mid-animation
            if(!this.collapse) return;
            
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
            
            a.onComplete(() =>  {
                a.addClasses(['fuel-ui-collapse', 'in']);
                
                //Set height to auto for expanding with dynamic content
                this._animation
                    .setDuration(0)
                    .setFromStyles({
                        height: this.element.nativeElement.scrollHeight + 'px'
                    })
                    .setToStyles({
                        height: 'auto'
                    })
                    .start(this.element.nativeElement)
                    .onComplete(() => {
                        //Check if user toggled collapse mid-animation
                        if(this.collapse)
                            a.addClasses(['fuel-ui-collapse']);
                    });
            });
        });
    }
    
}

export var COLLAPSE_PROVIDERS = [
    Collapse
];