const router = require("express").Router();

const usersDB = require("./users-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, async (req, res) => {
	try {
		const users = await usersDB.find();
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "something went wrong." });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const user = await usersDB.findById(req.params.id);
		if (user) {
			const count = await usersDB.remove(req.params.id);
			if (count !== 0) {
				res.status(200).json(count);
			}
		} else {
			res.status(404).json({ message: "User ID Could Not Be Found." });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The user could not be removed from the database"
		});
	}
});

module.exports = router;
