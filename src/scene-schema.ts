export type Schema = {
  $schema?: string;
  $id?: string;
  title?: string;
  type?: string;
  required?: readonly string[];
  properties?: Record<string, Schema>;
  items?: Schema;
  enum?: readonly unknown[];
  const?: unknown;
  anyOf?: readonly Schema[];
  additionalProperties?: boolean;
};

const COMMENT: Schema = {
  type: "object",
  required: ["author", "body"],
  additionalProperties: false,
  properties: {
    author: { type: "string" },
    body: { type: "string" },
    bot: { type: "boolean" },
    avatarUrl: { type: "string" },
    createdAt: { type: "string" },
    edited: { type: "boolean" },
  },
};

const REVIEW: Schema = {
  type: "object",
  required: ["author", "state"],
  additionalProperties: false,
  properties: {
    author: { type: "string" },
    state: { enum: ["approved", "changes-requested", "commented"] },
    body: { type: "string" },
    avatarUrl: { type: "string" },
    at: { type: "string" },
  },
};

const CHECK: Schema = {
  type: "object",
  required: ["name", "status"],
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    status: { enum: ["passed", "failed", "running", "queued"] },
    workflow: { type: "string" },
    duration: { type: "string" },
    details: { type: "string" },
  },
};

const TIMELINE_ITEM: Schema = {
  anyOf: [
    {
      type: "object",
      required: ["kind", "comment"],
      properties: { kind: { const: "comment" }, comment: COMMENT },
    },
    {
      type: "object",
      required: ["kind"],
      properties: { kind: { const: "checks" } },
    },
    {
      type: "object",
      required: ["kind", "review"],
      properties: { kind: { const: "review" }, review: REVIEW },
    },
    {
      type: "object",
      required: ["kind"],
      properties: {
        kind: { const: "merged" },
        actor: { type: "string" },
        sha: { type: "string" },
        at: { type: "string" },
      },
    },
  ],
};

export const SCENE_SCHEMA: Schema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://radomir.dev/pr-scene/scene.schema.json",
  title: "pr-scene scene",
  type: "object",
  required: ["pr"],
  additionalProperties: false,
  properties: {
    pr: {
      type: "object",
      required: ["title", "number", "author", "base", "head", "state"],
      additionalProperties: false,
      properties: {
        title: { type: "string" },
        number: { type: "integer" },
        author: { type: "string" },
        base: { type: "string" },
        head: { type: "string" },
        state: { enum: ["open", "merged", "closed"] },
        commits: { type: "integer" },
      },
    },
    timeline: { type: "array", items: TIMELINE_ITEM },
    checks: { type: "array", items: CHECK },
    mergeable: { type: "boolean" },
    view: {
      type: "object",
      additionalProperties: false,
      properties: { theme: { enum: ["light", "dark"] } },
    },
  },
};
