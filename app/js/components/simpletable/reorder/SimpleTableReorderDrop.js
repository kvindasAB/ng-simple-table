var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../core/BaseSimpleTablePlugin.ts" />
/// <reference path="ISimpleTableReorderDrop.ts" />
/// <reference path="SimpleTableReorderUuidUtil.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var SimpleTableReorder;
(function (SimpleTableReorder) {
    var SimpleTableReorderDrop = (function (_super) {
        __extends(SimpleTableReorderDrop, _super);
        function SimpleTableReorderDrop(rootScope, scope, element, attrs) {
            _super.call(this);
            this.DRAG_OVER_EVENT = 'dragover';
            this.DRAG_ENTER_EVENT = 'dragenter';
            this.DRAG_LEAVE_EVENT = 'dragleave';
            this.DROP_EVENT = 'drop';
            this.SIMPLE_TABLE_DRAG_START_EVENT = 'simpleTableDragStartEvent';
            this.SIMPLE_TABLE_DRAG_END_EVENT = 'simpleTableDragEndEvent';
            this.rootScope = rootScope;
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.init();
        }
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
            var parent = this.scope.$parent;
            var tableConfig = parent.tableConfig;
            var columns = tableConfig.columns;
            var data = event.dataTransfer.getData("text");
            var src = angular.element('#' + data);
            var srcData = angular.element(src)[0];
            var oldIndex = this.getIndexById(columns, srcData.id);
            var dest = angular.element(event.target)[0];
            var newIndex = this.getIndexById(columns, dest.id);
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
        SimpleTableReorderDrop.prototype.getIndexById = function (columns, id) {
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].id === id) {
                    return i;
                }
            }
            return 0;
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
//# sourceMappingURL=SimpleTableReorderDrop.js.map