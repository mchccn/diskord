import { Router } from "express";
import { ObjectId } from "mongodb";
import { AUTHENTICATE } from "../../constants";
import dmChannels from "../../database/models/dmchannel";
import messages from "../../database/models/message";
import { default as __users__ } from "../../database/models/user";

const users = Router();

users.use(AUTHENTICATE);

users.patch("/block", async (req, res) => {
    const { id } = req.body;

    if (!id)
        return res.status(400).json({
            message: "No user was provided.",
        });

    if (!ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid ID.",
        });

    const user = await __users__.findById(id);

    if (!user)
        return res.status(400).json({
            message: "User doesn't exist.",
        });

    //@ts-ignore
    const blocker = (await __users__.findById(req.user!._id))!;

    if (blocker.blocked.includes(user._id))
        return res.status(400).json({
            message: "User is already blocked.",
        });

    blocker.blocked.push(user._id);

    await blocker.save();

    return res.status(200).json({
        message: "User was blocked.",
    });
});

users.patch("/unblock", async (req, res) => {
    const { id } = req.body;

    if (!id)
        return res.status(400).json({
            message: "No user was provided.",
        });

    if (!ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid ID.",
        });

    const user = await __users__.findById(id);

    if (!user)
        return res.status(400).json({
            message: "User doesn't exist.",
        });

    //@ts-ignore
    const blocker = (await __users__.findById(req.user!._id))!;

    if (!blocker.blocked.includes(user._id))
        return res.status(400).json({
            message: "User is already unblocked.",
        });

    blocker.blocked = user.blocked.filter((id) => id !== user._id);

    await blocker.save();

    return res.status(200).json({
        message: "User was unblocked.",
    });
});

users.post("/:id", async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid user ID.",
        });

    const user = await __users__.findById(id);

    if (!user)
        return res.status(400).json({
            message: "User doesn't exist.",
        });

    if (!content)
        return res.status(400).json({
            message: "No message content provided.",
        });

    if (content.length > 2048)
        return res.status(400).json({
            message: "Message length over 2048 characters.",
        });

    let dm = await dmChannels.findOne({
        $or: [
            {
                //@ts-ignore
                users: [req.user!._id, user._id],
            },
            {
                //@ts-ignore
                users: [user._id, req.user!._id],
            },
        ],
    });

    if (!dm) {
        //@ts-ignore
        const sender = (await __users__.findById(req.user!._id))!;

        if (
            (!sender.guilds.some((id) => user.guilds.includes(id)) &&
                !sender.friends.includes(user._id) &&
                !user.friends.includes(sender._id)) ||
            sender.blocked.includes(user._id) ||
            user.blocked.includes(sender._id)
        )
            return res.status(403).json({
                message: "Unable to send messages to this user.",
            });

        dm = await dmChannels.create({
            users: [sender._id, user._id],
        });
    }

    await messages.create({
        channel: dm._id,
        //@ts-ignore
        author: req.user!._id,
        content,
    });

    return res.status(200).json({
        message: "Message sent.",
    });
});

users.delete("/:id/delete", async (req, res) => {
    const { id } = req.params;
    const { message: messageId } = req.body;

    if (!ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid user ID.",
        });

    const user = await __users__.findById(id);

    if (!user)
        return res.status(400).json({
            message: "User doesn't exist.",
        });

    if (!messageId)
        return res.status(400).json({
            message: "No message provided.",
        });

    if (!ObjectId.isValid(messageId))
        return res.status(400).json({
            message: "Invalid message ID.",
        });

    let dm = await dmChannels.findOne({
        $or: [
            {
                //@ts-ignore
                users: [req.user!._id, user._id],
            },
            {
                //@ts-ignore
                users: [user._id, req.user!._id],
            },
        ],
    });

    if (!dm) {
        //@ts-ignore
        const sender = (await __users__.findById(req.user!._id))!;

        if (
            (!sender.guilds.some((id) => user.guilds.includes(id)) &&
                !sender.friends.includes(user._id) &&
                !user.friends.includes(sender._id)) ||
            sender.blocked.includes(user._id) ||
            user.blocked.includes(sender._id)
        )
            return res.status(403).json({
                message: "Unable to delete messages sent to this user.",
            });

        dm = await dmChannels.create({
            users: [sender._id, user._id],
        });
    }

    const message = await messages.findById(messageId);

    if (!message)
        return res.status(400).json({
            message: "Message doesn't exist.",
        });

    //@ts-ignore
    if (message.author !== req.user!._id)
        return res.status(403).json({
            message: "You cannot delete their message.",
        });

    await message.delete();

    return res.status(200).json({
        message: "Message was deleted.",
    });
});

users.put("/:id/pin", async (req, res) => {
    const { id } = req.params;
    const { message: messageId, content } = req.body;

    if (!ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid user ID.",
        });

    const user = await __users__.findById(id);

    if (!user)
        return res.status(400).json({
            message: "User doesn't exist.",
        });

    if (!messageId)
        return res.status(400).json({
            message: "No message provided.",
        });

    if (!ObjectId.isValid(messageId))
        return res.status(400).json({
            message: "Invalid message ID.",
        });

    let dm = await dmChannels.findOne({
        $or: [
            {
                //@ts-ignore
                users: [req.user!._id, user._id],
            },
            {
                //@ts-ignore
                users: [user._id, req.user!._id],
            },
        ],
    });

    if (!dm) {
        //@ts-ignore
        const sender = (await __users__.findById(req.user!._id))!;

        if (
            (!sender.guilds.some((id) => user.guilds.includes(id)) &&
                !sender.friends.includes(user._id) &&
                !user.friends.includes(sender._id)) ||
            sender.blocked.includes(user._id) ||
            user.blocked.includes(sender._id)
        )
            return res.status(403).json({
                message: "Unable to pin messages sent to this user.",
            });

        dm = await dmChannels.create({
            users: [sender._id, user._id],
        });
    }

    const message = await messages.findById(messageId);

    if (!message)
        return res.status(400).json({
            message: "Message doesn't exist.",
        });

    if (dm.pinned.includes(messageId))
        return res.json({
            message: "Message is already pinned.",
        });

    dm.pinned.push(messageId);

    await dm.save();

    return res.status(200).json({
        message: "Message was pinned.",
    });
});

users.put("/:id/pin", async (req, res) => {
    const { id } = req.params;
    const { message: messageId, content } = req.body;

    if (!ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid user ID.",
        });

    const user = await __users__.findById(id);

    if (!user)
        return res.status(400).json({
            message: "User doesn't exist.",
        });

    if (!messageId)
        return res.status(400).json({
            message: "No message provided.",
        });

    if (!ObjectId.isValid(messageId))
        return res.status(400).json({
            message: "Invalid message ID.",
        });

    let dm = await dmChannels.findOne({
        $or: [
            {
                //@ts-ignore
                users: [req.user!._id, user._id],
            },
            {
                //@ts-ignore
                users: [user._id, req.user!._id],
            },
        ],
    });

    if (!dm) {
        //@ts-ignore
        const sender = (await __users__.findById(req.user!._id))!;

        if (
            (!sender.guilds.some((id) => user.guilds.includes(id)) &&
                !sender.friends.includes(user._id) &&
                !user.friends.includes(sender._id)) ||
            sender.blocked.includes(user._id) ||
            user.blocked.includes(sender._id)
        )
            return res.status(403).json({
                message: "Unable to pin messages sent to this user.",
            });

        dm = await dmChannels.create({
            users: [sender._id, user._id],
        });
    }

    const message = await messages.findById(messageId);

    if (!message)
        return res.status(400).json({
            message: "Message doesn't exist.",
        });

    if (!dm.pinned.includes(messageId))
        return res.status(400).json({
            message: "Message isn't pinned.",
        });

    dm.pinned = dm.pinned.filter((id) => id !== messageId);

    await dm.save();

    return res.status(200).json({
        message: "Message was unpinned.",
    });
});

users.patch("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const { message: messageId, content } = req.body;

    if (!ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid user ID.",
        });

    const user = await __users__.findById(id);

    if (!user)
        return res.status(400).json({
            message: "User doesn't exist.",
        });

    if (!messageId)
        return res.status(400).json({
            message: "No message provided.",
        });

    if (!ObjectId.isValid(messageId))
        return res.status(400).json({
            message: "Invalid message ID.",
        });

    let dm = await dmChannels.findOne({
        $or: [
            {
                //@ts-ignore
                users: [req.user!._id, user._id],
            },
            {
                //@ts-ignore
                users: [user._id, req.user!._id],
            },
        ],
    });

    if (!dm) {
        //@ts-ignore
        const sender = (await __users__.findById(req.user!._id))!;

        if (
            (!sender.guilds.some((id) => user.guilds.includes(id)) &&
                !sender.friends.includes(user._id) &&
                !user.friends.includes(sender._id)) ||
            sender.blocked.includes(user._id) ||
            user.blocked.includes(sender._id)
        )
            return res.status(403).json({
                message: "Unable to edit messages sent to this user.",
            });

        dm = await dmChannels.create({
            users: [sender._id, user._id],
        });
    }

    const message = await messages.findById(messageId);

    if (!message)
        return res.status(400).json({
            message: "Message doesn't exist.",
        });

    //@ts-ignore
    if (message.author !== req.user!._id)
        return res.status(403).json({
            message: "You cannot edit their message.",
        });

    if (!content)
        return res.status(400).json({
            message: "No message content provided.",
        });

    if (content.length > 2048)
        return res.status(400).json({
            message: "Message length over 2048 characters.",
        });

    message.content = content;

    await message.save();

    return res.status(200).json({
        message: "Message was edited.",
    });
});

export default users;
