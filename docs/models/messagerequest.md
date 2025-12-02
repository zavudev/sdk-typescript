# MessageRequest

Request body to send a message.

## Example Usage

```typescript
import { MessageRequest } from "@zavu/sdk/models";

let value: MessageRequest = {
  to: "+56912345678",
  text: "Your verification code is 123456.",
  content: {
    mediaUrl: "https://example.com/image.jpg",
    mimeType: "image/jpeg",
    filename: "invoice.pdf",
    templateVariables: {
      "1": "John",
      "2": "ORD-12345",
    },
  },
  idempotencyKey: "msg_01HZY4ZP7VQY2J3BRW7Z6G0QGE",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                | Example                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `to`                                                       | *string*                                                   | :heavy_check_mark:                                         | Recipient phone number in E.164 format.                    | +56912345678                                               |
| `channel`                                                  | [models.Channel](../models/channel.md)                     | :heavy_minus_sign:                                         | Delivery channel.                                          |                                                            |
| `messageType`                                              | [models.MessageType](../models/messagetype.md)             | :heavy_minus_sign:                                         | Type of message. Non-text types are WhatsApp only.         |                                                            |
| `text`                                                     | *string*                                                   | :heavy_minus_sign:                                         | Text body for text messages or caption for media messages. | Your verification code is 123456.                          |
| `content`                                                  | [models.MessageContent](../models/messagecontent.md)       | :heavy_minus_sign:                                         | Content for non-text message types (WhatsApp only).        |                                                            |
| `idempotencyKey`                                           | *string*                                                   | :heavy_minus_sign:                                         | Optional idempotency key to avoid duplicate sends.         | msg_01HZY4ZP7VQY2J3BRW7Z6G0QGE                             |
| `metadata`                                                 | Record<string, *string*>                                   | :heavy_minus_sign:                                         | Arbitrary metadata to associate with the message.          |                                                            |