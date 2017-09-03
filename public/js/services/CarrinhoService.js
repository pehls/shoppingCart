angular.module('shoppingcart').factory('Carrinho', function($resource) {

	return $resource('/carrinhos/:id');
});
