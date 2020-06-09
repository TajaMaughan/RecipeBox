const express = require('express');
const router = express.Router();
const auth = require('../middleware/check-auth');
const { check, validationResult } = require('express-validator');

const Recipe = require('../models/Recipe');

// Route -- GET api/recipes
// Description -- Get all user's saved recipes
// Access -- Private
router.get('/', auth, async (req, res) => {
	try {
		// Retrieve user recipes and order by newest first
		const recipes = await Recipe.find({ user: req.user.id }).sort({
			updatedAt: -1
		});

		res.json(recipes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// Route -- POST api/recipes
// Description -- Save new recipe
// Access -- Private
router.post(
	'/',
	[
		auth,
		[
			check('title', 'A title is required').not().isEmpty(),
			check('url', 'Please link to a valid url').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, url, tags } = req.body;

		try {
			const newRecipe = new Recipe({
				title,
				url,
				tags,
				user: req.user.id
			});
			const recipe = await newRecipe.save();

			res.json(recipe);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Sever Error');
		}
	}
);

// Route -- PUT api/recipes/:id
// Description -- Update recipe
// Access -- Private
router.put('/:id', auth, async (req, res) => {
	const { title, url, tags } = req.body;

	// Recipe object
	const recipeFields = {};
	if (title) recipeFields.title = title;
	if (url) recipeFields.url = url;
	if (tags) recipeFields.tags = tags;

	try {
		// Find recipe to edit
		let recipe = await Recipe.findById(req.params.id);

		if (!recipe)
			return res.status(404).json({ msg: 'Unable to retrieve recipe' });

		// Verify recipe belongs to user
		if (recipe.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: `You can't edit this recipe` });
		}

		recipe = await Recipe.findByIdAndUpdate(
			req.params.id,
			{ $set: recipeFields },
			{ new: true }
		);
		res.json(recipe);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Sever Error');
	}
});

// Route -- DELETE api/recipes/:id
// Description -- Delete recipe
// Access -- Private
router.delete('/:id', auth, async (req, res) => {
	try {
		// Find recipe to delete
		let recipe = await Recipe.findById(req.params.id);

		if (!recipe) return res.status(400).json({ msg: 'Recipe not found' });

		// Verify recipe belongs to user
		if (recipe.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: `This isn't your recipe to delete!` });
		}

		await Recipe.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Recipe deleted' });
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Sever Error');
	}
});

module.exports = router;
