module SimpleTableResize{
    export interface ISimpleTableResize{
        //********************
        // ATTRIBUTES - START
        //********************

        scope: any;
        element:any;
        attrs: any;
        parent:any;
        initializationComplete:boolean;

        //******************
        // ATTRIBUTES - END
        //******************


        //*****************
        // METHODS - START
        //*****************

        init();
        isInitialized():boolean;
        addEventListeners();
        removeEventListeners();
        onMouseDownHandler(event, scope:any, element);
        onMouseMoveHandler(event, scope, element);
        calculateNewColumnWidth(actualWidth, moveWidth):string;
        onMouseUpHandler(event, scope, element);

        //***************
        // METHODS - END
        //***************
    }
}