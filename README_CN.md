# Employed by Guaq AI：智能体插件

[English](README.md) | 中文

为 AI 智能体提供实时职位搜索。[Employed by Guaq AI](https://jobs.guaqai.me) 收录了约 5,000 个雇主招聘系统（Greenhouse、Lever、Workday、Ashby、SmartRecruiters 等）上经过验证的在招职位。安装本插件后，可以用自然语言查询职位，每个职位都附带雇主官方的申请链接。

## 包含内容

- **远程 MCP 连接器** `https://jobs.guaqai.me/mcp`，提供 8 个工具：`search_jobs`、`count_jobs`、`get_job`、`list_companies`、`company_profile`、`market_signal`、`export_jobs`、`api_meta`。
- **5 个技能**：`employed-jobs`（筛选条件词表）、`job-search-from-resume`（根据简历生成职位清单）、`employer-research`（雇主招聘情况调研）、`hiring-market-brief`（招聘市场简报）、`application-tracker`（本地申请记录表）。
- **2 个智能体**和 **3 个斜杠命令**：`/employed:find-jobs`、`/employed:company`、`/employed:market`。
- 没有 hooks，不会在你的电脑上运行任何代码。

## 安装

ZCode：**设置、插件、创建、添加市场**，来源填写 `Guaq-AI/employed-plugins`，然后安装 `employed`。其他平台见 [docs/INSTALL.md](docs/INSTALL.md)。

首次使用需要用免费的 Employed 账号在浏览器中登录（OAuth）；也可以在 <https://jobs.guaqai.me/profile> 创建 API 密钥，作为 `Authorization: Bearer <密钥>` 使用。

## 会发送哪些数据

调用工具时，连接器只会向 `https://jobs.guaqai.me` 发送智能体选择的搜索条件和 ID（例如 `role_type=new_grad`、`location_scope=india`、公司名称、职位 ID）以及你的登录令牌。不会发送你的简历、文件、对话内容或本机的任何信息。技能只是文字说明，不含代码。

[隐私政策](https://jobs.guaqai.me/privacy)，[服务条款](https://jobs.guaqai.me/terms)，支持：<https://jobs.guaqai.me/support>。

## 如实说明

- 插件不会替你投递简历，也不会联系任何人。
- 签证担保标记为 `likely` 只是根据职位文本和雇主历史做出的推断，不是保证。
- 数据反映的是雇主招聘系统上在线的职位，不代表总人数或已录用人数。

许可证：MIT，见 [LICENSE](LICENSE)。
