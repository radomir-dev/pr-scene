import type { Meta, StoryObj } from "@storybook/html-vite";
import { renderMarkdown } from "../src/index";

const meta = { title: "Components/Markdown" } satisfies Meta;

export default meta;

const GFM = `### CI summary

| Check | Status |
| :--- | :---: |
| **Lint** | ✅ Passed |
| **Tests** | 🟡 Running |

- [x] OpenAPI validated
- [ ] E2E smoke completed

Read the [workflow run](https://github.com/acme/storefront/actions/runs/1234) for logs.`;

const ALERT = `> [!WARNING]
> The preview build was skipped because the diff touched no UI files.`;

const SOURCE = `- [ ] <!-- toggle:docs -->

<!-- slot:footer -->

<!-- /slot:footer -->`;

export const Rendered: StoryObj = {
  name: "Rendered",
  render: () => renderMarkdown(GFM),
};

export const Alert: StoryObj = {
  name: "Alert",
  render: () => renderMarkdown(ALERT),
};

export const Source: StoryObj = {
  name: "Source with slots",
  render: () => renderMarkdown(SOURCE, { mode: "source" }),
};
