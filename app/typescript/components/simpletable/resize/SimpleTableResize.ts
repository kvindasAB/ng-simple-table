/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../core/ISimpleTablePlugin.ts" />
/// <reference path="../core/STConstants.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.ts" />
/// <reference path="ISimpleTableResize.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />

module SimpleTableResize{
    export class SimpleTableResize{
        //*******************
        // CONSTANTS - START
        //*******************

        //*****************
        // CONSTANTS - END
        //*****************


        //********************
        // ATTRIBUTES - START
        //********************

        scope:any;
        element:any;
        attrs: any;
        simpleTable:SimpleTable.SimpleTable;
        initializationComplete:boolean = false;
        $window:any;

        minColumnWidth: number = 25;
        isMouseDown:boolean = false;
        startX: number = 0;
        indexColumnResize: number = 0;
        orginalColumnWidth: number = 0;
        parentMoveHandle:any = null;
        table:any = null;
        tableHeaderColumnList:any = null;
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

        onMouseDownHandler(event, scope:any, element:any):void{
            console.log('onMouseDownHandler: ', this, scope, element);
            if(event.preventDefault){
                event.preventDefault();
            }
            if(event.stopPropagation){
                event.stopPropagation();
            }
            var $windowEl:any           = angular.element(this.$window),
                originX:number          = event.clientX,
                moveHandler:Function    = angular.bind(this, function(event){
                    this.onMouseMoveHandler(event, originX, scope.hcol);
                }),
                upHandler:Function      = angular.bind(this, function(event){
                    $windowEl.off('mousemove', moveHandler);
                    $windowEl.off('mouseup', upHandler);
                    this.enableResizeCursor(false);
                    this.onMouseUpHandler(event);
                });
            this.enableResizeCursor(true);
            $windowEl.on('mousemove', moveHandler);
            $windowEl.on('mouseup', upHandler);

            /*
            if(!this.table){
                var th:any = angular.element(element).parent();
                var tr:any = angular.element(th).parent();
                var tHead:any = angular.element(tr).parent();
                this.tableHeaderColumnList = angular.element(tr).children();
                this.table = angular.element(tHead).parent();
            }
            this.parentMoveHandle = angular.element(element).parent();
            this.isMouseDown = true;
            this.startX = event.clientX;
            this.indexColumnResize = scope.$index;
            this.orginalColumnWidth = scope.hcol.style.width;
            this.originalTableWidth = angular.element(this.table).width();
            var self:any = this;
            angular.element('body').addClass('resize-cursor');
            angular.element(this.table).addClass('resize-cursor');
            angular.element(this.$window).on('mousemove', function(event){
                var parentScope:any = self.scope;
                parentScope.simpleTableResize.onMouseMoveHandler(event, scope, element);
            });
            angular.element(this.$window).on('mouseup', function(event){
                var parentScope:any = self.scope;
                parentScope.simpleTableResize.onMouseUpHandler(event, scope, element);
            });
            */

        }

        onMouseMoveHandler(event:any, originX:number, col:STColumn.Column):void {
            //console.log('onMouseMoveHandler: ', arguments, this);
            var wdiff = event.clientX - originX;
            this.simpleTable.managers.resizeManager.resizeColumn(col, wdiff);
        }

        onMouseUpHandler(event:any):void {
            console.log('onMouseUpHandler: ', arguments, this);
        }

        enableResizeCursor(enable:boolean):void {
            if(enable){
                angular.element('body').addClass('resize-cursor');
                return;
            }
            angular.element('body').removeClass('resize-cursor');
        }

        oldOnMouseMoveHandler(event, scope, element):void{
            if(!this.isMouseDown){
                return;
            }
            var tableConfig:any = scope.tableConfig;
            if(tableConfig.resizeType === STCore.Constants.RESIZE_FIXED){
                this.updateFixedTableColumns(event, tableConfig, scope);
            }
            if(tableConfig.resizeType === STCore.Constants.RESIZE_RELATIVE){
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
            return newWidth + STCore.Constants.UNIT_PIXELS;
        }

        updateAdjustableTableColumns(event, tableConfig, scope):void{
            var width = 0;
            width = event.clientX - this.startX;
            tableConfig.columns[this.indexColumnResize].style.width = this.calculateNewColumnWidth(tableConfig, this.orginalColumnWidth, width);
            scope.$apply();
        }

        calculateNewColumnWidth(tableConfig, actualWidth, moveWidth):string{
            var widthType:string  = this.getWidthType(actualWidth);
            if(widthType === STCore.Constants.UNIT_PIXELS){
                return this.calculatePixels(actualWidth, moveWidth);
            }
            if(widthType === STCore.Constants.UNIT_PERCENTAGE){
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
            return columnWidth + STCore.Constants.UNIT_PIXELS;
        }

        calculatePercentage(tableConfig, actualWidth, moveWidth):string{
            var columnWidthPercent:number = this.getWidthInNumber(actualWidth);
            var columnWidth:number = 0;
            if(tableConfig.resizeType === STCore.Constants.RESIZE_FIXED){
                columnWidth = ((this.originalTableWidth + moveWidth) * columnWidthPercent) / 100;
            }else{
                columnWidth = (this.originalTableWidth * columnWidthPercent) / 100;
            }
            columnWidth = columnWidth + moveWidth;
            if(this.minColumnWidth > columnWidth){
                columnWidth = this.minColumnWidth;
            }
            var newPercentage = 0;
            if(tableConfig.resizeType === STCore.Constants.RESIZE_FIXED){
                newPercentage = (columnWidth / (this.originalTableWidth + moveWidth)) * 100;
            }else{
                newPercentage = (columnWidth / this.originalTableWidth) * 100;
            }
            return newPercentage + STCore.Constants.UNIT_PERCENTAGE;
        }

        isMinColumnWidth(actualWidth, moveWidth):boolean{
            var widthType:string = this.getWidthType(actualWidth);
            var columnWidth:number = this.getWidthInNumber(actualWidth);
            if(widthType === STCore.Constants.UNIT_PERCENTAGE){
                columnWidth = (this.originalTableWidth * columnWidth) / 100;
            }
            columnWidth = columnWidth + moveWidth;

            if(this.minColumnWidth > columnWidth){
                return true;
            }
            return false;
        }

        oldOnMouseUpHandler(event, scope:any, element):void{
            angular.element('body').removeClass('resize-cursor');
            angular.element(this.table).removeClass('resize-cursor');
            angular.element(this.$window).off('mousemove');
            angular.element(this.$window).off('mouseup');
            this.isMouseDown = false;
            var columnData = scope.hcol;
            var tableConfig = scope.$parent.tableConfig;
            if(tableConfig.resizeType === STCore.Constants.RESIZE_RELATIVE){
                this.updateOtherColumns(columnData, tableConfig);
            }
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
            for(var i = 0; i < this.tableHeaderColumnList.length; i++){
                var th = this.tableHeaderColumnList[i];
                if(updatedColumnId === th.id){
                    continue;
                }
                var column = this.getColumnDataById(th.id, tableConfig);
                var type:string = this.getWidthType(column.style.width);
                var originalWidth:number = angular.element(th).width();
                column.style.width = this.convertToPixelsOrPercentage(originalWidth, type);
            }
        }

        removeWidth(widthToRemove:number, tableConfig:any, updatedColumnId:string):void{
            for(var i = 0; i < this.tableHeaderColumnList.length; i++){
                var th = this.tableHeaderColumnList[i];
                if(updatedColumnId === th.id){
                    continue;
                }
                var column = this.getColumnDataById(th.id, tableConfig);
                var type:string = this.getWidthType(column.style.width);
                var originalWidth:number = angular.element(th).width();
                column.style.width = this.convertToPixelsOrPercentage(originalWidth, type);
            }
        }

        convertToPixelsOrPercentage(originalWidth:number, widthType:string):string{
            if(widthType === STCore.Constants.UNIT_PIXELS){
                return originalWidth + STCore.Constants.UNIT_PIXELS;
            }
            var newWidth:number = (originalWidth / this.originalTableWidth) * 100;
            return newWidth + STCore.Constants.UNIT_PERCENTAGE;
        }

        getColumnDataById(id:string, tableConfig:any):any{
            for(var i = 0; i < tableConfig.columns.length; i++){
                var column = tableConfig.columns[i];
                if(id === column.id){
                    return column;
                }
            }
            return null;
        }

        getWidthInNumber(width):number{
            var stringWidth:string = '';
            var widthType:string = this.getWidthType(width);
            if(widthType === STCore.Constants.UNIT_PIXELS){
                stringWidth = width.substring(0 , width.length - 2);
            }else{
                stringWidth = width.substring(0 , width.length - 1);
            }
            var columnWidth:number = parseFloat(stringWidth);
            return columnWidth;
        }

        getWidthType(width):string{
            var widthType:string = width.substring(width.length - 2, width.length);
            if(widthType === STCore.Constants.UNIT_PIXELS){
                return STCore.Constants.UNIT_PIXELS;
            }
            return STCore.Constants.UNIT_PERCENTAGE;
        }

        //***************
        // METHODS - END
        //***************
    }
}