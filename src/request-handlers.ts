import { RequestHandler } from "express";
import * as API from "./api";

export const homepageRH: RequestHandler = (req, res) => {
  res.json("Hello! I'm Emu Otori ^-^");
};

export const userProfileRH: RequestHandler = async (req, res) => {
  const username = req.params["username"];
  if (!username) {
    res.json({ error: `username = '${username}' is invalid` });
    return;
  }

  API.fetchUserProfile(username).then(data => res.json(data));
};
