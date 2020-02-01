const Recipe = require('../models/recipe');

module.exports = {
	recipes: async function(req) {
    const recipes = await Recipe.find()
    console.log(recipes)
		return {
      recipes: recipes.map(p => {
        return {
          ...p._doc,
          id: p._id.toString()
        }
      })
    };
	},
	postRecipe: async function({ postInput }) {
		const post = new Recipe({
			title: postInput.title
    });
    const createdRecipe = await post.save();
    console.log('Recipe saved')
		return createdRecipe;
	}
};
