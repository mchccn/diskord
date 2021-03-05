import { Router } from "express";

const user = Router();

user.patch("/appearance", (req, res) => {});

user.patch("/profile/username", (req, res) => {});

user.patch("/profile/avatar", (req, res) => {});

user.patch("/profile/status", (req, res) => {});

user.patch("/servers", (req, res) => {});

user.delete("/delete", (req, res) => {});

export default user;
