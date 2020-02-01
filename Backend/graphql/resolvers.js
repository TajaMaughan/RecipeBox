const Recipe = require('../models/recipe');

module.exports = {
	postRecipe: async function({ postInput }) {
		// mutation createRecipe( $title: String! , $url: String!, $tags: String!){
		//   postRecipe(postInput:{
		//     title: $title
		//     url: $url
		//     tags: $tags
		//   }){
		//      id
		//   }
		// }
		const post = new Recipe({
			title: postInput.title,
			url: postInput.url,
			tags: postInput.tags
		});
		const createdRecipe = await post.save();
		console.log('Recipe saved');
		return createdRecipe;
	},
	recipes: async function() {
		// {
		//   recipes{
		//     recipes{
		//       id
		//       title
		//       url
		//       tags
		//     }
		//   }
		// }
		const recipes = await Recipe.find();
		console.log(recipes);
		return {
			recipes: recipes.map(recipe => {
				return {
					...recipe._doc,
					id: recipe._id.toString()
				};
			})
		};
	},
	recipe: async function({ id }) {
    // query fetchRecipe ($id: ID!){
    //   recipe(id: $id){
    //     id
    //     title
    //     url
    //     tags
    //   }
    // }
		const recipe = await Recipe.findById(id);
		console.log(recipe);
		return {
			...recipe._doc,
			id: recipe._id.toString()
		};
	}
};
