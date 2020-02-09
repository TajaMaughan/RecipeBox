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

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

app.use(
	'/graphql',
	graphqlHttp({ 
		schema: graphqlSchema, 
		rootValue: graphqlResolver, 
		graphiql: true,
		customFormatErrorFn(err) {
			if (!err.originalError) {
				return err;
			}
			const data = err.originalError.data;
			const message = err.message || 'An error occurred.';
			const code = err.originalError.code || 500;
			return { message: message, status: code, data: data };
		}
	})
);

mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(result => {
		console.log('Connected to database');
		app.listen(PORT);
		console.log(`Listening on port ${PORT}`);
	})
	.catch(err => {
		console.log(err);
	});
