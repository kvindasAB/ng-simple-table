/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="ISimpleTablePlugin.ts" />
/// <reference path="IDisposable.ts" />
/// <reference path="STConstants.ts" />
module STCore {
    export class Config {

        tableClasses:any;
        tableWidth:any;
        headerHeight:any;
        virtualScroll:boolean;

        columns:any;
        rowTemplate:any;
        rowTemplateId:any;

        selectionType:any;
        resizeType:any;

        listeners:any;
        methods:any;

        //json base object
        _data:any;

        constructor(data?:any) {
            this._data = data;
        }

        syncFromData(data?:any):void {
            data                = data ? data : this._data;
            this.tableClasses   = data.tableClasses;
            this.tableWidth     = data.tableWidth;
            this.headerHeight   = angular.isUndefined(data.headerHeight) ? '30px' : data.headerHeight;
            this.columns        = data.columns;
            this.rowTemplate    = data.rowTemplate;
            this.rowTemplateId  = data.rowTemplateId;
            this.selectionType  = angular.isUndefined(data.selectionType) ? STCore.Constants.SELECTION_SINGLE : data.selectionType;
            this.listeners      = data.listeners;
            this.methods        = data.methods;
            this.virtualScroll  = angular.isUndefined(data.virtualScroll) ? false : data.virtualScroll;
            this.resizeType     = angular.isUndefined(data.resizeType) ? STCore.Constants.RESIZE_NONE : data.resizeType;
        }

    }
}