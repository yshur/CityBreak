const express = require ('express'),
	bodyParser = require('body-parser'),
	app = express(),
	port = process.env.PORT || 3000,
	data = require('./data');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/includes', express.static(`${__dirname}/public`));
app.use('/', express.static('./'));

app.use( (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers",
	"Origin, X-Requested-With, Content-Type, Accept");
	res.set("Content-Type", "application/json");
	next();
});

app.all('*', (req, res, next) => {
  console.log("runs for all HTTP verbs first");
  next();
});

app.get('/', (req,res) => {
	console.log(`__dirname: ${__dirname}`);
	res.status(200).sendFile(`${__dirname}/index.html`);
});

app.get('/getAllBooks', data.getAllBooks);
app.post('/getBooksByCategory/', data.getBooksByCategory);
app.get('/getBooksByCategoryAndPhone/:category/:phone', data.getBooksByCategoryAndPhone);

app.all('*', function(req, res) {
  var error = {"error":"url not found",
  				"help": {
  					"url1": {
  						"url": "/getAllBooks",
  						"method": "get",
  						"params": "none"
  					},
  					"url2": {
  						"url": "/getBooksByCategory",
  						"method": "post",
  						"params":"category"
  					},
  					"url3": {
  						"url": "/getBooksByCategoryAndPhone/:category/:phone",
  						"method": "get",
  						"params": "category & phone on the url"
  					}
  				}};
  res.status(200).json(error);
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});