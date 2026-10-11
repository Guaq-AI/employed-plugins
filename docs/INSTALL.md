# Install guide

The connector is a remote MCP server: **`https://jobs.guaqai.me/mcp`** (Streamable HTTP). Sign in with OAuth in the browser (free Employed account), or send an API key from <https://jobs.guaqai.me/profile> as `Authorization: Bearer <key>` on hosts without OAuth. The skills, agents and commands add know-how on top; the connector alone already works.

Commands below were checked against each platform's documentation on 2026-10-11; see [MARKETPLACES.md](MARKETPLACES.md) for sources. Where a platform has no command-line install, the UI steps are given.

## Agents with plugin marketplaces

### Claude Code

```text
/plugin marketplace add Guaq-AI/employed-plugins
/plugin install employed@employed-marketplace
/mcp
```

Pick `employed`, then **Authenticate**. Slash commands appear as `/employed:find-jobs`, `/employed:company`, `/employed:market`. For a one-off run from a checkout: `claude --plugin-dir ./employed-plugins`.

API key instead of OAuth: `claude mcp add --transport http employed https://jobs.guaqai.me/mcp --header "Authorization: Bearer $GUAQ_API_KEY"`.

### Claude.ai and Claude Desktop

**Settings, Connectors, Add custom connector**, name `Employed`, URL `https://jobs.guaqai.me/mcp`. The interactive results view (MCP Apps) renders in hosts that support it.

### GitHub Copilot CLI

```bash
copilot plugin marketplace add Guaq-AI/employed-plugins
copilot plugin install employed@employed-marketplace
```

The root `plugin.json` and `mcp.json` follow Agent Plugins 1.0.0; Copilot's custom agents come from `com.github.copilot/agents/`.

### Qwen Code

```bash
qwen extensions install https://github.com/Guaq-AI/employed-plugins:employed
```

Qwen converts the Claude marketplace entry (or reads the Agent Plugins layout) into its own extension format.

### Gemini CLI

```bash
gemini extensions install https://github.com/Guaq-AI/employed-plugins
```

Reads `gemini-extension.json` (remote server via `httpUrl`) and the `skills/` folder.

### Google Antigravity

```bash
agy plugin install https://github.com/Guaq-AI/employed-plugins
```

Reads `plugin.json`, `mcp_config.json` (remote server via `serverUrl`), `skills/` and `agents/`. For the strict Antigravity manifest (name and description only) run `python scripts/build.py zip` in the source repository and install `dist/antigravity/employed`.

### Cursor

The repository is a Cursor plugin (`.cursor-plugin/plugin.json`) and an Agent Plugin. After it is listed, install from the Cursor marketplace. Until then add the server by hand in **Settings, MCP**: `{"mcpServers": {"employed": {"url": "https://jobs.guaqai.me/mcp"}}}`.

### OpenAI Codex and ChatGPT

Codex: add this repository as a marketplace (`.agents/plugins/marketplace.json` is included) from the plugin browser. ChatGPT: **Plugins, Add custom MCP server**, URL `https://jobs.guaqai.me/mcp`, authentication OAuth. The directory listing uses the package built by `scripts/build.py zip` (`employed-openai-plugin.zip`).

### Kiro

**Powers panel, Add Custom Power, Import power from GitHub**, repository `https://github.com/Guaq-AI/employed-plugins`. Kiro reads `plugin.json`, `mcp.json` and `skills/`.

### Devin

**Settings, Marketplace**, pick Employed once it is listed, or install from the repository with `devin plugins install --local ./employed-plugins`. Manifest: `.devin-plugin/plugin.json`.

### Qoder

`qoder plugins marketplace add Guaq-AI/employed-plugins`, then `qoder plugins install employed`. Manifest: `.qoder-plugin/plugin.json`.

### ZCode (Z.ai) and Hermes-style hosts

ZCode: **Settings, Plugins, Create, Add marketplace**, source `Guaq-AI/employed-plugins` (reads `.claude-plugin/marketplace.json`; `.zcode-plugin/plugin.json` is also provided).

Hermes Agent: after the plugin-catalog entry is merged, `hermes plugins install employed`. Until then add the server to `~/.hermes/config.yaml`, sign in with `hermes mcp login employed`, and copy `skills/*` into `~/.hermes/skills/`:

```yaml
mcp_servers:
  employed:
    url: https://jobs.guaqai.me/mcp
    auth: oauth
```

### MiniMax Agent

Submitted as a plugin from this repository (`.minimax-plugin/plugin.json`). The server needs per-user sign-in, so MiniMax connects it through its Connector review.

### Microsoft 365 Copilot Cowork

Upload the package built by `scripts/build.py zip` (`employed-m365-cowork.zip`) as a custom app, or share it from the Microsoft 365 admin center. It contains the five skills and the remote connector. Cowork creates the OAuth client automatically through dynamic client registration.

## Hosts that only need the MCP URL

| Host | Steps |
|---|---|
| Cline | Follow [../llms-install.md](../llms-install.md) |
| Mistral Vibe Work | **Connectors, Add Connector, Custom MCP Connector**, name `employed`, URL `https://jobs.guaqai.me/mcp` (administrator step; authentication is detected automatically) |
| OpenClaw | `openclaw mcp set employed '{"url":"https://jobs.guaqai.me/mcp","auth":"oauth"}'` then `openclaw mcp login employed`; skills via `clawhub skill install employed-jobs` once published |
| OpenHands | Copy `.mcp.json` into the workspace, or install the plugin directory (`.plugin/plugin.json`) with the SDK `install_plugin` helper |
| DeepSeek Harness | `dsh plugin --profile web add github:Guaq-AI/employed-plugins`, then `/employed-login <api-key>` inside a session |
| VS Code, JetBrains Junie, other registry clients | Install `me.guaqai.jobs/employed` from the official MCP Registry once published |

## Optional stdio launcher

For hosts that cannot reach a remote URL, the same tools run locally through the open-source `employed-mcp` package (Node.js 16+, Python 3.8+). The version is pinned on purpose:

```bash
GUAQ_API_KEY=... npx -y employed-mcp@1.0.3
```

```json
{ "mcpServers": { "employed": { "command": "npx", "args": ["-y", "employed-mcp@1.0.3"], "env": { "GUAQ_API_KEY": "..." } } } }
```

## Troubleshooting

- **401 or "Authentication required"**: sign in again (`/mcp` in Claude Code), or check that the API key is current at <https://jobs.guaqai.me/profile>.
- **A search returns 0 rows**: a filter value is probably misspelled. Ask the agent to call `api_meta` and retry; see `skills/employed-jobs/references/filters.md`.
- **"Plan does not include market signals"**: `market_signal` and `export_jobs` need a higher plan; everything else works on the free plan.
