var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var findOrCreate = require ('mongoose-findorcreate');
var mongoose = require('mongoose');

module.exports = function() {

  var Usuario = mongoose.model('Usuario');

  passport.use(new FacebookStrategy({
    clientID: '269071966941417',
    clientSecret: 'a945fdf7f5aa6afe5bb46f1bdfb55e1c',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }, function(accesToken, refreshToken, profile, done) {

    Usuario.findOrCreate(
      { "login" : profile.email},
      { "nome"  : profile.displayName},
      function(erro, usuario) {
        if(erro) {
          console.log(erro);
          return done(erro);
        }
      return done(null, usuario);
    });
  }));
  //serialização do ObjectId do usuario na sessao
  passport.serializeUser(function(usuario, done) {
    done(null, usuario._id);
  });
  //buscar user por desserialização
  passport.deserializeUser(function(id, done) {
    Usuario.findById(id).exec()
           .then (function(usuario) {
             done(null, usuario);
           });
  });
};
