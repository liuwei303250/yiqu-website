# CLAUDE.md — 福州易趣网络科技有限公司官网项目

## 项目简介

- 静态官网（纯 HTML/CSS/JS，无构建工具），域名 yiquwl.com
- 已部署：GitHub 仓库 liuwei303250/yiqu-website，GitHub Pages 地址 https://liuwei303250.github.io/yiqu-website/
- 页面：index.html（首页）、services.html（产品与服务）、solutions.html（解决方案）、about.html（关于我们）
- 共享资源：css/style.css、js/main.js、assets/（logo、证书图）

## 铁律：版本化保存（用户明确要求，必须遵守）

**所有修改或输出的新内容必须另存为新版本，禁止直接覆盖已有文件。**

具体执行方式：

1. **修改已有文件时**：先复制原文件为带版本号的副本，在副本上修改，保留原文件不动。
   - 例如修改首页：复制 `index.html` → `index-v2.html`，在 v2 上改
   - 例如修改样式：复制 `css/style.css` → `css/style-v2.css`，HTML 引用也随之更新
   - 版本号递增：v2、v3、v4……（没有 v1 后缀，原文件即 v1）
2. **输出全新内容时**：保存为新文件名，不与已有文件重名（如 `news-2026-09-19.html`）。
3. **Git 提交**：新旧文件都纳入 git 管理（旧版文件保留在仓库历史与工作区中，方便随时回退对比）。
4. 唯一例外：`CLAUDE.md`、`.gitignore` 本身可原位修改；git 提交/推送操作不受限制。

## 部署流程（更新网站）

1. 按上述规则另存新版本文件 → 更新页面间的引用
2. `git add -A && git commit` → `git push`（凭证已配置，账号 liuwei303250）
3. GitHub Pages 约 1 分钟自动构建生效

## 网络注意

本机访问 github.com 依赖 hosts 绑定：`140.82.112.3 github.com`（DNS 默认解析的 IP 被墙）。若 git push 超时，先检查 `C:\Windows\System32\drivers\etc\hosts` 中该条记录是否存在。

## 待补充信息（用户未提供前保持占位）

- ICP 备案号（页脚现为「闽ICP备XXXXXXXX号-1」）
- 公司联系电话
