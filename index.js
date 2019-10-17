'use strict'

// Libraries
const optimizelyExpress = require('@optimizely/express'),
                express = require('express'),
                path = require("path"),
                hbs = require('express-handlebars'),
                routes = require('./routes');

// Setting up app
const app = express();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8080;

// Setting up Optimizely
const SDK_KEY = 'Ua55wZQEBEkSHLPreu6HYt';

const optimizely = optimizelyExpress.initialize({
  sdkKey: SDK_KEY,
  datafileOptions: {
    autoUpdate: true,
    updateInterval: 1000 
  },
  logLevel: 'info'
})

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'));

app.use(optimizely.middleware);
app.use('/', routes);

// Setting up handlebars
app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/pages/',
  partialsDir: __dirname + '/views/partials/'
}));

// Starting server
app.listen(PORT, HOST);

console.log(`Example App Running on http://${HOST}:${PORT}`);

module.exports = app;