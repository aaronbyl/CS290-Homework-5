var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5632);
app.use('/public',express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  var urlParams = [];
  for (var param in req.query) {
    urlParams.push({'name':param,'value':req.query[param]});
  } 
  var reqObj = {};
  reqObj.type = 'GET';
  reqObj.postFlag = false;
  reqObj.urlParamList = urlParams;
  res.render('home',reqObj);
});

app.post('/',function(req,res){
  var urlParams = [];
  for (var param in req.query) {ls
  
    urlParams.push({'name':param,'value':req.query[param]});
  } 
  var postParams = [];
  for (var param in req.body) {
    postParams.push({'name':param,'value':req.body[param]});
  } 
  var reqObj = {};
  reqObj.type = 'POST';
  reqObj.postFlag = true;
  reqObj.urlParamList = urlParams;
  reqObj.postParamList = postParams;
  res.render('home',reqObj);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
