const mongoose = require('mongoose');

module.exports = mongoose.model('Parkings', {
	address: {
		type: String,
		index: {unique: true},
		required: true,
	},
	spots: {
		type: Number,
		required: true
	},
	location: {
		type: {x : {type: Number}, y: {type: Number}},
		required: true
	}
});
