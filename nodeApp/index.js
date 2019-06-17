const express = require('express'),
	// session = require('express-session'),
	bodyParser = require('body-parser'),
	app = express(),
	port = process.env.PORT || 3000,
	tour = require('./data/tour'),
	point = require('./data/point'),
	sessionManager = require('./data/session'),
	state = require('./data/state'),
	user = require('./data/user');
require('./database');
var sess;

// app.use(session({
// 	secret: "hahahahah",
// 	lecturer: "Nudler",
// 	proxy: true,
// 	resave: true,
// 	saveUninitialized: true
// }));
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

	// sess = req.session;
	// /*
	// * Here we have assign the 'session' to 'sess'.
	// * Now we can create any number of session variable we want.
	// * in PHP we do as $_SESSION['var name'].
	// * Here we do like this.
	// */
	// sess.email = "jjj"; // equivalent to $_SESSION['email'] in PHP.
	// sess.username = "uuu"; // equivalent to $_SESSION['username'] in PHP.
  next();
});

app.get('/', (req,res) => {
	console.log(`__dirname: ${__dirname}`);
	res.status(200).sendFile(`${__dirname}/index.html`);
});

/*---------------- User Routes ----------------*/
app.post('/createUser/', user.createUser);
app.get('/getUsers', user.getUsers);
app.get('/getUser/:userid', user.getUser);
app.put('/updateUser/:userid', user.updateUser);
app.delete('/deleteUser/:userid', user.deleteUser);

app.post('/login/', user.login);

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
// app.delete('/deletePointFromTour/:tourid/:pointid', tour.deletePoint);

/*---------------- State Routes ----------------*/
app.post('/createState/', state.createState);
app.get('/getStates', 	state.getStates);
app.get('/getState/:stateid', 	state.getState);
app.put('/updateState/:stateid', state.updateState);
app.delete('/deleteState/:stateid', state.deleteState);

/*---------------- Session Routes ----------------*/
app.post('/createSession/', sessionManager.createSession);
app.get('/getSessions', 	sessionManager.getSessions);
app.get('/getSession/:sessionid', 	sessionManager.getSession);
app.put('/updateSession/:sessionid', sessionManager.updateSession);
app.delete('/deleteSession/:sessionid', sessionManager.deleteSession);

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
