const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router.js");

const server = express();

server.get("/", (req, res) => {
	res.send(`<h2>WebAuth III Challenge</h2>`);
});

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);

server.use(errorHandler);

function errorHandler(error, req, res, next) {
	console.log(error);
	res.status(500).json({ error: "Data could not be retrieved" });
}

module.exports = server;
