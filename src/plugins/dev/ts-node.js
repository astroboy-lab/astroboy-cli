const { TS_NODE_PROJECT } = process.env;

const tsnode = require("ts-node").register({
  project: TS_NODE_PROJECT,
  pretty: true
})