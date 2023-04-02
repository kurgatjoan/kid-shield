const fs = require("fs");
const path = require("path");
const JwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const { getUserByDBId } = require("./utility");
// const User = require("./models/userModel");
require("dotenv").config();

const pathToKey = path.join(__dirname, "./cryptography/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");
const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const initializePassport = (passport) => {
  const authenticateUser = async (payload, done) => {
    const user = await getUserByDBId(payload.sub);
    try {
      user ? done(null, user) : done(null, false);
    } catch (error) {
      return done(error, false);
    }
  };

  passport.use(new JwtStrategy(options, authenticateUser));

  // strategy config
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    return done(null, getUserByDBId(id));
  });
};

module.exports = initializePassport;
