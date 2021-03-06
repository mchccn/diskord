import { Router } from "express";
import { AUTHENTICATE } from "../../constants";

const users = Router();

users.use(AUTHENTICATE);

users.patch("/block", async (req, res) => {});

users.patch("/unblock", async (req, res) => {});

export default users;
