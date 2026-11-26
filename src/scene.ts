export type PrState = "open" | "merged" | "closed";

export interface PullRequest {
  title: string;
  number: number;
  author: string;
  base: string;
  head: string;
  state: PrState;
}

export interface Scene {
  pr: PullRequest;
}
