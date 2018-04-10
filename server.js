const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


// Creates an Express application.
var app = express();

// registering partials that are in the views/partials directory
hbs.registerPartials(__dirname + '/views/partials');

// setting view engine property in app to hbs
app.set('view engine', 'hbs');

// resgitering middleware to log request.url and request.method in a server.log file
// middleware mounted without a path will be executed for every request to the app.
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.url}. Request Method: ${req.method}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n' ,(err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

// middleware that renders maintenance messsage without next() invocation
// this will not execute any of the code for routes or helpers.
// app.use((req, res, next) => {
  // res.render('maintenance.hbs');
// });

// using express.static built-in middleware function to render static resources
// __dirname = /home/yagna/Desktop/node-web-server (project root)
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// setting up HTTP route handlers
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the node-web-server Project Page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});
// binding application to a port on our machine
app.listen(3000, () => {
  console.log('Server is up and listening on port');
});
