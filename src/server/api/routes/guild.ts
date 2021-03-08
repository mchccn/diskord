import { Router } from "express";
import { ObjectId } from "mongodb";
import { AUTHENTICATE } from "../../constants";
import guilds from "../../database/models/guild";
import invites from "../../database/models/invite";

const guild = Router();

guild.use(AUTHENTICATE);

guild.put("/invites/new", async (req, res) => {
    const { id } = req.body;

    if (!id)
        return res.status(400).json({
            message: "No guild was provided.",
        });

    if (!ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid guild ID.",
        });

    const guild = await guilds.findById(id);

    if (!guild)
        return res.status(400).json({
            message: "Guild doesn't exist",
        });

    const guildInvites = await invites.find({
        guild: id,
    });

    if (guildInvites.length >= 10)
        return res.status(403).json({
            message: "This guild already has 10 invites.",
        });

    await invites.create({
        guild: id,
    });

    return res.status(200).json({
        message: "Invite created.",
    });
});

guild.delete("/invites/delete", async (req, res) => {
    const { id } = req.body;

    if (!id)
        return res.status(400).json({
            message: "No invite was provided.",
        });

    if (!ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid invite ID.",
        });

    const invite = await invites.findById(id);

    if (!invite)
        return res.status(400).json({
            message: "Invite doesn't exist",
        });

    await invite.delete();

    return res.status(200).json({
        message: "Invite deleted.",
    });
});

export default guild;
