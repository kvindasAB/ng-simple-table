/// <reference path="../table/SimpleTable.ts" />
var STUtil;
(function (STUtil) {
    var Util = (function () {
        function Util() {
        }
        Util.generateToken = function (len) {
            if (len === void 0) { len = 8; }
            var id = (Math.random() + 1).toString(36).substring(2, 2 + len);
            return id;
        };
        return Util;
    })();
    STUtil.Util = Util;
})(STUtil || (STUtil = {}));
//# sourceMappingURL=STUtil.js.map