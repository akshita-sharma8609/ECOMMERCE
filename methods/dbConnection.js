
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

// Create connection to database
module.exports = async function executeStatement(query) {
  return new Promise(async(resolve, reject) => {
    // var Connection = require("tedious").Connection;
    // var config = {
    //   server: 'localhost',
    //   authentication: {
    //     type: "default",
    //     options: {

    //       userName: "akshita",
    //       password: "12345",
    //     },
    //   },
    //   options: {
    //     trustServerCertificate: true,
    //     database: "ECommerce",
    //   },
    // };
    // var connection = new Connection(config);
    // connection.connect();
var {createConnection} = require("./db");
const connection = await createConnection();
 
    connection.on("connect", function (err) {

      if (err) reject(err);
      let request = new Request(query, function (err) {
        if (err) {
          
          console.log(err);
          reject(err);
        }
      });
      var res = [];
      request.on('row', function (columns) {
        var result = {};
        // console.log("COLUMNSSSSSSSSSSSSSSSS", columns)
        columns.forEach(function (column) {
          // console.log("EK COLUMNNNNNNNNN", column)
          if (column.value === null) {
            console.log('NULL');
          } else {
            // console.log(column)
            result[column.metadata.colName] = column.value;
            // res.push(result);
            // result += column.value + " ";
          }
        });
        res.push(result);
        // console.log("jcnsdfkohvjfd", res);
        // result = "";
      });

      // else resolve(result);
      // If no error, then good to proceed.
      // executeStatement()

      // console.log("Connected", err);
      request.on("requestCompleted", function (rowCount, more) {
        connection.close();
        console.log("resultttt", res)
        // if(result==undefined || Object.keys(result).length === 0) reject("User not found");
        // else

        resolve(res);
      });
      connection.execSql(request);
    });
  })

}



