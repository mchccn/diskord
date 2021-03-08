import { Router } from "express";
import { AUTHENTICATE } from "../../constants";
import users from "../../database/models/user";

const user = Router();

user.use(AUTHENTICATE);

user.patch("/appearance", async (req, res) => {
    const { appearance } = req.body;

    if (!appearance)
        res.status(400).json({
            message: "No appearance was provided.",
        });

    const { isLightTheme, fontSize, isCompactMode } = appearance;

    const user = await users.findOne({
        //@ts-ignore
        email: req.user!.email,
    });

    if (user) {
        if (typeof fontSize === "number") {
            if (fontSize < 12 || fontSize > 24)
                return res.status(400).json({
                    message: "Font size must be between 12 and 24 pixels.",
                });

            user.appearance.fontSize = fontSize;
        }

        if (typeof isLightTheme === "boolean") user.appearance.isLightTheme = isLightTheme;
        if (typeof isCompactMode === "boolean") user.appearance.isCompactMode = isCompactMode;

        await user.save();
    }

    return res.status(200).json({
        message: "Appearance was updated.",
    });
});

user.patch("/profile/username", async (req, res) => {
    const { username } = req.body;

    if (!username)
        res.status(400).json({
            message: "No username was provided.",
        });

    if (username > 32)
        res.status(400).json({
            message: "Usernames can't be longer than 32 characters.",
        });

    const user = await users.findOne({
        //@ts-ignore
        email: req.user!.email,
    });

    if (user) {
        user.username = username;

        await user.save();
    }

    return res.status(200).json({
        message: "Username was updated.",
    });
});

user.patch("/profile/avatar", async (req, res) => {
    const { avatar } = req.body;

    if (!avatar)
        res.status(400).json({
            message: "No avatar was provided.",
        });

    if (avatar > 2048)
        res.status(400).json({
            message: "Avatar URLs can't be longer than 2048 characters.",
        });

    const user = await users.findOne({
        //@ts-ignore
        email: req.user!.email,
    });

    if (user) {
        user.avatar = avatar;

        await user.save();
    }

    return res.status(200).json({
        message: "Avatar was updated.",
    });
});

user.patch("/profile/status", async (req, res) => {
    const { status } = req.body;

    if (!status)
        res.status(400).json({
            message: "No status was provided.",
        });

    if (status > 128)
        res.status(400).json({
            message: "Statuses can't be longer than 128 characters.",
        });

    const user = await users.findOne({
        //@ts-ignore
        email: req.user!.email,
    });

    if (user) {
        if (status.length > 128)
            return res.json(400).json({
                message: "Status is over 128 characters.",
            });

        user.status = status;

        await user.save();
    }

    return res.status(200).json({
        message: "Status was updated.",
    });
});

user.patch("/servers", async (req, res) => {
    const { servers } = req.body;

    if (!servers)
        res.status(400).json({
            message: "No servers were provided.",
        });

    const user = await users.findOne({
        //@ts-ignore
        email: req.user!.email,
    });

    if (user) {
        if (user.guilds.length !== servers.length)
            return res.status(400).json({
                message: "Server length does not match.",
            });

        if (user.guilds.sort() !== servers.sort())
            return res.status(400).json({
                message: "Servers do not match.",
            });

        await user.save();
    }

    return res.status(200).json({
        message: "Server order was updated.",
    });
});

user.delete("/delete", async (req, res) => {
    const user = await users.findOne({
        //@ts-ignore
        email: req.user!.email,
    });

    if (user) await user.delete();

    return res.redirect("/");
});

export default user;
