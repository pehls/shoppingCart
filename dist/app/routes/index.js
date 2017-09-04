module.exports = function(app) {
	app.get('/', function(req, res) {
		var nome = '';
		if(req.user) {
			nome = req.user.nome;
		}
		res.render('index', { "usuarioLogado" : nome});
	});
};
