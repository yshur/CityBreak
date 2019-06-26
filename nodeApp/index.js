const express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	app = express(),
	port = process.env.PORT || 3000,
	tour = require('./data/tour'),
	point = require('./data/point'),
	sessionManager = require('./data/session'),
	sessionDetails = require('./data/session_details'),
	state = require('./data/state'),
	user = require('./data/user');
require('./database');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: "qwertyuiopasdf12345gh",
	resave: false,
	saveUninitialized: true
}));
app.use('/includes', express.static(`${__dirname}/public`));
app.use('/', express.static('./'));

app.use( (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept");
	res.set("Content-Type", "application/json");
	next();
});

app.get('/', (req,res) => {
	// res.status(200).json(req.session);
	console.log(`__dirname: ${__dirname}`);
	res.status(200).sendFile(`${__dirname}/index.html`);
});

/*---------------- User Routes ----------------*/
app.post('/login/', user.login);
app.get('/logout', user.logout);

app.all('*', (req, res, next) => {
  console.log("runs for all HTTP verbs first");
	next();
});

app.post('/sign-up/', user.createUser);
app.get('/getUsers', user.getUsers);
app.get('/getUser/:userid', user.getUser);
app.put('/updateUser/:userid', user.updateUser);
app.delete('/deleteUser/:userid', user.deleteUser);

/*---------------- Point Routes ----------------*/
app.post('/createPoint/', point.createPoint);
app.get('/getPoints', 	point.getPoints);
app.get('/getPoint/:pointid', 	point.getPoint);
app.put('/updatePoint/:pointid', point.updatePoint);
app.delete('/deletePoint/:pointid', point.deletePoint);

/*---------------- Tour Routes ----------------*/
app.post('/createTour/', tour.createTour);
app.get('/getTours', 	tour.getTours);
app.get('/getTour/:tourid', 	tour.getTour);
app.put('/updateTour/:tourid', tour.updateTour);
app.delete('/deleteTour/:tourid', tour.deleteTour);

app.put('/addPoint/:tourid/:pointid', tour.addPoint);
app.put('/rmPoint/:tourid/:pointid', tour.rmPoint);

app.get('/getTags',	point.getTags);
app.get('/getSub_areas',	point.getSubAreas);
app.get('/getAreas',	point.getAreas);

/*---------------- State Routes ----------------*/
app.post('/createState/', state.createState);
app.get('/getStates', 	state.getStates);
app.get('/getState/:stateid', 	state.getState);
app.put('/updateState/:stateid', state.updateState);
app.delete('/deleteState/:stateid', state.deleteState);

/*---------------- Session Routes ----------------*/
app.get('/getSessions', 	sessionManager.getSessions);
app.get('/getSession/:session_id', 	sessionManager.getSession);
app.get('/getAllDetails', 	sessionDetails.getAllDetails);
app.get('/getSessionDetails/:session_id', 	sessionDetails.getSessionDetails);
app.get('/getUserDetails/:user_id', 	sessionDetails.getUserDetails);

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
