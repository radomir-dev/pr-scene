declare module "@primer/octicons" {
  export interface OcticonOptions {
    class?: string;
    width?: number;
    height?: number;
    "aria-hidden"?: string;
    "aria-label"?: string;
  }

  export interface Octicon {
    name: string;
    toSVG(options?: OcticonOptions): string;
  }

  const octicons: Record<string, Octicon>;
  export default octicons;
}
