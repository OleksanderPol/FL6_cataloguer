var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    HttpError = require('./error/index').HttpError,
    multer = require('multer');

var app = express();

app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", true);
        next();
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //does not parse multipart form data. ask lead
app.use(express.static(__dirname + '/dist'));
app.use(morgan('tiny'));

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function(req, file, cb) {
    cb(null, './backend/dist/assets/img');
  },
  filename: function(req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname +  datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload', function(req, res) {
  upload(req, res, function(err) {
    console.log(req.file);
    if (err) {
      res.json({
        error_code: 1,
        err_desc: err
      });
      return;
    }
    res.json({
      error_code: 0,
      err_desc: null,
      path : 'assets/img/' + req.file.filename
    });
  });
});

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
