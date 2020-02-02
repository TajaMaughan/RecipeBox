const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Recipe = require('../models/recipe');
const User = require('../models/user');

module.exports = {
	createUser: async function({ userInput }) {
		// mutation createUser ($userName: String!, $email: String!, $password: String!){
		// 	createUser(userInput: {
		// 		userName: $userName
		// 		email: $email
		// 		password: $password
		// 	}){
		// 		id
		// 	}
		// }
		const existingEmail = await User.findOne({ email: userInput.email });
		if (existingEmail) {
			console.log('Email is already used');
			return;
		}
		const existingUserName = await User.findOne({
			userName: userInput.userName
		});
		if (existingUserName) {
			console.log('Username has already been used.');
			return;
		}
		const hashedPass = await bcrypt.hash(userInput.password, 12);
		const user = new User({
			userName: userInput.userName,
			email: userInput.email,
			password: hashedPass
		});
		const createdUser = await user.save();
		console.log('User Created');
		return createdUser;
	},
	userLogin: async function({ email, password }) {
		// query login($email: String!, $password: String!){
		// 	userLogin(email: $email, password: $password){
		// 		userId
		// 		token
		// 	}
		// }
		const user = await User.findOne({ email: email });
		console.log(user);
		if (!user) {
			console.log('No user found');
			return;
		}
		const equalPass = await bcrypt.compare(password, user.password);
		if (!equalPass) {
			console.log('Password is incorrect');
			return;
		}
		console.log('Password correct');
		const token = jwt.sign(
			{
				userId: user._id.toString(),
				email: user.email
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);
		console.log('User logged in');
		return { token: token, userId: user._id.toString() };
	},
	postRecipe: async function({ recipeInput }) {
		// mutation createRecipe( $title: String! , $url: String!, $tags: String!){
		//   postRecipe(recipeInput:{
		//     title: $title
		//     url: $url
		//     tags: $tags
		//   }){
		//      id
		//   }
		// }
		const recipe = new Recipe({
			title: recipeInput.title,
			url: recipeInput.url,
			tags: recipeInput.tags
		});
		const createdRecipe = await recipe.save();
		console.log('Recipe saved');
		return createdRecipe;
	},
	getRecipes: async function() {
		// {
		//   getRecipes{
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
	getRecipe: async function({ id }) {
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
