/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="ISimpleTableReorder.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
module SimpleTableReorder {
    export class SimpleTableReorder implements ISimpleTableReorder{//extends SimpleTablePlugin.BaseSimpleTablePlugin
        //********************
        // ATTRIBUTES - START
        //********************

        rootScope: any;
        scope: any;
        element:any;
        attrs: any;
        plugins:any;
        initPluginTimeout:Number;
        id: any;

        //******************
        // ATTRIBUTES - END
        //******************


        //**************************
        // OVERRIDE METHODS - START
        //**************************

        addEventListeners():void{
            //super.addEventListeners();
        }

        //************************
        // OVERRIDE METHODS - END
        //************************


        //*****************
        // METHODS - START
        //*****************

        constructor(scope:any, element:any, attrs:any){
            // base
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;

            //this.init();
        }

        onDragStartHandler(event):void{
            event.dataTransfer.setData('text', this.id);
            this.rootScope.$emit("SIMPLE-TABLE-DRAG-START");
        }

        onDragEndHandler(event):void{
            this.rootScope.$emit("SIMPLE-TABLE-DRAG-END");
        }

        onDragOverHandler(event):boolean{
            if(event.preventDefault){
                event.preventDefault();
            }

            event.dataTransfer.dropEffect = 'move';
            return false;
        }

        onDragEnterHandler(event):void{
            angular.element(event.target).addClass('simple-table-over');
        }

        onDragLeaveHandler(event):void{
            angular.element(event.target).removeClass('simple-table-over');
        }

        onDropHandler(event):void{

        }

        //***************
        // METHODS - END
        //***************
    }
}