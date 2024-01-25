# MYMOID JavaScript API SDK

[![NPM Version](https://img.shields.io/npm/v/@mymoid/api)](https://www.npmjs.com/package/@mymoid/api)
![npm bundle size](https://img.shields.io/bundlephobia/min/@mymoid/api)

Welcome to the MYMOID JavaScript API SDK! 🎉 This library provides an easy-to-use interface for interacting with the MYMOID REST API using JavaScript or TypeScript.

## Documentation

For detailed instructions on getting started with the MYMOID JavaScript API SDK, please refer to our [developer's portal](https://developers.mymoid.com).

For a complete reference of the API, please refer to our [API reference](https://developers.mymoid.com/api-reference).

For a complete reference of the SDK, please refer to our [SDK Documentation](https://mymoid.github.io/mymoid-js/api/).

## Getting Started

### Installation

To install the SDK in your project, run the following npm command:

```sh
npm install @mymoid/api
```

### SDK Basic Setup

Create a `MymoidApi` instance before initializing your application. You should only have one instance of the client.

> [!IMPORTANT]
> Ensure that you have an API Key and an Organization ID, as these are required for setup. If you don't have them yet, please refer to our [initial setup](https://developers.mymoid.com/guides/getting-started#initial-setup).

#### Using Environment Variables (Recommended)

Set the following environment variables in your project:

```sh
MYMOID_BASE_URL=https://apis.sta.mymoid.com
MYMOID_API_KEY=*********************
MYMOID_ORGANIZATION_ID=******************
```

#### Passing `Options` to `MymoidApi`

Alternatively, you can pass options directly to MymoidApi instance:

```js
import { MymoidApi } from '@mymoid/api'

const api = await MymoidApi({
  baseUrl: '{MYMOID_BASE_URL}',
  apiKey: '{MYMOID_API_KEY}',
  organizationId: '{MYMOID_ORGANIZATION_ID}'
})
```

## API Reference

Explore the available API methods in the `@mymoid/api`.

- [API Reference](https://mymoid.github.io/mymoid-js/api)

## Feedback

### Contributing

We appreciate feedback and contributions to this repository! Before you start, please review:

- [MYMOID's general contribution guidelines](https://github.com/mymoid/.github/blob/master/CONTRIBUTING.md)
- [MYMOID's code of conduct guidelines](https://github.com/mymoid/.github/blob/master/CODE_OF_CONDUCT.md)
<!-- - [This repo's contribution guide]() -->

### Raise an issue

To provide feedback or report a bug, please raise an issue on our issue tracker. We value your input!
