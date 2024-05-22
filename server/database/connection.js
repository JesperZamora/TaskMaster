import mysql from "mysql2/promise";

const connection = await mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  timezone: process.env.MYSQL_TIMEZONE,
});

export default connection;
