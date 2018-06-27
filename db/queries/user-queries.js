 const { queryDB } = require('../mysql-main');

let addUser = (user, login_type, field) => {
  let createdDate = new Date().toLocaleString();
  return queryDB(`
    INSERT INTO user (email, password, first_name, last_name, login_type, created_date, ${field})
    VALUES ('${user.email}', '${user.password}', '${user.first_name}', '${user.last_name}', '${createdDate}', '${login_type}', 4);
  `)
}

let grantAccess = (field, email) => {
  let modifiedDate = new Date().toLocaleString();
  return queryDB(`
    UPDATE user
    SET ${field} = 4, modified_date = '${modifiedDate}'
    WHERE email = '${email}';
  `)
}

let addUserEP = (user, login_type) => {
  let createdDate = new Date().toLocaleString();
  return queryDB(
    `INSERT INTO user (email, password, first_name, last_name, login_type, ep_access_level, cw_access_level, created_date)
    VALUES ('${user.email}', '${user.password}', '${user.first_name}', '${user.last_name}', '${login_type}', 4, 4, '${createdDate}');
  `)
}

let login = (user) => {
  return queryDB(`
    SELECT *
    FROM user
    WHERE email = '${user.email}';
  `)
}

let logLogin = (email, ip) => {
  let today = new Date();
  let currentTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  let dd = today.getDate();
  let mm = today.getMonth()+1;
  let yyyy = today.getFullYear();
  if(dd<10) {
    dd = '0'+dd
  }
  if(mm<10) {
    mm = '0'+mm
  }
  let currentDate = mm + '/' + dd + '/' + yyyy;

  return queryDB(`
    INSERT INTO login_log (email, time, date, ip_address)
    VALUES ('${email}', '${currentTime}', '${currentDate}', '${ip}');
  `)
}

let checkLoginAmount = (email) => {
  return queryDB(`
    SELECT *
    FROM login_log
    WHERE email='${email}';
  `)
}

let toggleSetting = (email, setting) => {
  let modifiedDate = new Date().toLocaleString();
  return queryDB(`
    UPDATE user
    SET ${setting} = IF(${setting}=1, 0, 1), modified_date = '${modifiedDate}'
    WHERE email = '${email}';
  `)
}

let getUserSettings = (email) => {
  return queryDB(`
    SELECT *
    FROM user
    WHERE email='${email}';
  `)
}

let saveToken = (email, token, type) => {
  let modifiedDate = new Date().toLocaleString();
  return queryDB(`
    UPDATE user
    SET ${type} = '${token}', modified_date = '${modifiedDate}'
    WHERE email = '${email}';
  `)
}

let resetPassword = (token, password) => {
  let modifiedDate = new Date().toLocaleString();
  return queryDB(`
    UPDATE user
    SET password = '${password}', modified_date = '${modifiedDate}'
    WHERE temp_token = '${token}';
  `)
}

module.exports = {
  addUser,
  grantAccess,
  addUserEP,
  logLogin,
  checkLoginAmount,
  toggleSetting,
  getUserSettings,
  saveToken,
  resetPassword,
  login
}
