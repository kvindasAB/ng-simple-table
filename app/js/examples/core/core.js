'use strict';

angular.module('stable.examples.core', ['ui.router'])

.factory('DataGenerator', [function(){

        var service = {};

        service.generateRows = function(qty){
            var data = [];
            for(var i=1; i <= qty; i++){
                data.push(this.generateRow(i));
            }
            return data;
        };

        service.generateRow = function(id){
            return {
                id: id,
                name: chance.name(),
                phone: chance.phone(),
                age: Math.floor(Math.random() * 100),
                address: chance.address()
            }
        };

        return service;
    }]);