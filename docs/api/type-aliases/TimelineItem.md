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

Defined in: [scene.ts:55](https://github.com/radomir-dev/pr-scene/blob/5ea507c60e13527cd3594da9a04a001590a5bf2b/src/scene.ts#L55)
