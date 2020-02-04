require('dotenv').config();
const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0-3oedr.mongodb.net/recipe-box?retryWrites=true&w=majority`;
const PORT = process.env.port || 8000;

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

// app.use(bodyParser);

app.use(
	'/graphql',
	graphqlHttp({ 
		schema: graphqlSchema, 
		rootValue: graphqlResolver, 
		graphiql: true })
);

mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
	.then(result => {
		console.log('Connected to database');
		app.listen(PORT);
		console.log(`Listening on port ${PORT}`);
	})
	.catch(err => {
		console.log(err);
	});
