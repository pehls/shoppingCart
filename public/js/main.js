var app =
angular.module('shoppingcart', ['ngRoute','ngResource'])
.config(function($routeProvider, $httpProvider) {

   $httpProvider.interceptors.push('meuInterceptor');


   $routeProvider.when('/carrinhos', {
     templateUrl: 'partials/carrinhos.html',
     controller: 'CarrinhosController'
   });

   $routeProvider.when('/carrinho/:carrinhoId', {
     templateUrl: 'partials/carrinho.html',
     controller: 'CarrinhoController'
   });

   $routeProvider.when('/carrinho', {
     templateUrl: 'partials/carrinho.html',
     controller: 'CarrinhoController'
   });

   $routeProvider.when('/auth', {
     templateUrl: 'partials/auth.html'
   });
  
   $routeProvider.otherwise({redirectTo: '/carrinhos'});
});
