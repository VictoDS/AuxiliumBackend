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
	});
});

app.post('/atualiza-usuario',function(request, response){
	var fon = request.body.telefone;
	var end = request.body.endereco;
	var bai = request.body.bairro;
	var cid = request.body.cidade;
	var uf  = request.body.uf;
	var id  = request.body.id;
	var tok = request.body.token;
	
	var sql = "UPDATE usuario SET fone = '"+fon+"', endereco = '"+end+"', bairro = '"+bai+"', cidade = '"+cid+"', uf = '"+uf+"', token = '"+tok+"' WHERE id = "+id;
	con.query(sql, function(err, resul){
		if (err) response.send(JSON.stringify({status:'ERRO',descricao:err}, null, 3));
		response.send(JSON.stringify({status:'OK'}, null, 3));
	});
});

app.post('/nova-ocorrencia',function(request, response){
	var idu = request.body.id_usuario;
	var cid = request.body.cidade;
	var bai = request.body.bairro;
	var log = request.body.logradouro;
	var num = request.body.numero;
	var lat = request.body.latitude;
	var lng = request.body.longitude;
	var tip = request.body.tipo;
	var des = request.body.descricao;
	
	var sql = "INSERT INTO ocorrencia (id_usuario, cidade, bairro, logradouro, numero, lat, lng, tip_ocorrencia, descricao, status) "+
              "VALUES ("+idu+",'"+cid+"','"+bai+"','"+log+"',"+num+","+lat+","+lng+",'"+tip+"','"+des+"','P')";
	con.query(sql, function(err, resul){
		if (err) response.send(JSON.stringify({status:'ERRO',descricao:err}, null, 3));
		response.send(JSON.stringify({status:'OK'}, null, 3));
	});
});

app.post('/lista-ocorrencia',function(request, response){
	var idu = request.body.id_usuario;
	con.query("SELECT * FROM ocorrencia WHERE id_usuario = "+idu+" ORDER BY momento_ocorrencia DESC", function(err, resul){
		if (err) response.send(JSON.stringify({status:'ERRO',descricao:err}, null, 3));
		response.send(JSON.stringify(resul, null, 3));
	});
});

app.post('/usuario',function(request, response){
	var tok = request.body.token;
	var cpf = request.body.cpf;
	con.query("SELECT * FROM usuario WHERE token = '"+tok+"'", function(err, resul){
		if (err) response.send(JSON.stringify({status:'ERRO',descricao:err}, null, 3));
		response.send(JSON.stringify(resul,null,3))
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
