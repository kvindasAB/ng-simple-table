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
        cellClassesFunction:Function;
        cellTemplate:string;
        cellTemplateId:string;
        cellIdFunction:Function;
        cellValueFunction:Function;

        // Required for resizing purposes
        _widthInPx:number;

        // Optimization
        /**
         * Indicates that the column attributes are mutable, and therefore attributes should be bind/watched on template.
         * If mutable=false most attributes are considered 'static' and therefore bind-once, with no further watching.
         */
        mutable:boolean = true;
        /**
         * Used in pair with 'mutable' attribute.
         * Indicates the mutable properties of the column. Mutable properties will be watched for changes.
         * If the column is mutable, everything is considered mutable with exception of whats in staticProperties.
         */
        mutableProperties:string[];
        /**
         * Used in pair with 'mutable' attribute.
         * Indicates the static properties of the column. Static properties will be bind-once with no further watching.
         * If the column is static (mutable=false), everything is considered static with exception of whats in mutableProperties.
         */
        staticProperties:string[];
        /**
         * Remove from template unused features or attributes avoid watcher generation
         * @type {boolean}
         */
        optimizeTemplate:boolean    = true;
        /**
         * A property is considered optimized when is static and with no value from the user.
         */
        optimizeProperties:string[];

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
            this.cellClassesFunction= data.cellClassesFunction;
            this.cellIdFunction     = data.cellIdFunction ? data.cellIdFunction : angular.noop;
            this.cellTemplate       = data.cellTemplate;
            this.cellTemplateId     = data.cellTemplateId;
            this.cellValueFunction  = data.cellValueFunction;
            this.getCellValue       = this.cellValueFunction ? this.getCustomCellValue : this.getDefaultCellValue;

            // Optimization
            this.mutable            = angular.isUndefined(data.mutable) ? true : data.mutable;
            this.mutableProperties  = data.mutableProperties;
            this.staticProperties   = data.staticProperties;
            this.optimizeTemplate   = angular.isUndefined(data.optimizeTemplate) ? true : data.optimizeTemplate;
            this.validateOptimizationProperties(data);
        }

        validateOptimizationProperties(data){
            this.optimizeProperties = [];
            this.validateOptimizationProperty('cellId', 'cellIdFunction', data, this.optimizeProperties);
            this.validateOptimizationProperty('cellClasses', 'cellClasses', data, this.optimizeProperties);
            this.validateOptimizationProperty('cellClassesFunction', 'cellClassesFunction', data, this.optimizeProperties);
            this.validateOptimizationProperty('headerClasses', 'headerClasses', data, this.optimizeProperties);
            this.validateOptimizationProperty('style', 'style', data, this.optimizeProperties);
        }

        validateOptimizationProperty(prop:string, alias:string, data:any, optimizedProps:string[]):void{
            if(data[alias]){
                return;
            }
            optimizedProps.push(prop);
        }

        getCustomCellValue(row:any){
            return this.cellValueFunction(row, this)
        }

        getDefaultCellValue(row:any){
            return row[this.field];
        }

        getCellValue(row:any){
            return this.getDefaultCellValue(row);
        }

        isMutableProperty(prop:string):boolean{
            return !!(this.mutable || (this.mutableProperties && this.mutableProperties.indexOf(prop) > -1 ));
        }

        isStaticProperty(prop:string):boolean {
            return !!(!this.mutable || (this.staticProperties && this.staticProperties.indexOf(prop) > -1 ));
        }

        isOptimizedProperty(prop:string):boolean {
            return !!(this.optimizeProperties.indexOf(prop) > -1);
        }

        hasStaticProperties():boolean {
            return !!(!this.mutable || (this.staticProperties && this.staticProperties.length > 0));
        }

        hasCustomTemplate():boolean {
            return !!(this.cellTemplate || this.cellTemplateId);
        }

    }
}