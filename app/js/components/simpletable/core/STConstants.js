/// <reference path="../../../../typings/angularjs/angular.d.ts" />
var STCore;
(function (STCore) {
    var Constants = (function () {
        function Constants() {
        }
        Constants.SELECTION_NONE = 'none';
        Constants.SELECTION_SINGLE = 'single';
        Constants.SELECTION_MULTIPLE = 'multiple';
        Constants.RESIZE_NONE = 'none';
        Constants.RESIZE_RELATIVE = 'relative';
        Constants.RESIZE_FIXED = 'fixed';
        Constants.UNIT_PIXELS = 'px';
        Constants.UNIT_PERCENTAGE = '%';
        return Constants;
    })();
    STCore.Constants = Constants;
})(STCore || (STCore = {}));
//# sourceMappingURL=STConstants.js.map