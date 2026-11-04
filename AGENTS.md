# Portfolio 项目索引

本文件是整个仓库的协作入口。用户当前的明确要求优先于项目约定；
子目录如有更具体的 `AGENTS.md`，在其范围内遵循对应规则。

## 开始任务

1. 查看 `git status --short --branch`，保留已有未提交改动。
2. 阅读 [项目概览](docs/project-overview.md) 和 [开发与协作规则](docs/development.md)。
3. 按下表读取任务对应的文档和相关源码；完成前遵循 [验证规范](docs/validation.md)。

默认使用中文沟通。项目使用 React、TypeScript、Vinext、Vite 与 Tailwind CSS；
版本和脚本以 `package.json`、`package-lock.json` 为准。

## 按任务查阅

| 任务                               | 文档入口                                                               |
| ---------------------------------- | ---------------------------------------------------------------------- |
| 了解路由、目录、数据源和复用边界   | [项目概览](docs/project-overview.md)                                   |
| 开发规则、交互、客户端与服务端边界 | [开发与协作规则](docs/development.md)                                  |
| 视觉、主题、Token 与样式           | [设计系统](docs/design-system.md)                                      |
| 组件复用、工作台、第三方来源       | [组件说明](docs/components.md)、[组件来源](docs/component-sources.md)  |
| 项目 / 写作详情、Journal 内容      | [Showcase 模版](docs/showcase-template.md)、[Journal](docs/journal.md) |
| 命令、检查范围和验证记录           | [验证规范](docs/validation.md)、[QA 索引](docs/qa/README.md)           |
| Git、分支、备份与 Netlify 发布     | [部署说明](docs/deployment.md)                                         |
| 计划、进度与后续事项               | [计划索引](docs/plans/README.md)                                       |

新建交互项目先读 [项目模板](docs/project-template.md)，接入细节见 [原型接入规范](docs/prototypes.md)。

完整文档目录及历史资料状态见 [docs/README.md](docs/README.md)。
具体规则和实现细节维护在对应主题文档；计划和验证记录分别放入 `docs/plans/`
与 `docs/qa/`，不堆入本文件。调整文档结构时同步此索引和文档内的链接。
