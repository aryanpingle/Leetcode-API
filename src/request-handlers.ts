import { RequestHandler } from "express";
import { fetchUserProfile } from "./api/user-profile";
import { fetchQuestion } from "./api/question";

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
