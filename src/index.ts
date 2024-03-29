import express from "express";
import * as RH from "./request-handlers";

const app = express();
const port = 5500;

// source: https://stackoverflow.com/a/18311469/8089674
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "false");

  // Pass to next layer of middleware
  next();
});

app.get("/$", RH.homepageRH);
app.get("/user/:username/$", RH.userProfileRH);
app.get("/question/:titleSlug/$", RH.questionRH);
app.get("/daily/$", RH.dailyQuestionRH);
app.get("/question-list/:skip/:limit/", RH.questionListRH);

//get user profile details

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
