// Import MySQL connection.
const connection = require("../config/connection.js");

// Helper function for SQL syntax.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  let arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (let key in ob) {
    let value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (JD House => 'JD House')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'JD House'} => ["name='JD House'"]
      // e.g. {devoured: true} => ["devoured=true"]
      arr.push(key + " = " + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
let orm = {
    selectAll: function(tableInput, cb) {
      let query = "SELECT * FROM " + tableInput + ";";
        connection.query(query, function(err, res) {
          if (err) {
            throw err;
          } cb(res);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        let query = "INSERT INTO " + table;

            query += " (";
            query += cols.toString();
            query += " )";
            query += "VALUES (";
            query += printQuestionMarks(vals.length);
            query += " ) ";

            console.log(query);

            connection.query(query, vals, function(err, res) {
              if (err) {
                throw err;
              } cb(res);
            });
    },
    updateOne: function(table, objColVals, condition, cb) {
        let query = "UPDATE " + table;
    
            query += " SET ";
            query += objToSql(objColVals);
            query += " WHERE ";
            query += condition;
    
              console.log(query);

        connection.query(query, function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });
      },
}
// Export the orm object for the model (burger.js).
module.exports = orm;