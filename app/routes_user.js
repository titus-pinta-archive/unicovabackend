const passport = require('passport');
const Users = require('./models/user');
const sendError = require('./utils').sendError;

const Utils = require('./utils.js');

const getUsers = res => { 
	Users.find()
		.exec()
		.then(users => res.json(users))
		.catch(sendError(res));
}

module.exports = app => {
	//RESTApi for Users
	app.get('/api/users',
		passport.authenticate('jwt', {session: false}), Utils.adminRole,
		(req, res) => {
		getUsers(res);
	});
	app.get('/api/users/:user_id',
		passport.authenticate('jwt', {session: false}), Utils.userRole,
		(req, res) => {
		Users.findById(req.params.user_id)
			.exec()
			.then(user => res.json(user))
			.catch(sendError(res));
	});
	app.post('/api/users', (req, res) => {	
		const user = new Users(req.body);
		user.save()
			.then(user => res.json(user))
			.catch(sendError(res));
	});
	app.put('/api/users/:user_id',
		passport.authenticate('jwt', {session: false}), Utils.userRole,
		(req, res) => {
		Users.findByIdAndUpdate(req.params.user_id, req.body,
			{upsert: true, new: true, runValidators: true})
			.exec()
			.then(user => res.json(user))
			.catch(sendError(res));
	});
	app.delete('/api/users/:user_id',
		passport.authenticate('jwt', {session: false}), Utils.userRole,
		(req, res) => {
		Users.findByIdAndRemove(req.params.user_id)
			.exec()
			.then(user => res.json(user))
			.catch(sendError(res));
	});
}
