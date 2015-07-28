/// <reference path="../table/SimpleTable.ts" />
/// <reference path="./STColumn.ts" />
var STColumn;
(function (STColumn) {
    var ColumnManager = (function () {
        function ColumnManager() {
        }
        ColumnManager.prototype.processConfig = function (tableConfig) {
            console.log('Processing columns - start');
            if (!tableConfig && !tableConfig.columns) {
                return;
            }
            this.createColumns(tableConfig);
            tableConfig.columns = this.columns;
            console.log('Processing columns - end', tableConfig.columns);
        };
        ColumnManager.prototype.createColumns = function (tableConfig) {
            var len = tableConfig && tableConfig.columns ? tableConfig.columns.length : 0;
            var columns = [];
            for (var i = 0; i < len; i++) {
                var col = new STColumn.Column(tableConfig.columns[i]);
                col.syncFromData();
                columns.push(col);
            }
            this.columns = columns;
        };
        return ColumnManager;
    })();
    STColumn.ColumnManager = ColumnManager;
})(STColumn || (STColumn = {}));
//# sourceMappingURL=STColumnManager.js.map