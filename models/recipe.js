const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		// imageUrl: {
		// 	type: String,
		// 	required: true
		// },
		url: {
			type: String,
			require: true
		},
		tags: {
			type: String,
			required: true
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: false
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);