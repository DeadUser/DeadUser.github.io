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
        { name: `Alpha Echo`, desc: 'Alpha Echo' },
        { name: `'Caveat', cursive`, desc: 'Caveat' },
        { name: `'Pacifico', cursive`, desc: 'Pacifico' },
        { name: `'Bad Script', cursive`, desc: 'Bad Script' },
        { name: `'Poiret One', cursive`, desc: 'Poiret One' },
        { name: `'Russo One', sans-serif`, desc: 'Russo One' },
        { name: `'Marck Script', cursive`, desc: 'Marck Script' },
        { name: `'Press Start 2P', cursive`, desc: 'Press Start' },
        { name: `'Courier New', Courier, monospace`, desc: 'Courier New' },
        { name: `Arial, Helvetica, sans-serif`, desc: 'Arial, Helvetica' },
        { name: `'Times New Roman', Times, serif`, desc: 'Times New Roman' }
    ];

    $scope.text = {
        value: 'Welcome',
        font: $scope.fonts[0].name,
        color: '630C0C',
        size: 50
    };

    $scope.$watchGroup(['text.value', 'text.font', 'text.color', 'text.size'], function() {
        $scope.style = {
            'font-family': $scope.fonts.filter(o => o.desc == $scope.text.font)[0].name,
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