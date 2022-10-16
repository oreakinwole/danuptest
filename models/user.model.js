const sql = require("./db.js");

// constructor
const User = function (user) {
  this.email = user.email;
  this.password = user.password;
};

User.create = (payload, result) => {
  sql.query(
    "INSERT INTO `users` SET `email` = ?, `password` = ?",
    [payload.email, payload.password],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { user: payload.email });
    }
  );
};

User.findByEmail = (email, result) => {
  sql.query(
    {
      sql: "SELECT * FROM `users` WHERE `email` = ?",
      timeout: 40000, // 40s
      values: [email],
    },
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      // not found User with the id
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = User;
