const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
	// get the token from Authorization header
	const token = req.headers.authorization;

	// verify the token
	if (token) {
		jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
			if (err) {
				// invalid token
				res
					.status(401)
					.json({ message: "please verify that you are logged in" });
			} else {
				// valid token
				// makes the token available to the rest of the api
				req.jwtToken = decodedToken;
				next();
			}
		});
	} else {
		res.status(400).json({ message: "please verify that you are logged in" });
	}
};

// const options = {
//   headers: {
//     authorization: token,
//   },
// };

// axios.get(url, options);
// axios.post(url, data, options);
