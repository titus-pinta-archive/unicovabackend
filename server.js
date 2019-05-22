const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const database = require('./config/database');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const fs = require('mz/fs');

mongoose.Promise = require('bluebird')
mongoose.connect(database.localUrl);

app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));


require('./app/routes_user.js')(app);
require('./app/routes_parking.js')(app);
require('./app/routes_logic.js')(app);
require('./app/routes_history.js')(app);

app.get('/admin', (req, res) => {
	fs.readFile('public/index.html')
		.then(cont => {
			res.status(200);
			res.end(cont);
		})
		.catch(Utils.sendError(res));
});

Utils = require('./app/utils');
Utils.aggregateAll();
Utils.initReservations();
Utils.sseSubscribe(app);

app.listen(port, () => console.log("App listening on port " + port));
