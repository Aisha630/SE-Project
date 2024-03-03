import { readFileSync } from "fs";

// Loads and exports configuration as JS object
const configData = readFileSync("config.json");
const config = JSON.parse(configData);

export default config;
