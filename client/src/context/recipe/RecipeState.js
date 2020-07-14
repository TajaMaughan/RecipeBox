import React, { useReducer } from 'react';
import RecipeContext from './recipeContext';
import recipeReducer from './recipeReducer';
import {
	ADD_RECIPE,
	DELETE_RECIPE,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_RECIPE,
	FILTER_RECIPES,
	CLEAR_FILTER
} from '../types';

const RecipeState = props => {
	const initialState = {
		recipes: [
			{
				id: 1,
				title: 'Angel Food Cake',
				url: 'https://www.browneyedbaker.com/angel-food-cake/',
				tags: ['Cake', 'Sponge Cake', 'Dessert']
			},
			{
				id: 2,
				title: 'Crock Pot Pork Roast with Sauerkraut and Apples',
				url:
					'https://ourbestbites.com/crock-pot-pork-roast-with-sauerkraut-and-apples',
				tags: ['Dinner', 'Crock Pot', 'Pork']
			},
			{
				id: 3,
				title: 'Dressed Up Sloppy Joes',
				url: 'https://ourbestbites.com/dressed-up-sloppy-joes/',
				tags: ['Entree', 'Dinner']
			},
			{
				id: 4,
				title: 'My Favorite Cornbread Recipe',
				url: 'https://sallysbakingaddiction.com/my-favorite-cornbread/',
				tags: ['Side', 'Bread']
			}
		],
		chip: ''
	};

	const [state, dispatch] = useReducer(recipeReducer, initialState);

	// Add Recipe
	const addRecipe = recipe => {
		dispatch({ type: ADD_RECIPE, payload: recipe });
	};

	// Delete Recipe

	// Set Current Recipe

	// Clear Current Recipe

	// Update Recipe

	// Filter Recipes

	// Clear Filter

	return (
		<RecipeContext.Provider
			value={{
				recipes: state.recipes,
				addRecipe
			}}
		>
			{props.children}
		</RecipeContext.Provider>
	);
};

export default RecipeState;
