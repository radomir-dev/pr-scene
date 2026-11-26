import type { CheckStatus } from "./icons";

export type PrState = "open" | "merged" | "closed";

export type SceneTheme = "light" | "dark";

export interface CheckRun {
  name: string;
  status: CheckStatus;
  workflow?: string;
  duration?: string;
  details?: string;
}

export interface AvatarSource {
  author: string;
  avatarUrl?: string;
}

export type ReviewState = "approved" | "changes-requested" | "commented";

export interface Review {
  author: string;
  state: ReviewState;
  body?: string;
  avatarUrl?: string;
  at?: string;
}

export interface CommentReaction {
  emoji: string;
  count: number;
}

export interface Comment {
  author: string;
  body: string;
  bot?: boolean;
  avatarUrl?: string;
  createdAt?: string;
  edited?: boolean;
  reactions?: CommentReaction[];
}

export interface PullRequest {
  title: string;
  number: number;
  author: string;
  base: string;
  head: string;
  state: PrState;
  commits?: number;
}

export type TimelineItem =
  | { kind: "comment"; comment: Comment }
  | { kind: "checks" }
  | { kind: "review"; review: Review }
  | { kind: "merged"; actor?: string; sha?: string; at?: string };

export interface SceneView {
  theme?: SceneTheme;
}

export interface Scene {
  pr: PullRequest;
  timeline?: TimelineItem[];
  checks?: CheckRun[];
  mergeable?: boolean;
  view?: SceneView;
}
