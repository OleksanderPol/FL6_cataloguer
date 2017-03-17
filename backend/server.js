const express = require('express'),
      path = require('path'),
      http = require('http'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      HttpError = require('./error/index').HttpError;

const app = express();

// Parsers for POST data------Have no idea how it works)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//use a logger to check the requests
app.use(morgan('tiny'));

//require routes
const routes = require('./routes/index');
app.use('/', routes);

//error handler
app.use(function(err, req, res, next) {
  if (typeof err === 'number') {  // next(404);
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.status(err.status).send(err); //send the json format of error, parse on cliend and display it correctly
  } else {
    err = new HttpError(500);
    res.status(500).send(err);
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
