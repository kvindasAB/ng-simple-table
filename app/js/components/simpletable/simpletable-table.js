'use strict';

angular.module('simpletable.table', [])
.directive('stTable', ['$log', function($log) {

    return {
      restrict: 'AE',
      scope: {
        tableConfig: "=",
        tableData: "="
      },
      link: function(scope, element, attrs, parentCtrl) {
        scope.tableConfig.tableEl = element;
      },
      template:
      "<table ng-class='tableConfig.classes'>" +
      "<thead>" +
      " <tr>" +
      "   <th ng-repeat='hcol in tableConfig.columns'>{{hcol.title}}</th>" +
      " </tr>" +
      "</thead>" +
      "<tbody>" +
      " <tr ng-repeat='row in tableData'>" +
      "   <td ng-repeat='col in tableConfig.columns'>" +
      "     <span ng-if='!col.template'>{{row[col.field]}}</span>     " +
      "     <span ng-if='!!col.template' ng-include='col.template'></span>     " +
      "   </td>" +
      " </tr>" +
      "</tbody>" +
      "</table>"
    };


}]);
