# Security policy

## Reporting a vulnerability

Email **support@guaqai.me** with the subject "Security: employed-plugins". Include what you found, how to reproduce it, and the affected file or platform. Please do not open a public issue for a vulnerability. We acknowledge reports within three business days.

## Scope

This repository holds manifests, skills, agent and command prompts, icons and documentation. It contains no server code, no secrets and no credentials. Out of scope here (report through the same address, they are handled separately): the Employed service at `https://jobs.guaqai.me`, the `employed-mcp` npm package.

## What this bundle does and does not do

- It connects an agent to the remote MCP server `https://jobs.guaqai.me/mcp`. The only data sent is the search filters, ids and profile fields the agent chooses plus the OAuth sign-in token your agent holds.
- It has no hooks, runs no code on your machine and reads no credential from your environment or files. (The DeepSeek Harness bundle, which signs in with an API key, lives in its own repository, Guaq-AI/employed-dsh.)
- Skills instruct the agent to treat job-posting text as untrusted data and never to apply, send messages or write files without your approval.

## Supported versions

Only the latest release receives fixes.
