/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.d.ts" />
/// <reference path="ISimpleTablePlugin.d.ts" />
/// <reference path="IDisposable.d.ts" />
/// <reference path="STConstants.d.ts" />
declare module STCore {
    class Config {
        tableClasses: any;
        tableWidth: any;
        headerHeight: any;
        columns: any;
        rowTemplate: any;
        selectionType: any;
        resizeType: any;
        listeners: any;
        methods: any;
        _data: any;
        constructor(data?: any);
        syncFromData(data?: any): void;
    }
}
