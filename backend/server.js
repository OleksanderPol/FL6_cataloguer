const express = require('express'),
      http = require('http'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      session = require('express-session'),
      errorHandler = require('errorhandler'),
      HttpError = require('./error/index').HttpError;

const app = express();

// Parsers for POST data------Have no idea how it works)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //does not parse multipart form data. ask lead
app.use(express.static(__dirname + '/dist'));
//use a logger to check the requests
app.use(morgan('tiny'));

//added user sessions
let MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: 'FL6epam',  //cookie value will be random created string
  key: 'sid', //when the user visits our website first time, spesial cookie is created (sid)
  cookie: {
    path: '/',
    httpOnly: true, //could not be accessed from js
    maxAge: null //cookie will be deleted when user close the browser
  },
  store: new MongoStore({ //adding a session to data base
    url: 'mongodb://qwerty:qwerty@tastbaar.mongo.xervo.io:27017/inidA8mi'
  })
}));

app.use(require('./middleware/loadUser'));

const routes = require('./routes/index');
app.use('/', routes);

app.use(function(err, req, res, next) {
  if (typeof err === 'number') {  // next(404);
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.status(err.status).send(err); //send the json format of error, parse on cliend and display it correctly
  } else {
    if (app.get('env') === 'development') {
      app.use(errorHandler());
    } else {
      err = new HttpError(500);
      res.status(500).send(err);
    }
  }
});

// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
