const sql = require("../models/db");

module.exports = function () {
  sql.query(
    `CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`,
    (err, data) => {
      if (data) console.log("Successfully created users table");
    }
  );
};
