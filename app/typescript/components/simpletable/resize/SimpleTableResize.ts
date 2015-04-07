/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../core/ISimpleTablePlugin.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.ts" />
/// <reference path="ISimpleTableResize.ts" />

module SimpleTableResize{
    export class SimpleTableResize implements ISimpleTableResize{
        //********************
        // ATTRIBUTES - START
        //********************

        scope: any;
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
            this.isMouseDown = true;
            this.startX = event.clientX;
            this.indexColumnResize = scope.this.$index;
            this.orginalColumnWidth = scope.hcol.style.width;
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
            var width = 0;
            width = event.clientX - this.startX;
            var tableConfig:any = scope.tableConfig;
            tableConfig.columns[this.indexColumnResize].style.width = this.calculateNewColumnWidth(this.orginalColumnWidth, width);
            scope.$apply();
        }

        calculateNewColumnWidth(actualWidth, moveWidth):string{
            var stringWidth = actualWidth.substring(0 , actualWidth.length - 2);
            var columnWidth = parseInt(stringWidth);
            columnWidth = columnWidth + moveWidth;

            if(this.minColumnWidth > columnWidth){
                columnWidth = this.minColumnWidth;
            }
            return columnWidth + 'px';
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