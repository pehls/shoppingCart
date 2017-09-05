function verificaAutenticacao(req, res, next) {
  if (isAuthenticated()) {
    return next;
  } else {
    res.status('401').json("Não autorizado");
  }
}
 function isAuthenticated() {
   //pegar cookie, testar se existe authdata, se existir, tá logado
   return true;
 }
 function lerCookie(chave) {
   var ChaveValor = $cookie.match('(^|;) ?' + chave + '=([^;]*)(;|$)');
   return ChaveValor ? ChaveValor[2] : null;
  }
module.exports = function (app) {

var controller = app.controllers.carrinho;
  app.route('/carrinhos')
  //rotas sem banco
  	.get(controller.listaCarrinhos)
  	.post(controller.salvaCarrinho);

  app.route('/carrinhos/:id')
	.get(controller.obtemCarrinho)
	.delete( controller.removeCarrinho);

  app.route('/carrinho/:id')
	.get(controller.obtemCarrinho)
	.delete( controller.removeCarrinho);
};
