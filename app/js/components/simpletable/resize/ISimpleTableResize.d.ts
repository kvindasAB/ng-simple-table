declare module SimpleTableResize {
    interface ISimpleTableResize {
        scope: any;
        element: any;
        attrs: any;
        parent: any;
        initializationComplete: boolean;
        init(): any;
        isInitialized(): boolean;
        addEventListeners(): any;
        removeEventListeners(): any;
        onMouseDownHandler(event: any, scope: any, element: any): any;
        onMouseMoveHandler(event: any, scope: any, element: any): any;
        onMouseUpHandler(event: any, scope: any, element: any): any;
        calculateNewColumnWidth(tableConfig: any, actualWidth: any, moveWidth: any): string;
    }
}
