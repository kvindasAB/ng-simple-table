var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../table/SimpleTable.ts" />
/// <reference path="../core/BaseComponentUI.ts" />
/// <reference path="../core/STConfig.ts" />
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
            return tableConfig && (tableConfig.rowTemplate || tableConfig.rowTemplateId);
        };
        Body.prototype.validateCustomTemplate = function () {
            if (!this.shouldUseCustomTemplate()) {
                this.applyTemplate(this.getDefaultTemplate(this.isVirtualScrollEnabled()), this.scope);
                return;
            }
            this.applyTemplate(this.getCustomTemplate(this.scope), this.scope);
        };
        Body.prototype.getDefaultTemplate = function (virtualScroll) {
            if (virtualScroll) {
                return this.getTemplateByCacheId(STTemplates.STTpls.BODY_VS_TPL_ID);
            }
            return this.getTemplateByCacheId(STTemplates.STTpls.BODY_TPL_ID);
        };
        Body.prototype.applyTemplate = function (tpl, scope) {
            var dom = angular.element(tpl);
            var link = this.$compile(dom);
            this.element.append(dom);
            link(scope);
        };
        Body.prototype.getCustomTemplate = function (scope) {
            var tableConfig = this.scope.tableConfig;
            if (tableConfig.rowTemplateId) {
                return this.getTemplateByCacheId(tableConfig.rowTemplateId);
            }
            return tableConfig.rowTemplate;
        };
        Body.prototype.isVirtualScrollEnabled = function () {
            return !(this.attrs.virtualScroll === 'false');
        };
        return Body;
    })(STCore.BaseComponentUI);
    STBodyUI.Body = Body;
})(STBodyUI || (STBodyUI = {}));
//# sourceMappingURL=STBodyUI.js.map