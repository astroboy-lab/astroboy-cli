const { readFileSync } = require('fs');
const { resolve } = require('path');
const { TS_NODE_PROJECT } = process.env;

const regOptions = {
  project: TS_NODE_PROJECT,
  pretty: true,
  transpileOnly: true
};
try {
  const tsConfigPath = resolve(process.cwd(), TS_NODE_PROJECT);
  const fileData = readFileSync(tsConfigPath);
  const tsconfig = JSON.parse(fileData);
  const tsconfigOptions = Object.assign({}, tsconfig['ts-node']);
  Object.assign(regOptions, tsconfigOptions);
} catch (error) {
}

const tsnode = require("ts-node").register(regOptions)
