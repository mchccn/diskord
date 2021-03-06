import { Router } from "express";
import { ObjectId } from "mongodb";
import { AUTHENTICATE } from "../../constants";
import friendRequests from "../../database/models/friendRequest";
import users from "../../database/models/user";

const friends = Router();

friends.use(AUTHENTICATE);

friends.put("/request", async (req, res) => {
    const { id } = req.body;

    if (!id)
        return res.status(400).json({
            message: "No user was provided.",
        });

    if (!ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid ID.",
        });

    const user = await users.findById(id);

    if (!user)
        return res.status(400).json({
            message: "User doesn't exist.",
        });

    await friendRequests.create({
        receiver: id,
        //@ts-ignore
        user: req.user!._id,
    });

    return res.status(200).json({
        message: "Friend request sent.",
    });
});

friends.put("/accept", async (req, res) => {
    const { id } = req.body;

    if (!id)
        return res.status(400).json({
            message: "No user was provided.",
        });

    if (!ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid ID.",
        });

    const user = await users.findById(id);

    if (!user)
        return res.status(400).json({
            message: "User doesn't exist.",
        });

    const request = await friendRequests.findOne({
        user: id,
        //@ts-ignore
        receiver: req.user!._id,
    });

    if (!request)
        return res.status(400).json({
            message: "Friend request doesn't exist.",
        });

    await request.delete();

    //@ts-ignore
    user.friends.push(req.user!._id);

    await user.save();

    //@ts-ignore
    const receiver = (await users.findById(req.user!._id))!;

    receiver.friends.push(id);

    await receiver.save();

    return res.status(200).json({
        message: "Friend request accepted.",
    });
});

friends.delete("/remove", async (req, res) => {
    const { id } = req.body;

    if (!id)
        return res.status(400).json({
            message: "No user was provided.",
        });

    if (!ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid ID.",
        });

    const user = await users.findById(id);

    if (!user)
        return res.status(400).json({
            message: "User doesn't exist.",
        });

    //@ts-ignore
    const receiver = (await users.findById(req.user!._id))!;

    if (!receiver.friends.includes(id))
        return res.status(400).json({
            message: "You aren't friends with them.",
        });

    receiver.friends = receiver.friends.filter((id) => id !== user._id);

    await receiver.save();

    user.friends = user.friends.filter((id) => id !== receiver._id);

    await user.save();

    return res.status(200).json({
        message: "Friend was removed.",
    });
});

friends.delete("/ignore", async (req, res) => {
    const { id } = req.body;

    if (!id)
        return res.status(400).json({
            message: "No user was provided.",
        });

    if (!ObjectId.isValid(id))
        return res.status(400).json({
            message: "Invalid ID.",
        });

    const user = await users.findById(id);

    if (!user)
        return res.status(400).json({
            message: "User doesn't exist.",
        });

    const request = await friendRequests.findOne({
        user: id,
        //@ts-ignore
        receiver: req.user!._id,
    });

    if (!request)
        return res.status(400).json({
            message: "Friend request doesn't exist.",
        });

    await request.delete();

    return res.status(200).json({
        message: "Friend request was ignored.",
    });
});

export default friends;
