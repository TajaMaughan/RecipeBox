require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@recipe-box-3oedr.mongodb.net/recipe-box?retryWrites=true&w=majority
`;

const connectDB = async () => {
	try {
		await mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});

		console.log('Database is connected');
	} catch (err) {
		console.log('Database connection failed.');
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
