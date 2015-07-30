/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../util/STUtil.ts" />
module STColumn {
    export class Column {

        // FIXME - Simplify style management in template
        // FIXME - Simplify drag and drop in template

        id:string;
        title:string;
        field:string;
        active:boolean = true;
        style:any;
        headerClass:any;
        cellClasses:any;
        cellTemplate:string;
        cellTemplateId:string;
        cellIdFunction:Function;
        optimizeTemplate:boolean = true;
        cellValueFunction:Function;
        // TODO: Integrate mutable property to do one time binding

        //json base object
        _data:any;

        constructor(data?:any) {
            this._data = data;
        }

        syncFromData(data?:any):void {
            data                    = data ? data : this._data;
            this.id                 = data.id ? data.id : STUtil.Util.generateToken();
            this.field              = data.field;
            this.title              = data.title ? data.title : data.field;
            this.active             = angular.isUndefined(data.active) ? true : data.active;
            this.style              = data.style;
            this.headerClass        = data.headerClass;
            this.cellClasses        = data.cellClasses;
            this.cellIdFunction     = data.cellIdFunction ? data.cellIdFunction : angular.noop;
            this.cellTemplate       = data.cellTemplate;
            this.cellTemplateId     = data.cellTemplateId;
            this.optimizeTemplate   = data.optimizeTemplate;
            this.cellValueFunction  = data.cellValueFunction;
        }

        getCellValue(row:any){
            return this.cellValueFunction ? this.cellValueFunction(row, this) : row[this.field];
        }

    }
}