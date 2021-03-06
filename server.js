const express = require("express");
const favicon = require("express-favicon");
const helmet = require("helmet");
const path = require("path");
const sslRedirect = require("heroku-ssl-redirect");

const app = express();
const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8080;

// Middleware
app.use(favicon(__dirname + "/frontend/build/favicon.ico"));

// express basic security measures
app.use(helmet());
app.disable("x-powered-by");

// For production
if (!isDev) {
	app.use(sslRedirect());
	app.use(express.static(__dirname));
	app.use(express.static(path.join(__dirname, "frontend", "build")));

	app.get("*", function(req, res) {
		res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
	});
}

app.listen(port, () => console.log(`Server started on port: ${port}`));
