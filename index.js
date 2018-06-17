const express = require ('express'),
	bodyParser = require('body-parser'),
	app = express(),
	port = process.env.PORT || 3000,
	user = require('./data/user'),
    event = require('./data/event'),
    category = require('./data/category');
    require('./database');

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

/*---------------- User Routes ----------------*/
app.get('/getAllUsers', user.getAllUsers);
app.post('/deleteUserByName/', user.deleteUserByName);
app.post('/createUser/', user.createUser);
app.get('/getUser/:userid', user.getUser);
app.post('/updateUser/', user.updateUser);

/*--------------- Category Routes ------------*/
app.get('/getAllCategories', category.getAllCategories);
app.post('/createCategory', category.createCategory);
app.get('/getCategory/:category', category.getCategory);
app.post('/addEquipmentToCategory/', category.addEquipmentToCategory);

/*--------------- Event Routes ---------------*/
app.get('/getChat/:eventid', event.getChat);
app.get('/getAllEvents', event.getAllEvents);
app.get('/getEvent/:eventid', event.getEvent);
app.post('/createEvent/', event.createEvent);
app.post('/updateEvent/', event.updateEvent);
app.post('/sendMessage/', event.sendMessage);
app.get('/inviteUser/:eventid/:userid', event.inviteUser);
app.get('/approveUser/:eventid/:userid', event.approveUser);
app.post('/setUserEquip/', event.setUserEquip);

/*--------------- Others Routes -------------*/
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