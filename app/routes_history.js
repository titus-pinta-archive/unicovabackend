const passport = require('passport');
const Events = require('./models/event');
const Reservations = require('./models/reservation')
const sendError = require('./utils').sendError;
const Utils = require('./utils.js');

module.exports = app => {
	//RESTApi for History
	app.get('/api/history',
		passport.authenticate('jwt', {session: false}), Utils.adminRole,
		(req, res) => {
		Events.Events.find()
			.populate('user')
			.populate('spot')
			.exec()
			.then(ret => res.json(ret))
			.catch(Utils.sendError(res));
	});
	app.get('/api/reservations',
		passport.authenticate('jwt', {session: false}), Utils.adminRole,
		(req, res) => {
		Reservations.find()
			.populate('user')
			.populate('spot')
			.exec()
			.then(reservations => res.json(reservations))
			.catch(sendError(res));
	});
	app.get('/api/reservations/:user_id',
		passport.authenticate('jwt', {session: false}), Utils.userRole,
		(req, res) => {
		Reservations.find({user: req.params.user_id, active: true})
			.populate('user')
			.populate('spot')
			.exec()
			.then(reservations => res.json(reservations))
			.catch(sendError(res));
	});
}
