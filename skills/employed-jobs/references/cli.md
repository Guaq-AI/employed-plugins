# Command-line fallback

When the MCP server is not connected, the same index is reachable with the open `employed-mcp` package (Node.js 16+ and Python 3.8+ on PATH). The version is pinned on purpose.

```bash
export GUAQ_API_KEY=...   # create one at https://jobs.guaqai.me/profile
npx -y employed-mcp@1.0.3 jobs --role-type new_grad --location-scope india --limit 25
npx -y employed-mcp@1.0.3 count --employment-type internship --category engineering/ml
npx -y employed-mcp@1.0.3 company Stripe
npx -y employed-mcp@1.0.3 meta
```

Subcommands: `jobs`, `count`, `job`, `companies`, `company <name>`, `export <file>`, `signals [name]`, `meta`. Flags mirror the filters in `filters.md` with dashes (`--role-type`, `--location-scope`, `--work-mode`, `--yoe-min`). Run `npx -y employed-mcp@1.0.3 <subcommand> --help` for the authoritative list.

Never print the API key, never commit it, and never ask the user to paste it into a chat message when an environment variable will do.
