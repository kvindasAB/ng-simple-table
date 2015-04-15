declare module SimpleTableReorder {
    interface ISimpleTableReorderDrag {
        rootScope: any;
        scope: any;
        element: any;
        attrs: any;
        plugins: any;
        initPluginTimeout: Number;
        id: string;
        initUuid(): any;
        onDragStartHandler(event: any): void;
        onDragEndHandler(event: any): void;
    }
}
