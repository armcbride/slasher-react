const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

  mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/slasher_db",
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      autoIndex: false,
    },
    () => {
      console.log("Mongoose is Connected!!");
    }
  );

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });
  
  app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port http://localhost:${PORT} !`);
  });
  