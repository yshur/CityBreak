const express = require ('express'),
	bodyParser = require('body-parser'),
	app = express(),
	port = process.env.PORT || 3000,
	tour = require('./data/tour'),
	point = require('./data/point'),
	user = require('./data/user');
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
app.get('/getUser/:userid', user.getUser);
app.get('/getAllUsers', user.getAllUsers);
app.delete('/deleteUser/:userid', user.deleteUser);
app.delete('/deleteAllUsers', user.deleteAllUsers);
app.post('/createUser/', user.createUser);

app.post('/updateUser/', user.updateUser);

app.post('/login/', user.login);

/*---------------- Point Routes ----------------*/
app.get('/getPoints', 	point.getPoints);
app.get('/getPoint/:pointid', 	point.getPoint);
app.delete('/deletePoint/:pointid', point.deletePoint);
app.post('/createPoint/', point.createPoint);

/*---------------- Tour Routes ----------------*/
app.get('/getRandomTours', 	tour.getRandomTours);
app.get('/getLongTours', 	tour.getLongTours);
app.get('/getAllTours', 	tour.getAllTours);
app.get('/getNorthTours', 	tour.getNorthTours);
app.get('/getSouthTours', 	tour.getSouthTours);
app.get('/getCenterTours', 	tour.getCenterTours);

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
