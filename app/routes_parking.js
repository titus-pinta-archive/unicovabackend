const passport = require('passport');
const Parkings = require('./models/parking');
const sendError = require('./utils').sendError;

const Utils = require('./utils.js');

const getParkings = res => { 
	Parkings.find()
		.exec()
		.then(parkings => res.json(parkings))
		.catch(sendError(res));
}

module.exports = app => {
	//RESTApi for Parkings
	app.get('/api/parkings', (req, res) => {
		getParkings(res);
	});
	app.get('/api/parkings/:parking_id', (req, res) => {
		Parkings.findById(req.params.parking_id)
			.exec()
			.then(parking => res.json(parking))
			.catch(sendError(res));
	});
	app.post('/api/parkings',
		passport.authenticate('jwt', {session: false}), Utils.adminRole,
		(req, res) => {	
		const parking = new Parkings(req.body);
		parking.save()
			.then(parking => res.json(parking))
			.catch(sendError(res));
	});
	app.put('/api/parkings/:parkings_id',
		passport.authenticate('jwt', {session: false}), Utils.adminRole,
		(req, res) => {
		Parkings.findByIdAndUpdate(req.params.parking_id, req.body,
			{upsert: true, new: true, runValidators: true})
			.exec()
			.then(parking => res.json(parking))
			.catch(sendError(res));
	});
	app.delete('/api/parkings/:parkings_id',
		passport.authenticate('jwt', {session: false}), Utils.adminRole,
		(req, res) => {
		Parkings.findByIdAndRemove(req.params.parking_id)
			.exec()
			.then(parking => res.json(parking))
			.catch(sendError(res));
	});
}
