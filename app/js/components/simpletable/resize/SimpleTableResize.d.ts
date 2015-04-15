/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../core/ISimpleTablePlugin.d.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.d.ts" />
/// <reference path="ISimpleTableResize.d.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
declare module SimpleTableResize {
    class SimpleTableResize implements ISimpleTableResize {
        RESIZE_TYPE_FIXED: string;
        RESIZE_TYPE_ADJUSTABLE: string;
        WIDTH_PIXELS_TYPE: string;
        WIDTH_PERCENTAGE_TYPE: string;
        scope: any;
        element: any;
        attrs: any;
        parent: any;
        initializationComplete: boolean;
        $window: any;
        minColumnWidth: number;
        isMouseDown: boolean;
        startX: number;
        indexColumnResize: number;
        orginalColumnWidth: number;
        parentMoveHandle: any;
        table: any;
        tableHeaderColumnList: any;
        originalTableWidth: number;
        init(): void;
        isInitialized(): boolean;
        addEventListeners(): void;
        removeEventListeners(): void;
        constructor(scope: any, element: any, attrs: any, $window: any);
        onMouseDownHandler(event: any, scope: any, element: any): void;
        onMouseMoveHandler(event: any, scope: any, element: any): void;
        updateFixedTableColumns(event: any, tableConfig: any, scope: any): void;
        calculateNewTableWidth(extraWidth: any): string;
        updateAdjustableTableColumns(event: any, tableConfig: any, scope: any): void;
        calculateNewColumnWidth(tableConfig: any, actualWidth: any, moveWidth: any): string;
        calculatePixels(actualWidth: any, moveWidth: any): string;
        calculatePercentage(tableConfig: any, actualWidth: any, moveWidth: any): string;
        isMinColumnWidth(actualWidth: any, moveWidth: any): boolean;
        onMouseUpHandler(event: any, scope: any, element: any): void;
        updateOtherColumns(columnData: any, tableConfig: any): void;
        addWidth(widthToAdd: number, tableConfig: any, updatedColumnId: string): void;
        removeWidth(widthToRemove: number, tableConfig: any, updatedColumnId: string): void;
        convertToPixelsOrPercentage(originalWidth: number, widthType: string): string;
        getColumnDataById(id: string, tableConfig: any): any;
        getWidthInNumber(width: any): number;
        getWidthType(width: any): string;
    }
}
