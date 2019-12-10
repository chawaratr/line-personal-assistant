const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = process.env.PORT || 4000;

// Import the appropriate class
const { WebhookClient } = require("dialogflow-fulfillment");

app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({
    success: true
  });
});

app.post("/webhook", (req, res) => {
  //console.log("Body: ", req.body);
  let userStorage =
    req.body.originalDetectIntentRequest.payload.user.userStorage || {};
  let userId;
  console.log("userStorage", userStorage);

  if (userId in userStorage) {
    userId = userStorage.userId;
  } else {
    var uuid = require("uuid/v4");
    userId = uuid();
    userStorage.userId = userId;
  }

  console.log("userID", userId);
  //Create an instance
  const agent = new WebhookClient({
    request: req,
    response: res
  });

  //Test get value of WebhookClient
  console.log("agentVersion: " + agent.agentVersion);
  console.log("intent: " + agent.intent);
  console.log("locale: " + agent.locale);
  console.log("query: ", agent.query);
  console.log("session: ", agent.session);

  //Function Location
  function location(agent) {
    agent.add("Welcome to Thailand.");
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set("Location", location); // "Location" is once Intent Name of Dialogflow Agent
  agent.handleRequest(intentMap);
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
