const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

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
		// 		_id
		// 	}
		// }
		const errors = [];
		if (!validator.isEmail(userInput.email)) {
			errors.push({ message: 'Please enter a valid email address.' });
		}
		if (
			validator.isEmpty(userInput.password) ||
			!validator.isLength(userInput.password, { min: 6 })
		) {
			errors.push({ message: 'Password must be at least 6 characters' });
		}
		if (errors.length > 0) {
			const error = new Error('Input is invalid');
			error.data = errors;
			error.code = 422;
			throw error;
		}
		const existingEmail = await User.findOne({ email: userInput.email });
		if (existingEmail) {
			const error = new Error('Email is already used')
			throw error;
		}
		const existingUserName = await User.findOne({
			userName: userInput.userName
		});
		if (existingUserName) {
			error = new Error('Username has already been used.')
			throw error;
		}
		const hashedPass = await bcrypt.hash(userInput.password, 12);
		const user = new User({
			userName: userInput.userName,
			email: userInput.email,
			password: hashedPass
		});
		const createdUser = await user.save();
		console.log('User Created');
		return {
			...createdUser.doc,
			_id: createdUser._id.toString()
		};
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
			const error = new Error('No user found.');
			error.code = 401;
			throw error;
		}
		const equalPass = await bcrypt.compare(password, user.password);
		if (!equalPass) {
			const error = new Error('Password is incorrect.');
			error.code = 401;
			throw error;
		}
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
		//      _id
		//   }
		// }
		const recipe = new Recipe({
			title: recipeInput.title,
			url: recipeInput.url,
			tags: recipeInput.tags
		});
		const createdRecipe = await recipe.save();
		console.log('Recipe saved');
		return {
			...createdRecipe._doc,
			_id: createdRecipe._id.toString(),
			createdAt: createdRecipe.createdAt.toISOString(),
			updatedAt: createdRecipe.updatedAt.toISOString()
		};
	},
	getRecipes: async function() {
		// {
		//   getRecipes{
		//     recipes{
		//       _id
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
					
					_id: recipe._id.toString(),
					createdAt: recipe.createdAt.toISOString(),
					updatedAt: recipe.updatedAt.toISOString()
				};
			})
		};
	},
	getRecipe: async function({ id }) {
		// query fetchRecipe ($id: ID!){
		//   getRecipe(id: $id){
		//     _id
		//     title
		//     url
		//     tags
		//   }
		// }
		const recipe = await Recipe.findById(id);
		console.log(recipe);
		return {
			...recipe._doc,
			_id: recipe._id.toString(),
			createdAt: recipe.createdAt.toISOString(),
			updatedAt: recipe.updatedAt.toISOString()
		};
	},
	updateRecipe: async function({ id, recipeInput }) {
		// mutation updateRecipe($id: ID!, $title: String!, $url: String!, $tags: String!){
		// 	updateRecipe(id: $id, recipeInput:{
		// 		title: $title
		// 		url: $url
		// 		tags: $tags
		// 	}){
		// 		_id
		// 	}
		// }
		const recipe = await Recipe.findById(id);
		if (!recipe) {
			console.log('No recipe found');
			return;
		}
		recipe.title = recipeInput.title;
		recipe.url = recipeInput.url;
		recipe.tags = recipeInput.tags;
		const updatedRecipe = await recipe.save();
		console.log('Recipe updated!');
		return {
			...updatedRecipe._doc,
			_id: updatedRecipe._id.toString(),
			createdAt: updatedRecipe.createdAt.toISOString(),
			updatedAt: updatedRecipe.updatedAt.toISOString()
		};
	},
	deleteRecipe: async function({ id }) {
		// mutation deleteRecipe($id: ID!){
		// 	deleteRecipe(id: $id
		// 	)
		// }
		const recipe = await Recipe.findById(id);
		if (!recipe) {
			console.log('No recipe found.');
			return;
		}
		await Recipe.findByIdAndRemove(id);
		console.log('Recipe deleted.');
		return true;
	}
};
