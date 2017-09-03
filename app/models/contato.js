var mongoose = require('mongoose');

module.exports = function() {

  var Schema = mongoose.Schema({
    nome: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required:true,
      index: {
        unique:true
      }
    },
    senha: {
      type: String,
      required:true
    },
    carrinho: {
      type: mongoose.Schema.ObjectId,
      ref: 'Carrinho'
    }
  });

  return mongoose.model('Contato', Schema);
};
