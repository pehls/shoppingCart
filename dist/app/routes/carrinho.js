function verificaAutenticacao(req, res, next) {
  if (req.isAuthenticated()) {
    return next;
  } else {
    res.status('401').json("Não autorizado");
  }
}

module.exports = function (app) {

  var controller = app.controllers.carrinho;

  app.route('/carrinhos')
  	.get(verificaAutenticacao, controller.listaCarrinho)
  	.post(verificaAutenticacao, controller.salvaCarrinho);

  app.route('/carrinhos/:id')
	.get(verificaAutenticacao, controller.obtemCarrinho)
	.delete(verificaAutenticacao, controller.removeCarrinho);
};
