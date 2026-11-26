export type ActionsVariant = "running" | "passed" | "failed" | "merged";

const ACTIONS = `<!-- pr-slots -->

<table>
<thead>
<tr><th>Enabled</th><th>Check</th><th>Status</th></tr>
</thead>
<tbody>
<tr>
<td>

- [x] <!-- toggle:docs -->

</td>
<td>

**Preview API docs** · ~4 min

</td>
<td>

<!-- slot:docs -->

Waiting for the workflow to run.

<!-- /slot:docs -->

</td>
</tr>
<tr>
<td>

- [ ] <!-- toggle:mutation -->

</td>
<td>

**Mutation tests** · ~18 min

</td>
<td>

Run when the diff touches core logic.

</td>
</tr>
<tr>
<td>

- [ ] <!-- toggle:visual -->

</td>
<td>

**Visual regression tests** · ~9 min

</td>
<td>

Run when the diff touches UI.

</td>
</tr>
</tbody>
</table>

<!-- slot:footer -->

<!-- /slot:footer -->`;

const DOCS: Record<ActionsVariant, string> = {
  running: "🟡 Building preview…",
  passed: "[API docs for this PR](https://pr-482.docs.internal) ✅",
  failed: "❌ Build failed, no preview",
  merged: "🎉 Merged and deployed ✅",
};

export function actionsCommentBody(variant: ActionsVariant): string {
  return ACTIONS.replace(
    /<!-- slot:docs -->[\s\S]*?<!-- \/slot:docs -->/,
    `<!-- slot:docs -->\n\n${DOCS[variant]}\n\n<!-- /slot:docs -->`,
  );
}

export const RELEASE_CHECKLIST_BODY = `### CI summary

<!-- slot:status -->

Waiting for the workflow to run.

<!-- /slot:status -->

- [x] OpenAPI validated
- [ ] E2E smoke completed

<!-- slot:footer -->

<!-- /slot:footer -->`;
