const express = require ('express'),
	bodyParser = require('body-parser'),
	app = express(),
	port = process.env.PORT || 3000,
	tour = require('./data/tour'),
	user = require('./data/user'),
	admin = require('./data/admin');
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
app.delete('/deleteUser/', user.deleteUser);
app.post('/createUser/', user.createUser);
app.get('/getUser/:userid', user.getUser);
app.post('/updateUser/', user.updateUser);

/*---------------- Admin Routes ----------------*/
app.get('/getAllAdmins', admin.getAllAdmins);
app.delete('/deleteAdmin/', admin.deleteAdmin);
app.post('/createAdmin/', admin.createAdmin);
app.get('/getAdmin/:userid', admin.getAdmin);
app.post('/updateAdmin/', admin.updateAdmin);

/*---------------- Tour Routes ----------------*/
app.get('/getCategories', tour.getCategories);
app.get('/getRandomTours', tour.getRandomTours);
app.get('/getLongTours', tour.getLongTours);
app.get('/getAllTours', tour.getAllTours);

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