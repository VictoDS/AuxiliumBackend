var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/android', function(request, response) {
  response.render('pages/index');
});

app.post('/novo-usuario',function(request, response){
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
