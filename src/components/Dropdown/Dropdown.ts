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

export var DROPDOWN_COMPONENT_PROVIDERS = [
    Dropdown
];

@NgModule({
    imports: [],
    exports: [
        Dropdown
    ]
})
export class FuiDropdownModule { }