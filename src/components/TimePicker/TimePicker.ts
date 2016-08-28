import {NgModule, Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
    selector: "timepicker",
    templateUrl: 'components/TimePicker/TimePicker.html'
})
export class TimePicker implements OnInit, OnChanges {
    @Input() hourStep: number = 1;
    @Input() minuteStep: number = 1;
    @Input() secondStep: number = 1;
    @Input() showMeridian: boolean = true;
    @Input() meridians: string[] = ["AM", "PM"];
    @Input() showSeconds: boolean = false;
    @Input() readonlyInput: boolean = false;
    @Input() showSpinners: boolean = true;
    @Input() disabled: boolean = false;
    @Input() min: Date = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0);
    @Input() max: Date = new Date(new Date().getFullYear(), 0, 1, 23, 59, 59);
    @Input() value: Date = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0);

    meridian: string = this.meridians.length > 0 ? this.meridians[0] : null;
    hours: number = 0;
    minutes: string = "00";
    seconds: string = "00";
    invalidHours:boolean = false;
    invalidMinutes:boolean = false;
    invalidSeconds:boolean = false;

    @Output() public valueChange:EventEmitter<Date> = new EventEmitter<Date>();

    ngOnInit():void {
        this.hours = this.value.getHours();
        this.minutes = this.value.getMinutes() > 9 ? this.value.getMinutes().toString() : "0"+this.value.getMinutes().toString();
        this.seconds = this.value.getSeconds() > 9 ? this.value.getSeconds().toString() : "0"+this.value.getSeconds().toString();
        this.refresh();
    }

    ngOnChanges(changes:any): void {
        this.refresh();
    }

    incrementHours():void {
        if (!this.noIncrementHours()) {
            this.addSecondsToSelected(this.hourStep * 60 * 60);
        }
    };

    decrementHours():void {
        if (!this.noDecrementHours()) {
            this.addSecondsToSelected(-this.hourStep * 60 * 60);
        }
    };

    incrementMinutes():void {
        if (!this.noIncrementMinutes()) {
            this.addSecondsToSelected(this.minuteStep * 60);
        }
    };

    decrementMinutes():void {
        if (!this.noDecrementMinutes()) {
            this.addSecondsToSelected(-this.minuteStep * 60);
        }
    };

    incrementSeconds():void {
        if (!this.noIncrementSeconds()) {
            this.addSecondsToSelected(this.secondStep);
        }
    };

    decrementSeconds():void {
        if (!this.noDecrementSeconds()) {
            this.addSecondsToSelected(-this.secondStep);
        }
    };

    toggleMeridian():void {
        if (this.noToggleMeridian()) return;
        
        if (this.minutes && this.hours) {
            this.addSecondsToSelected(12 * 60 * (this.value.getHours() < 12 ? 60 : -60));
        } else {
            this.meridian = this.meridian === this.meridians[0] ? this.meridians[1] : this.meridians[0];
        }
    };

    addSecondsToSelected(seconds: number): void {
        this.value = this.addSeconds(this.value, seconds);

        this.hours = this.value.getHours();
        this.minutes = this.value.getMinutes() > 9 ? this.value.getMinutes().toString() : "0"+this.value.getMinutes().toString();
        this.seconds = this.value.getSeconds() > 9 ? this.value.getSeconds().toString() : "0"+this.value.getSeconds().toString();

        this.valueChange.next(this.value);

        this.sanitize();
        this.refresh();
    }

    addMinutes(selected: Date, minutes: number): Date {
        return this.addSeconds(selected, minutes*60);
    }

    addSeconds(date: Date, seconds: number): Date {
        let dt = new Date(date.getTime() + seconds * 1000);
        let newDate = new Date(date.getTime());
        newDate.setHours(dt.getHours(), dt.getMinutes(), dt.getSeconds());

        return newDate;
    }

    invalidTime():boolean {
        return this.invalidHours || this.invalidMinutes || this.invalidSeconds;
    }

    sanitize():void {
        this.invalidHours = false;
        this.invalidMinutes = false;
        this.invalidSeconds = false;
    }

    refresh():void {
        this.hours = this.value.getHours();
        this.minutes = this.value.getMinutes() > 9 ? this.value.getMinutes().toString() : "0"+this.value.getMinutes().toString();
        this.seconds = this.value.getSeconds() > 9 ? this.value.getSeconds().toString() : "0"+this.value.getSeconds().toString();

        if(this.hours >= 12 && this.showMeridian) {
            this.meridian = this.meridians[1];
        }

        if (this.showMeridian) {
            this.hours = this.hours === 0 || this.hours === 12 ? 12 : this.hours % 12; // Convert 24 to 12 hour system
        }

        this.meridian = this.value.getHours() < 12 ? this.meridians[0] : this.meridians[1];
    }

    updateHours():void {
        this.sanitize();
        if(this.hours.toString().length <= 0 || isNaN(this.hours) || this.hours < 0 || this.hours > 23 || (this.showMeridian && this.hours > 12)) {
            this.invalidHours = true;
        } else {
            this.hours = parseInt(this.hours.toString());
            this.value.setHours(this.showMeridian && this.meridian == this.meridians[1] ? this.hours + 12 : this.hours);
            this.addSecondsToSelected(0);
        }
    }

    updateMinutes():void {
        this.sanitize(); 
        if(this.minutes.length <= 0 || isNaN(parseInt(this.minutes)) || parseInt(this.minutes) < 0 || parseInt(this.minutes) > 59) {
            this.invalidMinutes = true;
        } else {
            this.value.setMinutes(parseInt(this.minutes));
            this.addSecondsToSelected(0);
        }
    }

    updateSeconds():void {
        this.sanitize();
        if(this.seconds.length <= 0 || isNaN(parseInt(this.seconds)) || parseInt(this.seconds) < 0 || parseInt(this.seconds) > 59) {
            this.invalidSeconds = true;
        } else {
            this.value.setSeconds(parseInt(this.seconds));
            this.addSecondsToSelected(0);
        }
    }

    noIncrementHours():boolean {
        let incrementedSelected = this.addMinutes(this.value, this.hourStep * 60);
        return this.disabled || incrementedSelected > this.max ||
            incrementedSelected < this.value && incrementedSelected < this.min;
    };

    noDecrementHours():boolean {
        let decrementedSelected = this.addMinutes(this.value, -this.hourStep * 60);
        return this.disabled || decrementedSelected < this.min ||
            decrementedSelected > this.value && decrementedSelected > this.max;
    };

    noIncrementMinutes():boolean {
        let incrementedSelected = this.addMinutes(this.value, this.minuteStep);
        return this.disabled || incrementedSelected > this.max ||
            incrementedSelected < this.value && incrementedSelected < this.min;
    };

    noDecrementMinutes():boolean {
        let decrementedSelected = this.addMinutes(this.value, -this.minuteStep);
        return this.disabled || decrementedSelected < this.min || 
            decrementedSelected > this.value && decrementedSelected > this.max;
    };

    noIncrementSeconds():boolean {
        let incrementedSelected = this.addSeconds(this.value, this.secondStep);
        return this.disabled || incrementedSelected > this.max ||
            incrementedSelected < this.value && incrementedSelected < this.min;
    };

    noDecrementSeconds():boolean {
        let decrementedSelected = this.addSeconds(this.value, -this.secondStep);
        return this.disabled || decrementedSelected < this.min ||
            decrementedSelected > this.value && decrementedSelected > this.max;
    };

    noToggleMeridian():boolean {
        if (this.value.getHours() < 12) {
            return this.disabled || this.addMinutes(this.value, 12 * 60) > this.max;
        }

        return this.disabled || this.addMinutes(this.value, -12 * 60) < this.min;
    };
}

export let TIMEPICKER_PROVIDERS = [
    TimePicker
];

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TimePicker],
    exports: [TimePicker]
})
export class FuiTimePickerModule { }