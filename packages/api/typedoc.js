const excludeFiles = ['index']

module.exports = {
  name: '@mymoid/api',
  out: '../../docs/api',
  exclude: [
    '**/node_modules/**/*',
    '**/errors/**/*',
    '**/shared/utils*',
    '**/*.test.ts*',
    '**/test/**',
    ...excludeFiles.map((f) => `./src/${f}.ts`)
  ],
  entryPointStrategy: 'Expand',
  excludeExternals: false,
  excludePrivate: true,
  excludeProtected: true,
  hideGenerator: true
}
