const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const { db, initDB } = require("./database");

/**
 * Register a new user
 */
async function register(username, email, password) {

    await initDB();

    email = email.trim().toLowerCase();
    username = username.trim();

    const existingUser = db.data.users.find(
        user =>
            user.email === email ||
            user.username.toLowerCase() === username.toLowerCase()
    );

    if (existingUser) {
        return {
            success: false,
            message: "Username or email already exists."
        };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userId = nanoid();

    const wallet = {
        userId,
        cash: 10000,
        bitcoin: 0,
        ethereum: 0,
        solana: 0,
        binancecoin: 0,
        portfolioValue: 10000
    };

    const user = {
        id: userId,
        username,
        email,
        password: passwordHash,
        createdAt: new Date().toISOString(),
        lastLogin: null
    };

    db.data.users.push(user);
    db.data.wallets.push(wallet);

    await db.write();

    return {
        success: true,
        message: "Account created successfully."
    };
}

/**
 * Login
 */
async function login(email, password) {

    await initDB();

    email = email.trim().toLowerCase();

    const user = db.data.users.find(
        u => u.email === email
    );

    if (!user) {
        return {
            success: false,
            message: "Invalid email or password."
        };
    }

    const validPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!validPassword) {
        return {
            success: false,
            message: "Invalid email or password."
        };
    }

    user.lastLogin = new Date().toISOString();

    await db.write();

    return {
        success: true,
        user
    };
}

module.exports = {
    register,
    login
};
