## Getting Started

### Installation

Using [npm](https://npmjs.org) in your project directory run the following command:

```sh
npm install @mymoid/api
```

From the CDN:

```html
<script src="https://TODO"></script>
```

### Configure MYMOID

### Configure the SDK

Create a `MymoidApi` instance before initializing your application. You should only have one instance of the client.

#### With environment variables (recommended)

> .env

```sh
MYMOID_BASE_URL=https://apis.sta.mymoid.com
MYMOID_API_KEY=THzYpoqpXr5viakdCdnGIat7Ehs912o4TZR1Mi0d
MYMOID_ORGANIZATION_ID=8ee638b3-bb54-430c-a11a-c61741e476f0
```

#### Or, Passing `options` to `MymoidApi`

> index.js

```js
import { MymoidApi } from '@mymoid/api';

const api = await MymoidApi({
  baseUrl: "<MYMOID_BASE_URL>",
  apiKey: "<MYMOID_API_KEY>",
  organizationId: "<MYMOID_ORGANIZATION_ID>",
});
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
