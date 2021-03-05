import { Router } from "express";
import { AUTHENTICATE } from "../../constants";

const guild = Router();

guild.use(AUTHENTICATE);

export default guild;
