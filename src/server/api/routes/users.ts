import { Router } from "express";
import { AUTHENTICATE } from "../../constants";

const users = Router();

users.use(AUTHENTICATE);

export default users;
