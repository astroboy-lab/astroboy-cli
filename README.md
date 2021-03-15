# astroboy-cli

## 一、安装

```
npm install -g astroboy-cli
```

## 二、命令介绍

### 1、dev

```
Usage: dev [options]

本地开发，开启后端服务

Options:
  --debug [debugName]  开启 debug 模式
  --env [NODE_ENV]     设置 NODE_ENV 环境变量，默认 development
  --port [NODE_PORT]   设置 NODE_PORT 环境变量，默认 8201
  --mock [proxyUrl]    开启 mock 模式，默认 proxy 地址为 http://127.0.0.1:8001
  --ts [open]          开启 ts-node 模式
  --tsconfig [config]  使用自定义的ts编译配置文件
  --inspect [inspect]  启用inspector，开启编辑器断点调试
  --watch [watchDirs]  指定额外的监听目录
  --ignore [ignoreDirs]  指定忽略的目录
  -h, --help           output usage information

  Examples:

    $ ast dev
    $ ast dev --debug
    $ ast dev --debug koa:application
    $ ast dev --debug --mock
    $ ast dev --mock http://127.0.0.1:8001
    $ ast dev --mock
    $ ast dev --env pre
    $ ast dev --port 8201
    $ ast dev --env qa --port 8201
    $ ast dev --ts
    $ ast dev --ts --tsconfig app/tsconfig.json
    $ ast dev --ts --inspect
    $ ast dev --watch definitions
    $ ast dev --ignore definitions
```
