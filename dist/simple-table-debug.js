angular.module('simpletable', [
    'simpletable.table',
    'simpletable.factory',
    'simpletable.reorder',
    'simpletable.resizable',
    'simpletable.uuid.util'
]).value('version', '0.1');
;
/// <reference path="ISimpleTablePlugin.ts" />
var SimpleTablePlugin;
(function (SimpleTablePlugin) {
    var BaseSimpleTablePlugin = (function () {
        function BaseSimpleTablePlugin() {
            // Attributes
            this.isInitializationComplete = false;
        }
        // Methods
        BaseSimpleTablePlugin.prototype.init = function () {
            this.addEventListeners();
        };
        BaseSimpleTablePlugin.prototype.doRegister = function (parent) {
            this.parent = parent ? parent : this.parent;
            this.parent.registerPlugin(this);
        };
        BaseSimpleTablePlugin.prototype.onRegistered = function (simpleTable) {
            this.simpleTable = simpleTable;
            this.init();
            this.isInitializationComplete = true;
        };
        BaseSimpleTablePlugin.prototype.isInitialized = function () {
            return this.isInitializationComplete;
        };
        BaseSimpleTablePlugin.prototype.addEventListeners = function () {
        };
        BaseSimpleTablePlugin.prototype.removeEventListeners = function () {
        };
        BaseSimpleTablePlugin.prototype.notifyListener = function (eventName, params) {
            if (!this.simpleTable) {
                return;
            }
            this.simpleTable.notifyListener(eventName, params);
        };
        return BaseSimpleTablePlugin;
    })();
    SimpleTablePlugin.BaseSimpleTablePlugin = BaseSimpleTablePlugin;
})(SimpleTablePlugin || (SimpleTablePlugin = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="../core/ISimpleTablePluginDataAware.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
var SimpleTableSelection;
(function (SimpleTableSelection) {
    var SimpleTablePluginSelection = (function (_super) {
        __extends(SimpleTablePluginSelection, _super);
        function SimpleTablePluginSelection() {
            _super.apply(this, arguments);
            this.selectedRows = [];
        }
        // Overrides
        SimpleTablePluginSelection.prototype.init = function () {
            this.scope = this.simpleTable.scope;
            _super.prototype.init.call(this);
            this.simpleTable.selection = this;
        };
        SimpleTablePluginSelection.prototype.addEventListeners = function () {
            _super.prototype.addEventListeners.call(this);
            this.scope.$on("onRowClicked", angular.bind(this, this.onRowClicked));
            this.scope.$on("$destroy", this.removeEventListeners);
        };
        SimpleTablePluginSelection.prototype.removeEventListeners = function () {
            this.scope.$off("onRowClicked");
            this.scope.$off("$destroy");
        };
        // Methods
        SimpleTablePluginSelection.prototype.isRowSelected = function (row) {
            return (this.selectedRows.indexOf(row) > -1);
        };
        SimpleTablePluginSelection.prototype.setSelectedRows = function (rows) {
            console.log("setSelectedRows: ", rows);
            this.selectedRows.length = 0;
            for (var i = 0; i < rows.length; i++) {
                this.addSelectedRow(rows[i]);
            }
        };
        SimpleTablePluginSelection.prototype.onRowClicked = function (scopeEvent, $event, row) {
            this.addSelectedRow(row);
        };
        SimpleTablePluginSelection.prototype.addSelectedRow = function (row) {
            console.log("SimpleTableSelection.addSelectedRow:", arguments);
            if (!this.isRowValid(row)) {
                return;
            }
            if (this.scope.tableConfig.selectionMultiple) {
                return this.doMultipleSelection(row);
            }
            return this.doSingleSelection(row);
        };
        SimpleTablePluginSelection.prototype.doSingleSelection = function (row) {
            var index = this.selectedRows.indexOf(row);
            this.selectedRows.length = 0;
            if (index > -1) {
                return;
            }
            this.selectedRows.push(row);
            console.log("selectedRows: ", this.selectedRows);
        };
        SimpleTablePluginSelection.prototype.doMultipleSelection = function (row) {
            var index = this.selectedRows.indexOf(row);
            if (index > -1) {
                return this.selectedRows.splice(index, 1);
            }
            this.selectedRows.push(row);
        };
        SimpleTablePluginSelection.prototype.isRowValid = function (row) {
            return (this.simpleTable.scope.tableData.indexOf(row) > -1);
        };
        SimpleTablePluginSelection.prototype.revalidateSelection = function () {
            this.setSelectedRows(this.selectedRows.slice());
        };
        SimpleTablePluginSelection.prototype.onDataChanged = function (newValue, oldValue) {
            this.revalidateSelection();
        };
        return SimpleTablePluginSelection;
    })(SimpleTablePlugin.BaseSimpleTablePlugin);
    SimpleTableSelection.SimpleTablePluginSelection = SimpleTablePluginSelection;
})(SimpleTableSelection || (SimpleTableSelection = {}));
/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="../core/ISimpleTablePluginDataAware.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var SimpleTableSort;
(function (SimpleTableSort) {
    var SimpleTablePluginSort = (function (_super) {
        __extends(SimpleTablePluginSort, _super);
        function SimpleTablePluginSort() {
            _super.apply(this, arguments);
            this.currentSortColumn = null;
            this.currentSort = null;
            this.currentSortReverse = false;
        }
        // Overrides
        SimpleTablePluginSort.prototype.init = function () {
            this.scope = this.simpleTable.scope;
            _super.prototype.init.call(this);
            this.simpleTable.sortManager = this;
        };
        SimpleTablePluginSort.prototype.addEventListeners = function () {
            _super.prototype.addEventListeners.call(this);
            this.scope.$on("onHeaderClicked", angular.bind(this, this.onHeaderClicked));
            this.scope.$on("$destroy", this.removeEventListeners);
        };
        SimpleTablePluginSort.prototype.removeEventListeners = function () {
            this.scope.$off("onHeaderClicked");
            this.scope.$off("$destroy");
        };
        // Methods
        SimpleTablePluginSort.prototype.removePreviousSortFromColumns = function (columns) {
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                column.sorted = false;
                this.applyColumnSortState(column);
            }
        };
        SimpleTablePluginSort.prototype.markColumnAsSorted = function (column) {
            column.sorted = true;
            column.sortType = column.sortType ? column.sortType : "asc";
        };
        SimpleTablePluginSort.prototype.applyColumnSortState = function (column) {
            if (!column.headerClass) {
                column.headerClass = [];
            }
            if (!column.sorted) {
                this.removeFromArray(column.headerClass, ["sort", "asc", "desc"]);
                return;
            }
            this.addToArray(column.headerClass, ["sort", column.sortType]);
        };
        SimpleTablePluginSort.prototype.applySort = function (column) {
            this.currentSort = column.field;
            this.currentSortReverse = column.sortType === "asc" ? false : true;
            this.currentSortColumn = column;
            this.applyColumnSortState(column);
        };
        SimpleTablePluginSort.prototype.sortByColumn = function (column) {
            this.notifyListener("onSortStart", column);
            this.removePreviousSortFromColumns(this.scope.tableConfig.columns);
            this.markColumnAsSorted(column);
            this.applySort(column);
            this.notifyListener("onSortEnd", column);
        };
        SimpleTablePluginSort.prototype.onHeaderClicked = function (scopeEvent, $event, column) {
            this.notifyListener("onHeaderSortStart", column);
            this.switchColumnSortType(column);
            this.sortByColumn(column);
            this.notifyListener("onHeaderSortEnd", column);
        };
        SimpleTablePluginSort.prototype.revalidateSort = function () {
            if (!this.currentSortColumn) {
                return;
            }
            this.applySort(this.currentSortColumn);
        };
        SimpleTablePluginSort.prototype.onDataChanged = function (newValue, oldValue) {
            this.revalidateSort();
        };
        SimpleTablePluginSort.prototype.switchColumnSortType = function (column) {
            column.sortType = !column.sortType || column.sortType === "desc" ? "asc" : "desc";
        };
        SimpleTablePluginSort.prototype.setSortByColumn = function (column, sortType) {
            column.sortType = sortType;
            this.sortByColumn(column);
        };
        // Utility methods
        // TODO: Move to utility class
        SimpleTablePluginSort.prototype.addToArray = function (array, values) {
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                var indx = array.indexOf(value);
                if (indx > -1) {
                    continue;
                }
                array.push(value);
            }
            return array;
        };
        SimpleTablePluginSort.prototype.removeFromArray = function (array, values) {
            if (array.length === 0) {
                return;
            }
            for (var i = 0; i < values.length; i++) {
                var value = values[i];
                var indx = array.indexOf(value);
                if (indx < 0) {
                    continue;
                }
                array.splice(indx, 1);
            }
            return array;
        };
        return SimpleTablePluginSort;
    })(SimpleTablePlugin.BaseSimpleTablePlugin);
    SimpleTableSort.SimpleTablePluginSort = SimpleTablePluginSort;
})(SimpleTableSort || (SimpleTableSort = {}));
/// <reference path="../select/SimpleTableSelection.ts" />
/// <reference path="../sort/SimpleTableSort.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var SimpleTablePluginFactory;
(function (_SimpleTablePluginFactory) {
    var SimpleTablePluginFactory = (function () {
        function SimpleTablePluginFactory() {
        }
        SimpleTablePluginFactory.prototype.newPluginSelection = function () {
            console.log("creating new SimpleTablePluginSelection");
            return new SimpleTableSelection.SimpleTablePluginSelection();
        };
        SimpleTablePluginFactory.prototype.newPluginSort = function () {
            console.log("creating new SimpleTablePluginSort");
            return new SimpleTableSort.SimpleTablePluginSort();
        };
        return SimpleTablePluginFactory;
    })();
    _SimpleTablePluginFactory.SimpleTablePluginFactory = SimpleTablePluginFactory;
})(SimpleTablePluginFactory || (SimpleTablePluginFactory = {}));
console.log("Creating angular module...: " + "simpletable.factory");
angular.module('simpletable.factory', []).service('SimpleTablePluginFactory', [function () {
    console.log("instantiating service...");
    return new SimpleTablePluginFactory.SimpleTablePluginFactory();
}]);
var SimpleTableReorder;
(function (SimpleTableReorder) {
    var SimpleTableReorderUuidUtil = (function () {
        //***************
        // METHODS - END
        //***************
        //*********************
        // CONSTRUCTOR - START
        //*********************
        function SimpleTableReorderUuidUtil() {
        }
        //*****************
        // METHODS - START
        //*****************
        SimpleTableReorderUuidUtil.prototype.new = function () {
            function _p8(s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        };
        SimpleTableReorderUuidUtil.prototype.empty = function () {
            return '00000000-0000-0000-0000-000000000000';
        };
        return SimpleTableReorderUuidUtil;
    })();
    SimpleTableReorder.SimpleTableReorderUuidUtil = SimpleTableReorderUuidUtil;
})(SimpleTableReorder || (SimpleTableReorder = {}));
/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="ISimpleTableReorderDrag.ts" />
/// <reference path="SimpleTableReorderUuidUtil.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var SimpleTableReorder;
(function (SimpleTableReorder) {
    var SimpleTableReorderDrag = (function (_super) {
        __extends(SimpleTableReorderDrag, _super);
        //***************
        // METHODS - END
        //***************
        //*********************
        // CONSTRUCTOR - START
        //*********************
        function SimpleTableReorderDrag(rootScope, scope, element, attrs) {
            _super.call(this);
            //*******************
            // CONSTANTS - START
            //*******************
            this.DRAG_START_EVENT = 'dragstart';
            this.DRAG_END_EVENT = 'dragend';
            this.SIMPLE_TABLE_DRAG_START_EVENT = 'simpleTableDragStartEvent';
            this.SIMPLE_TABLE_DRAG_END_EVENT = 'simpleTableDragEndEvent';
            // base
            this.rootScope = rootScope;
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.init();
        }
        //******************
        // ATTRIBUTES - END
        //******************
        //**************************
        // OVERRIDE METHODS - START
        //**************************
        SimpleTableReorderDrag.prototype.init = function () {
            this.initUuid();
            _super.prototype.init.call(this);
        };
        SimpleTableReorderDrag.prototype.addEventListeners = function () {
            _super.prototype.addEventListeners.call(this);
            var self = this;
            this.element.bind(this.DRAG_START_EVENT, function (event) {
                return self.onDragStartHandler(event);
            });
            this.element.bind(this.DRAG_END_EVENT, function (event) {
                return self.onDragEndHandler(event);
            });
        };
        //************************
        // OVERRIDE METHODS - END
        //************************
        //*****************
        // METHODS - START
        //*****************
        SimpleTableReorderDrag.prototype.initUuid = function () {
            this.uuid = new SimpleTableReorder.SimpleTableReorderUuidUtil();
            angular.element(this.element).attr("draggable", "true");
            //var id = angular.element(this.element).attr("id");
            var scope = angular.element(this.element).scope();
            var id = scope.hcol.id;
            if (!id) {
                id = this.uuid.new();
                angular.element(this.element).attr("id", id);
            }
            this.id = id;
        };
        SimpleTableReorderDrag.prototype.onDragStartHandler = function (event) {
            event.dataTransfer.setData('text', this.id);
            this.rootScope.$emit(this.SIMPLE_TABLE_DRAG_START_EVENT);
        };
        SimpleTableReorderDrag.prototype.onDragEndHandler = function (event) {
            this.rootScope.$emit(this.SIMPLE_TABLE_DRAG_END_EVENT);
        };
        return SimpleTableReorderDrag;
    })(SimpleTablePlugin.BaseSimpleTablePlugin);
    SimpleTableReorder.SimpleTableReorderDrag = SimpleTableReorderDrag;
})(SimpleTableReorder || (SimpleTableReorder = {}));
/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="ISimpleTableReorderDrop.ts" />
/// <reference path="SimpleTableReorderUuidUtil.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var SimpleTableReorder;
(function (SimpleTableReorder) {
    var SimpleTableReorderDrop = (function (_super) {
        __extends(SimpleTableReorderDrop, _super);
        //***************
        // METHODS - END
        //***************
        //*********************
        // CONSTRUCTOR - START
        //*********************
        function SimpleTableReorderDrop(rootScope, scope, element, attrs) {
            _super.call(this);
            //*******************
            // CONSTANTS - START
            //*******************
            this.DRAG_OVER_EVENT = 'dragover';
            this.DRAG_ENTER_EVENT = 'dragenter';
            this.DRAG_LEAVE_EVENT = 'dragleave';
            this.DROP_EVENT = 'drop';
            this.SIMPLE_TABLE_DRAG_START_EVENT = 'simpleTableDragStartEvent';
            this.SIMPLE_TABLE_DRAG_END_EVENT = 'simpleTableDragEndEvent';
            // base
            this.rootScope = rootScope;
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.init();
        }
        //******************
        // ATTRIBUTES - END
        //******************
        //**************************
        // OVERRIDE METHODS - START
        //**************************
        SimpleTableReorderDrop.prototype.init = function () {
            this.initUuid();
            _super.prototype.init.call(this);
        };
        SimpleTableReorderDrop.prototype.addEventListeners = function () {
            _super.prototype.addEventListeners.call(this);
            var self = this;
            this.element.bind(this.DRAG_OVER_EVENT, this.onDragOverHandler);
            this.element.bind(this.DRAG_ENTER_EVENT, this.onDragEnterHandler);
            this.element.bind(this.DRAG_LEAVE_EVENT, this.onDragLeaveHandler);
            this.element.bind(this.DROP_EVENT, function (event) {
                return self.onDropHandler(event);
            });
            this.rootScope.$on(this.SIMPLE_TABLE_DRAG_START_EVENT, function () {
                return self.onDragStartHandler();
            });
            this.rootScope.$on(this.SIMPLE_TABLE_DRAG_END_EVENT, function () {
                return self.onDragEndHandler();
            });
        };
        //************************
        // OVERRIDE METHODS - END
        //************************
        //*****************
        // METHODS - START
        //*****************
        SimpleTableReorderDrop.prototype.initUuid = function () {
            this.uuid = new SimpleTableReorder.SimpleTableReorderUuidUtil();
            var id = angular.element(this.element).attr("id");
            if (!id) {
                id = this.uuid.new();
                angular.element(this.element).attr("id", id);
            }
            this.id = id;
        };
        SimpleTableReorderDrop.prototype.onDragOverHandler = function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            event.dataTransfer.dropEffect = 'move';
            return false;
        };
        SimpleTableReorderDrop.prototype.onDragEnterHandler = function (event) {
            angular.element(event.target).addClass('simple-table-over');
        };
        SimpleTableReorderDrop.prototype.onDragLeaveHandler = function (event) {
            angular.element(event.target).removeClass('simple-table-over');
        };
        SimpleTableReorderDrop.prototype.onDropHandler = function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            var data = event.dataTransfer.getData("text");
            var src = document.getElementById(data);
            //var src = angular.element(data);
            var srcData = angular.element(src)[0];
            var oldIndex = srcData.cellIndex;
            var dest = angular.element(event.target)[0];
            var newIndex = dest.cellIndex;
            var parent = this.scope.$parent;
            var tableConfig = parent.tableConfig;
            var columns = tableConfig.columns;
            var dataColumn = columns[oldIndex];
            columns.splice(oldIndex, 1);
            if (newIndex === columns.length) {
                columns[newIndex] = dataColumn;
            }
            else {
                columns.splice(newIndex, 0, dataColumn);
            }
            angular.element(event.target).removeClass('simple-table-over');
            this.scope.onSymbolDrop({});
            this.scope.$apply();
        };
        SimpleTableReorderDrop.prototype.onDragStartHandler = function () {
            var element = document.getElementById(this.id);
            angular.element(element).addClass("simple-table-target");
        };
        SimpleTableReorderDrop.prototype.onDragEndHandler = function () {
            var element = document.getElementById(this.id);
            angular.element(element).removeClass("simple-table-target");
            angular.element(element).removeClass("simple-table-over");
        };
        return SimpleTableReorderDrop;
    })(SimpleTablePlugin.BaseSimpleTablePlugin);
    SimpleTableReorder.SimpleTableReorderDrop = SimpleTableReorderDrop;
})(SimpleTableReorder || (SimpleTableReorder = {}));
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/lodash/lodash.d.ts" />
/// <reference path="SimpleTableReorderDrag.ts" />
/// <reference path="SimpleTableReorderDrop.ts" />
angular.module('simpletable.reorder', ['simpletable.uuid.util']).directive('stTableDraggable', ['$timeout', '$rootScope', 'simpletableuuid', function ($timeout, $rootScope, uuid) {
    return {
        require: '^stTable',
        link: function (scope, element, attrs, parentCtrl) {
            return new SimpleTableReorder.SimpleTableReorderDrag($rootScope, scope, element, attrs);
        }
    };
}]).directive('stTableDropTarget', ['$timeout', '$rootScope', 'simpletableuuid', function ($timeout, $rootScope, uuid) {
    return {
        require: '^stTable',
        restrict: 'A',
        scope: {
            onSymbolDrop: '&'
        },
        link: function (scope, element, attrs, controller) {
            return new SimpleTableReorder.SimpleTableReorderDrop($rootScope, scope, element, attrs);
        }
    };
}]);
angular.module('simpletable.uuid.util', []).factory('simpletableuuid', function () {
    var svc = {
        new: function () {
            function _p8(s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        },
        empty: function () {
            return '00000000-0000-0000-0000-000000000000';
        }
    };
    return svc;
});
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../core/ISimpleTablePlugin.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.ts" />
/// <reference path="ISimpleTableResize.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
var SimpleTableResize;
(function (_SimpleTableResize) {
    var SimpleTableResize = (function () {
        //************************
        // OVERRIDE METHODS - END
        //************************
        //*****************
        // METHODS - START
        //*****************
        function SimpleTableResize(scope, element, attrs, $window) {
            //*******************
            // CONSTANTS - START
            //*******************
            this.RESIZE_TYPE_FIXED = 'fixed';
            this.RESIZE_TYPE_ADJUSTABLE = 'adjustable';
            this.WIDTH_PIXELS_TYPE = 'px';
            this.WIDTH_PERCENTAGE_TYPE = '%';
            this.initializationComplete = false;
            this.minColumnWidth = 25;
            this.isMouseDown = false;
            this.startX = 0;
            this.indexColumnResize = 0;
            this.orginalColumnWidth = 0;
            this.parentMoveHandle = null;
            this.table = null;
            this.tableHeaderColumnList = null;
            this.originalTableWidth = 0;
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.$window = $window;
        }
        //******************
        // ATTRIBUTES - END
        //******************
        //**************************
        // OVERRIDE METHODS - START
        //**************************
        SimpleTableResize.prototype.init = function () {
            this.initializationComplete = true;
            this.addEventListeners();
        };
        SimpleTableResize.prototype.isInitialized = function () {
            return this.initializationComplete;
        };
        SimpleTableResize.prototype.addEventListeners = function () {
        };
        SimpleTableResize.prototype.removeEventListeners = function () {
        };
        SimpleTableResize.prototype.onMouseDownHandler = function (event, scope, element) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            if (!this.table) {
                var th = angular.element(element).parent();
                var tr = angular.element(th).parent();
                var tHead = angular.element(tr).parent();
                this.tableHeaderColumnList = angular.element(tr).children();
                this.table = angular.element(tHead).parent();
            }
            this.parentMoveHandle = angular.element(element).parent();
            this.isMouseDown = true;
            this.startX = event.clientX;
            this.indexColumnResize = scope.$index;
            this.orginalColumnWidth = scope.hcol.style.width;
            this.originalTableWidth = angular.element(this.table).width();
            var self = this;
            angular.element('body').addClass('resize-cursor');
            angular.element(this.table).addClass('resize-cursor');
            angular.element(this.$window).on('mousemove', function (event) {
                var parentScope = self.scope;
                parentScope.simpleTableResize.onMouseMoveHandler(event, scope, element);
            });
            angular.element(this.$window).on('mouseup', function (event) {
                var parentScope = self.scope;
                parentScope.simpleTableResize.onMouseUpHandler(event, scope, element);
            });
        };
        SimpleTableResize.prototype.onMouseMoveHandler = function (event, scope, element) {
            if (!this.isMouseDown) {
                return;
            }
            var tableConfig = scope.tableConfig;
            if (tableConfig.resizeType === this.RESIZE_TYPE_FIXED) {
                this.updateFixedTableColumns(event, tableConfig, scope);
            }
            if (tableConfig.resizeType === this.RESIZE_TYPE_ADJUSTABLE) {
                this.updateAdjustableTableColumns(event, tableConfig, scope);
            }
        };
        SimpleTableResize.prototype.updateFixedTableColumns = function (event, tableConfig, scope) {
            var width = 0;
            width = event.clientX - this.startX;
            tableConfig.columns[this.indexColumnResize].style.width = this.calculateNewColumnWidth(tableConfig, this.orginalColumnWidth, width);
            if (!this.isMinColumnWidth(this.orginalColumnWidth, width)) {
                tableConfig.tableWidth = this.calculateNewTableWidth(width);
            }
            scope.$apply();
        };
        SimpleTableResize.prototype.calculateNewTableWidth = function (extraWidth) {
            var newWidth = this.originalTableWidth + extraWidth;
            return newWidth + this.WIDTH_PIXELS_TYPE;
        };
        SimpleTableResize.prototype.updateAdjustableTableColumns = function (event, tableConfig, scope) {
            var width = 0;
            width = event.clientX - this.startX;
            tableConfig.columns[this.indexColumnResize].style.width = this.calculateNewColumnWidth(tableConfig, this.orginalColumnWidth, width);
            scope.$apply();
        };
        SimpleTableResize.prototype.calculateNewColumnWidth = function (tableConfig, actualWidth, moveWidth) {
            var widthType = this.getWidthType(actualWidth);
            if (widthType === this.WIDTH_PIXELS_TYPE) {
                return this.calculatePixels(actualWidth, moveWidth);
            }
            if (widthType === this.WIDTH_PERCENTAGE_TYPE) {
                return this.calculatePercentage(tableConfig, actualWidth, moveWidth);
            }
            return actualWidth;
        };
        SimpleTableResize.prototype.calculatePixels = function (actualWidth, moveWidth) {
            var columnWidth = this.getWidthInNumber(actualWidth);
            columnWidth = columnWidth + moveWidth;
            if (this.minColumnWidth > columnWidth) {
                columnWidth = this.minColumnWidth;
            }
            return columnWidth + this.WIDTH_PIXELS_TYPE;
        };
        SimpleTableResize.prototype.calculatePercentage = function (tableConfig, actualWidth, moveWidth) {
            var columnWidthPercent = this.getWidthInNumber(actualWidth);
            var columnWidth = 0;
            if (tableConfig.resizeType === this.RESIZE_TYPE_FIXED) {
                columnWidth = ((this.originalTableWidth + moveWidth) * columnWidthPercent) / 100;
            }
            else {
                columnWidth = (this.originalTableWidth * columnWidthPercent) / 100;
            }
            columnWidth = columnWidth + moveWidth;
            if (this.minColumnWidth > columnWidth) {
                columnWidth = this.minColumnWidth;
            }
            var newPercentage = 0;
            if (tableConfig.resizeType === this.RESIZE_TYPE_FIXED) {
                newPercentage = (columnWidth / (this.originalTableWidth + moveWidth)) * 100;
            }
            else {
                newPercentage = (columnWidth / this.originalTableWidth) * 100;
            }
            return newPercentage + this.WIDTH_PERCENTAGE_TYPE;
        };
        SimpleTableResize.prototype.isMinColumnWidth = function (actualWidth, moveWidth) {
            var widthType = this.getWidthType(actualWidth);
            var columnWidth = this.getWidthInNumber(actualWidth);
            if (widthType === this.WIDTH_PERCENTAGE_TYPE) {
                columnWidth = (this.originalTableWidth * columnWidth) / 100;
            }
            columnWidth = columnWidth + moveWidth;
            if (this.minColumnWidth > columnWidth) {
                return true;
            }
            return false;
        };
        SimpleTableResize.prototype.onMouseUpHandler = function (event, scope, element) {
            angular.element('body').removeClass('resize-cursor');
            angular.element(this.table).removeClass('resize-cursor');
            angular.element(this.$window).off('mousemove');
            angular.element(this.$window).off('mouseup');
            this.isMouseDown = false;
            var columnData = scope.hcol;
            var tableConfig = scope.$parent.tableConfig;
            if (tableConfig.resizeType === this.RESIZE_TYPE_ADJUSTABLE) {
                this.updateOtherColumns(columnData, tableConfig);
            }
        };
        SimpleTableResize.prototype.updateOtherColumns = function (columnData, tableConfig) {
            var oldWidth = this.getWidthInNumber(this.orginalColumnWidth);
            var newWidth = this.getWidthInNumber(columnData.style.width);
            if (newWidth > oldWidth) {
                this.removeWidth((newWidth - oldWidth), tableConfig, columnData.id);
                return;
            }
            if (oldWidth > newWidth) {
                this.addWidth((oldWidth - newWidth), tableConfig, columnData.id);
                return;
            }
        };
        SimpleTableResize.prototype.addWidth = function (widthToAdd, tableConfig, updatedColumnId) {
            for (var i = 0; i < tableConfig.columns.length; i++) {
                var th = this.tableHeaderColumnList[i];
                if (updatedColumnId === th.id) {
                    continue;
                }
                var column = this.getColumnDataById(th.id, tableConfig);
                var type = this.getWidthType(column.style.width);
                var originalWidth = angular.element(th).width();
                column.style.width = this.convertToPixelsOrPercentage(originalWidth, type);
            }
        };
        SimpleTableResize.prototype.removeWidth = function (widthToRemove, tableConfig, updatedColumnId) {
            for (var i = 0; i < tableConfig.columns.length; i++) {
                var th = this.tableHeaderColumnList[i];
                if (updatedColumnId === th.id) {
                    continue;
                }
                var column = this.getColumnDataById(th.id, tableConfig);
                var type = this.getWidthType(column.style.width);
                var originalWidth = angular.element(th).width();
                column.style.width = this.convertToPixelsOrPercentage(originalWidth, type);
            }
        };
        SimpleTableResize.prototype.convertToPixelsOrPercentage = function (originalWidth, widthType) {
            if (widthType === this.WIDTH_PIXELS_TYPE) {
                return originalWidth + this.WIDTH_PIXELS_TYPE;
            }
            var newWidth = (originalWidth / this.originalTableWidth) * 100;
            return newWidth + this.WIDTH_PERCENTAGE_TYPE;
        };
        SimpleTableResize.prototype.getColumnDataById = function (id, tableConfig) {
            for (var i = 0; i < tableConfig.columns.length; i++) {
                var column = tableConfig.columns[i];
                if (id === column.id) {
                    return column;
                }
            }
            return null;
        };
        SimpleTableResize.prototype.getWidthInNumber = function (width) {
            var stringWidth = '';
            var widthType = this.getWidthType(width);
            if (widthType === this.WIDTH_PIXELS_TYPE) {
                stringWidth = width.substring(0, width.length - 2);
            }
            else {
                stringWidth = width.substring(0, width.length - 1);
            }
            var columnWidth = parseFloat(stringWidth);
            return columnWidth;
        };
        SimpleTableResize.prototype.getWidthType = function (width) {
            var widthType = width.substring(width.length - 2, width.length);
            if (widthType === this.WIDTH_PIXELS_TYPE) {
                return this.WIDTH_PIXELS_TYPE;
            }
            return this.WIDTH_PERCENTAGE_TYPE;
        };
        return SimpleTableResize;
    })();
    _SimpleTableResize.SimpleTableResize = SimpleTableResize;
})(SimpleTableResize || (SimpleTableResize = {}));
/// <reference path="SimpleTableResize.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
angular.module('simpletable.resizable', []).directive('stTableResizable', ['$timeout', '$window', function ($timeout, $window) {
    return {
        require: '^stTable',
        restrict: 'A',
        controller: function ($scope, $element, $attrs) {
            if (!$scope.simpleTableResize) {
                $scope.simpleTableResize = new SimpleTableResize.SimpleTableResize($scope, $element, $attrs, $window);
            }
            // Controller referenced as this in ang 1.3
            this.getParent = function () {
                return $scope.simpleTableResize;
            };
            return $scope.simpleTableResize;
        },
        link: function ($scope, $element, $attrs, parent) {
            //$element.on('mousemove', function(event){$scope.simpleTableResize.onMouseMoveHandler(event, $scope, $element);});
            //$element.on('mouseup', function(event){$scope.simpleTableResize.onMouseUpHandler(event, $scope, $element);});
            if (!$scope.simpleTableResize) {
                $scope.simpleTableResize = new SimpleTableResize.SimpleTableResize($scope, $element, $attrs, $window);
            }
            $scope.simpleTableResize.parent = parent;
            //$scope.simpleTableResize.doRegister();
            $scope.simpleTableResize.init();
            return $scope.simpleTableResize;
        }
    };
}]).directive('stTableResizableHandler', ['$timeout', function ($timeout) {
    return {
        require: '^stTableResizable',
        restrict: 'A',
        link: function (scope, element, attrs, parentCtrl) {
            element.on('mousedown', function (event) {
                parentCtrl.getParent().onMouseDownHandler(event, scope, element);
            });
        }
    };
}]);
/// <reference path="ISimpleTable.ts" />
/// <reference path="../core/ISimpleTablePlugin.ts" />
/// <reference path="../factory/SimpleTablePluginFactory.ts" />
/// <reference path="../../../../typings/log4javascript/log4javascript.d.ts" />
var SimpleTable;
(function (_SimpleTable) {
    var SimpleTable = (function () {
        // Methods
        function SimpleTable(scope, element, attrs, $timeout, pluginFactory) {
            this.plugins = [];
            this.initializationComplete = false;
            // base
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            // services
            this.$timeout = $timeout;
            this.pluginFactory = pluginFactory;
            // variables
            this.scope.simpleTable = this;
            this.init();
            console.log("SimpleTable created: ", this.scope);
        }
        SimpleTable.prototype.init = function () {
            this.notifyPreInitialization();
            this.addEventListeners();
            this.validateConfig();
            this.initDefaultPlugins();
        };
        SimpleTable.prototype.registerPlugin = function (plugin) {
            console.log("initializing plugins...", plugin);
            this.plugins.push(plugin);
            this.initPlugins();
        };
        SimpleTable.prototype.initPlugins = function () {
            if (this.initPluginTimeout) {
                this.$timeout.cancel(this.initPluginTimeout);
                this.initPluginTimeout = null;
            }
            this.initPluginTimeout = this.$timeout(angular.bind(this, this.doInitPlugins), 0);
        };
        SimpleTable.prototype.addEventListeners = function () {
            this.scope.$on("$destroy", this.removeEventListeners);
            this.scope.$watch("tableData", angular.bind(this, this.onDataChanged));
        };
        SimpleTable.prototype.removeEventListeners = function () {
            console.log("removing listeners...", this);
        };
        SimpleTable.prototype.validateConfig = function () {
        };
        SimpleTable.prototype.initDefaultPlugins = function () {
            this.pluginFactory.newPluginSelection().doRegister(this);
            this.pluginFactory.newPluginSort().doRegister(this);
        };
        SimpleTable.prototype.doInitPlugins = function () {
            var self = this;
            angular.forEach(this.plugins, function (plugin) {
                if (plugin.isInitialized()) {
                    return;
                }
                plugin.onRegistered(self);
            });
            this.notifyInitializationComplete();
        };
        SimpleTable.prototype.onDataChanged = function (newValue, oldValue) {
            console.log("SimpleTable.onDataChanged...: ", this.initializationComplete);
            if (this.initializationComplete) {
                this.notifyPluginsDataChanged(newValue, oldValue);
            }
        };
        SimpleTable.prototype.onRowClicked = function ($event, row) {
            console.log("Row clicked: ", arguments);
            this.scope.$broadcast("onRowClicked", $event, row);
        };
        SimpleTable.prototype.onHeaderClicked = function ($event, column) {
            console.log("Header clicked: ", arguments);
            this.scope.$broadcast("onHeaderClicked", $event, column);
        };
        SimpleTable.prototype.notifyPreInitialization = function () {
            this.notifyListener("onPreInitialization", this);
        };
        SimpleTable.prototype.notifyInitializationComplete = function () {
            if (this.initializationComplete) {
                return;
            }
            this.initializationComplete = true;
            this.notifyListener("onInitializationComplete", this);
        };
        SimpleTable.prototype.notifyListener = function (eventName, params) {
            if (!this.scope.tableConfig.listeners || !this.scope.tableConfig.listeners[eventName]) {
                return;
            }
            this.scope.tableConfig.listeners[eventName](params);
        };
        SimpleTable.prototype.notifyPluginsDataChanged = function (newValue, oldValue) {
            for (var i = 0; i < this.plugins.length; i++) {
                var plugin = this.plugins[i];
                if (!plugin.onDataChanged) {
                    continue;
                }
                plugin.onDataChanged(newValue, oldValue);
            }
        };
        return SimpleTable;
    })();
    _SimpleTable.SimpleTable = SimpleTable;
})(SimpleTable || (SimpleTable = {}));
/// <reference path="SimpleTable.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
angular.module('simpletable.table', []).directive('stTable', ['$timeout', 'SimpleTablePluginFactory', function ($timeout, SimpleTablePluginFactory) {
    return {
        restrict: 'AE',
        scope: {
            tableConfig: '=',
            tableData: '='
        },
        controller: function ($scope, $element, $attrs) {
            return new SimpleTable.SimpleTable($scope, $element, $attrs, $timeout, SimpleTablePluginFactory);
        },
        template: "<div ng-style='{width:tableConfig.tableWidth}'>" + "  <table ng-class='tableConfig.classes' ng-style='{width:tableConfig.tableWidth}'>" + "    <thead>" + "      <tr>" + "        <th id='{{hcol.id}}' class='table-header' " + "         ng-click='simpleTable.onHeaderClicked($event, hcol)'    " + "         ng-repeat='hcol in tableConfig.columns' " + "         ng-class='hcol.headerClass' " + "         height='{{tableConfig.headerHeight}}' width='{{hcol.style.width}}' " + "         st-table-drop-target='true' st-table-draggable='true'>" + "          {{hcol.title}}" + "          <div st-table-resizable-handler class='table-header-cursor-container'></div>" + "        </th>" + "      </tr>" + "    </thead>" + "    <tbody ng-if='!tableConfig.rowTemplate'>" + "      <tr ng-click='simpleTable.onRowClicked($event, row)' ng-class='{selected: simpleTable.selection.isRowSelected(row)}' " + "        ng-repeat='row in tableData | filter:tableConfig.filter | orderBy:simpleTable.sortManager.currentSort:simpleTable.sortManager.currentSortReverse ' >" + "        <td ng-repeat='col in tableConfig.columns' ng-class='col.cellClass'>" + "          <span ng-if='!col.template'>{{row[col.field]}}</span>     " + "          <span ng-if='!!col.template' ng-include='col.template'></span>     " + "        </td>" + "      </tr>" + "    </tbody>" + "    <tbody ng-if='tableConfig.rowTemplate' ng-include='tableConfig.rowTemplate'>" + "    </tbody>" + "  </table>" + "</div>"
    };
}]);
//# sourceMappingURL=simple-table-debug.js.map