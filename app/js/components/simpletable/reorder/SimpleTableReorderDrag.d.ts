/// <reference path="../core/BaseSimpleTablePlugin.d.ts" />
/// <reference path="ISimpleTableReorderDrag.d.ts" />
/// <reference path="SimpleTableReorderUuidUtil.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
declare module SimpleTableReorder {
    class SimpleTableReorderDrag extends SimpleTablePlugin.BaseSimpleTablePlugin implements SimpleTableReorder.ISimpleTableReorderDrag {
        DRAG_START_EVENT: string;
        DRAG_END_EVENT: string;
        SIMPLE_TABLE_DRAG_START_EVENT: string;
        SIMPLE_TABLE_DRAG_END_EVENT: string;
        uuid: SimpleTableReorder.SimpleTableReorderUuidUtil;
        rootScope: any;
        scope: any;
        element: any;
        attrs: any;
        plugins: any;
        initPluginTimeout: Number;
        id: string;
        init(): void;
        addEventListeners(): void;
        initUuid(): void;
        onDragStartHandler(event: any): void;
        onDragEndHandler(event: any): void;
        constructor(rootScope: any, scope: any, element: any, attrs: any);
    }
}
