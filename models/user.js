const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	name: {
		type: String,
		require: true
	},
	recipes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Recipe'
		}
	]
});

module.exports = mongoose.model('User', userSchema);
