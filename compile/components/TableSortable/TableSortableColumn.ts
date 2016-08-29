export class TableSortableColumn {
    public display: string;
    public variable: string;
    public filter: string;
    public sortable: boolean = true;

    constructor(display: string, variable: string, filter: string, sortable?: boolean){
        this.display = display;
        this.variable = variable;
        this.filter = filter;
        this.sortable = sortable != null ? sortable : true;
    }
}