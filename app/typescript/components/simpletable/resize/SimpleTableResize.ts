/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../core/ISimpleTablePlugin.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.ts" />
/// <reference path="ISimpleTableResize.ts" />

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
            //this.parent = parent;

            this.$window = $window;
            //this.doRegister();
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
            tableConfig.tableWidth = this.calculateNewTableWidth(width);
            tableConfig.columns[this.indexColumnResize].style.width = this.calculateNewColumnWidth(this.orginalColumnWidth, width);
            scope.$apply();
        }

        calculateNewTableWidth(extraWidth):string{
            var newWidth =  this.originalTableWidth + extraWidth;
            return newWidth + this.WIDTH_PIXELS_TYPE;
           /* var widthString:string = tableConfig.tableWidth;
            var widthType:string = widthString.substring(widthString.length - 2, widthString.length);
            var width:number = 0;
            var tableWidth:number = 0;
            if(widthType === this.WIDTH_PIXELS_TYPE){
                tableWidth = parseInt(widthString.substring(0, widthString.length - 2));
                width = columnWidth + extraWidth;
                if(columnWidth >= width){
                    tableWidth = tableWidth + (columnWidth - width);
                }
                return width + this.WIDTH_PIXELS_TYPE;
            }
            widthType = widthString.substring(widthString.length - 1, widthString.length);
            if(widthType === this.WIDTH_PERCENTAGE_TYPE){
                width = angular.element(this.table).width();
                width = width + extraWidth;
                return width + this.WIDTH_PIXELS_TYPE;
            }*/
        }

        updateAdjustableTableColumns(event, tableConfig, scope):void{
            var width = 0;
            width = event.clientX - this.startX;
            tableConfig.columns[this.indexColumnResize].style.width = this.calculateNewColumnWidth(this.orginalColumnWidth, width);
            scope.$apply();
        }

        calculateNewColumnWidth(actualWidth, moveWidth):string{
            var widthType:string = actualWidth.substring(actualWidth.length - 2, actualWidth.length);
            if(widthType === this.WIDTH_PIXELS_TYPE){
                return this.calculatePixels(actualWidth, moveWidth);
            }
            widthType = actualWidth.substring(actualWidth.length - 1, actualWidth.length);
            if(widthType === this.WIDTH_PERCENTAGE_TYPE){
                return this.calculatePercentage(actualWidth, moveWidth);
            }
            return actualWidth;
        }

        calculatePixels(actualWidth, moveWidth):string{
            var stringWidth = actualWidth.substring(0 , actualWidth.length - 2);
            var columnWidth = parseInt(stringWidth);
            columnWidth = columnWidth + moveWidth;

            if(this.minColumnWidth > columnWidth){
                columnWidth = this.minColumnWidth;
            }
            return columnWidth + this.WIDTH_PIXELS_TYPE;
        }

        calculatePercentage(actualWidth, moveWidth):string{
            var width = angular.element(this.parentMoveHandle).width();
            var columnWidth = width;
            var stringWidthPercent = actualWidth.substring(0 , actualWidth.length - 1);
            var columnWidthPercent = parseFloat(stringWidthPercent);
            columnWidth = columnWidth + moveWidth;
            var newPercentage = (columnWidthPercent * columnWidth) / width;
            return newPercentage + this.WIDTH_PERCENTAGE_TYPE;
        }

        onMouseUpHandler(event, scope:any, element):void{
            this.isMouseDown = false;
            angular.element(this.$window).off('mousemove');
            angular.element(this.$window).off('mouseup');
        }

        //***************
        // METHODS - END
        //***************
    }
}