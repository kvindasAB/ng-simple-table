module SimpleTableReorder{
    export interface ISimpleTableReorderDrop{
        //********************
        // ATTRIBUTES - START
        //********************

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


        //*****************
        // METHODS - START
        //*****************

        initUuid():void;
        onDragOverHandler(event):void;
        onDragEnterHandler(event):void;
        onDragLeaveHandler(event):void;
        onDropHandler(event):void;
        onDragStartHandler():void;
        onDragEndHandler():void;

        //***************
        // METHODS - END
        //***************
    }
}