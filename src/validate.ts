import type { Scene } from "./scene";
import { SCENE_SCHEMA } from "./scene-schema";
import type { Schema } from "./scene-schema";

export function validateScene(value: unknown): string[] {
  return validate(value, SCENE_SCHEMA, "scene");
}

function validate(value: unknown, schema: Schema, path: string): string[] {
  if (schema.const !== undefined) return checkConst(value, schema.const, path);
  if (schema.anyOf) return checkAnyOf(value, schema.anyOf, path);
  if (schema.enum) return checkEnum(value, schema.enum, path);
  if (schema.type) return checkType(value, schema, path);
  return [];
}

function checkConst(value: unknown, expected: unknown, path: string): string[] {
  return value === expected ? [] : [`${path}: expected ${JSON.stringify(expected)}`];
}

function checkAnyOf(value: unknown, schemas: readonly Schema[], path: string): string[] {
  const matched = schemas.some((schema) => validate(value, schema, path).length === 0);
  return matched ? [] : [`${path}: does not match any allowed shape`];
}

function checkEnum(value: unknown, allowed: readonly unknown[], path: string): string[] {
  return allowed.includes(value) ? [] : [`${path}: expected one of ${allowed.join(", ")}`];
}

function checkType(value: unknown, schema: Schema, path: string): string[] {
  if (!matchesType(value, schema.type)) return [`${path}: expected ${schema.type}`];
  if (schema.type === "array") return validateItems(value as unknown[], schema, path);
  if (schema.type !== "object") return [];
  return validateObject(value as Record<string, unknown>, schema, path);
}

function matchesType(value: unknown, type?: string): boolean {
  if (type === "array") return Array.isArray(value);
  if (type === "integer") return Number.isInteger(value);
  if (type === "object")
    return typeof value === "object" && value !== null && !Array.isArray(value);
  return typeof value === type;
}

function validateItems(value: unknown[], schema: Schema, path: string): string[] {
  if (!schema.items) return [];
  return value.flatMap((item, index) =>
    validate(item, schema.items as Schema, `${path}[${index}]`),
  );
}

function validateObject(value: Record<string, unknown>, schema: Schema, path: string): string[] {
  const errors = (schema.required ?? [])
    .filter((key) => !(key in value))
    .map((key) => `${path}.${key}: required`);
  for (const [key, child] of Object.entries(schema.properties ?? {})) {
    if (key in value) errors.push(...validate(value[key], child, `${path}.${key}`));
  }
  if (schema.additionalProperties === false) errors.push(...unknownKeys(value, schema, path));
  return errors;
}

function unknownKeys(value: Record<string, unknown>, schema: Schema, path: string): string[] {
  return Object.keys(value)
    .filter((key) => !(key in (schema.properties ?? {})))
    .map((key) => `${path}.${key}: unknown property`);
}

export function assertScene(value: unknown): asserts value is Scene {
  const errors = validateScene(value);
  if (errors.length > 0) throw new Error(`invalid scene: ${errors.join("; ")}`);
}
