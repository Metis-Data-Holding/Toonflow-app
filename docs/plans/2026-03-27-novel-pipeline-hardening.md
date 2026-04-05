# Novel Pipeline Hardening & Million-Character Support Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 让“小说原文 → 故事线/大纲 → 剧本/资产”链路稳定支持大体量文本（目标百万字级项目），并且可控、可观测、可恢复。

**Architecture:** 代码负责流程控制与数据一致性，LLM 只负责内容生成。新增统一上下文预算层，修复数据一致性缺陷，并增加后端硬限制与任务状态。前端只负责配置输入与状态展示，不承担关键约束。

**Tech Stack:** Node.js + Express + TypeScript + SQLite(Knex) + AI SDK + (Toonflow-web 前端仓库)

---

### Task 1: 修复高风险正确性问题（后端）

**Files:**
- Modify: `src/routes/assets/polishAssetsPrompt.ts`
- Modify: `src/utils/deleteOutline.ts`
- Modify: `src/agents/outlineScript/index.ts`

**Steps:**
1. 给 `polishAssetsPrompt` 的三处 `t_novel.whereIn(...)` 增加 `projectId` 过滤。
2. 修复 `deleteOutline`：无论是否存在“独占资产”都必须删除目标大纲与关联剧本；资产删除作为条件分支。
3. 将 `saveOutlineData` 改为事务，保证“清理旧数据 + 写入新大纲 + 建剧本”原子性。
4. 验证：`yarn lint && yarn build`，并手工走一遍大纲新增/删除流程。

### Task 2: 建立原文数据约束与后端硬限制

**Files:**
- Modify: `src/lib/fixDB.ts`
- Modify: `src/routes/novel/addNovel.ts`
- Modify: `src/lib/initDB.ts`（新安装默认值）

**Steps:**
1. 增加项目内章节唯一约束（`projectId + chapterIndex`）。
2. 在 `/novel/addNovel` 增加总字数硬校验（可配置，默认 200000）。
3. 返回标准化错误码/错误信息，前端可直接展示。
4. 验证：重复章节导入应 4xx；超限导入应 4xx。

### Task 3: 上下文预算层（百万字支持核心）

**Files:**
- Create: `src/utils/novelContext.ts`
- Modify: `src/agents/outlineScript/index.ts`
- Modify: `src/routes/script/generateScriptApi.ts`
- Modify: `src/routes/assets/polishAssetsPrompt.ts`

**Steps:**
1. 新增统一上下文构建器（按章节范围、字符预算、优先级裁剪）。
2. `getChapter`/剧本生成/资产润色统一走上下文构建器，禁止直接拼接全量文本。
3. 为每次 AI 请求记录“输入字符数/估算 token”。
4. 验证：大章节输入时仍可生成，且无超长上下文报错。

### Task 4: 会话与历史瘦身

**Files:**
- Modify: `src/routes/outline/agentsOutline.ts`
- Modify: `src/lib/initDB.ts` / `src/lib/fixDB.ts`（如需新增字段）

**Steps:**
1. `t_chatHistory.novel` 从“全量原文快照”改为“引用信息 + 摘要”。
2. 历史保存改为增量策略，限制单会话历史长度。
3. 验证：连续多轮对话后 DB 增长可控，功能不回退。

### Task 5: 可观测性与失败恢复

**Files:**
- Create: `src/lib/aiRunLog.ts`（或等价模块）
- Modify: `src/utils/ai/text/index.ts`
- Modify: `src/routes/outline/agentsOutline.ts`

**Steps:**
1. 记录每次 AI 调用：模型、输入长度、耗时、是否重试、失败原因。
2. 增加超时与有限重试策略（幂等键防止重复执行）。
3. 验证：模拟超时/失败时，有明确日志且能恢复重试。

### Task 6: 前端配合（Toonflow-web 仓库）

**Files（前端仓库，需定位实际路径）:**
- Modify: 小说上传步骤页（当前含“已勾选...小于200000字”逻辑）
- Modify: 设置页（新增上限与上下文策略展示）
- Modify: 错误提示组件（展示后端硬校验错误）

**Steps:**
1. 将 200000 改为后端配置值展示，不再作为唯一约束。
2. 展示“超限/预算裁剪/重试中”状态与提示。
3. 验证：前后端限制一致，错误文案一致。

### Task 7: 回归测试与交付

**Files:**
- Modify: `docs/Fullstack-Collaboration-Notes.md`
- Create: `docs/plans/verification-novel-pipeline.md`

**Steps:**
1. 执行回归清单：上传、选章、故事线、大纲、剧本、资产润色。
2. 输出“旧行为 vs 新行为”对照与风险说明。
3. 按模块提交（小步提交，便于回滚）。

---

## 预计工期（Codex 全自动编码）

- 后端稳定性版本（Task 1-5）：**6-9 天**
- 前后端最小协同版本（Task 1-7）：**10-14 天**
- 完整工程化（含更多可视化与更细颗粒回归）：**14-21 天**

