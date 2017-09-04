//evita query injector com $ne : null
var sanitize = require('mongo-sanitize');
module.exports = function(app) {

  var Carrinho = app.models.carrinho;
  var controller = {};

  controller.listaCarrinho = function(req, res) {
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
    var_id = req.params.id;
    Carrinho.findById(_id).exec()
    .then(
      function(carrinhos) {
        if(!carrinhos) throw new Error("carrinho não encontrado");
        res.json(carrinhos);
      },
      function(erro) {
        console.log(erro);
        res.status(404).json(erro);
      }
    );
  };

  controller.removeCarrinho = function(req, res) {
    var _id = sanitize(req.params.id);
    Carrinho.remove({"_id": _id}).exec()
    .then(
      function() {
        res.end();
      },
      function(erro) {
        return console.error(erro);
      }
    )
  };

  controller.salvaCarrinho = function(req, res) {
    var _id = req.body.id;
    //evitar dados a mais, informações que não dizem respeito ao produto/carrinho
    var dados = {
      "nome": req.body.nome
    }
    if (_id) {
      Carrinho.findByIdAndUpdate(_id, dados).exec()
      .then (
        function(carrinhos) {
          res.json(carrinhos);
        },
        function(erro) {
          console.error(erro);
          res.status(500).json(erro);
        }
      )
    } else {
      Carrinho.create(dados)
      .then (
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
