import { readFileSync } from "fs";

const configData = readFileSync("config.json");
const config = JSON.parse(configData);

export default config;
