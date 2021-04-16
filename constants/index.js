const development = require("./development");
const production = require("./production");

let envs = {
    development,
    production,
};
module.exports = envs[process.env.APP_ENV || "development"];
