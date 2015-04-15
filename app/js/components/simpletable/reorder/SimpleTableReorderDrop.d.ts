/// <reference path="../core/BaseSimpleTablePlugin.d.ts" />
/// <reference path="ISimpleTableReorderDrop.d.ts" />
/// <reference path="SimpleTableReorderUuidUtil.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
declare module SimpleTableReorder {
    class SimpleTableReorderDrop extends SimpleTablePlugin.BaseSimpleTablePlugin implements SimpleTableReorder.ISimpleTableReorderDrop {
        DRAG_OVER_EVENT: string;
        DRAG_ENTER_EVENT: string;
        DRAG_LEAVE_EVENT: string;
        DROP_EVENT: string;
        SIMPLE_TABLE_DRAG_START_EVENT: string;
        SIMPLE_TABLE_DRAG_END_EVENT: string;
        uuid: SimpleTableReorder.SimpleTableReorderUuidUtil;
        rootScope: any;
        scope: any;
        element: any;
        attrs: any;
        id: any;
        init(): void;
        addEventListeners(): void;
        initUuid(): void;
        onDragOverHandler(event: any): boolean;
        onDragEnterHandler(event: any): void;
        onDragLeaveHandler(event: any): void;
        onDropHandler(event: any): void;
        onDragStartHandler(): void;
        onDragEndHandler(): void;
        constructor(rootScope: any, scope: any, element: any, attrs: any);
    }
}
