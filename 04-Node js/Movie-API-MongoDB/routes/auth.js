const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth=require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
    res.json({
        msg: "Auth Route Working"
    });
});

router.post("/register", async (req, res, next) => {
    try {

        const {
            username,
            email,
            password
        } = req.body;

        const existingUser = await User.findOne({
            $or: [{
                    email: email
                },
                {
                    username: username
                }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                msg: "Username or Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            msg: "User Registered Successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const {
            username,
            password,
            email
        } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(404).json({
                msg: "Invalid Credentials"
            });
        }
        const compared = await bcrypt.compare(password, user.password);

        if (compared === false) {
            return res.status(404).json({
                msg: "Invalid Password"
            });
        }

        const token = jwt.sign({
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET, {
                expiresIn: "1h"
            }
        );

        res.status(200).json({msg:"Login Success",token});

    } catch (err) {
        next(err);
    }
}); 

router.get("/profile",auth,(req,res)=>{

    res.json({
        msg:"Protected Route",
        user:req.user
    });
});

module.exports = router;