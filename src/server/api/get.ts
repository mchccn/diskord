import { Router } from "express";
import { ObjectId } from "mongodb";
import channels from "../database/models/channel";
import guilds from "../database/models/guild";
import invites from "../database/models/invite";
import members from "../database/models/member";
import messages from "../database/models/message";
import roles from "../database/models/role";
import users from "../database/models/user";

const get = Router();

get.get("/channels/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(404).json(null);

    const channel = await channels.findById(id);

    return res.status(channel ? 200 : 404).json(channel);
});

get.get("/guilds/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(404).json(null);

    const guild = await guilds.findById(id);

    return res.status(guild ? 200 : 404).json(guild);
});

get.get("/invites/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(404).json(null);

    const invite = await invites.findById(id);

    return res.status(invite ? 200 : 404).json(invite);
});

get.get("/members/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(404).json(null);

    const member = await members.findById(id);

    return res.status(member ? 200 : 404).json(member);
});

get.get("/messages/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(404).json(null);

    const message = await messages.findById(id);

    return res.status(message ? 200 : 404).json(message);
});

get.get("/role/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(404).json(null);

    const role = await roles.findById(id);

    return res.status(role ? 200 : 404).json(role);
});

get.get("/users/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(404).json(null);

    const user = await users.findById(id);

    return res.status(user ? 200 : 404).json(user);
});

export default get;
