import MongoStore from "connect-mongo";
import { config as dotenv } from "dotenv";
import express from "express";
import session from "express-session";
import { createServer } from "http";
import { ObjectId } from "mongodb";
import next from "next";
import passport from "passport";
import { Server, Socket } from "socket.io";
import { AUTHENTICATE } from "./server/constants";
import connect from "./server/database/connect";
import users from "./server/database/models/user";

dotenv();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const server = express();
const http = createServer(server);

const io = new Server(http, {});
const sockets: { [id: string]: Socket } = {};

export { dev, port, app, handle, server, http, io };

(async () => {
    try {
        await connect();

        await import("./server/api/auth/passport");

        const api = (await import("./server/api/api")).default;

        await app.prepare();

        io.on("connection", async (socket: Socket) => {
            socket.on("verify", async (id, password) => {
                if (!ObjectId.isValid(id)) return socket.emit("invalid");

                const user = await users.findById(id);

                if (!user) return socket.emit("invalid");

                if (user.password !== password) return socket.emit("invalid");

                sockets[id] = socket;

                socket.emit("verified");

                return socket.on("disconnect", () => delete sockets[id]);
            });
        });

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

        server.get("/login", (req, res) => (req.user ? res.redirect("/app") : handle(req, res)));

        server.use("/app", AUTHENTICATE);

        server.get("*", (req, res) => handle(req, res));

        http.listen(port, () => console.log("Server listening on port 3000!"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
