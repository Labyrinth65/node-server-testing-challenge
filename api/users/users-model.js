const db = require("../../database/dbConfig.js");

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove
};

function find() {
	return db("users").select("id", "username", "department");
}

function findBy(username) {
	return db("users")
		.where({ username })
		.first();
}

async function add(user) {
	const [id] = await db("users").insert(user);
	return findById(id);
}

function findById(id) {
	return db("users")
		.select("id", "username", "department")
		.where({ id })
		.first();
}

function remove(id) {
	return db("users")
		.where("id", id)
		.del()
		.then(() => find());
}
