/**
 * Employed by Guaq AI bundle for DeepSeek Harness (dsh).
 *
 * Mounts two things into the composition:
 *
 *   1. the skills shipped in this repository, as an isolated `ctx.skills` provider
 *      rooted at this package's own `skills/` directory;
 *   2. the remote Employed MCP server (Streamable HTTP) through the generic MCP client,
 *      authenticated with an API key from the managed credential document.
 *
 * Network use: the only outbound connection is to https://jobs.guaqai.me/mcp, and it carries
 * the search filters the model chooses plus the API key as a Bearer token. Nothing else
 * leaves the machine. The key is stored by dsh in its credential document, never in this
 * package and never in the session log.
 *
 * Pattern follows the published Upstash bundle for dsh. dsh's MCP client has no OAuth flow,
 * which is why this bundle uses an API key (create one at https://jobs.guaqai.me/profile).
 */

import { fileURLToPath } from "node:url";
import * as McpClient from "@deepseek-ai/dsh-mcp-client";
import * as SkillFilesystem from "@deepseek-ai/dsh-skill-filesystem";

const API_KEY = "GUAQ_API_KEY";
const MCP_URL = "https://jobs.guaqai.me/mcp";
const SKILLS_DIR = fileURLToPath(new URL("../skills", import.meta.url));

export const name = "employed";
export const inject = ["skills", "credentials", "commands"];

export function apply(ctx) {
  // 1. Skills (this package's own root only, so project and user roots are untouched).
  ctx.plugin(SkillFilesystem, {
    providerName: "employed",
    includeDefaultRoots: false,
    customSkillDirs: [SKILLS_DIR],
  });

  // 2. MCP server, mounted once the key resolves and remounted whenever it changes.
  let fiber;
  let queue = Promise.resolve();

  const remount = async () => {
    await fiber?.dispose();
    fiber = undefined;

    const key = await ctx.credentials.resolve(API_KEY);
    if (!key) {
      ctx.logger.info(`employed: ${API_KEY} is not configured, MCP server not started. Run /employed-login <api-key>.`);
      return;
    }

    fiber = ctx.plugin(McpClient, {
      serverName: "employed",
      transport: "streamable-http",
      url: MCP_URL,
      headers: { Authorization: `Bearer ${key.value}` },
    });
  };

  const refresh = () => {
    queue = queue.then(remount).catch((error) => {
      ctx.logger.error(`employed: failed to start the MCP server: ${String(error)}`);
    });
  };

  ctx.on("credentials/updated", (ref) => {
    if (ref === API_KEY) refresh();
  });

  refresh();

  // 3. Credential entry. `recordInput: false` keeps the key out of the session log.
  ctx.commands.register({
    name: "employed-login",
    description: "Store your Employed by Guaq AI API key for the job-search MCP server",
    input: { hint: "<api-key>" },
    recordInput: false,
    handler: async ({ rawInput }) => {
      const [apiKey, ...rest] = rawInput.trim().split(/\s+/);
      if (!apiKey || rest.length > 0) {
        return { kind: "error", text: "Usage: /employed-login <api-key>  (create one at https://jobs.guaqai.me/profile)" };
      }
      const info = await ctx.credentials.describe(API_KEY);
      if (!info.writable) {
        return {
          kind: "error",
          text: `${API_KEY} is supplied by the environment dsh was launched with (source: ${info.source}). Unset it there and retry.`,
        };
      }
      await ctx.credentials.set(API_KEY, apiKey);
      return { kind: "success", text: "API key stored. The Employed MCP server is connecting." };
    },
  });
}
