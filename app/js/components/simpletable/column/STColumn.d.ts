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
        cellClass: any;
        cellTemplate: any;
        _data: any;
        constructor(data?: any);
        syncFromData(data?: any): void;
    }
}
