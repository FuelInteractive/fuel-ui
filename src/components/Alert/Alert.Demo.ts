import {Component} from '@angular/core';
import {CodeHighlighter} from '../../directives/codeHighlighter/codeHighlighter';
import {TableSortable, TableSortableColumn, TableSortableSorting} from '../../components/tableSortable/tableSortable';
import {Attribute, AttributeColumns, AttributesDefaultSort} from '../../utilities/demoUtilities';
import {TAB_PROVIDERS} from '../../components/tab/tab';

@Component({
  templateUrl: "components/alert/alert.demo.html"
})
export class AlertDemo {
    showAlert: boolean = false;
    closeDelay: number = 0;
    alertType: string = "success";
    alertBody: string = "<strong>Some alert</strong> success message or something";
    
    showSuccess(): void {
        this.closeDelay = 0;
        this.alertType = "success";
        this.alertBody = "<strong>Some alert</strong> success message or something";
        this.showAlert = true;
    }
    
    showError(): void {
        this.closeDelay = 0;
        this.alertType = "danger";
        this.alertBody = "<strong>Something went wrong</strong> error message or something";
        this.showAlert = true;
    }
    
    showDelay(): void {
        this.closeDelay = 5000;
        this.alertType = "info";
        this.alertBody = "<strong>Nice!</strong> This will close in 5 seconds...";
        this.showAlert = true;
    }
    
    test(): void{
        console.log("changed");
    }
    
    attributes:any[] = [
        new Attribute('displayed', 'boolean', 'false', 'Two-way binding to display the alert'),
        new Attribute('closeButton', 'boolean', 'true', "Option to display the 'X' in the right hand corner to close the alert"),
        new Attribute('closeDelay', 'number', '0', 'Number in milliseconds until the alert automatically closes. When set to 0, the alert will stay open until manually closed'),
        new Attribute('type', 'string', 'success', 'The type of alert to display. Default types include success, info, warning, and danger. <a href="http://v4-alpha.getbootstrap.com/components/alerts/#link-color" target="_blank">More info here...</a>'),
    ];
    attributesColumns:TableSortableColumn[] = AttributeColumns;
    attributesSort:TableSortableSorting = AttributesDefaultSort;
}