const mysql = require("mysql");

module.exports = async () => {
    let db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "angi-bot"
    })

    return db;
  
}