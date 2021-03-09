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

get.get("/channels/:id/messages/:count", async (req, res) => {
    const { id, count } = req.params;

    if (!ObjectId.isValid(id)) return res.status(404).json(null);

    if (!parseInt(count)) return res.status(404).json(null);

    const channel = await channels.findById(id);

    if (!channel) return res.status(404).json(null);

    const channelMessages = await messages
        .find({
            channel: id,
        })
        .limit(parseInt(count))
        .sort({ $natural: -1 });

    return res.status(200).json(channelMessages);
});

get.get("/guilds/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(404).json(null);

    const guild = await guilds.findById(id);

    return res.status(guild ? 200 : 404).json(guild);
});

get.get("/guilds/:id/channels", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(404).json(null);

    const guild = await guilds.findById(id);

    if (!guild) return res.status(404).json(null);

    const guildChannels = await channels.find({
        guild: id,
    });

    return res.status(200).json(guildChannels);
});

get.get("/guilds/:id/roles", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(404).json(null);

    const guild = await guilds.findById(id);

    if (!guild) return res.status(404).json(null);

    const guildRoles = await roles.find({
        guild: id,
    });

    return res.status(200).json(guildRoles);
});

get.get("/guilds/:id/members", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(404).json(null);

    const guild = await guilds.findById(id);

    if (!guild) return res.status(404).json(null);

    const guildMembers = await members.find({
        guild: id,
    });

    return res.status(200).json(guildMembers);
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
