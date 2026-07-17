require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

const { initDB } = require("./database");
const authRoutes = require("./routes/auth.routes");

const app = express();

const PORT = process.env.PORT || 3000;

/* ===================================
   Initialize Database
=================================== */

(async () => {
    try {
        await initDB();
        console.log("✅ Database initialized");
    } catch (err) {
        console.error("❌ Database initialization failed:", err);
    }
})();

/* ===================================
   Middleware
=================================== */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    secret: "cryptovest-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

/* ===================================
   Static Files
=================================== */

app.use(express.static(path.join(__dirname, "public")));

/* ===================================
   Debug Middleware
=================================== */

app.use("/api/auth", (req, res, next) => {
    console.log(`🔥 ${req.method} ${req.originalUrl}`);
    next();
});

/* ===================================
   Authentication Routes
=================================== */

app.use("/api/auth", authRoutes);

/* ===================================
   Health Check
=================================== */

app.get("/api", (req, res) => {
    res.json({
        success: true,
        app: "CryptoVest Pro",
        version: "2.0.0",
        status: "Running"
    });
});

/* ===================================
   Home Page
=================================== */

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ===================================
   404 Handler
=================================== */

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

/* ===================================
   Error Handler
=================================== */

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

/* ===================================
   Start Server
=================================== */

app.listen(PORT, () => {

    console.clear();

    console.log("======================================");
    console.log("💎 CryptoVest Pro");
    console.log("======================================");
    console.log(`🚀 Server Running on http://localhost:${PORT}`);
    console.log("======================================");

});
