module.exports = function (app) {

  var controller = app.controllers.carrinho;

  app.route('/carrinhos')
  	.get(controller.listaCarrinho)
  	.post(controller.salvaCarrinho);

  app.route('/carrinhos/:id')
	.get(controller.obtemCarrinho)
	.delete(controller.removeCarrinho);
};
