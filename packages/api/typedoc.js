const excludeFiles = ["index", "utils"];

module.exports = {
  name: "mymoid-api",
  readme: "./public/getting-started.md",
  out: "docs",
  entryPoints: "./src",
  exclude: [
    "**/node_modules/**/*",
    "src/adapters/**/*",
    "src/endpoints/*",
    ...excludeFiles.map((f) => `./src/${f}.ts`),
  ],
  entryPointStrategy: "Expand",
  excludeExternals: false,
  excludePrivate: true,
  excludeProtected: true,
  hideGenerator: true,
};
