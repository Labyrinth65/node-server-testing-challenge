const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersDB = require("../users/users-model.js");
const secrets = require("../config/secrets");

// for endpoints beginning with /api/auth
router.post("/register", async (req, res) => {
	try {
		const checkUser = await usersDB.findBy(req.body.username);
		if (!req.body.username || !req.body.password || !req.body.department) {
			res.status(400).json({
				message: "please provide username, password, and department."
			});
		} else if (checkUser && req.body.username === checkUser.username) {
			res.status(401).json({
				message: "username is already in use, please provide another"
			});
		} else {
			const hash = bcrypt.hashSync(req.body.password, 10);
			req.body.password = hash;
			const user = await usersDB.add(req.body);
			res.status(201).json(user);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "something went wrong." });
	}
});

router.post("/login", async (req, res) => {
	try {
		if (!req.body.username || !req.body.password) {
			res
				.status(400)
				.json({ message: "please provide username and password." });
		}
		let { username, password } = req.body;
		const user = await usersDB.findBy(username);
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = generateToken(user);

			res.status(200).json({ message: `Welcome ${user.username}!`, token });
		} else {
			res.status(401).json({ message: "Invalid Credentials" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "something went wrong." });
	}
});

function generateToken(user) {
	const jwtPayload = {
		subject: user.id,
		username: user.username,
		department: user.department
	};

	const jwtOptions = {
		expiresIn: "1d"
	};

	return jwt.sign(jwtPayload, secrets.jwtSecret, jwtOptions);
}

module.exports = router;
