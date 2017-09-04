var ID_CONTATO_INC = 3;

var carrinhos = [
  {_id: 1, nome: 'Carrinho Exemplo 1'},
  {_id: 2, nome: 'Carrinho Exemplo 2'},
  {_id: 3, nome: 'Carrinho Exemplo 3'}
];

module.exports = function() {

  var controller = {};

  controller.listaCarrinhos = function(req, res) {
      res.json(carrinhos);
  };

  controller.obtemCarrinho = function(req, res) {

  	var idCarrinho = req.params.id;
  	var carrinho = carrinhos.filter(function(carrinho) {
  		return carrinho._id == idCarrinho;
  	})[0];
  	carrinho ?
  	res.json(carrinho) :
    res.status(404).send('Carrinho não encontrado');
  };

  controller.removeCarrinho = function(req, res) {

    var idCarrinho = req.params.id;
    carrinhos = carrinhos.filter(function(carrinho) {
      return carrinho._id != idCarrinho;
    });
    res.status(204).end();
  };

  controller.salvaCarrinho = function(req, res) {

    var carrinho = req.body;
    carrinho = carrinho._id ?
      atualiza(carrinho) :
      adiciona(carrinho);
    res.json(carrinho);
  };

  function adiciona(carrinhoNovo) {

    carrinhoNovo._id = ++ID_CONTATO_INC;;
    carrinhos.push(carrinhoNovo);
    return carrinhoNovo;
  }

  function atualiza(carrinhoAlterar) {

    carrinhos = carrinhos.map(function(carrinho) {
      if(carrinho._id == carrinhoAlterar._id) {
        carrinho = carrinhoAlterar;
      }
      return carrinho;
    });
    return carrinhoAlterar;
  }

  return controller;
};
