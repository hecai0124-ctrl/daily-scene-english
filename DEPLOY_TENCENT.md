# 腾讯云公网部署 + 同步码数据同步

这个项目已经支持静态导出、PWA，以及“同步码数据同步”。

推荐低成本方案：

1. 腾讯云 CloudBase 静态网站托管：部署网页，让手机和电脑都能访问。
2. 腾讯云 CloudBase 云函数 + 数据库：保存同步码对应的学习数据。

## 1. 构建网页

```bash
npm run build
```

构建产物在：

```text
out/
```

## 2. 部署静态网站

安装并登录腾讯云 CloudBase CLI：

```bash
npm install -g @cloudbase/cli
tcb login
```

创建或选择一个 CloudBase 环境后，部署静态网站：

```bash
tcb hosting deploy out -e 你的环境ID
```

部署成功后，腾讯云会给你一个 HTTPS 公网地址。手机和电脑都可以打开这个地址。

## 3. 部署同步云函数

本项目已提供云函数模板：

```text
cloudbase/functions/sync-data/
```

在 CloudBase 控制台里：

1. 进入对应环境
2. 创建数据库集合：`learning_sync`
3. 创建云函数：`sync-data`
4. 上传 `cloudbase/functions/sync-data` 目录
5. 给云函数开启 HTTP 访问
6. 复制 HTTP 触发 URL

也可以使用 CloudBase CLI 部署函数，具体命令按你的环境配置执行。

## 4. 配置网页调用同步接口

把云函数 HTTP URL 配到构建环境变量：

```bash
NEXT_PUBLIC_SYNC_API_URL=https://你的云函数HTTP地址 npm run build
```

然后重新部署 `out/`：

```bash
tcb hosting deploy out -e 你的环境ID
```

## 5. 使用方式

1. 打开网页，进入“复盘”
2. 在“手机电脑同步”里生成同步码
3. 点“上传”，把本机学习数据保存到腾讯云
4. 手机打开同一个公网网址
5. 输入同一个同步码，点“拉取”
6. 之后两端学习后都可以上传/拉取同步

同步内容包括：

- 打卡
- 收藏单词
- 收藏句子
- 收藏阅读
- 错题
- 测验成绩
- 本周复盘统计所需数据

## 备选：COS + CDN

也可以在腾讯云控制台创建 COS 存储桶，开启静态网站能力，然后上传 `out/` 目录里的全部文件。

PWA 需要 HTTPS 域名才能在手机上稳定“添加到主屏幕”，所以建议绑定腾讯云 CDN 或自定义 HTTPS 域名。
