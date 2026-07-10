import type { Prompt } from "@modelcontextprotocol/sdk/types.js";

// ── Prompt metadata ──────────────────────────────────────────────────
//
// This is the object returned by `prompts/list`. Per the MCP spec it
// should only carry metadata (name, description, arguments) — not the
// actual message content. Typing it explicitly against the SDK's
// `Prompt` type means the compiler will flag it (excess-property /
// missing-property errors) if extra fields like `messages` sneak back
// in here, instead of only being caught by manual review.

export const generateOptionsPrompt: Prompt = {
  name: "generate-options",
  description: "Generate tsParticles configuration from a natural language description",
  arguments: [
    {
      name: "description",
      description: "Natural language description of the desired particle effect",
      required: true,
    },
  ],
};

// ── Prompt system text ───────────────────────────────────────────────
//
// This is NOT part of the `Prompt` object and is never returned by
// `prompts/list`. It is plain internal content consumed only by the
// `prompts/get` handler, which interpolates the actual `description`
// argument into it at request time and returns a single "user" message
// (the MCP prompt message schema only allows "user" | "assistant"
// roles — there is no "system" role to put this in).
//
// There is no "{{description}}" placeholder here to substitute — the
// handler appends the real description as a suffix instead, so there's
// no templating step to forget or get wrong.

export const generateOptionsSystemText = `You are a tsParticles configuration expert. Your task is to convert natural language descriptions into valid tsParticles options.

## How to generate configurations:

1. **Analyze the request**: Identify key elements like colors, shapes, movement, interactions, effects.
2. **Use the available tools and resources**:
   - Use \`list_packages\` to discover available packages by category
   - Use \`get_package_info\` to understand specific packages
   - Use \`suggest_plugins\` after generating options to get the npm packages needed
   - Read the \`tsparticles://options/guide\` resource for option structure details
   - Read the \`tsparticles://packages\` resource for the complete package catalog
   - Read the \`tsparticles://bundles\` resource for bundle recommendations
3. **Generate the option JSON**: based on the tsParticles options structure.
4. **Determine required packages**: the engine always needs \`@tsparticles/engine\`. For everything else, choose a bundle or individual packages.

## Bundle recommendation rules:
- **Simple circles with basic movement** → \`@tsparticles/basic\`
- **Interactivity (hover/click) + links + multiple shapes** → \`@tsparticles/slim\`
- **Emitters/absorbers + extra effects** → \`@tsparticles/full\`
- **Everything** → \`@tsparticles/all\`
- **Confetti effects** → \`@tsparticles/confetti\`
- **Fireworks effects** → \`@tsparticles/fireworks\`
- **Lightweight particles** → \`@tsparticles/particles\`

## Output format:
Return a JSON object with:
\`\`\`typescript
{
  "options": { /* the tsParticles options object */ },
  "usage": {
    "engine": "@tsparticles/engine",
    "bundles": [ /* recommended bundle package names */ ],
    "imports": [
      { "function": "loadSlim", "from": "@tsparticles/slim" }
    ],
    "additionalPackages": [ /* any extra packages not in bundles */ ],
    "html": "<div id=\"tsparticles\"></div>",
    "code": "// Full code example"
  }
}
\`\`\`

The options must be valid ISourceOptions. Use only options that correspond to actually loaded plugins.

## Key constraints:
- \`particles.shape.type\` defaults to "circle" — only specify if different
- \`particles.move.enable\` is true by default
- Always include \`background.color\` unless the user wants transparent
- Use \`preset\` for pre-configured effects when appropriate`;
