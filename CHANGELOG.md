# Changelog

All notable changes to this plugin bundle. Versions follow semantic versioning; the version in every manifest is generated from one place (`scripts/build.py` in the source repository).

## 1.1.0

- First public release of the multi-marketplace bundle.
- Remote MCP connector `https://jobs.guaqai.me/mcp` referenced from every manifest (OAuth or API key).
- Skills: `employed-jobs` (rewritten around the MCP tools, filter vocabulary in `references/`), `job-search-from-resume`, `employer-research`, `hiring-market-brief`, `application-tracker`.
- Agents: `job-search-agent`, `employer-research-agent`. Commands: `/employed:find-jobs`, `/employed:company`, `/employed:market`.
- Manifests for Claude Code, Agent Plugins 1.0.0 (Copilot CLI, Cursor, Kiro, Codex, Hermes, Qwen), Cursor, Qoder, ZCode, Devin, MiniMax, OpenHands, Gemini CLI, Antigravity, DeepSeek Harness, Microsoft 365 Copilot Cowork and the official MCP Registry.
- The stdio `npx` launcher is pinned to an exact version.

## 1.0.2 and earlier

Skills-only plugin (`employed-jobs`) with an unpinned `npx employed-mcp` server, published from the `buddywhitman/resume-cv` repository.
