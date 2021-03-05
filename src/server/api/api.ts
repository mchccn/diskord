import { Router } from "express";
import auth from "./auth/auth";
import user from "./routes/user";

const api = Router();

api.use("/auth", auth);
api.use("/user", user);

export default api;
