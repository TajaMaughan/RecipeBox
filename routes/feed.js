const express = require('express');
const router = express.Router();

const Recipe = require('../models/Recipe');

// Route -- GET api/feed
// Description -- Get all recipes for main feed
// Access -- Public
router.get('/', async (req, res) => {
	try {
		const recipes = await Recipe.find().sort({ updatedAt: -1 });

		res.json(recipes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Sever Error');
	}
});

module.exports = router;
