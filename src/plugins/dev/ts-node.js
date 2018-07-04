const { TS_CONFIG } = process.env;

const tsnode = require("ts-node").register(TS_CONFIG && {
  project: TS_CONFIG
})