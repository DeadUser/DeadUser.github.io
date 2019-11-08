var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
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

app.controller('mainController', function($scope) {
    $scope.cost = 0;
    $scope.fonts = [
        `'Pacifico', cursive`,
        `'Caveat', cursive`,
        `'Poiret One', cursive`,
        `'Russo One', sans-serif`,
        `'Marck Script', cursive`,
        `'Bad Script', cursive`,
        `'Press Start 2P', cursive`,
        `'Times New Roman', Times, serif`,
        `Arial, Helvetica, sans-serif`,
        `'Courier New', Courier, monospace`,
        `Alpha Echo`
    ];
    $scope.text = {
        value: 'Example',
        font: $scope.fonts[0],
        color: '631F00',
        size: 50
    };

    $scope.$watchGroup(['text.value', 'text.font', 'text.color', 'text.size'], function() {
        $scope.style = {
            'font-family': $scope.text.font,
            'color': `#${$scope.text.color}`,
            'font-size': `${$scope.text.size}px`,
            'font-style': `${$scope.text.bold? 'italic': 'normal'},`,
            'font-weight': `${$scope.text.bold? 'bold' : 'normal'}`
        };
        $scope.cost = $scope.text.value.length * 1500;
    });
});

app.controller('aboutController', function($scope) {
    $scope.message = '';
});

app.controller('contactController', function($scope) {
    $scope.message = '';
});