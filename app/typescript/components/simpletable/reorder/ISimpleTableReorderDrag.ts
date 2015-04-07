module SimpleTableReorder{
    export interface ISimpleTableReorderDrag{
        //********************
        // ATTRIBUTES - START
        //********************

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


        //*****************
        // METHODS - START
        //*****************

        initUuid();
        onDragStartHandler(event):void;
        onDragEndHandler(event):void;

        //***************
        // METHODS - END
        //***************
    }
}