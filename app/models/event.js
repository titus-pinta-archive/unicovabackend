const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {discriminatorKey: 'kind'};

const eventSchema = new mongoose.Schema({
		time: {
			type: Date,
			require: true
		},
		spot: {
			type: Schema.Types.ObjectId,
			ref: 'Parkings',
			require: true
		}
	}, options);


const Event = mongoose.model('Events', eventSchema);

const reserveSpotEvent = Event.discriminator('reserve',
	new mongoose.Schema({
		user: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
			require: true
		},
		price: {
			type: Number,
			require: true
		},
		type: {
			type: String,
			enum: ['fast', 'normal'],
			require: true
		}
	}, options));

const freeSpotEvent = Event.discriminator('free',
	new mongoose.Schema({
		user: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
			require: true
		}
	}, options));

const blockSpotEvent = Event.discriminator('block', new mongoose.Schema());
const unblockSpotEvent = Event.discriminator('unblock', new mongoose.Schema());

module.exports = {
	reserveSpotEvent: reserveSpotEvent,
	freeSpotEvent: freeSpotEvent,
	blockSpotEvent: blockSpotEvent,
	unblockSpotEvent: unblockSpotEvent,
	Events: Event
};
