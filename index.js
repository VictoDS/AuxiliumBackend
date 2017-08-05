var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var mysql = require('mysql');
var con = mysql.createConnection({
		host: "externo.logosystem.com.br",
		user: "gustavo",
		password: "gustavo@tcc",
		database: "auxilium"
            });
con.connect();

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/android', function(request, response) {
  response.render('pages/index');
});

app.post('/novo-usuario',function(request, response){
	var nom = request.body.nome;
	var cpf = request.body.cpf;
	var dtn = request.body.data_nascimento;
	var fon = request.body.telefone;
	var end = request.body.endereco;
	var bai = request.body.bairro;
	var cid = request.body.cidade;
	var uf  = request.body.uf;
	var tok = request.body.token;
	
	var sql = "INSERT INTO usuario (nome ,cpf ,dt_nascimento ,fone ,endereco ,bairro ,cidade ,uf ,status ,token"+
              ") VALUES ('"+nom+"','"+cpf+"','"+dtn+"','"+fon+"','"+end+"','"+bai+"','"+cid+"','"+uf+"','I','"+tok+"')";
	con.query(sql, function(err, resul){
		if (err) response.send(JSON.stringify({status:'ERRO',descricao:err}, null, 3));
		response.send(JSON.stringify({status:'OK'}, null, 3));
	})
	response.send(request.body.token);
});

app.post('/atualiza-usuario',function(request, response){
	response.send(request.body.token);
});

app.post('/nova-ocorrencia',function(request, response){
	response.send(request.body.biro);
});

app.post('/lista-ocorrencia',function(request, response){
	response.send(request.body.biro);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
