"use strict";
var TableSortableColumn = (function () {
    function TableSortableColumn(display, variable, filter, sortable) {
        this.sortable = true;
        this.display = display;
        this.variable = variable;
        this.filter = filter;
        this.sortable = sortable != null ? sortable : true;
    }
    return TableSortableColumn;
}());
exports.TableSortableColumn = TableSortableColumn;

//# sourceMappingURL=TableSortableColumn.js.map
