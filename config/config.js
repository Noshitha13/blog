require("dotenv").config();
const isDocker = process.env.DB_HOST === "db"; // Check if running inside Docker

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "blogdb",
    host: isDocker ? "db" : "127.0.0.1", // Use "db" inside Docker, "127.0.0.1" locally
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false, // Disable logging
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false, // Disable logging
  },
};
