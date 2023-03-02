

// Create connection to database
async function createConnection() {
    var Connection = require("tedious").Connection;
    var config = {
      server: 'localhost',
      authentication: {
        type: "default",
        options: {

          userName: "akshita",
          password: "12345",
        },
      },
      options: {
        trustServerCertificate: true,
        database: "ECommerce",
      },
    };
    var connection = new Connection(config);
    await connection.connect();
    return connection;
  }
 module.exports = { createConnection };