/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="ISimpleTablePlugin.ts" />
/// <reference path="IDisposable.ts" />
/// <reference path="STConstants.ts" />
var STCore;
(function (STCore) {
    var Config = (function () {
        function Config(data) {
            this._data = data;
        }
        Config.prototype.syncFromData = function (data) {
            data = data ? data : this._data;
            this.tableClasses = data.tableClasses;
            this.tableWidth = data.tableWidth;
            this.headerHeight = angular.isUndefined(data.headerHeight) ? '30px' : data.headerHeight;
            this.columns = data.columns;
            this.rowTemplate = data.rowTemplate;
            this.selectionType = angular.isUndefined(data.selectionType) ? STCore.Constants.SELECTION_SINGLE : data.selectionType;
            this.listeners = data.listeners;
            this.methods = data.methods;
            this.virtualScroll = angular.isUndefined(data.virtualScroll) ? false : data.virtualScroll;
        };
        return Config;
    })();
    STCore.Config = Config;
})(STCore || (STCore = {}));
//# sourceMappingURL=STConfig.js.map