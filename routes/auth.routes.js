const express = require("express");
const { register, login } = require("../auth");
const { db, initDB } = require("../database");

const router = express.Router();

/*
====================================
Register
POST /api/auth/register
====================================
*/

router.post("/register", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });

        }

        const result = await register(
            username,
            email,
            password
        );

        res.json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Registration failed."
        });

    }

});

/*
====================================
Login
POST /api/auth/login
====================================
*/

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });

        }

        const result = await login(email, password);

        if (!result.success) {

            return res.json(result);

        }

        req.session.userId = result.user.id;

        res.json({

            success: true,

            username: result.user.username,

            email: result.user.email

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Login failed."

        });

    }

});

/*
====================================
Current User
GET /api/auth/me
====================================
*/

router.get("/me", async (req, res) => {

    await initDB();

    if (!req.session.userId) {

        return res.status(401).json({

            success: false,

            message: "Not logged in."

        });

    }

    const user = db.data.users.find(
        u => u.id === req.session.userId
    );

    const wallet = db.data.wallets.find(
        w => w.userId === req.session.userId
    );

    res.json({

        success: true,

        user: {

            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin

        },

        wallet

    });

});

/*
====================================
Logout
POST /api/auth/logout
====================================
*/

router.post("/logout", (req, res) => {

    req.session.destroy(() => {

        res.json({

            success: true,

            message: "Logged out."

        });

    });

});

module.exports = router;
