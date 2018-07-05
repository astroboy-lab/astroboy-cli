const { TS_CONFIG } = process.env;

const tsnode = require("ts-node").register({
  project: TS_CONFIG,
  pretty: true
})