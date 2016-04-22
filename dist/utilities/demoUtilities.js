"use strict";
var TableSortable_1 = require('../components/TableSortable/TableSortable');
var Attribute = (function () {
    function Attribute(Name, Type, Default, Description) {
        this.Name = Name;
        this.Type = Type;
        this.Default = Default;
        this.Description = Description;
    }
    return Attribute;
}());
exports.Attribute = Attribute;
exports.AttributeColumns = [
    new TableSortable_1.TableSortableColumn('Name', 'Name', 'string'),
    new TableSortable_1.TableSortableColumn('Type', 'Type', 'html'),
    new TableSortable_1.TableSortableColumn('Default', 'Default', 'html'),
    new TableSortable_1.TableSortableColumn('Description', 'Description', 'html')
];
exports.AttributesDefaultSort = new TableSortable_1.TableSortableSorting('Name', false);
var Event = (function () {
    function Event(Name, EventObject, Description) {
        this.Name = Name;
        this.EventObject = EventObject;
        this.Description = Description;
    }
    return Event;
}());
exports.Event = Event;
exports.EventColumns = [
    new TableSortable_1.TableSortableColumn('Name', 'Name', 'string'),
    new TableSortable_1.TableSortableColumn('Event Object', 'EventObject', 'html'),
    new TableSortable_1.TableSortableColumn('Description', 'Description', 'html')
];
exports.EventsDefaultSort = new TableSortable_1.TableSortableSorting('Name', false);

//# sourceMappingURL=demoUtilities.js.map
