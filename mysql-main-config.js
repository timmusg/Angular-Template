module.exports = {
  development: {
    host     : process.env.C2F_DEV_HOST,
    user     : process.env.C2F_DEV_USER,
    password : process.env.C2F_DEV_PASS,
    database : process.env.C2F_DEV_CACHE_DATABASE,
    port     : process.env.C2F_DEV_PORT,
    connectTimeout: 30000,
    connectionLimit: 5
  },
  production: {
    host     : process.env.C2F_PROD_HOST,
    user     : process.env.C2F_PROD_USER,
    password : process.env.C2F_PROD_PASS,
    database : process.env.C2F_PROD_CACHE_DATABASE,
    port     : process.env.C2F_PROD_PORT,
    connectTimeout: 30000,
    connectionLimit: 5
  }
};
