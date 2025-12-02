# Zavu SDK

## Overview

Zavu Messaging API: Unified multi-channel messaging API for Zavu.

Supported channels:
- **SMS**: Simple text messages
- **WhatsApp**: Rich messaging with media, buttons, lists, and templates

Design goals:
- Simple `send()` entrypoint for developers
- Project-level authentication via Bearer token
- Support for all WhatsApp message types (text, image, video, audio, document, sticker, location, contact, buttons, list, reaction, template)
- If a non-text message type is sent, WhatsApp channel is used automatically
- 24-hour WhatsApp conversation window enforcement


### Available Operations

* [sendMessage](#sendmessage) - Send a message
* [listMessages](#listmessages) - List messages
* [getMessage](#getmessage) - Get message by ID
* [sendReaction](#sendreaction) - Send reaction to message
* [listTemplates](#listtemplates) - List templates
* [createTemplate](#createtemplate) - Create template
* [getTemplate](#gettemplate) - Get template
* [deleteTemplate](#deletetemplate) - Delete template
* [listSenders](#listsenders) - List senders
* [createSender](#createsender) - Create sender
* [getSender](#getsender) - Get sender
* [updateSender](#updatesender) - Update sender
* [deleteSender](#deletesender) - Delete sender
* [listContacts](#listcontacts) - List contacts
* [getContact](#getcontact) - Get contact
* [updateContact](#updatecontact) - Update contact
* [getContactByPhone](#getcontactbyphone) - Get contact by phone number
* [introspectPhone](#introspectphone) - Introspect phone number

## sendMessage

Send a message to a recipient via SMS or WhatsApp.

**Channel selection:**
- If `channel` is omitted and `messageType` is `text`, defaults to SMS
- If `messageType` is anything other than `text`, WhatsApp is used automatically

**WhatsApp 24-hour window:**
- Free-form messages (non-template) require an open 24h window
- Window opens when the user messages you first
- Use template messages to initiate conversations outside the window

### Example Usage

<!-- UsageSnippet language="typescript" operationID="sendMessage" method="post" path="/v1/messages" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.sendMessage({
    zavuSender: "sender_12345",
    body: {
      to: "+56912345678",
      text: "Your verification code is 123456",
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { sendMessage } from "@zavudev/sdk/funcs/sendMessage.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await sendMessage(zavu, {
    zavuSender: "sender_12345",
    body: {
      to: "+56912345678",
      text: "Your verification code is 123456",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("sendMessage failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.SendMessageRequest](../../models/operations/sendmessagerequest.md)                                                                                                 | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.MessageResponse](../../models/messageresponse.md)\>**

### Errors

| Error Type              | Status Code             | Content Type            |
| ----------------------- | ----------------------- | ----------------------- |
| errors.ErrorT           | 400, 401, 404, 409, 429 | application/json        |
| errors.ErrorT           | 500                     | application/json        |
| errors.SDKDefaultError  | 4XX, 5XX                | \*/\*                   |

## listMessages

List messages previously sent by this project.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listMessages" method="get" path="/v1/messages" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.listMessages({});

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { listMessages } from "@zavudev/sdk/funcs/listMessages.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await listMessages(zavu, {});
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("listMessages failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.ListMessagesRequest](../../models/operations/listmessagesrequest.md)                                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ListMessagesResponse](../../models/operations/listmessagesresponse.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 401                    | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## getMessage

Get message by ID

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getMessage" method="get" path="/v1/messages/{messageId}" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.getMessage({
    messageId: "<id>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { getMessage } from "@zavudev/sdk/funcs/getMessage.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await getMessage(zavu, {
    messageId: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("getMessage failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetMessageRequest](../../models/operations/getmessagerequest.md)                                                                                                   | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.MessageResponse](../../models/messageresponse.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 401, 404               | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## sendReaction

Send an emoji reaction to an existing WhatsApp message. Reactions are only supported for WhatsApp messages.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="sendReaction" method="post" path="/v1/messages/{messageId}/reactions" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.sendReaction({
    messageId: "<id>",
    zavuSender: "sender_12345",
    body: {
      emoji: "👍",
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { sendReaction } from "@zavudev/sdk/funcs/sendReaction.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await sendReaction(zavu, {
    messageId: "<id>",
    zavuSender: "sender_12345",
    body: {
      emoji: "👍",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("sendReaction failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.SendReactionRequest](../../models/operations/sendreactionrequest.md)                                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.MessageResponse](../../models/messageresponse.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 400, 401, 404          | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## listTemplates

List WhatsApp message templates for this project.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listTemplates" method="get" path="/v1/templates" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.listTemplates();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { listTemplates } from "@zavudev/sdk/funcs/listTemplates.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await listTemplates(zavu);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("listTemplates failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ListTemplatesResponse](../../models/operations/listtemplatesresponse.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 401                    | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## createTemplate

Create a WhatsApp message template. Note: Templates must be approved by Meta before use.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createTemplate" method="post" path="/v1/templates" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.createTemplate({
    name: "order_confirmation",
    body: "Hi {{1}}, your order {{2}} has been confirmed and will ship within 24 hours.",
    whatsappCategory: "UTILITY",
    variables: [
      "customer_name",
      "order_id",
    ],
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { createTemplate } from "@zavudev/sdk/funcs/createTemplate.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await createTemplate(zavu, {
    name: "order_confirmation",
    body: "Hi {{1}}, your order {{2}} has been confirmed and will ship within 24 hours.",
    whatsappCategory: "UTILITY",
    variables: [
      "customer_name",
      "order_id",
    ],
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("createTemplate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.TemplateCreateRequest](../../models/templatecreaterequest.md)                                                                                                          | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.Template](../../models/template.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 400, 401               | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## getTemplate

Get template

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getTemplate" method="get" path="/v1/templates/{templateId}" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.getTemplate({
    templateId: "<id>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { getTemplate } from "@zavudev/sdk/funcs/getTemplate.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await getTemplate(zavu, {
    templateId: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("getTemplate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetTemplateRequest](../../models/operations/gettemplaterequest.md)                                                                                                 | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.Template](../../models/template.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 401, 404               | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## deleteTemplate

Delete template

### Example Usage

<!-- UsageSnippet language="typescript" operationID="deleteTemplate" method="delete" path="/v1/templates/{templateId}" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  await zavu.deleteTemplate({
    templateId: "<id>",
  });


}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { deleteTemplate } from "@zavudev/sdk/funcs/deleteTemplate.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await deleteTemplate(zavu, {
    templateId: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    
  } else {
    console.log("deleteTemplate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.DeleteTemplateRequest](../../models/operations/deletetemplaterequest.md)                                                                                           | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<void\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 401, 404               | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## listSenders

List senders

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listSenders" method="get" path="/v1/senders" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.listSenders();

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { listSenders } from "@zavudev/sdk/funcs/listSenders.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await listSenders(zavu);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("listSenders failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ListSendersResponse](../../models/operations/listsendersresponse.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 401                    | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## createSender

Create sender

### Example Usage

<!-- UsageSnippet language="typescript" operationID="createSender" method="post" path="/v1/senders" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.createSender({
    name: "<value>",
    phoneNumber: "1-697-351-3400 x33934",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { createSender } from "@zavudev/sdk/funcs/createSender.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await createSender(zavu, {
    name: "<value>",
    phoneNumber: "1-697-351-3400 x33934",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("createSender failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.SenderCreateRequest](../../models/sendercreaterequest.md)                                                                                                              | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.Sender](../../models/sender.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 400, 401               | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## getSender

Get sender

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getSender" method="get" path="/v1/senders/{senderId}" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.getSender({
    senderId: "<id>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { getSender } from "@zavudev/sdk/funcs/getSender.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await getSender(zavu, {
    senderId: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("getSender failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetSenderRequest](../../models/operations/getsenderrequest.md)                                                                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.Sender](../../models/sender.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 401, 404               | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## updateSender

Update sender

### Example Usage

<!-- UsageSnippet language="typescript" operationID="updateSender" method="patch" path="/v1/senders/{senderId}" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.updateSender({
    senderId: "<id>",
    body: {},
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { updateSender } from "@zavudev/sdk/funcs/updateSender.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await updateSender(zavu, {
    senderId: "<id>",
    body: {},
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("updateSender failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.UpdateSenderRequest](../../models/operations/updatesenderrequest.md)                                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.Sender](../../models/sender.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 400, 401, 404          | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## deleteSender

Delete sender

### Example Usage

<!-- UsageSnippet language="typescript" operationID="deleteSender" method="delete" path="/v1/senders/{senderId}" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  await zavu.deleteSender({
    senderId: "<id>",
  });


}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { deleteSender } from "@zavudev/sdk/funcs/deleteSender.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await deleteSender(zavu, {
    senderId: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    
  } else {
    console.log("deleteSender failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.DeleteSenderRequest](../../models/operations/deletesenderrequest.md)                                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<void\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 400, 401, 404          | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## listContacts

List contacts

### Example Usage

<!-- UsageSnippet language="typescript" operationID="listContacts" method="get" path="/v1/contacts" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.listContacts({});

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { listContacts } from "@zavudev/sdk/funcs/listContacts.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await listContacts(zavu, {});
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("listContacts failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.ListContactsRequest](../../models/operations/listcontactsrequest.md)                                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.ListContactsResponse](../../models/operations/listcontactsresponse.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 401                    | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## getContact

Get contact

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getContact" method="get" path="/v1/contacts/{contactId}" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.getContact({
    contactId: "<id>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { getContact } from "@zavudev/sdk/funcs/getContact.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await getContact(zavu, {
    contactId: "<id>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("getContact failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetContactRequest](../../models/operations/getcontactrequest.md)                                                                                                   | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.Contact](../../models/contact.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 401, 404               | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## updateContact

Update contact

### Example Usage

<!-- UsageSnippet language="typescript" operationID="updateContact" method="patch" path="/v1/contacts/{contactId}" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.updateContact({
    contactId: "<id>",
    body: {},
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { updateContact } from "@zavudev/sdk/funcs/updateContact.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await updateContact(zavu, {
    contactId: "<id>",
    body: {},
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("updateContact failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.UpdateContactRequest](../../models/operations/updatecontactrequest.md)                                                                                             | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.Contact](../../models/contact.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 400, 401, 404          | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## getContactByPhone

Get contact by phone number

### Example Usage

<!-- UsageSnippet language="typescript" operationID="getContactByPhone" method="get" path="/v1/contacts/phone/{phoneNumber}" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.getContactByPhone({
    phoneNumber: "397-335-4175 x077",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { getContactByPhone } from "@zavudev/sdk/funcs/getContactByPhone.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await getContactByPhone(zavu, {
    phoneNumber: "397-335-4175 x077",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("getContactByPhone failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetContactByPhoneRequest](../../models/operations/getcontactbyphonerequest.md)                                                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.Contact](../../models/contact.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 401, 404               | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |

## introspectPhone

Validate a phone number and check if a WhatsApp conversation window is open.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="introspectPhone" method="post" path="/v1/introspect/phone" -->
```typescript
import { Zavu } from "@zavudev/sdk";

const zavu = new Zavu({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await zavu.introspectPhone({
    phoneNumber: "+56912345678",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { ZavuCore } from "@zavudev/sdk/core.js";
import { introspectPhone } from "@zavudev/sdk/funcs/introspectPhone.js";

// Use `ZavuCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const zavu = new ZavuCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await introspectPhone(zavu, {
    phoneNumber: "+56912345678",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("introspectPhone failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.PhoneIntrospectionRequest](../../models/phoneintrospectionrequest.md)                                                                                                  | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.PhoneIntrospectionResponse](../../models/phoneintrospectionresponse.md)\>**

### Errors

| Error Type             | Status Code            | Content Type           |
| ---------------------- | ---------------------- | ---------------------- |
| errors.ErrorT          | 400, 401               | application/json       |
| errors.SDKDefaultError | 4XX, 5XX               | \*/\*                  |