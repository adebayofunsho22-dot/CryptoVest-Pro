const { db, initDB } = require("./database");

(async () => {

    await initDB();

    console.log("================================");
    console.log(" CryptoVest Pro Database");
    console.log("================================");

    console.log(db.data);

})();
