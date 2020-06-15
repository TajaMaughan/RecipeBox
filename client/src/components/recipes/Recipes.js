import React, { Fragment, useContext } from 'react';
import RecipeContext from '../../context/recipe/recipeContext';
import RecipeItem from './RecipeItem';

const Recipes = () => {
	const recipeContext = useContext(RecipeContext);

	const { recipes } = recipeContext;

	return (
		<Fragment>
			<h3 className="center cyan-text text-darken-4">Recipes</h3>
			<div className="divider"></div>
			{recipes.map(recipe => (
				<div className="section">
					<RecipeItem key={recipe.id} recipe={recipe} />
				</div>
			))}
		</Fragment>
	);
};

export default Recipes;
