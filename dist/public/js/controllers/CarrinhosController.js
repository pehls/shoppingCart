angular.module('shoppingcart').controller('CarrinhosController',
function(Carrinho, $scope) {
   $scope.carrinhos = [];

   $scope.filtro = '';

   $scope.mensagem = {texto: ''};

   function buscaCarrinhos() {
     Carrinho.query(
       function(carrinhos) {
         $scope.carrinhos = carrinhos;
         $scope.mensagem = {};
       },
       function(erro) {
         console.log(erro);
         $scope.mensagem = {
           texto: 'Não foi possível obter a lista'
         };
       }
     );
   }
   buscaCarrinhos();

   $scope.remove = function(carrinho) {
     Carrinho.delete({id: carrinho._id},
       buscaCarrinhos,
       function(erro) {
         $scope.mensagem = {
           texto: 'Não foi possível remover o carrinho'
         };
         console.log(erro);
       }
     );
   };
});
