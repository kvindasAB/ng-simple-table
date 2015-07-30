/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../util/STUtil.ts" />
var STColumn;
(function (STColumn) {
    var Column = (function () {
        function Column(data) {
            this.active = true;
            this._data = data;
        }
        Column.prototype.syncFromData = function (data) {
            data = data ? data : this._data;
            this.id = data.id ? data.id : STUtil.Util.generateToken();
            this.field = data.field;
            this.title = data.title ? data.title : data.field;
            this.active = angular.isUndefined(data.active) ? true : data.active;
            this.style = data.style;
            this.headerClass = data.headerClass;
            this.cellClass = data.cellClass;
            this.cellTemplate = data.cellTemplate;
            this.cellTemplateId = data.cellTemplateId;
        };
        return Column;
    })();
    STColumn.Column = Column;
})(STColumn || (STColumn = {}));
//# sourceMappingURL=STColumn.js.map