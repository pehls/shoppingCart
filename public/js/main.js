var app =
angular.module('shoppingcart', ['ngRoute','ngResource'])
.config(function($routeProvider) {

 // $routeProvider.when('/contatos', {
 //   templateUrl: 'partials/contatos.html',
 //   controller: 'ContatosController'
 // });
 //
 // $routeProvider.when('/contato/:contatoId', {
 //   templateUrl: 'partials/contato.html',
 //   controller: 'ContatoController'
 // });
 //
 // $routeProvider.when('/contato', {
 //   templateUrl: 'partials/contato.html',
 //   controller: 'ContatoController'
 // });

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
$routeProvider.otherwise({redirectTo: '/carrinhos'});
});
