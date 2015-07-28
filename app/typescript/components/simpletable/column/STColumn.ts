/// <reference path="../table/SimpleTable.ts" />
module STColumn {
    export class Column {

        id:string;
        title:string;
        field:string;
        active:boolean = true;
        style:any;
        headerClass:any;
        cellClass:any;
        cellTemplate:any;

        //json base object
        _data:any;

        constructor(data?:any) {
            this._data = data;
        }

        syncFromData(data?:any):void {
            data                = data ? data : this._data;
            this.id             = data.id;
            this.field          = data.field;
            this.title          = data.title ? data.title : data.field;
            this.active         = _.isUndefined(data.active) ? true : data.active;
            this.style          = data.style;
            this.headerClass    = data.headerClass;
            this.cellClass      = data.cellClass;
            this.cellTemplate   = data.cellTemplate;
        }

    }
}