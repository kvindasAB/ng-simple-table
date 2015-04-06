module SimpleTableResize{
    export interface ISimpleTableResize{
        //********************
        // ATTRIBUTES - START
        //********************

        scope: any;
        element:any;
        attrs: any;
        parent:any;
        plugins:any;
        initPluginTimeout:Number;
        initializationComplete:boolean;

        //******************
        // ATTRIBUTES - END
        //******************


        //*****************
        // METHODS - START
        //*****************

        init();
        doRegister(parent?:any);
        onRegistered(simpleTable:any);
        isInitialized():boolean;
        addEventListeners();
        removeEventListeners();
        onMouseDownHandler(event, scope, element);
        onMouseMoveHandler(event, scope, element);
        calculateNewColumnWidth(actualWidth, moveWidth):string;
        onMouseUpHandler(event, scope, element);

        //***************
        // METHODS - END
        //***************
    }
}