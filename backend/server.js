const express = require('express'),
      path = require('path'),
      http = require('http'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      HttpError = require('error').HttpError;

// our routers will be in whis file -----its just api
const api = require('./routes/api');

const app = express();

// Parsers for POST data------Have no idea how it works)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//use a logger to check the requests
app.use(morgan('tiny'));
// Set our api routes
/*
	in ./routes/api are methods to manipulate with info in mongoDB
	to present this data for users we will use Components and Services(maybe :))
	now I am not sure about server.js, do we need it in general?
*/
app.use('/api', api);

// app.get('*', (req, res) => {
//   res.send("to work with angular routes start application via 'ng serve'," +
//   	" 'node server.js' is just for testing) " +
//   	"You can use localhost:3000/api and localhost:3000/api/users now to see routing from server.js");
// });

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
