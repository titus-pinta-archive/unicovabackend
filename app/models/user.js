const mongoose = require('mongoose');
const validator = require('../../config/validator');
const emailRegex = validator.emailRegex;

module.exports = mongoose.model('Users', {
	email: {
		type: String,
		index: {unique: true},
		required: true,
		match: emailRegex
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	licencePlate: {
		type: String,
		required: true
	}
});
