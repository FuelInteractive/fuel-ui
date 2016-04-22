import {TableSortableColumn, TableSortableSorting} from '../components/TableSortable/TableSortable';


export class Attribute {
    public Name:string;
    public Type:string;
    public Default:string;
    public Description:string;
    
    public constructor(Name:string, Type:string, Default:string, Description:string){
        this.Name = Name;
        this.Type = Type;
        this.Default = Default;
        this.Description = Description;
    }
}
export var AttributeColumns = [
    new TableSortableColumn('Name', 'Name', 'string'),
    new TableSortableColumn('Type', 'Type', 'html'),
    new TableSortableColumn('Default', 'Default', 'html'),
    new TableSortableColumn('Description', 'Description', 'html')
];
export var AttributesDefaultSort = new TableSortableSorting('Name', false);

export class Event {
    public Name:string;
    public EventObject:string;
    public Description:string;
    
    public constructor(Name:string, EventObject:string, Description:string){
        this.Name = Name;
        this.EventObject = EventObject;
        this.Description = Description;
    }
}
export var EventColumns = [
    new TableSortableColumn('Name', 'Name', 'string'),
    new TableSortableColumn('Event Object', 'EventObject', 'html'),
    new TableSortableColumn('Description', 'Description', 'html')  
];
export var EventsDefaultSort = new TableSortableSorting('Name', false);