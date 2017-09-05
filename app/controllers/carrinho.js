var ID_CONTATO_INC = -1;
var carrinhos = [{_id: -1,
                  nome: 'Exemplo1'}];

//evita query injector com $ne : null
var sanitize = require('mongo-sanitize');
module.exports = function(app) {

  var Carrinho = app.models.carrinho;
  var controller = {};

  controller.buscaCarrinhos = function(req, res) {
       res.json(carrinhos);
   };

  controller.listaCarrinhos = function(req, res) {
    Carrinho.find().exec()
  .then(function (carrinhos) {
    res.json(carrinhos);
  },
  function(erro) {
    console.error(erro);
    res.status(500).json(erro);
  });
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
   res.sendStatus(204).end();
 };



  controller.salvaCarrinho = function(req, res) {

    var carrinho = req.body;
    carrinho = carrinho._id ?
      atualiza(carrinho) :
      adiciona(carrinho);
      salvaCarrinhoBanco(carrinho);
    res.json(carrinho);
  };

  function adiciona(carrinhoNovo) {

    carrinhoNovo._id = ++ID_CONTATO_INC;
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
  function salvaCarrinhoBanco (carrinhoNovo) {
    var _id = carrinhoNovo._id;
     var dados = {
       "nome" : carrinhoNovo.nome
     };

     if(_id) {
      Carrinho.findByIdAndUpdate(_id, dados).exec()
      .then(
       function(carrinho) {
         res.json(carrinho);
       },
       function(erro) {
         console.error(erro)
         res.status(500).json(erro);
       }
      );
     } else {
       Carrinho.create(dados)
       .then(
         function(carrinho) {
           res.status(201).json(carrinho);
         },
         function(erro) {
           console.log(erro);
           res.status(500).json(erro);
         }
       );
     }
   };

  return controller;
};
