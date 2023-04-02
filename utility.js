const db = require("./models");
const User = require("./models/userModel")(db.sequelize, db.Sequelize);

class CustomError extends Error {
  // generate customized error messages and codes
  constructor(message, name, ...params) {
    super(...params);
    this.name = name;
    this.message = message;
  }
}

const getUserByEmail = async (email) => {
  // check across the three account collections to find user with given email
  const handleError = (err) => (err ? err : null);
  return await User.findOne({ where: { email } })
    .then((user) => {
      if (user && email !== undefined) {
        return user;
      }
    })
    .catch((err) => handleError(err));
};

const getUserByDBId = async (id) => {
  // check across the three account collections to find user with given id
  const handleError = (err) => (err ? err : null);
  return await User.findOne({ where: { id } })
    .then((user) => {
      if (user && id !== undefined) {
        return user;
      }
    })
    .catch((err) => handleError(err));
};

const handleServerErrors = (res, _err) => {
  // an error handler for internal server errors and databse errors
  console.log(_err);
  res.status(500).json({ errorMessage: "Sorry! An error occured." });
};

const updateProfileResponse = (_user) => {
  //   if (process.env.NODE_ENV === "development") {
  console.log(_user);
  let _new = _user;
  // _new.avatar = _host + _new.avatar;

  delete _new.password;
  delete _new.__v;
  return _new;
  //   }
  //   return _user;
};

const handleResponseErrors = (_error) => {
  switch (_error) {
    case "invalidPassword":
      throw new CustomError(
        "Credentials provided are incorect",
        "invalidCredentials"
      );
    case "invalidEmail":
      throw new CustomError(
        "Credentials provided are incorect",
        "invalidCredentials"
      );
    case "userExists":
      throw new CustomError("User with email already exists", "userExists");
    case "authError":
      throw new CustomError(
        "An error occured during authentication. Please try again",
        "authError"
      );
    default:
      throw new CustomError(
        "Sorry, an error occured. Please try again.",
        "genericError"
      );
  }
};
module.exports = {
  handleResponseErrors,
  handleServerErrors,
  CustomError,
  getUserByDBId,
  getUserByEmail,
  updateProfileResponse,
};
