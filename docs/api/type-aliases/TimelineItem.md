# Type Alias: TimelineItem

```ts
type TimelineItem = 
  | {
  comment: Comment;
  kind: "comment";
}
  | {
  kind: "checks";
}
  | {
  kind: "review";
  review: Review;
}
  | {
  actor?: string;
  at?: string;
  kind: "merged";
  sha?: string;
};
```

Defined in: [scene.ts:55](https://github.com/radomir-dev/pr-scene/blob/30d20b8c683d57696492114a787c4c5acddd0b17/src/scene.ts#L55)
