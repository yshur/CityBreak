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

app.get('/getAllUsers', data.getAllUsers);
/*app.post('/createUser/', data.createUser);
app.post('/getUser/', data.getUser);

app.get('/getAllCategories', data.getAllUsers);
app.post('/createCategory/', data.createUser);

app.post('/createChat/', data.createChat);
app.post('/getChat/', data.getChat);

app.get('/getAllEquipments', data.getAllEquipments);
app.get('/getEquipmentsByCategory/:category', data.getEquipmentsByCategory);
app.post('/createEquipment/', data.createEquipment);

app.get('/getAllEvents', data.getAllEvents);
app.get('/getEvent/:event', data.getEvent);
app.post('/createEvent/', data.createEvent);
*/
app.all('*', function(req, res) {
  var error = {
    "error":"url not found",
  	"help": "TBD"
  };
  res.status(200).json(error);
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});