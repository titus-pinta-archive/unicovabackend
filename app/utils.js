const Events = require('./models/event');
const Parkings = require('./models/parking');
const Reservations = require('./models/reservation');

const config = require('../config/parking');

const schedule = require('node-schedule');

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const SSE = require('sse-nodejs')

var sse_clients = [];

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'UNICOVA';

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		return done(null, jwt_payload.data);
	}));

const adminRole = (req, res, next) => {
	if (req.user.admin) {
		return next();
	} else {
		res.status(401).send('Unauthorized');
	}
}


const userRole = (req, res, next) => {
	if (req.user._id == req.params.user_id) {
		return next();
	} else {
		res.status(401).send('Unauthorized');
	}
}

const sendError = res => err => {
	res.status(500);
	res.send(err);
}

var readReplicas = {};
var reservations = {};




const isFreeSpot = async parking_id => {
	var o = {};
	o.map = function () {
		var value = 0;
		if (this.kind == 'reserve' || this.kind == 'block') {
			value = -1;
		} else if (this.kind == 'free' || this.kind == 'unblock') {
			value = 1;
		}
		emit(this.spot, value);
	};
	o.reduce = function (key, values) { return Array.sum(values);};
	o.query = {spot: parking_id};
	const promise = new Promise((resolve, reject) => {
		Events.Events.count({spot: parking_id})
			.then(total => {
				if (total == 0) {
					resolve();
				} else {
					Events.Events
						.mapReduce(o)
						.then(ret => {
							const promises = ret.map(el => {
								return Parkings.findById(el._id)
									.exec()
									.then(parking => {
										if (parking.spots + el.value <= 0) {
											reject('No spot available');
										} else {
											resolve();
										}
									})
									.catch(err => reject(err));
							});
						})
						.catch(err => reject(err));
				}
			})
			.catch(err => reject(err));
		});
	return promise;
}

const isBlockedSpot = async parking_id => {
	var o = {};
	o.map = function () {
		var value = 0;
		if (this.kind == 'reserve' || this.kind == 'free') {
			value = 0;
		} else if (this.kind == 'block') {
			value = 1;
		} else if (this.kind == 'unblock') {
			value = -1;
		}
		emit(this.spot, value);
	};
	o.reduce = function (key, values) { return Array.sum(values);};
	o.query = {spot: parking_id};
	const promise = new Promise((resolve, reject) => {
		Events.Events.count({spot: parking_id})
			.then(total => {
				if (total == 0) {
					reject('No spot blocked');
				} else {
					Events.Events
						.mapReduce(o)
						.then(ret => {
							const promises = ret.map(el => {
								return Parkings.findById(el._id)
									.exec()
									.then(parking => {
										if (el.value <= 0) {
											reject('No spot blocked');
										} else {
											resolve();
										}
									})
									.catch(err => reject(err));
							});
						})
						.catch(err => reject(err));
				}
			})
			.catch(err => reject(err));
		});
	return promise;
}



const aggregateAll = () => {
	var o = {};
	o.map = function () {
		var value = 0;
		if (this.kind == 'reserve' || this.kind == 'block') {
			value = -1;
		} else if (this.kind == 'free' || this.kind == 'unblock') {
			value = 1;
		}
		emit(this.spot, value);
	};
	o.reduce = function (key, values) { return Array.sum(values);};

	Events.Events
		.mapReduce(o)
		.then(ret => {
				Parkings.find()
					.exec()
					.then(parkings => {
						readReplicas.parkings = parkings.map( parking => {
							parking = parking.toObject();
							const el = ret.find(elem => elem._id == String(parking._id));
							if (el) { 
								parking.spots = {
									free: parking.spots + el.value,
									total: parking.spots
								};
							} else {
								parking.spots = {
									free: parking.spots,
									total: parking.spots
								};
							}
							return parking;
						});
						sse_clients.map(c => c.send(readReplicas.parkings));
					});
		});
}

const addReservation = (user_id, parking_id, time, type) => {
	var rule = new schedule.RecurrenceRule();
	rule.minute = time.getMinutes();
	rule.hour = time.getHours();

	var job = schedule.scheduleJob(rule, () => {
		const Event = new Events.reserveSpotEvent({
			time: Date.now(),
			spot: parking_id,
			user: user_id,
			type: type,
			price: config.parking_types[type].price
		});
		Event.save()
			.then(event => {
				setTimeout(() => {
					const FreeEvent = new Events.freeSpotEvent({
						time: Date.now(),
						spot: parking_id,
						user: user_id
					});
					FreeEvent.save()
						.then(() => Utils.aggregateAll());
			}, config.parking_types[type].time * 1000);
			Utils.aggregateAll();
		});
	});
	reservations[`${user_id}_${time}`] = job;
}

const removeReservation = (user_id, time) => {
	reservations[`${user_id}_${time}`].cancel();
	delete reservations[`${user_id}_${time}`];
}

const initReservations = () => {
	Reservations.find({active: true})
		.exec()
		.then(reservations => {
			reservations.map(r => addReservation(r.user, r.spot, r.start, r.type));	
		});
}

const sseSubscribe = (app) => {
	app.get('/subscribe', (req, res) => {
		sse_clients.push(SSE(res));
	});
}

module.exports = {
	sendError: sendError,
	isFreeSpot: isFreeSpot,
	isBlockedSpot: isBlockedSpot,
	aggregateAll: aggregateAll,
	readReplicas: readReplicas,
	addReservation: addReservation,
	removeReservation: removeReservation,
	initReservations: initReservations,
	adminRole: adminRole,
	userRole: userRole,
	sseSubscribe: sseSubscribe
}
