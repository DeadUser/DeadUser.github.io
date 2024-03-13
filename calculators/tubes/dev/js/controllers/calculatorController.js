'use strict';
app.controller("calculatorController", function ($scope) {
    $scope.list = [];

    $scope.phone = {
        name: 'Nokia Lumia 630',
        year: 2014,
        price: 200,
        company: {
            name: 'Nokia',
            country: 'Финляндия'
        }
    };

    $scope.addItem = function (text, price) {
        price = parseFloat(price);
        if (text != "" && !isNaN(price))
            $scope.list.items.push({ purchase: text, price: price, done: false });
    };

    $scope.deleteItem = function (text, price) {
        price = parseFloat(price);
        if (text != "" && !isNaN(price))
            $scope.list.items.push({ purchase: text, price: price, done: false });
    };

    $scope.isItExist = function (descr) {
        price = parseFloat(price);
        if ($scope.list.items.filter(o => o.descr == descr) > 0)
            return true;
        return false;
    };

});