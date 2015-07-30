/// <reference path="../table/SimpleTable.d.ts" />
/// <reference path="../util/STUtil.d.ts" />
declare module STColumn {
    class Column {
        id: string;
        title: string;
        field: string;
        active: boolean;
        style: any;
        headerClass: any;
        cellClasses: any;
        cellTemplate: string;
        cellTemplateId: string;
        cellIdFunction: Function;
        optimizeTemplate: boolean;
        valueFunction: Function;
        _data: any;
        constructor(data?: any);
        syncFromData(data?: any): void;
        getCellValue(row: any): any;
    }
}
