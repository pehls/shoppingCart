var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');
var jwt = require('jsonwebtoken');

module.exports = function() {
  var app = express();

  app.set('port', 3000);

  app.use(express.static('./public'));
  app.set('view engine', 'ejs');
  app.set('views','./app/views');
  // novos middlewares
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require('method-override')());
  //autenticação logins
  app.use(cookieParser());
  app.use(session (
    {
      secret: 'opalao monocromatico',
      resave: true,
      saveUninitialized: true
    }
  ));
//   app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//     next();
// });
  app.use(passport.initialize());
  app.use(passport.session());
  //evitar clickjacking
  app.use(helmet.xframe());
  //evitar XSS (scripts maliciosos)
  app.use(helmet.xssFilter());
  //evitar load MITE type fora css/js
  app.use(helmet.nosniff());
  //esconder xpowered, trocando por outra
  app.use(helmet.hidePoweredBy({ setTo: 'ASP.NET' }));
  //query selector injection no controller
  load('models', {cwd: 'app'})
    .then('controllers')
    .then('routes/auth.js')
    .then('routes')
    .into(app);

    //tratar erro 404
    app.get('*', function(req, res) {
      res.status(404).render('404');
    });

  return app;
};
