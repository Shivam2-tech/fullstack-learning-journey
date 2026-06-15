const express = require("express");
const router = express.Router();
const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const {
        username,
        password,
        email
    } = req.body || {};

    if (
        !username ||
        !password ||
        !email ||
        typeof username !== "string" ||
        typeof password !== "string" ||
        typeof email !== "string"
    ) {
        return res.status(400).json({
            error: "username, password, and email are required and must be strings"
        });
    }

    try {
        const hashed = await bcrypt.hash(password, 10);
        const existingUser = await user.findOne({
            $or: [{
                    email
                },
                {
                    username
                }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        const newUser = await user.create({
            username: username,
            password: hashed,
            email: email
        });

        res.status(200).json({
            msg: "Registered !"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Server error during registration"
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const userfind = await user.findOne({
            email
        });

        if (!userfind) {
            return res.status(404).json({
                msg: "User NOt Found"
            });
        }


        const compare = await bcrypt.compare(password, userfind.password);

        if (!compare) {
            return res.status(400).json({
                msg: "Invalid Credentials"
            });
        }

        const token = jwt.sign({
            id: userfind._id,
            email: userfind.email
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(200).json({
            token: token,
            msg: "Login Success"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Server Error"
        });
    }
});

module.exports = router;