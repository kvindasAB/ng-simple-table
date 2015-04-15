declare module SimpleTableReorder {
    interface ISimpleTableReorderDrop {
        rootScope: any;
        scope: any;
        element: any;
        attrs: any;
        id: any;
        initUuid(): void;
        onDragOverHandler(event: any): void;
        onDragEnterHandler(event: any): void;
        onDragLeaveHandler(event: any): void;
        onDropHandler(event: any): void;
        onDragStartHandler(): void;
        onDragEndHandler(): void;
    }
}
