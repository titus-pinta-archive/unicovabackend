const mongoose = require('mongoose');

const Users = require('./models/user');
const Parkings = require('./models/parking')
const Events = require('./models/event');
const Reservations = require('./models/reservation');

const Utils = require('./utils');
const blubird = require('bluebird');

const config = require('../config/parking');

const schedule = require('node-schedule');
const jwt = require('jsonwebtoken');

const passport = require('passport');

module.exports = app => {
	//RESTApi for Logic
	
	//Get Parkings
	app.get('/parkings', (req, res) => {
		res.json(Utils.readReplicas.parkings);
	})
	
	//Authentificate
	app.get('/login', (req, res) => {
		Users.find({email: req.query.email, password: req.query.password})
			.exec()
			.then(users => {
				if (users.length == 1) {
					var u = users[0].toObject();
					delete u.password;
					const token = jwt.sign({
						exp: (new Date().getTime() + 3600 * 1000)/1000,
						data: u
						}, 'UNICOVA');
					res.json({jwt: token});
				} else {
					Utils.sendError(res)('Email and Password do not match');
				}
			})
			.catch(Utils.sendError(res));
	});

	//Authentificate Admin
	app.get('/adminlogin', (req, res) => {
		if (req.query.name == 'admin' && req.query.password == 'admin') {
			const token = jwt.sign({
				exp: (new Date().getTime() + 3600 * 1000)/1000,
				data: {admin: true}} , 'UNICOVA');
			res.json({jwt: token});
		}
	});

	//Reserve Parking
	
	app.post('/api/reserve/:parking_id/:user_id',
		passport.authenticate('jwt', {session: false}), Utils.userRole, 
		(req, res) => {
		
		Parkings.count({_id: req.params.parking_id})
			.exec()
			.then(num => {
				if (num != 1)
					Utils.sendError(res)('Not a valid parking id');
			})
			.catch(Utils.sendError(res));

		Utils.isFreeSpot(req.params.parking_id)
			.then( () => {
				const type = req.body.type;
				const price = config.parking_types[type].price;
				const time = config.parking_types[type].time;
				Utils.reserveParking(
					req.params.user_id,
					req.params.parking_id,
					type,
					price,
					time,
					Date.now() ? !(req.body.time) : req.body.time
				)

			})
			.catch(Utils.sendError(res));
		});

	//Block Spot

	app.post('/api/block/:parking_id',
		passport.authenticate('jwt', {session: false}), Utils.adminRole,
		(req, res) => {
		Parkings.count({_id: req.params.parking_id})
			.exec()
			.then(num => {
				if (num != 1)
					Utils.sendError(res)('Not a valid parking id');
			})
			.catch(Utils.sendError(res));

		Utils.isFreeSpot(req.params.parking_id)
			.then( () => {
				const Event = new Events.blockSpotEvent({
					time: Date.now(),
					spot: req.params.parking_id
				});
				Event.save()
					.then(event => {
						//Utils.aggregateSpot(event.spot);
						Utils.aggregateAll();
						res.json(event);
					})
					.catch(Utils.sendError(res));
			})
			.catch(Utils.sendError(res));
			
	});

	//Unblock Spot

	app.post('/api/unblock/:parking_id',
		passport.authenticate('jwt', {session: false}), Utils.adminRole, 
		(req, res) => {
		Parkings.count({_id: req.params.parking_id})
			.exec()
			.then(num => {
				if (num != 1)
					Utils.sendError(res)('Not a valid parking id');
			})
			.catch(Utils.sendError(res));

		Utils.isBlockedSpot(req.params.parking_id)
			.then( () => {
				const Event = new Events.unblockSpotEvent({
					time: Date.now(),
					spot: req.params.parking_id
				});
				Event.save()
					.then(event => {
						//Utils.aggregateSpot(event.spot);
						Utils.aggregateAll();
						res.json(event);
					})
					.catch(Utils.sendError(res));
			})
			.catch(Utils.sendError(res));
			
	});

	//Reserve Daily
	app.post('/api/schedule/:parking_id/:user_id',
		passport.authenticate('jwt', {session: false}), Utils.userRole,
		(req, res) => {

		Reservation = new Reservations({
			start: req.body.time,
			user: req.params.user_id,
			spot: req.params.parking_id,
			type: req.body.type
		});
		Utils.addReservation(Reservation.user, Reservation.spot,
			Reservation.start, Reservation.type);

		Reservation.save()
			.then(reservation => res.json(reservation))
			.catch(Utils.sendError(res));
	});

	//Unsubscribe
	app.post('/api/unschedule/:reservation_id',
		passport.authenticate('jwt', {session: false}), Utils.userRole, 
		(req, res) => {
		Reservations.findByIdAndUpdate(req.params.reservation_id, {
			active: false
		})
			.exec()
			.then(reservation => {
				Utils.removeReservation(reservation.user, reservation.start);
				res.json(reservation);
			})
			.catch(Utils.sendError(res));
	});
}
