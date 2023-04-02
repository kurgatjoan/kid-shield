const express = require("express");
const passport = require("passport");

const uniqueSet = (_array) => {
  const uniqueIds = [];

  const unique = _array.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);

      return true;
    }

    return false;
  });

  return unique;
};

const userRoutes = (User) => {
  const userRouter = express.Router();

  userRouter
    .route("/block")
    .get(passport.authenticate("jwt", { session: false }), (req, res) => {
      res.status(201).json({ restricted: req.user.restricted });

      console.log("user: ", req.user);
    })
    .patch(passport.authenticate("jwt", { session: false }), (req, res) => {
      if (
        req.body &&
        req.user.restricted.includes((_val) => _val.url === req.body.url)
      ) {
        return res.status(400).json({ errorMessage: "Site already blocked." });
      }

      // console.log(uniqueSet([[...req.user.restricted, req.body]]));
      User.findOne({ where: { id: req.user.id } }).then((_user) => {
        if (_user) {
          _user
            .update({
              restricted: [...req.user.restricted, req.body],
            })
            .then((_res) => {
              console.log("updated: ", _res);
              res.status(201).json({
                message: "Blocked sites successfully updated.",
                new: _res.restricted,
              });
            })
            .catch((_err) => handleServerErrors(res, _err));
        }
      });
    })
    .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
      if (!req.body) {
        return res.status(400).json({ errorMessage: "Payload is incorect." });
      }
      console.log(req.body);
      const _newList = req.user.restricted.filter(
        (_val) => _val.url !== req.body.url
      );

      console.log(_newList);
      User.findOne({ where: { id: req.user.id } }).then((_user) => {
        if (_user) {
          _user
            .update({
              restricted: _newList,
            })
            .then((_res) => {
              console.log("updated: ", _res);
              res.status(201).json({
                message:
                  req.body.remove +
                  " removed from blocked sites successfully updated.",
                new: _res.restricted,
              });
            })
            .catch((_err) => handleServerErrors(res, _err));
        }
      });
    });
  return userRouter;
};

module.exports = userRoutes;
