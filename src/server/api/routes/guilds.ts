import { Router } from "express";
import { AUTHENTICATE } from "../../constants";

const guilds = Router();

guilds.use(AUTHENTICATE);

export default guilds;
