import { TableSortableColumn, TableSortableSorting } from '../../components/TableSortable/TableSortable';
export declare class AlertDemo {
    showAlert: boolean;
    alertType: string;
    alertBody: string;
    showSuccess(): void;
    showError(): void;
    test(): void;
    attributes: any[];
    attributesColumns: TableSortableColumn[];
    attributesSort: TableSortableSorting;
}
export declare var ALERT_DEMO_PROVIDERS: typeof AlertDemo[];
