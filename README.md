# sass-test

Reproduces the `-0` and `rgb()` percentage output queried on civictheme/uikit#1019.

```bash
npm install
npm run demo
```

`compile.mjs` compiles `demo.scss` with each Sass version where the output changed:

| Version | Change |
|---|---|
| 1.77.5 | Baseline: `0`, rounded `rgba(110, 162, 171, 0.7)` / `#eff5f6` |
| 1.79.0 | RGB channels no longer rounded: `rgb(239.13…, 244.89…, 245.87…)` |
| 1.101.4 | Fractional channels written as percentages: `rgb(93.78%, …)` |
| 1.104.0 | Negative zero written as `-0` |

The last block converts the percentages back to 0-255. They round to the old values, so the rendered colours are unchanged.

`demo.scss` also shows a fix for each: `0 - $x` instead of `-$x`, and a literal colour instead of a computed one.
