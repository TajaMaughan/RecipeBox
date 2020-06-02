require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authToken = req.header('x-auth-token');

	if (!authToken) {
		return res.status(401).json({ msg: 'No token retrieved, access denied.' });
	}

	try {
		const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token invalid' });
	}
};
