const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("users")
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex("users").insert([
				{
					username: "abc",
					password: bcrypt.hashSync("123", 10),
					department: "one"
				},
				{
					username: "def",
					password: bcrypt.hashSync("456", 10),
					department: "two"
				},
				{
					username: "ghi",
					password: bcrypt.hashSync("789", 10),
					department: "three"
				}
			]);
		});
};
