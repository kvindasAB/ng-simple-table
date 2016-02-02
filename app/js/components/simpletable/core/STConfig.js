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
            this.headerHeight = angular.isUndefined(data.headerHeight) ? STCore.Constants.DEFAULT_ROW_HEIGHT : data.headerHeight;
            this.columns = data.columns;
            this.rowTemplate = data.rowTemplate;
            this.rowTemplateId = data.rowTemplateId;
            this.selectionType = angular.isUndefined(data.selectionType) ? STCore.Constants.SELECTION_SINGLE : data.selectionType;
            this.listeners = data.listeners;
            this.methods = data.methods;
            this.virtualScroll = angular.isUndefined(data.virtualScroll) ? false : data.virtualScroll;
            this.resizeType = angular.isUndefined(data.resizeType) ? STCore.Constants.RESIZE_NONE : data.resizeType;
        };
        Config.prototype.isResizeActive = function () {
            return this.resizeType !== STCore.Constants.RESIZE_NONE;
        };
        return Config;
    })();
    STCore.Config = Config;
})(STCore || (STCore = {}));
//# sourceMappingURL=STConfig.js.map