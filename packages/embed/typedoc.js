const excludeFiles = ['index']

module.exports = {
  name: '@mymoid/embed',
  out: '../../docs/embed',
  exclude: [
    '**/node_modules/**/*',
    '**/errors/**/*',
    '**/shared/utils*',
    '**/shared/endpoints-base*',
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
