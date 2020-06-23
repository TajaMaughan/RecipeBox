import React, { Fragment, useContext } from 'react';
import RecipeContext from '../../context/recipe/recipeContext';
import RecipeItem from './RecipeItem';
import AddBtn from '../../components/layout/AddBtn';
import AddRecipeModal from './AddRecipeModal';

const Recipes = () => {
	const recipeContext = useContext(RecipeContext);

	const { recipes } = recipeContext;

	return (
		<div>
			<h3 className="center cyan-text text-darken-4">Recipes</h3>
			<div className="divider"></div>
			{recipes.map(recipe => (
				<div className="section">
					<RecipeItem key={recipe.id} recipe={recipe} />
				</div>
			))}
			<AddBtn />
			<AddRecipeModal />
		</div>
	);
};

export default Recipes;
