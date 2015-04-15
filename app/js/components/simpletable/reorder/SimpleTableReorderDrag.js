var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
//# sourceMappingURL=SimpleTableReorderDrag.js.map