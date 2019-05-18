const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Reservations', {
	start: {
		type: Date,
		require: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		require: true
	},
	spot: {
		type: Schema.Types.ObjectId,
		ref: 'Parkings',
		require: true
	},
	active: {
		type: Boolean,
		default: true
	},
	type: {
		type: String,
		require: true,
		enum: ['normal', 'fast']
	}
});
