var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })

        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'aboutController'
        })

        .when('/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'contactController'
        });
});

app.controller('bodyController', function ($scope) {
    $scope.text = 'Ваш текст';
    $scope.cost = 0;

    $scope.$watch("text", function () {
        $scope.cost = $scope.text.length * 15;
    });
});

app.controller('aboutController', function ($scope) {
    $scope.message = '';
});

app.controller('contactController', function ($scope) {
    $scope.message = '';
});