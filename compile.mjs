// Compiles demo.scss with each Sass version and prints the output side by side,
// then converts the percentage channels back to 0-255 to show the values are
// the same colours the old build rounded.

import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const VERSIONS = ['1.77.5', '1.79.0', '1.101.4', '1.103.1', '1.104.0', '1.105.0']
const NOTES = {
  '1.77.5': 'baseline (main before the upgrade)',
  '1.79.0': 'RGB channels no longer rounded',
  '1.101.4': 'fractional channels written as percentages',
  '1.103.1': 'last version that prints negative zero as 0',
  '1.104.0': 'negative zero printed as -0',
  '1.105.0': 'version in the PR',
}

for (const version of VERSIONS) {
  const sass = require(`sass-${version}`)
  const { css } = sass.compile('demo.scss')
  console.log(`\n=== Sass ${version}: ${NOTES[version]} ===\n${css}`)
}

console.log('\n=== Percentages converted back to 0-255 (Sass 1.105.0) ===')
const { css } = require('sass-1.105.0').compile('demo.scss')
for (const [, name, r, g, b] of css.matchAll(/([\w-]+): rgba?\(([\d.]+)%, ([\d.]+)%, ([\d.]+)%/g)) {
  const channels = [r, g, b].map(p => (p * 2.55).toFixed(2))
  const rounded = channels.map(c => Math.round(c))
  console.log(`${name.padEnd(16)} ${channels.join(', ').padEnd(24)} -> rounds to ${rounded.join(', ')}`)
}
