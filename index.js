const express = require ('express'),
	bodyParser = require('body-parser'),
	app = express(),
	port = process.env.PORT || 3000,
	user = require('./data/user'),
    event = require('./data/event'),
    chat = require('./data/chat'),
    category = require('./data/category'),
    equipment = require('./data/equipment');

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

app.get('/getAllUsers', user.getAllUsers);
app.post('/deleteUserByName/', user.deleteUserByName);
app.post('/createUser/', user.createUser);

app.get('/getUser/:userid', user.getUser);
app.post('/updateUser/', user.updateUser);

app.get('/getAllCategories', category.getAllCategories);
app.post('/createCategory', category.createCategory);
app.post('/updateCategory', category.updateCategory);

app.post('/createChat/', chat.createChat);
app.get('/getChat/:chatid', chat.getChat);

app.get('/getAllEquipments', equipment.getAllEquipments);
app.get('/getEquipmentsByCategory/:category', equipment.getEquipmentsByCategory);
app.post('/createEquipment/', equipment.createEquipment);
app.post('/updateEquipment/', equipment.updateEquipment);

app.get('/getAllEvents', event.getAllEvents);
app.get('/getEvent/:eventid', event.getEvent);
app.post('/createEvent/', event.createEvent);
app.post('/updateEvent/', event.updateEvent);

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