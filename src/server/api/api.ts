import { Router } from "express";
import auth from "./auth/auth";
import friends from "./routes/friends";
import guild from "./routes/guild";
import guilds from "./routes/guilds";
import user from "./routes/user";
import users from "./routes/users";

const api = Router();

api.use("/auth", auth);
api.use("/user", user);
api.use("/users", users);
api.use("/friends", friends);
api.use("/guilds", guilds);
api.use("/guild", guild);

export default api;
