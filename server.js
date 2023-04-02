const express = require("express");
const path = require("path");
const fs = require("fs");
const passport = require("passport");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

require("dotenv");

const initializePassport = require("./passport-config");
const appRouting = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3200;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/kid-shield";
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/";
const pathToKey = path.join(__dirname, "./cryptography/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");


mongoose.connect(
  MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      err
        ? console.log(`There was an error: ${err.message}`)
        : console.log("Connected successfully to database!!");
    }
  );

// initialize DB
// mongoose.connect(
//   MONGODB_URI,
//   {
//     // useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true,
//   }).then(() => console.log("Mongo DB Connected")).catch((err) => console.log(err));

const db = mongoose.connection;

db.on('connected', () => {
  console.log("MongoDb Connected");
});

db.on('error', (error) => {
  console.log(error);
});

db.on('disconnected', () => {
  console.log("Mongoose disconnected")
});

// app config
app.use(
  session({
    secret: PUB_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(express.json());
app.use(cors());
app.use(appRouting);

// initialze passport
app.use(passport.initialize());
initializePassport(passport);
app.use(passport.session());

// declaring static files
app.use(express.static(path.join(__dirname, "./frontend")));

app.listen(PORT, () => console.log("App listening on  port: ", PORT));
