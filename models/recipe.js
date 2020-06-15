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
			required: true
		},
		tags: [
			{
				type: String,
				required: false
			}
		],
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: false
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
