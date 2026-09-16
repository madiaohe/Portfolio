# GitHub 与 Netlify 部署

生产代码分支为 `codex/emil-minimal`。保留这条分支的完整提交历史；其他本地分支无需删除或推送。

## 只推送当前分支

确认当前位于 `codex/emil-minimal`，提交需要发布的改动，然后执行：

```sh
git push -u origin HEAD:refs/heads/codex/emil-minimal
```

该命令只更新 GitHub 上的 `codex/emil-minimal`。不要使用 `git push --all` 或 `git push --mirror`。当前分支的祖先提交会随之上传，但不会创建其他本地分支对应的远程分支。

## 本地历史备份

在仓库外保存可恢复的 Git 备份：

```sh
git bundle create ../portfolio-history.bundle --all
git bundle verify ../portfolio-history.bundle
```

`git bundle` 包含已提交的历史和分支，不包含未提交文件。未提交改动需要单独保存或先提交。

恢复到另一个目录：

```sh
git clone ../portfolio-history.bundle ../portfolio-restored
git -C ../portfolio-restored branch -a
```

克隆后的其他分支可从 `origin/<分支名>` 恢复为本地分支。

## Netlify

本项目使用 Vinext、React 和 Vite，有服务端路由及 `/api/notion-mention-link`，通过 Nitro 的 Netlify 适配器部署。

- GitHub 仓库：`madiaohe/Portfolio`
- Production branch：`codex/emil-minimal`
- Build command：`npm run build:netlify`
- Publish directory：`dist`
- Node.js：22
- Branch deploys：关闭；只发布生产分支。

构建配置保存在根目录的 `netlify.toml`。本地预先验证：

```sh
npm ci
npm run build:netlify
```

常规开发继续使用 `npm run dev`；普通 Node 服务构建继续使用 `npm run build` 和 `npm start`。

连接 GitHub 后，推送到生产分支即可触发 Netlify 自动构建和发布。旧的 GitHub `main` 分支不会因为推送当前分支而改变。

参考：[Vinext 多平台部署](https://github.com/cloudflare/vinext#other-platforms-via-nitro)、[Nitro Netlify 适配器](https://nitro.build/deploy/providers/netlify)、[Netlify 生产部署](https://docs.netlify.com/deploy/deploy-types/production-deploy/)。
