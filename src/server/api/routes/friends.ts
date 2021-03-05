import { Router } from "express";
import { AUTHENTICATE } from "../../constants";

const friends = Router();

friends.use(AUTHENTICATE);

export default friends;
