var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../core/BaseComponentUI.ts" />
/// <reference path="../tpl/STTemplates.ts" />
var STBodyUI;
(function (STBodyUI) {
    var Body = (function (_super) {
        __extends(Body, _super);
        function Body() {
            _super.apply(this, arguments);
        }
        Body.prototype.init = function () {
            this.validateCustomTemplate();
        };
        Body.prototype.shouldUseCustomTemplate = function () {
            var tableConfig = this.scope.tableConfig;
            return tableConfig && tableConfig.rowTemplate;
        };
        Body.prototype.validateCustomTemplate = function () {
            if (!this.shouldUseCustomTemplate()) {
                this.applyTemplate(this.getTemplateByCacheId(STTemplates.STTpls.BODY_TPL_ID), this.scope);
                return;
            }
            this.applyTemplate(this.getCustomTemplate(this.scope), this.scope);
        };
        Body.prototype.applyTemplate = function (tpl, scope) {
            var dom = angular.element(tpl);
            var link = this.$compile(dom);
            this.element.append(dom);
            link(scope);
        };
        Body.prototype.getCustomTemplate = function (scope) {
            return scope.tableConfig.rowTemplate;
        };
        return Body;
    })(STCore.BaseComponentUI);
    STBodyUI.Body = Body;
})(STBodyUI || (STBodyUI = {}));
//# sourceMappingURL=STBodyUI.js.map