# Wrap WETH On Arbitrum

## Abstract

This is a simple Client side Next.js App w/ Typescript for you to wrap/unwrap ETH on Arbitrum. You can also visit [here](https://wrap-eth-arbitrum.vercel.app) if you don't want to set it up locally yourself.

Some of the notable packages that were used:

- [Next.js](https://nextjs.org/) - mega react framework
- [TailwindCSS](https://tailwindcss.com/) - de facto css framework
- [RainbowKit](https://www.rainbowkit.com) - plug and play wallet connect
- [Axiom](https://www.axiom.co/) - for logging, metrics and collection
- [Viem.sh](https://viem.sh/) - simplistic interaction with on chain RPC calls
- [Wagmi.sh](https://wagmi.sh/) - react hooks for various of things
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - cover the test for react components
- [Vitest](https://github.com/vitest-dev/vitest) + [v8](https://v8.dev/) - test runner and coverage
- [Iconify](https://iconify.design/) - free icons

## Running locally

1. Make sure this is on node >= 20.x and pnpm >= 9.x
1. Run `cp .env.example .env` and fill in your own config for the node
1. Run `pnpm install` then `pnpm dev`

## Test

This code is 100% test covered (except view, hooks and constants), and you can check the test by running `pnpm test` and coverage by running `pnpm coverage`. Each component test suites are under their corresponding folders, and for util functions are in `/tests`.

## Build

There are also build pipelines that runs over github actions

### Specs

- A `README.md` that provides instructions for how to run the application and anything else.
- A user can connect a wallet (please use [RainbowKit](https://www.rainbowkit.com/)).
- A user can wrap and unwrap the native asset on Arbitrum.
- A user should see a **confirmation UI** that their wrap (or unwrap) transaction was successful.
- A user can **press a link to view the transaction** on a block explorer like [Arbiscan](https://arbiscan.io/).
- A user should have the ability to **wrap (and unwrap) again** after successfully completing a wrap (or unwrap).
- A few **tests** that provide confidence in the app (we recommend [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)).
