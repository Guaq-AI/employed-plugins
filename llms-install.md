# Install Employed by Guaq AI (instructions for AI agents such as Cline)

Employed by Guaq AI is a **remote** MCP server. There is nothing to clone, build or run locally.

## 1. Add the server

Add this entry to the MCP settings JSON (Cline: **MCP Servers**, **Configure**, **Configure MCP Servers**):

```json
{
  "mcpServers": {
    "employed": {
      "type": "streamableHttp",
      "url": "https://jobs.guaqai.me/mcp",
      "disabled": false,
      "autoApprove": ["api_meta", "count_jobs", "search_jobs", "get_job", "list_companies", "company_profile"]
    }
  }
}
```

Or use the CLI: `cline mcp add employed https://jobs.guaqai.me/mcp --transport http --yes`.

## 2. Authenticate

The server supports OAuth in the browser. Start the authorization for the `employed` server (Cline: **Authorize OAuth** in `cline mcp`, or the Authenticate button on the server card), sign in to Employed (a free account is enough) and approve access.

If your Cline version cannot do OAuth for remote servers, ask the user to create an API key at https://jobs.guaqai.me/profile and add this to the entry. Never write the key into a file that is committed, and never echo it back:

```json
"headers": { "Authorization": "Bearer <API key>" }
```

## 3. Verify

Call `api_meta`. It returns the user's plan, remaining quota and the exact filter values. Then call `count_jobs` with `role_type=new_grad` and `location_scope=india`; any number, including 0, proves the connection works.

## Notes

- Dependencies: none. No Node.js or Python is needed for the remote server.
- The tools are read-only. `export_jobs` writes a file and needs a higher plan; leave it out of `autoApprove`.
- Optional stdio fallback for hosts without remote support: `npx -y employed-mcp@1.0.3` with the environment variable `GUAQ_API_KEY` set (needs Node.js 16+ and Python 3.8+).
- Privacy: https://jobs.guaqai.me/privacy. Support: https://jobs.guaqai.me/support.
