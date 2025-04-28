背景：https://github.com/zjuchalaoshi/chalaoshi/issues/89

本项目由 cursor 生成，未经充分测试。

给定目前的数据，构建结果仅有一个 ~35MiB 的 index.html，包含所有数据。

## 数据格式说明

将来自 https://github.com/zjuchalaoshi/chalaoshi/issues/89 的数据放在 chalaoshi_data 目录下即可用于触发构建。

## 开发说明

### 环境要求

- Node.js 14+
- npm 6+

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

