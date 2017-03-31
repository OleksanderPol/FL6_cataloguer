var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    HttpError = require('./error/index').HttpError;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //does not parse multipart form data. ask lead
app.use(express.static(__dirname + '/dist'));
app.use(morgan('tiny'));

var MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: 'FL6epam',
  key: 'sid',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  },
  store: new MongoStore({
    url: 'mongodb://admin:admin@tastbaar.mongo.xervo.io:27017/o5wuSaxu'
  })
}));

app.use(require('./middleware/loadUser'));

var routes = require('./routes/index');
app.use('/', routes);

app.use(function(err, req, res, next) {
  if (typeof err === 'number') {
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.status(err.status).send(err);
  } else {
    if (app.get('env') === 'development') {
      app.use(errorHandler());
    } else {
      err = new HttpError(500);
      res.status(500).send(err);
    }
  }
});


var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
