const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
	{
		Title: {
			type: String,
			required: true
		},
		imageUrl: {
			type: String,
			required: true
		},
		tags: {
			type: String,
			required: true
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
