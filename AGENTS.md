# 仓库指南

## 项目结构与模块组织
`src/` 是后端主代码目录（Express + TypeScript）。接口处理器位于 `src/routes/**`，按业务域拆分（如 `setting`、`video`、`storyboard`）。通用能力放在 `src/utils/**`（含 AI 适配层），数据库初始化与修复在 `src/lib/`（`initDB.ts`、`fixDB.ts`）。

`scripts/` 存放构建与 Electron 运行入口。`scripts/web/` 是前端仓库 `Toonflow-web` 构建后的静态产物。`build/` 为打包输出目录，`docs/` 存放产品和协作文档。

## 构建、测试与开发命令
- `yarn dev`：以后端开发模式运行（`tsx` + `nodemon`），并触发路由映射刷新逻辑。
- `yarn dev:gui`：启动 Electron 壳进行桌面端联调。
- `yarn lint`：执行 TypeScript 类型检查（`tsc --noEmit`）。
- `yarn build`：用 esbuild 打包后端与 Electron 主进程（输出到 `build/`）。
- `yarn test`：运行 `build/app.js` 做生产构建冒烟验证。
- `yarn dist` / `yarn dist:win|mac|linux`：生成各平台安装包。
- `yarn docker:build` / `yarn docker:local`：启动对应 Docker 构建方案。

## 代码风格与命名规范
使用 TypeScript 严格模式（`strict`、`noImplicitAny`）。默认 2 空格缩进，保留分号。优先使用别名导入（如 `@/utils/...`），减少深层相对路径。

路由文件名使用语义化 camelCase（示例：`getOpenRouterModels.ts`），并放在对应业务目录。数据库保持既有命名风格（如 `t_*` 表）；不要做纯格式化噪音改动。

## 测试要求
当前仓库未接入独立单元测试框架（无 `tests/` 或 `*.spec.ts`）。提交 PR 前至少完成：
1. `yarn lint`
2. `yarn build`
3. `yarn test`，并手工验证关键接口（尤其 AI 供应商连通路径，如 `/other/testAI`）。

## Commit 与 PR 规范
沿用现有提交风格：简洁、祈使语，优先使用 Conventional Commit 前缀（`feat:`、`fix:`、`docs:`）。中文提交信息可直接使用。

PR 描述建议包含：
- 改动范围与行为变化。
- 配置或数据库影响（例如 `t_config` 字段变更）。
- 手工验证步骤与结果。
- 仅当更新了 `scripts/web/` 静态资源时提供截图。
