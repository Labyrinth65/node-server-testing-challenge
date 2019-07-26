const request = require("supertest");
const db = require("../../database/dbConfig");

const usersDB = require("../users/users-model");
const server = require("../server");

describe("user model", () => {
	beforeEach(async () => {
		await db("users").truncate();
	});

	describe("POST /api/auth/register", () => {
		it("should increase total number of users", async () => {
			const startUsers = await db("users");
			await usersDB.add({
				username: "user",
				password: "pass",
				department: "something"
			});
			const endUsers = await db("users");

			expect(endUsers).toHaveLength(startUsers.length + 1);
		});

		it("should return 201 for adding user", () => {
			const user = {
				username: "user1",
				password: "pass1",
				department: "something1"
			};

			return request(server)
				.post(`/api/auth/register`)
				.send(user)
				.then(res => {
					expect(res.status).toBe(201);
				});
		});
	});

	describe("DEL /:id", () => {
		it("should reduce total number of users", async () => {
			await usersDB.add({
				username: "user2",
				password: "pass2",
				department: "something2"
			});
			const users = await db("users");
			const count = await usersDB.remove(users.length);

			expect(count).toHaveLength(users.length - 1);
		});

		it("should return 200 for existing user", async () => {
			await usersDB.add({
				username: "user3",
				password: "pass3",
				department: "something3"
			});
			return request(server)
				.delete(`/api/users/1`)
				.then(res => {
					expect(res.status).toBe(200);
				});
		});
	});
});
