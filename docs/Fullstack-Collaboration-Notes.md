  > 用途：  
> 这是一份前后端共享的变更协作文档。  
> 每次涉及前后端联动的需求，都新增一个 Change 条目。  
> 每次由发起仓库负责创建 Change 条目，填写相关内容
> Toonflow-app 仓库负责填写后端相关的内容，Toonflow-web 仓库负责填写前端相关的内容
---
## 状态说明  
- `DRAFT`：需求刚建立，尚未开始开发  
- `BACKEND_DONE`：后端已完成，等待前端同步  
- `READY_FOR_JOINT_TEST`：前后端都已完成，待联调  
- `DONE`：联调通过，需求完成  
- `BLOCKED`：被阻塞，需要记录原因  
- `CANCELLED`：需求取消
---
## 模版
> 复制下面的模版内容，新增到文档末尾即可
---
## Change-XXX 
- 标题： `大模型支持接入 openrouter`
- 日期：`2026-03-25 11:04`
- 发起仓库：`填写 Toonflow-app` 或 `Toonflow-web` 
- 需求背景：  
- 状态：`DRAFT`    
- 是否影响前后端联动：`是` / `否`  
- 关联 issue / PR / commit：  
- 备注：
### 后端改动
- 改动内容：  
- 受影响接口：  
	- 1. `METHOD /api/...`  
		- 请求变化：  
		- 响应变化：  
		- 错误处理变化：  
		- 是否兼容旧前端：`是` / `否`  
		- 前端必须同步的点：  
		- 后端验证方式：  
		- 后端涉及文件：    
### 前端改动
- 受影响页面/组件：  
- 受影响 API / 类型：  
- 修改方案：  
- 是否有阻塞：  
- 实际修改内容：  
- 前端涉及文件：  
- 验证方式：  
### 联调结果  
- 联调结论：  
- 遗留问题： 
---

## Change-001
- 标题：`OpenRouter 文本模型接入与动态模型拉取`
- 日期：`2026-03-25`
- 发起仓库：`Toonflow-app`
- 需求背景：当前大模型配置中缺少 OpenRouter 支持，导致 `testAI` 连通测试无法通过；同时前端缺少可直接拉取 OpenRouter 模型列表的后端接口。
- 状态：`DONE`
- 是否影响前后端联动：`是`
- 关联 issue / PR / commit：`commit 3215454 (feat: 增加 OpenRouter 文本模型接入与模型拉取接口)`
- 备注：前后端已完成各自改动，待联合联调验证。

### 后端改动
- 改动内容：
  - 新增 OpenRouter 模型拉取接口，后端调用 OpenRouter 官方 `/models` 并返回前端可直接使用的 `{label,value}` 列表。
  - 文本模型调用链增加 `openrouter` provider 支持。
  - `addModel/updateModel/testAI` 增加 `manufacturer` 归一化：`openRouter`/`OpenRouter`/`openrouter` 统一存取为 `openrouter`。
  - 初始化与迁移逻辑补齐 `t_textModel` 的 `openrouter` 基础模型记录（`openrouter/auto`）。
- 受影响接口：
	- 1. `POST /api/setting/getOpenRouterModels`（后端实际路由：`/setting/getOpenRouterModels`）
		- 请求变化：新增接口；请求体 `{ apiKey: string, baseURL?: string }`
		- 响应变化：成功返回 `{ openrouter: Array<{ label: string; value: string }> }`
		- 错误处理变化：鉴权失败/无模型返回 400；其他异常 500
		- 是否兼容旧前端：`是`（新增接口，不影响旧流程）
		- 前端必须同步的点：OpenRouter 模型下拉应改为调用该接口动态拉取
		- 后端验证方式：有效请求返回模型列表；无效 key 会返回错误信息
		- 后端涉及文件：
      - `src/routes/setting/getOpenRouterModels.ts`
      - `src/router.ts`
	- 2. `POST /api/setting/addModel`（后端实际路由：`/setting/addModel`）
		- 请求变化：`manufacturer` 入参支持别名并归一化为 `openrouter`
		- 响应变化：无
		- 错误处理变化：无
		- 是否兼容旧前端：`是`
		- 前端必须同步的点：建议固定传 `openrouter`
		- 后端验证方式：新增配置后检查 `t_config.manufacturer` 值
		- 后端涉及文件：
      - `src/routes/setting/addModel.ts`
	- 3. `POST /api/setting/updateModel`（后端实际路由：`/setting/updateModel`）
		- 请求变化：`manufacturer` 入参支持别名并归一化为 `openrouter`
		- 响应变化：无
		- 错误处理变化：无
		- 是否兼容旧前端：`是`
		- 前端必须同步的点：建议固定传 `openrouter`
		- 后端验证方式：更新配置后检查 `t_config.manufacturer` 值
		- 后端涉及文件：
      - `src/routes/setting/updateModel.ts`
	- 4. `POST /api/other/testAI`（后端实际路由：`/other/testAI`）
		- 请求变化：`manufacturer` 入参支持别名并归一化为 `openrouter`
		- 响应变化：无
		- 错误处理变化：维持现有错误包装逻辑（业务失败仍返回错误消息）
		- 是否兼容旧前端：`是`
		- 前端必须同步的点：测试连通时 `manufacturer` 统一传 `openrouter`
		- 后端验证方式：已验证可正确命中 OpenRouter `/chat/completions`
		- 后端涉及文件：
      - `src/routes/other/testAI.ts`

### 前端改动
- 受影响页面/组件：模型配置页（文本模型配置区域）
- 受影响 API / 类型：
  - 新增调用：`POST /api/setting/getOpenRouterModels`
  - 配置提交：`POST /api/setting/addModel`、`POST /api/setting/updateModel`
  - 连通测试：`POST /api/other/testAI`
  - 返回类型：`{ openrouter: Array<{ label: string; value: string }> }`
- 修改方案：
  - 当厂商选择 OpenRouter 时，Base URL 自动回填为 `https://openrouter.ai/api/v1`，并只读展示（不可编辑）。
  - API Key 输入框失焦自动拉取模型列表，并提供“刷新模型”按钮。
  - 模型输入改为“可搜索下拉 + 可手输”。
  - 保存与测试时固定发送 `manufacturer: "openrouter"`。
- 是否有阻塞：`否`
- 实际修改内容：
  - 增加 OpenRouter 厂商映射、默认 BaseURL 与 API Key 跳转链接。
  - 新增 `getOpenRouterModels` 调用并接入自动/手动拉取模型逻辑。
  - 统一 add/update/testAI 请求中的 OpenRouter 参数（`manufacturer`/`baseUrl`）。
- 前端涉及文件：
  - `Toonflow-web/src/views/setting/model/addModelDialog.vue`
  - `Toonflow-web/src/views/setting/model/modeListDialog.vue`
  - `Toonflow-web/src/views/setting/model/modelData.vue`
- 验证方式：配置 OpenRouter -> 拉取模型 -> 保存 -> testAI 连通测试 + `npm run type-check`

### 联调结果
- 联调结论：联调通过（配置 OpenRouter -> 拉取模型 -> 保存 -> testAI 全链路正常）
- 遗留问题：暂无阻塞项；Gemini 连通问题不在本次 Change-001 范围内
---

## Change-002
- 标题：`前端请求地址环境自适配（修复线上登录 Network Error）`
- 日期：`2026-03-25`
- 发起仓库：`Toonflow-web`
- 需求背景：线上通过 IP 访问登录页时，前端请求命中 `http://localhost:60000/other/login` 导致 `Network Error`；当前依赖手工替换 dist 中 localhost 的方式不利于持续迭代与本地调试。
- 状态：`DRAFT`
- 是否影响前后端联动：`是`
- 关联 issue / PR / commit：`待补充`
- 备注：本条目仅先登记前端改造计划；后端部分由 Toonflow-app 仓库补充。

### 后端改动
- 改动内容：
- 受影响接口：
	- 1. `METHOD /api/...`
		- 请求变化：
		- 响应变化：
		- 错误处理变化：
		- 是否兼容旧前端：`是` / `否`
		- 前端必须同步的点：
		- 后端验证方式：
		- 后端涉及文件：

### 前端改动
- 受影响页面/组件：登录页、设置页请求配置面板、全局请求层（axios / ws）
- 受影响 API / 类型：
  - 登录：`POST /api/other/login`
  - 全局请求：运行时 `baseUrl` 解析与注入
  - WebSocket：运行时 `wsBaseUrl` 解析与注入（线上 `/ws`）
- 修改方案：
  - 统一优先级：`URL Query(baseUrl/wsBaseUrl) > 用户设置(Store) > 环境默认值`
  - 环境默认值：本地开发使用 `http://localhost:60000` / `ws://localhost:60000`；线上 Web 使用 `/api` / `/ws`
  - 增加历史配置迁移：线上若检测到 `localhost/127.0.0.1` 旧值则自动纠正
  - 设置页“重置默认”改为重置到当前环境默认值
- 是否有阻塞：`否`
- 实际修改内容：`待开发`
- 前端涉及文件：
  - `Toonflow-web/src/stores/setting.ts`
  - `Toonflow-web/src/utils/axios.ts`
  - `Toonflow-web/src/utils/wsClient.ts`
  - `Toonflow-web/src/App.vue`
  - `Toonflow-web/src/views/setting/components/requestConfig.vue`
- 验证方式：
  - 线上登录请求应命中 `POST /api/other/login`，不再出现 `localhost:60000`
  - 本地 `yarn dev` 调试流程保持可用
  - 前端类型检查通过（`yarn type-check`）

### 联调结果
- 联调结论：`待联调`
- 遗留问题：`待确认是否存在历史缓存导致的个别用户首登失败场景`
---

## Change-003
- 标题：`OpenRouter 图像模型接入与文本模型列表过滤`
- 日期：`2026-04-05`
- 发起仓库：`Toonflow-app`
- 需求背景：当前 OpenRouter 仅支持文本模型；图像模型配置页缺少 OpenRouter 厂商和图像模型拉取能力。同时，文本模型页当前拉取的是 OpenRouter 全量模型，需要收敛为只拉取文本输出能力模型。
- 状态：`BACKEND_DONE`
- 是否影响前后端联动：`是`
- 关联 issue / PR / commit：`待补充`
- 备注：本次仅完成 app 仓库后端改动；Toonflow-web 需要按本条目完成前端对接。

### 后端改动
- 改动内容：
  - 新增 OpenRouter 图像模型 provider，图像生成沿用 OpenRouter 官方统一 Base URL：`https://openrouter.ai/api/v1`，并通过 `/chat/completions` + `modalities` + `image_config` 发起请求。
  - 新增 OpenRouter 图像模型拉取接口，后端只返回具备图像输出能力的模型。
  - 现有 OpenRouter 文本模型拉取接口改为只请求文本输出能力模型，不再拉取 OpenRouter 全量模型。
  - `testImage` 增加 `manufacturer` 归一化，支持 `OpenRouter/openRouter/openrouter`。
  - 初始化与迁移逻辑补齐 `t_imageModel` 的基础记录：`openrouter/auto`。
- 受影响接口：
	- 1. `POST /api/setting/getOpenRouterModels`（后端实际路由：`/setting/getOpenRouterModels`）
		- 请求变化：无；请求体仍为 `{ apiKey: string, baseURL?: string }`
		- 响应变化：无；成功仍返回 `{ openrouter: Array<{ label: string; value: string }> }`
		- 错误处理变化：鉴权失败返回 400；其他异常返回 500
		- 是否兼容旧前端：`是`
		- 前端必须同步的点：文本模型页调用该接口后，列表语义变为“仅文本输出能力模型”，不再是 OpenRouter 全量模型
		- 后端验证方式：使用有效 API Key 调用后，只会返回 OpenRouter 文本输出能力模型
		- 后端涉及文件：
      - `src/routes/setting/getOpenRouterModels.ts`
      - `src/lib/openrouter.ts`
	- 2. `POST /api/setting/getOpenRouterImageModels`（后端实际路由：`/setting/getOpenRouterImageModels`）
		- 请求变化：新增接口；请求体 `{ apiKey: string, baseURL?: string }`
		- 响应变化：成功返回 `{ openrouter: Array<{ label: string; value: string }> }`
		- 错误处理变化：鉴权失败返回 400；无可用图像模型返回 400；其他异常返回 500
		- 是否兼容旧前端：`是`（新增接口）
		- 前端必须同步的点：图像模型配置弹层在用户输入 API Key 后，需要调用该接口拉取 OpenRouter 图像模型
		- 后端验证方式：使用有效 API Key 调用后，只返回具备图像输出能力的 OpenRouter 模型
		- 后端涉及文件：
      - `src/routes/setting/getOpenRouterImageModels.ts`
      - `src/lib/openrouter.ts`
      - `src/router.ts`
	- 3. `POST /api/other/testImage`（后端实际路由：`/other/testImage`）
		- 请求变化：`manufacturer` 现在支持别名并会归一化为 `openrouter`
		- 响应变化：无；成功时继续返回图片结果（base64 或可转换图片 URL）
		- 错误处理变化：OpenRouter 若未返回 `images` 字段，会返回明确错误信息
		- 是否兼容旧前端：`是`
		- 前端必须同步的点：OpenRouter 图像模型测试连通时，固定发送 `manufacturer: "openrouter"`
		- 后端验证方式：对 OpenRouter 图像模型调用该接口，能完成图像连通测试
		- 后端涉及文件：
      - `src/routes/other/testImage.ts`
      - `src/utils/ai/image/index.ts`
      - `src/utils/ai/image/owned/openrouter.ts`

### 前端改动
- 受影响页面/组件：
  - 模型配置页 “新增模型” 弹层的图像页
  - 图像模型新增/编辑弹层
  - 文本模型 OpenRouter 配置弹层
- 受影响 API / 类型：
  - 文本模型拉取：`POST /api/setting/getOpenRouterModels`
  - 图像模型拉取：`POST /api/setting/getOpenRouterImageModels`
  - 图像连通测试：`POST /api/other/testImage`
  - 图像模型列表返回类型：`{ openrouter: Array<{ label: string; value: string }> }`
- 修改方案：
  - 图像页厂商筛选新增 `OpenRouter`，交互和视觉表现与文本页现有 OpenRouter 一致。
  - 图像页点击 `OpenRouter` 后，模型列表区应与文本页一致：
    - 展示一个 `openrouter/auto` 卡片
    - 展示一个“自定义模型”卡片
  - 图像模型“添加/编辑”弹层中：
    - Base URL 自动填充并默认显示为 `https://openrouter.ai/api/v1`
    - 用户输入 API Key 后，模型名称下拉调用 `POST /api/setting/getOpenRouterImageModels`
    - 保存、编辑、测试连通时固定发送 `manufacturer: "openrouter"`
  - 文本模型页同步调整：
    - 继续调用 `POST /api/setting/getOpenRouterModels`
    - 但页面文案/逻辑要按“文本输出能力模型”理解，不要再假设是 OpenRouter 全量模型
- 是否有阻塞：`否`
- 实际修改内容：`待 Toonflow-web 仓库实现`
- 前端涉及文件：`待 Toonflow-web 仓库补充`
- 验证方式：
  - 图像页新增模型弹层中能看到 `OpenRouter`
  - 选择 `OpenRouter` 后，模型卡片区和文本页一致
  - 输入 API Key 后，图像模型名称下拉能拉到 OpenRouter 图像模型
  - 保存 OpenRouter 图像模型成功，并能通过 `testImage`
  - 文本页 OpenRouter 模型下拉不再显示 OpenRouter 全量模型

### 联调结果
- 联调结论：`待 Toonflow-web 完成后联调`
- 遗留问题：前端尚未接入图像页 OpenRouter 厂商筛选与图像模型拉取逻辑
---
