require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0-3oedr.mongodb.net/test?retryWrites=true&w=majority`;
const PORT = process.env.port || 8080;

const app = express();

mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => {
		console.log('Connected to database');
		app.listen(PORT);
		console.log(`Listening on port ${PORT}`);
	})
	.catch(err => {
		console.log(err);
	});
