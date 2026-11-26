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
