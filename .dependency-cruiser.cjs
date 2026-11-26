module.exports = {
  forbidden: [
    {
      name: "library-does-not-import-tooling",
      severity: "error",
      comment: "src is what ships; it must not reach into the demo, tests, stories or scripts.",
      from: { path: "^src" },
      to: { path: "^(demo|test|scripts|stories|e2e|e2e-shots)" },
    },
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.json" },
    exclude: { path: "(\\.storybook|dist|dist-demo|storybook-static)" },
  },
};
