/// <reference path="../app/typings/angularjs/angular.d.ts" />
/// <reference path="../app/typings/log4javascript/log4javascript.d.ts" />
/// <reference path="../app/typings/lodash/lodash.d.ts" />
declare module SimpleTablePlugin {
    interface ISimpleTablePlugin {
        isInitializationComplete: boolean;
        simpleTable: any;
        parent: any;
        init(): void;
        isInitialized(): boolean;
        doRegister(parent?: any): void;
        onRegistered(simpleTable: any): void;
    }
}
declare module SimpleTablePlugin {
    class BaseSimpleTablePlugin implements SimpleTablePlugin.ISimpleTablePlugin {
        isInitializationComplete: boolean;
        simpleTable: any;
        parent: any;
        init(): void;
        doRegister(parent?: any): void;
        onRegistered(simpleTable: any): void;
        isInitialized(): boolean;
        addEventListeners(): void;
        removeEventListeners(): void;
        notifyListener(eventName: string, params: any): void;
    }
}
declare module SimpleTablePlugin {
    /**
     * Interface of plugins with the need to be aware of table config changes
     */
    interface ISimpleTablePluginConfigAware {
        onConfigChanged(): void;
    }
}
declare module SimpleTablePlugin {
    /**
     * Interface of plugins with the need to be aware of data changes
     */
    interface ISimpleTablePluginDataAware {
        onDataChanged(newValue: any, oldValue: any): void;
    }
}
declare module SimpleTableSelection {
    class SimpleTablePluginSelection extends SimpleTablePlugin.BaseSimpleTablePlugin implements SimpleTablePlugin.ISimpleTablePluginDataAware {
        log: log4javascript.Logger;
        scope: any;
        selectedRows: any[];
        init(): void;
        addEventListeners(): void;
        removeEventListeners(): void;
        isRowSelected(row: any): boolean;
        setSelectedRows(rows: Array<any>): void;
        onRowClicked(scopeEvent: any, $event: any, row: any): any;
        addSelectedRow(row: any): any;
        doSingleSelection(row: any): void;
        doMultipleSelection(row: any): any[];
        isRowValid(row: any): boolean;
        revalidateSelection(): void;
        onDataChanged(newValue: any, oldValue: any): void;
    }
}
declare module SimpleTableSort {
    class SimpleTablePluginSort extends SimpleTablePlugin.BaseSimpleTablePlugin implements SimpleTablePlugin.ISimpleTablePluginDataAware {
        scope: any;
        currentSortColumn: any;
        currentSort: any;
        currentSortReverse: boolean;
        init(): void;
        addEventListeners(): void;
        removeEventListeners(): void;
        removePreviousSortFromColumns(columns: any[]): void;
        markColumnAsSorted(column: any): void;
        applyColumnSortState(column: any): void;
        applySort(column: any): void;
        sortByColumn(column: any): void;
        onHeaderClicked(scopeEvent: any, $event: any, column: any): any;
        revalidateSort(): void;
        onDataChanged(newValue: any, oldValue: any): void;
        switchColumnSortType(column: any): void;
        setSortByColumn(column: any, sortType: string): void;
        addToArray(array: any[], values: string[]): any[];
        removeFromArray(array: any[], values: string[]): any[];
    }
}
declare module SimpleTablePluginFactory {
    class SimpleTablePluginFactory {
        newPluginSelection(): SimpleTableSelection.SimpleTablePluginSelection;
        newPluginSort(): SimpleTableSort.SimpleTablePluginSort;
    }
}
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
declare module SimpleTableReorder {
    class SimpleTableReorderUuidUtil {
        new(): string;
        empty(): string;
        constructor();
    }
}
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
declare module SimpleTable {
    interface ISimpleTable {
        scope: any;
        element: any;
        attrs: any;
        plugins: any;
        init(): any;
        initPlugins(): any;
        registerPlugin(plugin: any): any;
        addEventListeners(): any;
        removeEventListeners(): any;
    }
}
declare module SimpleTable {
    class SimpleTable implements ISimpleTable {
        log: log4javascript.Logger;
        scope: any;
        element: any;
        attrs: any;
        plugins: Array<SimpleTablePlugin.ISimpleTablePlugin>;
        initPluginTimeout: Number;
        initializationComplete: boolean;
        $timeout: any;
        pluginFactory: SimpleTablePluginFactory.SimpleTablePluginFactory;
        constructor(scope: any, element: any, attrs: any, $timeout: any, pluginFactory: SimpleTablePluginFactory.SimpleTablePluginFactory);
        init(): void;
        registerPlugin(plugin: SimpleTablePlugin.ISimpleTablePlugin): void;
        initPlugins(): void;
        addEventListeners(): void;
        removeEventListeners(): void;
        validateConfig(): void;
        initDefaultPlugins(): void;
        doInitPlugins(): void;
        onDataChanged(newValue: any, oldValue: any): void;
        onRowClicked($event: any, row: any): void;
        onHeaderClicked($event: any, column: any): void;
        notifyPreInitialization(): void;
        notifyInitializationComplete(): void;
        notifyListener(eventName: string, params: any): void;
        notifyPluginsDataChanged(newValue: any, oldValue: any): void;
    }
}
