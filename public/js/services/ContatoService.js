angular.module('shoppingcart').factory('Contato', function($resource) {

	return $resource('/contatos/:id');
});
