/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../core/ISimpleTablePlugin.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.ts" />
/// <reference path="ISimpleTableResize.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />

module SimpleTableResize{
    export class SimpleTableResize implements ISimpleTableResize{
        //*******************
        // CONSTANTS - START
        //*******************

        RESIZE_TYPE_FIXED:string = 'fixed';
        RESIZE_TYPE_ADJUSTABLE:string = 'adjustable';
        WIDTH_PIXELS_TYPE:string = 'px';
        WIDTH_PERCENTAGE_TYPE:string = '%';

        //*****************
        // CONSTANTS - END
        //*****************


        //********************
        // ATTRIBUTES - START
        //********************

        scope:any;
        element:any;
        attrs: any;
        parent:any;
        initializationComplete:boolean = false;
        $window:any;

        minColumnWidth: number = 25;
        isMouseDown:boolean = false;
        startX: number = 0;
        indexColumnResize: number = 0;
        orginalColumnWidth: number = 0;
        parentMoveHandle:any = null;
        table:any = null;
        originalTableWidth:number = 0;

        //******************
        // ATTRIBUTES - END
        //******************


        //**************************
        // OVERRIDE METHODS - START
        //**************************

        init():void{
            this.initializationComplete = true;
            this.addEventListeners();
        }

        isInitialized():boolean{
            return this.initializationComplete;
        }

        addEventListeners():void{
        }

        removeEventListeners():void{
        }

        //************************
        // OVERRIDE METHODS - END
        //************************


        //*****************
        // METHODS - START
        //*****************

        constructor(scope:any, element:any, attrs:any, $window:any){
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.$window = $window;
        }

        onMouseDownHandler(event, scope:any, element):void{
            if(event.preventDefault){
                event.preventDefault();
            }
            if(event.stopPropagation){
                event.stopPropagation();
            }
            if(!this.table){
                var th:any = angular.element(element).parent();
                var tr:any = angular.element(th).parent();
                var tHead:any = angular.element(tr).parent();
                this.table = angular.element(tHead).parent();
            }
            this.parentMoveHandle = angular.element(element).parent();
            this.isMouseDown = true;
            this.startX = event.clientX;
            this.indexColumnResize = scope.this.$index;
            this.orginalColumnWidth = scope.hcol.style.width;
            this.originalTableWidth = angular.element(this.table).width();
            var self:any = this;
            angular.element(this.$window).on('mousemove', function(event){
                var parentScope:any = self.scope;
                parentScope.simpleTableResize.onMouseMoveHandler(event, scope, element);
            });
            angular.element(this.$window).on('mouseup', function(event){
                var parentScope:any = self.scope;
                parentScope.simpleTableResize.onMouseUpHandler(event, scope, element);
            });
        }

        onMouseMoveHandler(event, scope, element):void{
            if(!this.isMouseDown){
                return;
            }
            var tableConfig:any = scope.tableConfig;
            if(tableConfig.resizeType === this.RESIZE_TYPE_FIXED){
                this.updateFixedTableColumns(event, tableConfig, scope);
            }
            if(tableConfig.resizeType === this.RESIZE_TYPE_ADJUSTABLE){
                this.updateAdjustableTableColumns(event, tableConfig, scope);
            }
        }

        updateFixedTableColumns(event, tableConfig, scope):void{
            var width = 0;
            width = event.clientX - this.startX;
            tableConfig.columns[this.indexColumnResize].style.width = this.calculateNewColumnWidth(tableConfig, this.orginalColumnWidth, width);
            if(!this.isMinColumnWidth(this.orginalColumnWidth, width)){
                tableConfig.tableWidth = this.calculateNewTableWidth(width);
            }
            scope.$apply();
        }

        calculateNewTableWidth(extraWidth):string{
            var newWidth =  this.originalTableWidth + extraWidth;
            return newWidth + this.WIDTH_PIXELS_TYPE;
        }

        updateAdjustableTableColumns(event, tableConfig, scope):void{
            var width = 0;
            width = event.clientX - this.startX;
            tableConfig.columns[this.indexColumnResize].style.width = this.calculateNewColumnWidth(tableConfig, this.orginalColumnWidth, width);
            scope.$apply();
        }

        calculateNewColumnWidth(tableConfig, actualWidth, moveWidth):string{
            var widthType:string  = this.getWidthType(actualWidth);
            if(widthType === this.WIDTH_PIXELS_TYPE){
                return this.calculatePixels(actualWidth, moveWidth);
            }
            if(widthType === this.WIDTH_PERCENTAGE_TYPE){
                return this.calculatePercentage(tableConfig, actualWidth, moveWidth);
            }
            return actualWidth;
        }

        calculatePixels(actualWidth, moveWidth):string{
            var columnWidth:number = this.getWidthInNumber(actualWidth);
            columnWidth = columnWidth + moveWidth;

            if(this.minColumnWidth > columnWidth){
                columnWidth = this.minColumnWidth;
            }
            return columnWidth + this.WIDTH_PIXELS_TYPE;
        }

        calculatePercentage(tableConfig, actualWidth, moveWidth):string{
            var columnWidthPercent:number = this.getWidthInNumber(actualWidth);
            var columnWidth:number = 0;
            if(tableConfig.resizeType === this.RESIZE_TYPE_FIXED){
                columnWidth = ((this.originalTableWidth + moveWidth) * columnWidthPercent) / 100;
            }else{
                columnWidth = (this.originalTableWidth * columnWidthPercent) / 100;
            }
            columnWidth = columnWidth + moveWidth;
            if(this.minColumnWidth > columnWidth){
                columnWidth = this.minColumnWidth;
            }
            var newPercentage = 0;
            if(tableConfig.resizeType === this.RESIZE_TYPE_FIXED){
                newPercentage = (columnWidth / (this.originalTableWidth + moveWidth)) * 100;
            }else{
                newPercentage = (columnWidth / this.originalTableWidth) * 100;
            }
            return newPercentage + this.WIDTH_PERCENTAGE_TYPE;
        }

        isMinColumnWidth(actualWidth, moveWidth):boolean{
            var widthType:string = this.getWidthType(actualWidth);
            var columnWidth:number = this.getWidthInNumber(actualWidth);
            if(widthType === this.WIDTH_PERCENTAGE_TYPE){
                columnWidth = (this.originalTableWidth * columnWidth) / 100;
            }
            columnWidth = columnWidth + moveWidth;

            if(this.minColumnWidth > columnWidth){
                return true;
            }
            return false;
        }

        onMouseUpHandler(event, scope:any, element):void{
            this.isMouseDown = false;
            var columnData = scope.hcol;
            var tableConfig = scope.$parent.tableConfig;
            if(tableConfig.resizeType === this.RESIZE_TYPE_ADJUSTABLE){
                this.updateOtherColumns(columnData, tableConfig);
            }
            angular.element(this.$window).off('mousemove');
            angular.element(this.$window).off('mouseup');
        }

        updateOtherColumns(columnData, tableConfig):void{
            var oldWidth = this.getWidthInNumber(this.orginalColumnWidth);
            var newWidth = this.getWidthInNumber(columnData.style.width);
            if(newWidth > oldWidth){
                this.removeWidth((newWidth - oldWidth), tableConfig, columnData.id);
                return;
            }
            if(oldWidth > newWidth){
                this.addWidth((oldWidth - newWidth), tableConfig, columnData.id);
                return;
            }
        }

        addWidth(widthToAdd:number, tableConfig:any, updatedColumnId:string):void{
            widthToAdd = widthToAdd / (tableConfig.columns.length - 1);
            for(var i = 0; i < tableConfig.columns.length; i++){
                var column = tableConfig.columns[i];
                if(updatedColumnId === column.id){
                    continue;
                }
                var type:string = this.getWidthType(column.style.width);
                var originalWidth:number = this.getWidthInNumber(column.style.width);
                column.style.width = this.addPixelsOrPercentageToColumn(originalWidth, (widthToAdd), type) + type;
            }
        }

        addPixelsOrPercentageToColumn(originalWidth:number, widthToAdd:number, widthType:string):number{
            var newWidth:number = 0;
            if(widthType === this.WIDTH_PIXELS_TYPE){
                newWidth = originalWidth + widthToAdd;
                return newWidth;
            }else{
                var columnWidth:number = (this.originalTableWidth * originalWidth) / 100;
                columnWidth = columnWidth + widthToAdd;
                newWidth = (columnWidth / this.originalTableWidth) * 100;
                return newWidth;
            }
        }

        removeWidth(widthToRemove:number, tableConfig:any, updatedColumnId:string):void{
            widthToRemove = widthToRemove / (tableConfig.columns.length - 1);
            for(var i = 0; i < tableConfig.columns.length; i++){
                var column = tableConfig.columns[i];
                if(updatedColumnId === column.id){
                    continue;
                }
                var type:string = this.getWidthType(column.style.width);
                var originalWidth:number = this.getWidthInNumber(column.style.width);
                column.style.width = this.removePixelsOrPercentageToColumn(originalWidth, (widthToRemove), type) + type;
            }
        }

        removePixelsOrPercentageToColumn(originalWidth:number, widthToRemove:number, widthType:string):number{
            var newWidth:number = 0;
            if(widthType === this.WIDTH_PIXELS_TYPE){
                newWidth = originalWidth - widthToRemove;
                return newWidth;
            }else{
                var columnWidth:number = (this.originalTableWidth * originalWidth) / 100;
                columnWidth = columnWidth - widthToRemove;
                newWidth = (columnWidth / this.originalTableWidth) * 100;
                return newWidth;
            }
        }

        getWidthInNumber(width):number{
            var stringWidth:string = '';
            var widthType:string = this.getWidthType(width);
            if(widthType === this.WIDTH_PIXELS_TYPE){
                stringWidth = width.substring(0 , width.length - 2);
            }else{
                stringWidth = width.substring(0 , width.length - 1);
            }
            var columnWidth:number = parseFloat(stringWidth);
            return columnWidth;
        }

        getWidthType(width):string{
            var widthType:string = width.substring(width.length - 2, width.length);
            if(widthType === this.WIDTH_PIXELS_TYPE){
                return this.WIDTH_PIXELS_TYPE;
            }
            return this.WIDTH_PERCENTAGE_TYPE;
        }

        //***************
        // METHODS - END
        //***************
    }
}