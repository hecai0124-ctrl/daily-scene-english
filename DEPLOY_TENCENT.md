# 腾讯云部署说明

这个项目已经支持静态导出和 PWA。推荐部署方式：

1. 腾讯云 CloudBase 静态网站托管
2. 腾讯云 COS + CDN

## 构建

```bash
npm run build
```

构建产物在：

```text
out/
```

## CloudBase 静态网站托管

安装并登录腾讯云 CloudBase CLI：

```bash
npm install -g @cloudbase/cli
tcb login
```

部署：

```bash
tcb hosting deploy out -e 你的环境ID
```

## COS + CDN

也可以在腾讯云控制台创建 COS 存储桶，开启静态网站能力，然后上传 `out/` 目录里的全部文件。

PWA 需要 HTTPS 域名才能在手机上稳定“添加到主屏幕”，所以建议绑定腾讯云 CDN 或自定义 HTTPS 域名。
