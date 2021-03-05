import MongoStore from "connect-mongo";
import { config as dotenv } from "dotenv";
import express from "express";
import session from "express-session";
import next from "next";
import passport from "passport";
import connect from "./server/database/connect";

dotenv();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

export { dev, port, app, handle };

(async () => {
    try {
        const connection = await connect();

        const api = (await import("./server/api/api")).default;

        await app.prepare();

        const server = express();

        server.use(
            session({
                name: "diskord",
                secret: "some random secret",
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,
                    sameSite: "lax",
                    secure: !dev,
                },
                store: MongoStore.create({
                    mongoUrl: process.env.MONGO_URI,
                }),
                saveUninitialized: false,
                resave: false,
            })
        );

        server.use(passport.initialize());
        server.use(passport.session());

        server.use(express.json());
        server.use(
            express.urlencoded({
                extended: true,
            })
        );

        server.use("/api", api);

        server.get("*", (req, res) => handle(req, res));

        server.listen(port, () => console.log("Server listening on port 3000!"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
