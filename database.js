const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("data/db.json");

const defaultData = {
    users: [],
    wallets: [],
    transactions: [],
    leaderboard: [],
    settings: {
        appName: "CryptoVest Pro",
        version: "2.0.0"
    }
};

const db = new Low(adapter, defaultData);

async function initDB() {
    await db.read();

    if (!db.data) {
        db.data = defaultData;
        await db.write();
    }
}

module.exports = {
    db,
    initDB
};
