/// <reference path="../core/ISimpleTablePlugin.ts" />
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
        plugins:Array<SimpleTablePlugin.ISimpleTablePlugin> = [];
        initPluginTimeout:Number;
        initializationComplete:boolean = false;

        $timeout:any;
        pluginFactory:SimpleTablePluginFactory.SimpleTablePluginFactory;

        minColumnWidth: number = 25;
        isMouseDown: boolean = false;
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
        }

        doRegister(parent?:any):void{
            //this.parent.doRegister(this);
        }

        onRegistered(simpleTable:any):void{
            this.init();
        }

        isInitialized():boolean{
            return this.initializationComplete;
        }

        addEventListeners():void {
        }

        removeEventListeners():void{
        }
        //************************
        // OVERRIDE METHODS - END
        //************************


        //*****************
        // METHODS - START
        //*****************

        constructor(scope:any, element:any, attrs:any, $timeout, pluginFactory:SimpleTablePluginFactory.SimpleTablePluginFactory){
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            //this.parent = parent;

            this.$timeout = $timeout;
            this.pluginFactory = pluginFactory;
            this.doRegister();
        }

        onMouseDownHandler(event, scope, element):void{
            this.isMouseDown = true;
            this.startX = event.clientX;
            this.indexColumnResize = scope.this.$index;
            this.orginalColumnWidth = scope.hcol.style.width;
            //window.on('mousemove', function(event){scope.simpleTableResizable.onMouseMoveHandler(event, scope, element);});
            //window.on('mouseup', function(event){scope.simpleTableResizable.onMouseUpHandler(event, scope, element);});
        }

        onMouseMoveHandler(event, scope, element):void{
            if(!this.isMouseDown){
                return;
            }
            var width = 0;
            width = event.clientX - this.startX;
            scope.columns[this.indexColumnResize].style.width = this.calculateNewColumnWidth(this.orginalColumnWidth, width);
            scope.$apply();
        }

        calculateNewColumnWidth(actualWidth, moveWidth):string{
            var stringWidth = actualWidth.substring(0 , actualWidth.length - 2);
            var columnWidth = parseInt(stringWidth);
            columnWidth = columnWidth + moveWidth;

            if(this.minColumnWidth > columnWidth){
                columnWidth = this.minColumnWidth;
            }
            //this.$log.log('stringWidth: ' + stringWidth);
            return columnWidth + 'px';
        }

        onMouseUpHandler(event, scope, element):void{
            this.isMouseDown = false;
            //window.off('mousemove', function(event){scope.simpleTableResizable.onMouseMoveHandler(event, scope, element);});
            //window.off('mouseup', function(event){scope.simpleTableResizable.onMouseUpHandler(event, scope, element);});
        }

        //***************
        // METHODS - END
        //***************
    }
}