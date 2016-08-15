import {NgModule, Component, Input} from '@angular/core';

@Component({
    selector: "dropdown",
    templateUrl: 'components/dropdown/dropdown.html'
})

export class Dropdown {
    @Input() label: string;
    dropdownOpen: boolean = false;
    
    public toggleDropdown() : void{
        this.dropdownOpen = !this.dropdownOpen;
    }
}

@NgModule({
    imports: [],
    declarations: [Dropdown],
    exports: [Dropdown]
})
export class FuiDropdownModule { }