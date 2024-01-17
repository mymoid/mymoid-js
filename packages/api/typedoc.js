const excludeFiles = ['index']

module.exports = {
  name: '@mymoid/api',
  out: 'docs',
  entryPoints: './src',
  exclude: [
    '**/node_modules/**/*',
    'src/errors/**/*',
    'src/shared/**/*',
    '**/*.test.ts*',
    ...excludeFiles.map((f) => `./src/${f}.ts`)
  ],
  entryPointStrategy: 'Expand',
  excludeExternals: false,
  excludePrivate: true,
  excludeProtected: true,
  hideGenerator: true
}
