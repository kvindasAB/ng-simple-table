/// <reference path="../table/SimpleTable.ts" />
var STRowUI;
(function (STRowUI) {
    var Row = (function () {
        function Row() {
        }
        Row.prototype.link = function (scope, element, attrs, simpleTable) {
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
            this.simpleTable = simpleTable;
        };
        Row.prototype.init = function () {
            this.addEventListeners();
        };
        Row.prototype.addEventListeners = function () {
            this.element.on('click', angular.bind(this, this.onRowClicked));
            this.element.on('dblclick', angular.bind(this, this.onRowDoubleClicked));
            this.element.on('mouseenter', angular.bind(this, this.onRowMouseEnter));
            this.element.on('mouseleave', angular.bind(this, this.onRowMouseLeave));
            this.element.on('$destroy', angular.bind(this, this.removeEventListeners));
        };
        Row.prototype.removeEventListeners = function () {
            if (!this.element) {
                return;
            }
            this.element.off();
        };
        Row.prototype.onRowClicked = function (event) {
            //console.log('onRowClicked: ', event, this);
            this.simpleTable.onRowClicked(event, this.scope.row);
        };
        Row.prototype.onRowDoubleClicked = function (event) {
            //console.log('onRowDoubleClicked');
            this.simpleTable.onRowDoubleClicked(event, this.scope.row);
        };
        Row.prototype.onRowMouseEnter = function (event) {
            //console.log('onRowMouseEnter');
            this.simpleTable.onRowMouseEnter(event, this.scope.row);
        };
        Row.prototype.onRowMouseLeave = function (event) {
            //console.log('onRowMouseLeave');
            this.simpleTable.onRowMouseLeave(event, this.scope.row);
        };
        return Row;
    })();
    STRowUI.Row = Row;
})(STRowUI || (STRowUI = {}));
//# sourceMappingURL=STRowUI.js.map