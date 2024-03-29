import { RequestHandler } from "express";
import { fetchUserProfile } from "./api/user-profile";
import { fetchQuestion } from "./api/question";
import { fetchDailyQuestion } from "./api/daily-question";
import { fetchQuestionList } from "./api/question-list";

export const homepageRH: RequestHandler = (req, res) => {
  res.json("Hello! I'm Emu Otori ^-^");
};

export const userProfileRH: RequestHandler = async (req, res) => {
  const username = req.params["username"];

  if (!username) {
    res.json({ error: `No username provided` });
    return;
  }

  fetchUserProfile(username).then(data => res.json(data));
};

export const questionRH: RequestHandler = async (req, res) => {
  const titleSlug = req.params["titleSlug"];

  if (!titleSlug) {
    res.json({ error: `No titleSlug provided` });
    return;
  }

  fetchQuestion(titleSlug).then(data => res.json(data));
};

export const dailyQuestionRH: RequestHandler = async (req, res) => {
  fetchDailyQuestion().then(data => res.json(data));
};

export const questionListRH: RequestHandler = async (req, res) => {
  try {
    let skip = parseInt(req.params["skip"]);
    let limit = parseInt(req.params["limit"]);

    fetchQuestionList(skip, limit).then(data => res.json(data));
  } catch (e: any) {
    res.json({ error: `Invalid invokation, use /?skip=<int>&limit=<int>` });
  }
};
