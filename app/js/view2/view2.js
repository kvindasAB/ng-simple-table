'use strict';

angular.module('myApp.view2', ['ui.router', 'simpletable'])

  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state( 'view2', {
      url: '/view2',
      templateUrl: 'js/view2/view2.html',
      controller: 'View2Ctrl'
    });
    var log = log4javascript.getLogger(),
        consoleAppender = new log4javascript.BrowserConsoleAppender();
    consoleAppender.setLayout(new log4javascript.PatternLayout("%r %p %c - %m%n"))
    log.addAppender(consoleAppender);
    log.debug("init log4javascript...");
  }])

.controller('View2Ctrl', ['$scope', "$log", function($scope, $log) {

    $scope.data = [
        {id: 1, name: "Roy", lastname: "Bonilla", age: 25},
        {id: 2, name: "Kib", lastname: "Vindas", age: 25},
        {id: 3, name: "Roy", lastname: "Bonilla", age: 25},
        {id: 4, name: "Kib", lastname: "Vindas", age: 25},
        {id: 5, name: "Roy", lastname: "Bonilla", age: 25},
        {id: 6, name: "Kib", lastname: "Vindas", age: 25},
        {id: 7, name: "Roy", lastname: "Bonilla", age: 25},
        {id: 8, name: "Kib", lastname: "Vindas", age: 25},
        {id: 9, name: "Roy", lastname: "Bonilla", age: 25},
        {id: 10, name: "Kib", lastname: "Vindas", age: 25},
        {id: 11, name: "Roy", lastname: "Bonilla", age: 25},
        {id: 12, name: "Kib", lastname: "Vindas", age: 25},
        {id: 13, name: "Roy", lastname: "Bonilla", age: 25},
        {id: 14, name: "Kib", lastname: "Vindas", age: 25}
    ];

    $scope.columns = [
        {title: "Id", field: 'id', style: {width: "150px"}, headerClass:["myclass1", "myclass2"], cellClass:["cellclass1", "cellclass2"], template: "js/view2/col1tpl.html"},
        {title: "Name", field: 'name', style: {width: "150px"} },
        {title: "Last Name", field: 'lastname', style: {width: "150px"} },
        {title: "Age", field: 'age', style: {width: "150px"}}
    ];

    $scope.tableConfig = {
        classes: ["table", "table-bordered", 'table-padding'],
        selectionMultiple: true,
        columns: $scope.columns,
        tableWidth: '100%',
        headerHeight: '30px',
        resizeType: 'fixed',
        listeners: {
            onPreInitialization: function(tableApi){
                $log.log("onPreInitialization: ", tableApi);
                $scope.tableApi = tableApi;
            },
            onInitializationComplete: function(tableApi){
                $log.log("onInitializationComplete: ", tableApi);
                $scope.selection = $scope.tableApi.selection.selectedRows;
            },
            onHeaderSortEnd: function(column){
                $log.log("onHeaderSortEnd: ", column);
            },
            onSortEnd: function(column){
                $log.log("onSortEnd: ", column);
            }

        }
    };

    $scope.selectedSpecificRows = function(){
        $scope.tableApi.selection.setSelectedRows([$scope.data[0], $scope.data[1]]);
    };

    $scope.changeCols = function(){
        var elem = $scope.columns.shift();
        $scope.columns.push(elem);
    };

    $scope.validateFilter = function(){
        $log.log($scope.tableConfig);
    };

    $scope.buttonTest = function(){
        $log.log('Test');
    };

    $scope.changeData = function(){
        var old = $scope.data;
        $scope.data = [
            {id: 1, name: "New", lastname: "User", age: 25},
            old[1],
            {id: 3, name: "New", lastname: "User", age: 25},
            old[3],
            old[4],
            old[5],
            {id: 6, name: "New", lastname: "User", age: 25},
            {id: 7, name: "Another", lastname: "User", age: 25},
            old[8],
            {id: 8, name: "New", lastname: "User", age: 25},
            {id: 9, name: "Another", lastname: "User", age: 25},
            {id: 10, name: "New", lastname: "User", age: 25},
            {id: 11, name: "Another", lastname: "User", age: 25}
        ];
    };

    $scope.onTableComplete = function(tableApi){
        $log.log("Table API: ", tableApi);
    };

    $scope.sortByCol1 = function(){
        $scope.tableApi.sortManager.setSortByColumn($scope.columns[0], "asc");
    };

    $scope.sortByCol2 = function(){
        $scope.tableApi.sortManager.setSortByColumn($scope.columns[1], "desc");
    };


}]);