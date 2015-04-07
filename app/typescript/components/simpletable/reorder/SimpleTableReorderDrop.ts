/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="ISimpleTableReorderDrop.ts" />
/// <reference path="SimpleTableReorderUuidUtil.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
module SimpleTableReorder{
    export class SimpleTableReorderDrop extends SimpleTablePlugin.BaseSimpleTablePlugin implements SimpleTableReorder.ISimpleTableReorderDrop{
        //*******************
        // CONSTANTS - START
        //*******************

        DRAG_OVER_EVENT:string = 'dragover';
        DRAG_ENTER_EVENT:string = 'dragenter';
        DRAG_LEAVE_EVENT:string = 'dragleave';
        DROP_EVENT:string = 'drop';
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
        //plugins:any;
        //initPluginTimeout:Number;
        id: any;

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
            this.element.bind(this.DRAG_OVER_EVENT, this.onDragOverHandler);
            this.element.bind(this.DRAG_ENTER_EVENT, this.onDragEnterHandler);
            this.element.bind(this.DRAG_LEAVE_EVENT, this.onDragLeaveHandler);
            this.element.bind(this.DROP_EVENT, function(event){
                return self.onDropHandler(event);
            });
            this.rootScope.$on(this.SIMPLE_TABLE_DRAG_START_EVENT, function(){
                return self.onDragStartHandler();
            });

            this.rootScope.$on(this.SIMPLE_TABLE_DRAG_END_EVENT, function(){
                return self.onDragEndHandler();
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

            var id = angular.element(this.element).attr("id");

            if(!id){
                id = this.uuid.new();
                angular.element(this.element).attr("id", id);
            }
            this.id = id;
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
             if(event.preventDefault){
                 event.preventDefault();
             }
             if(event.stopPropagation){
                 event.stopPropagation();
             }

             var data = event.dataTransfer.getData("text");
             var src = document.getElementById(data);
             //var src = angular.element(data);
             var srcData:any = angular.element(src)[0];
             var oldIndex = srcData.cellIndex;

             var dest:any = angular.element(event.target)[0];
             var newIndex = dest.cellIndex;
             var parent:any = this.scope.$parent;
             var tableConfig:any = parent.tableConfig;
             var columns:any = tableConfig.columns;

             var dataColumn = columns[oldIndex];
             columns.splice(oldIndex, 1);
             if(newIndex === columns.length){
                 columns[newIndex] = dataColumn;
             }else{
                 columns.splice(newIndex, 0, dataColumn);
             }

             angular.element(event.target).removeClass('simple-table-over');

             this.scope.onSymbolDrop({});
             this.scope.$apply();
         }

        onDragStartHandler():void{
            var element = document.getElementById(this.id);
            angular.element(element).addClass("simple-table-target");
        }

        onDragEndHandler():void{
            var element = document.getElementById(this.id);
            angular.element(element).removeClass("simple-table-target");
            angular.element(element).removeClass("simple-table-over");
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