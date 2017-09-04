angular.module('shoppingcart').controller('CarrinhoController', 
	function($scope, Carrinho, $routeParams) {

		if($routeParams.carrinhoId) {
			Carrinho.get({id: $routeParams.carrinhoId}, 
				function(carrinho) {
					$scope.carrinho = carrinho;
				}, 
				function(erro) {
					$scope.mensagem = {
					  texto: 'Carrinho não existe. Novo carrinho.'
					};
				}
			);	
		} else {
			$scope.carrinho = new Carrinho();
		}


		$scope.salva = function() {
		  $scope.carrinho.$save()
		  	.then(function() {
		  		$scope.mensagem = {texto: 'Salvo com sucesso'};
		  		// limpa o formulário
		  		$scope.carrinho = new Carrinho();
		  	})
		  	.catch(function(erro) {
		  		$scope.mensagem = {texto: 'Não foi possível salvar'};
		  	});
		};		
});