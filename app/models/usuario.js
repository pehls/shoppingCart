var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function () {
  var schema = mongoose.Schema({
    nome: {
      type: String,
      required: true
    },
    email: {
     type: String,
     required: true,
     index: {
       unique: true
     }
   },
   password: {
     type: String,
     required: true
   },
    inclusao: {
      type: Date,
      default: Date.now
    },
    carrinho: {
      type: mongoose.Schema.ObjectId,
      ref: 'Carrinho'
    }
  });
  schema.plugin(findOrCreate);
  return mongoose.model('Usuario', schema);
};
