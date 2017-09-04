var mongoose = require('mongoose');

module.exports = function() {

  var Schema = mongoose.Schema({
    nome: {
      type: String,
      required:true
    }
  });

  return mongoose.model('Carrinho', Schema);
};
