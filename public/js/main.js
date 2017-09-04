(function () {
    'use strict';

    angular
        .module('shoppingcart', ['ngRoute', 'ngResource',  'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider,  $httpProvider) {
        $routeProvider.when('/login', {
                controller: 'LoginController',
                templateUrl: 'partials/login.html',
                controllerAs: 'vm'
            });

        $routeProvider.when('/register', {
                controller: 'RegisterController',
                templateUrl: 'partials/register.html',
                controllerAs: 'vm'
            });



          $routeProvider.when('/carrinho/:carrinhoId', {
              templateUrl: 'partials/carrinho.html',
              controller: 'CarrinhoController'
            });

          $routeProvider.when('/carrinho', {
              templateUrl: 'partials/carrinho.html',
              controller: 'CarrinhoController'
            });

          $routeProvider.when('/', {
              templateUrl: 'partials/carrinhos.html',
              controller: 'CarrinhosController'
            });
            $routeProvider.when('/carrinhos', {
                templateUrl: 'partials/carrinhos.html',
                controller: 'CarrinhosController'
              });
          $routeProvider.otherwise({ redirectTo: '/carrinhos' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();
