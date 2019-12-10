const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
app.post("/webhook", (req, res) => res.sendStatus(200));
app.get("/", (req, res) => res.sendStatus(200));
console.log("listening on port", port);
app.listen(port);
