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

The server supports OAuth in the browser. Start the authorization for the `employed` server (Cline: **Authorize OAuth** in `cline mcp`, or the Authenticate button on the server card), sign in to Employed (a free account includes a limited trial of calls; regular use needs Pro or Ultimate) and approve access.

If your Cline version cannot do OAuth for remote servers, ask the user to create an API key at https://jobs.guaqai.me/profile and add this to the entry. Never write the key into a file that is committed, and never echo it back:

```json
"headers": { "Authorization": "Bearer <API key>" }
```

## 3. Verify

Call `api_meta`. It returns the user's plan, remaining quota and the exact filter values. Then call `count_jobs` with `role_type=new_grad` and `location_scope=india`; any number, including 0, proves the connection works.

## Notes

- Dependencies: none. No Node.js or Python is needed for the remote server.
- Search tools are read-only and safe to auto-approve. `update_my_profile`, `track_job`, `untrack_job`, `follow_company`, `unfollow_company` and `set_email_alerts` change the user's own Employed account, and `export_jobs` writes a file; leave those out of `autoApprove`.
- Hosts without remote support can run the `employed-mcp@1.2.1` npm package locally instead (needs Node.js 16+ and Python 3.8+); its API-key setup is at https://jobs.guaqai.me/docs.
- Privacy: https://jobs.guaqai.me/privacy-policy. Support: https://jobs.guaqai.me/support.
