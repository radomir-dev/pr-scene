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

export interface Scene {
  pr: PullRequest;
  checks?: CheckRun[];
  comments?: Comment[];
  mergeable?: boolean;
}
