'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp.view3'));

  describe('view3 controller', function(){

    it('should ....', inject(function($controller, $rootScope) {
      var $scope = $rootScope.$new();
      var view1Ctrl = $controller('View3Ctrl', {$scope: $scope});
      expect(view1Ctrl).toBeDefined();
    }));

  });
});