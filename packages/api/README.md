<p align="center">
  <a href="https://developers.mymoid.com" target="_blank" rel="noopener noreferrer">
   <picture>
      <source media="(prefers-color-scheme: dark)" srcset="../../examples/nextjs/public/m.svg">
      <img src="../../examples/nextjs/public/m.svg" height="64">
    </picture>
  </a>
</p>

# Mymoid JavaScript API SDK

[![NPM Version](https://img.shields.io/npm/v/@mymoid/api)](https://www.npmjs.com/package/@mymoid/api)
![npm bundle size](https://img.shields.io/bundlephobia/min/@mymoid/api)

This library offers an easy to use interface for accessing the Mymoid REST API using JavaScript or TypeScript.

## Documentation

To learn how to get started with Mymoid, please consult the [developer's portal](https://developers.mymoid.com).

## Getting Started

### Installation

Using npm in your project directory run the following command:

```sh
npm install @mymoid/api
```

### SDK Basic Setup

Create a `MymoidApi` instance before initializing your application. You should only have one instance of the client.

> We assume that you already have an API Key and an Organization, if not, please refer to our [initial setup](https://developers.mymoid.com/guides/getting-started#initial-setup).

#### With environment variables (recommended)

```sh
MYMOID_BASE_URL=https://apis.sta.mymoid.com
MYMOID_API_KEY=******************************************************
MYMOID_ORGANIZATION_ID=**********************************************
```

#### Or, Passing `options` to `MymoidApi`

```js
import { MymoidApi } from '@mymoid/api'

const api = await MymoidApi({
  baseUrl: '{MYMOID_BASE_URL}',
  apiKey: '{MYMOID_API_KEY}',
  organizationId: '{MYMOID_ORGANIZATION_ID}'
})
```

## API Reference

Explore API Methods available in `@mymoid/api`.

- [Configuration Options]()
- [MymoidApi]()
- [paymentsOrders]()

## Feedback

### Contributing

We appreciate feedback and contribution to this repo! Before you get started, please see the following:

- [MYMOID's general contribution guidelines]()
- [MYMOID's code of conduct guidelines]()
- [This repo's contribution guide]()

### Raise an issue

To provide feedback or report a bug, please [raise an issue on our issue tracker]().
