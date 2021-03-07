import { Router } from "express";
import { ObjectId } from "mongodb";
import { AUTHENTICATE } from "../../constants";
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

users.post("/:user", async (req, res) => {});

users.delete("/:user/delete", async (req, res) => {});

users.put("/:user/pin", async (req, res) => {});

users.patch("/:user/edit", async (req, res) => {});

export default users;
