const development = require("./development");
const production = require("./production");

let envs = {
    development,
    production,
};
console.log(process.env.NODE_ENV);
module.exports = envs[process.env.APP_ENV || "development"];
