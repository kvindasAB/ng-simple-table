/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="ISimpleTableReorderDrag.ts" />
/// <reference path="SimpleTableReorderUuidUtil.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
module SimpleTableReorder{
    export class SimpleTableReorderDrag extends SimpleTablePlugin.BaseSimpleTablePlugin implements SimpleTableReorder.ISimpleTableReorderDrag{
        //*******************
        // CONSTANTS - START
        //*******************

        DRAG_START_EVENT:string = 'dragstart';
        DRAG_END_EVENT:string = 'dragend';
        SIMPLE_TABLE_DRAG_START_EVENT:string = 'simpleTableDragStartEvent';
        SIMPLE_TABLE_DRAG_END_EVENT:string = 'simpleTableDragEndEvent';

        //*****************
        // CONSTANTS - END
        //*****************


        //********************
        // ATTRIBUTES - START
        //********************

        uuid: SimpleTableReorder.SimpleTableReorderUuidUtil;
        rootScope: any;
        scope: any;
        element:any;
        attrs: any;
        plugins:any;
        initPluginTimeout:Number;
        id: string;


        //******************
        // ATTRIBUTES - END
        //******************


        //**************************
        // OVERRIDE METHODS - START
        //**************************

        init():void{
            this.initUuid();
            super.init();
        }

        addEventListeners():void{
            super.addEventListeners();
            var self:any = this;
            this.element.bind(this.DRAG_START_EVENT, function(event){
                return self.onDragStartHandler(event);
            });
            this.element.bind(this.DRAG_END_EVENT, function(event){
                return self.onDragEndHandler(event);
            });
        }

        //************************
        // OVERRIDE METHODS - END
        //************************


        //*****************
        // METHODS - START
        //*****************

        initUuid():void{
            this.uuid = new SimpleTableReorder.SimpleTableReorderUuidUtil();
            angular.element(this.element).attr("draggable", "true");

            var id = angular.element(this.element).attr("id");

            if(!id){
                id = this.uuid.new();
                angular.element(this.element).attr("id", id);
            }
            this.id = id;
        }

        onDragStartHandler(event):void{
            event.dataTransfer.setData('text', this.id);
            this.rootScope.$emit(this.SIMPLE_TABLE_DRAG_START_EVENT);
        }

        onDragEndHandler(event):void{
            this.rootScope.$emit(this.SIMPLE_TABLE_DRAG_END_EVENT);
        }

        //***************
        // METHODS - END
        //***************


        //*********************
        // CONSTRUCTOR - START
        //*********************

        constructor(rootScope:any, scope:any, element:any, attrs:any){
            super();
            // base
            this.rootScope = rootScope;
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;

            this.init();
        }

        //*******************
        // CONSTRUCTOR - END
        //*******************
    }
}