var environment = process.env.NODE_ENV || 'development';
var connectionSettings = require('../mysql-main-config.js')[environment];
var mysql = require('promise-mysql');
var pool = mysql.createPool(connectionSettings);
var Promise = require("bluebird");

function getSqlConnection() {
  return pool.getConnection().disposer(function(connection) {
    pool.releaseConnection(connection);
  });
}

module.exports = {
  queryDB: (query, attempts=0) => {
    return Promise.using(getSqlConnection(), function(connection) {
      return connection.query(query)
      .then(rows => rows)
      .catch(error => {
        console.error(err);
        if (!err.fatal) return;
        if (err.code !== 'PROTOCOL_CONNECTION_LOST') throw err;
        if (attempts < 5) queryDB(query, ++attempts);
      })
    })
  }
}
