const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const db = mongoose.connect("mongodb://127.0.0.1:27017/DB1", (err) => {
    if (err) {
        console.log("Database not Connected..");
    }
    else {
        console.log("Database Connected..");
    }
});

module.exports = { db };


