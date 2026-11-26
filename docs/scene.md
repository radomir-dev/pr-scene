# The scene

A scene is a plain object. `renderScene(scene, { theme })` turns it into a full PR page.

## Fields

| Field       | Type             | Required | Meaning                                                                       |
| :---------- | :--------------- | :------: | :---------------------------------------------------------------------------- |
| `pr`        | `PullRequest`    |   yes    | Title, number, author, branches and state.                                    |
| `timeline`  | `TimelineItem[]` |    no    | Ordered comment, checks, review and merge items. Defaults to one checks item. |
| `checks`    | `CheckRun[]`     |    no    | Workflow jobs the checks box and merge gate read.                             |
| `mergeable` | `boolean`        |    no    | `false` blocks merging on conflicts; omitted or `true` lets checks decide.    |
| `view`      | `SceneView`      |    no    | Theme preference, used when no explicit option is passed.                     |

## PullRequest

| Field     | Type                             | Required | Meaning                                    |
| :-------- | :------------------------------- | :------: | :----------------------------------------- |
| `title`   | `string`                         |   yes    | PR title.                                  |
| `number`  | `integer`                        |   yes    | PR number, rendered as `#n`.               |
| `author`  | `string`                         |   yes    | Login shown in the header and merge event. |
| `base`    | `string`                         |   yes    | Target branch.                             |
| `head`    | `string`                         |   yes    | Source branch.                             |
| `state`   | `"open" \| "merged" \| "closed"` |   yes    | Drives the pill colour and copy.           |
| `commits` | `integer`                        |    no    | Commit count in the header line.           |

## TimelineItem

| `kind`    | Extra fields            | Renders                                                                    |
| :-------- | :---------------------- | :------------------------------------------------------------------------- |
| `comment` | `comment: Comment`      | A comment card with avatar, author, bot pill, timestamp and markdown body. |
| `checks`  | none                    | The checks box and merge footer, with a status badge on the rail.          |
| `review`  | `review: Review`        | An approved, changes-requested or commented review.                        |
| `merged`  | `actor?`, `sha?`, `at?` | The purple merge event.                                                    |

## Comment

| Field       | Type      | Required | Meaning                                                |
| :---------- | :-------- | :------: | :----------------------------------------------------- |
| `author`    | `string`  |   yes    | Login.                                                 |
| `body`      | `string`  |   yes    | Markdown, rendered through the pipeline and sanitised. |
| `bot`       | `boolean` |    no    | Adds the `bot` pill.                                   |
| `avatarUrl` | `string`  |    no    | `http` or `https` URL; initials are used otherwise.    |
| `createdAt` | `string`  |    no    | ISO timestamp, rendered relative to now.               |
| `edited`    | `boolean` |    no    | Adds the `edited` marker.                              |

## CheckRun

| Field      | Type                                            | Required | Meaning                                    |
| :--------- | :---------------------------------------------- | :------: | :----------------------------------------- |
| `name`     | `string`                                        |   yes    | Job name.                                  |
| `status`   | `"passed" \| "failed" \| "running" \| "queued"` |   yes    | Drives the icon, summary and merge gate.   |
| `workflow` | `string`                                        |    no    | Workflow badge text, defaults to `Checks`. |
| `duration` | `string`                                        |    no    | Duration text such as `14s`.               |
| `details`  | `string`                                        |    no    | Log shown in the native details drawer.    |

## Validation

`validateScene(value)` returns an array of messages naming the offending path; `renderScene` throws with the same text. The JSON Schema is published as `pr-scene/scene.schema.json` and committed at `schema/scene.schema.json`.
